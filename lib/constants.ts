import { PlanLimits } from "@/types/user";
import { ImageFormat } from "@/types/image";

// File limits (per batch/session)
export const MAX_FILE_SIZE_FREE = 20 * 1024 * 1024; // 20MB
export const MAX_FILE_SIZE_PRO = 50 * 1024 * 1024; // 50MB
export const MAX_FILES_FREE = 20;
export const MAX_FILES_PRO = 500;

// Flip to true the day the Chrome extension is published on the Web Store.
// Controls whether the "Get the extension" navbar button and post-action prompts show.
export const EXTENSION_LIVE = true;

// Daily image processing limit (across ALL tools)
export const DAILY_IMAGES_FREE = 50;
export const DAILY_IMAGES_PRO = 999999; // unlimited

// GeoSort limits
export const MAX_GEOSORT_FREE = 100;
export const MAX_GEOSORT_PRO = 500;

// HEIC Converter limits
export const MAX_HEIC_FREE = 100;
export const MAX_HEIC_PRO = 500;

// AI limits (unified pool: ALL AI tools share a single daily counter per user)
export const AI_OPS_FREE_PER_DAY = 10;
export const AI_OPS_PRO_PER_DAY = 200;

// Legacy aliases removed- all AI endpoints now share the unified AI_OPS pool

// Accepted formats
export const ACCEPTED_FORMATS: ImageFormat[] = ["jpeg", "png", "webp", "gif", "avif"];

export const ACCEPTED_MIME_TYPES: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
  "image/heic": [".heic"],
  "image/heif": [".heif"],
};

export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic", ".heif"];

// ── Tool catalog ─────────────────────────────────────────────────────────────
// Single source of truth for "how many tools we have". When you add a new
// tool, append its slug here and TOOL_COUNT updates automatically across the
// whole site (homepage, blog posts, schema, metadata, OG, etc.).
//
// Must match the folder name under `app/tools/<slug>/page.tsx`.
export const TOOL_SLUGS = [
  "ai-organize",
  "ai-rename",
  "alt-text",
  "batchname",
  "blogdrop",
  "color-picker",
  "compress",
  "croproatio",
  "cull",
  "exif",
  "filmlab",
  "geosort",
  "gif-to-mp4",
  "heic",
  "ico-generator",
  "image-to-text",
  "instagram-grid-splitter",
  "pdf-compress",
  "jpg-to-pdf",
  "jxl",
  "passport-photo",
  "pdf-merge",
  "pdf-to-image",
  "png-to-jpg",
  "remove-bg",
  "resizepack",
  "smartsort",
  "stampit",
  "svg-to-png",
  "transcribe",
  "travelmap",
  "twinhunt",
  "upscale",
  "weblift",
  "webp",
  "webp-to-jpg",
  "webp-to-png",
  "unrar",
  "open-7z",
  "zip-creator",
  "tar-gz",
  "raw-converter",
  "pdf-split",
  "blur-censor",
  "redact-pdf",
  "compress-video",
  "convert-video",
  "video-to-gif",
  "mute-video",
  "resize-video",
  "trim-video",
  "extract-audio",
  "pdf-rotate",
  "pdf-unlock",
  "pdf-page-numbers",
  "pdf-protect",
  "rotate-image",
  "flip-image",
  "add-border",
  "round-image",
  "add-text-to-image",
  "image-to-base64",
  "collage-maker",
  "remove-pdf-pages",
  "pdf-watermark",
  "pdf-sign",
  "flatten-pdf",
  "pdf-organize",
  "crop-pdf",
  "txt-to-pdf",
  "rar-to-zip",
  "7z-to-zip",
  "minecraft-extractor",
  "apk-extractor",
] as const;

export const TOOL_COUNT = TOOL_SLUGS.length;

