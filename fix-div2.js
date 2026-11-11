const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');

// The first fix was wrong, I removed a closing tag from the if-else block instead of the container. Let's reset the file and apply properly.
