import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Funções de servidor usadas pelas rotas de formulário
 * (app/api/contato e app/api/oportunidades):
 *
 *   1. Validação dos campos enviados
 *   2. Limite de envios por IP (proteção contra spam)
 *   3. Envio do e-mail de aviso para a empresa
 *   4. Resposta de erro padrão
 */

/* 1. Validação ------------------------------------------------------------ */

// Campos comuns aos dois formulários.
const name = z.string().trim().min(2, "Informe seu nome completo.").max(120);
const email = z.string().trim().email("Informe um e-mail válido.");
const phone = z.string().trim().min(8, "Informe um telefone válido.").max(20);

// Honeypot: campo escondido que só robôs preenchem. Não bloqueia a validação;
// quem descarta o envio quando ele vem preenchido é a rota.
const website = z.string().optional();

/** Campos do formulário de Contato. */
export const contactSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().trim().min(2, "Informe o assunto.").max(150),
  message: z
    .string()
    .trim()
    .min(10, "Sua mensagem deve ter pelo menos 10 caracteres.")
    .max(4000),
  website,
});

/** Campos do formulário de Oportunidades (o arquivo é conferido à parte). */
export const careerSchema = z.object({
  name,
  email,
  phone,
  observations: z.string().trim().max(2000).optional().or(z.literal("")),
  website,
});

// Currículo aceito: PDF, DOC ou DOCX de até 5 MB.
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const RESUME_MAX_BYTES = 5 * 1024 * 1024;

/** Confere o currículo. Retorna a mensagem de erro, ou null se estiver tudo certo. */
export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Anexe seu currículo em PDF ou DOC.";
  if (!RESUME_TYPES.includes(file.type)) {
    return "Formato inválido. Envie um arquivo PDF ou DOC/DOCX.";
  }
  if (file.size > RESUME_MAX_BYTES) return "O arquivo deve ter no máximo 5 MB.";
  return null;
}

/* 2. Limite de envios ----------------------------------------------------- */

// Quantos envios cada chave (rota + IP) fez na janela de tempo atual.
// Fica na memória do servidor, o que funciona bem com uma única instância.
// Com várias instâncias, troque por um armazenamento compartilhado (ex: Redis).
const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * Retorna true se ainda é permitido enviar.
 * Exemplo: isWithinRateLimit("contato:1.2.3.4", 5) → até 5 envios por minuto.
 */
export function isWithinRateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  // Primeiro envio, ou a janela anterior já expirou: recomeça a contagem.
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

/** IP de quem enviou. Atrás de proxy (como na Vercel) ele vem em x-forwarded-for. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/* 3. E-mail de aviso ------------------------------------------------------ */

/**
 * Envia o e-mail de aviso pela Resend (https://resend.com).
 *
 * Precisa das variáveis RESEND_API_KEY, EMAIL_FROM e EMAIL_TO. Se faltar
 * alguma, o conteúdo vai apenas para o log do servidor e o visitante continua
 * recebendo a mensagem de sucesso.
 */
export async function sendNotificationEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = process.env;

  if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
    console.info("[email] Resend não configurada — envio registrado só no log.", {
      subject,
      text,
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    // reply_to: ao responder o aviso, a resposta vai direto para o visitante.
    body: JSON.stringify({ from: EMAIL_FROM, to: EMAIL_TO, subject, text, reply_to: replyTo }),
  });

  if (!response.ok) {
    console.error("[email] Falha ao enviar pela Resend:", await response.text());
  }
}

/* 4. Resposta de erro ----------------------------------------------------- */

/** Resposta JSON de erro das rotas: { ok: false, message, errors }. */
export function errorResponse(message: string, status: number, errors?: unknown) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}
