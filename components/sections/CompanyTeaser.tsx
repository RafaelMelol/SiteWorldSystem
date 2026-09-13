import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { companyOverview, companyPillars, segmentsServed } from "@/content/company";

const yearsInBusiness = new Date().getFullYear() - companyOverview.foundingYear;

export function CompanyTeaser() {
  return (
    <section className="bg-surface-muted py-20 lg:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Sobre a World System"
            title={`Mais de três décadas de experiência em TI, desde ${companyOverview.foundingYear}`}
            description={companyOverview.intro}
          />

          <div className="mt-8 flex items-center gap-8">
            <div>
              <CountUp
                value={yearsInBusiness}
                suffix="+"
                className="text-4xl font-bold tabular-nums text-brand-fg"
              />
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
                Anos de mercado
              </p>
            </div>
            <div className="h-10 w-px bg-border-subtle" aria-hidden />
            <div>
              <CountUp
                value={segmentsServed.length}
                className="text-4xl font-bold tabular-nums text-brand-fg"
              />
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
                Segmentos atendidos
              </p>
            </div>
          </div>

          <Link
            href="/empresa"
            className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-fg transition-colors hover:text-brand-fg-hover"
          >
            Conheça a nossa história
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {companyPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 60}>
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {pillar.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
