import { PlanLimits } from "@/types/user";
import { ImageFormat } from "@/types/image";

// File limits
export const MAX_FILE_SIZE_FREE = 20 * 1024 * 1024; // 20MB
export const MAX_FILE_SIZE_PRO = 50 * 1024 * 1024; // 50MB
export const MAX_FILES_FREE = 100;
export const MAX_FILES_PRO = 500;

// GeoSort limits
export const MAX_GEOSORT_FREE = 100;
export const MAX_GEOSORT_PRO = 500;

// HEIC Converter limits
export const MAX_HEIC_FREE = 100;
export const MAX_HEIC_PRO = 500;

// AI Rename limits
export const AI_RENAME_FREE_PER_DAY = 5;
export const AI_RENAME_PRO_PER_DAY = 200;

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

// Plan limits
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    maxFiles: MAX_FILES_FREE,
    aiRenamePerDay: AI_RENAME_FREE_PER_DAY,
    maxFileSizeBytes: MAX_FILE_SIZE_FREE,
    zipDownload: true,
    ads: true,
  },
  pro: {
    maxFiles: MAX_FILES_PRO,
    aiRenamePerDay: AI_RENAME_PRO_PER_DAY,
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
export const PRICE_PRO_MONTHLY = 7;
export const PRICE_PRO_YEARLY = 59;

// App info
export const APP_NAME = "SammaPix";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com";
export const APP_DESCRIPTION =
  "The fastest free image optimizer. Compress, convert to WebP, and AI-rename your images — no signup needed.";

// Blog post slugs - must match actual directories
export const BLOG_SLUGS = [
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
  "image-sizes-social-media-2026",
  "iphone-heic-to-jpg-guide",
  "make-images-load-faster-website",
  "optimize-images-wordpress-guide",
  "organize-travel-photos-by-country",
  "reduce-image-size-for-email",
  "remove-exif-protect-privacy",
  "remove-gps-from-photos",
  "travel-photography-tips-beginners",
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

// Admin emails — allowed to access /admin/* routes
export const ADMIN_EMAILS = ["luca@sammapix.com", "samma1997@gmail.com", "lucasamm97@gmail.com"];
