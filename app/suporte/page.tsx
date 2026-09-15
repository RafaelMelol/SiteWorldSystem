import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { contactInfo, supportHours } from "@/content/contact";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Horário de atendimento e perguntas frequentes sobre os sistemas da World System.",
};

// Horários de atendimento, exibidos em cartões.
const schedules = [
  {
    label: supportHours.weekdayLabel,
    hours: supportHours.weekdayHours,
    note: supportHours.weekdayNote,
  },
  {
    label: supportHours.saturdayLabel,
    hours: supportHours.saturdayHours,
    note: supportHours.saturdayNote,
  },
];

// Telefones diretos; ao clicar, o celular abre a ligação.
const phoneChannels = [
  { label: "Telefone / WhatsApp", phone: contactInfo.phone, display: contactInfo.phoneDisplay },
  {
    label: supportHours.saturdayLabel,
    phone: contactInfo.onCallPhone,
    display: contactInfo.onCallPhoneDisplay,
  },
];

/**
 * Página Suporte: horários de atendimento, telefones diretos e atalho para o
 * FAQ. Dados em content/contact.ts.
 */
export default function SuportePage() {
  return (
    <>
      <PageHeader
        eyebrow="Suporte"
        title="Um time preparado para garantir a continuidade da sua operação"
        description="Atendimento, horário de plantão e respostas para as dúvidas técnicas mais comuns."
      />

      {/* id="horario" é o destino do link "Horário de atendimento" do menu */}
      <section id="horario" className="scroll-mt-24 py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Horário de atendimento"
              title="Quando sua empresa precisa, você pode contar com a gente"
            />
            <div className="mt-8 flex flex-col gap-4">
              {schedules.map((schedule) => (
                <Card key={schedule.label}>
                  <CardTitle>{schedule.label}</CardTitle>
                  <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-brand-fg">
                    {schedule.hours}
                  </p>
                  <CardDescription>{schedule.note}</CardDescription>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Fale agora" title="Canais diretos de atendimento" />
            <div className="mt-8 flex flex-col gap-4">
              {phoneChannels.map((channel) => (
                <a
                  key={channel.phone}
                  href={`tel:${channel.phone}`}
                  className="block rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200"
                >
                  <p className="text-sm font-semibold text-foreground">{channel.label}</p>
                  <p className="text-sm text-foreground/60">{channel.display}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Atalho para o FAQ */}
      <section className="border-t border-border-subtle py-20 lg:py-24">
        <Container>
          <Reveal>
            <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Perguntas frequentes</CardTitle>
                <CardDescription>
                  Dúvidas técnicas sobre EFD-Contribuições, NF-e, NFC-e,
                  SINTEGRA e procedimentos operacionais.
                </CardDescription>
              </div>
              <Link
                href="/suporte/faq"
                className={buttonVariants({ className: "shrink-0 group/link" })}
              >
                Ver FAQ completo
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Card>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Não encontrou o que precisava?"
        description="Fale diretamente com o time de suporte da World System."
        primaryLabel="Fale com o suporte"
      />
    </>
  );
}
