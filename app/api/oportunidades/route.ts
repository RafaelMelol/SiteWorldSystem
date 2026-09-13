import { NextResponse } from "next/server";
import { careerSchema, validateResumeFile } from "@/lib/validations/career";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`oportunidades:${ip}`, { limit: 3, windowMs: 60_000 });

  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Aguarde um minuto e tente novamente." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requisição inválida." },
      { status: 400 }
    );
  }

  const parsed = careerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    observations: formData.get("observations") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Verifique os campos preenchidos.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const resume = formData.get("resume");
  const resumeFile = resume instanceof File ? resume : null;
  const resumeError = validateResumeFile(resumeFile);
  if (resumeError) {
    return NextResponse.json(
      { ok: false, message: resumeError },
      { status: 400 }
    );
  }

  const { name, email, phone, observations } = parsed.data;

  /**
   * Nenhum storage de arquivos está configurado nesta v1 (ex: S3, Vercel
   * Blob). O currículo não é persistido — apenas os dados de contato são
   * notificados. Para armazenar o arquivo, integre um storage real usando
   * variáveis de ambiente antes de habilitar o upload em produção.
   */
  await sendNotificationEmail({
    subject: `[Oportunidades] Novo currículo recebido — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nObservações: ${observations || "-"}\nArquivo recebido: ${resumeFile?.name} (${resumeFile ? Math.round(resumeFile.size / 1024) : 0} KB) — não armazenado nesta versão.`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
