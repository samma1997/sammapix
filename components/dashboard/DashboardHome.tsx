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
  ArrowRight,
  Crown,
  PenLine,
  ShoppingBag,
  Code,
  Share2,
  Download,
  X,
  Coins,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";

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

interface PersonaTool {
  name: string;
  href: string;
  why: string;
  icon: React.ReactNode;
}

interface PersonaConfig {
  workflow: string;
  tools: PersonaTool[];
  proCta: string;
}

const PERSONA_TOOLS: Record<Persona, PersonaConfig> = {
  photographer: {
    workflow: "Shoot → Cull → Compress → AI Rename → Deliver",
    proCta: "Process full shoots in one click with AI Workflow",
    tools: [
      {
        name: "Cull",
        href: "/dashboard/tools/cull",
        why: "Rate and select your best shots",
        icon: <Camera className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "Compress",
        href: "/dashboard/tools/compress",
        why: "Shrink files without quality loss",
        icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "AI Rename",
        href: "/dashboard/tools/ai-rename",
        why: "SEO-ready filenames in seconds",
        icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "FilmLab",
        href: "/dashboard/tools/filmlab",
        why: "Add analog film looks",
        icon: <FileVideo className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "GeoSort",
        href: "/dashboard/tools/geosort",
        why: "Organize by shooting location",
        icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "TravelMap",
        href: "/dashboard/tools/travelmap",
        why: "Map your photo journey",
        icon: <Map className="h-4 w-4" strokeWidth={1.5} />,
      },
    ],
  },
  blogger: {
    workflow: "Write → Drop photos → Compress → AI Rename → Alt Text → Publish",
    proCta: "Run the Blog preset in AI Workflow",
    tools: [
      {
        name: "Compress",
        href: "/dashboard/tools/compress",
        why: "Faster page loads",
        icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "AI Rename",
        href: "/dashboard/tools/ai-rename",
        why: "Rank in Google Images",
        icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "AI Alt Text",
        href: "/dashboard/tools/alt-text",
        why: "Accessibility + SEO",
        icon: <Globe className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "WebP",
        href: "/dashboard/tools/webp",
        why: "25-34% smaller than JPEG",
        icon: <FileImage className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "ResizePack",
        href: "/dashboard/tools/resizepack",
        why: "Perfect sizes for your CMS",
        icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,
      },
    ],
  },
  ecommerce: {
    workflow: "Shoot product → Compress → Rename → Resize → List",
    proCta: "Use the E-commerce preset in AI Workflow",
    tools: [
      {
        name: "Compress",
        href: "/dashboard/tools/compress",
        why: "Meet marketplace size limits",
        icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "AI Rename",
        href: "/dashboard/tools/ai-rename",
        why: "Product-keyword filenames",
        icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "ResizePack",
        href: "/dashboard/tools/resizepack",
        why: "Platform-specific sizes",
        icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "WebP",
        href: "/dashboard/tools/webp",
        why: "Faster product pages",
        icon: <FileImage className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "StampIt",
        href: "/dashboard/tools/stampit",
        why: "Protect with watermarks",
        icon: <Stamp className="h-4 w-4" strokeWidth={1.5} />,
      },
    ],
  },
  developer: {
    workflow: "Asset → Compress → WebP → Strip EXIF → Deploy",
    proCta: "Automate with AI Workflow pipeline",
    tools: [
      {
        name: "Compress",
        href: "/dashboard/tools/compress",
        why: "Reduce payload size",
        icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "WebP",
        href: "/dashboard/tools/webp",
        why: "Modern format, smaller files",
        icon: <FileImage className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "EXIF Lens",
        href: "/dashboard/tools/exif",
        why: "Strip metadata, save bytes",
        icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "AI Alt Text",
        href: "/dashboard/tools/alt-text",
        why: "WCAG compliance",
        icon: <Globe className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "ResizePack",
        href: "/dashboard/tools/resizepack",
        why: "Responsive image sizes",
        icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,
      },
    ],
  },
  social: {
    workflow: "Create → Crop → Compress → Watermark → Post",
    proCta: "Use the Instagram preset in AI Workflow",
    tools: [
      {
        name: "ResizePack",
        href: "/dashboard/tools/resizepack",
        why: "Instagram, Twitter, LinkedIn sizes",
        icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "CropRatio",
        href: "/dashboard/tools/croproatio",
        why: "Perfect aspect ratios",
        icon: <Copy className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "Compress",
        href: "/dashboard/tools/compress",
        why: "Fast uploads",
        icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "StampIt",
        href: "/dashboard/tools/stampit",
        why: "Brand watermarks",
        icon: <Stamp className="h-4 w-4" strokeWidth={1.5} />,
      },
      {
        name: "FilmLab",
        href: "/dashboard/tools/filmlab",
        why: "Consistent visual style",
        icon: <FileVideo className="h-4 w-4" strokeWidth={1.5} />,
      },
    ],
  },
};

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

