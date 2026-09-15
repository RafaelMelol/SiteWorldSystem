import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Badge, TagList } from "@/components/ui/Card";
import { Container, SectionHeading } from "@/components/ui/Section";
import { solutions } from "@/content/solutions";
import type { Solution } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Listagem das soluções (dados em content/solutions.ts).
 *
 * - SolutionsOverview: seção completa da página inicial (título + lista)
 * - SolutionList: só a lista de cartões, usada também em /solucoes
 */

export function SolutionsOverview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Soluções"
            title="Soluções inteligentes para cada etapa da sua operação"
            description="Da retaguarda ao ponto de venda, da emissão fiscal ao transporte — tecnologia integrada para conectar e simplificar toda a sua operação comercial."
          />
        </Reveal>
        <SolutionList className="mt-12" />
      </Container>
    </section>
  );
}

/** Cartões das soluções, um embaixo do outro, surgindo em sequência. */
export function SolutionList({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {solutions.map((solution, index) => (
        <Reveal key={solution.slug} delay={index * 60}>
          <SolutionCard solution={solution} index={index} />
        </Reveal>
      ))}
    </div>
  );
}

/** Cartão de uma solução: numeral de fundo, categoria, nome, descrição, segmentos e botão. */
function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-subtle bg-surface p-8 transition-colors duration-300 ease-out hover:border-brand-200 lg:p-10">
      {/* Numeral grande e apagado no canto (01, 02...). A opacidade muda por tema, em globals.css. */}
      <span
        aria-hidden
        style={{ opacity: "var(--watermark-opacity)" }}
        className="pointer-events-none absolute -right-2 -top-8 select-none text-[7rem] font-bold leading-none tracking-tighter text-foreground lg:-top-10 lg:text-[9rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Badge>{solution.category}</Badge>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
            {solution.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
            {solution.description}
          </p>
          {solution.segments && <TagList items={solution.segments} className="mt-4" />}
        </div>

        <Link
          href={`/solucoes/${solution.slug}`}
          className={buttonVariants({ className: "group/link shrink-0" })}
        >
          Ver detalhes
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
