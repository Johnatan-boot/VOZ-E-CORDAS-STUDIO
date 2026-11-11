import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppButton } from '../../../../shared/ui';
import { MicrophoneState } from '../../models/tuner.model';

@Component({
  selector: 'app-tuner-controls',
  imports: [MatIconModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 py-2 w-full">
      @if (micState() === 'active') {
        <app-button
          variant="secondary"
          size="lg"
          icon="mic_off"
          (clicked)="stopClicked.emit()"
        >
          Desativar Microfone
        </app-button>
      } @else {
        <app-button
          variant="primary"
          size="lg"
          icon="mic"
          [loading]="micState() === 'requesting-permission'"
          (clicked)="startClicked.emit()"
        >
          Ativar Microfone Agora
        </app-button>
      }

      <app-button
        variant="ghost"
        size="md"
        icon="play_circle_outline"
        (clicked)="testClicked.emit()"
      >
        Testar Corda no Afinador
      </app-button>
    </div>
  `,
})
export class TunerControls {
  readonly micState = input.required<MicrophoneState>();
  readonly startClicked = output<void>();
  readonly stopClicked = output<void>();
  readonly testClicked = output<void>();
}
