import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppPageHeader } from '../../../../shared/ui';

@Component({
  selector: 'app-gamification-hero',
  imports: [AppPageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      title="Seu Caminho Musical"
      description="Acompanhe sua evolução através de prática, metas e conquistas no estúdio."
      category="GAMIFICAÇÃO"
      icon="emoji_events"
    />
  `
})
export class GamificationHero {
}
