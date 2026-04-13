import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { POSTS } from "@/lib/blog-posts";

export const runtime = "nodejs";
export const maxDuration = 120;

// Pages that MUST be indexed
const CRITICAL_PAGES = [
  "/", "/tools/compress", "/tools/webp", "/tools/heic", "/tools/ai-rename",
  "/tools/exif", "/tools/resizepack", "/tools/remove-bg", "/tools/passport-photo",
  "/tools/croproatio", "/tools/stampit", "/tools/filmlab", "/tools/batchname",
  "/tools/twinhunt", "/tools/geosort", "/tools/travelmap", "/tools/cull",
  "/pricing", "/about", "/blog",
];

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!saKey) {
    return NextResponse.json({ error: "No service account key" }, { status: 500 });
  }

  try {
    const sa = JSON.parse(saKey);
    const auth = new GoogleAuth({
      credentials: sa,
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    };

    // 1. Submit sitemap (ping Google every day)
    await fetch(
      "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Asammapix.com/sitemaps/https%3A%2F%2Fwww.sammapix.com%2Fsitemap.xml",
      { method: "PUT", headers }
    );

    // 2. Check critical pages + recent blog posts
    const recentBlogs = POSTS.slice(0, 10).map((p) => `/blog/${p.slug}`);
    const allPages = [...CRITICAL_PAGES, ...recentBlogs];
    // Deduplicate
    const uniquePages = [...new Set(allPages)];

    const indexed: string[] = [];
    const notIndexed: string[] = [];
    const errors: string[] = [];

    for (const page of uniquePages) {
      try {
        const url = `https://www.sammapix.com${page}`;
        const r = await fetch(
          "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              inspectionUrl: url,
              siteUrl: "sc-domain:sammapix.com",
            }),
          }
        );

        if (!r.ok) {
          errors.push(page);
          continue;
        }

        const data = await r.json();
        const verdict =
          data.inspectionResult?.indexStatusResult?.verdict || "NEUTRAL";

        if (verdict === "PASS") {
          indexed.push(page);
        } else {
          notIndexed.push(page);
        }

        // Rate limit: 1.2s between requests
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } catch {
        errors.push(page);
      }
    }

    // 3. If there are not-indexed pages, create a TODO
    if (notIndexed.length > 0) {
      try {
        const { db } = await import("@/lib/db");
        const { growthDailyTodos } = await import("@/lib/db/schema");
        const today = new Date().toISOString().slice(0, 10);

        const urlList = notIndexed
          .map((p) => `https://www.sammapix.com${p}`)
          .join("\n");

        await db.insert(growthDailyTodos).values({
          date: today,
          type: "gsc",
          title: `🚨 ${notIndexed.length} pagine NON indicizzate su Google`,
          description:
            "Queste pagine non sono visibili su Google. Apri Search Console → URL Inspection → incolla ogni URL → Request Indexing.",
          actionUrl: "https://search.google.com/search-console",
          draftText: urlList,
          priority: 10,
          status: "pending",
        });
      } catch {}
    }

    return NextResponse.json({
      sitemapSubmitted: true,
      checked: uniquePages.length,
      indexed: indexed.length,
      notIndexed: notIndexed.length,
      notIndexedPages: notIndexed,
      errors: errors.length,
    });
  } catch (err) {
    console.error("[gsc-index-check]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
