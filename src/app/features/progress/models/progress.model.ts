export interface PracticeMetric {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly unit: string;
  readonly trend: string;
  readonly description: string;
}

export type SessionStatus = 'completed' | 'inProgress' | 'cancelled';

export interface PracticeSession {
  readonly id: string;
  readonly date: string; // ISO date or readable date
  readonly duration: number; // minutes
  readonly category: string;
  readonly activity: string;
  readonly status: SessionStatus;
}

export interface SkillProgress {
  readonly id: string;
  readonly name: string;
  readonly progress: number; // 0 to 100
  readonly currentLevel: string;
  readonly target: string;
}

export interface WeeklyPractice {
  readonly day: string;
  readonly minutes: number;
  readonly sessions: number;
}

export interface ProgressSummary {
  readonly totalTime: string;
  readonly totalSessions: number;
  readonly completedExercises: number;
  readonly currentStreak: string;
}
