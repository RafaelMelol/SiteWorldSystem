import Link from "next/link";
import type { HTMLAttributes } from "react";
import { Reveal } from "@/components/ui/Animations";
import { cn } from "@/lib/utils";

/**
 * Blocos de estrutura das páginas.
 *
 * - Container: centraliza o conteúdo e limita a largura
 * - SectionHeading: topo de uma seção (rótulo, título e descrição)
 * - PageHeader: faixa de abertura das páginas internas
 */

/** Centraliza o conteúdo, limita a largura e aplica as margens laterais. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)} {...props} />;
}

/** Topo de uma seção: rótulo pequeno em caixa-alta, título e descrição opcional. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-fg">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Faixa de abertura das páginas internas: fundo suave com rótulo, título
 * principal (h1) e descrição centralizados. Com `backLink`, mostra um link
 * de "voltar" acima do título.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  backLink,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
      <Container className="max-w-2xl text-center">
        {backLink && (
          <Link
            href={backLink.href}
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            ← {backLink.label}
          </Link>
        )}
        <Reveal>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-wide text-brand-fg",
              backLink && "mt-4"
            )}
          >
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">{description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
