import { ChangeDetectionStrategy, Component, input, output, signal, inject, computed, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton } from '../../../../shared/ui';
import { Course, CourseLesson } from '../../models/courses.model';

@Component({
  selector: 'app-lesson-viewer',
  imports: [MatIconModule, AppBadge, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col xl:flex-row w-full gap-6 animate-fade-in pb-12 h-full min-h-[80vh]">
      
      <!-- Main Content (Video Player & Info) -->
      <div class="flex flex-col flex-1 gap-6 w-full xl:w-2/3">
        <!-- Header Actions -->
        <div class="flex items-center justify-between mb-2">
          <app-button variant="ghost" size="sm" icon="arrow_back" (clicked)="back.emit()">
            Voltar à Biblioteca
          </app-button>
          
          <div class="flex items-center gap-2">
             <app-badge variant="primary" size="sm">{{ course().title }}</app-badge>
          </div>
        </div>

        <!-- Professional Area -->
        <div class="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-border/20 group">
          
          @if (lesson().type === 'video') {
            @if (isPlaying()) {
              <iframe 
                 [src]="safeVideoUrl()" 
                 class="absolute inset-0 w-full h-full" 
                 frameborder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowfullscreen>
              </iframe>
            } @else {
              <!-- Cinematic Background Image for Sertanejo Vibe -->
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                    alt="Acoustic Guitar Player" 
                    referrerpolicy="no-referrer"
                   class="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              
              <!-- Big Play Button (Center) -->
              <button 
                 (click)="togglePlay()"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-background hover:scale-110 transition-transform cursor-pointer shadow-[0_0_40px_rgba(var(--color-primary),0.4)] z-20"
              >
                <mat-icon class="text-[40px] ml-1">play_arrow</mat-icon>
              </button>

              <!-- Custom Player Controls (Bottom) -->
              <div class="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col gap-3 z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center gap-4">
                    <span class="text-xs font-mono font-medium tracking-wide">00:00 / {{ lesson().durationMinutes }}:00</span>
                  </div>
                </div>
              </div>
            }
          } @else if (lesson().type === 'practice') {
            @if (isPracticeActive()) {
              <div class="flex flex-col items-center justify-center p-8 w-full h-full bg-surface relative overflow-hidden">
                 <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                   <div class="w-64 h-64 sm:w-96 sm:h-96 border-2 border-accent rounded-full animate-ping" style="animation-duration: 4s"></div>
                 </div>
                 
                 <div class="z-10 flex flex-col items-center">
                   <h3 class="text-xl font-bold text-text-primary mb-2">{{ lesson().title }}</h3>
                   <span class="text-accent font-mono text-lg mb-8">{{ formatPracticeTime(practiceSeconds()) }} / {{ lesson().durationMinutes }}:00</span>

                   <div class="w-48 h-48 rounded-full bg-background border-8 border-surface-elevated shadow-[0_0_50px_rgba(var(--color-accent),0.15)] flex items-center justify-center relative mb-8">
                      <div class="absolute inset-0 bg-accent/10 rounded-full animate-pulse" style="animation-duration: 2s"></div>
                      <div class="flex flex-col items-center z-10">
                         <mat-icon class="text-[40px] text-accent mb-2">graphic_eq</mat-icon>
                         <span class="text-sm font-bold uppercase tracking-widest text-text-primary">Praticando</span>
                      </div>
                   </div>

                   <p class="text-text-secondary text-sm mb-6 max-w-sm text-center">
                     Mantenha a postura. O ambiente está captando seu exercício em tempo real para gerar o relatório de progresso.
                   </p>

                   <div class="flex gap-4">
                      <app-button variant="danger" size="md" icon="stop" (clicked)="stopPractice()">Encerrar Sessão</app-button>
                   </div>
                 </div>
              </div>
            } @else {
              <div class="flex flex-col items-center justify-center gap-4 text-center p-6 w-full h-full bg-surface">
                <div class="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                  <mat-icon class="text-[40px] text-accent">fitness_center</mat-icon>
                </div>
                <h3 class="text-2xl font-bold text-text-primary">Prática: {{ lesson().title }}</h3>
                <p class="text-text-secondary max-w-md">Esta é uma sessão guiada interativa. Prepare seu ambiente, ajuste seu microfone ou instrumento e inicie o acompanhamento passo a passo do exercício.</p>
                <app-button variant="primary" size="lg" icon="play_arrow" class="mt-4" (clicked)="startPractice()">
                  Iniciar Sessão Guiada
                </app-button>
              </div>
            }
          } @else {
            <div class="flex flex-col w-full h-full bg-background rounded-3xl p-6 sm:p-10 overflow-y-auto">
              <div class="max-w-3xl mx-auto w-full">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <mat-icon class="text-primary text-[28px]">menu_book</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-2xl font-serif font-bold text-text-primary">{{ lesson().title }}</h3>
                    <span class="text-sm font-semibold text-text-secondary">Leitura Recomendada • {{ lesson().durationMinutes }} min de duração</span>
                  </div>
                </div>
                
                <div class="prose prose-invert max-w-none text-text-secondary">
                  <p class="text-lg leading-relaxed mb-6">Bem-vindo a este material de apoio. A leitura atenta deste conteúdo é fundamental para consolidar os conceitos práticos do módulo.</p>
                  
                  <h4 class="text-text-primary font-bold text-xl mt-8 mb-4">Fundamentos Essenciais</h4>
                  <p class="leading-relaxed mb-4">Ao analisar a dinâmica do arranjo e a expressão técnica, é importante manter um padrão de repetição constante. O domínio técnico garante não apenas a afinação ideal, mas também a durabilidade da sua performance a longo prazo, seja na voz ou no violão.</p>
                  
                  <div class="bg-surface p-6 rounded-2xl border border-border/60 my-8 shadow-sm">
                    <h5 class="text-text-primary font-bold mb-3 flex items-center gap-2">
                      <mat-icon class="text-accent text-[20px]">lightbulb</mat-icon>
                      Dica de Estudo
                    </h5>
                    <p class="text-sm leading-relaxed text-text-secondary">Não tente aplicar todas as ornamentações de uma só vez. O segredo de uma performance impecável está na dosagem: utilize os ornamentos apenas nos picos emocionais da música para gerar impacto real no público.</p>
                  </div>
                  
                  <p class="leading-relaxed">Faça pausas de 5 minutos a cada meia hora de estudo. Siga para o próximo conteúdo prático para testar o que você revisou neste material.</p>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Lesson Info & Metadata -->
        <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mt-2">
          
          <div class="flex flex-col flex-1 gap-4">
            <div class="flex items-center gap-3">
              <app-badge variant="primary" size="sm">Aula Atual</app-badge>
              <span class="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                <mat-icon class="text-[14px]">star</mat-icon> Premium
              </span>
            </div>
            
            <h2 class="text-3xl font-serif font-bold text-text-primary leading-tight">{{ lesson().title }}</h2>
            
            <!-- Instructor Mini Profile -->
            <div class="flex items-center gap-3 mt-2 pb-6 border-b border-border/50">
              <div class="w-10 h-10 rounded-full bg-surface-elevated border border-border overflow-hidden">
                 <img src="https://ui-avatars.com/api/?name={{ course().instructor }}&background=random" alt="Instructor" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-text-primary">{{ course().instructor }}</span>
                <span class="text-[10px] text-text-secondary">Professor do Curso</span>
              </div>
            </div>
            
            <p class="text-base text-text-secondary leading-relaxed mt-2 max-w-3xl">
              Nesta aula, mergulhamos nas técnicas abordadas pelo módulo. Assista com atenção, anote os pontos principais e utilize a sessão de prática logo a seguir para aplicar o conhecimento de forma vocal.
            </p>
          </div>
          
          <!-- Action Card -->
          <div class="w-full lg:w-64 flex flex-col gap-3 shrink-0">
             <app-button 
               [variant]="lesson().isCompleted ? 'secondary' : 'primary'" 
               size="md" 
               [icon]="lesson().isCompleted ? 'check_circle' : 'radio_button_unchecked'"
              (clicked)="toggleComplete.emit(lesson())"
              class="w-full"
            >
              {{ lesson().isCompleted ? 'Concluída' : 'Marcar Concluída' }}
            </app-button>
             
             <app-button variant="secondary" size="md" icon="description" class="w-full justify-start text-left bg-surface">
               Material de Apoio
             </app-button>
             
             <app-button variant="secondary" size="md" icon="forum" class="w-full justify-start text-left bg-surface">
               Fórum de Dúvidas
             </app-button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Course Playlist -->
      <div class="w-full xl:w-1/3 flex flex-col gap-4 bg-surface rounded-3xl border border-border/60 p-5 shadow-sm max-h-[85vh] overflow-y-auto scrollbar-thin">
        <h3 class="text-lg font-serif font-bold text-text-primary flex items-center gap-2 mb-2 sticky top-0 bg-surface z-10 pb-2 border-b border-border/40">
          <mat-icon class="text-primary">view_list</mat-icon>
          Conteúdo do Curso
        </h3>
        
        <div class="flex flex-col gap-5">
          @for (mod of course().modules; track mod.id; let modIdx = $index) {
            <div class="flex flex-col gap-2">
              <h4 class="text-sm font-bold text-text-primary uppercase tracking-wide text-primary/80">Módulo {{ modIdx + 1 }}: {{ mod.title }}</h4>
              
              <div class="flex flex-col gap-1.5">
                @for (l of mod.lessons; track l.id; let i = $index) {
                  <button 
                     type="button"
                    class="flex items-center gap-3 p-3 rounded-xl transition-colors text-left cursor-pointer group w-full"
                    [class.bg-primary-light]="l.id === lesson().id"
                    [class.bg-surface-elevated]="l.id !== lesson().id"
                    [class.border]="true"
                    [class.border-primary]="l.id === lesson().id"
                    [class.border-transparent]="l.id !== lesson().id"
                    [class.hover:border-border]="l.id !== lesson().id"
                    (click)="selectLesson.emit(l)"
                  >
                    <!-- Icon / Status -->
                    <div class="flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-colors text-[10px] font-bold"
                         [class.bg-success]="l.isCompleted"
                         [class.text-background]="l.isCompleted"
                         [class.bg-background]="!l.isCompleted"
                         [class.border]="!l.isCompleted"
                         [class.border-border]="!l.isCompleted"
                         [class.text-text-secondary]="!l.isCompleted">
                      @if (l.isCompleted) {
                        <mat-icon class="text-[14px]">check</mat-icon>
                      } @else {
                        {{ i + 1 }}
                      }
                    </div>
                    
                    <!-- Lesson Title -->
                    <div class="flex flex-col flex-1 overflow-hidden">
                      <span class="text-xs font-bold truncate transition-colors"
                            [class.text-background]="l.id === lesson().id"
                            [class.text-text-primary]="l.id !== lesson().id">
                        {{ l.title }}
                      </span>
                      <div class="flex items-center gap-1.5 mt-0.5"
                           [class.text-background]="l.id === lesson().id"
                           [class.text-text-secondary]="l.id !== lesson().id">
                        <mat-icon class="text-[12px] opacity-70">
                          {{ l.type === 'video' ? 'play_circle' : (l.type === 'practice' ? 'fitness_center' : 'description') }}
                        </mat-icon>
                        <span class="text-[9px] font-semibold opacity-70">
                          {{ l.durationMinutes }} min
                        </span>
                      </div>
                    </div>
                    
                    @if (l.id === lesson().id && isPlaying()) {
                      <div class="flex gap-0.5 h-3 items-end">
                        <div class="w-1 h-3 bg-background rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-1 h-2 bg-background rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-1 h-3 bg-background rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                      </div>
                    }
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class LessonViewer implements OnDestroy {
  readonly course = input.required<Course>();
  readonly lesson = input.required<CourseLesson>();
  readonly back = output<void>();
  readonly toggleComplete = output<CourseLesson>();
  readonly selectLesson = output<CourseLesson>();
  
  readonly isPlaying = signal<boolean>(false);
  readonly isPracticeActive = signal<boolean>(false);
  readonly practiceSeconds = signal<number>(0);
  private practiceInterval: number | null = null;

  startPractice() {
    this.isPracticeActive.set(true);
    this.practiceSeconds.set(0);
    this.practiceInterval = window.setInterval(() => {
      this.practiceSeconds.update(s => s + 1);
    }, 1000);
  }

  stopPractice() {
    this.isPracticeActive.set(false);
    if (this.practiceInterval) {
      clearInterval(this.practiceInterval);
      this.practiceInterval = null;
    }
  }

  formatPracticeTime(totalSec: number): string {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  private sanitizer = inject(DomSanitizer);
  
  readonly safeVideoUrl = computed(() => {
    const url = this.lesson().videoUrl;
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  togglePlay() {
    this.isPlaying.update(p => !p);
  }

  ngOnDestroy() {
    if (this.practiceInterval) {
      clearInterval(this.practiceInterval);
    }
  }
}
