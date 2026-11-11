export interface HeroData {
  readonly greeting: string;
  readonly studentName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly mainActionText: string;
  readonly currentGoal: string;
  readonly dailyTip: string;
}

export interface PracticeMetric {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
  readonly helper: string;
  readonly icon: string;
  readonly variant: 'primary' | 'accent' | 'success' | 'warning';
}

export interface TrainingTrack {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly progress: number;
  readonly currentLesson: string;
  readonly totalLessons: number;
  readonly completedLessons: number;
  readonly icon: string;
  readonly route: string;
  readonly badgeText: string;
  readonly badgeVariant: 'primary' | 'accent' | 'success' | 'warning' | 'default';
}

export type RoutineStatus = 'completed' | 'in_progress' | 'pending' | 'recommended';

export interface PracticeRoutineItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly categoryIcon: string;
  readonly durationMinutes: number;
  readonly status: RoutineStatus;
  readonly difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  readonly keyOrNote?: string;
}

export interface QuickShortcut {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
  readonly route: string;
  readonly category: string;
}
