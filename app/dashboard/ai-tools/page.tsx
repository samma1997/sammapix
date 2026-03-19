"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, FileText, AudioLines, Globe, Layers, FolderSearch } from "lucide-react";

// ── AI Tool definitions ──────────────────────────────────────────────────────

const AI_TOOLS = [
  {
    name: "AI Rename",
    slug: "ai-rename",
    description: "SEO-optimized filenames with AI.",
    accent: "#8B5CF6",
    Icon: Zap,
  },
  {
    name: "AI Alt Text",
    slug: "alt-text",
    description: "Accessibility alt text with AI.",
    accent: "#8B5CF6",
    Icon: FileText,
  },
  {
    name: "Transcribe",
    slug: "transcribe",
    description: "AI transcription with timestamps.",
    accent: "#0891B2",
    Icon: AudioLines,
  },
  {
    name: "WebLift",
    slug: "weblift",
    description: "Compress + WebP + AI rename in one click.",
    accent: "#3B82F6",
    Icon: Globe,
    badge: "MULTI",
  },
  {
    name: "BlogDrop",
    slug: "blogdrop",
    description: "Blog-ready images in one drop.",
    accent: "#8B5CF6",
    Icon: Layers,
    badge: "MULTI",
  },
  {
    name: "SmartSort",
    slug: "smartsort",
    description: "AI sorts images into categories.",
    accent: "#22C55E",
    Icon: FolderSearch,
  },
];

export default function AiToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
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

      {/* AI Tool Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {AI_TOOLS.map((tool) => {
          const IconComp = tool.Icon;
          return (
            <Link
              key={tool.slug}
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
                  <IconComp className="h-4.5 w-4.5" style={{ color: tool.accent }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {tool.name}
                    </span>
                    {tool.badge && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#737373] mt-0.5">{tool.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#D4D4D4] group-hover:text-[#737373] transition-colors shrink-0 mt-1" strokeWidth={1.5} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
