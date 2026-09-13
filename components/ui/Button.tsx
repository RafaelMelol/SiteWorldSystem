import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "inverse"
  | "inverseGhost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:active:scale-100";

// CTAs sólidos (primary/secondary) se preenchem de branco da esquerda
// para a direita no hover, com o texto virando a cor base do botão.
//
// O preenchimento é uma segunda camada de background-image (0% de largura
// em repouso, 100% no hover), e não um ::before: o background do elemento
// sempre pinta atrás do conteúdo, então nunca cobre o texto — o que
// acontecia com o pseudo-elemento posicionado. A transição vem da regra
// .btn-sweep em globals.css, porque background-size não entra na
// transição global de tema.
const fillSweep =
  "btn-sweep bg-no-repeat bg-left bg-[length:0%_100%] bg-[image:linear-gradient(white,white)] hover:bg-[length:100%_100%] focus-visible:bg-[length:100%_100%]";

const variants: Record<ButtonVariant, string> = {
  primary: `bg-brand-600 text-white hover:text-brand-600 focus-visible:text-brand-600 shadow-soft ${fillSweep}`,
  secondary: `bg-accent-500 text-white hover:text-accent-500 focus-visible:text-accent-500 shadow-soft ${fillSweep}`,
  outline:
    "border border-border-subtle bg-transparent text-foreground hover:bg-surface-muted",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
  // Para usar sobre fundo escuro fixo (ex: banner de CTA), independente
  // do tema do site.
  inverse: "bg-white text-brand-900 hover:bg-brand-50 shadow-soft",
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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
