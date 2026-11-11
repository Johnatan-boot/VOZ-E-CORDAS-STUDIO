import { Injectable, OnDestroy, signal, computed } from '@angular/core';
import { VocalExercise, VocalPitchFeedback, VocalRange } from '../models/vocal.model';
import * as Tone from 'tone';

export type MicrophoneState = 'idle' | 'requesting-permission' | 'active' | 'denied' | 'error' | 'stopped';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const AUDIO_BUFFER_SIZE = 2048;

@Injectable({
  providedIn: 'root'
})
export class VocalAudioService implements OnDestroy {
  readonly micState = signal<MicrophoneState>('idle');
  readonly isMicActive = computed(() => this.micState() === 'active');
  readonly currentExercise = signal<VocalExercise | null>(null);
  readonly currentNoteIndex = signal<number>(0);
  readonly isPlayingGuide = signal<boolean>(false);
  
  readonly cumulativeScore = signal<number>(0);
  readonly scoreSamplesCount = signal<number>(0);

  readonly isHarmonyActive = signal<boolean>(false);
  readonly harmonyIntervalRatio = signal<number>(1.2599); // Default Major 3rd

  readonly feedback = signal<VocalPitchFeedback>({
    isSinging: false,
    targetNote: null,
    sungNoteName: null,
    sungFrequency: 0,
    centsDifference: 0,
    accuracyScore: 0,
    isAccurate: false,
  });

  readonly vocalRange = signal<VocalRange>({
    lowestNote: null,
    lowestFrequency: 0,
    highestNote: null,
    highestFrequency: 0,
  });

  readonly errorMessage = signal<string | null>(null);
  readonly micInputLevel = signal<number>(0); // Dynamic VU meter level: 0 to 100%

  // Raw Web Audio API nodes for Pitch Detection
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private toneMic: Tone.UserMedia | null = null;
  
  private animationFrameId: number | null = null;
  private playbackTimeoutId: number | null = null;
  private readonly audioBuffer = new Float32Array(AUDIO_BUFFER_SIZE);

  // Tone.js nodes for High-Quality Audio
  private choirSampler: Tone.Sampler | null = null;
  private guitarSampler: Tone.Sampler | null = null;
  private pitchShift: Tone.PitchShift | null = null;

  async initTone(): Promise<void> {
    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    if (!this.choirSampler) {
      this.choirSampler = new Tone.Sampler({
        urls: {
          "C3": "C3.mp3",
          "C4": "C4.mp3",
          "C5": "C5.mp3"
        },
        baseUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/choir_aahs-mp3/",
        release: 1.5,
      }).toDestination();
      this.choirSampler.volume.value = -5; // Balance volume
    }

    if (!this.guitarSampler) {
      this.guitarSampler = new Tone.Sampler({
        urls: {
          "C3": "C3.mp3",
          "C4": "C4.mp3",
          "C5": "C5.mp3"
        },
        baseUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_guitar_nylon-mp3/",
        release: 2,
      }).toDestination();
    }
  }

async startMic(): Promise<void> {
    if (this.micState() === 'active' || this.micState() === 'requesting-permission') {
      return;
    }
    
    this.errorMessage.set(null);
    this.micState.set('requesting-permission');

    try {
      await this.initTone();

      if (!this.toneMic) {
        this.toneMic = new Tone.UserMedia();
      }
      
      await this.toneMic.open();

      this.audioContext = Tone.getContext().rawContext as AudioContext;
      
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = AUDIO_BUFFER_SIZE;
      this.analyser.smoothingTimeConstant = 0;

      // Connect Mic to Pitch Shift for Live Harmony
      if (!this.pitchShift) {
        this.pitchShift = new Tone.PitchShift().toDestination();
        this.pitchShift.wet.value = 0; // Muted by default
        this.pitchShift.windowSize = 0.05;
      }
      
      this.toneMic.connect(this.pitchShift);
      
      // Connect to native analyser by accessing the native node from toneMic
      // Tone.UserMedia extends ToneAudioNode, we can connect it to a native node using Tone.connect
      Tone.connect(this.toneMic, this.analyser);

      this.micState.set('active');
      this.startPitchLoop();

    } catch (err: unknown) {
      this.stopMic();
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.micState.set('denied');
        this.errorMessage.set('Permissão para o microfone foi negada pelo usuário.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        this.micState.set('error');
        this.errorMessage.set('Nenhum microfone foi encontrado.');
      } else {
        this.micState.set('error');
        this.errorMessage.set(error.message || 'Não foi possível acessar o microfone.');
      }
    }
  }

stopMic(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.stopHarmonyTone();

    if (this.toneMic) {
      this.toneMic.close();
      this.toneMic.disconnect();
    }

    this.analyser = null;

    if (this.micState() === 'active') {
      this.micState.set('stopped');
    } else if (this.micState() === 'requesting-permission') {
      this.micState.set('idle');
    }

    this.micInputLevel.set(0);
    this.feedback.set({
      isSinging: false,
      targetNote: this.feedback().targetNote,
      sungNoteName: null,
      sungFrequency: 0,
      centsDifference: 0,
      accuracyScore: 0,
      isAccurate: false,
    });
  }

