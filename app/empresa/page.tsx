import type { Metadata } from "next";
import { Building2, MapPin, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  companyOverview,
  companyPillars,
  segmentsServed,
} from "@/content/company";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Conheça a história da World System: pioneira em soluções de TI desde 1993, com sede em Lagoa da Prata/MG, atendendo indústria, atacado e varejo.",
};

export default function EmpresaPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-fg">
              <Building2 className="size-3.5" aria-hidden />
              Empresa
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Pioneira em soluções de TI desde {companyOverview.foundingYear}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              {companyOverview.intro}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Nossa localização"
              title={`Sede em ${companyOverview.headquarters}`}
            />
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-fg" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/70">
                A World System fica a {companyOverview.distanceFromBH}, no
                centro-oeste de Minas Gerais, com sede própria, instalações e
                equipamentos modernos, além de veículos próprios para
                atendimento in loco.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200">
              <div className="flex items-center gap-3">
                <Users className="size-5 shrink-0 text-brand-fg" aria-hidden />
                <p className="text-sm font-semibold text-foreground">
                  Segmentos atendidos
                </p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {segmentsServed.map((segment) => (
                  <li
                    key={segment}
                    className="rounded bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground/70"
                  >
                    {segment}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Nossos princípios" title="O que nos move" />
            <div className="mt-6 flex flex-col gap-4">
              <PrincipleCard
                title="Missão"
                description={companyOverview.mission}
              />
              <PrincipleCard
                title="Compromisso"
                description={companyOverview.commitment}
              />
              <PrincipleCard
                title="Reconhecimento"
                description={companyOverview.recognition}
                icon={<ShieldCheck className="size-4" aria-hidden />}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Por que a World System"
              title="Experiência, estrutura e atendimento personalizado"
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 60}>
                <Card className="h-full">
                  <CardTitle>{pillar.title}</CardTitle>
                  <CardDescription>{pillar.description}</CardDescription>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Quer conhecer de perto o trabalho da World System?"
        description="Nossa equipe está pronta para entender o seu negócio e apresentar a solução mais adequada."
      />
    </>
  );
}

function PrincipleCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {description}
      </p>
    </div>
  );
}
