import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanyTeaser } from "@/components/sections/CompanyTeaser";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureJourney } from "@/components/sections/FeatureJourney";
import { Hero } from "@/components/sections/Hero";
import { IntegrationsStrip } from "@/components/sections/IntegrationsStrip";
import { SolutionsOverview } from "@/components/sections/Solutions";
import { Reveal } from "@/components/ui/Animations";
import { Container, SectionHeading } from "@/components/ui/Section";
import { featureGroups } from "@/content/features";
import { JsonLd, getOrganizationJsonLd } from "@/lib/seo";

/**
 * Página inicial.
 *
 * Seções, na ordem: hero → soluções → sobre a empresa → recursos →
 * integrações → faixa de contato.
 */
export default function HomePage() {
  return (
    <>
      {/* Dados da empresa para buscadores (não aparece na tela) */}
      <JsonLd data={getOrganizationJsonLd()} />

      <Hero />
      <SolutionsOverview />
      <CompanyTeaser />

      {/* Recursos: texto à esquerda e abas com as 4 primeiras categorias à direita */}
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

      {/* Integrações: prévia com as 6 primeiras */}
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
