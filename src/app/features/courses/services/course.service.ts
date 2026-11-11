import { Injectable, inject, signal, effect } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase';
import { AuthService } from '../../../core/services/auth.service';
import { COURSES_DATA } from '../data/courses.data';
import { Course } from '../models/courses.model';

interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  lastWatched?: Date;
  progressPercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private authService = inject(AuthService);
  
  readonly courses = signal<Course[]>(COURSES_DATA as Course[]);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.loadUserProgress(user.uid);
      } else {
        this.courses.set(COURSES_DATA as Course[]);
      }
    });
  }

  private async loadUserProgress(userId: string) {
    try {
      const updatedCourses = [...this.courses()];
      
      for (let i = 0; i < updatedCourses.length; i++) {
        const course = updatedCourses[i];
        const progressRef = doc(db, 'user_progress', `${userId}_${course.id}`);
        const progressSnap = await getDoc(progressRef);
        
        if (progressSnap.exists()) {
          const data = progressSnap.data() as UserProgress;
          const completedLessons = data.completedLessons || [];
          
          updatedCourses[i] = {
            ...course,
            progress: data.progressPercentage || 0,
            modules: course.modules.map(m => ({
              ...m,
              lessons: m.lessons.map(l => ({
                ...l,
                isCompleted: completedLessons.includes(l.id)
              }))
            }))
          };
        }
      }
      
      this.courses.set(updatedCourses);
    } catch (e) {
      console.error('Error loading progress', e);
    }
  }

  async toggleLessonCompletion(courseId: string, lessonId: string) {
    const user = this.authService.user();
    if (!user) return;

    this.courses.update(allCourses => {
      return allCourses.map(c => {
        if (c.id === courseId) {
          return {
            ...c,
            modules: c.modules.map(m => ({
              ...m,
              lessons: m.lessons.map(l => 
                l.id === lessonId ? { ...l, isCompleted: !l.isCompleted } : l
              )
            }))
          };
        }
        return c;
      });
    });
    
    // Recalculate progress for this course
    const updatedCourse = this.courses().find(c => c.id === courseId);
    if (!updatedCourse) return;

    let totalLessons = 0;
    let completedLessons = 0;
    const completedLessonIds: string[] = [];
    
    for (const m of updatedCourse.modules) {
      for (const l of m.lessons) {
        totalLessons++;
        if (l.isCompleted) {
          completedLessons++;
          completedLessonIds.push(l.id);
        }
      }
    }
    
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    this.courses.update(allCourses => {
      return allCourses.map(c => c.id === courseId ? { ...c, progress: progressPercentage } : c);
    });

    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_${courseId}`);
      await setDoc(progressRef, {
        userId: user.uid,
        courseId,
        completedLessons: completedLessonIds,
        lastWatched: new Date(),
        progressPercentage
      }, { merge: true });
    } catch (e) {
      console.error('Error saving progress', e);
    }
  }
}
