import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, TrendingUp, Shield, FileImage, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const AvifToJpgClient = dynamic(() => import("@/components/tools/AvifToJpgClient"));

const TOOL_URL = `${APP_URL}/tools/avif-to-jpg`;

export const metadata: Metadata = {
  title: "AVIF to JPG Converter — Free, No Upload",
  description:
    "Convert AVIF to JPG instantly in your browser. Open any .avif file without software — free, private, no upload required. Batch up to 20 files with quality control.",
  keywords: [
    "avif to jpg",
    "avif to jpg converter",
    "convert avif to jpg",
    "open avif file",
    "avif converter free",
    "avif to jpeg",
    "how to open avif",
    "avif file won't open",
    "avif image converter",
    "batch avif to jpg",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "AVIF to JPG Converter — Free, No Upload",
    description:
      "Convert AVIF to JPG instantly in your browser. Batch up to 20 files, quality control, no signup, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AVIF to JPG Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVIF to JPG Converter — Free, No Upload",
    description: "Convert AVIF to JPG in your browser. Batch, private, no upload.",
  },
};

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Universal compatibility",
    description:
      "AVIF is the dominant web format in 2026 but many apps still can't open it — email clients, Lightroom legacy, older Windows tools. Converting to JPG makes your images work everywhere, instantly.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% private — no upload",
    description:
      "AVIF decoding uses the browser's built-in image engine. Your files never leave your device. No server, no cloud, no signup required.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch + quality control",
    description:
      "Convert up to 20 AVIF files at once. Quality slider 50-100%. Choose white or black background for AVIF images with transparency.",
  },
];

export default function AvifToJpgPage() {
  return (
    <main>
      <MetaViewContent contentName="AVIF to JPG Converter" contentId="avif-to-jpg" />

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <FileImage className="h-4 w-4" style={{ color: "#6366F1" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                AVIF to JPG. Open Any AVIF File
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Received an .avif file that won&apos;t open? Convert AVIF to JPG instantly in your browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No software to install</strong>,
              no upload, no signup. Works with any AVIF from Chrome, Edge, or modern websites.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch up to 20
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Quality control
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                ZIP download
              </span>
            </div>
          </div>

          {/* Right column: tool renders directly — no separate hero demo needed */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      {/* Tool */}
      <AvifToJpgClient />

      {/* How to use */}
      <HowToUse
        toolName="AVIF to JPG Converter"
        steps={[
          {
            title: "Drop your AVIF files",
            desc: "Drag and drop .avif files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Adjust quality and background",
            desc: "Choose JPG quality (50–100%) and background color (white or black) for AVIF images with transparency. JPG does not support transparency.",
          },
          {
            title: "Convert and download",
            desc: "Click Convert. Files are processed locally in your browser. Download individually or all as a ZIP.",
          },
        ]}
        proTip={{
          text: "AVIF is 40-50% smaller than JPG at the same quality. Keep images in AVIF for web — convert to JPG only for compatibility.",
          linkLabel: "Convert to WebP instead",
          linkHref: "/tools/webp",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert AVIF to JPG?
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
            Why can&apos;t I open my AVIF file?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            AVIF (AV1 Image File Format) became the dominant web image format around 2024-2025. Chrome,
            Edge, Firefox and Safari all serve and download AVIF images by default. But many desktop
            apps, email clients, and older operating systems still can&apos;t open .avif files — including
            Windows Photo Viewer on older Windows versions, Adobe Lightroom Classic (pre-2024), Microsoft
            Office, and most email clients.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Converting AVIF to JPG gives you maximum compatibility: every app, every device, every
            operating system can open a JPG. The tradeoff is file size — JPG is typically 40-50%
            larger than AVIF at the same visual quality — but for sharing and compatibility purposes
            that is usually acceptable.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does the AVIF to JPG conversion work?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Modern browsers (Chrome 85+, Firefox 93+, Safari 16+) include a native AVIF decoder.
            SammaPix uses your browser&apos;s built-in decoder to render the AVIF image onto an HTML
            Canvas element, then exports the canvas as a JPEG. The entire process happens locally
            — no file is ever sent to a server.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What about AVIF images with transparency?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            AVIF supports an alpha channel (transparency). JPG does not. When an AVIF with transparency
            is converted, transparent pixels are filled with a solid color. SammaPix lets you choose
            white (default, best for most images) or black background. If you need to preserve
            transparency, convert to{" "}
            <Link
              href="/tools/png-to-jpg"
              className="underline underline-offset-2 decoration-[#E5E5E5] hover:decoration-[#171717] dark:hover:decoration-[#E5E5E5]"
            >
              PNG instead
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedTools toolId="avif-to-jpg" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert AVIF to JPG",
            description:
              "Convert AVIF images to JPG format using SammaPix. Batch conversion up to 20 files at once, quality control, transparent background handling, all in your browser.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix AVIF to JPG Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your AVIF files",
                text: "Drag and drop .avif files onto the upload area. You can convert up to 20 AVIF files at once in a single batch.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Adjust quality and background",
                text: "Choose JPG quality between 50 and 100 percent. For AVIF files with transparency, pick white or black background — JPG does not support transparency.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Convert and download",
                text: "Click Convert. All processing happens locally in your browser using the built-in AVIF decoder. Download converted JPG files individually or all together as a ZIP archive.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQ + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix AVIF to JPG Converter",
                description:
                  "Convert AVIF images to JPG format directly in your browser. Batch processing up to 20 files, quality control, transparent background handling, no upload.",
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
                  "AVIF to JPG conversion",
                  "Batch processing up to 20 files",
                  "Quality control (50-100%)",
                  "Transparent background handling",
                  "ZIP download for batches",
                  "Client-side conversion — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this AVIF to JPG converter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free tier supports up to 20 files per batch. Pro users can process up to 200 files per batch.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my AVIF files uploaded to any server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix converts AVIF to JPG entirely in your browser using the browser's built-in AVIF decoder and the Canvas API. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why won't my AVIF file open?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "AVIF is a modern web image format (dominant since 2024-2025) that many desktop apps and email clients still cannot open, including older versions of Windows Photo Viewer, Adobe Lightroom Classic, Microsoft Office, and most email clients. Converting to JPG gives you universal compatibility.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens to AVIF images with transparency when converted to JPG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "JPG does not support transparency. When converting an AVIF with an alpha channel, transparent pixels are filled with a solid background color. SammaPix lets you choose white (default) or black. If you need to preserve transparency, convert to PNG instead.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I convert multiple AVIF files at once?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Free users can convert up to 20 AVIF files per batch. Pro users can convert up to 200 per batch. Results can be downloaded individually or all at once as a ZIP archive.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the JPG be larger than the original AVIF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Typically yes — JPG is 40-50% larger than AVIF at the same visual quality. AVIF uses the AV1 codec which is significantly more efficient. JPG conversion is done for compatibility, not to reduce file size.",
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
                    name: "AVIF to JPG Converter",
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
