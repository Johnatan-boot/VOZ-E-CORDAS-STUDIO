import { ChangeDetectionStrategy, Component, effect, input, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppButton } from '../../../../shared/ui';

@Component({
  selector: 'app-metronome',
  imports: [MatIconModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center p-6 bg-surface rounded-2xl border border-border w-full max-w-sm mx-auto shadow-sm">
      <div class="flex items-center gap-2 mb-6">
        <mat-icon class="text-primary text-[20px]">timer</mat-icon>
        <h3 class="text-sm font-semibold text-text-primary">Metrônomo</h3>
      </div>

      <!-- BPM Display & Controls -->
      <div class="flex items-center justify-between w-full mb-8 px-4">
        <button type="button" (click)="decreaseBpm()" class="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-border/60 hover:bg-surface-elevated hover:text-primary transition-colors cursor-pointer disabled:opacity-50" [disabled]="isPlaying()">
          <mat-icon>remove</mat-icon>
        </button>

        <div class="flex flex-col items-center">
          <span class="text-5xl font-mono font-bold text-text-primary tabular-nums">{{ bpm() }}</span>
          <span class="text-[10px] font-semibold text-text-secondary mt-1">BPM</span>
        </div>

        <button type="button" (click)="increaseBpm()" class="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-border/60 hover:bg-surface-elevated hover:text-primary transition-colors cursor-pointer disabled:opacity-50" [disabled]="isPlaying()">
          <mat-icon>add</mat-icon>
        </button>
      </div>

      <!-- Visual Beat Indicators -->
      <div class="flex items-center gap-3 mb-8">
        @for (beat of [0, 1, 2, 3]; track beat) {
          <div 
            class="w-4 h-4 rounded-full transition-all duration-75"
            [class.bg-primary]="currentBeat() === beat && isPlaying()"
            [class.shadow-[0_0_12px_rgba(var(--color-primary),0.6)]]="currentBeat() === beat && isPlaying()"
            [class.scale-125]="currentBeat() === beat && isPlaying()"
            [class.bg-border]="currentBeat() !== beat || !isPlaying()"
          ></div>
        }
      </div>

      <!-- Play/Pause Action -->
      <app-button
        [variant]="isPlaying() ? 'secondary' : 'primary'"
        size="lg"
        class="w-full"
        [icon]="isPlaying() ? 'stop' : 'play_arrow'"
        (clicked)="togglePlay()"
      >
        {{ isPlaying() ? 'Parar Metrônomo' : 'Iniciar Metrônomo' }}
      </app-button>
    </div>
  `
})
export class Metronome implements OnDestroy {
  readonly initialBpm = input<number>(80);
  
  readonly bpm = signal<number>(80);
  readonly isPlaying = signal<boolean>(false);
  readonly currentBeat = signal<number>(-1);
  
  private audioContext: AudioContext | null = null;
  private timerID: number | null = null;
  private nextNoteTime = 0.0;
  private beatInMeasure = 0;
  private lookahead = 25.0; // ms
  private scheduleAheadTime = 0.1; // s

  constructor() {
    effect(() => {
      this.bpm.set(this.initialBpm());
    }, { allowSignalWrites: true });
  }

  decreaseBpm() {
    if (this.bpm() > 40) this.bpm.update(b => b - 1);
  }

  increaseBpm() {
    if (this.bpm() < 240) this.bpm.update(b => b + 1);
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    
    if (this.audioContext.state === 'suspended') {
      void this.audioContext.resume();
    }

    this.isPlaying.set(true);
    this.beatInMeasure = 0;
    this.currentBeat.set(0);
    this.nextNoteTime = this.audioContext.currentTime + 0.05;
    this.scheduler();
  }

  private stop() {
    this.isPlaying.set(false);
    this.currentBeat.set(-1);
    if (this.timerID !== null) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  private scheduleNote(beatNumber: number, time: number) {
    // Update visual beat (requires small setTimeout to align with audio time roughly in UI)
    const timeUntilNote = time - this.audioContext!.currentTime;
    setTimeout(() => {
      if (this.isPlaying()) {
        this.currentBeat.set(beatNumber);
      }
    }, Math.max(0, timeUntilNote * 1000));

    // Play audio click
    const osc = this.audioContext!.createOscillator();
    const envelope = this.audioContext!.createGain();

    osc.connect(envelope);
    envelope.connect(this.audioContext!.destination);

    if (beatNumber === 0) {
      osc.frequency.value = 880.0; // Higher pitch for first beat
    } else {
      osc.frequency.value = 440.0;
    }

    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.bpm();
    this.nextNoteTime += secondsPerBeat;
    this.beatInMeasure = (this.beatInMeasure + 1) % 4; // 4/4 time
  }

  private scheduler() {
    if (!this.isPlaying()) return;

    while (this.nextNoteTime < this.audioContext!.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.beatInMeasure, this.nextNoteTime);
      this.nextNote();
    }
    this.timerID = window.setTimeout(() => this.scheduler(), this.lookahead);
  }

  ngOnDestroy() {
    this.stop();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        void this.audioContext.close();
      } catch {
        // ignore
      }
    }
  }
}
