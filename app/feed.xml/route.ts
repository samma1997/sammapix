import { POSTS } from "@/lib/blog-posts";
import { APP_URL } from "@/lib/constants";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Sort by date descending, latest first
  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((post) => {
      const url = `${APP_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.tags.join(", "))}</category>
      <author>noreply@sammapix.com (Luca Sammarco)</author>
    </item>`;
    })
    .join("\n");

  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>SammaPix Blog</title>
    <link>${APP_URL}/blog</link>
    <atom:link href="${APP_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Free browser-based image tools + guides on format conversion, compression, privacy, and photography workflow.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Next.js — SammaPix</generator>
    <image>
      <url>${APP_URL}/og-image.png</url>
      <title>SammaPix Blog</title>
      <link>${APP_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
