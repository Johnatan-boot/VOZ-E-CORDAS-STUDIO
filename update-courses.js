const fs = require('fs');
const file = 'src/app/features/courses/courses.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<app-lesson-viewer \n             [lesson]="selectedLesson()!" \n             (back)="selectedLesson.set(null)"\n            (toggleComplete)="toggleLessonCompletion($event)"\n          />',
  `<app-lesson-viewer 
             [course]="selectedCourse()!"
             [lesson]="selectedLesson()!" 
             (back)="selectedLesson.set(null)"
             (toggleComplete)="toggleLessonCompletion($event)"
             (selectLesson)="openLesson($event)"
          />`
);

// Wait, the template has indentation. I'll use regex.
code = code.replace(/<app-lesson-viewer[\s\S]*?\/>/, `<app-lesson-viewer 
             [course]="selectedCourse()!"
             [lesson]="selectedLesson()!" 
             (back)="selectedLesson.set(null)"
             (toggleComplete)="toggleLessonCompletion($event)"
             (selectLesson)="openLesson($event)"
          />`);

fs.writeFileSync(file, code);
console.log('updated courses');
