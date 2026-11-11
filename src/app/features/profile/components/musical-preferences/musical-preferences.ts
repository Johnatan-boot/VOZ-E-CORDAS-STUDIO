import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-musical-preferences',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
        <mat-icon class="text-[18px]">schedule</mat-icon>
        Preferências de Estudo
      </h3>
      
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
            <mat-icon class="text-[20px]">timer</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] font-semibold text-text-secondary">Tempo Diário</span>
            <span class="text-text-primary font-medium">{{ profile().preferences.studyDuration }} minutos</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <mat-icon class="text-[20px]">wb_sunny</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] font-semibold text-text-secondary">Período Preferido</span>
            <span class="text-text-primary font-medium">{{ profile().preferences.preferredPracticePeriod }}</span>
          </div>
        </div>
      </div>
    </app-card>
  `
})
export class MusicalPreferences {
  readonly profile = input.required<StudentProfile>();
}
