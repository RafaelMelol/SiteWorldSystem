"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { animate } from "motion";

/**
 * Animações reutilizáveis (todas rodam no navegador).
 *
 * - Reveal: faz o conteúdo surgir ao entrar na tela
 * - Parallax: desloca o conteúdo num ritmo diferente da rolagem
 * - ScrollExit: afasta e esmaece o conteúdo quando ele sai pelo topo
 * - CountUp: número que conta de 0 até o valor final
 * - useSafeReducedMotion: indica se o visitante pediu "reduzir movimento"
 */

/** Curva de desaceleração das animações: começa rápida e termina suave. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/* Preferência "reduzir movimento" ----------------------------------------- */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

/**
 * Retorna true se o visitante ativou "reduzir movimento" no sistema.
 *
 * No servidor e na primeira pintura responde sempre false, e só depois lê o
 * valor real. Assim o HTML do servidor e o do navegador começam iguais — o
 * hook useReducedMotion() do Motion lia o valor cedo demais e causava erro de
 * hidratação do React para quem tinha essa opção ligada.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

/* Reveal ------------------------------------------------------------------ */

/**
 * Surge com fade e leve subida na primeira vez que aparece na tela.
 * `delay` é em milissegundos, útil para escalonar os itens de uma lista.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      // once: anima só na primeira vez; margin: dispara um pouco antes do fim da tela.
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

/* Parallax ---------------------------------------------------------------- */

/**
 * Desloca o conteúdo até `range` pixels enquanto ele atravessa a tela,
 * criando sensação de profundidade. Valores pequenos (20 a 60) ficam melhores.
 */
export function Parallax({
  children,
  range = 60,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Progresso de 0 (entrando por baixo da tela) a 1 (saindo por cima).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ScrollExit -------------------------------------------------------------- */

/**
 * Enquanto o conteúdo sai pelo topo da tela, ele sobe um pouco, diminui e
 * esmaece, em vez de sumir de forma seca. Usado no hero.
 */
export function ScrollExit({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSafeReducedMotion();
  // Progresso de 0 (topo do elemento no topo da tela) a 1 (elemento todo acima).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? undefined : { y, scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* CountUp ----------------------------------------------------------------- */

/**
 * Mostra um número contando de 0 até `value` quando ele aparece na tela.
 * Com "reduzir movimento" ativo, mostra direto o valor final.
 */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useSafeReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: easeOutExpo,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefersReducedMotion ? value : display}
      {suffix}
    </span>
  );
}
