import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppCard, AppBadge, AppProgress } from '../../../../shared/ui';
import { Achievement } from '../../models/gamification.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-achievements-grid',
  imports: [AppCard, AppBadge, AppProgress, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      <h3 class="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
        <mat-icon class="text-primary">emoji_events</mat-icon>
        Conquistas
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (achievement of achievements(); track achievement.id) {
          <app-card 
            variant="elevated" 
            padding="md" 
            class="h-full relative overflow-hidden transition-all duration-300"
            [class.opacity-60]="achievement.status === 'locked'"
            [class.grayscale]="achievement.status === 'locked'"
          >
            <!-- Badge Top Right -->
            <div class="absolute top-4 right-4">
               @if (achievement.status === 'unlocked') {
                 <app-badge variant="success">Desbloqueada</app-badge>
               } @else if (achievement.status === 'inProgress') {
                 <app-badge variant="warning">Em andamento</app-badge>
               } @else {
                 <app-badge variant="default">Bloqueada</app-badge>
               }
            </div>

            <div class="flex items-start gap-4 h-full flex-col">
              <!-- Icon Container -->
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                [class.bg-primary]="achievement.status === 'unlocked'"
                [class.text-bg]="achievement.status === 'unlocked'"
                [class.bg-surface-elevated]="achievement.status !== 'unlocked'"
                [class.text-text-secondary]="achievement.status !== 'unlocked'"
              >
                <mat-icon class="text-[24px]">{{ achievement.icon }}</mat-icon>
              </div>
              
              <!-- Content -->
              <div class="flex-1 w-full flex flex-col gap-2">
                <div>
                  <h4 class="text-base font-bold text-text-primary">{{ achievement.title }}</h4>
                  <p class="text-xs text-text-secondary mt-1 line-clamp-2">{{ achievement.description }}</p>
                </div>
                
                @if (achievement.status === 'inProgress' && achievement.target && achievement.progress !== undefined) {
                  <div class="flex flex-col gap-1 mt-2">
                    <div class="flex justify-between text-[10px] font-medium text-text-secondary">
                      <span>{{ achievement.progress }} / {{ achievement.target }}</span>
                      <span>{{ getPercentage(achievement.progress, achievement.target) }}%</span>
                    </div>
                    <app-progress 
                      [value]="getPercentage(achievement.progress, achievement.target)" 
                      [showPercentage]="false" 
                      variant="warning" 
                      size="sm"
                    />
                  </div>
                }
                
                <div class="flex items-center justify-between mt-auto pt-4">
                   <span class="text-xs font-bold text-primary">+{{ achievement.xpReward }} XP</span>
                   @if (achievement.status === 'unlocked' && achievement.unlockedAt) {
                     <span class="text-[10px] text-text-secondary">{{ achievement.unlockedAt }}</span>
                   }
                </div>
              </div>
            </div>
          </app-card>
        }
      </div>
    </div>
  `
})
export class AchievementsGrid {
  readonly achievements = input.required<readonly Achievement[]>();

  getPercentage(current: number, target: number): number {
    if (target <= 0) return 0;
    return Math.round((current / target) * 100);
  }
}
