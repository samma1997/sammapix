"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  PenLine,
  ShoppingBag,
  Code,
  Share2,
  Crown,
  ArrowRight,
  Lock,
  Download,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";
import {
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

// ─── Constants ────────────────────────────────────────────────────────────────

const LS_PERSONA_KEY = "sammapix-persona";
const LS_INSTALL_DISMISSED_KEY = "sammapix-install-banner-dismissed";

// ─── Persona config ───────────────────────────────────────────────────────────

const PERSONA_LABELS: Record<Persona, { label: string; Icon: LucideIcon }> = {
  photographer: { label: "Photographer", Icon: Camera },
  blogger: { label: "Blogger / Content Creator", Icon: PenLine },
  ecommerce: { label: "E-commerce Seller", Icon: ShoppingBag },
  developer: { label: "Web Developer", Icon: Code },
  social: { label: "Social Media Manager", Icon: Share2 },
};

const PERSONAS: {
  id: Persona;
  label: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "photographer",
    label: "Photographer",
    description: "Shoots, edits, and delivers galleries",
    Icon: Camera,
  },
  {
    id: "blogger",
    label: "Blogger / Content Creator",
    description: "Publishes articles with lots of images",
    Icon: PenLine,
  },
  {
    id: "ecommerce",
    label: "E-commerce Seller",
    description: "Product photos for online stores",
    Icon: ShoppingBag,
  },
  {
    id: "developer",
    label: "Web Developer",
    description: "Optimizes images for fast websites",
    Icon: Code,
  },
  {
    id: "social",
    label: "Social Media Manager",
    description: "Creates content for multiple platforms",
    Icon: Share2,
  },
];

// ─── Animated icons for Alt Text, Video Thumb, and new video tools ───────────

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-alt-pulse {
        0%, 100% { opacity: 0.5; transform: scale(0.95); }
        50%       { opacity: 1; transform: scale(1); }
      }
      .dh-alt-img    { transform-origin: 13px 20px; animation: dh-alt-pulse 2s ease-in-out infinite; }
      .dh-alt-cursor { animation: dh-alt-pulse 0.9s step-end infinite; }
    `}</style>
    <g className="dh-alt-img">
      <rect x="2" y="8" width="22" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 22 L9 16 L14 20 L18 16 L24 22" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="4" y="30" width="40" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="9" y="39" fontSize="6" fill={accent} fontWeight="700" fontFamily="monospace">alt=</text>
    <rect x="26" y="33" width="13" height="6" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="0.75"/>
    <rect className="dh-alt-cursor" x="27" y="34.5" width="1.25" height="3" rx="0.5" fill={accent}/>
  </svg>
);

const IconVideoThumb: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh-vt-scan {
        0%, 100% { transform: translateX(0px); }
        50%       { transform: translateX(16px); }
      }
      @keyframes dh-vt-play {
        0%, 60%  { transform: scale(0.8); opacity: 0.5; }
        80%, 100%{ transform: scale(1); opacity: 1; }
      }
      .dh-vt-scan { animation: dh-vt-scan 2.4s ease-in-out infinite; }
      .dh-vt-play { transform-origin: 14px 20px; animation: dh-vt-play 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <rect x="2" y="10" width="44" height="22" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    {[5, 13, 21, 29, 37].map((x) => (
      <React.Fragment key={x}>
        <rect x={x} y="12" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
        <rect x={x} y="26" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.25"/>
      </React.Fragment>
    ))}
    <rect x="6" y="17" width="12" height="8" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
    <g className="dh-vt-play">
      <path d="M11 18.5 L11 23.5 L16 21 Z" fill={accent}/>
    </g>
    <g className="dh-vt-scan">
      <line x1="19" y1="10" x2="19" y2="32" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.7"/>
    </g>
    <path d="M34 36 L34 44 M30 40 L34 44 L38 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDhVideoCompress: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dhvc-squeeze { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.7); } }
      @keyframes dhvc-al { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(4px); } }
      @keyframes dhvc-ar { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-4px); } }
      .dhvc-body { transform-origin: 24px 22px; animation: dhvc-squeeze 2s ease-in-out infinite; }
      .dhvc-al { animation: dhvc-al 2s ease-in-out infinite; }
      .dhvc-ar { animation: dhvc-ar 2s ease-in-out infinite; }
    `}</style>
    <g className="dhvc-body">
      <rect x="8" y="16" width="32" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="16" width="32" height="6" rx="2" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.25"/>
      <line x1="16" y1="16" x2="14" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="22" y1="16" x2="20" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="28" y1="16" x2="26" y2="22" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6"/>
      <path d="M20 27 L20 33 L26 30 Z" fill={accent} fillOpacity="0.6"/>
    </g>
    <g className="dhvc-al"><path d="M4 22 L8 19 M4 22 L8 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>
    <g className="dhvc-ar"><path d="M44 22 L40 19 M44 22 L40 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>
  </svg>
);

