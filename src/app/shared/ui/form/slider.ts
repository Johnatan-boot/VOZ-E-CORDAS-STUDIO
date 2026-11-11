import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-2 w-full">
      <div class="flex items-center justify-between">
        @if (label()) {
          <label
            [for]="sliderId()"
            class="font-sans text-xs font-semibold text-text-secondary"
          >
            {{ label() }}
          </label>
        }

        @if (showValue()) {
          <span class="text-xs font-mono font-bold text-accent">
            {{ value() }}{{ unit() }}
          </span>
        }
      </div>

      <div class="relative flex items-center w-full">
        <input
          type="range"
          [id]="sliderId()"
          [min]="min()"
          [max]="max()"
          [step]="step()"
          [value]="value()"
          [disabled]="disabled()"
          [attr.aria-valuemin]="min()"
          [attr.aria-valuemax]="max()"
          [attr.aria-valuenow]="value()"
          [attr.aria-valuetext]="value() + unit()"
          (input)="handleInput($event)"
          class="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      @if (helper()) {
        <p class="font-sans text-xs leading-normal text-text-secondary">
          {{ helper() }}
        </p>
      }
    </div>
  `,
})
export class AppSlider {
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly value = input<number>(0);
  readonly unit = input<string>('');
  readonly showValue = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly helper = input<string>('');

  readonly valueChange = output<number>();

  private static nextId = 0;
  private readonly autoId = `app-slider-${AppSlider.nextId++}`;

  readonly sliderId = computed(() => this.id() || this.autoId);

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(Number(target.value));
  }
}
