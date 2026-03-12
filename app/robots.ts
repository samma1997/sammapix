import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/", "/karma.html"],
      },
      // Explicitly allow AI search engine crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "Omgilibot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
