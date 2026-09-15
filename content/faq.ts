import type { FaqCategory } from "@/types/content";

export const faqCategories: FaqCategory[] = [
  {
    title: "SPED / EFD-Contribuições",
    description: "Escrituração fiscal digital e recibos de entrega.",
    items: [
      {
        question: "Perdi o recibo de entrega da EFD-Contribuições. Como recuperar?",
        answer:
          "O recibo é gerado pelo ReceitaNet com extensão .REC. É possível recuperá-lo usando o aplicativo ReceitanetBX, disponível no site da Receita Federal, ou reenviando a escrituração original para que o sistema gere um novo recibo.",
      },
    ],
  },
  {
    title: "NFC-e (Nota Fiscal de Consumidor Eletrônica)",
    description: "Cancelamentos, trocas e devoluções.",
    items: [
      {
        question: "Qual o prazo máximo para cancelamento de NFC-e em Minas Gerais?",
        answer:
          "O prazo máximo padrão para o cancelamento de uma NFC-e em Minas Gerais é de até 30 minutos após a concessão da autorização de uso.",
      },
      {
        question:
          "Qual o prazo máximo para cancelamento por substituição (contingência) de NFC-e em Minas Gerais?",
        answer:
          "O prazo máximo é de 168 horas (7 dias) contados da emissão da nota em contingência para cobrir a mesma operação.",
      },
      {
        question:
          "Qual o prazo máximo para cancelamento extemporâneo (fora do prazo) de NFC-e em Minas Gerais?",
        answer:
          "Segundo o fisco mineiro, não há previsão regulamentada de cancelamento extemporâneo para a NFC-e. O procedimento usual recomendado para anular a operação é a emissão de uma NFe de devolução.",
      },
    ],
  },
  {
    title: "Nota Fiscal Eletrônica (NF-e)",
    description: "DANFE, carta de correção e cancelamento.",
    items: [
      {
        question:
          "Por que o DANFE de empresas do Simples Nacional exibe o CST em vez do CSOSN?",
        answer:
          "O CSOSN altera apenas a parte referente à situação tributária do código, não a origem da mercadoria. Por isso, o CST — que reúne origem e tributação — continua aparecendo no DANFE.",
      },
      {
        question: "Quando pode ser usada a Carta de Correção?",
        answer:
          "A Carta de Correção pode ser usada quando o erro não envolve valores de impostos, não exige alteração do remetente ou destinatário e não altera a data de emissão ou de saída.",
      },
      {
        question: "Como cancelar uma NF-e fora do prazo legal de 24 horas?",
        answer:
          "É necessário solicitar autorização pelo sistema SIARE antes de transmitir o cancelamento. O sistema gera um protocolo válido por 30 dias para o processamento do cancelamento extemporâneo.",
      },
    ],
  },
  {
    title: "SINTEGRA",
    description: "Declaração de operações e créditos de ICMS.",
    items: [
      {
        question:
          "Como declarar no SINTEGRA notas fiscais com CFOP 5.929 referentes a cupons?",
        answer:
          "As notas devem ser emitidas zerando os campos de imposto e excluindo os registros tipo 54, conforme o RICMS.",
      },
      {
        question:
          "Empresas do Simples Nacional precisam informar base e valor de ICMS em notas de entrada?",
        answer:
          "Sim. As empresas devem informar os valores da operação quando a mercadoria não gerar crédito de imposto.",
      },
    ],
  },
  {
    title: "Geral",
    description: "Backup, manutenção e cadastro de produtos.",
    items: [
      {
        question: "Quais procedimentos tomar antes de formatar o servidor?",
        answer:
          "É necessário contatar o suporte da World System para a realização de backup do banco de dados do sistema, arquivos de configuração da empresa, pastas de XMLs dos documentos fiscais, etc.",
      },
      {
        question:
          "É necessário cadastrar individualmente cada item de aquisição na tabela de produtos?",
        answer:
          "Não. Conforme o Ato Cotepe nº 9, materiais de uso e consumo que não geram crédito de imposto podem ser consolidados, sem necessidade de cadastro individual.",
      },
    ],
  },
];
