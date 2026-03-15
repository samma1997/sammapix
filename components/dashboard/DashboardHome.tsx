"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Image,
  FileImage,
  Globe,
  Scissors,
  Camera,
  FileVideo,
  ScanEye,
  MapPin,
  Map,
  Copy,
  Stamp,
  Tv,
  Search,
  ArrowRight,
  Crown,
  PenLine,
  ShoppingBag,
  Code,
  Share2,
  Lock,
  Coins,
  Download,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";

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

// ─── Tools config ─────────────────────────────────────────────────────────────

interface ToolEntry {
  name: string;
  slug: string;
  Icon: LucideIcon;
}

const ALL_TOOLS: ToolEntry[] = [
  { name: "Compress", slug: "compress", Icon: Image },
  { name: "WebP", slug: "webp", Icon: FileImage },
  { name: "AI Rename", slug: "ai-rename", Icon: Zap },
  { name: "AI Alt Text", slug: "alt-text", Icon: Globe },
  { name: "ResizePack", slug: "resizepack", Icon: Scissors },
  { name: "Cull", slug: "cull", Icon: Camera },
  { name: "FilmLab", slug: "filmlab", Icon: FileVideo },
  { name: "EXIF Lens", slug: "exif", Icon: ScanEye },
  { name: "GeoSort", slug: "geosort", Icon: MapPin },
  { name: "TravelMap", slug: "travelmap", Icon: Map },
  { name: "CropRatio", slug: "croproatio", Icon: Copy },
  { name: "StampIt", slug: "stampit", Icon: Stamp },
  { name: "HEIC", slug: "heic", Icon: Tv },
  { name: "TwinHunt", slug: "twinhunt", Icon: Search },
  { name: "Video Thumb", slug: "video-thumb", Icon: FileVideo },
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
  Icon: LucideIcon;
  steps: string[];
}

const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    name: "Blog Post",
    Icon: PenLine,
    steps: ["Compress", "AI Rename", "Alt Text", "WebP"],
  },
  {
    name: "Instagram",
    Icon: Image,
    steps: ["Compress", "Resize 1080", "Crop"],
  },
  {
    name: "E-commerce",
    Icon: ShoppingBag,
    steps: ["Compress", "AI Rename", "Resize", "WebP"],
  },
  {
    name: "Client Delivery",
    Icon: Camera,
    steps: ["Light compress", "Watermark", "ZIP"],
  },
];

// ─── Usage tracking ───────────────────────────────────────────────────────────

interface DailyUsage {
  aiRename: number;
  altText: number;
  workflow: number;
}

function getTodayKey() {
  return `sammapix-usage-${new Date().toISOString().slice(0, 10)}`;
}

function readUsage(): DailyUsage {
  if (typeof window === "undefined") return { aiRename: 0, altText: 0, workflow: 0 };
  try {
    const raw = localStorage.getItem(getTodayKey());
    if (!raw) return { aiRename: 0, altText: 0, workflow: 0 };
    return JSON.parse(raw) as DailyUsage;
  } catch {
    return { aiRename: 0, altText: 0, workflow: 0 };
  }
}

// ─── UsageBar sub-component ───────────────────────────────────────────────────

