import { NextResponse } from "next/server";
import {
  contactSchema,
  errorResponse,
  getClientIp,
  isWithinRateLimit,
  sendNotificationEmail,
} from "@/lib/forms";

export async function POST(request: Request) {
  if (!isWithinRateLimit(`contato:${getClientIp(request)}`, 5)) {
    return errorResponse("Muitas tentativas. Aguarde um minuto e tente novamente.", 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("Verifique os campos preenchidos.", 400, parsed.error.flatten().fieldErrors);
  }

  const { name, email, phone, subject, message, website } = parsed.data;

  if (website) return NextResponse.json({ ok: true });

  await sendNotificationEmail({
    subject: `[Contato] ${subject} — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
