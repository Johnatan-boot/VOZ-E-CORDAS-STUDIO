import { ChangeDetectionStrategy, Component, input, output, inject, signal } from '@angular/core';
import { Scale } from '../../models/scale.model';
import { AppCard, AppBadge, AppIconButton } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { GuitarAudioService } from '../../../guitar/services/guitar-audio.service';

@Component({
  selector: 'app-scale-details',
  imports: [AppCard, AppBadge, AppIconButton, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-bg/80 backdrop-blur-sm p-4 sm:p-6" (click)="closeDetails.emit()" tabindex="0" (keydown.enter)="closeDetails.emit()">
      <div class="w-full max-w-lg" tabindex="0" (click)="$event.stopPropagation()" (keyup.enter)="$event.stopPropagation()">
        <app-card variant="elevated" padding="none" class="overflow-hidden animate-slide-up sm:animate-scale-in">
          <!-- Header -->
          <div class="bg-surface-elevated p-4 sm:p-6 flex justify-between items-start border-b border-border">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h2 class="text-3xl font-black text-text-primary capitalize">{{ scale().name }}</h2>
                <app-badge variant="default">{{ scale().category }}</app-badge>
              </div>
              <p class="text-sm text-text-secondary">{{ scale().type }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="playFullScale()"
                [disabled]="isPlayingScale()"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-primary-hover transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <mat-icon class="text-[16px]">{{ isPlayingScale() ? 'graphic_eq' : 'play_arrow' }}</mat-icon>
                <span>{{ isPlayingScale() ? 'Tocando...' : 'Ouvir Escala' }}</span>
              </button>
              <app-icon-button icon="close" variant="ghost" (clicked)="closeDetails.emit()" ariaLabel="Fechar detalhes" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6">
            
            <div class="flex flex-col gap-6">
              
              <!-- Notes Area -->
              <div class="flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-border">
                <div class="flex items-center justify-between w-full mb-4">
                  <h4 class="text-xs font-bold text-text-secondary uppercase tracking-wider">Notas e Graus</h4>
                  <span class="text-[10px] text-text-secondary">Toque na nota para ouvir</span>
                </div>
                <div class="flex flex-wrap gap-3 sm:gap-4 justify-center">
                  @for (note of scale().notes; track $index) {
                    <button
                      type="button"
                      (click)="playSingleNote(note, $index)"
                      class="flex flex-col items-center p-1 rounded-xl transition-all cursor-pointer group"
                      [class]="activeNoteIndex() === $index ? 'scale-110' : 'hover:scale-105'"
                    >
                      <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg transition-colors shadow-sm"
                        [class]="activeNoteIndex() === $index
                          ? 'bg-primary text-background shadow-md'
                          : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background'"
                      >
                        {{ note }}
                      </span>
                      <span class="text-xs text-text-secondary mt-2 font-semibold">{{ scale().degrees[$index] }}</span>
                    </button>
                  }
                </div>
              </div>

              <!-- Details Area -->
              <div>
                <h4 class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Fórmula Interválica</h4>
                <div class="p-3 bg-surface rounded-xl border border-border font-mono text-sm text-center font-bold text-text-primary">
                   {{ scale().formula }}
                </div>
              </div>

              <!-- Description -->
              <div class="p-4 bg-surface rounded-xl border border-border">
                 <h4 class="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                   <mat-icon class="text-primary text-[18px]">info</mat-icon>
                   Aplicação Musical
                 </h4>
                 <p class="text-sm text-text-secondary leading-relaxed">{{ scale().application }}</p>
                 
                 @if (scale().sertanejoApplication) {
                   <div class="mt-4 pt-3 border-t border-border/50">
                      <h5 class="text-xs font-bold text-primary uppercase tracking-wider mb-1">No Sertanejo</h5>
                      <p class="text-sm text-text-secondary leading-relaxed">{{ scale().sertanejoApplication }}</p>
                   </div>
                 }
              </div>

            </div>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class ScaleDetails {
  readonly scale = input.required<Scale>();
  readonly closeDetails = output<void>();

  private readonly audioService = inject(GuitarAudioService);
  readonly activeNoteIndex = signal<number | null>(null);
  readonly isPlayingScale = signal<boolean>(false);

  playSingleNote(note: string, index: number): void {
    this.activeNoteIndex.set(index);
    this.audioService.strumNotes([note], note, 1.2);
    setTimeout(() => {
      if (this.activeNoteIndex() === index) {
        this.activeNoteIndex.set(null);
      }
    }, 1200);
  }

  playFullScale(): void {
    const notes = this.scale().notes;
    if (!notes || notes.length === 0 || this.isPlayingScale()) return;

    this.isPlayingScale.set(true);
    let step = 0;

    const playStep = () => {
      if (step >= notes.length) {
        this.isPlayingScale.set(false);
        this.activeNoteIndex.set(null);
        return;
      }

      this.activeNoteIndex.set(step);
      this.audioService.strumNotes([notes[step]], notes[step], 0.8);
      step++;
      setTimeout(playStep, 500);
    };

    playStep();
  }
}
