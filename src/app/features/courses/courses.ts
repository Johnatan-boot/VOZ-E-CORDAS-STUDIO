import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard, AppPageHeader, AppProgressTracker, TrainingModuleItem } from '../../shared/ui';
import { CourseCard } from './components/course-card/course-card';
import { LessonViewer } from './components/lesson-viewer/lesson-viewer';
import { Course, CourseLesson } from './models/courses.model';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-courses',
  imports: [MatIconModule, AppBadge, AppButton, AppCard, AppPageHeader, AppProgressTracker, CourseCard, LessonViewer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <!-- Page Header -->
      <app-page-header
        title="Biblioteca de Cursos"
        description="Aulas estruturadas de teoria, técnica vocal e instrumentos para sua evolução musical."
        category="CONTEÚDO"
        icon="school"
      >
        <div slot="page-actions" class="flex items-center gap-2">
          <app-badge variant="primary" size="sm">
            {{ totalCourses() }} Cursos Ativos
          </app-badge>
        </div>
      </app-page-header>

      @if (selectedLesson()) {
        <!-- Lesson View -->
        <div class="w-full animate-fade-in">
          <app-lesson-viewer 
             [course]="selectedCourse()!"
             [lesson]="selectedLesson()!" 
             (back)="selectedLesson.set(null)"
             (toggleComplete)="toggleLessonCompletion($event)"
             (selectLesson)="openLesson($event)"
          />
        </div>
      } @else if (selectedCourse()) {
        <!-- Course Detail View -->
        <div class="flex flex-col gap-6 animate-fade-in">
          
          <div class="flex items-center justify-between mb-2">
            <app-button variant="ghost" size="sm" icon="arrow_back" (clicked)="selectedCourse.set(null)">
              Voltar à Biblioteca
            </app-button>
          </div>

          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
              
              <div class="flex flex-col md:flex-row gap-6 md:items-start flex-1 min-w-0">
                <div class="w-24 h-24 rounded-2xl bg-surface-elevated flex items-center justify-center shrink-0 shadow-sm border border-border">
                  <mat-icon class="text-[40px] text-primary">{{ selectedCourse()!.icon }}</mat-icon>
                </div>
                
                <div class="flex flex-1 flex-col gap-2">
                  <div class="flex items-center gap-3 mb-1">
                    <app-badge [variant]="selectedCourse()!.themeColor" size="sm">{{ selectedCourse()!.level }}</app-badge>
                    <span class="text-xs font-semibold text-text-secondary">Professor: {{ selectedCourse()!.instructor }}</span>
                  </div>
                  <h2 class="text-3xl font-serif font-bold text-text-primary">{{ selectedCourse()!.title }}</h2>
                  <p class="text-sm text-text-secondary leading-relaxed max-w-2xl">
                    {{ selectedCourse()!.description }}
                  </p>
                  
                  <div class="mt-4">
                    <app-button variant="primary" size="lg" icon="play_arrow" (clicked)="openLesson(selectedCourse()!.modules[0].lessons[0])">
                      Iniciar Curso Agora
                    </app-button>
                  </div>
                </div>
              </div>

              <!-- Circular Progress Ring Tracker for Training Modules -->
              <div class="w-full lg:w-80 shrink-0">
                <app-progress-tracker
                  [modules]="currentCourseModules()"
                  [totalModules]="selectedCourse()!.modules.length"
                  [completedModules]="completedModulesCount()"
                  [percentage]="selectedCourse()!.progress"
                  title="Módulos de Treinamento"
                  [variant]="getProgressVariant()"
                  size="md"
                  layout="card"
                />
              </div>

            </div>
          </app-card>

          <!-- Modules List -->
          <div class="flex flex-col gap-6 mt-8">
            <h3 class="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <mat-icon class="text-primary">view_list</mat-icon>
              Conteúdo do Curso
            </h3>
            
            <div class="flex flex-col gap-4">
              @for (mod of selectedCourse()!.modules; track mod.id) {
                <app-card variant="default" padding="none" class="overflow-hidden border-border/80">
                  <div class="flex flex-col">
                    <!-- Module Header -->
                    <div class="p-4 bg-surface border-b border-border/40">
                      <h4 class="text-base font-bold text-text-primary">{{ mod.title }}</h4>
                      <p class="text-xs text-text-secondary mt-1">{{ mod.description }}</p>
                    </div>
                    
                    <!-- Lessons List -->
                    <div class="flex flex-col divide-y divide-border/30">
                      @for (lesson of mod.lessons; track lesson.id; let i = $index) {
                        <button 
                          type="button"
                          class="flex items-center gap-4 p-4 hover:bg-surface-elevated transition-colors text-left cursor-pointer group w-full"
                          (click)="openLesson(lesson)"
                        >
                          <div class="flex items-center justify-center w-8 h-8 rounded-full border border-border/60 shrink-0 group-hover:border-primary group-hover:text-primary transition-colors text-xs font-bold"
                               [class.bg-success]="lesson.isCompleted"
                               [class.border-success]="lesson.isCompleted"
                               [class.text-background]="lesson.isCompleted"
                               [class.text-text-secondary]="!lesson.isCompleted">
                            @if (lesson.isCompleted) {
                              <mat-icon class="text-[16px]">check</mat-icon>
                            } @else {
                              {{ i + 1 }}
                            }
                          </div>
                          
                          <div class="flex flex-col flex-1">
                            <span class="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                              {{ lesson.title }}
                            </span>
                            <div class="flex items-center gap-2 mt-1">
                              <mat-icon class="text-[14px] text-text-secondary">
                                {{ lesson.type === 'video' ? 'play_circle' : (lesson.type === 'practice' ? 'fitness_center' : 'description') }}
                              </mat-icon>
                              <span class="text-[10px] font-semibold text-text-secondary">
                                {{ lesson.durationMinutes }} min
                              </span>
                            </div>
                          </div>
                          
                          <mat-icon class="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</mat-icon>
                        </button>
                      }
                    </div>
                  </div>
                </app-card>
              }
            </div>
          </div>
        </div>
      } @else {
        <!-- Grid View -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          @for (course of courseService.courses(); track course.id) {
            <app-course-card [course]="course" (clicked)="selectedCourse.set($event)" />
          }
        </div>
      }
    </div>
  `
})
export class Courses {
  readonly courseService = inject(CourseService);
  
  readonly selectedCourse = signal<Course | null>(null);
  readonly selectedLesson = signal<CourseLesson | null>(null);
  
  readonly totalCourses = computed(() => this.courseService.courses().length);

  readonly currentCourseModules = computed<TrainingModuleItem[]>(() => {
    const course = this.selectedCourse();
    if (!course) return [];
    return course.modules.map(m => ({
      id: m.id,
      title: m.title,
      isCompleted: m.lessons.length > 0 && m.lessons.every(l => l.isCompleted),
    }));
  });

  readonly completedModulesCount = computed(() => {
    return this.currentCourseModules().filter(m => m.isCompleted).length;
  });

  getProgressVariant(): 'primary' | 'accent' | 'success' | 'warning' {
    const course = this.selectedCourse();
    if (!course || course.themeColor === 'default') return 'primary';
    return course.themeColor;
  }

  openLesson(lesson: CourseLesson) {
    this.selectedLesson.set(lesson);
  }

  async toggleLessonCompletion(lessonToToggle: CourseLesson) {
    const course = this.selectedCourse();
    if (!course) return;

    await this.courseService.toggleLessonCompletion(course.id, lessonToToggle.id);
    
    // Update current selected course and lesson to reflect changes
    const updatedCourse = this.courseService.courses().find(c => c.id === course.id);
    if (updatedCourse) {
      this.selectedCourse.set(updatedCourse);
      // find updated lesson
      for (const m of updatedCourse.modules) {
        for (const l of m.lessons) {
          if (l.id === lessonToToggle.id) {
            this.selectedLesson.set(l);
          }
        }
      }
    }
  }
}
export default Courses;
