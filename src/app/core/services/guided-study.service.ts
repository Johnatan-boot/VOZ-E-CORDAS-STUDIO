import { Injectable, signal, computed, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

export interface GuidedStudyStep {
  readonly id: string;
  readonly title: string;
  readonly category: 'Canto' | 'Violão' | 'Dupla';
  readonly icon: string;
  readonly route: string;
  readonly durationMinutes: number;
  readonly durationSeconds: number;
  readonly tip: string;
  readonly targetGoal: string;
}

export const GUIDED_STUDY_STEPS: readonly GuidedStudyStep[] = [
  {
    id: 'step-vocal',
    title: 'Aquecimento Vocal & Diafragma',
    category: 'Canto',
    icon: 'mic',
    route: '/canto',
    durationMinutes: 5,
    durationSeconds: 300,
    tip: 'Pratique sustentação diafragmática e confira a captação na barra de VU meter.',
    targetGoal: 'Aquecer a musculatura laríngea e calibrar a afinação no tom de referência.'
  },
  {
    id: 'step-guitar',
    title: 'Troca de Acordes & Ritmo Sertanejo',
    category: 'Violão',
    icon: 'straighten',
    route: '/violao',
    durationMinutes: 10,
    durationSeconds: 600,
    tip: 'Mantenha a palhetada ou dedilhado constante com o metrônomo.',
    targetGoal: 'Automatizar as transições de pestana sem interrupções rítmicas.'
  },
  {
    id: 'step-duo',
    title: 'Dueto & Harmonia de 1ª e 2ª Voz',
    category: 'Dupla',
    icon: 'group',
    route: '/duo',
    durationMinutes: 15,
    durationSeconds: 900,
    tip: 'Ajuste a transposição se necessário e cante a harmonia em terça sobre a base.',
    targetGoal: 'Consolidar afinação estável de segunda voz em conjunto com o parceiro.'
  }
];

@Injectable({
  providedIn: 'root'
})
export class GuidedStudyService implements OnDestroy {
  private readonly router = inject(Router);

  readonly steps = GUIDED_STUDY_STEPS;
  readonly isActive = signal<boolean>(false);
  readonly isPaused = signal<boolean>(false);
  readonly currentStepIndex = signal<number>(0);
  readonly remainingSeconds = signal<number>(300);
  readonly isCompleted = signal<boolean>(false);
  readonly totalSecondsPracticed = signal<number>(0);

  private timerInterval: number | null = null;
  private audioCtx: AudioContext | null = null;

  readonly currentStep = computed(() => {
    const idx = this.currentStepIndex();
    return this.steps[idx] || this.steps[0];
  });

  readonly isLastStep = computed(() => {
    return this.currentStepIndex() === this.steps.length - 1;
  });

  readonly stepProgress = computed(() => {
    const step = this.currentStep();
    if (!step) return 0;
    const elapsed = step.durationSeconds - this.remainingSeconds();
    return Math.min(100, Math.max(0, Math.round((elapsed / step.durationSeconds) * 100)));
  });

  readonly formattedRemaining = computed(() => {
    const totalSec = this.remainingSeconds();
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  startGuidedSession(): void {
    this.isActive.set(true);
    this.isPaused.set(false);
    this.isCompleted.set(false);
    this.currentStepIndex.set(0);
    this.totalSecondsPracticed.set(0);
    this.remainingSeconds.set(this.steps[0].durationSeconds);

    this.playChime('start');
    void this.router.navigate([this.steps[0].route]);
    this.startTimer();
  }

  pauseResume(): void {
    if (this.isPaused()) {
      this.isPaused.set(false);
      this.startTimer();
    } else {
      this.isPaused.set(true);
      this.clearTimer();
    }
  }

  nextStep(): void {
    const currentIdx = this.currentStepIndex();
    if (currentIdx < this.steps.length - 1) {
      const nextIdx = currentIdx + 1;
      this.currentStepIndex.set(nextIdx);
      this.remainingSeconds.set(this.steps[nextIdx].durationSeconds);
      this.playChime('transition');
      void this.router.navigate([this.steps[nextIdx].route]);
    } else {
      this.finishSession();
    }
  }

  prevStep(): void {
    const currentIdx = this.currentStepIndex();
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      this.currentStepIndex.set(prevIdx);
      this.remainingSeconds.set(this.steps[prevIdx].durationSeconds);
      void this.router.navigate([this.steps[prevIdx].route]);
    }
  }

  stopSession(): void {
    this.clearTimer();
    this.isActive.set(false);
    this.isPaused.set(false);
    this.isCompleted.set(false);
  }

  closeCompletionModal(): void {
    this.isCompleted.set(false);
    this.isActive.set(false);
  }

  private finishSession(): void {
    this.clearTimer();
    this.isActive.set(false);
    this.isCompleted.set(true);
    this.playChime('victory');
  }

  private startTimer(): void {
    this.clearTimer();
    this.timerInterval = window.setInterval(() => {
      if (this.isPaused()) return;

      this.totalSecondsPracticed.update(s => s + 1);

      if (this.remainingSeconds() > 1) {
        this.remainingSeconds.update(s => s - 1);
      } else {
        // Step complete!
        this.nextStep();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private playChime(type: 'start' | 'transition' | 'victory'): void {
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        void this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const pitches = type === 'start' ? [523.25, 659.25] : (type === 'transition' ? [440, 554.37, 659.25] : [523.25, 659.25, 783.99, 1046.5]);

      pitches.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      void this.audioCtx.close();
    }
  }
}
