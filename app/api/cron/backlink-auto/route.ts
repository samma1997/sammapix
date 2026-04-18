import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql as sqlFn } from "drizzle-orm";
import { POSTS } from "@/lib/blog-posts";

export const runtime = "nodejs";
export const maxDuration = 60;

const TELEGRAPH_TOKEN = "929120b3d57af394bcc55f14a34d795643bcf898c9745d5d9f23bd926710";
const PASTEBIN_KEY = "WlC8C9dloEXfEPGVxejCTMmHi_vZedWX";
const IA_ACCESS = "NOWdp2DEmtRyQ2nM";
const IA_SECRET = "kgAZ2opM6EDeMIUw";

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
];

function getDayContent(dayIndex: number) {
  // Rotate tool and blog independently — different cycles
  // Tool: 12-day cycle. Blog: 42-day cycle. Combined: 12×42 = 504 unique combos
  const toolIndex = dayIndex % TOOL_PAGES.length;
  const tool = TOOL_PAGES[toolIndex];
  const blogIndex = (dayIndex * 7) % Math.max(POSTS.length, 1); // offset by 7 to desync from tool
  const blog = POSTS[blogIndex] || POSTS[0];
  const dateStr = new Date().toISOString().slice(0, 10); // for unique slugs

  return {
    tool,
    blog,
    telegraphTitle: `${tool.name} — Free Online Tool | ${blog.title.substring(0, 30)}`,
    telegraphContent: [
      { tag: "p", children: [tool.desc] },
      { tag: "h3", children: ["How to use"] },
      { tag: "ul", children: [
        { tag: "li", children: ["Open the tool in your browser"] },
        { tag: "li", children: ["Drop your images (batch up to 20)"] },
        { tag: "li", children: ["Adjust settings if needed"] },
        { tag: "li", children: ["Download results — done"] },
      ]},
      { tag: "p", children: ["Everything runs client-side. Your images never leave your device."] },
      { tag: "p", children: [
        { tag: "a", attrs: { href: `https://www.sammapix.com${tool.path}` }, children: [`Try ${tool.name} free →`] },
      ]},
      { tag: "p", children: [
        "Related guide: ",
        { tag: "a", attrs: { href: `https://www.sammapix.com/blog/${blog.slug}` }, children: [blog.title] },
      ]},
    ],
    pastebinTitle: `${tool.name} — Free Browser Tool (${new Date().toISOString().slice(0, 10)})`,
    pastebinContent: `${tool.name}\n\n${tool.desc}\n\nFree tool: https://www.sammapix.com${tool.path}\n\nAll 27 tools: https://www.sammapix.com\nOpen source: https://github.com/samma1997/sammapix\n\nRelated: ${blog.title}\nhttps://www.sammapix.com/blog/${blog.slug}`,
    iaTitle: `${tool.name} - SammaPix Free Tool Guide`,
    iaContent: `${tool.name}\n\n${tool.desc}\n\nWebsite: https://www.sammapix.com${tool.path}\nAll tools: https://www.sammapix.com\nGitHub: https://github.com/samma1997/sammapix\nLicense: MIT`,
  };
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const content = getDayContent(dayOfYear);
  const results: Record<string, string> = {};

  // 1. Telegraph — 1 page/day
  try {
    const res = await fetch("https://api.telegra.ph/createPage", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: TELEGRAPH_TOKEN,
        title: content.telegraphTitle,
        author_name: "Luca Sammarco",
        author_url: "https://www.sammapix.com",
        content: JSON.stringify(content.telegraphContent),
      }),
    });
    const data = await res.json();
    results.telegraph = data.result?.url || "error";
  } catch (e) {
    results.telegraph = `error: ${e}`;
  }

  // 2. Pastebin — 1 paste/day
  try {
    const res = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_dev_key: PASTEBIN_KEY,
        api_option: "paste",
        api_paste_private: "0",
        api_paste_name: content.pastebinTitle,
        api_paste_expire_date: "N",
        api_paste_code: content.pastebinContent,
      }),
    });
    results.pastebin = await res.text();
  } catch (e) {
    results.pastebin = `error: ${e}`;
  }

  // 3. Internet Archive — 1 upload/day
  try {
    const dateSlug = new Date().toISOString().slice(0, 10);
    const slug = `sammapix-${content.tool.name.toLowerCase().replace(/\s+/g, "-")}-${dateSlug}`;
    const res = await fetch(`https://s3.us.archive.org/${slug}/${slug}.txt`, {
      method: "PUT",
      headers: {
        Authorization: `LOW ${IA_ACCESS}:${IA_SECRET}`,
        "x-amz-auto-make-bucket": "1",
        "x-archive-meta01-title": content.iaTitle,
        "x-archive-meta02-description": `Free browser-based ${content.tool.name.toLowerCase()} tool. ${content.tool.desc} https://www.sammapix.com`,
        "x-archive-meta03-subject": "image tools;browser-based;open source;sammapix;free",
        "x-archive-meta04-creator": "Luca Sammarco",
        "x-archive-meta05-mediatype": "texts",
        "x-archive-meta06-licenseurl": "https://opensource.org/licenses/MIT",
      },
      body: content.iaContent,
    });
    results.internetArchive = res.ok ? `https://archive.org/details/${slug}` : `error: ${res.status}`;
  } catch (e) {
    results.internetArchive = `error: ${e}`;
  }

  return NextResponse.json({
    ok: true,
    date: today.toISOString().slice(0, 10),
    dayOfYear,
    tool: content.tool.name,
    results,
  });
}
