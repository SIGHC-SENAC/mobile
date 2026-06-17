
## 📱 Sobre o Projeto

P.I é uma aplicação mobile multiplataforma desenvolvida com React Native e Expo que permite aos estudantes:

- 🔐 **Autenticação Segura**: Login, recuperação de senha e acesso pela primeira vez com integração Firebase
- 📊 **Dashboard Personalizado**: Visualização de progresso em atividades complementares e resumo do status acadêmico
- 📜 **Gerenciamento de Certificados**: Upload e histórico de certificados de atividades complementares
- 📋 **Consulta de Atividades**: Guia de atividades permitidas e requisitos para complementação curricular
- 📱 **Menu Lateral**: Fácil navegação e acesso a funcionalidades principais

## 🛠️ Tecnologias

### Core

- **React Native** 0.81.5 - Framework para desenvolvimento mobile
- **Expo** 54.0.34 - Plataforma para desenvolvimento React Native
- **TypeScript** 5.9.2 - Tipagem estática

### Autenticação e Backend

- **Firebase** 12.14.0 - Autenticação e armazenamento de dados
- **AsyncStorage** - Armazenamento local de dados

### Navegação

- **React Navigation** 7.x
  - Bottom Tabs Navigation
  - Native Stack Navigation

### UI/UX

- **Expo Icons** - Biblioteca de ícones
- **Expo Image** - Componente otimizado de imagem
- **Expo Haptics** - Feedback tátil
- **Safe Area Context** - Suporte para notches e safe areas

### Utilidades

- **Expo Document Picker** - Seleção de arquivos
- **Expo Image Picker** - Seleção de imagens da galeria/câmera
- **Expo File System** - Acesso ao sistema de arquivos
- **React Native Reanimated** - Animações suaves
- **React Native Gesture Handler** - Gestos customizados

### Desenvolvimento

- **ESLint** - Linting de código
- **Expo Lint** - Linter configurado para Expo

## 📁 Estrutura do Projeto

```
mobile/
├── App.js                          # Arquivo principal da aplicação
├── app.json                        # Configuração do Expo
├── index.js                        # Entry point
├── package.json                    # Dependências do projeto
├── tsconfig.json                   # Configuração TypeScript
├── eslint.config.js               # Configuração ESLint
│
├── assets/                         # Recursos estáticos
│   └── images/                     # Ícones e imagens
│
├── constants/                      # Constantes da aplicação
│   ├── firebase.ts                # Configuração do Firebase
│   └── theme.ts                   # Tema e cores da aplicação
│
├── hooks/                          # Custom React Hooks
│   ├── use-color-scheme.ts        # Hook para esquema de cores
│   ├── use-color-scheme.web.ts    # Versão web do hook
│   └── use-theme-color.ts         # Hook para cores do tema
│
├── src/
│   ├── components/                # Componentes reutilizáveis
│   │   ├── auth/                  # Componentes de autenticação
│   │   │   ├── ErrorAlert.js      # Alerta de erro
│   │   │   ├── FormField.js       # Campo de formulário
│   │   │   ├── HeroBanner.js      # Banner principal
│   │   │   └── SubmitButton.js    # Botão de envio
│   │   │
│   │   └── components-Aluno/      # Componentes específicos para alunos
│   │       ├── AppHeader.js                    # Cabeçalho da aplicação
│   │       ├── CategoryActivitiesModal.js      # Modal de categorias
│   │       ├── CertificateUploadModal.js       # Modal de upload de certificados
│   │       ├── ComplementaryHoursProgress.js   # Progresso de horas
│   │       ├── DashboardSummaryCards.js        # Cards do dashboard
│   │       ├── DashboardWelcomeBanner.js       # Banner de boas-vindas
│   │       ├── GuideAlert.js                   # Alerta de guia
│   │       ├── GuideFAQ.js                     # FAQ do guia
│   │       ├── GuideProcessSteps.js            # Passos do processo
│   │       ├── GuideRequirements.js            # Requisitos
│   │       ├── HistoryCertificateCard.js       # Card de certificado
│   │       ├── HistoryFilters.js               # Filtros do histórico
│   │       └── SideMenuModalAluno.js           # Menu lateral
│   │
│   ├── screens/                   # Telas da aplicação
│   │   ├── auth/                  # Telas de autenticação
│   │   │   ├── LoginScreen.js             # Tela de login
│   │   │   ├── ForgotPassword.js          # Tela de recuperação de senha
│   │   │   └── FirstAccess.js             # Tela de primeiro acesso
│   │   │
│   │   └── aluno/                 # Telas do aluno
│   │       ├── HomeScreen.js      # Tela inicial (Dashboard)
│   │       ├── HistoryScreen.js   # Tela de histórico de certificados
│   │       └── GuideScreen.js     # Tela de guia de atividades
│   │
│   └── services/                  # Serviços e chamadas API
│       ├── apiClient.js           # Cliente HTTP configurado
│       ├── auth.js                # Serviço de autenticação
│       ├── activities.js          # Serviço de atividades
│       ├── certificates.js        # Serviço de certificados
│       └── dashboard.js           # Serviço de dashboard
│
├── docs/                          # Documentação
│   ├── api-activities.md          # Documentação da API de atividades
│   ├── api-functionalities.md     # Funcionalidades disponíveis
│   ├── category-activities-modal.md
│   ├── certificate-upload-api-integration.md
│   ├── certificate-upload-modal.md
│   ├── menu-logout.md
│   └── react-state-effects.md
│
└── scripts/                       # Scripts de utilidade
    └── reset-project.js           # Script para resetar o projeto
```

