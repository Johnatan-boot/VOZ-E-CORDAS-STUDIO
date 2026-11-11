export interface AudioTake {
  readonly id: string;
  readonly name: string;
  readonly timestamp: Date;
  readonly duration: number; // in seconds
  readonly url: string; // object URL for audio playback
}
