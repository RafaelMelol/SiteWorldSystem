import type { ContactInfo, SupportHours } from "@/content/types";

/**
 * Dados de contato e horário de atendimento.
 *
 * Alterar aqui atualiza, de uma vez, o rodapé, as páginas de Contato e
 * Suporte, o mapa e os dados estruturados lidos pelo Google.
 */

export const contactInfo: ContactInfo = {
  address: {
    street: "Rua Santa Catarina, 273",
    neighborhood: "Centro",
    zip: "35591-022",
    city: "Lagoa da Prata",
    state: "MG",
  },
  // Formato internacional (+55 DDD número), usado nos links de ligação e no WhatsApp.
  phone: "+553732613366",
  phoneDisplay: "(37) 3261-3366",
  // Plantão de sábado: somente telefone ou acesso remoto.
  onCallPhone: "+5537988266252",
  onCallPhoneDisplay: "(37) 98826-6252",
  email: "contato@wsionline.com.br",
  social: {
    facebook: "https://facebook.com/worldsystem.ti",
    instagram: "https://instagram.com/worldsystem.ti",
    linkedin: "https://linkedin.com/company/world-system-solucoes-em-ti/",
  },
};

export const supportHours: SupportHours = {
  weekdayLabel: "Segunda a sexta-feira",
  weekdayHours: "07:45 às 18:00",
  weekdayNote: "Atendimento também disponível por WhatsApp.",
  saturdayLabel: "Plantão aos sábados",
  saturdayHours: "07:45 às 12:00",
  saturdayNote: "Somente por telefone ou acesso remoto.",
};
