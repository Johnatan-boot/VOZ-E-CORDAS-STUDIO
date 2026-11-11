import { DuoPartner, DuoExercise } from '../models/duo.model';

export const DUO_PARTNERS: readonly DuoPartner[] = [
  {
    id: 'partner-1',
    name: 'Lucas',
    instrument: 'Violão',
    level: 'Intermediário',
    status: 'Disponível'
  },
  {
    id: 'partner-2',
    name: 'Marina',
    instrument: 'Voz',
    voiceType: 'Segunda Voz',
    level: 'Avançado',
    status: 'Disponível'
  },
  {
    id: 'partner-3',
    name: 'Rafael',
    instrument: 'Teclado',
    level: 'Iniciante',
    status: 'Ocupado'
  }
];

export const DUO_EXERCISES: readonly DuoExercise[] = [
  {
    id: 'ex-1',
    title: 'Harmonia em Terças',
    description: 'Treine a construção de uma segunda voz mantendo a afinação e o intervalo correto (terças paralelas).',
    category: 'Voz & Voz',
    difficulty: 'Intermediário',
    durationMinutes: 15,
    focus: 'Afinação de Intervalos',
    status: 'pending'
  },
  {
    id: 'ex-2',
    title: 'Base e Contracanto',
    description: 'Um faz a base rítmica no violão enquanto o outro foca no contracanto vocal e improvisação.',
    category: 'Violão & Voz',
    difficulty: 'Avançado',
    durationMinutes: 20,
    focus: 'Sincronia Rítmica',
    status: 'pending'
  },
  {
    id: 'ex-3',
    title: 'Pergunta e Resposta',
    description: 'Exercício de percepção onde um cria uma frase melódica e o outro responde respeitando a harmonia.',
    category: 'Improvisação',
    difficulty: 'Iniciante',
    durationMinutes: 10,
    focus: 'Percepção',
    status: 'completed'
  },
  {
    id: 'ex-4',
    title: 'Acordes e Arpejos',
    description: 'Prática de acompanhamento, onde o violão principal dedilha arpejos enquanto a base marca os acordes.',
    category: 'Violão & Violão',
    difficulty: 'Intermediário',
    durationMinutes: 12,
    focus: 'Preenchimento Harmônico',
    status: 'pending'
  }
];
