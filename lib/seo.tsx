import { siteConfig } from "@/lib/config";
import { companyOverview } from "@/content/company";
import { contactInfo } from "@/content/contact";
import type { Solution } from "@/content/types";

/**
 * Dados estruturados (JSON-LD) para buscadores.
 *
 * Esses blocos não aparecem na tela: o Google os lê para entender quem é a
 * empresa (endereço, telefone, redes sociais) e quais serviços ela oferece.
 */

/** Insere um bloco JSON-LD na página. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Dados da empresa como negócio local. Usado na página inicial. */
export function getOrganizationJsonLd() {
  const { address, phoneDisplay, email, social } = contactInfo;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    foundingDate: String(companyOverview.foundingYear),
    telephone: phoneDisplay,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "BR",
    },
    // Links das redes sociais (as que estiverem preenchidas).
    sameAs: Object.values(social).filter(Boolean),
  };
}

/** Dados de uma solução como serviço. Usado em cada página /solucoes/[slug]. */
export function getSolutionJsonLd(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.description,
    serviceType: solution.category,
    areaServed: "BR",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}
