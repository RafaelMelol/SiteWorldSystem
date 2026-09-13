import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/SocialIcons";
import { contactInfo } from "@/content/contact";
import { supportHours } from "@/content/support";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a World System – Soluções em TI. Rua Santa Catarina, 273, Lagoa da Prata/MG. Telefone (37) 3261-3366, e-mail contato@wsionline.com.br.",
};

export default function ContatoPage() {
  const { address, phoneDisplay, phone, email, social } = contactInfo;
  const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city}/${address.state}, ${address.zip}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    fullAddress
  )}&output=embed`;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-fg">
              Contato
            </span>
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
          <Reveal className="flex flex-col gap-5">
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
              <WhatsAppButton
                phone={phone}
                size="sm"
                className="w-full shrink-0 sm:w-auto"
              >
                Conversar no WhatsApp
              </WhatsAppButton>
            </Card>

            <Card className="flex items-start gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
              <div>
                <CardTitle>Endereço</CardTitle>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {address.street} – {address.neighborhood}
                  <br />
                  {address.zip} – {address.city}/{address.state}
                </p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
              <div>
                <CardTitle>Telefone</CardTitle>
                <a
                  href={`tel:${phone}`}
                  className="mt-1 block text-sm text-foreground/70 hover:text-foreground"
                >
                  {phoneDisplay}
                </a>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
              <div>
                <CardTitle>E-mail</CardTitle>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block text-sm text-foreground/70 hover:text-foreground"
                >
                  {email}
                </a>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
              <div>
                <CardTitle>Horário de atendimento</CardTitle>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {supportHours.weekdayLabel}: {supportHours.weekdayHours}
                </p>
                <Link
                  href="/suporte#horario"
                  className="mt-1 inline-block text-sm font-medium text-brand-fg hover:text-brand-fg-hover"
                >
                  Ver horário completo
                </Link>
              </div>
            </Card>

            <div className="flex items-center gap-3 pt-2">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-fg hover:text-brand-fg"
                >
                  <FacebookIcon className="size-4" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-fg hover:text-brand-fg"
                >
                  <InstagramIcon className="size-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-fg hover:text-brand-fg"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
            </div>

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

          <Reveal delay={100}>
            <Card className="lg:p-8">
              <h2 className="text-xl font-semibold text-foreground">
                Envie uma mensagem
              </h2>
              <p className="mt-1.5 text-sm text-foreground/60">
                Respondemos em até um dia útil.
              </p>
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
