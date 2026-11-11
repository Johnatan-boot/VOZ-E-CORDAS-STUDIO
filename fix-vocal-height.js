const fs = require('fs');
const file = 'src/app/features/vocal/vocal.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">',
  '<div class="w-full min-h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">'
);

fs.writeFileSync(file, code);
console.log('Fixed vocal wrapper height');
