import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import OnboardingController from "@/components/onboarding/OnboardingController";
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

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: "SammaPix — AI Photo Workflow Platform for Content Creators",
  description:
    "Compress, rename with AI, resize, convert — all in one pipeline. 13 free browser-based tools. No uploads. No account needed. HEIC support included.",
  keywords: [
    "ai photo workflow",
    "image compressor",
    "free image tools",
    "webp converter",
    "ai image rename",
    "batch resize",
    "heic converter",
    "photo tools for content creators",
    "browser image processing",
  ],
  alternates: { canonical: "https://sammapix.com" },
  openGraph: {
    title: "SammaPix — AI Photo Workflow for Content Creators",
    description:
      "Compress, rename with AI, resize, convert — all in one pipeline. 13 free tools. No uploads.",
    url: "https://sammapix.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — AI Photo Workflow Platform for Content Creators",
      },
    ],
  },
};

// ─── Tool data ────────────────────────────────────────────────────────────────

const TOOLS_OPTIMIZE: ToolCardData[] = [
  {
    name: "Compress",
    href: "/tools/compress",
    tagline: "Shrink JPG, PNG, WebP, GIF — no quality loss. Up to 90% smaller.",
    accent: "#6366F1",
    badges: ["100% Free", "Up to 90% smaller"],
    Icon: IconCompress,
  },
  {
    name: "WebP",
    href: "/tools/webp",
    tagline: "Convert any image to WebP. 25–34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["100% Free", "25-34% smaller"],
    Icon: IconWebP,
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
    name: "CropRatio",
    href: "/tools/croproatio",
    tagline: "Crop to exact ratios — 1:1, 16:9, 4:3, A4 and more.",
    accent: "#EC4899",
    badges: ["100% Free", "9 ratios"],
    Icon: IconCropRatio,
  },
];

const TOOLS_AI: ToolCardData[] = [
  {
    name: "AI Rename",
    href: "/tools/ai-rename",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["AI-powered", "Gemini Flash"],
    Icon: IconAIRename,
  },
  {
    name: "EXIF Lens",
    href: "/tools/exif",
    tagline: "Strip GPS, camera data and all metadata from photos.",
    accent: "#EF4444",
    badges: ["100% Free", "Privacy"],
    Icon: IconEXIF,
  },
];

const TOOLS_ORGANIZE: ToolCardData[] = [
  {
    name: "GeoSort",
    href: "/tools/geosort",
    tagline: "Sort photos by country using GPS EXIF data.",
    accent: "#22C55E",
    badges: ["100% Free", "GPS"],
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
    name: "TwinHunt",
    href: "/tools/twinhunt",
    tagline: "Perceptual hashing finds exact and near-duplicate photos.",
    accent: "#F97316",
    badges: ["100% Free", "pHash"],
    Icon: IconTwinHunt,
  },
  {
    name: "Cull",
    href: "/tools/cull",
    tagline: "Rate and cull a shoot in minutes. Star rating system.",
    accent: "#F43F5E",
    badges: ["100% Free", "Star rating"],
    Icon: IconCull,
  },
];

