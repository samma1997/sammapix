"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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

// ─── Local icons (cannot modify ToolCard.tsx) ─────────────────────────────────

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes alt-pulse {
        0%, 100% { opacity: 0.5; transform: scale(0.95); }
        50%       { opacity: 1; transform: scale(1); }
      }
      .alt-img    { transform-origin: 13px 20px; animation: alt-pulse 2s ease-in-out infinite; }
      .alt-cursor { animation: alt-pulse 0.9s step-end infinite; }
    `}</style>
    <g className="alt-img">
      <rect x="2" y="8" width="22" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 22 L9 16 L14 20 L18 16 L24 22" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="4" y="30" width="40" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="9" y="39" fontSize="6" fill={accent} fontWeight="700" fontFamily="monospace">alt=</text>
    <rect x="26" y="33" width="13" height="6" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="0.75"/>
    <rect className="alt-cursor" x="27" y="34.5" width="1.25" height="3" rx="0.5" fill={accent}/>
  </svg>
);

const IconVideoThumb: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes vt-scan {
        0%, 100% { transform: translateX(0px); }
        50%       { transform: translateX(16px); }
      }
      @keyframes vt-play {
        0%, 60%  { transform: scale(0.8); opacity: 0.5; }
        80%, 100%{ transform: scale(1); opacity: 1; }
      }
      .vt-scan { animation: vt-scan 2.4s ease-in-out infinite; }
      .vt-play { transform-origin: 14px 20px; animation: vt-play 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <rect x="2" y="10" width="44" height="22" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    {[5, 13, 21, 29, 37].map((x) => (
      <React.Fragment key={x}>
        <rect x={x} y="12" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
        <rect x={x} y="26" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
      </React.Fragment>
    ))}
    <rect x="6" y="17" width="12" height="8" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
    <g className="vt-play">
      <path d="M11 18.5 L11 23.5 L16 21 Z" fill={accent}/>
    </g>
    <g className="vt-scan">
      <line x1="19" y1="10" x2="19" y2="32" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.7"/>
    </g>
    <path d="M34 36 L34 44 M30 40 L34 44 L38 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Optimize" | "AI" | "Organize" | "Edit" | "Pro";

interface ToolWithCategory extends ToolCardData {
  category: Category[];
  isPro?: boolean;
}

// ─── Tool data (lives here — icons are functions, cannot be serialized) ────────

const TOOLS: ToolWithCategory[] = [
  {
    name: "Compress",
    href: "/tools/compress",
    tagline: "Shrink JPG, PNG, WebP, GIF — no quality loss. Up to 90% smaller.",
    accent: "#6366F1",
    badges: ["100% Free", "No Signup", "Browser-only"],
    Icon: IconCompress,
    category: ["Optimize"],
  },
  {
    name: "WebP",
    href: "/tools/webp",
    tagline: "Convert any image to WebP. 25–34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["100% Free", "Browser-only"],
    Icon: IconWebP,
    category: ["Optimize"],
  },
  {
    name: "ResizePack",
    href: "/tools/resizepack",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    accent: "#14B8A6",
    badges: ["100% Free", "Social presets"],
    Icon: IconResizePack,
    category: ["Optimize"],
  },
  {
    name: "CropRatio",
    href: "/tools/croproatio",
    tagline: "Crop to exact ratios — 1:1, 16:9, 4:3, A4 and more.",
    accent: "#EC4899",
    badges: ["100% Free", "Browser-only"],
    Icon: IconCropRatio,
    category: ["Optimize"],
  },
  {
    name: "AI Rename",
    href: "/tools/ai-rename",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["Free", "AI-powered", "Gemini Flash"],
    Icon: IconAIRename,
    category: ["AI"],
  },
  {
    name: "AI Alt Text",
    href: "/tools/alt-text",
    tagline: "Generate accessibility-compliant alt text for images using Gemini AI.",
    accent: "#8B5CF6",
    badges: ["Free", "AI-powered", "Gemini Flash"],
    Icon: IconAltText,
    category: ["AI"],
  },
  {
    name: "GeoSort",
    href: "/tools/geosort",
    tagline: "Sort photos by country using GPS EXIF data.",
    accent: "#22C55E",
    badges: ["100% Free", "HEIC", "GPS"],
    Icon: IconGeoSort,
    category: ["Organize"],
  },
  {
    name: "TravelMap",
    href: "/tools/travelmap",
    tagline: "Generate an interactive map from your travel photos.",
    accent: "#3B82F6",
    badges: ["100% Free", "GPS"],
    Icon: IconTravelMap,
    category: ["Organize"],
  },
  {
    name: "TwinHunt",
    href: "/tools/twinhunt",
    tagline: "Perceptual hashing finds exact and near-duplicate photos.",
    accent: "#F97316",
    badges: ["100% Free", "pHash"],
    Icon: IconTwinHunt,
    category: ["Organize"],
  },
  {
    name: "Cull",
    href: "/tools/cull",
    tagline: "Rate and cull a shoot in minutes. Star rating system.",
    accent: "#F43F5E",
    badges: ["100% Free", "HEIC"],
    Icon: IconCull,
    category: ["Organize"],
  },
  {
    name: "FilmLab",
    href: "/tools/filmlab",
    tagline: "14 analog film presets — Kodak Gold, Fuji, Ilford and 8 Samma originals.",
    accent: "#F59E0B",
    badges: ["100% Free", "HEIC support"],
    Icon: IconFilmLab,
    category: ["Edit"],
  },
  {
    name: "StampIt",
    href: "/tools/stampit",
    tagline: "Batch watermark with text or logo. 9 positions + tiled filigrana.",
    accent: "#06B6D4",
    badges: ["100% Free", "Batch"],
    Icon: IconStampIt,
    category: ["Edit"],
  },
  {
    name: "HEIC Converter",
    href: "/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["100% Free", "iPhone", "Batch"],
    Icon: IconHEIC,
    category: ["Edit"],
  },
  {
    name: "Video Thumbnail",
    href: "/tools/video-thumb",
    tagline: "Extract the best frame from any video. Browse frames, AI picks the best.",
    accent: "#0EA5E9",
    badges: ["100% Free", "Browser-only", "MP4"],
    Icon: IconVideoThumb,
    category: ["Edit"],
  },
  {
    name: "EXIF Lens",
    href: "/tools/exif",
    tagline: "Strip GPS, camera data and all metadata from photos.",
    accent: "#EF4444",
    badges: ["100% Free", "Privacy", "Browser-only"],
    Icon: IconEXIF,
    category: ["Edit"],
  },
];

// ─── Category tabs config ─────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["All", "Optimize", "AI", "Organize", "Edit", "Pro"];

// ─── Use cases ────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    title: "I need to optimize images for my website",
    tools: [
      { name: "Compress", href: "/tools/compress" },
      { name: "WebP", href: "/tools/webp" },
      { name: "ResizePack", href: "/tools/resizepack" },
    ],
  },
  {
    title: "I need to rename photos for SEO",
    tools: [
      { name: "AI Rename", href: "/tools/ai-rename" },
      { name: "AI Alt Text", href: "/tools/alt-text" },
    ],
  },
  {
    title: "I need to prepare photos for social media",
    tools: [
      { name: "ResizePack", href: "/tools/resizepack" },
      { name: "CropRatio", href: "/tools/croproatio" },
      { name: "StampIt", href: "/tools/stampit" },
    ],
  },
  {
    title: "I need to organize travel photos",
    tools: [
      { name: "GeoSort", href: "/tools/geosort" },
      { name: "TravelMap", href: "/tools/travelmap" },
      { name: "Cull", href: "/tools/cull" },
    ],
  },
  {
    title: "I need to convert iPhone photos",
    tools: [
      { name: "HEIC Converter", href: "/tools/heic" },
    ],
  },
];

// ─── Trust items ──────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "Images never leave your browser",
  "No account required for core tools",
  "Works on mobile, tablet, desktop",
  "HEIC supported everywhere",
];

// ─── Search icon ──────────────────────────────────────────────────────────────

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

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ToolsPageClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredTools = useMemo(() => {
    let result = TOOLS;

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category.includes(activeCategory));
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q)
      );
    }

    return result;
  }, [query, activeCategory]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* ── Search + Category tabs ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white dark:bg-[#191919] border-b border-gray-100 dark:border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3">

          {/* Search input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#525252] pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools... (e.g. compress, resize, watermark)"
              aria-label="Search tools"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-[#2A2A2A]
                         bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5]
                         placeholder-gray-400 dark:placeholder-[#525252]
                         focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent
                         transition-all"
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
      </div>

      {/* ── Tool grid ──────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto">

          {/* Result count */}
          <p className="text-xs text-gray-400 dark:text-[#525252] mb-5">
            {isSearching
              ? `${filteredTools.length} result${filteredTools.length !== 1 ? "s" : ""} for "${query}"`
              : activeCategory === "All"
              ? `${filteredTools.length} tools`
              : `${filteredTools.length} tool${filteredTools.length !== 1 ? "s" : ""} in ${activeCategory}`}
          </p>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => (
                <div key={tool.name} className="relative">
                  {tool.isPro && (
                    <span
                      className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                                 bg-indigo-600 text-white px-2 py-0.5 rounded-full pointer-events-none"
                    >
                      PRO
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
        </div>
      </section>

      {/* ── Use case quick links ───────────────────────────────────────── */}
      {!isSearching && activeCategory === "All" && (
        <section className="py-12 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-medium text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-5">
              Not sure where to start?
            </p>
            <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
              Find the right tool for your task
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2A2A2A]
                             rounded-xl p-4 hover:border-gray-300 dark:hover:border-[#444]
                             hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                             transition-all"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug mb-3">
                    {uc.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.tools.map((t) => (
                      <Link
                        key={t.name}
                        href={t.href}
                        className="inline-flex items-center gap-1 text-xs font-medium
                                   text-[#6366F1] dark:text-indigo-400
                                   hover:text-indigo-700 dark:hover:text-indigo-300
                                   transition-colors"
                      >
                        {t.name}
                        <ArrowRightIcon />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trust strip ────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3" role="list">
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
                  <circle cx="8" cy="8" r="7.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.5" />
                  <path d="M5 8 L7 10 L11 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
