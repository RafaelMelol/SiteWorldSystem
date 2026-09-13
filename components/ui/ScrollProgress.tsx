"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

/**
 * Barra fina no topo da viewport indicando o progresso de leitura da
 * página. Não intercepta rolagem nem cliques.
 */
export function ScrollProgress() {
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400"
    />
  );
}
