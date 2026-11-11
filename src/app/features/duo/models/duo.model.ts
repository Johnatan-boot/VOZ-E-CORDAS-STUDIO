export type DuoDifficulty = 'Iniciante' | 'Intermediário' | 'Avançado';
export type DuoExerciseStatus = 'pending' | 'in_progress' | 'completed';
export type DuoSessionStatus = 'idle' | 'ready' | 'active' | 'paused' | 'completed' | 'cancelled';

export interface DuoPartner {
  readonly id: string;
  readonly name: string;
  readonly instrument: string;
  readonly voiceType?: string;
  readonly level: DuoDifficulty;
  readonly status: 'Disponível' | 'Ocupado' | 'Offline';
}

export interface DuoExercise {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly difficulty: DuoDifficulty;
  readonly durationMinutes: number;
  readonly focus: string;
  readonly status: DuoExerciseStatus;
}

export interface DuoSession {
  readonly id: string;
  readonly exerciseId: string;
  readonly partnerId: string;
  readonly startedAt: Date;
  readonly elapsedTime: number; // in seconds
  readonly status: DuoSessionStatus;
  readonly progress: number; // 0-100
}
