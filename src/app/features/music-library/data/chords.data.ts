import { Chord } from '../models/chord.model';

export const CHORDS_DATA: Chord[] = [
  {
    "id": "C",
    "symbol": "C",
    "name": "C maior",
    "root": "C",
    "quality": "Maior",
    "notes": [
      "C",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Cm",
    "symbol": "Cm",
    "name": "C menor",
    "root": "C",
    "quality": "Menor",
    "notes": [
      "C",
      "D#",
      "G"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "C7",
    "symbol": "C7",
    "name": "C com sétima menor",
    "root": "C",
    "quality": "Sétima",
    "notes": [
      "C",
      "E",
      "G",
      "A#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C com sétima menor."
  },
  {
    "id": "Cmaj7",
    "symbol": "Cmaj7",
    "name": "C com sétima maior",
    "root": "C",
    "quality": "Maj7",
    "notes": [
      "C",
      "E",
      "G",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C com sétima maior."
  },
  {
    "id": "Cm7",
    "symbol": "Cm7",
    "name": "C menor com sétima",
    "root": "C",
    "quality": "Menor 7",
    "notes": [
      "C",
      "D#",
      "G",
      "A#"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C menor com sétima."
  },
  {
    "id": "Csus2",
    "symbol": "Csus2",
    "name": "C suspenso (2)",
    "root": "C",
    "quality": "Suspenso",
    "notes": [
      "C",
      "D",
      "G"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C suspenso (2)."
  },
  {
    "id": "Csus4",
    "symbol": "Csus4",
    "name": "C suspenso (4)",
    "root": "C",
    "quality": "Suspenso",
    "notes": [
      "C",
      "F",
      "G"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C suspenso (4)."
  },
  {
    "id": "Cadd9",
    "symbol": "Cadd9",
    "name": "C com nona adicionada",
    "root": "C",
    "quality": "Add9",
    "notes": [
      "C",
      "E",
      "G",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C com nona adicionada."
  },
  {
    "id": "Cdim",
    "symbol": "Cdim",
    "name": "C diminuto",
    "root": "C",
    "quality": "Diminuto",
    "notes": [
      "C",
      "D#",
      "F#"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C diminuto."
  },
  {
    "id": "Caug",
    "symbol": "Caug",
    "name": "C aumentado",
    "root": "C",
    "quality": "Aumentado",
    "notes": [
      "C",
      "E",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C aumentado."
  },
  {
    "id": "C9",
    "symbol": "C9",
    "name": "C nona",
    "root": "C",
    "quality": "Nona",
    "notes": [
      "C",
      "E",
      "G",
      "A#",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C nona."
  },
  {
    "id": "Cm9",
    "symbol": "Cm9",
    "name": "C menor nona",
    "root": "C",
    "quality": "Menor 9",
    "notes": [
      "C",
      "D#",
      "G",
      "A#",
      "D"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C menor nona."
  },
  {
    "id": "Cmaj9",
    "symbol": "Cmaj9",
    "name": "C maior com nona",
    "root": "C",
    "quality": "Maj9",
    "notes": [
      "C",
      "E",
      "G",
      "B",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C maior com nona."
  },
  {
    "id": "Csharp",
    "symbol": "C#",
    "name": "C# maior",
    "root": "C#",
    "quality": "Maior",
    "notes": [
      "C#",
      "F",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Csharpm",
    "symbol": "C#m",
    "name": "C# menor",
    "root": "C#",
    "quality": "Menor",
    "notes": [
      "C#",
      "E",
      "G#"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Csharp7",
    "symbol": "C#7",
    "name": "C# com sétima menor",
    "root": "C#",
    "quality": "Sétima",
    "notes": [
      "C#",
      "F",
      "G#",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# com sétima menor."
  },
  {
    "id": "Csharpmaj7",
    "symbol": "C#maj7",
    "name": "C# com sétima maior",
    "root": "C#",
    "quality": "Maj7",
    "notes": [
      "C#",
      "F",
      "G#",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# com sétima maior."
  },
  {
    "id": "Csharpm7",
    "symbol": "C#m7",
    "name": "C# menor com sétima",
    "root": "C#",
    "quality": "Menor 7",
    "notes": [
      "C#",
      "E",
      "G#",
      "B"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# menor com sétima."
  },
  {
    "id": "Csharpsus2",
    "symbol": "C#sus2",
    "name": "C# suspenso (2)",
    "root": "C#",
    "quality": "Suspenso",
    "notes": [
      "C#",
      "D#",
      "G#"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# suspenso (2)."
  },
  {
    "id": "Csharpsus4",
    "symbol": "C#sus4",
    "name": "C# suspenso (4)",
    "root": "C#",
    "quality": "Suspenso",
    "notes": [
      "C#",
      "F#",
      "G#"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# suspenso (4)."
  },
  {
    "id": "Csharpadd9",
    "symbol": "C#add9",
    "name": "C# com nona adicionada",
    "root": "C#",
    "quality": "Add9",
    "notes": [
      "C#",
      "F",
      "G#",
      "D#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# com nona adicionada."
  },
  {
    "id": "Csharpdim",
    "symbol": "C#dim",
    "name": "C# diminuto",
    "root": "C#",
    "quality": "Diminuto",
    "notes": [
      "C#",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# diminuto."
  },
  {
    "id": "Csharpaug",
    "symbol": "C#aug",
    "name": "C# aumentado",
    "root": "C#",
    "quality": "Aumentado",
    "notes": [
      "C#",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# aumentado."
  },
  {
    "id": "Csharp9",
    "symbol": "C#9",
    "name": "C# nona",
    "root": "C#",
    "quality": "Nona",
    "notes": [
      "C#",
      "F",
      "G#",
      "B",
      "D#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# nona."
  },
  {
    "id": "Csharpm9",
    "symbol": "C#m9",
    "name": "C# menor nona",
    "root": "C#",
    "quality": "Menor 9",
    "notes": [
      "C#",
      "E",
      "G#",
      "B",
      "D#"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# menor nona."
  },
  {
    "id": "Csharpmaj9",
    "symbol": "C#maj9",
    "name": "C# maior com nona",
    "root": "C#",
    "quality": "Maj9",
    "notes": [
      "C#",
      "F",
      "G#",
      "C",
      "D#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de C# maior com nona."
  },
  {
    "id": "Db",
    "symbol": "Db",
    "name": "Db maior",
    "root": "Db",
    "quality": "Maior",
    "notes": [
      "Db",
      "F",
      "Ab"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Dbm",
    "symbol": "Dbm",
    "name": "Db menor",
    "root": "Db",
    "quality": "Menor",
    "notes": [
      "Db",
      "E",
      "Ab"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Db7",
    "symbol": "Db7",
    "name": "Db com sétima menor",
    "root": "Db",
    "quality": "Sétima",
    "notes": [
      "Db",
      "F",
      "Ab",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db com sétima menor."
  },
  {
    "id": "Dbmaj7",
    "symbol": "Dbmaj7",
    "name": "Db com sétima maior",
    "root": "Db",
    "quality": "Maj7",
    "notes": [
      "Db",
      "F",
      "Ab",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db com sétima maior."
  },
  {
    "id": "Dbm7",
    "symbol": "Dbm7",
    "name": "Db menor com sétima",
    "root": "Db",
    "quality": "Menor 7",
    "notes": [
      "Db",
      "E",
      "Ab",
      "B"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db menor com sétima."
  },
  {
    "id": "Dbsus2",
    "symbol": "Dbsus2",
    "name": "Db suspenso (2)",
    "root": "Db",
    "quality": "Suspenso",
    "notes": [
      "Db",
      "Eb",
      "Ab"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db suspenso (2)."
  },
  {
    "id": "Dbsus4",
    "symbol": "Dbsus4",
    "name": "Db suspenso (4)",
    "root": "Db",
    "quality": "Suspenso",
    "notes": [
      "Db",
      "Gb",
      "Ab"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db suspenso (4)."
  },
  {
    "id": "Dbadd9",
    "symbol": "Dbadd9",
    "name": "Db com nona adicionada",
    "root": "Db",
    "quality": "Add9",
    "notes": [
      "Db",
      "F",
      "Ab",
      "Eb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db com nona adicionada."
  },
  {
    "id": "Dbdim",
    "symbol": "Dbdim",
    "name": "Db diminuto",
    "root": "Db",
    "quality": "Diminuto",
    "notes": [
      "Db",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db diminuto."
  },
  {
    "id": "Dbaug",
    "symbol": "Dbaug",
    "name": "Db aumentado",
    "root": "Db",
    "quality": "Aumentado",
    "notes": [
      "Db",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db aumentado."
  },
  {
    "id": "Db9",
    "symbol": "Db9",
    "name": "Db nona",
    "root": "Db",
    "quality": "Nona",
    "notes": [
      "Db",
      "F",
      "Ab",
      "B",
      "Eb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db nona."
  },
  {
    "id": "Dbm9",
    "symbol": "Dbm9",
    "name": "Db menor nona",
    "root": "Db",
    "quality": "Menor 9",
    "notes": [
      "Db",
      "E",
      "Ab",
      "B",
      "Eb"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db menor nona."
  },
  {
    "id": "Dbmaj9",
    "symbol": "Dbmaj9",
    "name": "Db maior com nona",
    "root": "Db",
    "quality": "Maj9",
    "notes": [
      "Db",
      "F",
      "Ab",
      "C",
      "Eb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Db maior com nona."
  },
  {
    "id": "D",
    "symbol": "D",
    "name": "D maior",
    "root": "D",
    "quality": "Maior",
    "notes": [
      "D",
      "F#",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Dm",
    "symbol": "Dm",
    "name": "D menor",
    "root": "D",
    "quality": "Menor",
    "notes": [
      "D",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "D7",
    "symbol": "D7",
    "name": "D com sétima menor",
    "root": "D",
    "quality": "Sétima",
    "notes": [
      "D",
      "F#",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D com sétima menor."
  },
  {
    "id": "Dmaj7",
    "symbol": "Dmaj7",
    "name": "D com sétima maior",
    "root": "D",
    "quality": "Maj7",
    "notes": [
      "D",
      "F#",
      "A",
      "C#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D com sétima maior."
  },
  {
    "id": "Dm7",
    "symbol": "Dm7",
    "name": "D menor com sétima",
    "root": "D",
    "quality": "Menor 7",
    "notes": [
      "D",
      "F",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D menor com sétima."
  },
  {
    "id": "Dsus2",
    "symbol": "Dsus2",
    "name": "D suspenso (2)",
    "root": "D",
    "quality": "Suspenso",
    "notes": [
      "D",
      "E",
      "A"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D suspenso (2)."
  },
  {
    "id": "Dsus4",
    "symbol": "Dsus4",
    "name": "D suspenso (4)",
    "root": "D",
    "quality": "Suspenso",
    "notes": [
      "D",
      "G",
      "A"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D suspenso (4)."
  },
  {
    "id": "Dadd9",
    "symbol": "Dadd9",
    "name": "D com nona adicionada",
    "root": "D",
    "quality": "Add9",
    "notes": [
      "D",
      "F#",
      "A",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D com nona adicionada."
  },
  {
    "id": "Ddim",
    "symbol": "Ddim",
    "name": "D diminuto",
    "root": "D",
    "quality": "Diminuto",
    "notes": [
      "D",
      "F",
      "G#"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D diminuto."
  },
  {
    "id": "Daug",
    "symbol": "Daug",
    "name": "D aumentado",
    "root": "D",
    "quality": "Aumentado",
    "notes": [
      "D",
      "F#",
      "A#"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D aumentado."
  },
  {
    "id": "D9",
    "symbol": "D9",
    "name": "D nona",
    "root": "D",
    "quality": "Nona",
    "notes": [
      "D",
      "F#",
      "A",
      "C",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D nona."
  },
  {
    "id": "Dm9",
    "symbol": "Dm9",
    "name": "D menor nona",
    "root": "D",
    "quality": "Menor 9",
    "notes": [
      "D",
      "F",
      "A",
      "C",
      "E"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D menor nona."
  },
  {
    "id": "Dmaj9",
    "symbol": "Dmaj9",
    "name": "D maior com nona",
    "root": "D",
    "quality": "Maj9",
    "notes": [
      "D",
      "F#",
      "A",
      "C#",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de D maior com nona."
  },
  {
    "id": "Eb",
    "symbol": "Eb",
    "name": "Eb maior",
    "root": "Eb",
    "quality": "Maior",
    "notes": [
      "Eb",
      "G",
      "Bb"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Ebm",
    "symbol": "Ebm",
    "name": "Eb menor",
    "root": "Eb",
    "quality": "Menor",
    "notes": [
      "Eb",
      "Gb",
      "Bb"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Eb7",
    "symbol": "Eb7",
    "name": "Eb com sétima menor",
    "root": "Eb",
    "quality": "Sétima",
    "notes": [
      "Eb",
      "G",
      "Bb",
      "Db"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb com sétima menor."
  },
  {
    "id": "Ebmaj7",
    "symbol": "Ebmaj7",
    "name": "Eb com sétima maior",
    "root": "Eb",
    "quality": "Maj7",
    "notes": [
      "Eb",
      "G",
      "Bb",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb com sétima maior."
  },
  {
    "id": "Ebm7",
    "symbol": "Ebm7",
    "name": "Eb menor com sétima",
    "root": "Eb",
    "quality": "Menor 7",
    "notes": [
      "Eb",
      "Gb",
      "Bb",
      "Db"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb menor com sétima."
  },
  {
    "id": "Ebsus2",
    "symbol": "Ebsus2",
    "name": "Eb suspenso (2)",
    "root": "Eb",
    "quality": "Suspenso",
    "notes": [
      "Eb",
      "F",
      "Bb"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb suspenso (2)."
  },
  {
    "id": "Ebsus4",
    "symbol": "Ebsus4",
    "name": "Eb suspenso (4)",
    "root": "Eb",
    "quality": "Suspenso",
    "notes": [
      "Eb",
      "Ab",
      "Bb"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb suspenso (4)."
  },
  {
    "id": "Ebadd9",
    "symbol": "Ebadd9",
    "name": "Eb com nona adicionada",
    "root": "Eb",
    "quality": "Add9",
    "notes": [
      "Eb",
      "G",
      "Bb",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb com nona adicionada."
  },
  {
    "id": "Ebdim",
    "symbol": "Ebdim",
    "name": "Eb diminuto",
    "root": "Eb",
    "quality": "Diminuto",
    "notes": [
      "Eb",
      "Gb",
      "A"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb diminuto."
  },
  {
    "id": "Ebaug",
    "symbol": "Ebaug",
    "name": "Eb aumentado",
    "root": "Eb",
    "quality": "Aumentado",
    "notes": [
      "Eb",
      "G",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb aumentado."
  },
  {
    "id": "Eb9",
    "symbol": "Eb9",
    "name": "Eb nona",
    "root": "Eb",
    "quality": "Nona",
    "notes": [
      "Eb",
      "G",
      "Bb",
      "Db",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb nona."
  },
  {
    "id": "Ebm9",
    "symbol": "Ebm9",
    "name": "Eb menor nona",
    "root": "Eb",
    "quality": "Menor 9",
    "notes": [
      "Eb",
      "Gb",
      "Bb",
      "Db",
      "F"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb menor nona."
  },
  {
    "id": "Ebmaj9",
    "symbol": "Ebmaj9",
    "name": "Eb maior com nona",
    "root": "Eb",
    "quality": "Maj9",
    "notes": [
      "Eb",
      "G",
      "Bb",
      "D",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Eb maior com nona."
  },
  {
    "id": "E",
    "symbol": "E",
    "name": "E maior",
    "root": "E",
    "quality": "Maior",
    "notes": [
      "E",
      "G#",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Em",
    "symbol": "Em",
    "name": "E menor",
    "root": "E",
    "quality": "Menor",
    "notes": [
      "E",
      "G",
      "B"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "E7",
    "symbol": "E7",
    "name": "E com sétima menor",
    "root": "E",
    "quality": "Sétima",
    "notes": [
      "E",
      "G#",
      "B",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E com sétima menor."
  },
  {
    "id": "Emaj7",
    "symbol": "Emaj7",
    "name": "E com sétima maior",
    "root": "E",
    "quality": "Maj7",
    "notes": [
      "E",
      "G#",
      "B",
      "D#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E com sétima maior."
  },
  {
    "id": "Em7",
    "symbol": "Em7",
    "name": "E menor com sétima",
    "root": "E",
    "quality": "Menor 7",
    "notes": [
      "E",
      "G",
      "B",
      "D"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E menor com sétima."
  },
  {
    "id": "Esus2",
    "symbol": "Esus2",
    "name": "E suspenso (2)",
    "root": "E",
    "quality": "Suspenso",
    "notes": [
      "E",
      "F#",
      "B"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E suspenso (2)."
  },
  {
    "id": "Esus4",
    "symbol": "Esus4",
    "name": "E suspenso (4)",
    "root": "E",
    "quality": "Suspenso",
    "notes": [
      "E",
      "A",
      "B"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E suspenso (4)."
  },
  {
    "id": "Eadd9",
    "symbol": "Eadd9",
    "name": "E com nona adicionada",
    "root": "E",
    "quality": "Add9",
    "notes": [
      "E",
      "G#",
      "B",
      "F#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E com nona adicionada."
  },
  {
    "id": "Edim",
    "symbol": "Edim",
    "name": "E diminuto",
    "root": "E",
    "quality": "Diminuto",
    "notes": [
      "E",
      "G",
      "A#"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E diminuto."
  },
  {
    "id": "Eaug",
    "symbol": "Eaug",
    "name": "E aumentado",
    "root": "E",
    "quality": "Aumentado",
    "notes": [
      "E",
      "G#",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E aumentado."
  },
  {
    "id": "E9",
    "symbol": "E9",
    "name": "E nona",
    "root": "E",
    "quality": "Nona",
    "notes": [
      "E",
      "G#",
      "B",
      "D",
      "F#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E nona."
  },
  {
    "id": "Em9",
    "symbol": "Em9",
    "name": "E menor nona",
    "root": "E",
    "quality": "Menor 9",
    "notes": [
      "E",
      "G",
      "B",
      "D",
      "F#"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E menor nona."
  },
  {
    "id": "Emaj9",
    "symbol": "Emaj9",
    "name": "E maior com nona",
    "root": "E",
    "quality": "Maj9",
    "notes": [
      "E",
      "G#",
      "B",
      "D#",
      "F#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de E maior com nona."
  },
  {
    "id": "F",
    "symbol": "F",
    "name": "F maior",
    "root": "F",
    "quality": "Maior",
    "notes": [
      "F",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Fm",
    "symbol": "Fm",
    "name": "F menor",
    "root": "F",
    "quality": "Menor",
    "notes": [
      "F",
      "Ab",
      "C"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "F7",
    "symbol": "F7",
    "name": "F com sétima menor",
    "root": "F",
    "quality": "Sétima",
    "notes": [
      "F",
      "A",
      "C",
      "Eb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F com sétima menor."
  },
  {
    "id": "Fmaj7",
    "symbol": "Fmaj7",
    "name": "F com sétima maior",
    "root": "F",
    "quality": "Maj7",
    "notes": [
      "F",
      "A",
      "C",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F com sétima maior."
  },
  {
    "id": "Fm7",
    "symbol": "Fm7",
    "name": "F menor com sétima",
    "root": "F",
    "quality": "Menor 7",
    "notes": [
      "F",
      "Ab",
      "C",
      "Eb"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F menor com sétima."
  },
  {
    "id": "Fsus2",
    "symbol": "Fsus2",
    "name": "F suspenso (2)",
    "root": "F",
    "quality": "Suspenso",
    "notes": [
      "F",
      "G",
      "C"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F suspenso (2)."
  },
  {
    "id": "Fsus4",
    "symbol": "Fsus4",
    "name": "F suspenso (4)",
    "root": "F",
    "quality": "Suspenso",
    "notes": [
      "F",
      "Bb",
      "C"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F suspenso (4)."
  },
  {
    "id": "Fadd9",
    "symbol": "Fadd9",
    "name": "F com nona adicionada",
    "root": "F",
    "quality": "Add9",
    "notes": [
      "F",
      "A",
      "C",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F com nona adicionada."
  },
  {
    "id": "Fdim",
    "symbol": "Fdim",
    "name": "F diminuto",
    "root": "F",
    "quality": "Diminuto",
    "notes": [
      "F",
      "Ab",
      "B"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F diminuto."
  },
  {
    "id": "Faug",
    "symbol": "Faug",
    "name": "F aumentado",
    "root": "F",
    "quality": "Aumentado",
    "notes": [
      "F",
      "A",
      "Db"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F aumentado."
  },
  {
    "id": "F9",
    "symbol": "F9",
    "name": "F nona",
    "root": "F",
    "quality": "Nona",
    "notes": [
      "F",
      "A",
      "C",
      "Eb",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F nona."
  },
  {
    "id": "Fm9",
    "symbol": "Fm9",
    "name": "F menor nona",
    "root": "F",
    "quality": "Menor 9",
    "notes": [
      "F",
      "Ab",
      "C",
      "Eb",
      "G"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F menor nona."
  },
  {
    "id": "Fmaj9",
    "symbol": "Fmaj9",
    "name": "F maior com nona",
    "root": "F",
    "quality": "Maj9",
    "notes": [
      "F",
      "A",
      "C",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F maior com nona."
  },
  {
    "id": "Fsharp",
    "symbol": "F#",
    "name": "F# maior",
    "root": "F#",
    "quality": "Maior",
    "notes": [
      "F#",
      "A#",
      "C#"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Fsharpm",
    "symbol": "F#m",
    "name": "F# menor",
    "root": "F#",
    "quality": "Menor",
    "notes": [
      "F#",
      "A",
      "C#"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Fsharp7",
    "symbol": "F#7",
    "name": "F# com sétima menor",
    "root": "F#",
    "quality": "Sétima",
    "notes": [
      "F#",
      "A#",
      "C#",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# com sétima menor."
  },
  {
    "id": "Fsharpmaj7",
    "symbol": "F#maj7",
    "name": "F# com sétima maior",
    "root": "F#",
    "quality": "Maj7",
    "notes": [
      "F#",
      "A#",
      "C#",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# com sétima maior."
  },
  {
    "id": "Fsharpm7",
    "symbol": "F#m7",
    "name": "F# menor com sétima",
    "root": "F#",
    "quality": "Menor 7",
    "notes": [
      "F#",
      "A",
      "C#",
      "E"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# menor com sétima."
  },
  {
    "id": "Fsharpsus2",
    "symbol": "F#sus2",
    "name": "F# suspenso (2)",
    "root": "F#",
    "quality": "Suspenso",
    "notes": [
      "F#",
      "G#",
      "C#"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# suspenso (2)."
  },
  {
    "id": "Fsharpsus4",
    "symbol": "F#sus4",
    "name": "F# suspenso (4)",
    "root": "F#",
    "quality": "Suspenso",
    "notes": [
      "F#",
      "B",
      "C#"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# suspenso (4)."
  },
  {
    "id": "Fsharpadd9",
    "symbol": "F#add9",
    "name": "F# com nona adicionada",
    "root": "F#",
    "quality": "Add9",
    "notes": [
      "F#",
      "A#",
      "C#",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# com nona adicionada."
  },
  {
    "id": "Fsharpdim",
    "symbol": "F#dim",
    "name": "F# diminuto",
    "root": "F#",
    "quality": "Diminuto",
    "notes": [
      "F#",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# diminuto."
  },
  {
    "id": "Fsharpaug",
    "symbol": "F#aug",
    "name": "F# aumentado",
    "root": "F#",
    "quality": "Aumentado",
    "notes": [
      "F#",
      "A#",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# aumentado."
  },
  {
    "id": "Fsharp9",
    "symbol": "F#9",
    "name": "F# nona",
    "root": "F#",
    "quality": "Nona",
    "notes": [
      "F#",
      "A#",
      "C#",
      "E",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# nona."
  },
  {
    "id": "Fsharpm9",
    "symbol": "F#m9",
    "name": "F# menor nona",
    "root": "F#",
    "quality": "Menor 9",
    "notes": [
      "F#",
      "A",
      "C#",
      "E",
      "G#"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# menor nona."
  },
  {
    "id": "Fsharpmaj9",
    "symbol": "F#maj9",
    "name": "F# maior com nona",
    "root": "F#",
    "quality": "Maj9",
    "notes": [
      "F#",
      "A#",
      "C#",
      "F",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de F# maior com nona."
  },
  {
    "id": "Gb",
    "symbol": "Gb",
    "name": "Gb maior",
    "root": "Gb",
    "quality": "Maior",
    "notes": [
      "Gb",
      "Bb",
      "Db"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Gbm",
    "symbol": "Gbm",
    "name": "Gb menor",
    "root": "Gb",
    "quality": "Menor",
    "notes": [
      "Gb",
      "A",
      "Db"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Gb7",
    "symbol": "Gb7",
    "name": "Gb com sétima menor",
    "root": "Gb",
    "quality": "Sétima",
    "notes": [
      "Gb",
      "Bb",
      "Db",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb com sétima menor."
  },
  {
    "id": "Gbmaj7",
    "symbol": "Gbmaj7",
    "name": "Gb com sétima maior",
    "root": "Gb",
    "quality": "Maj7",
    "notes": [
      "Gb",
      "Bb",
      "Db",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb com sétima maior."
  },
  {
    "id": "Gbm7",
    "symbol": "Gbm7",
    "name": "Gb menor com sétima",
    "root": "Gb",
    "quality": "Menor 7",
    "notes": [
      "Gb",
      "A",
      "Db",
      "E"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb menor com sétima."
  },
  {
    "id": "Gbsus2",
    "symbol": "Gbsus2",
    "name": "Gb suspenso (2)",
    "root": "Gb",
    "quality": "Suspenso",
    "notes": [
      "Gb",
      "Ab",
      "Db"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb suspenso (2)."
  },
  {
    "id": "Gbsus4",
    "symbol": "Gbsus4",
    "name": "Gb suspenso (4)",
    "root": "Gb",
    "quality": "Suspenso",
    "notes": [
      "Gb",
      "B",
      "Db"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb suspenso (4)."
  },
  {
    "id": "Gbadd9",
    "symbol": "Gbadd9",
    "name": "Gb com nona adicionada",
    "root": "Gb",
    "quality": "Add9",
    "notes": [
      "Gb",
      "Bb",
      "Db",
      "Ab"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb com nona adicionada."
  },
  {
    "id": "Gbdim",
    "symbol": "Gbdim",
    "name": "Gb diminuto",
    "root": "Gb",
    "quality": "Diminuto",
    "notes": [
      "Gb",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb diminuto."
  },
  {
    "id": "Gbaug",
    "symbol": "Gbaug",
    "name": "Gb aumentado",
    "root": "Gb",
    "quality": "Aumentado",
    "notes": [
      "Gb",
      "Bb",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb aumentado."
  },
  {
    "id": "Gb9",
    "symbol": "Gb9",
    "name": "Gb nona",
    "root": "Gb",
    "quality": "Nona",
    "notes": [
      "Gb",
      "Bb",
      "Db",
      "E",
      "Ab"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb nona."
  },
  {
    "id": "Gbm9",
    "symbol": "Gbm9",
    "name": "Gb menor nona",
    "root": "Gb",
    "quality": "Menor 9",
    "notes": [
      "Gb",
      "A",
      "Db",
      "E",
      "Ab"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb menor nona."
  },
  {
    "id": "Gbmaj9",
    "symbol": "Gbmaj9",
    "name": "Gb maior com nona",
    "root": "Gb",
    "quality": "Maj9",
    "notes": [
      "Gb",
      "Bb",
      "Db",
      "F",
      "Ab"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Gb maior com nona."
  },
  {
    "id": "G",
    "symbol": "G",
    "name": "G maior",
    "root": "G",
    "quality": "Maior",
    "notes": [
      "G",
      "B",
      "D"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Gm",
    "symbol": "Gm",
    "name": "G menor",
    "root": "G",
    "quality": "Menor",
    "notes": [
      "G",
      "A#",
      "D"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "G7",
    "symbol": "G7",
    "name": "G com sétima menor",
    "root": "G",
    "quality": "Sétima",
    "notes": [
      "G",
      "B",
      "D",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G com sétima menor."
  },
  {
    "id": "Gmaj7",
    "symbol": "Gmaj7",
    "name": "G com sétima maior",
    "root": "G",
    "quality": "Maj7",
    "notes": [
      "G",
      "B",
      "D",
      "F#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G com sétima maior."
  },
  {
    "id": "Gm7",
    "symbol": "Gm7",
    "name": "G menor com sétima",
    "root": "G",
    "quality": "Menor 7",
    "notes": [
      "G",
      "A#",
      "D",
      "F"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G menor com sétima."
  },
  {
    "id": "Gsus2",
    "symbol": "Gsus2",
    "name": "G suspenso (2)",
    "root": "G",
    "quality": "Suspenso",
    "notes": [
      "G",
      "A",
      "D"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G suspenso (2)."
  },
  {
    "id": "Gsus4",
    "symbol": "Gsus4",
    "name": "G suspenso (4)",
    "root": "G",
    "quality": "Suspenso",
    "notes": [
      "G",
      "C",
      "D"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G suspenso (4)."
  },
  {
    "id": "Gadd9",
    "symbol": "Gadd9",
    "name": "G com nona adicionada",
    "root": "G",
    "quality": "Add9",
    "notes": [
      "G",
      "B",
      "D",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G com nona adicionada."
  },
  {
    "id": "Gdim",
    "symbol": "Gdim",
    "name": "G diminuto",
    "root": "G",
    "quality": "Diminuto",
    "notes": [
      "G",
      "A#",
      "C#"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G diminuto."
  },
  {
    "id": "Gaug",
    "symbol": "Gaug",
    "name": "G aumentado",
    "root": "G",
    "quality": "Aumentado",
    "notes": [
      "G",
      "B",
      "D#"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G aumentado."
  },
  {
    "id": "G9",
    "symbol": "G9",
    "name": "G nona",
    "root": "G",
    "quality": "Nona",
    "notes": [
      "G",
      "B",
      "D",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G nona."
  },
  {
    "id": "Gm9",
    "symbol": "Gm9",
    "name": "G menor nona",
    "root": "G",
    "quality": "Menor 9",
    "notes": [
      "G",
      "A#",
      "D",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G menor nona."
  },
  {
    "id": "Gmaj9",
    "symbol": "Gmaj9",
    "name": "G maior com nona",
    "root": "G",
    "quality": "Maj9",
    "notes": [
      "G",
      "B",
      "D",
      "F#",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de G maior com nona."
  },
  {
    "id": "Ab",
    "symbol": "Ab",
    "name": "Ab maior",
    "root": "Ab",
    "quality": "Maior",
    "notes": [
      "Ab",
      "C",
      "Eb"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Abm",
    "symbol": "Abm",
    "name": "Ab menor",
    "root": "Ab",
    "quality": "Menor",
    "notes": [
      "Ab",
      "B",
      "Eb"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Ab7",
    "symbol": "Ab7",
    "name": "Ab com sétima menor",
    "root": "Ab",
    "quality": "Sétima",
    "notes": [
      "Ab",
      "C",
      "Eb",
      "Gb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab com sétima menor."
  },
  {
    "id": "Abmaj7",
    "symbol": "Abmaj7",
    "name": "Ab com sétima maior",
    "root": "Ab",
    "quality": "Maj7",
    "notes": [
      "Ab",
      "C",
      "Eb",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab com sétima maior."
  },
  {
    "id": "Abm7",
    "symbol": "Abm7",
    "name": "Ab menor com sétima",
    "root": "Ab",
    "quality": "Menor 7",
    "notes": [
      "Ab",
      "B",
      "Eb",
      "Gb"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab menor com sétima."
  },
  {
    "id": "Absus2",
    "symbol": "Absus2",
    "name": "Ab suspenso (2)",
    "root": "Ab",
    "quality": "Suspenso",
    "notes": [
      "Ab",
      "Bb",
      "Eb"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab suspenso (2)."
  },
  {
    "id": "Absus4",
    "symbol": "Absus4",
    "name": "Ab suspenso (4)",
    "root": "Ab",
    "quality": "Suspenso",
    "notes": [
      "Ab",
      "Db",
      "Eb"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab suspenso (4)."
  },
  {
    "id": "Abadd9",
    "symbol": "Abadd9",
    "name": "Ab com nona adicionada",
    "root": "Ab",
    "quality": "Add9",
    "notes": [
      "Ab",
      "C",
      "Eb",
      "Bb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab com nona adicionada."
  },
  {
    "id": "Abdim",
    "symbol": "Abdim",
    "name": "Ab diminuto",
    "root": "Ab",
    "quality": "Diminuto",
    "notes": [
      "Ab",
      "B",
      "D"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab diminuto."
  },
  {
    "id": "Abaug",
    "symbol": "Abaug",
    "name": "Ab aumentado",
    "root": "Ab",
    "quality": "Aumentado",
    "notes": [
      "Ab",
      "C",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab aumentado."
  },
  {
    "id": "Ab9",
    "symbol": "Ab9",
    "name": "Ab nona",
    "root": "Ab",
    "quality": "Nona",
    "notes": [
      "Ab",
      "C",
      "Eb",
      "Gb",
      "Bb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab nona."
  },
  {
    "id": "Abm9",
    "symbol": "Abm9",
    "name": "Ab menor nona",
    "root": "Ab",
    "quality": "Menor 9",
    "notes": [
      "Ab",
      "B",
      "Eb",
      "Gb",
      "Bb"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab menor nona."
  },
  {
    "id": "Abmaj9",
    "symbol": "Abmaj9",
    "name": "Ab maior com nona",
    "root": "Ab",
    "quality": "Maj9",
    "notes": [
      "Ab",
      "C",
      "Eb",
      "G",
      "Bb"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Ab maior com nona."
  },
  {
    "id": "A",
    "symbol": "A",
    "name": "A maior",
    "root": "A",
    "quality": "Maior",
    "notes": [
      "A",
      "C#",
      "E"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Am",
    "symbol": "Am",
    "name": "A menor",
    "root": "A",
    "quality": "Menor",
    "notes": [
      "A",
      "C",
      "E"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "A7",
    "symbol": "A7",
    "name": "A com sétima menor",
    "root": "A",
    "quality": "Sétima",
    "notes": [
      "A",
      "C#",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A com sétima menor."
  },
  {
    "id": "Amaj7",
    "symbol": "Amaj7",
    "name": "A com sétima maior",
    "root": "A",
    "quality": "Maj7",
    "notes": [
      "A",
      "C#",
      "E",
      "G#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A com sétima maior."
  },
  {
    "id": "Am7",
    "symbol": "Am7",
    "name": "A menor com sétima",
    "root": "A",
    "quality": "Menor 7",
    "notes": [
      "A",
      "C",
      "E",
      "G"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A menor com sétima."
  },
  {
    "id": "Asus2",
    "symbol": "Asus2",
    "name": "A suspenso (2)",
    "root": "A",
    "quality": "Suspenso",
    "notes": [
      "A",
      "B",
      "E"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A suspenso (2)."
  },
  {
    "id": "Asus4",
    "symbol": "Asus4",
    "name": "A suspenso (4)",
    "root": "A",
    "quality": "Suspenso",
    "notes": [
      "A",
      "D",
      "E"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A suspenso (4)."
  },
  {
    "id": "Aadd9",
    "symbol": "Aadd9",
    "name": "A com nona adicionada",
    "root": "A",
    "quality": "Add9",
    "notes": [
      "A",
      "C#",
      "E",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A com nona adicionada."
  },
  {
    "id": "Adim",
    "symbol": "Adim",
    "name": "A diminuto",
    "root": "A",
    "quality": "Diminuto",
    "notes": [
      "A",
      "C",
      "D#"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A diminuto."
  },
  {
    "id": "Aaug",
    "symbol": "Aaug",
    "name": "A aumentado",
    "root": "A",
    "quality": "Aumentado",
    "notes": [
      "A",
      "C#",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A aumentado."
  },
  {
    "id": "A9",
    "symbol": "A9",
    "name": "A nona",
    "root": "A",
    "quality": "Nona",
    "notes": [
      "A",
      "C#",
      "E",
      "G",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A nona."
  },
  {
    "id": "Am9",
    "symbol": "Am9",
    "name": "A menor nona",
    "root": "A",
    "quality": "Menor 9",
    "notes": [
      "A",
      "C",
      "E",
      "G",
      "B"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A menor nona."
  },
  {
    "id": "Amaj9",
    "symbol": "Amaj9",
    "name": "A maior com nona",
    "root": "A",
    "quality": "Maj9",
    "notes": [
      "A",
      "C#",
      "E",
      "G#",
      "B"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de A maior com nona."
  },
  {
    "id": "Bb",
    "symbol": "Bb",
    "name": "Bb maior",
    "root": "Bb",
    "quality": "Maior",
    "notes": [
      "Bb",
      "D",
      "F"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Bbm",
    "symbol": "Bbm",
    "name": "Bb menor",
    "root": "Bb",
    "quality": "Menor",
    "notes": [
      "Bb",
      "Db",
      "F"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "Bb7",
    "symbol": "Bb7",
    "name": "Bb com sétima menor",
    "root": "Bb",
    "quality": "Sétima",
    "notes": [
      "Bb",
      "D",
      "F",
      "Ab"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb com sétima menor."
  },
  {
    "id": "Bbmaj7",
    "symbol": "Bbmaj7",
    "name": "Bb com sétima maior",
    "root": "Bb",
    "quality": "Maj7",
    "notes": [
      "Bb",
      "D",
      "F",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb com sétima maior."
  },
  {
    "id": "Bbm7",
    "symbol": "Bbm7",
    "name": "Bb menor com sétima",
    "root": "Bb",
    "quality": "Menor 7",
    "notes": [
      "Bb",
      "Db",
      "F",
      "Ab"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb menor com sétima."
  },
  {
    "id": "Bbsus2",
    "symbol": "Bbsus2",
    "name": "Bb suspenso (2)",
    "root": "Bb",
    "quality": "Suspenso",
    "notes": [
      "Bb",
      "C",
      "F"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb suspenso (2)."
  },
  {
    "id": "Bbsus4",
    "symbol": "Bbsus4",
    "name": "Bb suspenso (4)",
    "root": "Bb",
    "quality": "Suspenso",
    "notes": [
      "Bb",
      "Eb",
      "F"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb suspenso (4)."
  },
  {
    "id": "Bbadd9",
    "symbol": "Bbadd9",
    "name": "Bb com nona adicionada",
    "root": "Bb",
    "quality": "Add9",
    "notes": [
      "Bb",
      "D",
      "F",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb com nona adicionada."
  },
  {
    "id": "Bbdim",
    "symbol": "Bbdim",
    "name": "Bb diminuto",
    "root": "Bb",
    "quality": "Diminuto",
    "notes": [
      "Bb",
      "Db",
      "E"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb diminuto."
  },
  {
    "id": "Bbaug",
    "symbol": "Bbaug",
    "name": "Bb aumentado",
    "root": "Bb",
    "quality": "Aumentado",
    "notes": [
      "Bb",
      "D",
      "Gb"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb aumentado."
  },
  {
    "id": "Bb9",
    "symbol": "Bb9",
    "name": "Bb nona",
    "root": "Bb",
    "quality": "Nona",
    "notes": [
      "Bb",
      "D",
      "F",
      "Ab",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb nona."
  },
  {
    "id": "Bbm9",
    "symbol": "Bbm9",
    "name": "Bb menor nona",
    "root": "Bb",
    "quality": "Menor 9",
    "notes": [
      "Bb",
      "Db",
      "F",
      "Ab",
      "C"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb menor nona."
  },
  {
    "id": "Bbmaj9",
    "symbol": "Bbmaj9",
    "name": "Bb maior com nona",
    "root": "Bb",
    "quality": "Maj9",
    "notes": [
      "Bb",
      "D",
      "F",
      "A",
      "C"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de Bb maior com nona."
  },
  {
    "id": "B",
    "symbol": "B",
    "name": "B maior",
    "root": "B",
    "quality": "Maior",
    "notes": [
      "B",
      "D#",
      "F#"
    ],
    "intervals": [
      "1",
      "3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Maior",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B maior.",
    "sertanejoApplication": "Acorde base muito usado em progressões simples e refrões."
  },
  {
    "id": "Bm",
    "symbol": "Bm",
    "name": "B menor",
    "root": "B",
    "quality": "Menor",
    "notes": [
      "B",
      "D",
      "F#"
    ],
    "intervals": [
      "1",
      "b3",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Menor",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B menor.",
    "sertanejoApplication": "Usado para modulações e versos mais sentimentais no sertanejo romântico."
  },
  {
    "id": "B7",
    "symbol": "B7",
    "name": "B com sétima menor",
    "root": "B",
    "quality": "Sétima",
    "notes": [
      "B",
      "D#",
      "F#",
      "A"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "Sétima",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B com sétima menor."
  },
  {
    "id": "Bmaj7",
    "symbol": "Bmaj7",
    "name": "B com sétima maior",
    "root": "B",
    "quality": "Maj7",
    "notes": [
      "B",
      "D#",
      "F#",
      "A#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7"
    ],
    "difficulty": "Intermediário",
    "category": "Maj7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B com sétima maior."
  },
  {
    "id": "Bm7",
    "symbol": "Bm7",
    "name": "B menor com sétima",
    "root": "B",
    "quality": "Menor 7",
    "notes": [
      "B",
      "D",
      "F#",
      "A"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7"
    ],
    "difficulty": "Intermediário",
    "category": "m7",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B menor com sétima."
  },
  {
    "id": "Bsus2",
    "symbol": "Bsus2",
    "name": "B suspenso (2)",
    "root": "B",
    "quality": "Suspenso",
    "notes": [
      "B",
      "C#",
      "F#"
    ],
    "intervals": [
      "1",
      "2",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B suspenso (2)."
  },
  {
    "id": "Bsus4",
    "symbol": "Bsus4",
    "name": "B suspenso (4)",
    "root": "B",
    "quality": "Suspenso",
    "notes": [
      "B",
      "E",
      "F#"
    ],
    "intervals": [
      "1",
      "4",
      "5"
    ],
    "difficulty": "Intermediário",
    "category": "Suspenso",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B suspenso (4)."
  },
  {
    "id": "Badd9",
    "symbol": "Badd9",
    "name": "B com nona adicionada",
    "root": "B",
    "quality": "Add9",
    "notes": [
      "B",
      "D#",
      "F#",
      "C#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Add9",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B com nona adicionada."
  },
  {
    "id": "Bdim",
    "symbol": "Bdim",
    "name": "B diminuto",
    "root": "B",
    "quality": "Diminuto",
    "notes": [
      "B",
      "D",
      "F"
    ],
    "intervals": [
      "1",
      "b3",
      "b5"
    ],
    "difficulty": "Intermediário",
    "category": "Diminuto",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B diminuto."
  },
  {
    "id": "Baug",
    "symbol": "Baug",
    "name": "B aumentado",
    "root": "B",
    "quality": "Aumentado",
    "notes": [
      "B",
      "D#",
      "G"
    ],
    "intervals": [
      "1",
      "3",
      "#5"
    ],
    "difficulty": "Intermediário",
    "category": "Aumentado",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B aumentado."
  },
  {
    "id": "B9",
    "symbol": "B9",
    "name": "B nona",
    "root": "B",
    "quality": "Nona",
    "notes": [
      "B",
      "D#",
      "F#",
      "A",
      "C#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B nona."
  },
  {
    "id": "Bm9",
    "symbol": "Bm9",
    "name": "B menor nona",
    "root": "B",
    "quality": "Menor 9",
    "notes": [
      "B",
      "D",
      "F#",
      "A",
      "C#"
    ],
    "intervals": [
      "1",
      "b3",
      "5",
      "b7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B menor nona."
  },
  {
    "id": "Bmaj9",
    "symbol": "Bmaj9",
    "name": "B maior com nona",
    "root": "B",
    "quality": "Maj9",
    "notes": [
      "B",
      "D#",
      "F#",
      "A#",
      "C#"
    ],
    "intervals": [
      "1",
      "3",
      "5",
      "7",
      "9"
    ],
    "difficulty": "Intermediário",
    "category": "Extensões",
    "guitarPositions": [
      {
        "frets": [
          -1,
          3,
          2,
          0,
          1,
          0
        ],
        "baseFret": 1
      }
    ],
    "description": "Acorde de B maior com nona."
  }
];
