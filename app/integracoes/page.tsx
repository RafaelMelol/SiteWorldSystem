import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IntegrationsStrip } from "@/components/sections/IntegrationsStrip";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Integrações",
  description:
    "Integrações da World System com SEFAZ/MG, PedidosOK, Mercado Livre e equipamentos de operação como balanças, leitores e impressoras de etiquetas.",
};

export default function IntegracoesPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-fg">
              Integrações
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Conectado aos órgãos fiscais e à sua operação
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              As soluções World System são totalmente integradas aos
              aplicativos da SEFAZ/MG e conectam-se a canais de venda e
              equipamentos já usados no seu dia a dia.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <IntegrationsStrip full />
        </Container>
      </section>

      <CtaBanner
        title="Precisa integrar um equipamento ou canal de venda específico?"
        description="Fale com a nossa equipe e entenda como a integração funciona na prática."
      />
    </>
  );
}
