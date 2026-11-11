const fs = require('fs');
const file = 'src/app/features/courses/data/courses.data.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "id: 'vl1', title: 'Respiração Costodiafragmática Prática', durationMinutes: 10, type: 'video', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'",
  "id: 'vl1', title: 'Respiração Costodiafragmática Prática', durationMinutes: 10, type: 'video', videoUrl: 'https://www.youtube.com/embed/vFX3tzpBq4A'"
);

fs.writeFileSync(file, code);
console.log('Fixed URL');
