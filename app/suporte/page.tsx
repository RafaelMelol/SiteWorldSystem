import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MessageCircleQuestion, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { supportHours } from "@/content/support";
import { contactInfo } from "@/content/contact";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Horário de atendimento e perguntas frequentes sobre os sistemas da World System.",
};

export default function SuportePage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-fg">
              Suporte
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Um time pronto para manter sua operação funcionando
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Atendimento telefônico, horário de plantão e respostas para as
              dúvidas técnicas mais comuns.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="horario" className="scroll-mt-24 py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Horário de atendimento"
              title="Quando você pode contar com a gente"
            />
            <div className="mt-8 flex flex-col gap-4">
              <Card className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="size-5" aria-hidden />
                </span>
                <div>
                  <CardTitle>{supportHours.weekdayLabel}</CardTitle>
                  <p className="mt-1 text-sm font-semibold text-brand-fg">
                    {supportHours.weekdayHours}
                  </p>
                  <CardDescription>{supportHours.weekdayNote}</CardDescription>
                </div>
              </Card>
              <Card className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Zap className="size-5" aria-hidden />
                </span>
                <div>
                  <CardTitle>{supportHours.saturdayLabel}</CardTitle>
                  <p className="mt-1 text-sm font-semibold text-brand-fg">
                    {supportHours.saturdayHours}
                  </p>
                  <CardDescription>{supportHours.saturdayNote}</CardDescription>
                </div>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Fale agora"
              title="Canais diretos de atendimento"
            />
            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Telefone / WhatsApp
                  </p>
                  <p className="text-sm text-foreground/60">
                    {contactInfo.phoneDisplay}
                  </p>
                </div>
              </a>
              <a
                href={`tel:${contactInfo.onCallPhone}`}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Plantão de sábado
                  </p>
                  <p className="text-sm text-foreground/60">
                    {contactInfo.onCallPhoneDisplay}
                  </p>
                </div>
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle py-20 lg:py-24">
        <Container>
          <Reveal>
            <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MessageCircleQuestion className="size-5" aria-hidden />
                </span>
                <div>
                  <CardTitle>Perguntas frequentes</CardTitle>
                  <CardDescription>
                    Dúvidas técnicas sobre EFD-Contribuições, NF-e, SINTEGRA e
                    procedimentos operacionais.
                  </CardDescription>
                </div>
              </div>
              <Link href="/suporte/faq" className={buttonVariants({ className: "shrink-0 group/link" })}>
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
