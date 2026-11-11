export type ChordQuality = 'Maior' | 'Menor' | 'Com Sétima' | 'Menor com Sétima' | 'Suspenso' | 'Diminuto';
export type Finger = 0 | 1 | 2 | 3 | 4 | 5; // 0 = open, 1 = index, 2 = middle, 3 = ring, 4 = pinky, 5 = thumb (rare)
export type StringStatus = 'played' | 'muted' | 'open';

export interface ChordString {
  readonly stringNumber: 1 | 2 | 3 | 4 | 5 | 6; // 1 = High E, 6 = Low E
  readonly status: StringStatus;
  readonly fret: number | null; // null if muted or open
  readonly finger: Finger | null;
}

export interface GuitarChord {
  readonly id: string;
  readonly name: string;
  readonly rootNote: string;
  readonly quality: ChordQuality;
  readonly baseFret: number;
  readonly strings: readonly ChordString[];
  readonly description?: string;
}

export interface ChordProgressionExercise {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  readonly chords: readonly string[]; // Array of chord IDs
  readonly defaultBpm: number;
  readonly suggestedStrummingPattern?: string;
}
