export interface VocalNoteHarmony {
  readonly note: string;           // Cifra, ex: 'C4'
  readonly noteNamePt: string;     // Nome em português, ex: 'Dó 4'
  readonly solfege: string;        // 'Dó'
  readonly pitchClass: string;     // 'C'
  readonly octave: number;         // 4
  readonly frequency: number;      // 261.63
  readonly vocalRangeType: 'Baixo' | 'Barítono' | 'Tenor' | 'Contralto' | 'Mezzo-Soprano' | 'Soprano';

  // Harmonias quando esta nota é cantada como 1ª VOZ:
  readonly secondVoiceThirdAbove: {
    readonly note: string;
    readonly namePt: string;
    readonly frequency: number;
    readonly interval: string;
    readonly description: string;
  };
  readonly secondVoiceMinorThirdAbove: {
    readonly note: string;
    readonly namePt: string;
    readonly frequency: number;
    readonly interval: string;
    readonly description: string;
  };
  readonly secondVoiceThirdBelow: {
    readonly note: string;
    readonly namePt: string;
    readonly frequency: number;
    readonly interval: string;
    readonly description: string;
  };
  readonly secondVoiceFifthAbove: {
    readonly note: string;
    readonly namePt: string;
    readonly frequency: number;
    readonly interval: string;
    readonly description: string;
  };
  readonly secondVoiceSixthAbove: {
    readonly note: string;
    readonly namePt: string;
    readonly frequency: number;
    readonly interval: string;
    readonly description: string;
  };

  // Resolução quando esta nota é cantada como 2ª VOZ:
  readonly firstVoiceReference: {
    readonly asThirdAbove: { readonly note: string; readonly namePt: string; readonly frequency: number };
    readonly asThirdBelow: { readonly note: string; readonly namePt: string; readonly frequency: number };
    readonly asFifthAbove: { readonly note: string; readonly namePt: string; readonly frequency: number };
  };
}

export interface ScaleDuoNote {
  readonly degree: string;         // 'I', 'II', 'III', etc.
  readonly firstVoiceNote: string; // 'G3'
  readonly firstVoicePt: string;   // 'Sol 3'
  readonly firstVoiceFreq: number; // 196.00
  readonly secondVoiceNote: string;// 'B3'
  readonly secondVoicePt: string;  // 'Si 3'
  readonly secondVoiceFreq: number;// 246.94
  readonly interval: string;       // 'Terça Maior'
  readonly functionName: string;   // 'Tônica', 'Dominante', etc.
}

export interface ScaleDuoItem {
  readonly key: string;            // 'G Maior'
  readonly description: string;    // 'Tom clássico sertanejo e caipira'
  readonly notes: readonly ScaleDuoNote[];
}

export interface RepertoireDuoNote {
  readonly syllable: string;       // 'nes-'
  readonly word: string;           // 'nessa'
  readonly firstVoiceNote: string; // 'A3'
  readonly firstVoicePt: string;   // 'Lá 3'
  readonly firstVoiceFreq: number; // 220.00
  readonly secondVoiceNote: string;// 'C#4'
  readonly secondVoicePt: string;  // 'Dó# 4'
  readonly secondVoiceFreq: number;// 277.18
  readonly interval: string;       // 'Terça Maior'
  readonly durationBeats: number;
}

export interface RepertoireDuoSong {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly keySignature: string;
  readonly bpm: number;
  readonly excerpt: string;
  readonly tips: string;
  readonly phraseNotes: readonly RepertoireDuoNote[];
}

// Helpers para cálculo exato de frequências e notas
const SEMITONE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
const PT_NAMES: Record<string, string> = {
  'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
  'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
};

function midiToFrequency(midi: number): number {
  return Math.round(440 * Math.pow(2, (midi - 69) / 12) * 100) / 100;
}

function midiToNoteInfo(midi: number): { note: string; namePt: string; frequency: number } {
  const noteIndex = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  const pitch = SEMITONE_NAMES[noteIndex];
  const note = `${pitch}${octave}`;
  const namePt = `${PT_NAMES[pitch]} ${octave}`;
  const frequency = midiToFrequency(midi);
  return { note, namePt, frequency };
}

