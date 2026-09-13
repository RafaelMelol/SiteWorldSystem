import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormState = "idle" | "loading" | "success" | "error";

export function FormStatus({
  state,
  successMessage,
  errorMessage,
}: {
  state: FormState;
  successMessage: string;
  errorMessage: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "loading" && (
        <motion.div
          key="loading"
          role="status"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 rounded-lg bg-surface-muted px-4 py-3 text-sm text-foreground/70"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Enviando...
        </motion.div>
      )}

      {state === "success" && (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700"
          )}
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden />
          {successMessage}
        </motion.div>
      )}

      {state === "error" && (
        <motion.div
          key="error"
          role="alert"
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {errorMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
