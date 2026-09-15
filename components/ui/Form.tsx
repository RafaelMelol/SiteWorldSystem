"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Peças dos formulários de Contato e Oportunidades.
 *
 * - Field: rótulo, campo e dica ou erro logo abaixo
 * - Input e Textarea: campos de texto no estilo do site
 * - Honeypot: campo invisível contra spam
 * - FormStatus: aviso de "enviando", sucesso ou erro
 */

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand-fg"> *</span>}
      </label>
      {children}
      {/* A dica some quando há erro, para não empilhar duas mensagens. */}
      {hint && !error && <p className="text-xs text-foreground/60">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// Estilo comum aos campos. Com aria-invalid="true", a borda fica vermelha.
const fieldStyles =
  "w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 aria-[invalid=true]:border-red-500";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldStyles, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldStyles, "min-h-32 resize-y", className)} {...props} />;
}

/**
 * Armadilha para robôs: um campo "website" escondido. Pessoas não o veem nem
 * chegam nele pelo teclado; robôs costumam preencher todos os campos. Se ele
 * chegar preenchido, a rota de API descarta o envio.
 */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={id}>Não preencha este campo</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Momento do envio de um formulário. */
export type FormState = "idle" | "loading" | "success" | "error";

// Aparência de cada aviso ("idle" não mostra nada).
const statusStyles = {
  loading: {
    role: "status",
    Icon: Loader2,
    className: "bg-surface-muted text-foreground/70",
    iconClassName: "animate-spin",
  },
  success: {
    role: "status",
    Icon: CheckCircle2,
    className: "bg-accent-50 font-medium text-accent-700",
    iconClassName: "",
  },
  error: {
    role: "alert",
    Icon: AlertCircle,
    className: "bg-red-50 font-medium text-red-700",
    iconClassName: "",
  },
} as const;

/** Aviso animado ao lado do botão de enviar. */
export function FormStatus({
  state,
  successMessage,
  errorMessage,
}: {
  state: FormState;
  successMessage: string;
  errorMessage: string;
}) {
  const status = state === "idle" ? null : statusStyles[state];
  const message =
    state === "loading" ? "Enviando..." : state === "success" ? successMessage : errorMessage;

  return (
    // mode="wait": o aviso anterior termina de sair antes de o próximo entrar.
    <AnimatePresence mode="wait" initial={false}>
      {status && (
        <motion.div
          key={state}
          role={status.role}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className={cn("flex items-center gap-2 rounded-lg px-4 py-3 text-sm", status.className)}
        >
          <status.Icon className={cn("size-4 shrink-0", status.iconClassName)} aria-hidden />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
