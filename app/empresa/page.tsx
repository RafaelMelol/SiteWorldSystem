import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/ui/Animations";
import { Card, CardDescription, CardTitle, TagList } from "@/components/ui/Card";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { companyOverview, companyPillars, segmentsServed } from "@/content/company";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Conheça a história da World System: pioneira em soluções de TI desde 1993, com sede em Lagoa da Prata/MG, atendendo indústria, atacado e varejo.",
};

/**
 * Página Empresa: apresentação, localização, princípios e diferenciais.
 * Textos em content/company.ts.
 */
export default function EmpresaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Empresa"
        title={`Pioneira em soluções de TI desde ${companyOverview.foundingYear}`}
        description={companyOverview.intro}
      />

      {/* Localização (esquerda) e princípios (direita) */}
      <section className="py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Nossa localização"
              title={`Sede em ${companyOverview.headquarters}`}
            />
            <div className="mt-6 flex flex-col gap-6">
              <InfoBox>
                A World System fica a {companyOverview.distanceFromBH}, no
                centro-oeste de Minas Gerais, com sede própria, instalações e
                equipamentos modernos, além de veículos próprios para
                atendimento in loco.
              </InfoBox>
              <InfoBox title="Segmentos atendidos">
                <TagList items={segmentsServed} className="mt-1" />
              </InfoBox>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Nossos princípios" title="O que nos move" />
            <div className="mt-6 flex flex-col gap-4">
              <InfoBox title="Missão">{companyOverview.mission}</InfoBox>
              <InfoBox title="Compromisso">{companyOverview.commitment}</InfoBox>
              <InfoBox title="Reconhecimento">{companyOverview.recognition}</InfoBox>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Diferenciais em 4 cartões */}
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

/** Caixa de texto com borda, com título opcional. */
function InfoBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-5 transition-colors duration-300 ease-out hover:border-brand-200">
      {title && <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>}
      <div className="text-sm leading-relaxed text-foreground/70">{children}</div>
    </div>
  );
}
