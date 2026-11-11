import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AppPageHeader } from '../../shared/ui';
import { LibraryTabs } from './components/library-tabs/library-tabs';
import { ChordSearch } from './components/chord-search/chord-search';
import { ScaleSearch } from './components/scale-search/scale-search';
import { IntervalReference } from './components/interval-reference/interval-reference';

@Component({
  selector: 'app-music-library',
  standalone: true,
  imports: [
    AppPageHeader,
    LibraryTabs,
    ChordSearch,
    ScaleSearch,
    IntervalReference
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 sm:gap-8 pb-24 lg:pb-8 w-full max-w-7xl mx-auto animate-fade-in px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
      
      <!-- Header -->
      <app-page-header 
        title="Biblioteca Musical" 
        subtitle="Dicionário completo de acordes, escalas e intervalos para consulta e estudo." 
        icon="menu_book" 
      />

      <!-- Tabs Navigation -->
      <div class="sticky top-0 z-10 bg-bg pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <app-library-tabs 
          [activeTab]="activeTab()" 
          (tabChange)="activeTab.set($event)" 
        />
      </div>

      <!-- Main Content Area -->
      <div class="flex flex-col gap-6">
        @switch (activeTab()) {
          @case ('chords') {
            <div class="animate-fade-in">
               <app-chord-search />
            </div>
          }
          @case ('scales') {
            <div class="animate-fade-in">
               <app-scale-search />
            </div>
          }
          @case ('intervals') {
            <div class="animate-fade-in">
               <app-interval-reference />
            </div>
          }
        }
      </div>

    </div>
  `
})
export default class MusicLibrary {
  readonly activeTab = signal<string>('chords');
}
