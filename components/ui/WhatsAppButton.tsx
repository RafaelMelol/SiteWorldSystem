"use client";

import { buttonVariants, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Abre o WhatsApp com a saudação já preenchida ("bom dia"/"boa tarde"
 * conforme o horário local). A mensagem é montada no clique, e não num
 * href estático, para usar a hora real e não a do build.
 */
export function WhatsAppButton({
  phone,
  variant = "primary",
  size = "lg",
  className,
  children,
}: {
  phone: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick() {
    const digits = phone.replace(/\D/g, "");
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Olá, bom dia!" : "Olá, boa tarde!";
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(greeting)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={buttonVariants({ variant, size, className: cn(className) })}
    >
      {children}
    </button>
  );
}
