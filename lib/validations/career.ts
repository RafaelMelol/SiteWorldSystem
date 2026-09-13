import { z } from "zod";

export const careerSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z.string().trim().min(8, "Informe um telefone válido.").max(20),
  observations: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot: campo oculto que bots costumam preencher; validado livremente
  // aqui e tratado como sinal de spam na rota (não deve barrar no schema).
  website: z.string().optional(),
});

export type CareerInput = z.infer<typeof careerSchema>;

export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Anexe seu currículo em PDF ou DOC.";
  if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
    return "Formato inválido. Envie um arquivo PDF ou DOC/DOCX.";
  }
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return "O arquivo deve ter no máximo 5 MB.";
  }
  return null;
}
