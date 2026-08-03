"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOL_COUNT } from "@/lib/constants";
import {
  ToolCard,
  type ToolCardData,
  IconCompress,
  IconWebP,
  IconPngToJpg,
  IconWebpToJpg,
  IconWebpToPng,
  IconSvgToPng,
  IconGifToMp4,
  IconIcoGenerator,
  IconPdfMerge,
  IconColorPicker,
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
  IconJpgToPdf,
  IconJxl,
  IconUnrar,
  IconOpen7z,
  IconZipCreator,
  IconTarGz,
  IconRawConverter,
  IconBlurCensor,
  IconRedactPdf,
  IconCompressVideo,
  IconConvertVideo,
  IconVideoToGif,
  IconMuteVideo,
  IconResizeVideo,
  IconTrimVideo,
  IconExtractAudio,
  IconInstagramGrid,
  IconRemoveBg,
  IconUpscale,
  IconPassportPhoto,
  IconPdfCompress,
  IconPdfRotate,
  IconPdfUnlock,
  IconPdfPageNumbers,
  IconPdfProtect,
  IconRotateImage,
  IconFlipImage,
  IconAddBorder,
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

const IconPdfToImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-pdf-flip {
        0%, 20%  { transform: translateX(0px); }
        50%       { transform: translateX(5px); }
        80%, 100%{ transform: translateX(0px); }
      }
      @keyframes hp-pdf-img {
        0%, 30%  { opacity: 0; transform: scale(0.8); }
        55%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .hp-pdf-doc  { animation: hp-pdf-flip 2.6s ease-in-out infinite; }
      .hp-pdf-img  { transform-origin: 36px 30px; animation: hp-pdf-img 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <g className="hp-pdf-doc">
      <rect x="4" y="4" width="22" height="30" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="9" y="9" width="8" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="9" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="9" y="17" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="15" y="29" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    <path d="M28 18 L32 18 M30 16 L32 18 L30 20" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="hp-pdf-img" style={{ opacity: 0 }}>
      <rect x="32" y="20" width="14" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <circle cx="36" cy="24" r="1.5" fill={accent} fillOpacity="0.5"/>
      <path d="M33 32 L36 28 L39 31 L41 28" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="31" y="36" width="15" height="7" rx="1.5" fill={accent}/>
    <text x="38.5" y="41.5" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
  </svg>
);

const IconAiOrganize: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-ao-drop { 0% { transform: translateY(-8px); opacity: 0; } 40%, 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(4px); opacity: 0; } }
      @keyframes hp-ao-sparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
      .hp-ao-d1 { animation: hp-ao-drop 2.4s ease-in-out 0s infinite; }
      .hp-ao-d2 { animation: hp-ao-drop 2.4s ease-in-out 0.4s infinite; }
      .hp-ao-d3 { animation: hp-ao-drop 2.4s ease-in-out 0.8s infinite; }
      .hp-ao-s1 { transform-origin: 40px 8px; animation: hp-ao-sparkle 2s ease-in-out 0.2s infinite; }
      .hp-ao-s2 { transform-origin: 44px 14px; animation: hp-ao-sparkle 2s ease-in-out 0.8s infinite; }
    `}</style>
    <path d="M4 16 L4 40 Q4 42 6 42 L38 42 Q40 42 40 40 L40 20 Q40 18 38 18 L22 18 L18 12 L6 12 Q4 12 4 14 Z" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <path d="M4 14 Q4 12 6 12 L18 12 L22 18 L38 18 Q40 18 40 20" stroke={accent} strokeWidth="1.25" fill={accent} fillOpacity="0.06"/>
    <g className="hp-ao-d1"><rect x="10" y="6" width="6" height="5" rx="1" fill={accent} fillOpacity="0.5" stroke={accent} strokeWidth="0.75"/></g>
    <g className="hp-ao-d2"><rect x="19" y="4" width="6" height="5" rx="1" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.75"/></g>
    <g className="hp-ao-d3"><rect x="28" y="7" width="6" height="5" rx="1" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.75"/></g>
    <rect x="8" y="26" width="10" height="4" rx="1" fill={accent} fillOpacity="0.2"/>
    <rect x="21" y="26" width="10" height="4" rx="1" fill={accent} fillOpacity="0.2"/>
    <rect x="12" y="33" width="12" height="4" rx="1" fill={accent} fillOpacity="0.15"/>
    <g className="hp-ao-s1">
      <path d="M40 8 L41 5 L42 8 L45 9 L42 10 L41 13 L40 10 L37 9 Z" fill={accent} fillOpacity="0.7"/>
    </g>
    <g className="hp-ao-s2">
      <path d="M44 14 L44.5 12.5 L45 14 L46.5 14.5 L45 15 L44.5 16.5 L44 15 L42.5 14.5 Z" fill={accent} fillOpacity="0.5"/>
    </g>
  </svg>
);

const IconBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-bn-row { 0%, 100% { fill-opacity: 0.1; } 50% { fill-opacity: 0.5; } }
      .hp-bn-1 { animation: hp-bn-row 2.1s ease-in-out infinite; }
      .hp-bn-2 { animation: hp-bn-row 2.1s ease-in-out 0.35s infinite; }
      .hp-bn-3 { animation: hp-bn-row 2.1s ease-in-out 0.7s infinite; }
    `}</style>
    <rect className="hp-bn-1" x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect className="hp-bn-2" x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect className="hp-bn-3" x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
  </svg>
);

