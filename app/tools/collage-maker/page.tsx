import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, LayoutGrid, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import CollageMakerClient from "@/components/tools/CollageMakerClient";
import CollageMakerHeroDemo from "@/components/tools/CollageMakerHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/collage-maker`;

export const metadata: Metadata = {
  title: "Photo Collage Maker Online Free: No Upload",
  description:
    "Combine photos into a grid collage in your browser. Choose layout (2x2, 3x3…), gap, color. Download as JPG or PNG. No upload, no signup.",
  keywords: [
    "photo collage maker",
    "collage maker online",
    "image grid maker",
    "combine photos into one",
    "picture collage free",
    "photo grid online",
    "make a collage online free",
    "photo collage no upload",
    "grid photo collage",
    "image collage maker free",
    "combine images into collage",
    "free photo grid maker",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Photo Collage Maker Online Free — No Upload",
    description:
      "Combine 2-9 photos into a grid collage in your browser. Choose layout, gap and color. Download as JPG or PNG. 100% private.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Photo Collage Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Collage Maker Online Free — No Upload",
    description: "Combine photos into a grid. Choose layout, gap, color. No signup.",
  },
};

const features = [
  {
    icon: <LayoutGrid className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "8 grid layouts",
    description:
      "Pick from 8 presets that adapt to your photo count: 1×2, 2×1, 1×3, 3×1, 2×2, 2×3, 3×2, and 3×3. Compatible layouts appear automatically based on how many photos you have loaded.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All processing happens in your browser using the Canvas API. Your photos never reach a server and are never stored anywhere. Close the tab and they are gone.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Custom gap, color, format",
    description:
      "Adjust the gap between cells (0-40 px), pick a background color for the gaps, choose cover or contain fit mode for each cell, and export as JPG (smaller) or PNG (lossless) at 720, 1080, 1440 or 2048 px.",
  },
];

