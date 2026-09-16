import { NextResponse } from "next/server";
import { z } from "zod";

const name = z.string().trim().min(2, "Informe seu nome completo.").max(120);
const email = z.string().trim().email("Informe um e-mail válido.");
const phone = z.string().trim().min(8, "Informe um telefone válido.").max(20);

const website = z.string().optional();

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

export const careerSchema = z.object({
  name,
  email,
  phone,
  observations: z.string().trim().max(2000).optional().or(z.literal("")),
  website,
});

const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Anexe seu currículo em PDF ou DOC.";
  if (!RESUME_TYPES.includes(file.type)) {
    return "Formato inválido. Envie um arquivo PDF ou DOC/DOCX.";
  }
  if (file.size > RESUME_MAX_BYTES) return "O arquivo deve ter no máximo 5 MB.";
  return null;
}

const attempts = new Map<string, { count: number; resetAt: number }>();

export function isWithinRateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

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
    body: JSON.stringify({ from: EMAIL_FROM, to: EMAIL_TO, subject, text, reply_to: replyTo }),
  });

  if (!response.ok) {
    console.error("[email] Falha ao enviar pela Resend:", await response.text());
  }
}

export function errorResponse(message: string, status: number, errors?: unknown) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}
