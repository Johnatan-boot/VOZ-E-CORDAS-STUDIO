import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppCard, AppPageHeader, AppTabs, TabItem } from '../../shared/ui';
import { ChordDiagram } from './components/chord-diagram/chord-diagram';
import { ChordProgression } from './components/chord-progression/chord-progression';
import { Metronome } from './components/metronome/metronome';
import { CHORD_PROGRESSION_EXERCISES, GUITAR_CHORDS } from './data/guitar.data';
import { GuitarAudioService } from './services/guitar-audio.service';
import { GuitarChord } from './models/guitar.model';

@Component({
  selector: 'app-guitar',
  imports: [MatIconModule, AppBadge, AppCard, AppPageHeader, AppTabs, ChordDiagram, ChordProgression, Metronome],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full animate-fade-in pb-12">
      <!-- Page Header -->
      <app-page-header
        title="Violão & Harmonia"
        description="Aprimore sua fluidez nas trocas de acordes, ritmo e repertório harmônico."
        category="TREINAMENTO"
        icon="straighten"
      >
        <div slot="page-actions" class="flex items-center gap-2">
          <app-badge variant="accent" size="sm">
            Foco: Ritmo e Pestana
          </app-badge>
        </div>
      </app-page-header>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Column: Metronome & Dictionary -->
        <div class="flex flex-col gap-6 lg:col-span-1">
          <!-- Metronome -->
          <app-card variant="default" padding="none">
            <app-metronome [initialBpm]="currentProgression().defaultBpm || 80" />
          </app-card>

          <!-- Quick Tips -->
          <app-card variant="elevated" padding="md">
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                <mat-icon class="text-[18px]">lightbulb</mat-icon>
              </div>
              <div class="flex flex-col gap-1">
                <h4 class="text-xs font-semibold text-text-secondary">Dica de Prática</h4>
                <p class="text-xs text-text-secondary leading-relaxed">
                  Comece com o metrônomo 10-15 BPM mais lento que o alvo. Foque em colocar todos os dedos no acorde simultaneamente (block chord), em vez de um por um.
                </p>
              </div>
            </div>
          </app-card>
        </div>

        <!-- Right Column: Exercises & Progressions -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <app-card variant="elevated" padding="lg">
            <app-tabs [tabs]="tabs" (tabChange)="setActiveTab($event)" [activeTabId]="activeTab()" />
            
            <div class="mt-6">
              @if (activeTab() === 'exercises') {
                <app-chord-progression 
                  [exercise]="currentProgression()" 
                  [allChords]="chords"
                  (changeProgression)="cycleProgression()"
                />
              } @else {
                <!-- Dictionary -->
                <div class="flex items-center justify-between mb-4 p-3 rounded-xl bg-surface-elevated border border-border">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-primary text-[18px]">volume_up</mat-icon>
                    <span class="text-xs text-text-secondary">
                      Toque em qualquer acorde para <strong>ouvir a batida acústica</strong> das cordas em tempo real.
                    </span>
                  </div>
                  @if (audioService.isStrumming()) {
                    <app-badge variant="primary" size="sm" [dot]="true">
                      Tocando {{ audioService.currentPlayingChord() }}
                    </app-badge>
                  }
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4">
                  @for (chord of chords; track chord.id) {
                    <button
                      type="button"
                      (click)="strumChord(chord)"
                      class="flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer group text-left"
                      [class]="audioService.currentPlayingChord() === chord.name
                        ? 'border-primary bg-primary/10 shadow-md scale-102'
                        : 'border-border/60 bg-surface hover:border-primary/50 hover:bg-surface-elevated'"
                    >
                      <app-chord-diagram [chord]="chord" />
                      <div class="flex items-center gap-1 mt-3">
                        <mat-icon class="text-[14px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">volume_up</mat-icon>
                        <span class="text-[10px] font-semibold text-text-secondary group-hover:text-primary transition-colors text-center">
                          {{ chord.quality }}
                        </span>
                      </div>
                    </button>
                  }
                </div>
              }
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class Guitar {
  readonly audioService = inject(GuitarAudioService);
  readonly chords = GUITAR_CHORDS;
  readonly progressions = CHORD_PROGRESSION_EXERCISES;
  
  readonly tabs: TabItem[] = [
    { id: 'exercises', label: 'Exercícios de Troca', icon: 'queue_music' },
    { id: 'dictionary', label: 'Dicionário de Cifras', icon: 'menu_book' }
  ];
  
  readonly activeTab = signal<string>('exercises');
  readonly currentProgressionIndex = signal<number>(0);

  strumChord(chord: GuitarChord): void {
    this.audioService.strumChord(chord, 35, 1.8);
  }
  
  setActiveTab(id: string | Event) {
    if (typeof id === 'string') {
      this.activeTab.set(id);
    }
  }

  cycleProgression() {
    this.currentProgressionIndex.update(i => (i + 1) % this.progressions.length);
  }

  currentProgression() {
    return this.progressions[this.currentProgressionIndex()];
  }
}
export default Guitar;
