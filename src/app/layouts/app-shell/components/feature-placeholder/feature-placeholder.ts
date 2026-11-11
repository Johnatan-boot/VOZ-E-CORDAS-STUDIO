import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppCheckbox,
  AppDivider,
  AppDrawer,
  AppDropdown,
  AppEmptyState,
  AppIconButton,
  AppInput,
  AppModal,
  AppPageHeader,
  AppProgress,
  AppRadioGroup,
  AppSelect,
  AppSkeleton,
  AppSlider,
  AppSwitch,
  AppTabs,
  AppToast,
  AppTooltip,
  type TabItem,
  type SelectOption,
  type RadioOption,
  type DropdownItem,
} from '../../../../shared/ui';

@Component({
  selector: 'app-feature-placeholder',
  imports: [
    MatIconModule,
    AppButton,
    AppIconButton,
    AppCard,
    AppBadge,
    AppInput,
    AppSelect,
    AppCheckbox,
    AppRadioGroup,
    AppSwitch,
    AppSlider,
    AppTabs,
    AppPageHeader,
    AppProgress,
    AppToast,
    AppEmptyState,
    AppSkeleton,
    AppModal,
    AppDrawer,
    AppDropdown,
    AppTooltip,
    AppDivider,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="feature-placeholder-container" class="space-y-8 pb-12">
      <!-- Standardized Page Header Component -->
      <app-page-header
        [title]="pageTitle()"
        [category]="sectionCategory()"
        [icon]="sectionIcon()"
        description="Biblioteca de componentes de interface reutilizáveis do Voz & Cordas Studio, respeitando rigorosamente o Design System."
        badge="Etapa 4 Concluída"
      >
        <div page-actions class="flex items-center gap-2">
          <app-button
            variant="secondary"
            size="sm"
            icon="tune"
            (clicked)="isDrawerOpen.set(true)"
          >
            Abrir Drawer
          </app-button>
          <app-button
            variant="primary"
            size="sm"
            icon="visibility"
            (clicked)="isModalOpen.set(true)"
          >
            Abrir Modal
          </app-button>
        </div>
      </app-page-header>

      <!-- Component Library Tabs Navigation -->
      <app-tabs
        [tabs]="libraryTabs"
        [activeTabId]="activeTab()"
        (tabChange)="activeTab.set($event)"
      >
        <!-- TAB: BOTÕES & AÇÕES -->
        @if (activeTab() === 'buttons') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <!-- Buttons Variants -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Variantes de Botão</h3>
                <app-badge variant="primary">app-button</app-badge>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <app-button variant="primary" icon="play_arrow">Primário</app-button>
                <app-button variant="secondary" icon="settings">Secundário</app-button>
                <app-button variant="ghost" icon="graphic_eq">Ghost</app-button>
                <app-button variant="danger" icon="delete">Perigo</app-button>
              </div>

              <app-divider spacing="sm" label="Tamanhos" />

              <div class="flex flex-wrap items-center gap-3">
                <app-button variant="primary" size="sm">Pequeno (sm)</app-button>
                <app-button variant="primary" size="md">Médio (md)</app-button>
                <app-button variant="primary" size="lg">Grande (lg)</app-button>
              </div>

              <app-divider spacing="sm" label="Estados Especiais" />

              <div class="flex flex-wrap items-center gap-3">
                <app-button variant="primary" [loading]="true">Carregando</app-button>
                <app-button variant="secondary" [disabled]="true" icon="lock">Desabilitado</app-button>
              </div>
            </app-card>

            <!-- Icon Buttons & Tooltips -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Botões de Ícone & Tooltips</h3>
                <app-badge variant="accent">app-icon-button</app-badge>
              </div>

              <p class="text-xs text-text-secondary mb-4 leading-relaxed">
                Botões de ícone com touch target acessível (WCAG 44px) e suporte a tooltips em 4 direções.
              </p>

              <div class="flex flex-wrap items-center gap-4">
                <app-tooltip text="Tocar áudio (Top)" position="top">
                  <app-icon-button icon="play_arrow" ariaLabel="Tocar áudio" variant="primary" />
                </app-tooltip>

                <app-tooltip text="Ajustes de som (Bottom)" position="bottom">
                  <app-icon-button icon="tune" ariaLabel="Ajustes" variant="secondary" />
                </app-tooltip>

                <app-tooltip text="Metrônomo (Left)" position="left">
                  <app-icon-button icon="timer" ariaLabel="Metrônomo" variant="ghost" />
                </app-tooltip>

                <app-tooltip text="Descartar gravação (Right)" position="right">
                  <app-icon-button icon="delete_outline" ariaLabel="Descartar" variant="danger" />
                </app-tooltip>
              </div>

              <app-divider spacing="sm" label="Menu Dropdown Integrado" />

              <div class="flex items-center gap-4">
                <app-dropdown
                  label="Ações Rápidas"
                  icon="more_vert"
                  [items]="dropdownOptions"
                  (itemSelect)="handleDropdownSelect($event)"
                />

                <span class="text-xs font-mono text-text-secondary">
                  Selecionado: <span class="text-accent font-bold">{{ selectedDropdownItem() }}</span>
                </span>
              </div>
            </app-card>
          </div>
        }

        <!-- TAB: FORMULÁRIOS & CONTROLES -->
        @if (activeTab() === 'forms') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <!-- Inputs & Selects -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Campos de Entrada</h3>
                <app-badge variant="primary">app-input / select</app-badge>
              </div>

              <div class="space-y-4">
                <app-input
                  id="sample-text"
                  label="Nome da Sessão"
                  placeholder="Ex: Treino Vocal - Harmonia em Terças"
                  icon="music_note"
                  [value]="sessionName()"
                  (valueChange)="sessionName.set($event)"
                  helper="Nome de identificação do treino ou ensaio"
                />

                <app-select
                  id="sample-voice"
                  label="Voz Principal"
                  placeholder="Selecione o tipo de voz..."
                  [options]="voiceOptions"
                  [value]="selectedVoice()"
                  (valueChange)="selectedVoice.set($event)"
                  [required]="true"
                />

                <app-input
                  id="sample-error"
                  label="Campo com Validação"
                  value="Tom incorreto"
                  error="O tom selecionado não está dentro do registro vocal configurado."
                />
              </div>
            </app-card>

            <!-- Selection Controls: Checkbox, Radio, Switch, Slider -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Seletores & Sliders</h3>
                <app-badge variant="accent">controls</app-badge>
              </div>

              <div class="space-y-5">
                <app-switch
                  id="metronome-switch"
                  label="Metrônomo com Clique Auditivo"
                  description="Emite sinal percussivo a cada tempo do compasso"
                  [checked]="metronomeEnabled()"
                  (checkedChange)="metronomeEnabled.set($event)"
                />

                <app-slider
                  id="tempo-slider"
                  label="Tempo do Metrônomo (BPM)"
                  [min]="40"
                  [max]="240"
                  [value]="tempoBpm()"
                  unit=" BPM"
                  (valueChange)="tempoBpm.set($event)"
                />

                <app-divider spacing="sm" label="Modo de Treinamento" />

                <app-radio-group
                  name="trainingMode"
                  [options]="trainingModes"
                  [value]="selectedMode()"
                  layout="horizontal"
                  (valueChange)="selectedMode.set($event)"
                />

                <app-divider spacing="sm" label="Opções Adicionais" />

                <app-checkbox
                  id="opt-feedback"
                  label="Feedback Visual de Afinação em Tempo Real"
                  description="Mostra a guia de notas na interface de estudo"
                  [checked]="visualFeedback()"
                  (checkedChange)="visualFeedback.set($event)"
                />
              </div>
            </app-card>
          </div>
        }

        <!-- TAB: FEEDBACK & STATUS -->
        @if (activeTab() === 'feedback') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <!-- Progress Bars & Badges -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Barras de Progresso & Badges</h3>
                <app-badge variant="success">app-progress</app-badge>
              </div>

              <div class="space-y-5">
                <app-progress
                  label="Precisão Vocal (Primary)"
                  [value]="84"
                  variant="primary"
                />

                <app-progress
                  label="Andamento e Ritmo (Accent)"
                  [value]="92"
                  variant="accent"
                />

                <app-progress
                  label="Estabilidade Harmônica (Success)"
                  [value]="76"
                  variant="success"
                />

                <app-progress
                  label="Variação de Pitch (Warning)"
                  [value]="45"
                  variant="warning"
                />

                <app-divider spacing="sm" label="Conjunto de Badges" />

                <div class="flex flex-wrap items-center gap-2">
                  <app-badge variant="default">Default</app-badge>
                  <app-badge variant="primary" [dot]="true">Gravando</app-badge>
                  <app-badge variant="accent" icon="star">Premium</app-badge>
                  <app-badge variant="success">Afinado</app-badge>
                  <app-badge variant="warning">Atenção</app-badge>
                  <app-badge variant="error">Desafinado</app-badge>
                  <app-badge variant="info">Stereo</app-badge>
                </div>
              </div>
            </app-card>

            <!-- Toasts & Skeleton Loading -->
            <app-card>
              <div card-header class="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <h3 class="font-serif text-lg font-bold text-text-primary">Notificações & Carregamento</h3>
                <app-badge variant="info">app-toast / skeleton</app-badge>
              </div>

              <div class="space-y-4">
                <app-toast
                  variant="success"
                  title="Treino Concluído"
                  message="Sua afinação média atingiu 94% de conformidade com a escala modelo."
                />

                <app-toast
                  variant="warning"
                  title="Sensibilidade de Entrada"
                  message="O microfone detectou ruído de fundo moderado."
                />

                <app-divider spacing="sm" label="Esqueletos de Carregamento (Skeleton)" />

                <div class="space-y-2.5">
                  <app-skeleton className="h-4 w-3/4" />
                  <app-skeleton className="h-4 w-full" />
                  <app-skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </app-card>
          </div>
        }

        <!-- TAB: CARDS & OVERLAYS -->
        @if (activeTab() === 'overlays') {
          <div class="space-y-6 animate-fade-in">
            <!-- Empty State Component -->
            <app-card>
              <app-empty-state
                icon="music_note"
                title="Nenhum Exercício Gravado Ainda"
                description="Quando você iniciar uma sessão prática, suas gravações e análises comparativas de harmonia aparecerão organizadas aqui."
              >
                <div empty-actions>
                  <app-button
                    variant="primary"
                    icon="add"
                    (clicked)="isModalOpen.set(true)"
                  >
                    Iniciar Primeira Sessão
                  </app-button>
                  <app-button
                    variant="secondary"
                    icon="tune"
                    (clicked)="isDrawerOpen.set(true)"
                  >
                    Configurar Dispositivo
                  </app-button>
                </div>
              </app-empty-state>
            </app-card>

            <!-- Cards Hierarchy -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <app-card variant="default">
                <div card-header class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-primary text-[20px]">mic</mat-icon>
                  <h4 class="text-sm font-semibold text-text-primary">Card Padrão</h4>
                </div>
                <p class="text-xs text-text-secondary leading-relaxed">
                  Superfície elevada com borda sutil para conteúdos principais e blocos de dados.
                </p>
              </app-card>

              <app-card variant="elevated">
                <div card-header class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-accent text-[20px]">equalizer</mat-icon>
                  <h4 class="text-sm font-semibold text-text-primary">Card Elevado</h4>
                </div>
                <p class="text-xs text-text-secondary leading-relaxed">
                  Superfície com destaque e profundidade superior para cards prioritários.
                </p>
              </app-card>

              <app-card variant="bordered" [interactive]="true">
                <div card-header class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-success text-[20px]">touch_app</mat-icon>
                  <h4 class="text-sm font-semibold text-text-primary">Card Interativo</h4>
                </div>
                <p class="text-xs text-text-secondary leading-relaxed">
                  Card com comportamento hover e clique para itens navegáveis e atalhos.
                </p>
              </app-card>
            </div>
          </div>
        }
      </app-tabs>

      <!-- Modal Component -->
      <app-modal
        [isOpen]="isModalOpen()"
        title="Configurações de Treino"
        subtitle="Componente AppModal com fechamento por ESC e backdrop"
        (closeModal)="isModalOpen.set(false)"
      >
        <div class="space-y-4 py-2">
          <app-input
            id="modal-session"
            label="Título da Sessão"
            value="Ensaio Vocal Dupla"
            placeholder="Digite o título..."
          />
          <app-select
            id="modal-select"
            label="Tonalidade"
            [options]="keyOptions"
            value="G"
          />
          <app-switch
            id="modal-rec"
            label="Gravação Automática"
            description="Salvar take de áudio ao final da execução"
            [checked]="true"
          />
        </div>

        <div modal-footer class="flex items-center gap-3">
          <app-button variant="secondary" size="sm" (clicked)="isModalOpen.set(false)">
            Cancelar
          </app-button>
          <app-button variant="primary" size="sm" (clicked)="isModalOpen.set(false)">
            Confirmar
          </app-button>
        </div>
      </app-modal>

      <!-- Drawer Component -->
      <app-drawer
        [isOpen]="isDrawerOpen()"
        title="Painel de Preferências"
        side="right"
        (closeDrawer)="isDrawerOpen.set(false)"
      >
        <div class="space-y-6">
          <div>
            <span class="inline-flex px-2 py-0.5 rounded-lg border border-border/40 text-[10px] font-semibold text-primary mb-2">Entrada de Áudio</span>
            <app-select
              id="drawer-mic"
              label="Dispositivo de Microfone"
              [options]="micOptions"
              value="mic-1"
            />
          </div>

          <app-divider spacing="sm" label="Calibração" />

          <app-slider
            id="drawer-gain"
            label="Ganho de Entrada"
            [min]="0"
            [max]="100"
            [value]="75"
            unit="%"
          />

          <app-switch
            id="drawer-filter"
            label="Filtro Passa-Alta (80Hz)"
            description="Elimina ruídos de vento e vibrações mecânicas"
            [checked]="true"
          />
        </div>

        <div drawer-footer class="flex items-center justify-between w-full">
          <app-button variant="ghost" size="sm" (clicked)="isDrawerOpen.set(false)">
            Restaurar
          </app-button>
          <app-button variant="primary" size="sm" (clicked)="isDrawerOpen.set(false)">
            Salvar
          </app-button>
        </div>
      </app-drawer>
    </div>
  `,
})
export class FeaturePlaceholder {
  private readonly route = inject(ActivatedRoute);

  readonly activeTab = signal<string>('buttons');
  readonly isModalOpen = signal<boolean>(false);
  readonly isDrawerOpen = signal<boolean>(false);

  readonly sessionName = signal<string>('Ensaio Vocal 01');
  readonly selectedVoice = signal<string>('tenor');
  readonly metronomeEnabled = signal<boolean>(true);
  readonly tempoBpm = signal<number>(120);
  readonly selectedMode = signal<string>('solo');
  readonly visualFeedback = signal<boolean>(true);
  readonly selectedDropdownItem = signal<string>('Nenhuma');

  readonly libraryTabs: readonly TabItem[] = [
    { id: 'buttons', label: 'Botões & Ações', icon: 'smart_button', badge: 'Essencial' },
    { id: 'forms', label: 'Formulários & Controles', icon: 'tune', badge: '6 Tipos' },
    { id: 'feedback', label: 'Feedback & Status', icon: 'insights' },
    { id: 'overlays', label: 'Cards & Janelas', icon: 'layers' },
  ];

  readonly voiceOptions: readonly SelectOption[] = [
    { value: 'soprano', label: 'Soprano (Agudo Feminino)' },
    { value: 'contralto', label: 'Contralto (Grave Feminino)' },
    { value: 'tenor', label: 'Tenor (Agudo Masculino)' },
    { value: 'baritono', label: 'Barítono (Médio Masculino)' },
    { value: 'baixo', label: 'Baixo (Grave Masculino)' },
  ];

  readonly trainingModes: readonly RadioOption[] = [
    { value: 'solo', label: 'Treino Solo', description: 'Prática individual com guia' },
    { value: 'duo', label: 'Treino em Dupla', description: 'Harmonização 1ª e 2ª voz' },
  ];

  readonly dropdownOptions: readonly DropdownItem[] = [
    { id: 'duplicate', label: 'Duplicar Exercício', icon: 'content_copy' },
    { id: 'export', label: 'Exportar Gravação', icon: 'file_download' },
    { id: 'share', label: 'Compartilhar com Dupla', icon: 'share' },
    { id: 'delete', label: 'Excluir da Lista', icon: 'delete', danger: true, dividerAbove: true },
  ];

  readonly keyOptions: readonly SelectOption[] = [
    { value: 'C', label: 'Dó Maior (C)' },
    { value: 'D', label: 'Ré Maior (D)' },
    { value: 'E', label: 'Mi Maior (E)' },
    { value: 'G', label: 'Sol Maior (G)' },
    { value: 'A', label: 'Lá Maior (A)' },
  ];

  readonly micOptions: readonly SelectOption[] = [
    { value: 'mic-1', label: 'Microfone Integrado (Padrão)' },
    { value: 'mic-2', label: 'Interface de Áudio USB (2 canais)' },
    { value: 'mic-3', label: 'Headset com Microfone' },
  ];

  pageTitle() {
    return this.route.snapshot.data['title'] || 'Component Library';
  }

  sectionCategory() {
    return this.route.snapshot.data['category'] || 'DESIGN SYSTEM';
  }

  sectionIcon() {
    return this.route.snapshot.data['icon'] || 'widgets';
  }

  handleDropdownSelect(itemId: string): void {
    const item = this.dropdownOptions.find((i) => i.id === itemId);
    if (item) {
      this.selectedDropdownItem.set(item.label);
    }
  }
}
