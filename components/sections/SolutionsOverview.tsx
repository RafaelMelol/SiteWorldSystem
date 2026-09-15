import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionRow } from "@/components/sections/SolutionRow";
import { solutions } from "@/content/solutions";

export function SolutionsOverview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Soluções"
            title="Soluções inteligentes para cada etapa da sua operação"
            description="Da retaguarda ao ponto de venda, da emissão fiscal ao transporte — tecnologia integrada para conectar e simplificar toda a sua operação comercial."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {solutions.map((solution, index) => (
            <Reveal key={solution.slug} delay={index * 60}>
              <SolutionRow solution={solution} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
