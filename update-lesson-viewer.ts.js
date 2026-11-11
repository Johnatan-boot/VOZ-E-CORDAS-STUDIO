const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');
console.log(code.substring(0, 500));
