import { Injectable, OnDestroy, signal } from '@angular/core';
import * as Tone from 'tone';
import {
  A4_REFERENCE_HERTZ,
  AUDIO_BUFFER_SIZE,
  GUITAR_STRINGS,
  MAX_DETECTION_FREQUENCY_HZ,
  MIN_DETECTION_FREQUENCY_HZ,
  MIN_SIGNAL_THRESHOLD_RMS,
  NOTE_NAMES,
  TUNED_THRESHOLD_CENTS,
} from '../data/tuner.data';
import {
  DetectedNote,
  MicrophoneState,
  TuningStatus,
} from '../models/tuner.model';

@Injectable({
  providedIn: 'root',
})
export class TunerAudioService implements OnDestroy {
  readonly micState = signal<MicrophoneState>('idle');
  readonly detectedNote = signal<DetectedNote | null>(null);
  readonly tuningStatus = signal<TuningStatus>('unknown');
  readonly frequency = signal<number>(0);
  readonly cents = signal<number>(0);
  readonly signalLevel = signal<number>(0);
  readonly errorMessage = signal<string | null>(null);
  readonly activePlayingString = signal<number | null>(null);

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private zeroGain: GainNode | null = null;
  private animationFrameId: number | null = null;
  private readonly audioBuffer = new Float32Array(AUDIO_BUFFER_SIZE);

  // Consecutive frames counter for smoothing silence transitions
  private silentFramesCount = 0;
  private simulationTimeoutId: number | null = null;

  // Tone.js guitar sampler for reference notes
  private guitarSampler: Tone.Sampler | null = null;

  private async ensureTone(): Promise<void> {
    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    if (!this.guitarSampler) {
      this.guitarSampler = new Tone.Sampler({
        urls: {
          'E2': 'E2.mp3',
          'A2': 'A2.mp3',
          'D3': 'D3.mp3',
          'G3': 'G3.mp3',
          'B3': 'B3.mp3',
          'E4': 'E4.mp3',
        },
        baseUrl: 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_guitar_nylon-mp3/',
        release: 2,
      }).toDestination();
    }
  }

  /**
   * Toca o som acústico de referência da corda de violão selecionada.
   */
  async playReferenceString(stringNum: number): Promise<void> {
    const stringInfo = GUITAR_STRINGS.find((s) => s.num === stringNum);
    if (!stringInfo) return;

    this.activePlayingString.set(stringNum);

    try {
      await this.ensureTone();
      if (this.guitarSampler && this.guitarSampler.loaded) {
        this.guitarSampler.triggerAttackRelease(stringInfo.freq, 2.5);
      } else {
        // Síntese acústica imediata de fallback
        this.playSyntheticGuitarPluck(stringInfo.freq, 2.0);
      }
    } catch {
      this.playSyntheticGuitarPluck(stringInfo.freq, 2.0);
    }

    setTimeout(() => {
      if (this.activePlayingString() === stringNum) {
        this.activePlayingString.set(null);
      }
    }, 2500);
  }

  /**
   * Simula a afinação da corda na interface para testes rápidos sem microfone.
   */
  async simulateStringTuning(stringNum: number, centsOffset = 0): Promise<void> {
    const stringInfo = GUITAR_STRINGS.find((s) => s.num === stringNum);
    if (!stringInfo) return;

    if (this.simulationTimeoutId !== null) {
      clearTimeout(this.simulationTimeoutId);
      this.simulationTimeoutId = null;
    }

    // Toca o som da corda
    void this.playReferenceString(stringNum);

    // Calcula a frequência com o desvio em cents
    const simFreq = stringInfo.freq * Math.pow(2, centsOffset / 1200);

    // Atualiza o afinador visual imediatamente
    this.processDetectedPitch(simFreq);
    this.signalLevel.set(0.75);

    // Mantém ativo por 3 segundos simulando o decaimento natural da corda
    this.simulationTimeoutId = window.setTimeout(() => {
      if (this.micState() !== 'active') {
        this.detectedNote.set(null);
        this.tuningStatus.set('unknown');
        this.frequency.set(0);
        this.cents.set(0);
        this.signalLevel.set(0);
      }
      this.simulationTimeoutId = null;
    }, 3000);
  }

