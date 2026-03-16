import React from "react";
import type { Metadata } from "next";
import { ToolsPageClient } from "@/components/tools/ToolsPageClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "20 Free Image & Video Tools for Photographers & Developers | SammaPix",
  description:
    "Complete suite of 20 free browser-based image and video tools. Compress JPG/PNG, convert WebP, AI rename, AI alt text, video thumbnail picker, remove EXIF, batch process, apply film effects. No uploads, no account needed for core tools.",
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
    title: "15 Free Image & Video Tools for Photographers & Developers",
    description:
      "Compress, convert, rename, resize, remove EXIF, apply film effects, batch process and more. All in browser. No uploads. No account needed.",
    url: "https://sammapix.com/tools",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — 15 Free Image & Video Tools",
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
        description: "Suite of 20 browser-based image and video optimization tools",
        publisher: {
          "@type": "Organization",
          name: "SammaPix",
          url: "https://sammapix.com",
        },
      },
      {
        "@type": "ItemList",
        name: "SammaPix Tools",
        description: "20 free browser-based image and video optimization tools",
        numberOfItems: 20,
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
            Image Tools
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-3 max-w-xl">
            Find the right tool
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] max-w-lg leading-relaxed">
            20 free browser-based tools. No uploads, no signup needed.
          </p>
        </div>
      </section>

      {/* Client component: search, tabs, grid, use cases, trust */}
      <ToolsPageClient />

      {/* Comparison table — at very bottom */}
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
                {[
                  { name: "Compress",        fn: "Reduce file size JPG, PNG, WebP, GIF",   free: "✓",         batch: "✓", browser: "✓" },
                  { name: "WebP",            fn: "Convert to modern WebP format",           free: "✓",         batch: "✓", browser: "✓" },
                  { name: "AI Rename",       fn: "Generate SEO filenames + alt text",       free: "Free tier", batch: "✓", browser: "⚙" },
                  { name: "EXIF Lens",       fn: "Remove GPS + metadata from photos",       free: "✓",         batch: "✓", browser: "✓" },
                  { name: "ResizePack",      fn: "Resize for Instagram, Twitter, LinkedIn", free: "✓",         batch: "✓", browser: "✓" },
                  { name: "FilmLab",         fn: "14 analog film presets for photos",       free: "✓",         batch: "✓", browser: "✓" },
                  { name: "AI Alt Text",     fn: "Generate accessibility alt text with AI", free: "Free tier", batch: "✓", browser: "⚙" },
                  { name: "Video Thumbnail", fn: "Extract best frame from video files",     free: "✓",         batch: "✓", browser: "✓" },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-gray-100 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] transition-colors"
                  >
                    <td className="py-3 px-2 font-medium text-[#171717] dark:text-[#E5E5E5]">{row.name}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-[#A3A3A3]">{row.fn}</td>
                    <td className={`py-3 px-2 text-center ${row.free === "✓" ? "text-green-600" : "text-gray-500 dark:text-[#737373] text-xs"}`}>
                      {row.free}
                    </td>
                    <td className="py-3 px-2 text-center text-green-600">{row.batch}</td>
                    <td className={`py-3 px-2 text-center ${row.browser === "✓" ? "text-green-600" : "text-orange-500"}`}>
                      {row.browser}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#737373] mt-4">
            ✓ = Yes · ⚙ = API-powered (hybrid) · Free tier = Limited quota, Pro unlimited
          </p>
        </div>
      </section>
    </div>
  );
}
