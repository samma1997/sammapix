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

  const destinationRoutes = [
    "/destinations",
    "/destinations/sri-lanka-2025",
    "/destinations/bali-2024",
    "/destinations/thailand-2024",
    "/destinations/japan-2023",
    "/destinations/china-2023",
  ];

  const destinationEntries: MetadataRoute.Sitemap = destinationRoutes.map((route) => ({
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
    ...destinationEntries,
  ];
}
