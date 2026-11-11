import { ChangeDetectionStrategy, Component, ElementRef, effect, input, OnDestroy, viewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-audio-visualizer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full h-32 bg-surface border border-border/60 rounded-xl overflow-hidden flex items-center justify-center">
      <canvas #canvas class="w-full h-full"></canvas>
      @if (!isRecording()) {
        <div class="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
          <span class="text-xs font-semibold text-text-secondary">Pronto para gravar</span>
        </div>
      }
    </div>
  `
})
export class AudioVisualizer implements OnDestroy {
  readonly stream = input<MediaStream | null>(null);
  readonly isRecording = input<boolean>(false);
  
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly platformId = inject(PLATFORM_ID);
  
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private animationFrameId: number | null = null;

  constructor() {
    effect(() => {
      const currentStream = this.stream();
      if (currentStream && this.isRecording()) {
        this.startVisualization(currentStream);
      } else {
        this.stopVisualization();
      }
    });
  }

  private startVisualization(stream: MediaStream) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    
    if (this.audioContext.state === 'suspended') {
      void this.audioContext.resume();
    }

    if (!this.analyser) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
    }

    // Connect stream
    try {
      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);
    } catch (e) {
      console.error('Failed to create media stream source:', e);
      return;
    }

    this.draw();
  }

  private stopVisualization() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    
    this.clearCanvas();
  }

  private draw = () => {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.analyser) return;

    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;

      // Draw bars with primary color
      // Let's use a solid color derived from css variable
      ctx.fillStyle = '#10b981'; // Tailwind emerald-500
      
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    this.animationFrameId = requestAnimationFrame(this.draw);
  };

  private clearCanvas() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  ngOnDestroy() {
    this.stopVisualization();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      void this.audioContext.close();
    }
  }
}
