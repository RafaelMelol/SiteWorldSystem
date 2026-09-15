import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { SolutionsOverview } from "@/components/sections/SolutionsOverview";
import { CompanyTeaser } from "@/components/sections/CompanyTeaser";
import { FeatureJourney } from "@/components/sections/FeatureJourney";
import { IntegrationsStrip } from "@/components/sections/IntegrationsStrip";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getOrganizationJsonLd } from "@/lib/structured-data";
import { featureGroups } from "@/content/features";

export default function HomePage() {
  return (
    <>
      <JsonLd data={getOrganizationJsonLd()} />
      <Hero />
      <SolutionsOverview />
      <CompanyTeaser />

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Recursos"
              title="Gestão completa, do estoque à conformidade fiscal"
              description="Tecnologia, segurança, inteligência de dados e integração operacional reunidas em uma única plataforma."
            />
            <Link
              href="/recursos"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-fg transition-colors hover:text-brand-fg-hover"
            >
              Ver todos os recursos
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <FeatureJourney groups={featureGroups.slice(0, 4)} />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Integrações"
              title="Conectado às ferramentas que sua empresa já utiliza"
              description="Integrações com órgãos fiscais, marketplaces e equipamentos usados no dia a dia comercial."
            />
          </Reveal>
          <div className="mt-12">
            <IntegrationsStrip />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Pronto para modernizar a gestão da sua empresa?"
        description="Fale com a equipe da World System e descubra qual solução se encaixa na sua operação."
      />
    </>
  );
}
