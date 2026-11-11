import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { WeeklyPractice } from '../../models/progress.model';

@Component({
  selector: 'app-practice-chart',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full flex flex-col">
      <h3 class="text-sm font-semibold text-text-secondary mb-6 flex items-center gap-2">
        <mat-icon class="text-[18px]">bar_chart</mat-icon>
        Prática Semanal
      </h3>
      
      <!-- Visual Chart (Hidden from Screen Readers) -->
      <div class="flex-1 flex items-end justify-between gap-2 h-40" aria-hidden="true">
        @for (day of data(); track day.day) {
          <div class="flex flex-col items-center gap-2 flex-1 group">
            <div class="w-full max-w-[2rem] h-32 bg-surface rounded-t-sm flex items-end relative overflow-hidden transition-colors hover:bg-surface-elevated">
               <div 
                 class="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 ease-out rounded-t-sm"
                 [style.height.%]="getPercentage(day.minutes)">
               </div>
            </div>
            <span class="text-xs font-medium text-text-secondary">{{ day.day }}</span>
          </div>
        }
      </div>

      <!-- Accessible Text Alternative -->
      <div class="sr-only">
        <h4>Resumo da prática semanal em minutos:</h4>
        <ul>
          @for (day of data(); track day.day) {
            <li>{{ day.day }}: {{ day.minutes }} minutos praticados em {{ day.sessions }} sessões.</li>
          }
        </ul>
      </div>
    </app-card>
  `
})
export class PracticeChart {
  readonly data = input.required<readonly WeeklyPractice[]>();
  
  readonly maxMinutes = computed(() => {
    const minutes = this.data().map(d => d.minutes);
    return Math.max(...minutes, 60); // min height baseline
  });

  getPercentage(minutes: number): number {
    return (minutes / this.maxMinutes()) * 100;
  }
}
