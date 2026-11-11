import { 
  PracticeSession, 
  SkillProgress, 
  WeeklyPractice, 
  ProgressSummary 
} from '../models/progress.model';

export const TRAINING_MODULES_PROGRESS = [
  { id: 'tm-1', title: 'Fundamentos Vocais & Diafragma', isCompleted: true },
  { id: 'tm-2', title: 'Afinação Relativa & Escalas', isCompleted: true },
  { id: 'tm-3', title: 'Melismas & Ornamentação Sertaneja', isCompleted: true },
  { id: 'tm-4', title: 'Ritmos de Viola & Violão Base', isCompleted: true },
  { id: 'tm-5', title: 'Harmonia a Duas Vozes (Duo)', isCompleted: false },
  { id: 'tm-6', title: 'Performance de Palco & Estúdio', isCompleted: false },
];

export const PROGRESS_SUMMARY: ProgressSummary = {
  totalTime: '12h 45m',
  totalSessions: 24,
  completedExercises: 45,
  currentStreak: '6 dias',
};

export const WEEKLY_PRACTICE_DATA: readonly WeeklyPractice[] = [
  { day: 'Seg', minutes: 35, sessions: 1 },
  { day: 'Ter', minutes: 50, sessions: 2 },
  { day: 'Qua', minutes: 20, sessions: 1 },
  { day: 'Qui', minutes: 65, sessions: 2 },
  { day: 'Sex', minutes: 80, sessions: 3 },
  { day: 'Sáb', minutes: 45, sessions: 1 },
  { day: 'Dom', minutes: 15, sessions: 1 },
];

export const SKILL_PROGRESS_DATA: readonly SkillProgress[] = [
  {
    id: 'canto',
    name: 'Canto',
    progress: 80,
    currentLevel: 'Intermediário',
    target: 'Avançado'
  },
  {
    id: 'violao',
    name: 'Violão',
    progress: 65,
    currentLevel: 'Intermediário',
    target: 'Intermediário II'
  },
  {
    id: 'afinacao',
    name: 'Afinação',
    progress: 90,
    currentLevel: 'Avançado',
    target: 'Profissional'
  },
  {
    id: 'teoria',
    name: 'Teoria',
    progress: 45,
    currentLevel: 'Iniciante II',
    target: 'Intermediário'
  },
  {
    id: 'duo',
    name: 'Duo',
    progress: 55,
    currentLevel: 'Intermediário',
    target: 'Avançado'
  }
];

export const RECENT_SESSIONS_DATA: readonly PracticeSession[] = [
  {
    id: 'session-1',
    date: 'Hoje, 10:30',
    duration: 32,
    category: 'Canto',
    activity: 'Exercícios de afinação e vocalizes',
    status: 'completed'
  },
  {
    id: 'session-2',
    date: 'Hoje, 09:15',
    duration: 15,
    category: 'Teoria',
    activity: 'Identificação de intervalos',
    status: 'completed'
  },
  {
    id: 'session-3',
    date: 'Ontem, 19:00',
    duration: 45,
    category: 'Violão',
    activity: 'Prática de campo harmônico (Sol maior)',
    status: 'completed'
  },
  {
    id: 'session-4',
    date: 'Ontem, 10:00',
    duration: 20,
    category: 'Duo',
    activity: 'Harmonização de 1ª e 2ª voz',
    status: 'completed'
  },
  {
    id: 'session-5',
    date: '28 de Ago, 18:30',
    duration: 30,
    category: 'Studio',
    activity: 'Gravação de take teste',
    status: 'cancelled'
  },
  {
    id: 'session-6',
    date: '28 de Ago, 14:00',
    duration: 50,
    category: 'Canto',
    activity: 'Revisão de respiração diafragmática',
    status: 'completed'
  }
];
