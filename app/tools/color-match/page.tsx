import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ColorMatchClient from "@/components/tools/ColorMatchClient";
import ColorMatchHeroDemo from "@/components/tools/ColorMatchHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Free LUT Generator — Extract LUT from Photo & Apply to Batch (.cube)",
  description:
    "Drop one reference photo. SammaPix extracts a real 3D LUT (33x33x33) from its color profile, applies it to a batch of 50 photos, and exports the LUT as a standard .cube file for Lightroom, Premiere or DaVinci. Free, browser-based, no upload, no signup.",
  keywords: [
    "free lut generator",
    "extract lut from photo",
    "convert photo to lut",
    "create lut from image",
    "lut from reference photo",
    "free 3d lut creator",
    "cube file generator",
    "lightroom lut from photo",
    "premiere lut from photo",
    "davinci resolve lut generator",
    "ai color match batch",
    "consistent color grading photographer",
    "batch lut apply photos",
    "wedding photo lut match",
    "instagram feed lut",
  ],
  alternates: { canonical: `${APP_URL}/tools/color-match` },
  openGraph: {
    title: "Free LUT Generator — Extract LUT from Photo & Apply to Batch (.cube)",
    description:
      "Drop a reference photo. We extract a 3D LUT and apply it to 50 photos. Export as .cube for Lightroom/Premiere/DaVinci. Free, browser-based, no upload.",
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
    title: "Free LUT Generator — Extract LUT from Photo & Apply to Batch",
    description:
      "Drop a reference photo, generate a 3D LUT, apply to 50 photos, export as .cube. Browser-based.",
  },
};

const faqs = [
  {
    question: "How does extracting a LUT from one photo actually work?",
    answer:
      "We sample 3000 colors from your reference image, then build a 17×17×17 3D LUT (4913 grid points) where each grid point is the weighted average of the 24 nearest reference colors. The result is a real 3D LUT that, when applied to any photo, pulls its colors toward the reference's palette. We then smooth the LUT with a 3D box blur to remove noise and apply trilinear interpolation when running it on your photos — same math the pros use.",
  },
  {
    question: "Can I export the LUT to use in Lightroom or Premiere?",
    answer:
      "Yes. Once the LUT is generated, click 'Download .cube' on the reference card. The file follows the standard Adobe .cube spec (LUT_3D_SIZE 17, domain 0-1) and works in Lightroom, Premiere, DaVinci Resolve, Photoshop, Final Cut Pro, FFmpeg, OBS, and basically every color-grading tool. No upload to our servers — the file is generated locally in your browser.",
  },
  {
    question: "Will my photo's subject and composition be preserved?",
    answer:
      "100%. The LUT only remaps colors point-by-point in the RGB cube — it never touches structure, edges, or composition. Unlike neural style transfer (which hallucinates content), a 3D LUT is a deterministic color mapping. The intensity slider blends the LUT output with the original.",
  },
  {
    question: "Is it really free? Any signup needed?",
    answer:
      "Yes, 100% free with no signup, no watermark, no upload. The LUT generation + batch apply run entirely in your browser. Free batch: up to 50 photos per session. Pro: 300 per session.",
  },
  {
    question: "When does the LUT generator work best?",
    answer:
      "When you want to transfer a 'look' — color palette, mood, tonality — from one photo to many. Best results when reference and target have a similar content type (all outdoor, all food, all portraits). Lowering the intensity slider (40-60%) gives a softer blend if reference and target are very different.",
  },
  {
    question: "How does this differ from a Lightroom preset?",
    answer:
      "A Lightroom preset is a set of slider values (exposure, vibrance, etc.). A 3D LUT is a direct color-to-color mapping — it doesn't care about your photo's exposure or histogram, it just remaps every input color to an output color. LUTs are more universal (they work on any photo, any software) but less surgical than presets. Many pros use both.",
  },
  {
    question: "What format is the output for the batch photos?",
    answer:
      "Output matches the input format: JPEG for JPG/WebP, PNG for PNG. Full resolution preserved. Download individually or as a single ZIP.",
  },
];

const howToSteps = [
  {
    title: "Drop a reference photo",
    desc: "We extract a 3D LUT from it in 2-3 seconds. The LUT is ready to download as .cube or apply to other photos.",
  },
  {
    title: "Drop the batch",
    desc: "Up to 50 photos. They all inherit the reference's color profile via trilinear LUT interpolation.",
  },
  {
    title: "Click Match (and/or Download .cube)",
    desc: "Get the batch as ZIP, or download the standalone .cube file to use the LUT in Lightroom, Premiere or DaVinci.",
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
    "Extract 3D LUT from a single reference photo",
    "Export as standard .cube (Lightroom/Premiere/DaVinci)",
    "Apply LUT to batch of 50 photos in browser",
    "Trilinear interpolation, 17x17x17 grid",
    "100% browser-based, no upload",
    "Intensity slider for partial matching",
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
                Free LUT Generator. Extract a 3D LUT From Any Photo
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Drop one reference photo with the look you love. We build a real
              3D LUT (17³ trilinear) from its color profile, apply it to a batch
              of 50 photos, and let you export the LUT as a standard <code className="text-[#F59E0B] font-mono text-sm">.cube</code> file
              for Lightroom, Premiere, DaVinci Resolve or Photoshop. Browser-based,
              free, no upload, no signup.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Real 3D LUT (trilinear interp.)
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Export .cube for Lightroom/Premiere
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Up to 50 photos (300 Pro)
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Browser-based, no upload
              </span>
            </div>
          </div>

          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <ColorMatchHeroDemo />
          </div>
        </div>
      </section>

      <ColorMatchClient />

      <HowToUse steps={howToSteps} toolName="AI Color Match" />

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
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
