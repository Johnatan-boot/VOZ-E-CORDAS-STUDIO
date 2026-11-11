import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppPageHeader, AppCard, AppBadge } from '../../shared/ui';
import { GuitarAudioService } from '../guitar/services/guitar-audio.service';

interface StaffNoteItem {
  id: string;
  name: string;        // 'C', 'D', 'E', etc.
  namePt: string;      // 'Dó', 'Ré', 'Mi', etc.
  octave: number;
  yPos: number;        // Y on the SVG pentagram
  isLine: boolean;     // on a line vs space
  ledgerLine?: boolean;// below or above staff
  frequency: number;
}

interface TabRiffNote {
  string: number;      // 1 to 6
  fret: number;
  durationMs: number;
  label: string;
}

interface TabRiffSong {
  id: string;
  title: string;
  artist: string;
  notes: TabRiffNote[];
}

@Component({
  selector: 'app-reading',
  imports: [MatIconModule, AppPageHeader, AppCard, AppBadge, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 sm:gap-8 pb-24 lg:pb-8 w-full max-w-7xl mx-auto animate-fade-in px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
      
      <app-page-header 
        title="Leitura Musical & Percepção" 
        description="Aprenda a ler Partituras e Tablaturas de forma prática com exercícios interativos e áudio em tempo real." 
        category="TREINAMENTO"
        icon="music_note" 
      >
        <div slot="page-actions" class="flex items-center gap-2">
          <app-badge variant="primary" size="sm">
            Partitura + Tablatura Interativa
          </app-badge>
        </div>
      </app-page-header>

      <!-- Tabs Navigation -->
      <div class="flex flex-wrap gap-2 p-1.5 bg-surface-elevated rounded-2xl border border-border w-full max-w-md mx-auto">
        <button 
          type="button"
          class="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          [class]="activeTab() === 'partitura' ? 'bg-primary text-background shadow-sm' : 'text-text-secondary hover:text-text-primary'"
          (click)="activeTab.set('partitura')"
        >
          <mat-icon class="text-[18px]">receipt_long</mat-icon>
          <span>Pauta & Pentagrama</span>
        </button>
        <button 
          type="button"
          class="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          [class]="activeTab() === 'tablatura' ? 'bg-primary text-background shadow-sm' : 'text-text-secondary hover:text-text-primary'"
          (click)="activeTab.set('tablatura')"
        >
          <mat-icon class="text-[18px]">linear_scale</mat-icon>
          <span>Tablatura (TAB)</span>
        </button>
      </div>

      <!-- Partitura Tab Content -->
      @if (activeTab() === 'partitura') {
        <div class="flex flex-col gap-6 animate-fade-in">
          
          <!-- Interactive Quiz Card -->
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs">
                    TREINO
                  </span>
                  <h3 class="text-xl font-bold text-text-primary">Identifique a Nota na Pauta</h3>
                </div>
                <p class="text-xs text-text-secondary">
                  Observe a posição da nota na Clave de Sol, ouça o som e clique no nome correto.
                </p>
              </div>

              <!-- Score & Streak -->
              <div class="flex items-center gap-3">
                <div class="px-3 py-1.5 rounded-xl bg-surface border border-border flex items-center gap-2">
                  <mat-icon class="text-accent text-[18px]">local_fire_department</mat-icon>
                  <span class="text-xs font-bold text-text-primary">Sequência: {{ streak() }}</span>
                </div>
                <div class="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-2">
                  <mat-icon class="text-primary text-[18px]">emoji_events</mat-icon>
                  <span class="text-xs font-bold text-primary">Pontos: {{ score() }}</span>
                </div>
              </div>
            </div>

            <!-- SVG Pentagram Canvas with Current Quiz Note -->
            <div class="w-full bg-background rounded-2xl border border-border p-6 sm:p-10 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 500 200" class="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
                <!-- 5 Lines of Pentagram (Y: 50, 75, 100, 125, 150) -->
                <!-- Line 5 (F5) -->
                <line x1="40" y1="50" x2="460" y2="50" stroke="currentColor" class="text-border" stroke-width="2"/>
                <!-- Line 4 (D5) -->
                <line x1="40" y1="75" x2="460" y2="75" stroke="currentColor" class="text-border" stroke-width="2"/>
                <!-- Line 3 (B4) -->
                <line x1="40" y1="100" x2="460" y2="100" stroke="currentColor" class="text-border" stroke-width="2"/>
                <!-- Line 2 (G4) -->
                <line x1="40" y1="125" x2="460" y2="125" stroke="currentColor" class="text-border" stroke-width="2"/>
                <!-- Line 1 (E4) -->
                <line x1="40" y1="150" x2="460" y2="150" stroke="currentColor" class="text-border" stroke-width="2"/>

                <!-- Treble Clef -->
                <text x="50" y="142" font-size="88" class="fill-text-primary select-none pointer-events-none" font-family="serif">𝄞</text>

                <!-- Ledger line if below (like C4 at y=175) -->
                @if (currentQuizNote().ledgerLine) {
                  <line x1="230" y1="175" x2="270" y2="175" stroke="currentColor" class="text-primary" stroke-width="2.5"/>
                }

                <!-- Note Head -->
                <ellipse
                  cx="250"
                  [attr.cy]="currentQuizNote().yPos"
                  rx="14"
                  ry="10"
                  [attr.transform]="'rotate(-20 250 ' + currentQuizNote().yPos + ')'"
                  class="fill-primary cursor-pointer transition-all hover:scale-110 drop-shadow-md"
                  (click)="playCurrentQuizNote()"
                />
                
                <!-- Note Stem -->
                @if (currentQuizNote().yPos >= 100) {
                  <!-- Stem up -->
                  <line x1="262" [attr.y1]="currentQuizNote().yPos - 2" x2="262" [attr.y2]="currentQuizNote().yPos - 45" stroke="currentColor" class="text-primary" stroke-width="2.5"/>
                } @else {
                  <!-- Stem down -->
                  <line x1="238" [attr.y1]="currentQuizNote().yPos + 2" x2="238" [attr.y2]="currentQuizNote().yPos + 45" stroke="currentColor" class="text-primary" stroke-width="2.5"/>
                }
              </svg>

              <!-- Audio Play button for the current note -->
              <div class="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  (click)="playCurrentQuizNote()"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surface-elevated text-primary border border-border text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <mat-icon class="text-[18px]">volume_up</mat-icon>
                  <span>Ouvir Som da Nota</span>
                </button>
              </div>
            </div>

            <!-- Quiz Feedback message -->
            @if (feedbackMessage(); as msg) {
              <div
                class="mb-6 p-3 rounded-xl text-center text-xs font-bold transition-all animate-fade-in"
                [class]="msg.isCorrect ? 'bg-success/10 text-success border border-success/30' : 'bg-error/10 text-error border border-error/30'"
              >
                {{ msg.text }}
              </div>
            }

            <!-- Answer Buttons -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              @for (note of noteOptions; track note.name) {
                <button
                  type="button"
                  (click)="checkAnswer(note.name)"
                  class="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-surface hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group active:scale-95"
                >
                  <span class="text-lg font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
                    {{ note.namePt }}
                  </span>
                  <span class="text-[11px] font-mono text-text-secondary mt-0.5">
                    ({{ note.name }})
                  </span>
                </button>
              }
            </div>
          </app-card>

          <!-- Interactive Scale Reference Table on Staff -->
          <app-card variant="default" padding="lg">
            <h3 class="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
              <mat-icon class="text-primary">info</mat-icon>
              Guia Completo: Linhas e Espaços na Clave de Sol
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-4 rounded-xl bg-surface border border-border">
                <h4 class="font-bold text-sm text-text-primary mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Notas nas Linhas (de baixo para cima)
                </h4>
                <ul class="text-xs text-text-secondary space-y-1.5 leading-relaxed">
                  <li><strong>1ª Linha:</strong> Mi 4 (E4) - 329.6 Hz</li>
                  <li><strong>2ª Linha:</strong> Sol 4 (G4) - 392.0 Hz <em>(Linha da Clave de Sol)</em></li>
                  <li><strong>3ª Linha:</strong> Si 4 (B4) - 493.8 Hz</li>
                  <li><strong>4ª Linha:</strong> Ré 5 (D5) - 587.3 Hz</li>
                  <li><strong>5ª Linha:</strong> Fá 5 (F5) - 698.4 Hz</li>
                </ul>
              </div>
              <div class="p-4 rounded-xl bg-surface border border-border">
                <h4 class="font-bold text-sm text-text-primary mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-accent"></span>
                  Notas nos Espaços (de baixo para cima)
                </h4>
                <ul class="text-xs text-text-secondary space-y-1.5 leading-relaxed">
                  <li><strong>1º Espaço:</strong> Fá 4 (F4) - 349.2 Hz</li>
                  <li><strong>2º Espaço:</strong> Lá 4 (A4) - 440.0 Hz <em>(Afinação Padrão)</em></li>
                  <li><strong>3º Espaço:</strong> Dó 5 (C5) - 523.2 Hz</li>
                  <li><strong>4º Espaço:</strong> Mi 5 (E5) - 659.2 Hz</li>
                  <li><strong>Linha suplementar inferior:</strong> Dó 4 (C4 - Dó Central) - 261.6 Hz</li>
                </ul>
              </div>
            </div>
          </app-card>
        </div>
      }

      <!-- Tablatura Tab Content -->
      @if (activeTab() === 'tablatura') {
        <div class="flex flex-col gap-6 animate-fade-in">
          
          <!-- Interactive TAB Simulator -->
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent/20 text-accent font-bold text-xs">
                    TAB
                  </span>
                  <h3 class="text-xl font-bold text-text-primary">Simulador Interativo de Tablatura</h3>
                </div>
                <p class="text-xs text-text-secondary">
                  Clique em qualquer casa de qualquer corda para ouvir o som no violão e ver a nota musical correspondente.
                </p>
              </div>

              @if (lastPlayedTab(); as pt) {
                <div class="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3 animate-fade-in">
                  <div class="flex flex-col">
                    <span class="text-[10px] text-text-secondary">Nota tocada</span>
                    <span class="text-sm font-bold text-primary">{{ pt.notePt }} ({{ pt.noteName }})</span>
                  </div>
                  <span class="text-xs font-mono text-text-secondary">{{ pt.freq | number: '1.1-1' }} Hz</span>
                </div>
              }
            </div>

            <!-- Fretboard / TAB matrix (Strings 1 to 6, Frets 0 to 7) -->
            <div class="overflow-x-auto pb-4">
              <div class="min-w-[620px] flex flex-col gap-2 bg-background p-6 rounded-2xl border border-border">
                @for (str of tabStrings; track str.number) {
                  <div class="flex items-center gap-3">
                    <!-- String Label -->
                    <div class="w-16 flex items-center gap-1.5 shrink-0">
                      <span class="text-xs font-mono font-bold text-text-primary">{{ str.name }}</span>
                      <span class="text-[10px] text-text-secondary">({{ str.number }}ª)</span>
                    </div>

                    <!-- String line with frets -->
                    <div class="flex-1 flex items-center gap-2 relative">
                      <div class="absolute inset-x-0 h-0.5 bg-border pointer-events-none"></div>

                      @for (fret of [0, 1, 2, 3, 4, 5, 7, 9, 12]; track fret) {
                        <button
                          type="button"
                          (click)="playTabFret(str.number, fret)"
                          class="relative z-10 w-11 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer border shadow-xs"
                          [class]="lastPlayedTab()?.stringNumber === str.number && lastPlayedTab()?.fret === fret
                            ? 'bg-primary text-background border-primary scale-110 shadow-md'
                            : 'bg-surface text-text-secondary hover:text-text-primary hover:border-primary/50 border-border'"
                        >
                          {{ fret }}
                        </button>
                      }
                    </div>
                  </div>
                }

                <!-- Fret numbers indicator header at bottom -->
                <div class="flex items-center gap-3 pt-3 mt-2 border-t border-border/60">
                  <div class="w-16 shrink-0 text-[10px] font-bold text-text-secondary">CASAS:</div>
                  <div class="flex-1 flex items-center gap-2">
                    @for (fret of [0, 1, 2, 3, 4, 5, 7, 9, 12]; track fret) {
                      <div class="w-11 text-center font-mono text-[10px] text-text-secondary font-bold">
                        {{ fret === 0 ? 'Solta' : fret + 'ª' }}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </app-card>

          <!-- Pre-loaded Classic Sertanejo Riffs -->
          <app-card variant="default" padding="lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-lg font-bold text-text-primary flex items-center gap-2">
                  <mat-icon class="text-accent">queue_music</mat-icon>
                  Riffs e Solos Famosos em Tablatura
                </h3>
                <p class="text-xs text-text-secondary">
                  Ouça a execução nota a nota dos solos mais tocados do sertanejo acústico e de duplas.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (riff of popularRiffs; track riff.id) {
                <div class="p-5 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="text-base font-bold text-text-primary">{{ riff.title }}</h4>
                      <app-badge variant="default" size="sm">{{ riff.artist }}</app-badge>
                    </div>
                    
                    <!-- TAB preview phrase -->
                    <div class="p-3 my-3 bg-background rounded-xl border border-border/80 font-mono text-xs text-text-secondary overflow-x-auto">
                      <div class="flex items-center gap-2">
                        @for (n of riff.notes; track $index) {
                          <span
                            class="px-2 py-1 rounded transition-colors"
                            [class]="activeRiffId() === riff.id && activeRiffStep() === $index
                              ? 'bg-primary text-background font-bold scale-110 shadow-xs'
                              : 'bg-surface-elevated text-text-primary'"
                          >
                            {{ n.string }}ªc / {{ n.fret }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-border flex items-center justify-between mt-2">
                    <span class="text-[11px] text-text-secondary">{{ riff.notes.length }} notas no fraseado</span>
                    <button
                      type="button"
                      (click)="playRiff(riff)"
                      [disabled]="activeRiffId() === riff.id"
                      class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-background text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      <mat-icon class="text-[16px]">
                        {{ activeRiffId() === riff.id ? 'graphic_eq' : 'play_arrow' }}
                      </mat-icon>
                      <span>{{ activeRiffId() === riff.id ? 'Executando...' : 'Tocar Riff' }}</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          </app-card>
        </div>
      }

    </div>
  `
})
export default class Reading {
  private readonly audioService = inject(GuitarAudioService);

  readonly activeTab = signal<'partitura' | 'tablatura'>('partitura');

  // Quiz State
  readonly score = signal<number>(0);
  readonly streak = signal<number>(0);
  readonly feedbackMessage = signal<{ text: string; isCorrect: boolean } | null>(null);

  // Available Staff Notes for the quiz (Treble Clef)
  readonly staffNotes: StaffNoteItem[] = [
    { id: 'c4', name: 'C', namePt: 'Dó', octave: 4, yPos: 175, isLine: false, ledgerLine: true, frequency: 261.63 },
    { id: 'd4', name: 'D', namePt: 'Ré', octave: 4, yPos: 162.5, isLine: false, frequency: 293.66 },
    { id: 'e4', name: 'E', namePt: 'Mi', octave: 4, yPos: 150, isLine: true, frequency: 329.63 },
    { id: 'f4', name: 'F', namePt: 'Fá', octave: 4, yPos: 137.5, isLine: false, frequency: 349.23 },
    { id: 'g4', name: 'G', namePt: 'Sol', octave: 4, yPos: 125, isLine: true, frequency: 392.00 },
    { id: 'a4', name: 'A', namePt: 'Lá', octave: 4, yPos: 112.5, isLine: false, frequency: 440.00 },
    { id: 'b4', name: 'B', namePt: 'Si', octave: 4, yPos: 100, isLine: true, frequency: 493.88 },
    { id: 'c5', name: 'C', namePt: 'Dó', octave: 5, yPos: 87.5, isLine: false, frequency: 523.25 },
    { id: 'd5', name: 'D', namePt: 'Ré', octave: 5, yPos: 75, isLine: true, frequency: 587.33 },
    { id: 'e5', name: 'E', namePt: 'Mi', octave: 5, yPos: 62.5, isLine: false, frequency: 659.25 },
    { id: 'f5', name: 'F', namePt: 'Fá', octave: 5, yPos: 50, isLine: true, frequency: 698.46 },
  ];

  readonly currentQuizNote = signal<StaffNoteItem>(this.staffNotes[4]); // Defaults to Sol (G4)

  readonly noteOptions = [
    { name: 'C', namePt: 'Dó' },
    { name: 'D', namePt: 'Ré' },
    { name: 'E', namePt: 'Mi' },
    { name: 'F', namePt: 'Fá' },
    { name: 'G', namePt: 'Sol' },
    { name: 'A', namePt: 'Lá' },
    { name: 'B', namePt: 'Si' },
  ];

  // Tablatura State
  readonly tabStrings = [
    { number: 1, name: 'e (Mizinha)' },
    { number: 2, name: 'B (Si)' },
    { number: 3, name: 'G (Sol)' },
    { number: 4, name: 'D (Ré)' },
    { number: 5, name: 'A (Lá)' },
    { number: 6, name: 'E (Mizão)' },
  ];

  readonly lastPlayedTab = signal<{
    stringNumber: number;
    fret: number;
    noteName: string;
    notePt: string;
    freq: number;
  } | null>(null);

  readonly activeRiffId = signal<string | null>(null);
  readonly activeRiffStep = signal<number | null>(null);

  readonly popularRiffs: TabRiffSong[] = [
    {
      id: 'boate-azul',
      title: 'Solo de Boate Azul (Frase Inicial)',
      artist: 'Benedito Seviero / Duplas Clássicas',
      notes: [
        { string: 1, fret: 0, durationMs: 400, label: 'E4' },
        { string: 1, fret: 1, durationMs: 400, label: 'F4' },
        { string: 1, fret: 3, durationMs: 500, label: 'G4' },
        { string: 1, fret: 1, durationMs: 400, label: 'F4' },
        { string: 1, fret: 0, durationMs: 600, label: 'E4' },
        { string: 2, fret: 3, durationMs: 500, label: 'D4' },
        { string: 2, fret: 1, durationMs: 700, label: 'C4' },
      ]
    },
    {
      id: 'telefone-mudo',
      title: 'Frase de Telefone Mudo',
      artist: 'Trio Parada Dura',
      notes: [
        { string: 3, fret: 2, durationMs: 400, label: 'A3' },
        { string: 2, fret: 1, durationMs: 400, label: 'C4' },
        { string: 2, fret: 3, durationMs: 450, label: 'D4' },
        { string: 1, fret: 0, durationMs: 450, label: 'E4' },
        { string: 1, fret: 1, durationMs: 450, label: 'F4' },
        { string: 1, fret: 3, durationMs: 600, label: 'G4' },
        { string: 1, fret: 1, durationMs: 600, label: 'F4' },
        { string: 1, fret: 0, durationMs: 800, label: 'E4' },
      ]
    }
  ];

  playCurrentQuizNote(): void {
    const note = this.currentQuizNote();
    this.audioService.strumNotes([`${note.name}${note.octave}`], note.namePt, 1.4);
  }

  checkAnswer(selectedName: string): void {
    const current = this.currentQuizNote();
    if (selectedName === current.name) {
      this.score.update(s => s + 10);
      this.streak.update(st => st + 1);
      this.feedbackMessage.set({
        text: `Correto! É a nota ${current.namePt} ${current.octave} (${current.name}${current.octave}) na ${current.isLine ? 'linha' : 'espaço'}.`,
        isCorrect: true
      });
      this.playCurrentQuizNote();

      // Pick next random note
      setTimeout(() => {
        let nextIndex = Math.floor(Math.random() * this.staffNotes.length);
        while (this.staffNotes[nextIndex].id === current.id) {
          nextIndex = Math.floor(Math.random() * this.staffNotes.length);
        }
        this.currentQuizNote.set(this.staffNotes[nextIndex]);
        this.feedbackMessage.set(null);
      }, 1500);
    } else {
      this.streak.set(0);
      this.feedbackMessage.set({
        text: `Ops! Esta nota não é ${selectedName}. Ouça o som e tente novamente.`,
        isCorrect: false
      });
      this.playCurrentQuizNote();
    }
  }

  playTabFret(stringNumber: number, fret: number): void {
    this.audioService.playString(stringNumber, fret, 1.5);

    // Calculate note name
    const openFreqs: Record<number, { freq: number; note: string; pt: string; octave: number }> = {
      1: { freq: 329.63, note: 'E', pt: 'Mi', octave: 4 },
      2: { freq: 246.94, note: 'B', pt: 'Si', octave: 3 },
      3: { freq: 196.00, note: 'G', pt: 'Sol', octave: 3 },
      4: { freq: 146.83, note: 'D', pt: 'Ré', octave: 3 },
      5: { freq: 110.00, note: 'A', pt: 'Lá', octave: 2 },
      6: { freq: 82.41,  note: 'E', pt: 'Mi', octave: 2 },
    };

    const base = openFreqs[stringNumber];
    const freq = base.freq * Math.pow(2, fret / 12);
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const ptNames: Record<string, string> = {
      'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
      'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
    };
    const midi = Math.round(12 * (Math.log(freq / 440) / Math.log(2))) + 69;
    const octave = Math.floor(midi / 12) - 1;
    const noteIdx = ((midi % 12) + 12) % 12;
    const pitchClass = noteStrings[noteIdx];
    const noteName = pitchClass + octave;
    const notePt = (ptNames[pitchClass] || pitchClass) + ' ' + octave;

    this.lastPlayedTab.set({
      stringNumber,
      fret,
      noteName,
      notePt,
      freq
    });
  }

  playRiff(riff: TabRiffSong): void {
    if (this.activeRiffId()) return;

    this.activeRiffId.set(riff.id);
    let step = 0;

    const playStep = () => {
      if (step >= riff.notes.length) {
        this.activeRiffId.set(null);
        this.activeRiffStep.set(null);
        return;
      }

      const note = riff.notes[step];
      this.activeRiffStep.set(step);
      this.playTabFret(note.string, note.fret);

      step++;
      setTimeout(playStep, note.durationMs);
    };

    playStep();
  }
}
