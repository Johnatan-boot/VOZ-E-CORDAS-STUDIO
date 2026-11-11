import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard } from '../../../../shared/ui';
import { DuoExercise } from '../../models/duo.model';

@Component({
  selector: 'app-duo-exercise-card',
  imports: [MatIconModule, AppBadge, AppButton, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full flex flex-col group cursor-pointer hover:border-accent transition-colors" (click)="selected.emit(exercise())">
      <div class="flex items-center justify-between mb-3">
        <app-badge variant="default" size="sm">{{ exercise().category }}</app-badge>
        
        <div class="flex items-center gap-1 text-text-secondary text-xs font-bold">
          <mat-icon class="text-[14px]">schedule</mat-icon>
          {{ exercise().durationMinutes }} min
        </div>
      </div>
      
      <h3 class="text-xl font-serif font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
        {{ exercise().title }}
      </h3>
      
      <p class="text-sm text-text-secondary mb-4 flex-1 line-clamp-2">
        {{ exercise().description }}
      </p>
      
      <div class="flex flex-col flex flex-col gap-2 mt-auto bg-surface p-3 rounded-lg border border-border/40">
        <div class="flex items-center justify-between text-xs">
          <span class="text-text-secondary">Dificuldade</span>
          <span class="font-bold text-text-primary">{{ exercise().difficulty }}</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-text-secondary">Foco</span>
          <span class="font-bold text-text-primary truncate ml-2">{{ exercise().focus }}</span>
        </div>
      </div>
      
      <div class="mt-4">
        <app-button variant="primary" size="md" class="w-full" (clicked)="selected.emit(exercise())" (keydown.enter)="selected.emit(exercise())" tabindex="0">
          Iniciar treino
        </app-button>
      </div>
    </app-card>
  `
})
export class DuoExerciseCard {
  readonly exercise = input.required<DuoExercise>();
  readonly selected = output<DuoExercise>();
}
