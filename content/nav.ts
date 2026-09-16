import type { NavLink, NavSection } from "@/content/types";

export const mainNav: NavSection[] = [
  { label: "Empresa", href: "/empresa" },
  {
    label: "Soluções",
    href: "/solucoes",
    children: [
      { label: "SCA 5.0 Pro – Varejo", href: "/solucoes/varejo" },
      { label: "SCA 5.0 Pro – Atacado", href: "/solucoes/atacado" },
      { label: "Emissor NFe e NFCe", href: "/solucoes/nfe-nfce" },
      { label: "Emissor CTe, CTe OS e MDFe", href: "/solucoes/cte-mdfe" },
    ],
  },
  { label: "Recursos", href: "/recursos" },
  { label: "Integrações", href: "/integracoes" },
  {
    label: "Suporte",
    href: "/suporte",
    children: [
      { label: "Horário de atendimento", href: "/suporte#horario" },
      { label: "FAQ", href: "/suporte/faq" },
    ],
  },
  { label: "Oportunidades", href: "/oportunidades" },
];

export const footerNav: Record<"institucional" | "solucoes", NavLink[]> = {
  institucional: [
    { label: "Home", href: "/" },
    { label: "Empresa", href: "/empresa" },
    { label: "Oportunidades", href: "/oportunidades" },
    { label: "Contato", href: "/contato" },
  ],
  solucoes: [
    { label: "SCA 5.0 Pro – Varejo", href: "/solucoes/varejo" },
    { label: "SCA 5.0 Pro – Atacado", href: "/solucoes/atacado" },
    { label: "Emissor NFe e NFCe", href: "/solucoes/nfe-nfce" },
    { label: "Emissor CTe, CTe OS e MDFe", href: "/solucoes/cte-mdfe" },
  ],
};
