import { NextResponse } from "next/server";
import {
  careerSchema,
  errorResponse,
  getClientIp,
  isWithinRateLimit,
  sendNotificationEmail,
  validateResumeFile,
} from "@/lib/forms";

/**
 * POST /api/oportunidades — recebe o currículo da página Oportunidades.
 *
 * Passo a passo: limita os envios por IP → valida os campos → ignora robôs
 * (honeypot) → confere o arquivo → envia o e-mail de aviso.
 *
 * Atenção: o arquivo do currículo ainda NÃO é armazenado; o e-mail informa
 * apenas o nome e o tamanho. Para guardá-lo, é preciso integrar um serviço de
 * armazenamento (ex: Vercel Blob ou Amazon S3).
 */
export async function POST(request: Request) {
  // No máximo 3 envios por minuto por IP.
  if (!isWithinRateLimit(`oportunidades:${getClientIp(request)}`, 3)) {
    return errorResponse("Muitas tentativas. Aguarde um minuto e tente novamente.", 429);
  }

  // Este formulário chega como FormData (multipart), por causa do arquivo.
  const formData = await request.formData().catch(() => null);
  if (!formData) return errorResponse("Requisição inválida.", 400);

  const parsed = careerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    observations: formData.get("observations") ?? "",
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) {
    return errorResponse("Verifique os campos preenchidos.", 400, parsed.error.flatten().fieldErrors);
  }

  const { name, email, phone, observations, website } = parsed.data;

  // Honeypot preenchido = robô. Responde sucesso, mas não envia nada.
  if (website) return NextResponse.json({ ok: true });

  const resume = formData.get("resume");
  const resumeFile = resume instanceof File ? resume : null;
  const resumeError = validateResumeFile(resumeFile);
  if (resumeError) return errorResponse(resumeError, 400);

  const sizeInKb = Math.round((resumeFile?.size ?? 0) / 1024);

  await sendNotificationEmail({
    subject: `[Oportunidades] Novo currículo recebido — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nObservações: ${observations || "-"}\nArquivo: ${resumeFile?.name} (${sizeInKb} KB) — não armazenado.`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
