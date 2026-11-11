import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-dashed border-border bg-surface-elevated/40 w-full">
      <!-- Empty State Icon Capsule -->
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border text-text-secondary mb-4 shadow-xs">
        <mat-icon class="text-[32px]">{{ icon() }}</mat-icon>
      </div>

      <!-- Title -->
      <h3 class="font-serif text-xl sm:text-2xl font-bold text-text-primary mb-2">
        {{ title() }}
      </h3>

      <!-- Description -->
      @if (description()) {
        <p class="font-sans text-sm text-text-secondary max-w-md mb-6 leading-relaxed">
          {{ description() }}
        </p>
      }

      <!-- Action Button Slot -->
      <div class="flex items-center gap-3">
        <ng-content select="[empty-actions]" />
      </div>
    </div>
  `,
})
export class AppEmptyState {
  readonly icon = input<string>('music_off');
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
