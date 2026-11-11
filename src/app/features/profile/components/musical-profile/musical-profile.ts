import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCard, AppBadge } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-musical-profile',
  imports: [MatIconModule, AppCard, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="elevated" padding="md" class="h-full">
      <h3 class="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
        <mat-icon class="text-[18px]">graphic_eq</mat-icon>
        Perfil Musical
      </h3>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span class="text-[10px] font-semibold text-text-secondary">Instrumento Principal</span>
          <p class="text-text-primary font-medium flex items-center gap-2 mt-1">
            <mat-icon class="text-primary text-[16px]">straighten</mat-icon>
            {{ profile().musicalProfile.mainInstrument }}
          </p>
        </div>
        
        <div>
          <span class="text-[10px] font-semibold text-text-secondary">Nível</span>
          <div class="mt-1">
            <app-badge variant="primary">{{ profile().musicalProfile.experienceLevel }}</app-badge>
          </div>
        </div>
        
        @if (profile().musicalProfile.secondaryInstrument) {
          <div>
            <span class="text-[10px] font-semibold text-text-secondary">Inst. Secundário</span>
            <p class="text-text-primary font-medium mt-1">{{ profile().musicalProfile.secondaryInstrument }}</p>
          </div>
        }
        
        @if (profile().musicalProfile.voiceType) {
          <div>
            <span class="text-[10px] font-semibold text-text-secondary">Tipo Vocal</span>
            <p class="text-text-primary font-medium mt-1">{{ profile().musicalProfile.voiceType }}</p>
          </div>
        }
      </div>

      <div class="mt-6 pt-4 border-t border-border/40">
        <span class="text-[10px] font-semibold text-text-secondary mb-2 block">Estilos Favoritos</span>
        <div class="flex flex-wrap gap-2">
          @for (style of profile().musicalProfile.favoriteStyles; track style) {
            <app-badge variant="default">{{ style }}</app-badge>
          }
        </div>
      </div>
    </app-card>
  `
})
export class MusicalProfileComponent {
  readonly profile = input.required<StudentProfile>();
}
