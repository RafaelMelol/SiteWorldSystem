"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { useSafeReducedMotion } from "@/components/ui/Animations";

/**
 * Efeitos globais, montados uma única vez no layout raiz (app/layout.tsx).
 *
 * - MotionProvider: faz as animações respeitarem "reduzir movimento"
 * - ScrollProgress: barra fina no topo mostrando quanto da página foi lido
 * - CustomCursor: cursor em forma de círculo que inverte as cores
 */

/* MotionProvider ---------------------------------------------------------- */

/**
 * Com reducedMotion="user", toda animação do Motion fica instantânea para quem
 * ativou "reduzir movimento". As animações em CSS são tratadas em globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ScrollProgress ---------------------------------------------------------- */

/** Barra no topo da tela que cresce conforme a página é rolada. */
export function ScrollProgress() {
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  // useSpring suaviza o crescimento da barra, sem trancos.
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400"
    />
  );
}

/* CustomCursor ------------------------------------------------------------ */

// Só em computador: mouse (e não toque) e tela a partir de 768px de largura.
const CURSOR_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 768px)";

/**
 * Troca a seta do mouse por um círculo que inverte a cor do que está embaixo
 * (a aparência fica em globals.css, classe .custom-cursor).
 *
 * Liga e desliga sozinho quando a janela muda de tamanho. A seta padrão só é
 * escondida enquanto o efeito está ativo, então sem JavaScript nada muda.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CURSOR_QUERY);
    const root = document.documentElement;
    const target = { x: 0, y: 0 }; // onde o mouse está
    const current = { x: 0, y: 0 }; // onde o círculo está
    let hasMoved = false;
    let frameId = 0;

    // A cada quadro, o círculo percorre 60% da distância até o mouse:
    // acompanha praticamente colado, com uma leve suavização.
    function follow() {
      current.x += (target.x - current.x) * 0.6;
      current.y += (target.y - current.y) * 0.6;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(follow);
    }

    function handleMouseMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      // No primeiro movimento, posiciona direto no mouse e mostra o círculo.
      if (!hasMoved) {
        hasMoved = true;
        current.x = target.x;
        current.y = target.y;
        dotRef.current?.classList.add("is-visible");
      }
    }

    // Esconde o círculo quando o mouse sai da janela e mostra quando volta.
    const hide = () => dotRef.current?.classList.remove("is-visible");
    const show = () => hasMoved && dotRef.current?.classList.add("is-visible");

    function enable() {
      root.classList.add("custom-cursor-active"); // esconde a seta padrão
      frameId = requestAnimationFrame(follow);
      window.addEventListener("mousemove", handleMouseMove);
      root.addEventListener("mouseleave", hide);
      root.addEventListener("mouseenter", show);
    }

    function disable() {
      root.classList.remove("custom-cursor-active");
      cancelAnimationFrame(frameId);
      hasMoved = false;
      hide();
      window.removeEventListener("mousemove", handleMouseMove);
      root.removeEventListener("mouseleave", hide);
      root.removeEventListener("mouseenter", show);
    }

    // Reage quando a janela passa a caber (ou deixa de caber) na condição.
    const handleQueryChange = (event: MediaQueryListEvent) =>
      event.matches ? enable() : disable();

    if (mediaQuery.matches) enable();
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      disable();
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="custom-cursor" />;
}
