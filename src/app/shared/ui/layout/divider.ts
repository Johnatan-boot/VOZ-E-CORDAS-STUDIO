import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (orientation() === 'horizontal') {
      <div class="flex items-center w-full" [class]="spacingClasses()">
        <div class="flex-1 h-[1px] bg-border"></div>
        @if (label()) {
          <span class="px-3 font-sans text-xs font-semibold text-text-secondary/70">
            {{ label() }}
          </span>
          <div class="flex-1 h-[1px] bg-border"></div>
        }
      </div>
    } @else {
      <div class="inline-block w-[1px] self-stretch bg-border" [class]="spacingClasses()"></div>
    }
  `,
})
export class AppDivider {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly spacing = input<DividerSpacing>('md');
  readonly label = input<string>('');

  readonly spacingClasses = computed(() => {
    if (this.orientation() === 'horizontal') {
      switch (this.spacing()) {
        case 'none': return 'my-0';
        case 'sm': return 'my-3';
        case 'lg': return 'my-8';
        default: return 'my-6';
      }
    } else {
      switch (this.spacing()) {
        case 'none': return 'mx-0';
        case 'sm': return 'mx-2';
        case 'lg': return 'mx-6';
        default: return 'mx-4';
      }
    }
  });
}
