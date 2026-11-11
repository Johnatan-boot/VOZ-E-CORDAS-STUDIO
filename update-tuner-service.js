const fs = require('fs');
const file = 'src/app/features/tuner/services/tuner-audio.service.ts';
let code = fs.readFileSync(file, 'utf8');

const catchReplacement = `
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
`;

code = code.replace(/    \} catch \(err: unknown\) \{[\s\S]*?    \}/, catchReplacement.trim());
fs.writeFileSync(file, code);
console.log('Updated tuner service');
