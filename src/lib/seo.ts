import { getBasePath } from "@/lib/paths";
import type { Metadata } from "next";
import { profile } from "@/content/portfolio";

export function getSiteConfig(
  env: Record<string, string | undefined> = process.env,
) {
  const url = new URL(env.SITE_URL || "http://localhost:3100");
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) origin without credentials, path, query or hash.",
    );
  }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  return {
    origin: url.origin,
    basePath: getBasePath(env.NEXT_PUBLIC_BASE_PATH || ""),
    siteUrl: url.origin + getBasePath(env.NEXT_PUBLIC_BASE_PATH || ""),
    configured: Boolean(env.SITE_URL),
    indexable:
      Boolean(env.SITE_URL) &&
      env.SITE_INDEXABLE === "true" &&
      url.protocol === "https:" &&
      !local,
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/opengraph-image",
): Metadata {
  const site = getSiteConfig();
  const canonical = `${site.siteUrl}${path}`;
  const socialImage = `${site.siteUrl}${image}${process.env.STATIC_EXPORT === "true" ? ".png" : ""}`;
  return {
    title,
    description,
    alternates: site.configured ? { canonical } : undefined,
    robots: { index: site.indexable, follow: site.indexable },
    openGraph: {
      title: `${title} | J2AN · 하승진`,
      description,
      url: canonical,
      siteName: "J2AN · 하승진",
      locale: "ko_KR",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | J2AN · 하승진`,
      description,
      images: [socialImage],
    },
  };
}

export function personSchema() {
  const { siteUrl: origin } = getSiteConfig();
  return {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: profile.name,
    alternateName: [profile.englishName, profile.handle],
    jobTitle: profile.role,
    description: profile.intro,
    url: origin,
    image: `${origin}/images/profile.webp`,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.blog, profile.notion],
  };
}
