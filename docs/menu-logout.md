# Logout pelo menu lateral

## O Que Foi Feito

O botão `Sair` do menu lateral agora chama o logout da conta do usuário.

O fluxo ficou centralizado no `App.js`, usando o serviço de autenticação.

## Arquivos Alterados

```txt
App.js
docs/menu-logout.md
```

## Serviço De Logout

O app já possui o serviço:

```txt
src/services/auth.js
```

Ele exporta:

```js
export async function signOut() {
  await fbSignOut(auth);
}
```

Esse serviço usa o Firebase Auth para encerrar a sessão.

## Como O App Escuta O Login

No `App.js`, o app escuta o estado de autenticação:

```js
useEffect(() => onAuthStateChanged(auth, setUser), []);
```

Quando o usuário faz logout, o Firebase atualiza o estado.

Então `user` vira `null` e o app renderiza:

```js
return <LoginScreen />;
```

## Handler De Logout

Foi criado no `App.js`:

```js
async function handleLogout() {
  setIsMenuVisible(false);
  setIsUploadModalVisible(false);
  setActiveScreen("dashboard");
  await signOutUser();
}
```

Passo a passo:

1. Fecha o menu lateral.
2. Fecha o modal de envio, caso esteja aberto.
3. Reseta a tela ativa para `dashboard`.
4. Chama `signOutUser()`.
5. O Firebase encerra a sessão.
6. `onAuthStateChanged` atualiza `user`.
7. O app volta para a tela de login.

## Ligação Com O Menu

O `App.js` passa o handler para o menu:

```js
<SideMenuModalAluno
  onLogout={handleLogout}
/>
```

No menu, o botão `Sair` chama:

```js
onLogout?.();
```

Isso acontece depois da animação de fechar o menu.

## Validação

Foi executado:

```bash
npx.cmd expo export --platform android
```

A exportação passou sem erro.
