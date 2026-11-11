import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

@Component({
  selector: 'app-input',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      @if (label()) {
        <label
          [for]="inputId()"
          class="font-sans text-xs font-semibold text-text-secondary flex items-center justify-between"
        >
          <span>
            {{ label() }}
            @if (required()) {
              <span class="text-accent ml-0.5" aria-hidden="true">*</span>
            }
          </span>
          @if (optionalText()) {
            <span class="text-[9px] lowercase font-normal text-text-secondary/70">{{ optionalText() }}</span>
          }
        </label>
      }

      <div class="relative flex items-center">
        @if (icon() && iconPosition() === 'left') {
          <span class="absolute left-3.5 text-text-secondary pointer-events-none flex items-center">
            <mat-icon class="text-[18px]">{{ icon() }}</mat-icon>
          </span>
        }

        <input
          [id]="inputId()"
          [type]="type()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [readOnly]="readonly()"
          [required]="required()"
          [attr.aria-invalid]="!!error()"
          [attr.aria-describedby]="describedById()"
          (input)="handleInput($event)"
          (blur)="blurred.emit()"
          (focus)="focused.emit()"
          [class]="inputClasses()"
        />

        @if (icon() && iconPosition() === 'right') {
          <span class="absolute right-3.5 text-text-secondary pointer-events-none flex items-center">
            <mat-icon class="text-[18px]">{{ icon() }}</mat-icon>
          </span>
        }
      </div>

      @if (error()) {
        <p [id]="inputId() + '-error'" class="font-sans text-xs leading-normal text-error flex items-center gap-1 mt-0.5">
          <mat-icon class="text-[14px]">error_outline</mat-icon>
          <span>{{ error() }}</span>
        </p>
      } @else if (helper()) {
        <p [id]="inputId() + '-helper'" class="font-sans text-xs leading-normal text-text-secondary mt-0.5">
          {{ helper() }}
        </p>
      }
    </div>
  `,
})
export class AppInput {
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly helper = input<string>('');
  readonly error = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly optionalText = input<string>('');
  readonly icon = input<string | undefined>(undefined);
  readonly iconPosition = input<'left' | 'right'>('left');

  readonly valueChange = output<string>();
  readonly blurred = output<void>();
  readonly focused = output<void>();

  private static nextId = 0;
  private readonly autoId = `app-input-${AppInput.nextId++}`;

  readonly inputId = computed(() => this.id() || this.autoId);

  readonly describedById = computed(() => {
    if (this.error()) return `${this.inputId()}-error`;
    if (this.helper()) return `${this.inputId()}-helper`;
    return null;
  });

  readonly inputClasses = computed(() => {
    const base = 'bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm font-medium w-full transition-all duration-150 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-border';
    
    const errorClasses = this.error()
      ? 'border-error focus:border-error focus:ring-error text-error placeholder:text-error/40'
      : 'border-border focus:border-primary focus:ring-primary';

    const paddingLeft = this.icon() && this.iconPosition() === 'left' ? 'pl-10' : '';
    const paddingRight = this.icon() && this.iconPosition() === 'right' ? 'pr-10' : '';

    return `${base} ${errorClasses} ${paddingLeft} ${paddingRight}`;
  });

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
