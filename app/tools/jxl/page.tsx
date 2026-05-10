import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Shield, Zap, Sparkles, CheckCircle2, FileImage } from "lucide-react";
import Link from "next/link";
import JxlConverterClient from "@/components/tools/JxlConverterClient";
import JxlHeroDemo from "@/components/tools/JxlHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

/* ── Metadata ──────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "JPEG XL (JXL) Converter Free Online — Convert JXL to JPG, PNG, WebP",
  description:
    "Convert JPEG XL (.jxl) files to JPG, PNG, or WebP — or convert JPG/PNG to JXL. The next-gen image format with 30-60% smaller files. 100% free, browser-based, no upload.",
  keywords: [
    "jxl converter",
    "jpeg xl converter",
    "jxl to jpg",
    "jxl to png",
    "jxl to webp",
    "jpg to jxl",
    "png to jxl",
    "convert jxl",
    "jpeg xl to jpg",
    "jxl converter online",
    "jxl file converter",
    "open jxl file",
    "jpeg xl converter free",
    "convert jpeg xl online",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/jxl`,
  },
  openGraph: {
    title: "JPEG XL (JXL) Converter Free Online",
    description:
      "Convert JXL to JPG/PNG/WebP or JPG/PNG to JXL. Next-gen format, 30-60% smaller files. Free, private, browser-based.",
    url: `${APP_URL}/tools/jxl`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — JPEG XL Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPEG XL (JXL) Converter Free Online",
    description:
      "Convert JXL files to JPG/PNG/WebP or vice versa. Free, no upload.",
  },
};

/* ── Schema ────────────────────────────────────────────────────────────────── */

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SammaPix JPEG XL Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (browser-based)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert JPEG XL (JXL) files to JPG, PNG, or WebP — and convert standard images to JPEG XL. Runs entirely in your browser using WebAssembly for maximum privacy.",
  url: `${APP_URL}/tools/jxl`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is JPEG XL (JXL)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG XL is a next-generation image format designed to replace JPEG, PNG, and GIF. It offers 30-60% better compression than JPEG at the same visual quality, supports lossless compression, transparency, animation, and HDR. It was standardized as ISO 18181 in 2022.",
      },
    },
    {
      "@type": "Question",
      name: "Which browsers support JPEG XL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safari 17+ (macOS Sonoma, iOS 17) supports JPEG XL natively. Chrome is in the process of re-adding JXL support after initially removing it. Firefox supports it behind a flag. SammaPix uses WebAssembly to decode and encode JXL in any modern browser, regardless of native support.",
      },
    },
    {
      "@type": "Question",
      name: "How much smaller are JXL files compared to JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At the same visual quality, JPEG XL files are typically 30-60% smaller than JPEG. For lossless compression, JXL is about 35% smaller than PNG. JXL also supports lossless transcoding from existing JPEG files with an additional 20% size reduction.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to convert JXL files online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With SammaPix, yes. The conversion runs entirely inside your browser using WebAssembly (libjxl compiled to WASM). Your images are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert JPG or PNG to JPEG XL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix supports both directions: JXL to JPG/PNG/WebP, and JPG/PNG/WebP to JXL. Use the direction toggle at the top of the tool to switch between modes.",
      },
    },
  ],
};

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default function JxlConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MetaViewContent contentName="JXL Converter" contentCategory="tool" />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
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
                  style={{ backgroundColor: "#F59E0B15", border: "1px solid #F59E0B30" }}
                  aria-hidden="true"
                >
                  <FileImage className="h-4 w-4" style={{ color: "#F59E0B" }} strokeWidth={1.5} />
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                    JPEG XL Converter. -60% Free
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] dark:bg-[#78350F]/40 dark:text-[#FCD34D] uppercase tracking-wide">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Next-Gen
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
                Convert JXL ↔ JPG / PNG / WebP. JPEG XL is the{" "}
                <strong className="text-[#171717] dark:text-[#E5E5E5]">next-gen image format</strong>{" "}
                with 30-60% smaller files at the same quality. WebAssembly-powered, runs entirely in your browser.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                  Encode + Decode
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                  WASM-powered
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                  No upload
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                  Lossless option
                </span>
              </div>
            </div>

            {/* ── RIGHT: animated compression demo ── */}
            <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
              <JxlHeroDemo />
            </div>
          </div>
        </section>

        {/* Tool */}
        <JxlConverterClient />

        {/* How it works */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            How to Convert JPEG XL Files
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Choose direction",
                desc: "Select JXL → Image to convert .jxl files, or Image → JXL to create JXL files.",
              },
              {
                step: "2",
                title: "Drop your files",
                desc: "Add .jxl files or JPG/PNG/WebP images depending on your chosen direction.",
              },
              {
                step: "3",
                title: "Convert & download",
                desc: "Click Convert and download your files individually or as a ZIP archive.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#F5F5F5] dark:bg-[#252525] text-sm font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
                  {s.step}
                </div>
                <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What is JXL section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Why JPEG XL?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Superior compression</p>
                <p>30&ndash;60% smaller than JPEG at equivalent quality. Even better than WebP and AVIF for photographic content.</p>
              </div>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Lossless &amp; lossy</p>
                <p>Supports both modes. Lossless JXL is 35% smaller than PNG. Can also losslessly recompress existing JPEG files.</p>
              </div>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">HDR &amp; wide color</p>
                <p>Native support for HDR, 10-bit and higher color depth, and wide color gamuts like Display P3.</p>
              </div>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Growing browser support</p>
                <p>Safari 17+ supports JXL natively. Chrome is re-adding support. An ISO standard (18181) since 2022.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"
              >
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] rounded-md">
                  {faq.name}
                  <span className="text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 text-xs text-[#737373] leading-relaxed">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="jxl" />
        </div>
      </main>
    </>
  );
}
