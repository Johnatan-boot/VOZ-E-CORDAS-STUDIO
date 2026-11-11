import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-progress-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-bg via-surface-elevated to-surface border border-border/40 p-6 md:p-8 flex flex-col items-start justify-center">
      <h2 class="text-2xl md:text-3xl font-serif font-bold text-text-primary tracking-tight">
        Minha Evolução
      </h2>
      <p class="text-text-secondary mt-2 max-w-2xl text-sm md:text-base">
        Acompanhe sua prática, consistência e desenvolvimento musical.<br>
        <span class="text-primary font-medium">Esta semana você praticou mais do que na semana anterior. Continue assim!</span>
      </p>
    </div>
  `
})
export class ProgressHero {
}
