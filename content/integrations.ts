import type { Integration } from "@/content/types";

/**
 * Integrações com órgãos fiscais, canais de venda e equipamentos.
 *
 * A página inicial mostra as 6 primeiras; a página /integracoes mostra todas.
 */
export const integrations: Integration[] = [
  {
    name: "SEF/MG",
    category: "Fiscal",
    description:
      "Sistemas totalmente integrados aos aplicativos da SEF/MG para emissão e transmissão de documentos fiscais eletrônicos.",
  },
  {
    name: "PedidoOk",
    category: "Vendas",
    description:
      "Integração com o aplicativo PedidoOk para recebimento de pedidos diretamente no sistema de gestão.",
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
