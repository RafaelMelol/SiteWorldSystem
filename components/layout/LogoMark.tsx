import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo oficial da World System: PNG único com fundo transparente. A arte
 * tem o texto em azul-escuro, que perde contraste no tema escuro — daí a
 * classe .logo-mark, tratada em globals.css.
 */
export function LogoMark({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="World System"
        width={1569}
        height={281}
        priority
        className={cn("logo-mark h-10 w-auto sm:h-11", imgClassName)}
      />
    </span>
  );
}
