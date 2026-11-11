const fs = require('fs');
const file = 'src/app/features/vocal/components/vocal-pitch-trainer/vocal-pitch-trainer.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<div class="flex flex-col items-center w-full gap-6 select-none">',
  '<div class="flex flex-col items-center w-full gap-4 select-none">'
);

code = code.replace(
  'border-b border-border/60 pb-4',
  'border-b border-border/60 pb-3'
);

code = code.replace(
  'p-6 sm:p-8 flex flex-col',
  'p-4 sm:p-5 flex flex-col'
);

code = code.replace(
  'rounded-2xl bg-surface',
  'rounded-xl bg-surface'
);

code = code.replace(
  'font-serif text-6xl sm:text-7xl',
  'font-serif text-5xl sm:text-6xl'
);

code = code.replace(
  'my-4 relative z-10',
  'my-2 relative z-10'
);

code = code.replace(
  'h-[120px]',
  'h-[80px]'
);

code = code.replace(
  'mt-4 pt-4',
  'mt-3 pt-3'
);

fs.writeFileSync(file, code);
console.log('Fixed');
