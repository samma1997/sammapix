import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Googlebot — no crawl-delay (Google ignores it and it can hurt ranking)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/", "/karma.html"],
      },
      // Bingbot — moderate crawl delay
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/", "/karma.html"],
        crawlDelay: 5,
      },
      // AI search engine crawlers — welcome them
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
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Allow SEO crawlers — they index us in their databases so people
      // researching "best image tools" on Ahrefs/Semrush can find SammaPix
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/"],
      },
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "BLEXBot",
        disallow: "/",
      },
      {
        userAgent: "MegaIndex",
        disallow: "/",
      },
      {
        userAgent: "HTTrack",
        disallow: "/",
      },
      // Default rule — all other crawlers get a crawl delay
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/", "/karma.html"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
