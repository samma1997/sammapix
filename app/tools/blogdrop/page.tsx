import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import BlogdropHeroDemo from "@/components/tools/BlogdropHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "BlogDrop - Blog Image Optimizer: Compress, Resize & SEO",
  description:
    "Optimize blog images instantly. Compress, resize to 1200px, convert to WebP, and AI-generate SEO filenames in one click. Free WordPress & CMS tool.",
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
    title: "Blog Ready - Blog-Ready Images in One Drop",
    description:
      "Blog-ready images in one drop. Compress, resize, WebP, SEO names.",
    url: `${APP_URL}/tools/blogdrop`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix BlogDrop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogDrop - Blog Image Optimizer: Compress, Resize & SEO",
    description:
      "Optimize blog images instantly. Compress, resize to 1200px, convert to WebP, and AI-generate SEO filenames in one click. Free WordPress & CMS tool.",
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


export default function BlogDropPage() {
  return (
    <main>
      <MetaViewContent contentName="BlogDrop" contentId="blogdrop" />

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
                style={{ backgroundColor: "#8B5CF615", border: "1px solid #8B5CF630" }}
                aria-hidden="true"
              >
                <FileText className="h-4 w-4" style={{ color: "#8B5CF6" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                BlogDrop. WordPress-Ready Images
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Drop blog photos → get them{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">compressed, resized to 1200px, converted to WebP, with AI SEO filenames + alt text</strong>. One click, ready for WordPress, Ghost, Medium, Substack.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                4 steps · 1 click
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Resize to 1200px
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                AI alt text
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                90%+ smaller
              </span>
            </div>
          </div>

          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <BlogdropHeroDemo />
          </div>
        </div>
      </section>

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

      <RelatedTools toolId="blogdrop" />

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Frequently asked questions</h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {[
              { q: "What CMS platforms does BlogDrop work with?", a: "BlogDrop outputs optimized WebP images with SEO filenames that work with any CMS -- WordPress, Ghost, Webflow, Squarespace, or any platform that accepts image uploads." },
              { q: "Why 1200px max width?", a: "1200px is the standard content width for most blog layouts. Images wider than 1200px add file size without any visual benefit on most screens." },
              { q: "Do I need an account?", a: "Yes, because BlogDrop includes AI Rename for SEO filenames. A free account is required for AI steps. You get 10 free AI credits per day." },
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
                name: "What is BlogDrop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BlogDrop is a free combo tool by SammaPix that optimizes images for blog posts. It compresses, resizes to 1200px, converts to WebP, and AI-generates SEO-friendly filenames -- all in one click.",
                },
              },
              {
                "@type": "Question",
                name: "How does BlogDrop work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Drop your images and BlogDrop runs a 4-step pipeline: compress at 80% quality, resize to max 1200px width, convert to WebP format, and AI-rename with SEO blog keywords. Download individually or as ZIP.",
                },
              },
              {
                "@type": "Question",
                name: "Is BlogDrop free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, BlogDrop is free. Since it includes AI Rename, a free account is required. Free users get 10 AI credits per day. Pro users get unlimited credits.",
                },
              },
              {
                "@type": "Question",
                name: "What formats does BlogDrop support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BlogDrop accepts JPG, PNG, WebP, and GIF images. Output is always optimized WebP with SEO-friendly filenames, ready for WordPress, Ghost, Webflow, or any CMS.",
                },
              },
              {
                "@type": "Question",
                name: "What CMS platforms does BlogDrop work with?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "BlogDrop outputs optimized WebP images with SEO filenames that work with any CMS -- WordPress, Ghost, Webflow, Squarespace, or any platform that accepts image uploads.",
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
                name: "Blog Ready",
                item: `${APP_URL}/tools/blogdrop`,
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
            name: "SammaPix Blog Ready",
            url: `${APP_URL}/tools/blogdrop`,
            description:
              "Blog-ready images in one drop. Compress, resize to 1200px, convert to WebP, and AI-rename for SEO.",
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
