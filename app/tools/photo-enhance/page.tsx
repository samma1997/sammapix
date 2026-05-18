import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  ImageIcon,
} from "lucide-react";
import PhotoEnhanceClient from "@/components/tools/PhotoEnhanceClient";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "AI Photo Enhancer Free — Clean Up Compressed Photos & Upscale 2x",
  description:
    "Free AI enhancer for compressed, grainy or low-resolution photos. Removes JPEG artifacts, sharpens soft details, and upscales 2x. 100% browser-based, no upload, no signup. Best for WhatsApp/messaging photos, screenshots and old scans.",
  keywords: [
    "ai photo enhancer",
    "ai photo enhancer free",
    "improve image quality",
    "enhance photo online",
    "ai image enhancer",
    "photo quality enhancer ai",
    "fix blurry photo",
    "sharpen image online",
    "remove jpeg artifacts",
    "ai image upscaler 2x",
    "photo enhancer free no signup",
    "ai photo quality improver",
    "improve old photo quality",
  ],
  alternates: { canonical: `${APP_URL}/tools/photo-enhance` },
  openGraph: {
    title: "AI Photo Enhancer Free Online — Improve Image Quality 2x",
    description:
      "Enhance photo quality with AI. Sharpen blurry photos, remove JPEG compression artifacts, upscale 2x. 100% browser-based, no upload, no signup, free.",
    url: `${APP_URL}/tools/photo-enhance`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Photo Enhancer Free Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Enhancer Free Online — Improve Image Quality 2x",
    description:
      "Sharpen blurry photos, remove JPEG artifacts, upscale 2x. AI runs in your browser. No upload, no signup.",
  },
};

const faqs = [
  {
    question: "How does the AI photo enhancer work?",
    answer:
      "SammaPix uses Swin2SR, an open-source vision transformer trained on millions of photo pairs. The model removes JPEG compression artifacts, sharpens blur, and upscales images 2x. Everything runs directly in your browser using WebGPU or WebAssembly. Your photos never leave your device.",
  },
  {
    question: "Is it really free? Any signup needed?",
    answer:
      "Yes, 100% free with no signup, no watermark, no upload. The AI model runs entirely in your browser. You can enhance as many photos as you want with no daily limit.",
  },
  {
    question: "What kinds of photos does it improve best?",
    answer:
      "Best results on: photos compressed by WhatsApp or messaging apps, screenshots that look soft, old scanned photos with grain, low-resolution thumbnails, and slightly blurry shots. It works less well on deeply damaged photos with scratches, tears, or severe color fading — those need specialized restoration models.",
  },
  {
    question: "How long does it take?",
    answer:
      "On a modern laptop with Chrome or Edge (WebGPU enabled): 5-15 seconds per photo. The first photo takes longer because the AI model (~25 MB) downloads and caches. Subsequent photos are faster. Inputs larger than 1024px are auto-resized before processing to keep memory usage reasonable.",
  },
  {
    question: "What format is the output?",
    answer:
      "Output is always PNG at 2x the input dimensions (after the 1024px input cap). PNG is lossless, preserving the AI enhancement without any compression damage. If you need a smaller file for the web, run the result through our free Compress tool.",
  },
  {
    question: "Does it remove scratches or restore black-and-white photos to color?",
    answer:
      "No — Swin2SR is designed for general enhancement (JPEG cleanup, sharpening, upscaling), not for damage repair or colorization. Scratch removal and B&W colorization require specialized models we're evaluating for a future Pro tier.",
  },
];

const howToSteps = [
  {
    title: "Drop your photo",
    desc: "Drag a JPG, PNG, or WebP file (up to 15 MB) onto the upload zone, or click to select.",
  },
  {
    title: "Click Enhance",
    desc: "The AI model runs in your browser. First use downloads ~25 MB of model weights (cached after).",
  },
  {
    title: "Compare before / after",
    desc: "Drag the slider to compare. Download the enhanced PNG at 2x the original size.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SammaPix AI Photo Enhancer",
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Any",
  url: `${APP_URL}/tools/photo-enhance`,
  description:
    "Free browser-based AI photo enhancer. Sharpens blurry photos, removes JPEG compression artifacts, upscales 2x. No upload, no signup.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "AI super-resolution 2x",
    "JPEG compression artifact removal",
    "Blur sharpening",
    "Browser-based (no upload)",
    "Privacy-preserving (zero data leaves device)",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to enhance a photo with AI for free",
  step: howToSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.desc,
  })),
};