  private playSyntheticGuitarPluck(frequency: number, duration = 2.0): void {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 4, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);

    setTimeout(() => {
      try {
        void ctx.close();
      } catch {
        // Ignora erro de fechamento de contexto
      }
    }, (duration + 0.1) * 1000);
  }

  async start(): Promise<void> {
    if (this.micState() === 'active' || this.micState() === 'requesting-permission') {
      return;
    }

    this.errorMessage.set(null);
    this.micState.set('requesting-permission');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Web Audio / MediaDevices API não é suportada neste navegador.');
      }

      // 1. Tenta obter o microfone com configurações ideais para instrumentos, com fallback seguro
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      this.mediaStream = stream;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = AUDIO_BUFFER_SIZE;
      this.analyser.smoothingTimeConstant = 0.05;

      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.sourceNode.connect(this.analyser);

      // Conexão silenciosa com destination para garantir que o Chrome/Safari mantenha o pipeline ativo
      this.zeroGain = this.audioContext.createGain();
      this.zeroGain.gain.value = 0;
      this.analyser.connect(this.zeroGain);
      this.zeroGain.connect(this.audioContext.destination);

      this.micState.set('active');
      this.startPitchDetectionLoop();
    } catch (err: unknown) {
      this.stop();
      console.error('TunerAudioService start error:', err);
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.micState.set('denied');
        this.errorMessage.set('Permissão para o microfone foi negada. Verifique as configurações do navegador ou o cadeado na barra de endereços.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        this.micState.set('error');
        this.errorMessage.set('Nenhum microfone encontrado. Conecte um microfone e tente novamente.');
      } else {
        this.micState.set('error');
        this.errorMessage.set(error.message || 'Falha ao iniciar o microfone.');
      }
    }
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.zeroGain) {
      try {
        this.zeroGain.disconnect();
      } catch {
        // Ignora erro de desconexao
      }
      this.zeroGain = null;
    }

    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch {
        // Ignora erro de desconexao
      }
      this.sourceNode = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      try {
        if (this.audioContext.state !== 'closed') {
          void this.audioContext.close();
        }
      } catch {
        // Ignora erro de fechamento
      }
      this.audioContext = null;
    }

    this.analyser = null;
    this.detectedNote.set(null);
    this.tuningStatus.set('unknown');
    this.frequency.set(0);
    this.cents.set(0);
    this.signalLevel.set(0);

    if (this.micState() === 'active') {
      this.micState.set('stopped');
    } else if (this.micState() === 'requesting-permission') {
      this.micState.set('idle');
    }
  }

  ngOnDestroy(): void {
    this.stop();
    if (this.simulationTimeoutId !== null) {
      clearTimeout(this.simulationTimeoutId);
      this.simulationTimeoutId = null;
    }
    this.guitarSampler?.dispose();
  }

  private startPitchDetectionLoop(): void {
    const detect = () => {
      if (!this.analyser || this.micState() !== 'active') {
        return;
      }

      this.analyser.getFloatTimeDomainData(this.audioBuffer);
      const sampleRate = this.audioContext?.sampleRate || 44100;

      // 1. Calcula RMS Level para feedback do medidor de volume do microfone
      let sumSquares = 0;
      for (const val of this.audioBuffer) {
        sumSquares += val * val;
      }
      const rms = Math.sqrt(sumSquares / this.audioBuffer.length);
      const normalizedSignal = Math.min(1, rms * 15);
      this.signalLevel.set(normalizedSignal);

      // 2. Executa autocorrelação otimizada para instrumentos acústicos
      const pitch = this.autoCorrelate(this.audioBuffer, sampleRate, rms);

      if (pitch > 0) {
        this.silentFramesCount = 0;
        this.processDetectedPitch(pitch);
      } else {
        this.silentFramesCount++;
        // Mantém a última nota por ~18 quadros (~300ms) para acomodar o decaimento natural das cordas do violão
        if (this.silentFramesCount > 18) {
          this.detectedNote.set(null);
          this.tuningStatus.set('unknown');
          this.frequency.set(0);
          this.cents.set(0);
        }
      }

      this.animationFrameId = requestAnimationFrame(detect);
    };

    this.animationFrameId = requestAnimationFrame(detect);
  }

  private autoCorrelate(buffer: Float32Array, sampleRate: number, rms: number): number {
    if (rms < MIN_SIGNAL_THRESHOLD_RMS) {
      return -1;
    }

    const size = buffer.length;
    const minLag = Math.floor(sampleRate / MAX_DETECTION_FREQUENCY_HZ);
    const maxLag = Math.floor(sampleRate / MIN_DETECTION_FREQUENCY_HZ);

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
      const normalizedCorrelation = correlation / (rms * rms);

      // Detecta vale (trough): quando a correlação desce ou atinge mínimo local
      if (!foundTrough) {
        if (normalizedCorrelation < 0.55 || (lag > minLag && correlation > prevCorrelation && normalizedCorrelation < 0.85)) {
          foundTrough = true;
        }
      }

      if (foundTrough) {
        if (normalizedCorrelation > maxCorrelation && normalizedCorrelation > 0.65) {
          maxCorrelation = normalizedCorrelation;
          bestLag = lag;
        } else if (maxCorrelation > 0.65 && normalizedCorrelation < prevCorrelation) {
          // Pico alcançado
          break;
        }
      }
      prevCorrelation = normalizedCorrelation;
    }

    if (bestLag > 0 && maxCorrelation > 0.65) {
      // Interpolação parabólica para precisão sub-centésimo
      let cPrev = 0;
      let cNext = 0;
      const lagMinus = bestLag - 1;
      const lagPlus = bestLag + 1;

      for (let i = 0; i < size - lagMinus; i++) {
        cPrev += buffer[i] * buffer[i + lagMinus];
      }
      cPrev = cPrev / (size - lagMinus);

      for (let i = 0; i < size - lagPlus; i++) {
        cNext += buffer[i] * buffer[i + lagPlus];
      }
      cNext = cNext / (size - lagPlus);

      const denom = 2 * (2 * (maxCorrelation * rms * rms) - cPrev - cNext);
      const delta = denom !== 0 ? (cNext - cPrev) / denom : 0;
      const trueLag = bestLag + (Math.abs(delta) < 1 ? delta : 0);

      const freq = sampleRate / trueLag;
      if (freq >= MIN_DETECTION_FREQUENCY_HZ && freq <= MAX_DETECTION_FREQUENCY_HZ) {
        return freq;
      }
    }

    return -1;
  }

  private processDetectedPitch(freq: number): void {
    // MIDI formula: 69 + 12 * log2(f / 440)
    const midi = 69 + 12 * Math.log2(freq / A4_REFERENCE_HERTZ);
    const roundedMidi = Math.round(midi);

    // Nome da nota e oitava
    const noteIndex = ((roundedMidi % 12) + 12) % 12;
    const noteName = NOTE_NAMES[noteIndex];
    const octave = Math.floor(roundedMidi / 12) - 1;
    const fullName = `${noteName}${octave}`;

    // Frequência alvo e desvio em cents: 1200 * log2(f / targetFreq)
    const targetFrequency = A4_REFERENCE_HERTZ * Math.pow(2, (roundedMidi - 69) / 12);
    const cents = Math.round(1200 * Math.log2(freq / targetFrequency));

    // Determina status de afinação
    let status: TuningStatus;
    if (Math.abs(cents) <= TUNED_THRESHOLD_CENTS) {
      status = 'tuned';
    } else if (cents < -TUNED_THRESHOLD_CENTS) {
      status = 'flat';
    } else {
      status = 'sharp';
    }

    const noteData: DetectedNote = {
      name: noteName,
      fullName,
      frequency: Math.round(freq * 10) / 10,
      targetFrequency: Math.round(targetFrequency * 10) / 10,
      octave,
      cents,
      midi: roundedMidi,
    };

    this.detectedNote.set(noteData);
    this.tuningStatus.set(status);
    this.frequency.set(noteData.frequency);
    this.cents.set(cents);
  }
}
