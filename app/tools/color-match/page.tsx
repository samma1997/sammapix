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
import ColorMatchClient from "@/components/tools/ColorMatchClient";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "AI Color Match Free — Apply 1 Look to 50 Photos at Once",
  description:
    "Drop one reference photo + 50 target photos. The AI copies the reference's colors and tone to every photo in seconds. 100% browser-based, no upload, no signup. Perfect for wedding photographers, event shoots and Instagram feeds.",
  keywords: [
    "ai color match",
    "color transfer photos",
    "batch color grading",
    "match colors across photos",
    "consistent color grading",
    "free color match online",
    "photographer color consistency",
    "wedding photo color match",
    "instagram feed color match",
    "lightroom alternative free",
    "reinhard color transfer online",
    "copy color from one photo to another",
    "batch photo color correction",
  ],
  alternates: { canonical: `${APP_URL}/tools/color-match` },
  openGraph: {
    title: "AI Color Match Free — Apply 1 Look to 50 Photos at Once",
    description:
      "Match the color and tone of one reference photo across 50 photos in seconds. Browser-based, free, no signup.",
    url: `${APP_URL}/tools/color-match`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Color Match Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Color Match Free — Apply 1 Look to 50 Photos at Once",
    description:
      "Drop 1 reference + 50 photos. Browser-based color matching in seconds.",
  },
};

const faqs = [
  {
    question: "How does color matching actually work?",
    answer:
      "SammaPix uses Reinhard color transfer — a peer-reviewed algorithm published in 2001 that matches the statistical color distribution (mean and standard deviation) of one image to another in Lab color space. It runs in milliseconds per photo, entirely in your browser, with deterministic results. No AI model, no cloud, no upload.",
  },
  {
    question: "Will it preserve my photo's subject and composition?",
    answer:
      "Yes. Unlike neural style transfer (which can hallucinate new content), Reinhard color transfer only shifts the tonal distribution — the subject, edges, and structure are 100% preserved. The intensity slider lets you blend between the original and the fully-matched result.",
  },
  {
    question: "Is it really free? Any signup needed?",
    answer:
      "Yes, 100% free with no signup, no watermark, no upload. The math runs entirely in your browser. Free batch: up to 50 photos per session. Pro: 300 per session.",
  },
  {
    question: "When does this work better than Lightroom presets?",
    answer:
      "When you have one photo from a shoot with the perfect light/look and want every other photo in the batch to match it — without having to copy/paste settings one by one, or share a preset file. Drop the reference, drop the batch, get the same look across all of them.",
  },
  {
    question: "Will it work on photos with very different content?",
    answer:
      "Color transfer works best when target and reference have a similar color theme (e.g. all outdoor, or all indoor, or all sunset). Matching a sunset to a snowy mountain will give weird results. Lower the intensity slider (e.g. 40-60%) to blend with the original colors.",
  },
  {
    question: "What format is the output?",
    answer:
      "Output matches the input format: JPEG for JPG/WebP inputs, PNG for PNG inputs. Resolution is preserved at 100%. Download individually or as a single ZIP.",
  },
];

const howToSteps = [
  {
    title: "Drop a reference photo",
    desc: "On the left — pick one photo whose color and tone you want to use as the target.",
  },
  {
    title: "Drop the batch",
    desc: "On the right — drop up to 50 photos that should inherit the reference's look.",
  },
  {
    title: "Click Match",
    desc: "All photos are processed in seconds (no upload, no AI model download). Download as ZIP.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SammaPix AI Color Match",
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Any",
  url: `${APP_URL}/tools/color-match`,
  description:
    "Free browser-based color match. Copy the color profile of one reference photo to a batch of 50 photos in seconds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Batch color transfer (up to 50 photos)",
    "Reinhard color transfer in Lab color space",
    "100% browser-based (no upload)",
    "Intensity slider for partial matching",
    "Download as ZIP",
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
  name: "How to color-match a batch of photos to a reference",
  step: howToSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.desc,
  })),
};

export default function ColorMatchPage() {
  return (
    <main>
      <MetaViewContent contentName="Color Match" contentId="color-match" />
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

      {/* HERO */}
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
                  backgroundColor: "#F59E0B15",
                  border: "1px solid #F59E0B30",
                }}
                aria-hidden="true"
              >
                <Sparkles
                  className="h-[18px] w-[18px]"
                  style={{ color: "#F59E0B" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                AI Color Match. One Look. 50 Photos. Seconds.
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Drop one reference photo with the look you love, then drop 50 photos
              from your shoot. The color, tone and mood of the reference are applied
              to every single one in seconds. Wedding shoots, Instagram feeds,
              event photography — all with one consistent look.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Up to 50 photos (300 Pro)
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Milliseconds per photo
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Browser-based, no upload
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Download as ZIP
              </span>
            </div>
          </div>

          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Why this beats Lightroom presets
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <li className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#F59E0B]" strokeWidth={1.5} />
                  <span>No preset file to make — just point at the photo with the look you want.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#F59E0B]" strokeWidth={1.5} />
                  <span>Adapts per-photo. Each photo is matched on its own statistics, not a one-size-fits-all preset.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#16A34A]" strokeWidth={1.5} />
                  <span>Photos never leave your device. Zero upload, zero cloud.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ImageIcon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#F59E0B]" strokeWidth={1.5} />
                  <span>Reinhard color transfer (peer-reviewed, deterministic, instant).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ColorMatchClient />

      <HowToUse steps={howToSteps} toolName="AI Color Match" />

      {/* USE CASES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
          Built for batch shoots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              💍 Wedding & event photography
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              8-hour shoot, light changes constantly. Pick the one photo with perfect
              colors, match all 500 in one batch.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              📱 Instagram feed consistency
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Build a cohesive feed: pick the look of your best post, match all the
              others before posting.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              🛒 E-commerce product photography
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Pick the cleanest white-balanced product shot, match all the others for
              consistent listings.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      <RelatedTools toolId="color-match" />
    </main>
  );
}