function getRangeType(octave: number, noteIndex: number): VocalNoteHarmony['vocalRangeType'] {
  const semitones = octave * 12 + noteIndex;
  // C2 = 36, C3 = 48, C4 = 60, C5 = 72, C6 = 84
  if (semitones < 45) return 'Baixo';
  if (semitones < 53) return 'Barítono';
  if (semitones < 60) return 'Tenor';
  if (semitones < 67) return 'Contralto';
  if (semitones < 76) return 'Mezzo-Soprano';
  return 'Soprano';
}

function buildVocalNotes(): VocalNoteHarmony[] {
  const list: VocalNoteHarmony[] = [];

  // Gera todas as notas de C2 (MIDI 36) até C6 (MIDI 84)
  for (let midi = 36; midi <= 84; midi++) {
    const noteIndex = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    const pitch = SEMITONE_NAMES[noteIndex];
    const note = `${pitch}${octave}`;
    const namePt = `${PT_NAMES[pitch]} ${octave}`;
    const solfege = PT_NAMES[pitch];
    const frequency = midiToFrequency(midi);
    const vocalRangeType = getRangeType(octave, noteIndex);

    // Harmonias quando é 1ª Voz:
    // Terça Maior Acima (+4 semitons)
    const thirdAboveInfo = midiToNoteInfo(midi + 4);
    // Terça Menor Acima (+3 semitons)
    const minorThirdAboveInfo = midiToNoteInfo(midi + 3);
    // Terça Menor Abaixo (-3 semitons)
    const thirdBelowInfo = midiToNoteInfo(midi - 3);
    // Quinta Justa (+7 semitons)
    const fifthAboveInfo = midiToNoteInfo(midi + 7);
    // Sexta Maior (+9 semitons)
    const sixthAboveInfo = midiToNoteInfo(midi + 9);

    // Resoluções se cantada como 2ª Voz:
    // Se a 2ª voz canta esta nota e ela for a terça maior da 1ª voz, a 1ª voz está 4 semitons abaixo:
    const asThirdAbove = midiToNoteInfo(midi - 4);
    // Se for a terça abaixo da 1ª voz, a 1ª voz está 3 semitons acima:
    const asThirdBelow = midiToNoteInfo(midi + 3);
    // Se for a quinta da 1ª voz, a 1ª voz está 7 semitons abaixo:
    const asFifthAbove = midiToNoteInfo(midi - 7);

    list.push({
      note,
      noteNamePt: namePt,
      solfege,
      pitchClass: pitch,
      octave,
      frequency,
      vocalRangeType,
      secondVoiceThirdAbove: {
        note: thirdAboveInfo.note,
        namePt: thirdAboveInfo.namePt,
        frequency: thirdAboveInfo.frequency,
        interval: '3ª Maior (+4 semitons)',
        description: 'Harmonia clássica de dueto (brilhante e aberta)'
      },
      secondVoiceMinorThirdAbove: {
        note: minorThirdAboveInfo.note,
        namePt: minorThirdAboveInfo.namePt,
        frequency: minorThirdAboveInfo.frequency,
        interval: '3ª Menor (+3 semitons)',
        description: 'Harmonia lírica em escala menor'
      },
      secondVoiceThirdBelow: {
        note: thirdBelowInfo.note,
        namePt: thirdBelowInfo.namePt,
        frequency: thirdBelowInfo.frequency,
        interval: '3ª Abaixo (-3 semitons)',
        description: 'Segunda voz grave tradicional sertaneja'
      },
      secondVoiceFifthAbove: {
        note: fifthAboveInfo.note,
        namePt: fifthAboveInfo.namePt,
        frequency: fifthAboveInfo.frequency,
        interval: '5ª Justa (+7 semitons)',
        description: 'Harmonia potente de sustentação e coral'
      },
      secondVoiceSixthAbove: {
        note: sixthAboveInfo.note,
        namePt: sixthAboveInfo.namePt,
        frequency: sixthAboveInfo.frequency,
        interval: '6ª Maior (+9 semitons)',
        description: 'Harmonia suave e melódica'
      },
      firstVoiceReference: {
        asThirdAbove,
        asThirdBelow,
        asFifthAbove
      }
    });
  }

  return list;
}

export const ALL_VOCAL_NOTES: readonly VocalNoteHarmony[] = buildVocalNotes();

