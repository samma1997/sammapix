#!/usr/bin/env node
/**
 * Cross-post SammaPix blog article to Medium with canonical URL
 *
 * Usage: node scripts/crosspost-medium.mjs [--slug article-slug]
 * Requires MEDIUM_TOKEN in .env.local
 * Get token: https://medium.com/me/settings/security → Integration tokens
 */

import fs from "fs";
import path from "path";

const TOKEN = process.env.MEDIUM_TOKEN;
if (!TOKEN) {
  console.error("Missing MEDIUM_TOKEN. Get one at https://medium.com/me/settings/security → Integration tokens");
  process.exit(1);
}

let slug = process.argv.find(a => a.startsWith("--slug="))?.split("=")[1];
if (!slug && process.argv.includes("--slug")) slug = process.argv[process.argv.indexOf("--slug") + 1];

if (!slug) {
  const content = fs.readFileSync(path.join(process.cwd(), "lib/blog-posts.ts"), "utf-8");
  slug = content.match(/slug:\s*"([^"]+)"/)?.[1];
}

console.log(`Cross-posting to Medium: ${slug}`);

// Get user ID
const meRes = await fetch("https://api.medium.com/v1/me", {
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
});
if (!meRes.ok) { console.error("Auth failed:", await meRes.text()); process.exit(1); }
const { data: user } = await meRes.json();
console.log(`  Authenticated as: ${user.name} (@${user.username})`);

// Read transcript
const transcript = fs.readFileSync(path.join(process.cwd(), `app/blog/${slug}/transcript.txt`), "utf-8");
const pageContent = fs.readFileSync(path.join(process.cwd(), `app/blog/${slug}/page.tsx`), "utf-8");
const title = pageContent.match(/title:\s*\n?\s*"([^"]+)"/)?.[1] || slug;

// Convert to HTML-ish markdown for Medium
let body = `# ${title}\n\n`;
body += transcript;
body += `\n\n---\n\n*Originally published at [sammapix.com](https://www.sammapix.com/blog/${slug})*\n\n`;
body += `**Try SammaPix free:** [27 browser-based image tools](https://www.sammapix.com) — compress, resize, convert, remove background, and more. Everything runs in your browser.\n`;

// Post to Medium
const postRes = await fetch(`https://api.medium.com/v1/users/${user.id}/posts`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    contentFormat: "markdown",
    content: body,
    canonicalUrl: `https://www.sammapix.com/blog/${slug}`,
    publishStatus: "draft",
    tags: ["image-optimization", "webdev", "tools", "productivity", "ai"],
  }),
});

if (!postRes.ok) { console.error("Post failed:", await postRes.text()); process.exit(1); }
const { data: post } = await postRes.json();
console.log(`\n\u2705 Draft created on Medium!`);
console.log(`   URL: ${post.url}`);
console.log(`   Canonical: https://www.sammapix.com/blog/${slug}`);
console.log(`   Status: DRAFT — review and publish manually`);
