import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "WebLift — Compress, Convert to WebP & AI Rename | SammaPix",
  description:
    "Compress, convert to WebP, and AI-rename images for the web in one click. Free combo tool for web developers and content creators.",
  keywords: [
    "web image optimizer",
    "compress convert webp rename",
    "image optimization pipeline",
    "webp seo rename tool",
    "one click image optimize",
    "web performance images",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/weblift`,
  },
  openGraph: {
    title: "WebLift — Compress, Convert to WebP & AI Rename | SammaPix",
    description:
      "Compress, convert to WebP, and AI-rename images for the web in one click.",
    url: `${APP_URL}/tools/weblift`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix WebLift" }],
  },
};

const STEPS = [
  { id: "compress", label: "Compress (80%)", enabled: true },
  { id: "convert-webp", label: "Convert to WebP", enabled: true },
  { id: "ai-rename", label: "AI Rename (SEO)", enabled: true },
];

const features = [
  {
    title: "One-click web optimization",
    description:
      "Compress, convert to WebP, and generate SEO-friendly filenames automatically. No manual steps needed.",
  },
  {
    title: "AI-powered SEO filenames",
    description:
      "Gemini AI analyzes your image and generates descriptive, keyword-rich filenames optimized for search engines.",
  },
  {
    title: "Smaller files, faster sites",
    description:
      "WebP + 80% quality compression reduces file sizes by up to 70% with no visible quality loss.",
  },
];

const relatedTools = [
  { name: "Compress", href: "/tools/compress" },
  { name: "WebP Converter", href: "/tools/webp" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "BlogDrop", href: "/tools/blogdrop" },
  { name: "ShopShot", href: "/tools/shopshot" },
];

export default function WebLiftPage() {
  return (
    <main>
      <ToolHeader
        title="WebLift"
        description="Compress, convert to WebP, and AI-rename in one click."
        icon={Globe}
        accentColor="#3B82F6"
      />

      <ComboClient
        toolName="WebLift"
        steps={STEPS}
        requiresLogin={true}
        hasAiSteps={true}
      />

      <HowToUse
        toolName="WebLift"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, or other image files onto the upload area.",
          },
          {
            title: "Hit Process All",
            desc: "WebLift compresses at 80% quality, converts to WebP, then AI-renames with SEO-friendly names.",
          },
          {
            title: "Download optimized images",
            desc: "Download each file individually or grab everything as a ZIP archive.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use WebLift?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
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
            name: "SammaPix WebLift",
            url: `${APP_URL}/tools/weblift`,
            description:
              "Combo tool: compress images, convert to WebP, and AI-rename with SEO-friendly filenames in one click.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Compress at 80% quality",
              "Convert to WebP format",
              "AI-generated SEO filenames",
              "Batch processing",
              "ZIP download",
            ],
          }),
        }}
      />
    </main>
  );
}
