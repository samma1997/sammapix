import { PlanLimits } from "@/types/user";
import { ImageFormat } from "@/types/image";

// File limits
export const MAX_FILE_SIZE_FREE = 10 * 1024 * 1024; // 10MB
export const MAX_FILE_SIZE_PRO = 50 * 1024 * 1024; // 50MB
export const MAX_FILES_FREE = 5;
export const MAX_FILES_PRO = 100;

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
};

export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

// Plan limits
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    maxFiles: MAX_FILES_FREE,
    aiRenamePerDay: AI_RENAME_FREE_PER_DAY,
    maxFileSizeBytes: MAX_FILE_SIZE_FREE,
    zipDownload: false,
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
export const PRICE_PRO_YEARLY = 49;

// App info
export const APP_NAME = "SammaPix";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com";
export const APP_DESCRIPTION =
  "The fastest free image optimizer. Compress, convert to WebP, and AI-rename your images — no signup needed.";

// Blog post slugs
export const BLOG_SLUGS = [
  "ai-image-renaming-seo",
  "tinypng-alternative",
  "remove-exif-data-photos",
  "compress-images-for-website",
  "jpg-to-webp-converter",
  "reduce-image-size-without-losing-quality",
  "best-image-format-for-web",
  "image-seo-guide",
  "compress-png-without-losing-quality",
  "optimize-images-wordpress",
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
