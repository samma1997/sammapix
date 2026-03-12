import { MetadataRoute } from "next";
import { BLOG_SLUGS } from "@/lib/constants";

const BASE_URL = "https://sammapix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/pricing",
    "/blog",
    "/privacy",
    "/tools",
    "/tools/compress",
    "/tools/webp",
    "/tools/ai-rename",
    "/tools/exif",
    "/tools/filmlab",
    "/tools/stampit",
    "/tools/croproatio",
    "/tools/twinhunt",
    "/tools/geosort",
    "/tools/travelmap",
    "/tools/resizepack",
    "/tools/cull",
    "/tools/heic",
    "/vs/tinypng",
    "/vs/squoosh",
    "/vs/imageoptim",
    "/vs/compressor-io",
    "/vs/iloveimg",
    "/vs/vsco",
    "/vs/filterpixel",
    "/vs/shortpixel",
    "/vs/canva",
    "/vs/photopea",
    "/vs/birme",
    "/vs/optimizilla",
  ];

  const blogRoutes = BLOG_SLUGS.map((slug) => `/blog/${slug}`);

  // Only include portfolio destinations with real Cloudinary photos
  const portfolioRoutes = [
    "/portfolio",
    "/portfolio/sri-lanka-2025",
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
