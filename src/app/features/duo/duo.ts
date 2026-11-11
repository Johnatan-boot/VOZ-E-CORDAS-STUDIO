import { ChangeDetectionStrategy, Component, computed, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard, AppPageHeader } from '../../shared/ui';
import { DuoHero } from './components/duo-hero/duo-hero';
import { PartnerCard } from './components/partner-card/partner-card';
import { DuoExerciseCard } from './components/duo-exercise-card/duo-exercise-card';
import { DuoProgress } from './components/duo-progress/duo-progress';
import { DuoSessionComponent } from './components/duo-session/duo-session';
import { DuoShortcuts } from './components/duo-shortcuts/duo-shortcuts';
import { DUO_EXERCISES, DUO_PARTNERS } from './data/duo.data';
import { DuoExercise, DuoPartner, DuoSessionStatus } from './models/duo.model';

@Component({
  selector: 'app-duo',
  imports: [
    MatIconModule, AppBadge, AppButton, AppCard, AppPageHeader,
    DuoHero, PartnerCard, DuoExerciseCard, DuoProgress, DuoSessionComponent, DuoShortcuts
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <!-- Header -->
      <app-page-header
        title="Treino de Dupla"
        description="Pratique harmonia, sincronia e improvisação com acompanhamentos."
        category="COLABORAÇÃO"
        icon="group"
      >
        <div slot="page-actions" class="flex items-center gap-2">
          <app-badge variant="primary" size="sm">
            Beta Demonstrativo
          </app-badge>
        </div>
      </app-page-header>

      @if (sessionStatus() !== 'idle' && sessionStatus() !== 'cancelled') {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 flex flex-col gap-6">
            <app-duo-session
              [exercise]="selectedExercise()!"
              [partner]="selectedPartner()!"
              [status]="sessionStatus()"
              [elapsedTime]="elapsedTime()"
              (startSession)="startTimer()"
              (pauseSession)="pauseTimer()"
              (completeSession)="completeExerciseSession()"
              (cancelSession)="cancelExerciseSession()"
            />
          </div>
          <div class="lg:col-span-1 flex flex-col gap-6">
            <app-card variant="default" padding="md">
              <app-duo-progress
                [title]="selectedExercise()!.title"
                [progress]="currentProgress()"
              />
            </app-card>
            <app-duo-shortcuts />
          </div>
        </div>
      } @else {
        <app-duo-hero />

        <!-- Selection Flow -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Exercises List -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
                <mat-icon class="text-primary">library_music</mat-icon>
                Exercícios Disponíveis
              </h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (exercise of exercises(); track exercise.id) {
                <div class="relative group">
                  <app-duo-exercise-card 
                    [exercise]="exercise" 
                    (selected)="selectExercise(exercise)" 
                    [class.ring-2]="selectedExercise()?.id === exercise.id"
                    [class.ring-primary]="selectedExercise()?.id === exercise.id"
                    [class.rounded-2xl]="selectedExercise()?.id === exercise.id"
                  />
                  @if (selectedExercise()?.id === exercise.id) {
                    <div class="absolute -top-3 -right-3 z-10 animate-fade-in">
                      <div class="bg-primary text-background rounded-full p-1 shadow-md">
                        <mat-icon class="text-[20px]">check_circle</mat-icon>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          
          <!-- Partners & Shortcuts -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            <h2 class="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <mat-icon class="text-accent">people</mat-icon>
              Parceiros
            </h2>
            
            <div class="flex flex-col gap-4">
              @for (partner of partners(); track partner.id) {
                <div class="relative">
                  <app-partner-card 
                    [partner]="partner" 
                    (selected)="selectPartner(partner)"
                    [class.ring-2]="selectedPartner()?.id === partner.id"
                    [class.ring-primary]="selectedPartner()?.id === partner.id"
                    [class.rounded-2xl]="selectedPartner()?.id === partner.id"
                  />
                  @if (selectedPartner()?.id === partner.id) {
                    <div class="absolute -top-3 -right-3 z-10 animate-fade-in">
                      <div class="bg-primary text-background rounded-full p-1 shadow-md">
                        <mat-icon class="text-[20px]">check_circle</mat-icon>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>

            <app-duo-shortcuts />
          </div>
        </div>

        <!-- Start Button Bar (Sticky at bottom if both selected) -->
        @if (selectedExercise() && selectedPartner()) {
          <div class="fixed bottom-6 left-0 right-0 z-50 px-4 animate-slide-up pointer-events-none flex justify-center">
            <div class="bg-surface-elevated border border-primary/30 p-4 rounded-2xl shadow-xl max-w-xl w-full flex items-center justify-between pointer-events-auto backdrop-blur-md">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-text-primary">Pronto para iniciar</span>
                <span class="text-xs text-text-secondary">{{ selectedExercise()?.title }} com {{ selectedPartner()?.name }}</span>
              </div>
              <app-button variant="primary" size="lg" icon="play_arrow" (clicked)="initSession()">
                Iniciar Sessão
              </app-button>
            </div>
          </div>
        }
      }
    </div>
  `
})
export class Duo implements OnDestroy {
  readonly partners = signal<DuoPartner[]>(DUO_PARTNERS as DuoPartner[]);
  readonly exercises = signal<DuoExercise[]>(DUO_EXERCISES as DuoExercise[]);
  
  readonly selectedPartner = signal<DuoPartner | null>(null);
  readonly selectedExercise = signal<DuoExercise | null>(null);
  
  readonly sessionStatus = signal<DuoSessionStatus>('idle');
  readonly elapsedTime = signal<number>(0);
  
  private timerInterval: number | null = null;
  private lastTick = 0;

  // Demonstrative progress computation based on time (or status)
  readonly currentProgress = computed(() => {
    const status = this.sessionStatus();
    if (status === 'completed') return 100;
    if (status === 'idle' || status === 'ready' || status === 'cancelled') return 0;
    
    const exercise = this.selectedExercise();
    if (!exercise) return 0;
    
    // Simulate progress: 1 minute = 100% just for demo purposes to see it move quickly,
    // or properly map it to exercise duration. Let's make it move visibly.
    // 5 minutes demo = 300s = 100%. So 3s = 1%.
    const simulatedTotalDuration = 300; 
    const prog = Math.min(100, Math.floor((this.elapsedTime() / simulatedTotalDuration) * 100));
    return prog;
  });

  selectPartner(partner: DuoPartner) {
    if (partner.status === 'Disponível') {
      this.selectedPartner.set(partner);
    }
  }

  selectExercise(exercise: DuoExercise) {
    this.selectedExercise.set(exercise);
  }

  initSession() {
    if (this.selectedPartner() && this.selectedExercise()) {
      this.sessionStatus.set('ready');
      this.elapsedTime.set(0);
    }
  }

  startTimer() {
    this.sessionStatus.set('active');
    this.lastTick = Date.now() - (this.elapsedTime() * 1000);
    
    this.timerInterval = window.setInterval(() => {
      const now = Date.now();
      this.elapsedTime.set(Math.floor((now - this.lastTick) / 1000));
    }, 1000);
  }

  pauseTimer() {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.sessionStatus.set('paused');
  }

  completeExerciseSession() {
    this.pauseTimer();
    this.sessionStatus.set('completed');
    
    // Update exercise status demonstratively
    const exId = this.selectedExercise()?.id;
    if (exId) {
      this.exercises.update(exs => exs.map(e => e.id === exId ? { ...e, status: 'completed' } : e));
    }
  }

  cancelExerciseSession() {
    this.pauseTimer();
    this.sessionStatus.set('cancelled');
    this.selectedExercise.set(null);
    this.selectedPartner.set(null);
    this.elapsedTime.set(0);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }
}
export default Duo;
