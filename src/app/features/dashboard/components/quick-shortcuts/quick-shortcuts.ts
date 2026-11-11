import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppCard } from '../../../../shared/ui';
import { QuickShortcut } from '../../models/dashboard.model';

@Component({
  selector: 'app-quick-shortcuts',
  imports: [RouterLink, MatIconModule, AppCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="shortcuts-title" class="w-full">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col gap-1.5">
          <span class="inline-flex items-center self-start px-2.5 py-1 rounded-lg bg-surface border border-border/40 text-xs font-semibold text-text-secondary">
            Ferramentas Musicais
          </span>
          <h2 id="shortcuts-title" class="font-serif text-xl sm:text-2xl font-bold text-text-primary">
            Acesso Rápido
          </h2>
        </div>
      </div>

      <!-- Shortcuts Grid -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        @for (shortcut of shortcuts(); track shortcut.id) {
          <a [routerLink]="shortcut.route" class="block h-full group focus:outline-none">
            <app-card
              variant="default"
              padding="sm"
              [interactive]="true"
              class="h-full group-focus-visible:ring-2 group-focus-visible:ring-primary"
            >
              <div class="flex flex-col items-center text-center p-1 h-full justify-between gap-3">
                <!-- Icon Box -->
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface border border-border text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200 shadow-xs">
                  <mat-icon class="text-[22px] group-hover:scale-110 transition-transform duration-200">
                    {{ shortcut.icon }}
                  </mat-icon>
                </div>

                <!-- Text Info -->
                <div class="flex flex-col items-center">
                  <span class="text-[10px] font-semibold text-text-secondary truncate w-full">
                    {{ shortcut.category }}
                  </span>
                  <span class="font-sans text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors leading-tight mt-0.5 line-clamp-2">
                    {{ shortcut.title }}
                  </span>
                </div>
              </div>
            </app-card>
          </a>
        }
      </div>
    </section>
  `,
})
export class QuickShortcuts {
  readonly shortcuts = input.required<readonly QuickShortcut[]>();
}
