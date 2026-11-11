import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppCard, AppProgress, AppBadge } from '../../../../shared/ui';
import { MusicalGoal } from '../../models/gamification.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-goals-card',
  imports: [AppCard, AppProgress, AppBadge, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-semibold text-text-secondary flex items-center gap-2">
          <mat-icon class="text-[18px]">track_changes</mat-icon>
          Metas Musicais
        </h3>
      </div>
      
      <div class="flex flex-col gap-6">
        @for (goal of goals(); track goal.id) {
          <div class="flex flex-col gap-2">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h4 class="text-sm font-bold text-text-primary">{{ goal.title }}</h4>
                <p class="text-xs text-text-secondary">{{ goal.description }}</p>
              </div>
              @if (goal.completed) {
                <app-badge variant="success">Concluída</app-badge>
              } @else {
                <span class="text-xs font-medium text-text-secondary whitespace-nowrap">
                  {{ goal.current }} / {{ goal.target }} {{ goal.unit }}
                </span>
              }
            </div>
            
            <app-progress 
              [value]="goal.progressPercentage" 
              [showPercentage]="true" 
              [variant]="goal.completed ? 'success' : 'primary'" 
              size="sm"
            />
          </div>
        }
      </div>
    </app-card>
  `
})
export class GoalsCard {
  readonly goals = input.required<readonly MusicalGoal[]>();
}
