import { NextResponse } from "next/server";
import {
  contactSchema,
  errorResponse,
  getClientIp,
  isWithinRateLimit,
  sendNotificationEmail,
} from "@/lib/forms";

/**
 * POST /api/contato — recebe o formulário da página de Contato.
 *
 * Passo a passo: limita os envios por IP → valida os campos → ignora robôs
 * (honeypot) → envia o e-mail de aviso para a empresa.
 */
export async function POST(request: Request) {
  // No máximo 5 envios por minuto por IP.
  if (!isWithinRateLimit(`contato:${getClientIp(request)}`, 5)) {
    return errorResponse("Muitas tentativas. Aguarde um minuto e tente novamente.", 429);
  }

  // Corpo que não é JSON vira null e falha na validação logo abaixo.
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("Verifique os campos preenchidos.", 400, parsed.error.flatten().fieldErrors);
  }

  const { name, email, phone, subject, message, website } = parsed.data;

  // Honeypot preenchido = robô. Responde sucesso para ele não perceber, mas não envia nada.
  if (website) return NextResponse.json({ ok: true });

  await sendNotificationEmail({
    subject: `[Contato] ${subject} — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
