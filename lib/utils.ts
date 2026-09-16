type ClassValue = string | number | null | undefined | false | ClassValue[];

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
