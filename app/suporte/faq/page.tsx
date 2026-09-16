import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Animations";
import { Container, PageHeader } from "@/components/ui/Section";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Perguntas frequentes sobre EFD-Contribuições, NF-e, NFC-e, SINTEGRA e procedimentos operacionais dos sistemas World System.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Perguntas frequentes"
        description="Respostas para as dúvidas mais comuns de clientes sobre escrituração fiscal, emissão de notas e operação do dia a dia."
        backLink={{ href: "/suporte", label: "Suporte" }}
      />

      <section className="py-20 lg:py-24">
        <Container className="flex max-w-3xl flex-col gap-14">
          {faqCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 60}>
              <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
              <p className="mt-1.5 text-sm text-foreground/60">{category.description}</p>
              <div className="mt-5">
                <Accordion items={category.items} />
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
