import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppPageHeader, AppToast, AppButton } from '../../shared/ui';
import { ProfileHero } from './components/profile-hero/profile-hero';
import { ProfileSummary } from './components/profile-summary/profile-summary';
import { MusicalProfileComponent } from './components/musical-profile/musical-profile';
import { MusicalGoals } from './components/musical-goals/musical-goals';
import { MusicalPreferences } from './components/musical-preferences/musical-preferences';
import { ProfileEdit } from './components/profile-edit/profile-edit';
import { StudentProfile } from './models/profile.model';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule, AppPageHeader, AppToast, AppButton,
    ProfileHero, ProfileSummary, MusicalProfileComponent, 
    MusicalGoals, MusicalPreferences, ProfileEdit
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12 relative">
      <app-page-header
        title="Meu Perfil"
        description="Acompanhe sua trajetória musical e suas preferências de estudo."
        category="ALUNO"
        icon="person"
      >
        <div slot="page-actions">
          <app-button variant="danger" size="sm" icon="logout" (clicked)="authService.logout()">
            Sair
          </app-button>
        </div>
      </app-page-header>

      @if (showToast()) {
        <div class="fixed top-20 right-4 z-50 animate-fade-in">
          <app-toast 
            type="success" 
            title="Perfil Atualizado" 
            message="Suas informações foram salvas com sucesso!" 
            (close)="showToast.set(false)"
          />
        </div>
      }

      @if (isEditing()) {
        <!-- Edit Mode -->
        <app-profile-edit 
          [profile]="profileService.profile()" 
          (save)="onSave($event)" 
          (cancel)="onCancelEdit()" 
        />
      } @else {
        <!-- View Mode -->
        <div class="flex flex-col gap-6">
          <app-profile-hero [profile]="profileService.profile()" (editClicked)="onEdit()" />

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column -->
            <div class="lg:col-span-1 flex flex-col gap-6">
              <app-profile-summary [profile]="profileService.profile()" />
              <app-musical-profile [profile]="profileService.profile()" />
            </div>

            <!-- Right Column -->
            <div class="lg:col-span-2 flex flex-col gap-6">
              <app-musical-goals [profile]="profileService.profile()" />
              <app-musical-preferences [profile]="profileService.profile()" />
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export default class Profile {
  readonly authService = inject(AuthService);
  readonly profileService = inject(ProfileService);
  
  readonly isEditing = signal<boolean>(false);
  readonly showToast = signal<boolean>(false);

  onEdit() {
    this.isEditing.set(true);
  }

  onCancelEdit() {
    this.isEditing.set(false);
  }

  async onSave(updatedProfile: StudentProfile) {
    try {
      await this.profileService.saveProfile(updatedProfile);
      this.isEditing.set(false);
      this.showToast.set(true);
      setTimeout(() => this.showToast.set(false), 5000);
    } catch (e) {
      console.error(e);
      alert('Não foi possível salvar o perfil.');
    }
  }
}
