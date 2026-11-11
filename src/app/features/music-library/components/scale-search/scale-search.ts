import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SCALES_DATA } from '../../data/scales.data';
import { Scale, ScaleCategory } from '../../models/scale.model';
import { ScaleCard } from '../scale-card/scale-card';
import { ScaleDetails } from '../scale-details/scale-details';
import { AppInput } from '../../../../shared/ui';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scale-search',
  imports: [FormsModule, ScaleCard, ScaleDetails, AppInput, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4 items-center bg-surface p-4 rounded-2xl border border-border">
         <div class="w-full sm:w-1/2">
            <app-input 
              [ngModel]="searchTerm()"
              (ngModelChange)="searchTerm.set($event)"
              placeholder="Buscar escala (ex: C maior)" 
              icon="search"
              ariaLabel="Buscar escala"
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
      @if (filteredScales().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (scale of filteredScales(); track scale.id) {
            <app-scale-card [scale]="scale" (selected)="selectedScale.set($event)" />
          }
        </div>
      } @else {
        <div class="flex flex-col items-center justify-center py-12 px-4 text-center bg-surface/50 rounded-2xl border border-dashed border-border">
          <div class="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4 text-text-secondary">
            <mat-icon>search_off</mat-icon>
          </div>
          <h3 class="text-lg font-bold text-text-primary mb-2">Nenhuma escala encontrada</h3>
          <p class="text-sm text-text-secondary max-w-sm">
            Tente buscar por outro termo ou alterar o filtro de categoria.
          </p>
        </div>
      }

      <!-- Details Modal -->
      @if (selectedScale()) {
        <app-scale-details [scale]="selectedScale()!" (closeDetails)="selectedScale.set(null)" />
      }
    </div>
  `
})
export class ScaleSearch {
  readonly searchTerm = signal('');
  readonly categoryFilter = signal<ScaleCategory | 'Todas'>('Todas');
  readonly selectedScale = signal<Scale | null>(null);

  readonly categories: ScaleCategory[] = [
    'Maiores', 'Menores', 'Pentatônicas', 'Modos', 'Blues'
  ];

  readonly filteredScales = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.categoryFilter();
    
    return SCALES_DATA.filter(scale => {
      const matchTerm = term === '' || scale.name.toLowerCase().includes(term);
      const matchCat = cat === 'Todas' || scale.category === cat;
      
      return matchTerm && matchCat;
    });
  });
}
