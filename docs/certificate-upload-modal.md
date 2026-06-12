# Modal de envio de certificado

O botão `Enviar` do `AppHeader` abre o componente `CertificateUploadModal` como um bottom sheet.

## Estrutura

- `AppHeader`: recebe `onSendPress` e dispara a abertura do modal.
- `HomeScreen`: controla o estado `isUploadModalVisible`.
- `CertificateUploadModal`: concentra o fluxo visual do envio do certificado.
- Animação: o modal entra subindo da parte inferior da tela.
- Gesto: o bottom sheet inteiro pode ser arrastado para baixo para fechar.

## Partes do modal

- Cabeçalho: barra superior, título `Enviar certificado` e subtítulo que muda conforme a etapa.
- Stepper: indica as etapas `Anexo` e `Informações`.
- Etapa Anexo: curso, área de upload PDF, arquivo selecionado e botão `Próxima etapa`.
- Processamento: mostra o texto `Enviando e analisando documento...`, progresso em `100%` e botão `Processando...`.
- Etapa Informações: texto extraído automaticamente, selects de atividade, observação, contador e ações `Voltar`/`Enviar`.

## Comportamento

Ao abrir, o modal anima de baixo para cima e permanece encaixado na parte inferior da tela.

Ao arrastar o componente para baixo, se o deslocamento passar do limite, o modal anima para fora da tela e fecha.

Ao tocar em `Próxima etapa`, o modal simula o processamento do PDF por alguns instantes e avança para `Informações`.

O envio final fecha o modal por enquanto. A integração real com seletor de PDF, OCR ou API pode substituir os dados estáticos do componente.
