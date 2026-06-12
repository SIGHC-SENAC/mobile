# useState e useEffect usados no app

## O que este documento explica

Este documento explica os principais `useState` e `useEffect` usados no app, o motivo de cada um existir e como eles controlam tela, menu, modais e carregamento de dados.

## Conceito rápido

### useState

`useState` guarda uma informação que pode mudar enquanto o app está aberto.

Exemplo:

```js
const [isMenuVisible, setIsMenuVisible] = useState(false);
```

Nesse caso:

- `isMenuVisible` é o valor atual.
- `setIsMenuVisible` altera o valor.
- `false` é o valor inicial.

Quando o estado muda, o React renderiza a tela novamente com o novo valor.

### useEffect

`useEffect` executa um efeito quando o componente abre ou quando algum valor muda.

Exemplo:

```js
useEffect(() => onAuthStateChanged(auth, setUser), []);
```

O `[]` no final significa que esse efeito roda uma vez quando o app inicia.

## App.js

Arquivo:

```txt
App.js
```

### Estado user

```js
const [user, setUser] = useState(undefined);
```

Esse estado guarda o usuário logado.

Ele começa como `undefined` porque o app ainda não sabe se existe usuário logado.

O app usa três situações:

- `undefined`: ainda verificando login.
- `null`: não existe usuário logado.
- objeto de usuário: existe usuário logado.

### useEffect da autenticação

```js
useEffect(() => onAuthStateChanged(auth, setUser), []);
```

Esse efeito escuta o Firebase Auth.

Passo a passo:

1. O app abre.
2. O `useEffect` roda uma vez.
3. `onAuthStateChanged` pergunta ao Firebase se existe usuário logado.
4. Quando o Firebase responde, ele chama `setUser`.
5. Se existir usuário, o app mostra as telas do aluno.
6. Se não existir usuário, o app mostra a tela de login.

### Estado activeScreen

```js
const [activeScreen, setActiveScreen] = useState("dashboard");
```

Esse estado controla qual tela está aberta no app.

Valores usados:

- `dashboard`
- `history`
- `guide`

Quando o usuário toca no menu lateral, o app chama:

```js
setActiveScreen(screen)
```

Depois disso, o `App.js` escolhe qual tela renderizar.

### Estado isMenuVisible

```js
const [isMenuVisible, setIsMenuVisible] = useState(false);
```

Esse estado controla se o menu lateral está aberto.

Para abrir:

```js
setIsMenuVisible(true)
```

Para fechar:

```js
setIsMenuVisible(false)
```

O valor é passado para o componente:

```js
<SideMenuModalAluno visible={isMenuVisible} />
```

## HomeScreen.js

Arquivo:

```txt
src/screens/aluno/HomeScreen.js
```

### Estado isUploadModalVisible

```js
const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
```

Esse estado controla o modal de envio de certificado.

Quando o usuário toca no botão `Enviar`:

```js
onSendPress={() => setIsUploadModalVisible(true)}
```

O modal recebe:

```js
<CertificateUploadModal
  visible={isUploadModalVisible}
  onClose={() => setIsUploadModalVisible(false)}
/>
```

Passo a passo:

1. O modal começa fechado.
2. O usuário toca em `Enviar`.
3. O estado vira `true`.
4. O modal aparece.
5. Ao fechar, o estado volta para `false`.

## ComplementaryHoursProgress.js

Arquivo:

```txt
src/components/components-Aluno/ComplementaryHoursProgress.js
```

Esse componente controla os cards de categorias e o modal de atividades.

### Estado selectedCategory

```js
const [selectedCategory, setSelectedCategory] = useState(null);
```

Esse estado guarda qual categoria foi clicada.

Exemplo:

```js
setSelectedCategory(category)
```

Se ele for `null`, o modal fica fechado.

Se ele tiver uma categoria, o modal abre:

```js
visible={Boolean(selectedCategory)}
```

### Estado activities

```js
const [activities, setActivities] = useState([]);
```

Esse estado guarda a lista de atividades que veio da API.

Quando o usuário abre uma categoria:

```js
const categoryActivities = await getCategoryActivities(category.id);
setActivities(categoryActivities);
```

Depois, o modal recebe:

```js
activities={activities}
```

