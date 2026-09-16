import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Autorização de marketplace",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function MarketplacePage({ searchParams }: PageProps<"/marketplace">) {
  const params = await searchParams;
  const code = readParam(params.code);
  const shopId = readParam(params.shop_id);
  const mainAccountId = readParam(params.main_account_id);

  if (!code) return <EmptyState />;

  const isShopee = Boolean(shopId || mainAccountId);
  const marketplace = isShopee ? "Shopee" : "Mercado Livre";
  const title = isShopee
    ? "Copie aqui seus códigos da Shopee"
    : "Copie aqui seus códigos do Mercado Livre";

  const fields = [
    { label: "Code", value: code },
    { label: "Shop ID", value: shopId },
    { label: "Main Account ID", value: mainAccountId },
  ].filter((field) => field.value);

  return (
    <PageShell eyebrow={marketplace} title={title}>
      <div className="mt-10 flex flex-col gap-4">
        {fields.map((field) => (
          <Card
            key={field.label}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                {field.label}
              </p>
              <p className="mt-2 break-all font-mono text-lg text-foreground">{field.value}</p>
            </div>
            <CopyButton value={field.value} label={field.label} />
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-foreground/60">
        O código expira em 10 minutos e é de uso único. Se expirar, gere uma
        nova autorização na plataforma {isShopee ? "da Shopee" : "do Mercado Livre"}.
      </p>
    </PageShell>
  );
}

function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-fg">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {children}
      </Container>
    </section>
  );
}

function EmptyState() {
  return (
    <PageShell eyebrow="Marketplace" title="Autorização de marketplace">
      <Card className="mt-10">
        <p className="font-semibold text-foreground">Nenhum código encontrado</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          Esta página deve ser aberta pelo link gerado na plataforma da Shopee
          ou do Mercado Livre, que já traz os dados no endereço.
        </p>
      </Card>
    </PageShell>
  );
}

function readParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}
