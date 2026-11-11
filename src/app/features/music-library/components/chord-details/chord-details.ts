import { ChangeDetectionStrategy, Component, input, output, inject } from '@angular/core';
import { Chord } from '../../models/chord.model';
import { AppCard, AppBadge, AppIconButton, AppDivider } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { ChordDiagram } from '../chord-diagram/chord-diagram';
import { GuitarAudioService } from '../../../guitar/services/guitar-audio.service';
import { ChordQuality, ChordString, Finger, GuitarChord } from '../../../guitar/models/guitar.model';

@Component({
  selector: 'app-chord-details',
  imports: [AppCard, AppBadge, AppIconButton, AppDivider, MatIconModule, ChordDiagram],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-bg/80 backdrop-blur-sm p-4 sm:p-6" (click)="closeDetails.emit()" tabindex="0" (keydown.enter)="closeDetails.emit()">
      <div class="w-full max-w-lg" tabindex="0" (click)="$event.stopPropagation()" (keyup.enter)="$event.stopPropagation()">
        <app-card variant="elevated" padding="none" class="overflow-hidden animate-slide-up sm:animate-scale-in">
          <!-- Header -->
          <div class="bg-surface-elevated p-4 sm:p-6 flex justify-between items-start border-b border-border">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h2 class="text-3xl font-black text-text-primary">{{ chord().symbol }}</h2>
                <app-badge variant="default">{{ chord().category }}</app-badge>
              </div>
              <p class="text-sm text-text-secondary">{{ chord().name }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="strumChord()"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-primary-hover transition-colors cursor-pointer shadow-sm"
              >
                <mat-icon class="text-[16px]">volume_up</mat-icon>
                <span>Ouvir</span>
              </button>
              <app-icon-button icon="close" variant="ghost" (clicked)="closeDetails.emit()" ariaLabel="Fechar detalhes" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <!-- Diagram Area -->
              <div class="flex flex-col items-center justify-center p-4 bg-surface rounded-2xl border border-border">
                <app-chord-diagram [chord]="chord()" [position]="chord().guitarPositions[0]" />
                <button
                  type="button"
                  (click)="strumChord()"
                  class="text-xs text-primary hover:underline mt-4 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="text-[14px]">volume_up</mat-icon>
                  <span>Tocar Violão</span>
                </button>
              </div>

              <!-- Details Area -->
              <div class="flex flex-col gap-4">
                
                <div>
                  <h4 class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Formação (Notas)</h4>
                  <div class="flex flex-wrap gap-2">
                    @for (note of chord().notes; track $index) {
                      <button
                        type="button"
                        (click)="playSingleNote(note)"
                        class="flex flex-col items-center p-1 rounded-xl hover:bg-surface-elevated transition-colors cursor-pointer group"
                        title="Clique para ouvir {{ note }}"
                      >
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background font-bold text-sm transition-colors shadow-xs">
                          {{ note }}
                        </span>
                        <span class="text-[10px] text-text-secondary mt-1 font-semibold">{{ chord().intervals[$index] }}</span>
                      </button>
                    }
                  </div>
                </div>

                <app-divider />

                <div>
                  <h4 class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Dificuldade</h4>
                  <p class="text-sm font-medium text-text-primary">{{ chord().difficulty }}</p>
                </div>
                
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6 p-4 bg-surface rounded-xl border border-border">
               <h4 class="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                 <mat-icon class="text-primary text-[18px]">info</mat-icon>
                 Teoria e Aplicação
               </h4>
               <p class="text-sm text-text-secondary leading-relaxed">{{ chord().description }}</p>
               
               @if (chord().sertanejoApplication) {
                 <div class="mt-4 pt-3 border-t border-border/50">
                    <h5 class="text-xs font-bold text-primary uppercase tracking-wider mb-1">No Sertanejo</h5>
                    <p class="text-sm text-text-secondary leading-relaxed">{{ chord().sertanejoApplication }}</p>
                 </div>
               }
            </div>

          </div>
        </app-card>
      </div>
    </div>
  `
})
export class ChordDetails {
  readonly chord = input.required<Chord>();
  readonly closeDetails = output<void>();

  private readonly audioService = inject(GuitarAudioService);

  strumChord(): void {
    const pos = this.chord().guitarPositions[0];
    if (pos && pos.frets) {
      // Convert pos to GuitarChord format
      const strings: ChordString[] = pos.frets.map((fret, idx) => {
        const stringNumber = (6 - idx) as 1 | 2 | 3 | 4 | 5 | 6;
        const fingerVal = pos.fingers ? ((pos.fingers[idx] ?? null) as Finger | null) : null;
        return {
          stringNumber,
          fret: fret >= 0 ? fret : null,
          finger: fingerVal,
          status: fret === -1 ? ('muted' as const) : (fret === 0 ? ('open' as const) : ('played' as const))
        };
      });

      const qualityMap: Record<string, ChordQuality> = {
        'major': 'Maior',
        'minor': 'Menor',
        '7': 'Com Sétima',
        'm7': 'Menor com Sétima',
        'sus4': 'Suspenso',
        'dim': 'Diminuto'
      };

      const guitarChordData: GuitarChord = {
        id: this.chord().id,
        name: this.chord().symbol,
        rootNote: this.chord().root,
        quality: qualityMap[this.chord().quality] || 'Maior',
        baseFret: pos.baseFret || 1,
        strings
      };

      this.audioService.strumChord(guitarChordData, 35, 2.0);
    } else {
      this.audioService.strumNotes(this.chord().notes, this.chord().symbol);
    }
  }

  playSingleNote(note: string): void {
    this.audioService.strumNotes([note], note, 1.2);
  }
}
