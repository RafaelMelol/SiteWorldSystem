"use client";

import { motion } from "motion/react";
import { BarChart3, FileCheck2, PackageSearch, TrendingUp } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export function DashboardMockup() {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-md select-none"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-transparent to-accent-100 blur-2xl" />

      <div className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-accent-400" />
          </div>
          <span className="text-xs font-medium text-foreground/40">
            Painel de gestão
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-surface-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground/50">
                Faturamento
              </span>
              <TrendingUp className="size-3.5 text-accent-500" />
            </div>
            <div className="mt-2 flex h-12 items-end gap-1">
              {[40, 65, 45, 80, 60, 95].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-brand-500/70"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-surface-muted p-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                <FileCheck2 className="size-4" />
              </span>
              <div>
                <p className="text-[11px] font-medium text-foreground/50">
                  NFe emitida
                </p>
                <p className="text-xs font-semibold text-foreground">
                  Autorizada
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-surface-muted p-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-white">
                <PackageSearch className="size-4" />
              </span>
              <div>
                <p className="text-[11px] font-medium text-foreground/50">
                  Estoque
                </p>
                <p className="text-xs font-semibold text-foreground">
                  Sincronizado
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-surface-muted p-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <BarChart3 className="size-4" />
            </span>
            <p className="text-xs font-medium text-foreground/70">
              Análise ABC de produtos
            </p>
          </div>
          <span className="rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
            Tempo real
          </span>
        </div>
      </div>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-11 -left-8 hidden w-40 rounded-xl border border-border-subtle bg-surface p-3 shadow-card sm:block"
      >
        <p className="text-[11px] font-medium text-foreground/50">
          Filiais monitoradas
        </p>
        <p className="mt-1 text-lg font-bold text-brand-fg">Multiempresa</p>
      </motion.div>
    </div>
  );
}
