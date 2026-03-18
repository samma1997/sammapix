// i18n system removed- site is English-only.
// This file is kept as a thin shim in case any legacy import references it.

export type Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en"];
export const DEFAULT_LOCALE: Locale = "en";
export const COUNTRY_TO_LOCALE: Record<string, Locale> = {};

export interface Dict {
  hero: {
    badge_privacy: string;
    badge_ai: string;
    title_1: string;
    title_2: string;
    subtitle: string;
    stat_images: string;
    stat_free: string;
    stat_signup: string;
  };
  dropzone: {
    title: string;
    click: string;
    subtitle: string;
  };
  toolbar: {
    quality: string;
    convert_webp: string;
    ai_rename: string;
    compress_all: string;
    download_all: string;
    clear: string;
  };
  features: {
    compress_title: string;
    compress_desc: string;
    webp_title: string;
    webp_desc: string;
    ai_title: string;
    ai_desc: string;
  };
  privacy: {
    title: string;
    desc: string;
  };
  pro_banner: {
    title: string;
    desc: string;
    cta: string;
  };
  nav: {
    tools: string;
    pricing: string;
    blog: string;
    signin: string;
    get_pro: string;
    signout: string;
  };
}

export const en: Dict = {
  hero: {
    badge_privacy: "Images never leave your browser",
    badge_ai: "Now with AI Rename powered by Gemini",
    title_1: "Optimize images in seconds.",
    title_2: "Free, fast, private.",
    subtitle: "Compress JPG, PNG, WebP. Convert to WebP. AI-rename for SEO.\nNo signup needed.",
    stat_images: "10,000+ images optimized",
    stat_free: "100% free",
    stat_signup: "No signup needed",
  },
  dropzone: {
    title: "Drop images here or",
    click: "click to upload",
    subtitle: "PNG, JPG, WebP, GIF- up to 10MB each",
  },
  toolbar: {
    quality: "Quality",
    convert_webp: "Convert to WebP",
    ai_rename: "AI Rename",
    compress_all: "Compress all",
    download_all: "Download all",
    clear: "Clear",
  },
  features: {
    compress_title: "Smart Compress",
    compress_desc: "Up to 80% smaller. JPG, PNG, WebP, GIF. All in your browser- nothing uploaded.",
    webp_title: "Convert to WebP",
    webp_desc: "Google's next-gen format. 30% smaller than JPEG with same quality.",
    ai_title: "AI Rename",
    ai_desc: "Gemini reads your image and generates an SEO-optimized filename + alt text.",
  },
  privacy: {
    title: "Your images never leave your browser",
    desc: "All processing happens locally using your device's CPU. No uploads, no servers, no data retention. The only exception is AI Rename, which sends a thumbnail to Google Gemini for analysis.",
  },
  pro_banner: {
    title: "Need more? Go Pro.",
    desc: "Unlimited files, 200 AI renames/day, bulk ZIP download, and zero ads- all for $7/month.",
    cta: "View pricing",
  },
  nav: {
    tools: "Tools",
    pricing: "Pricing",
    blog: "Blog",
    signin: "Sign in",
    get_pro: "Get Pro →",
    signout: "Sign out",
  },
};

export const dictionaries: Record<Locale, Dict> = { en };

export function getDict(_locale?: string): Dict {
  return en;
}
