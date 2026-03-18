"use client";

import React, { useState } from "react";
import Link from "next/link";
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

// ─── Local icons (same as in ToolsPageClient) ────────────────────────────────

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-alt-pulse { 0%, 100% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1); } }
      .hp-alt-img { transform-origin: 13px 20px; animation: hp-alt-pulse 2s ease-in-out infinite; }
      .hp-alt-cursor { animation: hp-alt-pulse 0.9s step-end infinite; }
    `}</style>
    <g className="hp-alt-img">
      <rect x="2" y="8" width="22" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 22 L9 16 L14 20 L18 16 L24 22" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="4" y="30" width="40" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="9" y="39" fontSize="6" fill={accent} fontWeight="700" fontFamily="monospace">alt=</text>
    <rect x="26" y="33" width="13" height="6" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="0.75"/>
    <rect className="hp-alt-cursor" x="27" y="34.5" width="1.25" height="3" rx="0.5" fill={accent}/>
  </svg>
);

const IconTranscribe: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-tr-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
      .hp-tr-b1 { transform-origin: 8px 22px; animation: hp-tr-wave 1.2s ease-in-out 0s infinite; }
      .hp-tr-b2 { transform-origin: 12px 22px; animation: hp-tr-wave 1.2s ease-in-out 0.15s infinite; }
      .hp-tr-b3 { transform-origin: 16px 22px; animation: hp-tr-wave 1.2s ease-in-out 0.3s infinite; }
      .hp-tr-b4 { transform-origin: 20px 22px; animation: hp-tr-wave 1.2s ease-in-out 0.45s infinite; }
      .hp-tr-b5 { transform-origin: 24px 22px; animation: hp-tr-wave 1.2s ease-in-out 0.6s infinite; }
    `}</style>
    <g className="hp-tr-b1"><rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <g className="hp-tr-b2"><rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="hp-tr-b3"><rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/></g>
    <g className="hp-tr-b4"><rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="hp-tr-b5"><rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
    <rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
    <rect x="28" y="39" width="14" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
  </svg>
);

