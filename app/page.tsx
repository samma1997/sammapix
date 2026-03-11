import React from "react";
import HeroSection from "@/components/layout/HeroSection";
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Free Image Tools for Photographers",
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
        sameAs: [
          "https://twitter.com/lucasammarco",
          "https://github.com/lucasammarco",
        ],
        founder: {
          "@type": "Person",
          name: "Luca Sammarco",
          url: "https://lucasammarco.com",
        },
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
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is SammaPix completely free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Compress, convert, resize, remove EXIF and more are free forever. No signup required.",
            },
          },
          {
            "@type": "Question",
            name: "Do my images get uploaded to a server?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. All processing happens in your browser using JavaScript. Your images never leave your device.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats does SammaPix support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG, PNG, WebP, GIF, HEIC and more depending on the tool.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to create an account?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No account needed for most tools. AI Rename requires a free account to prevent API abuse.",
            },
          },
        ],
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
