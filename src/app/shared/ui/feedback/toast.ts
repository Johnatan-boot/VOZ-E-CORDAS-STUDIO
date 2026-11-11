import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      role="alert"
      [class]="toastClasses()"
      class="flex items-start gap-3 p-4 rounded-2xl border shadow-lg transition-all duration-200"
    >
      <div [class]="iconWrapperClasses()">
        <mat-icon class="text-[18px]">{{ variantIcon() }}</mat-icon>
      </div>

      <div class="flex flex-col flex-1">
        @if (title()) {
          <span class="text-sm font-semibold text-text-primary mb-0.5">
            {{ title() }}
          </span>
        }
        <span class="text-sm font-medium text-text-primary/90 leading-relaxed">
          {{ message() }}
        </span>
      </div>

      @if (dismissible()) {
        <button
          type="button"
          (click)="dismiss.emit()"
          class="text-text-secondary hover:text-text-primary p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Fechar notificação"
        >
          <mat-icon class="text-[16px]">close</mat-icon>
        </button>
      }
    </div>
  `,
})
export class AppToast {
  readonly variant = input<ToastVariant>('info');
  readonly title = input<string>('');
  readonly message = input.required<string>();
  readonly dismissible = input<boolean>(true);

  readonly dismiss = output<void>();

  readonly variantIcon = computed(() => {
    switch (this.variant()) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  });

  readonly toastClasses = computed(() => {
    switch (this.variant()) {
      case 'success': return 'bg-surface-elevated border-success/30';
      case 'warning': return 'bg-surface-elevated border-warning/30';
      case 'error': return 'bg-surface-elevated border-error/30';
      default: return 'bg-surface-elevated border-info/30';
    }
  });

  readonly iconWrapperClasses = computed(() => {
    const base = 'flex h-7 w-7 items-center justify-center rounded-lg border shrink-0 mt-0.5';
    switch (this.variant()) {
      case 'success': return `${base} bg-success/15 border-success/30 text-success`;
      case 'warning': return `${base} bg-warning/15 border-warning/30 text-warning`;
      case 'error': return `${base} bg-error/15 border-error/30 text-error`;
      default: return `${base} bg-info/15 border-info/30 text-info`;
    }
  });
}