export default function CollageMakerPage() {
  return (
    <main>
      <MetaViewContent contentName="Photo Collage Maker" contentId="collage-maker" />

      {/* Hero split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#0EA5E915", border: "1px solid #0EA5E930" }}
                aria-hidden="true"
              >
                <LayoutGrid className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Photo Collage Maker. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Combine 2 to 9 photos into a grid collage.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs in your browser. Pick a layout, set gap and color, download as JPG or PNG.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                8 grid layouts
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Cover or contain fit
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                JPG or PNG export
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <CollageMakerHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <CollageMakerClient />

      {/* How to use */}
      <HowToUse
        toolName="Photo Collage Maker"
        steps={[
          {
            title: "Drop your photos",
            desc: "Drag and drop 2 to 9 JPG, PNG or WebP photos onto the upload area, or click to browse. You can add up to 20 photos at once for free.",
          },
          {
            title: "Choose a layout and settings",
            desc: "Select a grid layout (compatible layouts highlight automatically). Set the gap between photos, pick a background color and choose cover or contain fit mode.",
          },
          {
            title: "Create and download the collage",
            desc: "Click Create collage to generate a preview in your browser. Download the final collage as JPG or PNG at your chosen output size.",
          },
        ]}
        proTip={{
          text: "For a clean Instagram grid post, use a 3×3 layout at 3240 px or 1080 px with 0 gap and cover mode.",
          linkLabel: "Try Instagram Grid Splitter",
          linkHref: "/tools/instagram-grid-splitter",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why make your collage in the browser?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            When do you need a photo collage maker?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A photo collage is the fastest way to tell a visual story with multiple photos at once.
            Instagram before-and-after posts, travel memory grids, e-commerce product galleries,
            family albums and event recaps all benefit from having several images combined into a
            single clean file. Instead of sending eight separate photos to a client or uploading
            them one by one to a story, you send a single collage.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix Collage Maker runs entirely in your browser using the native Canvas API. No
            photo is ever uploaded to a server. You get a clean single-image download you can share
            anywhere instantly.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is the difference between cover and contain mode?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            In <strong>cover mode</strong> (the default) each photo is scaled and cropped to fill
            its cell completely. Every cell is the same size with no empty space. This looks clean
            and professional but may trim the edges of a portrait photo in a landscape cell.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            In <strong>contain mode</strong> the full photo is always visible inside its cell,
            padded with the background color on the shorter dimension. No cropping occurs. Use this
            when the subject is near the edge of the frame or when exact framing is more important
            than uniform coverage.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which output size should I choose?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            For social media sharing, 1080 px on the long side is a safe choice. Instagram accepts
            up to 1080 px wide. For print or high-quality digital use, choose 2048 px. For quick
            web previews or email attachments, 720 px keeps the file size small. The collage
            maintains the aspect ratio of the grid (for example a 2×2 layout is always square, a
            1×2 is always 2:1 landscape).
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How many photos can I combine?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            You can load up to 20 photos in the free tier (200 with Pro). The available grid
            layouts adapt to how many photos you have: with 4 photos the 2×2 layout unlocks, with
            9 photos the 3×3 is available. The tool uses the first N photos for the selected layout
            (where N = rows × columns). Any extras are ignored but can be swapped in by reordering
            your file list.
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After creating your collage, you may want to{" "}
            <Link href="/tools/instagram-grid-splitter" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              split it into an Instagram puzzle grid
            </Link>
            ,{" "}
            <Link href="/tools/add-border" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              add a border or frame
            </Link>
            , or{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop it to an exact aspect ratio
            </Link>
            {" "}before sharing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="collage-maker" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Make a Photo Collage Online for Free",
            description:
              "Combine 2-9 photos into a grid collage in your browser with SammaPix. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Photo Collage Maker",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Load your photos",
                text: "Drag and drop 2 to 9 JPG, PNG or WebP images onto the upload area. You can add up to 20 photos for free.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose a layout and settings",
                text: "Select a compatible grid layout. Set gap between photos, pick background color and choose cover or contain fit mode.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the collage",
                text: "Click Create collage. A preview appears instantly. Download as JPG or PNG at your chosen output size.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Photo Collage Maker",
                description:
                  "Combine 2-9 photos into a grid collage for free in your browser. 8 layouts, custom gap, color and fit mode. No upload, no signup.",
                url: TOOL_URL,
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
                  url: APP_URL,
                },
                featureList: [
                  "8 grid presets: 1×2, 2×1, 1×3, 3×1, 2×2, 2×3, 3×2, 3×3",
                  "Adjustable gap between cells (0-40 px)",
                  "Custom background / gap color with color picker",
                  "Cover mode: fills each cell, crops edges",
                  "Contain mode: full photo visible with letterbox padding",
                  "Output sizes: 720, 1080, 1440 or 2048 px on long side",
                  "Export as JPG (92% quality) or PNG (lossless)",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this photo collage maker free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. Combine up to 20 photos per session with no time limit.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my photos uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All processing is done in your browser using the native Canvas API. Your photos never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How many photos can I combine in a collage?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The available layouts support 2, 3, 4, 6 or 9 photos. You can load up to 20 photos in the free tier and the tool uses the right number for your chosen layout. With Pro you can load up to 200.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between cover and contain fit mode?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Cover mode fills each cell completely by cropping the photo edges if needed. Contain mode shows the full photo with padding (in the background color) on the shorter side so nothing is cropped.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What output size should I use for Instagram?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "1080 px is the standard for Instagram. A 2×2 grid at 1080 px produces a 1080×1080 square collage. A 1×2 produces a 1080×540 landscape. Use 2048 px for high-resolution print.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I choose JPG or PNG output?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. JPG at 92% quality gives a smaller file ideal for sharing. PNG is lossless and larger, best for printing or when you need the highest quality.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: APP_URL,
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
                    name: "Photo Collage Maker",
                    item: TOOL_URL,
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
