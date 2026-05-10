import { NextRequest, NextResponse } from "next/server";
import { POSTS } from "@/lib/blog-posts";

export const runtime = "nodejs";
export const maxDuration = 60;

// ─── API CREDENTIALS (from .env.local — NEVER hardcode) ────────────
// .trim() su TUTTE — Vercel aggiunge newline alle env var (bug noto)
const TELEGRAPH_TOKEN = (process.env.TELEGRAPH_TOKEN || "").trim();
const PASTEBIN_KEY = (process.env.PASTEBIN_API_KEY || "").trim();
const IA_ACCESS = (process.env.INTERNET_ARCHIVE_ACCESS || "").trim();
const IA_SECRET = (process.env.INTERNET_ARCHIVE_SECRET || "").trim();
const TUMBLR_CONSUMER_KEY = (process.env.TUMBLR_CONSUMER_KEY || "").trim();
const TUMBLR_CONSUMER_SECRET = (process.env.TUMBLR_CONSUMER_SECRET || "").trim();
const TUMBLR_TOKEN = (process.env.TUMBLR_TOKEN || "").trim();
const TUMBLR_TOKEN_SECRET = (process.env.TUMBLR_TOKEN_SECRET || "").trim();
const TUMBLR_BLOG = (process.env.TUMBLR_BLOG || "sammapix").trim(); // secondary blog sotto account info@lucasammarco.com
const LJ_USERNAME = (process.env.LIVEJOURNAL_USER || "").trim();
const LJ_PASSWORD = (process.env.LIVEJOURNAL_PASS || "").trim();
const GITHUB_TOKEN = (process.env.GITHUB_TOKEN || "").trim();

// ─── TOOL ROTATION ─────────────────────────────────────────────────
const TOOL_PAGES = [
  { name: "Compress Images", path: "/tools/compress", desc: "Reduce image file size by 90% without visible quality loss. Batch up to 20 images. Browser-based, no upload." },
  { name: "WebP Converter", path: "/tools/webp", desc: "Convert any image to WebP format. 25-35% smaller than JPEG at the same quality. 97% browser support." },
  { name: "HEIC Converter", path: "/tools/heic", desc: "Convert iPhone HEIC photos to JPG or WebP. Skip JPG entirely — go straight to WebP for best results." },
  { name: "EXIF Remover", path: "/tools/exif", desc: "Strip GPS coordinates and metadata from photos before sharing. Protect your privacy." },
  { name: "Background Removal", path: "/tools/remove-bg", desc: "AI-powered background removal. Runs in your browser via ONNX. No upload to any server." },
  { name: "AI Rename", path: "/tools/ai-rename", desc: "Generate SEO-friendly filenames from image content using AI. IMG_3847.jpg becomes descriptive-name.webp." },
  { name: "Passport Photo", path: "/tools/passport-photo", desc: "Create compliant passport photos for 140+ countries. AI removes background, crops to exact dimensions." },
  { name: "Duplicate Finder", path: "/tools/twinhunt", desc: "Find and delete duplicate photos. Your phone has 15-25% duplicates eating storage." },
  { name: "Batch Resize", path: "/tools/resizepack", desc: "Resize images to exact dimensions for any platform. Shopify, Instagram, LinkedIn — all sizes." },
  { name: "Film Filters", path: "/tools/filmlab", desc: "Add vintage film effects to digital photos. Grain, color shifts, light leaks — all browser-based." },
  { name: "Watermark", path: "/tools/stampit", desc: "Add watermark to multiple photos at once. Protect your work with text or logo overlays." },
  { name: "Crop Ratio", path: "/tools/croproatio", desc: "Crop images to perfect aspect ratios. 1:1, 16:9, 4:3, custom — with visual guides." },
  // ── 8 new tools (added 22/4/2026) ─────────────────────────────────
  { name: "PNG to JPG", path: "/tools/png-to-jpg", desc: "Convert PNG to JPG with quality slider and background color for transparent PNGs. Batch up to 20 files in your browser." },
  { name: "WebP to JPG", path: "/tools/webp-to-jpg", desc: "Convert WebP to JPG for email, print, and legacy CMS compatibility. Detects and warns about transparency loss." },
  { name: "WebP to PNG", path: "/tools/webp-to-png", desc: "Convert WebP to PNG losslessly with transparency preserved. Warns if output bloats more than 4x source." },
  { name: "SVG to PNG", path: "/tools/svg-to-png", desc: "Rasterize SVG vectors to PNG at 1x-4x scale or custom width up to 8192 px. Ideal for app icons, favicons, print." },
  { name: "GIF to MP4", path: "/tools/gif-to-mp4", desc: "Convert animated GIFs to MP4 or WebM for 80-90% smaller files. ImageDecoder + MediaRecorder, browser-only." },
  { name: "Favicon Generator", path: "/tools/ico-generator", desc: "Build multi-size favicon.ico from PNG/SVG/JPG/WebP with sizes 16, 32, 48, 64, 128, 256 pixels." },
  { name: "PDF Merge", path: "/tools/pdf-merge", desc: "Combine multiple PDFs into one with drag-to-reorder. Runs locally via pdf-lib, no upload, perfect for sensitive documents." },
  { name: "Color Picker", path: "/tools/color-picker", desc: "Eyedrop HEX, RGB, or HSL from any image plus auto-extract 6-color dominant palette via k-means clustering." },
];