export default function PhotoEnhancePage() {
  return (
    <main>
      <MetaViewContent contentName="Photo Enhance" contentId="photo-enhance" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
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
                <Sparkles
                  className="h-[18px] w-[18px]"
                  style={{ color: "#8B5CF6" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                AI Photo Enhancer. Clean Up Compressed Photos & Upscale 2x
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Remove JPEG compression artifacts, clean up grain, and upscale 2x
              with AI super-resolution. Best on WhatsApp-compressed photos, low-res
              screenshots, and grainy scans. Runs 100% in your browser. No upload,
              no signup, no watermark.
            </p>

            <div className="text-xs text-[#737373] dark:text-[#A3A3A3] bg-[#FFFBEB] dark:bg-[#3B2814] border border-[#FDE68A] dark:border-[#78350F] rounded-md px-3 py-2 mb-4 leading-relaxed">
              <strong className="text-[#92400E] dark:text-[#FCD34D]">Honest limits:</strong>{" "}
              this AI does not fix motion blur, defocus blur, or heavily damaged photos.
              For that, you need a dedicated deblurring model (coming to Pro tier).
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Free, no signup
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No upload
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                AI super-resolution
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Lossless PNG
              </span>
            </div>
          </div>

          {/* RIGHT: Trust card */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Why SammaPix vs upload-based tools
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#16A34A]" strokeWidth={1.5} />
                  <span>Your photos never leave your device. AI runs in the browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#8B5CF6]" strokeWidth={1.5} />
                  <span>WebGPU-accelerated on Chrome/Edge — 5-15s per photo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ImageIcon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#8B5CF6]" strokeWidth={1.5} />
                  <span>Built on Swin2SR, an open-source vision transformer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#F59E0B]" strokeWidth={1.5} />
                  <span>Unlimited use. No watermarks. No daily cap.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CLIENT (upload + processing + before/after)                 */}
      {/* ============================================================ */}
      <PhotoEnhanceClient />

      {/* ============================================================ */}
      {/*  HOW TO USE                                                  */}
      {/* ============================================================ */}
      <HowToUse steps={howToSteps} toolName="AI Photo Enhancer" />

      {/* ============================================================ */}
      {/*  USE CASES                                                   */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
          When to use AI photo enhancement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              📱 WhatsApp-compressed photos
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Photos sent over WhatsApp lose detail to aggressive compression. The
              enhancer rebuilds sharpness and removes blocky artifacts.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              🖼️ Old scanned photos
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Family photos scanned at low DPI come out grainy and soft. AI enhancement
              cleans up the grain and adds sharpness.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              💻 Low-res screenshots
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Screenshots used in blog posts or social cards look small and pixelated.
              Upscale 2x while staying sharp.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 border border-[#FECACA] dark:border-[#5B1F1F] bg-[#FEF2F2] dark:bg-[#2D1414] rounded-lg">
          <p className="text-sm font-semibold text-[#991B1B] dark:text-[#FCA5A5] mb-1.5">
            ❌ When NOT to use this tool
          </p>
          <ul className="text-xs text-[#7F1D1D] dark:text-[#FCA5A5] leading-relaxed space-y-1 list-disc pl-4">
            <li>
              <strong>Motion-blurred photos</strong> (someone or something moved while shooting) —
              needs DeblurGAN-class model.
            </li>
            <li>
              <strong>Defocus blur</strong> (out-of-focus subject) — same, requires dedicated model.
            </li>
            <li>
              <strong>Heavily damaged old photos</strong> (scratches, tears, severe fading) — needs
              CodeFormer or Bringing Old Photos Back to Life.
            </li>
            <li>
              <strong>Photos already sharp</strong> — output will look almost identical to input.
              The tool is for cleaning up <em>compression and grain</em>, not creative enhancement.
            </li>
          </ul>
          <p className="text-xs text-[#7F1D1D] dark:text-[#FCA5A5] mt-2 leading-relaxed">
            All of the above will be supported in a future <strong>Pro tier</strong> using
            specialized server-side models.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg"
            >
              <summary className="cursor-pointer p-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] rounded-lg">
                {f.question}
              </summary>
              <div className="px-4 pb-4 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RELATED                                                     */}
      {/* ============================================================ */}
      <RelatedTools toolId="photo-enhance" />
    </main>
  );
}
