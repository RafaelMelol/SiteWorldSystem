import { siteConfig } from "@/lib/config";
import { contactInfo } from "@/content/contact";
import type { Solution } from "@/types/content";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    foundingDate: String(siteConfig.foundingYear),
    telephone: contactInfo.phoneDisplay,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "BR",
    },
    sameAs: Object.values(contactInfo.social).filter(Boolean),
  };
}

export function getSolutionJsonLd(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: "BR",
    serviceType: solution.category,
  };
}
