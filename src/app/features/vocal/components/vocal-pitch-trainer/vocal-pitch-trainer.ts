import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, effect, ElementRef, viewChild, PLATFORM_ID, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton } from '../../../../shared/ui';
import { ExerciseNote, VocalExercise, VocalPitchFeedback } from '../../models/vocal.model';

@Component({
  selector: 'app-vocal-pitch-trainer',
  imports: [DecimalPipe, MatIconModule, AppBadge, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center w-full gap-4 select-none">
      <!-- Exercise Step Navigation & Target Note Header -->
      <div class="flex items-center justify-between w-full border-b border-border/60 pb-3">
        <div class="flex items-center gap-2">
          <app-button
            variant="ghost"
            size="sm"
            icon="chevron_left"
            [disabled]="!exercise() || currentNoteIndex() === 0"
            (clicked)="prevNote.emit()"
          >
            Anterior
          </app-button>
        </div>
        <!-- Notes Navigation Strip -->
        <div class="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none px-2">
          @if (exercise(); as ex) {
            @for (note of ex.notes; track $index) {
              <button
                type="button"
                (click)="selectNoteIndex.emit($index)"
                [class]="$index === currentNoteIndex()
                  ? 'bg-primary text-background font-bold shadow-sm scale-110'
                  : 'bg-surface text-text-secondary hover:text-text-primary border border-border/80'"
                class="flex flex-col items-center justify-center w-9 h-11 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer"
              >
                <span>{{ note.name }}</span>
                <span class="text-[9px] opacity-70">{{ note.octave }}</span>
              </button>
            }
          }
        </div>
        <div class="flex items-center gap-2">
          <app-button
            variant="ghost"
            size="sm"
            icon="chevron_right"
            [disabled]="!exercise() || (exercise()?.notes?.length ?? 0) <= currentNoteIndex() + 1"
            (clicked)="nextNote.emit()"
          >
            Próxima
          </app-button>
        </div>
      </div>

      <!-- Main Visual Focus: Target vs Sung Note Canvas Card -->
      <div class="relative w-full rounded-xl bg-surface border border-border p-3 sm:p-4 flex flex-col items-center justify-center overflow-hidden shadow-lg">
        
        <!-- Live Microphone VU Meter Bar -->
        <div class="w-full max-w-xl mb-3 px-3 py-2 rounded-xl bg-surface-elevated/80 border border-border/80 flex flex-col gap-1.5 z-10 transition-all">
          <div class="flex items-center justify-between text-[11px]">
            <div class="flex items-center gap-1.5 font-semibold">
              <mat-icon class="text-[15px]" [class]="isMicActive() ? (micLevel() > 8 ? 'text-success animate-pulse' : 'text-primary') : 'text-text-secondary'">
                {{ isMicActive() ? 'mic' : 'mic_off' }}
              </mat-icon>
              <span [class]="isMicActive() ? 'text-text-primary' : 'text-text-secondary'">
                {{ isMicActive() ? 'Captação Vocal Ativa (VU Meter)' : 'Microfone em Espera' }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              @if (isMicActive()) {
                <span class="text-[10px] font-medium"
                      [class]="micLevel() > 75 ? 'text-warning font-bold' : (micLevel() >= 12 ? 'text-success font-semibold' : 'text-text-secondary')">
                  {{ micLevel() > 75 ? 'Sinal Forte' : (micLevel() >= 12 ? 'Captação Ideal' : 'Aguardando Voz...') }}
                </span>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-text-primary font-bold">
                  {{ micLevel() }}%
                </span>
              } @else {
                <span class="text-[10px] text-text-secondary">Ative o mic para cantar</span>
              }
            </div>
          </div>

          <!-- Dynamic Multi-Segment LED VU Meter Bar -->
          <div class="w-full h-2.5 rounded-full bg-background border border-border/60 overflow-hidden relative flex items-center p-0.5">
            <div
              class="h-full rounded-full transition-all duration-75"
              [style.width.%]="isMicActive() ? micLevel() : 0"
              [class]="micLevel() > 80 ? 'bg-gradient-to-r from-success via-warning to-error' : (micLevel() > 20 ? 'bg-gradient-to-r from-success to-primary' : 'bg-primary/50')"
            ></div>
            <!-- Threshold Markers -->
            <div class="absolute left-[35%] top-0 bottom-0 w-[1px] bg-border/80"></div>
            <div class="absolute left-[70%] top-0 bottom-0 w-[1px] bg-border/80"></div>
            <div class="absolute left-[88%] top-0 bottom-0 w-[1px] bg-error/40"></div>
          </div>
        </div>

        <!-- Background subtle glow based on accuracy -->
        @if (feedback().isSinging) {
          <div
            class="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-[0.15]"
            [class.bg-success]="feedback().isAccurate"
            [class.bg-primary]="!feedback().isAccurate"
          ></div>
        }

        <!-- Top Target Badge -->
        <div class="flex items-center gap-3 mb-2 z-10">
          <app-badge variant="default" size="sm">
            TOM ALVO DE REFERÊNCIA
          </app-badge>
          <button
            type="button"
            (click)="playCurrentTone.emit()"
            class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors cursor-pointer border border-primary/20"
          >
            <mat-icon class="text-[16px]">volume_up</mat-icon>
            <span>Ouvir Tom</span>
          </button>
        </div>

        <!-- Target Note Display -->
        <div class="flex items-baseline gap-2 my-2 z-10">
          <span class="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-text-primary drop-shadow-sm">
            {{ currentTargetNote()?.name || '--' }}
          </span>
          <span class="font-mono text-2xl sm:text-3xl font-bold text-primary">
            {{ currentTargetNote()?.octave || '' }}
          </span>
          <span class="text-xs font-mono text-text-secondary ml-2">
            ({{ currentTargetNote()?.frequency || 0 }} Hz)
          </span>
        </div>

        <!-- Spectacular Canvas Trace Graph -->
        <div class="w-full max-w-2xl my-2 relative z-10">
          <div class="flex justify-between text-[10px] font-semibold text-text-secondary mb-1">
            <span class="text-primary/80">Grave (-50¢)</span>
            <span class="text-success font-bold tracking-widest uppercase">Alvo Exato</span>
            <span class="text-accent/80">Agudo (+50¢)</span>
          </div>
          
          <div class="relative w-full h-[60px] sm:h-[80px] rounded-xl bg-background border border-border/80 overflow-hidden shadow-inner flex items-center justify-center">
             <!-- The Canvas Trace -->
             <canvas #traceCanvas width="800" height="240" class="w-full h-full object-fill"></canvas>
             
             <!-- Center Line Overlay (for crispness over canvas) -->
             <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-success/60 z-10 border-b border-dashed border-success/40"></div>
          </div>
        </div>

        <!-- Live Vocal Feedback Box -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg mt-3 pt-3 border-t border-border/60 text-center z-10">
          <div class="flex flex-col items-center">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Sua Voz</span>
            <span class="font-mono text-lg font-bold mt-0.5 transition-colors" [class]="feedback().isSinging ? 'text-text-primary' : 'text-text-secondary/40'">
              {{ feedback().sungNoteName || '--' }}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Frequência</span>
            <span class="font-mono text-lg font-bold mt-0.5 text-text-primary transition-colors">
              {{ feedback().isSinging ? (feedback().sungFrequency | number: '1.1-1') + ' Hz' : '--' }}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Desvio</span>
            <span
              class="font-mono text-lg font-bold mt-0.5 transition-colors"
              [class]="feedback().isAccurate ? 'text-success' : 'text-primary'"
            >
              {{ feedback().isSinging ? (feedback().centsDifference > 0 ? '+' : '') + feedback().centsDifference + '¢' : '--' }}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Precisão</span>
            <span
              class="font-mono text-lg font-bold mt-0.5 transition-colors"
              [class]="feedback().accuracyScore >= 80 ? 'text-success' : 'text-primary'"
            >
              {{ feedback().isSinging ? feedback().accuracyScore + '%' : '--' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Audio & Sequence Controls -->
      <div class="flex flex-wrap items-center justify-center gap-3 w-full">
        @if (isMicActive()) {
          <app-button
            variant="secondary"
            size="md"
            icon="mic_off"
            (clicked)="toggleMic.emit()"
          >
            Parar Microfone
          </app-button>
        } @else {
          <app-button
            variant="primary"
            size="md"
            icon="mic"
            (clicked)="toggleMic.emit()"
          >
            Ativar Captação Vocal
          </app-button>
        }

        @if (isPlayingGuide()) {
          <app-button
            variant="secondary"
            size="md"
            icon="stop"
            (clicked)="stopPlayback.emit()"
          >
            Parar Sequência
          </app-button>
        } @else {
          <app-button
            variant="secondary"
            size="md"
            icon="play_arrow"
            [disabled]="!exercise()"
            (clicked)="playSequence.emit()"
          >
            Tocar Sequência do Exercício
          </app-button>
        }
      </div>
    </div>
  `,
})
export class VocalPitchTrainer {
  readonly platformId = inject(PLATFORM_ID);
  readonly traceCanvas = viewChild<ElementRef<HTMLCanvasElement>>('traceCanvas');

  readonly exercise = input<VocalExercise | null>(null);
  readonly currentNoteIndex = input<number>(0);
  readonly currentTargetNote = input<ExerciseNote | null>(null);
  readonly feedback = input.required<VocalPitchFeedback>();
  readonly isMicActive = input.required<boolean>();
  readonly isPlayingGuide = input.required<boolean>();
  readonly micLevel = input<number>(0);

  readonly prevNote = output<void>();
  readonly nextNote = output<void>();
  readonly selectNoteIndex = output<number>();
  readonly playCurrentTone = output<void>();
  readonly playSequence = output<void>();
  readonly stopPlayback = output<void>();
  readonly toggleMic = output<void>();

  private pitchHistory: { cents: number; isSinging: boolean }[] = [];
  private readonly maxHistory = 150; // Number of points on the X axis

  constructor() {
    effect(() => {
      const fb = this.feedback();
      if (!isPlatformBrowser(this.platformId)) return;

      const canvasEl = this.traceCanvas()?.nativeElement;
      if (!canvasEl) return;

      // Add to history (scroll effect)
      this.pitchHistory.push({ cents: fb.centsDifference, isSinging: fb.isSinging });
      if (this.pitchHistory.length > this.maxHistory) {
        this.pitchHistory.shift();
      }

      this.drawTrace(canvasEl);
    });
  }

  private drawTrace(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear previous frame
    ctx.clearRect(0, 0, w, h);

    // Draw Tuning Tolerance Band (±20 cents = 40% of height since full height is 100 cents)
    const pixelsPerCent = h / 100; 
    ctx.fillStyle = 'rgba(74, 222, 128, 0.08)'; // success very faint
    ctx.fillRect(0, h / 2 - 20 * pixelsPerCent, w, 40 * pixelsPerCent);

    if (this.pitchHistory.length === 0) return;

    const stepX = w / (this.maxHistory - 1);

    ctx.beginPath();
    let isPathStarted = false;

    for (let i = 0; i < this.pitchHistory.length; i++) {
      const pt = this.pitchHistory[i];
      if (!pt.isSinging) {
        isPathStarted = false;
        continue;
      }

      const x = i * stepX;
      // Clamp between -50 and 50 to fit inside canvas
      const clampedCents = Math.max(-50, Math.min(50, pt.cents));
      // Invert Y axis: negative cents (flat) go down, positive (sharp) go up
      // but in canvas 0 is top, so we subtract cents from half-height
      const y = h / 2 - (clampedCents * pixelsPerCent);

      if (!isPathStarted) {
        ctx.moveTo(x, y);
        isPathStarted = true;
      } else {
        // Curve to make it look smooth
        ctx.lineTo(x, y);
      }
    }

    // Glowing trace style
    ctx.strokeStyle = '#ca8a04'; // Tailwind Primary (amber/yellow equivalent)
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(202, 138, 4, 0.6)';
    ctx.shadowBlur = 12;
    ctx.stroke();
    
    // Reset shadow for next drawing
    ctx.shadowBlur = 0;
  }
}
