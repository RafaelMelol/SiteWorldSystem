import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import type { Solution } from "@/types/content";

/**
 * Card largo de solução: numeral de fundo, tags e CTA. Usado na Home e em
 * /solucoes para as duas listagens ficarem iguais.
 */
export function SolutionRow({
  solution,
  index,
  ctaLabel = "Ver detalhes",
}: {
  solution: Solution;
  index: number;
  ctaLabel?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-subtle bg-surface p-8 transition-colors duration-300 ease-out hover:border-brand-200 lg:p-10">
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
          {solution.segments && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {solution.segments.map((segment) => (
                <li
                  key={segment}
                  className="rounded bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground/60"
                >
                  {segment}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={`/solucoes/${solution.slug}`}
          className={buttonVariants({ className: "group/link shrink-0" })}
        >
          {ctaLabel}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
