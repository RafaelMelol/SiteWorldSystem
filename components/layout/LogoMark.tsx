import Image from "next/image";

/**
 * Logo da World System (arquivo public/logo.png).
 *
 * É a mesma imagem nos dois temas. No tema escuro, a classe .logo-mark aplica
 * um halo claro (definido em globals.css) para o subtítulo "Soluções em TI",
 * que é azul-escuro, continuar legível.
 */
export function LogoMark() {
  return (
    <span className="inline-flex items-center">
      {/* width/height são as medidas reais do arquivo; o tamanho exibido vem das classes. */}
      <Image
        src="/logo.png"
        alt="World System"
        width={1569}
        height={281}
        priority
        className="logo-mark h-10 w-auto sm:h-11"
      />
    </span>
  );
}
