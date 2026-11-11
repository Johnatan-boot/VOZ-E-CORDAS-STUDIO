import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard, AppProgress } from '../../../../shared/ui';
import { TrainingTrack } from '../../models/dashboard.model';

@Component({
  selector: 'app-continue-training',
  imports: [RouterLink, MatIconModule, AppBadge, AppButton, AppCard, AppProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="continue-title" class="w-full">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col gap-1.5">
          <span class="inline-flex items-center self-start px-2.5 py-1 rounded-lg bg-surface border border-border/40 text-xs font-semibold text-text-secondary">
            Desenvolvimento Contínuo
          </span>
          <h2 id="continue-title" class="font-serif text-xl sm:text-2xl font-bold text-text-primary">
            Continue Treinando
          </h2>
        </div>
      </div>

      <!-- Training Tracks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        @for (track of tracks(); track track.id) {
          <app-card variant="default" padding="md" [interactive]="true" class="flex flex-col h-full">
            <div class="flex flex-col h-full justify-between gap-5">
              <!-- Card Header with Icon & Category Badge -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3 min-w-0 flex-1">
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface border border-border text-primary shadow-xs shrink-0">
                    <mat-icon class="text-[22px]">{{ track.icon }}</mat-icon>
                  </div>
                  <div class="flex flex-col min-w-0 flex-1">
                    <span class="text-[10px] font-semibold text-text-secondary truncate">
                      {{ track.category }}
                    </span>
                    <h3 class="font-serif text-lg font-bold text-text-primary leading-tight truncate">
                      {{ track.title }}
                    </h3>
                  </div>
                </div>

                <div class="shrink-0">
                  <app-badge [variant]="track.badgeVariant" size="sm">
                    {{ track.badgeText }}
                  </app-badge>
                </div>
              </div>

              <!-- Track Description -->
              <p class="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {{ track.description }}
              </p>

              <!-- Progress & Next Lesson Block -->
              <div class="flex flex-col gap-3 pt-3 border-t border-border">
                <app-progress
                  [value]="track.progress"
                  [label]="'Progresso Geral (' + track.completedLessons + '/' + track.totalLessons + ' aulas)'"
                  [variant]="track.badgeVariant === 'accent' ? 'accent' : 'primary'"
                  size="sm"
                />

                <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border/80 text-text-secondary">
                  <mat-icon class="text-[16px] text-primary shrink-0">play_circle_outline</mat-icon>
                  <div class="flex flex-col min-w-0">
                    <span class="text-[9px] uppercase font-bold tracking-wider text-text-secondary">Próxima Lição</span>
                    <span class="text-xs font-medium text-text-primary truncate">
                      {{ track.currentLesson }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <div class="pt-2">
                <a [routerLink]="track.route" class="block w-full">
                  <app-button
                    variant="secondary"
                    size="sm"
                    icon="arrow_forward"
                    iconPosition="right"
                    [fullWidth]="true"
                    (clicked)="trackClicked.emit(track)"
                  >
                    Continuar Treino
                  </app-button>
                </a>
              </div>
            </div>
          </app-card>
        }
      </div>
    </section>
  `,
})
export class ContinueTraining {
  readonly tracks = input.required<readonly TrainingTrack[]>();
  readonly trackClicked = output<TrainingTrack>();
}
