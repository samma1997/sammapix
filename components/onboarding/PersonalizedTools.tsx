"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Persona } from "./OnboardingModal";

// ─── Persona data ─────────────────────────────────────────────────────────────

interface PersonaTool {
  name: string;
  href: string;
  why: string;
}

interface PersonaConfig {
  title: string;
  subtitle: string;
  tools: PersonaTool[];
  workflow: string;
  proCta: string;
}

const PERSONA_TOOLS: Record<Persona, PersonaConfig> = {
  photographer: {
    title: "Your photography workflow",
    subtitle: "The tools that matter most for your shoots",
    tools: [
      { name: "Cull", href: "/tools/cull", why: "Rate and select your best shots" },
      { name: "Compress", href: "/tools/compress", why: "Shrink files without quality loss" },
      { name: "AI Rename", href: "/tools/ai-rename", why: "SEO-ready filenames in seconds" },
      { name: "Film Filters", href: "/tools/filmlab", why: "Add analog film looks" },
      { name: "Sort by Location", href: "/tools/geosort", why: "Organize by shooting location" },
      { name: "Photo Map", href: "/tools/travelmap", why: "Map your photo journey" },
    ],
    workflow: "Shoot → Cull → Compress → AI Rename → Deliver",
    proCta: "Process full shoots in one click with WebLift",
  },
  blogger: {
    title: "Your blogging workflow",
    subtitle: "Optimize images for fast, SEO-friendly posts",
    tools: [
      { name: "Compress", href: "/tools/compress", why: "Faster page loads" },
      { name: "AI Rename", href: "/tools/ai-rename", why: "Rank in Google Images" },
      { name: "AI Alt Text", href: "/tools/alt-text", why: "Accessibility + SEO" },
      { name: "WebP", href: "/tools/webp", why: "25-34% smaller than JPEG" },
      { name: "Batch Resize", href: "/tools/resizepack", why: "Perfect sizes for your CMS" },
    ],
    workflow: "Write → Drop photos → Compress → AI Rename → Alt Text → Publish",
    proCta: "Run the Blog preset with BlogDrop",
  },
  ecommerce: {
    title: "Your product photo workflow",
    subtitle: "Get product images ready for any marketplace",
    tools: [
      { name: "Compress", href: "/tools/compress", why: "Meet marketplace size limits" },
      { name: "AI Rename", href: "/tools/ai-rename", why: "Product-keyword filenames" },
      { name: "Batch Resize", href: "/tools/resizepack", why: "Platform-specific sizes" },
      { name: "WebP", href: "/tools/webp", why: "Faster product pages" },
      { name: "Watermark", href: "/tools/stampit", why: "Protect with watermarks" },
    ],
    workflow: "Shoot product → Compress → Rename → Resize → List",
    proCta: "Optimize product photos with WebLift",
  },
  developer: {
    title: "Your web optimization workflow",
    subtitle: "Ship faster sites with optimized assets",
    tools: [
      { name: "Compress", href: "/tools/compress", why: "Reduce payload size" },
      { name: "WebP", href: "/tools/webp", why: "Modern format, smaller files" },
      { name: "EXIF Viewer", href: "/tools/exif", why: "Strip metadata, save bytes" },
      { name: "AI Alt Text", href: "/tools/alt-text", why: "WCAG compliance" },
      { name: "Batch Resize", href: "/tools/resizepack", why: "Responsive image sizes" },
    ],
    workflow: "Asset → Compress → WebP → Strip EXIF → Deploy",
    proCta: "Automate with WebLift pipeline",
  },
  social: {
    title: "Your social media workflow",
    subtitle: "Content ready for every platform in minutes",
    tools: [
      { name: "Batch Resize", href: "/tools/resizepack", why: "Instagram, Twitter, LinkedIn sizes" },
      { name: "Crop & Ratio", href: "/tools/croproatio", why: "Perfect aspect ratios" },
      { name: "Compress", href: "/tools/compress", why: "Fast uploads" },
      { name: "Watermark", href: "/tools/stampit", why: "Brand watermarks" },
      { name: "Film Filters", href: "/tools/filmlab", why: "Consistent visual style" },
    ],
    workflow: "Create → Crop → Compress → Watermark → Post",
    proCta: "Optimize content with WebLift",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface PersonalizedToolsProps {
  persona: Persona;
  onChangeRole: () => void;
}

export default function PersonalizedTools({
  persona,
  onChangeRole,
}: PersonalizedToolsProps) {
  const config = PERSONA_TOOLS[persona];
  const workflowSteps = config.workflow.split(" → ");

  return (
    <section className="py-14 px-4 sm:px-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#6366F1] mb-2 inline-block">
              Recommended for you
            </span>
            <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              {config.title}
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              {config.subtitle}
            </p>
          </div>
          <button
            onClick={onChangeRole}
            className="flex-shrink-0 text-xs text-[#A3A3A3] dark:text-[#525252] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors underline-offset-2 hover:underline mt-1"
          >
            Change role
          </button>
        </div>

        {/* Tool cards- horizontally scrollable on mobile, grid on sm+ */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          {config.tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={[
                "group flex-shrink-0 w-[160px] sm:w-auto",
                "flex flex-col gap-1.5 p-3.5",
                "bg-white dark:bg-[#191919]",
                "border border-[#E5E5E5] dark:border-[#2A2A2A]",
                "rounded-lg",
                "hover:border-[#A3A3A3] dark:hover:border-[#444]",
                "hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]",
                "transition-all duration-150",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  {tool.name}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-[#D4D4D4] group-hover:text-[#6366F1] transition-colors flex-shrink-0"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug">
                {tool.why}
              </p>
            </Link>
          ))}
        </div>

        {/* Workflow strip */}
        <div className="mb-5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-2">
            Suggested workflow
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {workflowSteps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-medium whitespace-nowrap">
                    {step}
                  </span>
                </div>
                {i < workflowSteps.length - 1 && (
                  <ArrowRight
                    className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#404040] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pro CTA */}
        <Link
          href="/tools/weblift"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 transition-colors"
        >
          {config.proCta}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