const IconColorMatch: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-cm-shift { 0%, 100% { fill-opacity: 0.18; } 50% { fill-opacity: 0.55; } }
      @keyframes hp-cm-arrow { 0%, 100% { transform: translateX(0px); opacity: 0.7; } 50% { transform: translateX(2px); opacity: 1; } }
      .hp-cm-rect-a { animation: hp-cm-shift 2.2s ease-in-out infinite; }
      .hp-cm-rect-b { animation: hp-cm-shift 2.2s ease-in-out 0.6s infinite; }
      .hp-cm-rect-c { animation: hp-cm-shift 2.2s ease-in-out 1.2s infinite; }
      .hp-cm-arr { animation: hp-cm-arrow 1.8s ease-in-out infinite; }
    `}</style>
    <rect x="3" y="9" width="14" height="14" rx="2.5" fill={accent} fillOpacity="0.55" stroke={accent} strokeWidth="1.25"/>
    <circle cx="8.5" cy="14" r="1.5" fill="white" fillOpacity="0.8"/>
    <path d="M3 22 L8 17 L11 19 L13 17 L17 21 L17 23 Z" fill="white" fillOpacity="0.4"/>
    <g className="hp-cm-arr">
      <path d="M19 16 L23 16 M21 14 L23 16 L21 18" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <rect className="hp-cm-rect-a" x="25" y="3" width="9" height="9" rx="1.5" fill={accent} stroke={accent} strokeWidth="0.75"/>
    <rect className="hp-cm-rect-b" x="36" y="3" width="9" height="9" rx="1.5" fill={accent} stroke={accent} strokeWidth="0.75"/>
    <rect className="hp-cm-rect-c" x="25" y="14" width="9" height="9" rx="1.5" fill={accent} stroke={accent} strokeWidth="0.75"/>
    <rect x="36" y="14" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.75"/>
    <rect x="25" y="25" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.75"/>
    <rect x="36" y="25" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.75"/>
    <rect x="25" y="36" width="20" height="8" rx="1.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="0.75"/>
    <text x="35" y="42" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">MATCH</text>
  </svg>
);

const IconPhotoEnhance: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-pe-sharpen { 0%, 100% { filter: blur(0.6px); opacity: 0.85; } 50% { filter: blur(0); opacity: 1; } }
      @keyframes hp-pe-sparkle { 0%, 100% { opacity: 0.3; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1); } }
      .hp-pe-img { transform-origin: 18px 22px; animation: hp-pe-sharpen 2.4s ease-in-out infinite; }
      .hp-pe-s1 { transform-origin: 38px 12px; animation: hp-pe-sparkle 1.6s ease-in-out 0s infinite; }
      .hp-pe-s2 { transform-origin: 42px 28px; animation: hp-pe-sparkle 1.6s ease-in-out 0.4s infinite; }
      .hp-pe-s3 { transform-origin: 34px 38px; animation: hp-pe-sparkle 1.6s ease-in-out 0.8s infinite; }
    `}</style>
    <g className="hp-pe-img">
      <rect x="4" y="8" width="28" height="28" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="12" cy="16" r="2.5" fill={accent} fillOpacity="0.6"/>
      <path d="M4 30 L13 21 L19 26 L24 22 L32 30" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <g className="hp-pe-s1"><path d="M38 9 L39 12 L42 12 L40 14 L41 17 L38 15 L35 17 L36 14 L34 12 L37 12 Z" fill={accent}/></g>
    <g className="hp-pe-s2"><path d="M42 26 L42.5 27.5 L44 28 L42.5 28.5 L42 30 L41.5 28.5 L40 28 L41.5 27.5 Z" fill={accent} fillOpacity="0.8"/></g>
    <g className="hp-pe-s3"><path d="M34 36 L34.5 37 L36 37.5 L34.5 38 L34 39 L33.5 38 L32 37.5 L33.5 37 Z" fill={accent} fillOpacity="0.7"/></g>
  </svg>
);

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes hp-ss-arr { 0%,100% { transform: translateX(0); opacity: 0.4; } 50% { transform: translateX(3px); opacity: 1; } }
      @keyframes hp-ss-binA { 0%,100% { fill-opacity: 0.08; } 30% { fill-opacity: 0.4; } }
      @keyframes hp-ss-binB { 0%,100% { fill-opacity: 0.08; } 80% { fill-opacity: 0.4; } }
      .hp-ss-arr { animation: hp-ss-arr 1.6s ease-in-out infinite; }
      .hp-ss-binA { animation: hp-ss-binA 2.2s ease-in-out infinite; }
      .hp-ss-binB { animation: hp-ss-binB 2.2s ease-in-out infinite; }
    `}</style>
    <rect x="2" y="6" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <rect x="4" y="8" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    <rect x="2" y="22" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <path className="hp-ss-arr" d="M20 12 L26 8 M20 28 L26 22" stroke={accent} strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.5"/>
    <rect className="hp-ss-binA" x="28" y="4" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">A</text>
    <rect className="hp-ss-binB" x="28" y="22" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
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
  isNew?: boolean;
  category: TabCategory;
}

const ALL_HOMEPAGE_TOOLS: HomepageTool[] = [
  // Optimize
  { name: "Compress", href: "/tools/compress", tagline: "Shrink images up to 90% smaller.", accent: "#6366F1", badge: "Free", Icon: IconCompress, category: "Optimize" },
  { name: "WebP Converter", href: "/tools/webp", tagline: "Convert any image to WebP.", accent: "#10B981", badge: "Free", Icon: IconWebP, category: "Optimize" },
  { name: "PNG to JPG", href: "/tools/png-to-jpg", tagline: "Convert PNG to JPG — 70-90% smaller.", accent: "#6366F1", badge: "Free", Icon: IconPngToJpg, category: "Optimize", isNew: true },
  { name: "WebP to JPG", href: "/tools/webp-to-jpg", tagline: "Convert WebP to JPG for compatibility.", accent: "#10B981", badge: "Free", Icon: IconWebpToJpg, category: "Optimize", isNew: true },
  { name: "WebP to PNG", href: "/tools/webp-to-png", tagline: "Convert WebP to PNG — transparency preserved.", accent: "#8B5CF6", badge: "Free", Icon: IconWebpToPng, category: "Optimize", isNew: true },
  { name: "SVG to PNG", href: "/tools/svg-to-png", tagline: "Rasterize SVG vectors to PNG — any resolution.", accent: "#F97316", badge: "Free", Icon: IconSvgToPng, category: "Optimize", isNew: true },
  { name: "GIF to MP4", href: "/tools/gif-to-mp4", tagline: "Animated GIF to MP4 — 80-90% smaller.", accent: "#EC4899", badge: "Free", Icon: IconGifToMp4, category: "Optimize", isNew: true },
  { name: "Favicon Generator", href: "/tools/ico-generator", tagline: "Build multi-size favicon.ico from any image.", accent: "#0EA5E9", badge: "Free", Icon: IconIcoGenerator, category: "Optimize", isNew: true },
  { name: "Merge PDF", href: "/tools/pdf-merge", tagline: "Combine PDFs into one — drag to reorder.", accent: "#DC2626", badge: "Free", Icon: IconPdfMerge, category: "Optimize", isNew: true },
  { name: "HEIC Converter", href: "/tools/heic", tagline: "iPhone HEIC to JPG or WebP.", accent: "#6366F1", badge: "Free", Icon: IconHEIC, category: "Optimize" },
  { name: "PDF to Image", href: "/tools/pdf-to-image", tagline: "Convert PDF pages to JPG or PNG.", accent: "#DC2626", badge: "Free", Icon: IconPdfToImage, category: "Optimize" },
  { name: "Batch Resize", href: "/tools/resizepack", tagline: "Resize for social media presets.", accent: "#14B8A6", badge: "Free", Icon: IconResizePack, category: "Optimize" },
  { name: "Crop & Ratio", href: "/tools/croproatio", tagline: "Crop to exact ratios.", accent: "#EC4899", badge: "Free", Icon: IconCropRatio, category: "Optimize" },

  // AI-Powered
  { name: "LUT Generator", href: "/tools/color-match", tagline: "Extract a 3D LUT from any photo + batch apply + export .cube.", accent: "#F59E0B", badge: "Free", Icon: IconColorMatch, category: "AI-Powered", isNew: true },
  { name: "Batch Photo Enhancer", href: "/tools/photo-enhance", tagline: "Drop 20+ photos. AI cleans + upscales 2x in batch. Download ZIP.", accent: "#8B5CF6", badge: "Free", Icon: IconPhotoEnhance, category: "AI-Powered", isNew: true },
  { name: "AI Organize", href: "/tools/ai-organize", tagline: "Drop 100+ photos. AI sorts into folders, finds duplicates, renames for SEO.", accent: "#8B5CF6", badge: "Login required", Icon: IconAiOrganize, category: "AI-Powered", isNew: true },
  { name: "AI Rename", href: "/tools/ai-rename", tagline: "SEO-optimized filenames with AI.", accent: "#8B5CF6", badge: "Login required", Icon: IconAIRename, category: "AI-Powered" },
  { name: "AI Alt Text", href: "/tools/alt-text", tagline: "Accessibility alt text with AI.", accent: "#8B5CF6", badge: "Login required", Icon: IconAltText, category: "AI-Powered" },
  { name: "AI Photo Sort", href: "/tools/smartsort", tagline: "AI sorts images into categories.", accent: "#22C55E", badge: "Login required", Icon: IconSmartSort, category: "AI-Powered" },
  { name: "Transcribe", href: "/tools/transcribe", tagline: "AI transcription with timestamps.", accent: "#0891B2", badge: "Login required", Icon: IconTranscribe, category: "AI-Powered" },
  { name: "Web Optimize", href: "/tools/weblift", tagline: "Compress + WebP + AI rename.", accent: "#3B82F6", badge: "Login required", Icon: IconWebLift, category: "AI-Powered", isCombo: true },

  // Creative
  { name: "Film Filters", href: "/tools/filmlab", tagline: "14 analog film presets.", accent: "#F59E0B", badge: "Free", Icon: IconFilmLab, category: "Creative" },
  { name: "Watermark", href: "/tools/stampit", tagline: "Batch watermark with text or logo.", accent: "#06B6D4", badge: "Free", Icon: IconStampIt, category: "Creative" },
  { name: "Color Picker", href: "/tools/color-picker", tagline: "Eyedrop HEX/RGB/HSL + auto palette from any image.", accent: "#A855F7", badge: "Free", Icon: IconColorPicker, category: "Creative", isNew: true },

  // Organize
  { name: "EXIF Viewer", href: "/tools/exif", tagline: "Strip GPS and all metadata.", accent: "#EF4444", badge: "Free", Icon: IconEXIF, category: "Organize" },
  { name: "Find Duplicates", href: "/tools/twinhunt", tagline: "Find duplicate photos.", accent: "#F97316", badge: "Free", Icon: IconTwinHunt, category: "Organize" },
  { name: "Sort by Location", href: "/tools/geosort", tagline: "Sort photos by country.", accent: "#22C55E", badge: "Free", Icon: IconGeoSort, category: "Organize" },
  { name: "Photo Map", href: "/tools/travelmap", tagline: "Interactive map from photos.", accent: "#3B82F6", badge: "Free", Icon: IconTravelMap, category: "Organize" },
  { name: "Cull", href: "/tools/cull", tagline: "Rate and cull a shoot.", accent: "#F43F5E", badge: "Free", Icon: IconCull, category: "Organize" },
  { name: "Batch Rename", href: "/tools/batchname", tagline: "Patterns, EXIF dates, find/replace.", accent: "#F59E0B", badge: "Free", Icon: IconBatchName, category: "Organize" },

  // New tools
  { name: "JPG to PDF", href: "/tools/jpg-to-pdf", tagline: "Merge images into a single PDF.", accent: "#DC2626", badge: "Free", Icon: IconJpgToPdf, category: "Optimize", isNew: true },
  { name: "JXL Converter", href: "/tools/jxl", tagline: "JPEG XL to/from JPG, PNG, WebP.", accent: "#F59E0B", badge: "Free", Icon: IconJxl, category: "Optimize", isNew: true },
  { name: "Open RAR Online", href: "/tools/unrar", tagline: "Extract RAR files in-browser — no upload.", accent: "#0EA5E9", badge: "Free", Icon: IconUnrar, category: "Optimize" },
  { name: "Open 7z Online", href: "/tools/open-7z", tagline: "Extract .7z files in-browser — no Mac support needed.", accent: "#8B5CF6", badge: "Free", Icon: IconOpen7z, category: "Optimize", isNew: true },
  { name: "Create a ZIP File", href: "/tools/zip-creator", tagline: "Bundle files or a folder into one .zip — no upload.", accent: "#8B5CF6", badge: "Free", Icon: IconZipCreator, category: "Optimize", isNew: true },
  { name: "Open tar.gz Online", href: "/tools/tar-gz", tagline: "Extract .tar.gz / .tgz / .gz in-browser — no upload.", accent: "#8B5CF6", badge: "Free", Icon: IconTarGz, category: "Optimize", isNew: true },
  { name: "RAW Converter", href: "/tools/raw-converter", tagline: "CR2, NEF, ARW, DNG to JPG or WebP. In your browser, no upload.", accent: "#0D9488", badge: "Free", Icon: IconRawConverter, category: "Optimize", isNew: true },
  { name: "Split PDF", href: "/tools/pdf-split", tagline: "Extract pages or split a PDF into multiple files. No upload.", accent: "#EF4444", badge: "Free", Icon: IconPdfMerge, category: "Optimize", isNew: true },
  { name: "Compress PDF", href: "/tools/pdf-compress", tagline: "Reduce PDF file size with quality presets. See before/after size. No upload.", accent: "#EF4444", badge: "Free", Icon: IconPdfCompress, category: "Optimize", isNew: true },
  { name: "Blur & Censor", href: "/tools/blur-censor", tagline: "Blur or pixelate faces, plates and sensitive data. No upload.", accent: "#475569", badge: "Free", Icon: IconBlurCensor, category: "Creative", isNew: true },
  { name: "Redact PDF", href: "/tools/redact-pdf", tagline: "Permanently black out sensitive text in a PDF. No upload.", accent: "#334155", badge: "Free", Icon: IconRedactPdf, category: "Optimize", isNew: true },
  { name: "Compress Video", href: "/tools/compress-video", tagline: "Shrink MP4, MOV, WebM up to 80%. WebCodecs-fast, no upload.", accent: "#7C3AED", badge: "Free", Icon: IconCompressVideo, category: "Optimize", isNew: true },
  { name: "Convert Video", href: "/tools/convert-video", tagline: "MOV, AVI, MKV, WebM to MP4 and back. Fast, no upload.", accent: "#0891B2", badge: "Free", Icon: IconConvertVideo, category: "Optimize", isNew: true },
  { name: "Video to GIF", href: "/tools/video-to-gif", tagline: "MP4, MOV, WebM to animated GIF. No upload, no watermark.", accent: "#E11D48", badge: "Free", Icon: IconVideoToGif, category: "Creative", isNew: true },
  { name: "Mute Video", href: "/tools/mute-video", tagline: "Remove the audio from any video. Instant, no upload.", accent: "#64748B", badge: "Free", Icon: IconMuteVideo, category: "Creative", isNew: true },
  { name: "Resize Video", href: "/tools/resize-video", tagline: "Change resolution to 1080p, 720p, 480p, 360p. No upload.", accent: "#2563EB", badge: "Free", Icon: IconResizeVideo, category: "Optimize", isNew: true },
  { name: "Trim Video", href: "/tools/trim-video", tagline: "Cut a clip with a live preview. No upload, no watermark.", accent: "#D97706", badge: "Free", Icon: IconTrimVideo, category: "Creative", isNew: true },
  { name: "Extract Audio", href: "/tools/extract-audio", tagline: "Video to MP3 or M4A. No upload, no watermark.", accent: "#059669", badge: "Free", Icon: IconExtractAudio, category: "Creative", isNew: true },
  { name: "Instagram Grid Splitter", href: "/tools/instagram-grid-splitter", tagline: "Split a photo into a 3×3 puzzle grid, tiles numbered for posting.", accent: "#EC4899", badge: "Free", Icon: IconInstagramGrid, category: "Creative", isNew: true },
  { name: "Rotate PDF", href: "/tools/pdf-rotate", tagline: "Rotate PDF pages per-page or all at once. Text stays selectable. No upload.", accent: "#EF4444", badge: "Free", Icon: IconPdfRotate, category: "Optimize", isNew: true },
  { name: "Unlock PDF", href: "/tools/pdf-unlock", tagline: "Remove PDF printing, copying and editing restrictions. No upload, no password cracking.", accent: "#EF4444", badge: "Free", Icon: IconPdfUnlock, category: "Optimize", isNew: true },
  { name: "PDF Page Numbers", href: "/tools/pdf-page-numbers", tagline: "Add page numbers to every PDF page in your browser. 6 positions, 3 formats. No upload.", accent: "#EF4444", badge: "Free", Icon: IconPdfPageNumbers, category: "Optimize", isNew: true },
  { name: "Password Protect PDF", href: "/tools/pdf-protect", tagline: "Add a password to any PDF in your browser. Encrypted locally, never uploaded.", accent: "#EF4444", badge: "Free", Icon: IconPdfProtect, category: "Optimize", isNew: true },
  { name: "Rotate Image", href: "/tools/rotate-image", tagline: "Rotate JPG, PNG, WebP 90°, 180° or any angle. Batch + ZIP. No upload.", accent: "#0EA5E9", badge: "Free", Icon: IconRotateImage, category: "Optimize", isNew: true },
  { name: "Flip Image", href: "/tools/flip-image", tagline: "Mirror photos horizontally or vertically. Batch + ZIP. No upload.", accent: "#0EA5E9", badge: "Free", Icon: IconFlipImage, category: "Optimize", isNew: true },
  { name: "Add Border to Image", href: "/tools/add-border", tagline: "Add a colored border or frame to photos. Custom color + width. Batch + ZIP. No upload.", accent: "#0EA5E9", badge: "Free", Icon: IconAddBorder, category: "Optimize", isNew: true },
  { name: "Remove Background", href: "/tools/remove-bg", tagline: "Remove image backgrounds instantly with AI. 100% browser-based.", accent: "#EC4899", badge: "Free", Icon: IconRemoveBg, category: "AI-Powered" },
  { name: "AI Upscale", href: "/tools/upscale", tagline: "AI upscale images 2x or 4x without losing quality.", accent: "#8B5CF6", badge: "Free", Icon: IconUpscale, category: "AI-Powered" },
  { name: "Passport Photo", href: "/tools/passport-photo", tagline: "Auto crop + white background for passport and visa photos. 6 country presets.", accent: "#3B82F6", badge: "Free", Icon: IconPassportPhoto, category: "AI-Powered" },
  { name: "Image to Text (OCR)", href: "/tools/image-to-text", tagline: "Extract text from images with AI-powered OCR. 50+ languages.", accent: "#F59E0B", badge: "Free", Icon: IconAltText, category: "AI-Powered" },
  { name: "BlogDrop", href: "/tools/blogdrop", tagline: "Blog-ready images in one drop. Compress, resize, WebP, SEO names.", accent: "#8B5CF6", badge: "Free", Icon: IconWebLift, category: "Optimize", isCombo: true },
];

const TAB_CATEGORIES: TabCategory[] = ["Optimize", "AI-Powered", "Creative", "Organize"];

// ─── Component ────────────────────────────────────────────────────────────────

export function HomepageToolGrid() {
  const [activeTab, setActiveTab] = useState<TabCategory>("Optimize");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;
  const filtered = isSearching
    ? ALL_HOMEPAGE_TOOLS.filter((t) => {
        const hay = `${t.name} ${t.tagline} ${t.category}`.toLowerCase();
        // match if every word in the query appears somewhere
        return q.split(/\s+/).every((w) => hay.includes(w));
      })
    : ALL_HOMEPAGE_TOOLS.filter((t) => t.category === activeTab);

  return (
    <section className="py-14 px-4 sm:px-6 bg-white dark:bg-[#191919]">
      <div className="max-w-5xl mx-auto">
        <style>{`
          .hp-icon { transition: transform 0.2s ease; }
          .group:hover .hp-icon { animation: hp-icon-pop 0.45s ease both; }
          @keyframes hp-icon-pop {
            0% { transform: scale(1) rotate(0deg); }
            40% { transform: scale(1.18) rotate(-5deg); }
            70% { transform: scale(1.04) rotate(3deg); }
            100% { transform: scale(1.08) rotate(0deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .group:hover .hp-icon { animation: none; transform: scale(1.05); }
          }
        `}</style>

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
            {TOOL_COUNT} Free Tools
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Browser-based. No uploads, no account required for the basics.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-5">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3]" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${TOOL_COUNT} tools — try "compress", "mp4", "pdf"...`}
            aria-label="Search tools"
            className="w-full rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] py-2.5 pl-10 pr-9 text-sm text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#A3A3A3] dark:focus:border-[#525252] transition-colors"
          />
          {isSearching && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>

        {/* Category tabs (hidden while searching) */}
        <div
          className={`${isSearching ? "hidden" : "flex"} gap-1.5 overflow-x-auto mb-6 pb-0.5`}
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

        {/* Search results count */}
        {isSearching && (
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-3">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"} for &ldquo;{query.trim()}&rdquo;
          </p>
        )}

        {/* Empty state */}
        {isSearching && filtered.length === 0 && (
          <div className="text-center py-10 border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] mb-1">No tool matches &ldquo;{query.trim()}&rdquo;</p>
            <p className="text-xs text-[#A3A3A3]">
              Try a different word, or{" "}
              <Link href="/tools" className="text-[#6366F1] hover:underline">browse all {TOOL_COUNT} tools</Link>.
            </p>
          </div>
        )}

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
                  className="hp-icon w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tool.accent}14` }}
                >
                  <tool.Icon accent={tool.accent} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                      {tool.name}
                    </p>
                    {tool.isNew && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-[#8B5CF6] px-1.5 py-0.5 rounded flex-shrink-0">
                        NEW
                      </span>
                    )}
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
