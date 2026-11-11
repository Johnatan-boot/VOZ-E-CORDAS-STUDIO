import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge } from '../../../../shared/ui';
import { DetectedNote, TuningStatus } from '../../models/tuner.model';

@Component({
  selector: 'app-tuner-display',
  imports: [DecimalPipe, MatIconModule, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center text-center select-none w-full">
      
      <!-- Status Badge / Feedback -->
      <div class="mb-4">
        <app-badge [variant]="badgeVariant()" size="md" [dot]="hasSignal()">
          {{ statusLabel() }}
        </app-badge>
      </div>

      <!-- Main Note Visual & Octave Container -->
      <div class="relative flex items-center justify-center mt-2 mb-0 h-[120px]">
        @if (hasSignal() && note(); as n) {
          <div class="relative flex items-baseline justify-center">
            <!-- Large Note Name (Display Font) -->
            <span
              [class]="noteColorClasses()"
              class="font-serif text-[120px] leading-none font-bold tracking-tight transition-all duration-150 drop-shadow-sm"
            >
              {{ n.name }}
            </span>
            <!-- Octave Subscript/Superscript -->
            <span
              [class]="octaveColorClasses()"
              class="font-mono text-3xl font-bold ml-1 transition-all duration-150"
            >
              {{ n.octave }}
            </span>
          </div>
        } @else {
          <!-- Empty / Awaiting State Placeholder -->
          <div class="flex items-baseline justify-center text-text-secondary/20">
            <span class="font-serif text-[120px] leading-none font-bold tracking-tight">
              --
            </span>
          </div>
        }
      </div>

      <div class="w-full">
         <ng-content></ng-content>
      </div>

      <!-- Musical Metrics: Frequency & Cents -->
      <div class="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-border/40 w-full max-w-sm">
        <!-- Frequency -->
        <div class="flex flex-col items-center">
          <span class="text-[11px] font-semibold text-text-secondary uppercase tracking-widest">
            Frequência
          </span>
          <div class="flex items-baseline gap-1 mt-1">
            <span class="font-mono text-xl font-bold text-text-primary">
              {{ hasSignal() ? (frequency() | number: '1.1-1') : '--' }}
            </span>
            <span class="text-xs font-medium text-text-secondary">Hz</span>
          </div>
        </div>

        <div class="h-8 w-px bg-border/60"></div>

        <!-- Cents Deviation -->
        <div class="flex flex-col items-center">
          <span class="text-[11px] font-semibold text-text-secondary uppercase tracking-widest">
            Desvio
          </span>
          <div class="flex items-baseline gap-1 mt-1">
            <span
              [class]="centsColorClasses()"
              class="font-mono text-xl font-bold"
            >
              {{ centsDisplay() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Hidden Accessible Announcement for Screen Readers -->
      <div class="sr-only" aria-live="polite" aria-atomic="true">
        @if (hasSignal() && note(); as n) {
          Nota {{ n.name }}, Oitava {{ n.octave }}, {{ frequency() }} Hertz, {{ statusLabel() }}
        } @else {
          Nenhum sinal musical detectado no momento.
        }
      </div>
    </div>
  `,
})
export class TunerDisplay {
  readonly note = input<DetectedNote | null>(null);
  readonly frequency = input<number>(0);
  readonly cents = input<number>(0);
  readonly status = input<TuningStatus>('unknown');

  readonly hasSignal = computed(() => this.status() !== 'unknown' && this.note() !== null);

  readonly statusLabel = computed(() => {
    switch (this.status()) {
      case 'tuned':
        return 'AFINADO (PERFEITO)';
      case 'flat':
        return `GRAVE (${this.cents()}¢)`;
      case 'sharp':
        return `AGUDO (+${this.cents()}¢)`;
      default:
        return 'AGUARDANDO SINAL...';
    }
  });

  readonly badgeVariant = computed(() => {
    switch (this.status()) {
      case 'tuned':
        return 'success' as const;
      case 'flat':
        return 'primary' as const;
      case 'sharp':
        return 'accent' as const;
      default:
        return 'default' as const;
    }
  });

  readonly noteColorClasses = computed(() => {
    switch (this.status()) {
      case 'tuned':
        return 'text-success drop-shadow-[0_0_20px_rgba(74,222,128,0.25)]';
      case 'flat':
        return 'text-primary';
      case 'sharp':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  });

  readonly octaveColorClasses = computed(() => {
    switch (this.status()) {
      case 'tuned':
        return 'text-success/90';
      case 'flat':
        return 'text-primary/90';
      case 'sharp':
        return 'text-accent/90';
      default:
        return 'text-text-secondary/60';
    }
  });

  readonly centsColorClasses = computed(() => {
    switch (this.status()) {
      case 'tuned':
        return 'text-success';
      case 'flat':
        return 'text-primary';
      case 'sharp':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  });

  readonly centsDisplay = computed(() => {
    if (!this.hasSignal()) {
      return '--';
    }
    const c = this.cents();
    return c > 0 ? `+${c}¢` : `${c}¢`;
  });
}
