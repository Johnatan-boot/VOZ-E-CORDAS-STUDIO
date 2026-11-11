export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export const A4_REFERENCE_HERTZ = 440;
export const TUNED_THRESHOLD_CENTS = 10;
export const METER_MIN_CENTS = -50;
export const METER_MAX_CENTS = 50;
export const AUDIO_BUFFER_SIZE = 2048;
export const MIN_SIGNAL_THRESHOLD_RMS = 0.003;
export const MIN_DETECTION_FREQUENCY_HZ = 55;
export const MAX_DETECTION_FREQUENCY_HZ = 1400;

export interface GuitarStringInfo {
  readonly num: number;
  readonly name: string;
  readonly note: string;
  readonly octave: number;
  readonly freq: number;
  readonly label: string;
  readonly pitchName: string;
}

export const GUITAR_STRINGS: readonly GuitarStringInfo[] = [
  { num: 6, name: '6ª Corda', note: 'E', octave: 2, freq: 82.41, label: 'Mi grave', pitchName: 'E2' },
  { num: 5, name: '5ª Corda', note: 'A', octave: 2, freq: 110.00, label: 'Lá', pitchName: 'A2' },
  { num: 4, name: '4ª Corda', note: 'D', octave: 3, freq: 146.83, label: 'Ré', pitchName: 'D3' },
  { num: 3, name: '3ª Corda', note: 'G', octave: 3, freq: 196.00, label: 'Sol', pitchName: 'G3' },
  { num: 2, name: '2ª Corda', note: 'B', octave: 3, freq: 246.94, label: 'Si', pitchName: 'B3' },
  { num: 1, name: '1ª Corda', note: 'E', octave: 4, freq: 329.63, label: 'Mi agudo', pitchName: 'E4' },
];
