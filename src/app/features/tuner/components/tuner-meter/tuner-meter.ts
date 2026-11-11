import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { METER_MAX_CENTS, METER_MIN_CENTS } from '../../data/tuner.data';
import { TuningStatus } from '../../models/tuner.model';

interface GaugeTick {
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  textX: number;
  textY: number;
  label: string | null;
  classes: string;
}

@Component({
  selector: 'app-tuner-meter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full flex flex-col items-center py-2 select-none" role="meter" [attr.aria-valuenow]="cents()" aria-valuemin="-50" aria-valuemax="50">
      
      <div class="relative w-full max-w-[360px] mx-auto">
        <svg viewBox="0 0 200 130" class="w-full h-auto drop-shadow-xl overflow-visible">
          <!-- Dial Background Arc -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="currentColor" stroke-width="16" class="text-surface-elevated opacity-60" stroke-linecap="round" />
          
          <!-- Tuned Center Arc Highlights -->
          <path d="M 76.6 23.4 A 80 80 0 0 1 123.4 23.4" fill="none" stroke="currentColor" stroke-width="16" class="text-success/10 transition-colors" [class.text-success/30]="status() === 'tuned'" />
          <path d="M 91.6 20.8 A 80 80 0 0 1 108.4 20.8" fill="none" stroke="currentColor" stroke-width="16" class="text-success/30 transition-colors" [class.text-success/60]="status() === 'tuned'" />

          <!-- Ticks -->
          <g stroke="currentColor" stroke-linecap="round">
            @for (tick of gaugeTicks(); track tick.angle) {
              <line 
                [attr.x1]="tick.x1" [attr.y1]="tick.y1" 
                [attr.x2]="tick.x2" [attr.y2]="tick.y2" 
                [attr.stroke-width]="tick.label ? 2 : 1"
                [class]="tick.classes" 
              />
              @if (tick.label) {
                <text 
                  [attr.x]="tick.textX" [attr.y]="tick.textY" 
                  font-size="7" text-anchor="middle" dominant-baseline="middle" 
                  font-family="monospace" font-weight="bold" fill="currentColor"
                  [class]="tick.label === '0' ? 'text-success drop-shadow-sm' : 'text-text-secondary/70'"
                >
                  {{tick.label}}
                </text>
              }
            }
          </g>

          <!-- Needle -->
          <g [style.transform]="'rotate(' + needleAngle() + 'deg)'" style="transform-origin: 100px 100px; transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)">
            <!-- Needle Glow Effect (when active) -->
            <line x1="100" y1="100" x2="100" y2="28" stroke="currentColor" stroke-width="6" stroke-linecap="round" [class]="pointerLineClasses()" class="opacity-30 blur-sm" />
            <!-- Main Needle body -->
            <line x1="100" y1="100" x2="100" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" [class]="pointerLineClasses()" />
            <!-- Center Pivot -->
            <circle cx="100" cy="100" r="7" fill="currentColor" [class]="pointerIndicatorClasses()" />
            <!-- Inner pivot dot -->
            <circle cx="100" cy="100" r="2.5" fill="currentColor" class="text-bg" />
            <!-- Needle Tip Triangle -->
            <polygon points="97.5,29 102.5,29 100,21" fill="currentColor" [class]="pointerLineClasses()" />
          </g>
        </svg>

        <!-- Spectacular Glowing Accent underneath center -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-current rounded-[100%] blur-[20px] opacity-20 pointer-events-none transition-colors duration-300" [class]="pointerLineClasses()"></div>
      </div>

    </div>
  `,
})
export class TunerMeter {
  readonly cents = input<number>(0);
  readonly status = input<TuningStatus>('unknown');

  readonly clampedCents = computed(() => {
    if (this.status() === 'unknown') {
      return 0;
    }
    return Math.max(METER_MIN_CENTS, Math.min(METER_MAX_CENTS, this.cents()));
  });

  readonly needleAngle = computed(() => {
    // Map cents [-50, +50] to angle [-65, +65] degrees for the dial
    const maxAngle = 65;
    const ratio = this.clampedCents() / 50; // -1 to 1
    return ratio * maxAngle;
  });

  readonly gaugeTicks = computed(() => {
    const ticks: GaugeTick[] = [];
    const maxAngle = 65;
    
    for (let c = -50; c <= 50; c += 5) {
      const angle = (c / 50) * maxAngle;
      const rad = (angle - 90) * (Math.PI / 180);
      const isMajor = c % 10 === 0;
      
      // Radius configurations
      const rInner = 80;
      const rOuter = isMajor ? 88 : 84;
      const rText = 70; // Inside the arc
      
      const cx = 100;
      const cy = 100;
      
      let classes = 'text-text-secondary/40';
      if (c === 0) classes = 'text-success/80';
      else if (c >= -10 && c <= 10) classes = 'text-success/40';
      else if (isMajor) classes = 'text-text-secondary/60';

      ticks.push({
        angle,
        x1: cx + rInner * Math.cos(rad),
        y1: cy + rInner * Math.sin(rad),
        x2: cx + rOuter * Math.cos(rad),
        y2: cy + rOuter * Math.sin(rad),
        textX: cx + rText * Math.cos(rad),
        textY: cy + rText * Math.sin(rad),
        label: isMajor ? (c === 0 ? '0' : `${c > 0 ? '+' : ''}${c}`) : null,
        classes
      });
    }
    return ticks;
  });

  pointerIndicatorClasses(): string {
    switch (this.status()) {
      case 'tuned': return 'text-success shadow-[0_0_15px_rgba(74,222,128,0.8)]';
      case 'flat': return 'text-primary shadow-[0_0_15px_rgba(202,138,4,0.6)]';
      case 'sharp': return 'text-accent shadow-[0_0_15px_rgba(224,122,95,0.6)]';
      default: return 'text-text-secondary/50';
    }
  }

  pointerLineClasses(): string {
    switch (this.status()) {
      case 'tuned': return 'text-success';
      case 'flat': return 'text-primary';
      case 'sharp': return 'text-accent';
      default: return 'text-text-secondary/40';
    }
  }
}
