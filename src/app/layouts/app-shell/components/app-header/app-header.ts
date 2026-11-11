import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      id="app-header"
      class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur-md transition-colors md:px-8"
    >
      <!-- Left side: Mobile Toggle + Brand / Context -->
      <div class="flex items-center gap-3 md:gap-6">
        <!-- Mobile Menu Toggle Button -->
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-elevated text-text-primary transition-colors hover:border-primary hover:text-primary md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
          [attr.aria-expanded]="isMobileMenuOpen()"
          aria-controls="mobile-nav-drawer"
          aria-label="Abrir menu de navegação"
          (click)="toggleMobileMenu.emit()"
        >
          <mat-icon class="text-[20px]">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>

        <!-- Brand Identity -->
        <a
          id="header-brand-link"
          routerLink="/"
          class="flex items-center gap-2 text-text-primary transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
        >
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
            <mat-icon class="text-[18px]">music_note</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="font-serif text-sm font-bold tracking-wide text-text-primary">VOZ & CORDAS</span>
            <span class="inline-flex mt-0.5 px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 text-[10px] text-accent font-semibold self-start">Studio</span>
          </div>
        </a>

        <!-- Desktop Studio Status Badge -->
        <div class="hidden items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-text-secondary lg:flex">
          <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
          <span class="text-[10px] font-semibold text-text-secondary">Ambiente Ativo</span>
        </div>
      </div>

      <!-- Right side: Actions & User Capsule -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Subtle User Presence Pill -->
        <a
          id="header-user-badge"
          routerLink="/perfil"
          class="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated p-1.5 pr-3 text-left transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          aria-label="Acessar meu perfil"
        >
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent font-serif text-xs font-bold">
            VC
          </div>
          <div class="hidden flex-col sm:flex">
            <span class="text-xs font-semibold text-text-primary leading-tight">Meu Perfil</span>
            <span class="text-[9px] font-semibold text-primary">Aluno</span>
          </div>
        </a>
      </div>
    </header>
  `,
})
export class AppHeader {
  readonly isMobileMenuOpen = input<boolean>(false);
  readonly toggleMobileMenu = output<void>();
}