  toggleHarmony(): void {
    if (this.isHarmonyActive()) {
      this.isHarmonyActive.set(false);
      this.stopHarmonyTone();
    } else {
      this.isHarmonyActive.set(true);
    }
  }

  setHarmonyInterval(ratio: number): void {
    this.harmonyIntervalRatio.set(ratio);
  }

  updateHarmonyTone(baseFrequency: number): void {
    if (!this.isHarmonyActive() || baseFrequency <= 0) {
      this.stopHarmonyTone();
      return;
    }
    
    // Live Harmony using PitchShift on user's mic input
    if (this.pitchShift && this.isMicActive()) {
      // Calculate semitones from ratio
      const semitones = 12 * Math.log2(this.harmonyIntervalRatio());
      this.pitchShift.pitch = semitones;
      this.pitchShift.wet.value = 1; // Hear the harmony!
    }
  }

  stopHarmonyTone(): void {
    if (this.pitchShift) {
      this.pitchShift.wet.value = 0;
    }
  }

  async playGuideTone(frequency: number, durationSeconds = 1.5): Promise<void> {
    await this.initTone();
    if (this.guitarSampler && this.guitarSampler.loaded) {
      this.guitarSampler.triggerAttackRelease(frequency, durationSeconds);
    }
  }

  stopGuideTone(): void {
    if (this.guitarSampler) {
      this.guitarSampler.releaseAll();
    }
  }

  async startSimulatedVocal(frequency: number, noteName: string): Promise<void> {
    await this.initTone();
    this.stopSimulatedVocal();
    
    if (this.choirSampler && this.choirSampler.loaded) {
      // Play base note
      this.choirSampler.triggerAttack(frequency);
      
      // Play harmony note if active
      if (this.isHarmonyActive()) {
        const harmFreq = frequency * this.harmonyIntervalRatio();
        this.choirSampler.triggerAttack(harmFreq);
      }
    }

    this.feedback.update(prev => ({
      ...prev,
      isSinging: true,
      sungFrequency: frequency,
      sungNoteName: noteName,
    }));
  }

  stopSimulatedVocal(): void {
    if (this.choirSampler) {
      this.choirSampler.releaseAll();
    }
    
    if (!this.isMicActive()) {
      this.feedback.update(prev => ({
        ...prev,
        isSinging: false,
        sungFrequency: 0,
        sungNoteName: null,
      }));
    }
  }

  selectExercise(exercise: VocalExercise): void {
    this.stopExercisePlayback();
    this.currentExercise.set(exercise);
    this.currentNoteIndex.set(0);
    this.cumulativeScore.set(0);
    this.scoreSamplesCount.set(0);
    this.feedback.set({
      isSinging: false,
      targetNote: exercise.notes[0] || null,
      sungNoteName: null,
      sungFrequency: 0,
      centsDifference: 0,
      accuracyScore: 0,
      isAccurate: false,
    });
  }

  startExerciseSequence(): void {
    const ex = this.currentExercise();
    if (!ex || ex.notes.length === 0) return;
    this.isPlayingGuide.set(true);
    this.currentNoteIndex.set(0);
    this.playSequenceStep(0);
  }

  stopExercisePlayback(): void {
    this.isPlayingGuide.set(false);
    this.stopGuideTone();
    if (this.playbackTimeoutId !== null) {
      clearTimeout(this.playbackTimeoutId);
      this.playbackTimeoutId = null;
    }
  }

  nextNote(): void {
    const ex = this.currentExercise();
    if (!ex) return;
    const nextIdx = (this.currentNoteIndex() + 1) % ex.notes.length;
    this.currentNoteIndex.set(nextIdx);
    const target = ex.notes[nextIdx];
    void this.playGuideTone(target.frequency, 1.2);
  }

  prevNote(): void {
    const ex = this.currentExercise();
    if (!ex) return;
    const prevIdx = (this.currentNoteIndex() - 1 + ex.notes.length) % ex.notes.length;
    this.currentNoteIndex.set(prevIdx);
    const target = ex.notes[prevIdx];
    void this.playGuideTone(target.frequency, 1.2);
  }

  resetRange(): void {
    this.vocalRange.set({
      lowestNote: null,
      lowestFrequency: 0,
      highestNote: null,
      highestFrequency: 0,
    });
  }

  ngOnDestroy(): void {
    this.stopMic();
    this.stopExercisePlayback();
    this.stopSimulatedVocal();
    this.choirSampler?.dispose();
    this.guitarSampler?.dispose();
    this.pitchShift?.dispose();
  }

