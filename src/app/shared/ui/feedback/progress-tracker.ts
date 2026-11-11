import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge } from '../badge/badge';

export type ProgressTrackerVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info';
export type ProgressTrackerSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressTrackerLayout = 'card' | 'inline' | 'ring-only';

export interface TrainingModuleItem {
  id?: string | number;
  title?: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-progress-tracker',
  imports: [MatIconModule, AppBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (layout()) {
      <!-- 1. RING ONLY LAYOUT -->
      @case ('ring-only') {
        <div
          class="relative inline-flex items-center justify-center select-none"
          [style.width.px]="ringDimensions().size"
          [style.height.px]="ringDimensions().size"
          role="progressbar"
          [attr.aria-valuenow]="effectivePercentage()"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          [attr.aria-label]="ariaLabel()"
        >
          <!-- SVG Circular Ring -->
          <svg
            class="w-full h-full -rotate-90 origin-center"
            viewBox="0 0 100 100"
          >
            <!-- Background Track -->
            <circle
              cx="50"
              cy="50"
              [attr.r]="radius()"
              [attr.stroke-width]="strokeWidth()"
              class="stroke-border/50 fill-none"
            />
            <!-- Animated Progress Ring -->
            <circle
              cx="50"
              cy="50"
              [attr.r]="radius()"
              [attr.stroke-width]="strokeWidth()"
              [class]="strokeColorClass()"
              stroke-linecap="round"
              fill="none"
              class="transition-all duration-700 ease-out"
              [style.stroke-dasharray]="circumference()"
              [style.stroke-dashoffset]="dashOffset()"
            />
          </svg>

          <!-- Center Content -->
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
            @if (effectivePercentage() === 100 && showCheckOnComplete()) {
              <mat-icon [class]="textColorClass()" [style.font-size.px]="ringDimensions().iconSize">
                verified
              </mat-icon>
            } @else {
              <span
                class="font-sans font-extrabold tracking-tight text-text-primary"
                [style.font-size.px]="ringDimensions().fontSize"
              >
                {{ effectivePercentage() }}<span class="text-[0.65em] font-bold text-text-secondary">%</span>
              </span>
              @if (size() === 'xl' || size() === 'lg') {
                <span class="text-[9px] uppercase font-bold tracking-wider text-text-secondary mt-0.5">
                  Concluído
                </span>
              }
            }
          </div>
        </div>
      }

      <!-- 2. INLINE / HORIZONTAL ROW LAYOUT -->
      @case ('inline') {
        <div
          class="flex items-center gap-4 w-full p-3 rounded-2xl bg-surface border border-border/60 hover:border-border transition-colors"
          role="progressbar"
          [attr.aria-valuenow]="effectivePercentage()"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          [attr.aria-label]="ariaLabel()"
        >
          <!-- Circular Ring -->
          <div
            class="relative inline-flex items-center justify-center shrink-0"
            [style.width.px]="ringDimensions().size"
            [style.height.px]="ringDimensions().size"
          >
            <svg
              class="w-full h-full -rotate-90 origin-center"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                [attr.r]="radius()"
                [attr.stroke-width]="strokeWidth()"
                class="stroke-border/50 fill-none"
              />
              <circle
                cx="50"
                cy="50"
                [attr.r]="radius()"
                [attr.stroke-width]="strokeWidth()"
                [class]="strokeColorClass()"
                stroke-linecap="round"
                fill="none"
                class="transition-all duration-700 ease-out"
                [style.stroke-dasharray]="circumference()"
                [style.stroke-dashoffset]="dashOffset()"
              />
            </svg>

            <div class="absolute inset-0 flex items-center justify-center text-center">
              @if (effectivePercentage() === 100 && showCheckOnComplete()) {
                <mat-icon [class]="textColorClass()" [style.font-size.px]="ringDimensions().iconSize">
                  check_circle
                </mat-icon>
              } @else {
                <span
                  class="font-sans font-bold text-text-primary"
                  [style.font-size.px]="ringDimensions().fontSize"
                >
                  {{ effectivePercentage() }}%
                </span>
              }
            </div>
          </div>

          <!-- Text Details -->
          <div class="flex flex-col flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <h4 class="text-sm font-bold text-text-primary truncate">
                {{ title() }}
              </h4>
              <app-badge [variant]="badgeVariant()" size="sm">
                {{ statusText() }}
              </app-badge>
            </div>
            
            <p class="text-xs text-text-secondary mt-0.5 truncate">
              {{ computedSubtitle() }}
            </p>

            <!-- Module Steps Bar / Dots -->
            @if (showModulePills() && computedTotalModules() > 0) {
              <div class="flex items-center gap-1.5 mt-2">
                @for (module of moduleItems(); track $index) {
                  <div
                    class="h-1.5 rounded-full flex-1 transition-all duration-500"
                    [class.bg-primary]="module.isCompleted && variant() === 'primary'"
                    [class.bg-accent]="module.isCompleted && variant() === 'accent'"
                    [class.bg-success]="module.isCompleted && variant() === 'success'"
                    [class.bg-warning]="module.isCompleted && variant() === 'warning'"
                    [class.bg-info]="module.isCompleted && variant() === 'info'"
                    [class.bg-surface-elevated]="!module.isCompleted"
                    [class.border]="!module.isCompleted"
                    [class.border-border/60]="!module.isCompleted"
                    [title]="module.title || 'Módulo ' + ($index + 1)"
                  ></div>
                }
              </div>
            }
          </div>
        </div>
      }

      <!-- 3. FULL CARD LAYOUT (DEFAULT) -->
      @default {
        <div
          class="flex flex-col gap-5 p-5 md:p-6 rounded-2xl bg-surface border border-border/60 shadow-sm relative overflow-hidden group hover:border-border transition-all duration-300 w-full"
          role="progressbar"
          [attr.aria-valuenow]="effectivePercentage()"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          [attr.aria-label]="ariaLabel()"
        >
          <!-- Subtle Glow Overlay matching variant -->
          <div
            class="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none -mr-10 -mt-10 transition-opacity group-hover:opacity-20"
            [class.bg-primary]="variant() === 'primary'"
            [class.bg-accent]="variant() === 'accent'"
            [class.bg-success]="variant() === 'success'"
            [class.bg-warning]="variant() === 'warning'"
            [class.bg-info]="variant() === 'info'"
          ></div>

          <!-- Header -->
          <div class="flex items-start justify-between gap-3 relative z-10">
            <div class="flex items-center gap-2.5">
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-border/80 bg-surface-elevated text-primary shadow-xs"
              >
                <mat-icon class="text-[20px]">{{ icon() }}</mat-icon>
              </div>
              <div>
                <h3 class="font-serif font-bold text-base md:text-lg text-text-primary leading-tight">
                  {{ title() }}
                </h3>
                <p class="text-xs text-text-secondary mt-0.5">
                  {{ computedSubtitle() }}
                </p>
              </div>
            </div>

            <app-badge [variant]="badgeVariant()" size="sm">
              {{ statusText() }}
            </app-badge>
          </div>

          <!-- Ring + Stats Overview Row -->
          <div class="flex items-center gap-6 relative z-10">
            <!-- Circular Progress Ring -->
            <div
              class="relative inline-flex items-center justify-center shrink-0"
              [style.width.px]="ringDimensions().size"
              [style.height.px]="ringDimensions().size"
            >
              <svg
                class="w-full h-full -rotate-90 origin-center"
                viewBox="0 0 100 100"
              >
                <!-- Track -->
                <circle
                  cx="50"
                  cy="50"
                  [attr.r]="radius()"
                  [attr.stroke-width]="strokeWidth()"
                  class="stroke-border/40 fill-none"
                />
                <!-- Fill -->
                <circle
                  cx="50"
                  cy="50"
                  [attr.r]="radius()"
                  [attr.stroke-width]="strokeWidth()"
                  [class]="strokeColorClass()"
                  stroke-linecap="round"
                  fill="none"
                  class="transition-all duration-700 ease-out"
                  [style.stroke-dasharray]="circumference()"
                  [style.stroke-dashoffset]="dashOffset()"
                />
              </svg>

              <!-- Inner Ring Stats -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
                @if (effectivePercentage() === 100 && showCheckOnComplete()) {
                  <mat-icon [class]="textColorClass()" [style.font-size.px]="ringDimensions().iconSize">
                    verified
                  </mat-icon>
                  <span class="text-[9px] uppercase font-bold tracking-wider text-text-secondary mt-0.5">
                    100%
                  </span>
                } @else {
                  <span
                    class="font-sans font-extrabold tracking-tight text-text-primary"
                    [style.font-size.px]="ringDimensions().fontSize"
                  >
                    {{ effectivePercentage() }}<span class="text-[0.65em] font-bold text-text-secondary">%</span>
                  </span>
                  <span class="text-[9px] uppercase font-bold tracking-wider text-text-secondary">
                    Total
                  </span>
                }
              </div>
            </div>

            <!-- Stats Column -->
            <div class="flex flex-col justify-center gap-2 flex-1 min-w-0">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-serif font-bold text-text-primary">
                  {{ computedCompletedModules() }}
                </span>
                <span class="text-xs font-semibold text-text-secondary">
                  de {{ computedTotalModules() }} módulos concluídos
                </span>
              </div>

              <div class="text-xs leading-relaxed text-text-secondary">
                @if (effectivePercentage() === 100) {
                  <span class="text-success font-medium flex items-center gap-1">
                    <mat-icon class="text-[14px]">emoji_events</mat-icon>
                    Parabéns! Todos os módulos foram completados com sucesso.
                  </span>
                } @else if (effectivePercentage() >= 70) {
                  <span>Você está na reta final deste ciclo. Mantenha a dedicação diária!</span>
                } @else if (effectivePercentage() > 0) {
                  <span>Continue praticando regularmente para dominar o repertório proposto.</span>
                } @else {
                  <span>Comece o primeiro módulo para registrar suas primeiras conquistas.</span>
                }
              </div>
            </div>
          </div>

          <!-- Module Discrete Indicators -->
          @if (showModulePills() && computedTotalModules() > 0) {
            <div class="flex flex-col gap-2 pt-2 border-t border-border/50 relative z-10">
              <div class="flex items-center justify-between text-[11px] font-semibold text-text-secondary">
                <span>Distribuição dos Módulos</span>
                <span>{{ computedCompletedModules() }}/{{ computedTotalModules() }}</span>
              </div>

              <div class="flex items-center gap-2 w-full">
                @for (module of moduleItems(); track $index) {
                  <div
                    class="group/step relative flex-1 h-2 rounded-full transition-all duration-300 cursor-help"
                    [class.bg-primary]="module.isCompleted && variant() === 'primary'"
                    [class.bg-accent]="module.isCompleted && variant() === 'accent'"
                    [class.bg-success]="module.isCompleted && variant() === 'success'"
                    [class.bg-warning]="module.isCompleted && variant() === 'warning'"
                    [class.bg-info]="module.isCompleted && variant() === 'info'"
                    [class.bg-surface-elevated]="!module.isCompleted"
                    [class.border]="!module.isCompleted"
                    [class.border-border/60]="!module.isCompleted"
                  >
                    <!-- Tooltip hover on dot -->
                    <div
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/step:flex flex-col items-center z-30 pointer-events-none"
                    >
                      <div class="px-2 py-1 rounded bg-surface-elevated border border-border text-[10px] whitespace-nowrap shadow-md text-text-primary">
                        {{ module.title || 'Módulo ' + ($index + 1) }} — {{ module.isCompleted ? 'Concluído' : 'Pendente' }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    }
  `
})
export class AppProgressTracker {
  // Direct percentage input (optional, overrides module calculation if provided)
  readonly percentage = input<number | null>(null);

  // Training module counts
  readonly completedModules = input<number>(0);
  readonly totalModules = input<number>(0);

  // Optional custom list of modules to represent discrete progress
  readonly modules = input<TrainingModuleItem[] | null>(null);

  // Labels and copy
  readonly title = input<string>('Módulos de Treinamento');
  readonly subtitle = input<string>('');
  readonly icon = input<string>('school');

  // Presentation & styling options
  readonly size = input<ProgressTrackerSize>('md');
  readonly variant = input<ProgressTrackerVariant>('primary');
  readonly layout = input<ProgressTrackerLayout>('card');
  readonly strokeWidth = input<number>(8);
  readonly showModulePills = input<boolean>(true);
  readonly showCheckOnComplete = input<boolean>(true);

  // SVG Geometry constants
  readonly radius = computed(() => 50 - this.strokeWidth() / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius());

  // Resolved module statistics
  readonly moduleItems = computed<TrainingModuleItem[]>(() => {
    const customList = this.modules();
    if (customList && customList.length > 0) {
      return customList;
    }
    const total = this.computedTotalModules();
    const completed = this.computedCompletedModules();
    const items: TrainingModuleItem[] = [];
    for (let i = 0; i < total; i++) {
      items.push({
        id: i + 1,
        title: `Módulo ${i + 1}`,
        isCompleted: i < completed,
      });
    }
    return items;
  });

  readonly computedTotalModules = computed(() => {
    const customList = this.modules();
    if (customList && customList.length > 0) {
      return customList.length;
    }
    return this.totalModules();
  });

  readonly computedCompletedModules = computed(() => {
    const customList = this.modules();
    if (customList && customList.length > 0) {
      return customList.filter(m => m.isCompleted).length;
    }
    return this.completedModules();
  });

  // Effective completion percentage (0 - 100)
  readonly effectivePercentage = computed(() => {
    const direct = this.percentage();
    if (direct !== null && direct !== undefined) {
      return Math.min(100, Math.max(0, Math.round(direct)));
    }
    const total = this.computedTotalModules();
    if (total <= 0) return 0;
    const completed = this.computedCompletedModules();
    return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
  });

  // SVG dash offset calculation
  readonly dashOffset = computed(() => {
    const c = this.circumference();
    const p = this.effectivePercentage();
    return c - (p / 100) * c;
  });

  // Dynamic pixel dimensions per size
  readonly ringDimensions = computed(() => {
    switch (this.size()) {
      case 'sm':
        return { size: 56, fontSize: 13, iconSize: 22 };
      case 'md':
        return { size: 84, fontSize: 18, iconSize: 28 };
      case 'lg':
        return { size: 112, fontSize: 24, iconSize: 36 };
      case 'xl':
        return { size: 144, fontSize: 32, iconSize: 44 };
      default:
        return { size: 84, fontSize: 18, iconSize: 28 };
    }
  });

  // Stroke color class based on theme variant
  readonly strokeColorClass = computed(() => {
    const map: Record<ProgressTrackerVariant, string> = {
      primary: 'stroke-primary',
      accent: 'stroke-accent',
      success: 'stroke-success',
      warning: 'stroke-warning',
      info: 'stroke-info',
    };
    return map[this.variant()] || 'stroke-primary';
  });

  readonly textColorClass = computed(() => {
    const map: Record<ProgressTrackerVariant, string> = {
      primary: 'text-primary',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
    };
    return map[this.variant()] || 'text-primary';
  });

  readonly badgeVariant = computed<'primary' | 'accent' | 'success' | 'warning' | 'default'>(() => {
    const p = this.effectivePercentage();
    if (p === 100) return 'success';
    if (p >= 50) return 'accent';
    if (p > 0) return 'primary';
    return 'default';
  });

  readonly statusText = computed(() => {
    const p = this.effectivePercentage();
    if (p === 100) return 'Concluído';
    if (p >= 75) return 'Avançado';
    if (p > 0) return 'Em Progresso';
    return 'Não Iniciado';
  });

  readonly computedSubtitle = computed(() => {
    if (this.subtitle()) return this.subtitle();
    const total = this.computedTotalModules();
    const completed = this.computedCompletedModules();
    if (total > 0) {
      return `${completed} de ${total} módulos finalizados`;
    }
    return `${this.effectivePercentage()}% do treinamento concluído`;
  });

  readonly ariaLabel = computed(() => {
    return `${this.title()}: ${this.effectivePercentage()}% concluído (${this.computedCompletedModules()} de ${this.computedTotalModules()} módulos)`;
  });
}
