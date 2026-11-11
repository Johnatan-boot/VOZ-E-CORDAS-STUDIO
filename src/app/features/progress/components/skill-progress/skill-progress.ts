import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard, AppProgress } from '../../../../shared/ui';
import { SkillProgress } from '../../models/progress.model';

@Component({
  selector: 'app-skill-progress',
  imports: [MatIconModule, AppCard, AppProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-6 flex items-center gap-2">
        <mat-icon class="text-[18px]">psychology</mat-icon>
        Evolução por Área
      </h3>
      
      <div class="flex flex-col gap-6">
        @for (skill of skills(); track skill.id) {
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-text-primary">{{ skill.name }}</span>
              <span class="text-xs font-semibold text-text-secondary">
                {{ skill.currentLevel }} &rarr; <span class="text-primary">{{ skill.target }}</span>
              </span>
            </div>
            <app-progress 
              [value]="skill.progress" 
              [showPercentage]="true" 
              variant="primary" 
              size="md"
            />
          </div>
        }
      </div>
    </app-card>
  `
})
export class SkillProgressComponent {
  readonly skills = input.required<readonly SkillProgress[]>();
}
