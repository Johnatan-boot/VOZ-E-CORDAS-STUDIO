import { Injectable, signal } from '@angular/core';
import { GuitarChord } from '../models/guitar.model';

@Injectable({
  providedIn: 'root'
})
export class GuitarAudioService {
  private audioCtx: AudioContext | null = null;
  readonly isStrumming = signal<boolean>(false);
  readonly currentPlayingChord = signal<string | null>(null);

  // Standard open string frequencies (strings 6 to 1)
  private readonly openStringFreqs: Record<number, number> = {
    6: 82.41,  // E2
    5: 110.00, // A2
    4: 146.83, // D3
    3: 196.00, // G3
    2: 246.94, // B3
    1: 329.63, // E4
  };

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Play an individual plucked string note
   */
  playString(stringNumber: number, fret: number | null, duration = 1.4): void {
    if (fret === null) return;
    const ctx = this.getAudioContext();
    const openFreq = this.openStringFreqs[stringNumber] || 220;
    const freq = openFreq * Math.pow(2, fret / 12);
    this.synthesizePluck(ctx, freq, ctx.currentTime, duration, 0.4);
  }

  /**
   * Strum an entire chord with realistic acoustic guitar string timing
   */
  strumChord(chord: GuitarChord, speedMs = 35, duration = 2.0): void {
    const ctx = this.getAudioContext();
    this.isStrumming.set(true);
    this.currentPlayingChord.set(chord.name);

    // Strings sorted from lowest (6) to highest (1)
    const sortedStrings = [...chord.strings]
      .filter(s => s.status !== 'muted' && s.fret !== null)
      .sort((a, b) => b.stringNumber - a.stringNumber);

    const now = ctx.currentTime;
    sortedStrings.forEach((s, idx) => {
      const openFreq = this.openStringFreqs[s.stringNumber];
      if (!openFreq || s.fret === null) return;
      const freq = openFreq * Math.pow(2, s.fret / 12);
      const startTime = now + (idx * (speedMs / 1000));
      this.synthesizePluck(ctx, freq, startTime, duration, 0.35);
    });

    const totalDuration = (sortedStrings.length * speedMs) + (duration * 1000);
    setTimeout(() => {
      this.isStrumming.set(false);
      if (this.currentPlayingChord() === chord.name) {
        this.currentPlayingChord.set(null);
      }
    }, totalDuration);
  }

  /**
   * Strum chord by chord notes or standard name (e.g. for music library or quick previews)
   */
  strumNotes(notes: string[], chordName = 'Acorde', duration = 1.8): void {
    const ctx = this.getAudioContext();
    this.isStrumming.set(true);
    this.currentPlayingChord.set(chordName);

    const noteToFreq = (n: string): number => {
      const clean = n.replace(/\d/, '').toUpperCase();
      const octaveMatch = n.match(/\d/);
      const octave = octaveMatch ? parseInt(octaveMatch[0], 10) : 3;
      const semitonesFromC: Record<string, number> = {
        'C': 0, 'C#': 1, 'DB': 1, 'D': 2, 'D#': 3, 'EB': 3, 'E': 4,
        'F': 5, 'F#': 6, 'GB': 6, 'G': 7, 'G#': 8, 'AB': 8, 'A': 9,
        'A#': 10, 'BB': 10, 'B': 11
      };
      const semi = semitonesFromC[clean] ?? 0;
      return 440 * Math.pow(2, (semi + (octave - 4) * 12 - 9) / 12);
    };

    const now = ctx.currentTime;
    notes.forEach((note, idx) => {
      const freq = noteToFreq(note);
      const startTime = now + (idx * 0.04);
      this.synthesizePluck(ctx, freq, startTime, duration, 0.3);
    });

    setTimeout(() => {
      this.isStrumming.set(false);
      this.currentPlayingChord.set(null);
    }, (notes.length * 40) + (duration * 1000));
  }

  /**
   * Warm acoustic guitar string synthesis using Karplus-inspired filtering
   */
  private synthesizePluck(ctx: AudioContext, frequency: number, startTime: number, duration: number, masterVol: number): void {
    // Primary body oscillator (triangle for woody hollow resonance)
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(frequency, startTime);

    // Harmonic richness oscillator (sine 2nd harmonic)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, startTime);

    // String lowpass damping filter (string sounds brighter at attack, warmer on release)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 5, startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(120, frequency * 1.5), startTime + duration);

    // Envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, startTime);
    // Instantaneous attack (pick hitting string)
    gainNode.gain.exponentialRampToValueAtTime(masterVol, startTime + 0.008);
    // Natural acoustic decay
    gainNode.gain.exponentialRampToValueAtTime(masterVol * 0.25, startTime + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Second harmonic envelope
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(masterVol * 0.4, startTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.6));

    osc1.connect(filter);
    osc2.connect(gain2);
    gain2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }
}
