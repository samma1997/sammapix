import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: "SammaPix — AI Photo Workflow Platform for Content Creators",
  description:
    "Compress, rename with AI, resize, convert — all in one pipeline. 20 free browser-based tools. No uploads. No account needed. HEIC and video support included.",
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
      "Compress, rename with AI, resize, convert — all in one pipeline. 20 free tools. No uploads.",
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

// ─── Video tool icons & data ──────────────────────────────────────────────────

const IconVideoThumbHome: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hpvt-scan { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(16px); } }
      @keyframes hpvt-play { 0%, 60% { transform: scale(0.8); opacity: 0.5; } 80%, 100% { transform: scale(1); opacity: 1; } }
      .hpvt-scan { animation: hpvt-scan 2.4s ease-in-out infinite; }
      .hpvt-play { transform-origin: 14px 20px; animation: hpvt-play 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <rect x="2" y="10" width="44" height="22" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    {[5, 13, 21, 29, 37].map((x) => (
      <React.Fragment key={x}>
        <rect x={x} y="12" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
        <rect x={x} y="26" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
      </React.Fragment>
    ))}
    <rect x="6" y="17" width="12" height="8" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
    <g className="hpvt-play"><path d="M11 18.5 L11 23.5 L16 21 Z" fill={accent}/></g>
    <g className="hpvt-scan"><line x1="19" y1="10" x2="19" y2="32" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.7"/></g>
    <path d="M34 36 L34 44 M30 40 L34 44 L38 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconVideoCompressHome: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hpvc-sq { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.7); } }
      @keyframes hpvc-al { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(4px); } }
      @keyframes hpvc-ar { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-4px); } }
      .hpvc-body { transform-origin: 24px 22px; animation: hpvc-sq 2s ease-in-out infinite; }
      .hpvc-al { animation: hpvc-al 2s ease-in-out infinite; }
      .hpvc-ar { animation: hpvc-ar 2s ease-in-out infinite; }
    `}</style>
    <g className="hpvc-body">
      <rect x="8" y="16" width="32" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="16" width="32" height="6" rx="2" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.25"/>
      <line x1="16" y1="16" x2="14" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="22" y1="16" x2="20" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="28" y1="16" x2="26" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <path d="M20 27 L20 33 L26 30 Z" fill={accent} fillOpacity="0.6"/>
    </g>
    <g className="hpvc-al"><path d="M4 22 L8 19 M4 22 L8 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>
    <g className="hpvc-ar"><path d="M44 22 L40 19 M44 22 L40 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>
  </svg>
);

const IconVideoGifHome: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hpvg-fr { 0%, 100% { opacity: 1; } 33% { opacity: 0.4; } 66% { opacity: 0.7; } }
      @keyframes hpvg-lp { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .hpvg-f1 { animation: hpvg-fr 1.8s ease-in-out 0s infinite; }
      .hpvg-f2 { animation: hpvg-fr 1.8s ease-in-out 0.6s infinite; }
      .hpvg-f3 { animation: hpvg-fr 1.8s ease-in-out 1.2s infinite; }
      .hpvg-loop { transform-origin: 34px 34px; animation: hpvg-lp 2.4s linear infinite; }
    `}</style>
    <g className="hpvg-f1"><rect x="4" y="8" width="20" height="15" rx="2" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25" strokeOpacity="0.4"/></g>
    <g className="hpvg-f2"><rect x="7" y="11" width="20" height="15" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.25" strokeOpacity="0.6"/></g>
    <g className="hpvg-f3">
      <rect x="10" y="14" width="20" height="15" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <path d="M17 18 L17 23 L23 20.5 Z" fill={accent} fillOpacity="0.7"/>
    </g>
    <text x="4" y="38" fontSize="7" fill={accent} fontWeight="800" fontFamily="monospace" letterSpacing="1">GIF</text>
    <g className="hpvg-loop">
      <path d="M34 29 A5 5 0 1 1 29 34" stroke={accent} strokeWidth="1.75" strokeLinecap="round" fill="none"/>
      <path d="M28 30 L29 34 L33 33" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
  </svg>
);