const IconDhVideoGif: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dhvg-frame { 0%, 100% { opacity: 1; } 33% { opacity: 0.4; } 66% { opacity: 0.7; } }
      @keyframes dhvg-loop { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .dhvg-f1 { animation: dhvg-frame 1.8s ease-in-out 0s infinite; }
      .dhvg-f2 { animation: dhvg-frame 1.8s ease-in-out 0.6s infinite; }
      .dhvg-f3 { animation: dhvg-frame 1.8s ease-in-out 1.2s infinite; }
      .dhvg-loop { transform-origin: 34px 34px; animation: dhvg-loop 2.4s linear infinite; }
    `}</style>
    <g className="dhvg-f1"><rect x="4" y="8" width="20" height="15" rx="2" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25" strokeOpacity="0.4"/></g>
    <g className="dhvg-f2"><rect x="7" y="11" width="20" height="15" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.25" strokeOpacity="0.6"/></g>
    <g className="dhvg-f3">
      <rect x="10" y="14" width="20" height="15" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <path d="M17 18 L17 23 L23 20.5 Z" fill={accent} fillOpacity="0.7"/>
    </g>
    <text x="4" y="38" fontSize="7" fill={accent} fontWeight="800" fontFamily="monospace" letterSpacing="1">GIF</text>
    <g className="dhvg-loop">
      <path d="M34 29 A5 5 0 1 1 29 34" stroke={accent} strokeWidth="1.75" strokeLinecap="round" fill="none"/>
      <path d="M28 30 L29 34 L33 33" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
  </svg>
);

const IconDhTranscribe: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dhtr-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
      @keyframes dhtr-line { 0%, 100% { opacity: 0.3; transform: scaleX(0.6); } 50% { opacity: 1; transform: scaleX(1); } }
      .dhtr-b1 { transform-origin: 8px 22px; animation: dhtr-wave 1.2s ease-in-out 0s infinite; }
      .dhtr-b2 { transform-origin: 12px 22px; animation: dhtr-wave 1.2s ease-in-out 0.15s infinite; }
      .dhtr-b3 { transform-origin: 16px 22px; animation: dhtr-wave 1.2s ease-in-out 0.3s infinite; }
      .dhtr-b4 { transform-origin: 20px 22px; animation: dhtr-wave 1.2s ease-in-out 0.45s infinite; }
      .dhtr-b5 { transform-origin: 24px 22px; animation: dhtr-wave 1.2s ease-in-out 0.6s infinite; }
      .dhtr-l1 { transform-origin: 28px 31px; animation: dhtr-line 1.8s ease-in-out 0s infinite; }
      .dhtr-l2 { transform-origin: 28px 36px; animation: dhtr-line 1.8s ease-in-out 0.4s infinite; }
      .dhtr-l3 { transform-origin: 28px 41px; animation: dhtr-line 1.8s ease-in-out 0.8s infinite; }
    `}</style>
    <g className="dhtr-b1"><rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <g className="dhtr-b2"><rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="dhtr-b3"><rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/></g>
    <g className="dhtr-b4"><rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/></g>
    <g className="dhtr-b5"><rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/></g>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="dhtr-l1"><rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="dhtr-l2"><rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
    <g className="dhtr-l3"><rect x="28" y="39" width="14" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/></g>
  </svg>
);

