import { MetadataRoute } from "next";
import { BLOG_SLUGS } from "@/lib/constants";

const BASE_URL = "https://sammapix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/compress",
    "/convert/to-webp",
    "/ai-rename",
    "/pricing",
    "/blog",
  ];

  const blogRoutes = BLOG_SLUGS.map((slug) => `/blog/${slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
