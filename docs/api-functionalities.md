# Funcionalidades conectadas à API

## Dashboard

O Dashboard usa `useState` e `useEffect` na `HomeScreen`.

Fluxo:

```js
const [dashboardData, setDashboardData] = useState(fallbackDashboard);
const [loadingDashboard, setLoadingDashboard] = useState(true);
```

Quando a tela abre ou quando o usuário muda:

```js
useEffect(() => {
  async function loadDashboard() {
    setLoadingDashboard(true);
    const data = await getStudentDashboard(user?.uid);
    setDashboardData(data);
    setLoadingDashboard(false);
  }

  loadDashboard();
}, [user?.uid]);
```

Endpoint usado:

```txt
GET /dashboard/aluno?userId={uid}
```

## DashboardSummaryCards

O componente `DashboardSummaryCards` recebe as informações da API pela prop `data`.

Na `HomeScreen`:

```js
<DashboardSummaryCards data={dashboardData} />
```

O componente usa esses campos:

```js
data.courseName
data.completedHours
data.targetHours
data.sentCount
data.pendingCount
data.approvedCount
data.approvedHours
```

Ele calcula visualmente:

1. porcentagem concluída;
2. horas restantes;
3. progresso;
4. enviados;
5. pendentes;
6. aprovados;
7. horas aprovadas.

O componente não busca API diretamente. Ele só recebe os dados já carregados pela `HomeScreen`.

## Fallback Do Dashboard

O fallback do dashboard agora é neutro, para não parecer dado real:

```js
const fallbackDashboard = {
  studentName: "Aluno",
  courseName: "Curso não informado",
  completedHours: 0,
  targetHours: 0,
  sentCount: 0,
  pendingCount: 0,
  approvedCount: 0,
  approvedHours: 0,
};
```

Assim, quando a API responder, os dados reais substituem esses valores.

## Histórico

O Histórico também usa `useState` e `useEffect`.

Endpoint usado:

```txt
GET /certificados?userId={uid}
```

Fluxo:

```js
const data = await getStudentCertificates(user?.uid);
setCertificates(data);
```

## Atividades Por Categoria

As categorias da Home recebem dados do dashboard:

```js
<ComplementaryHoursProgress
  userId={user?.uid}
  categoriesData={dashboardData.categories}
/>
```

Quando o aluno toca em uma categoria, o app busca as atividades específicas:

```txt
GET /atividades/{categoryId}?userId={uid}
```

Essa busca acontece no clique do card, porque depende da ação do usuário.

## Envio De Certificado

O envio é uma ação de botão.

Endpoint usado:

```txt
POST /certificados
```

O envio não fica em `useEffect`, porque isso poderia causar envio duplicado. Ele acontece quando o usuário toca em `Enviar`.
