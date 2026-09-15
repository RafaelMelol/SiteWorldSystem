import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Perguntas frequentes sobre EFD-Contribuições, NF-e, NFC-e, SINTEGRA e procedimentos operacionais dos sistemas World System.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted py-20 lg:py-24">
        <Container className="max-w-2xl text-center">
          <Link
            href="/suporte"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            ← Suporte
          </Link>
          <Reveal>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-brand-fg">
              FAQ
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Perguntas frequentes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              Respostas para as dúvidas mais comuns de clientes sobre
              escrituração fiscal, emissão de notas e operação do dia a dia.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-14">
            {faqCategories.map((category, index) => (
              <Reveal key={category.title} delay={index * 60}>
                <h2 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
                <p className="mt-1.5 text-sm text-foreground/60">
                  {category.description}
                </p>
                <div className="mt-5">
                  <Accordion items={category.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
