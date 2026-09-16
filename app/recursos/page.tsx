import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureJourney } from "@/components/sections/FeatureJourney";
import { Reveal } from "@/components/ui/Animations";
import { Container } from "@/components/ui/Section";
import { featureGroups } from "@/content/features";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Conheça os recursos das soluções World System: plataforma web, relatórios, segurança, emissão fiscal, operação comercial e integrações com equipamentos.",
};

export default function RecursosPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-fg">Recursos</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Um conjunto completo de soluções à disposição da sua empresa
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Os recursos abaixo estão presentes, no todo ou em parte, nas
              soluções SCA 5.0 Pro, NFe/NFCe e CTe/MDFe — organizados por
              categoria para facilitar a consulta.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <FeatureJourney groups={featureGroups} />
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Quer ver esses recursos em ação?"
        description="Agende uma conversa com a World System e conheça a solução ideal para o seu negócio."
      />
    </>
  );
}
