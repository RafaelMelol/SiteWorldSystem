# Site World System

Site institucional da **World System – Soluções em TI** (Lagoa da Prata/MG), empresa de sistemas de gestão, PDV e emissão fiscal para indústria, atacado e varejo.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, com os tokens de tema em `app/globals.css`
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
npm run lint    # eslint
```

## Variáveis de ambiente

Copie o `.env.example` para `.env.local` e preencha:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública, usada em metadata, sitemap e Open Graph |
| `RESEND_API_KEY` | Chave da Resend para envio real dos e-mails |
| `EMAIL_FROM` / `EMAIL_TO` | Remetente e destino das notificações dos formulários |

Sem a `RESEND_API_KEY` os formulários continuam funcionando: a submissão é registrada no log do servidor em vez de enviar e-mail.

## Estrutura

```
app/            rotas (App Router), rotas de API e globals.css
components/     ui/ (base), layout/, sections/, illustrations/
content/        textos e dados do site, tipados
lib/            validações Zod, envio de e-mail, rate limit, config
hooks/          hooks próprios
```

Todo o conteúdo de texto fica em `content/`, separado dos componentes — para alterar textos, preços de plano, FAQ ou dados de contato, mexa só ali.

## Deploy

Pensado para a Vercel: basta conectar o repositório e cadastrar as variáveis de ambiente do painel. Qualquer host com suporte a Node também funciona via `npm run build && npm run start`.
