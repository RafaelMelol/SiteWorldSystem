import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { solutions } from "@/content/solutions";

/**
 * Gera o /sitemap.xml: a lista de páginas que os buscadores devem indexar.
 * As páginas de solução entram sozinhas, a partir de content/solutions.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/empresa",
    "/solucoes",
    "/recursos",
    "/integracoes",
    "/suporte",
    "/suporte/faq",
    "/oportunidades",
    "/contato",
    ...solutions.map((solution) => `/solucoes/${solution.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    // A página inicial ("") muda com mais frequência e tem prioridade máxima.
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
