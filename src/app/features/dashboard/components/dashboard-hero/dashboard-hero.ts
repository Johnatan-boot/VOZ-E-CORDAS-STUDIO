import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard } from '../../../../shared/ui';
import { HeroData } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-hero',
  imports: [MatIconModule, AppBadge, AppButton, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="hero-title" class="w-full">
      <app-card variant="elevated" padding="lg">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <!-- Left Column: Context & Greeting -->
          <div class="flex flex-col gap-3 max-w-2xl">
            <!-- Header Tagline & Badge -->
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-elevated border border-border/60 text-xs font-semibold text-primary shadow-sm">
                {{ data().greeting }}
              </span>
              <app-badge variant="primary" [dot]="true">
                Sessão de Hoje Disponível
              </app-badge>
            </div>

            <!-- Main Heading -->
            <h1 id="hero-title" class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              {{ data().title }}
            </h1>

            <!-- Subtitle -->
            <p class="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              {{ data().subtitle }}
            </p>

            <!-- Focus / Musical Context Capsule -->
            <div class="mt-2 flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-surface border border-border">
              <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 text-accent shrink-0">
                <mat-icon class="text-[18px]">lightbulb</mat-icon>
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-semibold text-text-secondary">Foco Atual</span>
                <span class="text-xs sm:text-sm font-medium text-text-primary leading-snug">
                  {{ data().currentGoal }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column: Primary CTA & Daily Tip -->
          <div class="flex flex-col gap-4 sm:min-w-[280px] lg:max-w-xs shrink-0 lg:border-l lg:border-border lg:pl-8">
            <div class="flex flex-col gap-2">
              <span class="inline-flex px-2 py-0.5 rounded-lg border border-border/40 text-[10px] font-semibold text-text-secondary mb-1">
                Ação Recomendada
              </span>
              <app-button
                variant="primary"
                size="lg"
                icon="play_arrow"
                [fullWidth]="true"
                (clicked)="practiceClicked.emit()"
              >
                {{ data().mainActionText }}
              </app-button>

              <!-- Continuous Guided Study Mode Button ("Play along") -->
              <button
                type="button"
                (click)="guidedStudyClicked.emit()"
                class="w-full mt-1 p-3 rounded-2xl bg-gradient-to-r from-accent/20 via-surface-elevated to-primary/20 hover:from-accent/30 hover:to-primary/30 border border-accent/40 text-left transition-all cursor-pointer group flex flex-col gap-1.5 shadow-xs"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <mat-icon class="text-accent text-[18px]">playlist_play</mat-icon>
                    <span class="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">
                      Modo Estudo Guiado (30 min)
                    </span>
                  </div>
                  <span class="px-1.5 py-0.5 rounded text-[9px] bg-accent text-background font-bold uppercase tracking-wider">
                    Play along
                  </span>
                </div>
                <div class="flex items-center gap-1 text-[10px] text-text-secondary">
                  <span>Canto (5m)</span>
                  <span>➔</span>
                  <span>Violão (10m)</span>
                  <span>➔</span>
                  <span>Dueto (15m)</span>
                </div>
              </button>
            </div>

            <!-- Daily Tip Note -->
            <div class="p-3 rounded-xl bg-surface/60 border border-border/80 text-text-secondary flex items-start gap-2.5">
              <mat-icon class="text-[16px] text-primary shrink-0 mt-0.5">tips_and_updates</mat-icon>
              <p class="text-[11px] leading-relaxed">
                {{ data().dailyTip }}
              </p>
            </div>
          </div>
        </div>
      </app-card>
    </section>
  `,
})
export class DashboardHero {
  readonly data = input.required<HeroData>();
  readonly practiceClicked = output<void>();
  readonly guidedStudyClicked = output<void>();
}
