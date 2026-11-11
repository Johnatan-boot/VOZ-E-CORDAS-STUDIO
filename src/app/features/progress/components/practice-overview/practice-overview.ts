import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { ProgressSummary } from '../../models/progress.model';

@Component({
  selector: 'app-practice-overview',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <app-card variant="elevated" padding="md" class="flex flex-col items-center justify-center text-center">
        <mat-icon class="text-primary mb-2 text-[24px]">schedule</mat-icon>
        <h3 class="text-2xl font-serif font-bold text-text-primary">{{ summary().totalTime }}</h3>
        <span class="text-xs font-semibold text-text-secondary mt-1">Tempo de Prática</span>
      </app-card>
      
      <app-card variant="elevated" padding="md" class="flex flex-col items-center justify-center text-center">
        <mat-icon class="text-accent mb-2 text-[24px]">check_circle_outline</mat-icon>
        <h3 class="text-2xl font-serif font-bold text-text-primary">{{ summary().totalSessions }}</h3>
        <span class="text-xs font-semibold text-text-secondary mt-1">Sessões Concluídas</span>
      </app-card>

      <app-card variant="elevated" padding="md" class="flex flex-col items-center justify-center text-center">
        <mat-icon class="text-success mb-2 text-[24px]">library_music</mat-icon>
        <h3 class="text-2xl font-serif font-bold text-text-primary">{{ summary().completedExercises }}</h3>
        <span class="text-xs font-semibold text-text-secondary mt-1">Exercícios</span>
      </app-card>

      <app-card variant="elevated" padding="md" class="flex flex-col items-center justify-center text-center">
        <mat-icon class="text-warning mb-2 text-[24px]">local_fire_department</mat-icon>
        <h3 class="text-2xl font-serif font-bold text-text-primary">{{ summary().currentStreak }}</h3>
        <span class="text-xs font-semibold text-text-secondary mt-1">Sequência Atual</span>
      </app-card>
    </div>
  `
})
export class PracticeOverview {
  readonly summary = input.required<ProgressSummary>();
}
