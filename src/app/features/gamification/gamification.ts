import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GamificationHero } from './components/gamification-hero/gamification-hero';
import { LevelCard } from './components/level-card/level-card';
import { StreakCard } from './components/streak-card/streak-card';
import { GoalsCard } from './components/goals-card/goals-card';
import { ChallengesCard } from './components/challenges-card/challenges-card';
import { AchievementsGrid } from './components/achievements-grid/achievements-grid';
import { GAMIFICATION_DATA } from './data/gamification.data';

@Component({
  selector: 'app-gamification',
  imports: [
    GamificationHero,
    LevelCard,
    StreakCard,
    GoalsCard,
    ChallengesCard,
    AchievementsGrid
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <!-- Header -->
      <app-gamification-hero />

      <!-- Top Section: Level and Streak -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-level-card [level]="summary().levelInfo" />
        </div>
        <div class="lg:col-span-1">
          <app-streak-card [streak]="summary().streakInfo" />
        </div>
      </div>

      <!-- Middle Section: Goals and Challenges -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-goals-card [goals]="summary().goals" />
        <app-challenges-card [challenges]="summary().challenges" />
      </div>

      <!-- Bottom Section: Achievements -->
      <app-achievements-grid [achievements]="summary().achievements" />
    </div>
  `
})
export default class Gamification {
  readonly summary = signal(GAMIFICATION_DATA);
}
