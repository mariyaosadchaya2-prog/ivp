import type { MetadataRoute } from "next";
import { programs } from "@/lib/programs";
import { siteConfig } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/programs",
    "/free",
    "/test",
    "/methodology",
    "/about",
    "/team",
    "/team/mariya-osadchaya",
    "/for-schools",
    "/legal/offer",
    "/legal/privacy",
    "/legal/terms",
    "/legal/license",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const programPaths = programs.map((p) => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.6,
  }));

  return [...staticPaths, ...programPaths];
}
