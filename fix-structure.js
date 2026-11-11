const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');

// Ensure correct div counting for the main video/content area
// The area starts with: <div class="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-border/20 group">
// And should end right before <!-- Lesson Info & Metadata -->

// Let's just fix it by ensuring exactly one closing div before Lesson Info
code = code.replace(
  /\} @else \{\s*<!-- Mock Document.*?<\/div>\s*<\/div>\s*<\/div>\s*\}/s,
  `\} @else {
            <!-- Mock Document / Text Lesson -->
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
        </div>`
);

fs.writeFileSync(file, code);
