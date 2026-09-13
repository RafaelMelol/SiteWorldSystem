import { FileText, Store, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionRow } from "@/components/sections/SolutionRow";
import { solutions } from "@/content/solutions";

const icons: Record<string, LucideIcon> = {
  Varejo: Store,
  Atacado: Warehouse,
  Fiscal: FileText,
  Transporte: Truck,
};

export function SolutionsOverview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Soluções"
            title="Sistemas pensados para cada etapa da sua operação"
            description="Da retaguarda ao ponto de venda, passando pela emissão fiscal e pelo transporte de mercadorias — cada solução cobre uma frente essencial da gestão comercial."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {solutions.map((solution, index) => (
            <Reveal key={solution.slug} delay={index * 60}>
              <SolutionRow
                solution={solution}
                index={index}
                icon={icons[solution.category] ?? Store}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
