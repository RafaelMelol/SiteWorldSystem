import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Autorização de marketplace",
  // Página de uso interno: fica fora do Google e não entra no sitemap.
  robots: { index: false, follow: false },
  // Não repassa a URL (que contém o code) para outros sites ao clicar em links.
  referrer: "no-referrer",
};

/**
 * Página de retorno da autorização dos marketplaces (Shopee e Mercado Livre).
 *
 * Quando o lojista autoriza o app na plataforma, ela redireciona para esta
 * página com os dados na URL. O formato da URL indica de qual marketplace veio:
 *   Shopee:        /marketplace?code=xxxxx&shop_id=xxxx
 *   Mercado Livre: /marketplace?code=TG-xxxxx  (só o code)
 * Aqui só exibimos esses valores com um botão de copiar para cada um.
 * Nada é salvo nem enviado para lugar nenhum.
 */
export default async function MarketplacePage({ searchParams }: PageProps<"/marketplace">) {
  const params = await searchParams;
  const code = readParam(params.code);
  const shopId = readParam(params.shop_id);
  // Autorizações de conta principal da Shopee chegam com main_account_id no
  // lugar de shop_id.
  const mainAccountId = readParam(params.main_account_id);

  // Sem code não há o que mostrar.
  if (!code) return <EmptyState />;

  // Com shop_id (ou main_account_id) é Shopee; só com o code é Mercado Livre.
  const isShopee = Boolean(shopId || mainAccountId);
  const marketplace = isShopee ? "Shopee" : "Mercado Livre";
  const title = isShopee
    ? "Copie aqui seus códigos da Shopee"
    : "Copie aqui seus códigos do Mercado Livre";

  // Campos exibidos, na ordem da tela. Os vazios são descartados.
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
              {/* break-all quebra códigos longos em vez de estourar o cartão */}
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

/** Estrutura comum da página: rótulo, título e conteúdo. */
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

/** Aviso exibido quando a página é aberta sem o code na URL. */
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

/** Lê um parâmetro da URL. Se vier repetido, usa o primeiro; vazio vira "". */
function readParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}
