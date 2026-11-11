import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppCard } from '../../../../shared/ui';
import { VocalRange } from '../../models/vocal.model';

@Component({
  selector: 'app-vocal-range-tracker',
  imports: [DecimalPipe, MatIconModule, AppBadge, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="default" padding="md" class="w-full">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <mat-icon class="text-[18px]">graphic_eq</mat-icon>
          </div>
          <div>
            <h3 class="text-xs font-semibold text-text-primary">Tessitura & Extensão Vocal</h3>
            <p class="text-[11px] text-text-secondary">Detectada automaticamente enquanto você canta</p>
          </div>
        </div>

        <button
          type="button"
          (click)="resetRange.emit()"
          class="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1 cursor-pointer transition-colors"
          title="Reiniciar contagem de extensão"
        >
          <mat-icon class="text-[16px]">refresh</mat-icon>
          <span>Zerar</span>
        </button>
      </div>

      <!-- Range Indicators -->
      <div class="grid grid-cols-2 gap-3 my-3">
        <!-- Lowest Note -->
        <div class="p-3 rounded-xl bg-surface border border-border/80 text-center">
          <span class="text-[10px] font-semibold text-primary">Nota Mais Grave</span>
          <div class="font-serif text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            {{ range().lowestNote || '--' }}
          </div>
          <span class="text-[10px] font-mono text-text-secondary">
            {{ range().lowestFrequency ? (range().lowestFrequency | number: '1.0-0') + ' Hz' : '--' }}
          </span>
        </div>

        <!-- Highest Note -->
        <div class="p-3 rounded-xl bg-surface border border-border/80 text-center">
          <span class="text-[10px] font-semibold text-accent">Nota Mais Aguda</span>
          <div class="font-serif text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            {{ range().highestNote || '--' }}
          </div>
          <span class="text-[10px] font-mono text-text-secondary">
            {{ range().highestFrequency ? (range().highestFrequency | number: '1.0-0') + ' Hz' : '--' }}
          </span>
        </div>
      </div>

      <!-- Classification / Suggestion Badge -->
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border/60 text-xs">
        <span class="text-text-secondary font-medium">Classificação Estimada:</span>
        <app-badge variant="primary" size="sm">
          {{ vocalClassification() }}
        </app-badge>
      </div>
    </app-card>
  `,
})
export class VocalRangeTracker {
  readonly range = input.required<VocalRange>();
  readonly resetRange = output<void>();

  readonly vocalClassification = computed(() => {
    const low = this.range().lowestFrequency;
    const high = this.range().highestFrequency;

    if (!low || !high) {
      return 'Cante para calibrar';
    }

    if (high >= 600) {
      return 'Soprano / Agudo';
    } else if (high >= 440 && low >= 160) {
      return 'Tenor / Mezzo-Soprano';
    } else if (low < 130) {
      return 'Baixo / Barítono';
    } else {
      return 'Voz Média / Barítono';
    }
  });
}
