#!/usr/bin/env node
/**
 * Cross-post latest SammaPix blog article to Dev.to with canonical URL
 *
 * Usage: node scripts/crosspost-devto.mjs [--slug article-slug]
 *
 * If no slug provided, uses the latest article from blog-posts.ts
 * Requires DEVTO_API_KEY in .env.local
 *
 * The canonical_url ensures Google credits sammapix.com as the original source.
 * Dev.to shows "Originally published at sammapix.com" at the top.
 */

import fs from "fs";
import path from "path";

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
if (!DEVTO_API_KEY) {
  console.error("Missing DEVTO_API_KEY in environment. Get one at https://dev.to/settings/extensions");
  process.exit(1);
}

// Get slug from args or use latest
let slug = process.argv.find(a => a.startsWith("--slug="))?.split("=")[1];
if (!slug && process.argv.includes("--slug")) {
  slug = process.argv[process.argv.indexOf("--slug") + 1];
}

if (!slug) {
  // Read latest from blog-posts.ts
  const blogPostsContent = fs.readFileSync(path.join(process.cwd(), "lib/blog-posts.ts"), "utf-8");
  const firstSlugMatch = blogPostsContent.match(/slug:\s*"([^"]+)"/);
  if (firstSlugMatch) {
    slug = firstSlugMatch[1];
  } else {
    console.error("Could not find latest blog post slug");
    process.exit(1);
  }
}

console.log(`Cross-posting: ${slug}`);

// Read transcript as the article body
const transcriptPath = path.join(process.cwd(), `app/blog/${slug}/transcript.txt`);
if (!fs.existsSync(transcriptPath)) {
  console.error(`Transcript not found: ${transcriptPath}`);
  process.exit(1);
}

const transcript = fs.readFileSync(transcriptPath, "utf-8");

// Read page.tsx to extract title and description
const pagePath = path.join(process.cwd(), `app/blog/${slug}/page.tsx`);
const pageContent = fs.readFileSync(pagePath, "utf-8");

const titleMatch = pageContent.match(/title:\s*\n?\s*"([^"]+)"/);
const descMatch = pageContent.match(/description:\s*\n?\s*"([^"]+)"/);

const title = titleMatch?.[1] || slug;
const description = descMatch?.[1] || "";

// Convert transcript to markdown
const lines = transcript.split("\n");
let markdown = "";
let inFaq = false;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) {
    markdown += "\n\n";
    continue;
  }

  // Detect headings (lines that are short and followed by paragraph text)
  if (trimmed === "FAQ") {
    markdown += "## FAQ\n\n";
    inFaq = true;
    continue;
  }

  // FAQ questions (lines ending with ?)
  if (inFaq && trimmed.endsWith("?")) {
    markdown += `### ${trimmed}\n\n`;
    continue;
  }

  // Section headings (heuristic: short lines, no period, that precede paragraphs)
  if (trimmed.length < 80 && !trimmed.includes(".") && !trimmed.endsWith(",") && !trimmed.startsWith("-") && !trimmed.startsWith("Step")) {
    const nextLineIdx = lines.indexOf(line) + 1;
    const nextLine = lines[nextLineIdx]?.trim();
    if (nextLine && nextLine.length > trimmed.length) {
      markdown += `## ${trimmed}\n\n`;
      continue;
    }
  }

  markdown += trimmed + "\n";
}

// Add CTA at the end
markdown += `\n\n---\n\n`;
markdown += `*Originally published at [sammapix.com](https://www.sammapix.com/blog/${slug})*\n\n`;
markdown += `**Try it free:** [SammaPix](https://www.sammapix.com) — 27 browser-based image tools. Compress, resize, convert, remove background, and more. Everything runs in your browser, nothing uploaded.\n`;

// Determine tags based on slug content
const tagMap = {
  "compress": ["webdev", "images", "performance", "tools"],
  "remove-bg": ["webdev", "ai", "images", "tools"],
  "background": ["webdev", "ai", "images", "tools"],
  "instagram": ["images", "socialmedia", "photography", "tutorial"],
  "topaz": ["ai", "images", "tools", "photography"],
  "upscale": ["ai", "images", "tools", "webdev"],
  "wordpress": ["wordpress", "webdev", "performance", "tools"],
  "passport": ["tools", "images", "tutorial", "webdev"],
  "exif": ["privacy", "images", "security", "tools"],
  "privacy": ["privacy", "security", "webdev", "tools"],
};

let tags = ["webdev", "images", "tools", "javascript"];
for (const [keyword, tagList] of Object.entries(tagMap)) {
  if (slug.includes(keyword)) {
    tags = tagList;
    break;
  }
}

// Post to Dev.to
const response = await fetch("https://dev.to/api/articles", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DEVTO_API_KEY,
  },
  body: JSON.stringify({
    article: {
      title,
      body_markdown: markdown,
      published: false, // Draft first, review before publishing
      canonical_url: `https://www.sammapix.com/blog/${slug}`,
      description: description.slice(0, 150),
      tags,
    },
  }),
});

if (!response.ok) {
  const error = await response.text();
  console.error(`Dev.to API error (${response.status}):`, error);
  process.exit(1);
}

const article = await response.json();
console.log(`\n\u2705 Draft created on Dev.to!`);
console.log(`   Title: ${article.title}`);
console.log(`   URL: ${article.url}`);
console.log(`   Edit: https://dev.to/${article.user?.username}/${article.slug}/edit`);
console.log(`   Canonical: https://www.sammapix.com/blog/${slug}`);
console.log(`   Status: DRAFT (review and publish manually)`);
console.log(`\n   Tags: ${tags.join(", ")}`);
