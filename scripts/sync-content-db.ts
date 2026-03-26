import { db } from "../lib/db";
import { growthContentCalendar } from "../lib/db/schema";
import fs from "fs";
import path from "path";

async function sync() {
  const blogDir = "./app/blog";
  const slugs = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(blogDir, e.name, "page.tsx")))
    .map((e) => e.name);

  // Get existing titles
  const existing = await db.select().from(growthContentCalendar);
  const existingTitles = new Set(existing.map((e) => e.title.toLowerCase()));

  let added = 0;
  for (const slug of slugs) {
    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    if (!existingTitles.has(title.toLowerCase())) {
      // Check if any existing entry contains the slug pattern
      const alreadyExists = existing.some((e) =>
        e.title.toLowerCase().includes(slug.split("-").slice(0, 3).join(" "))
      );
      if (!alreadyExists) {
        await db.insert(growthContentCalendar).values({
          title,
          targetKeyword: slug.replace(/-/g, " "),
          status: "published",
          publishedUrl: `https://www.sammapix.com/blog/${slug}`,
        });
        added++;
        console.log(`  + ${title}`);
      }
    }
  }
  console.log(`\nSincronizzati: ${added} aggiunti, ${existing.length} già presenti`);
  console.log(`Totale: ${existing.length + added}`);
  process.exit(0);
}
sync().catch((e) => { console.error(e); process.exit(1); });
