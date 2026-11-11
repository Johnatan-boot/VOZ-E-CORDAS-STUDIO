const fs = require('fs');
const file = 'src/app/features/vocal/components/harmony-projector/harmony-projector.ts';
let code = fs.readFileSync(file, 'utf8');

const descriptionReplacement = `
        <div class="flex-1">
          <h3 class="text-sm font-bold text-text-primary mb-1">Projeção Harmônica</h3>
          <p class="text-[11px] text-text-secondary leading-relaxed">
            Simula um dueto vocal em tempo real. Como usar:
          </p>
          <ul class="text-[11px] text-text-secondary list-disc pl-4 mt-2 space-y-1">
            <li><strong>Use fones de ouvido</strong> para evitar que o microfone capte o alto-falante (microfonia).</li>
            <li>Ative o microfone na parte superior (ou clique em "Ativar Projeção").</li>
            <li>Escolha um intervalo abaixo (ex: 3ª Maior).</li>
            <li>Cante uma nota constante no microfone. Você ouvirá uma "segunda voz" gerada a partir da sua.</li>
          </ul>
        </div>
`;

code = code.replace(/        <div class="flex-1">[\s\S]*?<\/p>\n        <\/div>/, descriptionReplacement.trim());
fs.writeFileSync(file, code);
console.log('Updated harmony projector');
