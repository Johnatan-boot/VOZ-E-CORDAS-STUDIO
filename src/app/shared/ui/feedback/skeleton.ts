import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="skeletonClasses()"
      aria-hidden="true"
    ></div>
  `,
})
export class AppSkeleton {
  readonly className = input<string>('h-4 w-full');
  readonly rounded = input<SkeletonRounded>('md');

  readonly skeletonClasses = computed(() => {
    const base = 'animate-pulse bg-surface-elevated/70 border border-border/30';
    const roundedClasses: Record<SkeletonRounded, string> = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    };
    return `${base} ${roundedClasses[this.rounded()]} ${this.className()}`;
  });
}