const IconWebLift: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-wl-lift { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
      .hp-wl-lift { animation: hp-wl-lift 2s ease-in-out infinite; }
    `}</style>
    <g className="hp-wl-lift">
      <rect x="4" y="10" width="20" height="16" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="7" y="13" width="8" height="5" rx="1" fill={accent} fillOpacity="0.25"/>
    </g>
    <path d="M26 18 L30 18 M28 16 L30 18 L28 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="32" y="12" width="14" height="12" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
    <text x="39" y="20" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">.webp</text>
    <rect x="14" y="39" width="20" height="6" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1"/>
    <text x="24" y="44" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">SEO</text>
  </svg>
);

const IconBlogDrop: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="4" width="32" height="40" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <rect x="12" y="8" width="24" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
    <path d="M14 18 L20 14 L26 17 L34 12" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <line x1="12" y1="27" x2="36" y2="27" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="12" y1="31" x2="30" y2="31" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="12" y1="35" x2="33" y2="35" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <rect x="30" y="36" width="12" height="8" rx="2" fill={accent}/>
    <text x="36" y="42" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">BLOG</text>
  </svg>
);

const IconBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
  </svg>
);

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="6" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <rect x="4" y="8" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    <rect x="2" y="22" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <path d="M20 12 L26 8 M20 28 L26 22" stroke={accent} strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5"/>
    <rect x="28" y="4" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">A</text>
    <rect x="28" y="22" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="31" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">B</text>
  </svg>
);

// ─── Tool data by category ───────────────────────────────────────────────────

type TabCategory = "Optimize" | "AI-Powered" | "Creative" | "Organize";

interface HomepageTool {
  name: string;
  href: string;
  tagline: string;
  accent: string;
  badge: string;
  Icon: React.FC<{ accent: string }>;
  isCombo?: boolean;
  category: TabCategory;
}

const ALL_HOMEPAGE_TOOLS: HomepageTool[] = [
  // Optimize
  { name: "Compress", href: "/tools/compress", tagline: "Shrink images up to 90% smaller.", accent: "#6366F1", badge: "Free", Icon: IconCompress, category: "Optimize" },
  { name: "WebP Converter", href: "/tools/webp", tagline: "Convert any image to WebP.", accent: "#10B981", badge: "Free", Icon: IconWebP, category: "Optimize" },
  { name: "HEIC Converter", href: "/tools/heic", tagline: "iPhone HEIC to JPG or WebP.", accent: "#6366F1", badge: "Free", Icon: IconHEIC, category: "Optimize" },
  { name: "ResizePack", href: "/tools/resizepack", tagline: "Resize for social media presets.", accent: "#14B8A6", badge: "Free", Icon: IconResizePack, category: "Optimize" },
  { name: "CropRatio", href: "/tools/croproatio", tagline: "Crop to exact ratios.", accent: "#EC4899", badge: "Free", Icon: IconCropRatio, category: "Optimize" },

  // AI-Powered
  { name: "AI Rename", href: "/tools/ai-rename", tagline: "SEO-optimized filenames with AI.", accent: "#8B5CF6", badge: "Login required", Icon: IconAIRename, category: "AI-Powered" },
  { name: "AI Alt Text", href: "/tools/alt-text", tagline: "Accessibility alt text with AI.", accent: "#8B5CF6", badge: "Login required", Icon: IconAltText, category: "AI-Powered" },
  { name: "Transcribe", href: "/tools/transcribe", tagline: "AI transcription with timestamps.", accent: "#0891B2", badge: "Login required", Icon: IconTranscribe, category: "AI-Powered" },
  { name: "WebLift", href: "/tools/weblift", tagline: "Compress + WebP + AI rename.", accent: "#3B82F6", badge: "Login required", Icon: IconWebLift, category: "AI-Powered", isCombo: true },
  { name: "BlogDrop", href: "/tools/blogdrop", tagline: "Blog-ready images in one drop.", accent: "#8B5CF6", badge: "Login required", Icon: IconBlogDrop, category: "AI-Powered", isCombo: true },
  { name: "SmartSort", href: "/tools/smartsort", tagline: "AI sorts images into categories.", accent: "#22C55E", badge: "Login required", Icon: IconSmartSort, category: "AI-Powered" },

  // Creative
  { name: "FilmLab", href: "/tools/filmlab", tagline: "14 analog film presets.", accent: "#F59E0B", badge: "Free", Icon: IconFilmLab, category: "Creative" },
  { name: "StampIt", href: "/tools/stampit", tagline: "Batch watermark with text or logo.", accent: "#06B6D4", badge: "Free", Icon: IconStampIt, category: "Creative" },

  // Organize
  { name: "EXIF Lens", href: "/tools/exif", tagline: "Strip GPS and all metadata.", accent: "#EF4444", badge: "Free", Icon: IconEXIF, category: "Organize" },
  { name: "TwinHunt", href: "/tools/twinhunt", tagline: "Find duplicate photos.", accent: "#F97316", badge: "Free", Icon: IconTwinHunt, category: "Organize" },
  { name: "GeoSort", href: "/tools/geosort", tagline: "Sort photos by country.", accent: "#22C55E", badge: "Free", Icon: IconGeoSort, category: "Organize" },
  { name: "TravelMap", href: "/tools/travelmap", tagline: "Interactive map from photos.", accent: "#3B82F6", badge: "Free", Icon: IconTravelMap, category: "Organize" },
  { name: "Cull", href: "/tools/cull", tagline: "Rate and cull a shoot.", accent: "#F43F5E", badge: "Free", Icon: IconCull, category: "Organize" },
  { name: "BatchName", href: "/tools/batchname", tagline: "Rename files with a pattern.", accent: "#F59E0B", badge: "Free", Icon: IconBatchName, category: "Organize" },
];

const TAB_CATEGORIES: TabCategory[] = ["Optimize", "AI-Powered", "Creative", "Organize"];

// ─── Component ────────────────────────────────────────────────────────────────

export function HomepageToolGrid() {
  const [activeTab, setActiveTab] = useState<TabCategory>("Optimize");

  const filtered = ALL_HOMEPAGE_TOOLS.filter((t) => t.category === activeTab);

  return (
    <section className="py-14 px-4 sm:px-6 bg-white dark:bg-[#191919]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
            20 Free Tools
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Browser-based -- no uploads, no account required for the basics.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto mb-6 pb-0.5"
          style={{ scrollbarWidth: "none" }}
          role="tablist"
          aria-label="Tool categories"
        >
          {TAB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              className={`
                flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
                ${activeTab === cat
                  ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                  : "bg-transparent text-[#737373] dark:text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group block p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#525252] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: `${tool.accent}14` }}
                >
                  <tool.Icon accent={tool.accent} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                      {tool.name}
                    </p>
                    {tool.isCombo && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#737373] bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded flex-shrink-0">
                        MULTI
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug line-clamp-2">
                    {tool.tagline}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                    tool.badge === "Free"
                      ? "bg-[#D1FAE5] text-[#059669] dark:bg-[#059669]/15 dark:text-[#6EE7B7]"
                      : "bg-[#8B5CF6]/10 text-[#8B5CF6]"
                  }`}
                >
                  {tool.badge}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all tools link */}
        <div className="mt-6 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
          >
            View all tools
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 10L9 7L5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
