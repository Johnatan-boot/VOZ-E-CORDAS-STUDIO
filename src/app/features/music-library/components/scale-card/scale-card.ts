import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Scale } from '../../models/scale.model';
import { AppCard, AppBadge } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scale-card',
  imports: [AppCard, AppBadge, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card 
      variant="elevated" [interactive]="true" 
      padding="md" 
      class="h-full flex flex-col justify-between"
      (click)="selected.emit(scale())"
      role="button"
      tabindex="0"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold text-text-primary capitalize">{{ scale().name }}</h3>
          <p class="text-xs text-text-secondary mt-1">{{ scale().type }}</p>
        </div>
        <app-badge variant="default">{{ scale().category }}</app-badge>
      </div>

      <div class="flex-grow flex flex-col justify-center py-4">
         <div class="flex flex-wrap gap-2 justify-center">
          @for (note of scale().notes; track $index) {
            <div class="flex flex-col items-center">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {{ note }}
              </span>
              <span class="text-[9px] text-text-secondary mt-1 font-semibold">{{ scale().degrees[$index] }}</span>
            </div>
          }
         </div>
      </div>

      <div class="mt-4 pt-3 border-t border-border">
        <p class="text-xs text-text-secondary text-center truncate">Fórmula: {{ scale().formula }}</p>
      </div>
    </app-card>
  `
})
export class ScaleCard {
  readonly scale = input.required<Scale>();
  readonly selected = output<Scale>();
}
