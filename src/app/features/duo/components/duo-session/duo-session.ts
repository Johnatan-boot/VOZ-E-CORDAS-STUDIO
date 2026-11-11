import { ChangeDetectionStrategy, Component, computed, inject, input, OnDestroy, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppButton, AppCard, AppBadge } from '../../../../shared/ui';
import { DuoExercise, DuoPartner, DuoSessionStatus } from '../../models/duo.model';
import { VocalNotesAudioService } from '../../../vocal/services/vocal-notes-audio.service';
import { GuitarAudioService } from '../../../guitar/services/guitar-audio.service';

@Component({
  selector: 'app-duo-session',
  imports: [MatIconModule, AppButton, AppCard, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="lg" class="animate-fade-in border-accent/20">
      <div class="flex flex-col gap-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <app-badge [variant]="status() === 'active' ? 'success' : 'warning'" size="sm" [dot]="status() === 'active'">
                {{ getStatusText() }}
              </app-badge>
              @if (isPlayingAudioGuide()) {
                <app-badge variant="primary" size="sm" [dot]="true">
                  Guia Sonoro Ativo
                </app-badge>
              }
            </div>
            <h2 class="text-2xl font-serif font-bold text-text-primary">{{ exercise().title }}</h2>
          </div>
          
          <div class="flex items-center justify-center bg-surface px-4 py-2 rounded-xl border border-border shadow-xs">
            <mat-icon class="text-text-secondary mr-2">timer</mat-icon>
            <span class="text-xl font-bold font-mono text-text-primary tracking-wider">
              {{ formatTime(elapsedTime()) }}
            </span>
          </div>
        </div>

        <!-- Objective & Partner -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-surface p-4 rounded-xl border border-border/40">
            <h4 class="text-xs font-semibold text-text-secondary mb-2">Objetivo do Exercício</h4>
            <p class="text-sm text-text-primary leading-relaxed">{{ exercise().description }}</p>
          </div>
          
          <div class="bg-surface p-4 rounded-xl border border-border/40">
            <h4 class="text-xs font-semibold text-text-secondary mb-2">Parceiro de Treino</h4>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-surface-elevated border border-border flex items-center justify-center">
                <mat-icon class="text-primary text-[20px]">person</mat-icon>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-text-primary">{{ partner().name }}</span>
                <span class="text-xs text-text-secondary">{{ partner().instrument }} &bull; {{ partner().voiceType || '1ª Voz' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seletor Rápido de Tonalidade Global (Transposição para Duplas) -->
        <div class="p-4 rounded-2xl bg-surface border border-accent/30 flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <mat-icon class="text-accent text-[20px]">tune</mat-icon>
              <div>
                <h4 class="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Tonalidade & Transposição Vocal
                </h4>
                <p class="text-[11px] text-text-secondary">
                  Ajuste o tom para a tessitura do 1º ou 2º cantor da sua dupla sertaneja.
                </p>
              </div>
            </div>

            <!-- Current Key Display Badge -->
            <div class="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-xl bg-accent/10 border border-accent/30">
              <span class="text-[10px] uppercase font-semibold text-text-secondary">Tom Ativo:</span>
              <span class="text-xs font-mono font-bold text-accent">{{ currentTransposition().keyName }}</span>
            </div>
          </div>

          <!-- Transposition Pill Buttons [-1 Tom | -½ Tom | Original | +½ Tom | +1 Tom] -->
          <div class="flex flex-wrap items-center gap-2 pt-1">
            @for (opt of transpositionOptions; track opt.semitones) {
              <button
                type="button"
                (click)="setTransposition(opt.semitones)"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                [class]="transposition() === opt.semitones
                  ? 'bg-accent text-background border-accent shadow-sm scale-105'
                  : 'bg-surface-elevated text-text-secondary border-border hover:border-accent/50 hover:text-text-primary'"
              >
                <span>{{ opt.label }}</span>
                <span class="text-[9px] opacity-80 font-mono">({{ opt.keyName.split(' ')[0] }})</span>
              </button>
            }
          </div>
        </div>

        <!-- Interactive Audio Accompaniment Player for the Duo -->
        <div class="p-4 rounded-2xl bg-surface-elevated border border-border flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <mat-icon class="text-primary text-[20px]">surround_sound</mat-icon>
              <div>
                <h4 class="text-xs font-bold text-text-primary uppercase tracking-wider">Acompanhamento Harmônico da Dupla</h4>
                <span class="text-[10px] text-text-secondary">Tocado em {{ currentTransposition().keyName }}</span>
              </div>
            </div>
            <button
              type="button"
              (click)="toggleAudioGuide()"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              [class]="isPlayingAudioGuide() ? 'bg-error text-text-inverse hover:bg-error/90' : 'bg-primary text-background hover:bg-primary-hover'"
            >
              <mat-icon class="text-[16px]">{{ isPlayingAudioGuide() ? 'stop' : 'play_arrow' }}</mat-icon>
              <span>{{ isPlayingAudioGuide() ? 'Parar Áudio' : 'Ouvir Base & Guia' }}</span>
            </button>
          </div>

          <p class="text-xs text-text-secondary">
            Execute a progressão harmônica guiada no tom transposto para treinar a sustentação e intervalos de 1ª e 2ª voz simultaneamente.
          </p>

          <!-- Interactive Transposed Chord Buttons -->
          <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
            @for (chord of currentTransposition().chords; track chord.symbol) {
              <button
                type="button"
                (click)="playChordBase(chord.symbol)"
                class="px-3 py-1.5 rounded-xl bg-surface hover:bg-primary/10 border border-border text-xs font-bold text-text-primary cursor-pointer transition-colors flex items-center gap-1.5 group"
              >
                <mat-icon class="text-[14px] text-primary opacity-70 group-hover:opacity-100">volume_up</mat-icon>
                <span>{{ chord.name }}</span>
              </button>
            }

            <button
              type="button"
              (click)="goToNotesExplorer()"
              class="ml-auto text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1 sm:pt-0"
            >
              <mat-icon class="text-[14px]">record_voice_over</mat-icon>
              <span>Dicionário 1ª/2ª Voz</span>
            </button>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border/40">
          @if (status() === 'ready' || status() === 'paused') {
            <app-button variant="primary" size="lg" icon="play_arrow" (clicked)="startSession.emit()" class="w-full sm:w-auto">
              {{ status() === 'ready' ? 'Iniciar Treino' : 'Continuar' }}
            </app-button>
          }
          
          @if (status() === 'active') {
            <app-button variant="secondary" size="lg" icon="pause" (clicked)="pauseSession.emit()" class="w-full sm:w-auto">
              Pausar
            </app-button>
          }
          
          @if (status() !== 'ready') {
            <app-button variant="primary" size="lg" icon="check_circle" (clicked)="handleComplete()" class="w-full sm:w-auto">
              Concluir Exercício
            </app-button>
          }
          
          <app-button variant="ghost" size="lg" icon="close" (clicked)="handleCancel()" class="w-full sm:w-auto">
            Encerrar
          </app-button>
        </div>
      </div>
    </app-card>
  `
})
export class DuoSessionComponent implements OnDestroy {
  readonly exercise = input.required<DuoExercise>();
  readonly partner = input.required<DuoPartner>();
  readonly status = input.required<DuoSessionStatus>();
  readonly elapsedTime = input.required<number>();
  
  readonly startSession = output<void>();
  readonly pauseSession = output<void>();
  readonly completeSession = output<void>();
  readonly cancelSession = output<void>();

  private readonly vocalAudio = inject(VocalNotesAudioService);
  private readonly guitarAudio = inject(GuitarAudioService);
  private readonly router = inject(Router);

  readonly isPlayingAudioGuide = signal<boolean>(false);
  private audioLoopTimeout: number | null = null;

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  getStatusText(): string {
    switch(this.status()) {
      case 'ready': return 'Pronto para iniciar';
      case 'active': return 'Em andamento';
      case 'paused': return 'Pausado';
      case 'completed': return 'Concluído';
      default: return '';
    }
  }

  // Transposition Management (-1 Tom a +1 Tom)
  readonly transposition = signal<number>(0);

  readonly transpositionOptions = [
    {
      semitones: -2,
      label: '-1 Tom',
      keyName: 'F (Fá Maior)',
      chords: [
        { symbol: 'F', name: 'F (Fá)' },
        { symbol: 'Dm', name: 'Dm (Ré m)' },
        { symbol: 'Bb', name: 'Bb (Si b)' },
        { symbol: 'C', name: 'C (Dó)' }
      ],
      voicePairs: [
        { v1: 349.23, v2: 440.00 },
        { v1: 293.66, v2: 349.23 },
        { v1: 233.08, v2: 293.66 },
        { v1: 261.63, v2: 329.63 }
      ]
    },
    {
      semitones: -1,
      label: '-½ Tom',
      keyName: 'F# (Fá# Maior)',
      chords: [
        { symbol: 'F#', name: 'F# (Fá#)' },
        { symbol: 'D#m', name: 'D#m (Ré# m)' },
        { symbol: 'B', name: 'B (Si)' },
        { symbol: 'C#', name: 'C# (Dó#)' }
      ],
      voicePairs: [
        { v1: 369.99, v2: 466.16 },
        { v1: 311.13, v2: 369.99 },
        { v1: 246.94, v2: 311.13 },
        { v1: 277.18, v2: 349.23 }
      ]
    },
    {
      semitones: 0,
      label: 'Tom Original',
      keyName: 'G (Sol Maior)',
      chords: [
        { symbol: 'G', name: 'G (Sol)' },
        { symbol: 'Em', name: 'Em (Mi m)' },
        { symbol: 'C', name: 'C (Dó)' },
        { symbol: 'D', name: 'D (Ré)' }
      ],
      voicePairs: [
        { v1: 392.00, v2: 493.88 },
        { v1: 329.63, v2: 392.00 },
        { v1: 261.63, v2: 329.63 },
        { v1: 293.66, v2: 369.99 }
      ]
    },
    {
      semitones: 1,
      label: '+½ Tom',
      keyName: 'G# (Sol# Maior)',
      chords: [
        { symbol: 'G#', name: 'G# (Sol#)' },
        { symbol: 'Fm', name: 'Fm (Fá m)' },
        { symbol: 'C#', name: 'C# (Dó#)' },
        { symbol: 'D#', name: 'D# (Ré#)' }
      ],
      voicePairs: [
        { v1: 415.30, v2: 523.25 },
        { v1: 349.23, v2: 415.30 },
        { v1: 277.18, v2: 349.23 },
        { v1: 311.13, v2: 392.00 }
      ]
    },
    {
      semitones: 2,
      label: '+1 Tom',
      keyName: 'A (Lá Maior)',
      chords: [
        { symbol: 'A', name: 'A (Lá)' },
        { symbol: 'F#m', name: 'F#m (Fá# m)' },
        { symbol: 'D', name: 'D (Ré)' },
        { symbol: 'E', name: 'E (Mi)' }
      ],
      voicePairs: [
        { v1: 440.00, v2: 554.37 },
        { v1: 369.99, v2: 440.00 },
        { v1: 293.66, v2: 369.99 },
        { v1: 329.63, v2: 415.30 }
      ]
    }
  ];

  readonly currentTransposition = computed(() => {
    const semi = this.transposition();
    return this.transpositionOptions.find(o => o.semitones === semi) ?? this.transpositionOptions[2];
  });

  setTransposition(semitones: number): void {
    this.transposition.set(semitones);
  }

  playChordBase(chordSymbol: string): void {
    const notesMap: Record<string, string[]> = {
      'F': ['F3', 'A3', 'C4', 'F4'],
      'Dm': ['D3', 'F3', 'A3', 'D4'],
      'Bb': ['A#2', 'D3', 'F3', 'A#3'],
      'C': ['C3', 'E3', 'G3', 'C4'],
      'F#': ['F#3', 'A#3', 'C#4', 'F#4'],
      'D#m': ['D#3', 'F#3', 'A#3', 'D#4'],
      'B': ['B2', 'D#3', 'F#3', 'B3'],
      'C#': ['C#3', 'F3', 'G#3', 'C#4'],
      'G': ['G3', 'B3', 'D4', 'G4'],
      'Em': ['E3', 'G3', 'B3', 'E4'],
      'D': ['D3', 'F#3', 'A3', 'D4'],
      'G#': ['G#3', 'C4', 'D#4', 'G#4'],
      'Fm': ['F3', 'G#3', 'C4', 'F4'],
      'D#': ['D#3', 'G3', 'A#3', 'D#4'],
      'A': ['A3', 'C#4', 'E4', 'A4'],
      'F#m': ['F#3', 'A3', 'C#4', 'F#4'],
      'E': ['E3', 'G#3', 'B3', 'E4']
    };
    const notes = notesMap[chordSymbol] || ['G3', 'B3', 'D4'];
    this.guitarAudio.strumNotes(notes, chordSymbol, 1.6);
  }

  toggleAudioGuide(): void {
    if (this.isPlayingAudioGuide()) {
      this.stopAudioGuide();
    } else {
      this.startAudioGuide();
    }
  }

  startAudioGuide(): void {
    this.isPlayingAudioGuide.set(true);
    let idx = 0;

    const loop = () => {
      if (!this.isPlayingAudioGuide()) return;
      const tInfo = this.currentTransposition();
      const currentChord = tInfo.chords[idx % tInfo.chords.length].symbol;
      this.playChordBase(currentChord);

      // Play 1st voice and 2nd voice guide notes transposed
      const pair = tInfo.voicePairs[idx % tInfo.voicePairs.length];
      this.vocalAudio.playDuoChord(pair.v1, pair.v2, 1.4);

      idx = (idx + 1) % tInfo.chords.length;
      this.audioLoopTimeout = window.setTimeout(loop, 2200);
    };

    loop();
  }

  stopAudioGuide(): void {
    this.isPlayingAudioGuide.set(false);
    if (this.audioLoopTimeout) {
      clearTimeout(this.audioLoopTimeout);
      this.audioLoopTimeout = null;
    }
  }

  goToNotesExplorer(): void {
    this.router.navigate(['/notas-vocais']);
  }

  handleComplete(): void {
    this.stopAudioGuide();
    this.completeSession.emit();
  }

  handleCancel(): void {
    this.stopAudioGuide();
    this.cancelSession.emit();
  }

  ngOnDestroy(): void {
    this.stopAudioGuide();
  }
}