export const DUO_SCALES: readonly ScaleDuoItem[] = [
  {
    key: 'G Maior (Sol)',
    description: 'A tonalidade mais consagrada da música sertaneja e duplas caipiras.',
    notes: [
      { degree: 'I', firstVoiceNote: 'G3', firstVoicePt: 'Sol 3', firstVoiceFreq: 196.00, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Maior', functionName: 'Tônica' },
      { degree: 'II', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C4', secondVoicePt: 'Dó 4', secondVoiceFreq: 261.63, interval: '3ª Menor', functionName: 'Supertônica' },
      { degree: 'III', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', functionName: 'Mediante' },
      { degree: 'IV', firstVoiceNote: 'C4', firstVoicePt: 'Dó 4', firstVoiceFreq: 261.63, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Maior', functionName: 'Subdominante' },
      { degree: 'V', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', functionName: 'Dominante' },
      { degree: 'VI', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G4', secondVoicePt: 'Sol 4', secondVoiceFreq: 392.00, interval: '3ª Menor', functionName: 'Sobredominante' },
      { degree: 'VII', firstVoiceNote: 'F#4', firstVoicePt: 'Fá# 4', firstVoiceFreq: 369.99, secondVoiceNote: 'A4', secondVoicePt: 'Lá 4', secondVoiceFreq: 440.00, interval: '3ª Menor', functionName: 'Sensível' },
      { degree: 'VIII', firstVoiceNote: 'G4', firstVoicePt: 'Sol 4', firstVoiceFreq: 392.00, secondVoiceNote: 'B4', secondVoicePt: 'Si 4', secondVoiceFreq: 493.88, interval: '3ª Maior', functionName: 'Oitava' }
    ]
  },
  {
    key: 'C Maior (Dó)',
    description: 'Tom de referência diatônico universal sem acidentes na clave.',
    notes: [
      { degree: 'I', firstVoiceNote: 'C4', firstVoicePt: 'Dó 4', firstVoiceFreq: 261.63, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Maior', functionName: 'Tônica' },
      { degree: 'II', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F4', secondVoicePt: 'Fá 4', secondVoiceFreq: 349.23, interval: '3ª Menor', functionName: 'Supertônica' },
      { degree: 'III', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G4', secondVoicePt: 'Sol 4', secondVoiceFreq: 392.00, interval: '3ª Menor', functionName: 'Mediante' },
      { degree: 'IV', firstVoiceNote: 'F4', firstVoicePt: 'Fá 4', firstVoiceFreq: 349.23, secondVoiceNote: 'A4', secondVoicePt: 'Lá 4', secondVoiceFreq: 440.00, interval: '3ª Maior', functionName: 'Subdominante' },
      { degree: 'V', firstVoiceNote: 'G4', firstVoicePt: 'Sol 4', firstVoiceFreq: 392.00, secondVoiceNote: 'B4', secondVoicePt: 'Si 4', secondVoiceFreq: 493.88, interval: '3ª Maior', functionName: 'Dominante' },
      { degree: 'VI', firstVoiceNote: 'A4', firstVoicePt: 'Lá 4', firstVoiceFreq: 440.00, secondVoiceNote: 'C5', secondVoicePt: 'Dó 5', secondVoiceFreq: 523.25, interval: '3ª Menor', functionName: 'Sobredominante' },
      { degree: 'VII', firstVoiceNote: 'B4', firstVoicePt: 'Si 4', firstVoiceFreq: 493.88, secondVoiceNote: 'D5', secondVoicePt: 'Ré 5', secondVoiceFreq: 587.33, interval: '3ª Menor', functionName: 'Sensível' },
      { degree: 'VIII', firstVoiceNote: 'C5', firstVoicePt: 'Dó 5', firstVoiceFreq: 523.25, secondVoiceNote: 'E5', secondVoicePt: 'Mi 5', secondVoiceFreq: 659.25, interval: '3ª Maior', functionName: 'Oitava' }
    ]
  },
  {
    key: 'E Maior (Mi)',
    description: 'Tom brilhante com ressonância profunda nas cordas soltas do violão.',
    notes: [
      { degree: 'I', firstVoiceNote: 'E3', firstVoicePt: 'Mi 3', firstVoiceFreq: 164.81, secondVoiceNote: 'G#3', secondVoicePt: 'Sol# 3', secondVoiceFreq: 207.65, interval: '3ª Maior', functionName: 'Tônica' },
      { degree: 'II', firstVoiceNote: 'F#3', firstVoicePt: 'Fá# 3', firstVoiceFreq: 185.00, secondVoiceNote: 'A3', secondVoicePt: 'Lá 3', secondVoiceFreq: 220.00, interval: '3ª Menor', functionName: 'Supertônica' },
      { degree: 'III', firstVoiceNote: 'G#3', firstVoicePt: 'Sol# 3', firstVoiceFreq: 207.65, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Menor', functionName: 'Mediante' },
      { degree: 'IV', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C#4', secondVoicePt: 'Dó# 4', secondVoiceFreq: 277.18, interval: '3ª Maior', functionName: 'Subdominante' },
      { degree: 'V', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D#4', secondVoicePt: 'Ré# 4', secondVoiceFreq: 311.13, interval: '3ª Maior', functionName: 'Dominante' },
      { degree: 'VI', firstVoiceNote: 'C#4', firstVoicePt: 'Dó# 4', firstVoiceFreq: 277.18, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Menor', functionName: 'Sobredominante' },
      { degree: 'VII', firstVoiceNote: 'D#4', firstVoicePt: 'Ré# 4', firstVoiceFreq: 311.13, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Menor', functionName: 'Sensível' },
      { degree: 'VIII', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G#4', secondVoicePt: 'Sol# 4', secondVoiceFreq: 415.30, interval: '3ª Maior', functionName: 'Oitava' }
    ]
  },
  {
    key: 'A Maior (Lá)',
    description: 'Muito usado em duetos românticos, voz sertaneja e pop acústico.',
    notes: [
      { degree: 'I', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C#4', secondVoicePt: 'Dó# 4', secondVoiceFreq: 277.18, interval: '3ª Maior', functionName: 'Tônica' },
      { degree: 'II', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', functionName: 'Supertônica' },
      { degree: 'III', firstVoiceNote: 'C#4', firstVoicePt: 'Dó# 4', firstVoiceFreq: 277.18, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Menor', functionName: 'Mediante' },
      { degree: 'IV', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', functionName: 'Subdominante' },
      { degree: 'V', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G#4', secondVoicePt: 'Sol# 4', secondVoiceFreq: 415.30, interval: '3ª Maior', functionName: 'Dominante' },
      { degree: 'VI', firstVoiceNote: 'F#4', firstVoicePt: 'Fá# 4', firstVoiceFreq: 369.99, secondVoiceNote: 'A4', secondVoicePt: 'Lá 4', secondVoiceFreq: 440.00, interval: '3ª Menor', functionName: 'Sobredominante' },
      { degree: 'VII', firstVoiceNote: 'G#4', firstVoicePt: 'Sol# 4', firstVoiceFreq: 415.30, secondVoiceNote: 'B4', secondVoicePt: 'Si 4', secondVoiceFreq: 493.88, interval: '3ª Menor', functionName: 'Sensível' },
      { degree: 'VIII', firstVoiceNote: 'A4', firstVoicePt: 'Lá 4', firstVoiceFreq: 440.00, secondVoiceNote: 'C#5', secondVoicePt: 'Dó# 5', secondVoiceFreq: 554.37, interval: '3ª Maior', functionName: 'Oitava' }
    ]
  },
  {
    key: 'D Maior (Ré)',
    description: 'Tom vibrante e alegre, excelente para vozes masculinas médias e duetos femininos.',
    notes: [
      { degree: 'I', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', functionName: 'Tônica' },
      { degree: 'II', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G4', secondVoicePt: 'Sol 4', secondVoiceFreq: 392.00, interval: '3ª Menor', functionName: 'Supertônica' },
      { degree: 'III', firstVoiceNote: 'F#4', firstVoicePt: 'Fá# 4', firstVoiceFreq: 369.99, secondVoiceNote: 'A4', secondVoicePt: 'Lá 4', secondVoiceFreq: 440.00, interval: '3ª Menor', functionName: 'Mediante' },
      { degree: 'IV', firstVoiceNote: 'G4', firstVoicePt: 'Sol 4', firstVoiceFreq: 392.00, secondVoiceNote: 'B4', secondVoicePt: 'Si 4', secondVoiceFreq: 493.88, interval: '3ª Maior', functionName: 'Subdominante' },
      { degree: 'V', firstVoiceNote: 'A4', firstVoicePt: 'Lá 4', firstVoiceFreq: 440.00, secondVoiceNote: 'C#5', secondVoicePt: 'Dó# 5', secondVoiceFreq: 554.37, interval: '3ª Maior', functionName: 'Dominante' },
      { degree: 'VI', firstVoiceNote: 'B4', firstVoicePt: 'Si 4', firstVoiceFreq: 493.88, secondVoiceNote: 'D5', secondVoicePt: 'Ré 5', secondVoiceFreq: 587.33, interval: '3ª Menor', functionName: 'Sobredominante' },
      { degree: 'VII', firstVoiceNote: 'C#5', firstVoicePt: 'Dó# 5', firstVoiceFreq: 554.37, secondVoiceNote: 'E5', secondVoicePt: 'Mi 5', secondVoiceFreq: 659.25, interval: '3ª Menor', functionName: 'Sensível' },
      { degree: 'VIII', firstVoiceNote: 'D5', firstVoicePt: 'Ré 5', firstVoiceFreq: 587.33, secondVoiceNote: 'F#5', secondVoicePt: 'Fá# 5', secondVoiceFreq: 739.99, interval: '3ª Maior', functionName: 'Oitava' }
    ]
  }
];

export const DUO_REPERTOIRE_SONGS: readonly RepertoireDuoSong[] = [
  {
    id: 'evidencias-refrao',
    title: 'Evidências (Refrão)',
    artist: 'Chitãozinho & Xororó',
    keySignature: 'E Maior',
    bpm: 78,
    excerpt: 'E nessa loucura de dizer que não te quero...',
    tips: 'A 1ª Voz canta a linha expressiva principal enquanto a 2ª Voz sustenta a harmonia em terças precisas com vibrato controlado.',
    phraseNotes: [
      { syllable: 'E', word: 'E', firstVoiceNote: 'G#3', firstVoicePt: 'Sol# 3', firstVoiceFreq: 207.65, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'nes-', word: 'nessa', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C#4', secondVoicePt: 'Dó# 4', secondVoiceFreq: 277.18, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'sa', word: 'nessa', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D#4', secondVoicePt: 'Ré# 4', secondVoiceFreq: 311.13, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'lou-', word: 'loucura', firstVoiceNote: 'C#4', firstVoicePt: 'Dó# 4', firstVoiceFreq: 277.18, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Menor', durationBeats: 1.5 },
      { syllable: 'cu-', word: 'loucura', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D#4', secondVoicePt: 'Ré# 4', secondVoiceFreq: 311.13, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'ra', word: 'loucura', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C#4', secondVoicePt: 'Dó# 4', secondVoiceFreq: 277.18, interval: '3ª Maior', durationBeats: 1.5 },
      { syllable: 'de', word: 'de', firstVoiceNote: 'G#3', firstVoicePt: 'Sol# 3', firstVoiceFreq: 207.65, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'di-', word: 'dizer', firstVoiceNote: 'F#3', firstVoicePt: 'Fá# 3', firstVoiceFreq: 185.00, secondVoiceNote: 'A3', secondVoicePt: 'Lá 3', secondVoiceFreq: 220.00, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'zer', word: 'dizer', firstVoiceNote: 'G#3', firstVoicePt: 'Sol# 3', firstVoiceFreq: 207.65, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Menor', durationBeats: 2 }
    ]
  },
  {
    id: 'fio-de-cabelo',
    title: 'Fio de Cabelo (Frase de Abertura)',
    artist: 'Chitãozinho & Xororó',
    keySignature: 'A Maior',
    bpm: 72,
    excerpt: 'Quando a gente ama qualquer coisa serve para relembrar...',
    tips: 'Atenção aos melismas sertanejos rápidos e à afinação perfeita na terça maior sustentada.',
    phraseNotes: [
      { syllable: 'Quan-', word: 'Quando', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C#4', secondVoicePt: 'Dó# 4', secondVoiceFreq: 277.18, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'do a', word: 'a', firstVoiceNote: 'C#4', firstVoicePt: 'Dó# 4', firstVoiceFreq: 277.18, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'gen-', word: 'gente', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G#4', secondVoicePt: 'Sol# 4', secondVoiceFreq: 415.30, interval: '3ª Maior', durationBeats: 1.5 },
      { syllable: 'te', word: 'gente', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'a-', word: 'ama', firstVoiceNote: 'C#4', firstVoicePt: 'Dó# 4', firstVoiceFreq: 277.18, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Menor', durationBeats: 2 },
      { syllable: 'ma', word: 'ama', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', durationBeats: 2 }
    ]
  },
  {
    id: 'boate-azul',
    title: 'Boate Azul (Dueto Menor)',
    artist: 'Joaquim & Manuel / Clássico Sertanejo',
    keySignature: 'A Menor (Am)',
    bpm: 76,
    excerpt: 'Sair de que jeito, se eu nem sei o rumo para onde vou...',
    tips: 'Trabalho de intervalos menores melancólicos em terça e quinta justa com apoio na voz de peito.',
    phraseNotes: [
      { syllable: 'Sa-', word: 'Sair', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C4', secondVoicePt: 'Dó 4', secondVoiceFreq: 261.63, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'ir', word: 'Sair', firstVoiceNote: 'C4', firstVoicePt: 'Dó 4', firstVoiceFreq: 261.63, secondVoiceNote: 'E4', secondVoicePt: 'Mi 4', secondVoiceFreq: 329.63, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'de', word: 'de', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'que', word: 'que', firstVoiceNote: 'A3', firstVoicePt: 'Lá 3', firstVoiceFreq: 220.00, secondVoiceNote: 'C4', secondVoicePt: 'Dó 4', secondVoiceFreq: 261.63, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'jei-', word: 'jeito', firstVoiceNote: 'G#3', firstVoicePt: 'Sol# 3', firstVoiceFreq: 207.65, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Menor', durationBeats: 1.5 },
      { syllable: 'to', word: 'jeito', firstVoiceNote: 'E3', firstVoicePt: 'Mi 3', firstVoiceFreq: 164.81, secondVoiceNote: 'G#3', secondVoicePt: 'Sol# 3', secondVoiceFreq: 207.65, interval: '3ª Maior', durationBeats: 2 }
    ]
  },
  {
    id: 'telefone-mudo',
    title: 'Telefone Mudo (Terças Paralelas)',
    artist: 'Trio Parada Dura',
    keySignature: 'G Maior',
    bpm: 84,
    excerpt: 'Eu quero que risque o meu nome da sua agenda...',
    tips: 'Terças paralelas corridas em ritmo de guarânia sertaneja com ataque firme na 1ª voz e projeção limpa na 2ª voz.',
    phraseNotes: [
      { syllable: 'Eu', word: 'Eu', firstVoiceNote: 'G3', firstVoicePt: 'Sol 3', firstVoiceFreq: 196.00, secondVoiceNote: 'B3', secondVoicePt: 'Si 3', secondVoiceFreq: 246.94, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'que-', word: 'quero', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'ro', word: 'quero', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', durationBeats: 1 },
      { syllable: 'que', word: 'que', firstVoiceNote: 'E4', firstVoicePt: 'Mi 4', firstVoiceFreq: 329.63, secondVoiceNote: 'G4', secondVoicePt: 'Sol 4', secondVoiceFreq: 392.00, interval: '3ª Menor', durationBeats: 1 },
      { syllable: 'ris-', word: 'risque', firstVoiceNote: 'D4', firstVoicePt: 'Ré 4', firstVoiceFreq: 293.66, secondVoiceNote: 'F#4', secondVoicePt: 'Fá# 4', secondVoiceFreq: 369.99, interval: '3ª Maior', durationBeats: 1.5 },
      { syllable: 'que', word: 'risque', firstVoiceNote: 'B3', firstVoicePt: 'Si 3', firstVoiceFreq: 246.94, secondVoiceNote: 'D4', secondVoicePt: 'Ré 4', secondVoiceFreq: 293.66, interval: '3ª Menor', durationBeats: 2 }
    ]
  }
];
