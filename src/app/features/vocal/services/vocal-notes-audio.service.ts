import { Injectable, OnDestroy, signal } from '@angular/core';
import { RepertoireDuoNote } from '../data/vocal-notes.data';

@Injectable({
  providedIn: 'root'
})
export class VocalNotesAudioService implements OnDestroy {
  private audioCtx: AudioContext | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private sequenceTimeouts: number[] = [];

  readonly isPlayingSequence = signal<boolean>(false);
  readonly currentPlayingIndex = signal<number>(-1);
  readonly activeNoteFeedback = signal<string | null>(null);

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Toca uma única nota (1ª ou 2ª Voz) com envelope suave de voz
   */
  playNote(frequency: number, durationSeconds = 1.6, label?: string): void {
    if (frequency <= 0) return;
    const ctx = this.getAudioContext();
    this.stopActiveTones();

    if (label) {
      this.activeNoteFeedback.set(label);
    }

    const now = ctx.currentTime;
    
    // Oscilador fundamental (onda senoidal + formante triangular para calor vocal)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency, now);

    // Envelope vocal suave (ataque macio, sustentação e release sem cliques)
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.28, now + 0.08); // Ataque
    gainNode.gain.exponentialRampToValueAtTime(0.22, now + 0.3); // Decay para sustain
    gainNode.gain.setValueAtTime(0.22, now + durationSeconds - 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds); // Release

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSeconds);
    osc2.stop(now + durationSeconds);

    this.activeOscillators.push(osc1, osc2);

    window.setTimeout(() => {
      if (this.activeNoteFeedback() === label) {
        this.activeNoteFeedback.set(null);
      }
    }, durationSeconds * 1000);
  }

  /**
   * Toca um Dueto / Acorde vocal a duas vozes
   */
  playDuoChord(firstFreq: number, secondFreq: number, durationSeconds = 1.6): void {
    this.playDuo(firstFreq, secondFreq, durationSeconds);
  }

  /**
   * Toca um Dueto: 1ª Voz e 2ª Voz simultaneamente perfeitamente harmonizadas
   */
  playDuo(firstFreq: number, secondFreq: number, durationSeconds = 2.0, label?: string): void {
    if (firstFreq <= 0 || secondFreq <= 0) return;
    const ctx = this.getAudioContext();
    this.stopActiveTones();

    if (label) {
      this.activeNoteFeedback.set(label);
    }

    const now = ctx.currentTime;

    // Canal 1: 1ª Voz (Voz Principal)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(firstFreq, now);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.26, now + 0.09);
    gain1.gain.exponentialRampToValueAtTime(0.20, now + 0.4);
    gain1.gain.setValueAtTime(0.20, now + durationSeconds - 0.15);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Canal 2: 2ª Voz (Harmonia de Parceiro)
    const osc2 = ctx.createOscillator();
    const osc2Tri = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(secondFreq, now);
    osc2Tri.type = 'triangle';
    osc2Tri.frequency.setValueAtTime(secondFreq, now);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.18, now + 0.4);
    gain2.gain.setValueAtTime(0.18, now + durationSeconds - 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    osc2.connect(gain2);
    osc2Tri.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc2Tri.start(now);

    osc1.stop(now + durationSeconds);
    osc2.stop(now + durationSeconds);
    osc2Tri.stop(now + durationSeconds);

    this.activeOscillators.push(osc1, osc2, osc2Tri);

    window.setTimeout(() => {
      if (this.activeNoteFeedback() === label) {
        this.activeNoteFeedback.set(null);
      }
    }, durationSeconds * 1000);
  }

  /**
   * Toca uma frase musical completa (de canção ou escala) nota por nota
   */
  playSequence(
    notes: readonly RepertoireDuoNote[],
    mode: 'duo' | 'first' | 'second' = 'duo',
    bpm = 75,
    onStep?: (index: number) => void
  ): void {
    this.stopPlayback();
    if (!notes || notes.length === 0) return;

    this.isPlayingSequence.set(true);
    const secondsPerBeat = 60 / bpm;
    let accumulatedTime = 0;

    notes.forEach((note, index) => {
      const stepDuration = note.durationBeats * secondsPerBeat;
      const timeoutId = window.setTimeout(() => {
        this.currentPlayingIndex.set(index);
        if (onStep) onStep(index);

        if (mode === 'duo') {
          this.playDuo(note.firstVoiceFreq, note.secondVoiceFreq, stepDuration * 0.95);
        } else if (mode === 'first') {
          this.playNote(note.firstVoiceFreq, stepDuration * 0.95, `${note.firstVoicePt} (1ª Voz)`);
        } else {
          this.playNote(note.secondVoiceFreq, stepDuration * 0.95, `${note.secondVoicePt} (2ª Voz)`);
        }
      }, accumulatedTime * 1000);

      this.sequenceTimeouts.push(timeoutId);
      accumulatedTime += stepDuration;
    });

    const endTimeout = window.setTimeout(() => {
      this.isPlayingSequence.set(false);
      this.currentPlayingIndex.set(-1);
    }, accumulatedTime * 1000);

    this.sequenceTimeouts.push(endTimeout);
  }

  stopPlayback(): void {
    this.sequenceTimeouts.forEach((id) => clearTimeout(id));
    this.sequenceTimeouts = [];
    this.stopActiveTones();
    this.isPlayingSequence.set(false);
    this.currentPlayingIndex.set(-1);
    this.activeNoteFeedback.set(null);
  }

  private stopActiveTones(): void {
    for (const osc of this.activeOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    }
    this.activeOscillators = [];
  }

  ngOnDestroy(): void {
    this.stopPlayback();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      void this.audioCtx.close();
    }
  }
}