## 🚀 Primeiros Passos

### Pré-requisitos

- **Node.js** 18+ e npm/yarn
- **Expo CLI** instalado globalmente (opcional, mas recomendado)
- Conta **Firebase** com projeto configurado
- **Android Studio** ou **Xcode** para emuladores (opcional)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <seu-repositorio>
   cd mobile
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto (se necessário)
   - Configure suas credenciais do Firebase em `constants/firebase.ts`

4. **Inicie o desenvolvimento**
   ```bash
   npm start
   # ou
   yarn start
   ```

## 📱 Executando o Aplicativo

### Em Desenvolvimento

```bash
npm start
```

A CLI do Expo apresentará opções para abrir em:

- **Expo Go** - Aplicativo sandbox rápido para testes (recomendado para iniciar)
- **Android Emulator** - Emulador do Android Studio
- **iOS Simulator** - Simulador do Xcode (macOS apenas)
- **Web** - Versão web do aplicativo

### Plataformas Específicas

```bash
# Android
npm run android

# iOS (macOS apenas)
npm run ios

# Web
npm run web
```

## 🧪 Testes e Linting

```bash
# Executar linter
npm run lint

# Verificar código com ESLint
expo lint
```

## 📚 Documentação Adicional

Veja a pasta `docs/` para documentação detalhada:

- **[api-activities.md](docs/api-activities.md)** - Endpoints da API de atividades
- **[api-functionalities.md](docs/api-functionalities.md)** - Funcionalidades implementadas
- **[certificate-upload-api-integration.md](docs/certificate-upload-api-integration.md)** - Integração upload de certificados
- **[react-state-effects.md](docs/react-state-effects.md)** - Explicação de estados e efeitos

## 🎨 Temas e Personalização

O projeto suporta temas claros e escuros automáticos:

- **Tema Light** - Interface clara
- **Tema Dark** - Interface escura

Configuração em `constants/theme.ts`

## 🔐 Autenticação Firebase

O projeto usa Firebase Authentication com os seguintes fluxos:

- **Login** - Email e senha
- **Primeira Acesso** - Criação de conta de novo usuário
- **Recuperação de Senha** - Reset de senha via email
- **Verificação de Sessão** - Mantém usuário autenticado entre sessões

## 🌐 Multiplataforma

O aplicativo é executável em:

- **Android** (API 21+)
- **iOS** (iOS 13+)
- **Web** - Versão web responsiva

## 📝 Scripts Disponíveis

| Script                  | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `npm start`             | Inicia o servidor de desenvolvimento Expo |
| `npm run android`       | Abre no emulador Android                  |
| `npm run ios`           | Abre no simulador iOS                     |
| `npm run web`           | Abre na versão web                        |
| `npm run lint`          | Executa o linter ESLint                   |
| `npm run reset-project` | Reseta o projeto para estado inicial      |

## 🐛 Troubleshooting

### Problema: "Cannot find module 'firebase'"

**Solução:** Execute `npm install` para instalar as dependências

### Problema: Erro de conexão ao Firebase

**Solução:** Verifique as credenciais em `constants/firebase.ts` e configure seu projeto no Console do Firebase

### Problema: Porta 8081 já está em uso

**Solução:** Execute `npm start` novamente ou use uma porta diferente com `npm start -- --port 3000`

---

**Última atualização:** Junho de 2026
