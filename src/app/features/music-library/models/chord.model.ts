export type ChordDifficulty = 'Fácil' | 'Intermediário' | 'Avançado';
export type ChordCategory = 'Maior' | 'Menor' | 'Sétima' | 'Maj7' | 'm7' | 'Suspenso' | 'Add9' | 'Diminuto' | 'Aumentado' | 'Extensões';

export interface GuitarPosition {
  frets: number[]; // e.g. [-1, 3, 2, 0, 1, 0] for C major (-1 is muted, 0 is open)
  fingers?: number[]; // e.g. [0, 3, 2, 0, 1, 0] (0 is open/muted, 1 is index, etc)
  baseFret: number;
}

export interface Chord {
  id: string;
  symbol: string;
  name: string;
  root: string;
  quality: string;
  notes: string[];
  intervals: string[];
  difficulty: ChordDifficulty;
  category: ChordCategory;
  guitarPositions: GuitarPosition[];
  description: string;
  sertanejoApplication?: string;
}