const IconDhVideoResize: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dhvr-wide { 0%, 40%, 100% { opacity: 1; transform: scale(1); } 60%, 80% { opacity: 0.2; transform: scale(0.9); } }
      @keyframes dhvr-tall { 0%, 40%, 100% { opacity: 0.2; transform: scale(0.9); } 60%, 80% { opacity: 1; transform: scale(1); } }
      .dhvr-wide { transform-origin: 13px 22px; animation: dhvr-wide 2.4s ease-in-out infinite; }
      .dhvr-tall { transform-origin: 35px 24px; animation: dhvr-tall 2.4s ease-in-out infinite; }
    `}</style>
    <g className="dhvr-wide">
      <rect x="2" y="16" width="22" height="12" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <text x="6" y="25" fontSize="5" fill={accent} fontWeight="700" fontFamily="monospace" fillOpacity="0.7">16:9</text>
    </g>
    <path d="M26 22 L30 22 M28 20 L30 22 L28 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="dhvr-tall">
      <rect x="28" y="10" width="18" height="28" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <text x="31" y="27" fontSize="5" fill={accent} fontWeight="700" fontFamily="monospace" fillOpacity="0.7">9:16</text>
    </g>
  </svg>
);

// ─── Animated workflow preset icons ───────────────────────────────────────────

const IconWorkflowBlog: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes wf-blog-img {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(0.85); }
      }
      @keyframes wf-blog-spark {
        0%, 55%  { transform: scale(0) rotate(0deg); opacity: 0; }
        70%      { transform: scale(1.2) rotate(15deg); opacity: 1; }
        85%, 100%{ transform: scale(1) rotate(0deg); opacity: 0.8; }
      }
      .wf-blog-img   { transform-origin: 10px 14px; animation: wf-blog-img 2.4s ease-in-out infinite; }
      .wf-blog-spark { transform-origin: 40px 12px; animation: wf-blog-spark 2.4s ease-in-out infinite; }
    `}</style>
    {/* Document base */}
    <rect x="4" y="6" width="28" height="36" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"/>
    {/* Lines of text */}
    <line x1="9" y1="28" x2="27" y2="28" stroke={accent} strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="9" y1="33" x2="24" y2="33" stroke={accent} strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="9" y1="38" x2="27" y2="38" stroke={accent} strokeWidth="1.1" strokeLinecap="round"/>
    {/* Image thumbnail in doc */}
    <g className="wf-blog-img">
      <rect x="8" y="10" width="14" height="12" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
      <path d="M8 19 L12 15 L16 18 L20 14" stroke={accent} strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.7"/>
    </g>
    {/* Sparkle */}
    <g className="wf-blog-spark" style={{ opacity: 0 }}>
      <path d="M40 8 L41 11 L44 12 L41 13 L40 16 L39 13 L36 12 L39 11 Z" fill={accent}/>
    </g>
  </svg>
);

