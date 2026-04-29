"use client";

import React, { useState, useEffect } from "react";
import { Lock, Zap, FileImage, Sparkles, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import DropZone from "@/components/upload/DropZone";
import SettingsToolbar from "@/components/upload/SettingsToolbar";
import FileList from "@/components/files/FileList";
import dynamic from "next/dynamic";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

const AiRenameModal = dynamic(() => import("@/components/ai/AiRenameModal"), { ssr: false });
const ProUpsellModal = dynamic(() => import("@/components/ui/ProUpsellModal"), { ssr: false });
import { useImageStore } from "@/store/imageStore";
import { cn } from "@/lib/utils";
import { AI_OPS_FREE_PER_DAY } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export type ToolMode = "compress" | "webp" | "ai-rename";

interface ToolInterfaceProps {
  defaultMode?: ToolMode;
}

export default function ToolInterface({ defaultMode }: ToolInterfaceProps) {
  const {
    items,
    aiRenameFile,
    initAiRenameCounter,
    aiRenameUsedToday,
    setConvertToWebP,
    setAiRenameEnabled,
    clearAll,
    settings,
    setAiRenameDirective,
  } = useImageStore();
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const pathname = usePathname();
  const inDashboard = pathname.startsWith("/dashboard");

  // Clear files and force correct settings when switching between tool pages.
  // Without this, files from compress would persist when navigating to webp.
  useEffect(() => {
    clearAll();

    if (defaultMode === "compress") {
      setConvertToWebP(false);
      setAiRenameEnabled(false);
    } else if (defaultMode === "webp") {
      setConvertToWebP(true);
      setAiRenameEnabled(false);
    } else if (defaultMode === "ai-rename") {
      setConvertToWebP(false);
      setAiRenameEnabled(true);
    }
  }, [defaultMode, setConvertToWebP, setAiRenameEnabled]);

  useEffect(() => {
    if (session?.user?.email) {
      initAiRenameCounter(session.user.email);
    }
  }, [session?.user?.email, initAiRenameCounter]);

  const hasFiles = items.length > 0;

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiRenameFileId, setAiRenameFileId] = useState<string | undefined>();
  const [aiUpsellOpen, setAiUpsellOpen] = useState(false);
  const [directiveUpsellOpen, setDirectiveUpsellOpen] = useState(false);

  const handleAiRenameClick = async (fileId?: string) => {
    if (!session) {
      setAiRenameFileId(fileId);
      setAiModalOpen(true);
      return;
    }
    // Check daily limit for free users
    if (!isPro && aiRenameUsedToday >= AI_OPS_FREE_PER_DAY) {
      trackEvent("limit_hit", { limit_type: "ai_renames" });
      setAiUpsellOpen(true);
      return;
    }
    if (fileId) {
      await aiRenameFile(fileId);
    }
  };

  return (
    <>
      {/* ── Tools section ── */}
      <section className="pt-6 pb-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* ── DropZone ── */}
          <DropZone />

          {/* Settings toolbar- appare dopo upload */}
          {hasFiles && (
            <div className="mt-3">
              <SettingsToolbar onAiRenameClick={() => handleAiRenameClick()} mode={defaultMode} />
            </div>
          )}

          {/* Custom directive (PRO) — only on AI Rename tool */}
          {defaultMode === "ai-rename" && hasFiles && (
            <div className="mt-3">
              <DirectiveBar
                value={settings.aiRenameDirective}
                onChange={setAiRenameDirective}
                isPro={isPro}
                onLockedClick={() => {
                  trackEvent("upsell_view", { source: "ai_rename_directive" });
                  setDirectiveUpsellOpen(true);
                }}
              />
            </div>
          )}

          {/* File list- appare dopo upload */}
          {hasFiles && (
            <div className="mt-3">
              <FileList onAiRename={handleAiRenameClick} />
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      {!hasFiles && (
        <section className="py-20 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <div className={cn("grid grid-cols-1 gap-6", defaultMode ? "sm:grid-cols-1 max-w-md mx-auto" : "sm:grid-cols-3")}>
              {(!defaultMode || defaultMode === "compress") && (
                <FeatureCard
                  icon={<Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                  title="Smart Compress"
                  description="Up to 80% smaller. JPG, PNG, WebP, GIF. All in your browser - nothing uploaded."
                />
              )}
              {(!defaultMode || defaultMode === "webp") && (
                <FeatureCard
                  icon={<FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                  title="Convert to WebP"
                  description="Google's next-gen format. 30% smaller than JPEG with same quality."
                />
              )}
              {(!defaultMode || defaultMode === "ai-rename") && (
                <FeatureCard
                  icon={<Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />}
                  title="AI Rename"
                  description="Gemini reads your image and generates an SEO-optimized filename + alt text."
                  highlight
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Privacy badge ── */}
      {!hasFiles && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md p-6 bg-gray-50 dark:bg-[#1E1E1E]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-10 w-10 rounded-md border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5 text-gray-600 dark:text-[#A3A3A3]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">
                    Your images never leave your browser
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-[#737373]">
                    All processing happens locally using your device&apos;s CPU. No uploads, no servers, no data retention. The only exception is AI Rename, which sends a thumbnail to Google Gemini for analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SiteGround banner ── */}
      <div className="px-4 sm:px-6 pb-6">
        <div className="max-w-3xl mx-auto">
          <SiteGroundBanner variant="web-hosting" />
        </div>
      </div>

      {/* ── CTA ── */}
      {!hasFiles && !isPro && !inDashboard && (
        <section className="py-16 px-4 sm:px-6 border-t border-gray-100 dark:border-[#2A2A2A]">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-3 tracking-tight">
              Need more? Go Pro.
            </h2>
            <p className="text-gray-500 dark:text-[#737373] mb-6 text-sm leading-relaxed">
              Unlimited files, 200 AI renames/day, bulk ZIP download, and zero ads- all for $9/month.
            </p>
            <Link href="/dashboard/upgrade">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-[#E5E5E5] transition-colors">
                View pricing
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Schema.org WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SammaPix",
            url: "https://sammapix.com",
            description:
              "Free online image optimizer. Compress JPG, PNG, WebP. Convert to WebP. AI-powered image renaming.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
            },
          }),
        }}
      />

      {/* AI Rename Modal */}
      <AiRenameModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        fileId={aiRenameFileId}
      />

      {/* Pro Upsell Modal - AI rename daily limit */}
      <ProUpsellModal
        open={aiUpsellOpen}
        onClose={() => setAiUpsellOpen(false)}
        trigger="ai_rename"
      />

      {/* Pro Upsell Modal - Custom directive PRO gate */}
      <ProUpsellModal
        open={directiveUpsellOpen}
        onClose={() => setDirectiveUpsellOpen(false)}
        trigger="ai_rename"
      />
    </>
  );
}

// ── Custom directive bar (PRO-only freeform AI bias) ────────────────────────

interface DirectiveBarProps {
  value: string;
  onChange: (v: string) => void;
  isPro: boolean;
  onLockedClick: () => void;
}

const DIRECTIVE_EXAMPLES = [
  "Always include the brand name if visible",
  "Focus on color and material — ecommerce style",
  "Pinterest aesthetic, max 4 words",
  "Include city name for travel photos",
];

function DirectiveBar({ value, onChange, isPro, onLockedClick }: DirectiveBarProps) {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Rotate placeholder examples every 4s when collapsed and empty
  useEffect(() => {
    if (expanded || value) return;
    const id = setInterval(() => {
      setExampleIdx((i) => (i + 1) % DIRECTIVE_EXAMPLES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [expanded, value]);

  const placeholder = DIRECTIVE_EXAMPLES[exampleIdx];
  const charsLeft = 200 - value.length;

  if (!isPro) {
    return (
      <button
        type="button"
        onClick={onLockedClick}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-left hover:border-[#A3A3A3] hover:bg-white dark:hover:bg-[#252525] transition-colors group"
      >
        <Lock className="h-3.5 w-3.5 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3] flex-1 truncate">
          <span className="font-medium text-[#525252] dark:text-[#E5E5E5]">Custom AI directive</span>
          {" — "}
          <span className="italic">{placeholder}</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full">
          PRO
        </span>
      </button>
    );
  }

  if (!expanded && !value) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-left hover:border-[#6366F1] transition-colors"
      >
        <Wand2 className="h-3.5 w-3.5 text-[#6366F1] shrink-0" strokeWidth={1.5} />
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3] flex-1 truncate">
          Add a custom AI directive (e.g.{" "}
          <span className="italic">{placeholder}</span>)
        </span>
        <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <div className="rounded-md border border-[#6366F1]/40 bg-white dark:bg-[#1E1E1E] p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Wand2 className="h-3.5 w-3.5 text-[#6366F1] shrink-0" strokeWidth={1.5} />
        <label className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] flex-1">
          Custom AI directive
        </label>
        <span
          className={`text-[10px] font-mono ${
            charsLeft < 20 ? "text-amber-600" : "text-[#A3A3A3]"
          }`}
        >
          {charsLeft}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        maxLength={200}
        placeholder="e.g. Always include the brand name if visible. Focus on color, material, and product category for ecommerce listings."
        className="w-full px-2.5 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded
                   bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5]
                   placeholder-[#A3A3A3] dark:placeholder-[#525252]
                   focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent
                   resize-none"
      />
      <div className="flex flex-wrap gap-1">
        {DIRECTIVE_EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => onChange(ex)}
            className="text-[10px] text-[#6366F1] hover:underline"
          >
            {ex.length > 28 ? ex.slice(0, 28) + "..." : ex}
          </button>
        ))}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-[#A3A3A3] hover:text-[#DC2626] ml-auto"
          >
            Clear
          </button>
        )}
      </div>
      <p className="text-[10px] text-[#A3A3A3] leading-relaxed">
        Applied to every AI rename in this batch. Max 200 characters.
      </p>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

function FeatureCard({ icon, title, description, highlight }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "p-5 border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] transition-colors",
        highlight && "border-indigo-200 dark:border-indigo-900 bg-brand-light/30 dark:bg-indigo-950/20"
      )}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-md border flex items-center justify-center mb-4",
          highlight ? "border-indigo-200 dark:border-indigo-900 bg-white dark:bg-[#252525]" : "border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#252525]"
        )}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{description}</p>
    </div>
  );
}
