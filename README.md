# Socket.IO Listener

Este projeto se conecta a um servidor Socket.IO e escuta eventos `call-was-connected`. Quando um evento é recebido, ele é salvo como um arquivo JSON no diretório especificado.

## Requisitos

- Node.js 14.0.0 ou superior
- npm 6.14.4 ou superior

Esses pacotes podem ser baixados e instalados a partir do site oficial do [Node.js](https://nodejs.org/).

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-repositorio.git
cd seu-repositorio
```
Substitua https://github.com/seu-repositorio.git pela URL real do seu repositório e seu-repositorio pelo nome real do seu repositório.

## Instale as dependências:

```bash
npm install
```

## Configuração
Crie um arquivo .env na raiz do projeto e preencha-o com os detalhes necessários:

```dotenv
FILE_PATH=/caminho/para/seu/diretorio/  # O diretório onde os arquivos de eventos serão salvos
SOCKETIO_SERVER=https://socket.3c.fluxoti.com  # A URL do servidor Socket.IO
SOCKETIO_TOKEN=SeuTokenRealAqui  # Seu token Socket.IO
```
Substitua /caminho/para/seu/diretorio/ pelo caminho real onde você deseja salvar os arquivos e SeuTokenRealAqui pelo seu token real.

## Uso

Execute o script:

```bash
node main.js
```

O script se conectará ao servidor Socket.IO e começará a escutar os eventos call-was-connected. Quando um evento é recebido, ele é salvo como um arquivo JSON no diretório especificado em FILE_PATH.