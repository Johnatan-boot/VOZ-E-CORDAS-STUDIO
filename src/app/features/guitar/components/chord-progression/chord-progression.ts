import { ChangeDetectionStrategy, Component, input, output, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton } from '../../../../shared/ui';
import { ChordProgressionExercise, GuitarChord } from '../../models/guitar.model';
import { ChordDiagram } from '../chord-diagram/chord-diagram';
import { GuitarAudioService } from '../../services/guitar-audio.service';

@Component({
  selector: 'app-chord-progression',
  imports: [MatIconModule, AppBadge, AppButton, ChordDiagram],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-text-primary">Progressão: {{ exercise()?.title || '--' }}</h3>
        @if (exercise(); as ex) {
          <app-badge [variant]="difficultyVariant(ex.difficulty)" size="sm">
            {{ ex.difficulty }}
          </app-badge>
        }
      </div>

      <p class="text-xs text-text-secondary mb-6 leading-relaxed">
        {{ exercise()?.description || 'Selecione um exercício para ver os detalhes.' }}
      </p>

      @if (exercise(); as ex) {
        <div class="flex items-center justify-between mb-6 p-4 rounded-xl bg-surface-elevated border border-border/80">
          <div class="flex items-center gap-2">
            <mat-icon class="text-[16px] text-text-secondary">music_note</mat-icon>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-text-primary">Padrão Rítmico Sugerido</span>
              <span class="text-sm font-mono text-primary font-bold">{{ ex.suggestedStrummingPattern || 'Livre' }}</span>
            </div>
          </div>
          <button
            type="button"
            (click)="playFullProgression()"
            [disabled]="isPlayingProgression()"
            class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <mat-icon class="text-[16px]">{{ isPlayingProgression() ? 'graphic_eq' : 'play_arrow' }}</mat-icon>
            <span>{{ isPlayingProgression() ? 'Tocando...' : 'Ouvir Sequência' }}</span>
          </button>
        </div>
      }

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full justify-items-center mb-8">
        @for (chordId of exercise()?.chords || []; track $index) {
          @let chord = getChordDetails(chordId);
          <button 
            type="button"
            class="flex flex-col items-center w-full p-3 rounded-xl border transition-all cursor-pointer group text-left"
            [class]="activeChordIndex() === $index 
              ? 'border-primary bg-primary/10 shadow-md scale-102' 
              : 'border-border/60 bg-surface hover:border-primary/50 hover:bg-surface-elevated'"
            (click)="strumChordAt(chord, $index)"
          >
            <div class="flex items-center justify-between w-full mb-2">
              <div class="flex items-center justify-center w-6 h-6 rounded-full bg-background border border-border text-[10px] font-bold text-text-secondary">
                {{ $index + 1 }}
              </div>
              <span class="text-[10px] font-bold text-primary group-hover:underline flex items-center gap-0.5">
                <mat-icon class="text-[12px]">volume_up</mat-icon>
                Tocar
              </span>
            </div>
            <app-chord-diagram [chord]="chord" />
          </button>
        }
      </div>

      <div class="flex items-center justify-center gap-3 mt-4">
        <app-button variant="secondary" size="md" icon="refresh" (clicked)="changeProgression.emit()">
          Trocar Exercício
        </app-button>
      </div>
    </div>
  `
})
export class ChordProgression {
  readonly exercise = input<ChordProgressionExercise | null>(null);
  readonly allChords = input.required<readonly GuitarChord[]>();
  readonly changeProgression = output<void>();

  private readonly audioService = inject(GuitarAudioService);
  readonly activeChordIndex = signal<number | null>(null);
  readonly isPlayingProgression = signal<boolean>(false);

  strumChordAt(chord: GuitarChord | null, index: number): void {
    if (!chord) return;
    this.activeChordIndex.set(index);
    this.audioService.strumChord(chord, 35, 1.8);
    setTimeout(() => {
      if (this.activeChordIndex() === index) {
        this.activeChordIndex.set(null);
      }
    }, 1800);
  }

  playFullProgression(): void {
    const chordsList = this.exercise()?.chords;
    if (!chordsList || chordsList.length === 0 || this.isPlayingProgression()) return;

    this.isPlayingProgression.set(true);
    let step = 0;

    const playStep = () => {
      if (step >= chordsList.length) {
        this.isPlayingProgression.set(false);
        this.activeChordIndex.set(null);
        return;
      }

      const chord = this.getChordDetails(chordsList[step]);
      if (chord) {
        this.activeChordIndex.set(step);
        this.audioService.strumChord(chord, 30, 1.4);
      }

      step++;
      setTimeout(playStep, 1500);
    };

    playStep();
  }

  getChordDetails(chordId: string): GuitarChord | null {
    return this.allChords().find(c => c.id === chordId) || null;
  }

  difficultyVariant(diff: string): 'success' | 'warning' | 'accent' | 'default' {
    switch (diff) {
      case 'Iniciante': return 'success';
      case 'Intermediário': return 'warning';
      case 'Avançado': return 'accent';
      default: return 'default';
    }
  }
}
