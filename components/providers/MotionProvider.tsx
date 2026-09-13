"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Faz toda animação do Motion respeitar o prefers-reduced-motion do
 * sistema. As animações em JS do Motion não passam pela regra de
 * transição em globals.css, então precisam disso aqui.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
