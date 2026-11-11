import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { GuitarChord } from '../../models/guitar.model';

@Component({
  selector: 'app-chord-diagram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center select-none w-full max-w-[120px] pb-2">
      <!-- Title -->
      <div class="flex flex-col items-center mb-2">
        <h3 class="text-3xl font-serif font-bold text-text-primary leading-none">{{ chord()?.name || '--' }}</h3>
      </div>

      <!-- Nut strings status (X, 0) -->
      <div class="flex w-[80px] justify-between items-end mb-1">
        @for (s of stringsAsc(); track s.stringNumber) {
          <span class="text-[10px] font-bold leading-none"
               [class.text-error]="s.status === 'muted'"
               [class.text-text-primary]="s.status === 'open'"
               [class.opacity-0]="s.status === 'played'">
            {{ s.status === 'muted' ? 'X' : (s.status === 'open' ? '0' : 'X') }}
          </span>
        }
      </div>

      <!-- Fretboard Grid Container -->
      <div class="relative w-[80px] h-[96px] flex flex-col">
        <!-- Base Fret indicator (left side) -->
        @if (baseFret() !== 1) {
          <span class="absolute -left-6 top-1 text-xs font-bold text-text-secondary">{{ baseFret() }}&ordf;</span>
        }

        <!-- The Grid -->
        <div class="absolute inset-0 flex flex-col justify-between border-x border-b border-border"
             [class.border-t-4]="baseFret() === 1"
             [class.border-t-text-primary]="baseFret() === 1"
             [class.border-t]="baseFret() !== 1"
             [class.border-t-border]="baseFret() !== 1">
          
          <!-- Frets (Horizontal lines) -->
          @for (f of [1, 2, 3]; track f) {
            <div class="w-full border-b border-border flex-1"></div>
          }
          <!-- bottom gap for the 4th fret -->
          <div class="flex-1"></div>
        </div>

        <!-- Strings (Vertical inner lines) -->
        <div class="absolute inset-0 pointer-events-none">
          @for (s of [5, 4, 3, 2]; track s) {
            <div class="absolute top-0 bottom-0 w-px bg-border"
                 [style.left.px]="(6 - s) * 16"></div>
          }
        </div>

        <!-- Fingers (Dots) -->
        @for (s of stringsAsc(); track s.stringNumber) {
          @if (s.status === 'played' && s.fret !== null) {
            <div class="absolute w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2"
                 [style.left.px]="getStringPositionX(s.stringNumber)"
                 [style.top.px]="getFretPositionY(s.fret)">
              <span class="text-background text-[10px] font-bold">{{ s.finger }}</span>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class ChordDiagram {
  readonly chord = input<GuitarChord | null>(null);

  readonly baseFret = computed(() => this.chord()?.baseFret || 1);

  // Strings ordered from 6 (Low E, Left) to 1 (High E, Right)
  readonly stringsAsc = computed(() => {
    const chord = this.chord();
    if (!chord) return [];
    return [...chord.strings].sort((a, b) => b.stringNumber - a.stringNumber);
  });

  getStringPositionX(stringNumber: number): number {
    const index = 6 - stringNumber; 
    return index * 16;
  }

  getFretPositionY(fret: number): number {
    const relativeFret = fret - this.baseFret() + 1; // 1 to 4
    if (relativeFret <= 0 || relativeFret > 4) return -100;
    return (relativeFret - 1) * 24 + 12; 
  }
}
