import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkbox',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [for]="checkboxId()"
      class="inline-flex items-start gap-3 select-none cursor-pointer group"
      [class.opacity-50]="disabled()"
      [class.cursor-not-allowed]="disabled()"
    >
      <div class="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          [id]="checkboxId()"
          [checked]="checked()"
          [disabled]="disabled()"
          [required]="required()"
          (change)="handleChange($event)"
          class="peer sr-only"
        />

        <!-- Custom Checkbox Box -->
        <div
          class="w-5 h-5 rounded-md border transition-all duration-150 flex items-center justify-center bg-surface border-border peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg group-hover:border-primary/50"
        >
          @if (checked()) {
            <mat-icon class="text-[16px] text-bg font-bold leading-none">check</mat-icon>
          }
        </div>
      </div>

      <div class="flex flex-col">
        <span class="text-sm font-medium text-text-primary group-hover:text-text-primary/90 leading-tight">
          {{ label() }}
          @if (required()) {
            <span class="text-accent ml-0.5" aria-hidden="true">*</span>
          }
        </span>
        @if (description()) {
          <span class="text-xs text-text-secondary mt-0.5 leading-relaxed">{{ description() }}</span>
        }
      </div>
    </label>
  `,
})
export class AppCheckbox {
  readonly id = input<string>('');
  readonly label = input.required<string>();
  readonly description = input<string>('');
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);

  readonly checkedChange = output<boolean>();

  private static nextId = 0;
  private readonly autoId = `app-checkbox-${AppCheckbox.nextId++}`;

  readonly checkboxId = computed(() => this.id() || this.autoId);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
