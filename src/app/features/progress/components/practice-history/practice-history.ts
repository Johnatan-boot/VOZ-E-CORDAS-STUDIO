import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard, AppBadge } from '../../../../shared/ui';
import { PracticeSession } from '../../models/progress.model';

@Component({
  selector: 'app-practice-history',
  imports: [MatIconModule, AppCard, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-6 flex items-center gap-2">
        <mat-icon class="text-[18px]">history</mat-icon>
        Histórico e Sessões Recentes
      </h3>
      
      <div class="flex flex-col gap-4">
        @for (session of sessions(); track session.id) {
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border/40 transition-colors hover:border-border">
            <div class="flex items-start sm:items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <mat-icon class="text-[20px]">{{ getCategoryIcon(session.category) }}</mat-icon>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-text-primary">{{ session.category }}</span>
                  <span class="text-text-secondary text-xs">&bull;</span>
                  <span class="text-text-secondary text-xs font-medium">{{ session.date }}</span>
                </div>
                <span class="text-xs text-text-secondary mt-0.5">{{ session.activity }}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3 self-end sm:self-auto">
              <span class="text-xs font-mono text-text-secondary">{{ session.duration }} min</span>
              <app-badge [variant]="getStatusVariant(session.status)">
                {{ getStatusLabel(session.status) }}
              </app-badge>
            </div>
          </div>
        }
      </div>
    </app-card>
  `
})
export class PracticeHistory {
  readonly sessions = input.required<readonly PracticeSession[]>();

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Canto': 'mic',
      'Violão': 'straighten',
      'Teoria': 'hearing',
      'Duo': 'group',
      'Studio': 'graphic_eq'
    };
    return iconMap[category] || 'music_note';
  }

  getStatusVariant(status: string): 'success' | 'warning' | 'error' | 'default' {
    switch (status) {
      case 'completed': return 'success';
      case 'inProgress': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'inProgress': return 'Em andamento';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  }
}
