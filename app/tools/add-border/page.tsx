import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Frame, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AddBorderClient from "@/components/tools/AddBorderClient";
import AddBorderHeroDemo from "@/components/tools/AddBorderHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/add-border`;

export const metadata: Metadata = {
  title: "Add a Border to an Image Online Free: No Upload",
  description:
    "Add a colored border or frame to photos in your browser. Custom width, color picker, batch + ZIP. No upload, no signup. Files never leave your device.",
  keywords: [
    "add border to image",
    "add frame to photo",
    "image border online",
    "add white border to photo",
    "add black border to image",
    "polaroid border online",
    "add border no upload",
    "batch add border to images",
    "photo border free",
    "image frame online free",
    "add border to photo free",
    "picture border online",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Add a Border to an Image Online Free — No Upload",
    description:
      "Add a colored border or frame to photos in your browser. Custom width, batch + ZIP. 100% private — files never leave your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Add Border to Image Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add a Border to an Image Online Free — No Upload",
    description: "Custom border color and width. Batch + ZIP. No signup.",
  },
};

const features = [
  {
    icon: <Frame className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Custom color and width",
    description:
      "Choose any border color with the color picker or pick from presets (black, white, transparent). Set a uniform width from 1 to 200 px or use advanced per-side controls for asymmetric frames.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All processing happens in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Batch framing with ZIP",
    description:
      "Drop up to 20 images at once (free) or 200 on Pro. Apply the same border settings to all files in one click and download as a single ZIP archive.",
  },
];

export default function AddBorderPage() {
  return (
    <main>
      <MetaViewContent contentName="Add Border to Image" contentId="add-border" />

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
                <Frame className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Add a Border to an Image. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Add a border or frame to JPG, PNG, WebP or any image.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs in your browser. Choose color and width, batch up to 20 files, download as ZIP.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Custom color and width
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Per-side advanced mode
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch + ZIP download
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <AddBorderHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <AddBorderClient />

      {/* How to use */}
      <HowToUse
        toolName="Add Border to Image"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, WebP or any image files onto the upload area, or click to browse. You can add up to 20 files at once for free.",
          },
          {
            title: "Choose border color and width",
            desc: "Set border width with the slider (1-200 px). Pick a color preset (black, white, gray, transparent) or open the color picker for any hex color. Toggle advanced mode for per-side widths.",
          },
          {
            title: "Download bordered images",
            desc: "Click Add border to process all files at once. Download each image individually or grab all as a ZIP archive.",
          },
        ]}
        proTip={{
          text: "For a polaroid look, set bottom border wider than the others in advanced mode, use white color.",
          linkLabel: "Try Rotate Image",
          linkHref: "/tools/rotate-image",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why add borders in your browser?
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
            When do you need to add a border to an image?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Adding a border is one of the fastest ways to frame a photo for social media, print or
            e-commerce. A thin white border on Instagram creates visual separation between your photo
            and the platform&apos;s white background. A thick black border adds a fine-art feel to
            prints or portfolio presentations. A transparent border (PNG only) creates padding around
            a logo without changing the background color.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The classic polaroid effect — popular on TikTok and Instagram — uses a wide white bottom
            border and narrower sides. Enable per-side mode to replicate it: set bottom to 60 px,
            top/left/right to 20 px, color to white, mode to expand.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is the difference between expand and inset mode?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            In <strong>expand mode</strong> the canvas grows by the border width on each side. Your
            original image content is untouched and the output is larger than the input. This is the
            most common choice for adding a frame without cropping anything.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            In <strong>inset mode</strong> the output stays at the original dimensions. The border is
            drawn inside by scaling the image down to fit within the border area. Use this when you
            need to maintain exact pixel dimensions — for example when uploading to a platform that
            requires a fixed image size.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does adding a border reduce image quality?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            In expand mode no — the original pixels are not resampled, only padding is added. In inset
            mode the image is scaled down slightly, which involves a single resampling pass. SammaPix
            uses the browser Canvas API with bilinear interpolation and exports JPEG at 93% quality,
            which is visually lossless for most use cases. PNG and WebP output are always lossless.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What formats are supported?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Any format your browser can decode: JPG, PNG, WebP, GIF (first frame), BMP, AVIF on
            supported browsers. Output format matches input unless you choose a transparent border,
            which forces PNG output to preserve the alpha channel.
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After adding a border, you may want to{" "}
            <Link href="/tools/rotate-image" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              rotate the image to any custom angle
            </Link>
            ,{" "}
            <Link href="/tools/flip-image" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              flip it horizontally or vertically
            </Link>
            , or{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop it to an exact aspect ratio
            </Link>
            {" "}before sharing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="add-border" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add a Border to an Image Online for Free",
            description:
              "Add a colored border or frame to any photo in your browser with SammaPix. No upload required, batch processing available.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Add Border to Image",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your images",
                text: "Drag and drop JPG, PNG or WebP images onto the upload area. You can add up to 20 files at once for free.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose border color and width",
                text: "Set border width with the slider (1-200 px). Pick a color preset or use the color picker for any hex color.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the bordered images",
                text: "Click Add border to process all files. Download individually or as a ZIP archive. Files never leave your browser.",
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
                name: "SammaPix Add Border to Image",
                description:
                  "Add a colored border or frame to photos for free in your browser. Custom width, color picker, batch JPG/PNG/WebP. No upload, no signup required.",
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
                  "Custom border width from 1 to 200 px",
                  "Full color picker — any hex color + presets (black, white, transparent)",
                  "Per-side advanced mode for asymmetric frames (polaroid effect)",
                  "Expand mode — canvas grows, image untouched",
                  "Inset mode — maintains original image dimensions",
                  "Batch process up to 20 images at once (free) / 200 with Pro",
                  "Download all as ZIP archive",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this border tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can add borders to up to 20 images per batch with no time limit.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All processing is done in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I add a white border to a photo?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Drop your image, click the white preset square in the color section, set your desired width with the slider, then click Add border. The output has a clean white border around your photo.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I create a polaroid border effect?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Enable advanced per-side mode. Set top and left and right to around 20 px and bottom to 60-80 px. Choose white color and expand mode. The result is a classic polaroid frame.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between expand and inset mode?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Expand mode grows the canvas — your image stays the same size and the output is larger. Inset mode keeps the original dimensions — the border is drawn inside by scaling the image down slightly.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I add a transparent border to a PNG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Select the transparent preset in the color picker. The tool forces PNG output to preserve the alpha channel, adding invisible padding around your image.",
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
                    name: "Add Border to Image",
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
