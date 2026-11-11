export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly route: string;
  readonly icon: string;
  readonly badge?: string;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}

export const NAVIGATION_SECTIONS: readonly NavSection[] = [
  {
    title: 'PRINCIPAL',
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
      { id: 'progresso', label: 'Progresso', route: '/progresso', icon: 'trending_up' },
      { id: 'gamificacao', label: 'Conquistas', route: '/gamificacao', icon: 'emoji_events' },
    ],
  },
  {
    title: 'TREINAMENTO',
    items: [
      { id: 'canto', label: 'Canto', route: '/canto', icon: 'mic' },
      { id: 'notas-vocais', label: 'Notas 1ª & 2ª Voz', route: '/notas-vocais', icon: 'record_voice_over', badge: 'Novo' },
      { id: 'violao', label: 'Violão', route: '/violao', icon: 'straighten' },
      { id: 'leitura', label: 'Leitura', route: '/leitura', icon: 'music_note' },
      { id: 'cursos', label: 'Cursos', route: '/cursos', icon: 'library_music' },
    ],
  },
  {
    title: 'FERRAMENTAS',
    items: [
      { id: 'afinador', label: 'Afinador', route: '/tuner', icon: 'tune' },
      { id: 'studio', label: 'Studio', route: '/studio', icon: 'graphic_eq' },
      { id: 'music-library', label: 'Biblioteca', route: '/biblioteca-musical', icon: 'menu_book' },
    ],
  },
  {
    title: 'DUO',
    items: [
      { id: 'duo', label: 'Dupla', route: '/duo', icon: 'group' },
    ],
  },
];