const IconTranscribeHome: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hptr-wv { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
      @keyframes hptr-ln { 0%, 100% { opacity: 0.3; transform: scaleX(0.6); } 50% { opacity: 1; transform: scaleX(1); } }
      .hptr-b1 { transform-origin: 8px 22px; animation: hptr-wv 1.2s ease-in-out 0s infinite; }
      .hptr-b2 { transform-origin: 12px 22px; animation: hptr-wv 1.2s ease-in-out 0.15s infinite; }
      .hptr-b3 { transform-origin: 16px 22px; animation: hptr-wv 1.2s ease-in-out 0.3s infinite; }
      .hptr-b4 { transform-origin: 20px 22px; animation: hptr-wv 1.2s ease-in-out 0.45s infinite; }
      .hptr-b5 { transform-origin: 24px 22px; animation: hptr-wv 1.2s ease-in-out 0.6s infinite; }
      .hptr-l1 { transform-origin: 28px 31px; animation: hptr-ln 1.8s ease-in-out 0s infinite; }
      .hptr-l2 { transform-origin: 28px 36px; animation: hptr-ln 1.8s ease-in-out 0.4s infinite; }
      .hptr-l3 { transform-origin: 28px 41px; animation: hptr-ln 1.8s ease-in-out 0.8s infinite; }
    `}</style>
    <g className="hptr-b1"><rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <g className="hptr-b2"><rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="hptr-b3"><rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/></g>
    <g className="hptr-b4"><rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="hptr-b5"><rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="hptr-l1"><rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="hptr-l2"><rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="hptr-l3"><rect x="28" y="39" width="14" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
  </svg>
);

const IconVideoResizeHome: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hpvrs-w { 0%, 40%, 100% { opacity: 1; transform: scale(1); } 60%, 80% { opacity: 0.2; transform: scale(0.9); } }
      @keyframes hpvrs-t { 0%, 40%, 100% { opacity: 0.2; transform: scale(0.9); } 60%, 80% { opacity: 1; transform: scale(1); } }
      .hpvrs-wide { transform-origin: 13px 22px; animation: hpvrs-w 2.4s ease-in-out infinite; }
      .hpvrs-tall { transform-origin: 35px 24px; animation: hpvrs-t 2.4s ease-in-out infinite; }
    `}</style>
    <g className="hpvrs-wide">
      <rect x="2" y="16" width="22" height="12" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <text x="6" y="25" fontSize="5" fill={accent} fontWeight="700" fontFamily="monospace" fillOpacity="0.7">16:9</text>
    </g>
    <path d="M26 22 L30 22 M28 20 L30 22 L28 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="hpvrs-tall">
      <rect x="28" y="10" width="18" height="28" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <text x="31" y="27" fontSize="5" fill={accent} fontWeight="700" fontFamily="monospace" fillOpacity="0.7">9:16</text>
    </g>
  </svg>
);

const TOOLS_VIDEO: ToolCardData[] = [
  {
    name: "Transcribe",
    href: "/tools/transcribe",
    tagline: "AI transcription with timestamps. SRT subtitles in seconds.",
    accent: "#0891B2",
    badges: ["AI-powered", "Gemini Flash"],
    Icon: IconTranscribeHome,
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Is SammaPix completely free?",
    answer:
      "Yes. All 20 tools are free forever — compress, convert, resize, rename, video tools and more. Pro unlocks the AI Workflow pipeline and removes limits. No signup required for free tools.",
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
      "No account needed for most tools. AI Rename and Transcribe require a free account to prevent Gemini API abuse. Pro plan requires an account.",
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
          "AI-powered photo and video workflow platform for content creators. 20 free browser-based tools.",
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
              20 Free Tools
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
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              Edit &amp; Convert
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOOLS_EDIT.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>

          {/* Video */}
          <div>
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-3">
              Video
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOOLS_VIDEO.map((tool) => (
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
            { value: "20", label: "Free tools" },
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
