/**
 * Envio de e-mail transacional. Usa Resend quando RESEND_API_KEY está
 * configurada no ambiente. Sem a chave, a submissão é registrada no log do
 * servidor e a rota retorna sucesso mesmo assim.
 *
 * Para habilitar o envio real:
 * 1. Crie uma conta em https://resend.com e verifique o domínio de envio.
 * 2. Defina RESEND_API_KEY e EMAIL_FROM/EMAIL_TO em .env.local (veja .env.example).
 */
interface SendEmailInput {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendNotificationEmail(input: SendEmailInput): Promise<{
  delivered: boolean;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.info("[email] RESEND_API_KEY não configurada — submissão registrada apenas no log.", {
      subject: input.subject,
      text: input.text,
    });
    return { delivered: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      text: input.text,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    console.error("[email] Falha ao enviar via Resend", await response.text());
    return { delivered: false };
  }

  return { delivered: true };
}
