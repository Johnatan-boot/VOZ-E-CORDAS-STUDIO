const fs = require('fs');
const file = 'src/app/features/courses/courses.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<app-progress [value]="selectedCourse()!.progress" [variant]="getProgressVariant()" />\n                </div>',
  `<app-progress [value]="selectedCourse()!.progress" [variant]="getProgressVariant()" />
                </div>
                
                <div class="mt-4">
                  <app-button variant="primary" size="lg" icon="play_arrow" (clicked)="openLesson(selectedCourse()!.modules[0].lessons[0])">
                    Iniciar Curso Agora
                  </app-button>
                </div>`
);

fs.writeFileSync(file, code);
