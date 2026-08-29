/**
 * Shared category data for the dashboard home filter bar.
 *
 * CATEGORY_ORDER and slug lists are kept in sync with the sidebar's
 * TOOL_CATEGORIES (DashboardSidebar.tsx). No JSX here — data only.
 *
 * Multi-category rule: if a slug appears in more than one category
 * below, categoryForSlug() returns the FIRST category it appears in
 * (i.e. the order of CATEGORY_ORDER determines primary category).
 */

export const CATEGORY_ORDER: string[] = [
  "Image",
  "Convert",
  "PDF",
  "Video",
  "Archive",
  "Generate & Dev",
  "AI",
  "Organize & Privacy",
];

/** Slug lists copied verbatim from TOOL_CATEGORIES in DashboardSidebar.tsx */
const CATEGORY_SLUGS: Record<string, string[]> = {
  Image: [
    "compress",
    "resizepack",
    "croproatio",
    "rotate-image",
    "flip-image",
    "add-border",
    "round-image",
    "add-text-to-image",
    "collage-maker",
    "remove-bg",
    "upscale",
    "passport-photo",
    "instagram-grid-splitter",
    "blur-censor",
    "filmlab",
    "stampit",
  ],
  Convert: [
    "heic",
    "webp",
    "png-to-jpg",
    "webp-to-jpg",
    "webp-to-png",
    "avif-to-jpg",
    "convert-to-avif",
    "svg-to-png",
    "jxl",
    "jpg-to-pdf",
    "gif-to-mp4",
    "image-to-base64",
    "raw-converter",
    "pdf-to-image",
  ],
  PDF: [
    "pdf-merge",
    "pdf-split",
    "pdf-compress",
    "pdf-rotate",
    "pdf-unlock",
    "pdf-protect",
    "pdf-page-numbers",
    "remove-pdf-pages",
    "pdf-watermark",
    "pdf-sign",
    "pdf-organize",
    "crop-pdf",
    "flatten-pdf",
    "txt-to-pdf",
    "word-to-pdf",
    "redact-pdf",
  ],
  Video: [
    "compress-video",
    "convert-video",
    "trim-video",
    "mute-video",
    "resize-video",
    "video-to-gif",
    "extract-audio",
    "transcribe",
    "ai-label-video",
  ],
  Archive: [
    "unrar",
    "open-7z",
    "open-cab",
    "rar-to-zip",
    "7z-to-zip",
    "tar-to-zip",
    "tar-gz",
    "zip-creator",
    "iso-extractor",
    "apk-extractor",
    "ipa-extractor",
    "minecraft-extractor",
    "extract-jar",
    "open-gz",
    "open-xz",
  ],
  "Generate & Dev": [
    "qr-code-generator",
    "qr-code-reader",
    "barcode-generator",
    "barcode-reader",
    "hash-generator",
    "password-generator",
    "url-encode-decode",
    "ico-generator",
    "color-picker",
    "json-formatter",
    "3d-viewer",
    "aspect-ratio",
  ],
  AI: [
    "ai-rename",
    "alt-text",
    "smartsort",
    "ai-organize",
    "image-to-text",
    "ai-label",
    "ai-label-video",
  ],
  "Organize & Privacy": [
    "exif",
    "twinhunt",
    "geosort",
    "travelmap",
    "cull",
    "batchname",
  ],
};

/**
 * Flat map slug -> primary category label.
 * Built by iterating CATEGORY_ORDER so first occurrence wins for multi-category slugs.
 */
export const TOOL_CATEGORY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const cat of CATEGORY_ORDER) {
    for (const slug of CATEGORY_SLUGS[cat] ?? []) {
      if (!(slug in map)) {
        map[slug] = cat;
      }
    }
  }
  return map;
})();

/** Returns the primary category label for a given slug, or undefined if uncategorised. */
export function categoryForSlug(slug: string): string | undefined {
  return TOOL_CATEGORY[slug];
}
