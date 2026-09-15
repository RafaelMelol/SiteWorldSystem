import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Botões do site.
 *
 * - buttonVariants(): gera as classes de um botão. Também serve para dar
 *   aparência de botão a links: <Link className={buttonVariants()}>.
 * - Button: o elemento <button> já com essas classes.
 */

type ButtonVariant = "primary" | "outline" | "inverse" | "inverseGhost";
export type ButtonSize = "sm" | "md" | "lg";

// Estilo comum a todos: formato de pílula, leve subida no hover, "aperto" no
// clique e anel de foco visível para quem navega pelo teclado.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:active:scale-100";

// Preenchimento branco que corre da esquerda para a direita no hover.
// É uma segunda camada de fundo (0% → 100% de largura), e não um ::before,
// porque o fundo sempre fica atrás do texto e nunca o cobre. A transição
// dessa largura vem da classe .btn-sweep, em globals.css.
const fillSweep =
  "btn-sweep bg-no-repeat bg-left bg-[length:0%_100%] bg-[image:linear-gradient(white,white)] hover:bg-[length:100%_100%] focus-visible:bg-[length:100%_100%]";

const variants: Record<ButtonVariant, string> = {
  // Ação principal: azul da marca com o preenchimento branco no hover.
  primary: `bg-brand-600 text-white shadow-soft hover:text-brand-600 focus-visible:text-brand-600 ${fillSweep}`,
  // Ação secundária: só contorno.
  outline:
    "border border-border-subtle bg-transparent text-foreground hover:bg-surface-muted",
  // Para fundos escuros fixos (ex: banner de contato), em qualquer tema.
  inverse: "bg-white text-brand-900 shadow-soft hover:bg-brand-50",
  inverseGhost: "bg-white/10 text-white hover:bg-white/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
