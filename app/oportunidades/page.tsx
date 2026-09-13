import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { CareerForm } from "@/components/sections/CareerForm";

export const metadata: Metadata = {
  title: "Oportunidades",
  description:
    "Envie seu currículo para a World System. Ainda não há vagas específicas divulgadas, mas teremos prazer em conhecer o seu perfil.",
};

export default function OportunidadesPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <Reveal>
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Briefcase className="size-6" aria-hidden />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
            Oportunidades
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Nos envie seu currículo. Será um prazer trabalhar com você.
          </p>
          <Card className="mt-8 bg-surface-muted">
            <p className="text-sm leading-relaxed text-foreground/70">
              No momento não há vagas específicas divulgadas nesta página.
              Mesmo assim, currículos são bem-vindos e ficam disponíveis para
              futuras oportunidades na World System.
            </p>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card>
            <CareerForm />
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
