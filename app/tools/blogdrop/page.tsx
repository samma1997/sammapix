import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "BlogDrop - Blog-Ready Images in One Drop | SammaPix",
  description:
    "Blog-ready images in one drop. Compress, resize to 1200px, convert to WebP, and AI-rename with SEO blog names. Free combo tool.",
  keywords: [
    "blog image optimizer",
    "blog image resize compress",
    "seo blog images",
    "wordpress image optimization",
    "blog photo preparation",
    "resize compress webp blog",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/blogdrop`,
  },
  openGraph: {
    title: "BlogDrop - Blog-Ready Images in One Drop | SammaPix",
    description:
      "Blog-ready images in one drop. Compress, resize, WebP, SEO names.",
    url: `${APP_URL}/tools/blogdrop`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix BlogDrop" }],
  },
};

const STEPS = [
  { id: "compress", label: "Compress (80%)", enabled: true, isAi: false },
  { id: "resize", label: "Resize (max 1200px)", enabled: true, isAi: false },
  { id: "webp", label: "Convert to WebP", enabled: true, isAi: false },
  { id: "ai-rename", label: "AI Rename (SEO blog)", enabled: true, isAi: true },
];

const features = [
  {
    title: "Blog-optimized sizing",
    description:
      "Automatically resize to 1200px max width- the optimal size for most blog layouts and CMS platforms.",
  },
  {
    title: "SEO-ready filenames",
    description:
      "AI generates blog-appropriate, keyword-rich filenames that help your images rank in Google Image search.",
  },
  {
    title: "4-step pipeline, zero effort",
    description:
      "Compress, resize, convert, and rename all happen automatically. Upload and download- that's it.",
  },
];

const relatedTools = [
  { name: "Compress", href: "/tools/compress" },
  { name: "ResizePack", href: "/tools/resizepack" },
  { name: "WebP Converter", href: "/tools/webp" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "WebLift", href: "/tools/weblift" },
];

export default function BlogDropPage() {
  return (
    <main>
      <ToolHeader
        title="BlogDrop"
        description="Blog-ready images in one drop. Compress, resize, WebP, SEO names."
        icon={FileText}
        accentColor="#8B5CF6"
      />

      <ComboClient
        toolName="BlogDrop"
        steps={STEPS}
        requiresLogin={true}
        hasAiSteps={true}
      />

      <HowToUse
        toolName="BlogDrop"
        steps={[
          {
            title: "Drop your blog images",
            desc: "Drag and drop photos destined for your blog posts.",
          },
          {
            title: "Hit Process All",
            desc: "BlogDrop compresses, resizes to 1200px, converts to WebP, and generates SEO blog filenames.",
          },
          {
            title: "Download and publish",
            desc: "Download individually or as ZIP. Upload directly to WordPress, Ghost, or any CMS.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use BlogDrop?
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

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Frequently asked questions</h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {[
              { q: "What CMS platforms does BlogDrop work with?", a: "BlogDrop outputs optimized WebP images with SEO filenames that work with any CMS -- WordPress, Ghost, Webflow, Squarespace, or any platform that accepts image uploads." },
              { q: "Why 1200px max width?", a: "1200px is the standard content width for most blog layouts. Images wider than 1200px add file size without any visual benefit on most screens." },
              { q: "Do I need an account?", a: "Yes, because BlogDrop includes AI Rename for SEO filenames. A free account is required for AI steps. You get 10 free AI operations per day." },
            ].map((faq) => (
              <div key={faq.q} className="py-4">
                <dt className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{faq.q}</dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix BlogDrop",
            url: `${APP_URL}/tools/blogdrop`,
            description:
              "Blog-ready images in one drop. Compress, resize to 1200px, convert to WebP, and AI-rename for SEO.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Compress at 80% quality",
              "Resize to max 1200px",
              "Convert to WebP",
              "AI-generated SEO blog filenames",
              "Batch processing",
              "ZIP download",
            ],
          }),
        }}
      />
    </main>
  );
}
