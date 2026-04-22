import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Maximize2, Shield, FileImage } from "lucide-react";
import Link from "next/link";
import SvgToPngClient from "@/components/tools/SvgToPngClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/svg-to-png`;

export const metadata: Metadata = {
  title: "SVG to PNG Converter — Free, Browser-Based",
  description:
    "Convert SVG to PNG online free. Batch up to 20 files, any resolution (1x–4x or custom), transparent background, no signup, no upload. 100% in your browser.",
  keywords: [
    "svg to png",
    "svg to png converter",
    "convert svg to png",
    "svg to png online free",
    "batch svg to png",
    "svg to png high resolution",
    "svg to png transparent",
    "rasterize svg",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "SVG to PNG Converter — Free, Browser-Based",
    description:
      "Convert SVG to PNG online free. Any resolution, transparent background, batch — no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix SVG to PNG Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter — Free, Browser-Based",
    description: "Convert SVG to PNG at any resolution. Batch, no upload, privacy-first.",
  },
};

const features = [
  {
    icon: <Maximize2 className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Any resolution",
    description:
      "SVG is infinitely scalable — pick 1x, 2x, 3x, 4x of the intrinsic size, or set a custom width. Output up to 8192 px for print-ready PNGs.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "SVG rasterization happens locally via the Canvas API. Your files never leave your device — no upload, no tracking, full privacy.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Transparent or solid background",
    description:
      "PNG preserves full alpha transparency. Keep the SVG transparent or flatten onto white/black — ideal for app icons, favicons, avatars.",
  },
];

export default function SvgToPngPage() {
  return (
    <main>
      <MetaViewContent contentName="SVG to PNG Converter" contentId="svg-to-png" />
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#F9731615", border: "1px solid #F9731630" }}
            aria-hidden="true"
          >
            <FileImage
              className="h-4.5 w-4.5"
              style={{ color: "#F97316", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            SVG to PNG Converter
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix SVG to PNG Converter is a free online tool that rasterizes SVG vectors to PNG
          images at any resolution — up to 8192 px. Transparency preserved, batch up to 20 files,
          no upload to any server.
        </p>
      </div>

      {/* Tool */}
      <SvgToPngClient />

      {/* How to use */}
      <HowToUse
        toolName="SVG to PNG Converter"
        steps={[
          {
            title: "Drop your SVG files",
            desc: "Drag and drop .svg files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Choose output size and background",
            desc: "Pick 1x–4x scale (based on intrinsic SVG size) or enter a custom width. Keep transparent background or flatten to white/black.",
          },
          {
            title: "Convert and download",
            desc: "Click Convert. Rasterization runs locally in your browser. Download individually or all as a ZIP.",
          },
        ]}
        proTip={{
          text: "For app icons and favicons, 512 px is the standard starting size. Use our ICO generator for multi-size favicons.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert SVG to PNG?
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
            When should you convert SVG to PNG?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SVG is a vector format — mathematically defined curves that stay perfectly sharp at any
            zoom level. PNG is a raster format: a fixed grid of pixels. For icons, logos, and
            illustrations on the web, SVG is almost always the better choice: one file, any size,
            tiny bytes. Convert to PNG only when your target doesn&apos;t support SVG.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            You need PNG when: exporting app icons for iOS/Android (they require fixed sizes like
            1024&times;1024), creating favicons for older browsers, uploading to platforms that
            reject SVG (Instagram, some email clients, legacy CMS), embedding in documents
            (Word/PDF), or distributing artwork where you don&apos;t want the source geometry
            editable.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Is transparency preserved?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Yes. PNG supports full 8-bit alpha channel, so transparent regions in your SVG stay
            transparent in the PNG. If you need a solid color backdrop (white or black) for apps
            that don&apos;t handle alpha, pick one from the Background option.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What output size should I pick?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            For web use, stick to 1x or 2x unless you know the display is high-DPI. For app icons,
            standard sizes are 512 or 1024 px (square). For print, aim for 300 DPI — a 5-inch image
            needs 1500 px wide. Avoid upscaling far beyond what you actually need: PNG files grow
            quadratically with dimensions, and SVG already has the math to re-rasterize any time.
          </p>
        </div>
      </section>

      <RelatedTools toolId="svg-to-png" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert SVG to PNG",
            description:
              "Rasterize SVG vectors to PNG images at any resolution using SammaPix. Batch up to 20 files, transparency preserved, fully client-side.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix SVG to PNG Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your SVG files",
                text: "Drag and drop .svg files onto the upload area. Up to 20 SVG files per batch — 200 on the Pro plan.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose output size and background",
                text: "Pick 1x–4x scale based on the intrinsic SVG size, or enter a custom width. Choose transparent, white, or black background.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Convert and download",
                text: "Click Convert. Rasterization runs locally in your browser via the Canvas API. Download individual PNGs or all as a ZIP.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQ + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix SVG to PNG Converter",
                description:
                  "Rasterize SVG vectors to PNG images at any resolution directly in your browser. Batch up to 20 files, transparency preserved, no upload.",
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
                  "SVG to PNG conversion",
                  "Batch processing up to 20 files",
                  "1x / 2x / 3x / 4x scale presets",
                  "Custom output width up to 8192 px",
                  "Transparent, white, or black background",
                  "ZIP download for batches",
                  "Client-side conversion — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this SVG to PNG converter really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free tier supports up to 20 files per batch; Pro lifts it to 200.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my SVG files uploaded to any server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix rasterizes SVG to PNG entirely in your browser using the Canvas API. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is transparency preserved in the PNG output?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. PNG supports 8-bit alpha, so transparent areas in the SVG remain transparent in the PNG. You can also pick a white or black background to flatten transparency for apps that don't handle it.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What output resolution should I choose?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For web use, 1x or 2x the intrinsic SVG size is usually enough. For app icons, pick a custom width of 512 or 1024 px. For print, aim for 300 DPI — a 5-inch image needs 1500 px wide. Max output is 8192 px on either axis.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why is my PNG much larger than the SVG source?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Vector SVGs encode shapes as math — a 2 KB SVG can render at 4K resolution. PNG stores every pixel, so file size grows quadratically with dimensions. If size matters, keep the SVG for web, or pick a smaller output scale.",
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
                    name: "SVG to PNG Converter",
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
