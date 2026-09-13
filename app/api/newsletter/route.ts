import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 });

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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Verifique os campos preenchidos." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email } = parsed.data;

  /**
   * Nenhum provedor de newsletter está integrado nesta v1. A submissão é
   * registrada via e-mail de notificação; para automatizar o cadastro,
   * plugue aqui um provedor real (ex: Resend Audiences, Mailchimp) usando
   * variáveis de ambiente.
   */
  await sendNotificationEmail({
    subject: `[Newsletter] Nova inscrição — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}`,
  });

  return NextResponse.json({ ok: true });
}
