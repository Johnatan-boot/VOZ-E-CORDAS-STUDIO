import { Scale } from '../models/scale.model';

export const SCALES_DATA: Scale[] = [
  {
    "id": "C-maior",
    "name": "C maior",
    "root": "C",
    "type": "Maior",
    "notes": [
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de C maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "C-menor-natural",
    "name": "C menor natural",
    "root": "C",
    "type": "Menor",
    "notes": [
      "C",
      "D",
      "D#",
      "F",
      "G",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de C menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "C-menor-harmônica",
    "name": "C menor harmônica",
    "root": "C",
    "type": "Menor Harmônica",
    "notes": [
      "C",
      "D",
      "D#",
      "F",
      "G",
      "G#",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de C menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "C-menor-melódica",
    "name": "C menor melódica",
    "root": "C",
    "type": "Menor Melódica",
    "notes": [
      "C",
      "D",
      "D#",
      "F",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de C menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "C-pentatônica-maior",
    "name": "C pentatônica maior",
    "root": "C",
    "type": "Pentatônica Maior",
    "notes": [
      "C",
      "D",
      "E",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de C pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "C-pentatônica-menor",
    "name": "C pentatônica menor",
    "root": "C",
    "type": "Pentatônica Menor",
    "notes": [
      "C",
      "D#",
      "F",
      "G",
      "A#"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de C pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "C-blues-menor",
    "name": "C blues menor",
    "root": "C",
    "type": "Blues Menor",
    "notes": [
      "C",
      "D#",
      "F",
      "F#",
      "G",
      "A#"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de C blues menor é formada por 6 notas."
  },
  {
    "id": "C-jônio",
    "name": "C jônio",
    "root": "C",
    "type": "Jônio",
    "notes": [
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de C jônio é formada por 7 notas."
  },
  {
    "id": "C-dórico",
    "name": "C dórico",
    "root": "C",
    "type": "Dórico",
    "notes": [
      "C",
      "D",
      "D#",
      "F",
      "G",
      "A",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de C dórico é formada por 7 notas."
  },
  {
    "id": "C-frígio",
    "name": "C frígio",
    "root": "C",
    "type": "Frígio",
    "notes": [
      "C",
      "C#",
      "D#",
      "F",
      "G",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de C frígio é formada por 7 notas."
  },
  {
    "id": "C-lídio",
    "name": "C lídio",
    "root": "C",
    "type": "Lídio",
    "notes": [
      "C",
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de C lídio é formada por 7 notas."
  },
  {
    "id": "C-mixolídio",
    "name": "C mixolídio",
    "root": "C",
    "type": "Mixolídio",
    "notes": [
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de C mixolídio é formada por 7 notas."
  },
  {
    "id": "C-eólio",
    "name": "C eólio",
    "root": "C",
    "type": "Eólio",
    "notes": [
      "C",
      "D",
      "D#",
      "F",
      "G",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de C eólio é formada por 7 notas."
  },
  {
    "id": "C-lócrio",
    "name": "C lócrio",
    "root": "C",
    "type": "Lócrio",
    "notes": [
      "C",
      "C#",
      "D#",
      "F",
      "F#",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de C lócrio é formada por 7 notas."
  },
  {
    "id": "Csharp-maior",
    "name": "C# maior",
    "root": "C#",
    "type": "Maior",
    "notes": [
      "C#",
      "D#",
      "F",
      "F#",
      "G#",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de C# maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Csharp-menor-natural",
    "name": "C# menor natural",
    "root": "C#",
    "type": "Menor",
    "notes": [
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de C# menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Csharp-menor-harmônica",
    "name": "C# menor harmônica",
    "root": "C#",
    "type": "Menor Harmônica",
    "notes": [
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de C# menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Csharp-menor-melódica",
    "name": "C# menor melódica",
    "root": "C#",
    "type": "Menor Melódica",
    "notes": [
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de C# menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Csharp-pentatônica-maior",
    "name": "C# pentatônica maior",
    "root": "C#",
    "type": "Pentatônica Maior",
    "notes": [
      "C#",
      "D#",
      "F",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de C# pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Csharp-pentatônica-menor",
    "name": "C# pentatônica menor",
    "root": "C#",
    "type": "Pentatônica Menor",
    "notes": [
      "C#",
      "E",
      "F#",
      "G#",
      "B"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de C# pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Csharp-blues-menor",
    "name": "C# blues menor",
    "root": "C#",
    "type": "Blues Menor",
    "notes": [
      "C#",
      "E",
      "F#",
      "G",
      "G#",
      "B"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de C# blues menor é formada por 6 notas."
  },
  {
    "id": "Csharp-jônio",
    "name": "C# jônio",
    "root": "C#",
    "type": "Jônio",
    "notes": [
      "C#",
      "D#",
      "F",
      "F#",
      "G#",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de C# jônio é formada por 7 notas."
  },
  {
    "id": "Csharp-dórico",
    "name": "C# dórico",
    "root": "C#",
    "type": "Dórico",
    "notes": [
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A#",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de C# dórico é formada por 7 notas."
  },
  {
    "id": "Csharp-frígio",
    "name": "C# frígio",
    "root": "C#",
    "type": "Frígio",
    "notes": [
      "C#",
      "D",
      "E",
      "F#",
      "G#",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de C# frígio é formada por 7 notas."
  },
  {
    "id": "Csharp-lídio",
    "name": "C# lídio",
    "root": "C#",
    "type": "Lídio",
    "notes": [
      "C#",
      "D#",
      "F",
      "G",
      "G#",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de C# lídio é formada por 7 notas."
  },
  {
    "id": "Csharp-mixolídio",
    "name": "C# mixolídio",
    "root": "C#",
    "type": "Mixolídio",
    "notes": [
      "C#",
      "D#",
      "F",
      "F#",
      "G#",
      "A#",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de C# mixolídio é formada por 7 notas."
  },
  {
    "id": "Csharp-eólio",
    "name": "C# eólio",
    "root": "C#",
    "type": "Eólio",
    "notes": [
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de C# eólio é formada por 7 notas."
  },
  {
    "id": "Csharp-lócrio",
    "name": "C# lócrio",
    "root": "C#",
    "type": "Lócrio",
    "notes": [
      "C#",
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de C# lócrio é formada por 7 notas."
  },
  {
    "id": "Db-maior",
    "name": "Db maior",
    "root": "Db",
    "type": "Maior",
    "notes": [
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de Db maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Db-menor-natural",
    "name": "Db menor natural",
    "root": "Db",
    "type": "Menor",
    "notes": [
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de Db menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Db-menor-harmônica",
    "name": "Db menor harmônica",
    "root": "Db",
    "type": "Menor Harmônica",
    "notes": [
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab",
      "A",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de Db menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Db-menor-melódica",
    "name": "Db menor melódica",
    "root": "Db",
    "type": "Menor Melódica",
    "notes": [
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab",
      "Bb",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de Db menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Db-pentatônica-maior",
    "name": "Db pentatônica maior",
    "root": "Db",
    "type": "Pentatônica Maior",
    "notes": [
      "Db",
      "Eb",
      "F",
      "Ab",
      "Bb"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de Db pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Db-pentatônica-menor",
    "name": "Db pentatônica menor",
    "root": "Db",
    "type": "Pentatônica Menor",
    "notes": [
      "Db",
      "E",
      "Gb",
      "Ab",
      "B"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de Db pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Db-blues-menor",
    "name": "Db blues menor",
    "root": "Db",
    "type": "Blues Menor",
    "notes": [
      "Db",
      "E",
      "Gb",
      "G",
      "Ab",
      "B"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de Db blues menor é formada por 6 notas."
  },
  {
    "id": "Db-jônio",
    "name": "Db jônio",
    "root": "Db",
    "type": "Jônio",
    "notes": [
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de Db jônio é formada por 7 notas."
  },
  {
    "id": "Db-dórico",
    "name": "Db dórico",
    "root": "Db",
    "type": "Dórico",
    "notes": [
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab",
      "Bb",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Db dórico é formada por 7 notas."
  },
  {
    "id": "Db-frígio",
    "name": "Db frígio",
    "root": "Db",
    "type": "Frígio",
    "notes": [
      "Db",
      "D",
      "E",
      "Gb",
      "Ab",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Db frígio é formada por 7 notas."
  },
  {
    "id": "Db-lídio",
    "name": "Db lídio",
    "root": "Db",
    "type": "Lídio",
    "notes": [
      "Db",
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de Db lídio é formada por 7 notas."
  },
  {
    "id": "Db-mixolídio",
    "name": "Db mixolídio",
    "root": "Db",
    "type": "Mixolídio",
    "notes": [
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Db mixolídio é formada por 7 notas."
  },
  {
    "id": "Db-eólio",
    "name": "Db eólio",
    "root": "Db",
    "type": "Eólio",
    "notes": [
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Db eólio é formada por 7 notas."
  },
  {
    "id": "Db-lócrio",
    "name": "Db lócrio",
    "root": "Db",
    "type": "Lócrio",
    "notes": [
      "Db",
      "D",
      "E",
      "Gb",
      "G",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de Db lócrio é formada por 7 notas."
  },
  {
    "id": "D-maior",
    "name": "D maior",
    "root": "D",
    "type": "Maior",
    "notes": [
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de D maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "D-menor-natural",
    "name": "D menor natural",
    "root": "D",
    "type": "Menor",
    "notes": [
      "D",
      "E",
      "F",
      "G",
      "A",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de D menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "D-menor-harmônica",
    "name": "D menor harmônica",
    "root": "D",
    "type": "Menor Harmônica",
    "notes": [
      "D",
      "E",
      "F",
      "G",
      "A",
      "A#",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de D menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "D-menor-melódica",
    "name": "D menor melódica",
    "root": "D",
    "type": "Menor Melódica",
    "notes": [
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de D menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "D-pentatônica-maior",
    "name": "D pentatônica maior",
    "root": "D",
    "type": "Pentatônica Maior",
    "notes": [
      "D",
      "E",
      "F#",
      "A",
      "B"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de D pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "D-pentatônica-menor",
    "name": "D pentatônica menor",
    "root": "D",
    "type": "Pentatônica Menor",
    "notes": [
      "D",
      "F",
      "G",
      "A",
      "C"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de D pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "D-blues-menor",
    "name": "D blues menor",
    "root": "D",
    "type": "Blues Menor",
    "notes": [
      "D",
      "F",
      "G",
      "G#",
      "A",
      "C"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de D blues menor é formada por 6 notas."
  },
  {
    "id": "D-jônio",
    "name": "D jônio",
    "root": "D",
    "type": "Jônio",
    "notes": [
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de D jônio é formada por 7 notas."
  },
  {
    "id": "D-dórico",
    "name": "D dórico",
    "root": "D",
    "type": "Dórico",
    "notes": [
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de D dórico é formada por 7 notas."
  },
  {
    "id": "D-frígio",
    "name": "D frígio",
    "root": "D",
    "type": "Frígio",
    "notes": [
      "D",
      "D#",
      "F",
      "G",
      "A",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de D frígio é formada por 7 notas."
  },
  {
    "id": "D-lídio",
    "name": "D lídio",
    "root": "D",
    "type": "Lídio",
    "notes": [
      "D",
      "E",
      "F#",
      "G#",
      "A",
      "B",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de D lídio é formada por 7 notas."
  },
  {
    "id": "D-mixolídio",
    "name": "D mixolídio",
    "root": "D",
    "type": "Mixolídio",
    "notes": [
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de D mixolídio é formada por 7 notas."
  },
  {
    "id": "D-eólio",
    "name": "D eólio",
    "root": "D",
    "type": "Eólio",
    "notes": [
      "D",
      "E",
      "F",
      "G",
      "A",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de D eólio é formada por 7 notas."
  },
  {
    "id": "D-lócrio",
    "name": "D lócrio",
    "root": "D",
    "type": "Lócrio",
    "notes": [
      "D",
      "D#",
      "F",
      "G",
      "G#",
      "A#",
      "C"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de D lócrio é formada por 7 notas."
  },
  {
    "id": "Eb-maior",
    "name": "Eb maior",
    "root": "Eb",
    "type": "Maior",
    "notes": [
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de Eb maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Eb-menor-natural",
    "name": "Eb menor natural",
    "root": "Eb",
    "type": "Menor",
    "notes": [
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de Eb menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Eb-menor-harmônica",
    "name": "Eb menor harmônica",
    "root": "Eb",
    "type": "Menor Harmônica",
    "notes": [
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "B",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de Eb menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Eb-menor-melódica",
    "name": "Eb menor melódica",
    "root": "Eb",
    "type": "Menor Melódica",
    "notes": [
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de Eb menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Eb-pentatônica-maior",
    "name": "Eb pentatônica maior",
    "root": "Eb",
    "type": "Pentatônica Maior",
    "notes": [
      "Eb",
      "F",
      "G",
      "Bb",
      "C"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de Eb pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Eb-pentatônica-menor",
    "name": "Eb pentatônica menor",
    "root": "Eb",
    "type": "Pentatônica Menor",
    "notes": [
      "Eb",
      "Gb",
      "Ab",
      "Bb",
      "Db"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de Eb pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Eb-blues-menor",
    "name": "Eb blues menor",
    "root": "Eb",
    "type": "Blues Menor",
    "notes": [
      "Eb",
      "Gb",
      "Ab",
      "A",
      "Bb",
      "Db"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de Eb blues menor é formada por 6 notas."
  },
  {
    "id": "Eb-jônio",
    "name": "Eb jônio",
    "root": "Eb",
    "type": "Jônio",
    "notes": [
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de Eb jônio é formada por 7 notas."
  },
  {
    "id": "Eb-dórico",
    "name": "Eb dórico",
    "root": "Eb",
    "type": "Dórico",
    "notes": [
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "C",
      "Db"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Eb dórico é formada por 7 notas."
  },
  {
    "id": "Eb-frígio",
    "name": "Eb frígio",
    "root": "Eb",
    "type": "Frígio",
    "notes": [
      "Eb",
      "E",
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Eb frígio é formada por 7 notas."
  },
  {
    "id": "Eb-lídio",
    "name": "Eb lídio",
    "root": "Eb",
    "type": "Lídio",
    "notes": [
      "Eb",
      "F",
      "G",
      "A",
      "Bb",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de Eb lídio é formada por 7 notas."
  },
  {
    "id": "Eb-mixolídio",
    "name": "Eb mixolídio",
    "root": "Eb",
    "type": "Mixolídio",
    "notes": [
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "Db"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Eb mixolídio é formada por 7 notas."
  },
  {
    "id": "Eb-eólio",
    "name": "Eb eólio",
    "root": "Eb",
    "type": "Eólio",
    "notes": [
      "Eb",
      "F",
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Eb eólio é formada por 7 notas."
  },
  {
    "id": "Eb-lócrio",
    "name": "Eb lócrio",
    "root": "Eb",
    "type": "Lócrio",
    "notes": [
      "Eb",
      "E",
      "Gb",
      "Ab",
      "A",
      "B",
      "Db"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de Eb lócrio é formada por 7 notas."
  },
  {
    "id": "E-maior",
    "name": "E maior",
    "root": "E",
    "type": "Maior",
    "notes": [
      "E",
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de E maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "E-menor-natural",
    "name": "E menor natural",
    "root": "E",
    "type": "Menor",
    "notes": [
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de E menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "E-menor-harmônica",
    "name": "E menor harmônica",
    "root": "E",
    "type": "Menor Harmônica",
    "notes": [
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de E menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "E-menor-melódica",
    "name": "E menor melódica",
    "root": "E",
    "type": "Menor Melódica",
    "notes": [
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C#",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de E menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "E-pentatônica-maior",
    "name": "E pentatônica maior",
    "root": "E",
    "type": "Pentatônica Maior",
    "notes": [
      "E",
      "F#",
      "G#",
      "B",
      "C#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de E pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "E-pentatônica-menor",
    "name": "E pentatônica menor",
    "root": "E",
    "type": "Pentatônica Menor",
    "notes": [
      "E",
      "G",
      "A",
      "B",
      "D"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de E pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "E-blues-menor",
    "name": "E blues menor",
    "root": "E",
    "type": "Blues Menor",
    "notes": [
      "E",
      "G",
      "A",
      "A#",
      "B",
      "D"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de E blues menor é formada por 6 notas."
  },
  {
    "id": "E-jônio",
    "name": "E jônio",
    "root": "E",
    "type": "Jônio",
    "notes": [
      "E",
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de E jônio é formada por 7 notas."
  },
  {
    "id": "E-dórico",
    "name": "E dórico",
    "root": "E",
    "type": "Dórico",
    "notes": [
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C#",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de E dórico é formada por 7 notas."
  },
  {
    "id": "E-frígio",
    "name": "E frígio",
    "root": "E",
    "type": "Frígio",
    "notes": [
      "E",
      "F",
      "G",
      "A",
      "B",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de E frígio é formada por 7 notas."
  },
  {
    "id": "E-lídio",
    "name": "E lídio",
    "root": "E",
    "type": "Lídio",
    "notes": [
      "E",
      "F#",
      "G#",
      "A#",
      "B",
      "C#",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de E lídio é formada por 7 notas."
  },
  {
    "id": "E-mixolídio",
    "name": "E mixolídio",
    "root": "E",
    "type": "Mixolídio",
    "notes": [
      "E",
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de E mixolídio é formada por 7 notas."
  },
  {
    "id": "E-eólio",
    "name": "E eólio",
    "root": "E",
    "type": "Eólio",
    "notes": [
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de E eólio é formada por 7 notas."
  },
  {
    "id": "E-lócrio",
    "name": "E lócrio",
    "root": "E",
    "type": "Lócrio",
    "notes": [
      "E",
      "F",
      "G",
      "A",
      "A#",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de E lócrio é formada por 7 notas."
  },
  {
    "id": "F-maior",
    "name": "F maior",
    "root": "F",
    "type": "Maior",
    "notes": [
      "F",
      "G",
      "A",
      "Bb",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de F maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "F-menor-natural",
    "name": "F menor natural",
    "root": "F",
    "type": "Menor",
    "notes": [
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de F menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "F-menor-harmônica",
    "name": "F menor harmônica",
    "root": "F",
    "type": "Menor Harmônica",
    "notes": [
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "Db",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de F menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "F-menor-melódica",
    "name": "F menor melódica",
    "root": "F",
    "type": "Menor Melódica",
    "notes": [
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de F menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "F-pentatônica-maior",
    "name": "F pentatônica maior",
    "root": "F",
    "type": "Pentatônica Maior",
    "notes": [
      "F",
      "G",
      "A",
      "C",
      "D"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de F pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "F-pentatônica-menor",
    "name": "F pentatônica menor",
    "root": "F",
    "type": "Pentatônica Menor",
    "notes": [
      "F",
      "Ab",
      "Bb",
      "C",
      "Eb"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de F pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "F-blues-menor",
    "name": "F blues menor",
    "root": "F",
    "type": "Blues Menor",
    "notes": [
      "F",
      "Ab",
      "Bb",
      "B",
      "C",
      "Eb"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de F blues menor é formada por 6 notas."
  },
  {
    "id": "F-jônio",
    "name": "F jônio",
    "root": "F",
    "type": "Jônio",
    "notes": [
      "F",
      "G",
      "A",
      "Bb",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de F jônio é formada por 7 notas."
  },
  {
    "id": "F-dórico",
    "name": "F dórico",
    "root": "F",
    "type": "Dórico",
    "notes": [
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "D",
      "Eb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de F dórico é formada por 7 notas."
  },
  {
    "id": "F-frígio",
    "name": "F frígio",
    "root": "F",
    "type": "Frígio",
    "notes": [
      "F",
      "Gb",
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de F frígio é formada por 7 notas."
  },
  {
    "id": "F-lídio",
    "name": "F lídio",
    "root": "F",
    "type": "Lídio",
    "notes": [
      "F",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de F lídio é formada por 7 notas."
  },
  {
    "id": "F-mixolídio",
    "name": "F mixolídio",
    "root": "F",
    "type": "Mixolídio",
    "notes": [
      "F",
      "G",
      "A",
      "Bb",
      "C",
      "D",
      "Eb"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de F mixolídio é formada por 7 notas."
  },
  {
    "id": "F-eólio",
    "name": "F eólio",
    "root": "F",
    "type": "Eólio",
    "notes": [
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de F eólio é formada por 7 notas."
  },
  {
    "id": "F-lócrio",
    "name": "F lócrio",
    "root": "F",
    "type": "Lócrio",
    "notes": [
      "F",
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de F lócrio é formada por 7 notas."
  },
  {
    "id": "Fsharp-maior",
    "name": "F# maior",
    "root": "F#",
    "type": "Maior",
    "notes": [
      "F#",
      "G#",
      "A#",
      "B",
      "C#",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de F# maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Fsharp-menor-natural",
    "name": "F# menor natural",
    "root": "F#",
    "type": "Menor",
    "notes": [
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de F# menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Fsharp-menor-harmônica",
    "name": "F# menor harmônica",
    "root": "F#",
    "type": "Menor Harmônica",
    "notes": [
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de F# menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Fsharp-menor-melódica",
    "name": "F# menor melódica",
    "root": "F#",
    "type": "Menor Melódica",
    "notes": [
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de F# menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Fsharp-pentatônica-maior",
    "name": "F# pentatônica maior",
    "root": "F#",
    "type": "Pentatônica Maior",
    "notes": [
      "F#",
      "G#",
      "A#",
      "C#",
      "D#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de F# pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Fsharp-pentatônica-menor",
    "name": "F# pentatônica menor",
    "root": "F#",
    "type": "Pentatônica Menor",
    "notes": [
      "F#",
      "A",
      "B",
      "C#",
      "E"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de F# pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Fsharp-blues-menor",
    "name": "F# blues menor",
    "root": "F#",
    "type": "Blues Menor",
    "notes": [
      "F#",
      "A",
      "B",
      "C",
      "C#",
      "E"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de F# blues menor é formada por 6 notas."
  },
  {
    "id": "Fsharp-jônio",
    "name": "F# jônio",
    "root": "F#",
    "type": "Jônio",
    "notes": [
      "F#",
      "G#",
      "A#",
      "B",
      "C#",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de F# jônio é formada por 7 notas."
  },
  {
    "id": "Fsharp-dórico",
    "name": "F# dórico",
    "root": "F#",
    "type": "Dórico",
    "notes": [
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D#",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de F# dórico é formada por 7 notas."
  },
  {
    "id": "Fsharp-frígio",
    "name": "F# frígio",
    "root": "F#",
    "type": "Frígio",
    "notes": [
      "F#",
      "G",
      "A",
      "B",
      "C#",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de F# frígio é formada por 7 notas."
  },
  {
    "id": "Fsharp-lídio",
    "name": "F# lídio",
    "root": "F#",
    "type": "Lídio",
    "notes": [
      "F#",
      "G#",
      "A#",
      "C",
      "C#",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de F# lídio é formada por 7 notas."
  },
  {
    "id": "Fsharp-mixolídio",
    "name": "F# mixolídio",
    "root": "F#",
    "type": "Mixolídio",
    "notes": [
      "F#",
      "G#",
      "A#",
      "B",
      "C#",
      "D#",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de F# mixolídio é formada por 7 notas."
  },
  {
    "id": "Fsharp-eólio",
    "name": "F# eólio",
    "root": "F#",
    "type": "Eólio",
    "notes": [
      "F#",
      "G#",
      "A",
      "B",
      "C#",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de F# eólio é formada por 7 notas."
  },
  {
    "id": "Fsharp-lócrio",
    "name": "F# lócrio",
    "root": "F#",
    "type": "Lócrio",
    "notes": [
      "F#",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de F# lócrio é formada por 7 notas."
  },
  {
    "id": "Gb-maior",
    "name": "Gb maior",
    "root": "Gb",
    "type": "Maior",
    "notes": [
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de Gb maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Gb-menor-natural",
    "name": "Gb menor natural",
    "root": "Gb",
    "type": "Menor",
    "notes": [
      "Gb",
      "Ab",
      "A",
      "B",
      "Db",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de Gb menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Gb-menor-harmônica",
    "name": "Gb menor harmônica",
    "root": "Gb",
    "type": "Menor Harmônica",
    "notes": [
      "Gb",
      "Ab",
      "A",
      "B",
      "Db",
      "D",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de Gb menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Gb-menor-melódica",
    "name": "Gb menor melódica",
    "root": "Gb",
    "type": "Menor Melódica",
    "notes": [
      "Gb",
      "Ab",
      "A",
      "B",
      "Db",
      "Eb",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de Gb menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Gb-pentatônica-maior",
    "name": "Gb pentatônica maior",
    "root": "Gb",
    "type": "Pentatônica Maior",
    "notes": [
      "Gb",
      "Ab",
      "Bb",
      "Db",
      "Eb"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de Gb pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Gb-pentatônica-menor",
    "name": "Gb pentatônica menor",
    "root": "Gb",
    "type": "Pentatônica Menor",
    "notes": [
      "Gb",
      "A",
      "B",
      "Db",
      "E"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de Gb pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Gb-blues-menor",
    "name": "Gb blues menor",
    "root": "Gb",
    "type": "Blues Menor",
    "notes": [
      "Gb",
      "A",
      "B",
      "C",
      "Db",
      "E"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de Gb blues menor é formada por 6 notas."
  },
  {
    "id": "Gb-jônio",
    "name": "Gb jônio",
    "root": "Gb",
    "type": "Jônio",
    "notes": [
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de Gb jônio é formada por 7 notas."
  },
  {
    "id": "Gb-dórico",
    "name": "Gb dórico",
    "root": "Gb",
    "type": "Dórico",
    "notes": [
      "Gb",
      "Ab",
      "A",
      "B",
      "Db",
      "Eb",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Gb dórico é formada por 7 notas."
  },
  {
    "id": "Gb-frígio",
    "name": "Gb frígio",
    "root": "Gb",
    "type": "Frígio",
    "notes": [
      "Gb",
      "G",
      "A",
      "B",
      "Db",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Gb frígio é formada por 7 notas."
  },
  {
    "id": "Gb-lídio",
    "name": "Gb lídio",
    "root": "Gb",
    "type": "Lídio",
    "notes": [
      "Gb",
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de Gb lídio é formada por 7 notas."
  },
  {
    "id": "Gb-mixolídio",
    "name": "Gb mixolídio",
    "root": "Gb",
    "type": "Mixolídio",
    "notes": [
      "Gb",
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Gb mixolídio é formada por 7 notas."
  },
  {
    "id": "Gb-eólio",
    "name": "Gb eólio",
    "root": "Gb",
    "type": "Eólio",
    "notes": [
      "Gb",
      "Ab",
      "A",
      "B",
      "Db",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Gb eólio é formada por 7 notas."
  },
  {
    "id": "Gb-lócrio",
    "name": "Gb lócrio",
    "root": "Gb",
    "type": "Lócrio",
    "notes": [
      "Gb",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de Gb lócrio é formada por 7 notas."
  },
  {
    "id": "G-maior",
    "name": "G maior",
    "root": "G",
    "type": "Maior",
    "notes": [
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de G maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "G-menor-natural",
    "name": "G menor natural",
    "root": "G",
    "type": "Menor",
    "notes": [
      "G",
      "A",
      "A#",
      "C",
      "D",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de G menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "G-menor-harmônica",
    "name": "G menor harmônica",
    "root": "G",
    "type": "Menor Harmônica",
    "notes": [
      "G",
      "A",
      "A#",
      "C",
      "D",
      "D#",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de G menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "G-menor-melódica",
    "name": "G menor melódica",
    "root": "G",
    "type": "Menor Melódica",
    "notes": [
      "G",
      "A",
      "A#",
      "C",
      "D",
      "E",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de G menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "G-pentatônica-maior",
    "name": "G pentatônica maior",
    "root": "G",
    "type": "Pentatônica Maior",
    "notes": [
      "G",
      "A",
      "B",
      "D",
      "E"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de G pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "G-pentatônica-menor",
    "name": "G pentatônica menor",
    "root": "G",
    "type": "Pentatônica Menor",
    "notes": [
      "G",
      "A#",
      "C",
      "D",
      "F"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de G pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "G-blues-menor",
    "name": "G blues menor",
    "root": "G",
    "type": "Blues Menor",
    "notes": [
      "G",
      "A#",
      "C",
      "C#",
      "D",
      "F"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de G blues menor é formada por 6 notas."
  },
  {
    "id": "G-jônio",
    "name": "G jônio",
    "root": "G",
    "type": "Jônio",
    "notes": [
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de G jônio é formada por 7 notas."
  },
  {
    "id": "G-dórico",
    "name": "G dórico",
    "root": "G",
    "type": "Dórico",
    "notes": [
      "G",
      "A",
      "A#",
      "C",
      "D",
      "E",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de G dórico é formada por 7 notas."
  },
  {
    "id": "G-frígio",
    "name": "G frígio",
    "root": "G",
    "type": "Frígio",
    "notes": [
      "G",
      "G#",
      "A#",
      "C",
      "D",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de G frígio é formada por 7 notas."
  },
  {
    "id": "G-lídio",
    "name": "G lídio",
    "root": "G",
    "type": "Lídio",
    "notes": [
      "G",
      "A",
      "B",
      "C#",
      "D",
      "E",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de G lídio é formada por 7 notas."
  },
  {
    "id": "G-mixolídio",
    "name": "G mixolídio",
    "root": "G",
    "type": "Mixolídio",
    "notes": [
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de G mixolídio é formada por 7 notas."
  },
  {
    "id": "G-eólio",
    "name": "G eólio",
    "root": "G",
    "type": "Eólio",
    "notes": [
      "G",
      "A",
      "A#",
      "C",
      "D",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de G eólio é formada por 7 notas."
  },
  {
    "id": "G-lócrio",
    "name": "G lócrio",
    "root": "G",
    "type": "Lócrio",
    "notes": [
      "G",
      "G#",
      "A#",
      "C",
      "C#",
      "D#",
      "F"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de G lócrio é formada por 7 notas."
  },
  {
    "id": "Ab-maior",
    "name": "Ab maior",
    "root": "Ab",
    "type": "Maior",
    "notes": [
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de Ab maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Ab-menor-natural",
    "name": "Ab menor natural",
    "root": "Ab",
    "type": "Menor",
    "notes": [
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "E",
      "Gb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de Ab menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Ab-menor-harmônica",
    "name": "Ab menor harmônica",
    "root": "Ab",
    "type": "Menor Harmônica",
    "notes": [
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "E",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de Ab menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Ab-menor-melódica",
    "name": "Ab menor melódica",
    "root": "Ab",
    "type": "Menor Melódica",
    "notes": [
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de Ab menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Ab-pentatônica-maior",
    "name": "Ab pentatônica maior",
    "root": "Ab",
    "type": "Pentatônica Maior",
    "notes": [
      "Ab",
      "Bb",
      "C",
      "Eb",
      "F"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de Ab pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Ab-pentatônica-menor",
    "name": "Ab pentatônica menor",
    "root": "Ab",
    "type": "Pentatônica Menor",
    "notes": [
      "Ab",
      "B",
      "Db",
      "Eb",
      "Gb"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de Ab pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Ab-blues-menor",
    "name": "Ab blues menor",
    "root": "Ab",
    "type": "Blues Menor",
    "notes": [
      "Ab",
      "B",
      "Db",
      "D",
      "Eb",
      "Gb"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de Ab blues menor é formada por 6 notas."
  },
  {
    "id": "Ab-jônio",
    "name": "Ab jônio",
    "root": "Ab",
    "type": "Jônio",
    "notes": [
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de Ab jônio é formada por 7 notas."
  },
  {
    "id": "Ab-dórico",
    "name": "Ab dórico",
    "root": "Ab",
    "type": "Dórico",
    "notes": [
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "F",
      "Gb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Ab dórico é formada por 7 notas."
  },
  {
    "id": "Ab-frígio",
    "name": "Ab frígio",
    "root": "Ab",
    "type": "Frígio",
    "notes": [
      "Ab",
      "A",
      "B",
      "Db",
      "Eb",
      "E",
      "Gb"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Ab frígio é formada por 7 notas."
  },
  {
    "id": "Ab-lídio",
    "name": "Ab lídio",
    "root": "Ab",
    "type": "Lídio",
    "notes": [
      "Ab",
      "Bb",
      "C",
      "D",
      "Eb",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de Ab lídio é formada por 7 notas."
  },
  {
    "id": "Ab-mixolídio",
    "name": "Ab mixolídio",
    "root": "Ab",
    "type": "Mixolídio",
    "notes": [
      "Ab",
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "Gb"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Ab mixolídio é formada por 7 notas."
  },
  {
    "id": "Ab-eólio",
    "name": "Ab eólio",
    "root": "Ab",
    "type": "Eólio",
    "notes": [
      "Ab",
      "Bb",
      "B",
      "Db",
      "Eb",
      "E",
      "Gb"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Ab eólio é formada por 7 notas."
  },
  {
    "id": "Ab-lócrio",
    "name": "Ab lócrio",
    "root": "Ab",
    "type": "Lócrio",
    "notes": [
      "Ab",
      "A",
      "B",
      "Db",
      "D",
      "E",
      "Gb"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de Ab lócrio é formada por 7 notas."
  },
  {
    "id": "A-maior",
    "name": "A maior",
    "root": "A",
    "type": "Maior",
    "notes": [
      "A",
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de A maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "A-menor-natural",
    "name": "A menor natural",
    "root": "A",
    "type": "Menor",
    "notes": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de A menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "A-menor-harmônica",
    "name": "A menor harmônica",
    "root": "A",
    "type": "Menor Harmônica",
    "notes": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de A menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "A-menor-melódica",
    "name": "A menor melódica",
    "root": "A",
    "type": "Menor Melódica",
    "notes": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F#",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de A menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "A-pentatônica-maior",
    "name": "A pentatônica maior",
    "root": "A",
    "type": "Pentatônica Maior",
    "notes": [
      "A",
      "B",
      "C#",
      "E",
      "F#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de A pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "A-pentatônica-menor",
    "name": "A pentatônica menor",
    "root": "A",
    "type": "Pentatônica Menor",
    "notes": [
      "A",
      "C",
      "D",
      "E",
      "G"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de A pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "A-blues-menor",
    "name": "A blues menor",
    "root": "A",
    "type": "Blues Menor",
    "notes": [
      "A",
      "C",
      "D",
      "D#",
      "E",
      "G"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de A blues menor é formada por 6 notas."
  },
  {
    "id": "A-jônio",
    "name": "A jônio",
    "root": "A",
    "type": "Jônio",
    "notes": [
      "A",
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de A jônio é formada por 7 notas."
  },
  {
    "id": "A-dórico",
    "name": "A dórico",
    "root": "A",
    "type": "Dórico",
    "notes": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F#",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de A dórico é formada por 7 notas."
  },
  {
    "id": "A-frígio",
    "name": "A frígio",
    "root": "A",
    "type": "Frígio",
    "notes": [
      "A",
      "A#",
      "C",
      "D",
      "E",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de A frígio é formada por 7 notas."
  },
  {
    "id": "A-lídio",
    "name": "A lídio",
    "root": "A",
    "type": "Lídio",
    "notes": [
      "A",
      "B",
      "C#",
      "D#",
      "E",
      "F#",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de A lídio é formada por 7 notas."
  },
  {
    "id": "A-mixolídio",
    "name": "A mixolídio",
    "root": "A",
    "type": "Mixolídio",
    "notes": [
      "A",
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de A mixolídio é formada por 7 notas."
  },
  {
    "id": "A-eólio",
    "name": "A eólio",
    "root": "A",
    "type": "Eólio",
    "notes": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de A eólio é formada por 7 notas."
  },
  {
    "id": "A-lócrio",
    "name": "A lócrio",
    "root": "A",
    "type": "Lócrio",
    "notes": [
      "A",
      "A#",
      "C",
      "D",
      "D#",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de A lócrio é formada por 7 notas."
  },
  {
    "id": "Bb-maior",
    "name": "Bb maior",
    "root": "Bb",
    "type": "Maior",
    "notes": [
      "Bb",
      "C",
      "D",
      "Eb",
      "F",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de Bb maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "Bb-menor-natural",
    "name": "Bb menor natural",
    "root": "Bb",
    "type": "Menor",
    "notes": [
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de Bb menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Bb-menor-harmônica",
    "name": "Bb menor harmônica",
    "root": "Bb",
    "type": "Menor Harmônica",
    "notes": [
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "Gb",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de Bb menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Bb-menor-melódica",
    "name": "Bb menor melódica",
    "root": "Bb",
    "type": "Menor Melódica",
    "notes": [
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de Bb menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "Bb-pentatônica-maior",
    "name": "Bb pentatônica maior",
    "root": "Bb",
    "type": "Pentatônica Maior",
    "notes": [
      "Bb",
      "C",
      "D",
      "F",
      "G"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de Bb pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Bb-pentatônica-menor",
    "name": "Bb pentatônica menor",
    "root": "Bb",
    "type": "Pentatônica Menor",
    "notes": [
      "Bb",
      "Db",
      "Eb",
      "F",
      "Ab"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de Bb pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "Bb-blues-menor",
    "name": "Bb blues menor",
    "root": "Bb",
    "type": "Blues Menor",
    "notes": [
      "Bb",
      "Db",
      "Eb",
      "E",
      "F",
      "Ab"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de Bb blues menor é formada por 6 notas."
  },
  {
    "id": "Bb-jônio",
    "name": "Bb jônio",
    "root": "Bb",
    "type": "Jônio",
    "notes": [
      "Bb",
      "C",
      "D",
      "Eb",
      "F",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de Bb jônio é formada por 7 notas."
  },
  {
    "id": "Bb-dórico",
    "name": "Bb dórico",
    "root": "Bb",
    "type": "Dórico",
    "notes": [
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "G",
      "Ab"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Bb dórico é formada por 7 notas."
  },
  {
    "id": "Bb-frígio",
    "name": "Bb frígio",
    "root": "Bb",
    "type": "Frígio",
    "notes": [
      "Bb",
      "B",
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Bb frígio é formada por 7 notas."
  },
  {
    "id": "Bb-lídio",
    "name": "Bb lídio",
    "root": "Bb",
    "type": "Lídio",
    "notes": [
      "Bb",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de Bb lídio é formada por 7 notas."
  },
  {
    "id": "Bb-mixolídio",
    "name": "Bb mixolídio",
    "root": "Bb",
    "type": "Mixolídio",
    "notes": [
      "Bb",
      "C",
      "D",
      "Eb",
      "F",
      "G",
      "Ab"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de Bb mixolídio é formada por 7 notas."
  },
  {
    "id": "Bb-eólio",
    "name": "Bb eólio",
    "root": "Bb",
    "type": "Eólio",
    "notes": [
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "Gb",
      "Ab"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de Bb eólio é formada por 7 notas."
  },
  {
    "id": "Bb-lócrio",
    "name": "Bb lócrio",
    "root": "Bb",
    "type": "Lócrio",
    "notes": [
      "Bb",
      "B",
      "Db",
      "Eb",
      "E",
      "Gb",
      "Ab"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de Bb lócrio é formada por 7 notas."
  },
  {
    "id": "B-maior",
    "name": "B maior",
    "root": "B",
    "type": "Maior",
    "notes": [
      "B",
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Maiores",
    "application": "A escala de B maior é formada por 7 notas.",
    "sertanejoApplication": "Base para a maioria das melodias e arranjos sertanejos clássicos e universitários."
  },
  {
    "id": "B-menor-natural",
    "name": "B menor natural",
    "root": "B",
    "type": "Menor",
    "notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Menores",
    "application": "A escala de B menor natural é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "B-menor-harmônica",
    "name": "B menor harmônica",
    "root": "B",
    "type": "Menor Harmônica",
    "notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "7"
    ],
    "formula": "T - ST - T - T - ST - T1/2 - ST",
    "category": "Menores",
    "application": "A escala de B menor harmônica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "B-menor-melódica",
    "name": "B menor melódica",
    "root": "B",
    "type": "Menor Melódica",
    "notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - ST - T - T - T - T - ST",
    "category": "Menores",
    "application": "A escala de B menor melódica é formada por 7 notas.",
    "sertanejoApplication": "Traz uma carga dramática, muito comum em guarânias e modões românticos."
  },
  {
    "id": "B-pentatônica-maior",
    "name": "B pentatônica maior",
    "root": "B",
    "type": "Pentatônica Maior",
    "notes": [
      "B",
      "C#",
      "D#",
      "F#",
      "G#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "5",
      "6"
    ],
    "formula": "T - T - T1/2 - T - T1/2",
    "category": "Pentatônicas",
    "application": "A escala de B pentatônica maior é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "B-pentatônica-menor",
    "name": "B pentatônica menor",
    "root": "B",
    "type": "Pentatônica Menor",
    "notes": [
      "B",
      "D",
      "E",
      "F#",
      "A"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - T - T1/2 - T",
    "category": "Pentatônicas",
    "application": "A escala de B pentatônica menor é formada por 5 notas.",
    "sertanejoApplication": "A pentatônica é excelente para criar frases melódicas, \"viradas\" e riffs no violão sertanejo."
  },
  {
    "id": "B-blues-menor",
    "name": "B blues menor",
    "root": "B",
    "type": "Blues Menor",
    "notes": [
      "B",
      "D",
      "E",
      "F",
      "F#",
      "A"
    ],
    "degrees": [
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7"
    ],
    "formula": "T1/2 - T - ST - ST - T1/2 - T",
    "category": "Blues",
    "application": "A escala de B blues menor é formada por 6 notas."
  },
  {
    "id": "B-jônio",
    "name": "B jônio",
    "root": "B",
    "type": "Jônio",
    "notes": [
      "B",
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - ST - T - T - T - ST",
    "category": "Modos",
    "application": "A escala de B jônio é formada por 7 notas."
  },
  {
    "id": "B-dórico",
    "name": "B dórico",
    "root": "B",
    "type": "Dórico",
    "notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G#",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - ST - T - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de B dórico é formada por 7 notas."
  },
  {
    "id": "B-frígio",
    "name": "B frígio",
    "root": "B",
    "type": "Frígio",
    "notes": [
      "B",
      "C",
      "D",
      "E",
      "F#",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de B frígio é formada por 7 notas."
  },
  {
    "id": "B-lídio",
    "name": "B lídio",
    "root": "B",
    "type": "Lídio",
    "notes": [
      "B",
      "C#",
      "D#",
      "F",
      "F#",
      "G#",
      "A#"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "#4",
      "5",
      "6",
      "7"
    ],
    "formula": "T - T - T - ST - T - T - ST",
    "category": "Modos",
    "application": "A escala de B lídio é formada por 7 notas."
  },
  {
    "id": "B-mixolídio",
    "name": "B mixolídio",
    "root": "B",
    "type": "Mixolídio",
    "notes": [
      "B",
      "C#",
      "D#",
      "E",
      "F#",
      "G#",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "b7"
    ],
    "formula": "T - T - ST - T - T - ST - T",
    "category": "Modos",
    "application": "A escala de B mixolídio é formada por 7 notas."
  },
  {
    "id": "B-eólio",
    "name": "B eólio",
    "root": "B",
    "type": "Eólio",
    "notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "2",
      "b3",
      "4",
      "5",
      "b6",
      "b7"
    ],
    "formula": "T - ST - T - T - ST - T - T",
    "category": "Modos",
    "application": "A escala de B eólio é formada por 7 notas."
  },
  {
    "id": "B-lócrio",
    "name": "B lócrio",
    "root": "B",
    "type": "Lócrio",
    "notes": [
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A"
    ],
    "degrees": [
      "1",
      "b2",
      "b3",
      "4",
      "b5",
      "b6",
      "b7"
    ],
    "formula": "ST - T - T - ST - T - T - T",
    "category": "Modos",
    "application": "A escala de B lócrio é formada por 7 notas."
  }
];
