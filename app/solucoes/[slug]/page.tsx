import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { getSolutionBySlug, solutions } from "@/content/solutions";
import { JsonLd, getSolutionJsonLd } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const solution = getSolutionBySlug((await params).slug);
  return solution ? { title: solution.name, description: solution.description } : {};
}

export default async function SolutionPage({ params }: PageProps) {
  const solution = getSolutionBySlug((await params).slug);

  if (!solution) notFound();

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
            <div className="mt-6">
              <Badge>{solution.category}</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {solution.name}
              </h1>
              <p className="mt-2 text-lg text-foreground/70">{solution.tagline}</p>
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
            <h2 className="text-2xl font-semibold text-foreground">Recursos incluídos</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {solution.featureGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 70}>
                <div className="rounded-xl border border-border-subtle bg-surface p-6 transition-colors duration-300 ease-out hover:border-brand-200">
                  <h3 className="font-semibold text-foreground">{group.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/70">
                        <span
                          aria-hidden
                          className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-accent-500"
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
