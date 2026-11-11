import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6 w-full">
      <div class="flex flex-col gap-1.5">
        <!-- Category & Icon Badge -->
        <div class="flex items-center gap-2 mb-1">
          @if (icon() || category()) {
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-elevated border border-border/60 text-xs font-semibold text-text-secondary shadow-sm">
              @if (icon()) {
                <mat-icon class="text-[14px] text-primary">{{ icon() }}</mat-icon>
              }
              @if (category()) {
                <span>{{ category() }}</span>
              }
            </div>
          }
          @if (badge()) {
            <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface border border-border/40 text-text-secondary">
              {{ badge() }}
            </span>
          }
        </div>

        <!-- Main Title -->
        <h1 class="font-serif text-3xl sm:text-4xl font-bold leading-tight text-text-primary">
          {{ title() }}
        </h1>

        <!-- Description -->
        @if (description()) {
          <p class="font-sans text-sm leading-relaxed text-text-secondary max-w-2xl mt-0.5">
            {{ description() }}
          </p>
        }
      </div>

      <!-- Action Buttons Slot -->
      <div class="flex items-center gap-3 shrink-0">
        <ng-content select="[page-actions]" />
      </div>
    </header>
  `,
})
export class AppPageHeader {
  readonly title = input.required<string>();
  readonly category = input<string>('');
  readonly description = input<string>('');
  readonly badge = input<string>('');
  readonly icon = input<string>('');
}
