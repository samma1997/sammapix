import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Shield, Layers, FileImage } from "lucide-react";
import Link from "next/link";
import WebpToPngClient from "@/components/tools/WebpToPngClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/webp-to-png`;

export const metadata: Metadata = {
  title: "WebP to PNG Converter — Preserves Transparency, Free",
  description:
    "Convert WebP to PNG online free. Lossless conversion, transparency preserved, batch up to 20 files, no signup, no upload. Perfect for stickers, logos, and transparent graphics.",
  keywords: [
    "webp to png",
    "webp to png converter",
    "convert webp to png",
    "webp to png online free",
    "webp to png transparent",
    "webp png lossless",
    "free webp to png",
    "batch webp to png",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "WebP to PNG Converter — Preserves Transparency, Free",
    description:
      "Convert WebP to PNG online free. Lossless, transparency preserved, batch up to 20 files.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix WebP to PNG Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to PNG Converter — Preserves Transparency, Free",
    description: "Convert WebP to PNG — lossless, transparency preserved, no upload.",
  },
};

const features = [
  {
    icon: <Layers className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Transparency preserved",
    description:
      "PNG supports alpha channel natively. Your transparent WebP stickers, logos, and graphics convert without flattening — pixel-perfect.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Lossless + browser-based",
    description:
      "PNG is a lossless format — no quality loss vs the WebP source. Conversion happens in your browser via Canvas API. Files never leave your device.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Universal compatibility",
    description:
      "Every app, OS and browser opens PNG. Convert when you need to share transparent images with software that doesn't support WebP (legacy Photoshop, some CMS, email clients).",
  },
];

export default function WebpToPngPage() {
  return (
    <main>
      <MetaViewContent contentName="WebP to PNG Converter" contentId="webp-to-png" />
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
            style={{ backgroundColor: "#8B5CF615", border: "1px solid #8B5CF630" }}
            aria-hidden="true"
          >
            <Layers
              className="h-4.5 w-4.5"
              style={{ color: "#8B5CF6", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            WebP to PNG Converter
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix WebP to PNG Converter is a free online tool that converts WebP images to PNG
          format while preserving transparency and quality. Lossless conversion in your browser —
          no upload to any server, no signup, no file limits per day.
        </p>
      </div>

      {/* Tool */}
      <WebpToPngClient />

      {/* How to use */}
      <HowToUse
        toolName="WebP to PNG Converter"
        steps={[
          {
            title: "Drop your WebP files",
            desc: "Drag and drop WebP files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Conversion starts automatically",
            desc: "PNG is lossless, no quality settings needed. Transparency is preserved exactly as in the source WebP.",
          },
          {
            title: "Download PNG files",
            desc: "Download individually or all as a ZIP. Files are ready to use in any app, OS or editing software.",
          },
        ]}
        proTip={{
          text: "If you don't need transparency and want the smallest file size, convert to JPG instead — 70-80% smaller.",
          linkLabel: "WebP to JPG",
          linkHref: "/tools/webp-to-jpg",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert WebP to PNG?
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
            When should you convert WebP to PNG?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Convert WebP to PNG when you need to preserve transparency and maximize compatibility.
            PNG is universally supported — every operating system, every image editor, every web
            platform accepts PNG files without issue. WebP, while more efficient, still has
            compatibility gaps with older software and some niche applications.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Typical use cases: you saved a transparent sticker or logo as WebP and need to embed
            it in a document that doesn&apos;t support WebP, you&apos;re sharing transparent
            graphics with a designer who uses legacy Photoshop, or you need to upload to a CMS
            that only accepts PNG/JPG.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Will the PNG be larger than the WebP?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Yes — PNG is typically 30-50% larger than WebP because PNG is lossless and uses less
            aggressive compression. This is the tradeoff for universal compatibility and alpha
            preservation. If size matters and you don&apos;t need transparency, convert to{" "}
            <Link href="/tools/webp-to-jpg" className="underline underline-offset-2 decoration-[#E5E5E5] hover:decoration-[#171717] dark:hover:decoration-[#E5E5E5]">
              JPG instead
            </Link>{" "}
            (70-80% smaller but no transparency).
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does WebP to PNG conversion lose quality?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No. PNG is a lossless format, so the PNG output contains exactly the same pixel data
            as the source WebP. You won&apos;t see any degradation. Note however that if the
            original WebP was already lossy-compressed (as most WebPs are), the PNG will preserve
            that existing loss — it won&apos;t magically restore original fidelity.
          </p>
        </div>
      </section>

      <RelatedTools toolId="webp-to-png" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert WebP to PNG",
            description:
              "Convert WebP images to PNG format using SammaPix. Lossless conversion, transparency preserved, batch up to 20 files at once, all in your browser.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix WebP to PNG Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your WebP files",
                text: "Drag and drop WebP files onto the upload area. Up to 20 WebPs per batch on Free, 200 on Pro.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Automatic lossless conversion",
                text: "Conversion starts immediately. PNG is lossless so no quality settings are needed. Transparency is preserved pixel-perfect from the source WebP.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download PNG files",
                text: "Download each converted PNG individually, or download all together as a ZIP archive. Files are ready for any application.",
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
                name: "SammaPix WebP to PNG Converter",
                description:
                  "Convert WebP images to PNG format directly in your browser. Lossless, transparency preserved, batch processing up to 20 files, no upload.",
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
                  "WebP to PNG conversion",
                  "Lossless — no quality loss",
                  "Transparency (alpha channel) preserved",
                  "Batch processing up to 20 files",
                  "ZIP download for batches",
                  "Client-side conversion — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Will my WebP transparency be preserved in the PNG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. PNG natively supports alpha channel (transparency), so any transparent pixels in your WebP source are preserved pixel-perfect in the PNG output. This is why WebP-to-PNG is the correct conversion for transparent stickers, logos, and graphics.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is this WebP to PNG converter really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free tier supports up to 20 files per batch. Pro users can process up to 200 files per batch.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my WebP files uploaded to any server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix converts WebP to PNG entirely in your browser using the Canvas API. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does WebP to PNG conversion lose quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. PNG is a lossless format — the output PNG contains exactly the same pixel data as the source WebP. If the original WebP was already lossy-compressed, the PNG will preserve that existing loss but won't add new degradation.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the PNG be larger than the original WebP?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Typically yes — PNG is 30-50% larger than WebP because PNG is lossless. This is the tradeoff for universal compatibility and transparency preservation. If file size matters and you don't need transparency, convert to JPG instead (70-80% smaller).",
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
                    name: "WebP to PNG Converter",
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
