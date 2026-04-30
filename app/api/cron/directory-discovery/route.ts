import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDirectorySubmissions } from "@/lib/db/schema";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * Cron settimanale (lunedì 03:00 UTC).
 * Riscarica le awesome-list GitHub di submission directory + cerca nuove
 * via GitHub Search API. Estrae URL, normalizza hostname, dedupa contro DB,
 * inserisce le nuove con status='to_submit'.
 */

const SOURCES: { url: string; tag: string }[] = [
  {
    url: "https://raw.githubusercontent.com/mahseema/awesome-saas-directories/main/README.md",
    tag: "saas",
  },
  {
    url: "https://raw.githubusercontent.com/volodstaimi/Startup-Launch-List/main/README.md",
    tag: "startup_launch",
  },
  {
    url: "https://raw.githubusercontent.com/best-of-ai/ai-directories/main/README.md",
    tag: "ai_tools",
  },
  {
    url: "https://raw.githubusercontent.com/nilandev/startup-directories/main/README.md",
    tag: "startup",
  },
];

const SKIP_HOSTS = new Set([
  "github.com",
  "github.io",
  "githubusercontent.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "facebook.com",
  "instagram.com",
  "youtube.com",
  "youtu.be",
  "wikipedia.org",
  "medium.com",
  "hackernoon.com",
  "discord.gg",
  "discord.com",
  "t.me",
  "archive.org",
  "web.archive.org",
  "wikidata.org",
  "amzn.to",
  "paypal.com",
  "patreon.com",
  "buymeacoffee.com",
  "ko-fi.com",
  "gist.github.com",
  "shields.io",
  "badgen.net",
  "forms.gle",
  "docs.google.com",
  "forms.google.com",
]);

const LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

interface Candidate {
  name: string;
  url: string;
  hostname: string;
  tag: string;
}

function extractCandidates(content: string, tag: string): Candidate[] {
  const out: Candidate[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = LINK_REGEX.exec(content)) !== null) {
    const rawName = m[1]
      .trim()
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
      .trim();
    const url = m[2].replace(/[).,;]+$/, "");
    if (!rawName || rawName.length < 2 || rawName.length > 80) continue;
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      continue;
    }
    const hostname = parsed.hostname.replace(/^www\./, "");
    if (!hostname.includes(".")) continue;
    if (SKIP_HOSTS.has(hostname)) continue;
    if (/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js)$/i.test(parsed.pathname))
      continue;
    if (seen.has(hostname)) continue;
    seen.add(hostname);
    out.push({
      name: rawName.substring(0, 100),
      url: `${parsed.protocol}//${parsed.hostname}`,
      hostname,
      tag,
    });
  }
  return out;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const allCandidates = new Map<string, Candidate>();

  // 1. Fetch awesome-list READMEs
  for (const src of SOURCES) {
    try {
      const res = await fetch(src.url, {
        headers: { "User-Agent": "sammapix-directory-discovery" },
      });
      if (!res.ok) {
        console.warn(`[directory-discovery] ${src.url} → HTTP ${res.status}`);
        continue;
      }
      const md = await res.text();
      const candidates = extractCandidates(md, src.tag);
      for (const c of candidates) {
        if (!allCandidates.has(c.hostname)) {
          allCandidates.set(c.hostname, c);
        }
      }
    } catch (err) {
      console.error(`[directory-discovery] fetch failed ${src.url}:`, err);
    }
  }

  // 2. GitHub Search API for newer awesome-lists (extra coverage)
  const ghToken = process.env.GITHUB_TOKEN;
  const queries = [
    "awesome saas directories",
    "awesome startup launch directories",
    "awesome ai tool directories submit",
  ];
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}+in:name,description&sort=updated&per_page=5`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "sammapix-directory-discovery",
            ...(ghToken ? { Authorization: `Bearer ${ghToken}` } : {}),
          },
        }
      );
      if (!res.ok) continue;
      const data = (await res.json()) as {
        items?: { full_name: string; default_branch?: string }[];
      };
      for (const repo of data.items ?? []) {
        for (const branch of [repo.default_branch ?? "main", "master"]) {
          try {
            const rmRes = await fetch(
              `https://raw.githubusercontent.com/${repo.full_name}/${branch}/README.md`,
              { headers: { "User-Agent": "sammapix-directory-discovery" } }
            );
            if (!rmRes.ok) continue;
            const md = await rmRes.text();
            const candidates = extractCandidates(md, "directory");
            for (const c of candidates) {
              if (!allCandidates.has(c.hostname)) {
                allCandidates.set(c.hostname, c);
              }
            }
            break;
          } catch {
            /* try next branch */
          }
        }
      }
    } catch (err) {
      console.error("[directory-discovery] github search failed:", err);
    }
  }

  // 3. Dedupe against DB
  const existing = await db
    .select({ url: growthDirectorySubmissions.directoryUrl })
    .from(growthDirectorySubmissions);
  const existingHosts = new Set<string>();
  for (const row of existing) {
    try {
      existingHosts.add(new URL(row.url).hostname.replace(/^www\./, ""));
    } catch {
      /* skip */
    }
  }

  const newDirs = [...allCandidates.values()].filter(
    (c) => !existingHosts.has(c.hostname)
  );

  // 4. Insert new ones
  let inserted = 0;
  for (const d of newDirs) {
    try {
      await db.insert(growthDirectorySubmissions).values({
        directoryName: d.name,
        directoryUrl: d.url,
        status: "to_submit",
        notes: `[${d.tag}] Auto-discovered ${new Date().toISOString().slice(0, 10)} via cron directory-discovery. Crea profilo SammaPix con link sammapix.com.`,
      });
      inserted++;
    } catch (err) {
      console.error(`[directory-discovery] insert failed ${d.hostname}:`, err);
    }
  }

  return NextResponse.json({
    ok: true,
    duration_ms: Date.now() - startedAt,
    candidates_total: allCandidates.size,
    existing_in_db: existingHosts.size,
    new_inserted: inserted,
    sources_processed: SOURCES.length,
    sample_new: newDirs.slice(0, 10).map((d) => d.hostname),
  });
}
