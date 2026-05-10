import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles, Globe, Eye, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AltTextClient from "@/components/tools/AltTextClient";
import AltTextHeroDemo from "@/components/tools/AltTextHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Alt Text Generator Online Free",
  description:
    "Generate WCAG-compliant alt text for images in 2 seconds with AI. Batch process 20+ images at once. Browser-based, free, no signup needed.",
  keywords: [
    "ai alt text generator",
    "image alt text",
    "alt text generator free",
    "accessibility alt text",
    "seo alt text",
    "image description generator",
    "auto alt text",
    "ai image description",
    "wcag alt text",
    "batch alt text",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/alt-text`,
  },
  openGraph: {
    title: "AI Alt Text Generator Online Free",
    description:
      "Generate WCAG-compliant alt text for images in 2 seconds with AI. Batch process 20+ images at once. Browser-based, free, no signup needed.",
    url: `${APP_URL}/tools/alt-text`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Alt Text Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Alt Text Generator Online Free",
    description:
      "Generate WCAG-compliant alt text for images in 2 seconds with AI. Batch process 20+ images at once. Browser-based, free, no signup needed.",
  },
};

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "Powered by Google Gemini",
    description:
      "SammaPix sends a thumbnail of your image to Google Gemini Flash which returns a concise, descriptive alt text optimized for both accessibility and SEO.",
    highlight: true,
  },
  {
    icon: <Eye className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "WCAG 2.1 compliant",
    description:
      "Generated alt texts follow web accessibility guidelines- descriptive, meaningful, and appropriate length (50-125 characters) for screen readers.",
    highlight: false,
  },
  {
    icon: <Globe className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "SEO-optimized output",
    description:
      "Alt text doubles as image SEO signal. Get descriptions that help your images rank in Google Image Search while serving accessibility requirements.",
    highlight: false,
  },
];


export default function AltTextPage() {
  return (
    <main>
      <MetaViewContent contentName="AI Alt Text" contentId="alt-text" />

      {/* Hero — Split layout: text left, animated demo right */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          {/* ── LEFT: Title + copy + trust badges ── */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <Eye className="h-4 w-4" style={{ color: "#6366F1" }} strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  AI Alt Text. WCAG, Free
                </h1>
                <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 uppercase tracking-wide">
                  PRO
                </span>
              </div>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Upload images → <strong className="text-[#171717] dark:text-[#E5E5E5]">Gemini AI</strong> generates WCAG 2.1 AA-compliant alt text in seconds. Edit inline, download as CSV/JSON for bulk CMS import. Only thumbnails sent to AI, originals stay on device.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                WCAG 2.1 AA
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch 20+
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Edit inline
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                CSV · JSON
              </span>
            </div>
          </div>

          {/* ── RIGHT: typing-animation demo ── */}
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <AltTextHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <AltTextClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How AI alt text generation works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-md border flex items-center justify-center mb-4 ${
                    f.highlight
                      ? "border-[#C7D2FE] bg-white dark:bg-[#1E1E1E]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]"
                  }`}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is alt text and why does it matter?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Alt text (alternative text) is an HTML attribute added to image tags that describes the image for screen readers used by visually impaired users. It is also a key SEO signal - Google uses alt text to understand the content and context of images on your page.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What makes good alt text?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Good alt text is specific, concise, and describes the key visual content without starting with &quot;image of&quot; or &quot;photo of&quot;. WCAG guidelines recommend 50-125 characters for most images. SammaPix AI generates alt texts that follow these conventions automatically.
          </p>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] p-4 space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-20 shrink-0 mt-0.5">Bad:</span>
              <code className="text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded font-mono text-[#737373]">
                image.jpg
              </code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-20 shrink-0 mt-0.5">Better:</span>
              <code className="text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded font-mono text-[#737373]">
                Photo of a dog
              </code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#6366F1] font-mono w-20 shrink-0 mt-0.5">AI output:</span>
              <code className="text-xs bg-white dark:bg-[#1E1E1E] border border-[#C7D2FE] px-2 py-1 rounded font-mono text-[#171717] dark:text-[#E5E5E5]">
                Golden retriever puppy playing with a red ball on green grass in bright sunlight
              </code>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="alt-text" />

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
                name: "AI Alt Text Generator",
                item: `${APP_URL}/tools/alt-text`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is alt text used for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Alt text (alternative text) serves two purposes: it describes images for screen readers used by visually impaired users (accessibility), and it tells search engines what an image depicts (SEO). Both use cases benefit from descriptive, specific alt text.",
                },
              },
              {
                "@type": "Question",
                name: "How long should alt text be?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WCAG recommends keeping alt text concise- typically 50-125 characters. SammaPix AI generates alt texts within this range automatically. Decorative images that convey no information can use empty alt text (alt='').",
                },
              },
              {
                "@type": "Question",
                name: "How many alt texts can I generate for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Free accounts get 10 AI credits per day after signing in. Pro accounts unlock 200 per day. Signing in is free- no credit card required.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images sent to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only a small thumbnail (max 512px) is sent to Google Gemini for analysis. Your original full-resolution images never leave your device. The thumbnail is processed and immediately discarded.",
                },
              },
            ],
          }),
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix AI Alt Text Generator",
            description:
              "Automatically generate accessibility-compliant alt text for images using Google Gemini AI. Produces 50-125 character descriptions optimized for screen readers and SEO.",
            url: `${APP_URL}/tools/alt-text`,
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
              url: "https://lucasammarco.com",
            },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
            featureList: [
              "Google Gemini AI powered",
              "WCAG 2.1 compliant alt text",
              "50-125 character output",
              "Inline editing",
              "CSV and JSON export",
              "Batch processing",
              "Free tier + Pro",
            ],
          }),
        }}
      />
    </main>
  );
}
