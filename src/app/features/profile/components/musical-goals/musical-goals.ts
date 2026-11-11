import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-musical-goals',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
        <mat-icon class="text-[18px]">flag</mat-icon>
        Meus Objetivos
      </h3>
      
      <div class="flex flex-col gap-3">
        @for (goal of profile().goals; track goal.id) {
          <div class="flex items-start gap-3 p-3 rounded-xl bg-bg/50 border border-border/40">
            <div class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
              <mat-icon class="text-[16px]">stars</mat-icon>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-text-primary">{{ goal.title }}</span>
              @if (goal.description) {
                <span class="text-xs text-text-secondary mt-1">{{ goal.description }}</span>
              }
            </div>
          </div>
        }
        @if (profile().goals.length === 0) {
          <p class="text-sm text-text-secondary italic text-center py-4">Nenhum objetivo definido.</p>
        }
      </div>
    </app-card>
  `
})
export class MusicalGoals {
  readonly profile = input.required<StudentProfile>();
}