// ─── Main component ───────────────────────────────────────────────────────────

const LS_PERSONA_KEY = "sammapix-persona";
const LS_INSTALL_DISMISSED_KEY = "sammapix-install-banner-dismissed";

interface DashboardHomeProps {
  userName: string | null;
  userPlan: string;
}

export default function DashboardHome({ userName, userPlan }: DashboardHomeProps) {
  const isPro = userPlan === "pro";
  const firstName = userName?.split(" ")[0] ?? "there";
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  const [persona, setPersona] = useState<Persona | null>(null);
  const [personaSkipped, setPersonaSkipped] = useState(false);
  const [usage, setUsage] = useState<DailyUsage>({ aiRename: 0, altText: 0, workflow: 0 });
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [showPersonaSurvey, setShowPersonaSurvey] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const loadPersona = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY);
    if (!stored) {
      setShowPersonaSurvey(true);
    } else if (stored === "skipped") {
      setPersonaSkipped(true);
      setShowPersonaSurvey(false);
    } else {
      setPersona(stored as Persona);
      setShowPersonaSurvey(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadPersona();
    setUsage(readUsage());
    const dismissed = localStorage.getItem(LS_INSTALL_DISMISSED_KEY);
    if (!dismissed) setShowInstallBanner(true);

    // Fetch credit balance
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
    setShowPersonaSurvey(false);
    setPersonaSkipped(false);
  }

  function handleChangeRole() {
    setShowPersonaSurvey(true);
    setPersona(null);
  }

  function handleSkipSurvey() {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_PERSONA_KEY, "skipped");
    }
    setPersonaSkipped(true);
    setShowPersonaSurvey(false);
  }

  const config = persona ? PERSONA_TOOLS[persona] : null;
  const workflowSteps = config?.workflow.split(" → ") ?? [];

  const hitAnyLimit =
    !isPro && (usage.aiRename >= 5 || usage.altText >= 5 || usage.workflow >= 3);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="h-5 w-5 rounded-full border-2 border-[#171717] dark:border-[#E5E5E5] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
      {/* Welcome header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-1.5">
            Welcome back, {firstName}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {persona &&
              (() => {
                const { label, Icon } = PERSONA_LABELS[persona];
                return (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-[#6366F1] bg-[#6366F1]/8 dark:bg-[#6366F1]/15 px-2 py-0.5 rounded">
                    <Icon className="h-3 w-3" strokeWidth={1.5} />
                    {label}
                  </span>
                );
              })()}
            {(persona || personaSkipped) && (
              <button
                onClick={handleChangeRole}
                className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#A3A3A3] underline-offset-2 hover:underline transition-colors"
              >
                Change role
              </button>
            )}
          </div>
        </div>
        {isPro && (
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-2 py-0.5 rounded shrink-0">
            <Crown className="h-3 w-3" strokeWidth={1.5} />
            PRO
          </span>
        )}
      </div>

      {/* Persona survey (inline) */}
      {showPersonaSurvey && (
        <div className="mb-8 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
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

      {/* Install app banner */}
      {showInstallBanner && (
        <div className="mb-6 flex items-start gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
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

      {/* Workflow section */}
      {config && (
        <div className="mb-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6366F1] mb-1">
                Your workflow
              </p>
              <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {config.proCta}
              </h2>
            </div>
            <Link
              href="/dashboard/tools/workflow"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#6366F1] text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 transition-colors shrink-0"
            >
              Run AI Workflow
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {workflowSteps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center px-2.5 py-1 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
                  <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-medium whitespace-nowrap">
                    {step}
                  </span>
                </div>
                {i < workflowSteps.length - 1 && (
                  <ArrowRight
                    className="h-3 w-3 text-[#D4D4D4] dark:text-[#404040] shrink-0"
                    strokeWidth={1.5}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Usage today */}
      <div className="mb-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5">
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

      {/* Quick tools */}
      {config && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Quick tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {config.tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex flex-col gap-1.5 p-3.5 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-150"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">{tool.icon}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 text-[#D4D4D4] group-hover:text-[#6366F1] transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  {tool.name}
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug">{tool.why}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

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
                  {checkoutLoading ? "Redirecting…" : "Start 30-day free trial"}
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