const TOOLS_EDIT: ToolCardData[] = [
  {
    name: "FilmLab",
    href: "/tools/filmlab",
    tagline: "14 analog film presets — Kodak Gold, Fuji, Ilford and 8 Samma originals.",
    accent: "#F59E0B",
    badges: ["100% Free", "14 presets"],
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
    name: "HEIC Converter",
    href: "/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["100% Free", "iPhone", "Batch"],
    Icon: IconHEIC,
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Is SammaPix completely free?",
    answer:
      "Yes. All 13 tools are free forever — compress, convert, resize, rename and more. Pro unlocks the AI Workflow pipeline and removes limits. No signup required for free tools.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. All processing happens in your browser using JavaScript. Your images never leave your device — not even for the AI Workflow pipeline (except the AI Rename step, which sends a thumbnail to Google Gemini).",
  },
  {
    question: "What is the AI Workflow pipeline?",
    answer:
      "The AI Workflow lets Pro users run the full sequence — Compress, AI Rename, Resize, WebP convert — in a single click and download all results as a ZIP. Free users can use each tool individually.",
  },
  {
    question: "What image formats does SammaPix support?",
    answer:
      "JPG, PNG, WebP, GIF, and HEIC (iPhone) are supported across all tools. Some tools have additional format support noted on their page.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed for 12 of 13 tools. AI Rename requires a free account to prevent Gemini API abuse. Pro plan requires an account.",
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
          "AI-powered photo workflow platform for content creators. 13 free browser-based tools.",
        sameAs: [
          "https://twitter.com/lucasammarco",
          "https://github.com/lucasammarco",
          "https://lucasammarco.com",
        ],
        founder: {
          "@type": "Person",
          name: "Luca Sammarco",
          url: "https://lucasammarco.com",
          knowsAbout: [
            "Photography",
            "Travel Photography",
            "Web Development",
            "Full-Stack Development",
            "Image Optimization",
          ],
        },
        knowsAbout: [
          "AI photo workflow",
          "Image compression",
          "WebP conversion",
          "EXIF metadata removal",
          "Image resizing",
          "Batch image processing",
          "AI image renaming",
          "Image format conversion",
          "HEIC conversion",
          "Image optimization for web",
          "Photography workflow optimization",
          "Privacy-preserving image tools",
          "Browser-based image processing",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "support@sammapix.com",
          url: "https://sammapix.com",
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
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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

      {/* ── Onboarding modal + personalized tools (client-only) ── */}
      <OnboardingController />

      {/* ── 1. AI Workflow Pipeline ── */}
      <section className="py-14 px-4 sm:px-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#6366F1] mb-2 inline-block">
              Pro Feature
            </span>
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              AI Workflow Pipeline
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] max-w-lg">
              Pro users run the full pipeline in one click. Free users can use each tool individually.
            </p>
          </div>

          {/* Pipeline visual */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              "Drop photos",
              "Compress",
              "AI Rename",
              "Resize",
              "WebP",
              "Download ZIP",
            ].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-medium">
                    {step}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#404040] flex-shrink-0" strokeWidth={1.5} />
                )}
              </React.Fragment>
            ))}
          </div>

          <Link
            href="/tools/workflow"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 transition-colors"
          >
            Try AI Workflow
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ── 2. Tool Grid ── */}
      <section className="py-14 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              13 Free Tools
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Browser-based — no uploads, no account required for the basics.
            </p>
          </div>

          {/* Optimize */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              Optimize
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TOOLS_OPTIMIZE.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>

          {/* AI-Powered */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              AI-Powered
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS_AI.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>

          {/* Organize */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              Organize
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TOOLS_ORGANIZE.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>

          {/* Edit & Convert */}
          <div>
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              Edit &amp; Convert
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOOLS_EDIT.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How SammaPix Works ── */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              How SammaPix works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Drop your photos",
                body: "Drag & drop any image format. HEIC, WebP, JPG, PNG — all supported.",
              },
              {
                step: "2",
                title: "Choose your tools",
                body: "Use them one by one for free, or run the AI Workflow pipeline as a Pro user.",
              },
              {
                step: "3",
                title: "Download results",
                body: "Get optimized images instantly. No watermarks. No accounts needed for free tools.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Who uses SammaPix ── */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Who uses SammaPix
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Travel Bloggers",
                body: "Optimize entire photo sets for blog posts — compress, rename for SEO, and sort by country automatically.",
              },
              {
                title: "E-commerce Sellers",
                body: "Product photos ready for Shopify, Amazon, and Etsy in minutes. Batch resize and WebP convert at once.",
              },
              {
                title: "Social Media Managers",
                body: "Batch resize for every platform preset — Instagram, Twitter, LinkedIn — without leaving the browser.",
              },
              {
                title: "Web Developers",
                body: "Compress and convert to WebP for Core Web Vitals. Strip EXIF and reduce payload size in one workflow.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg"
              >
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.title}
                </p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Stats bar ── */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { value: "1.2M+", label: "Images optimized" },
            { value: "13+", label: "Free tools" },
            { value: "100%", label: "Browser-based" },
            { value: "0", label: "Files uploaded to servers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5]">{stat.value}</p>
              <p className="text-xs text-[#737373] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Blog guides ── */}
      <section className="py-14 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Learn Image Optimization
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Guides and tips to master image compression, SEO, and photography workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href: "/blog/ai-image-renaming-seo-guide",
                tag: "SEO",
                title: "How AI Image Renaming Boosts Your SEO",
                summary:
                  "Transform generic filenames into keyword-rich names that rank in Google Image Search.",
              },
              {
                href: "/blog/compress-images-without-losing-quality",
                tag: "PERFORMANCE",
                title: "Compress Images Without Losing Quality",
                summary:
                  "The right formats, quality settings, and tools for fast web images.",
              },
              {
                href: "/blog/iphone-heic-to-jpg-guide",
                tag: "TOOLS",
                title: "Convert iPhone HEIC Photos to JPG Free",
                summary: "Step-by-step guide without software or uploads needed.",
              },
              {
                href: "/blog/organize-travel-photos-by-country",
                tag: "TOOLS",
                title: "Organize Travel Photos by Country Automatically",
                summary: "Use GPS EXIF data to sort photos without manual work.",
              },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group block bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 hover:border-[#A3A3A3] dark:hover:border-[#444] transition-all"
              >
                <span className="text-[10px] font-medium bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] mb-3 inline-block">
                  {article.tag}
                </span>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2 group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{article.summary}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
            >
              Read all articles
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-60"
                aria-hidden="true"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Quick actions ── */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Quick actions
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Resize for Instagram", href: "/resize/instagram" },
              { name: "Resize for YouTube", href: "/resize/youtube-thumbnail" },
              { name: "Convert HEIC to JPG", href: "/convert/heic-to-jpg" },
              { name: "Convert PNG to WebP", href: "/convert/png-to-webp" },
              { name: "Convert JPG to WebP", href: "/convert/jpg-to-webp" },
              { name: "All conversions", href: "/convert" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#A3A3A3] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {link.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xs text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
              FAQ
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Common questions about SammaPix.
            </p>
          </div>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.question}
                </dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
