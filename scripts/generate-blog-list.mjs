import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "app", "blog");
const outPath = path.join(__dirname, "..", "lib", "generated-blog-list.json");

const entries = fs.readdirSync(blogDir, { withFileTypes: true });
const articles = [];

for (const entry of entries) {
  if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

  const pagePath = path.join(blogDir, entry.name, "page.tsx");
  try {
    const content = fs.readFileSync(pagePath, "utf8");
    const stat = fs.statSync(pagePath);

    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch?.[1] || entry.name.replace(/-/g, " ");

    const descMatch = content.match(/description:\s*\n?\s*["']([^"']+)["']/);
    const description = descMatch?.[1] || "";

    const keywordsMatch = content.match(/keywords:\s*\[([\s\S]*?)\]/);
    let keywords = [];
    if (keywordsMatch) {
      keywords = [...keywordsMatch[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]).slice(0, 5);
    }

    const dateMatch =
      content.match(/publishedTime:\s*["']([^"']+)["']/) ||
      content.match(/datePublished:\s*["']([^"']+)["']/);
    const publishedDate = dateMatch?.[1] || stat.mtime.toISOString().slice(0, 10);

    articles.push({
      slug: entry.name,
      title,
      description: description.slice(0, 150),
      keywords,
      publishedDate,
      url: "/blog/" + entry.name,
    });
  } catch {
    // skip
  }
}

articles.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
fs.writeFileSync(outPath, JSON.stringify(articles, null, 2));
console.log(`Generated blog list: ${articles.length} articles`);
