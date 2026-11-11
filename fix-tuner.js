const fs = require('fs');
const file = 'src/app/features/tuner/services/tuner-audio.service.ts';
let code = fs.readFileSync(file, 'utf8');

const regex = /  async start\(\): Promise<void> \{[\s\S]*?  stop\(\): void \{/;
const startCode = `  async start(): Promise<void> {
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

  stop(): void {`;

code = code.replace(regex, startCode);
fs.writeFileSync(file, code);
