import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [for]="switchId()"
      class="inline-flex items-center justify-between gap-4 w-full select-none cursor-pointer group"
      [class.opacity-50]="disabled()"
      [class.cursor-not-allowed]="disabled()"
    >
      <div class="flex flex-col">
        <span class="text-sm font-medium text-text-primary group-hover:text-text-primary/90 leading-tight">
          {{ label() }}
        </span>
        @if (description()) {
          <span class="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {{ description() }}
          </span>
        }
      </div>

      <div class="relative inline-flex items-center">
        <input
          type="checkbox"
          role="switch"
          [id]="switchId()"
          [checked]="checked()"
          [disabled]="disabled()"
          [attr.aria-checked]="checked()"
          (change)="handleChange($event)"
          class="peer sr-only"
        />

        <!-- Switch Track -->
        <div
          class="w-11 h-6 bg-surface-elevated border border-border rounded-full peer peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg group-hover:border-primary/40"
        ></div>

        <!-- Switch Knob -->
        <div
          class="absolute left-1 top-1 bg-text-primary w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5 peer-checked:bg-bg"
        ></div>
      </div>
    </label>
  `,
})
export class AppSwitch {
  readonly id = input<string>('');
  readonly label = input.required<string>();
  readonly description = input<string>('');
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly checkedChange = output<boolean>();

  private static nextId = 0;
  private readonly autoId = `app-switch-${AppSwitch.nextId++}`;

  readonly switchId = computed(() => this.id() || this.autoId);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
