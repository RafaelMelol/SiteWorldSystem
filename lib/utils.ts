type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Junta classes CSS, ignorando valores vazios. Facilita aplicar classes
 * condicionais do Tailwind.
 *
 * Exemplo: cn("px-4", ativo && "bg-brand-600") → "px-4 bg-brand-600"
 *
 * Atenção: não resolve conflitos. Evite passar duas classes da mesma
 * propriedade (ex: "p-5" e "p-7") esperando que a segunda vença.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const add = (value: ClassValue) => {
    if (!value) return;
    if (Array.isArray(value)) value.forEach(add);
    else classes.push(String(value));
  };

  inputs.forEach(add);
  return classes.join(" ");
}
