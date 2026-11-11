export interface PlayerLevel {
  readonly level: number;
  readonly title: string;
  readonly currentXp: number;
  readonly nextLevelXp: number;
  readonly remainingXp: number;
  readonly progressPercentage: number;
}

export interface PracticeStreak {
  readonly currentDays: number;
  readonly bestDays: number;
  readonly active: boolean;
  readonly message: string;
}

export interface MusicalGoal {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly current: number;
  readonly target: number;
  readonly unit: string;
  readonly progressPercentage: number;
  readonly completed: boolean;
}

export interface PracticeChallenge {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly current: number;
  readonly target: number;
  readonly xpReward: number;
  readonly progressPercentage: number;
  readonly completed: boolean;
}

export type AchievementStatus = 'unlocked' | 'inProgress' | 'locked';

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly status: AchievementStatus;
  readonly progress?: number;
  readonly target?: number;
  readonly unlockedAt?: string;
  readonly xpReward: number;
}

export interface GamificationSummary {
  readonly levelInfo: PlayerLevel;
  readonly streakInfo: PracticeStreak;
  readonly goals: readonly MusicalGoal[];
  readonly challenges: readonly PracticeChallenge[];
  readonly achievements: readonly Achievement[];
}
