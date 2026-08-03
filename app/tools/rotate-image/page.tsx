import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, RotateCw, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import RotateImageClient from "@/components/tools/RotateImageClient";
import RotateImageHeroDemo from "@/components/tools/RotateImageHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/rotate-image`;

export const metadata: Metadata = {
  title: "Rotate Image Online Free: No Upload, No Server",
  description:
    "Rotate images 90° CW, CCW, 180° or any custom angle — free, in your browser. Batch rotate JPG, PNG, WebP. No upload, no signup. Files never leave your device.",
  keywords: [
    "rotate image online",
    "rotate photo online free",
    "rotate picture",
    "rotate jpg online",
    "rotate png online",
    "turn image sideways",
    "rotate image no upload",
    "batch rotate images",
    "rotate image 90 degrees",
    "flip image online",
    "rotate image free",
    "rotate photo 180 degrees",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Rotate Image Online Free — No Upload",
    description:
      "Rotate photos 90°, 180° or any custom angle. Batch process JPG, PNG, WebP. 100% private — your files never leave your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Rotate Image Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image Online Free — No Upload",
    description: "Rotate photos 90°, 180° or any custom angle. Batch rotate, no signup.",
  },
};

const features = [
  {
    icon: <RotateCw className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "90°, 180° and custom angles",
    description:
      "One-click buttons for 90° CW, 90° CCW and 180°. A slider lets you apply any angle from -180° to +180° for creative corrections or perspective fixes.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All rotation happens directly in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Batch rotate with ZIP download",
    description:
      "Drop up to 20 images at once (free) or 200 on Pro. Download each rotated image individually or grab all as a single ZIP archive.",
  },
];

export default function RotateImagePage() {
  return (
    <main>
      <MetaViewContent contentName="Rotate Image" contentId="rotate-image" />

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
                <RotateCw className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Rotate Image Online. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Rotate JPG, PNG, WebP or any image by 90°, 180° or a custom angle.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs in your browser. Batch rotate up to 20 files and download as ZIP.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                90° CW / CCW / 180°
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Custom angle -180° to 180°
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
            <RotateImageHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <RotateImageClient />

      {/* How to use */}
      <HowToUse
        toolName="Rotate Image"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, WebP or any image files onto the upload area, or click to browse. You can add up to 20 files at once for free.",
          },
          {
            title: "Choose your rotation",
            desc: "Click 90° CW, 90° CCW, or 180° for the most common rotations. Use the custom angle slider for any angle from -180° to +180°. Choose transparent or white background for non-right-angle rotations.",
          },
          {
            title: "Download rotated images",
            desc: "Click Rotate to process all files at once. Download each image individually or grab all as a ZIP archive.",
          },
        ]}
        proTip={{
          text: "Need to crop after rotating? Use Crop to Ratio to trim the rotated image to an exact aspect ratio.",
          linkLabel: "Try Crop to Ratio",
          linkHref: "/tools/croproatio",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why rotate images in your browser?
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
            When do you need to rotate an image?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The most common scenario is a photo taken in portrait mode that appears sideways on a
            desktop or in a web app. This usually happens when the EXIF orientation tag is stripped
            by a CMS or image processing pipeline. Rotating the image 90° CW or CCW and
            re-downloading it corrects the issue permanently, regardless of how the app reads
            orientation metadata.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A 180° rotation is useful for upside-down scans or flipped product photos. The custom
            angle slider (-180° to +180°) is ideal for straightening a slightly tilted horizon in a
            landscape shot or correcting a scan that was placed at a slight angle on a flatbed
            scanner.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does rotating change image quality?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            For exact 90°, 180° and 270° rotations the image data is losslessly rearranged.
            SammaPix exports JPEG at quality 93%, which is visually lossless for a single rotation
            pass. PNG and WebP are always lossless. For custom angles (e.g. 5°) the image is
            resampled using the browser&apos;s canvas renderer, which applies bilinear interpolation.
            The result is a clean anti-aliased image, but pixels are interpolated — not a
            mathematically lossless operation.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What formats are supported?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Any image format your browser can decode: JPG, PNG, WebP, GIF (first frame), BMP, AVIF
            on supported browsers. The output format matches the input. Exception: custom angles on
            JPEG with transparent background are saved as PNG to preserve the alpha channel.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What happens to the transparent corners on custom angles?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            When you rotate by a non-right-angle (e.g. 15°), the rotated image does not fill the
            rectangular bounding box completely — corners are empty. You can choose
            transparent fill (saves as PNG) or white fill (compatible with JPEG). Transparent is
            ideal for layered work in design tools; white is better for email or web where JPEG
            is required.
          </p>
        </div>
      </section>

      {/* Internal links to related tools */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After rotating, you may want to{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop the image to an exact ratio
            </Link>
            ,{" "}
            <Link href="/tools/resizepack" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              resize it for social media
            </Link>
            , or{" "}
            <Link href="/tools/compress" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              compress it to reduce file size
            </Link>
            {" "}before sharing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="rotate-image" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Rotate an Image Online for Free",
            description:
              "Rotate a photo or image by 90°, 180° or any custom angle directly in your browser with SammaPix. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Rotate Image",
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
                name: "Choose your rotation angle",
                text: "Click 90° CW, 90° CCW, or 180° for standard rotations. Use the slider for any custom angle from -180° to +180°.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the rotated images",
                text: "Click Rotate to process all files. Download individually or as a ZIP archive. Files never leave your browser.",
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
                name: "SammaPix Rotate Image",
                description:
                  "Rotate images 90°, 180° or any custom angle for free in your browser. Batch rotate JPG, PNG and WebP. No upload, no signup required.",
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
                  "90° CW, 90° CCW and 180° one-click rotation",
                  "Custom angle slider from -180° to +180°",
                  "Batch rotate up to 20 images at once (free)",
                  "Download all as ZIP archive",
                  "Transparent or white fill for custom angles",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this image rotator free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can rotate up to 20 images per batch with no time limit.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All rotation is done in your browser using the native Canvas API. Your images never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does rotating an image reduce quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For exact 90°, 180° and 270° rotations, SammaPix exports JPEG at quality 93% which is visually lossless. PNG and WebP are always lossless. Custom angles (e.g. 15°) use bilinear interpolation which slightly softens edges — this is unavoidable with pixel-based rotation.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What image formats can I rotate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Any format your browser supports: JPG, PNG, WebP, GIF (first frame), BMP, AVIF. Output format matches the input, except custom angles with transparent background on JPEG which output as PNG.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I rotate multiple images at once?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Drop up to 20 images at once on the free plan, or up to 200 with a Pro subscription. All images are rotated by the same angle and can be downloaded as a ZIP.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens to transparent corners when rotating at a custom angle?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "When rotating by a non-right-angle (e.g. 15°), the rotated image doesn't fill the full rectangular canvas. You can choose transparent fill (outputs as PNG) or white fill (compatible with JPEG). Transparent is best for design work; white is better for email or web use.",
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
                    name: "Rotate Image",
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
