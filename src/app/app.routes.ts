import { Routes } from '@angular/router';
import { AppShell } from './layouts/app-shell/app-shell';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard'),
        data: { title: 'Dashboard', category: 'PRINCIPAL', icon: 'dashboard' },
      },
      {
        path: 'canto',
        loadComponent: () => import('./features/vocal/vocal'),
        data: { title: 'Canto', category: 'TREINAMENTO', icon: 'mic' },
      },
      {
        path: 'notas-vocais',
        loadComponent: () => import('./features/vocal/components/vocal-notes-explorer/vocal-notes-explorer').then(m => m.VocalNotesExplorer),
        data: { title: 'Notas 1ª & 2ª Voz', category: 'TREINAMENTO', icon: 'record_voice_over' },
      },
      {
        path: 'violao',
        loadComponent: () => import('./features/guitar/guitar'),
        data: { title: 'Violão', category: 'TREINAMENTO', icon: 'straighten' },
      },
      {
        path: 'cursos',
        loadComponent: () => import('./features/courses/courses'),
        data: { title: 'Cursos', category: 'TREINAMENTO', icon: 'library_music' },
      },
      {
        path: 'leitura',
        loadComponent: () => import('./features/reading/reading'),
        data: { title: 'Leitura Musical', category: 'TREINAMENTO', icon: 'music_note' },
      },
      {
        path: 'tuner',
        loadComponent: () => import('./features/tuner/tuner'),
        data: { title: 'Afinador', category: 'FERRAMENTAS', icon: 'tune' },
      },
      {
        path: 'afinador',
        redirectTo: 'tuner',
        pathMatch: 'full',
      },
      {
        path: 'studio',
        loadComponent: () => import('./features/studio/studio'),
        data: { title: 'Studio', category: 'FERRAMENTAS', icon: 'graphic_eq' },
      },
      {
        path: 'biblioteca-musical',
        loadComponent: () => import('./features/music-library/music-library'),
        data: { title: 'Biblioteca Musical', category: 'FERRAMENTAS', icon: 'menu_book' },
      },
      {
        path: 'duo',
        loadComponent: () => import('./features/duo/duo'),
        data: { title: 'Treino de Dupla', category: 'DUO', icon: 'group' },
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/profile/profile'),
        data: { title: 'Meu Perfil', category: 'ALUNO', icon: 'person' },
      },
      {
        path: 'progresso',
        loadComponent: () => import('./features/progress/progress'),
        data: { title: 'Progresso', category: 'ALUNO', icon: 'trending_up' },
      },
      {
        path: 'gamificacao',
        loadComponent: () => import('./features/gamification/gamification'),
        data: { title: 'Gamificação', category: 'ALUNO', icon: 'emoji_events' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
