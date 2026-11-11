import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  AppBadge,
  AppCard,
  AppDivider,
  AppPageHeader,
} from '../../shared/ui';
import { TunerControls } from './components/tuner-controls/tuner-controls';
import { TunerDisplay } from './components/tuner-display/tuner-display';
import { TunerMeter } from './components/tuner-meter/tuner-meter';
import { TunerStatus } from './components/tuner-status/tuner-status';
import { TunerGuitar } from './components/tuner-guitar/tuner-guitar';
import { TunerAudioService } from './services/tuner-audio.service';

@Component({
  selector: 'app-tuner',
  imports: [
    MatIconModule,
    AppCard,
    AppBadge,
    AppDivider,
    AppPageHeader,
    TunerDisplay,
    TunerMeter,
    TunerControls,
    TunerStatus,
    TunerGuitar
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full animate-fade-in pb-12">
      <!-- Page Header -->
      <app-page-header
        title="Afinador Cromático"
        description="Afine sua voz ou instrumento em tempo real com precisão de centésimos."
        category="FERRAMENTA MUSICAL"
        icon="tune"
      >
        <div slot="page-actions" class="flex items-center gap-2">
          <app-badge variant="primary" size="sm">
            Calibração: A4 = 440 Hz
          </app-badge>
        </div>
      </app-page-header>

      <!-- Quick Onboarding / Status Banner -->
      @if (tunerService.micState() === 'idle' || tunerService.micState() === 'stopped') {
        <div class="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-text-inverse shrink-0 shadow-sm">
              <mat-icon class="text-[22px]">mic</mat-icon>
            </div>
            <div>
              <h3 class="text-sm font-bold text-text-primary">Como colocar o afinador para funcionar:</h3>
              <p class="text-xs text-text-secondary mt-0.5 leading-relaxed">
                1. Clique em <strong>"Ativar Microfone Agora"</strong> e permita o acesso no seu navegador.<br>
                2. Toque uma corda do seu violão e o ponteiro identificará a nota automaticamente.<br>
                3. <em>Sem microfone?</em> Clique em qualquer corda abaixo para <strong>ouvir o tom de referência</strong> ou clique em <strong>Testar Corda</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            (click)="handleStartTuner()"
            class="px-5 py-2.5 rounded-xl bg-primary text-text-inverse font-bold text-xs hover:bg-primary-hover transition-colors shadow-sm shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <mat-icon class="text-[18px]">mic</mat-icon>
            Ativar Microfone Agora
          </button>
        </div>
      } @else if (tunerService.micState() === 'active') {
        <div class="mb-6 p-3 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-success text-text-inverse shrink-0">
              <mat-icon class="text-[18px]">hearing</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="inline-block w-2 h-2 rounded-full bg-success animate-ping"></span>
                <h3 class="text-xs font-bold text-success uppercase tracking-wider">Microfone Ativo em Tempo Real</h3>
              </div>
              <p class="text-[11px] text-text-secondary">
                Toque qualquer corda no seu violão ou cante uma nota próxima ao microfone.
              </p>
            </div>
          </div>
          <button
            type="button"
            (click)="handleStopTuner()"
            class="px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary text-xs font-medium hover:text-text-primary transition-colors cursor-pointer"
          >
            Desativar
          </button>
        </div>
      } @else if (tunerService.micState() === 'denied') {
        <div class="mb-6 p-4 rounded-2xl bg-error/10 border border-error/30 flex items-start gap-3">
          <mat-icon class="text-error text-[24px]">mic_off</mat-icon>
          <div>
            <h3 class="text-sm font-bold text-error">Microfone Bloqueado no Navegador</h3>
            <p class="text-xs text-text-secondary mt-1">
              Para o afinador ouvir o seu violão, você precisa conceder permissão. Clique no ícone de cadeado ou câmera/microfone na barra de endereços do navegador e marque "Permitir".
              Enquanto isso, você pode clicar nas cordas abaixo para ouvir o som do violão e afinar de ouvido!
            </p>
          </div>
        </div>
      }

      <!-- Main Tuner Card -->
      <app-card variant="elevated" padding="lg" class="w-full shadow-lg">
        <div class="flex flex-col items-center w-full max-w-2xl mx-auto gap-8">
          
          <!-- Controls: Start / Stop Button & Quick Test Button (Prominent placement) -->
          <div class="w-full">
            <app-tuner-controls
              [micState]="tunerService.micState()"
              (startClicked)="handleStartTuner()"
              (stopClicked)="handleStopTuner()"
              (testClicked)="handleTestTuner()"
            />
          </div>

          <!-- Display and Meter together -->
          <div class="w-full">
            <app-tuner-display
              [note]="tunerService.detectedNote()"
              [frequency]="tunerService.frequency()"
              [cents]="tunerService.cents()"
              [status]="tunerService.tuningStatus()"
            >
              <!-- Meter: Visual Needle & Scale Indicator injected inside Display -->
              <div class="w-full mt-0 mb-4">
                <app-tuner-meter
                  [cents]="tunerService.cents()"
                  [status]="tunerService.tuningStatus()"
                />
              </div>
            </app-tuner-display>
          </div>

          <!-- Guitar Strings visualizer with interactive audio playback -->
          <div class="w-full">
            <app-tuner-guitar
              [frequency]="tunerService.frequency()"
              [activePlayingString]="tunerService.activePlayingString()"
              (stringClicked)="handleStringClick($event)"
            />
          </div>

          <app-divider class="w-full" />

          <!-- Status: Microphone and Signal Feedback -->
          <div class="w-full">
            <app-tuner-status
              [micState]="tunerService.micState()"
              [tuningStatus]="tunerService.tuningStatus()"
              [signalLevel]="tunerService.signalLevel()"
              [errorMessage]="tunerService.errorMessage()"
            />
          </div>

        </div>
      </app-card>

      <!-- Quick Guidance Information Note -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <app-card variant="default" padding="sm">
          <div class="flex items-start gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <mat-icon class="text-[18px]">mic</mat-icon>
            </div>
            <div>
              <h3 class="text-xs font-bold text-text-primary">Captação Direta</h3>
              <p class="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                Posicione seu violão ou microfone próximo para notas nítidas e limpas.
              </p>
            </div>
          </div>
        </app-card>

        <app-card variant="default" padding="sm">
          <div class="flex items-start gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-success/10 text-success shrink-0">
              <mat-icon class="text-[18px]">check_circle_outline</mat-icon>
            </div>
            <div>
              <h3 class="text-xs font-bold text-text-primary">Zona Afinada</h3>
              <p class="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                Precisão ideal entre -10¢ e +10¢ com indicação visual verde central.
              </p>
            </div>
          </div>
        </app-card>

        <app-card variant="default" padding="sm">
          <div class="flex items-start gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
              <mat-icon class="text-[18px]">graphic_eq</mat-icon>
            </div>
            <div>
              <h3 class="text-xs font-bold text-text-primary">Voz & Instrumentos</h3>
              <p class="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                Detecção cromática contínua de 55 Hz a 1400 Hz para canto e cordas.
              </p>
            </div>
          </div>
        </app-card>
      </div>
    </div>
  `,
})
export class Tuner implements OnDestroy {
  readonly tunerService = inject(TunerAudioService);
  private testStringIndex = 0;

  handleStartTuner(): void {
    void this.tunerService.start();
  }

  handleStopTuner(): void {
    this.tunerService.stop();
  }

  handleStringClick(stringNum: number): void {
    // Se o microfone estiver inativo, simula o toque da corda no afinador para que o usuário veja a nota e o ponteiro reagirem imediatamente
    if (this.tunerService.micState() !== 'active') {
      void this.tunerService.simulateStringTuning(stringNum, 0);
    } else {
      void this.tunerService.playReferenceString(stringNum);
    }
  }

  handleTestTuner(): void {
    // Alterna entre as cordas a cada clique no botão de teste (1ª E, 2ª B, 3ª G, 4ª D, 5ª A, 6ª E)
    const testStrings = [1, 2, 3, 4, 5, 6];
    const stringNum = testStrings[this.testStringIndex % testStrings.length];
    this.testStringIndex++;
    void this.tunerService.simulateStringTuning(stringNum, 0);
  }

  ngOnDestroy(): void {
    this.tunerService.stop();
  }
}
export default Tuner;
