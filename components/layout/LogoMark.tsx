import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo oficial da World System: PNG único com fundo transparente, usado
 * igual nos dois temas.
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
        className={cn("h-8 w-auto sm:h-9", imgClassName)}
      />
    </span>
  );
}
