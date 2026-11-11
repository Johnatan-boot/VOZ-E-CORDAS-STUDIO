const fs = require('fs');
const file = 'src/app/features/vocal/components/vocal-pitch-trainer/vocal-pitch-trainer.ts';
let code = fs.readFileSync(file, 'utf8');

// I am going to remove the fixed margins and padding that are causing the inner card to be too big.
// I will also fix the `h-[80px]` of the canvas wrapper which might be causing issues.
code = code.replace(
  '<div class="relative w-full h-[80px]',
  '<div class="relative w-full h-[60px] sm:h-[80px]'
);

code = code.replace(
  'p-4 sm:p-5 flex flex-col',
  'p-3 sm:p-4 flex flex-col'
);

code = code.replace(
  '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg mt-3 pt-3 border-t border-border/60 text-center z-10">',
  '<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg mt-2 pt-2 border-t border-border/60 text-center z-10">'
);

fs.writeFileSync(file, code);
console.log('Fixed vocal trainer padding');
