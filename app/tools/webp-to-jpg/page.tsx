import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, TrendingUp, Shield, FileImage } from "lucide-react";
import Link from "next/link";
import WebpToJpgClient from "@/components/tools/WebpToJpgClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/webp-to-jpg`;

export const metadata: Metadata = {
  title: "WebP to JPG Converter — Free, Browser-Based",
  description:
    "Convert WebP to JPG online free. Batch up to 20 files, quality control, no signup, no upload. Useful for compatibility with older apps, email clients, and Adobe software.",
  keywords: [
    "webp to jpg",
    "webp to jpg converter",
    "convert webp to jpg",
    "webp to jpg online free",
    "batch webp to jpg",
    "free webp converter",
    "webp to jpeg",
    "webp jpg",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "WebP to JPG Converter — Free, Browser-Based",
    description:
      "Convert WebP to JPG online free. Batch up to 20 files, quality control, no signup, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix WebP to JPG Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to JPG Converter — Free, Browser-Based",
    description: "Convert WebP to JPG online free. Batch, no upload, privacy-first.",
  },
};

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Universal compatibility",
    description:
      "JPG is supported by every app, email client, and operating system — including older software that can't open WebP. Convert WebP to JPG when you need maximum compatibility.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Conversion uses the Canvas API natively in your browser. Your WebP files never leave your device — complete privacy guaranteed.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch + quality control",
    description:
      "Convert up to 20 WebPs at once. Quality slider 50-100%. Choose white or black background for transparent WebP animations or stickers.",
  },
];

export default function WebpToJpgPage() {
  return (
    <main>
      <MetaViewContent contentName="WebP to JPG Converter" contentId="webp-to-jpg" />
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
            style={{ backgroundColor: "#10B98115", border: "1px solid #10B98130" }}
            aria-hidden="true"
          >
            <FileImage
              className="h-4.5 w-4.5"
              style={{ color: "#10B981", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            WebP to JPG Converter
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix WebP to JPG Converter is a free online tool that converts WebP images to
          JPG format instantly in your browser. Perfect when you need maximum compatibility with
          older apps, email clients, or software that doesn&apos;t support WebP — no upload, no
          signup, no file limits per day.
        </p>
      </div>

      {/* Tool */}
      <WebpToJpgClient />

      {/* How to use */}
      <HowToUse
        toolName="WebP to JPG Converter"
        steps={[
          {
            title: "Drop your WebP files",
            desc: "Drag and drop WebP files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Adjust quality and background",
            desc: "Choose JPG quality (50–100%) and background color (white or black) for transparent WebPs. JPG does not support transparency.",
          },
          {
            title: "Convert and download",
            desc: "Click Convert. Files are processed locally in your browser. Download individually or all as a ZIP.",
          },
        ]}
        proTip={{
          text: "For modern browsers and websites, keep images in WebP format — it's 25-35% smaller than JPG at the same quality.",
          linkLabel: "Convert to WebP instead",
          linkHref: "/tools/webp",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert WebP to JPG?
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
            When should you convert WebP to JPG?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            WebP is an excellent modern image format — 25-35% smaller than JPG at the same
            quality — but not every program can open it. If you save a WebP from a website and
            try to upload it to an older content management system, edit it in an old version
            of Photoshop, or attach it to an email for a non-tech-savvy recipient, you might
            hit compatibility issues.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Convert WebP to JPG when: you need to upload to a platform that doesn&apos;t support
            WebP, you&apos;re sending a photo to someone on an older device, you want to edit
            in legacy Photoshop versions (pre-2022), you need to print professionally (print
            shops prefer JPG), or you need a universally compatible format for email and
            archival purposes.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Will the JPG file be larger than the original WebP?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Often yes — JPG typically produces 25-35% larger files than WebP at the same
            perceived quality. This is the tradeoff for universal compatibility. You can reduce
            the quality slider (try 85%) to get smaller JPGs. If you need to preserve
            transparency, convert to{" "}
            <Link
              href="/tools/webp-to-png"
              className="underline underline-offset-2 decoration-[#E5E5E5] hover:decoration-[#171717] dark:hover:decoration-[#E5E5E5]"
            >
              PNG instead
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedTools toolId="webp-to-jpg" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert WebP to JPG",
            description:
              "Convert WebP images to JPG format using SammaPix. Batch conversion up to 20 files at once, quality control, transparent background handling, all in your browser.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix WebP to JPG Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your WebP files",
                text: "Drag and drop WebP files onto the upload area. You can convert up to 20 WebPs at once in a single batch.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Adjust quality and background",
                text: "Choose JPG quality between 50 and 100 percent. For transparent WebPs, pick white or black background — JPG does not support transparency.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Convert and download",
                text: "Click Convert. All processing happens locally in your browser. Download converted JPG files individually or all together as a ZIP archive.",
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
                name: "SammaPix WebP to JPG Converter",
                description:
                  "Convert WebP images to JPG format directly in your browser. Batch processing up to 20 files, quality control, transparent background handling, no upload.",
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
                  "WebP to JPG conversion",
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
                    name: "Why would I convert WebP to JPG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "JPG is universally compatible with every app, email client, and operating system — including older software that cannot open WebP. Convert when you need to share images with someone on an older device, upload to a platform that doesn't support WebP, or edit in legacy photo software.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is this WebP to JPG converter really free?",
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
                      text: "No. SammaPix converts WebP to JPG entirely in your browser using the Canvas API. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens to transparent WebPs when converted to JPG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "JPG does not support transparency. When converting a transparent WebP (common for stickers and graphics), transparent pixels are filled with a solid color — SammaPix lets you choose white (default) or black background. If you need transparency, convert to PNG instead.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the JPG be larger than the original WebP?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Typically yes — JPG is 25-35% larger than WebP at the same visual quality. This is the tradeoff for universal compatibility. Reduce the quality slider (try 85%) to get smaller JPGs.",
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
                    name: "WebP to JPG Converter",
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
