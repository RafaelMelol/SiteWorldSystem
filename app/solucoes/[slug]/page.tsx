import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FileText, Store, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSolutionJsonLd } from "@/lib/structured-data";
import { getSolutionBySlug, solutions } from "@/content/solutions";

const icons: Record<string, LucideIcon> = {
  Varejo: Store,
  Atacado: Warehouse,
  Fiscal: FileText,
  Transporte: Truck,
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: solution.name,
    description: solution.description,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) notFound();

  const Icon = icons[solution.category] ?? Store;

  return (
    <>
      <JsonLd data={getSolutionJsonLd(solution)} />

      <section className="border-b border-border-subtle bg-surface-muted py-16 lg:py-20">
        <Container>
          <Link
            href="/solucoes"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            ← Todas as soluções
          </Link>

          <Reveal delay={80}>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface text-brand-fg">
                <Icon className="size-7" aria-hidden />
              </span>
              <div>
                <Badge>{solution.category}</Badge>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {solution.name}
                </h1>
                <p className="mt-2 text-lg text-foreground/70">{solution.tagline}</p>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/70">
              {solution.description}
            </p>

            {solution.segments && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40">
                  Segmentos atendidos
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {solution.segments.map((segment) => (
                    <li
                      key={segment}
                      className="rounded border border-border-subtle bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground/70"
                    >
                      {segment}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contato"
                className={buttonVariants({ size: "lg", className: "group/link" })}
              >
                Fale com a World System
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                href="/recursos"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Ver todos os recursos
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold text-foreground">
              Recursos incluídos
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {solution.featureGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 70}>
                <div className="rounded-xl border border-border-subtle bg-surface p-6 transition-colors duration-300 ease-out hover:border-brand-200">
                  <h3 className="font-semibold text-foreground">{group.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-accent-500"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={`Quer conhecer o ${solution.name} de perto?`}
        description="Fale com a nossa equipe e veja como essa solução se encaixa na sua operação."
      />
    </>
  );
}
