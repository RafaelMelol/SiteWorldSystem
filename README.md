# Site World System

Site institucional da **World System – Soluções em TI** (Lagoa da Prata/MG), empresa de sistemas de gestão, PDV e emissão fiscal para indústria, atacado e varejo.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, com as cores e temas em `app/globals.css`
- Motion para as animações
- Zod para validação dos formulários
- Resend (opcional) para envio dos e-mails de contato

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em http://localhost:3000.

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # sobe o build
npm run lint    # verifica o código
```

## Variáveis de ambiente

Copie o `.env.example` para `.env.local` e preencha:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública, usada em metadados, sitemap e prévias de link |
| `RESEND_API_KEY` | Chave da Resend para envio real dos e-mails |
| `EMAIL_FROM` / `EMAIL_TO` | Remetente e destinatário dos avisos dos formulários |

Sem essas três variáveis de e-mail, os formulários continuam funcionando: a mensagem é registrada no log do servidor em vez de ser enviada.

## Estrutura

```
app/                 páginas (cada pasta é uma rota da URL)
  api/               recebimento dos formulários de Contato e Oportunidades
  globals.css        cores, temas e efeitos visuais globais
components/
  layout/            cabeçalho, rodapé, logo, botão de tema e efeitos globais
  sections/          seções das páginas (hero, soluções, recursos, formulários...)
  ui/                peças reutilizáveis (botões, cartões, campos, animações)
content/             todos os textos e dados do site, com seus tipos
lib/                 configuração, SEO e funções de servidor dos formulários
public/              imagens
```

Para alterar textos, soluções, FAQ, horários ou dados de contato, mexa só em `content/` — os componentes leem tudo de lá. Os arquivos têm comentários em português explicando o que cada parte faz.

## Deploy

Pensado para a Vercel: basta conectar o repositório e cadastrar as variáveis de ambiente no painel. Qualquer host com suporte a Node também funciona via `npm run build && npm run start`.