const IconWorkflowInstagram: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes wf-ig-frame {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(0.9); }
      }
      @keyframes wf-ig-arrow {
        0%, 40% { transform: scale(0); opacity: 0; }
        60%, 90%{ transform: scale(1); opacity: 1; }
        100%    { transform: scale(0); opacity: 0; }
      }
      .wf-ig-frame { transform-origin: 24px 24px; animation: wf-ig-frame 2s ease-in-out infinite; }
      .wf-ig-tl    { transform-origin: 10px 10px; animation: wf-ig-arrow 2s ease-in-out 0s infinite; }
      .wf-ig-tr    { transform-origin: 38px 10px; animation: wf-ig-arrow 2s ease-in-out 0.1s infinite; }
      .wf-ig-bl    { transform-origin: 10px 38px; animation: wf-ig-arrow 2s ease-in-out 0.2s infinite; }
      .wf-ig-br    { transform-origin: 38px 38px; animation: wf-ig-arrow 2s ease-in-out 0.3s infinite; }
    `}</style>
    {/* Square frame */}
    <g className="wf-ig-frame">
      <rect x="8" y="8" width="32" height="32" rx="7" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.75"/>
      <circle cx="24" cy="24" r="7" fill={accent} fillOpacity="0.2"/>
      <circle cx="24" cy="24" r="3" fill={accent} fillOpacity="0.5"/>
      <circle cx="34" cy="14" r="2" fill={accent} fillOpacity="0.6"/>
    </g>
    {/* Corner resize handles */}
    <g className="wf-ig-tl" style={{ opacity: 0 }}>
      <path d="M6 14 L6 6 L14 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="wf-ig-tr" style={{ opacity: 0 }}>
      <path d="M42 14 L42 6 L34 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="wf-ig-bl" style={{ opacity: 0 }}>
      <path d="M6 34 L6 42 L14 42" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="wf-ig-br" style={{ opacity: 0 }}>
      <path d="M42 34 L42 42 L34 42" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

const IconWorkflowEcommerce: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes wf-ec-check {
        0%, 50%  { transform: scale(0); opacity: 0; }
        70%      { transform: scale(1.2); opacity: 1; }
        85%, 100%{ transform: scale(1); opacity: 1; }
      }
      @keyframes wf-ec-box {
        0%, 100% { transform: translateY(0px); }
        30%      { transform: translateY(-3px); }
        60%      { transform: translateY(0px); }
      }
      .wf-ec-box   { transform-origin: 24px 26px; animation: wf-ec-box 2.2s ease-in-out infinite; }
      .wf-ec-check { transform-origin: 36px 16px; animation: wf-ec-check 2.2s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Box / package */}
    <g className="wf-ec-box">
      <path d="M8 20 L24 12 L40 20 L40 36 L24 44 L8 36 Z" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 20 L24 28 L40 20" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="24" y1="28" x2="24" y2="44" stroke={accent} strokeWidth="1.5"/>
    </g>
    {/* Checkmark badge */}
    <g className="wf-ec-check" style={{ opacity: 0 }}>
      <circle cx="36" cy="16" r="9" fill="#16A34A"/>
      <path d="M32 16 L35 19 L41 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

const IconWorkflowDelivery: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes wf-dl-arrow {
        0%, 30%  { transform: translateY(-4px); opacity: 0.3; }
        55%, 80% { transform: translateY(0px); opacity: 1; }
        100%     { transform: translateY(-4px); opacity: 0.3; }
      }
      @keyframes wf-dl-folder {
        0%, 100% { transform: scale(1); }
        50%      { transform: scale(1.04); }
      }
      .wf-dl-arrow  { animation: wf-dl-arrow 2s ease-in-out infinite; }
      .wf-dl-folder { transform-origin: 18px 26px; animation: wf-dl-folder 2s ease-in-out infinite; }
    `}</style>
    {/* Folder */}
    <g className="wf-dl-folder">
      <path d="M4 18 L4 40 L44 40 L44 18 Z" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 18 L4 14 L18 14 L22 18 L44 18" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
    </g>
    {/* Download arrow */}
    <g className="wf-dl-arrow">
      <line x1="24" y1="20" x2="24" y2="33" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 29 L24 35 L30 29" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

// ─── Tools config ─────────────────────────────────────────────────────────────

interface ToolEntry {
  name: string;
  slug: string;
  accent: string;
  Icon: React.FC<{ accent: string }>;
}

