import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  Shield,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileDown,
  Zap,
  ArrowLeft,
  Minimize2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import CompressClient from "@/components/tools/CompressClient";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Compress Images Online — Free, No Upload | SammaPix",
  description:
    "Reduce image file size up to 90% without losing quality. Free online image compressor — works in your browser, images never leave your device. JPG, PNG, WebP, GIF.",
  keywords: [
    "compress image online",
    "image compressor",
    "compress images online free",
    "jpg compressor",
    "png compressor",
    "free image compression",
    "compress without losing quality",
    "reduce image size",
    "image optimization tool",
    "compress photos online",
    "reduce file size",
    "online image compressor no upload",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/compress`,
  },
  openGraph: {
    title: "Compress Images Online — Free, No Upload | SammaPix",
    description:
      "Reduce image file size up to 90% without losing quality. Free online image compressor — works in your browser, images never leave your device.",
    url: `${APP_URL}/tools/compress`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Compress Images Online Free",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data (used in both UI and JSON-LD)                            */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Is SammaPix really free?",
    answer:
      "Yes. Image compression on SammaPix is 100% free with no limits on file count or size. The Pro plan adds batch ZIP downloads, higher batch limits, and AI-powered features, but standard compression is free forever.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. SammaPix compresses images entirely inside your browser using JavaScript. Your files never leave your device — nothing is uploaded, stored, or tracked. Your privacy is fully protected.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "SammaPix supports all major image formats: JPEG/JPG, PNG, WebP, GIF, BMP, TIFF, AVIF, and HEIC. You can compress any of these formats directly in your browser.",
  },
  {
    question: "How much can I compress without losing quality?",
    answer:
      "At the default 80% quality setting, most images shrink by 50–80% with no visible quality loss. Photos with lots of detail can often be compressed by 60–90%. The quality slider lets you find the perfect balance for your needs.",
  },
  {
    question: "What's the difference between Free and Pro?",
    answer:
      "Free gives you unlimited compression with single-file downloads. Pro ($7/month) adds batch processing up to 500 images, one-click ZIP downloads, AI-powered file renaming, and zero ads. Both plans process everything in your browser — no uploads.",
  },
];

/* ------------------------------------------------------------------ */
/*  Cross-sell tools                                                  */
/* ------------------------------------------------------------------ */
const crossSellTools = [
  {
    name: "Convert to WebP",
    desc: "Even smaller files with modern format",
    href: "/tools/webp",
    icon: FileDown,
  },
  {
    name: "AI Rename",
    desc: "SEO-friendly filenames with AI",
    href: "/tools/ai-rename",
    icon: Sparkles,
  },
  {
    name: "Batch Resize",
    desc: "Perfect sizes for social media",
    href: "/tools/resizepack",
    icon: Layers,
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function CompressPage() {
  return (
    <main>
      <MetaViewContent contentName="Compress" contentId="compress" />

      {/* ============================================================ */}
      {/*  HERO — Conversion-focused, compact, above the tool          */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        {/* Icon + H1 */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: "#6366F115",
              border: "1px solid #6366F130",
            }}
            aria-hidden="true"
          >
            <Minimize2
              className="h-[18px] w-[18px]"
              style={{ color: "#6366F1" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Compress Images Online — Free, No Upload
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          Reduce file size up to 90% without losing quality. Works in your
          browser — images never leave your device.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            Free forever
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            No sign-up
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            No upload
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            20+ formats
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL — CompressClient (untouched)                           */}
      {/* ============================================================ */}
      <CompressClient />

      {/* ============================================================ */}
      {/*  BEFORE / AFTER — Visual proof                               */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            See the difference
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Original */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center">
                <ImageIcon
                  className="h-7 w-7 text-[#A3A3A3]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-[#A3A3A3] mb-1">
                Original
              </p>
              <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                2.4 MB
              </p>
            </div>
            {/* Compressed */}
            <div className="border border-[#6366F1]/30 rounded-md bg-[#6366F1]/[0.03] dark:bg-[#6366F1]/[0.06] p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
                <Zap
                  className="h-7 w-7 text-[#6366F1]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-[#6366F1] mb-1">
                Compressed
              </p>
              <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                340 KB
              </p>
              <p className="text-sm text-[#16A34A] font-medium mt-1">
                86% smaller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF                                                */}
      {/* ============================================================ */}
      <section className="py-10 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-wide text-[#A3A3A3] mb-5">
            Trusted by creators worldwide
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                1M+
              </p>
              <p className="text-xs text-[#737373] mt-1">Images compressed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                100%
              </p>
              <p className="text-xs text-[#737373] mt-1">Browser-based</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                0
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Files uploaded to servers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY SAMMAPIX — 3 value prop cards                          */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why SammaPix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Shield
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                100% Private
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Your images never leave your browser. Everything is processed
                locally with JavaScript — zero server uploads.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <ImageIcon
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                No Quality Loss
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Smart compression preserves visual quality. At 80% quality, most
                images are visually identical to the original.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Layers
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                Batch Processing
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Compress up to 500 images at once with Pro. Free users can
                process multiple files with single downloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CROSS-SELL — You might also need                            */}
      {/* ============================================================ */}
      <section className="py-10 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            You might also need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {crossSellTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-start gap-3 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors group"
                >
                  <div className="flex-shrink-0 h-8 w-8 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
                    <Icon
                      className="h-4 w-4 text-[#737373] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] flex items-center gap-1">
                      {tool.name}
                      <ArrowRight
                        className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        strokeWidth={1.5}
                      />
                    </p>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ — Visible + Schema                                      */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO long-form content                                       */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How image compression works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix compresses images using the browser&apos;s native Canvas
            API combined with the{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
              browser-image-compression
            </code>{" "}
            library. The process re-encodes the image at the quality level you
            choose (default 80%) producing a smaller file with imperceptible
            quality differences.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Unlike server-based tools like TinyPNG or Squoosh, nothing leaves
            your browser. This means no privacy risk, no file size limits
            imposed by network bandwidth, and near-instant results.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you compress images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before uploading to your website or CMS to improve page speed and
              Core Web Vitals
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before attaching to emails to reduce attachment size
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before sharing on social media for faster upload
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              For e-commerce product images to boost SEO and conversion rates
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ALL TOOLS — Show the full platform                          */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            SammaPix is more than a compressor
          </h2>
          <p className="text-xs text-[#A3A3A3] mb-6">
            20 free browser-based tools for creators. Everything runs locally — your files never leave your device.
          </p>

          {/* AI Organize — Featured */}
          <Link
            href="/tools/ai-organize"
            className="flex items-start gap-4 p-5 mb-4 border-2 border-[#8B5CF6]/30 rounded-xl bg-[#8B5CF6]/5 hover:bg-[#8B5CF6]/10 transition-colors group"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#8B5CF6]/15 shrink-0">
              <Sparkles className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] flex items-center gap-2">
                AI File Organizer
                <span className="text-[9px] font-bold uppercase tracking-widest bg-[#8B5CF6] text-white px-2 py-0.5 rounded-full">NEW</span>
              </p>
              <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                Drop any files — photos, PDFs, documents, videos. AI sorts into smart folders, finds duplicates, and renames based on content. No competitor does this browser-based.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#8B5CF6] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
          </Link>

          {/* Tool grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { name: "WebP Convert", href: "/tools/webp" },
              { name: "HEIC to JPG", href: "/tools/heic" },
              { name: "AI Rename", href: "/tools/ai-rename" },
              { name: "AI Alt Text", href: "/tools/alt-text" },
              { name: "Batch Resize", href: "/tools/resizepack" },
              { name: "Crop & Ratio", href: "/tools/croproatio" },
              { name: "Film Filters", href: "/tools/filmlab" },
              { name: "Watermark", href: "/tools/stampit" },
              { name: "EXIF Remover", href: "/tools/exif" },
              { name: "Find Duplicates", href: "/tools/twinhunt" },
              { name: "Photo Map", href: "/tools/travelmap" },
              { name: "Cull Photos", href: "/tools/cull" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-3 py-2.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors text-center"
              >
                {t.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/tools" className="text-xs text-[#6366F1] hover:underline font-medium">
              See all 20 tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">
              Related guide
            </p>
            <a
              href="/blog/compress-images-for-website"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1"
            >
              How to Compress Images for Websites Without Losing Quality
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STRUCTURED DATA — SoftwareApplication + FAQ                 */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Image Compressor",
                url: `${APP_URL}/tools/compress`,
                description:
                  "Free browser-based image compressor. Reduce JPG, PNG, WebP and GIF files up to 90% smaller without quality loss. Zero server upload — 100% private.",
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
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  ratingCount: "150",
                },
                featureList: [
                  "Compress JPG, PNG, WebP, GIF, AVIF, HEIC",
                  "Up to 90% file size reduction",
                  "Quality adjustment slider",
                  "Batch file processing",
                  "ZIP download archive",
                  "100% browser-based processing",
                  "No server upload — fully private",
                  "No sign-up required",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Compress Images Online for Free",
                description:
                  "Step-by-step guide to compress JPG, PNG, WebP and GIF images using SammaPix. Reduce file size up to 90% without losing visible quality.",
                totalTime: "PT2M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix Image Compressor",
                  url: `${APP_URL}/tools/compress`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Drop your images",
                    text: "Drag and drop JPG, PNG, WebP or GIF files onto the SammaPix upload area, or click to browse your computer. You can select multiple files at once for batch processing. All files are kept private and processed directly in your browser.",
                    url: `${APP_URL}/tools/compress`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Adjust quality slider",
                    text: "Use the quality slider to control how aggressively to compress. The default setting (80%) reduces file size by 50-80% with imperceptible quality loss. Move the slider left for smaller files or right to preserve maximum quality.",
                    url: `${APP_URL}/tools/compress`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download compressed files",
                    text: "Download each compressed image individually by clicking the download button, or click 'Download all as ZIP' to get all compressed files in a single archive. Your original files are never modified.",
                    url: `${APP_URL}/tools/compress`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
