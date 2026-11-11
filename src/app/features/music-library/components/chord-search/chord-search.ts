import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CHORDS_DATA } from '../../data/chords.data';
import { Chord, ChordCategory } from '../../models/chord.model';
import { ChordCard } from '../chord-card/chord-card';
import { ChordDetails } from '../chord-details/chord-details';
import { AppInput } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chord-search',
  imports: [FormsModule, ChordCard, ChordDetails, AppInput, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4 items-center bg-surface p-4 rounded-2xl border border-border">
         <div class="w-full sm:w-1/2">
            <app-input 
              [ngModel]="searchTerm()"
              (ngModelChange)="searchTerm.set($event)"
              placeholder="Buscar cifra (ex: Cm7)" 
              icon="search"
              ariaLabel="Buscar cifra"
            />
         </div>
         
         <div class="w-full sm:w-1/2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex gap-2">
            <button 
              class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors"
              [class.bg-primary]="categoryFilter() === 'Todas'"
              [class.text-bg]="categoryFilter() === 'Todas'"
              [class.bg-surface-elevated]="categoryFilter() !== 'Todas'"
              [class.text-text-secondary]="categoryFilter() !== 'Todas'"
              (click)="categoryFilter.set('Todas')"
            >
              Todas
            </button>
            @for (cat of categories; track cat) {
              <button 
                class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors"
                [class.bg-primary]="categoryFilter() === cat"
                [class.text-bg]="categoryFilter() === cat"
                [class.bg-surface-elevated]="categoryFilter() !== cat"
                [class.text-text-secondary]="categoryFilter() !== cat"
                (click)="categoryFilter.set(cat)"
              >
                {{ cat }}
              </button>
            }
         </div>
      </div>

      <!-- Results Grid -->
      @if (filteredChords().length > 0) {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          @for (chord of filteredChords(); track chord.id) {
            <app-chord-card [chord]="chord" (selected)="selectedChord.set($event)" />
          }
        </div>
      } @else {
        <div class="flex flex-col items-center justify-center py-12 px-4 text-center bg-surface/50 rounded-2xl border border-dashed border-border">
          <div class="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4 text-text-secondary">
            <mat-icon>search_off</mat-icon>
          </div>
          <h3 class="text-lg font-bold text-text-primary mb-2">Nenhuma cifra encontrada</h3>
          <p class="text-sm text-text-secondary max-w-sm">
            Tente buscar por outro termo ou alterar o filtro de categoria.
          </p>
        </div>
      }

      <!-- Details Modal -->
      @if (selectedChord()) {
        <app-chord-details [chord]="selectedChord()!" (closeDetails)="selectedChord.set(null)" />
      }
    </div>
  `
})
export class ChordSearch {
  readonly searchTerm = signal('');
  readonly categoryFilter = signal<ChordCategory | 'Todas'>('Todas');
  readonly selectedChord = signal<Chord | null>(null);

  readonly categories: ChordCategory[] = [
    'Maior', 'Menor', 'Sétima', 'Maj7', 'm7', 'Suspenso', 'Add9', 'Diminuto', 'Aumentado', 'Extensões'
  ];

  readonly filteredChords = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.categoryFilter();
    
    return CHORDS_DATA.filter(chord => {
      const matchTerm = term === '' || 
                        chord.symbol.toLowerCase().includes(term) || 
                        chord.name.toLowerCase().includes(term);
      const matchCat = cat === 'Todas' || chord.category === cat;
      
      return matchTerm && matchCat;
    });
  });
}
