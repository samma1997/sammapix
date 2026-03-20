"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  PenLine,
  ShoppingBag,
  Code,
  Share2,
  Crown,
  ArrowRight,
  Download,
  X,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";
import {
  ToolCard,
  IconCompress,
  IconWebP,
  IconAIRename,
  IconEXIF,
  IconFilmLab,
  IconStampIt,
  IconCropRatio,
  IconTwinHunt,
  IconGeoSort,
  IconTravelMap,
  IconResizePack,
  IconCull,
  IconHEIC,
  type ToolCardData,
} from "@/components/ui/ToolCard";

// ─── Local icons (same as ToolsPageClient) ──────────────────────────────────

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-alt-pulse { 0%, 100% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1); } }
      @keyframes dh-alt-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      .dh-alt-img { transform-origin: 13px 20px; animation: dh-alt-pulse 2s ease-in-out infinite; }
      .dh-alt-cursor { animation: dh-alt-cursor 0.9s step-end infinite; }
    `}</style>
    <g className="dh-alt-img">
      <rect x="2" y="8" width="22" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 22 L9 16 L14 20 L18 16 L24 22" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="4" y="30" width="40" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="9" y="39" fontSize="6" fill={accent} fontWeight="700" fontFamily="monospace">alt=</text>
    <rect x="26" y="33" width="13" height="6" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="0.75"/>
    <rect className="dh-alt-cursor" x="27" y="34.5" width="1.25" height="3" rx="0.5" fill={accent}/>
  </svg>
);

const IconTranscribe: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-tr-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
      .dh-tr-b1 { transform-origin: 8px 22px; animation: dh-tr-wave 1.2s ease-in-out 0s infinite; }
      .dh-tr-b2 { transform-origin: 12px 22px; animation: dh-tr-wave 1.2s ease-in-out 0.15s infinite; }
      .dh-tr-b3 { transform-origin: 16px 22px; animation: dh-tr-wave 1.2s ease-in-out 0.3s infinite; }
      .dh-tr-b4 { transform-origin: 20px 22px; animation: dh-tr-wave 1.2s ease-in-out 0.45s infinite; }
      .dh-tr-b5 { transform-origin: 24px 22px; animation: dh-tr-wave 1.2s ease-in-out 0.6s infinite; }
    `}</style>
    <g className="dh-tr-b1"><rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <g className="dh-tr-b2"><rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="dh-tr-b3"><rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/></g>
    <g className="dh-tr-b4"><rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="dh-tr-b5"><rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
    <rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
  </svg>
);

const IconWebLift: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-wl-lift { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
      @keyframes dh-wl-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      .dh-wl-lift { animation: dh-wl-lift 2s ease-in-out infinite; }
      .dh-wl-glow { animation: dh-wl-glow 2s ease-in-out infinite; }
    `}</style>
    <g className="dh-wl-lift">
      <rect x="4" y="10" width="20" height="16" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="7" y="13" width="8" height="5" rx="1" fill={accent} fillOpacity="0.25"/>
    </g>
    <path d="M26 18 L30 18 M28 16 L30 18 L28 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="dh-wl-glow">
      <rect x="32" y="12" width="14" height="12" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="39" y="20" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">.webp</text>
    </g>
    <path d="M24 30 L24 38 M20 34 L24 38 L28 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="39" width="20" height="6" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1"/>
    <text x="24" y="44" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">SEO</text>
  </svg>
);

const IconBlogDrop: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-bd-drop { 0%, 30% { transform: translateY(-6px); opacity: 0; } 60%, 100% { transform: translateY(0); opacity: 1; } }
      .dh-bd-drop { animation: dh-bd-drop 2.2s ease-out infinite; }
    `}</style>
    <rect x="8" y="4" width="32" height="40" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <g className="dh-bd-drop">
      <rect x="12" y="8" width="24" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <path d="M14 18 L20 14 L26 17 L34 12" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <line x1="12" y1="27" x2="36" y2="27" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="12" y1="31" x2="30" y2="31" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <rect x="30" y="36" width="12" height="8" rx="2" fill={accent}/>
    <text x="36" y="42" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">BLOG</text>
  </svg>
);

const IconBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-bn-count { 0%, 33% { opacity: 1; } 34%, 66% { opacity: 0.4; } 67%, 100% { opacity: 1; } }
      .dh-bn-n1 { animation: dh-bn-count 3s ease-in-out 0s infinite; }
      .dh-bn-n2 { animation: dh-bn-count 3s ease-in-out 1s infinite; }
      .dh-bn-n3 { animation: dh-bn-count 3s ease-in-out 2s infinite; }
    `}</style>
    <rect x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dh-bn-n1" x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dh-bn-n2" x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dh-bn-n3" x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
    <path d="M38 14 L42 14 M38 24 L42 24 M38 34 L42 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
    <path d="M40 10 L40 38" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"/>
  </svg>
);

const IconPdfToImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-pdf-flip { 0%, 20% { transform: translateX(0px); } 50% { transform: translateX(5px); } 80%, 100% { transform: translateX(0px); } }
      @keyframes dh-pdf-img { 0%, 30% { opacity: 0; transform: scale(0.8); } 55%, 88% { opacity: 1; transform: scale(1); } 98%, 100% { opacity: 0; transform: scale(0.8); } }
      .dh-pdf-doc { animation: dh-pdf-flip 2.6s ease-in-out infinite; }
      .dh-pdf-img { transform-origin: 36px 30px; animation: dh-pdf-img 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <g className="dh-pdf-doc">
      <rect x="4" y="4" width="22" height="30" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="9" y="9" width="8" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="9" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="9" y="17" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="15" y="29" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    <path d="M28 18 L32 18 M30 16 L32 18 L30 20" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="dh-pdf-img" style={{ opacity: 0 }}>
      <rect x="32" y="20" width="14" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <circle cx="36" cy="24" r="1.5" fill={accent} fillOpacity="0.5"/>
      <path d="M33 32 L36 28 L39 31 L41 28" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="31" y="36" width="15" height="7" rx="1.5" fill={accent}/>
    <text x="38.5" y="41.5" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
  </svg>
);

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-ss-shuffle { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(3px); } }
      .dh-ss-f1 { animation: dh-ss-shuffle 2s ease-in-out 0s infinite; }
      .dh-ss-f2 { animation: dh-ss-shuffle 2s ease-in-out 0.3s infinite; }
    `}</style>
    <g className="dh-ss-f1">
      <rect x="2" y="6" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <rect x="4" y="8" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    </g>
    <g className="dh-ss-f2">
      <rect x="2" y="22" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <rect x="4" y="24" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    </g>
    <path d="M20 12 L26 8 M20 28 L26 22" stroke={accent} strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5"/>
    <rect x="28" y="4" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">A</text>
    <rect x="28" y="22" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="31" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">B</text>
  </svg>
);


// ─── Constants ────────────────────────────────────────────────────────────────

const LS_PERSONA_KEY = "sammapix-persona";
const LS_INSTALL_DISMISSED_KEY = "sammapix-install-banner-dismissed";

// ─── Persona config ───────────────────────────────────────────────────────────

const PERSONA_LABELS: Record<Persona, { label: string; Icon: LucideIcon }> = {
  photographer: { label: "Photographer", Icon: Camera },
  blogger: { label: "Blogger / Content Creator", Icon: PenLine },
  ecommerce: { label: "E-commerce Seller", Icon: ShoppingBag },
  developer: { label: "Web Developer", Icon: Code },
  social: { label: "Social Media Manager", Icon: Share2 },
};

const PERSONAS: {
  id: Persona;
  label: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  { id: "photographer", label: "Photographer", description: "Shoots, edits, and delivers galleries", Icon: Camera },
  { id: "blogger", label: "Blogger / Content Creator", description: "Publishes articles with lots of images", Icon: PenLine },
  { id: "ecommerce", label: "E-commerce Seller", description: "Product photos for online stores", Icon: ShoppingBag },
  { id: "developer", label: "Web Developer", description: "Optimizes images for fast websites", Icon: Code },
  { id: "social", label: "Social Media Manager", description: "Creates content for multiple platforms", Icon: Share2 },
];

