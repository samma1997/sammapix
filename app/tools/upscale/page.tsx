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
import UpscaleHeroDemo from "@/components/tools/UpscaleHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Free Topaz Gigapixel Alternative — AI Upscale 4x",
  description:
    "Topaz Gigapixel costs $99–199. SammaPix upscales images 2x or 4x free, in your browser — no install, no signup, images never leave your device.",
  keywords: [
    "topaz gigapixel alternative",
    "topaz gigapixel ai free",
    "free alternative to topaz gigapixel",
    "topaz gigapixel pricing 2026",
    "free ai image upscaler",
    "upscale image 4k free",
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
    title: "Free Topaz Gigapixel Alternative — AI Upscale 4x",
    description:
      "Topaz Gigapixel costs $99–199. SammaPix upscales images 2x or 4x free, in your browser — no install, no signup, images never leave your device.",
    url: `${APP_URL}/tools/upscale`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Free Topaz Gigapixel Alternative, AI Image Upscaler Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Topaz Gigapixel Alternative — AI Upscale 4x",
    description:
      "Topaz Gigapixel costs $99–199. SammaPix upscales images 2x or 4x free, in your browser — no install, no signup, images never leave your device.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data (used in both UI and JSON-LD)                            */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How much does Topaz Gigapixel cost in 2026?",
    answer:
      "Topaz Gigapixel AI is now part of Topaz Photo AI, which costs $199/year or roughly $17–25/month as a subscription. A legacy one-time license was previously available at $99, but new purchases require a subscription. SammaPix offers the same core upscaling (2x and 4x) completely free, directly in your browser — no install, no signup.",
  },
  {
    question: "Is there a free alternative to Topaz Gigapixel?",
    answer:
      "Yes. SammaPix uses a real ESRGAN neural network (the same class of AI model as Topaz) running directly in your browser — no installation or signup required. Free users get AI 2x upscaling. Upscayl (free, open-source desktop app) is another solid option for offline use.",
  },
  {
    question: "Is SammaPix as good as Topaz Gigapixel?",
    answer:
      "SammaPix now uses ESRGAN — the same neural network architecture behind most AI upscalers including Topaz. For 2x super-resolution on everyday photos, results are very close. Topaz Gigapixel's proprietary models trained on billions of images can recover more detail on heavily degraded or very small sources. For thumbnails, product photos, social media, and everyday upscaling, SammaPix AI produces excellent results — and it's entirely free at 2x.",
  },
  {
    question: "How does AI upscaling work?",
    answer:
      "SammaPix runs a real ESRGAN (Enhanced Super-Resolution Generative Adversarial Network) model in your browser using TensorFlow.js. The model was trained to hallucinate realistic high-frequency detail — edges, textures, fine patterns — that simple interpolation cannot recover. It processes your image in overlapping patches to handle any size without running out of GPU memory. Everything runs locally in your browser; your images are never uploaded to any server.",
  },
  {
    question: "What's the maximum upscale factor?",
    answer:
      "Free users get AI 2x upscaling (e.g. 500x500 → 1000x1000). Pro users get AI 4x (e.g. 500x500 → 2000x2000) and can process images up to 2500px on the longest side with full AI. 4x is ideal for small thumbnails, icons, or print preparation where maximum enlargement is needed.",
  },
  {
    question: "Will upscaling make my image blurry?",
    answer:
      "No — AI upscaling actively sharpens and reconstructs detail rather than blurring. ESRGAN is specifically trained to recover sharp edges and textures. The result is noticeably crisper than browser or Photoshop bicubic interpolation. For very degraded or noisy originals, the AI may occasionally introduce mild artifacts on extreme fine detail, but overall sharpness is substantially better than non-AI methods.",
  },
  {
    question: "What formats are supported?",
    answer:
      "SammaPix supports all major image formats: JPEG/JPG, PNG, WebP, GIF, AVIF, and HEIC. The upscaled output is always PNG to preserve maximum quality without any lossy compression artifacts.",
  },
  {
    question: "Is this free?",
    answer:
      "Yes! Free users get 5 upscales per day with images up to 1500px. Pro users ($9/month) get 100 upscales per day with no size limits, plus access to all 27 SammaPix tools with higher limits.",
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
    desc: "Select the AI upscale factor. 2x is free. 4x (Pro) quadruples resolution using the same ESRGAN model.",
  },
  {
    title: "Download AI-upscaled image",
    desc: "Click download to save the lossless PNG. The AI model runs entirely in your browser — nothing is uploaded.",
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
      {/*  HERO — Split layout: text left, animated demo right          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT: Title + copy + trust badges ── */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
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
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Free Topaz Gigapixel Alternative — AI Upscale 2× &amp; 4×
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Topaz Gigapixel costs $99–199. SammaPix runs a real ESRGAN AI
              model in your browser — the same neural network architecture —
              and upscales your images 2× free. No installation, no signup,
              no upload. Your images never leave your device.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Free to use
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No sign-up
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No upload
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                2× &amp; 4× upscale
              </span>
            </div>
          </div>

          {/* ── RIGHT: Auto-cycling demo with Original / 2× / 4× states ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <UpscaleHeroDemo />
          </div>
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
      {/*  COMPARISON — SammaPix vs Topaz Gigapixel AI                */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            SammaPix vs Topaz Gigapixel AI
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">
            Topaz Gigapixel moved to a subscription model in 2024. Here&rsquo;s how it compares to SammaPix for everyday upscaling.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                  <th className="text-left px-4 py-3 text-[#171717] dark:text-[#E5E5E5] font-semibold border-b border-[#E5E5E5] dark:border-[#2A2A2A] w-[40%]">
                    Feature
                  </th>
                  <th className="text-left px-4 py-3 text-[#737373] dark:text-[#A3A3A3] font-medium border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Topaz Gigapixel AI
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B5CF6] font-semibold border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    SammaPix
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {[
                  {
                    feature: "Price",
                    topaz: "$99–199 one-time or $17–25/mo subscription",
                    sammapix: "Free (5 upscales/day) — no credit card",
                    highlight: true,
                  },
                  {
                    feature: "Install required",
                    topaz: "Desktop app (Windows / Mac)",
                    sammapix: "Browser only — nothing to install",
                    highlight: false,
                  },
                  {
                    feature: "Privacy",
                    topaz: "Local processing on your machine",
                    sammapix: "100% in-browser — images never leave your device",
                    highlight: false,
                  },
                  {
                    feature: "Upscale 2x / 4x",
                    topaz: "Yes",
                    sammapix: "Yes",
                    highlight: false,
                  },
                  {
                    feature: "Signup needed",
                    topaz: "Yes (Topaz account required)",
                    sammapix: "No — open and go",
                    highlight: false,
                  },
                  {
                    feature: "AI super-resolution",
                    topaz: "Yes — proprietary deep learning models",
                    sammapix: "Yes — real ESRGAN neural network (browser-based)",
                    highlight: false,
                  },
                  {
                    feature: "Best for",
                    topaz: "Extreme detail recovery on degraded photos",
                    sammapix: "Web, social media, product photos, everyday use",
                    highlight: false,
                  },
                ].map(({ feature, topaz, sammapix, highlight }) => (
                  <tr key={feature} className={highlight ? "bg-[#8B5CF6]/[0.03] dark:bg-[#8B5CF6]/[0.06]" : ""}>
                    <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5] font-medium text-sm">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-[#737373] dark:text-[#A3A3A3] text-sm">
                      {topaz}
                    </td>
                    <td className={`px-4 py-3 text-sm ${highlight ? "text-[#8B5CF6] font-semibold" : "text-[#737373] dark:text-[#A3A3A3]"}`}>
                      {sammapix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#A3A3A3] mt-3">
            Honest note: both use AI super-resolution. SammaPix runs a real ESRGAN neural network locally in your browser (fully private, no upload). Topaz&rsquo;s proprietary models are larger and trained on billions of images, so they recover more detail on heavily degraded or very small sources. For web, social media and everyday photos the difference is negligible.
          </p>
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
                locally with JavaScript. Zero server uploads.
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
            Why look for a free Topaz Gigapixel alternative?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
            Topaz Gigapixel AI used to cost a one-time fee of $99. In 2024,
            Topaz Labs moved to a subscription model — Topaz Photo AI now costs
            $199/year or roughly $17–25/month. Many photographers and designers
            who simply need to upscale a photo for web or print don&rsquo;t
            need enterprise-tier AI to do it.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
            SammaPix is a free browser-based alternative that handles the most
            common upscaling jobs: enlarging product photos, prepping images for
            print, making thumbnails sharper on Retina displays, and recovering
            old low-resolution images. Everything runs in your browser — your
            images never leave your device.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you upscale images?
          </h3>
          <ul className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed space-y-2 list-none pl-0">
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
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">-</span>
              When Topaz Gigapixel&rsquo;s $199/year subscription is more than you need
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
                  "Free browser-based Topaz Gigapixel alternative. Upscale images 2x or 4x without quality loss. Zero server upload, 100% private, no install required.",
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
                  "Free alternative to Topaz Gigapixel AI",
                  "Multi-pass upscaling for sharper results",
                  "Lossless PNG output",
                  "Supports JPG, PNG, WebP, GIF, AVIF, HEIC",
                  "100% browser-based processing",
                  "No server upload, fully private",
                  "No sign-up required",
                  "No installation required",
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
