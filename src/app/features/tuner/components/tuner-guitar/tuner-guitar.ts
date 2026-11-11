import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GUITAR_STRINGS } from '../../data/tuner.data';

@Component({
  selector: 'app-tuner-guitar',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full flex flex-col items-center justify-center p-2 sm:p-4">
      <div class="flex items-center justify-between w-full max-w-md mb-4 px-2">
        <div class="flex items-center gap-1.5">
          <mat-icon class="text-[18px] text-primary">audiotrack</mat-icon>
          <span class="text-xs font-bold text-text-primary uppercase tracking-wider">
            Cordas do Violão (Afinação Padrão)
          </span>
        </div>
        <span class="text-[11px] text-text-secondary">
          Clique para ouvir o som
        </span>
      </div>

      <!-- Interactive Guitar Strings -->
      <div class="grid grid-cols-6 gap-2 sm:gap-3 w-full max-w-md">
        @for (s of strings; track s.num) {
          <button
            type="button"
            (click)="onStringClick(s.num)"
            [class]="getStringButtonClass(s.num)"
            class="group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            [attr.aria-label]="'Tocar corda ' + s.name + ' ' + s.note"
          >
            <!-- Soundwave indicator if currently playing -->
            @if (activePlayingString() === s.num) {
              <span class="absolute -top-1 -right-1 flex h-4 w-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-4 w-4 bg-primary text-text-inverse items-center justify-center text-[9px]">
                  <mat-icon class="text-[10px]">volume_up</mat-icon>
                </span>
              </span>
            }

            <!-- Note Letter -->
            <span class="text-lg sm:text-2xl font-serif font-black leading-none group-hover:text-primary transition-colors">
              {{ s.note }}
            </span>

            <!-- String Number & Octave -->
            <span class="text-[10px] font-bold mt-1 opacity-70">
              {{ s.num }}ª Corda
            </span>

            <!-- Frequency Target -->
            <span class="text-[9px] font-mono text-text-secondary/80 mt-0.5">
              {{ s.freq }}Hz
            </span>

            <!-- Mini play icon on hover -->
            <div class="mt-1 flex items-center justify-center text-[12px] opacity-60 group-hover:opacity-100 group-hover:text-primary">
              <mat-icon class="text-[14px]">volume_up</mat-icon>
            </div>
          </button>
        }
      </div>

      <!-- Feedback Guidance Message -->
      <div class="mt-4 min-h-8 flex items-center justify-center text-center px-4">
        @if (activeStringData(); as str) {
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold animate-fade-in"
               [class]="getFeedbackBadgeClass(str.status)">
            <mat-icon class="text-[16px]">{{ getFeedbackIcon(str.status) }}</mat-icon>
            <span>{{ getFeedbackText(str) }}</span>
          </div>
        } @else if (activePlayingString()) {
          <span class="text-xs text-primary font-medium animate-pulse flex items-center gap-1.5">
            <mat-icon class="text-[16px]">volume_up</mat-icon>
            Reproduzindo tom de referência do violão...
          </span>
        } @else {
          <span class="text-xs text-text-secondary">
            Toque qualquer corda no violão ou clique acima para ouvir a referência
          </span>
        }
      </div>
    </div>
  `,
})
export class TunerGuitar {
  readonly frequency = input<number>(0);
  readonly activePlayingString = input<number | null>(null);
  readonly stringClicked = output<number>();

  readonly strings = GUITAR_STRINGS;

  readonly activeStringData = computed(() => {
    const freq = this.frequency();
    if (!freq || freq < 50) return null;

    let closestString = this.strings[0];
    let minDiff = Math.abs(1200 * Math.log2(freq / closestString.freq));

    for (let i = 1; i < this.strings.length; i++) {
      const diff = Math.abs(1200 * Math.log2(freq / this.strings[i].freq));
      if (diff < minDiff) {
        minDiff = diff;
        closestString = this.strings[i];
      }
    }

    // Apenas reconhece se estiver dentro de +/- 250 cents (2.5 semitons) da corda
    if (minDiff > 250) return null;

    const cents = Math.round(1200 * Math.log2(freq / closestString.freq));
    let status: 'tuned' | 'flat' | 'sharp' = 'tuned';

    if (cents < -10) status = 'flat';
    else if (cents > 10) status = 'sharp';

    return {
      stringNum: closestString.num,
      name: closestString.name,
      note: closestString.note,
      status,
      cents,
      targetFreq: closestString.freq,
    };
  });

  onStringClick(num: number): void {
    this.stringClicked.emit(num);
  }

  getStringButtonClass(stringNum: number): string {
    const data = this.activeStringData();
    const isPlaying = this.activePlayingString() === stringNum;

    if (isPlaying) {
      return 'border-primary bg-primary/15 text-primary shadow-[0_0_15px_rgba(202,138,4,0.3)] ring-2 ring-primary/40 scale-105';
    }

    if (!data || data.stringNum !== stringNum) {
      return 'border-border/60 text-text-primary bg-surface-elevated/80 hover:border-primary/50 hover:bg-surface-elevated';
    }

    if (data.status === 'tuned') {
      return 'border-success text-success bg-success/15 shadow-[0_0_18px_rgba(34,197,94,0.4)] ring-2 ring-success/50 scale-105 font-bold';
    }
    if (data.status === 'sharp') {
      return 'border-error text-error bg-error/15 shadow-[0_0_12px_rgba(239,68,68,0.3)] ring-1 ring-error/40 scale-102';
    }
    if (data.status === 'flat') {
      return 'border-warning text-warning bg-warning/15 shadow-[0_0_12px_rgba(245,158,11,0.3)] ring-1 ring-warning/40 scale-102';
    }

    return 'border-border text-text-primary bg-surface-elevated';
  }

  getFeedbackBadgeClass(status: 'tuned' | 'flat' | 'sharp'): string {
    switch (status) {
      case 'tuned':
        return 'border-success/30 bg-success/10 text-success';
      case 'flat':
        return 'border-warning/30 bg-warning/10 text-warning';
      case 'sharp':
        return 'border-error/30 bg-error/10 text-error';
    }
  }

  getFeedbackIcon(status: 'tuned' | 'flat' | 'sharp'): string {
    switch (status) {
      case 'tuned':
        return 'check_circle';
      case 'flat':
        return 'arrow_upward';
      case 'sharp':
        return 'arrow_downward';
    }
  }

  getFeedbackText(str: { stringNum: number; name: string; note: string; status: 'tuned' | 'flat' | 'sharp'; cents: number }): string {
    switch (str.status) {
      case 'tuned':
        return `${str.name} (${str.note}) Afinada com perfeição!`;
      case 'flat':
        return `${str.name} (${str.note}) está GRAVE (${str.cents}¢) — Aperte a tarracha`;
      case 'sharp':
        return `${str.name} (${str.note}) está AGUDA (+${str.cents}¢) — Afrouxe a tarracha`;
    }
  }
}
