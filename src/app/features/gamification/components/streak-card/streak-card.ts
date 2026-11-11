import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppCard } from '../../../../shared/ui';
import { PracticeStreak } from '../../models/gamification.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-streak-card',
  imports: [AppCard, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full flex items-center justify-center bg-accent/10 mb-4">
        <mat-icon [class.text-accent]="streak().active" [class.text-text-secondary]="!streak().active" class="text-[32px] w-auto h-auto">
          local_fire_department
        </mat-icon>
      </div>
      
      <h3 class="text-3xl font-serif font-bold text-text-primary">{{ streak().currentDays }} <span class="text-xl">dias</span></h3>
      <p class="text-sm font-semibold text-text-secondary mt-1">Sequência Atual</p>
      
      <p class="text-text-secondary text-sm mt-4 italic">
        "{{ streak().message }}"
      </p>
      
      <div class="mt-4 pt-4 border-t border-border/50 w-full">
        <p class="text-xs text-text-secondary">
          Melhor sequência: <span class="font-bold text-text-primary">{{ streak().bestDays }} dias</span>
        </p>
      </div>
    </app-card>
  `
})
export class StreakCard {
  readonly streak = input.required<PracticeStreak>();
}
