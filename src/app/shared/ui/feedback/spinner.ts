import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'accent' | 'current' | 'white';

@Component({
  selector: 'app-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [class]="spinnerClasses()"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      [attr.aria-label]="ariaLabel()"
      role="status"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  `,
})
export class AppSpinner {
  readonly size = input<SpinnerSize>('md');
  readonly variant = input<SpinnerVariant>('primary');
  readonly ariaLabel = input<string>('Carregando...');

  readonly spinnerClasses = computed(() => {
    const base = 'animate-spin inline-block';

    const sizeClasses: Record<SpinnerSize, string> = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-8 h-8',
    };

    const variantClasses: Record<SpinnerVariant, string> = {
      primary: 'text-primary',
      accent: 'text-accent',
      current: 'text-current',
      white: 'text-text-primary',
    };

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });
}
