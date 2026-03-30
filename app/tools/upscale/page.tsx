import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Zap,
  Maximize2,
  ImageIcon,
  CheckCircle2,
  Sparkles,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import UpscaleClient from "@/components/tools/UpscaleClient";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Upscale Image 2x & 4x Online Free | SammaPix",
  description:
    "Enhance image resolution up to 4x with AI upscaling. Get sharp, detailed results in seconds. Browser-based, free, no signup or upload needed.",
  keywords: [
    "ai image upscaler",
    "upscale image",
    "enhance image quality",
    "increase image resolution",
    "ai photo enhancer",
    "image enlarger",
    "upscale photo free",
    "4k upscale",
    "enhance photo resolution ai",
    "image quality enhancer free",
    "image upscaler online",
    "photo resolution enhancer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/upscale`,
  },
  openGraph: {
    title: "Upscale Image 2x & 4x Online Free | SammaPix",
    description:
      "Enhance image resolution up to 4x with AI upscaling. Get sharp, detailed results in seconds. Browser-based, free, no signup or upload needed.",
    url: `${APP_URL}/tools/upscale`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — AI Image Upscaler Free Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upscale Image 2x & 4x Online Free | SammaPix",
    description:
      "Enhance image resolution up to 4x with AI upscaling. Get sharp, detailed results in seconds. Browser-based, free, no signup or upload needed.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data (used in both UI and JSON-LD)                            */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How does AI upscaling work?",
    answer:
      "SammaPix uses advanced browser-based algorithms to intelligently upscale your images. The tool analyzes pixel patterns and applies high-quality interpolation to increase resolution while preserving sharpness. Everything runs directly in your browser — your images are never uploaded to any server.",
  },
  {
    question: "What's the maximum upscale factor?",
    answer:
      "You can upscale images up to 4x their original resolution. For example, a 500x500 image becomes 2000x2000 at 4x. We recommend 2x for most use cases as it provides the best balance between size increase and quality retention. 4x is great for small thumbnails or icons that need to be enlarged significantly.",
  },
  {
    question: "Will upscaling make my image blurry?",
    answer:
      "SammaPix uses multi-pass upscaling with high-quality smoothing to minimize blur. For 4x upscaling, we apply two sequential 2x passes which produces significantly sharper results than a single 4x jump. The output quality depends on the source image — higher quality originals produce better upscaled results.",
  },
  {
    question: "What formats are supported?",
    answer:
      "SammaPix supports all major image formats: JPEG/JPG, PNG, WebP, GIF, AVIF, and HEIC. The upscaled output is always PNG to preserve maximum quality without any lossy compression artifacts.",
  },
  {
    question: "Is this free?",
    answer:
      "Yes! Free users get 5 upscales per day with images up to 1500px. Pro users ($9/month) get 100 upscales per day with no size limits, plus access to all 25 SammaPix tools with higher limits.",
  },
];