// Plan limits
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    maxFiles: MAX_FILES_FREE,
    aiRenamePerDay: AI_OPS_FREE_PER_DAY,
    dailyImages: DAILY_IMAGES_FREE,
    aiOpsPerDay: AI_OPS_FREE_PER_DAY,
    maxFileSizeBytes: MAX_FILE_SIZE_FREE,
    zipDownload: false,
    ads: true,
  },
  pro: {
    maxFiles: MAX_FILES_PRO,
    aiRenamePerDay: AI_OPS_PRO_PER_DAY,
    dailyImages: DAILY_IMAGES_PRO,
    aiOpsPerDay: AI_OPS_PRO_PER_DAY,
    maxFileSizeBytes: MAX_FILE_SIZE_PRO,
    zipDownload: true,
    ads: false,
  },
};

// Default compress options
export const DEFAULT_QUALITY = 80;
export const DEFAULT_CONVERT_WEBP = false;
export const DEFAULT_AI_RENAME = false;

// Pricing
export const PRICE_PRO_MONTHLY = 9;
export const PRICE_PRO_YEARLY = 79;
export const DAY_PASS_PRICE = 299; // $2.99 in cents
// Premium Video Day Pass — higher price for the high-value large-video buyer.
// Grants the same 24h full Pro access as the standard Day Pass.
export const DAY_PASS_VIDEO_PRICE = 499; // $4.99 in cents

// App info
export const APP_NAME = "SammaPix";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com";
export const APP_DESCRIPTION =
  "The fastest free image optimizer. Compress, convert to WebP, and AI-rename your images- no signup needed.";