function getDayContent(dayIndex: number) {
  const toolIndex = dayIndex % TOOL_PAGES.length;
  const tool = TOOL_PAGES[toolIndex];
  const blogIndex = (dayIndex * 7) % Math.max(POSTS.length, 1);
  const blog = POSTS[blogIndex] || POSTS[0];
  return { tool, blog };
}

// ─── TEMPLATE VARIATION (5 set ruotati per dayOfYear) ──
// Riduce footprint pattern detection: ogni giorno il testo cambia struttura,
// bullet, anchor. Stesso content base ma variato.
interface TemplateVariation {
  titlePattern: (name: string) => string;
  intro: (name: string, desc: string) => string;
  bullets: string[];
  closing: string;
}

const TEMPLATES: TemplateVariation[] = [
  {
    titlePattern: (name) => `${name} — Free Online Tool, Browser-Based`,
    intro: (name, desc) => `${desc} Built into SammaPix, ${name} runs entirely in your browser — no upload, no signup, just drop and process.`,
    bullets: [
      "100% client-side: images stay on your device",
      "Batch processing up to 20 files at once",
      "Open source MIT, hostable anywhere",
      "Works offline once loaded (PWA-ready)",
    ],
    closing: "SammaPix is a free image tools platform built by Luca Sammarco. 35+ tools, all browser-based, MIT-licensed.",
  },
  {
    titlePattern: (name) => `How to ${name.toLowerCase()} for free, in your browser`,
    intro: (name, desc) => `If you need to ${name.toLowerCase()} without uploading photos to a server, here is the simplest path. ${desc}`,
    bullets: [
      "Drop images, set options, download — under 30 seconds",
      "No upload: privacy is the default, not a feature",
      "Source code on GitHub, free forever",
      "Works for batch jobs (up to 20 images at once)",
    ],
    closing: "Built and maintained by Luca Sammarco. Use freely, fork on GitHub, contribute back if you find a bug.",
  },
  {
    titlePattern: (name) => `${name}: privacy-first, no upload required`,
    intro: (name, desc) => `Most online ${name.toLowerCase()} tools upload your images to their servers. SammaPix does not. ${desc}`,
    bullets: [
      "Browser-based via WebAssembly + Web APIs",
      "Zero data collection, zero third-party tracking",
      "Open source: audit the code yourself",
      "Free, no ads, no premium tier",
    ],
    closing: "SammaPix on github.com/samma1997/sammapix. Star the repo if it saved you a subscription.",
  },
  {
    titlePattern: (name) => `${name}: 4 ways it beats paid alternatives`,
    intro: (name, desc) => `Paid SaaS for ${name.toLowerCase()} usually charge $5-30/month for features that can run for free in your browser. ${desc}`,
    bullets: [
      "No monthly fee: pay zero, ever",
      "No file size limit (uses your device RAM)",
      "Faster: no upload/download roundtrip to a server",
      "Open source: extend it yourself if needed",
    ],
    closing: "Try SammaPix free at sammapix.com. 35+ image tools, all open source.",
  },
  {
    titlePattern: (name) => `${name} — what makes a good browser-based image tool in 2026`,
    intro: (name, desc) => `In 2026, most image processing can run client-side thanks to WebAssembly, ImageDecoder, and modern browser APIs. ${desc}`,
    bullets: [
      "WebAssembly: native-level performance in browser",
      "ImageDecoder API: hardware-accelerated decoding",
      "MediaRecorder + Canvas: video & GIF processing",
      "ONNX Runtime Web: AI models without server",
    ],
    closing: "SammaPix uses these APIs to keep everything client-side. Free, open source, no upload.",
  },
];

