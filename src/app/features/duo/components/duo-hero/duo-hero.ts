import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-duo-hero',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full overflow-hidden rounded-3xl bg-surface-elevated border border-border/40 shadow-sm">
      <!-- Background pattern/gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50"></div>
      
      <div class="relative flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 gap-8">
        <div class="flex flex-col max-w-xl flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <mat-icon class="text-primary text-[20px]">group</mat-icon>
            <span class="text-xs font-semibold text-primary">Modo Colaborativo (Demonstração)</span>
          </div>
          
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Treino de Dupla
          </h1>
          
          <p class="text-base text-text-secondary leading-relaxed">
            Aprenda a cantar, tocar e construir harmonias junto com uma segunda voz.
            Escolha um exercício, encontre seu parceiro musical e inicie uma sessão de prática focada em sincronia e afinação.
          </p>
        </div>
        
        <div class="hidden md:flex flex-shrink-0 w-32 h-32 rounded-full border-4 border-surface bg-background flex items-center justify-center shadow-lg relative">
          <mat-icon class="text-[48px] text-text-secondary absolute -ml-8 -mt-8">person</mat-icon>
          <mat-icon class="text-[64px] text-primary z-10">person</mat-icon>
        </div>
      </div>
    </div>
  `
})
export class DuoHero {}
