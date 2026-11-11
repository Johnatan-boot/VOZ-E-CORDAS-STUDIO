import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MicrophoneState, TuningStatus } from '../../models/tuner.model';

@Component({
  selector: 'app-tuner-status',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center text-center gap-2 py-3 w-full">
      <!-- Status Message Line with Icon -->
      <div class="flex items-center gap-2 text-xs sm:text-sm font-medium" [class]="statusTextClasses()">
        <mat-icon class="text-[18px]">{{ statusIcon() }}</mat-icon>
        <span>{{ statusMessage() }}</span>
      </div>

      <!-- Live Signal Level Indicator Bar (when microphone is active) -->
      @if (micState() === 'active') {
        <div class="flex items-center gap-2 mt-1 w-full max-w-xs px-4">
          <mat-icon class="text-[14px] text-text-secondary">volume_up</mat-icon>
          <div class="h-1.5 flex-1 rounded-full bg-surface border border-border overflow-hidden">
            <div
              class="h-full bg-primary transition-all duration-75 ease-out rounded-full"
              [style.width.%]="signalLevelPercent()"
            ></div>
          </div>
          <span class="text-[10px] font-mono text-text-secondary w-8 text-right">
            {{ signalLevelPercent() }}%
          </span>
        </div>
      }
    </div>
  `,
})
export class TunerStatus {
  readonly micState = input.required<MicrophoneState>();
  readonly tuningStatus = input<TuningStatus>('unknown');
  readonly signalLevel = input<number>(0);
  readonly errorMessage = input<string | null>(null);

  readonly signalLevelPercent = computed(() => Math.round(this.signalLevel() * 100));

  readonly statusIcon = computed(() => {
    switch (this.micState()) {
      case 'active':
        return this.tuningStatus() === 'unknown' ? 'hearing' : 'graphic_eq';
      case 'requesting-permission':
        return 'sync';
      case 'denied':
        return 'mic_off';
      case 'error':
        return 'error_outline';
      case 'stopped':
        return 'pause_circle_outline';
      case 'idle':
      default:
        return 'mic_none';
    }
  });

  readonly statusMessage = computed(() => {
    if (this.errorMessage()) {
      return this.errorMessage();
    }

    switch (this.micState()) {
      case 'active':
        if (this.tuningStatus() === 'unknown') {
          return 'Microfone ativo — toque uma corda ou emita uma nota vocal';
        }
        return 'Sinal detectado em tempo real';
      case 'requesting-permission':
        return 'Solicitando acesso ao microfone...';
      case 'denied':
        return 'Permissão para o microfone foi negada.';
      case 'error':
        return 'Não foi possível acessar o microfone.';
      case 'stopped':
        return 'Microfone desativado.';
      case 'idle':
      default:
        return 'Microfone desativado. Clique no botão acima para iniciar.';
    }
  });

  readonly statusTextClasses = computed(() => {
    switch (this.micState()) {
      case 'active':
        return this.tuningStatus() === 'tuned'
          ? 'text-success'
          : 'text-text-primary';
      case 'requesting-permission':
        return 'text-accent animate-pulse';
      case 'denied':
      case 'error':
        return 'text-error';
      case 'stopped':
      case 'idle':
      default:
        return 'text-text-secondary';
    }
  });
}
