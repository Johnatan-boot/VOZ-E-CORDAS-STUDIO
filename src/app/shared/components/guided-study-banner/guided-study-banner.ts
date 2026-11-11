import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GuidedStudyService } from '../../../core/services/guided-study.service';
import { AppBadge } from '../../ui';

@Component({
  selector: 'app-guided-study-banner',
  imports: [MatIconModule, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Top Floating Guided Study Banner -->
    @if (studyService.isActive()) {
      <aside aria-label="Sessão de Estudo Guiado em Andamento" class="sticky top-0 z-40 w-full bg-surface-elevated/95 backdrop-blur-md border-b border-primary/30 shadow-lg animate-slide-down">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <!-- Current Step Info -->
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
              <mat-icon class="text-[20px] animate-pulse">{{ studyService.currentStep().icon }}</mat-icon>
            </div>
            
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Estudo Guiado Contínuo • Etapa {{ studyService.currentStepIndex() + 1 }} de {{ studyService.steps.length }}
                </span>
                <app-badge variant="primary" size="sm">
                  {{ studyService.currentStep().category }}
                </app-badge>
                @if (studyService.isPaused()) {
                  <span class="px-1.5 py-0.2 rounded text-[9px] bg-warning/20 text-warning font-bold">Pausado</span>
                }
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-text-primary truncate">
                {{ studyService.currentStep().title }}
              </h4>
            </div>
          </div>

          <!-- Center: Step Progress & Roadmap Capsule -->
          <div class="flex items-center gap-4">
            <!-- Mini Step indicators -->
            <div class="hidden sm:flex items-center gap-1.5">
              @for (step of studyService.steps; track step.id; let idx = $index) {
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  [class]="idx === studyService.currentStepIndex()
                    ? 'w-8 bg-primary shadow-xs'
                    : (idx < studyService.currentStepIndex() ? 'w-4 bg-success' : 'w-4 bg-border')"
                ></div>
              }
            </div>

            <!-- Countdown Timer Display -->
            <div class="flex items-center gap-2 px-3 py-1 rounded-xl bg-background border border-border shadow-xs">
              <mat-icon class="text-[16px] text-text-secondary">timer</mat-icon>
              <span class="font-mono text-xs sm:text-sm font-bold text-text-primary tracking-wider">
                {{ studyService.formattedRemaining() }}
              </span>
            </div>
          </div>

          <!-- Right Action Controls -->
          <div class="flex items-center gap-2 self-end md:self-auto">
            <!-- Pause / Resume -->
            <button
              type="button"
              (click)="studyService.pauseResume()"
              class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs font-bold transition-all cursor-pointer shadow-xs"
              [title]="studyService.isPaused() ? 'Retomar timer' : 'Pausar timer'"
            >
              <mat-icon class="text-[16px]">{{ studyService.isPaused() ? 'play_arrow' : 'pause' }}</mat-icon>
              <span class="hidden sm:inline">{{ studyService.isPaused() ? 'Retomar' : 'Pausar' }}</span>
            </button>

            <!-- Next Step Button -->
            <button
              type="button"
              (click)="studyService.nextStep()"
              class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-background hover:bg-primary-hover text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>{{ studyService.isLastStep() ? 'Concluir Estudo' : 'Próxima Etapa' }}</span>
              <mat-icon class="text-[16px]">skip_next</mat-icon>
            </button>

            <!-- Close Session Button -->
            <button
              type="button"
              (click)="studyService.stopSession()"
              class="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
              title="Cancelar Modo Estudo"
            >
              <mat-icon class="text-[18px]">close</mat-icon>
            </button>
          </div>
        </div>

        <!-- Thin animated progress line along the bottom border -->
        <div class="w-full h-1 bg-surface relative overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            [style.width.%]="studyService.stepProgress()"
          ></div>
        </div>
      </aside>
    }

    <!-- Completion Celebration Modal -->
    @if (studyService.isCompleted()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-fade-in">
        <div class="w-full max-w-md bg-surface border border-accent/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center animate-scale-in relative overflow-hidden">
          
          <!-- Background Glow -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Trophy Icon Badge -->
          <div class="h-20 w-20 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 border-2 border-accent flex items-center justify-center text-accent mb-5 shadow-lg">
            <mat-icon class="text-[44px]">emoji_events</mat-icon>
          </div>

          <span class="text-xs font-bold text-accent uppercase tracking-widest mb-1">
            Meta Diária Cumprida
          </span>
          <h3 class="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Parabéns, Músico!
          </h3>
          <p class="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
            Você completou a rotina contínua de 30 minutos: <strong>Aquecimento Vocal</strong>, <strong>Harmonia de Violão</strong> e <strong>Dueto a Duas Vozes</strong>.
          </p>

          <!-- Metrics Capsule -->
          <div class="w-full grid grid-cols-2 gap-3 mb-6">
            <div class="p-3 rounded-2xl bg-surface-elevated border border-border flex flex-col items-center">
              <span class="text-[10px] text-text-secondary uppercase font-semibold">Tempo Praticado</span>
              <span class="text-lg font-bold font-mono text-primary mt-0.5">30 min</span>
            </div>
            <div class="p-3 rounded-2xl bg-surface-elevated border border-border flex flex-col items-center">
              <span class="text-[10px] text-text-secondary uppercase font-semibold">XP Ganho</span>
              <span class="text-lg font-bold font-mono text-accent mt-0.5">+150 XP</span>
            </div>
          </div>

          <button
            type="button"
            (click)="finishAndGoDashboard()"
            class="w-full py-3 px-6 rounded-xl bg-primary text-background font-bold text-sm hover:bg-primary-hover transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <mat-icon class="text-[18px]">dashboard</mat-icon>
            <span>Voltar ao Painel Geral</span>
          </button>
        </div>
      </div>
    }
  `
})
export class GuidedStudyBanner {
  readonly studyService = inject(GuidedStudyService);
  private readonly router = inject(Router);

  finishAndGoDashboard(): void {
    this.studyService.closeCompletionModal();
    void this.router.navigate(['/dashboard']);
  }
}
