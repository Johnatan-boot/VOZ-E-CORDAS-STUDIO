import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="badgeClasses()">
      @if (dot()) {
        <span [class]="dotClasses()"></span>
      }
      @if (icon()) {
        <mat-icon class="text-[14px] leading-none">{{ icon() }}</mat-icon>
      }
      <span class="truncate">
        <ng-content />
      </span>
    </span>
  `,
})
export class AppBadge {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize>('md');
  readonly dot = input<boolean>(false);
  readonly icon = input<string | undefined>(undefined);

  readonly badgeClasses = computed(() => {
    const base = 'inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors select-none';

    const sizeClasses: Record<BadgeSize, string> = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-2.5 py-1 text-xs',
    };

    const variantClasses: Record<BadgeVariant, string> = {
      default: 'bg-surface border-border text-text-secondary',
      primary: 'bg-primary/10 border-primary/30 text-primary',
      accent: 'bg-accent/10 border-accent/30 text-accent',
      success: 'bg-success/10 border-success/30 text-success',
      warning: 'bg-warning/10 border-warning/30 text-warning',
      error: 'bg-error/10 border-error/30 text-error',
      info: 'bg-info/10 border-info/30 text-info',
    };

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });

  readonly dotClasses = computed(() => {
    const base = 'w-1.5 h-1.5 rounded-full';
    const variantDots: Record<BadgeVariant, string> = {
      default: 'bg-text-secondary',
      primary: 'bg-primary animate-pulse',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      info: 'bg-info',
    };
    return `${base} ${variantDots[this.variant()]}`;
  });
}