const ALL_TOOLS: ToolEntry[] = [
  { name: "Compress",    slug: "compress",   accent: "#6366F1", Icon: IconCompress },
  { name: "WebP",        slug: "webp",        accent: "#10B981", Icon: IconWebP },
  { name: "AI Rename",   slug: "ai-rename",   accent: "#8B5CF6", Icon: IconAIRename },
  { name: "AI Alt Text", slug: "alt-text",    accent: "#8B5CF6", Icon: IconAltText },
  { name: "EXIF Lens",   slug: "exif",        accent: "#EF4444", Icon: IconEXIF },
  { name: "FilmLab",     slug: "filmlab",     accent: "#F59E0B", Icon: IconFilmLab },
  { name: "StampIt",     slug: "stampit",     accent: "#06B6D4", Icon: IconStampIt },
  { name: "CropRatio",   slug: "croproatio",  accent: "#EC4899", Icon: IconCropRatio },
  { name: "TwinHunt",    slug: "twinhunt",    accent: "#F97316", Icon: IconTwinHunt },
  { name: "GeoSort",     slug: "geosort",     accent: "#22C55E", Icon: IconGeoSort },
  { name: "TravelMap",   slug: "travelmap",   accent: "#3B82F6", Icon: IconTravelMap },
  { name: "ResizePack",  slug: "resizepack",  accent: "#14B8A6", Icon: IconResizePack },
  { name: "Cull",        slug: "cull",        accent: "#F43F5E", Icon: IconCull },
  { name: "HEIC",        slug: "heic",        accent: "#6366F1", Icon: IconHEIC },
  { name: "Video Thumb",    slug: "video-thumb",    accent: "#0EA5E9", Icon: IconVideoThumb },
  { name: "Video Compress", slug: "video-compress", accent: "#7C3AED", Icon: IconDhVideoCompress },
  { name: "Video to GIF",   slug: "video-gif",      accent: "#D946EF", Icon: IconDhVideoGif },
  { name: "Transcribe",     slug: "transcribe",     accent: "#0891B2", Icon: IconDhTranscribe },
  { name: "Video Resize",   slug: "video-resize",   accent: "#059669", Icon: IconDhVideoResize },
];

const PERSONA_RECOMMENDED: Record<Persona, string[]> = {
  photographer: ["Cull", "Compress", "AI Rename", "FilmLab", "GeoSort"],
  blogger: ["Compress", "AI Rename", "AI Alt Text", "WebP", "ResizePack"],
  ecommerce: ["Compress", "AI Rename", "ResizePack", "WebP", "StampIt"],
  developer: ["Compress", "WebP", "EXIF Lens", "AI Alt Text", "ResizePack"],
  social: ["ResizePack", "CropRatio", "Compress", "StampIt", "FilmLab"],
};

// ─── Workflow presets ─────────────────────────────────────────────────────────

interface WorkflowPreset {
  name: string;
  accent: string;
  steps: string[];
  Icon: React.FC<{ accent: string }>;
}

