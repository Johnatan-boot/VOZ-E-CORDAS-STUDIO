import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-flex group">
      <ng-content />

      <!-- Tooltip Bubble -->
      <div
        role="tooltip"
        [class]="tooltipClasses()"
        class="absolute z-40 hidden group-hover:inline-flex group-focus-within:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-sans font-medium text-text-primary bg-surface-elevated border border-border shadow-lg pointer-events-none whitespace-nowrap animate-fade-in"
      >
        {{ text() }}
      </div>
    </div>
  `,
})
export class AppTooltip {
  readonly text = input.required<string>();
  readonly position = input<TooltipPosition>('top');

  readonly tooltipClasses = computed(() => {
    switch (this.position()) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  });
}
