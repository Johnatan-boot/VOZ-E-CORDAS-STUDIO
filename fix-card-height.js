const fs = require('fs');
const file = 'src/app/shared/ui/card/card.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "const base = 'block w-full h-full rounded-3xl border transition-all duration-200 overflow-hidden';",
  "const base = 'block w-full rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col';"
);

fs.writeFileSync(file, code);
console.log('Fixed card height');
