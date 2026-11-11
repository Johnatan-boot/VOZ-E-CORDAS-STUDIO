import { ChangeDetectionStrategy, Component, computed, HostListener, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppIconButton } from '../button/icon-button';

export type DrawerSide = 'left' | 'right' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-drawer',
  imports: [MatIconModule, AppIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-labelledby]="title() ? 'drawer-title' : null"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-bg/80 backdrop-blur-xs transition-opacity animate-fade-in"
          (click)="onBackdropClick()"
          aria-hidden="true"
        ></div>

        <!-- Drawer Panel -->
        <div
          class="fixed bg-surface-elevated border-border shadow-2xl flex flex-col z-10 transition-transform duration-300"
          [class]="drawerClasses()"
        >
          <!-- Header -->
          <div class="flex items-center justify-between gap-4 p-6 border-b border-border">
            @if (title()) {
              <h2 id="drawer-title" class="font-serif text-2xl font-bold text-text-primary">
                {{ title() }}
              </h2>
            } @else {
              <div></div>
            }

            <app-icon-button
              icon="close"
              ariaLabel="Fechar painel"
              size="sm"
              variant="secondary"
              (clicked)="closeDrawer.emit()"
            />
          </div>

          <!-- Body Content -->
          <div class="flex-1 overflow-y-auto p-6 scrollbar-none">
            <ng-content />
          </div>

          <!-- Optional Footer -->
          <div class="p-6 border-t border-border bg-surface/50 flex items-center justify-end gap-3 empty:hidden">
            <ng-content select="[drawer-footer]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class AppDrawer {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('');
  readonly side = input<DrawerSide>('right');
  readonly size = input<DrawerSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly closeDrawer = output<void>();

  readonly drawerClasses = computed(() => {
    const side = this.side();
    const size = this.size();

    if (side === 'bottom') {
      return 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border-t animate-slide-up';
    }

    if (side === 'left') {
      const width = size === 'sm' ? 'max-w-xs' : size === 'lg' ? 'max-w-lg' : 'max-w-md';
      return `top-0 bottom-0 left-0 w-full ${width} border-r animate-slide-right`;
    }

    // Default right side
    const width = size === 'sm' ? 'max-w-xs' : size === 'lg' ? 'max-w-lg' : 'max-w-md';
    return `top-0 bottom-0 right-0 w-full ${width} border-l animate-slide-left`;
  });

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (this.isOpen() && this.closeOnEscape()) {
      event.preventDefault();
      this.closeDrawer.emit();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.closeDrawer.emit();
    }
  }
}