// ─── ANCHOR TEXT ROTATION (10 variants, riduce exact-match saturation) ──
function pickAnchor(dayIndex: number, toolName: string): string {
  const variants = [
    "SammaPix",
    "SammaPix",
    `Try ${toolName} free`,
    "free image tools",
    "browser-based image tools",
    "open source image tools",
    "SammaPix - free image tools",
    `${toolName.toLowerCase()} online`,
    "explore the tools",
    "learn more",
  ];
  return variants[dayIndex % variants.length];
}

function pickTemplate(dayIndex: number): TemplateVariation {
  return TEMPLATES[dayIndex % TEMPLATES.length];
}

// ─── TUMBLR OAUTH 1.0a SIGNING ─────────────────────────────────────
async function tumblrSign(method: string, url: string): Promise<string> {
  const crypto = await import("crypto");
  const ts = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString("hex");
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: TUMBLR_CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(ts),
    oauth_token: TUMBLR_TOKEN,
    oauth_version: "1.0",
  };
  const baseString =
    method +
    "&" +
    encodeURIComponent(url) +
    "&" +
    encodeURIComponent(
      Object.keys(oauthParams)
        .sort()
        .map((k) => k + "=" + encodeURIComponent(oauthParams[k]))
        .join("&")
    );
  const signingKey =
    encodeURIComponent(TUMBLR_CONSUMER_SECRET) +
    "&" +
    encodeURIComponent(TUMBLR_TOKEN_SECRET);
  const sig = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  return (
    "OAuth " +
    Object.keys(oauthParams)
      .map((k) => k + '="' + encodeURIComponent(oauthParams[k]) + '"')
      .join(", ") +
    ', oauth_signature="' +
    encodeURIComponent(sig) +
    '"'
  );
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dateStr = today.toISOString().slice(0, 10);
  const { tool, blog } = getDayContent(dayOfYear);
  const tpl = pickTemplate(dayOfYear);
  const anchor = pickAnchor(dayOfYear, tool.name);
  const title = tpl.titlePattern(tool.name);
  const intro = tpl.intro(tool.name, tool.desc);
  const results: Record<string, string> = {};

  // ═══════════════════════════════════════════════════════════════
  // 1. TELEGRAPH (DA 80) — 1 page/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const telegraphContent = [
      { tag: "p", children: [intro] },
      { tag: "h3", children: ["Key points"] },
      { tag: "ul", children: tpl.bullets.map((b) => ({ tag: "li", children: [b] })) },
      { tag: "p", children: [
        { tag: "a", attrs: { href: `https://www.sammapix.com${tool.path}` }, children: [anchor] },
        " · ",
        { tag: "a", attrs: { href: `https://www.sammapix.com/blog/${blog.slug}` }, children: [blog.title] },
      ]},
      { tag: "p", children: [tpl.closing] },
    ];

    const res = await fetch("https://api.telegra.ph/createPage", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: TELEGRAPH_TOKEN,
        title,
        author_name: "Luca Sammarco",
        author_url: "https://www.sammapix.com",
        content: JSON.stringify(telegraphContent),
      }),
    });
    const data = await res.json();
    results.telegraph = data.result?.url || "error";
  } catch (e) {
    results.telegraph = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. PASTEBIN (DA 91) — 1 paste/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const pasteContent = `${title}

${intro}

Key points:
${tpl.bullets.map((b) => `- ${b}`).join("\n")}

${anchor}: https://www.sammapix.com${tool.path}
All 35+ tools: https://www.sammapix.com
Open source MIT: https://github.com/samma1997/sammapix
Related: ${blog.title} — https://www.sammapix.com/blog/${blog.slug}

${tpl.closing}`;

    const res = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_dev_key: PASTEBIN_KEY,
        api_option: "paste",
        api_paste_private: "0",
        api_paste_name: `${title} (${dateStr})`,
        api_paste_expire_date: "N",
        api_paste_code: pasteContent,
      }),
    });
    results.pastebin = await res.text();
  } catch (e) {
    results.pastebin = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. INTERNET ARCHIVE (DA 96) — 1 upload/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const iaSlug = `sammapix-${tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}-${dateStr}`;
    const iaContent = `${title}

${intro}

Key points:
${tpl.bullets.map((b) => `- ${b}`).join("\n")}

Website: https://www.sammapix.com${tool.path}
All tools: https://www.sammapix.com
GitHub: https://github.com/samma1997/sammapix
License: MIT — free forever, open source

Related: ${blog.title}
https://www.sammapix.com/blog/${blog.slug}

${tpl.closing}`;

    const res = await fetch(`https://s3.us.archive.org/${iaSlug}/${iaSlug}.txt`, {
      method: "PUT",
      headers: {
        Authorization: `LOW ${IA_ACCESS}:${IA_SECRET}`,
        "x-amz-auto-make-bucket": "1",
        "x-archive-meta01-title": title,
        "x-archive-meta02-description": `${tool.desc} https://www.sammapix.com`,
        "x-archive-meta03-subject": "image tools;browser-based;open source;sammapix;free;privacy-first",
        "x-archive-meta04-creator": "Luca Sammarco",
        "x-archive-meta05-mediatype": "texts",
        "x-archive-meta06-licenseurl": "https://opensource.org/licenses/MIT",
      },
      body: iaContent,
    });
    results.internetArchive = res.ok
      ? `https://archive.org/details/${iaSlug}`
      : `error: ${res.status}`;
  } catch (e) {
    results.internetArchive = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. TUMBLR (DA 89) — 1 post/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const tumblrUrl = `https://api.tumblr.com/v2/blog/${TUMBLR_BLOG}/posts`;
    const authHeader = await tumblrSign("POST", tumblrUrl);

    // Tag rotation (3 sets) per ridurre footprint
    const tagSets = [
      "image tools,free tools,web development,open source,sammapix",
      "browser based,privacy first,no upload,image processing,sammapix",
      "WebAssembly,client-side,free software,image editor,sammapix",
    ];

    const res = await fetch(tumblrUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: [
          {
            type: "link",
            url: `https://www.sammapix.com${tool.path}`,
            title,
            description: intro,
          },
          {
            type: "text",
            text: `${tpl.bullets.map((b) => `• ${b}`).join("\n")}\n\n${tpl.closing}\nGitHub: https://github.com/samma1997/sammapix`,
          },
        ],
        tags: tagSets[dayOfYear % tagSets.length],
      }),
    });
    const data = await res.json();
    results.tumblr = data.response?.id
      ? `https://${TUMBLR_BLOG}.tumblr.com/post/${data.response.id}`
      : `error: ${JSON.stringify(data).substring(0, 100)}`;
  } catch (e) {
    results.tumblr = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. LIVEJOURNAL (DA 80) — 1 post/day via XML-RPC
  // ═══════════════════════════════════════════════════════════════
  try {
    const now = new Date();
    const escTitle = title.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    const escBlogTitle = blog.title.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    const bulletsHtml = tpl.bullets.map((b) => `<li>${b.replace(/&/g, "&amp;")}</li>`).join("");
    const ljEvent = `<h2>${tool.name}</h2><p>${intro}</p><ul>${bulletsHtml}</ul><p><a href="https://www.sammapix.com${tool.path}">${anchor}</a> · <a href="https://www.sammapix.com/blog/${blog.slug}">${escBlogTitle}</a></p><p>${tpl.closing}</p>`;
    const ljTagSets = [
      "image tools, free tools, open source, web development, sammapix",
      "browser based, privacy first, no upload, image processing, sammapix",
      "WebAssembly, client-side, free software, image editor, sammapix",
    ];
    const ljBody = `<?xml version="1.0"?><methodCall><methodName>LJ.XMLRPC.postevent</methodName><params><param><value><struct>` +
      `<member><name>username</name><value><string>${LJ_USERNAME}</string></value></member>` +
      `<member><name>password</name><value><string>${LJ_PASSWORD}</string></value></member>` +
      `<member><name>event</name><value><string>${ljEvent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</string></value></member>` +
      `<member><name>subject</name><value><string>${escTitle}</string></value></member>` +
      `<member><name>lineendings</name><value><string>unix</string></value></member>` +
      `<member><name>year</name><value><int>${now.getFullYear()}</int></value></member>` +
      `<member><name>mon</name><value><int>${now.getMonth() + 1}</int></value></member>` +
      `<member><name>day</name><value><int>${now.getDate()}</int></value></member>` +
      `<member><name>hour</name><value><int>${now.getHours()}</int></value></member>` +
      `<member><name>min</name><value><int>${now.getMinutes()}</int></value></member>` +
      `<member><name>props</name><value><struct><member><name>taglist</name><value><string>${ljTagSets[dayOfYear % ljTagSets.length]}</string></value></member></struct></value></member>` +
      `</struct></value></param></params></methodCall>`;

    const res = await fetch("https://www.livejournal.com/interface/xmlrpc", {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: ljBody,
    });
    const text = await res.text();
    if (text.includes("itemid")) {
      const id = text.match(/<int>(\d+)<\/int>/)?.[1];
      results.livejournal = `https://${LJ_USERNAME}.livejournal.com/${id}.html`;
    } else {
      const err = text.match(/<string>([^<]+)<\/string>/)?.[1];
      results.livejournal = `error: ${err || "unknown"}`;
    }
  } catch (e) {
    results.livejournal = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. RENTRY.CO (DA 50) — 1 page/day, zero auth
  // ═══════════════════════════════════════════════════════════════
  try {
    const csrfRes = await fetch("https://rentry.co");
    const csrfHtml = await csrfRes.text();
    const csrfToken = csrfHtml.match(/csrfmiddlewaretoken" value="([^"]+)/)?.[1];
    const cookies = csrfRes.headers.get("set-cookie") || "";
    const csrfCookie = cookies.match(/csrftoken=([^;]+)/)?.[1] || "";

    if (csrfToken) {
      const rentryContent = `# ${title}

${intro}

## Key points
${tpl.bullets.map((b) => `- ${b}`).join("\n")}

## Links
- [${anchor}](https://www.sammapix.com${tool.path})
- All 35+ tools: https://www.sammapix.com
- Open source MIT: https://github.com/samma1997/sammapix
- Related: [${blog.title}](https://www.sammapix.com/blog/${blog.slug})

---

*${tpl.closing}*`;

      const res = await fetch("https://rentry.co/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://rentry.co",
          Cookie: `csrftoken=${csrfCookie}`,
        },
        body: new URLSearchParams({
          csrfmiddlewaretoken: csrfToken,
          text: rentryContent,
          edit_code: `sammapix-${dateStr}`,
        }),
      });
      const data = await res.json();
      results.rentry = data.url || `error: ${JSON.stringify(data)}`;
    } else {
      results.rentry = "error: no csrf token";
    }
  } catch (e) {
    results.rentry = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. GITHUB GIST (DA 92) — dev-friendly, perfect for open source SaaS
  // Skip se token non configurato (sorgente opzionale).
  // ═══════════════════════════════════════════════════════════════
  if (GITHUB_TOKEN) {
    try {
      const gistMd = `# ${title}

${intro}

## Key points
${tpl.bullets.map((b) => `- ${b}`).join("\n")}

## Tech stack
- WebAssembly + Web APIs for client-side processing
- Next.js 15 + React 19 + TypeScript
- ONNX Runtime Web for AI models (Background Removal, AI Rename)
- pdf-lib for PDF tools, ImageDecoder + Canvas for image transforms
- Open source MIT license

## Links
- [${anchor}](https://www.sammapix.com${tool.path})
- All 35+ tools: https://www.sammapix.com
- GitHub repo: https://github.com/samma1997/sammapix
- Related guide: [${blog.title}](https://www.sammapix.com/blog/${blog.slug})

---

*${tpl.closing}*`;

      const filename = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50) + ".md";
      const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          description: title,
          public: true,
          files: { [filename]: { content: gistMd } },
        }),
      });
      const data = await res.json();
      results.github_gist = data.html_url || `error: ${data.message || JSON.stringify(data).slice(0, 150)}`;
    } catch (e) {
      results.github_gist = `error: ${e}`;
    }
  }

  return NextResponse.json({
    ok: true,
    date: dateStr,
    dayOfYear,
    tool: tool.name,
    blog: blog.title,
    template: TEMPLATES.indexOf(tpl),
    anchor,
    results,
  });
}
