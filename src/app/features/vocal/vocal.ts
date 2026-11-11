import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  AppBadge,
  AppCard,
  AppPageHeader,
} from '../../shared/ui';
import { HarmonyProjector } from './components/harmony-projector/harmony-projector';
import { VocalExerciseSelector } from './components/vocal-exercise-selector/vocal-exercise-selector';
import { VocalPitchTrainer } from './components/vocal-pitch-trainer/vocal-pitch-trainer';
import { VocalRangeTracker } from './components/vocal-range-tracker/vocal-range-tracker';
import { VocalNotesExplorer } from './components/vocal-notes-explorer/vocal-notes-explorer';
import { VOCAL_EXERCISES } from './data/vocal.data';
import { VocalExercise } from './models/vocal.model';
import { VocalAudioService } from './services/vocal-audio.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-vocal',
  imports: [
    MatIconModule,
    AppCard,
    AppBadge,
    AppPageHeader,
    VocalPitchTrainer,
    VocalExerciseSelector,
    VocalRangeTracker,
    HarmonyProjector,
    VocalNotesExplorer,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full min-h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <!-- Page Header -->
      <app-page-header
        title="Treino Vocal & Canto"
        description="Desenvolva sua afinação, sustentação diafragmática, agilidade melódica e harmonia de 1ª e 2ª voz."
        category="TREINAMENTO"
        icon="mic"
      >
        <div slot="page-actions" class="flex flex-wrap items-center gap-2">
          <div class="p-1 bg-surface-elevated border border-border rounded-xl flex items-center gap-1">
            <button
              type="button"
              (click)="activeView.set('trainer')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="activeView() === 'trainer' ? 'bg-primary text-background shadow-xs' : 'text-text-secondary hover:text-text-primary'"
            >
              <mat-icon class="text-[16px]">graphic_eq</mat-icon>
              <span>Afinação & Treino</span>
            </button>
            <button
              type="button"
              (click)="activeView.set('notes')"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              [class]="activeView() === 'notes' ? 'bg-accent text-background shadow-xs' : 'text-text-secondary hover:text-text-primary'"
            >
              <mat-icon class="text-[16px]">record_voice_over</mat-icon>
              <span>Notas 1ª & 2ª Voz</span>
              <span class="px-1.5 py-0.2 rounded-full text-[9px] bg-primary text-background font-bold">Novo</span>
            </button>
          </div>
        </div>
      </app-page-header>

      @if (activeView() === 'notes') {
        <app-vocal-notes-explorer />
      } @else {
        <!-- Callout Banner to Notes Explorer -->
        <button
          type="button"
          (click)="activeView.set('notes')"
          class="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-accent/15 via-surface-elevated to-primary/10 border border-accent/30 flex items-center justify-between gap-4 cursor-pointer hover:border-accent transition-all group focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <mat-icon class="text-[20px]">queue_music</mat-icon>
            </div>
            <div>
              <h4 class="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                Novo: Dicionário Completo de Todas as Notas de 1ª e 2ª Voz
              </h4>
              <p class="text-xs text-text-secondary">
                Consulte todas as 49 notas cromáticas (C2 a C6), detector vocal em tempo real, escalas em dueto e canções clássicas nota a nota.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1 text-xs font-bold text-accent shrink-0">
            <span>Explorar</span>
            <mat-icon class="text-[16px]">arrow_forward</mat-icon>
          </div>
        </button>

        <!-- Main Layout Grid -->
        @if (vocalService.errorMessage()) {
          <div class="lg:col-span-3 p-4 rounded-xl bg-error/10 border border-error/30 flex items-start gap-3">
            <mat-icon class="text-error">error_outline</mat-icon>
            <div>
              <h4 class="text-sm font-bold text-error">Erro no Microfone</h4>
              <p class="text-xs text-text-secondary mt-1">{{ vocalService.errorMessage() }}</p>
            </div>
          </div>
        }
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: Main Interactive Pitch & Exercise Canvas -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <app-card variant="elevated" padding="lg">
            <!-- Active Exercise Banner -->
            @if (vocalService.currentExercise(); as ex) {
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-semibold text-primary">Exercício em Andamento</span>
                    <app-badge variant="primary" size="sm">{{ ex.category }}</app-badge>
                  </div>
                  <h3 class="text-base font-bold text-text-primary mt-0.5">{{ ex.title }}</h3>
                </div>
                <span class="text-xs font-mono text-text-secondary">
                  Tom: {{ ex.keySignature }} | {{ ex.bpm }} BPM
                </span>
              </div>
            }

            <!-- Real-Time Pitch Trainer -->
            <app-vocal-pitch-trainer
              [exercise]="vocalService.currentExercise()"
              [currentNoteIndex]="vocalService.currentNoteIndex()"
              [currentTargetNote]="currentTargetNote()"
              [feedback]="vocalService.feedback()"
              [isMicActive]="vocalService.isMicActive()"
              [isPlayingGuide]="vocalService.isPlayingGuide()"
              [micLevel]="vocalService.micInputLevel()"
              (prevNote)="vocalService.prevNote()"
              (nextNote)="vocalService.nextNote()"
              (selectNoteIndex)="handleSelectNoteIndex($event)"
              (playCurrentTone)="handlePlayCurrentTone()"
              (playSequence)="vocalService.startExerciseSequence()"
              (stopPlayback)="vocalService.stopExercisePlayback()"
              (toggleMic)="handleToggleMic()"
            />
          </app-card>

          <!-- Harmony Projector -->
          <app-harmony-projector [feedback]="vocalService.feedback()" />

          <!-- Instructions & Vocal Tips Card -->
          <app-card variant="default" padding="md">
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <mat-icon class="text-[18px]">lightbulb</mat-icon>
              </div>
              <div class="flex flex-col gap-1">
                <h4 class="text-xs font-semibold text-text-primary">Dica Técnica para este Exercício</h4>
                <p class="text-xs text-text-secondary leading-relaxed">
                  {{ vocalService.currentExercise()?.tips || 'Mantenha a postura ereta e respire pelo diafragma antes de emitir cada nota.' }}
                </p>
              </div>
            </div>
          </app-card>
        </div>

        <!-- Right 1 Col: Exercise Library & Range Tracker -->
        <div class="flex flex-col gap-6">
          <!-- Range Tracker -->
          <app-vocal-range-tracker
            [range]="vocalService.vocalRange()"
            (resetRange)="vocalService.resetRange()"
          />

          <!-- Exercise Library Card -->
          <app-card variant="default" padding="md">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <mat-icon class="text-[18px]">queue_music</mat-icon>
                </div>
                <h3 class="text-xs font-semibold text-text-primary">Exercícios Disponíveis</h3>
              </div>
              <span class="text-[11px] font-mono text-text-secondary">{{ exercises.length }} rotinas</span>
            </div>

            <app-vocal-exercise-selector
              [exercises]="exercises"
              [activeExercise]="vocalService.currentExercise()"
              (exerciseSelected)="handleExerciseSelected($event)"
            />
          </app-card>
        </div>
      </div>
      }
    </div>
  `,
})
export class Vocal implements OnInit {
  readonly vocalService = inject(VocalAudioService);
  readonly exercises = VOCAL_EXERCISES;
  readonly activeView = signal<'trainer' | 'notes'>('trainer');

  ngOnInit(): void {
    if (!this.vocalService.currentExercise() && this.exercises.length > 0) {
      this.vocalService.selectExercise(this.exercises[0]);
    }
  }

  currentTargetNote() {
    const ex = this.vocalService.currentExercise();
    if (!ex) return null;
    return ex.notes[this.vocalService.currentNoteIndex()] || null;
  }

  handleToggleMic(): void {
    if (this.vocalService.isMicActive()) {
      this.vocalService.stopMic();
    } else {
      void this.vocalService.startMic();
    }
  }

  handleExerciseSelected(exercise: VocalExercise): void {
    this.vocalService.selectExercise(exercise);
  }

  handleSelectNoteIndex(index: number): void {
    this.vocalService.currentNoteIndex.set(index);
    const ex = this.vocalService.currentExercise();
    if (ex && ex.notes[index]) {
      this.vocalService.playGuideTone(ex.notes[index].frequency, 1.2);
    }
  }

  handlePlayCurrentTone(): void {
    const target = this.currentTargetNote();
    if (target) {
      this.vocalService.playGuideTone(target.frequency, 1.5);
    }
  }
}
export default Vocal;
