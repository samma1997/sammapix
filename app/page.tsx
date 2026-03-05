"use client";

import React, { useState, useEffect } from "react";
import { Lock, Zap, FileImage, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DropZone from "@/components/upload/DropZone";
import SettingsToolbar from "@/components/upload/SettingsToolbar";
import FileList from "@/components/files/FileList";
import AiRenameModal from "@/components/ai/AiRenameModal";
import { useImageStore } from "@/store/imageStore";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

export default function HomePage() {
  const { items, aiRenameFile, initAiRenameCounter } = useImageStore();
  const { data: session } = useSession();
  const d = useLocale();

  useEffect(() => {
    if (session?.user?.email) {
      initAiRenameCounter(session.user.email);
    }
  }, [session?.user?.email, initAiRenameCounter]);
  const hasFiles = items.length > 0;

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiRenameFileId, setAiRenameFileId] = useState<string | undefined>();

  const handleAiRenameClick = async (fileId?: string) => {
    if (!session) {
      // Not logged in — show login modal
      setAiRenameFileId(fileId);
      setAiModalOpen(true);
      return;
    }
    // Logged in — call API directly
    if (fileId) {
      await aiRenameFile(fileId);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium">
              <Lock className="h-3 w-3" strokeWidth={1.5} />
              {d.hero.badge_privacy}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-600">
              <Sparkles className="h-3 w-3" strokeWidth={1.5} />
              {d.hero.badge_ai}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            {d.hero.title_1}{" "}
            <span className="text-gray-500 font-normal">{d.hero.title_2}</span>
          </h1>

          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            {d.hero.subtitle.split("\n").map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-2 mb-10 text-xs text-gray-400">
            <span>{d.hero.stat_images}</span>
            <span className="text-gray-300">·</span>
            <span>{d.hero.stat_free}</span>
            <span className="text-gray-300">·</span>
            <span>{d.hero.stat_signup}</span>
          </div>
        </div>

        {/* Tool area */}
        <div className="max-w-3xl mx-auto">
          <DropZone />

          {/* Settings toolbar — appears after upload */}
          {hasFiles && (
            <div className="mt-3">
              <SettingsToolbar onAiRenameClick={() => handleAiRenameClick()} />
            </div>
          )}

          {/* File list — appears after upload */}
          {hasFiles && (
            <div className="mt-3">
              <FileList onAiRename={handleAiRenameClick} />
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {!hasFiles && (
        <section className="py-20 px-4 sm:px-6 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                title={d.features.compress_title}
                description={d.features.compress_desc}
              />
              <FeatureCard
                icon={<FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                title={d.features.webp_title}
                description={d.features.webp_desc}
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />}
                title={d.features.ai_title}
                description={d.features.ai_desc}
                highlight
              />
            </div>
          </div>
        </section>
      )}

      {/* Privacy badge */}
      {!hasFiles && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border border-gray-200 rounded-md p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-10 w-10 rounded-md border border-gray-200 bg-white flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {d.privacy.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {d.privacy.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {!hasFiles && (
        <section className="py-16 px-4 sm:px-6 border-t border-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
              {d.pro_banner.title}
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              {d.pro_banner.desc}
            </p>
            <Link href="/pricing">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                {d.pro_banner.cta}
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
        "p-5 border border-gray-200 rounded-md bg-white transition-colors",
        highlight && "border-indigo-200 bg-brand-light/30"
      )}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-md border flex items-center justify-center mb-4",
          highlight ? "border-indigo-200 bg-white" : "border-gray-200 bg-gray-50"
        )}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
