import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';
import { AppSidebar } from './components/app-sidebar/app-sidebar';
import { AppMobileNav } from './components/app-mobile-nav/app-mobile-nav';
import { AuthService } from '../../core/services/auth.service';
import { LoginScreen } from '../../features/auth/login';
import { GuidedStudyBanner } from '../../shared/components/guided-study-banner/guided-study-banner';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, AppHeader, AppSidebar, AppMobileNav, LoginScreen, GuidedStudyBanner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (authService.isLoading()) {
      <div class="h-[100dvh] w-full flex flex-col items-center justify-center bg-bg gap-4">
        <div class="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-sm text-text-secondary font-medium animate-pulse">Carregando ambiente...</p>
      </div>
    } @else if (!authService.user()) {
      <app-login />
    } @else {
      <div id="app-shell-root" class="h-[100dvh] overflow-hidden bg-bg text-text-primary flex flex-col font-sans selection:bg-primary-light selection:text-bg">
        <!-- Global Sticky Header -->
        <app-header
          [isMobileMenuOpen]="isMobileMenuOpen()"
          (toggleMobileMenu)="toggleMobileMenu()"
          class="shrink-0 z-40 relative"
        />

        <!-- App Core Body: Sidebar + Main Content -->
        <div class="flex flex-1 w-full overflow-hidden relative">
          <!-- Desktop / Tablet Sticky Sidebar -->
          <app-sidebar class="h-full shrink-0" />

          <!-- Main Content Area Container -->
          <main
            id="main-content"
            tabindex="-1"
            class="flex-1 w-full overflow-y-auto overflow-x-hidden pb-24 md:pb-12 scrollbar-thin flex flex-col"
            role="main"
            aria-label="Conteúdo Principal"
          >
            <app-guided-study-banner />
            <div class="p-4 sm:p-6 md:p-8 lg:p-10 w-full flex-1">
              <router-outlet />
            </div>
          </main>
        </div>

        <!-- Mobile Navigation Drawer & Bottom Bar -->
        <app-mobile-nav
          [isOpen]="isMobileMenuOpen()"
          (closeMenu)="closeMobileMenu()"
          (openMenu)="openMobileMenu()"
          class="shrink-0"
        />
      </div>
    }
  `,
})
export class AppShell {
  readonly authService = inject(AuthService);
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
