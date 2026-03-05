"use client";

import React, { useState } from "react";
import { Lock, Zap, FileImage, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DropZone from "@/components/upload/DropZone";
import SettingsToolbar from "@/components/upload/SettingsToolbar";
import FileList from "@/components/files/FileList";
import AiRenameModal from "@/components/ai/AiRenameModal";
import { useImageStore } from "@/store/imageStore";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { items, aiRenameFile } = useImageStore();
  const { data: session } = useSession();
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium">
            <Lock className="h-3 w-3" strokeWidth={1.5} />
            Images never leave your browser
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-600">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            Now with AI Rename powered by Gemini
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            Optimize images in seconds.{" "}
            <span className="text-gray-500 font-normal">Free, fast, private.</span>
          </h1>

          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Compress JPG, PNG, WebP. Convert to WebP. AI-rename for SEO. No signup needed.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-2 mb-10 text-xs text-gray-400">
            <span>10,000+ images optimized</span>
            <span className="text-gray-300">·</span>
            <span>100% free</span>
            <span className="text-gray-300">·</span>
            <span>No signup needed</span>
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
                title="Smart Compress"
                description="Reduce file size by up to 80% without visible quality loss. Supports JPG, PNG, WebP, GIF."
              />
              <FeatureCard
                icon={<FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />}
                title="Convert to WebP"
                description="WebP files are 30% smaller than JPEG with the same quality. Convert in one click."
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />}
                title="AI Rename"
                description="Gemini AI generates SEO-friendly filenames and alt text for every image. Free with login."
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
                    100% client-side processing
                  </h3>
                  <p className="text-sm text-gray-500">
                    Compress, convert, and resize happens entirely in your browser.
                    Your images never touch our servers. Privacy by design.
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
              Need more? Go Pro.
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Unlock 100 files per batch, ZIP downloads, 200 AI renames/day,
              and zero ads — all for $7/month.
            </p>
            <Link href="/pricing">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
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