  private playSequenceStep(index: number): void {
    const ex = this.currentExercise();
    if (!ex || !this.isPlayingGuide()) return;
    
    if (index >= ex.notes.length) {
      this.isPlayingGuide.set(false);
      return;
    }
    
    this.currentNoteIndex.set(index);
    const note = ex.notes[index];
    
    const secondsPerBeat = 60 / ex.bpm;
    const duration = note.durationBeats * secondsPerBeat;
    
    void this.playGuideTone(note.frequency, duration * 0.9);
    
    this.playbackTimeoutId = window.setTimeout(() => {
      this.playSequenceStep(index + 1);
    }, duration * 1000);
  }

  private getCurrentTargetNote() {
    const ex = this.currentExercise();
    if (!ex) return null;
    return ex.notes[this.currentNoteIndex()] || null;
  }

  private startPitchLoop(): void {
    const detect = () => {
      if (!this.analyser || !this.isMicActive()) return;

      this.analyser.getFloatTimeDomainData(this.audioBuffer);
      const sampleRate = this.audioContext?.sampleRate || 44100;
      
      let sumSquares = 0;
      for (const val of this.audioBuffer) {
        sumSquares += val * val;
      }
      const rms = Math.sqrt(sumSquares / this.audioBuffer.length);
      
      // Calculate normalized input volume 0-100% for the dynamic VU Meter
      const rawLevel = Math.min(100, Math.round(rms * 500));
      const currentLevel = this.micInputLevel();
      const smoothedLevel = Math.round(currentLevel * 0.25 + rawLevel * 0.75);
      this.micInputLevel.set(smoothedLevel);
      
      const pitch = this.autoCorrelate(this.audioBuffer, sampleRate, rms);
      const targetNote = this.getCurrentTargetNote();

      if (pitch > 65 && pitch < 1200) {
        const midi = 69 + 12 * Math.log2(pitch / 440);
        const roundedMidi = Math.round(midi);
        const noteIndex = ((roundedMidi % 12) + 12) % 12;
        const noteName = NOTE_NAMES[noteIndex];
        const octave = Math.floor(roundedMidi / 12) - 1;
        const sungFullName = `${noteName}${octave}`;

        let centsDiff = 0;
        let isAccurate = false;
        let accuracyScore = 0;

        if (targetNote) {
          centsDiff = Math.round(1200 * Math.log2(pitch / targetNote.frequency));
          isAccurate = Math.abs(centsDiff) <= 25;
          accuracyScore = Math.max(0, Math.min(100, Math.round(100 - Math.abs(centsDiff) * 1.5)));
          
          this.cumulativeScore.update((s) => s + accuracyScore);
          this.scoreSamplesCount.update((c) => c + 1);
        }

        this.updateVocalRange(pitch, sungFullName);

        this.feedback.set({
          isSinging: true,
          targetNote,
          sungNoteName: sungFullName,
          sungFrequency: Math.round(pitch * 10) / 10,
          centsDifference: centsDiff,
          accuracyScore,
          isAccurate,
        });

        this.updateHarmonyTone(pitch);
      } else {
        this.feedback.update((prev) => ({
          ...prev,
          isSinging: false,
          sungFrequency: 0,
        }));
        
        this.stopHarmonyTone();
      }

      this.animationFrameId = requestAnimationFrame(detect);
    };

    this.animationFrameId = requestAnimationFrame(detect);
  }

  private updateVocalRange(pitch: number, noteName: string): void {
    const range = this.vocalRange();
    let { lowestNote, lowestFrequency, highestNote, highestFrequency } = range;

    if (!lowestFrequency || pitch < lowestFrequency) {
      lowestFrequency = Math.round(pitch);
      lowestNote = noteName;
    }

    if (!highestFrequency || pitch > highestFrequency) {
      highestFrequency = Math.round(pitch);
      highestNote = noteName;
    }

    this.vocalRange.set({
      lowestNote,
      lowestFrequency,
      highestNote,
      highestFrequency,
    });
  }

  private autoCorrelate(buffer: Float32Array, sampleRate: number, rms: number): number {
    if (rms < 0.01) return -1;
    const size = buffer.length;
    const minLag = Math.floor(sampleRate / 1200);
    const maxLag = Math.floor(sampleRate / 65);
    
    let bestLag = -1;
    let maxCorrelation = 0;
    let foundTrough = false;
    let prevCorrelation = 1;

    for (let lag = minLag; lag <= maxLag; lag++) {
      let correlation = 0;
      for (let i = 0; i < size - lag; i++) {
        correlation += buffer[i] * buffer[i + lag];
      }
      correlation = correlation / (size - lag);
      const normalized = correlation / (rms * rms);

      if (!foundTrough && normalized < 0.35) {
        foundTrough = true;
      }
      if (foundTrough) {
        if (normalized > maxCorrelation && normalized > 0.72) {
          maxCorrelation = normalized;
          bestLag = lag;
        } else if (maxCorrelation > 0.72 && normalized < prevCorrelation) {
          break;
        }
      }
      prevCorrelation = normalized;
    }

    if (bestLag > 0 && maxCorrelation > 0.72) {
      const freq = sampleRate / bestLag;
      if (freq >= 65 && freq <= 1200) {
        return freq;
      }
    }
    return -1;
  }
}
