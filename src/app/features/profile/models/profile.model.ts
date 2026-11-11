export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  stageName?: string;
  bio?: string;
  avatar?: string;
  joinDate?: Date;
  role?: string;
  city?: string;
  phone?: string;
  musicalProfile: MusicalProfile;
  goals: MusicalGoal[];
  preferences: MusicalPreference;
}

export interface MusicalProfile {
  mainInstrument: string;
  secondaryInstrument?: string;
  voiceType?: string;
  experienceLevel: ProfileLevel;
  favoriteStyles: string[];
}

export interface MusicalGoal {
  id: string;
  title: string;
  description?: string;
  status?: string;
}

export interface MusicalPreference {
  studyDuration: number; // in minutes
  preferredPracticePeriod: 'Manhã' | 'Tarde' | 'Noite' | 'Madrugada' | 'Qualquer';
  preferredStyles: string[];
}

export type ProfileLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Profissional';
