import {
  Barcode,
  Printer,
  ShoppingBag,
  ShoppingCart,
  Scale,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { integrations } from "@/content/integrations";

const icons: Record<string, LucideIcon> = {
  "SEFAZ/MG": ShieldCheck,
  PedidosOK: ShoppingBag,
  "Mercado Livre": Store,
  Shopee: ShoppingCart,
  Balanças: Scale,
  "Leitores de código de barras": Barcode,
  "Impressoras de etiquetas": Printer,
};

export function IntegrationsStrip({ full = false }: { full?: boolean }) {
  const items = full ? integrations : integrations.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((integration, index) => {
        const Icon = icons[integration.name] ?? ShieldCheck;
        return (
          <Reveal key={integration.name} delay={index * 50}>
            <Card className="flex h-full items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <span className="inline-flex items-center rounded bg-surface-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
                  {integration.category}
                </span>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground">
                  {integration.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                  {integration.description}
                </p>
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
