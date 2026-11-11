import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { AudioTake } from '../../models/studio.model';

@Component({
  selector: 'app-track-list',
  imports: [MatIconModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col flex flex-col gap-3">
      @if (takes().length === 0) {
        <div class="flex flex-col items-center justify-center py-10 text-text-secondary border border-dashed border-border/80 rounded-xl bg-surface/50">
          <mat-icon class="mb-2 opacity-50">mic_off</mat-icon>
          <span class="text-sm">Nenhuma gravação ainda.</span>
        </div>
      }
      
      @for (take of takes(); track take.id) {
        <div class="flex items-center justify-between p-4 bg-surface border border-border/60 rounded-xl transition-colors hover:border-border-focus">
          <div class="flex items-center gap-4">
            <button 
              type="button"
              (click)="togglePlay(take)"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <mat-icon>{{ currentlyPlayingId() === take.id ? 'pause' : 'play_arrow' }}</mat-icon>
            </button>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-text-primary">{{ take.name }}</span>
              <span class="text-xs text-text-secondary">{{ take.timestamp | date:'shortTime' }} • {{ formatDuration(take.duration) }}</span>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <a 
              [href]="take.url" 
              [download]="take.name + '.webm'"
              class="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
              title="Baixar gravação"
            >
              <mat-icon class="text-[18px]">download</mat-icon>
            </a>
            <button 
              type="button"
              (click)="delete.emit(take.id)"
              class="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:text-error hover:bg-surface-elevated transition-colors cursor-pointer"
              title="Excluir gravação"
            >
              <mat-icon class="text-[18px]">delete</mat-icon>
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class TrackList {
  readonly takes = input.required<readonly AudioTake[]>();
  readonly delete = output<string>();
  
  readonly currentlyPlayingId = signal<string | null>(null);
  private currentAudio: HTMLAudioElement | null = null;

  togglePlay(take: AudioTake) {
    if (this.currentlyPlayingId() === take.id) {
      // Pause
      this.currentAudio?.pause();
      this.currentlyPlayingId.set(null);
    } else {
      // Stop current if any
      this.currentAudio?.pause();
      
      // Play new
      this.currentlyPlayingId.set(take.id);
      this.currentAudio = new Audio(take.url);
      
      this.currentAudio.addEventListener('ended', () => {
        this.currentlyPlayingId.set(null);
      });
      
      void this.currentAudio.play();
    }
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
