import type { MetadataRoute } from "next";
import { navigation, projects } from "@/content/portfolio";
import { getSiteConfig } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = getSiteConfig();
  if (!indexable) return [];
  return [
    ...navigation.map((item) => item.href),
    ...projects.map((item) => `/work/${item.slug}`),
  ].map((path) => ({ url: `${origin}${path}` }));
}
