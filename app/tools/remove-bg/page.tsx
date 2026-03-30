import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Shield,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Zap,
  Scissors,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import RemoveBgClient from "@/components/tools/RemoveBgClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Remove Image Background Free Online | SammaPix",
  description:
    "Get transparent PNGs in 3 seconds with AI background removal. Works with photos, products & portraits. Browser-based, free, no signup needed.",
  keywords: [
    "remove background",
    "background remover",
    "transparent background",
    "remove bg free online",
    "background eraser",
    "cut out image",
    "remove image background ai",
    "transparent png maker",
    "background removal tool",
    "photo background remover",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/remove-bg`,
  },
  openGraph: {
    title: "Remove Image Background Free Online | SammaPix",
    description:
      "Get transparent PNGs in 3 seconds with AI background removal. Works with photos, products & portraits. Browser-based, free, no signup needed.",
    url: `${APP_URL}/tools/remove-bg`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Remove Background from Image Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Image Background Free Online | SammaPix",
    description:
      "Get transparent PNGs in 3 seconds with AI background removal. Works with photos, products & portraits. Browser-based, free, no signup needed.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data (used in both UI and JSON-LD)                            */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How do I remove the background from an image?",
    answer:
      "Simply drag and drop your image onto the upload area above, then click 'Remove Background'. The AI model runs entirely in your browser and produces a transparent PNG in seconds. No account or upload needed.",
  },
  {
    question: "Is background removal free?",
    answer:
      "Yes. Background removal on SammaPix is 100% free with no daily limits on the number of images. The Pro plan adds batch ZIP downloads and higher batch limits, but the core tool is free forever.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "You can upload JPG, PNG, and WebP images. The output is always a PNG file with a transparent background, which is universally supported across all platforms and design tools.",
  },
  {
    question: "Does it work with complex backgrounds?",
    answer:
      "Yes. The AI model is trained on millions of images and handles complex backgrounds, fine hair details, semi-transparent objects, and intricate edges. It works best with clear subjects like people, products, animals, and objects.",
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "No. The AI model runs entirely in your browser using WebAssembly. Your images never leave your device — nothing is uploaded, stored, or tracked. Your privacy is fully protected.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function RemoveBgPage() {
  return (
    <main>
      <MetaViewContent contentName="Remove Background" contentId="remove-bg" />

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
              backgroundColor: "#EC489915",
              border: "1px solid #EC489930",
            }}
            aria-hidden="true"
          >
            <Scissors
              className="h-[18px] w-[18px]"
              style={{ color: "#EC4899" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Remove Background — Free, No Upload
          </h1>
        </div>

        {/* GEO answer box */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          SammaPix Remove Background is a free AI-powered tool that removes image
          backgrounds in under 5 seconds and outputs a transparent PNG. The AI
          model runs entirely in your browser via WebAssembly — no upload to any
          server, no signup required, and no daily limits.
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
            AI-powered
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL — RemoveBgClient                                       */}
      {/* ============================================================ */}
      <RemoveBgClient />

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
                With Background
              </p>
            </div>
            {/* Transparent */}
            <div className="border border-[#EC4899]/30 rounded-md bg-[#EC4899]/[0.03] dark:bg-[#EC4899]/[0.06] p-6 text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-lg border border-[#EC4899]/20 flex items-center justify-center"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)",
                  backgroundSize: "10px 10px",
                  backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                }}
              >
                <Scissors
                  className="h-7 w-7 text-[#EC4899]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-[#EC4899] mb-1">
                Transparent
              </p>
              <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Clean PNG
              </p>
              <p className="text-sm text-[#16A34A] font-medium mt-1">
                Background removed
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
                100%
              </p>
              <p className="text-xs text-[#737373] mt-1">Browser-based AI</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Zero
              </p>
              <p className="text-xs text-[#737373] mt-1">Server uploads</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                PNG
              </p>
              <p className="text-xs text-[#737373] mt-1">Transparent output</p>
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
                Your images never leave your browser. The AI model runs locally
                via WebAssembly — zero server uploads.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Sparkles
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                AI-Powered
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                State-of-the-art neural network handles complex backgrounds,
                fine hair, and intricate edges with precision.
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
                Remove backgrounds from up to 500 images at once with Pro. Free
                users can process up to 20 images per batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="remove-bg" />

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
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#EC4899] transition-colors [&::-webkit-details-marker]:hidden">
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
            Why remove image backgrounds online?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Background removal is one of the most common image editing tasks.
            Whether you&apos;re creating product photos for an e-commerce store,
            designing social media graphics, or building a presentation, a clean
            transparent background makes your images more versatile and
            professional. SammaPix uses a state-of-the-art AI model that runs
            entirely in your browser — no uploads, no waiting for server
            processing, no privacy concerns.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The AI model is downloaded once (~40 MB) and cached in your browser
            for instant processing on future visits. It handles complex
            backgrounds, fine hair details, semi-transparent objects, and
            intricate edges with remarkable precision — all without sending your
            images to any server.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you remove image backgrounds?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#EC4899] mt-0.5">-</span>
              Product photography for e-commerce stores — clean white or
              transparent backgrounds sell more
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EC4899] mt-0.5">-</span>
              Social media graphics — overlay subjects on branded backgrounds
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EC4899] mt-0.5">-</span>
              Presentations and documents — professional cutouts without
              Photoshop
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EC4899] mt-0.5">-</span>
              Profile pictures and headshots — clean transparent or custom
              backgrounds
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STRUCTURED DATA — SoftwareApplication + HowTo + FAQ + Breadcrumb */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Background Remover",
                url: `${APP_URL}/tools/remove-bg`,
                description:
                  "Free browser-based AI background remover. Remove image backgrounds instantly and get transparent PNG files. Zero server upload — 100% private.",
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
                  ratingValue: "4.9",
                  ratingCount: "87",
                },
                featureList: [
                  "AI-powered background removal",
                  "Transparent PNG output",
                  "Handles complex backgrounds and fine hair",
                  "Batch file processing",
                  "ZIP download archive",
                  "100% browser-based processing",
                  "No server upload — fully private",
                  "No sign-up required",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Remove Background from Image Online for Free",
                description:
                  "Step-by-step guide to remove backgrounds from images using SammaPix. Get transparent PNG files instantly in your browser.",
                totalTime: "PT1M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix Background Remover",
                  url: `${APP_URL}/tools/remove-bg`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Upload your image",
                    text: "Drag and drop a JPG, PNG, or WebP file onto the upload area, or click to browse your computer. Your file stays on your device — nothing is uploaded to any server.",
                    url: `${APP_URL}/tools/remove-bg`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Remove the background",
                    text: "Click 'Remove Background'. The AI model processes your image in your browser using WebAssembly. The first run downloads the model (~40 MB), which is cached for future use.",
                    url: `${APP_URL}/tools/remove-bg`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download your transparent PNG",
                    text: "Download the result as a PNG with a transparent background. For multiple images, use 'Download ZIP' to get all files in a single archive.",
                    url: `${APP_URL}/tools/remove-bg`,
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
                    name: "Clean Background",
                    item: `${APP_URL}/tools/remove-bg`,
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
