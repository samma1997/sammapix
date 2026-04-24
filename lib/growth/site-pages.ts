import { POSTS } from "@/lib/blog-posts";
import { getAllPlatforms } from "@/lib/resize-platforms";
import { getAllOptimizePlatforms } from "@/lib/optimize-platforms";
import { getAllImageSizePlatforms } from "@/lib/image-size-platforms";
import { getAllTargets } from "@/lib/compress-targets";
import { getAllPassportPresets } from "@/lib/passport-presets";

/**
 * Single source of truth per TUTTE le pagine indicizzabili del sito.
 * Usata sia dal cron gsc-index-check (URL Inspection API) sia dal panel
 * Not-Indexed (/api/growth/seo/trends).
 *
 * NON includere qui pagine di /dashboard, /auth, /api — bloccate da robots.txt.
 */

const STATIC_PAGES = [
  "/",
  "/tools",
  "/blog",
  "/pricing",
  "/about",
  "/privacy",
  "/glossary",
  "/portfolio",
  "/convert",
  "/compress-to",
  "/resize",
  "/optimize-for",
  "/image-size",
  "/passport-photo",
  "/vs",
];

const TOOL_PAGES = [
  "/tools/compress", "/tools/webp", "/tools/heic", "/tools/ai-rename",
  "/tools/exif", "/tools/resizepack", "/tools/remove-bg", "/tools/passport-photo",
  "/tools/croproatio", "/tools/stampit", "/tools/filmlab", "/tools/batchname",
  "/tools/twinhunt", "/tools/geosort", "/tools/travelmap", "/tools/cull",
  "/tools/alt-text", "/tools/image-to-text", "/tools/transcribe", "/tools/smartsort",
  "/tools/ai-organize", "/tools/weblift", "/tools/blogdrop", "/tools/upscale",
  "/tools/jxl", "/tools/jpg-to-pdf", "/tools/pdf-to-image",
  "/tools/png-to-jpg", "/tools/webp-to-jpg", "/tools/webp-to-png",
  "/tools/svg-to-png", "/tools/gif-to-mp4", "/tools/ico-generator",
  "/tools/pdf-merge", "/tools/color-picker",
];

const VS_PAGES = [
  "/vs/tinypng", "/vs/squoosh", "/vs/imageoptim", "/vs/compressor-io",
  "/vs/iloveimg", "/vs/vsco", "/vs/filterpixel", "/vs/shortpixel",
  "/vs/canva", "/vs/photopea", "/vs/birme", "/vs/optimizilla",
];

const CONVERT_PAGES = [
  "/convert/heic-to-jpg", "/convert/heic-to-png", "/convert/png-to-webp",
  "/convert/jpg-to-webp", "/convert/jpeg-to-webp", "/convert/webp-to-jpg",
  "/convert/png-to-jpg", "/convert/gif-to-webp", "/convert/webp-to-png",
  "/convert/avif-to-jpg", "/convert/tiff-to-jpg", "/convert/svg-to-png",
  "/convert/bmp-to-jpg", "/convert/jpg-to-png", "/convert/png-to-ico",
  "/convert/webp-to-gif", "/convert/raw-to-jpg", "/convert/tiff-to-png",
  "/convert/bmp-to-png", "/convert/gif-to-jpg", "/convert/avif-to-png",
  "/convert/heic-to-webp", "/convert/svg-to-jpg", "/convert/jxl-to-jpg",
  "/convert/jxl-to-png", "/convert/jxl-to-webp", "/convert/jpg-to-jxl",
  "/convert/png-to-jxl", "/convert/webp-to-jxl",
];

export function getAllSitePages(): string[] {
  const blogPaths = POSTS.map((p) => `/blog/${p.slug}`);
  const resizePaths = getAllPlatforms().map((p) => `/resize/${p.slug}`);
  const compressPaths = getAllTargets().map((t) => `/compress-to/${t.slug}`);
  const optimizePaths = getAllOptimizePlatforms().map((p) => `/optimize-for/${p.slug}`);
  const imageSizePaths = getAllImageSizePlatforms().map((p) => `/image-size/${p.slug}`);
  const passportPaths = getAllPassportPresets().map((p) => `/passport-photo/${p.country}`);

  return Array.from(
    new Set([
      ...STATIC_PAGES,
      ...TOOL_PAGES,
      ...VS_PAGES,
      ...CONVERT_PAGES,
      ...blogPaths,
      ...resizePaths,
      ...compressPaths,
      ...optimizePaths,
      ...imageSizePaths,
      ...passportPaths,
    ])
  );
}

export function categorizePage(page: string): string {
  if (page.startsWith("/blog/")) return "blog";
  if (page.startsWith("/tools/")) return "tool";
  if (page.startsWith("/vs/")) return "vs";
  if (page.startsWith("/convert/")) return "convert";
  if (page.startsWith("/resize/")) return "resize";
  if (page.startsWith("/compress-to/")) return "compress-to";
  if (page.startsWith("/optimize-for/")) return "optimize-for";
  if (page.startsWith("/image-size/")) return "image-size";
  if (page.startsWith("/passport-photo/")) return "passport";
  return "page";
}
