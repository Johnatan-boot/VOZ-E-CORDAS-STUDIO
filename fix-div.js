const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');

// There is an extra closing </div> right before Lesson Info & Metadata
code = code.replace(
  '            </div>\n          }\n        </div>\n\n        <!-- Lesson Info & Metadata -->',
  '            </div>\n          }\n\n        <!-- Lesson Info & Metadata -->'
);

fs.writeFileSync(file, code);
