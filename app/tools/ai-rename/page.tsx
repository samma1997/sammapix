import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Search, Clock } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Image Renaming Tool — Auto SEO Filenames | SammaPix",
  description:
    "Automatically rename images with AI-generated SEO-friendly filenames. Stop uploading DSC_0042.jpg — let AI describe your photos and generate descriptive filenames.",
  alternates: {
    canonical: `${APP_URL}/tools/ai-rename`,
  },
  openGraph: {
    title: "AI Image Renaming Tool — Auto SEO Filenames | SammaPix",
    description:
      "Automatically rename images with AI-generated SEO-friendly filenames. Stop uploading DSC_0042.jpg — let AI describe your photos and generate descriptive filenames.",
    url: `${APP_URL}/tools/ai-rename`,
    siteName: "SammaPix",
    type: "website",
  },
};

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "All tools", href: "/tools" },
];

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "Powered by Google Gemini",
    description:
      "SammaPix sends a thumbnail of your image to Google Gemini Flash and generates a descriptive, human-readable filename in seconds.",
    highlight: true,
  },
  {
    icon: <Search className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "SEO-optimized filenames",
    description:
      "AI generates filenames that match how people search — descriptive, lowercase, with hyphens. Exactly what Google recommends for image SEO.",
    highlight: false,
  },
  {
    icon: <Clock className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Rename a batch in seconds",
    description:
      "Upload multiple images and rename them all at once. No more manually typing filenames for every product photo or blog image.",
    highlight: false,
  },
];

export default function AiRenameToolPage() {
  return (
    <>
      {/* Hero SEO */}
      <section className="pt-16 pb-10 px-4 sm:px-6 border-b border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-2">
            <span className="text-xs font-medium text-[#6366F1] uppercase tracking-widest">
              Free tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mb-4 leading-tight">
            AI Image Renaming — Auto SEO Filenames
          </h1>
          <p className="text-[#737373] text-base leading-relaxed max-w-xl">
            Let AI read your images and generate descriptive, SEO-friendly
            filenames automatically. Stop uploading photos named{" "}
            <code className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-1.5 py-0.5 rounded font-mono">
              DSC_0042.jpg
            </code>{" "}
            — improve your Google Image Search rankings with zero effort.
          </p>
        </div>
      </section>

      {/* Tool embed */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#E5E5E5] rounded-md bg-[#FAFAFA] p-8 text-center">
            <p className="text-sm text-[#737373] mb-2">
              AI Rename requires a free account to prevent API abuse. Sign in
              with Google or GitHub — it takes 10 seconds.
            </p>
            <p className="text-xs text-[#A3A3A3] mb-5">
              Free plan: 5 renames/day &nbsp;·&nbsp; Pro plan: 200 renames/day
            </p>
            <Link href="/?tool=ai-rename">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors">
                Open AI Rename Tool
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            How AI image renaming works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30"
                    : "border-[#E5E5E5] bg-white"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-md border flex items-center justify-center mb-4 ${
                    f.highlight
                      ? "border-[#C7D2FE] bg-white"
                      : "border-[#E5E5E5] bg-[#F5F5F5]"
                  }`}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] mb-4">
            Why image filenames matter for SEO
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Google uses the image filename as one of the signals to understand
            what an image is about. A filename like{" "}
            <code className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-1.5 py-0.5 rounded font-mono">
              golden-gate-bridge-san-francisco-fog.jpg
            </code>{" "}
            sends a strong relevance signal compared to{" "}
            <code className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-1.5 py-0.5 rounded font-mono">
              IMG_4521.jpg
            </code>
            .
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Manually renaming hundreds of product photos or blog images is
            tedious and time-consuming. SammaPix AI Rename automates this
            entirely — upload your images, click rename, and download files with
            descriptive SEO-optimized filenames.
          </p>
          <h3 className="text-base font-semibold text-[#171717] mb-3">
            What does &ldquo;AI-generated filename&rdquo; look like?
          </h3>
          <div className="border border-[#E5E5E5] rounded-md bg-[#FAFAFA] p-4 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-28 shrink-0">
                Before:
              </span>
              <code className="text-xs bg-white border border-[#E5E5E5] px-2 py-1 rounded font-mono text-[#737373]">
                DSC_0042.jpg
              </code>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6366F1] font-mono w-28 shrink-0">
                After (AI):
              </span>
              <code className="text-xs bg-white border border-[#C7D2FE] px-2 py-1 rounded font-mono text-[#171717]">
                red-ceramic-coffee-cup-wooden-table-morning-light.jpg
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] bg-white transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix AI Image Rename",
            url: `${APP_URL}/tools/ai-rename`,
            description:
              "AI-powered image renaming tool. Generate descriptive SEO-friendly filenames automatically using Google Gemini.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
