import type { Integration } from "@/types/content";

export const integrations: Integration[] = [
  {
    name: "SEFAZ/MG",
    category: "Fiscal",
    description:
      "Sistemas totalmente integrados aos aplicativos da SEFAZ/MG para emissão e transmissão de documentos fiscais eletrônicos.",
  },
  {
    name: "PedidosOK",
    category: "Vendas",
    description:
      "Integração com o aplicativo PedidosOK para recebimento de pedidos diretamente no sistema de gestão.",
  },
  {
    name: "Mercado Livre",
    category: "Vendas",
    description:
      "Integração com o Mercado Livre para centralizar vendas do marketplace na mesma gestão de estoque e fiscal.",
  },
  {
    name: "Shopee",
    category: "Vendas",
    description:
      "Integração com o Shopee para centralizar vendas do marketplace na mesma gestão de estoque e fiscal.",
  },
  {
    name: "Balanças",
    category: "Equipamentos",
    description:
      "Integração com balanças utilizadas na operação comercial, para pesagem e precificação automática de produtos.",
  },
  {
    name: "Leitores de código de barras",
    category: "Equipamentos",
    description:
      "Integração com leitores para agilizar a conferência de estoque e o registro de vendas no PDV.",
  },
  {
    name: "Impressoras de etiquetas",
    category: "Equipamentos",
    description:
      "Integração com impressoras de etiquetas para identificação e precificação de produtos.",
  },
];