const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    name: "Blog Post",
    accent: "#8B5CF6",
    steps: ["Compress", "AI Rename", "Alt Text", "WebP"],
    Icon: IconWorkflowBlog,
  },
  {
    name: "Instagram",
    accent: "#EC4899",
    steps: ["Compress", "Resize 1080", "Crop"],
    Icon: IconWorkflowInstagram,
  },
  {
    name: "E-commerce",
    accent: "#F59E0B",
    steps: ["Compress", "AI Rename", "Resize", "WebP"],
    Icon: IconWorkflowEcommerce,
  },
  {
    name: "Client Delivery",
    accent: "#3B82F6",
    steps: ["Light compress", "Watermark", "ZIP"],
    Icon: IconWorkflowDelivery,
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardHomeProps {
  userName: string | null;
  userPlan: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardHome({ userName, userPlan }: DashboardHomeProps) {
  const isPro = userPlan === "pro";
  const firstName = userName?.split(" ")[0] ?? "there";
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // State
  const [persona, setPersona] = useState<Persona | null>(null);
  const [personaSkipped, setPersonaSkipped] = useState(false);
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [lockedCardExpanded, setLockedCardExpanded] = useState<string | null>(null);

  const loadPersona = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY);
    if (!stored) {
      setShowPersonaSelector(true);
    } else if (stored === "skipped") {
      setPersonaSkipped(true);
      setShowPersonaSelector(false);
    } else {
      setPersona(stored as Persona);
      setShowPersonaSelector(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadPersona();
    const dismissed = localStorage.getItem(LS_INSTALL_DISMISSED_KEY);
    if (!dismissed) setShowInstallBanner(true);
  }, [loadPersona]);

  function handlePersonaSelect(p: Persona) {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_PERSONA_KEY, p);
    }
    setPersona(p);
    setShowPersonaSelector(false);
    setPersonaSkipped(false);
  }

  function handleChangeRole() {
    setShowPersonaSelector(true);
    setPersona(null);
    setPersonaSkipped(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_PERSONA_KEY);
    }
  }

  function handleSkipSurvey() {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_PERSONA_KEY, "skipped");
    }
    setPersonaSkipped(true);
    setShowPersonaSelector(false);
  }

  async function handleUpgradeClick() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", credentials: "include" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push("/dashboard/upgrade");
      }
    } catch {
      router.push("/dashboard/upgrade");
    } finally {
      setCheckoutLoading(false);
    }
  }

  // Build tool lists
  const recommendedNames = persona ? PERSONA_RECOMMENDED[persona] : [];
  const recommendedTools = ALL_TOOLS.filter((t) => recommendedNames.includes(t.name));
  const otherTools = persona
    ? ALL_TOOLS.filter((t) => !recommendedNames.includes(t.name))
    : ALL_TOOLS;

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="h-5 w-5 rounded-full border-2 border-[#171717] dark:border-[#E5E5E5] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 pb-16 space-y-8">

      {/* ── SECTION 1: Welcome + Persona selector ── */}
      <section>
        {/* Welcome header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-1.5">
              Welcome back, {firstName}
            </h1>
            {/* Current persona badge */}
            {persona && !showPersonaSelector &&
              (() => {
                const { label, Icon } = PERSONA_LABELS[persona];
                return (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-[#6366F1] bg-[#6366F1]/8 dark:bg-[#6366F1]/15 px-2 py-0.5 rounded">
                      <Icon className="h-3 w-3" strokeWidth={1.5} />
                      {label}
                    </span>
                    <button
                      onClick={handleChangeRole}
                      className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
                    >
                      Change
                    </button>
                  </div>
                );
              })()}
            {personaSkipped && !showPersonaSelector && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleChangeRole}
                  className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
                >
                  Set your role to get recommendations
                </button>
              </div>
            )}
          </div>
          {isPro && (
            <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-2 py-0.5 rounded shrink-0">
              <Crown className="h-3 w-3" strokeWidth={1.5} />
              PRO
            </span>
          )}
        </div>

        {/* Install app banner */}
        {showInstallBanner && (
          <div className="mb-5 flex items-start gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <Download className="h-4 w-4 text-[#A3A3A3] dark:text-[#525252] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">
                Install SammaPix app
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">
                Add to your desktop for instant access. Click the install icon in your browser&apos;s address bar.
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.setItem(LS_INSTALL_DISMISSED_KEY, "1");
                setShowInstallBanner(false);
              }}
              aria-label="Dismiss install banner"
              className="shrink-0 p-1 rounded text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Inline persona selector */}
        {showPersonaSelector && (
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              What do you use SammaPix for?
            </h2>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-4">
              We will show you the most relevant tools for your workflow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PERSONAS.map(({ id, label, description, Icon }) => (
                <button
                  key={id}
                  onClick={() => handlePersonaSelect(id)}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] text-left hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
                >
                  <Icon
                    className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3] mt-0.5 shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">
                      {label}
                    </p>
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">
                      {description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleSkipSurvey}
              className="mt-3 text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors underline-offset-2 hover:underline"
            >
              Skip for now
            </button>
          </div>
        )}
      </section>

      {/* ── SECTION 2: Recommended tools (persona only) ── */}
      {persona && recommendedTools.length > 0 && (
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
            Recommended for {PERSONA_LABELS[persona].label}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {recommendedTools.map((tool) => (
              <Link
                key={tool.name}
                href={`/dashboard/tools/${tool.slug}`}
                className="group flex flex-col items-center gap-3 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150"
                style={{ borderLeftColor: tool.accent, borderLeftWidth: "2px" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: `${tool.accent}18` }}
                >
                  <tool.Icon accent={tool.accent} />
                </div>
                <span className="text-xs font-semibold text-center text-[#171717] dark:text-[#E5E5E5] leading-snug">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SECTION 3: All Tools ── */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
          {persona ? "Other Tools" : "Tools"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {otherTools.map((tool) => {
            return (
              <Link
                key={tool.name}
                href={`/dashboard/tools/${tool.slug}`}
                className="group flex flex-col items-center gap-3 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: `${tool.accent}14` }}
                >
                  <tool.Icon accent={tool.accent} />
                </div>
                <span className="text-xs font-medium text-center leading-snug text-[#171717] dark:text-[#E5E5E5]">
                  {tool.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 4: AI Workflow Presets ── */}
      <section>
        <div className="mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-1">
            AI Workflow Presets
          </p>
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Run your full pipeline in one click
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WORKFLOW_PRESETS.map((preset) => {
            const isExpanded = lockedCardExpanded === preset.name;

            if (isPro) {
              return (
                <Link
                  key={preset.name}
                  href="/dashboard/tools/workflow"
                  className="group flex items-center gap-4 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: `${preset.accent}14` }}
                  >
                    <preset.Icon accent={preset.accent} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                        {preset.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#D4D4D4] group-hover:text-[#6366F1] transition-colors" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug">
                      {preset.steps.join(" → ")}
                    </p>
                  </div>
                </Link>
              );
            }

            // Locked card for Free users
            return (
              <div
                key={preset.name}
                className="flex flex-col gap-3 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg"
              >
                <div
                  className="flex items-center gap-4 opacity-50 grayscale cursor-pointer"
                  onClick={() => setLockedCardExpanded(isExpanded ? null : preset.name)}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${preset.accent}14` }}
                  >
                    <preset.Icon accent={preset.accent} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                        {preset.name}
                      </span>
                      <Lock className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs text-[#A3A3A3] dark:text-[#525252] leading-snug">
                      {preset.steps.join(" → ")}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <div className="pt-1 border-t border-[#F5F5F5] dark:border-[#2A2A2A]">
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-2">
                      Upgrade to Pro to unlock AI Workflow presets.
                    </p>
                    <Link
                      href="/dashboard/upgrade"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-md transition-colors"
                    >
                      <Crown className="h-3 w-3" strokeWidth={1.5} />
                      Upgrade to Pro
                    </Link>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() => setLockedCardExpanded(preset.name)}
                  >
                    <Lock className="h-3 w-3 text-[#A3A3A3]" strokeWidth={1.5} />
                    <span className="text-[11px] text-[#A3A3A3] font-medium">Pro only</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Soft upgrade pitch at bottom */}
        {!isPro && (
          <div className="mt-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Upgrade to Pro
                </h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  Unlimited AI Rename, Alt Text, Workflows. No ads. $7/mo.
                </p>
              </div>
              <button
                onClick={handleUpgradeClick}
                disabled={checkoutLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 disabled:opacity-60 transition-colors shrink-0"
              >
                {checkoutLoading ? "Redirecting…" : "Upgrade to Pro"}
                {!checkoutLoading && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
