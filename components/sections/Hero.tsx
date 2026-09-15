"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { Parallax, Reveal, ScrollExit } from "@/components/ui/Animations";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { companyOverview } from "@/content/company";

/**
 * Hero da página inicial: título, texto, botões e a ilustração do painel,
 * sobre um fundo animado (grid, blobs de luz e brilho que segue o mouse).
 *
 * A aparência do fundo fica em globals.css, na seção "Fundo animado do hero".
 */
export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  // Onde o mouse está (alvo) e onde o brilho está agora, em % da seção.
  const target = useRef({ x: 50, y: 50 });
  const current = useRef({ x: 50, y: 50 });

  // A cada quadro, o brilho percorre 8% da distância até o mouse, o que cria
  // o movimento suave de "seguir atrasado". Como só reage ao cursor (igual a
  // um efeito de hover), não é desligado por "reduzir movimento".
  useEffect(() => {
    let frameId = 0;
    function follow() {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${current.current.x}%`;
        glowRef.current.style.top = `${current.current.y}%`;
      }
      frameId = requestAnimationFrame(follow);
    }
    frameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Converte a posição do mouse em porcentagem da área da seção.
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  // Ao sair da seção, o brilho volta devagar para o centro.
  function handleMouseLeave() {
    target.current = { x: 50, y: 50 };
  }

  return (
    // -mt-18 puxa a seção para trás do cabeçalho fixo, que é transparente no topo.
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate -mt-18 flex min-h-dvh flex-col overflow-hidden border-b border-border-subtle bg-surface"
    >
      {/* Camadas do fundo animado, atrás do conteúdo (z-index negativo) */}
      <div aria-hidden className="hero-grid pointer-events-none -z-30" />
      <div aria-hidden className="hero-ambient hero-ambient-blue pointer-events-none -z-20" />
      <div aria-hidden className="hero-ambient hero-ambient-green pointer-events-none -z-20" />
      <div ref={glowRef} aria-hidden className="hero-mouse-glow pointer-events-none -z-10" />

      <ScrollExit className="flex flex-1 flex-col">
        <Container className="grid flex-1 grid-cols-1 content-center items-center gap-12 pt-28 pb-16 lg:grid-cols-2 lg:py-20">
          {/* Coluna de texto: cada bloco surge com um pequeno atraso */}
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
                fiscal para indústria, atacado e varejo, unindo tecnologia,
                experiência de mercado e atendimento personalizado para tornar a
                gestão mais eficiente, segura e inteligente.
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

          {/* Ilustração do painel, com leve parallax na rolagem */}
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

/** Botão com seta no pé do hero que rola suavemente até a próxima seção. */
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
