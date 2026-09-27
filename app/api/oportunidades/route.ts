import { NextResponse } from "next/server";
import {
  careerSchema,
  errorResponse,
  getClientIp,
  isWithinRateLimit,
  sendNotificationEmail,
  validateResumeFile,
} from "@/lib/forms";
import { contactInfo } from "@/content/contact";

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
  if (!(resume instanceof File)) return errorResponse("Anexe seu currículo em PDF ou DOC.", 400);

  const resumeError = validateResumeFile(resume);
  if (resumeError) return errorResponse(resumeError, 400);

  const content = Buffer.from(await resume.arrayBuffer()).toString("base64");
  const sizeInKb = Math.round(resume.size / 1024);

  const notification = await sendNotificationEmail({
    subject: `[Oportunidades] Novo currículo recebido — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nObservações: ${observations || "-"}\n\nCurrículo em anexo: ${resume.name} (${sizeInKb} KB)`,
    replyTo: email,
    attachments: [{ filename: resume.name, content }],
  });

  if (notification === "failed") {
    return errorResponse(
      `Não foi possível enviar seu currículo agora. Tente novamente em alguns minutos ou fale conosco pelo telefone ${contactInfo.phoneDisplay}.`,
      502
    );
  }

  await sendNotificationEmail({
    to: email,
    replyTo: process.env.EMAIL_TO,
    subject: "Recebemos seu currículo — World System",
    text: `Olá, ${name}!\n\nRecebemos seu currículo e ele já está com a nossa equipe. Se o seu perfil for compatível com alguma oportunidade, entraremos em contato.\n\nObrigado pelo interesse em fazer parte da World System.\n\nWorld System – Soluções em TI\n${contactInfo.phoneDisplay}`,
  });

  return NextResponse.json({ ok: true });
}
