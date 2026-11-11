import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard } from '../../../../shared/ui';
import { PracticeRoutineItem, RoutineStatus } from '../../models/dashboard.model';

@Component({
  selector: 'app-today-practice',
  imports: [MatIconModule, AppBadge, AppButton, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="today-practice-title" class="w-full">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div class="flex flex-col gap-1.5">
          <span class="inline-flex items-center self-start px-2.5 py-1 rounded-lg bg-surface border border-border/40 text-xs font-semibold text-text-secondary">
            Rotina Diária
          </span>
          <h2 id="today-practice-title" class="font-serif text-xl sm:text-2xl font-bold text-text-primary">
            Prática de Hoje
          </h2>
        </div>

        <div class="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <mat-icon class="text-[16px] text-accent">schedule</mat-icon>
          <span>Duração estimada total: <strong class="text-text-primary">50 min</strong></span>
        </div>
      </div>

      <!-- Practice Routine Items List -->
      <div class="flex flex-col gap-3">
        @for (item of routine(); track item.id; let idx = $index) {
          <app-card variant="default" padding="sm" [interactive]="true">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <!-- Left Side: Order Indicator & Main Info -->
              <div class="flex items-start sm:items-center gap-3.5 min-w-0">
                <!-- Index / Status Circle -->
                <div [class]="statusIndicatorClasses(item.status)">
                  @if (item.status === 'completed') {
                    <mat-icon class="text-[18px]">check</mat-icon>
                  } @else {
                    <span class="font-mono text-xs font-bold">{{ idx + 1 }}</span>
                  }
                </div>

                <div class="flex flex-col min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-0.5">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-text-secondary flex items-center gap-1">
                      <mat-icon class="text-[14px] text-primary">{{ item.categoryIcon }}</mat-icon>
                      {{ item.category }}
                    </span>
                    @if (item.keyOrNote) {
                      <span class="text-text-secondary/40">•</span>
                      <span class="text-[10px] font-mono text-accent">{{ item.keyOrNote }}</span>
                    }
                  </div>

                  <h3 class="font-sans text-sm sm:text-base font-bold text-text-primary truncate">
                    {{ item.title }}
                  </h3>
                </div>
              </div>

              <!-- Right Side: Duration, Badge & Action -->
              <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                <!-- Duration -->
                <div class="flex items-center gap-1 text-xs text-text-secondary font-mono">
                  <mat-icon class="text-[14px]">timer</mat-icon>
                  <span>{{ item.durationMinutes }} min</span>
                </div>

                <!-- Status Badge -->
                <app-badge [variant]="statusBadgeVariant(item.status)" size="sm">
                  {{ statusLabel(item.status) }}
                </app-badge>

                <!-- Action Button -->
                <div>
                  @if (item.status === 'completed') {
                    <app-button
                      variant="ghost"
                      size="sm"
                      icon="replay"
                      (clicked)="itemAction.emit(item)"
                    >
                      Rever
                    </app-button>
                  } @else if (item.status === 'in_progress') {
                    <app-button
                      variant="primary"
                      size="sm"
                      icon="play_arrow"
                      (clicked)="itemAction.emit(item)"
                    >
                      Continuar
                    </app-button>
                  } @else {
                    <app-button
                      variant="secondary"
                      size="sm"
                      icon="play_arrow"
                      (clicked)="itemAction.emit(item)"
                    >
                      Iniciar
                    </app-button>
                  }
                </div>
              </div>
            </div>
          </app-card>
        }
      </div>
    </section>
  `,
})
export class TodayPractice {
  readonly routine = input.required<readonly PracticeRoutineItem[]>();
  readonly itemAction = output<PracticeRoutineItem>();

  statusIndicatorClasses(status: RoutineStatus): string {
    const base = 'flex h-8 w-8 items-center justify-center rounded-xl border shrink-0 transition-colors';
    switch (status) {
      case 'completed': return `${base} bg-success/20 border-success/40 text-success`;
      case 'in_progress': return `${base} bg-primary/20 border-primary text-primary animate-pulse`;
      case 'recommended': return `${base} bg-accent/15 border-accent/30 text-accent`;
      default: return `${base} bg-surface border-border text-text-secondary`;
    }
  }

  statusBadgeVariant(status: RoutineStatus): 'success' | 'primary' | 'warning' | 'default' {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'recommended': return 'warning';
      default: return 'default';
    }
  }

  statusLabel(status: RoutineStatus): string {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em Andamento';
      case 'recommended': return 'Recomendado';
      default: return 'Pendente';
    }
  }
}
