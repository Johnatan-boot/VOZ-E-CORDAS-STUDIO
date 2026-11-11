# Voz & Cordas Studio

## ETAPA 12 — APP SHELL E NAVEGAÇÃO

* **Objetivo:** Consolidar a experiência global do frontend garantindo a integração estrutural, visual e de navegação de todos os módulos.
* **Componentes globais envolvidos:** `AppShell`, `AppSidebar`, `AppHeader`, `AppMobileNav`.
* **Rotas integradas:** Dashboard (`/dashboard`), Canto (`/canto`), Violão (`/violao`), Afinador (`/tuner`), Studio de Gravação (`/studio`), Cursos (`/cursos`), Duo (`/duo`).
* **Responsividade:** Layout global adaptável do mobile (320px) até telas ultra-wide (1920px), com controle nativo de Drawer para dispositivos menores e Sidebar fixed em desktop.
* **Acessibilidade:** Navegação com marcações ARIA, foco visível gerenciado nos botões globais e menu mobile, labels preenchidos e hierarquia semântica.
* **Validações:** Realizadas sem impacto nas funcionalidades existentes (nenhuma regressão), com lazy loading preservado para a separação dos módulos e sem memory leaks por navegação global.

## ETAPA 15 — GAMIFICAÇÃO E CONQUISTAS

* **Objetivo:** Adicionar uma camada de gamificação visual (XP, níveis, sequência de dias, metas e conquistas).
* **Estrutura:** Feature independente localizada em `/gamificacao`, totalmente baseada em Signals para estado local e dados demonstrativos.
* **Componentes:** `GamificationHero`, `LevelCard`, `StreakCard`, `GoalsCard`, `ChallengesCard`, e `AchievementsGrid`.
* **Acessibilidade e Responsividade:** Funcionalidades 100% responsivas mantendo o design premium (Dark Studio) e sem utilização de recursos interativos não essenciais.
* **Backend:** Puramente Frontend e demonstrativo (sem persistência ou APIs).
Etapa 15 — Gamificação e Conquistas
- Rota: /gamificacao
- Responsabilidade: Apresentar de forma visual a evolução do usuário (nível, XP, streak, metas, desafios e conquistas).
- Arquitetura: Standalone components, local Signals state, zero persistência global.
- Dados: Demonstrações importadas localmente do gamification.data.ts. Nenhuma API real acoplada.

## Etapa 16 — Biblioteca Musical
Implementação de um dicionário interativo de cifras, escalas e intervalos.
- **Dicionário de Cifras:** Ampla cobertura de acordes (Maiores, Menores, Sétimas, Suspensos, Diminutos, etc.) com representação visual no braço do violão, notas e intervalos.
- **Escalas:** Mapeamento das principais escalas (Maiores, Menores, Pentatônicas, Modos Gregos) detalhando fórmulas e graus.
- **Intervalos:** Guia prático de distâncias em semitons e aplicação.
- **Busca e Filtros:** Ferramentas de pesquisa reativas e categorização completa, funcionando de forma 100% local com dados estáticos para altíssima performance.

## Leitura Musical e Afinador de Violão (Atualização)
- **Afinador Específico para Violão**: Adicionado modo interativo que apresenta as cordas E, A, D, G, B, e E reagindo individualmente à frequência.
- **Teoria Musical**: Nova seção "Leitura Musical" ensinando visualmente Partitura (pentagrama, claves, linhas e espaços) e Tablatura.

## Treinamento Vocal e Harmonia
- **Projeção de Harmonia:** Síntese de áudio adicionada! Agora, a plataforma gera auditivamente a 2ª voz em tempo real baseada na afinação captada (suportando diversos intervalos).
- **Simulador sem Microfone:** Adicionado um teclado virtual interativo no card de projeção de harmonia, permitindo testar a detecção e geração de harmonia mesmo sem um microfone conectado.

## Áudio Profissional com Tone.js (Samplers)
- **Vozes Reais & Violão:** Implementado motor de áudio com bibliotecas Tone.js e *SoundFonts*. Agora as notas de teste são tocadas com som de um Coro real (Ahhh) e os tons guia dos exercícios são tocados com som de Violão Acústico gravado em estúdio, saindo da síntese eletrônica.
- **Harmonia ao Vivo (Microfone):** A projeção de harmonia com o microfone agora aplica um *PitchShift* diretamente na SUA voz. O efeito de 2ª voz soa idêntico a você, como se você mesmo estivesse cantando em coro.
