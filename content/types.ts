/**
 * Tipos do conteúdo do site.
 *
 * Todo texto e dado das páginas fica na pasta /content seguindo estes
 * formatos. Para mudar um texto, basta editar os arquivos de conteúdo — não é
 * preciso mexer nos componentes.
 */

/** Link simples (submenus e rodapé). */
export interface NavLink {
  label: string;
  href: string;
}

/** Item do menu do topo: link direto (href) ou submenu (children). */
export interface NavSection {
  label: string;
  href?: string;
  children?: NavLink[];
}

/** Dados de contato exibidos no rodapé e nas páginas de Contato e Suporte. */
export interface ContactInfo {
  address: {
    street: string;
    neighborhood: string;
    zip: string;
    city: string;
    state: string;
  };
  /** Telefone no formato internacional (+55...), usado nos links e no WhatsApp. */
  phone: string;
  /** Telefone formatado para exibição. */
  phoneDisplay: string;
  /** Telefone do plantão de sábado. */
  onCallPhone: string;
  onCallPhoneDisplay: string;
  email: string;
  /** Redes sociais. Rede sem link não aparece no site. */
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

/** Horários de atendimento do suporte. */
export interface SupportHours {
  weekdayLabel: string;
  weekdayHours: string;
  weekdayNote: string;
  saturdayLabel: string;
  saturdayHours: string;
  saturdayNote: string;
}

/** Categoria de recursos (uma aba na seção "Recursos"). */
export interface FeatureGroup {
  title: string;
  description: string;
  items: string[];
}

/** Solução (produto). Cada uma ganha a página /solucoes/{slug}. */
export interface Solution {
  /** Final da URL, sem acentos nem espaços. */
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  /** Segmentos atendidos (opcional). */
  segments?: string[];
  /** Recursos agrupados, listados na página da solução. */
  featureGroups: { title: string; items: string[] }[];
}

/** Integração com órgão fiscal, canal de venda ou equipamento. */
export interface Integration {
  name: string;
  category: string;
  description: string;
}

/** Categoria de perguntas frequentes. */
export interface FaqCategory {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
}
