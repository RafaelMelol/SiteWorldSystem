"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { easeOutExpo } from "@/components/ui/Animations";
import type { FeatureGroup } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Recursos por categoria: uma linha de abas e um painel que mostra os itens
 * da aba selecionada. Usado na página inicial e em /recursos.
 *
 * Os contadores ("X categorias · Y recursos") são calculados a partir dos
 * próprios dados, então nunca ficam desatualizados.
 */
export function FeatureJourney({ groups }: { groups: FeatureGroup[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = groups[activeIndex] ?? groups[0];
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div>
      {/* Resumo: quantidade de categorias e de recursos */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/60">
        <span>
          <strong className="font-semibold text-foreground">{groups.length}</strong>{" "}
          categorias
        </span>
        <span className="size-1 rounded-full bg-border-subtle" aria-hidden />
        <span>
          <strong className="font-semibold text-foreground">{totalItems}</strong>{" "}
          recursos inclusos
        </span>
      </div>

      <div className="relative overflow-hidden rounded-tr-3xl border border-border-subtle bg-surface/70 backdrop-blur-xl">
        {/* Manchas de cor decorativas no fundo do painel */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 size-64 rounded-full bg-accent-500/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 size-64 rounded-full bg-brand-500/10 blur-3xl"
        />

        {/* Abas */}
        <div
          role="tablist"
          aria-label="Categorias de recursos"
          className="relative flex flex-wrap gap-2 border-b border-border-subtle p-3"
        >
          {groups.map((group, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={group.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "text-white"
                    : "text-foreground/60 hover:bg-surface hover:text-foreground"
                )}
              >
                {/* Fundo azul da aba ativa. O layoutId faz ele deslizar até a nova aba. */}
                {isActive && (
                  <motion.span
                    layoutId="feature-tab-active"
                    className="absolute inset-0 rounded-lg bg-brand-600 shadow-soft"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{group.title}</span>
              </button>
            );
          })}
        </div>

        {/* Painel da aba ativa. A `key` recria o painel a cada troca de aba,
            disparando a animação de entrada. Não usamos AnimatePresence com
            mode="wait" porque ele espera a saída do painel antigo terminar
            e, se essa animação travar, o conteúdo novo nunca aparece. */}
        <motion.div
          key={active.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className="relative p-6 lg:p-9"
        >
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {active.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
            {active.description}
          </p>

          {/* Itens entram um após o outro (atraso de 40 ms entre eles) */}
          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {active.items.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04, ease: easeOutExpo }}
                className="flex items-start gap-3 rounded-lg border border-border-subtle bg-surface p-4 transition-colors duration-200 hover:border-brand-200"
              >
                <span
                  aria-hidden
                  className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-accent-500"
                />
                <span className="text-sm leading-snug text-foreground/80">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