// ─── Persona -> Tool mappings ────────────────────────────────────────────────

const PERSONA_TOOL_MAP: Record<Persona, string[]> = {
  photographer: ["cull", "compress", "ai-rename", "filmlab", "geosort", "travelmap", "exif", "weblift", "smartsort"],
  blogger: ["compress", "ai-rename", "alt-text", "webp", "blogdrop", "resizepack", "batchname"],
  ecommerce: ["compress", "ai-rename", "resizepack", "stampit", "webp", "batchname"],
  developer: ["compress", "webp", "resizepack", "exif", "croproatio", "batchname"],
  social: ["compress", "resizepack", "croproatio", "filmlab", "stampit", "batchname"],
};

// ─── Category types ──────────────────────────────────────────────────────────

type Category = "All" | "Optimize" | "AI" | "Creative" | "Organize" | "Workflows";

const CATEGORIES: Category[] = ["All", "Optimize", "AI", "Creative", "Organize", "Workflows"];

// ─── Tool data (matching /tools page style with dashboard hrefs) ─────────────

interface DashToolEntry extends ToolCardData {
  slug: string;
  category: Category[];
  isCombo?: boolean;
  /** Extra keywords for smart search — matches user intent, not just tool name */
  keywords: string[];
}

/** Suggested search phrases shown as placeholder rotation */
const SEARCH_SUGGESTIONS = [
  "make my photos smaller",
  "rename files for SEO",
  "convert HEIC from iPhone",
  "resize for Instagram",
  "remove metadata from photos",
  "add watermark to images",
  "find duplicate photos",
  "sort photos by location",
  "create subtitles from video",
  "convert images to WebP",
];

