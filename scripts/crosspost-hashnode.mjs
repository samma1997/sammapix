#!/usr/bin/env node
/**
 * Cross-post SammaPix blog article to Hashnode with canonical URL
 *
 * Usage: node scripts/crosspost-hashnode.mjs [--slug article-slug]
 * Requires HASHNODE_TOKEN in .env.local
 * Get token: https://hashnode.com/settings/developer → Personal Access Token
 */

import fs from "fs";
import path from "path";

const TOKEN = process.env.HASHNODE_TOKEN;
if (!TOKEN) {
  console.error("Missing HASHNODE_TOKEN. Get one at https://hashnode.com/settings/developer");
  process.exit(1);
}

let slug = process.argv.find(a => a.startsWith("--slug="))?.split("=")[1];
if (!slug && process.argv.includes("--slug")) slug = process.argv[process.argv.indexOf("--slug") + 1];

if (!slug) {
  const content = fs.readFileSync(path.join(process.cwd(), "lib/blog-posts.ts"), "utf-8");
  slug = content.match(/slug:\s*"([^"]+)"/)?.[1];
}

console.log(`Cross-posting to Hashnode: ${slug}`);

// Get user's publication ID
const meQuery = `query { me { publications(first: 1) { edges { node { id title } } } } }`;
const meRes = await fetch("https://gql.hashnode.com", {
  method: "POST",
  headers: { Authorization: TOKEN, "Content-Type": "application/json" },
  body: JSON.stringify({ query: meQuery }),
});
const meData = await meRes.json();
const publication = meData?.data?.me?.publications?.edges?.[0]?.node;

if (!publication) {
  console.error("No publication found. Create one at hashnode.com/onboard first.");
  console.log("Raw response:", JSON.stringify(meData, null, 2));
  process.exit(1);
}
console.log(`  Publication: ${publication.title} (${publication.id})`);

// Read content
const transcript = fs.readFileSync(path.join(process.cwd(), `app/blog/${slug}/transcript.txt`), "utf-8");
const pageContent = fs.readFileSync(path.join(process.cwd(), `app/blog/${slug}/page.tsx`), "utf-8");
const title = pageContent.match(/title:\s*\n?\s*"([^"]+)"/)?.[1] || slug;
const description = pageContent.match(/description:\s*\n?\s*"([^"]+)"/)?.[1] || "";

// Convert transcript sections to markdown
let markdown = "";
const lines = transcript.split("\n");
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) { markdown += "\n\n"; continue; }
  if (trimmed === "FAQ") { markdown += "## FAQ\n\n"; continue; }
  if (trimmed.endsWith("?") && trimmed.length < 100) { markdown += `### ${trimmed}\n\n`; continue; }
  if (trimmed.length < 80 && !trimmed.includes(".") && !trimmed.endsWith(",")) {
    const idx = lines.indexOf(line);
    const next = lines[idx + 1]?.trim();
    if (next && next.length > trimmed.length) { markdown += `## ${trimmed}\n\n`; continue; }
  }
  markdown += trimmed + "\n";
}

markdown += `\n\n---\n\n*Originally published at [sammapix.com](https://www.sammapix.com/blog/${slug})*\n`;
markdown += `\n**Try SammaPix free:** [sammapix.com](https://www.sammapix.com) — 27 browser-based image tools.\n`;

// Determine tags
const tagNames = ["image-optimization", "webdev", "tools"];
if (slug.includes("remove-bg") || slug.includes("background")) tagNames.push("ai");
if (slug.includes("privacy") || slug.includes("exif")) tagNames.push("privacy");
if (slug.includes("wordpress")) tagNames.push("wordpress");

const tagsQuery = tagNames.map(t => `{ slug: "${t}", name: "${t}" }`).join(", ");

// Create draft post
const createMutation = `mutation {
  publishPost(input: {
    publicationId: "${publication.id}"
    title: "${title.replace(/"/g, '\\"')}"
    subtitle: "${description.slice(0, 150).replace(/"/g, '\\"')}"
    contentMarkdown: ${JSON.stringify(markdown)}
    originalArticleURL: "https://www.sammapix.com/blog/${slug}"
    slug: "${slug}"
    tags: [${tagsQuery}]
    publishedAt: "${new Date().toISOString()}"
  }) {
    post {
      id
      title
      url
      slug
    }
  }
}`;

const postRes = await fetch("https://gql.hashnode.com", {
  method: "POST",
  headers: { Authorization: TOKEN, "Content-Type": "application/json" },
  body: JSON.stringify({ query: createMutation }),
});

const postData = await postRes.json();
const post = postData?.data?.publishPost?.post;

if (post) {
  console.log(`\n\u2705 Published on Hashnode!`);
  console.log(`   URL: ${post.url}`);
  console.log(`   Canonical: https://www.sammapix.com/blog/${slug}`);
} else {
  console.error("Failed:", JSON.stringify(postData?.errors || postData, null, 2));
}