### Estado loadingActivities

```js
const [loadingActivities, setLoadingActivities] = useState(false);
```

Esse estado indica se o app está carregando atividades da API.

Ao abrir uma categoria:

```js
setLoadingActivities(true);
```

Depois que a API responde:

```js
setLoadingActivities(false);
```

O modal usa isso para mostrar carregamento:

```js
loading={loadingActivities}
```

### Função handleOpenCategory

```js
async function handleOpenCategory(category) {
  setSelectedCategory(category);
  setLoadingActivities(true);
  setActivities([]);

  const categoryActivities = await getCategoryActivities(category.id);

  setActivities(categoryActivities);
  setLoadingActivities(false);
}
```

Passo a passo:

1. Guarda a categoria clicada.
2. Abre o modal.
3. Liga o estado de carregamento.
4. Limpa atividades antigas.
5. Busca as atividades da API.
6. Salva as atividades no estado.
7. Desliga o carregamento.

### Função handleCloseCategory

```js
function handleCloseCategory() {
  setSelectedCategory(null);
  setActivities([]);
  setLoadingActivities(false);
}
```

Passo a passo:

1. Remove a categoria selecionada.
2. Fecha o modal.
3. Limpa a lista.
4. Garante que o loading fique desligado.

## SideMenuModalAluno.js

Arquivo:

```txt
src/components/components-Aluno/SideMenuModalAluno.js
```

### Estado mounted

```js
const [mounted, setMounted] = useState(visible);
```

Esse estado controla se o modal do menu ainda está montado na tela.

Ele é necessário porque o menu tem animação de fechar.

Se o componente desmontasse imediatamente quando `visible` vira `false`, a animação de saída não apareceria.

### useEffect da animação de abertura

```js
useEffect(() => {
  if (visible) {
    setMounted(true);
    slideX.setValue(-PANEL_WIDTH);
    backdropOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(slideX, {
        toValue: 0,
        damping: 24,
        stiffness: 190,
        mass: 0.85,
        overshootClamping: true,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }
}, [visible, slideX, backdropOpacity]);
```

Esse efeito roda quando `visible` muda.

Passo a passo:

1. Se `visible` virar `true`, o menu precisa abrir.
2. `setMounted(true)` garante que o modal exista na tela.
3. `slideX.setValue(-PANEL_WIDTH)` coloca o menu fora da tela.
4. `backdropOpacity.setValue(0)` deixa o fundo escuro invisível.
5. `Animated.spring` faz o menu deslizar da esquerda para dentro.
6. `Animated.timing` faz o fundo escuro aparecer.

### Fechamento com animação

```js
function closeWithAnimation(callback = onClose) {
  Animated.parallel([
    Animated.timing(slideX, {
      toValue: -PANEL_WIDTH,
      duration: 210,
      useNativeDriver: true,
    }),
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }),
  ]).start(() => {
    setMounted(false);
    callback?.();
  });
}
```

Passo a passo:

1. O menu desliza para fora da tela.
2. O fundo escuro desaparece.
3. Quando a animação termina, `setMounted(false)` desmonta o modal.
4. Depois disso, o callback é chamado.

## CertificateUploadModal.js

Arquivo:

```txt
src/components/components-Aluno/CertificateUploadModal.js
```

### Estado step

```js
const [step, setStep] = useState(1);
```

Controla qual etapa do modal de envio está ativa.

Etapas usadas:

- `1`: Anexo.
- `2`: Informações.

### Estado processing

```js
const [processing, setProcessing] = useState(false);
```

Controla quando o modal está simulando processamento do PDF.

Quando `processing` é `true`, o botão muda para estado de processamento.

### Estado isMounted

```js
const [isMounted, setIsMounted] = useState(visible);
```

Controla se o modal fica montado durante a animação.

É parecido com o `mounted` do menu lateral.

## Resumo geral

Os estados principais do app controlam:

- usuário logado;
- tela atual;
- menu aberto ou fechado;
- modal de envio aberto ou fechado;
- categoria selecionada;
- atividades carregadas;
- carregamento da API;
- animações de entrada e saída.

Os `useEffect` principais controlam:

- escutar o Firebase Auth;
- iniciar animações quando o menu abre;
- preparar animações e montagem dos modais.
