"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { Parallax, Reveal, ScrollExit } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { companyOverview } from "@/content/company";

export function Hero() {
  return (
    <section className="relative isolate -mt-18 flex min-h-dvh flex-col overflow-hidden border-b border-border-subtle bg-surface">
      <div aria-hidden className="hero-grid pointer-events-none -z-30" />
      <div aria-hidden className="hero-ambient hero-ambient-blue pointer-events-none -z-20" />
      <div aria-hidden className="hero-ambient hero-ambient-green pointer-events-none -z-20" />

      <ScrollExit className="flex flex-1 flex-col">
        <Container className="grid flex-1 grid-cols-1 content-center items-center gap-12 pt-28 pb-16 lg:grid-cols-2 lg:py-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-border-subtle bg-surface-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-fg">
                Desde {companyOverview.foundingYear}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Tecnologia que organiza, automatiza e impulsiona a gestão do seu
                negócio
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
                A World System oferece soluções completas em gestão e emissão
                fiscal para pequenas indústrias, atacados e varejos, unindo
                tecnologia, experiência de mercado e atendimento personalizado
                para tornar a gestão mais eficiente, segura e inteligente.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/solucoes"
                  className={buttonVariants({ size: "lg", className: "group/link" })}
                >
                  Conheça nossas soluções
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/contato"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Fale com a World System
                </Link>
              </div>
            </Reveal>
          </div>

          <Parallax range={22} className="animate-fade-in">
            <DashboardMockup />
          </Parallax>
        </Container>
      </ScrollExit>

      <div className="hidden justify-center pb-8 sm:flex">
        <ScrollCue />
      </div>
    </section>
  );
}

function ScrollCue() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function scrollToNextSection() {
    const nextSection = buttonRef.current?.closest("section")?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToNextSection}
      aria-label="Rolar para conhecer as soluções"
      className="group inline-flex size-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-foreground/60 shadow-soft transition-colors hover:border-brand-fg hover:text-brand-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ChevronDown
        aria-hidden
        className="size-5 animate-bounce transition-transform group-hover:translate-y-0.5"
      />
    </button>
  );
}
