/**
 * Configurações gerais do site.
 *
 * A URL pública vem da variável de ambiente NEXT_PUBLIC_SITE_URL (cadastrada
 * na Vercel). Sem ela, usa o domínio oficial. É usada nos metadados, no
 * sitemap, no robots.txt e nas prévias de link em redes sociais.
 */
export const siteConfig = {
  name: "World System - Soluções em TI",
  shortName: "World System",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wsionline.com.br",
  description:
    "Soluções em TI para gestão e automação de pequenas indústrias, atacados e varejos. Desde 1993 desenvolvendo sistemas de retaguarda, PDV e emissão fiscal para empresas de Minas Gerais e do Brasil.",
} as const;
