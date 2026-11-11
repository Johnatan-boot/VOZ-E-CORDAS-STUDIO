import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface DropdownItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly danger?: boolean;
  readonly disabled?: boolean;
  readonly dividerAbove?: boolean;
}

@Component({
  selector: 'app-dropdown',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-block text-left">
      <!-- Trigger Button Slot or Default Trigger -->
      <button
        type="button"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        (click)="toggleOpen()"
        class="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-surface-elevated text-text-primary border border-border hover:bg-surface hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary select-none cursor-pointer"
      >
        @if (icon()) {
          <mat-icon class="text-[18px] text-text-secondary">{{ icon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
        <mat-icon class="text-[16px] text-text-secondary transition-transform duration-200" [class.rotate-180]="isOpen()">
          expand_more
        </mat-icon>
      </button>

      <!-- Dropdown Menu Popover -->
      @if (isOpen()) {
        <div
          role="menu"
          class="absolute z-50 mt-2 w-56 rounded-2xl bg-surface-elevated border border-border shadow-xl p-1.5 focus:outline-none animate-scale-in"
          [class.right-0]="align() === 'right'"
          [class.left-0]="align() === 'left'"
        >
          @for (item of items(); track item.id) {
            @if (item.dividerAbove) {
              <div class="h-[1px] bg-border my-1"></div>
            }

            <button
              type="button"
              role="menuitem"
              [disabled]="item.disabled"
              (click)="onSelect(item.id)"
              class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors select-none text-left cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              [class.text-error]="item.danger"
              [class.hover:bg-error/10]="item.danger"
              [class.text-text-primary]="!item.danger"
              [class.hover:bg-surface]="!item.danger"
              [class.hover:text-primary]="!item.danger"
            >
              @if (item.icon) {
                <mat-icon class="text-[16px] text-current">{{ item.icon }}</mat-icon>
              }
              <span class="truncate flex-1">{{ item.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class AppDropdown {
  private readonly elementRef = inject(ElementRef);

  readonly label = input<string>('Opções');
  readonly icon = input<string | undefined>(undefined);
  readonly items = input<readonly DropdownItem[]>([]);
  readonly align = input<'left' | 'right'>('right');

  readonly itemSelect = output<string>();

  readonly isOpen = signal<boolean>(false);

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  onSelect(itemId: string): void {
    this.itemSelect.emit(itemId);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpen.set(false);
  }
}
