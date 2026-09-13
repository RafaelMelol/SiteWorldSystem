"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Rola suavemente até a seção seguinte à <section> onde está. Fica no pé
 * do hero, indicando que ainda tem conteúdo abaixo.
 */
export function ScrollCueButton({ label = "Rolar para o próximo conteúdo" }: { label?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    const section = buttonRef.current?.closest("section");
    const next = section?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="group inline-flex size-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-foreground/60 shadow-soft transition-colors hover:border-brand-fg hover:text-brand-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ChevronDown
        aria-hidden
        className="size-5 animate-bounce transition-transform group-hover:translate-y-0.5"
      />
    </button>
  );
}
