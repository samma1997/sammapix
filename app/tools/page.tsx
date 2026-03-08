import React from "react";
import type { Metadata } from "next";
import {
  ToolCard,
  type ToolCardData,
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
} from "@/components/ui/ToolCard";

export const metadata: Metadata = {
  title: "Free Image Tools for Photographers | SammaPix",
  description:
    "Browser-based image tools for photographers — compress, WebP, AI rename, GeoSort, EXIF and more. No upload, no account needed.",
  alternates: { canonical: "https://sammapix.com/tools" },
};

// ─── Tool data ────────────────────────────────────────────────────────────────

const TOOLS: ToolCardData[] = [
  {
    name: "Compress",
    href: "/tools/compress",
    tagline: "Shrink JPG, PNG, WebP, GIF — no quality loss. Up to 90% smaller.",
    accent: "#6366F1",
    badges: ["100% Free", "No Signup", "Browser-only"],
    Icon: IconCompress,
  },
  {
    name: "WebP",
    href: "/tools/compress",
    tagline: "Convert any image to WebP. 25–34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["100% Free", "Browser-only"],
    Icon: IconWebP,
  },
  {
    name: "AI Rename",
    href: "/tools/compress",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["Free", "AI-powered", "Gemini Flash"],
    Icon: IconAIRename,
  },
  {
    name: "EXIF Lens",
    href: "/tools/exif",
    tagline: "Strip GPS, camera data and all metadata from photos.",
    accent: "#EF4444",
    badges: ["100% Free", "Privacy", "Browser-only"],
    Icon: IconEXIF,
  },
  {
    name: "FilmLab",
    href: "/tools/filmlab",
    tagline: "14 analog film presets — Kodak Gold, Fuji, Ilford and 8 Samma originals.",
    accent: "#F59E0B",
    badges: ["100% Free", "HEIC support"],
    Icon: IconFilmLab,
  },
  {
    name: "StampIt",
    href: "/tools/stampit",
    tagline: "Batch watermark with text or logo. 9 positions + tiled filigrana.",
    accent: "#06B6D4",
    badges: ["100% Free", "Batch"],
    Icon: IconStampIt,
  },
  {
    name: "CropRatio",
    href: "/tools/croproatio",
    tagline: "Crop to exact ratios — 1:1, 16:9, 4:3, A4 and more.",
    accent: "#EC4899",
    badges: ["100% Free", "Browser-only"],
    Icon: IconCropRatio,
  },
  {
    name: "TwinHunt",
    href: "/tools/twinhunt",
    tagline: "Perceptual hashing finds exact and near-duplicate photos.",
    accent: "#F97316",
    badges: ["100% Free", "pHash"],
    Icon: IconTwinHunt,
  },
  {
    name: "GeoSort",
    href: "/tools/geosort",
    tagline: "Sort photos by country using GPS EXIF data.",
    accent: "#22C55E",
    badges: ["100% Free", "HEIC", "GPS"],
    Icon: IconGeoSort,
  },
  {
    name: "TravelMap",
    href: "/tools/travelmap",
    tagline: "Generate an interactive map from your travel photos.",
    accent: "#3B82F6",
    badges: ["100% Free", "GPS"],
    Icon: IconTravelMap,
  },
  {
    name: "ResizePack",
    href: "/tools/resizepack",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    accent: "#14B8A6",
    badges: ["100% Free", "Social presets"],
    Icon: IconResizePack,
  },
  {
    name: "Cull",
    href: "/tools/cull",
    tagline: "Rate and cull a shoot in minutes. Star rating system.",
    accent: "#F43F5E",
    badges: ["100% Free", "HEIC"],
    Icon: IconCull,
  },
];

// ─── Trust items ──────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "Images never leave your browser",
  "No account required for core tools",
  "Works on mobile, tablet, desktop",
  "HEIC supported everywhere",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="border-b border-gray-100 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-18">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Image Tools
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] leading-tight mb-3 max-w-xl">
            Every tool you need. All free. No account required.
          </h1>
          <p className="text-sm text-gray-500 max-w-lg leading-relaxed mb-6">
            12 browser-based image tools — nothing uploaded, nothing stored. Works on any device.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["12 tools", "100% free", "Works offline"].map((stat) => (
              <span key={stat} className="flex items-center gap-1.5 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] inline-block" aria-hidden="true" />
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-gray-100 bg-[#FAFAFA] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3" role="list">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <circle cx="8" cy="8" r="7.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.5"/>
                  <path d="M5 8 L7 10 L11 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
