import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppButton, AppCard } from '../../../../shared/ui';
import { VocalPitchFeedback } from '../../models/vocal.model';
import { VocalAudioService } from '../../services/vocal-audio.service';

interface HarmonyOption {
  label: string;
  ratio: number;
  description: string;
}

interface KeyboardKey {
  name: string;
  frequency: number;
}

@Component({
  selector: 'app-harmony-projector',
  imports: [DecimalPipe, MatIconModule, AppButton, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="default" padding="lg">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <mat-icon class="text-[18px]">group</mat-icon>
            </div>
            <h3 class="text-base font-bold text-text-primary">Projeção de Harmonia (2ª Voz)</h3>
          </div>
          <p class="text-xs text-text-secondary leading-relaxed">
            Descubra como seria a segunda voz do seu parceiro ao cantar. Selecione um intervalo e ouça em tempo real.
          </p>
        </div>

        <app-button
          [variant]="vocalService.isHarmonyActive() ? 'primary' : 'secondary'"
          size="md"
          [icon]="vocalService.isHarmonyActive() ? 'surround_sound' : 'play_circle_outline'"
          (clicked)="vocalService.toggleHarmony()"
        >
          {{ vocalService.isHarmonyActive() ? 'Desativar Projeção' : 'Ativar Projeção' }}
        </app-button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
        @for (option of harmonyOptions; track option.label) {
          <button
            type="button"
            (click)="vocalService.setHarmonyInterval(option.ratio)"
            class="flex flex-col p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer"
            [class]="vocalService.harmonyIntervalRatio() === option.ratio
              ? 'bg-accent/10 border-accent/40 shadow-sm'
              : 'bg-surface border-border hover:border-text-secondary/30 hover:bg-surface-elevated'"
          >
            <div class="flex items-center justify-between w-full mb-1">
              <span class="text-xs font-bold"
                [class]="vocalService.harmonyIntervalRatio() === option.ratio ? 'text-accent' : 'text-text-primary'"
              >
                {{ option.label }}
              </span>
              @if (vocalService.harmonyIntervalRatio() === option.ratio) {
                <mat-icon class="text-accent text-[14px]">check_circle</mat-icon>
              }
            </div>
            <span class="text-[9px] text-text-secondary leading-tight">{{ option.description }}</span>
          </button>
        }
      </div>

      <div class="relative w-full rounded-2xl bg-surface-elevated border border-border p-6 flex flex-col items-center justify-center overflow-hidden">
        @if (vocalService.isHarmonyActive() && feedback().isSinging) {
          <div class="absolute inset-0 bg-accent/5 animate-pulse pointer-events-none"></div>
        }
        
        <div class="flex flex-col sm:flex-row items-center gap-8 z-10 w-full justify-center">
          
          <!-- Your Voice -->
          <div class="flex flex-col items-center flex-1">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Sua Voz</span>
            <div class="h-24 w-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-lg"
                 [class]="feedback().isSinging ? 'border-primary bg-primary/10 scale-110' : 'border-border bg-background'">
              <span class="font-mono text-2xl font-bold transition-colors" [class]="feedback().isSinging ? 'text-text-primary' : 'text-text-secondary/40'">
                {{ feedback().sungNoteName || '--' }}
              </span>
            </div>
            <span class="font-mono text-xs font-semibold mt-3 text-text-secondary">
              {{ feedback().isSinging ? (feedback().sungFrequency | number: '1.1-1') + ' Hz' : '--' }}
            </span>
          </div>

          <!-- Connection -->
          <div class="hidden sm:flex flex-col items-center text-accent/50 shrink-0">
            <mat-icon>linear_scale</mat-icon>
            <span class="text-[10px] font-bold mt-1 text-accent">HARMONIZANDO</span>
          </div>

          <!-- Projected Voice -->
          <div class="flex flex-col items-center flex-1">
            <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-2">2ª Voz (Parceiro)</span>
            <div class="h-24 w-24 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 shadow-lg text-center"
                 [class]="vocalService.isHarmonyActive() && feedback().isSinging ? 'border-accent bg-accent/20 scale-110' : 'border-border bg-background'">
              @if (vocalService.isHarmonyActive() && feedback().isSinging) {
                <span class="font-mono text-xl sm:text-2xl font-bold text-accent leading-none">
                  {{ projectedNote().note }}
                </span>
                <span class="text-[11px] font-semibold text-text-primary mt-1 leading-none">
                  {{ projectedNote().namePt }}
                </span>
              } @else {
                <mat-icon class="text-3xl text-text-secondary/40">
                  record_voice_over
                </mat-icon>
              }
            </div>
            <span class="font-mono text-xs font-semibold mt-3" [class]="vocalService.isHarmonyActive() && feedback().isSinging ? 'text-accent' : 'text-text-secondary'">
              {{ (vocalService.isHarmonyActive() && feedback().isSinging) ? ((feedback().sungFrequency * vocalService.harmonyIntervalRatio()) | number: '1.1-1') + ' Hz' : '--' }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Virtual Vocal Keyboard for testing Harmony without Mic -->
      <div class="mt-8 pt-6 border-t border-border/60">
        <div class="flex items-center justify-between mb-4">
           <h4 class="text-xs font-bold text-text-secondary uppercase tracking-wider">Teclado Virtual de Teste</h4>
           <span class="text-[10px] text-text-secondary">Pressione e segure para simular sua voz</span>
        </div>
        <div class="flex justify-center gap-1 sm:gap-2">
          @for (key of keyboardKeys; track key.name) {
             <button
                class="flex flex-col items-center justify-end h-24 sm:h-32 w-10 sm:w-12 rounded-b-xl border transition-all duration-150 select-none cursor-pointer"
                [class]="activeSimKey() === key.name ? 'bg-primary border-primary text-bg translate-y-1 shadow-inner' : 'bg-surface border-border text-text-primary hover:bg-surface-elevated hover:border-text-secondary/30'"
                (mousedown)="playSimKey(key)"
                (touchstart)="playSimKey(key)"
                (mouseup)="stopSimKey()"
                (mouseleave)="stopSimKey()"
                (touchend)="stopSimKey()"
             >
                <span class="text-xs font-bold mb-2">{{ key.name }}</span>
             </button>
          }
        </div>
      </div>

      @if (!vocalService.isMicActive()) {
        <div class="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3">
          <mat-icon class="text-primary text-[20px]">mic_off</mat-icon>
          <span class="text-xs text-text-primary font-medium">O microfone precisa estar ativo para ouvir a projeção de harmonia.</span>
        </div>
      }
    </app-card>
  `,
})
export class HarmonyProjector {
  readonly vocalService = inject(VocalAudioService);
  readonly feedback = input.required<VocalPitchFeedback>();

  readonly projectedNote = computed(() => {
    const isSinging = this.feedback().isSinging;
    const sungFreq = this.feedback().sungFrequency;
    const ratio = this.vocalService.harmonyIntervalRatio();
    if (!isSinging || !sungFreq || sungFreq <= 30) {
      return { note: '--', namePt: '--' };
    }
    const targetFreq = sungFreq * ratio;
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const ptNames: Record<string, string> = {
      'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
      'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
    };
    const midi = Math.round(12 * (Math.log(targetFreq / 440) / Math.log(2))) + 69;
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = ((midi % 12) + 12) % 12;
    const pitchClass = noteStrings[noteIndex];
    const note = pitchClass + octave;
    const namePt = (ptNames[pitchClass] || pitchClass) + ' ' + octave;
    return { note, namePt };
  });

  readonly harmonyOptions: HarmonyOption[] = [
    { label: '2ª Menor', ratio: 1.0595, description: 'Tensão dramática, meio tom.' },
    { label: '2ª Maior', ratio: 1.1225, description: 'Suspensão e movimento.' },
    { label: '3ª Menor', ratio: 1.1892, description: 'Sombrio, tom menor.' },
    { label: '3ª Maior', ratio: 1.2599, description: 'Clássico dueto pop/alegre.' },
    { label: '4ª Justa', ratio: 1.3348, description: 'Aberto, som de canto gregoriano.' },
    { label: 'Trítono', ratio: 1.4142, description: 'Dissonância severa (4ª Aum).' },
    { label: '5ª Justa', ratio: 1.4983, description: 'Poderoso, som de rock/coral.' },
    { label: '6ª Menor', ratio: 1.5874, description: 'Melancolia e tensão.' },
    { label: '6ª Maior', ratio: 1.6818, description: 'Harmonia country/blues.' },
    { label: '7ª Menor', ratio: 1.7818, description: 'Ar rústico, dominante.' },
    { label: '7ª Maior', ratio: 1.8877, description: 'Sonhador e instável.' },
    { label: 'Oitava', ratio: 2.0000, description: 'Dobrar voz aguda/grave.' }
  ];

  readonly keyboardKeys: KeyboardKey[] = [
    { name: 'C3', frequency: 130.81 },
    { name: 'D3', frequency: 146.83 },
    { name: 'E3', frequency: 164.81 },
    { name: 'F3', frequency: 174.61 },
    { name: 'G3', frequency: 196.00 },
    { name: 'A3', frequency: 220.00 },
    { name: 'B3', frequency: 246.94 },
    { name: 'C4', frequency: 261.63 },
  ];

  readonly activeSimKey = signal<string | null>(null);

  playSimKey(key: KeyboardKey): void {
    // Only allow simulation if mic is off to prevent conflicts
    if (this.vocalService.isMicActive()) return;
    this.activeSimKey.set(key.name);
    this.vocalService.startSimulatedVocal(key.frequency, key.name);
  }

  stopSimKey(): void {
    if (this.activeSimKey() !== null) {
      this.activeSimKey.set(null);
      this.vocalService.stopSimulatedVocal();
    }
  }
}
