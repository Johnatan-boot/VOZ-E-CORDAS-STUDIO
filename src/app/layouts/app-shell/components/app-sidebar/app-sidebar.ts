import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_SECTIONS, NavSection } from '../../navigation.config';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      id="app-sidebar"
      class="hidden h-full w-64 flex-col justify-between border-r border-border bg-surface p-4 md:flex select-none"
      aria-label="Navegação Principal"
    >
      <!-- Navigation Area -->
      <nav id="sidebar-nav" class="flex flex-col gap-6 overflow-y-auto pr-1">
        @for (section of sections; track section.title) {
          <div class="flex flex-col gap-1.5">
            <!-- Section Header -->
            <div class="px-3 py-1 mb-1">
              <span class="inline-flex items-center px-2 py-1 rounded-md bg-surface-elevated border border-border/40 text-[10px] font-bold text-text-secondary">
                {{ section.title }}
              </span>
            </div>

            <!-- Section Items -->
            <div class="flex flex-col gap-1">
              @for (item of section.items; track item.id) {
                <a
                  [id]="'sidebar-link-' + item.id"
                  [routerLink]="item.route"
                  routerLinkActive="bg-primary/15 text-primary border-primary/40 font-semibold shadow-xs"
                  [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' || item.route === '/' }"
                  class="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-text-secondary transition-all duration-150 hover:bg-surface-elevated hover:text-text-primary hover:border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
                >
                  <mat-icon
                    class="text-[20px] transition-colors group-hover:text-primary"
                  >
                    {{ item.icon }}
                  </mat-icon>
                  <span class="flex-1 truncate">{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-semibold text-accent">
                      {{ item.badge }}
                    </span>
                  }
                </a>
              }
            </div>
          </div>
        }
      </nav>

      <!-- Sidebar Footer Capsule -->
      <div class="mt-4 border-t border-border pt-4">
        <div class="flex items-center justify-between rounded-xl bg-surface-elevated p-3 border border-border">
          <div class="flex items-center gap-2.5">
            <div class="h-2 w-2 rounded-full bg-primary"></div>
            <div class="flex flex-col">
              <span class="text-xs font-semibold text-text-primary">Studio Online</span>
              <span class="text-[10px] text-text-secondary">v2.0 • Foundation</span>
            </div>
          </div>
          <mat-icon class="text-[16px] text-text-secondary">graphic_eq</mat-icon>
        </div>
      </div>
    </aside>
  `,
})
export class AppSidebar {
  readonly sections: readonly NavSection[] = NAVIGATION_SECTIONS;
}
