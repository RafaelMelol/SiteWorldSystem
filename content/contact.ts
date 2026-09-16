import type { ContactInfo, SupportHours } from "@/content/types";

export const contactInfo: ContactInfo = {
  address: {
    street: "Rua Santa Catarina, 273",
    neighborhood: "Centro",
    zip: "35591-022",
    city: "Lagoa da Prata",
    state: "MG",
  },
  phone: "+553732613366",
  phoneDisplay: "(37) 3261-3366",
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
