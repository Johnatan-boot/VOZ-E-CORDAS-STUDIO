import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_SECTIONS, NavSection } from '../../navigation.config';

@Component({
  selector: 'app-mobile-nav',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile Drawer Overlay Backdrop -->
    @if (isOpen()) {
      <div
        id="mobile-drawer-backdrop"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-200 md:hidden"
        (click)="closeMenu.emit()"
        aria-hidden="true"
      ></div>
    }

    <!-- Mobile Navigation Drawer -->
    <div
      id="mobile-nav-drawer"
      class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-border bg-surface p-5 shadow-2xl transition-transform duration-200 ease-out md:hidden"
      [class.translate-x-0]="isOpen()"
      [class.-translate-x-full]="!isOpen()"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação móvel"
    >
      <div class="flex flex-col gap-6 overflow-y-auto">
        <!-- Drawer Header -->
        <div class="flex items-center justify-between border-b border-border pb-4">
          <div class="flex items-center gap-2.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
              <mat-icon class="text-[18px]">music_note</mat-icon>
            </div>
            <div class="flex flex-col">
              <span class="font-serif text-sm font-bold text-text-primary">VOZ & CORDAS</span>
              <span class="inline-flex mt-0.5 px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 text-[10px] text-accent font-semibold self-start">Studio</span>
            </div>
          </div>

          <button
            id="mobile-drawer-close-btn"
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Fechar menu"
            (click)="closeMenu.emit()"
          >
            <mat-icon class="text-[20px]">close</mat-icon>
          </button>
        </div>

        <!-- Categorized Nav Links -->
        <nav class="flex flex-col gap-5">
          @for (section of sections; track section.title) {
            <div class="flex flex-col gap-1.5">
              <div class="px-2 mb-1">
                <span class="inline-flex items-center px-2 py-1 rounded-md bg-surface-elevated border border-border/40 text-[10px] font-bold text-text-secondary">
                  {{ section.title }}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                @for (item of section.items; track item.id) {
                  <a
                    [id]="'mobile-drawer-link-' + item.id"
                    [routerLink]="item.route"
                    routerLinkActive="bg-primary/15 text-primary border-primary/40 font-semibold"
                    [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' || item.route === '/' }"
                    (click)="closeMenu.emit()"
                    class="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                  >
                    <mat-icon class="text-[20px]">{{ item.icon }}</mat-icon>
                    <span>{{ item.label }}</span>
                  </a>
                }
              </div>
            </div>
          }
        </nav>
      </div>

      <!-- Drawer Bottom Status -->
      <div class="border-t border-border pt-4">
        <div class="flex items-center justify-between rounded-xl bg-surface-elevated p-3 border border-border text-xs text-text-secondary">
          <span>Voz & Cordas Studio</span>
          <span class="text-primary font-medium">Online</span>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar (Persistent quick access) -->
    <nav
      id="mobile-bottom-nav"
      class="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-border bg-surface/95 px-2 backdrop-blur-md md:hidden"
      aria-label="Navegação rápida inferior"
    >
      <a
        id="bottom-nav-dashboard"
        routerLink="/dashboard"
        routerLinkActive="text-primary"
        [routerLinkActiveOptions]="{ exact: true }"
        class="flex flex-col items-center justify-center gap-1 p-2 text-text-secondary transition-colors hover:text-text-primary"
      >
        <mat-icon class="text-[20px]">dashboard</mat-icon>
        <span class="text-[10px] font-medium leading-none">Início</span>
      </a>

      <a
        id="bottom-nav-canto"
        routerLink="/canto"
        routerLinkActive="text-primary"
        class="flex flex-col items-center justify-center gap-1 p-2 text-text-secondary transition-colors hover:text-text-primary"
      >
        <mat-icon class="text-[20px]">mic</mat-icon>
        <span class="text-[10px] font-medium leading-none">Canto</span>
      </a>

      <a
        id="bottom-nav-violao"
        routerLink="/violao"
        routerLinkActive="text-primary"
        class="flex flex-col items-center justify-center gap-1 p-2 text-text-secondary transition-colors hover:text-text-primary"
      >
        <mat-icon class="text-[20px]">straighten</mat-icon>
        <span class="text-[10px] font-medium leading-none">Violão</span>
      </a>

      <a
        id="bottom-nav-afinador"
        routerLink="/tuner"
        routerLinkActive="text-primary"
        class="flex flex-col items-center justify-center gap-1 p-2 text-text-secondary transition-colors hover:text-text-primary"
      >
        <mat-icon class="text-[20px]">tune</mat-icon>
        <span class="text-[10px] font-medium leading-none">Afinador</span>
      </a>

      <button
        id="bottom-nav-more"
        type="button"
        (click)="openMenu.emit()"
        class="flex flex-col items-center justify-center gap-1 p-2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none"
        aria-label="Abrir todas as opções"
      >
        <mat-icon class="text-[20px]">more_horiz</mat-icon>
        <span class="text-[10px] font-medium leading-none">Mais</span>
      </button>
    </nav>
  `,
})
export class AppMobileNav {
  readonly isOpen = input<boolean>(false);
  readonly closeMenu = output<void>();
  readonly openMenu = output<void>();
  readonly sections: readonly NavSection[] = NAVIGATION_SECTIONS;
}
