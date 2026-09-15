import type { Solution } from "@/types/content";

export const solutions: Solution[] = [
  {
    slug: "varejo",
    category: "Varejo",
    name: "SCA 5.0 Pro – Varejo",
    tagline: "Sistema de retaguarda completo para lojas varejistas",
    description:
      "Solução de gestão para lojas varejistas de diversos segmentos, unindo controle de estoque, financeiro e emissão fiscal em um único sistema de retaguarda.",
    segments: [
      "Autopeças",
      "Boutiques",
      "Móveis",
      "Materiais de construção",
      "Calçados",
      "Cosméticos",
      "Presentes",
      "Outros segmentos varejistas",
    ],
    featureGroups: [
      {
        title: "Estoque e produtos",
        items: [
          "Controle de estoque",
          "Cadastro de produtos com foto",
          "Controle de insumos e produção",
          "Montagem e fragmentação de produtos",
          "Inventário de estoque",
          "Cálculo automático do preço de venda",
        ],
      },
      {
        title: "Financeiro",
        items: [
          "Contas a pagar e a receber",
          "Controle de caixa diário, mensal e anual",
          "Limite de crédito por cliente",
          "Boletos de cobrança",
          "Conciliação bancária",
        ],
      },
      {
        title: "Fiscal",
        items: [
          "Emissão de nota fiscal eletrônica",
          "Importação de XML com cadastro automático",
          "Envio de DANFE por e-mail ao destinatário",
          "Geração de arquivos Sintegra, SPED Fiscal e Contribuições",
        ],
      },
      {
        title: "Gestão e clientes",
        items: [
          "Gestão de funcionários",
          "Controle de acesso por usuário com senha",
          "Histórico de vendas por cliente",
          "Mala direta",
        ],
      },
    ],
  },
  {
    slug: "atacado",
    category: "Atacado",
    name: "SCA 5.0 Pro – Atacado",
    tagline: "Solução comercial para pequenos e médios atacadistas",
    description:
      "Sistema de retaguarda voltado a pequenos atacadistas, com controle de produção, custos, conformidade fiscal e gestão financeira de ponta a ponta.",
    segments: [
      "Peças de bicicleta e moto",
      "Revenda de enxovais",
      "Matéria-prima em geral",
    ],
    featureGroups: [
      {
        title: "Estoque e produção",
        items: [
          "Controle de estoque",
          "Controle de insumos e produção",
          "Inventário de estoque",
          "Formação de custo e montagem de produtos",
          "Cálculo automático do preço de venda",
        ],
      },
      {
        title: "Financeiro",
        items: [
          "Contas a pagar e a receber",
          "Controle de limite de crédito e cobrança",
          "Controle de caixa e banco diário, mensal e anual",
        ],
      },
      {
        title: "Fiscal e expedição",
        items: [
          "Geração de arquivos Sintegra, SPED Fiscal e Contribuições",
          "Etiquetagem e documentos de expedição",
        ],
      },
      {
        title: "Gestão",
        items: [
          "Gestão de funcionários e transportadoras",
          "Controle de acesso por usuário com senha",
          "Mala direta a clientes e fornecedores",
        ],
      },
    ],
  },
  {
    slug: "nfe-nfce",
    category: "Fiscal",
    name: "NFe e NFCe",
    tagline: "Emissão fiscal rápida e sem erros tributários",
    description:
      "Solução fiscal para diversos segmentos varejistas, com PDV integrado para emitir Nota Fiscal Eletrônica e Nota Fiscal de Consumidor Eletrônica com agilidade e conformidade com a legislação vigente.",
    featureGroups: [
      {
        title: "Ponto de venda",
        items: [
          "TEF (Transferência Eletrônica de Fundos)",
          "Consulta de preço",
          "Venda rápida",
          "Controle de vendas em cartão débito e crédito",
          "Integração com Ordem de Serviço",
        ],
      },
      {
        title: "Hardware e documentos",
        items: [
          "Integração com impressora e balança",
          "Leitura por código de barras ou teclado",
          "Leitura e impressão de documentos fiscais",
        ],
      },
      {
        title: "Operação e fiscal",
        items: [
          "Fechamento de caixa",
          "Emissão de DAV (orçamento e pré-venda)",
          "Conformidade com a legislação vigente",
        ],
      },
    ],
  },
  {
    slug: "cte-mdfe",
    category: "Transporte",
    name: "CTe, CTe OS e MDFe",
    tagline: "Documentos fiscais para o transporte de mercadorias",
    description:
      "Emissão de documentos fiscais para acobertar o transporte de mercadorias e pessoas, com geração rápida e conformidade tributária.",
    featureGroups: [
      {
        title: "Cadastros",
        items: [
          "Cadastro de veículos próprios e de terceiros",
          "Cadastro de motoristas e RNTC",
        ],
      },
      {
        title: "Emissão e operação",
        items: [
          "Emissão rápida de CTe, CTe OS e MDFe",
          "Importação de XMLs",
          "Integração com impressoras",
          "Leitura e impressão de documentos fiscais",
          "Controle de fechamento de caixa",
        ],
      },
      {
        title: "Conformidade",
        items: ["Conformidade com a legislação vigente"],
      },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
