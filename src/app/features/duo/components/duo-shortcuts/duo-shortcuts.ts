import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';

@Component({
  selector: 'app-duo-shortcuts',
  imports: [MatIconModule, AppCard, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="default" padding="md">
      <h3 class="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
        <mat-icon class="text-[18px]">build</mat-icon>
        Ferramentas Úteis
      </h3>
      
      <div class="flex flex-col flex flex-col gap-2">
        <a routerLink="/tuner" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group cursor-pointer border border-transparent hover:border-border/40">
          <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <mat-icon class="text-[18px]">tune</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">Afinador</span>
            <span class="text-xs text-text-secondary">Verifique sua afinação</span>
          </div>
        </a>
        
        <a routerLink="/studio" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group cursor-pointer border border-transparent hover:border-border/40">
          <div class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <mat-icon class="text-[18px]">graphic_eq</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">Studio de Gravação</span>
            <span class="text-xs text-text-secondary">Grave seu ensaio</span>
          </div>
        </a>
        
        <a routerLink="/notas-vocais" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group cursor-pointer border border-primary/20 bg-primary/5">
          <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <mat-icon class="text-[18px]">record_voice_over</mat-icon>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">Notas 1ª & 2ª Voz</span>
              <span class="text-[9px] font-bold bg-primary text-background px-1.5 py-0.2 rounded-full">Novo</span>
            </div>
            <span class="text-xs text-text-secondary">Dicionário de notas e terças</span>
          </div>
        </a>

        <a routerLink="/cursos" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group cursor-pointer border border-transparent hover:border-border/40">
          <div class="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
            <mat-icon class="text-[18px]">school</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-text-primary group-hover:text-success transition-colors">Cursos & Teoria</span>
            <span class="text-xs text-text-secondary">Estude harmonia</span>
          </div>
        </a>
      </div>
    </app-card>
  `
})
export class DuoShortcuts {}
