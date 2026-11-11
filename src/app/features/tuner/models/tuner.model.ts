export type TuningStatus = 'flat' | 'tuned' | 'sharp' | 'unknown';

export type MicrophoneState =
  | 'idle'
  | 'requesting-permission'
  | 'active'
  | 'denied'
  | 'error'
  | 'stopped';

export interface DetectedNote {
  readonly name: string;
  readonly fullName: string;
  readonly frequency: number;
  readonly targetFrequency: number;
  readonly octave: number;
  readonly cents: number;
  readonly midi: number;
}

export interface TunerState {
  readonly micState: MicrophoneState;
  readonly detectedNote: DetectedNote | null;
  readonly tuningStatus: TuningStatus;
  readonly frequency: number;
  readonly cents: number;
  readonly signalLevel: number;
  readonly errorMessage: string | null;
}
