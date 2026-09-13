import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/empresa",
    "/solucoes",
    "/recursos",
    "/integracoes",
    "/suporte",
    "/suporte/faq",
    "/oportunidades",
    "/contato",
  ];

  const solutionRoutes = solutions.map((solution) => `/solucoes/${solution.slug}`);

  const routes = [...staticRoutes, ...solutionRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
