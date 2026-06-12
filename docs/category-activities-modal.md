# Modal de atividades por categoria

## O que foi feito

Foi ajustado o modal usado pelos cards de atividades por categoria da Home.

Agora o modal:

1. Fica centralizado no meio da tela.
2. Usa uma caixa com tamanho fixo visual, mantendo o conteúdo interno rolável.
3. Fecha ao tocar no botão `X`.
4. Fecha ao tocar fora da caixa do modal, no fundo escuro.
5. Continua preparado para receber atividades específicas vindas da API.

## Arquivos alterados

- `src/components/components-Aluno/CategoryActivitiesModal.js`

## Como foi feito

1. O `Modal` continua com `transparent` e `animationType="fade"`.
2. Dentro dele foi criada uma camada principal chamada `overlay`, com fundo escuro.
3. Foi adicionada uma camada `TouchableOpacity` chamada `backdrop`, ocupando toda a tela com `StyleSheet.absoluteFillObject`.
4. Essa camada chama `onClose` quando o usuário toca fora do card.
5. O conteúdo do modal ficou dentro de um `SafeAreaView` centralizado com `alignItems: "center"` e `justifyContent: "center"`.
6. O card recebeu tamanho controlado:
   - `width: "92%"`
   - `maxWidth: 342`
   - `height: 740`
   - `maxHeight: "84%"`
7. A lista interna continua usando `ScrollView`, então se houver muitas atividades a caixa não cresce.
8. O texto do selo de limite foi corrigido para `máx.`.

## Como o fechamento fora do modal funciona

O fundo escuro é uma área clicável separada do card:

```js
<TouchableOpacity
  style={styles.backdrop}
  activeOpacity={1}
  onPress={onClose}
/>
```

Como o card fica renderizado acima dessa camada, tocar dentro dele não fecha o modal. Tocar fora dele chama `onClose`.

## Como o modal recebe dados

O modal recebe as atividades por props:

```js
<CategoryActivitiesModal
  visible={Boolean(selectedCategory)}
  category={selectedCategory}
  activities={activities}
  loading={loadingActivities}
  onClose={handleCloseCategory}
/>
```

As atividades continuam vindo do serviço:

```js
getCategoryActivities(category.id)
```

Hoje esse serviço tenta buscar na API e usa fallback local caso a API não responda.
