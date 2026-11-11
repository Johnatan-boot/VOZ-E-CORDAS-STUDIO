import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard } from '../../../../shared/ui';
import { DuoPartner } from '../../models/duo.model';

@Component({
  selector: 'app-partner-card',
  imports: [MatIconModule, AppBadge, AppButton, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="default" padding="md" class="h-full flex flex-col hover:border-primary/50 transition-colors">
      <div class="flex items-start gap-4">
        <!-- Avatar Placeholder -->
        <div class="w-14 h-14 rounded-full bg-surface-elevated border border-border flex items-center justify-center shrink-0">
          <mat-icon class="text-[28px] text-text-secondary">person</mat-icon>
        </div>
        
        <div class="flex flex-col flex-1 min-w-0">
          <div class="flex justify-between items-start gap-2">
            <h3 class="text-lg font-bold text-text-primary truncate">{{ partner().name }}</h3>
            <div class="shrink-0">
              <app-badge [variant]="partner().status === 'Disponível' ? 'success' : 'default'" size="sm">
                {{ partner().status }}
              </app-badge>
            </div>
          </div>
          
          <div class="flex flex-col mt-1 flex flex-col gap-1">
            <span class="text-sm font-medium text-text-primary">
              {{ partner().instrument }}
              @if (partner().voiceType) {
                <span class="text-text-secondary">({{ partner().voiceType }})</span>
              }
            </span>
            <span class="text-xs text-text-secondary">{{ partner().level }}</span>
          </div>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-border/40 mt-auto">
        <app-button 
          variant="secondary" 
          size="sm" 
          class="w-full"
          [disabled]="partner().status !== 'Disponível'"
          (clicked)="selected.emit(partner())"
        >
          {{ partner().status === 'Disponível' ? 'Selecionar Parceiro' : 'Indisponível' }}
        </app-button>
      </div>
    </app-card>
  `
})
export class PartnerCard {
  readonly partner = input.required<DuoPartner>();
  readonly selected = output<DuoPartner>();
}
