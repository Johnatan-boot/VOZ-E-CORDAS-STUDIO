import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      @if (label()) {
        <label
          [for]="selectId()"
          class="font-sans text-xs font-semibold text-text-secondary flex items-center justify-between"
        >
          <span>
            {{ label() }}
            @if (required()) {
              <span class="text-accent ml-0.5" aria-hidden="true">*</span>
            }
          </span>
        </label>
      }

      <div class="relative flex items-center">
        <select
          [id]="selectId()"
          [value]="value()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-invalid]="!!error()"
          [attr.aria-describedby]="describedById()"
          (change)="handleChange($event)"
          [class]="selectClasses()"
        >
          @if (placeholder()) {
            <option value="" disabled [selected]="!value()">{{ placeholder() }}</option>
          }
          @for (option of options(); track option.value) {
            <option [value]="option.value" [disabled]="option.disabled" class="bg-surface text-text-primary">
              {{ option.label }}
            </option>
          }
        </select>

        <span class="absolute right-3.5 text-text-secondary pointer-events-none flex items-center">
          <mat-icon class="text-[20px]">expand_more</mat-icon>
        </span>
      </div>

      @if (error()) {
        <p [id]="selectId() + '-error'" class="font-sans text-xs leading-normal text-error flex items-center gap-1 mt-0.5">
          <mat-icon class="text-[14px]">error_outline</mat-icon>
          <span>{{ error() }}</span>
        </p>
      } @else if (helper()) {
        <p [id]="selectId() + '-helper'" class="font-sans text-xs leading-normal text-text-secondary mt-0.5">
          {{ helper() }}
        </p>
      }
    </div>
  `,
})
export class AppSelect {
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly options = input<readonly SelectOption[]>([]);
  readonly value = input<string>('');
  readonly helper = input<string>('');
  readonly error = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);

  readonly valueChange = output<string>();

  private static nextId = 0;
  private readonly autoId = `app-select-${AppSelect.nextId++}`;

  readonly selectId = computed(() => this.id() || this.autoId);

  readonly describedById = computed(() => {
    if (this.error()) return `${this.selectId()}-error`;
    if (this.helper()) return `${this.selectId()}-helper`;
    return null;
  });

  readonly selectClasses = computed(() => {
    const base = 'bg-surface border rounded-xl px-4 py-3 pr-10 text-text-primary text-sm font-medium w-full appearance-none transition-all duration-150 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    
    const errorClasses = this.error()
      ? 'border-error focus:border-error focus:ring-error text-error'
      : 'border-border focus:border-primary focus:ring-primary';

    return `${base} ${errorClasses}`;
  });

  handleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value);
  }
}
