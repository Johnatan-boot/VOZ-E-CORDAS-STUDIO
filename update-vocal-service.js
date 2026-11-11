const fs = require('fs');
const file = 'src/app/features/vocal/services/vocal-audio.service.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '  private mediaStream: MediaStream | null = null;\n  private sourceNode: MediaStreamAudioSourceNode | null = null;',
  '  private toneMic: Tone.UserMedia | null = null;'
);

const startMicReplacement = `
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
`;

const stopMicReplacement = `
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
`;

code = code.replace(/  async startMic\(\): Promise<void> \{[\s\S]*?    \} catch \(err: unknown\) \{[\s\S]*?    \}\n  \}/, startMicReplacement.trim());
code = code.replace(/  stopMic\(\): void \{[\s\S]*?    \}\n  \}/, stopMicReplacement.trim());

fs.writeFileSync(file, code);
console.log('Updated vocal service');
