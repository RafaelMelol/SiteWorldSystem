"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Botão que copia um texto para a área de transferência e mostra "Copiado"
 * por 2 segundos como confirmação.
 */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  // Volta ao texto original depois de 2 segundos.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Alguns navegadores bloqueiam a API moderna (ex: página sem HTTPS).
      // Nesse caso copia pelo método antigo, com um campo de texto temporário.
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={copy}
      aria-label={`Copiar ${label}`}
      className="shrink-0"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {/* aria-live avisa leitores de tela quando o texto muda para "Copiado" */}
      <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
    </Button>
  );
}
