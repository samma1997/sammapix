import React from "react";
import Link from "next/link";
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
  IconHEIC,
} from "@/components/ui/ToolCard";

export const metadata: Metadata = {
  title: "13 Free Image Tools for Photographers & Developers | SammaPix",
  description:
    "Complete suite of 13 free browser-based image tools. Compress JPG/PNG, convert WebP, AI rename, remove EXIF, batch process, apply film effects. No uploads, no account needed for core tools.",
  keywords: [
    "free image tools",
    "image compressor",
    "webp converter",
    "photo editing tools",
    "ai image rename",
    "batch image processing",
    "online photo tools",
    "browser-based image editor",
    "exif remover",
    "heic converter",
    "image optimizer",
  ],
  alternates: { canonical: "https://sammapix.com/tools" },
  openGraph: {
    title: "13 Free Image Tools for Photographers & Developers",
    description:
      "Compress, convert, rename, resize, remove EXIF, apply film effects, batch process and more. All in browser. No uploads. No account needed.",
    url: "https://sammapix.com/tools",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — 13 Free Image Tools",
      },
    ],
  },
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
    href: "/tools/webp",
    tagline: "Convert any image to WebP. 25–34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["100% Free", "Browser-only"],
    Icon: IconWebP,
  },
  {
    name: "AI Rename",
    href: "/tools/ai-rename",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["Free", "AI-powered", "Gemini Flash"],
    Icon: IconAIRename,
  },
  {
    name: "HEIC Converter",
    href: "/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["100% Free", "iPhone", "Batch"],
    Icon: IconHEIC,
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
  const toolsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Free Image Tools for Photographers",
        url: "https://sammapix.com/tools",
        description: "Suite of 13 browser-based image optimization tools",
        publisher: {
          "@type": "Organization",
          name: "SammaPix",
          url: "https://sammapix.com",
        },
      },
      {
        "@type": "ItemList",
        name: "SammaPix Tools",
        description: "13 free browser-based image optimization tools",
        numberOfItems: 13,
        itemListElement: [
          {
            "@type": "SoftwareApplication",
            position: 1,
            name: "Compress",
            url: "https://sammapix.com/tools/compress",
            description: "Compress JPG, PNG, WebP, GIF up to 80-90% smaller without quality loss",
            applicationCategory: "PhotographyApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "SoftwareApplication",
            position: 2,
            name: "WebP Converter",
            url: "https://sammapix.com/tools/webp",
            description: "Convert images to WebP format, 25-34% smaller than JPEG",
            applicationCategory: "PhotographyApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "SoftwareApplication",
            position: 3,
            name: "AI Rename",
            url: "https://sammapix.com/tools/ai-rename",
            description: "AI-generated SEO-optimized filenames and alt text using Gemini Flash",
            applicationCategory: "PhotographyApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-18">
          <p className="text-xs font-medium text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-4">
            Image Tools
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-3 max-w-xl">
            Every tool you need. All free. No account required.
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] max-w-lg leading-relaxed mb-6">
            14 browser-based image tools — nothing uploaded, nothing stored. Works on any device.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["14 tools", "100% free", "Works offline"].map((stat) => (
              <span key={stat} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-[#737373]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] inline-block" aria-hidden="true" />
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Tool Comparison at a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Tool</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Function</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Free</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Batch</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Browser</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">Compress</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">Reduce file size JPG, PNG, WebP, GIF</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">WebP</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">Convert to modern WebP format</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">AI Rename</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">Generate SEO filenames + alt text</td>
                  <td className="py-3 px-2 text-center text-green-600">Free tier</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-orange-600">⚙</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">EXIF Lens</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">Remove GPS + metadata from photos</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">ResizePack</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">Resize for Instagram, Twitter, LinkedIn</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">FilmLab</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">14 analog film presets for photos</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                  <td className="py-3 px-2 text-center text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#737373] mt-4">
            ✓ = Yes · ⚙ = API-powered (hybrid) · Free tier = Limited quota, Pro unlimited
          </p>
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            All Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3" role="list">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-[#A3A3A3]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="7.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.5"/>
                  <path d="M5 8 L7 10 L11 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Convert section */}
      <section className="border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Quick Convert
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#A3A3A3]">
              One-click conversion utilities for popular image formats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/convert/heic-to-jpg"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                HEIC to JPG
              </h3>
            </Link>

            <Link
              href="/convert/heic-to-png"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                HEIC to PNG
              </h3>
            </Link>

            <Link
              href="/convert/png-to-webp"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                PNG to WebP
              </h3>
            </Link>

            <Link
              href="/convert/png-to-jpg"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                PNG to JPG
              </h3>
            </Link>

            <Link
              href="/convert/jpg-to-webp"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                JPG to WebP
              </h3>
            </Link>

            <Link
              href="/convert/webp-to-jpg"
              className="group block bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                WebP to JPG
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Resize for Social Media section */}
      <section className="border-t border-gray-100 dark:border-[#2A2A2A] bg-white dark:bg-[#191919] py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Resize for Social Media
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#A3A3A3]">
              Quick resize utilities optimized for popular social platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/resize/instagram"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Instagram
              </h3>
            </Link>

            <Link
              href="/resize/facebook"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Facebook
              </h3>
            </Link>

            <Link
              href="/resize/twitter"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Twitter
              </h3>
            </Link>

            <Link
              href="/resize/tiktok"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                TikTok
              </h3>
            </Link>

            <Link
              href="/resize/youtube-thumbnail"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                YouTube Thumbnail
              </h3>
            </Link>

            <Link
              href="/resize/linkedin"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                LinkedIn
              </h3>
            </Link>

            <Link
              href="/resize/pinterest"
              className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Pinterest
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog guides section */}
      <section className="border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919] py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Learn & Master Image Optimization
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#A3A3A3]">
              Read guides on image compression, SEO, format conversion, and photography workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/blog/compress-images-without-losing-quality"
              className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#737373] dark:text-[#A3A3A3] mb-2 inline-block">
                Compression
              </span>
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Compress Images Without Quality Loss
              </h3>
            </Link>

            <Link
              href="/blog/ai-image-renaming-seo-guide"
              className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#737373] dark:text-[#A3A3A3] mb-2 inline-block">
                SEO
              </span>
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                AI Image Renaming for SEO
              </h3>
            </Link>

            <Link
              href="/blog/iphone-heic-to-jpg-guide"
              className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#737373] dark:text-[#A3A3A3] mb-2 inline-block">
                FORMAT CONVERSION
              </span>
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Convert HEIC to JPG Free
              </h3>
            </Link>

            <Link
              href="/blog/image-sizes-social-media-2026"
              className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
            >
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#737373] dark:text-[#A3A3A3] mb-2 inline-block">
                SOCIAL MEDIA
              </span>
              <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                Image Sizes for Social Media 2026
              </h3>
            </Link>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#6366F1] opacity-80 hover:opacity-100 transition-opacity"
          >
            View all articles
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
