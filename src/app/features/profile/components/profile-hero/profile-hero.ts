import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppButton } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-hero',
  imports: [MatIconModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-bg via-surface-elevated to-surface border border-border/40 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      
      <!-- Avatar Section -->
      <div class="relative group shrink-0">
        <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface shadow-xl bg-primary/10 text-primary flex items-center justify-center overflow-hidden">
          @if (profile().avatar) {
            <img [src]="profile().avatar" alt="Avatar de {{ profile().name }}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
          } @else {
            <span class="text-4xl md:text-5xl font-serif font-bold">{{ profile().name.charAt(0) }}</span>
          }
        </div>
      </div>
      
      <!-- Info Section -->
      <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 class="text-2xl md:text-4xl font-serif font-bold text-text-primary tracking-tight">
          {{ profile().stageName || profile().name }}
        </h1>
        <p class="text-text-secondary mt-1 flex items-center justify-center md:justify-start gap-2">
          <mat-icon class="text-[16px] text-accent">music_note</mat-icon>
          <span>{{ profile().musicalProfile.mainInstrument }} &bull; {{ profile().musicalProfile.experienceLevel }}</span>
        </p>
        @if (profile().bio) {
          <p class="text-sm text-text-secondary/80 mt-3 max-w-2xl line-clamp-2 md:line-clamp-none">
            {{ profile().bio }}
          </p>
        }
      </div>

      <!-- Actions -->
      <div class="shrink-0 mt-4 md:mt-0 self-center md:self-start">
         <app-button variant="ghost" size="sm" icon="edit" (clicked)="editClicked.emit()">
           Editar Perfil
         </app-button>
      </div>

    </div>
  `
})
export class ProfileHero {
  readonly profile = input.required<StudentProfile>();
  readonly editClicked = output<void>();
}
