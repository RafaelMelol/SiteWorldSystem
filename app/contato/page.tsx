import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Animations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { contactInfo, supportHours } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a World System – Soluções em TI. Rua Santa Catarina, 273, Lagoa da Prata/MG. Telefone (37) 3261-3366, e-mail contato@wsionline.com.br.",
};

/**
 * Página de Contato: canais de atendimento e mapa à esquerda, formulário à
 * direita. Todos os dados vêm de content/contact.ts.
 */
export default function ContatoPage() {
  const { address, phone, phoneDisplay, email } = contactInfo;

  // Mapa do Google montado a partir do endereço (não precisa de chave de API).
  const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city}/${address.state}, ${address.zip}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-fg">Contato</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Vamos conversar sobre o seu negócio
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Preencha o formulário ou utilize um dos canais abaixo. Nossa
              equipe responde o quanto antes.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Coluna da esquerda: canais, redes sociais e mapa */}
          <Reveal className="flex flex-col gap-5">
            {/* WhatsApp em destaque */}
            <Card className="flex flex-col items-start gap-4 border-brand-200 bg-brand-50/40 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
                <div>
                  <CardTitle>WhatsApp</CardTitle>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                    Fale agora com a nossa equipe pelo {phoneDisplay}.
                  </p>
                </div>
              </div>
              <WhatsAppButton phone={phone} size="sm" className="w-full shrink-0 sm:w-auto">
                Conversar no WhatsApp
              </WhatsAppButton>
            </Card>

            <ContactChannel icon={MapPin} title="Endereço">
              {address.street} – {address.neighborhood}
              <br />
              {address.zip} – {address.city}/{address.state}
            </ContactChannel>

            <ContactChannel icon={Phone} title="Telefone">
              <a href={`tel:${phone}`} className="hover:text-foreground">
                {phoneDisplay}
              </a>
            </ContactChannel>

            <ContactChannel icon={Mail} title="E-mail">
              <a href={`mailto:${email}`} className="hover:text-foreground">
                {email}
              </a>
            </ContactChannel>

            <ContactChannel icon={Clock} title="Horário de atendimento">
              {supportHours.weekdayLabel}: {supportHours.weekdayHours}
              <Link
                href="/suporte#horario"
                className="mt-1 block font-medium text-brand-fg hover:text-brand-fg-hover"
              >
                Ver horário completo
              </Link>
            </ContactChannel>

            <SocialLinks className="pt-2" />

            <div className="overflow-hidden rounded-xl border border-border-subtle">
              <iframe
                title="Mapa – World System, Lagoa da Prata/MG"
                src={mapSrc}
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%]"
              />
            </div>
          </Reveal>

          {/* Coluna da direita: formulário */}
          <Reveal delay={100}>
            <Card className="lg:p-8">
              <h2 className="text-xl font-semibold text-foreground">Envie uma mensagem</h2>
              <p className="mt-1.5 text-sm text-foreground/60">Respondemos em até um dia útil.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Cartão de um canal de contato: ícone, título e conteúdo. */
function ContactChannel({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="flex items-start gap-4">
      <Icon className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
      <div>
        <CardTitle>{title}</CardTitle>
        <div className="mt-1 text-sm leading-relaxed text-foreground/70">{children}</div>
      </div>
    </Card>
  );
}
