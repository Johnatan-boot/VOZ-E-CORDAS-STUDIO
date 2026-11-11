import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppProgress } from '../../../../shared/ui';

@Component({
  selector: 'app-duo-progress',
  imports: [AppProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-text-secondary">Treino Atual</span>
        <span class="text-xs font-bold text-text-primary">{{ progress() }}%</span>
      </div>
      <h4 class="text-sm font-bold text-text-primary truncate">{{ title() }}</h4>
      <app-progress [value]="progress()" variant="primary" />
    </div>
  `
})
export class DuoProgress {
  readonly title = input.required<string>();
  readonly progress = input.required<number>();
}
