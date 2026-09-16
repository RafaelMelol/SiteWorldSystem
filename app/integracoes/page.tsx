import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { IntegrationsStrip } from "@/components/sections/IntegrationsStrip";
import { Container, PageHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Integrações",
  description:
    "Integrações da World System com SEF/MG, PedidoOk, Mercado Livre, Shopee e equipamentos de operação como balanças, leitores e impressoras de etiquetas.",
};

export default function IntegracoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Integrações"
        title="Conectado aos órgãos fiscais e à sua operação"
        description="Tecnologia integrada à SEF/MG, aos canais de venda e aos equipamentos que sua empresa já utiliza."
      />

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
