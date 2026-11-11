import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { INTERVALS_DATA } from '../../data/intervals.data';
import { AppCard, AppBadge } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { GuitarAudioService } from '../../../guitar/services/guitar-audio.service';
import { IntervalReference as IntervalItem } from '../../models/interval.model';

@Component({
  selector: 'app-interval-reference',
  imports: [AppCard, AppBadge, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (interval of intervals; track interval.id) {
          <app-card variant="elevated" padding="md" class="h-full flex flex-col justify-between group">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-bold text-text-primary">{{ interval.name }}</h3>
                <p class="text-xs text-text-secondary mt-1">{{ interval.semitones }} semiton{{ interval.semitones === 1 ? '' : 's' }}</p>
              </div>
              <app-badge variant="default">{{ interval.symbol }}</app-badge>
            </div>
            
            <div class="flex-grow my-2">
              <p class="text-sm text-text-secondary leading-relaxed">{{ interval.description }}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <p class="text-xs font-semibold text-primary">Exemplo: {{ interval.example }}</p>
              <button
                type="button"
                (click)="playInterval(interval)"
                class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all cursor-pointer"
                [class.bg-primary]="activePlayingId() === interval.id"
                [class.text-background]="activePlayingId() === interval.id"
              >
                <mat-icon class="text-[14px]">volume_up</mat-icon>
                <span>Ouvir</span>
              </button>
            </div>
          </app-card>
        }
      </div>
    </div>
  `
})
export class IntervalReference {
  readonly intervals = INTERVALS_DATA;
  private readonly audioService = inject(GuitarAudioService);
  readonly activePlayingId = signal<string | null>(null);

  playInterval(interval: IntervalItem): void {
    this.activePlayingId.set(interval.id);
    // Play base note, then interval note, then both together
    this.audioService.strumNotes(['C4'], 'C4', 0.8);
    setTimeout(() => {
      // Find note name or pitch
      const noteNames = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5'];
      const targetNote = noteNames[Math.min(interval.semitones, noteNames.length - 1)];
      this.audioService.strumNotes([targetNote], targetNote, 1.2);
    }, 600);

    setTimeout(() => {
      this.activePlayingId.set(null);
    }, 1800);
  }
}
