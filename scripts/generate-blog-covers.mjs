/**
 * generate-blog-covers.mjs
 *
 * Generates Apple-style minimal cover images for blog articles.
 * Uses sharp + SVG to create clean gradient covers with category icons.
 *
 * USAGE:
 *   node scripts/generate-blog-covers.mjs          # generate all missing covers
 *   node scripts/generate-blog-covers.mjs --force   # regenerate all covers
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COVERS_DIR = path.join(ROOT, "public", "blog", "covers");
const BLOG_POSTS_FILE = path.join(ROOT, "lib", "blog-posts.ts");

const WIDTH = 800;
const HEIGHT = 450;
const forceRegenerate = process.argv.includes("--force");

// ── Parse blog-posts.ts ────────────────────────────────────────────────────

function parsePosts() {
  const src = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
  const posts = [];
  // Match each object in the POSTS array
  const regex = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*tags:\s*\[([^\]]+)\]/g;
  let match;
  while ((match = regex.exec(src)) !== null) {
    const tags = match[5].split(",").map((t) => t.trim().replace(/"/g, ""));
    posts.push({
      slug: match[1],
      title: match[2],
      description: match[3],
      date: match[4],
      tags,
    });
  }
  return posts;
}

// ── Category color palettes (Apple-inspired muted tones) ───────────────────

const CATEGORY_STYLES = {
  Tools: {
    bg1: "#E8F5E9",
    bg2: "#F1F8E9",
    accent: "#66BB6A",
    accentLight: "#A5D6A7",
    icon: "wrench",
  },
  SEO: {
    bg1: "#EDE7F6",
    bg2: "#E8EAF6",
    accent: "#7E57C2",
    accentLight: "#B39DDB",
    icon: "search",
  },
  Performance: {
    bg1: "#E3F2FD",
    bg2: "#E1F5FE",
    accent: "#42A5F5",
    accentLight: "#90CAF9",
    icon: "zap",
  },
  Privacy: {
    bg1: "#FCE4EC",
    bg2: "#FBE9E7",
    accent: "#EF5350",
    accentLight: "#EF9A9A",
    icon: "shield",
  },
  Workflow: {
    bg1: "#FFF8E1",
    bg2: "#FFF3E0",
    accent: "#FFA726",
    accentLight: "#FFCC80",
    icon: "layers",
  },
  Creative: {
    bg1: "#F3E5F5",
    bg2: "#FCE4EC",
    accent: "#AB47BC",
    accentLight: "#CE93D8",
    icon: "sparkles",
  },
};

// ── SVG icon paths (Lucide-style, stroke-based) ───────────────────────────

const ICON_PATHS = {
  wrench: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
  search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  sparkles: `<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"/><path d="M6 17l.5 1.5L8 19l-1.5.5L6 21l-.5-1.5L4 19l1.5-.5L6 17z"/>`,
};

// ── Generate SVG cover ────────────────────────────────────────────────────

function generateCoverSVG(post) {
  const tag = post.tags[0] || "Tools";
  const style = CATEGORY_STYLES[tag] || CATEGORY_STYLES.Tools;
  const iconPath = ICON_PATHS[style.icon] || ICON_PATHS.wrench;

  // Create subtle geometric decorations
  const decorations = generateDecorations(style);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${style.bg1}"/>
      <stop offset="100%" stop-color="${style.bg2}"/>
    </linearGradient>
    <!-- Subtle radial glow -->
    <radialGradient id="glow" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="${style.accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${style.accent}" stop-opacity="0"/>
    </radialGradient>
    <!-- Bottom fade -->
    <linearGradient id="bottomFade" x1="0" y1="0.6" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Subtle geometric decorations -->
  ${decorations}

  <!-- Bottom fade for depth -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bottomFade)"/>

  <!-- Centered icon -->
  <g transform="translate(${WIDTH / 2 - 24}, ${HEIGHT / 2 - 40}) scale(2)"
     fill="none" stroke="${style.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.35">
    ${iconPath}
  </g>

  <!-- Thin top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="3" fill="${style.accent}" opacity="0.5"/>
</svg>`;
}

function generateDecorations(style) {
  // Subtle floating circles and lines - Apple-style abstract decoration
  const elements = [];

  // Large soft circle top-right
  elements.push(
    `<circle cx="650" cy="80" r="120" fill="${style.accentLight}" opacity="0.12"/>`
  );

  // Medium circle bottom-left
  elements.push(
    `<circle cx="120" cy="380" r="80" fill="${style.accentLight}" opacity="0.08"/>`
  );

  // Small accent dot
  elements.push(
    `<circle cx="200" cy="100" r="4" fill="${style.accent}" opacity="0.2"/>`
  );
  elements.push(
    `<circle cx="600" cy="350" r="3" fill="${style.accent}" opacity="0.15"/>`
  );

  // Subtle grid lines
  elements.push(
    `<line x1="100" y1="0" x2="100" y2="${HEIGHT}" stroke="${style.accent}" stroke-width="0.5" opacity="0.04"/>`
  );
  elements.push(
    `<line x1="700" y1="0" x2="700" y2="${HEIGHT}" stroke="${style.accent}" stroke-width="0.5" opacity="0.04"/>`
  );
  elements.push(
    `<line x1="0" y1="150" x2="${WIDTH}" y2="150" stroke="${style.accent}" stroke-width="0.5" opacity="0.04"/>`
  );
  elements.push(
    `<line x1="0" y1="300" x2="${WIDTH}" y2="300" stroke="${style.accent}" stroke-width="0.5" opacity="0.04"/>`
  );

  // Rounded rectangle outline (subtle frame)
  elements.push(
    `<rect x="40" y="30" width="${WIDTH - 80}" height="${HEIGHT - 60}" rx="16" ry="16" fill="none" stroke="${style.accent}" stroke-width="0.5" opacity="0.06"/>`
  );

  return elements.join("\n  ");
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(COVERS_DIR, { recursive: true });

  const posts = parsePosts();
  console.log(`Found ${posts.length} blog posts`);

  let generated = 0;
  let skipped = 0;

  for (const post of posts) {
    const outputPath = path.join(COVERS_DIR, `${post.slug}.webp`);

    if (!forceRegenerate && fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    const svg = generateCoverSVG(post);

    await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .webp({ quality: 85 })
      .toFile(outputPath);

    generated++;
    console.log(`  ✓ ${post.slug}.webp (${post.tags[0]})`);
  }

  console.log(`\nDone: ${generated} generated, ${skipped} skipped (already exist)`);

  // Update blog-posts.ts with coverImage fields
  if (generated > 0) {
    updateBlogPostsFile(posts);
  }
}

function updateBlogPostsFile(posts) {
  let src = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");

  let updated = 0;
  for (const post of posts) {
    const coverPath = `/blog/covers/${post.slug}.webp`;
    // Check if this post already has a coverImage
    if (src.includes(`slug: "${post.slug}"`) && !src.includes(`coverImage: "${coverPath}"`)) {
      // Add coverImage after the tags array
      const tagPattern = new RegExp(
        `(slug: "${post.slug}"[^}]*tags: \\[[^\\]]+\\])`,
        "s"
      );
      src = src.replace(tagPattern, `$1, coverImage: "${coverPath}"`);
      updated++;
    }
  }

  if (updated > 0) {
    fs.writeFileSync(BLOG_POSTS_FILE, src, "utf-8");
    console.log(`Updated ${updated} posts in blog-posts.ts with coverImage field`);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
