import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Chord, GuitarPosition } from '../../models/chord.model';

@Component({
  selector: 'app-chord-diagram',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center select-none">
      <!-- Chord Name & Fret position -->
      <div class="flex justify-between w-[120px] mb-2 px-1">
        <span class="text-sm font-bold text-text-primary">{{ chord().symbol }}</span>
        @if (position().baseFret > 1) {
          <span class="text-xs font-semibold text-text-secondary">{{ position().baseFret }}ª fr</span>
        }
      </div>

      <!-- Diagram SVG -->
      <svg width="120" height="150" viewBox="0 0 120 150" class="overflow-visible">
        <!-- Grid -->
        <g stroke="currentColor" class="text-border" stroke-width="1.5">
          <!-- Nut or Top Fret -->
          <line x1="10" y1="20" x2="110" y2="20" [attr.stroke-width]="position().baseFret === 1 ? 4 : 1.5" class="text-text-primary" />
          
          <!-- Strings -->
          <line x1="10" y1="20" x2="10" y2="140" />
          <line x1="30" y1="20" x2="30" y2="140" />
          <line x1="50" y1="20" x2="50" y2="140" />
          <line x1="70" y1="20" x2="70" y2="140" />
          <line x1="90" y1="20" x2="90" y2="140" />
          <line x1="110" y1="20" x2="110" y2="140" />

          <!-- Frets -->
          <line x1="10" y1="50" x2="110" y2="50" />
          <line x1="10" y1="80" x2="110" y2="80" />
          <line x1="10" y1="110" x2="110" y2="110" />
          <line x1="10" y1="140" x2="110" y2="140" />
        </g>

        <!-- String Indicators (X or O) -->
        @for (fret of position().frets; track $index) {
          @if (fret === -1) {
            <!-- Muted -->
            <path [attr.d]="'M ' + (6 + $index * 20) + ' 6 L ' + (14 + $index * 20) + ' 14 M ' + (14 + $index * 20) + ' 6 L ' + (6 + $index * 20) + ' 14'" stroke="currentColor" class="text-error" stroke-width="2" />
          } @else if (fret === 0) {
            <!-- Open -->
            <circle [attr.cx]="10 + $index * 20" cy="10" r="4" fill="none" stroke="currentColor" class="text-success" stroke-width="1.5" />
          } @else {
            <!-- Fingered Note -->
            <g>
              <circle [attr.cx]="10 + $index * 20" [attr.cy]="5 + fret * 30" r="7" fill="currentColor" class="text-primary" />
              @if (position().fingers && position().fingers![$index] > 0) {
                <text [attr.x]="10 + $index * 20" [attr.cy]="6 + fret * 30" text-anchor="middle" alignment-baseline="middle" class="text-[9px] font-bold fill-bg">{{ position().fingers![$index] }}</text>
              }
            </g>
          }
        }
      </svg>
    </div>
  `
})
export class ChordDiagram {
  readonly chord = input.required<Chord>();
  readonly position = input.required<GuitarPosition>();
}
