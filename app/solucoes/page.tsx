import type { Metadata } from "next";
import { FileText, Store, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SolutionRow } from "@/components/sections/SolutionRow";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Conheça as soluções da World System: SCA 4.0 Pro para varejo e atacado, emissão de NFe/NFCe e documentos fiscais de transporte CTe, CTe OS e MDFe.",
};

const icons: Record<string, LucideIcon> = {
  Varejo: Store,
  Atacado: Warehouse,
  Fiscal: FileText,
  Transporte: Truck,
};

export default function SolucoesPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-fg">
              Soluções
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Sistemas completos para gestão e automação comercial
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Quatro frentes de solução, integradas entre si, para acompanhar a
              operação do estoque à conformidade fiscal.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container className="flex flex-col gap-6">
          {solutions.map((solution, index) => (
            <Reveal key={solution.slug} delay={index * 70}>
              <SolutionRow
                solution={solution}
                index={index}
                icon={icons[solution.category] ?? Store}
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaBanner
        title="Ainda não sabe qual solução é ideal para você?"
        description="Conte para a gente sobre o seu negócio e a equipe da World System indica o melhor caminho."
      />
    </>
  );
}
