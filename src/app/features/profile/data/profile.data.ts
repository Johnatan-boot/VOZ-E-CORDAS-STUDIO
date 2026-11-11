import { StudentProfile } from '../models/profile.model';

export const DEMO_PROFILE: StudentProfile = {
  id: 'student-1',
  name: 'Lucas',
  stageName: 'Voz & Cordas',
  bio: 'Músico apaixonado por harmonia e improvisação. Buscando aprimorar a conexão entre o canto e o violão.',
  musicalProfile: {
    mainInstrument: 'Violão',
    secondaryInstrument: 'Teclado',
    voiceType: 'Barítono',
    experienceLevel: 'Intermediário',
    favoriteStyles: ['Sertanejo', 'Sertanejo Romântico', 'Modão', 'MPB', 'Folk']
  },
  goals: [
    { id: 'g1', title: 'Melhorar afinação vocal', description: 'Trabalhar afinação em notas longas' },
    { id: 'g2', title: 'Desenvolver segunda voz', description: 'Aprender a harmonizar em terças e sextas' },
    { id: 'g3', title: 'Melhorar acompanhamento no violão', description: 'Praticar levadas e dedilhados' }
  ],
  preferences: {
    studyDuration: 30,
    preferredPracticePeriod: 'Noite',
    preferredStyles: ['Sertanejo', 'Folk']
  }
};
