import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-summary',
  imports: [MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
        <mat-icon class="text-[18px]">badge</mat-icon>
        Informações Básicas
      </h3>
      
      <div class="flex flex-col gap-4">
        <div class="min-w-0">
          <span class="text-xs font-semibold text-text-secondary">Nome Completo</span>
          <p class="text-text-primary font-medium break-words">{{ profile().name }}</p>
        </div>
        
        @if (profile().stageName) {
          <div class="min-w-0">
            <span class="text-xs font-semibold text-text-secondary">Nome Artístico</span>
            <p class="text-text-primary font-medium break-words">{{ profile().stageName }}</p>
          </div>
        }
        
        <div class="min-w-0">
          <span class="text-xs font-semibold text-text-secondary">ID do Aluno</span>
          <p class="text-text-primary font-medium text-sm font-mono break-all">{{ profile().id }}</p>
        </div>
      </div>
    </app-card>
  `
})
export class ProfileSummary {
  readonly profile = input.required<StudentProfile>();
}
