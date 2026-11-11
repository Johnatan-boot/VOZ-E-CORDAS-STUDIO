import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardHero } from './components/dashboard-hero/dashboard-hero';
import { PracticeSummary } from './components/practice-summary/practice-summary';
import { ContinueTraining } from './components/continue-training/continue-training';
import { TodayPractice } from './components/today-practice/today-practice';
import { QuickShortcuts } from './components/quick-shortcuts/quick-shortcuts';
import { AppToast } from '../../shared/ui';
import { AuthService } from '../../core/services/auth.service';
import { GuidedStudyService } from '../../core/services/guided-study.service';
import {
  DASHBOARD_HERO_DATA,
  DASHBOARD_METRICS,
  DASHBOARD_TRAINING_TRACKS,
  DASHBOARD_TODAY_ROUTINE,
  DASHBOARD_SHORTCUTS,
} from './data/dashboard.data';
import { TrainingTrack, PracticeRoutineItem } from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHero,
    PracticeSummary,
    ContinueTraining,
    TodayPractice,
    QuickShortcuts,
    AppToast,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full animate-fade-in pb-12">
      <!-- LEVEL 1 & 2: Hero & Primary CTA -->
      <app-dashboard-hero
        [data]="heroData()"
        (practiceClicked)="handleStartPractice()"
        (guidedStudyClicked)="handleStartGuidedStudy()"
        class="mb-8 block"
      />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Column (Left/Bigger) -->
        <div class="lg:col-span-2 flex flex-col gap-8">
          <!-- LEVEL 3: Continue Treinando (Active Tracks) -->
          <app-continue-training
            [tracks]="trainingTracks()"
            (trackClicked)="handleTrackSelection($event)"
          />

          <!-- LEVEL 4: Prática de Hoje (Daily Routine) -->
          <app-today-practice
            [routine]="todayRoutine()"
            (itemAction)="handleRoutineAction($event)"
          />
        </div>

        <!-- Secondary Column (Right/Smaller) -->
        <div class="flex flex-col gap-8">
          <!-- LEVEL 3: Resumo Musical (Indicators) -->
          <app-practice-summary
            [metrics]="metrics()"
          />

          <!-- LEVEL 5: Atalhos & Ferramentas Rápidas -->
          <app-quick-shortcuts
            [shortcuts]="shortcuts()"
          />
        </div>
      </div>

      <!-- Contextual Toast Feedback -->
      @if (activeToast(); as toast) {
        <div class="fixed bottom-6 right-6 z-50 max-w-sm animate-fade-in shadow-xl">
          <app-toast
            [title]="toast.title"
            [message]="toast.message"
            [variant]="toast.variant"
            (dismissed)="dismissToast()"
          />
        </div>
      }
    </div>
  `,
})
export class Dashboard {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly guidedStudyService = inject(GuidedStudyService);

  readonly heroData = signal(DASHBOARD_HERO_DATA);
  readonly metrics = signal(DASHBOARD_METRICS);
  readonly trainingTracks = signal(DASHBOARD_TRAINING_TRACKS);
  readonly todayRoutine = signal(DASHBOARD_TODAY_ROUTINE);
  readonly shortcuts = signal(DASHBOARD_SHORTCUTS);

  readonly activeToast = signal<{
    title: string;
    message: string;
    variant: 'info' | 'success' | 'warning' | 'error';
  } | null>(null);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        const name = user.displayName?.split(' ')[0] || 'Músico';
        this.heroData.update(d => ({ ...d, studentName: name }));
      }
    });
  }

  handleStartPractice(): void {
    this.router.navigate(['/canto']);
  }

  handleStartGuidedStudy(): void {
    this.guidedStudyService.startGuidedSession();
    this.showToast(
      'Modo Estudo Guiado Iniciado',
      'Etapa 1: Aquecimento Vocal (5 min). O timer e transições automáticas estão ativos!',
      'success'
    );
  }

  handleTrackSelection(track: TrainingTrack): void {
    if (track.route) {
      this.router.navigate([track.route]);
    }
  }

  handleRoutineAction(item: PracticeRoutineItem): void {
    let targetRoute = '/canto';
    if (item.category === 'Violão') {
      targetRoute = '/violao';
    } else if (item.category === 'Dupla') {
      targetRoute = '/duo';
    } else if (item.category === 'Teoria') {
      targetRoute = '/leitura';
    } else if (item.title.toLowerCase().includes('voz') || item.title.toLowerCase().includes('harmonia')) {
      targetRoute = '/notas-vocais';
    }

    this.showToast(
      item.title,
      `Abrindo ambiente de prática (${item.durationMinutes} min)...`,
      'success'
    );

    setTimeout(() => {
      this.router.navigate([targetRoute]);
    }, 400);
  }

  dismissToast(): void {
    this.activeToast.set(null);
  }

  private showToast(title: string, message: string, variant: 'info' | 'success' | 'warning' | 'error'): void {
    this.activeToast.set({ title, message, variant });
    setTimeout(() => {
      if (this.activeToast()?.title === title) {
        this.activeToast.set(null);
      }
    }, 4000);
  }
}
export default Dashboard;
