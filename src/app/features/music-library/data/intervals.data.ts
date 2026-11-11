import { IntervalReference } from '../models/interval.model';

export const INTERVALS_DATA: IntervalReference[] = [
  { id: '1', name: 'Uníssono', symbol: '1J / T', semitones: 0, example: 'C -> C', description: 'A mesma nota reproduzida simultaneamente ou em sequência.' },
  { id: '2m', name: 'Segunda Menor', symbol: '2m', semitones: 1, example: 'C -> Db', description: 'Distância de um semitom. Traz muita tensão.' },
  { id: '2M', name: 'Segunda Maior', symbol: '2M', semitones: 2, example: 'C -> D', description: 'Distância de um tom. Usada em passagens e escalas maiores.' },
  { id: '3m', name: 'Terça Menor', symbol: '3m', semitones: 3, example: 'C -> Eb', description: 'Define o caráter triste/melancólico do acorde menor.' },
  { id: '3M', name: 'Terça Maior', symbol: '3M', semitones: 4, example: 'C -> E', description: 'Define o caráter alegre/aberto do acorde maior. Muito comum em aberturas de voz no sertanejo.' },
  { id: '4J', name: 'Quarta Justa', symbol: '4J', semitones: 5, example: 'C -> F', description: 'Intervalo estável, base para acordes suspensos (sus4).' },
  { id: '4A', name: 'Trítono', symbol: '4A / 5d', semitones: 6, example: 'C -> F# / Gb', description: 'O "Diabolus in Musica". Muita tensão, divide a oitava ao meio.' },
  { id: '5J', name: 'Quinta Justa', symbol: '5J', semitones: 7, example: 'C -> G', description: 'Extremamente consonante e estável. A base dos "power chords".' },
  { id: '6m', name: 'Sexta Menor', symbol: '6m', semitones: 8, example: 'C -> Ab', description: 'Tensa, comumente usada para conduzir de volta à quinta.' },
  { id: '6M', name: 'Sexta Maior', symbol: '6M', semitones: 9, example: 'C -> A', description: 'Outro intervalo harmônico comum para duplas vocais.' },
  { id: '7m', name: 'Sétima Menor', symbol: '7m', semitones: 10, example: 'C -> Bb', description: 'Essencial nos acordes de preparação (dominantes).' },
  { id: '7M', name: 'Sétima Maior', symbol: '7M', semitones: 11, example: 'C -> B', description: 'Traz um som sonhador, aéreo, típico de MPB e Bossa.' },
  { id: '8J', name: 'Oitava', symbol: '8J', semitones: 12, example: 'C -> C (acima)', description: 'A mesma nota dobrada um registro acima ou abaixo.' }
];
