"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

// ── Animated SVG icon components ─────────────────────────────────────────────

const IconAIRename: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes air-scan { 0%, 100% { transform: translateX(0px); opacity: 0.6; } 50% { transform: translateX(6px); opacity: 1; } }
      .air-scan { animation: air-scan 2s ease-in-out infinite; }
    `}</style>
    <rect x="4" y="6" width="24" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" fill={accent} fillOpacity="0.4"/>
    <path d="M4 20 L12 14 L18 18 L24 13 L28 18" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    <g className="air-scan">
      <rect x="30" y="10" width="2" height="10" rx="1" fill={accent}/>
    </g>
    <rect x="6" y="28" width="36" height="8" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="24" y="34" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">seo-name.webp</text>
  </svg>
);

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

const IconWebLift: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

// ── Tool definitions ─────────────────────────────────────────────────────────

interface AiTool {
  name: string;
  slug: string;
  description: string;
  accent: string;
  Icon: React.FC<{ accent: string }>;
}

const SINGLE_TOOLS: AiTool[] = [
  {
    name: "AI Rename",
    slug: "ai-rename",
    description: "SEO-optimized filenames with AI.",
    accent: "#8B5CF6",
    Icon: IconAIRename,
  },
  {
    name: "AI Alt Text",
    slug: "alt-text",
    description: "Accessibility alt text with AI.",
    accent: "#8B5CF6",
    Icon: IconAltText,
  },
  {
    name: "Transcribe",
    slug: "transcribe",
    description: "AI transcription with timestamps.",
    accent: "#0891B2",
    Icon: IconTranscribe,
  },
  {
    name: "SmartSort",
    slug: "smartsort",
    description: "AI sorts images into categories.",
    accent: "#22C55E",
    Icon: IconSmartSort,
  },
];

const MULTI_TOOLS: AiTool[] = [
  {
    name: "WebLift",
    slug: "weblift",
    description: "Compress + WebP + AI rename in one click.",
    accent: "#3B82F6",
    Icon: IconWebLift,
  },
  {
    name: "BlogDrop",
    slug: "blogdrop",
    description: "Blog-ready images in one drop.",
    accent: "#8B5CF6",
    Icon: IconBlogDrop,
  },
];

// ── Card component ───────────────────────────────────────────────────────────

function ToolGridCard({ tool }: { tool: AiTool }) {
  const IconComp = tool.Icon;
  return (
    <Link
      href={`/dashboard/tools/${tool.slug}`}
      className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-3">
        <div
          className="h-10 w-10 rounded-lg border flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${tool.accent}10`,
            borderColor: `${tool.accent}30`,
          }}
        >
          <IconComp accent={tool.accent} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {tool.name}
          </span>
          <p className="text-xs text-[#737373] mt-0.5">{tool.description}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-[#D4D4D4] group-hover:text-[#737373] transition-colors shrink-0 mt-1" strokeWidth={1.5} />
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AiToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
          AI Tools
        </h1>
        <p className="text-sm text-[#737373] mt-1">
          Powered by Google Gemini. Free: 10 AI uses/day &middot; Multi-step: 2 free batches/day.
        </p>
      </div>

      {/* Single AI Tools */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
          AI Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SINGLE_TOOLS.map((tool) => (
            <ToolGridCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>

      {/* Multi-step AI Tools */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
            Multi-step AI Tools
          </h2>
          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#525252]/10 dark:bg-[#737373]/20 text-[#525252] dark:text-[#A3A3A3] border border-[#525252]/20 dark:border-[#737373]/30">
            <Layers className="inline h-2.5 w-2.5 mr-0.5 -mt-px" strokeWidth={1.5} />
            MULTI
          </span>
        </div>
        <p className="text-xs text-[#A3A3A3] dark:text-[#525252] -mt-1">
          Chain multiple operations in a single batch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MULTI_TOOLS.map((tool) => (
            <ToolGridCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
