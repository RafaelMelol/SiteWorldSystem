"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Botão que alterna entre tema claro e escuro.
 *
 * A escolha fica salva no navegador (localStorage) e é aplicada no <html>
 * como data-theme="light" ou "dark" — atributo que o globals.css usa para
 * trocar as cores. Sem escolha salva, o site segue o tema do sistema.
 */

type Theme = "light" | "dark";

// Evento próprio para manter sincronizados os dois botões (desktop e mobile).
const THEME_EVENT = "wsi-theme-change";

// Avisa o React quando o tema pode ter mudado: tema do sistema, clique em um
// dos botões ou alteração feita em outra aba.
function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// Tema atual: a escolha salva ou, se não houver, o tema do sistema.
function getSnapshot(): Theme {
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// No servidor não dá para saber o tema do visitante; assume o claro.
function getServerSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) === "dark";
  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:border-brand-400 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Sol no tema escuro (para voltar ao claro) e lua no tema claro. */}
      <Sun aria-hidden className={cn("size-[18px]", isDark ? "block" : "hidden")} />
      <Moon aria-hidden className={cn("size-[18px]", isDark ? "hidden" : "block")} />
    </button>
  );
}
