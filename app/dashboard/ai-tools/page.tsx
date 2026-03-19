"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles, ArrowRight } from "lucide-react";

// ── AI Tool definitions ──────────────────────────────────────────────────────

const AI_TOOLS = [
  {
    name: "AI Rename",
    slug: "ai-rename",
    description: "SEO-optimized filenames with AI.",
    accent: "#8B5CF6",
  },
  {
    name: "AI Alt Text",
    slug: "alt-text",
    description: "Accessibility alt text with AI.",
    accent: "#8B5CF6",
  },
  {
    name: "Transcribe",
    slug: "transcribe",
    description: "AI transcription with timestamps.",
    accent: "#0891B2",
  },
  {
    name: "WebLift",
    slug: "weblift",
    description: "Compress + WebP + AI rename in one click.",
    accent: "#3B82F6",
    badge: "MULTI",
  },
  {
    name: "BlogDrop",
    slug: "blogdrop",
    description: "Blog-ready images in one drop.",
    accent: "#8B5CF6",
    badge: "MULTI",
  },
  {
    name: "SmartSort",
    slug: "smartsort",
    description: "AI sorts images into categories.",
    accent: "#22C55E",
  },
];

const WORKFLOW_PRESETS = [
  { id: "blog", name: "Blog Optimizer", desc: "Compress + WebP + SEO rename for blog posts" },
  { id: "instagram", name: "Instagram Ready", desc: "Resize + compress for Instagram feed" },
  { id: "ecommerce", name: "E-commerce", desc: "Product photos optimized for web stores" },
  { id: "client", name: "Client Delivery", desc: "High-quality export with metadata stripped" },
];

export default function AiToolsPage() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
          AI Tools
        </h1>
        <p className="text-sm text-[#737373] mt-1">
          Powered by Google Gemini. All AI features require login.
        </p>
      </div>

      {/* AI Tool Cards Grid */}
      <div>
        <h2 className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-3">Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AI_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/dashboard/tools/${tool.slug}`}
              className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className="h-10 w-10 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tool.accent}10` }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: tool.accent }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {tool.name}
                    </span>
                    {tool.badge && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#737373] border border-[#E5E5E5] dark:border-[#333]">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#737373] mt-0.5">{tool.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#D4D4D4] group-hover:text-[#737373] transition-colors shrink-0 mt-1" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Workflows */}
      <div>
        <h2 className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-3">Quick Workflows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {WORKFLOW_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              href={`/dashboard/tools/workflow?preset=${preset.id}`}
              className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  {preset.name}
                </span>
                {!isPro && (
                  <span className="text-[9px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-1.5 py-0.5 rounded">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#737373]">{preset.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
