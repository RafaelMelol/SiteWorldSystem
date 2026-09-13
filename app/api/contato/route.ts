import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";
import { contactInfo } from "@/content/contact";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`contato:${ip}`, { limit: 5, windowMs: 60_000 });

  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Aguarde um minuto e tente novamente." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requisição inválida." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Verifique os campos preenchidos.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: bots preenchem campos ocultos. Aceitamos silenciosamente sem processar.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, subject, message } = parsed.data;

  await sendNotificationEmail({
    subject: `[Contato] ${subject} — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: ${subject}\n\nMensagem:\n${message}\n\nDestino: ${contactInfo.email}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
