import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppSpinner } from '../feedback/spinner';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-icon-button',
  imports: [MatIconModule, AppSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [disabled]="disabled() || loading()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="title() || ariaLabel()"
      (click)="handleClick($event)"
      [class]="buttonClasses()"
    >
      @if (loading()) {
        <app-spinner [size]="size() === 'lg' ? 'md' : 'sm'" variant="current" />
      } @else {
        <mat-icon [class]="iconSizeClass()">{{ icon() }}</mat-icon>
      }
    </button>
  `,
})
export class AppIconButton {
  readonly icon = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly variant = input<IconButtonVariant>('secondary');
  readonly size = input<IconButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly title = input<string | undefined>(undefined);

  readonly clicked = output<MouseEvent>();

  readonly buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses: Record<IconButtonSize, string> = {
      sm: 'w-8 h-8 min-w-[32px] min-h-[32px]',
      md: 'w-11 h-11 min-w-[44px] min-h-[44px]', // 44px for touch-target WCAG
      lg: 'w-13 h-13 min-w-[52px] min-h-[52px]',
    };

    const variantClasses: Record<IconButtonVariant, string> = {
      primary: 'bg-primary text-bg border border-transparent hover:bg-primary-hover focus:ring-primary shadow-xs active:scale-95',
      secondary: 'bg-surface-elevated text-text-secondary border border-border hover:text-text-primary hover:bg-surface hover:border-primary/40 focus:ring-text-secondary active:scale-95',
      ghost: 'bg-transparent text-primary border border-primary/40 hover:border-primary hover:bg-primary hover:text-bg focus:ring-primary active:scale-95',
      danger: 'bg-transparent text-error border border-error/40 hover:bg-error hover:text-bg focus:ring-error active:scale-95',
    };

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });

  readonly iconSizeClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'text-[16px]';
      case 'lg': return 'text-[24px]';
      default: return 'text-[20px]';
    }
  });

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
