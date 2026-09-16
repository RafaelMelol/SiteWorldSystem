import { NextResponse } from "next/server";
import {
  careerSchema,
  errorResponse,
  getClientIp,
  isWithinRateLimit,
  sendNotificationEmail,
  validateResumeFile,
} from "@/lib/forms";

export async function POST(request: Request) {
  if (!isWithinRateLimit(`oportunidades:${getClientIp(request)}`, 3)) {
    return errorResponse("Muitas tentativas. Aguarde um minuto e tente novamente.", 429);
  }

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
