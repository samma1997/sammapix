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

// ─── Local icons ─────────────────────────────────────────────────────────────

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

const IconTranscribe: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes tr2-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
      @keyframes tr2-line { 0%, 100% { opacity: 0.3; transform: scaleX(0.6); } 50% { opacity: 1; transform: scaleX(1); } }
      .tr2-b1 { transform-origin: 8px 22px; animation: tr2-wave 1.2s ease-in-out 0s infinite; }
      .tr2-b2 { transform-origin: 12px 22px; animation: tr2-wave 1.2s ease-in-out 0.15s infinite; }
      .tr2-b3 { transform-origin: 16px 22px; animation: tr2-wave 1.2s ease-in-out 0.3s infinite; }
      .tr2-b4 { transform-origin: 20px 22px; animation: tr2-wave 1.2s ease-in-out 0.45s infinite; }
      .tr2-b5 { transform-origin: 24px 22px; animation: tr2-wave 1.2s ease-in-out 0.6s infinite; }
      .tr2-l1 { transform-origin: 28px 31px; animation: tr2-line 1.8s ease-in-out 0s infinite; }
      .tr2-l2 { transform-origin: 28px 36px; animation: tr2-line 1.8s ease-in-out 0.4s infinite; }
      .tr2-l3 { transform-origin: 28px 41px; animation: tr2-line 1.8s ease-in-out 0.8s infinite; }
    `}</style>
    <g className="tr2-b1"><rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <g className="tr2-b2"><rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="tr2-b3"><rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/></g>
    <g className="tr2-b4"><rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="tr2-b5"><rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="tr2-l1"><rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="tr2-l2"><rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="tr2-l3"><rect x="28" y="39" width="14" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
  </svg>
);

// ─── Combo tool icons ─────────────────────────────────────────────────────────

const IconWebLift: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes wl-lift { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
      @keyframes wl-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      .wl-lift { animation: wl-lift 2s ease-in-out infinite; }
      .wl-glow { animation: wl-glow 2s ease-in-out infinite; }
    `}</style>
    <g className="wl-lift">
      <rect x="4" y="10" width="20" height="16" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="7" y="13" width="8" height="5" rx="1" fill={accent} fillOpacity="0.25"/>
    </g>
    <path d="M26 18 L30 18 M28 16 L30 18 L28 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="wl-glow">
      <rect x="32" y="12" width="14" height="12" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="39" y="20" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">.webp</text>
    </g>
    <path d="M24 30 L24 38 M20 34 L24 38 L28 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="39" width="20" height="6" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1"/>
    <text x="24" y="44" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">SEO</text>
  </svg>
);

const IconBlogDrop: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes bd-drop { 0%, 30% { transform: translateY(-6px); opacity: 0; } 60%, 100% { transform: translateY(0); opacity: 1; } }
      @keyframes bd-lines { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      .bd-drop { animation: bd-drop 2.2s ease-out infinite; }
      .bd-l1 { animation: bd-lines 2s ease-in-out 0s infinite; }
      .bd-l2 { animation: bd-lines 2s ease-in-out 0.3s infinite; }
      .bd-l3 { animation: bd-lines 2s ease-in-out 0.6s infinite; }
    `}</style>
    <rect x="8" y="4" width="32" height="40" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <g className="bd-drop">
      <rect x="12" y="8" width="24" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <path d="M14 18 L20 14 L26 17 L34 12" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <line className="bd-l1" x1="12" y1="27" x2="36" y2="27" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line className="bd-l2" x1="12" y1="31" x2="30" y2="31" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line className="bd-l3" x1="12" y1="35" x2="33" y2="35" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <rect x="30" y="36" width="12" height="8" rx="2" fill={accent}/>
    <text x="36" y="42" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">BLOG</text>
  </svg>
);

const IconBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes bn-count { 0%, 33% { opacity: 1; } 34%, 66% { opacity: 0.4; } 67%, 100% { opacity: 1; } }
      .bn-n1 { animation: bn-count 3s ease-in-out 0s infinite; }
      .bn-n2 { animation: bn-count 3s ease-in-out 1s infinite; }
      .bn-n3 { animation: bn-count 3s ease-in-out 2s infinite; }
    `}</style>
    <rect x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="bn-n1" x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="bn-n2" x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="bn-n3" x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
    <path d="M38 14 L42 14 M38 24 L42 24 M38 34 L42 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
    <path d="M40 10 L40 38" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"/>
  </svg>
);

const IconPdfToImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdf-flip {
        0%, 20%  { transform: translateX(0px); }
        50%       { transform: translateX(5px); }
        80%, 100%{ transform: translateX(0px); }
      }
      @keyframes pdf-img {
        0%, 30%  { opacity: 0; transform: scale(0.8); }
        55%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .pdf-doc  { animation: pdf-flip 2.6s ease-in-out infinite; }
      .pdf-img  { transform-origin: 36px 30px; animation: pdf-img 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <g className="pdf-doc">
      <rect x="4" y="4" width="22" height="30" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="9" y="9" width="8" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="9" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="9" y="17" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="15" y="29" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    <path d="M28 18 L32 18 M30 16 L32 18 L30 20" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="pdf-img" style={{ opacity: 0 }}>
      <rect x="32" y="20" width="14" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <circle cx="36" cy="24" r="1.5" fill={accent} fillOpacity="0.5"/>
      <path d="M33 32 L36 28 L39 31 L41 28" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="31" y="36" width="15" height="7" rx="1.5" fill={accent}/>
    <text x="38.5" y="41.5" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
  </svg>
);

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ss-shuffle { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(3px); } }
      .ss-f1 { animation: ss-shuffle 2s ease-in-out 0s infinite; }
      .ss-f2 { animation: ss-shuffle 2s ease-in-out 0.3s infinite; }
      .ss-f3 { animation: ss-shuffle 2s ease-in-out 0.6s infinite; }
    `}</style>
    <g className="ss-f1">
      <rect x="2" y="6" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <rect x="4" y="8" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    </g>
    <g className="ss-f2">
      <rect x="2" y="22" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <rect x="4" y="24" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    </g>
    <g className="ss-f3">
      <rect x="2" y="38" width="14" height="6" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    </g>
    <path d="M20 12 L26 8 M20 28 L26 22 M20 41 L26 36" stroke={accent} strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5"/>
    <rect x="28" y="4" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">A</text>
    <rect x="28" y="22" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="31" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">B</text>
    <rect x="28" y="40" width="18" height="6" rx="2" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
  </svg>
);

const IconAiOrganize: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes tp-ao-drop { 0% { transform: translateY(-8px); opacity: 0; } 40%, 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(4px); opacity: 0; } }
      @keyframes tp-ao-sparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
      .tp-ao-d1 { animation: tp-ao-drop 2.4s ease-in-out 0s infinite; }
      .tp-ao-d2 { animation: tp-ao-drop 2.4s ease-in-out 0.4s infinite; }
      .tp-ao-d3 { animation: tp-ao-drop 2.4s ease-in-out 0.8s infinite; }
      .tp-ao-s1 { transform-origin: 40px 8px; animation: tp-ao-sparkle 2s ease-in-out 0.2s infinite; }
      .tp-ao-s2 { transform-origin: 44px 14px; animation: tp-ao-sparkle 2s ease-in-out 0.8s infinite; }
    `}</style>
    <path d="M4 16 L4 40 Q4 42 6 42 L38 42 Q40 42 40 40 L40 20 Q40 18 38 18 L22 18 L18 12 L6 12 Q4 12 4 14 Z" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <path d="M4 14 Q4 12 6 12 L18 12 L22 18 L38 18 Q40 18 40 20" stroke={accent} strokeWidth="1.25" fill={accent} fillOpacity="0.06"/>
    <g className="tp-ao-d1"><rect x="10" y="6" width="6" height="5" rx="1" fill={accent} fillOpacity="0.5" stroke={accent} strokeWidth="0.75"/></g>
    <g className="tp-ao-d2"><rect x="19" y="4" width="6" height="5" rx="1" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.75"/></g>
    <g className="tp-ao-d3"><rect x="28" y="7" width="6" height="5" rx="1" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.75"/></g>
    <rect x="8" y="26" width="10" height="4" rx="1" fill={accent} fillOpacity="0.2"/>
    <rect x="21" y="26" width="10" height="4" rx="1" fill={accent} fillOpacity="0.2"/>
    <rect x="12" y="33" width="12" height="4" rx="1" fill={accent} fillOpacity="0.15"/>
    <g className="tp-ao-s1">
      <path d="M40 8 L41 5 L42 8 L45 9 L42 10 L41 13 L40 10 L37 9 Z" fill={accent} fillOpacity="0.7"/>
    </g>
    <g className="tp-ao-s2">
      <path d="M44 14 L44.5 12.5 L45 14 L46.5 14.5 L45 15 L44.5 16.5 L44 15 L42.5 14.5 Z" fill={accent} fillOpacity="0.5"/>
    </g>
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Optimize" | "AI" | "Creative" | "Organize" | "Workflows";

interface ToolWithCategory extends ToolCardData {
  category: Category[];
  isCombo?: boolean;
}

// ─── Tool data ────────────────────────────────────────────────────────────────

