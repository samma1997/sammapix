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
  Download,
  X,
  Sparkles,
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

// ─── Animated Workflow Preset Icons (dashboard-sized) ─────────────────────────


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
  { id: "photographer", label: "Photographer", description: "Shoots, edits, and delivers galleries", Icon: Camera },
  { id: "blogger", label: "Blogger / Content Creator", description: "Publishes articles with lots of images", Icon: PenLine },
  { id: "ecommerce", label: "E-commerce Seller", description: "Product photos for online stores", Icon: ShoppingBag },
  { id: "developer", label: "Web Developer", description: "Optimizes images for fast websites", Icon: Code },
  { id: "social", label: "Social Media Manager", description: "Creates content for multiple platforms", Icon: Share2 },
];

// ─── Persona -> Tool mappings ────────────────────────────────────────────────

const PERSONA_TOOL_MAP: Record<Persona, string[]> = {
  photographer: ["cull", "compress", "ai-rename", "filmlab", "geosort", "travelmap", "exif", "weblift", "smartsort"],
  blogger: ["compress", "ai-rename", "alt-text", "webp", "blogdrop", "resizepack", "batchname"],
  ecommerce: ["compress", "ai-rename", "resizepack", "stampit", "webp", "batchname"],
  developer: ["compress", "webp", "resizepack", "exif", "croproatio", "batchname"],
  social: ["compress", "resizepack", "croproatio", "filmlab", "stampit", "batchname"],
};

// ─── Animated icons for combo/AI tools ────────────────────────────────────────

