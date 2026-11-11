import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppTabs, TabItem } from '../../../../shared/ui';

@Component({
  selector: 'app-library-tabs',
  imports: [AppTabs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <app-tabs 
        [tabs]="tabs" 
        [activeTabId]="activeTab()" 
        (tabChange)="tabChange.emit($event)" 
      />
    </div>
  `
})
export class LibraryTabs {
  readonly tabs: TabItem[] = [
    { id: 'chords', label: 'Dicionário de Cifras', icon: 'queue_music' },
    { id: 'scales', label: 'Escalas Musicais', icon: 'linear_scale' },
    { id: 'intervals', label: 'Intervalos', icon: 'height' }
  ];

  readonly activeTab = input.required<string>();
  readonly tabChange = output<string>();
}
