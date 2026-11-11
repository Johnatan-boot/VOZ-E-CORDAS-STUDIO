import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ProgressVariant = 'primary' | 'accent' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      <!-- Progress Header with Label & Percentage -->
      @if (label() || showPercentage()) {
        <div class="flex items-center justify-between">
          @if (label()) {
            <span class="font-sans text-xs font-semibold text-text-secondary">
              {{ label() }}
            </span>
          }
          @if (showPercentage()) {
            <span class="font-mono text-xs font-bold text-accent">
              {{ percentage() }}%
            </span>
          }
        </div>
      }

      <!-- Progress Track & Fill -->
      <div
        role="progressbar"
        [attr.aria-valuenow]="value()"
        [attr.aria-valuemin]="min()"
        [attr.aria-valuemax]="max()"
        [attr.aria-label]="label() || 'Progresso'"
        [class]="trackClasses()"
      >
        <div
          [class]="fillClasses()"
          [style.width.%]="percentage()"
        ></div>
      </div>
    </div>
  `,
})
export class AppProgress {
  readonly value = input<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>('');
  readonly variant = input<ProgressVariant>('primary');
  readonly size = input<ProgressSize>('md');
  readonly showPercentage = input<boolean>(true);

  readonly percentage = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    const clamped = Math.min(Math.max(this.value(), this.min()), this.max());
    return Math.round(((clamped - this.min()) / range) * 100);
  });

  readonly trackClasses = computed(() => {
    const base = 'w-full bg-surface-elevated rounded-full overflow-hidden border border-border';
    const sizeClasses: Record<ProgressSize, string> = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };
    return `${base} ${sizeClasses[this.size()]}`;
  });

  readonly fillClasses = computed(() => {
    const base = 'h-full rounded-full transition-all duration-300 ease-out';
    const variantClasses: Record<ProgressVariant, string> = {
      primary: 'bg-primary shadow-xs',
      accent: 'bg-accent shadow-xs',
      success: 'bg-success shadow-xs',
      warning: 'bg-warning shadow-xs',
      error: 'bg-error shadow-xs',
    };
    return `${base} ${variantClasses[this.variant()]}`;
  });
}
