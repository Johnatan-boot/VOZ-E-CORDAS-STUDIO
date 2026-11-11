import { GamificationSummary } from '../models/gamification.model';

export const GAMIFICATION_DATA: GamificationSummary = {
  levelInfo: {
    level: 8,
    title: 'Intérprete',
    currentXp: 2450,
    nextLevelXp: 3000,
    remainingXp: 550,
    progressPercentage: 81
  },
  streakInfo: {
    currentDays: 7,
    bestDays: 14,
    active: true,
    message: 'Você está mantendo o ritmo.'
  },
  goals: [
    {
      id: 'g1',
      title: 'Praticar canto',
      description: 'Tempo dedicado à técnica vocal',
      current: 18,
      target: 30,
      unit: 'minutos',
      progressPercentage: 60,
      completed: false
    },
    {
      id: 'g2',
      title: 'Completar exercícios de violão',
      description: 'Atividades práticas concluídas',
      current: 5,
      target: 5,
      unit: 'exercícios',
      progressPercentage: 100,
      completed: true
    },
    {
      id: 'g3',
      title: 'Módulo de teoria',
      description: 'Avanço no curso de fundamentos',
      current: 2,
      target: 4,
      unit: 'aulas',
      progressPercentage: 50,
      completed: false
    }
  ],
  challenges: [
    {
      id: 'c1',
      title: 'Treino vocal de hoje',
      description: 'Realizar aquecimento e escalas',
      category: 'Canto',
      current: 12,
      target: 20,
      xpReward: 100,
      progressPercentage: 60,
      completed: false
    },
    {
      id: 'c2',
      title: 'Afinação perfeita',
      description: 'Fazer uma sessão com o afinador',
      category: 'Afinador',
      current: 1,
      target: 1,
      xpReward: 50,
      progressPercentage: 100,
      completed: true
    },
    {
      id: 'c3',
      title: 'Gravação no Studio',
      description: 'Gravar um take completo',
      category: 'Studio',
      current: 0,
      target: 1,
      xpReward: 150,
      progressPercentage: 0,
      completed: false
    }
  ],
  achievements: [
    {
      id: 'a1',
      title: 'Primeira Prática',
      description: 'Complete sua primeira sessão no estúdio.',
      icon: 'star',
      status: 'unlocked',
      xpReward: 50,
      unlockedAt: '12 de Ago, 2026'
    },
    {
      id: 'a2',
      title: '7 Dias de Sequência',
      description: 'Pratique por 7 dias consecutivos.',
      icon: 'local_fire_department',
      status: 'unlocked',
      xpReward: 200,
      unlockedAt: '19 de Ago, 2026'
    },
    {
      id: 'a3',
      title: '10 Horas de Prática',
      description: 'Alcance 10 horas totais de estudo.',
      icon: 'schedule',
      status: 'inProgress',
      progress: 7.3,
      target: 10,
      xpReward: 300
    },
    {
      id: 'a4',
      title: 'Mestre do Studio',
      description: 'Grave 5 takes perfeitos com 90%+ de acerto.',
      icon: 'graphic_eq',
      status: 'locked',
      xpReward: 500
    },
    {
      id: 'a5',
      title: 'Parceiro Ideal',
      description: 'Complete 3 sessões de Duo.',
      icon: 'group',
      status: 'inProgress',
      progress: 1,
      target: 3,
      xpReward: 250
    },
    {
      id: 'a6',
      title: 'Ouvido Absoluto',
      description: 'Gabarite um exercício de percepção.',
      icon: 'hearing',
      status: 'locked',
      xpReward: 400
    }
  ]
};
