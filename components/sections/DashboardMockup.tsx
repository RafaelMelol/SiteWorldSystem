"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  FileCheck2,
  PackageSearch,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useSafeReducedMotion } from "@/components/ui/Animations";
import { cn } from "@/lib/utils";

/**
 * Ilustração decorativa de um painel de gestão, exibida no hero.
 * É desenhada com HTML e CSS — não é uma captura de tela do sistema real.
 */

// Alturas das barras do gráfico de faturamento, em %.
const chartBars = [40, 65, 45, 80, 60, 95];

export function DashboardMockup() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md select-none">
      {/* Brilho colorido atrás do painel */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-transparent to-accent-100 blur-2xl" />

      <div className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-elevated">
        {/* Barra de título, imitando uma janela */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-accent-400" />
          </div>
          <span className="text-xs font-medium text-foreground/40">Painel de gestão</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Gráfico de faturamento */}
          <div className="rounded-xl bg-surface-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground/50">Faturamento</span>
              <TrendingUp className="size-3.5 text-accent-500" />
            </div>
            <div className="mt-2 flex h-12 items-end gap-1">
              {chartBars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-brand-500/70"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Indicadores de status */}
          <div className="flex flex-col gap-3">
            <StatusItem
              icon={FileCheck2}
              iconClassName="bg-brand-600 text-white"
              label="NFe emitida"
              value="Autorizada"
            />
            <StatusItem
              icon={PackageSearch}
              iconClassName="bg-accent-500 text-white"
              label="Estoque"
              value="Sincronizado"
            />
          </div>
        </div>

        {/* Linha de análise */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-surface-muted p-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <BarChart3 className="size-4" />
            </span>
            <p className="text-xs font-medium text-foreground/70">Análise ABC de produtos</p>
          </div>
          <span className="rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
            Tempo real
          </span>
        </div>
      </div>

      {/* Cartão flutuante que sobe e desce devagar (parado com "reduzir movimento") */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-11 -left-8 hidden w-40 rounded-xl border border-border-subtle bg-surface p-3 shadow-card sm:block"
      >
        <p className="text-[11px] font-medium text-foreground/50">Filiais monitoradas</p>
        <p className="mt-1 text-lg font-bold text-brand-fg">Multiempresa</p>
      </motion.div>
    </div>
  );
}

/** Indicador com ícone colorido, rótulo e valor. */
function StatusItem({
  icon: Icon,
  iconClassName,
  label,
  value,
}: {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-surface-muted p-3">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          iconClassName
        )}
      >
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[11px] font-medium text-foreground/50">{label}</p>
        <p className="text-xs font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
