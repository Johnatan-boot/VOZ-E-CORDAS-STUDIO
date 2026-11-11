import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge } from '../../../../shared/ui';
import { VocalCategory, VocalExercise } from '../../models/vocal.model';

@Component({
  selector: 'app-vocal-exercise-selector',
  imports: [MatIconModule, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col flex flex-col gap-4">
      <!-- Category Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          (click)="selectedCategory.set('ALL')"
          [class]="selectedCategory() === 'ALL'
            ? 'bg-primary text-black font-semibold shadow-sm'
            : 'bg-surface text-text-secondary hover:text-text-primary border border-border'"
          class="px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer"
        >
          Todos os Exercícios
        </button>

        @for (cat of categories; track cat) {
          <button
            type="button"
            (click)="selectedCategory.set(cat)"
            [class]="selectedCategory() === cat
              ? 'bg-primary text-black font-semibold shadow-sm'
              : 'bg-surface text-text-secondary hover:text-text-primary border border-border'"
            class="px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            {{ cat }}
          </button>
        }
      </div>

      <!-- Exercise Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        @for (ex of filteredExercises(); track ex.id) {
          <div
            (click)="exerciseSelected.emit(ex)"
            (keydown.enter)="exerciseSelected.emit(ex)"
            tabindex="0"
            role="button"
            [class]="activeExercise()?.id === ex.id
              ? 'ring-2 ring-primary border-transparent bg-surface-elevated'
              : 'hover:border-border-focus bg-surface'"
            class="p-4 rounded-xl border border-border transition-all duration-150 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <app-badge [variant]="categoryVariant(ex.category)" size="sm">
                  {{ ex.category }}
                </app-badge>
                <span class="text-[11px] font-mono text-text-secondary">
                  {{ ex.keySignature }} • {{ ex.bpm }} BPM
                </span>
              </div>

              <h4 class="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                {{ ex.title }}
              </h4>

              <p class="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                {{ ex.description }}
              </p>
            </div>

            <!-- Notes preview & tips pill -->
            <div class="flex items-center justify-between mt-3 pt-2 border-t border-border/40 text-[11px] text-text-secondary">
              <div class="flex items-center gap-1 font-mono">
                <mat-icon class="text-[14px] text-primary">music_note</mat-icon>
                <span>{{ ex.notes.length }} notas</span>
              </div>
              <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-background border border-border/80">
                {{ ex.difficulty }}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class VocalExerciseSelector {
  readonly exercises = input.required<readonly VocalExercise[]>();
  readonly activeExercise = input<VocalExercise | null>(null);
  readonly exerciseSelected = output<VocalExercise>();

  readonly categories: VocalCategory[] = ['Aquecimento', 'Afinação', 'Sustentação', 'Agilidade', 'Intervalos'];
  readonly selectedCategory = signal<string>('ALL');

  readonly filteredExercises = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'ALL') {
      return this.exercises();
    }
    return this.exercises().filter((ex) => ex.category === cat);
  });

  categoryVariant(cat: VocalCategory): 'primary' | 'accent' | 'success' | 'warning' | 'default' {
    switch (cat) {
      case 'Aquecimento':
        return 'primary';
      case 'Afinação':
        return 'success';
      case 'Sustentação':
        return 'warning';
      case 'Agilidade':
        return 'accent';
      case 'Intervalos':
        return 'default';
    }
  }
}
