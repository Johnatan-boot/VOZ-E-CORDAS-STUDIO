import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export interface RadioOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'app-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="flex flex-col gap-2.5 w-full">
      @if (label()) {
        <legend class="font-sans text-xs font-semibold text-text-secondary mb-1">
          {{ label() }}
        </legend>
      }

      <div [class]="layoutClasses()">
        @for (option of options(); track option.value) {
          <label
            class="flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer select-none group"
            [class.bg-surface-elevated]="value() === option.value"
            [class.bg-surface]="value() !== option.value"
            [class.border-primary]="value() === option.value"
            [class.border-border]="value() !== option.value"
            [class.opacity-50]="disabled() || option.disabled"
            [class.cursor-not-allowed]="disabled() || option.disabled"
            [class.hover:border-primary/40]="!disabled() && !option.disabled"
          >
            <div class="relative flex items-center justify-center mt-0.5">
              <input
                type="radio"
                [name]="groupName()"
                [value]="option.value"
                [checked]="value() === option.value"
                [disabled]="disabled() || option.disabled"
                (change)="handleChange(option.value)"
                class="peer sr-only"
              />

              <!-- Radio Dot Container -->
              <div
                class="w-4 h-4 rounded-full border flex items-center justify-center transition-all bg-surface border-border peer-checked:border-primary group-hover:border-primary/60 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
              >
                @if (value() === option.value) {
                  <div class="w-2 h-2 rounded-full bg-primary animate-scale-in"></div>
                }
              </div>
            </div>

            <div class="flex flex-col">
              <span class="text-sm font-medium text-text-primary leading-tight">
                {{ option.label }}
              </span>
              @if (option.description) {
                <span class="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  {{ option.description }}
                </span>
              }
            </div>
          </label>
        }
      </div>
    </fieldset>
  `,
})
export class AppRadioGroup {
  readonly name = input<string>('');
  readonly label = input<string>('');
  readonly options = input<readonly RadioOption[]>([]);
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly layout = input<'vertical' | 'horizontal' | 'grid'>('vertical');

  readonly valueChange = output<string>();

  private static nextId = 0;
  private readonly autoName = `app-radio-group-${AppRadioGroup.nextId++}`;

  readonly groupName = computed(() => this.name() || this.autoName);

  readonly layoutClasses = computed(() => {
    switch (this.layout()) {
      case 'horizontal': return 'flex flex-row flex-wrap gap-3';
      case 'grid': return 'grid grid-cols-1 sm:grid-cols-2 gap-3';
      default: return 'flex flex-col gap-2';
    }
  });

  handleChange(val: string): void {
    if (!this.disabled()) {
      this.valueChange.emit(val);
    }
  }
}
