import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { PracticeMetric } from '../../models/dashboard.model';

@Component({
  selector: 'app-practice-summary',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="summary-title" class="w-full">
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col gap-1.5">
          <span class="inline-flex items-center self-start px-2.5 py-1 rounded-lg bg-surface border border-border/40 text-xs font-semibold text-text-secondary">
            Jornada Musical
          </span>
          <h2 id="summary-title" class="font-serif text-xl sm:text-2xl font-bold text-text-primary">
            Resumo da Sua Prática
          </h2>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-2 gap-4">
        @for (metric of metrics(); track metric.id) {
          <app-card variant="default" padding="sm" class="flex flex-col h-full">
            <div class="flex flex-col h-full justify-between gap-3">
              <!-- Top Row: Icon & Label -->
              <div class="flex items-start justify-between gap-2">
                <span class="font-sans text-[10px] font-semibold text-text-secondary leading-tight break-words">
                  {{ metric.label }}
                </span>
                <div [class]="iconWrapperClasses(metric.variant)">
                  <mat-icon class="text-[18px]">{{ metric.icon }}</mat-icon>
                </div>
              </div>

              <!-- Center: Big Value -->
              <div class="flex items-baseline gap-1.5 my-1">
                <span class="font-serif text-2xl sm:text-3xl font-bold text-text-primary tracking-tight truncate">
                  {{ metric.value }}
                </span>
                @if (metric.unit) {
                  <span class="text-xs font-medium text-text-secondary">
                    {{ metric.unit }}
                  </span>
                }
              </div>

              <!-- Bottom Row: Context Helper -->
              <div class="pt-2 border-t border-border/60">
                <p class="text-[11px] text-text-secondary font-medium break-words leading-tight">
                  {{ metric.helper }}
                </p>
              </div>
            </div>
          </app-card>
        }
      </div>
    </section>
  `,
})
export class PracticeSummary {
  readonly metrics = input.required<readonly PracticeMetric[]>();

  iconWrapperClasses(variant: 'primary' | 'accent' | 'success' | 'warning'): string {
    const base = 'flex h-8 w-8 items-center justify-center rounded-xl border shrink-0';
    switch (variant) {
      case 'primary': return `${base} bg-primary/10 border-primary/25 text-primary`;
      case 'accent': return `${base} bg-accent/10 border-accent/25 text-accent`;
      case 'success': return `${base} bg-success/10 border-success/25 text-success`;
      case 'warning': return `${base} bg-warning/10 border-warning/25 text-warning`;
    }
  }
}