const ALL_DASH_TOOLS: DashToolEntry[] = [
  // Optimize
  {
    name: "Compress",
    slug: "compress",
    href: "/dashboard/tools/compress",
    tagline: "Shrink JPG, PNG, WebP, GIF -- no quality loss. Up to 90% smaller.",
    accent: "#6366F1",
    badges: ["Free", "Up to 90% smaller"],
    Icon: IconCompress,
    category: ["Optimize"],
    keywords: ["make photos smaller", "reduce file size", "optimize images", "shrink", "lighter", "weight", "kb", "mb", "slow website", "page speed", "too big", "too heavy"],
  },
  {
    name: "WebP Converter",
    slug: "webp",
    href: "/dashboard/tools/webp",
    tagline: "Convert any image to WebP. 25-34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["Free", "25-34% smaller"],
    Icon: IconWebP,
    category: ["Optimize"],
    keywords: ["convert format", "change format", "webp", "modern format", "next gen", "jpg to webp", "png to webp", "save as webp"],
  },
  {
    name: "HEIC Converter",
    slug: "heic",
    href: "/dashboard/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["Free", "iPhone", "Batch"],
    Icon: IconHEIC,
    category: ["Optimize"],
    keywords: ["iphone photos", "heic to jpg", "apple photos", "cant open photos", "heif", "ios", "convert iphone"],
  },
  {
    name: "PDF to Image",
    slug: "pdf-to-image",
    href: "/dashboard/tools/pdf-to-image",
    tagline: "Convert each PDF page to JPG, PNG, or WebP. Adjustable resolution. ZIP download.",
    accent: "#6366F1",
    badges: ["Free", "No upload"],
    Icon: IconPdfToImage,
    category: ["Optimize"],
    keywords: ["pdf to jpg", "pdf to png", "extract pages", "document to image", "screenshot pdf", "convert pdf"],
  },
  {
    name: "Batch Resize",
    slug: "resizepack",
    href: "/dashboard/tools/resizepack",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    accent: "#14B8A6",
    badges: ["Free", "Social presets"],
    Icon: IconResizePack,
    category: ["Optimize"],
    keywords: ["resize", "dimensions", "pixels", "instagram size", "facebook size", "twitter size", "thumbnail", "social media", "make bigger", "make smaller", "scale"],
  },
  {
    name: "Crop & Ratio",
    slug: "croproatio",
    href: "/dashboard/tools/croproatio",
    tagline: "Crop to exact ratios -- 1:1, 16:9, 4:3, A4 and more.",
    accent: "#EC4899",
    badges: ["Free", "9 ratios"],
    Icon: IconCropRatio,
    category: ["Optimize"],
    keywords: ["crop", "cut", "aspect ratio", "square", "portrait", "landscape", "16:9", "4:3", "1:1", "trim", "a4", "print"],
  },

  // AI
  {
    name: "AI Rename",
    slug: "ai-rename",
    href: "/dashboard/tools/ai-rename",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconAIRename,
    category: ["AI"],
    keywords: ["rename files", "seo filename", "seo name", "image name", "file name", "optimize name", "google images", "search engine"],
  },
  {
    name: "AI Alt Text",
    slug: "alt-text",
    href: "/dashboard/tools/alt-text",
    tagline: "Generate accessibility-compliant alt text for images using Gemini AI.",
    accent: "#8B5CF6",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconAltText,
    category: ["AI"],
    keywords: ["alt text", "alt tag", "accessibility", "screen reader", "a11y", "description", "wcag", "seo alt"],
  },
  {
    name: "Transcribe",
    slug: "transcribe",
    href: "/dashboard/tools/transcribe",
    tagline: "AI transcription with timestamps. SRT subtitles in seconds.",
    accent: "#0891B2",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconTranscribe,
    category: ["AI"],
    keywords: ["subtitles", "captions", "srt", "speech to text", "video to text", "audio to text", "transcript", "closed captions"],
  },
  {
    name: "Web Optimize",
    slug: "weblift",
    href: "/dashboard/tools/weblift",
    tagline: "Compress, convert to WebP, and AI-rename in one click.",
    accent: "#3B82F6",
    badges: ["Login required", "Multi-step"],
    Icon: IconWebLift,
    category: ["AI"],
    isCombo: true,
    keywords: ["web ready", "website images", "optimize for web", "page speed", "lighthouse", "core web vitals", "fast website"],
  },
  {
    name: "AI Photo Sort",
    slug: "smartsort",
    href: "/dashboard/tools/smartsort",
    tagline: "AI analyzes images and sorts them into categories automatically.",
    accent: "#22C55E",
    badges: ["AI-powered", "Login required"],
    Icon: IconSmartSort,
    category: ["AI"],
    keywords: ["organize photos", "sort images", "categorize", "classify", "auto folder", "group photos", "smart folders"],
  },

  // Workflows
  {
    name: "Blog Ready",
    slug: "blogdrop",
    href: "/dashboard/tools/blogdrop",
    tagline: "Blog-ready images in one drop. Compress, resize, WebP, SEO names.",
    accent: "#8B5CF6",
    badges: ["Login required", "Multi-step"],
    Icon: IconBlogDrop,
    category: ["Workflows"],
    isCombo: true,
    keywords: ["blog images", "wordpress", "article photos", "blog post", "content images", "publish"],
  },

  // Creative
  {
    name: "Film Filters",
    slug: "filmlab",
    href: "/dashboard/tools/filmlab",
    tagline: "14 analog film presets -- Kodak Gold, Fuji, Ilford and 8 Samma originals.",
    accent: "#F59E0B",
    badges: ["Free", "14 presets"],
    Icon: IconFilmLab,
    category: ["Creative"],
    keywords: ["filter", "preset", "vintage", "analog", "film look", "kodak", "fuji", "retro", "color grade", "mood"],
  },
  {
    name: "Watermark",
    slug: "stampit",
    href: "/dashboard/tools/stampit",
    tagline: "Batch watermark with text or logo. 9 positions + tiled filigrana.",
    accent: "#06B6D4",
    badges: ["Free", "Batch"],
    Icon: IconStampIt,
    category: ["Creative"],
    keywords: ["watermark", "logo", "copyright", "stamp", "protect photos", "brand", "overlay text", "signature"],
  },

  // Organize
  {
    name: "EXIF Viewer",
    slug: "exif",
    href: "/dashboard/tools/exif",
    tagline: "Strip GPS, camera data and all metadata from photos.",
    accent: "#EF4444",
    badges: ["Free", "Privacy"],
    Icon: IconEXIF,
    category: ["Organize"],
    keywords: ["metadata", "gps", "location data", "privacy", "remove data", "camera info", "exif data", "strip metadata", "where was photo taken"],
  },
  {
    name: "Find Duplicates",
    slug: "twinhunt",
    href: "/dashboard/tools/twinhunt",
    tagline: "Perceptual hashing finds exact and near-duplicate photos.",
    accent: "#F97316",
    badges: ["Free", "pHash"],
    Icon: IconTwinHunt,
    category: ["Organize"],
    keywords: ["duplicates", "duplicate photos", "same photo", "similar images", "clean up", "free space", "delete copies"],
  },
  {
    name: "Sort by Location",
    slug: "geosort",
    href: "/dashboard/tools/geosort",
    tagline: "Sort photos by country using GPS EXIF data.",
    accent: "#22C55E",
    badges: ["Free", "GPS"],
    Icon: IconGeoSort,
    category: ["Organize"],
    keywords: ["sort by country", "organize by place", "travel photos", "gps sort", "location sort", "where taken", "group by city"],
  },
  {
    name: "Photo Map",
    slug: "travelmap",
    href: "/dashboard/tools/travelmap",
    tagline: "Generate an interactive map from your travel photos.",
    accent: "#3B82F6",
    badges: ["Free", "GPS"],
    Icon: IconTravelMap,
    category: ["Organize"],
    keywords: ["map", "travel map", "photo map", "where i traveled", "trip map", "gps map", "pin photos on map"],
  },
  {
    name: "Cull",
    slug: "cull",
    href: "/dashboard/tools/cull",
    tagline: "Rate and cull a shoot in minutes. Star rating system.",
    accent: "#F43F5E",
    badges: ["Free", "Star rating"],
    Icon: IconCull,
    category: ["Organize"],
    keywords: ["cull photos", "rate photos", "star rating", "select best", "pick photos", "review shoot", "delete bad photos", "lightroom cull"],
  },
  {
    name: "Batch Rename",
    slug: "batchname",
    href: "/dashboard/tools/batchname",
    tagline: "Rename files with a custom pattern. No AI, 100% client-side, unlimited.",
    accent: "#F59E0B",
    badges: ["Free", "Unlimited"],
    Icon: IconBatchName,
    category: ["Organize"],
    keywords: ["rename many files", "bulk rename", "pattern rename", "sequential", "number files", "prefix", "suffix"],
  },
];

