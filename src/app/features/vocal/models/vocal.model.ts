export type VocalCategory =
  | 'Aquecimento'
  | 'Afinação'
  | 'Sustentação'
  | 'Agilidade'
  | 'Intervalos';

export type ExerciseDifficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface ExerciseNote {
  readonly name: string;
  readonly octave: number;
  readonly frequency: number;
  readonly durationBeats: number;
}

export interface VocalExercise {
  readonly id: string;
  readonly title: string;
  readonly category: VocalCategory;
  readonly difficulty: ExerciseDifficulty;
  readonly description: string;
  readonly keySignature: string;
  readonly bpm: number;
  readonly notes: readonly ExerciseNote[];
  readonly tips: string;
}

export interface VocalPitchFeedback {
  readonly isSinging: boolean;
  readonly targetNote: ExerciseNote | null;
  readonly sungNoteName: string | null;
  readonly sungFrequency: number;
  readonly centsDifference: number;
  readonly accuracyScore: number; // 0 to 100%
  readonly isAccurate: boolean; // within tolerance
}

export interface VocalRange {
  readonly lowestNote: string | null;
  readonly lowestFrequency: number;
  readonly highestNote: string | null;
  readonly highestFrequency: number;
}
