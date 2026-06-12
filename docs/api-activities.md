# Como as atividades são puxadas da API

## O que foi feito

Foi criado um serviço para buscar as atividades específicas de cada categoria quando o usuário toca em um card da Home.

As categorias usadas hoje são:

- `ensino`
- `pesquisa`
- `extensao`

O serviço fica em:

```txt
src/services/activities.js
```

## Fluxo passo a passo

1. O usuário toca em um card de categoria na Home.
2. O componente `ComplementaryHoursProgress` chama a função `handleOpenCategory(category)`.
3. Essa função salva a categoria selecionada no estado `selectedCategory`.
4. O estado `loadingActivities` vira `true`, para o modal mostrar carregamento.
5. O app chama:

```js
getCategoryActivities(category.id)
```

6. A função `getCategoryActivities` monta a URL usando a variável de ambiente `VITE_API_BASE_URL`.
7. A URL chamada fica neste formato:

```txt
{VITE_API_BASE_URL}/atividades/{categoryId}
```

Exemplo:

```txt
https://api.sighc.com.br/atividades/ensino
```

8. Quando a resposta chega, o serviço transforma os dados no formato que o modal espera.
9. As atividades são salvas no estado `activities`.
10. O modal `CategoryActivitiesModal` recebe essas atividades e renderiza a lista.

## Onde a URL base vem

A URL base vem do arquivo `.env`:

```env
VITE_API_BASE_URL=https://api.sighc.com.br
```

No serviço, ela é importada assim:

```js
import { VITE_API_BASE_URL } from "@env";
```

## Como o serviço busca os dados

A busca é feita com `fetch`:

```js
const response = await fetch(`${VITE_API_BASE_URL}/atividades/${categoryId}`);
```

Se a API responder com sucesso, o código lê o JSON:

```js
const payload = await response.json();
```

Depois ele aceita alguns formatos comuns de resposta:

```js
const activities = Array.isArray(payload) ? payload : payload.data || payload.atividades || [];
```

Isso significa que a API pode retornar:

```js
[
  { "code": "1.1", "title": "Participação em monitoria", "maxHours": "20h" }
]
```

ou:

```js
{
  "data": [
    { "code": "1.1", "title": "Participação em monitoria", "maxHours": "20h" }
  ]
}
```

ou:

```js
{
  "atividades": [
    { "code": "1.1", "title": "Participação em monitoria", "maxHours": "20h" }
  ]
}
```

## Como os dados são normalizados

O modal espera cada atividade neste formato:

```js
{
  code: "1.1",
  title: "Participação em monitoria",
  maxHours: "20h",
  status: "Nenhum envio registrado"
}
```

Para evitar quebrar caso a API use nomes diferentes, a função `normalizeActivity` aceita variações:

```js
code: activity.code || activity.codigo || activity.numero
title: activity.title || activity.titulo || activity.nome || activity.descricao
maxHours: activity.maxHours || activity.cargaMaxima || activity.max_horas || activity.limite
status: activity.status || activity.situacao
```

Assim, se o backend enviar `titulo` em vez de `title`, o app ainda consegue exibir.

## Como funciona o fallback local

Também foi criado um objeto chamado `fallbackActivitiesByCategory`.

Ele guarda atividades locais para:

- ensino
- pesquisa
- extensao

Esse fallback é usado quando:

1. `VITE_API_BASE_URL` não existe.
2. A API retorna erro.
3. A requisição falha por internet, servidor fora do ar ou outro problema.

Exemplo do fallback:

```js
const fallback = fallbackActivitiesByCategory[categoryId] || [];
```

Se a API falhar, a função retorna:

```js
return fallback;
```

Isso mantém o modal funcionando mesmo antes da API real estar pronta.

## Onde o modal recebe as atividades

No componente `ComplementaryHoursProgress`, o modal recebe os dados assim:

```js
<CategoryActivitiesModal
  visible={Boolean(selectedCategory)}
  category={selectedCategory}
  activities={activities}
  loading={loadingActivities}
  onClose={handleCloseCategory}
/>
```

O modal não busca dados sozinho. Ele só exibe o que recebe pela prop `activities`.

## Resumo

O carregamento das atividades foi separado em três partes:

1. `ComplementaryHoursProgress` abre o modal e chama a busca.
2. `activities.js` busca na API, normaliza a resposta e usa fallback se precisar.
3. `CategoryActivitiesModal` exibe a lista recebida.

Essa separação deixa o visual independente da API e facilita trocar o endpoint quando o backend definitivo estiver pronto.