// ─── Search icon ─────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardHomeProps {
  userName: string | null;
  userPlan: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardHome({ userName, userPlan }: DashboardHomeProps) {
  const isPro = userPlan === "pro";
  const firstName = userName?.split(" ")[0] ?? "there";
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [personaSkipped, setPersonaSkipped] = useState(false);
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [query, setQuery] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("What do you want to do? (e.g. make photos smaller)");

  // Rotate search placeholder suggestions
  useEffect(() => {
    if (query) return; // Don't rotate while user is typing
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % SEARCH_SUGGESTIONS.length;
      setSearchPlaceholder(`Try: "${SEARCH_SUGGESTIONS[idx]}"`);
    }, 3500);
    return () => clearInterval(interval);
  }, [query]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const loadPersona = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY);
    if (!stored) {
      setShowPersonaSelector(true);
    } else if (stored === "skipped") {
      setPersonaSkipped(true);
      setShowPersonaSelector(false);
    } else {
      setPersona(stored as Persona);
      setShowPersonaSelector(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadPersona();
    const dismissed = localStorage.getItem(LS_INSTALL_DISMISSED_KEY);
    if (!dismissed) setShowInstallBanner(true);
  }, [loadPersona]);

  // Dispatch custom event when persona changes so sidebar can react
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("sammapix-persona-change", { detail: persona }));
  }, [persona]);

  function handlePersonaSelect(p: Persona) {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_PERSONA_KEY, p);
    }
    setPersona(p);
    setShowPersonaSelector(false);
    setPersonaSkipped(false);
  }

  function handleChangeRole() {
    setShowPersonaSelector(true);
    setPersona(null);
    setPersonaSkipped(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_PERSONA_KEY);
    }
  }

  function handleSkipSurvey() {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_PERSONA_KEY, "skipped");
    }
    setPersonaSkipped(true);
    setShowPersonaSelector(false);
  }

  async function handleUpgradeClick() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", credentials: "include" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push("/dashboard/upgrade");
      }
    } catch {
      router.push("/dashboard/upgrade");
    } finally {
      setCheckoutLoading(false);
    }
  }

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    let result: DashToolEntry[] = ALL_DASH_TOOLS;

    // If persona is active and not searching, show persona-filtered view
    if (persona && !showPersonaSelector && !query.trim() && activeCategory === "All") {
      return result; // handled separately below
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category.includes(activeCategory));
    }

    // Filter by search query (matches name, tagline, AND smart keywords)
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
          // Also match if any word in query matches any keyword
          q.split(/\s+/).some((word) =>
            word.length >= 3 && t.keywords.some((kw) => kw.toLowerCase().includes(word))
          )
      );
    }

    return result;
  }, [query, activeCategory, persona, showPersonaSelector]);

  const isSearching = query.trim().length > 0;
  const isFiltering = activeCategory !== "All" || isSearching;

  // Persona-based recommended/other split
  const recommendedSlugs = persona ? PERSONA_TOOL_MAP[persona] : [];
  const recommendedTools = persona
    ? ALL_DASH_TOOLS.filter((t) => recommendedSlugs.includes(t.slug))
    : [];
  const otherTools = persona
    ? ALL_DASH_TOOLS.filter((t) => !recommendedSlugs.includes(t.slug))
    : [];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="h-5 w-5 rounded-full border-2 border-[#171717] dark:border-[#E5E5E5] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16 space-y-8">

      {/* -- Welcome + Plan status -- */}
      <section>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-1.5">
              Welcome back, {firstName}
            </h1>
            {persona && !showPersonaSelector &&
              (() => {
                const { label, Icon } = PERSONA_LABELS[persona];
                return (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-[#6366F1] bg-[#6366F1]/8 dark:bg-[#6366F1]/15 px-2 py-0.5 rounded">
                      <Icon className="h-3 w-3" strokeWidth={1.5} />
                      {label}
                    </span>
                    <button
                      onClick={handleChangeRole}
                      className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
                    >
                      Change
                    </button>
                  </div>
                );
              })()}
            {personaSkipped && !showPersonaSelector && (
              <button
                onClick={handleChangeRole}
                className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
              >
                Set your role to get recommendations
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isPro ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-2 py-0.5 rounded">
                <Crown className="h-3 w-3" strokeWidth={1.5} />
                PRO
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A]">
                Free
              </span>
            )}
          </div>
        </div>

        {/* AI limits */}
        <div className="flex items-center gap-2 text-xs text-[#737373] mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" strokeWidth={1.5} />
          <span>
            AI tools: {isPro ? "unlimited" : "10/day"} {!isPro && " -- "}
            {!isPro && (
              <button onClick={handleUpgradeClick} disabled={checkoutLoading} className="text-[#6366F1] hover:underline">
                {checkoutLoading ? "Redirecting..." : "Upgrade for unlimited"}
              </button>
            )}
          </span>
        </div>

        {/* Install app banner */}
        {showInstallBanner && (
          <div className="mb-5 flex items-start gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <Download className="h-4 w-4 text-[#A3A3A3] dark:text-[#525252] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">Install SammaPix app</p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">
                Add to your desktop for instant access. Click the install icon in your browser&apos;s address bar.
              </p>
            </div>
            <button
              onClick={() => { localStorage.setItem(LS_INSTALL_DISMISSED_KEY, "1"); setShowInstallBanner(false); }}
              aria-label="Dismiss install banner"
              className="shrink-0 p-1 rounded text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Inline persona selector */}
        {showPersonaSelector && (
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              What do you use SammaPix for?
            </h2>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-4">
              We will show you the most relevant tools for your workflow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PERSONAS.map(({ id, label, description, Icon }) => (
                <button
                  key={id}
                  onClick={() => handlePersonaSelect(id)}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] text-left hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
                >
                  <Icon className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">{label}</p>
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">{description}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleSkipSurvey}
              className="mt-3 text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors underline-offset-2 hover:underline"
            >
              Skip for now
            </button>
          </div>
        )}
      </section>

      {/* -- Sticky search bar + Category tabs -- */}
      <section className="sticky top-14 md:top-0 z-30 bg-white dark:bg-[#191919] md:bg-white/95 md:dark:bg-[#191919]/95 md:backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 -mt-2 border-b border-[#E5E5E5] dark:border-[#333] md:border-b-0">
        <div className="flex flex-col gap-2.5">
          {/* Search input */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] dark:text-[#525252] pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Search tools — describe what you want to do"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A]
                         bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5]
                         placeholder-[#A3A3A3] dark:placeholder-[#525252]
                         focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent
                         shadow-sm transition-all"
            />
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: "none" }}
            role="tablist"
            aria-label="Filter tools by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setQuery("");
                }}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${activeCategory === cat
                    ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                    : "bg-transparent text-gray-500 dark:text-[#737373] hover:bg-gray-100 dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* -- Tool grid -- */}
      {isFiltering ? (
        /* Filtered/searched view */
        <section>
          <p className="text-xs text-gray-400 dark:text-[#525252] mb-5">
            {isSearching
              ? `${filteredTools.length} result${filteredTools.length !== 1 ? "s" : ""} for "${query}"`
              : `${filteredTools.length} tool${filteredTools.length !== 1 ? "s" : ""} in ${activeCategory}`}
          </p>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => (
                <div key={tool.slug} className="relative h-full">
                  {tool.isCombo && (
                    <span
                      className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                                 bg-[#525252] dark:bg-[#737373] text-white px-2 py-0.5 rounded-full pointer-events-none"
                    >
                      MULTI-STEP
                    </span>
                  )}
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-500 dark:text-[#737373]">
                No tools found. Try a different search.
              </p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-xs text-[#6366F1] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : persona && !showPersonaSelector ? (
        /* Persona-filtered view with recommended + others */
        <>
          <section>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6366F1] mb-4">
              Recommended for you
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendedTools.map((tool) => (
                <div key={tool.slug} className="relative h-full">
                  {tool.isCombo && (
                    <span
                      className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                                 bg-[#525252] dark:bg-[#737373] text-white px-2 py-0.5 rounded-full pointer-events-none"
                    >
                      MULTI-STEP
                    </span>
                  )}
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-4">
              All other tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherTools.map((tool) => (
                <div key={tool.slug} className="relative h-full opacity-60 hover:opacity-100 transition-opacity">
                  {tool.isCombo && (
                    <span
                      className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                                 bg-[#525252] dark:bg-[#737373] text-white px-2 py-0.5 rounded-full pointer-events-none"
                    >
                      MULTI-STEP
                    </span>
                  )}
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Default: all tools */
        <section>
          <p className="text-xs text-gray-400 dark:text-[#525252] mb-5">
            {ALL_DASH_TOOLS.length} tools
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_DASH_TOOLS.map((tool) => (
              <div key={tool.slug} className="relative h-full">
                {tool.isCombo && (
                  <span
                    className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                               bg-[#525252] dark:bg-[#737373] text-white px-2 py-0.5 rounded-full pointer-events-none"
                  >
                    MULTI-STEP
                  </span>
                )}
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* -- Upgrade pitch for free users -- */}
      {!isPro && (
        <section>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">Unlimited AI, no ads, ZIP downloads. $7/mo.</p>
              </div>
              <button
                onClick={handleUpgradeClick}
                disabled={checkoutLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 disabled:opacity-60 transition-colors shrink-0"
              >
                {checkoutLoading ? "Redirecting..." : "Upgrade to Pro"}
                {!checkoutLoading && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
