import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type CardVariant = 'default' | 'elevated' | 'bordered';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cardClasses()'
  },
  template: `
    <!-- Optional Card Header Slot -->
    <ng-content select="[card-header]" />

    <!-- Default Body Content Slot -->
    <ng-content />

    <!-- Optional Card Footer Slot -->
    <ng-content select="[card-footer]" />
  `,
})
export class AppCard {
  readonly variant = input<CardVariant>('default');
  readonly padding = input<CardPadding>('md');
  readonly interactive = input<boolean>(false);

  readonly cardClasses = computed(() => {
    const base = 'block w-full rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col';

    const paddingClasses: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'p-4 sm:p-5',
      md: 'p-6 sm:p-8',
      lg: 'p-8 sm:p-10',
    };

    const variantClasses: Record<CardVariant, string> = {
      default: 'bg-surface-elevated border-border shadow-xs',
      elevated: 'bg-surface border-border shadow-md',
      bordered: 'bg-transparent border-border',
    };

    const interactiveClass = this.interactive()
      ? 'hover:border-primary/50 hover:shadow-md cursor-pointer active:scale-[0.99]'
      : '';

    return `${base} ${paddingClasses[this.padding()]} ${variantClasses[this.variant()]} ${interactiveClass}`;
  });
}
