import { Course } from '../models/courses.model';

export const COURSES_DATA: readonly Course[] = [
  {
    id: 'c-vocal-sertanejo',
    title: 'Canto Sertanejo: Melismas e Apoio',
    description: 'Domine a colocação de voz, o uso de melismas e o drive sutil característico do estilo sertanejo atual.',
    instructor: 'Eduardo "Dudu" Martins',
    level: 'Intermediário',
    progress: 40,
    icon: 'mic_external_on',
    themeColor: 'primary',
    modules: [
      {
        id: 'v1-respiracao',
        title: 'Módulo 1: Apoio Diafragmático',
        description: 'A base para não perder o fôlego nos refrões.',
        lessons: [
          { id: 'vl1', title: 'Respiração Costodiafragmática Prática', durationMinutes: 10, type: 'video', videoUrl: 'https://www.youtube.com/embed/vFX3tzpBq4A', isCompleted: true },
          { id: 'vl2', title: 'Mantendo o Gás no Refrão', durationMinutes: 15, type: 'practice', isCompleted: true },
          { id: 'vl3', title: 'Controle de Pressão Aérea', durationMinutes: 8, type: 'video', videoUrl: 'https://www.youtube.com/embed/1OZBxOPcM4U', isCompleted: false },
        ]
      },
      {
        id: 'v2-melismas',
        title: 'Módulo 2: Agilidade e Melismas',
        description: 'As "voltinas" perfeitas sem exageros.',
        lessons: [
          { id: 'vl4', title: 'O que é o melisma sertanejo', durationMinutes: 12, type: 'video', videoUrl: 'https://www.youtube.com/embed/dsEWV1Il_j4', isCompleted: false },
          { id: 'vl5', title: 'Treino de Agilidade Pentatônica', durationMinutes: 20, type: 'practice', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'c-violao-sertanejo',
    title: 'Violão Base para Duplas',
    description: 'Os ritmos essenciais, palhetadas, modões e guarânias para acompanhar qualquer cantor.',
    instructor: 'Bruno Violeiro',
    level: 'Iniciante',
    progress: 72,
    icon: 'straighten',
    themeColor: 'accent',
    modules: [
      {
        id: 'g1-ritmos',
        title: 'Módulo 1: Os 5 Ritmos Essenciais',
        description: 'Vaneira, Guarânia, Arrocha e mais.',
        lessons: [
          { id: 'gl1', title: 'O Arrocha Moderno', durationMinutes: 12, type: 'video', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', isCompleted: true },
          { id: 'gl2', title: 'Levada de Vaneira (O Segredo)', durationMinutes: 15, type: 'practice', isCompleted: true },
          { id: 'gl3', title: 'Guarânia e Modão', durationMinutes: 14, type: 'video', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', isCompleted: true },
        ]
      },
      {
        id: 'g2-dinamica',
        title: 'Módulo 2: Dinâmica de Palco',
        description: 'Quando crescer a batida e quando segurar.',
        lessons: [
          { id: 'gl4', title: 'Preenchendo espaços do cantor', durationMinutes: 10, type: 'text', isCompleted: true },
          { id: 'gl5', title: 'Exercício: Acompanhando a 2ª Voz', durationMinutes: 20, type: 'practice', isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'c-carreira-01',
    title: 'Gestão de Carreira e Palco',
    description: 'Como lidar com contratantes, repertório de show, e presença de palco para engajar o público.',
    instructor: 'Marcos & Assessoria',
    level: 'Avançado',
    progress: 0,
    icon: 'star',
    themeColor: 'success',
    modules: [
      {
        id: 'c1-repertorio',
        title: 'Módulo 1: Construção de Setlist',
        description: 'A curva de emoção perfeita para um show de 2h.',
        lessons: [
          { id: 'cl1', title: 'Abertura de Impacto', durationMinutes: 12, type: 'video', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', isCompleted: false },
          { id: 'cl2', title: 'O momento da "Sofrência"', durationMinutes: 18, type: 'video', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', isCompleted: false },
        ]
      }
    ]
  }
];
