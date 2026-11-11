export type CourseLevel = 'Iniciante' | 'Intermediário' | 'Avançado';
export type LessonType = 'video' | 'text' | 'practice';

export interface CourseLesson {
  readonly id: string;
  readonly title: string;
  readonly durationMinutes: number;
  readonly type: LessonType;
  readonly videoUrl?: string;
  readonly isCompleted: boolean;
}

export interface CourseModule {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly lessons: readonly CourseLesson[];
}

export interface Course {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly instructor: string;
  readonly level: CourseLevel;
  readonly progress: number; // 0 to 100
  readonly icon: string;
  readonly themeColor: 'primary' | 'accent' | 'success' | 'warning' | 'default';
  readonly modules: readonly CourseModule[];
}
