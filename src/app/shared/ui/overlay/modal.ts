import { ChangeDetectionStrategy, Component, computed, HostListener, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppIconButton } from '../button/icon-button';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-modal',
  imports: [MatIconModule, AppIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-labelledby]="title() ? 'modal-title' : null"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-bg/80 backdrop-blur-xs transition-opacity animate-fade-in"
          (click)="onBackdropClick()"
          aria-hidden="true"
        ></div>

        <!-- Modal Container -->
        <div
          class="relative w-full rounded-3xl bg-surface-elevated border border-border shadow-2xl p-6 sm:p-8 z-10 my-auto overflow-hidden animate-scale-in"
          [class]="sizeClass()"
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 pb-4 border-b border-border mb-6">
            <div class="flex flex-col">
              @if (title()) {
                <h2 id="modal-title" class="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
                  {{ title() }}
                </h2>
              }
              @if (subtitle()) {
                <p class="font-sans text-xs text-text-secondary mt-1">
                  {{ subtitle() }}
                </p>
              }
            </div>

            <app-icon-button
              icon="close"
              ariaLabel="Fechar janela"
              size="sm"
              variant="secondary"
              (clicked)="closeModal.emit()"
            />
          </div>

          <!-- Body Content -->
          <div class="max-h-[60vh] overflow-y-auto scrollbar-none pr-1">
            <ng-content />
          </div>

          <!-- Optional Footer -->
          <div class="mt-6 pt-4 border-t border-border flex items-center justify-end gap-3 empty:hidden">
            <ng-content select="[modal-footer]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class AppModal {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly size = input<ModalSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly closeModal = output<void>();

  readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'max-w-md';
      case 'lg': return 'max-w-3xl';
      case 'xl': return 'max-w-5xl';
      default: return 'max-w-xl';
    }
  });

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (this.isOpen() && this.closeOnEscape()) {
      event.preventDefault();
      this.closeModal.emit();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.closeModal.emit();
    }
  }
}
