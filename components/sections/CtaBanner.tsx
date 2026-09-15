import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * Faixa azul de chamada para contato, exibida no fim das páginas.
 * O botão principal leva a /contato e o secundário a /solucoes.
 */
export function CtaBanner({
  title,
  description,
  primaryLabel = "Fale com a World System",
}: {
  title: string;
  description: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <Reveal className="relative bg-gradient-to-br from-brand-950 via-brand-700 to-accent-700">
        {/* Brilho azul mais claro no lado esquerdo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_15%_50%,var(--brand-500),transparent)] opacity-40"
        />

        <Container className="relative flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link
              href="/contato"
              className={buttonVariants({ variant: "inverse", size: "lg", className: "group/link" })}
            >
              {primaryLabel}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/solucoes"
              className={buttonVariants({ variant: "inverseGhost", size: "lg" })}
            >
              Conheça nossas soluções
            </Link>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
