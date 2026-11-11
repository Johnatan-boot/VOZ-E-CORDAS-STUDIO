import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppProgress } from '../../../../shared/ui';
import { Course } from '../../models/courses.model';

@Component({
  selector: 'app-course-card',
  imports: [MatIconModule, AppBadge, AppProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="flex flex-col h-full bg-surface border border-border/60 rounded-2xl overflow-hidden hover:border-border-focus transition-all duration-300 hover:shadow-sm cursor-pointer group"
      (click)="clicked.emit(course())"
      (keydown.enter)="clicked.emit(course())"
      tabindex="0"
    >
      <!-- Thumbnail Header -->
      <div class="h-32 w-full relative flex items-center justify-center bg-surface-elevated overflow-hidden">
        <!-- Abstract background pattern based on theme -->
        <div class="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-700"
             [class.bg-primary]="course().themeColor === 'primary'"
             [class.bg-accent]="course().themeColor === 'accent'"
             [class.bg-success]="course().themeColor === 'success'"
             [class.bg-warning]="course().themeColor === 'warning'"
             [class.bg-border]="course().themeColor === 'default'">
        </div>
        
        <div class="z-10 w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <mat-icon class="text-[32px] text-text-primary">{{ course().icon }}</mat-icon>
        </div>
        
        <!-- Level Badge -->
        <div class="absolute top-4 right-4 z-10">
          <app-badge [variant]="course().themeColor" size="sm">
            {{ course().level }}
          </app-badge>
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 p-5">
        <h3 class="text-lg font-serif font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {{ course().title }}
        </h3>
        <p class="text-xs text-text-secondary line-clamp-2 mb-4 flex-1">
          {{ course().description }}
        </p>
        
        <div class="flex items-center gap-2 mb-4">
          <mat-icon class="text-[16px] text-text-secondary">person</mat-icon>
          <span class="text-xs font-medium text-text-secondary">{{ course().instructor }}</span>
        </div>
        
        <!-- Progress -->
        <div class="flex flex-col w-full flex flex-col gap-2 mt-auto">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-text-secondary">Progresso</span>
            <span class="text-[10px] font-bold text-text-primary">{{ course().progress }}%</span>
          </div>
          <app-progress [value]="course().progress" [variant]="getProgressVariant()" />
        </div>
      </div>
    </div>
  `
})
export class CourseCard {
  readonly course = input.required<Course>();
  readonly clicked = output<Course>();

  getProgressVariant(): 'primary' | 'accent' | 'success' | 'warning' {
    const color = this.course().themeColor;
    return color === 'default' ? 'primary' : color;
  }
}
