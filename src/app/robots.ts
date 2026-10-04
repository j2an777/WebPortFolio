import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  const { origin, indexable } = getSiteConfig();
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(indexable ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
