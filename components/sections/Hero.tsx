"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollCueButton } from "@/components/ui/ScrollCueButton";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ScrollExit } from "@/components/ui/ScrollExit";
import { DashboardMockup } from "@/components/illustrations/DashboardMockup";
import { companyOverview } from "@/content/company";

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });

  // rAF + lerp puro, sem biblioteca. Não está atrás de
  // prefers-reduced-motion porque o glow só segue o cursor — é da mesma
  // categoria de um efeito de hover, não de animação automática.
  useEffect(() => {
    let frameId: number;
    function animate() {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${currentPos.current.x}%`;
        glowRef.current.style.top = `${currentPos.current.y}%`;
      }
      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    targetPos.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  function handleMouseLeave() {
    targetPos.current = { x: 50, y: 50 };
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate -mt-18 flex min-h-dvh flex-col overflow-hidden border-b border-border-subtle bg-surface"
    >
      <div aria-hidden className="hero-grid pointer-events-none -z-30" />
      <div
        aria-hidden
        className="hero-ambient hero-ambient-blue pointer-events-none -z-20"
      />
      <div
        aria-hidden
        className="hero-ambient hero-ambient-green pointer-events-none -z-20"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="hero-mouse-glow pointer-events-none -z-10"
      />

      <ScrollExit className="flex flex-1 flex-col">
        <Container className="grid flex-1 grid-cols-1 content-center items-center gap-12 pt-28 pb-16 lg:grid-cols-2 lg:py-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-border-subtle bg-surface-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-fg">
                Desde {companyOverview.foundingYear} em soluções de TI
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Tecnologia que organiza a gestão e a automação do seu negócio
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
                A World System desenvolve sistemas de gestão, PDV e emissão fiscal
                para empresas de indústria, atacado e varejo, unindo experiência
                de mercado e atendimento personalizado.
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
        <ScrollCueButton label="Rolar para conhecer as soluções" />
      </div>
    </section>
  );
}
