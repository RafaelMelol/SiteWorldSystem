import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido.")
    .max(20),
  subject: z.string().trim().min(2, "Informe o assunto.").max(150),
  message: z
    .string()
    .trim()
    .min(10, "Sua mensagem deve ter pelo menos 10 caracteres.")
    .max(4000),
  // honeypot: campo oculto que bots costumam preencher; validado livremente
  // aqui e tratado como sinal de spam na rota (não deve barrar no schema).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