function UsageBar({
  label,
  used,
  max,
  unlimited,
}: {
  label: string;
  used: number;
  max: number;
  unlimited: boolean;
}) {
  const pct = unlimited ? 0 : Math.min(100, (used / max) * 100);
  const isAtLimit = !unlimited && used >= max;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">{label}</span>
        {unlimited ? (
          <span className="text-xs text-[#6366F1] font-medium">Unlimited</span>
        ) : (
          <span
            className={`text-xs font-medium ${
              isAtLimit ? "text-[#DC2626]" : "text-[#737373] dark:text-[#A3A3A3]"
            }`}
          >
            {used}/{max}
          </span>
        )}
      </div>
      {!unlimited && (
        <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isAtLimit ? "bg-[#DC2626]" : "bg-[#171717] dark:bg-[#E5E5E5]"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

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
  const [usage, setUsage] = useState<DailyUsage>({ aiRename: 0, altText: 0, workflow: 0 });
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  // Which workflow card is showing the "upgrade" inline message
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
    setUsage(readUsage());
    const dismissed = localStorage.getItem(LS_INSTALL_DISMISSED_KEY);
    if (!dismissed) setShowInstallBanner(true);

    fetch("/api/credits/balance")
      .then((r) => r.json())
      .then((data: { credits?: number }) => {
        setCreditBalance(data.credits ?? 0);
      })
      .catch(() => setCreditBalance(0));
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

  const hitAnyLimit =
    !isPro && (usage.aiRename >= 5 || usage.altText >= 5 || usage.workflow >= 3);

  // Build tool lists
  const recommendedNames = persona ? PERSONA_RECOMMENDED[persona] : [];
  const recommendedTools = ALL_TOOLS.filter((t) => recommendedNames.includes(t.name));
  const allTools = ALL_TOOLS;

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

      {/* ── SECTION 2: AI Workflow Presets ── */}
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
              // Clickable card for Pro users
              return (
                <Link
                  key={preset.name}
                  href="/dashboard/tools/workflow"
                  className="group flex flex-col gap-3 p-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <preset.Icon className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                        {preset.name}
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D4D4D4] group-hover:text-[#6366F1] transition-colors" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug">
                    {preset.steps.join(" → ")}
                  </p>
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
                  className="flex items-center justify-between opacity-50 grayscale cursor-pointer"
                  onClick={() => setLockedCardExpanded(isExpanded ? null : preset.name)}
                >
                  <div className="flex items-center gap-2.5">
                    <preset.Icon className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                    <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {preset.name}
                    </span>
                  </div>
                  <Lock className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                </div>
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252] leading-snug opacity-50 grayscale">
                  {preset.steps.join(" → ")}
                </p>
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
      </section>

      {/* ── SECTION 3: Your Tools ── */}
      <section>
        {/* Recommended tools (only when persona is set) */}
        {persona && recommendedTools.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
              Recommended for {PERSONA_LABELS[persona].label}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {recommendedTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={`/dashboard/tools/${tool.slug}`}
                  className="group flex flex-col items-start gap-2 p-3 bg-white dark:bg-[#191919] border-l-2 border-l-[#6366F1] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
                >
                  <tool.Icon className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All tools grid */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-3">
            {persona ? "All Tools" : "Tools"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {allTools.map((tool) => (
              <Link
                key={tool.name}
                href={`/dashboard/tools/${tool.slug}`}
                className="group flex flex-col items-start gap-2 p-3 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
              >
                <tool.Icon className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] transition-colors" strokeWidth={1.5} />
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] leading-snug transition-colors">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Usage + Credits ── */}
      <section>
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Usage today
          </h2>
          <div className="space-y-4">
            <UsageBar label="AI Rename" used={usage.aiRename} max={5} unlimited={isPro} />
            <UsageBar label="AI Alt Text" used={usage.altText} max={5} unlimited={isPro} />
            <UsageBar label="AI Workflows" used={usage.workflow} max={3} unlimited={isPro} />

            {/* Credit balance row */}
            <div className="pt-1 border-t border-[#F5F5F5] dark:border-[#252525]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Credits</span>
                </div>
                {creditBalance === null ? (
                  <span className="text-xs text-[#A3A3A3]">…</span>
                ) : creditBalance === 0 ? (
                  <Link
                    href="/dashboard/credits"
                    className="text-xs text-[#6366F1] hover:underline underline-offset-2"
                  >
                    Buy credits
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/credits"
                    className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#6366F1] transition-colors"
                  >
                    {creditBalance.toLocaleString()} remaining
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro upgrade card — prominent when limits hit */}
      {!isPro && hitAnyLimit && (
        <div className="border border-[#6366F1]/30 bg-[#6366F1]/5 dark:bg-[#6366F1]/10 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-[#6366F1] flex items-center justify-center shrink-0 mt-0.5">
              <Crown className="h-4 w-4 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                Unlock unlimited AI workflows
              </h3>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-3">
                {"You've hit some of your daily limits. Go Pro for unlimited AI Rename, Alt Text, and Workflows."}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleUpgradeClick}
                  disabled={checkoutLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-60 text-white text-sm font-medium rounded-md transition-colors"
                >
                  {checkoutLoading ? "Redirecting…" : "Start free trial"}
                  {!checkoutLoading && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
                </button>
                <Link
                  href="/dashboard/credits"
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
                >
                  <Coins className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Buy credits for more AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pro upgrade card — soft pitch before limits hit */}
      {!isPro && !hitAnyLimit && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5">
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
    </div>
  );
}
