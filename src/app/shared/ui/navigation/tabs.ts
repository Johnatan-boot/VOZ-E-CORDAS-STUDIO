import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly badge?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full">
      <!-- Tab List Container -->
      <div
        role="tablist"
        [attr.aria-label]="ariaLabel()"
        class="flex items-center gap-1.5 p-1 bg-surface rounded-2xl border border-border overflow-x-auto scrollbar-none w-full sm:w-auto"
      >
        @for (tab of tabs(); track tab.id) {
          <button
            type="button"
            role="tab"
            [id]="'tab-' + tab.id"
            [attr.aria-selected]="activeTabId() === tab.id"
            [attr.aria-controls]="'tabpanel-' + tab.id"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)"
            [class]="tabButtonClasses(tab.id, tab.disabled)"
          >
            @if (tab.icon) {
              <mat-icon class="text-[18px] leading-none">{{ tab.icon }}</mat-icon>
            }
            <span class="truncate">{{ tab.label }}</span>
            @if (tab.badge) {
              <span
                class="px-2 py-0.5 rounded-full text-[9px] font-semibold transition-colors"
                [class.bg-bg]="activeTabId() === tab.id"
                [class.text-primary]="activeTabId() === tab.id"
                [class.bg-surface-elevated]="activeTabId() !== tab.id"
                [class.text-text-secondary]="activeTabId() !== tab.id"
              >
                {{ tab.badge }}
              </span>
            }
          </button>
        }
      </div>

      <!-- Tab Content Area -->
      <div class="mt-6 w-full">
        <ng-content />
      </div>
    </div>
  `,
})
export class AppTabs {
  readonly tabs = input.required<readonly TabItem[]>();
  readonly activeTabId = input<string>('');
  readonly ariaLabel = input<string>('Abas de navegação');

  readonly tabChange = output<string>();

  tabButtonClasses(tabId: string, disabled?: boolean): string {
    const isActive领取 = this.activeTabId() === tabId;
    const base = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-150 cursor-pointer select-none whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-40 disabled:cursor-not-allowed';

    if (disabled) {
      return `${base} text-text-secondary/50 bg-transparent`;
    }

    if (isActive领取) {
      return `${base} bg-primary text-bg shadow-xs`;
    }

    return `${base} text-text-secondary hover:text-text-primary hover:bg-surface-elevated`;
  }

  selectTab(id: string): void {
    this.tabChange.emit(id);
  }
}
