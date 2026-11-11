import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard, AppPageHeader } from '../../../../shared/ui';
import {
  ALL_VOCAL_NOTES,
  DUO_REPERTOIRE_SONGS,
  DUO_SCALES,
  RepertoireDuoSong,
  ScaleDuoItem,
  VocalNoteHarmony
} from '../../data/vocal-notes.data';
import { VocalNotesAudioService } from '../../services/vocal-notes-audio.service';
import { VocalAudioService } from '../../services/vocal-audio.service';

type ExplorerTab = 'all-notes' | 'live-mic' | 'duo-scales' | 'repertoire';
type VoiceRoleMode = 'first-voice' | 'second-voice';

@Component({
  selector: 'app-vocal-notes-explorer',
  imports: [DecimalPipe, MatIconModule, AppBadge, AppButton, AppCard, AppPageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-16">
      <!-- Page Header -->
      <app-page-header
        title="Notas Vocais: 1ª & 2ª Voz"
        description="Dicionário harmônico completo, detector de voz ao vivo e guia sonoro de todas as notas cantadas em duetos e duplas."
        category="TREINAMENTO HARMONIZADO"
        icon="record_voice_over"
      >
        <div slot="page-actions" class="flex flex-wrap items-center gap-2">
          <app-badge variant="primary" size="sm">
            49 Notas Cromáticas (C2 a C6)
          </app-badge>
          <app-badge variant="success" size="sm" [dot]="audioService.isPlayingSequence()">
            {{ audioService.isPlayingSequence() ? 'Áudio em Execução' : 'Sintetizador Pronto' }}
          </app-badge>
        </div>
      </app-page-header>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        <button
          type="button"
          (click)="activeTab.set('all-notes')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer"
          [class]="activeTab() === 'all-notes'
            ? 'bg-primary text-background font-bold shadow-sm'
            : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border'"
        >
          <mat-icon class="text-[18px]">queue_music</mat-icon>
          <span>Dicionário Completo de Notas (C2 a C6)</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('live-mic')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer"
          [class]="activeTab() === 'live-mic'
            ? 'bg-primary text-background font-bold shadow-sm'
            : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border'"
        >
          <mat-icon class="text-[18px]">mic</mat-icon>
          <span>Detector de 1ª e 2ª Voz (Microfone)</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('duo-scales')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer"
          [class]="activeTab() === 'duo-scales'
            ? 'bg-primary text-background font-bold shadow-sm'
            : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border'"
        >
          <mat-icon class="text-[18px]">horizontal_split</mat-icon>
          <span>Escalas de Dueto por Tom</span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('repertoire')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer"
          [class]="activeTab() === 'repertoire'
            ? 'bg-primary text-background font-bold shadow-sm'
            : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border'"
        >
          <mat-icon class="text-[18px]">library_music</mat-icon>
          <span>Canções & Frases Nota a Nota</span>
        </button>
      </div>

      <!-- Quick Audio Status Banner -->
      @if (audioService.activeNoteFeedback(); as feedback) {
        <div class="px-4 py-2.5 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-between text-xs text-text-primary animate-fade-in">
          <div class="flex items-center gap-2 font-semibold">
            <mat-icon class="text-accent text-[18px] animate-spin">graphic_eq</mat-icon>
            <span>Reproduzindo no som: <strong class="text-accent">{{ feedback }}</strong></span>
          </div>
          <button
            type="button"
            (click)="audioService.stopPlayback()"
            class="text-[11px] font-bold text-text-secondary hover:text-text-primary underline cursor-pointer"
          >
            Silenciar
          </button>
        </div>
      }

      <!-- TAB 1: ALL VOCAL NOTES DICTIONARY -->
      @if (activeTab() === 'all-notes') {
        <div class="flex flex-col gap-6">
          <!-- Filters & Search Bar -->
          <app-card variant="default" padding="md">
            <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <!-- Search Input -->
              <div class="relative flex-1">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">search</mat-icon>
                <input
                  type="text"
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                  placeholder="Buscar nota (ex: G3, Sol, Dó#, F4, Mi 3)..."
                  class="w-full bg-surface-elevated border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <!-- Filter by Octave -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span class="text-xs font-semibold text-text-secondary mr-1">Oitava:</span>
                <button
                  type="button"
                  (click)="selectedOctave.set(null)"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  [class]="selectedOctave() === null ? 'bg-primary text-background' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
                >
                  Todas
                </button>
                @for (oct of [2, 3, 4, 5, 6]; track oct) {
                  <button
                    type="button"
                    (click)="selectedOctave.set(oct)"
                    class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    [class]="selectedOctave() === oct ? 'bg-primary text-background' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
                  >
                    {{ oct }}ª
                  </button>
                }
              </div>

              <!-- Filter by Range Type -->
              <div class="flex items-center gap-1.5 overflow-x-auto">
                <span class="text-xs font-semibold text-text-secondary mr-1">Naipe:</span>
                <button
                  type="button"
                  (click)="selectedRangeType.set(null)"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  [class]="selectedRangeType() === null ? 'bg-accent text-background' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
                >
                  Todos
                </button>
                @for (type of vocalTypes; track type) {
                  <button
                    type="button"
                    (click)="selectedRangeType.set(type)"
                    class="px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
                    [class]="selectedRangeType() === type ? 'bg-accent text-background font-bold' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
                  >
                    {{ type }}
                  </button>
                }
              </div>
            </div>
          </app-card>

          <!-- Harmonic Rule Guide Header Card -->
          <div class="p-4 rounded-2xl bg-surface-elevated border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-start gap-3">
              <div class="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <mat-icon class="text-[20px]">music_note</mat-icon>
              </div>
              <div>
                <h3 class="text-sm font-bold text-text-primary">Como Funciona a Correspondência de Vozes</h3>
                <p class="text-xs text-text-secondary leading-relaxed mt-0.5">
                  Quando a <strong>1ª Voz</strong> canta a nota fundamental, a <strong>2ª Voz</strong> responde na <strong>Terça Maior/Menor</strong> (harmonia clássica aberta) ou na <strong>Terça Abaixo</strong> (segunda voz grave sertaneja). Teste o som individual ou em dueto em cada nota abaixo.
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs font-mono text-text-secondary">{{ filteredVocalNotes().length }} notas encontradas</span>
            </div>
          </div>

          <!-- Notes Table & Cards -->
          <div class="flex flex-col gap-3">
            @for (item of filteredVocalNotes(); track item.note) {
              <div class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                
                <!-- 1st Voice Identity -->
                <div class="flex items-center gap-4 min-w-[220px]">
                  <div class="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-primary shrink-0 shadow-xs">
                    <span class="font-serif text-lg font-bold leading-none">{{ item.note }}</span>
                    <span class="text-[10px] font-semibold mt-0.5">{{ item.noteNamePt }}</span>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold text-text-primary">1ª Voz (Fundamental)</span>
                      <app-badge variant="default" size="sm">{{ item.vocalRangeType }}</app-badge>
                    </div>
                    <span class="font-mono text-xs text-text-secondary mt-0.5">
                      {{ item.frequency | number: '1.2-2' }} Hz | Solfejo: {{ item.solfege }}
                    </span>
                    <span class="text-[10px] text-text-secondary/70">Oitava {{ item.octave }}</span>
                  </div>
                </div>

                <!-- 2nd Voice Harmony Pairs (Terça Acima, Terça Abaixo, Quinta) -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                  
                  <!-- Option A: Terça Acima -->
                  <div class="p-2.5 rounded-xl bg-surface-elevated border border-border/80 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-accent uppercase tracking-wider">2ª Voz (3ª Acima)</span>
                      <span class="text-[10px] font-mono font-bold text-text-primary">{{ item.secondVoiceThirdAbove.note }}</span>
                    </div>
                    <div class="flex items-baseline justify-between mt-1">
                      <span class="text-xs font-semibold text-text-primary">{{ item.secondVoiceThirdAbove.namePt }}</span>
                      <span class="text-[10px] font-mono text-text-secondary">{{ item.secondVoiceThirdAbove.frequency }} Hz</span>
                    </div>
                    <span class="text-[9px] text-text-secondary/80 mt-1 line-clamp-1">Brilhante e aberto</span>
                  </div>

                  <!-- Option B: Terça Abaixo -->
                  <div class="p-2.5 rounded-xl bg-surface-elevated border border-border/80 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-primary uppercase tracking-wider">2ª Voz (3ª Abaixo)</span>
                      <span class="text-[10px] font-mono font-bold text-text-primary">{{ item.secondVoiceThirdBelow.note }}</span>
                    </div>
                    <div class="flex items-baseline justify-between mt-1">
                      <span class="text-xs font-semibold text-text-primary">{{ item.secondVoiceThirdBelow.namePt }}</span>
                      <span class="text-[10px] font-mono text-text-secondary">{{ item.secondVoiceThirdBelow.frequency }} Hz</span>
                    </div>
                    <span class="text-[9px] text-text-secondary/80 mt-1 line-clamp-1">Grave sertanejo</span>
                  </div>

                  <!-- Option C: Quinta Justa -->
                  <div class="p-2.5 rounded-xl bg-surface-elevated border border-border/80 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-bold text-text-secondary uppercase tracking-wider">2ª Voz (5ª Justa)</span>
                      <span class="text-[10px] font-mono font-bold text-text-primary">{{ item.secondVoiceFifthAbove.note }}</span>
                    </div>
                    <div class="flex items-baseline justify-between mt-1">
                      <span class="text-xs font-semibold text-text-primary">{{ item.secondVoiceFifthAbove.namePt }}</span>
                      <span class="text-[10px] font-mono text-text-secondary">{{ item.secondVoiceFifthAbove.frequency }} Hz</span>
                    </div>
                    <span class="text-[9px] text-text-secondary/80 mt-1 line-clamp-1">Suporte e potência</span>
                  </div>

                </div>

                <!-- Polyphonic Audio Players -->
                <div class="flex items-center gap-1.5 shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    (click)="audioService.playNote(item.frequency, 1.8, item.noteNamePt + ' (1ª Voz)')"
                    class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-all cursor-pointer border border-primary/20"
                    title="Ouvir 1ª Voz isolada"
                  >
                    <mat-icon class="text-[16px]">person</mat-icon>
                    <span>1ª Voz</span>
                  </button>

                  <button
                    type="button"
                    (click)="audioService.playNote(item.secondVoiceThirdAbove.frequency, 1.8, item.secondVoiceThirdAbove.namePt + ' (2ª Voz)')"
                    class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent text-xs font-semibold transition-all cursor-pointer border border-accent/20"
                    title="Ouvir 2ª Voz isolada"
                  >
                    <mat-icon class="text-[16px]">record_voice_over</mat-icon>
                    <span>2ª Voz</span>
                  </button>

                  <button
                    type="button"
                    (click)="audioService.playDuo(item.frequency, item.secondVoiceThirdAbove.frequency, 2.2, item.note + ' + ' + item.secondVoiceThirdAbove.note + ' (Dueto)')"
                    class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-background text-xs font-bold transition-all cursor-pointer shadow-xs hover:opacity-90"
                    title="Ouvir 1ª e 2ª Vozes juntas em harmonia"
                  >
                    <mat-icon class="text-[16px]">group</mat-icon>
                    <span>Ouvir Dueto</span>
                  </button>
                </div>

              </div>
            }
          </div>
        </div>
      }

      <!-- TAB 2: LIVE MIC DETECTION (1ª OU 2ª VOZ) -->
      @if (activeTab() === 'live-mic') {
        <div class="flex flex-col gap-6">
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col items-center text-center max-w-2xl mx-auto mb-6">
              <div class="flex items-center gap-2 mb-2">
                <app-badge variant="primary" size="md">DETECTOR VOCAL INTELIGENTE</app-badge>
              </div>
              <h2 class="text-xl sm:text-2xl font-serif font-bold text-text-primary">
                Cante Qualquer Nota e Descubra o Dueto
              </h2>
              <p class="text-xs sm:text-sm text-text-secondary mt-1">
                Ative seu microfone e emita uma nota com a voz. O app reconhecerá instantaneamente a nota cantada e mostrará o que a outra voz (1ª ou 2ª) deve cantar!
              </p>

              <!-- Mic Activation Button -->
              <div class="flex items-center gap-3 mt-4">
                @if (!vocalAudioService.isMicActive()) {
                  <app-button
                    variant="primary"
                    size="lg"
                    icon="mic"
                    (clicked)="vocalAudioService.startMic()"
                  >
                    Ativar Microfone para Detecção
                  </app-button>
                } @else {
                  <app-button
                    variant="secondary"
                    size="lg"
                    icon="mic_off"
                    (clicked)="vocalAudioService.stopMic()"
                  >
                    Desativar Microfone
                  </app-button>
                }
              </div>
            </div>

            <!-- Role Selector: Am I 1st voice or 2nd voice? -->
            <div class="flex justify-center mb-8">
              <div class="p-1 bg-surface-elevated border border-border rounded-2xl flex items-center gap-1">
                <button
                  type="button"
                  (click)="voiceRoleMode.set('first-voice')"
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  [class]="voiceRoleMode() === 'first-voice' ? 'bg-primary text-background shadow-xs' : 'text-text-secondary hover:text-text-primary'"
                >
                  <mat-icon class="text-[18px]">person</mat-icon>
                  <span>Eu Estou Cantando a 1ª Voz</span>
                </button>
                <button
                  type="button"
                  (click)="voiceRoleMode() === 'second-voice'"
                  (click)="voiceRoleMode.set('second-voice')"
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  [class]="voiceRoleMode() === 'second-voice' ? 'bg-accent text-background shadow-xs' : 'text-text-secondary hover:text-text-primary'"
                >
                  <mat-icon class="text-[18px]">record_voice_over</mat-icon>
                  <span>Eu Estou Cantando a 2ª Voz</span>
                </button>
              </div>
            </div>

            <!-- Real-Time Pitch Visualization -->
            <div class="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center relative overflow-hidden">
              @if (vocalAudioService.feedback().isSinging) {
                <div class="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none"></div>
              }

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl items-center z-10">
                <!-- What user is singing -->
                <div class="flex flex-col items-center p-6 rounded-2xl bg-surface-elevated border border-border/80">
                  <span class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                    {{ voiceRoleMode() === 'first-voice' ? 'Sua Nota Cantada (1ª Voz)' : 'Sua Nota Cantada (2ª Voz)' }}
                  </span>
                  
                  <div
                    class="h-28 w-28 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-200 shadow-md my-2"
                    [class]="vocalAudioService.feedback().isSinging ? 'border-primary bg-primary/10 scale-105' : 'border-border bg-background'"
                  >
                    <span class="font-serif text-3xl font-bold text-text-primary">
                      {{ vocalAudioService.feedback().sungNoteName || '--' }}
                    </span>
                    <span class="text-[10px] font-mono text-text-secondary mt-0.5">
                      {{ vocalAudioService.feedback().isSinging ? (vocalAudioService.feedback().sungFrequency | number: '1.1-1') + ' Hz' : 'Sem sinal vocal' }}
                    </span>
                  </div>

                  <span class="text-xs text-text-secondary text-center mt-2">
                    {{ vocalAudioService.feedback().isSinging ? 'Nota detectada com sucesso!' : 'Emita uma nota contínua com a voz' }}
                  </span>
                </div>

                <!-- What the partner should sing -->
                <div class="flex flex-col items-center p-6 rounded-2xl bg-surface-elevated border border-border/80">
                  <span class="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                    {{ voiceRoleMode() === 'first-voice' ? 'Seu Parceiro (2ª Voz) Deve Cantar' : 'A Voz Principal (1ª Voz) da Canção Está Em' }}
                  </span>

                  @if (detectedHarmonyInfo(); as hInfo) {
                    <div class="flex flex-col items-center text-center my-1">
                      <div class="h-28 w-28 rounded-full border-4 border-accent bg-accent/15 flex flex-col items-center justify-center shadow-md animate-scale-in">
                        <span class="font-serif text-3xl font-bold text-accent">
                          {{ hInfo.suggestedNote }}
                        </span>
                        <span class="text-[10px] font-mono text-text-primary mt-0.5">
                          {{ hInfo.suggestedFreq | number: '1.1-1' }} Hz
                        </span>
                      </div>
                      <span class="text-xs font-bold text-text-primary mt-3">{{ hInfo.suggestedNamePt }}</span>
                      <span class="text-[11px] text-accent font-semibold">{{ hInfo.intervalName }}</span>
                      <span class="text-[10px] text-text-secondary mt-1">{{ hInfo.desc }}</span>

                      <button
                        type="button"
                        (click)="audioService.playNote(hInfo.suggestedFreq, 2.0, hInfo.suggestedNote)"
                        class="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 hover:bg-accent/30 text-accent text-xs font-bold transition-all cursor-pointer"
                      >
                        <mat-icon class="text-[16px]">volume_up</mat-icon>
                        <span>Ouvir Essa Nota de Apoio</span>
                      </button>
                    </div>
                  } @else {
                    <div class="flex flex-col items-center justify-center h-44 text-text-secondary/60">
                      <mat-icon class="text-4xl mb-2">graphic_eq</mat-icon>
                      <span class="text-xs">Aguardando emissão da voz...</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Virtual Keyboard for quick mic-free testing -->
            <div class="mt-8 pt-6 border-t border-border/60 flex flex-col items-center">
              <div class="flex items-center justify-between w-full max-w-2xl mb-3">
                <span class="text-xs font-bold text-text-secondary uppercase tracking-wider">Testar Rapidamente sem Microfone (Simulador de Notas)</span>
                <span class="text-[11px] text-text-secondary">Clique para emitir</span>
              </div>
              <div class="flex flex-wrap justify-center gap-2">
                @for (simKey of quickTestKeys; track simKey.note) {
                  <button
                    type="button"
                    (click)="simulateSungNote(simKey.note, simKey.freq)"
                    class="flex flex-col items-center justify-center px-3 py-2 rounded-xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary text-text-primary transition-all cursor-pointer min-w-[54px]"
                  >
                    <span class="text-xs font-bold">{{ simKey.note }}</span>
                    <span class="text-[9px] text-text-secondary">{{ simKey.pt }}</span>
                  </button>
                }
              </div>
            </div>
          </app-card>
        </div>
      }

      <!-- TAB 3: DUO SCALES (BY KEY) -->
      @if (activeTab() === 'duo-scales') {
        <div class="flex flex-col gap-6">
          <app-card variant="default" padding="md">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 class="text-sm font-bold text-text-primary">Escalas Diatônicas em Terças (1ª e 2ª Voz)</h3>
                <p class="text-xs text-text-secondary mt-0.5">
                  Selecione a tonalidade da música e veja a escala completa com os pares exatos das duas vozes grau a grau.
                </p>
              </div>

              <!-- Key Selector Buttons -->
              <div class="flex flex-wrap items-center gap-1.5">
                @for (scale of duoScales; track scale.key) {
                  <button
                    type="button"
                    (click)="selectedScale.set(scale)"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    [class]="selectedScale().key === scale.key ? 'bg-primary text-background shadow-xs' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
                  >
                    {{ scale.key }}
                  </button>
                }
              </div>
            </div>
          </app-card>

          <!-- Selected Scale Detail -->
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <app-badge variant="primary" size="sm">ESCALA HARMONIZADA</app-badge>
                  <span class="text-xs font-mono text-text-secondary">{{ selectedScale().description }}</span>
                </div>
                <h2 class="text-xl font-serif font-bold text-text-primary">Tom de {{ selectedScale().key }}</h2>
              </div>

              <!-- Play Whole Scale Actions -->
              <div class="flex flex-wrap items-center gap-2">
                <app-button
                  variant="primary"
                  size="md"
                  icon="play_arrow"
                  [disabled]="audioService.isPlayingSequence()"
                  (clicked)="playScaleInDuo(selectedScale())"
                >
                  Ouvir Escala Completa em Dueto
                </app-button>

                @if (audioService.isPlayingSequence()) {
                  <app-button
                    variant="ghost"
                    size="md"
                    icon="stop"
                    (clicked)="audioService.stopPlayback()"
                  >
                    Parar
                  </app-button>
                }
              </div>
            </div>

            <!-- Degrees Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              @for (step of selectedScale().notes; track step.degree; let idx = $index) {
                <div
                  class="p-3 rounded-xl border flex flex-col items-center text-center transition-all duration-200"
                  [class]="audioService.currentPlayingIndex() === idx
                    ? 'bg-primary/15 border-primary shadow-md scale-105'
                    : 'bg-surface border-border hover:border-primary/40'"
                >
                  <span class="text-[10px] font-bold text-text-secondary uppercase mb-1">Grau {{ step.degree }}</span>
                  
                  <!-- 2nd Voice Note (Top) -->
                  <div class="flex flex-col items-center my-1 p-1.5 rounded-lg bg-accent/10 border border-accent/20 w-full">
                    <span class="text-[9px] font-bold text-accent">2ª VOZ</span>
                    <span class="text-sm font-bold text-accent font-serif">{{ step.secondVoiceNote }}</span>
                    <span class="text-[9px] text-text-secondary">{{ step.secondVoicePt }}</span>
                  </div>

                  <!-- Interval indicator -->
                  <span class="text-[9px] font-mono text-text-secondary/80 my-0.5">{{ step.interval }}</span>

                  <!-- 1st Voice Note (Bottom) -->
                  <div class="flex flex-col items-center my-1 p-1.5 rounded-lg bg-primary/10 border border-primary/20 w-full">
                    <span class="text-[9px] font-bold text-primary">1ª VOZ</span>
                    <span class="text-sm font-bold text-primary font-serif">{{ step.firstVoiceNote }}</span>
                    <span class="text-[9px] text-text-secondary">{{ step.firstVoicePt }}</span>
                  </div>

                  <span class="text-[9px] text-text-secondary mt-1">{{ step.functionName }}</span>

                  <!-- Quick Duo Step Audio Play -->
                  <button
                    type="button"
                    (click)="audioService.playDuo(step.firstVoiceFreq, step.secondVoiceFreq, 1.8)"
                    class="mt-2 text-[10px] text-text-primary hover:text-accent font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="text-[14px]">volume_up</mat-icon>
                    <span>Ouvir</span>
                  </button>
                </div>
              }
            </div>
          </app-card>
        </div>
      }

      <!-- TAB 4: REPERTOIRE SYLLABLE-BY-SYLLABLE -->
      @if (activeTab() === 'repertoire') {
        <div class="flex flex-col gap-6">
          <!-- Song Selector Tabs -->
          <div class="flex flex-wrap items-center gap-2">
            @for (song of repertoireSongs; track song.id) {
              <button
                type="button"
                (click)="selectedSong.set(song)"
                class="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
                [class]="selectedSong().id === song.id ? 'bg-primary text-background font-bold shadow-xs' : 'bg-surface border border-border text-text-secondary hover:text-text-primary'"
              >
                <mat-icon class="text-[18px]">music_note</mat-icon>
                <span>{{ song.title }}</span>
              </button>
            }
          </div>

          <!-- Song Detail Card -->
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <app-badge variant="primary" size="sm">{{ selectedSong().artist }}</app-badge>
                  <span class="text-xs font-mono text-text-secondary">Tom: {{ selectedSong().keySignature }} | {{ selectedSong().bpm }} BPM</span>
                </div>
                <h2 class="text-2xl font-serif font-bold text-text-primary">{{ selectedSong().title }}</h2>
                <p class="text-xs sm:text-sm text-text-secondary italic mt-1">"{{ selectedSong().excerpt }}"</p>
              </div>

              <!-- Sequence Audio Controls -->
              <div class="flex flex-wrap items-center gap-2">
                <app-button
                  variant="primary"
                  size="md"
                  icon="play_circle"
                  [disabled]="audioService.isPlayingSequence()"
                  (clicked)="audioService.playSequence(selectedSong().phraseNotes, 'duo', selectedSong().bpm)"
                >
                  Ouvir Dueto Completo
                </app-button>

                <app-button
                  variant="secondary"
                  size="md"
                  icon="person"
                  [disabled]="audioService.isPlayingSequence()"
                  (clicked)="audioService.playSequence(selectedSong().phraseNotes, 'first', selectedSong().bpm)"
                >
                  Só 1ª Voz
                </app-button>

                <app-button
                  variant="secondary"
                  size="md"
                  icon="record_voice_over"
                  [disabled]="audioService.isPlayingSequence()"
                  (clicked)="audioService.playSequence(selectedSong().phraseNotes, 'second', selectedSong().bpm)"
                >
                  Só 2ª Voz
                </app-button>

                @if (audioService.isPlayingSequence()) {
                  <app-button
                    variant="ghost"
                    size="md"
                    icon="stop"
                    (clicked)="audioService.stopPlayback()"
                  >
                    Parar
                  </app-button>
                }
              </div>
            </div>

            <!-- Vocal Tips Card -->
            <div class="p-4 rounded-xl bg-surface border border-border/70 flex items-start gap-3 mb-6">
              <mat-icon class="text-primary text-[20px] shrink-0 mt-0.5">tips_and_updates</mat-icon>
              <div>
                <h4 class="text-xs font-bold text-text-primary">Dica de Dupla para Esta Frase</h4>
                <p class="text-xs text-text-secondary leading-relaxed mt-0.5">{{ selectedSong().tips }}</p>
              </div>
            </div>

            <!-- Syllable-by-Syllable Interactive Grid -->
            <div class="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
              @for (syllableItem of selectedSong().phraseNotes; track $index; let idx = $index) {
                <button
                  type="button"
                  class="flex flex-col items-center p-3 rounded-2xl border min-w-[90px] transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  [class]="audioService.currentPlayingIndex() === idx
                    ? 'bg-primary/15 border-primary shadow-md scale-105'
                    : 'bg-surface border-border hover:border-primary/50'"
                  (click)="audioService.playDuo(syllableItem.firstVoiceFreq, syllableItem.secondVoiceFreq, 1.5)"
                >
                  <!-- Syllable text -->
                  <span class="text-base font-bold text-text-primary mb-2">
                    {{ syllableItem.syllable }}
                  </span>

                  <!-- 2nd Voice Note Box -->
                  <div class="w-full p-1.5 rounded-xl bg-accent/15 border border-accent/30 flex flex-col items-center mb-1.5">
                    <span class="text-[8px] font-bold text-accent">2ª VOZ</span>
                    <span class="text-xs font-bold text-accent font-serif">{{ syllableItem.secondVoiceNote }}</span>
                    <span class="text-[9px] text-text-secondary">{{ syllableItem.secondVoicePt }}</span>
                  </div>

                  <!-- Interval -->
                  <span class="text-[9px] font-mono text-text-secondary/80 my-0.5">{{ syllableItem.interval }}</span>

                  <!-- 1st Voice Note Box -->
                  <div class="w-full p-1.5 rounded-xl bg-primary/15 border border-primary/30 flex flex-col items-center mt-1.5">
                    <span class="text-[8px] font-bold text-primary">1ª VOZ</span>
                    <span class="text-xs font-bold text-primary font-serif">{{ syllableItem.firstVoiceNote }}</span>
                    <span class="text-[9px] text-text-secondary">{{ syllableItem.firstVoicePt }}</span>
                  </div>
                </button>
              }
            </div>
            <p class="text-[11px] text-text-secondary text-center mt-2">
              Clique em qualquer sílaba para ouvir o dueto exato daquele momento da música.
            </p>
          </app-card>
        </div>
      }
    </div>
  `
})
export class VocalNotesExplorer {
  readonly audioService = inject(VocalNotesAudioService);
  readonly vocalAudioService = inject(VocalAudioService);

  readonly activeTab = signal<ExplorerTab>('all-notes');
  readonly voiceRoleMode = signal<VoiceRoleMode>('first-voice');

  // Search & Filters
  readonly searchQuery = signal<string>('');
  readonly selectedOctave = signal<number | null>(null);
  readonly selectedRangeType = signal<VocalNoteHarmony['vocalRangeType'] | null>(null);

  // Collections
  readonly allVocalNotes = ALL_VOCAL_NOTES;
  readonly duoScales = DUO_SCALES;
  readonly repertoireSongs = DUO_REPERTOIRE_SONGS;

  readonly selectedScale = signal<ScaleDuoItem>(DUO_SCALES[0]);
  readonly selectedSong = signal<RepertoireDuoSong>(DUO_REPERTOIRE_SONGS[0]);

  readonly vocalTypes: readonly VocalNoteHarmony['vocalRangeType'][] = [
    'Baixo', 'Barítono', 'Tenor', 'Contralto', 'Mezzo-Soprano', 'Soprano'
  ];

  readonly quickTestKeys = [
    { note: 'G3', pt: 'Sol 3', freq: 196.00 },
    { note: 'A3', pt: 'Lá 3', freq: 220.00 },
    { note: 'B3', pt: 'Si 3', freq: 246.94 },
    { note: 'C4', pt: 'Dó 4', freq: 261.63 },
    { note: 'D4', pt: 'Ré 4', freq: 293.66 },
    { note: 'E4', pt: 'Mi 4', freq: 329.63 },
    { note: 'F#4', pt: 'Fá# 4', freq: 369.99 },
    { note: 'G4', pt: 'Sol 4', freq: 392.00 },
  ];

  readonly filteredVocalNotes = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const oct = this.selectedOctave();
    const rType = this.selectedRangeType();

    return this.allVocalNotes.filter((item) => {
      if (oct !== null && item.octave !== oct) return false;
      if (rType !== null && item.vocalRangeType !== rType) return false;
      if (q) {
        const matchesNote = item.note.toLowerCase().includes(q);
        const matchesPt = item.noteNamePt.toLowerCase().includes(q);
        const matchesSolfege = item.solfege.toLowerCase().includes(q);
        const matchesSecond = item.secondVoiceThirdAbove.note.toLowerCase().includes(q) ||
                              item.secondVoiceThirdAbove.namePt.toLowerCase().includes(q);
        if (!matchesNote && !matchesPt && !matchesSolfege && !matchesSecond) return false;
      }
      return true;
    });
  });

  readonly detectedHarmonyInfo = computed(() => {
    const fb = this.vocalAudioService.feedback();
    if (!fb.isSinging || !fb.sungNoteName) return null;

    const matchedNote = this.allVocalNotes.find(
      (n) => n.note.toUpperCase() === (fb.sungNoteName || '').toUpperCase()
    );

    if (!matchedNote) {
      // Calculate by frequency ratio if not exact name match
      const baseFreq = fb.sungFrequency;
      if (this.voiceRoleMode() === 'first-voice') {
        const suggestedFreq = Math.round(baseFreq * 1.2599 * 10) / 10;
        return {
          suggestedNote: 'Harmonia 3ª',
          suggestedNamePt: 'Terça Maior',
          suggestedFreq,
          intervalName: 'Terça Maior (+4 semitons)',
          desc: 'Segunda voz clássica por cima'
        };
      } else {
        const suggestedFreq = Math.round((baseFreq / 1.2599) * 10) / 10;
        return {
          suggestedNote: '1ª Voz Base',
          suggestedNamePt: 'Fundamental',
          suggestedFreq,
          intervalName: 'Fundamental (-4 semitons)',
          desc: 'Voz principal da música'
        };
      }
    }

    if (this.voiceRoleMode() === 'first-voice') {
      return {
        suggestedNote: matchedNote.secondVoiceThirdAbove.note,
        suggestedNamePt: matchedNote.secondVoiceThirdAbove.namePt,
        suggestedFreq: matchedNote.secondVoiceThirdAbove.frequency,
        intervalName: matchedNote.secondVoiceThirdAbove.interval,
        desc: matchedNote.secondVoiceThirdAbove.description
      };
    } else {
      return {
        suggestedNote: matchedNote.firstVoiceReference.asThirdAbove.note,
        suggestedNamePt: matchedNote.firstVoiceReference.asThirdAbove.namePt,
        suggestedFreq: matchedNote.firstVoiceReference.asThirdAbove.frequency,
        intervalName: 'Fundamental de Apoio (-4 semitons)',
        desc: 'A 1ª Voz principal canta esta fundamental enquanto você faz a terça'
      };
    }
  });

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  simulateSungNote(noteName: string, frequency: number): void {
    this.vocalAudioService.feedback.set({
      isSinging: true,
      targetNote: null,
      sungNoteName: noteName,
      sungFrequency: frequency,
      centsDifference: 0,
      accuracyScore: 100,
      isAccurate: true,
    });
    this.audioService.playNote(frequency, 1.8, `${noteName} (Sua Voz Simulada)`);
  }

  playScaleInDuo(scale: ScaleDuoItem): void {
    const sequenceNotes = scale.notes.map((s) => ({
      syllable: s.degree,
      word: s.functionName,
      firstVoiceNote: s.firstVoiceNote,
      firstVoicePt: s.firstVoicePt,
      firstVoiceFreq: s.firstVoiceFreq,
      secondVoiceNote: s.secondVoiceNote,
      secondVoicePt: s.secondVoicePt,
      secondVoiceFreq: s.secondVoiceFreq,
      interval: s.interval,
      durationBeats: 1.2
    }));

    this.audioService.playSequence(sequenceNotes, 'duo', 75);
  }
}
