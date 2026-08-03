import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FlipHorizontal, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FlipImageClient from "@/components/tools/FlipImageClient";
import FlipImageHeroDemo from "@/components/tools/FlipImageHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/flip-image`;

export const metadata: Metadata = {
  title: "Flip Image Online Free: Mirror Photos, No Upload",
  description:
    "Mirror photos horizontally or vertically for free in your browser. Batch flip JPG, PNG, WebP. No upload, no signup. Files never leave your device.",
  keywords: [
    "flip image online",
    "mirror image online",
    "flip photo horizontal",
    "flip photo vertical",
    "mirror picture online",
    "flip image no upload",
    "batch flip images",
    "flip image free",
    "mirror photo online free",
    "flip image horizontally",
    "flip image vertically",
    "mirror photo free",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Flip Image Online Free — Mirror Photos, No Upload",
    description:
      "Mirror photos horizontally or vertically. Batch flip JPG, PNG, WebP. 100% private — your files never leave your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Flip Image Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flip Image Online Free — Mirror Photos, No Upload",
    description: "Mirror photos horizontally or vertically. Batch flip, no signup.",
  },
};

const features = [
  {
    icon: <FlipHorizontal className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Horizontal and vertical flip",
    description:
      "One click to mirror left-right (horizontal) or top-bottom (vertical). You can also apply both at once for a 180° point reflection. Perfect for selfies, watermarks and layout corrections.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All flipping happens directly in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Batch flip with ZIP download",
    description:
      "Drop up to 20 images at once (free) or 200 on Pro. Download each flipped image individually or grab all as a single ZIP archive. Original format is always preserved.",
  },
];

export default function FlipImagePage() {
  return (
    <main>
      <MetaViewContent contentName="Flip Image" contentId="flip-image" />

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
                <FlipHorizontal className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Flip Image Online. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Mirror JPG, PNG, WebP or any image horizontally or vertically.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs in your browser. Batch flip up to 20 files and download as ZIP.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Flip Horizontal (mirror left-right)
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Flip Vertical (mirror top-bottom)
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
            <FlipImageHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <FlipImageClient />

      {/* How to use */}
      <HowToUse
        toolName="Flip Image"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, WebP or any image files onto the upload area, or click to browse. You can add up to 20 files at once for free.",
          },
          {
            title: "Choose flip direction",
            desc: "Click Flip Horizontal to mirror left-right, Flip Vertical to mirror top-bottom, or enable both at once for a combined flip. The toggle highlights in blue when active.",
          },
          {
            title: "Download flipped images",
            desc: "Click Flip to process all files at once. Download each image individually or grab all as a ZIP archive.",
          },
        ]}
        proTip={{
          text: "Need to rotate after flipping? Use Rotate Image to apply any angle from -180° to +180°.",
          linkLabel: "Try Rotate Image",
          linkHref: "/tools/rotate-image",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why flip images in your browser?
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
            When do you need to flip an image?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The most common use case is correcting a selfie or front-camera photo that appears
            mirrored. Front-facing cameras record a mirror image of reality by default, so text and
            logos appear reversed. Flipping horizontally restores the natural orientation seen by
            other people.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A vertical flip is useful for upside-down scans, product photos that need a top-bottom
            correction, or creative layout work where a mirrored version of an image is placed
            beside the original. Combining horizontal and vertical flip produces the same result as
            a 180° rotation — useful as a quick alternative.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does flipping change image quality?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            No. A mirror flip is a lossless geometric transformation — pixel positions are rearranged
            without any interpolation. SammaPix exports JPEG at quality 93%, which is visually
            lossless for a single flip pass. PNG and WebP are always lossless. The file size of the
            output is essentially identical to the input.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What formats are supported?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Any image format your browser can decode: JPG, PNG, WebP, GIF (first frame), BMP, AVIF
            on supported browsers. The output format always matches the input format — JPG stays JPG,
            PNG stays PNG, WebP stays WebP.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is the difference between flip and rotate?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            A flip (mirror) reflects the image along an axis — horizontal flip swaps left and right,
            vertical flip swaps top and bottom. A rotation spins the image around its center by a
            given angle. They are related: flipping both axes gives the same result as rotating 180°,
            but a single flip cannot be replicated by rotation alone.
          </p>
        </div>
      </section>

      {/* Internal links to related tools */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After flipping, you may want to{" "}
            <Link href="/tools/rotate-image" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              rotate the image to any custom angle
            </Link>
            ,{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop it to an exact aspect ratio
            </Link>
            , or{" "}
            <Link href="/tools/resizepack" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              resize it for social media
            </Link>
            {" "}before sharing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="flip-image" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Flip an Image Online for Free",
            description:
              "Mirror a photo horizontally or vertically in your browser with SammaPix. No upload required, batch processing available.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Flip Image",
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
                name: "Choose flip direction",
                text: "Click Flip Horizontal to mirror left-right, Flip Vertical to mirror top-bottom, or enable both at once.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the flipped images",
                text: "Click Flip to process all files. Download individually or as a ZIP archive. Files never leave your browser.",
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
                name: "SammaPix Flip Image",
                description:
                  "Mirror photos horizontally or vertically for free in your browser. Batch flip JPG, PNG and WebP. No upload, no signup required.",
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
                  "Flip Horizontal — mirror image left to right",
                  "Flip Vertical — mirror image top to bottom",
                  "Apply both flips simultaneously",
                  "Batch flip up to 20 images at once (free)",
                  "Download all as ZIP archive",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this image flipper free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can flip up to 20 images per batch with no time limit.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All flipping is done in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does flipping an image reduce quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. A mirror flip is a lossless geometric operation. Pixels are rearranged without interpolation. SammaPix exports JPEG at quality 93% which is visually lossless. PNG and WebP are always lossless.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What image formats can I flip?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Any format your browser supports: JPG, PNG, WebP, GIF (first frame), BMP, AVIF. Output format always matches the input.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I flip multiple images at once?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Drop up to 20 images at once on the free plan, or up to 200 with a Pro subscription. All images are flipped with the same settings and can be downloaded as a ZIP.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between flip horizontal and flip vertical?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Flip Horizontal mirrors the image left-to-right (like holding it in front of a mirror). Flip Vertical mirrors it top-to-bottom (like flipping a pancake). You can apply both simultaneously for a combined effect equal to a 180° rotation.",
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
                    name: "Flip Image",
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
