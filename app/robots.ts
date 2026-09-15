import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * Gera o /robots.txt: libera o site todo para os buscadores, exceto as rotas
 * de API, e informa onde está o sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
