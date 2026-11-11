import { ChangeDetectionStrategy, Component, input, output, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppButton, AppCard, AppInput, AppSelect } from '../../../../shared/ui';
import { StudentProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-edit',
  imports: [MatIconModule, AppButton, AppCard, AppInput, AppSelect],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="default" padding="lg">
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <h2 class="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
          <mat-icon class="text-primary">edit</mat-icon>
          Editar Perfil
        </h2>
      </div>

      <div class="flex flex-col gap-6">
        <!-- Basic Info -->
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-text-secondary">Informações Básicas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <app-input 
              label="Nome Completo" 
              [value]="editForm().name" 
              (valueChange)="updateField('name', $event)" 
              [required]="true"
            />
            <app-input 
              label="Nome Artístico" 
              [value]="editForm().stageName || ''" 
              (valueChange)="updateField('stageName', $event)" 
            />
          </div>
          <app-input 
            label="Bio" 
            [value]="editForm().bio || ''" 
            (valueChange)="updateField('bio', $event)" 
          />
        </div>

        <!-- Musical Profile -->
        <div class="flex flex-col gap-4 pt-4 border-t border-border/40">
          <h3 class="text-sm font-semibold text-text-secondary">Perfil Musical</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <app-input 
              label="Instrumento Principal" 
              [value]="editForm().musicalProfile.mainInstrument" 
              (valueChange)="updateNested('musicalProfile', 'mainInstrument', $event)" 
              [required]="true"
            />
            <app-select 
              label="Nível" 
              [value]="editForm().musicalProfile.experienceLevel"
              [options]="levelOptions"
              (valueChange)="updateNested('musicalProfile', 'experienceLevel', $event)" 
              [required]="true"
            />
            <app-input 
              label="Instrumento Secundário" 
              [value]="editForm().musicalProfile.secondaryInstrument || ''" 
              (valueChange)="updateNested('musicalProfile', 'secondaryInstrument', $event)" 
            />
            <app-input 
              label="Tipo Vocal" 
              [value]="editForm().musicalProfile.voiceType || ''" 
              (valueChange)="updateNested('musicalProfile', 'voiceType', $event)" 
            />
            <div class="md:col-span-2">
              <app-input 
                label="Estilos Favoritos (separados por vírgula)" 
                [value]="editForm().musicalProfile.favoriteStyles.join(', ')" 
                (valueChange)="updateStyles($event)" 
              />
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="flex flex-col gap-4 pt-4 border-t border-border/40">
          <h3 class="text-sm font-semibold text-text-secondary">Preferências de Estudo</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <app-input 
              label="Tempo Diário (minutos)" 
              type="number"
              [value]="editForm().preferences.studyDuration.toString()" 
              (valueChange)="updateNumber('preferences', 'studyDuration', $event)" 
            />
            <app-select 
              label="Período Preferido" 
              [value]="editForm().preferences.preferredPracticePeriod" 
              [options]="periodOptions"
              (valueChange)="updateNested('preferences', 'preferredPracticePeriod', $event)" 
            />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-border/40">
        <app-button variant="ghost" (clicked)="cancelEdit.emit()">
          Cancelar
        </app-button>
        <app-button variant="primary" icon="save" (clicked)="onSave()">
          Salvar Alterações
        </app-button>
      </div>
    </app-card>
  `
})
export class ProfileEdit implements OnInit {
  readonly profile = input.required<StudentProfile>();
  readonly save = output<StudentProfile>();
  readonly cancelEdit = output<void>();

  // Needs initial value to avoid TS errors before OnInit
  readonly editForm = signal<StudentProfile>({} as StudentProfile);

  readonly levelOptions = [
    { value: 'Iniciante', label: 'Iniciante' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' },
    { value: 'Profissional', label: 'Profissional' }
  ];

  readonly periodOptions = [
    { value: 'Manhã', label: 'Manhã' },
    { value: 'Tarde', label: 'Tarde' },
    { value: 'Noite', label: 'Noite' },
    { value: 'Madrugada', label: 'Madrugada' },
    { value: 'Qualquer', label: 'Qualquer' }
  ];

  ngOnInit() {
    this.editForm.set(this.getInitialState());
  }

  private getInitialState(): StudentProfile {
    return JSON.parse(JSON.stringify(this.profile()));
  }

  updateField(field: keyof StudentProfile, value: string) {
    this.editForm.update(state => ({ ...state, [field]: value }));
  }

  updateNested(section: 'musicalProfile' | 'preferences', field: string, value: string) {
    this.editForm.update(state => ({
      ...state,
      [section]: {
        ...state[section],
        [field]: value
      }
    }));
  }
  
  updateNumber(section: 'preferences', field: string, value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
       this.editForm.update(state => ({
         ...state,
         [section]: {
           ...state[section],
           [field]: num
         }
       }));
    }
  }

  updateStyles(value: string) {
    const styles = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    this.editForm.update(state => ({
      ...state,
      musicalProfile: {
        ...state.musicalProfile,
        favoriteStyles: styles
      }
    }));
  }

  onSave() {
    if (!this.editForm().name || !this.editForm().musicalProfile.mainInstrument) {
      // Basic validation handled by inputs theoretically, but we could add toast here.
      // For now, let's just save.
      return;
    }
    this.save.emit(this.editForm());
  }
}
