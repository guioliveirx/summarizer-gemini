# Summarizer

Aplicação web fullstack para resumir textos utilizando inteligência artificial. Basta colar qualquer texto e receber um resumo conciso em segundos, com histórico de conversas salvo no navegador.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=white)

---

## Funcionalidades

- **Resumo inteligente** — Gera resumos concisos de textos longos usando o modelo Gemini
- **Histórico persistente** — Conversas salvas no `localStorage` do navegador
- **Interface moderna** — Tema escuro com design limpo e responsivo
- **Feedback visual** — Indicador de carregamento durante o processamento

## Tech Stack

| Camada    | Tecnologia                        |
| --------- | --------------------------------- |
| Runtime   | [Bun](https://bun.sh)            |
| Frontend  | React 19, Tailwind CSS 4         |
| Backend   | Bun HTTP Server                   |
| IA        | Google Gemini (`@google/genai`)   |
| Linguagem | TypeScript (strict mode)          |
| Qualidade | Biome (linter + formatter)        |

## Pré-requisitos

- [Bun](https://bun.sh) instalado
- Chave de API do [Google Gemini](https://ai.google.dev/)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/summarizer.git
cd summarizer

# Instale as dependências
bun install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

## Uso

```bash
# Desenvolvimento (com hot reload)
bun run dev

# Produção
bun run start

# Build
bun run build
```

O servidor inicia em **http://localhost:3000**.

## Estrutura do Projeto

```
src/
├── api/
│   └── gemini.ts        # Integração com a API do Gemini
├── App.tsx              # Componente principal (UI e estado)
├── frontend.tsx         # Entry point do React
├── server.ts            # Servidor HTTP com rotas
├── index.html           # HTML base
└── index.css            # Estilos globais + Tailwind
```

## API

### `POST /ask`

Envia um texto para ser resumido.

**Request:**
```json
{
  "message": "Texto longo para resumir..."
}
```

**Response:**
```json
{
  "message": "Resumo gerado pela IA.",
  "status": 201
}
```

## Licença

Este projeto é de uso pessoal. Sinta-se livre para utilizá-lo como referência.