// Blog post slugs - must match actual directories
export const BLOG_SLUGS = [
  "image-to-base64-online",
  "base64-to-image-converter",
  "add-text-to-image-online",
  "add-caption-to-photo-free",
  "crop-image-into-circle-online",
  "round-image-corners-free",
  "add-border-to-image-online",
  "add-frame-to-photo-free",
  "flip-image-online-no-upload",
  "mirror-photo-online-free",
  "rotate-image-online-no-upload",
  "how-to-rotate-a-photo-free",
  "password-protect-pdf-online-no-upload",
  "add-password-to-pdf-free",
  "add-page-numbers-to-pdf-online",
  "number-pdf-pages-no-upload",
  "unlock-pdf-online-no-upload",
  "remove-pdf-password-restrictions",
  "rotate-pdf-online-no-upload",
  "how-to-rotate-pdf-pages-permanently",
  "compress-pdf-online-no-upload",
  "reduce-pdf-file-size-for-email",
  "how-to-mute-a-video-remove-audio-no-upload",
  "how-to-trim-a-video-cut-a-clip-no-upload",
  "how-to-extract-audio-from-video-mp4-to-mp3",
  "how-to-resize-a-video-change-resolution-no-upload",
  "how-to-convert-mov-to-mp4-no-upload",
  "how-to-convert-video-to-gif-no-upload",
  "compress-video-online-no-upload",
  "redact-pdf-remove-sensitive-text-no-upload",
  "split-pdf-privately-no-upload",
  "blur-faces-license-plates-online-no-upload",
  "open-raw-files-browser-no-upload",
  "can-i-use-webp-avif-browser-support-2026",
  "apply-lut-batch-photos-free-2026",
  "extract-lut-from-photo-free-2026",
  "does-imessage-strip-exif-metadata",
  "does-reddit-strip-exif-metadata",
  "does-telegram-strip-exif-metadata",
  "does-signal-strip-exif-metadata",
  "does-discord-strip-exif-metadata",
  "ai-photo-renamer-custom-directive",
  "upscale-image-ai-free-2026",
  "extract-brand-colors-from-image-2026",
  "favicon-best-practices-2026",
  "merge-pdfs-privately-no-upload",
  "gif-to-mp4-stop-using-gifs-2026",
  "svg-to-png-complete-guide-developers",
  "png-to-jpg-vs-webp-2026",
  "batch-watermark-photos-free-guide",
  "best-free-remove-bg-alternatives-2026",
  "instagram-image-quality-loss-fix",
  "best-free-topaz-gigapixel-alternatives-2026",
  "compress-photos-indian-exam-applications",
  "wordpress-compress-images-before-upload",
  "passport-photo-at-home-free",
  "which-apps-strip-photo-metadata",
  "check-remove-exif-data-photos",
  "optimize-travel-photos-sri-lanka",
  "ai-rename-travel-photos-seo-results",
  "ai-image-renaming-seo-guide",
  "batch-watermark-photos-free",
  "best-image-compression-tools-2026",
  "best-image-format-for-web-2026",
  "complete-guide-webp-format",
  "compress-images-without-losing-quality",
  "create-travel-photo-map",
  "crop-photos-perfect-ratios",
  "cull-photos-faster-workflow",
  "film-effects-digital-photos-free",
  "find-delete-duplicate-photos",
  "find-delete-duplicate-photos-free",
  "image-sizes-social-media-2026",
  "iphone-heic-to-jpg-guide",
  "make-images-load-faster-website",
  "optimize-images-wordpress-guide",
  "organize-travel-photos-by-country",
  "reduce-image-size-for-email",
  "remove-exif-protect-privacy",
  "remove-gps-from-photos",
  "travel-photography-tips-beginners",
  "best-tinypng-alternative-2026",
  "browser-based-image-tools-privacy-guide",
  "batch-rename-photos-ai",
  "free-image-optimization-tools-online",
  "webp-vs-avif-vs-jpeg-comparison",
  "how-to-speed-up-website-with-image-optimization",
  "sammapix-vs-tinypng-benchmark-2026",
  "image-compression-benchmark-2026",
  "passport-photo-requirements-2026",
  "ai-alt-text-accuracy-test-2026",
  "compress-images-whatsapp-quality",
  "batch-compress-images-no-signup-free",
  "optimize-images-core-web-vitals-2026",
  "heic-to-webp-converter-guide",
  "image-optimization-checklist-2026",
  "optimize-images-shopify-free-guide",
  "image-compression-statistics-2026",
  "how-to-open-rar-files-on-mac",
  "how-to-open-7z-files-on-mac",
  "how-to-create-a-zip-file-online-no-upload",
  "how-to-open-tar-gz-files-online-no-upload",
  "what-is-a-jxl-file-how-to-open-convert",
  "how-to-batch-rename-photos-and-files-online",
  "how-to-convert-png-to-jpg-free-no-upload",
  "how-to-convert-webp-to-jpg-free-no-upload",
  "how-to-combine-jpg-images-into-one-pdf",
  "how-to-organize-photos-by-category-with-ai",
  "how-to-transcribe-video-generate-subtitles-free",
  "what-size-should-blog-images-be",
  "how-to-batch-prepare-images-for-website",
  "photo-collage-maker-online",
  "image-grid-maker-free",
  "delete-pages-from-pdf-online",
  "remove-pdf-pages-no-upload",
  "add-watermark-to-pdf-online",
  "watermark-pdf-no-upload",
  "sign-pdf-online-free",
  "add-signature-to-pdf-no-upload",
  "reorder-pdf-pages-online",
  "organize-pdf-pages-no-upload",
  "crop-pdf-online-free",
  "crop-pdf-margins-no-upload",
  "flatten-pdf-online-free",
  "flatten-pdf-form-no-upload",
  "txt-to-pdf-online-free",
  "convert-text-to-pdf-no-upload",
  "rar-to-zip-online",
  "convert-rar-to-zip-no-upload",
  "extract-mcpack-online",
  "open-minecraft-mcworld-file",
  "extract-apk-online",
  "open-apk-file-online",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

// Storage keys
export const STORAGE_ADBLOCK_DISMISSED = "sammapix_adblock_dismissed";
export const STORAGE_ADBLOCK_DISMISSED_AT = "sammapix_adblock_dismissed_at";
export const STORAGE_AI_RENAME_USAGE = "sammapix_ai_rename_usage";
export const STORAGE_AI_RENAME_DATE = "sammapix_ai_rename_date";
export const ADBLOCK_DISMISS_DAYS = 7;

// Gemini model
export const GEMINI_MODEL = "gemini-2.5-flash";

// Admin emails- allowed to access /admin/* routes
export const ADMIN_EMAILS = [
  "luca@sammapix.com",
  "samma1997@gmail.com",
  "lucasamm97@gmail.com",
];
