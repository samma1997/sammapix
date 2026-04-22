import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, TrendingUp, Shield, FileImage } from "lucide-react";
import Link from "next/link";
import PngToJpgClient from "@/components/tools/PngToJpgClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/png-to-jpg`;

export const metadata: Metadata = {
  title: "PNG to JPG Converter — Free, Browser-Based",
  description:
    "Convert PNG to JPG online free. Batch up to 20 files, quality control, no signup, no upload. 100% in your browser — your files stay private.",
  keywords: [
    "png to jpg",
    "png to jpg converter",
    "convert png to jpg",
    "png to jpg online free",
    "batch png to jpg",
    "free png converter",
    "png to jpeg",
    "png jpg",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "PNG to JPG Converter — Free, Browser-Based",
    description:
      "Convert PNG to JPG online free. Batch up to 20 files, quality control, no signup, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PNG to JPG Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter — Free, Browser-Based",
    description: "Convert PNG to JPG online free. Batch, no upload, privacy-first.",
  },
};

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Smaller files",
    description:
      "JPG files are typically 70-90% smaller than PNG for photos. Ideal for email attachments, web uploads, and social media.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Conversion uses the Canvas API natively in your browser. Your PNG files never leave your device — complete privacy guaranteed.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch + quality control",
    description:
      "Convert up to 20 PNGs at once. Quality slider 50-100%. Choose white or black background for transparent PNGs.",
  },
];

export default function PngToJpgPage() {
  return (
    <main>
      <MetaViewContent contentName="PNG to JPG Converter" contentId="png-to-jpg" />
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
            style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
            aria-hidden="true"
          >
            <FileImage
              className="h-4.5 w-4.5"
              style={{ color: "#6366F1", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            PNG to JPG Converter
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix PNG to JPG Converter is a free online tool that converts PNG images to JPG
          format instantly in your browser. Typically reduces file size by 70-90% — no upload
          to any server, no signup, no file limits per day.
        </p>
      </div>

      {/* Tool */}
      <PngToJpgClient />

      {/* How to use */}
      <HowToUse
        toolName="PNG to JPG Converter"
        steps={[
          {
            title: "Drop your PNG files",
            desc: "Drag and drop PNG files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Adjust quality and background",
            desc: "Choose quality (50–100%) and background color (white or black) for transparent PNGs. JPG does not support transparency.",
          },
          {
            title: "Convert and download",
            desc: "Click Convert. Files are processed locally in your browser. Download individually or all as a ZIP.",
          },
        ]}
        proTip={{
          text: "For even smaller files, compress the output JPGs with the Image Compressor tool.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert PNG to JPG?
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
            When should you convert PNG to JPG?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PNG is a lossless format designed for graphics with sharp edges, logos and
            screenshots that require transparency. JPG is a lossy format optimized for
            photographic images — it achieves significantly smaller file sizes by discarding
            visually imperceptible details. For most photos, JPG is the better choice because
            the size savings far outweigh the minimal quality loss.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Convert PNG to JPG when: you need to reduce file size for email attachments, you are
            uploading photos to social platforms that don&apos;t need transparency, you want
            faster loading times for web images, or you need a format universally compatible
            with older software.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What happens to transparent PNGs?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            JPG does not support transparency. When you convert a transparent PNG to JPG, the
            transparent pixels are replaced with a solid color — SammaPix lets you choose white
            (default) or black. If you need to keep transparency, convert to WebP instead using
            our{" "}
            <Link href="/tools/webp" className="underline underline-offset-2 decoration-[#E5E5E5] hover:decoration-[#171717] dark:hover:decoration-[#E5E5E5]">
              WebP Converter
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedTools toolId="png-to-jpg" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert PNG to JPG",
            description:
              "Convert PNG images to JPG format using SammaPix. Batch conversion up to 20 files at once, quality control, transparent background handling, all in your browser.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PNG to JPG Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PNG files",
                text: "Drag and drop PNG files onto the upload area. You can convert up to 20 PNGs at once in a single batch.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Adjust quality and background",
                text: "Choose JPG quality between 50 and 100 percent. For transparent PNGs, pick white or black background — JPG does not support transparency.",
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
                name: "SammaPix PNG to JPG Converter",
                description:
                  "Convert PNG images to JPG format directly in your browser. Batch processing up to 20 files, quality control, transparent background handling, no upload.",
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
                  "PNG to JPG conversion",
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
                    name: "Is this PNG to JPG converter really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required, no daily limits on free tier (up to 20 files per batch). Pro users can process up to 200 files per batch.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PNG files uploaded to any server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix converts PNG to JPG entirely in your browser using the Canvas API. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens to transparent PNGs when converted to JPG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "JPG does not support transparency. When converting a transparent PNG, transparent pixels are filled with a solid color — SammaPix lets you choose white (default) or black background. If you need transparency, convert to WebP instead.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much smaller is JPG compared to PNG?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For photographic images, JPG is typically 70-90% smaller than PNG. For graphics with sharp edges (logos, screenshots), the savings are smaller — usually 30-50%. You can adjust the quality slider to control the tradeoff.",
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
                    name: "PNG to JPG Converter",
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
