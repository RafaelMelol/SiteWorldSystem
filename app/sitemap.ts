import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { solutions } from "@/content/solutions";

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
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
