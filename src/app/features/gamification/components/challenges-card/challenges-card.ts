import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppCard, AppProgress, AppButton } from '../../../../shared/ui';
import { PracticeChallenge } from '../../models/gamification.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-challenges-card',
  imports: [AppCard, AppProgress, AppButton, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-semibold text-text-secondary flex items-center gap-2">
          <mat-icon class="text-[18px]">sports_score</mat-icon>
          Desafios
        </h3>
      </div>
      
      <div class="flex flex-col gap-4">
        @for (challenge of challenges(); track challenge.id) {
          <div class="p-4 rounded-xl bg-surface border border-border/40 hover:border-border transition-colors">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <h4 class="text-sm font-bold text-text-primary">{{ challenge.title }}</h4>
                <p class="text-xs text-text-secondary mt-0.5">{{ challenge.description }}</p>
              </div>
              <div class="flex-shrink-0 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">
                +{{ challenge.xpReward }} XP
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <app-progress 
                  [value]="challenge.progressPercentage" 
                  [showPercentage]="false" 
                  [variant]="challenge.completed ? 'success' : 'accent'" 
                  size="sm"
                />
                <div class="flex justify-between mt-1 text-[10px] text-text-secondary font-medium">
                  <span>{{ challenge.current }} / {{ challenge.target }}</span>
                  @if (challenge.completed) {
                    <span class="text-success">Concluído</span>
                  }
                </div>
              </div>
              
              @if (!challenge.completed) {
                <app-button variant="secondary" size="sm">Iniciar</app-button>
              }
            </div>
          </div>
        }
      </div>
    </app-card>
  `
})
export class ChallengesCard {
  readonly challenges = input.required<readonly PracticeChallenge[]>();
}
