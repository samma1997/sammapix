"use client";

import React, { useState, useEffect } from "react";
import { Lock, Zap, FileImage, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import DropZone from "@/components/upload/DropZone";
import SettingsToolbar from "@/components/upload/SettingsToolbar";
import FileList from "@/components/files/FileList";
import AiRenameModal from "@/components/ai/AiRenameModal";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { useImageStore } from "@/store/imageStore";
import { cn } from "@/lib/utils";
import { AI_RENAME_FREE_PER_DAY } from "@/lib/constants";

export type ToolMode = "compress" | "webp" | "ai-rename";

interface ToolInterfaceProps {
  defaultMode?: ToolMode;
}

export default function ToolInterface({ defaultMode }: ToolInterfaceProps) {
  const { items, aiRenameFile, initAiRenameCounter, aiRenameUsedToday, setConvertToWebP } = useImageStore();
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const pathname = usePathname();
  const inDashboard = pathname.startsWith("/dashboard");

  // When the WebP tool page mounts, force convertToWebP on
  useEffect(() => {
    if (defaultMode === "webp") {
      setConvertToWebP(true);
    }
  }, [defaultMode, setConvertToWebP]);

  useEffect(() => {
    if (session?.user?.email) {
      initAiRenameCounter(session.user.email);
    }
  }, [session?.user?.email, initAiRenameCounter]);

  const hasFiles = items.length > 0;

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiRenameFileId, setAiRenameFileId] = useState<string | undefined>();
  const [aiUpsellOpen, setAiUpsellOpen] = useState(false);

  const handleAiRenameClick = async (fileId?: string) => {
    if (!session) {
      setAiRenameFileId(fileId);
      setAiModalOpen(true);
      return;
    }
    // Check daily limit for free users
    if (!isPro && aiRenameUsedToday >= AI_RENAME_FREE_PER_DAY) {
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

          {/* Settings toolbar — appare dopo upload */}
          {hasFiles && (
            <div className="mt-3">
              <SettingsToolbar onAiRenameClick={() => handleAiRenameClick()} />
            </div>
          )}

          {/* File list — appare dopo upload */}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                title="Smart Compress"
                description="Up to 80% smaller. JPG, PNG, WebP, GIF. All in your browser — nothing uploaded."
              />
              <FeatureCard
                icon={<FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                title="Convert to WebP"
                description="Google's next-gen format. 30% smaller than JPEG with same quality."
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />}
                title="AI Rename"
                description="Gemini reads your image and generates an SEO-optimized filename + alt text."
                highlight
              />
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
              Unlimited files, 200 AI renames/day, bulk ZIP download, and zero ads — all for $7/month.
            </p>
            <Link href="/pricing">
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

      {/* Pro Upsell Modal — AI rename daily limit */}
      <ProUpsellModal
        open={aiUpsellOpen}
        onClose={() => setAiUpsellOpen(false)}
        trigger="ai_rename"
      />
    </>
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