/* ------------------------------------------------------------------ */
/*  HowToUse steps                                                    */
/* ------------------------------------------------------------------ */
const howToSteps = [
  {
    title: "Drop your image",
    desc: "Drag and drop any JPG, PNG, or WebP image onto the upload area.",
  },
  {
    title: "Choose 2x or 4x",
    desc: "Select how much to enlarge. 2x doubles dimensions, 4x quadruples them.",
  },
  {
    title: "Download enhanced image",
    desc: "Click download to save the upscaled PNG. Original quality preserved.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function UpscalePage() {
  return (
    <main>
      <MetaViewContent contentName="Upscale" contentId="upscale" />

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
              backgroundColor: "#8B5CF615",
              border: "1px solid #8B5CF630",
            }}
            aria-hidden="true"
          >
            <Maximize2
              className="h-[18px] w-[18px]"
              style={{ color: "#8B5CF6" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Enhance Resolution — AI Image Upscaler
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          Upscale images 2x or 4x instantly. Increase resolution without losing
          quality — all processing happens in your browser.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            Free to use
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
            2x &amp; 4x upscale
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL — UpscaleClient                                        */}
      {/* ============================================================ */}
      <UpscaleClient />

      {/* ============================================================ */}
      {/*  HOW TO USE                                                   */}
      {/* ============================================================ */}
      <HowToUse
        steps={howToSteps}
        toolName="the AI Image Upscaler"
        proTip={{
          text: "Need to upscale more than 5 images per day or work with high-res photos?",
          linkLabel: "Upgrade to Pro",
          linkHref: "/dashboard/upgrade",
        }}
      />

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
                640 x 480
              </p>
              <p className="text-sm text-[#A3A3A3] mt-1">Low resolution</p>
            </div>
            {/* Upscaled */}
            <div className="border border-[#8B5CF6]/30 rounded-md bg-[#8B5CF6]/[0.03] dark:bg-[#8B5CF6]/[0.06] p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                <Maximize2
                  className="h-7 w-7 text-[#8B5CF6]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-[#8B5CF6] mb-1">
                Upscaled 4x
              </p>
              <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                2560 x 1920
              </p>
              <p className="text-sm text-[#16A34A] font-medium mt-1">
                4x larger, sharp details
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
                2x &amp; 4x
              </p>
              <p className="text-xs text-[#737373] mt-1">Upscale options</p>
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
              <p className="text-xs text-[#737373] mt-1">Server uploads</p>
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
                <Sparkles
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                Smart Multi-Pass
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                4x upscaling uses two sequential 2x passes for significantly
                sharper results than a single 4x jump.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Monitor
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                PNG Output
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Upscaled images are saved as lossless PNG to preserve every
                detail. No compression artifacts added.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="upscale" />

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
            Why upscale images online?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Low-resolution images look pixelated when displayed on modern
            high-DPI screens. Whether you need to enlarge a product photo for
            your online store, upscale an old family photo, or increase the
            resolution of a thumbnail for printing, SammaPix helps you enhance
            image quality directly in your browser.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Unlike server-based upscalers that require you to upload your
            images, SammaPix processes everything locally. Your photos never
            leave your device, ensuring complete privacy. The upscaled output is
            saved as lossless PNG, so no additional compression artifacts are
            introduced.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you upscale images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">-</span>
              Before printing photos that were taken at low resolution
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">-</span>
              To make product images look crisp on high-DPI / Retina displays
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">-</span>
              To enlarge thumbnails or social media avatars for larger contexts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">-</span>
              To restore old or low-quality photos to a usable resolution
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STRUCTURED DATA — SoftwareApplication + FAQ + HowTo         */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix AI Image Upscaler",
                url: `${APP_URL}/tools/upscale`,
                description:
                  "Free browser-based AI image upscaler. Enhance image resolution 2x or 4x without quality loss. Zero server upload — 100% private.",
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
                  ratingValue: "4.7",
                  ratingCount: "85",
                },
                featureList: [
                  "2x and 4x image upscaling",
                  "Multi-pass upscaling for sharper results",
                  "Lossless PNG output",
                  "Supports JPG, PNG, WebP, GIF, AVIF, HEIC",
                  "100% browser-based processing",
                  "No server upload — fully private",
                  "No sign-up required",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Upscale Images Online for Free",
                description:
                  "Step-by-step guide to upscale images 2x or 4x using SammaPix. Enhance image resolution without quality loss, entirely in your browser.",
                totalTime: "PT1M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix AI Image Upscaler",
                  url: `${APP_URL}/tools/upscale`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Drop your image",
                    text: "Drag and drop a JPG, PNG, WebP, or other image file onto the SammaPix upload area. The image is kept private and processed directly in your browser.",
                    url: `${APP_URL}/tools/upscale`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Choose upscale factor",
                    text: "Select 2x to double the image dimensions, or 4x to quadruple them. 4x uses a two-pass technique for the sharpest possible results.",
                    url: `${APP_URL}/tools/upscale`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download enhanced image",
                    text: "Click the download button to save your upscaled image as a lossless PNG file. Your original image is never modified.",
                    url: `${APP_URL}/tools/upscale`,
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
                    name: "AI Image Upscaler",
                    item: `${APP_URL}/tools/upscale`,
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
