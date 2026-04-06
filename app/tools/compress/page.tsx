import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Zap,
  Minimize2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import CompressClient from "@/components/tools/CompressClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Compress Images Online Free",
  description:
    "Reduce image size by up to 90% without quality loss. Browser-based JPG, PNG & WebP compressor — no upload to servers. Free, unlimited. Try it now.",
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
    title: "Compress Images Online Free",
    description:
      "Reduce image size by up to 90% without quality loss. Browser-based JPG, PNG & WebP compressor — no upload to servers. Free, unlimited. Try it now.",
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
  twitter: {
    card: "summary_large_image",
    title: "Compress Images Online Free",
    description:
      "Reduce image size by up to 90% without quality loss. Browser-based JPG, PNG & WebP compressor — no upload to servers. Free, unlimited. Try it now.",
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

        {/* GEO answer box */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          SammaPix Compress is a free browser-based tool that reduces image file
          size by up to 90% without visible quality loss. No upload required —
          your files never leave your device. Supports JPG, PNG, WebP, GIF, AVIF,
          and HEIC with batch processing for up to 500 images at once.
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
                Zero
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Server uploads
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

      <RelatedTools toolId="compress" />

      {/* ── Compress to specific size (hub link) ── */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Compress to a specific file size
          </h2>
          <p className="text-xs text-[#737373] mb-4">
            Need to compress to an exact KB limit? Choose your target size:
          </p>
          <div className="flex flex-wrap gap-2">
            {["20kb","50kb","100kb","200kb","500kb","1mb","2mb"].map(size => (
              <Link key={size} href={`/compress-to/${size}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
                {size.toUpperCase()}
              </Link>
            ))}
            <Link href="/compress-to" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#6366F1]/30 rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 bg-white dark:bg-[#1E1E1E] transition-colors">
              All sizes <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
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
            Why compress images online?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Smaller images load faster and rank better on Google. SammaPix
            compresses your images directly in your browser using advanced
            algorithms that analyze each image and remove unnecessary data. You
            control the quality with a simple slider — most images at the
            default 80% setting show zero visible difference from the original
            while shrinking by 50–80%.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Because everything stays on your device, there&apos;s zero privacy
            risk — your photos never touch a server. You won&apos;t hit upload
            limits, and you&apos;ll get results instantly.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you compress images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before uploading to your website to improve Google page speed
              rankings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before attaching to emails to keep attachment sizes small
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Before sharing on social media to avoid quality loss during upload
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              For e-commerce product photos to improve search rankings and
              reduce bounce rate
            </li>
          </ul>
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
              href="/blog/compress-images-without-losing-quality"
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
              {
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
                    name: "Image Compressor",
                    item: `${APP_URL}/tools/compress`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
