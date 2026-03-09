import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/layout/HeroSection";
import { getAllTrips } from "@/lib/destinations";
import {
  ToolCard,
  type ToolCardData,
  IconCompress,
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

export const metadata = {
  title: "SammaPix — Free Image Tools for Photographers | Compress, WebP, EXIF, AI Rename",
  description:
    "Free browser-based image tools: compress JPG/PNG/WebP, convert to WebP, remove EXIF/GPS data, AI rename for SEO, batch resize, film effects and more. No uploads. No account needed.",
  keywords: [
    "image compressor",
    "free image tools",
    "webp converter",
    "exif remover",
    "ai image rename",
    "batch resize",
    "film effects",
    "photo tools",
  ],
  alternates: { canonical: "https://sammapix.com" },
  openGraph: {
    title: "SammaPix — Free Image Tools for Photographers",
    description:
      "Compress, convert, rename and edit images in your browser. Free forever. No uploads.",
    url: "https://sammapix.com",
    type: "website",
  },
};

// ─── Tool data ────────────────────────────────────────────────────────────────

const TOOLS: ToolCardData[] = [
  {
    name: "Crunch",
    href: "/tools/compress",
    tagline: "Compress, convert to WebP, and AI-rename your photos — all in one tool.",
    accent: "#6366F1",
    badges: ["100% Free", "WebP", "AI Rename"],
    Icon: IconCompress,
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
  {
    name: "HEIC Converter",
    href: "/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["100% Free", "iPhone", "Batch"],
    Icon: IconHEIC,
  },
];

// ─── Trust items ──────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "Images never leave your browser",
  "No account required for core tools",
  "Works on mobile, tablet, desktop",
  "HEIC supported everywhere",
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Is SammaPix completely free?",
    answer:
      "Yes. Compress, convert, resize, remove EXIF and more are free forever. No signup required.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. All processing happens in your browser using JavaScript. Your images never leave your device.",
  },
  {
    question: "What image formats does SammaPix support?",
    answer:
      "JPG, PNG, WebP, GIF, HEIC and more depending on the tool.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed for most tools. AI Rename requires a free account to prevent API abuse.",
  },
];

// ─── Portfolio Preview ────────────────────────────────────────────────────────

function PortfolioPreview() {
  const trips = getAllTrips();
  // Show first trip (Sri Lanka) — 6 photos preview
  const featured = trips[0];
  const preview = featured.photos.slice(0, 6);

  return (
    <section className="py-14 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-1">
              Travel Portfolio
            </p>
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {featured.destination} — {new Date(featured.startDate).getFullYear()}
            </h2>
          </div>
          <Link
            href={`/portfolio/${featured.slug}`}
            className="text-sm text-gray-500 dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            View all {featured.photos.length} photos →
          </Link>
        </div>

        {/* 3-col masonry preview */}
        <div className="flex gap-1">
          {[0, 1, 2].map(ci => (
            <div key={ci} className="flex flex-col gap-1 flex-1">
              {preview.filter((_, i) => i % 3 === ci).map(photo => (
                <Link key={photo.id} href={`/portfolio/${featured.slug}`}>
                  <div className="relative w-full overflow-hidden rounded-sm group" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={photo.srcThumb}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-sm" />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Altri viaggi */}
        {trips.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {trips.slice(1).map(trip => (
              <Link
                key={trip.slug}
                href={`/portfolio/${trip.slug}`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#2A2A2A] text-gray-500 dark:text-[#737373] hover:border-gray-400 dark:hover:border-[#525252] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                {trip.destination} {new Date(trip.startDate).getFullYear()}
              </Link>
            ))}
            <Link
              href="/portfolio"
              className="text-xs px-3 py-1.5 rounded-full bg-[#171717] dark:bg-white text-white dark:text-[#171717] font-medium"
            >
              All trips →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "SammaPix",
        url: "https://sammapix.com",
        logo: "https://sammapix.com/icon.svg",
        description:
          "Free browser-based image optimization tools for photographers and web developers.",
      },
      {
        "@type": "WebSite",
        name: "SammaPix",
        url: "https://sammapix.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://sammapix.com/tools?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Tools section */}
      <section className="py-14 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Free Image Tools for Photographers
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#A3A3A3]">
              Browser-based — no uploads, no account required for the basics.
            </p>
          </div>

          {/* Tool grid — 1 col mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>

          {/* Trust strip */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]"
            role="list"
          >
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-[#A3A3A3]">
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

      {/* Portfolio preview */}
      <PortfolioPreview />

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xs text-gray-400 dark:text-[#737373] uppercase tracking-widest mb-2">FAQ</h2>
            <p className="text-sm text-gray-500 dark:text-[#A3A3A3]">Common questions about SammaPix.</p>
          </div>
          <dl className="divide-y divide-gray-100 dark:divide-[#2A2A2A]">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.question}
                </dt>
                <dd className="text-sm text-gray-500 dark:text-[#A3A3A3] leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
