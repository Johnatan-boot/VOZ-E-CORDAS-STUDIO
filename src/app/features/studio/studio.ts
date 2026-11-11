import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppBadge, AppButton, AppCard, AppPageHeader } from '../../shared/ui';
import { AudioVisualizer } from './components/audio-visualizer/audio-visualizer';
import { TrackList } from './components/track-list/track-list';
import { AudioTake } from './models/studio.model';

@Component({
  selector: 'app-studio',
  imports: [MatIconModule, AppBadge, AppButton, AppCard, AppPageHeader, AudioVisualizer, TrackList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex flex-col gap-6 sm:gap-8 animate-fade-in pb-12">
      <!-- Page Header -->
      <app-page-header
        title="Studio de Gravação"
        description="Grave seus takes, compare interpretações e acompanhe sua evolução vocal e instrumental."
        category="FERRAMENTA"
        icon="graphic_eq"
      >
        <div slot="page-actions" class="flex items-center gap-2">
          @if (isRecording()) {
            <app-badge variant="error" size="sm" [dot]="true" class="animate-pulse">
              Gravando {{ formatDuration(recordingDuration()) }}
            </app-badge>
          } @else {
            <app-badge variant="default" size="sm">
              Pronto
            </app-badge>
          }
        </div>
      </app-page-header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Recorder Area -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <app-card variant="elevated" padding="lg">
            <div class="flex flex-col flex flex-col gap-6">
              
              <!-- Visualizer -->
              <app-audio-visualizer [stream]="mediaStream()" [isRecording]="isRecording()" />

              <!-- Controls -->
              <div class="flex items-center justify-center gap-4">
                @if (!isRecording()) {
                  <app-button
                    variant="primary"
                    size="lg"
                    icon="mic"
                    (clicked)="startRecording()"
                    class="w-48"
                  >
                    Gravar
                  </app-button>
                } @else {
                  <app-button
                    variant="danger"
                    size="lg"
                    icon="stop"
                    (clicked)="stopRecording()"
                    class="w-48"
                  >
                    Parar
                  </app-button>
                }
              </div>
              
              @if (error()) {
                <div class="text-sm text-error bg-error/10 p-3 rounded-lg text-center">
                  {{ error() }}
                </div>
              }
            </div>
          </app-card>
        </div>

        <!-- Takes List -->
        <div class="lg:col-span-1 flex flex-col gap-6">
          <app-card variant="default" padding="md">
            <h3 class="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <mat-icon class="text-[18px]">library_music</mat-icon>
              Takes Recentes
            </h3>
            
            <app-track-list 
              [takes]="takes()" 
              (delete)="deleteTake($event)"
            />
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class Studio implements OnDestroy {
  readonly isRecording = signal(false);
  readonly recordingDuration = signal(0);
  readonly takes = signal<AudioTake[]>([]);
  readonly error = signal<string | null>(null);
  readonly mediaStream = signal<MediaStream | null>(null);

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingInterval: number | null = null;
  private startTime = 0;

  async startRecording() {
    this.error.set(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream.set(stream);
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const take: AudioTake = {
          id: Math.random().toString(36).substring(2, 9),
          name: `Take ${this.takes().length + 1}`,
          timestamp: new Date(),
          duration: this.recordingDuration(),
          url: audioUrl
        };
        
        this.takes.update(takes => [take, ...takes]);
        this.resetStream();
      };

      this.mediaRecorder.start();
      this.isRecording.set(true);
      this.startTime = Date.now();
      
      this.recordingInterval = window.setInterval(() => {
        this.recordingDuration.set(Math.floor((Date.now() - this.startTime) / 1000));
      }, 1000);
      
    } catch (err) {
      console.error('Error accessing microphone', err);
      this.error.set('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording()) {
      this.mediaRecorder.stop();
      this.isRecording.set(false);
      
      if (this.recordingInterval) {
        window.clearInterval(this.recordingInterval);
        this.recordingInterval = null;
      }
    }
  }

  deleteTake(id: string) {
    this.takes.update(takes => {
      const takeToDelete = takes.find(t => t.id === id);
      if (takeToDelete) {
        URL.revokeObjectURL(takeToDelete.url);
      }
      return takes.filter(t => t.id !== id);
    });
  }

  private resetStream() {
    const stream = this.mediaStream();
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    this.mediaStream.set(null);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    this.stopRecording();
    this.resetStream();
    this.takes().forEach(take => URL.revokeObjectURL(take.url));
  }
}
export default Studio;
