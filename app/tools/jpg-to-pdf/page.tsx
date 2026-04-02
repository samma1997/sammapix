import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Shield, Zap, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import JpgToPdfClient from "@/components/tools/JpgToPdfClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

/* ── Metadata ──────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "JPG to PDF Converter Free Online — Merge Images to PDF",
  description:
    "Convert JPG, PNG, and WebP images to a single PDF file. Drag to reorder pages, choose A4 or Letter size. 100% free, browser-based — your images never leave your device.",
  keywords: [
    "jpg to pdf",
    "jpg to pdf converter",
    "image to pdf",
    "png to pdf",
    "convert jpg to pdf",
    "merge images to pdf",
    "combine jpg to pdf",
    "photo to pdf",
    "pictures to pdf free",
    "jpg to pdf online free",
    "image to pdf converter",
    "multiple jpg to pdf",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/jpg-to-pdf`,
  },
  openGraph: {
    title: "JPG to PDF Converter Free Online — Merge Images to PDF",
    description:
      "Convert JPG, PNG, and WebP images to a single PDF. Reorder pages, choose page size. Free, private, browser-based.",
    url: `${APP_URL}/tools/jpg-to-pdf`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — JPG to PDF Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter Free Online",
    description:
      "Merge multiple JPG/PNG images into one PDF. Free, private, no upload.",
  },
};

/* ── Schema ────────────────────────────────────────────────────────────────── */

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SammaPix JPG to PDF Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (browser-based)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert and merge multiple JPG, PNG, or WebP images into a single PDF document. Runs entirely in your browser for maximum privacy.",
  url: `${APP_URL}/tools/jpg-to-pdf`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert multiple JPG images to one PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop your JPG or PNG images into SammaPix, drag to reorder them, choose a page size (A4, Letter, or Fit to Image), and click Create PDF. The merged PDF downloads instantly — no signup or upload required.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to convert images to PDF online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With SammaPix, yes. The entire conversion happens inside your browser using the pdf-lib library. Your images are never uploaded to any server. You can disconnect from the internet after the page loads and the tool still works.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can I convert to PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix supports JPG/JPEG, PNG, WebP, and GIF. All images are embedded at their original quality into the PDF document.",
      },
    },
    {
      "@type": "Question",
      name: "Can I choose the page order in the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After uploading your images, you can drag and drop them into any order you want. The PDF pages will follow the order you set.",
      },
    },
    {
      "@type": "Question",
      name: "What page sizes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix offers A4 (210×297mm), US Letter (8.5×11in), and Fit to Image (each page matches the image dimensions exactly). For A4 and Letter you can also choose portrait, landscape, or auto orientation.",
      },
    },
  ],
};

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default function JpgToPdfPage() {
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
      <MetaViewContent contentName="JPG to PDF" contentCategory="tool" />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Top nav bar */}
        <div className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
              All Tools
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            JPG to PDF Converter
          </h1>
          <p className="text-sm text-[#737373] max-w-lg mx-auto leading-relaxed">
            Merge multiple JPG, PNG, or WebP images into a single PDF document.
            Drag to reorder pages, choose your page size, and download instantly.
            100% free and private &mdash; nothing leaves your browser.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373]">
              <Shield className="h-3 w-3" strokeWidth={1.5} />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373]">
              <Zap className="h-3 w-3" strokeWidth={1.5} />
              Instant
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373]">
              <Layers className="h-3 w-3" strokeWidth={1.5} />
              Up to 200 pages
            </span>
          </div>
        </div>

        {/* Tool */}
        <JpgToPdfClient />

        {/* How it works */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            How to Convert Images to PDF
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Upload images",
                desc: "Drop JPG, PNG, or WebP files. Add as many as you need.",
              },
              {
                step: "2",
                title: "Reorder & configure",
                desc: "Drag images into the right order. Pick A4, Letter, or Fit to Image.",
              },
              {
                step: "3",
                title: "Download PDF",
                desc: "Click Create PDF and your merged document downloads instantly.",
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
          <RelatedTools toolId="jpg-to-pdf" />
        </div>
      </main>
    </>
  );
}
