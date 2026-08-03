import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Circle, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import RoundImageClient from "@/components/tools/RoundImageClient";
import RoundImageHeroDemo from "@/components/tools/RoundImageHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/round-image`;

export const metadata: Metadata = {
  title: "Round Image Online Free: Circle Crop, No Upload",
  description:
    "Make images circular or add rounded corners. Transparent PNG output. Batch + ZIP. 100% client-side — files never leave your device. No signup.",
  keywords: [
    "round image",
    "circle crop image",
    "crop image into circle",
    "round profile picture",
    "rounded corners image",
    "circle avatar maker",
    "transparent png circle",
    "round image online free",
    "no upload circle crop",
    "make image round",
    "circular image online",
    "round corners photo free",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Round Image Online Free: Circle Crop, No Upload",
    description:
      "Circle crop or rounded corners with transparent PNG output. Batch + ZIP. 100% private — files never leave your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Round Image Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Round Image Online Free: Circle Crop, No Upload",
    description: "Circle crop or rounded corners. Transparent PNG. Batch + ZIP. No signup.",
  },
};

const features = [
  {
    icon: <Circle className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Circle and rounded corners",
    description:
      "Choose between a perfect circle (cropped from the center on the shortest side) or rounded corners with a custom radius from 4 to 400 px. Both modes output a transparent PNG so the background stays invisible on any surface.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All processing runs in your browser using the native Canvas API and a clip path. Your images never leave your device and are never stored on any server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Batch with ZIP download",
    description:
      "Drop up to 20 images at once (free) or 200 on Pro. Apply the same shape to every file in one click and download a ZIP archive with all rounded PNGs.",
  },
];

export default function RoundImagePage() {
  return (
    <main>
      <MetaViewContent contentName="Round Image" contentId="round-image" />

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
                <Circle className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Round Image Online — Circle Crop or Rounded Corners, Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Make any image circular or add rounded corners with a transparent background.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs in your browser. Batch up to 20 files, download as PNG or ZIP.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Circle or rounded corners
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Transparent PNG output
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
            <RoundImageHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <RoundImageClient />

      {/* How to use */}
      <HowToUse
        toolName="Round Image"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, WebP or any image files onto the upload area, or click to browse. You can add up to 20 files at once for free.",
          },
          {
            title: "Choose shape and settings",
            desc: "Pick Circle for a perfect circular crop centered on the image, or Rounded corners and set the corner radius with the slider (4–400 px).",
          },
          {
            title: "Download rounded images",
            desc: "Click Round images to process all files. Download each PNG individually or grab all as a ZIP archive. Transparent backgrounds included.",
          },
        ]}
        proTip={{
          text: "For profile pictures: use Circle mode. For cards and thumbnails: try Rounded corners at 32–80 px for a modern, clean look.",
          linkLabel: "Try Add Border",
          linkHref: "/tools/add-border",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why round images in your browser?
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
            When do you need to round an image?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Circular profile pictures are the standard on every social platform — LinkedIn, Twitter, Instagram, Slack, Discord and most CMS editors all display avatars in a circle. Preparing your photo as a circle before upload ensures it is cropped exactly the way you want it rather than relying on the platform&apos;s auto-crop.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Rounded corners give product thumbnails, blog headers and UI mockups a polished, modern feel. A 16–24 px radius matches typical CSS <code className="text-[11px] bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded">border-radius</code> values for cards; a 48–80 px radius creates pill-shaped badges.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What does &quot;transparent background&quot; mean?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A PNG with transparency stores an alpha channel alongside the color data. The area outside the circle or rounded rectangle has an alpha value of 0 (fully transparent) instead of a white or black fill. When you place a transparent PNG on a colored background — a website, a presentation, a social post — the background shows through the corners, making the image look like it belongs on the page rather than sitting in a white box.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does the circle crop work?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The tool draws a circle with a diameter equal to the shortest side of your image and centered on the canvas. Pixels inside the circle are kept; everything outside is made transparent. The output canvas keeps the original image dimensions — no cropping or scaling occurs — so a 1200×900 image produces a 1200×900 PNG with a 900 px diameter circle in the center and transparent corners.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Can I set the corner radius in percent?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            The slider works in pixels and the radius is capped at half the shortest side of each image. For an effect equivalent to CSS <code className="text-[11px] bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded">border-radius: 50%</code> (a circle), use Circle mode instead of Rounded corners with a very large radius. This avoids the elliptical distortion that can occur when a large px radius is applied to a non-square image.
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After rounding your image, you may want to{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop it to an exact aspect ratio first
            </Link>
            ,{" "}
            <Link href="/tools/add-border" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              add a colored border or frame
            </Link>
            , or{" "}
            <Link href="/tools/remove-bg" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              remove the background entirely
            </Link>{" "}
            before placing it on a design.
          </p>
        </div>
      </section>

      <RelatedTools toolId="round-image" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Round an Image Online for Free",
            description:
              "Make any image circular or add rounded corners with a transparent PNG background using SammaPix. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Round Image",
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
                name: "Choose shape and settings",
                text: "Select Circle for a perfect circular crop or Rounded corners and adjust the corner radius with the slider.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download transparent PNG",
                text: "Click Round images to process all files. Download each PNG individually or grab all as a ZIP archive. Files never leave your browser.",
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
                name: "SammaPix Round Image",
                description:
                  "Make images circular or add rounded corners for free in your browser. Transparent PNG output, batch + ZIP. No upload, no signup required.",
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
                  "Circle crop from center using shortest side as diameter",
                  "Rounded corners with custom radius (4–400 px)",
                  "Transparent PNG output — alpha channel preserved",
                  "Canvas API — 100% client-side, no upload",
                  "Batch process up to 20 images at once (free) / 200 with Pro",
                  "Download all as ZIP archive",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this round image tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can round up to 20 images per batch with no time limit.",
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
                    name: "How do I crop an image into a circle?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Drop your image, select Circle mode, then click Round images. The tool draws a circle centered on the image using the shortest side as the diameter and exports a transparent PNG.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why is the output always PNG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "PNG supports an alpha channel (transparency). JPG does not. The area outside the circle or rounded rectangle must be transparent so it does not appear as a white or black fill on any background.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What corner radius should I use for a profile picture?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For a standard circular profile picture, use Circle mode. For rounded avatars with a slight curve, try a radius of 24–48 px. The exact value depends on your image dimensions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I round multiple images at the same time?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Drop up to 20 images at once on the free plan (200 on Pro). All files are processed with the same shape settings and can be downloaded as individual PNGs or as a single ZIP archive.",
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
                    name: "Round Image",
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
