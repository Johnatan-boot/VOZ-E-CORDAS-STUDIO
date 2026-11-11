import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppSpinner } from '../feedback/spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [MatIconModule, AppSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-busy]="loading()"
      (click)="handleClick($event)"
      [class]="buttonClasses()"
    >
      @if (loading()) {
        <app-spinner [size]="size() === 'lg' ? 'md' : 'sm'" variant="current" />
      } @else if (icon() && iconPosition() === 'left') {
        <mat-icon [class]="iconSizeClass()">{{ icon() }}</mat-icon>
      }

      <span class="truncate">
        <ng-content />
      </span>

      @if (!loading() && icon() && iconPosition() === 'right') {
        <mat-icon [class]="iconSizeClass()">{{ icon() }}</mat-icon>
      }
    </button>
  `,
})
export class AppButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly icon = input<string | undefined>(undefined);
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly fullWidth = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly clicked = output<MouseEvent>();

  readonly buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 rounded-lg text-xs gap-1.5 min-h-[36px]',
      md: 'px-6 py-3 rounded-xl text-sm gap-2 min-h-[44px]',
      lg: 'px-8 py-4 rounded-xl text-base gap-2.5 min-h-[52px]',
    };

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-bg border border-transparent hover:bg-primary-hover focus:ring-primary shadow-xs hover:shadow-sm active:scale-[0.98]',
      secondary: 'bg-surface-elevated text-text-primary border border-border hover:bg-surface hover:border-primary/40 focus:ring-text-secondary active:scale-[0.98]',
      ghost: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-bg focus:ring-primary shadow-xs hover:shadow-sm active:scale-[0.98]',
      danger: 'bg-transparent text-error border border-error hover:bg-error hover:text-bg focus:ring-error active:scale-[0.98]',
    };

    const widthClass = this.fullWidth() ? 'w-full' : '';

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${widthClass}`;
  });

  readonly iconSizeClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'text-[16px]';
      case 'lg': return 'text-[22px]';
      default: return 'text-[18px]';
    }
  });

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
