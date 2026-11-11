const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');

const regex = /\} @else if \(lesson\(\)\.type === 'practice'\) \{[\s\S]*?\} @else \{/m;
const newPracticeBlock = `} @else if (lesson().type === 'practice') {
            @if (isPracticeActive()) {
              <div class="flex flex-col items-center justify-center p-8 w-full h-full bg-surface relative overflow-hidden">
                 <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                   <div class="w-64 h-64 sm:w-96 sm:h-96 border-2 border-accent rounded-full animate-ping" style="animation-duration: 4s"></div>
                 </div>
                 
                 <div class="z-10 flex flex-col items-center">
                   <h3 class="text-xl font-bold text-text-primary mb-2">{{ lesson().title }}</h3>
                   <span class="text-accent font-mono text-lg mb-8">00:00 / {{ lesson().durationMinutes }}:00</span>

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
          } @else {`;

code = code.replace(regex, newPracticeBlock);

const regexText = /<div class="flex flex-col items-center justify-center gap-4 text-center p-6 w-full h-full bg-surface">[\s\S]*?<h3 class="text-2xl font-bold text-text-primary">Apostila de Estudo<\/h3>[\s\S]*?<\/div>/m;
const newTextBlock = `<!-- Mock Document / Text Lesson -->
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
            </div>`;

code = code.replace(regexText, newTextBlock);

code = code.replace(
  'readonly isPlaying = signal<boolean>(false);',
  `readonly isPlaying = signal<boolean>(false);
  readonly isPracticeActive = signal<boolean>(false);
  startPractice() { this.isPracticeActive.set(true); }
  stopPractice() { this.isPracticeActive.set(false); }`
);

fs.writeFileSync(file, code);
console.log('Updated practice and text blocks');
