import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const authed = await checkGrowthAuth();
  if (!authed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const blogDir = path.join(process.cwd(), "app", "blog");
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });

  const articles = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    if (entry.name === "layout.tsx" || entry.name === "page.tsx") continue;

    const pagePath = path.join(blogDir, entry.name, "page.tsx");
    try {
      const content = fs.readFileSync(pagePath, "utf8");
      const stat = fs.statSync(pagePath);

      // Extract title from metadata
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const title = titleMatch?.[1] || entry.name.replace(/-/g, " ");

      // Extract description
      const descMatch = content.match(/description:\s*\n?\s*["']([^"']+)["']/);
      const description = descMatch?.[1] || "";

      // Extract keywords
      const keywordsMatch = content.match(/keywords:\s*\[([\s\S]*?)\]/);
      let keywords: string[] = [];
      if (keywordsMatch) {
        keywords = keywordsMatch[1].match(/"([^"]+)"/g)?.map((k) => k.replace(/"/g, "")) || [];
      }

      // Extract published date
      const dateMatch =
        content.match(/publishedTime:\s*["']([^"']+)["']/) ||
        content.match(/datePublished:\s*["']([^"']+)["']/);
      const publishedDate = dateMatch?.[1] || stat.mtime.toISOString().slice(0, 10);

      articles.push({
        slug: entry.name,
        title,
        description: description.slice(0, 150),
        keywords: keywords.slice(0, 5),
        publishedDate,
        url: `/blog/${entry.name}`,
        modifiedAt: stat.mtime.toISOString(),
      });
    } catch {
      // Skip articles that can't be read
    }
  }

  // Sort by published date descending
  articles.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

  return NextResponse.json({ articles, total: articles.length });
}