const TOOLS: ToolWithCategory[] = [
  // ── Optimize ──
  {
    name: "Compress",
    href: "/tools/compress",
    tagline: "Shrink JPG, PNG, WebP, GIF -- no quality loss. Up to 90% smaller.",
    accent: "#6366F1",
    badges: ["Free", "Up to 90% smaller"],
    Icon: IconCompress,
    category: ["Optimize"],
  },
  {
    name: "WebP Converter",
    href: "/tools/webp",
    tagline: "Convert any image to WebP. 25-34% smaller than JPEG.",
    accent: "#10B981",
    badges: ["Free", "25-34% smaller"],
    Icon: IconWebP,
    category: ["Optimize"],
  },
  {
    name: "HEIC Converter",
    href: "/tools/heic",
    tagline: "Convert iPhone HEIC photos to JPG or WebP. Free, no upload limit.",
    accent: "#6366F1",
    badges: ["Free", "iPhone", "Batch"],
    Icon: IconHEIC,
    category: ["Optimize"],
  },
  {
    name: "PDF to Image",
    href: "/tools/pdf-to-image",
    tagline: "Convert each PDF page to JPG, PNG, or WebP. Adjustable resolution. ZIP download.",
    accent: "#6366F1",
    badges: ["Free", "No upload"],
    Icon: IconPdfToImage,
    category: ["Optimize"],
  },
  {
    name: "Batch Resize",
    href: "/tools/resizepack",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    accent: "#14B8A6",
    badges: ["Free", "Social presets"],
    Icon: IconResizePack,
    category: ["Optimize"],
  },
  {
    name: "Crop & Ratio",
    href: "/tools/croproatio",
    tagline: "Crop to exact ratios -- 1:1, 16:9, 4:3, A4 and more.",
    accent: "#EC4899",
    badges: ["Free", "9 ratios"],
    Icon: IconCropRatio,
    category: ["Optimize"],
  },

  // ── AI ──
  {
    name: "AI Rename",
    href: "/tools/ai-rename",
    tagline: "AI generates SEO-optimized filenames and alt text in under 3 seconds.",
    accent: "#8B5CF6",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconAIRename,
    category: ["AI"],
  },
  {
    name: "AI Alt Text",
    href: "/tools/alt-text",
    tagline: "Generate accessibility-compliant alt text for images using Gemini AI.",
    accent: "#8B5CF6",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconAltText,
    category: ["AI"],
  },
  {
    name: "Transcribe",
    href: "/tools/transcribe",
    tagline: "AI transcription with timestamps. SRT subtitles in seconds.",
    accent: "#0891B2",
    badges: ["Login required", "Gemini Flash"],
    Icon: IconTranscribe,
    category: ["AI"],
  },
  {
    name: "Web Optimize",
    href: "/tools/weblift",
    tagline: "Compress, convert to WebP, and AI-rename in one click.",
    accent: "#3B82F6",
    badges: ["Login required", "Multi-step"],
    Icon: IconWebLift,
    category: ["AI"],
    isCombo: true,
  },
  {
    name: "Blog Ready",
    href: "/tools/blogdrop",
    tagline: "Blog-ready images in one drop. Compress, resize, WebP, SEO names.",
    accent: "#8B5CF6",
    badges: ["Login required", "Multi-step"],
    Icon: IconBlogDrop,
    category: ["Workflows"],
    isCombo: true,
  },
  {
    name: "AI Photo Sort",
    href: "/tools/smartsort",
    tagline: "AI analyzes images and sorts them into categories automatically.",
    accent: "#22C55E",
    badges: ["AI-powered", "Login required"],
    Icon: IconSmartSort,
    category: ["AI"],
  },
  {
    name: "AI Organize",
    href: "/tools/ai-organize",
    tagline: "Drop 100+ photos. AI sorts into folders, finds duplicates, renames for SEO.",
    accent: "#8B5CF6",
    badges: ["Login required", "Gemini Flash", "NEW"],
    Icon: IconAiOrganize,
    category: ["AI"],
  },

  // ── Creative ──
  {
    name: "Film Filters",
    href: "/tools/filmlab",
    tagline: "14 analog film presets -- Kodak Gold, Fuji, Ilford and 8 Samma originals.",
    accent: "#F59E0B",
    badges: ["Free", "14 presets"],
    Icon: IconFilmLab,
    category: ["Creative"],
  },
  {
    name: "Watermark",
    href: "/tools/stampit",
    tagline: "Batch watermark with text or logo. 9 positions + tiled filigrana.",
    accent: "#06B6D4",
    badges: ["Free", "Batch"],
    Icon: IconStampIt,
    category: ["Creative"],
  },

  // ── Organize ──
  {
    name: "EXIF Viewer",
    href: "/tools/exif",
    tagline: "Strip GPS, camera data and all metadata from photos.",
    accent: "#EF4444",
    badges: ["Free", "Privacy"],
    Icon: IconEXIF,
    category: ["Organize"],
  },
  {
    name: "Find Duplicates",
    href: "/tools/twinhunt",
    tagline: "Perceptual hashing finds exact and near-duplicate photos.",
    accent: "#F97316",
    badges: ["Free", "pHash"],
    Icon: IconTwinHunt,
    category: ["Organize"],
  },
  {
    name: "Sort by Location",
    href: "/tools/geosort",
    tagline: "Sort photos by country using GPS EXIF data.",
    accent: "#22C55E",
    badges: ["Free", "GPS"],
    Icon: IconGeoSort,
    category: ["Organize"],
  },
  {
    name: "Photo Map",
    href: "/tools/travelmap",
    tagline: "Generate an interactive map from your travel photos.",
    accent: "#3B82F6",
    badges: ["Free", "GPS"],
    Icon: IconTravelMap,
    category: ["Organize"],
  },
  {
    name: "Cull",
    href: "/tools/cull",
    tagline: "Rate and cull a shoot in minutes. Star rating system.",
    accent: "#F43F5E",
    badges: ["Free", "Star rating"],
    Icon: IconCull,
    category: ["Organize"],
  },
  {
    name: "Batch Rename",
    href: "/tools/batchname",
    tagline: "Rename files with a custom pattern. No AI, 100% client-side, unlimited.",
    accent: "#F59E0B",
    badges: ["Free", "Unlimited"],
    Icon: IconBatchName,
    category: ["Organize"],
  },
];

