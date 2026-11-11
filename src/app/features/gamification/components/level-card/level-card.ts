import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppCard, AppProgress } from '../../../../shared/ui';
import { PlayerLevel } from '../../models/gamification.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-level-card',
  imports: [AppCard, AppProgress, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="lg" class="flex flex-col md:flex-row items-center gap-6">
      <div class="flex-shrink-0 relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface border-4 border-primary">
        <div class="absolute -top-3 -right-3 bg-accent text-bg w-8 h-8 rounded-full flex items-center justify-center font-bold">
          {{ level().level }}
        </div>
        <mat-icon class="text-primary text-[48px] md:text-[64px] w-auto h-auto">star</mat-icon>
      </div>
      
      <div class="flex-1 w-full flex flex-col gap-4">
        <div class="text-center md:text-left">
          <h2 class="text-2xl md:text-3xl font-serif font-bold text-text-primary">{{ level().title }}</h2>
          <p class="text-text-secondary text-sm">Nível atual</p>
        </div>
        
        <div class="flex flex-col gap-1">
          <div class="flex justify-between text-sm font-medium">
            <span class="text-primary">{{ level().currentXp }} XP</span>
            <span class="text-text-secondary">{{ level().nextLevelXp }} XP</span>
          </div>
          <app-progress 
            [value]="level().progressPercentage" 
            [showPercentage]="false" 
            variant="primary" 
            size="md"
          />
          <p class="text-xs text-text-secondary text-center md:text-right mt-1">
            Faltam {{ level().remainingXp }} XP para o próximo nível
          </p>
        </div>
      </div>
    </app-card>
  `
})
export class LevelCard {
  readonly level = input.required<PlayerLevel>();
}
