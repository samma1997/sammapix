import React from "react";
import type { Metadata } from "next";
import { ToolsPageClient } from "@/components/tools/ToolsPageClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "22 Free Image & Video Tools for Photographers & Developers | SammaPix",
  description:
    "Complete suite of 22 free browser-based image and video tools. Compress JPG/PNG, convert WebP, AI rename, AI alt text, combo tools, remove EXIF, batch process, apply film effects. No uploads, no account needed for core tools.",
  keywords: [
    "free image tools",
    "image compressor",
    "webp converter",
    "photo editing tools",
    "ai image rename",
    "ai alt text generator",
    "video thumbnail picker",
    "batch image processing",
    "online photo tools",
    "browser-based image editor",
    "exif remover",
    "heic converter",
    "image optimizer",
  ],
  alternates: { canonical: "https://sammapix.com/tools" },
  openGraph: {
    title: "22 Free Image & Video Tools for Photographers & Developers",
    description:
      "Compress, convert, rename, resize, remove EXIF, apply film effects, batch process and more. All in browser. No uploads. No account needed.",
    url: "https://sammapix.com/tools",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix -- 22 Free Image & Video Tools",
      },
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Free Image Tools for Photographers",
        url: "https://sammapix.com/tools",
        description: "Suite of 22 browser-based image and video optimization tools",
        publisher: {
          "@type": "Organization",
          name: "SammaPix",
          url: "https://sammapix.com",
        },
      },
      {
        "@type": "ItemList",
        name: "SammaPix Tools",
        description: "22 free browser-based image and video optimization tools",
        numberOfItems: 22,
        itemListElement: [
          {
            "@type": "SoftwareApplication",
            position: 1,
            name: "Compress",
            url: "https://sammapix.com/tools/compress",
            description: "Compress JPG, PNG, WebP, GIF up to 80-90% smaller without quality loss",
            applicationCategory: "PhotographyApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@type": "SoftwareApplication",
            position: 2,
            name: "WebP Converter",
            url: "https://sammapix.com/tools/webp",
            description: "Convert images to WebP format, 25-34% smaller than JPEG",
            applicationCategory: "PhotographyApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@type": "SoftwareApplication",
            position: 3,
            name: "AI Rename",
            url: "https://sammapix.com/tools/ai-rename",
            description: "AI-generated SEO-optimized filenames and alt text using Gemini Flash",
            applicationCategory: "PhotographyApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-xs font-medium text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-4">
            All Tools
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-3 max-w-xl">
            Everything you need to optimize, rename, resize and organize your images
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] max-w-lg leading-relaxed">
            22 free browser-based tools. No uploads, no signup needed for most tools.
          </p>
        </div>
      </section>

      {/* Client component: search, tabs, grid, use cases, trust */}
      <ToolsPageClient />

      {/* Comparison table */}
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
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">What it does</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Free?</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Needs login?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  // ── Single tools ──
                  { name: "Compress",        fn: "Reduce file size for JPG, PNG, WebP, GIF",           free: true, login: false },
                  { name: "WebP Converter",  fn: "Convert any image to modern WebP format",            free: true, login: false },
                  { name: "HEIC Converter",  fn: "Convert iPhone HEIC photos to JPG or WebP",          free: true, login: false },
                  { name: "ResizePack",      fn: "Resize for Instagram, Twitter, LinkedIn presets",    free: true, login: false },
                  { name: "CropRatio",       fn: "Crop to exact ratios -- 1:1, 16:9, 4:3, A4",        free: true, login: false },
                  { name: "AI Rename",       fn: "AI-generated SEO filenames using Gemini",            free: true, login: true },
                  { name: "AI Alt Text",     fn: "Generate accessibility-compliant alt text with AI",  free: true, login: true },
                  { name: "Transcribe",      fn: "AI video/audio transcription with SRT subtitles",   free: true, login: true },
                  { name: "FilmLab",         fn: "14 analog film presets -- Kodak, Fuji, Ilford",      free: true, login: false },
                  { name: "StampIt",         fn: "Batch watermark with text or logo, 9 positions",    free: true, login: false },
                  { name: "EXIF Lens",       fn: "Strip GPS, camera data, and all metadata",          free: true, login: false },
                  { name: "TwinHunt",        fn: "Find exact and near-duplicate photos",              free: true, login: false },
                  { name: "GeoSort",         fn: "Sort photos by country using GPS EXIF data",        free: true, login: false },
                  { name: "TravelMap",       fn: "Generate interactive map from travel photos",       free: true, login: false },
                  { name: "Cull",            fn: "Rate and cull a shoot with star ratings",           free: true, login: false },
                  // ── Combo tools ──
                  { name: "WebLift",         fn: "Compress + WebP + AI Rename in one click",          free: true, login: true },
                  { name: "BlogDrop",        fn: "Compress + resize + WebP + SEO blog names",         free: true, login: true },
                  { name: "ShopShot",        fn: "E-commerce: compress + resize + WebP + product names", free: true, login: true },
                  { name: "InstaPrep",       fn: "Resize to 1080px + compress for Instagram",         free: true, login: false },
                  { name: "CleanDrop",       fn: "Strip metadata + compress + convert to WebP",       free: true, login: false },
                  { name: "PixShip",         fn: "Light compress + resize for client delivery",       free: true, login: false },
                  { name: "AI Workflow",     fn: "Custom multi-step pipeline with presets",            free: false, login: true },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors"
                  >
                    <td className="py-2.5 px-2 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.name}</td>
                    <td className="py-2.5 px-2 text-gray-600 dark:text-[#A3A3A3] text-sm">{row.fn}</td>
                    <td className="py-2.5 px-2 text-center">
                      {row.free ? (
                        <span className="text-green-600 text-sm">Yes</span>
                      ) : (
                        <span className="text-xs text-[#737373]">Pro</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {row.login ? (
                        <span className="text-xs text-[#737373]">Yes (free)</span>
                      ) : (
                        <span className="text-green-600 text-sm">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#737373] mt-4">
            All tools process images in your browser. AI tools send only a thumbnail to Google Gemini. Free tier includes 10 AI operations/day.
          </p>
        </div>
      </section>
    </div>
  );
}
