import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import WebliftHeroDemo from "@/components/tools/WebliftHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import { ArrowLeft, Globe, CheckCircle2 } from "lucide-react";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Web Optimize - Compress, Convert to WebP & AI Rename",
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
    title: "Web Optimize - Compress, Convert to WebP & AI Rename",
    description:
      "Compress, convert to WebP, and AI-rename images for the web in one click.",
    url: `${APP_URL}/tools/weblift`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix WebLift" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Optimize - Compress, Convert to WebP & AI Rename",
    description:
      "Compress, convert to WebP, and AI-rename images for the web in one click. Free combo tool for web developers and content creators.",
  },
};

const STEPS = [
  { id: "compress", label: "Compress (80%)", enabled: true, isAi: false },
  { id: "webp", label: "Convert to WebP", enabled: true, isAi: false },
  { id: "ai-rename", label: "AI Rename (SEO)", enabled: true, isAi: true },
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


export default function WebLiftPage() {
  return (
    <main>
      <MetaViewContent contentName="WebLift" contentId="weblift" />

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#3B82F615", border: "1px solid #3B82F630" }}
                aria-hidden="true"
              >
                <Globe className="h-4 w-4" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                WebLift. Web-Optimize in 1 Click
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Combo tool for web developers and content creators:{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">compress + convert to WebP + AI-rename</strong>{" "}
              in a single workflow. SEO-friendly filenames (no more <code className="text-[12px] bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1 rounded">IMG_4012.jpg</code>), bulk batch processing.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                3 steps · 1 click
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Bulk batch
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                WebP output
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                AI SEO filenames
              </span>
            </div>
          </div>

          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <WebliftHeroDemo />
          </div>
        </div>
      </section>

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

      <RelatedTools toolId="weblift" />

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Frequently asked questions</h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {[
              { q: "Do I need an account to use WebLift?", a: "Yes, because WebLift includes AI Rename which sends a thumbnail to Google Gemini. A free account is required to prevent API abuse. The compression and WebP conversion steps run entirely in your browser." },
              { q: "Can I disable individual steps?", a: "Yes. Each step (Compress, Convert to WebP, AI Rename) can be toggled on or off before processing. If you disable AI Rename, no login is required." },
              { q: "How much smaller will my images be?", a: "Typically 60-70% smaller. The compression step reduces file size by 50-80%, and WebP conversion adds another 25-34% reduction compared to JPEG." },
            ].map((faq) => (
              <div key={faq.q} className="py-4">
                <dt className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{faq.q}</dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is WebLift?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WebLift is a free combo tool by SammaPix that optimizes images for the web in one click. It compresses, converts to WebP, and AI-generates SEO-friendly filenames automatically.",
                },
              },
              {
                "@type": "Question",
                name: "How does WebLift improve web performance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WebLift reduces image file sizes by up to 70% through compression at 80% quality and WebP conversion. Smaller images mean faster page loads and better Core Web Vitals scores.",
                },
              },
              {
                "@type": "Question",
                name: "Is WebLift free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, WebLift is free. Since it includes AI Rename, a free account is required. Free users get 10 AI credits per day. You can disable AI Rename to use it without an account.",
                },
              },
              {
                "@type": "Question",
                name: "What metrics does WebLift analyze?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WebLift shows before/after file sizes, compression ratio percentage, and format conversion details. It processes JPG, PNG, WebP, and GIF images into optimized WebP output.",
                },
              },
              {
                "@type": "Question",
                name: "Can I disable individual steps?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Each step (Compress, Convert to WebP, AI Rename) can be toggled on or off before processing. If you disable AI Rename, no login is required.",
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${APP_URL}/tools`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Web Optimize",
                item: `${APP_URL}/tools/weblift`,
              },
            ],
          }),
        }}
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Web Optimize",
            url: `${APP_URL}/tools/weblift`,
            description:
              "Combo tool: compress images, convert to WebP, and AI-rename with SEO-friendly filenames in one click.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
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
