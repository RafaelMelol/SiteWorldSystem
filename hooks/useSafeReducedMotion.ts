"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Substitui o `useReducedMotion()` do Motion, que lê o matchMedia já na
 * primeira renderização do cliente e por isso divergia do HTML do servidor
 * (hydration mismatch) para quem tem "reduzir movimento" ativado.
 *
 * Com useSyncExternalStore o `getServerSnapshot` responde false no SSR e
 * no primeiro paint, e o valor real entra depois, via subscription. Mesmo
 * padrão usado no ThemeToggle.
 */
function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
