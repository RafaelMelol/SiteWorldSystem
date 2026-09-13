"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Faz o conteúdo aparecer com fade + slide na primeira vez que entra na
 * viewport. Usa o whileInView do Motion em vez de IntersectionObserver na
 * mão, e o MotionConfig(reducedMotion="user") no root deixa o reveal
 * instantâneo quando o sistema pede menos movimento.
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
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
