import Image from "next/image";

export function LogoMark() {
  return (
    <span className="inline-flex items-center">
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
