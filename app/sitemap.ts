import { MetadataRoute } from "next";
import { BLOG_SLUGS } from "@/lib/constants";

const BASE_URL = "https://sammapix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pricing",
    "/blog",
    "/privacy",
    "/vs/tinypng",
    "/vs/squoosh",
    "/vs/imageoptim",
    "/vs/compressor-io",
    "/vs/iloveimg",
  ];

  const blogRoutes = BLOG_SLUGS.map((slug) => `/blog/${slug}`);

  const portfolioRoutes = [
    "/portfolio",
    "/portfolio/sri-lanka-2025",
    "/portfolio/bali-2024",
    "/portfolio/thailand-2024",
    "/portfolio/japan-2023",
    "/portfolio/china-2023",
  ];

  const portfolioEntries: MetadataRoute.Sitemap = portfolioRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...[...routes, ...blogRoutes].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "daily" : "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: route === "" ? 1 : 0.8,
    })),
    ...portfolioEntries,
  ];
}
