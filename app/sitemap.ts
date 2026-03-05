import { MetadataRoute } from "next";
import { APP_URL, BLOG_SLUGS } from "@/lib/constants";

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
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
