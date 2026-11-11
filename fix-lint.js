const fs = require('fs');
const file = 'src/app/features/courses/components/lesson-viewer/lesson-viewer.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "import { Course, CourseLesson, CourseModule } from '../../models/courses.model';",
  "import { Course, CourseLesson } from '../../models/courses.model';"
);

fs.writeFileSync(file, code);
