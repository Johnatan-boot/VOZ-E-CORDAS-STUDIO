import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { AppButton } from '../../shared/ui';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-[100dvh] w-full flex items-center justify-center bg-bg relative overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <!-- Login Card -->
      <div class="z-10 bg-surface border border-border p-8 rounded-3xl w-full max-w-md shadow-2xl flex flex-col items-center text-center mx-4 animate-fade-in-up">
        
        <!-- Logo/Brand -->
        <div class="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
          <mat-icon class="text-white text-4xl" style="height: 36px; width: 36px; font-size: 36px;">mic</mat-icon>
        </div>

        <h1 class="text-3xl font-bold text-text-primary mb-2">Voz & Cordas</h1>
        <p class="text-sm text-text-secondary mb-10 leading-relaxed px-4">
          O ambiente de alto rendimento para o artista sertanejo. Acesse seus cursos, afinadores e estatísticas.
        </p>

        <!-- Google Login Button -->
        <app-button
          variant="primary"
          size="lg"
          icon="login"
          (clicked)="authService.loginWithGoogle()"
          class="w-full h-14 text-base shadow-md shadow-primary/20"
        >
          Entrar com o Google
        </app-button>

        <div class="mt-8 pt-6 border-t border-border/50 w-full flex flex-col items-center gap-2">
          <p class="text-xs text-text-secondary/60">
            Acesso exclusivo para alunos matriculados
          </p>
          <div class="flex items-center gap-1 text-primary/80">
            <mat-icon class="text-[14px]">verified_user</mat-icon>
            <span class="text-[10px] font-bold tracking-wider">PLATAFORMA SEGURA</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginScreen {
  readonly authService = inject(AuthService);
}
