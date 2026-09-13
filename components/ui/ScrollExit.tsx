"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

/**
 * Afasta e esmaece o conteúdo conforme ele sai pelo topo da viewport, em
 * vez de um corte seco. Só anima a saída (o intervalo está preso à borda
 * superior do próprio elemento), então não afeta o layout.
 */
export function ScrollExit({
  children,
  className,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const [opacity, setOpacity] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setOpacity(1 - progress * 0.65);
  });

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