// ─── Category tabs config ─────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["All", "Optimize", "AI", "Creative", "Organize", "Workflows"];

// ─── Use cases ────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    title: "I'm a blogger and need SEO-ready images",
    tools: [
      { name: "Blog Ready", href: "/tools/blogdrop" },
      { name: "AI Rename", href: "/tools/ai-rename" },
      { name: "AI Alt Text", href: "/tools/alt-text" },
      { name: "Compress", href: "/tools/compress" },
    ],
  },
  {
    title: "I'm a photographer delivering to clients",
    tools: [
      { name: "Cull", href: "/tools/cull" },
      { name: "AI Photo Sort", href: "/tools/smartsort" },
      { name: "Film Filters", href: "/tools/filmlab" },
      { name: "Watermark", href: "/tools/stampit" },
    ],
  },
  {
    title: "I sell products online (e-commerce)",
    tools: [
      { name: "Compress", href: "/tools/compress" },
      { name: "WebP Converter", href: "/tools/webp" },
      { name: "AI Rename", href: "/tools/ai-rename" },
      { name: "EXIF Viewer", href: "/tools/exif" },
    ],
  },
  {
    title: "I'm a web developer optimizing for performance",
    tools: [
      { name: "Web Optimize", href: "/tools/weblift" },
      { name: "Compress", href: "/tools/compress" },
      { name: "WebP Converter", href: "/tools/webp" },
      { name: "Batch Rename", href: "/tools/batchname" },
    ],
  },
  {
    title: "I need to prepare photos for social media",
    tools: [
      { name: "Batch Resize", href: "/tools/resizepack" },
      { name: "Crop & Ratio", href: "/tools/croproatio" },
      { name: "Film Filters", href: "/tools/filmlab" },
      { name: "Batch Rename", href: "/tools/batchname" },
    ],
  },
  {
    title: "I need to organize travel photos",
    tools: [
      { name: "Sort by Location", href: "/tools/geosort" },
      { name: "Photo Map", href: "/tools/travelmap" },
      { name: "Cull", href: "/tools/cull" },
      { name: "EXIF Viewer", href: "/tools/exif" },
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

    // Filter by search query (matches name, tagline, and individual words)
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          // Also match if individual words (3+ chars) appear in name or tagline
          q.split(/\s+/).some(
            (word) =>
              word.length >= 3 &&
              (t.name.toLowerCase().includes(word) ||
               t.tagline.toLowerCase().includes(word))
          )
      );
    }

    return result;
  }, [query, activeCategory]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* -- Search + Category tabs -- */}
      <div className="sticky top-14 z-20 bg-white dark:bg-[#191919] border-b border-gray-100 dark:border-[#2A2A2A]">
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

      {/* -- Tool grid -- */}
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
                <div key={tool.name} className="relative h-full">
                  {tool.isCombo && (
                    <span
                      className="absolute top-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest
                                 bg-[#525252] dark:bg-[#737373] text-white px-2 py-0.5 rounded-full pointer-events-none"
                    >
                      MULTI-STEP
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

      {/* -- Use case quick links -- */}
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

      {/* -- Trust strip -- */}
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
