import { Reveal } from "@/components/ui/Animations";
import { Card } from "@/components/ui/Card";
import { integrations } from "@/content/integrations";

/**
 * Grade de cartões das integrações (dados em content/integrations.ts).
 * Com `full`, mostra todas; sem ele, só as 6 primeiras (prévia da página inicial).
 */
export function IntegrationsStrip({ full = false }: { full?: boolean }) {
  const items = full ? integrations : integrations.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((integration, index) => (
        <Reveal key={integration.name} delay={index * 50}>
          <Card className="h-full">
            <span className="inline-flex items-center rounded bg-surface-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
              {integration.category}
            </span>
            <p className="mt-2.5 text-lg font-bold tracking-tight text-foreground">
              {integration.name}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
              {integration.description}
            </p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
