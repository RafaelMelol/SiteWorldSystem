"use client";

import type { ReactNode } from "react";
import { buttonVariants, type ButtonSize } from "@/components/ui/Button";

/**
 * Botão que abre uma conversa no WhatsApp com uma saudação pronta
 * ("bom dia" ou "boa tarde", conforme o horário de quem clica).
 *
 * A mensagem é montada no momento do clique — e não num link fixo — para usar
 * a hora real do visitante, e não a hora em que o site foi gerado.
 */
export function WhatsAppButton({
  phone,
  size = "lg",
  className,
  children,
}: {
  phone: string;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  function openChat() {
    const digits = phone.replace(/\D/g, ""); // o wa.me aceita só números
    const greeting = new Date().getHours() < 12 ? "Olá, bom dia!" : "Olá, boa tarde!";
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(greeting)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button type="button" onClick={openChat} className={buttonVariants({ size, className })}>
      {children}
    </button>
  );
}
