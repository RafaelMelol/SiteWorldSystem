import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().email("Informe um e-mail válido."),
  // honeypot: campo oculto que bots costumam preencher; validado livremente
  // aqui e tratado como sinal de spam na rota (não deve barrar no schema).
  website: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
