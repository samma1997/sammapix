#!/usr/bin/env node
/**
 * Cross-post a SammaPix blog article to ALL platforms at once
 *
 * Usage: node scripts/crosspost-all.mjs [--slug article-slug]
 *
 * Platforms:
 *   - Dev.to (API, canonical URL) — requires DEVTO_API_KEY
 *   - Medium (API, canonical URL) — requires MEDIUM_TOKEN
 *   - Hashnode (GraphQL, canonical URL) — requires HASHNODE_TOKEN
 *
 * All posts are created as DRAFTS. Review and publish manually.
 * Missing API keys are skipped (not an error).
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

let slug = process.argv.find(a => a.startsWith("--slug="))?.split("=")[1];
if (!slug && process.argv.includes("--slug")) slug = process.argv[process.argv.indexOf("--slug") + 1];

if (!slug) {
  const content = fs.readFileSync(path.join(process.cwd(), "lib/blog-posts.ts"), "utf-8");
  slug = content.match(/slug:\s*"([^"]+)"/)?.[1];
}

console.log(`\n\u{1F680} Cross-posting: ${slug}\n`);
console.log(`   Original: https://www.sammapix.com/blog/${slug}\n`);

const platforms = [
  { name: "Dev.to", envKey: "DEVTO_API_KEY", script: "crosspost-devto.mjs" },
  { name: "Medium", envKey: "MEDIUM_TOKEN", script: "crosspost-medium.mjs" },
  { name: "Hashnode", envKey: "HASHNODE_TOKEN", script: "crosspost-hashnode.mjs" },
];

let posted = 0;
let skipped = 0;

for (const p of platforms) {
  if (!process.env[p.envKey]) {
    console.log(`\u23ED  ${p.name}: skipped (no ${p.envKey})`);
    skipped++;
    continue;
  }

  try {
    console.log(`\u{1F4E4} ${p.name}...`);
    const output = execSync(
      `node scripts/${p.script} --slug ${slug}`,
      { cwd: process.cwd(), env: process.env, timeout: 30000 }
    ).toString();

    // Extract URL from output
    const urlMatch = output.match(/URL:\s*(https?:\/\/\S+)/);
    if (urlMatch) console.log(`   \u2705 ${urlMatch[1]}`);
    else console.log(`   \u2705 Done`);
    posted++;
  } catch (err) {
    console.log(`   \u274C Failed: ${err.message?.split("\n")[0]}`);
  }
  console.log();
}

console.log(`\n\u{1F3C1} Risultato: ${posted} pubblicati, ${skipped} skippati (API key mancante)\n`);

if (skipped > 0) {
  console.log("Per abilitare le piattaforme mancanti, aggiungi in .env.local:");
  for (const p of platforms) {
    if (!process.env[p.envKey]) {
      const urls = {
        DEVTO_API_KEY: "https://dev.to/settings/extensions",
        MEDIUM_TOKEN: "https://medium.com/me/settings/security → Integration tokens",
        HASHNODE_TOKEN: "https://hashnode.com/settings/developer",
      };
      console.log(`   ${p.envKey}=xxx  → ${urls[p.envKey]}`);
    }
  }
}
