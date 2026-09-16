"use client";

import type { ReactNode } from "react";
import { buttonVariants, type ButtonSize } from "@/components/ui/Button";

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
    const digits = phone.replace(/\D/g, "");
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
