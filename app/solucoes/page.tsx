import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SolutionList } from "@/components/sections/Solutions";
import { Container, PageHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Conheça as soluções da World System: SCA 5.0 Pro para varejo e atacado, emissão de NFe/NFCe e documentos fiscais de transporte CTe, CTe OS e MDFe.",
};

export default function SolucoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Soluções"
        title="Sistemas completos para gestão e automação comercial"
        description="Quatro frentes de solução, integradas entre si, para acompanhar a operação do estoque à conformidade fiscal."
      />

      <section className="py-20 lg:py-24">
        <Container>
          <SolutionList />
        </Container>
      </section>

      <CtaBanner
        title="Ainda não sabe qual solução é ideal para você?"
        description="Conte para a gente sobre o seu negócio e a equipe da World System indica o melhor caminho."
      />
    </>
  );
}
