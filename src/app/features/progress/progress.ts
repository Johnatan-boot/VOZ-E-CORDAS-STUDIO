import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppPageHeader, AppProgressTracker } from '../../shared/ui';
import { ProgressHero } from './components/progress-hero/progress-hero';
import { PracticeOverview } from './components/practice-overview/practice-overview';
import { PracticeChart } from './components/practice-chart/practice-chart';
import { SkillProgressComponent } from './components/skill-progress/skill-progress';
import { PracticeHistory } from './components/practice-history/practice-history';
import { 
  PROGRESS_SUMMARY, 
  WEEKLY_PRACTICE_DATA, 
  SKILL_PROGRESS_DATA, 
  RECENT_SESSIONS_DATA,
  TRAINING_MODULES_PROGRESS
} from './data/progress.data';

@Component({
  selector: 'app-progress',
  imports: [
    MatIconModule,
    AppPageHeader,
    AppProgressTracker,
    ProgressHero,
    PracticeOverview,
    PracticeChart,
    SkillProgressComponent,
    PracticeHistory
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <app-page-header
        title="Progresso"
        description="Visualize sua evolução, histórico e consistência na prática musical."
        category="ALUNO"
        icon="trending_up"
      />

      <div class="flex flex-col gap-6">
        <app-progress-hero class="block" />

        <app-practice-overview [summary]="summary()" class="block" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div class="lg:col-span-1">
            <app-progress-tracker
              [modules]="trainingModules()"
              title="Módulos de Treinamento"
              subtitle="Progresso geral da capacitação"
              variant="accent"
              size="lg"
              layout="card"
              class="block h-full"
            />
          </div>
          <div class="lg:col-span-2">
            <app-practice-chart [data]="weeklyData()" class="block h-full" />
          </div>
        </div>

        <app-skill-progress [skills]="skillData()" class="block w-full" />

        <app-practice-history [sessions]="sessionsData()" class="block" />
      </div>
    </div>
  `
})
export default class Progress {
  readonly summary = signal(PROGRESS_SUMMARY);
  readonly weeklyData = signal(WEEKLY_PRACTICE_DATA);
  readonly skillData = signal(SKILL_PROGRESS_DATA);
  readonly sessionsData = signal(RECENT_SESSIONS_DATA);
  readonly trainingModules = signal(TRAINING_MODULES_PROGRESS);
}