const IconAltText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dh2-alt-pulse { 0%, 100% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1); } }
      .dh2-alt-img { transform-origin: 13px 20px; animation: dh2-alt-pulse 2s ease-in-out infinite; }
    `}</style>
    <g className="dh2-alt-img">
      <rect x="2" y="8" width="22" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 22 L9 16 L14 20 L18 16 L24 22" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <rect x="4" y="30" width="40" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="9" y="39" fontSize="6" fill={accent} fontWeight="700" fontFamily="monospace">alt=</text>
  </svg>
);

const IconDhTranscribe: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/>
    <rect x="11" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/>
    <rect x="16" y="12" width="3" height="20" rx="1.5" fill={accent}/>
    <rect x="21" y="15" width="3" height="14" rx="1.5" fill={accent} fillOpacity="0.8"/>
    <rect x="26" y="18" width="3" height="8" rx="1.5" fill={accent} fillOpacity="0.6"/>
    <path d="M33 22 L38 22 M35 19 L38 22 L35 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="29" width="16" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
    <rect x="28" y="34" width="12" height="2.5" rx="1.25" fill={accent} fillOpacity="0.5"/>
  </svg>
);

const IconDhWebLift: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="20" height="16" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <path d="M26 18 L30 18 M28 16 L30 18 L28 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="32" y="12" width="14" height="12" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
    <text x="39" y="20" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">.webp</text>
  </svg>
);

const IconDhBlogDrop: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="4" width="32" height="40" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <rect x="12" y="8" width="24" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
    <line x1="12" y1="27" x2="36" y2="27" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="12" y1="31" x2="30" y2="31" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <rect x="30" y="36" width="12" height="8" rx="2" fill={accent}/>
    <text x="36" y="42" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">BLOG</text>
  </svg>
);

const IconDhBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
  </svg>
);

const IconDhSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
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

// ─── Tools by category ───────────────────────────────────────────────────────

type DashCategory = "Optimize" | "AI" | "Multi-step" | "Creative" | "Organize";

interface DashToolEntry {
  name: string;
  slug: string;
  accent: string;
  Icon: React.FC<{ accent: string }>;
  badge: string;
  isCombo?: boolean;
  isAi?: boolean;
  category: DashCategory;
}

const ALL_DASH_TOOLS: DashToolEntry[] = [
  // Optimize
  { name: "Compress", slug: "compress", accent: "#6366F1", Icon: IconCompress, badge: "Free", category: "Optimize" },
  { name: "WebP Converter", slug: "webp", accent: "#10B981", Icon: IconWebP, badge: "Free", category: "Optimize" },
  { name: "HEIC Converter", slug: "heic", accent: "#6366F1", Icon: IconHEIC, badge: "Free", category: "Optimize" },
  { name: "Batch Resize", slug: "resizepack", accent: "#14B8A6", Icon: IconResizePack, badge: "Free", category: "Optimize" },
  { name: "Crop & Ratio", slug: "croproatio", accent: "#EC4899", Icon: IconCropRatio, badge: "Free", category: "Optimize" },

  // AI
  { name: "AI Rename", slug: "ai-rename", accent: "#8B5CF6", Icon: IconAIRename, badge: "Login", isAi: true, category: "AI" },
  { name: "AI Alt Text", slug: "alt-text", accent: "#8B5CF6", Icon: IconAltText, badge: "Login", isAi: true, category: "AI" },
  { name: "Transcribe", slug: "transcribe", accent: "#0891B2", Icon: IconDhTranscribe, badge: "Login", isAi: true, category: "AI" },
  { name: "AI Photo Sort", slug: "smartsort", accent: "#22C55E", Icon: IconDhSmartSort, badge: "Login", isAi: true, category: "AI" },

  // Multi-step
  { name: "Web Optimize", slug: "weblift", accent: "#3B82F6", Icon: IconDhWebLift, badge: "Login", category: "Multi-step", isCombo: true },
  { name: "Blog Ready", slug: "blogdrop", accent: "#8B5CF6", Icon: IconDhBlogDrop, badge: "Login", category: "Multi-step", isCombo: true },

  // Creative
  { name: "Film Filters", slug: "filmlab", accent: "#F59E0B", Icon: IconFilmLab, badge: "Free", category: "Creative" },
  { name: "Watermark", slug: "stampit", accent: "#06B6D4", Icon: IconStampIt, badge: "Free", category: "Creative" },

  // Organize
  { name: "EXIF Viewer", slug: "exif", accent: "#EF4444", Icon: IconEXIF, badge: "Free", category: "Organize" },
  { name: "Find Duplicates", slug: "twinhunt", accent: "#F97316", Icon: IconTwinHunt, badge: "Free", category: "Organize" },
  { name: "Sort by Location", slug: "geosort", accent: "#22C55E", Icon: IconGeoSort, badge: "Free", category: "Organize" },
  { name: "Photo Map", slug: "travelmap", accent: "#3B82F6", Icon: IconTravelMap, badge: "Free", category: "Organize" },
  { name: "Photo Cull", slug: "cull", accent: "#F43F5E", Icon: IconCull, badge: "Free", category: "Organize" },
  { name: "Batch Rename", slug: "batchname", accent: "#F59E0B", Icon: IconDhBatchName, badge: "Free", category: "Organize" },
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
  const [persona, setPersona] = useState<Persona | null>(null);
  const [personaSkipped, setPersonaSkipped] = useState(false);
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

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

  // Dispatch custom event when persona changes so sidebar can react
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("sammapix-persona-change", { detail: persona }));
  }, [persona]);

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

  // Compute recommended and other tools based on persona
  const recommendedSlugs = persona ? PERSONA_TOOL_MAP[persona] : [];
  const recommendedTools = persona
    ? ALL_DASH_TOOLS.filter((t) => recommendedSlugs.includes(t.slug))
    : [];
  const otherTools = persona
    ? ALL_DASH_TOOLS.filter((t) => !recommendedSlugs.includes(t.slug))
    : [];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="h-5 w-5 rounded-full border-2 border-[#171717] dark:border-[#E5E5E5] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 pb-16 space-y-8">

      {/* -- Welcome + Plan status -- */}
      <section>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-1.5">
              Welcome back, {firstName}
            </h1>
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
              <button
                onClick={handleChangeRole}
                className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
              >
                Set your role to get recommendations
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isPro ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-2 py-0.5 rounded">
                <Crown className="h-3 w-3" strokeWidth={1.5} />
                PRO
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A]">
                Free
              </span>
            )}
          </div>
        </div>

        {/* AI limits */}
        <div className="flex items-center gap-2 text-xs text-[#737373] mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" strokeWidth={1.5} />
          <span>
            AI tools: {isPro ? "unlimited" : "10/day"} {!isPro && " -- "}
            {!isPro && (
              <button onClick={handleUpgradeClick} disabled={checkoutLoading} className="text-[#6366F1] hover:underline">
                {checkoutLoading ? "Redirecting..." : "Upgrade for unlimited"}
              </button>
            )}
          </span>
        </div>

        {/* Install app banner */}
        {showInstallBanner && (
          <div className="mb-5 flex items-start gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <Download className="h-4 w-4 text-[#A3A3A3] dark:text-[#525252] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">Install SammaPix app</p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">
                Add to your desktop for instant access. Click the install icon in your browser&apos;s address bar.
              </p>
            </div>
            <button
              onClick={() => { localStorage.setItem(LS_INSTALL_DISMISSED_KEY, "1"); setShowInstallBanner(false); }}
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
                  <Icon className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">{label}</p>
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">{description}</p>
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

      {/* -- Persona-filtered tools view -- */}
      {persona && !showPersonaSelector ? (
        <>
          {/* Recommended tools */}
          <section>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
              Recommended for you
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {recommendedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/dashboard/tools/${tool.slug}`}
                  className="group relative flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150"
                >
                  {tool.isAi && (
                    <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: `${tool.accent}14` }}
                  >
                    <tool.Icon accent={tool.accent} />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug block">
                      {tool.name}
                    </span>
                    {tool.isCombo && (
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#737373] mt-0.5 block">
                        MULTI-STEP
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Other tools (reduced opacity) */}
          <section>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
              All other tools
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
              {otherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/dashboard/tools/${tool.slug}`}
                  className="group relative flex flex-col items-center gap-2 p-3 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150 opacity-50 hover:opacity-100"
                >
                  {tool.isAi && (
                    <span className="absolute top-1.5 right-1.5 text-[7px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1 py-0.5 rounded">AI</span>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: `${tool.accent}14` }}
                  >
                    <tool.Icon accent={tool.accent} />
                  </div>
                  <span className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug text-center">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* -- Default: Tools by category (no persona selected) -- */
        <>
          {(["Optimize", "AI", "Multi-step", "Creative", "Organize"] as DashCategory[]).map((category) => {
            const tools = ALL_DASH_TOOLS.filter((t) => t.category === category);
            return (
              <section key={category}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
                  {category}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/tools/${tool.slug}`}
                      className="group relative flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-150"
                    >
                      {tool.isAi && (
                        <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                      )}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                        style={{ backgroundColor: `${tool.accent}14` }}
                      >
                        <tool.Icon accent={tool.accent} />
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug block">
                          {tool.name}
                        </span>
                        {tool.isCombo && (
                          <span className="text-[8px] font-bold uppercase tracking-widest text-[#737373] mt-0.5 block">
                            MULTI-STEP
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}


      {/* -- Upgrade pitch for free users -- */}
      {!isPro && (
        <section>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">Unlimited AI, no ads, ZIP downloads. $7/mo.</p>
              </div>
              <button
                onClick={handleUpgradeClick}
                disabled={checkoutLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 disabled:opacity-60 transition-colors shrink-0"
              >
                {checkoutLoading ? "Redirecting..." : "Upgrade to Pro"}
                {!checkoutLoading && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
