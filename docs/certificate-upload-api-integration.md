# Integração do envio de certificado com a API

## O Que Foi Feito

O modal `CertificateUploadModal` é o componente único de envio de certificado do aluno.

Ele está disponível em três telas:

1. `HomeScreen`
2. `HistoryScreen`
3. `GuideScreen`

Em todas elas, o botão `Enviar` do `AppHeader` abre o mesmo modal global.

## Arquivos Alterados

```txt
App.js
src/screens/aluno/HomeScreen.js
src/screens/aluno/HistoryScreen.js
src/screens/aluno/GuideScreen.js
src/components/components-Aluno/CertificateUploadModal.js
src/services/certificates.js
docs/certificate-upload-api-integration.md
```

## Como O Modal É Aberto

O estado do modal fica no `App.js`, não mais dentro de cada tela:

```js
const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
```

O `App.js` passa a função de abrir o modal para todas as telas:

```js
const screenProps = {
  user,
  onMenuPress: () => setIsMenuVisible(true),
  onSendPress: () => setIsUploadModalVisible(true),
};
```

Cada tela recebe `onSendPress` e repassa para o `AppHeader`:

```js
<AppHeader
  onSendPress={onSendPress}
/>
```

O modal é renderizado uma única vez no `App.js`:

```js
<CertificateUploadModal
  visible={isUploadModalVisible}
  onSubmit={handleSubmitCertificate}
  onClose={() => setIsUploadModalVisible(false)}
/>
```

## Envio Global

O envio também fica centralizado no `App.js`:

```js
async function handleSubmitCertificate(payload) {
  await createCertificateSubmission({
    userId: user?.uid,
    ...payload,
  });
}
```

Assim, Home, Histórico e Orientações usam o mesmo fluxo de envio.

## HomeScreen

A Home apenas recebe `onSendPress`:

```js
export default function Dashboard({
  user,
  onMenuPress = () => {},
  onSendPress = () => {},
}) {}
```

E usa no cabeçalho:

```js
<AppHeader
  title="Dashboard"
  onSendPress={onSendPress}
/>
```

## HistoryScreen

O Histórico também recebe `onSendPress`:

```js
export default function HistoryScreen({
  user,
  onMenuPress = () => {},
  onSendPress = () => {},
}) {}
```

E usa no `AppHeader`:

```js
<AppHeader
  title="Histórico"
  onSendPress={onSendPress}
/>
```

## GuideScreen

Orientações segue o mesmo padrão:

```js
export default function GuideScreen({
  onMenuPress = () => {},
  onSendPress = () => {},
}) {}
```

E usa:

```js
<AppHeader
  title="Orientações"
  onSendPress={onSendPress}
/>
```

## Curso

O curso aparece preenchido com o curso cadastrado do aluno:

```js
const COURSE_OPTIONS = [
  "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS (66302)",
];
const DEFAULT_COURSE = COURSE_OPTIONS[0];
```

O estado começa com esse curso:

```js
const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSE);
```

## Upload

Ao tocar na upload zone, o app usa o diálogo nativo do telefone:

```js
Alert.alert(
  "Selecionar arquivo",
  "Escolha de onde deseja enviar o certificado.",
  [
    { text: "Arquivo PDF", onPress: handlePickPdf },
    { text: "Imagem da galeria", onPress: handlePickImage },
    { text: "Tirar foto", onPress: handleTakePhoto },
    { text: "Cancelar", style: "cancel" },
  ]
);
```

As opções são:

1. `Arquivo PDF`
2. `Imagem da galeria`
3. `Tirar foto`

## Um Arquivo Por Vez

O modal usa apenas um estado para arquivo:

```js
const [selectedFile, setSelectedFile] = useState(null);
```

Toda nova seleção substitui a anterior:

```js
setSelectedFile(file);
```

Por isso o modal nunca acumula mais de um arquivo.

## Card Do Arquivo

O `SelectedFileCard` só aparece quando existe arquivo:

```js
if (!file) {
  return null;
}
```

Ele mostra:

```js
file.name
formatFileSize(file.size)
```

O tamanho é convertido para MB:

```js
const megabytes = numericSize / (1024 * 1024);
return `${megabytes.toFixed(2)} MB`;
```

## Envio Para API

O modal envia:

```js
await onSubmit({
  file: selectedFile,
  fileName: selectedFile.name,
  fileSize: selectedFile.size,
  courseName: selectedCourse,
  extractedText: `Arquivo selecionado: ${selectedFile.name}`,
  activityType: null,
  activityDescription: null,
  observation: "",
});
```

O serviço `createCertificateSubmission` monta `FormData`:

```js
formData.append("file", {
  uri: data.file.uri,
  name: data.file.name,
  type: data.file.mimeType || "application/pdf",
});
```

Endpoint usado:

```txt
POST /certificados
```

## Validação Executada

Foi executado:

```bash
npx.cmd expo export --platform android
```

A exportação passou sem erro.
