import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Chord } from '../../models/chord.model';
import { AppCard, AppBadge } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { ChordDiagram } from '../chord-diagram/chord-diagram';

@Component({
  selector: 'app-chord-card',
  imports: [AppCard, AppBadge, MatIconModule, ChordDiagram],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card 
      variant="elevated" [interactive]="true" 
      padding="md" 
      class="h-full flex flex-col justify-between"
      (click)="selected.emit(chord())"
      role="button"
      tabindex="0"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold text-text-primary">{{ chord().symbol }}</h3>
          <p class="text-xs text-text-secondary mt-1">{{ chord().name }}</p>
        </div>
        <app-badge [variant]="getDifficultyVariant()">{{ chord().difficulty }}</app-badge>
      </div>

      <div class="flex justify-center flex-grow py-2">
        <app-chord-diagram [chord]="chord()" [position]="chord().guitarPositions[0]" />
      </div>

      <div class="mt-4 pt-3 border-t border-border flex flex-wrap gap-1.5">
        @for (note of chord().notes; track $index) {
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface-elevated text-[10px] font-bold text-text-primary">
            {{ note }}
          </span>
        }
      </div>
    </app-card>
  `
})
export class ChordCard {
  readonly chord = input.required<Chord>();
  readonly selected = output<Chord>();

  getDifficultyVariant(): 'success' | 'warning' | 'error' | 'default' {
    switch(this.chord().difficulty) {
      case 'Fácil': return 'success';
      case 'Intermediário': return 'warning';
      case 'Avançado': return 'error';
      default: return 'default';
    }
  }
}
