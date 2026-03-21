import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, TrendingUp, Shield, FileImage, FileImage as WebpIcon } from "lucide-react";
import Link from "next/link";
import WebpClient from "@/components/tools/WebpClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Image Format Converter Online — JPG, PNG, WebP, HEIC | SammaPix",
  description:
    "Convert images between 15+ formats online. JPG to WebP, PNG to JPG, HEIC to PNG and more. Free, batch, no signup.",
  keywords: [
    "webp converter",
    "convert to webp",
    "jpg to webp",
    "png to webp",
    "free webp converter",
    "online webp conversion",
    "convert image online",
    "web performance",
    "modern image format",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/webp`,
  },
  openGraph: {
    title: "Image Format Converter Online — JPG, PNG, WebP, HEIC | SammaPix",
    description:
      "Convert images between 15+ formats online. JPG to WebP, PNG to JPG, HEIC to PNG and more. Free, batch, no signup.",
    url: `${APP_URL}/tools/webp`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix WebP Converter",
      },
    ],
  },
};

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Up to 30% smaller files",
    description:
      "WebP consistently produces smaller files than JPEG and PNG at equivalent visual quality- improving your Core Web Vitals score.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Conversion uses the Canvas API natively in your browser. No files are sent to any server- your images stay private.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "JPG · PNG · GIF supported",
    description:
      "Convert from JPEG, PNG, and GIF to WebP. Batch-process multiple images at once and download as a ZIP archive.",
  },
];

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert HEIC", href: "/tools/heic" },
  { name: "Resize Images", href: "/tools/resizepack" },
];

export default function WebpPage() {
  return (
    <main>
      <MetaViewContent contentName="WebP Converter" contentId="webp" />
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
            <WebpIcon className="h-4.5 w-4.5" style={{ color: "#6366F1", width: 18, height: 18 }} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">WebP Converter</h1>
        </div>
        <p className="text-sm text-[#737373]">
          Convert JPG, PNG and GIF to WebP format directly in your browser. WebP files are up to 30% smaller- nothing uploaded to any server.
        </p>
      </div>

      {/* Tool + Next Step suggestions */}
      <WebpClient />

      <HowToUse
        toolName="WebP Converter"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG or GIF files onto the upload area- or click to select them.",
          },
          {
            title: "Files convert automatically",
            desc: "Each file is converted to WebP instantly in your browser using the Canvas API. No settings needed.",
          },
          {
            title: "Download WebP files",
            desc: "Download each converted file individually or get them all in a single ZIP archive.",
          },
        ]}
        proTip={{
          text: "Compress your WebP files further with the Image Compressor to get the smallest possible size.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert to WebP?
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
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is WebP and why does it matter?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            WebP is a modern image format developed by Google that provides
            superior compression for web images. It supports both lossy and
            lossless compression, transparency (like PNG), and animation (like
            GIF)- all in a single format that is 25–34% smaller than JPEG.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Google PageSpeed Insights and Lighthouse actively flag JPEG and PNG
            images and suggest converting to WebP or AVIF. Serving WebP images
            can directly improve your Core Web Vitals, particularly Largest
            Contentful Paint (LCP).
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Is WebP supported by all browsers?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Yes. WebP has been supported by Chrome, Firefox, Safari (since
            version 14), Edge, and all modern mobile browsers since 2020. It is
            safe to use WebP as your primary image format for all web projects
            today.
          </p>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] mt-8">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/best-image-format-for-web-2026" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              How to Convert JPG to WebP (and Why You Should) →
            </a>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert Images to WebP",
            description: "Convert JPG, PNG and GIF images to WebP format using SammaPix. WebP files are 25-35% smaller than JPEG at the same quality, improving page load speed and Core Web Vitals.",
            totalTime: "PT2M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix WebP Converter",
              url: `${APP_URL}/tools/webp`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your images",
                text: "Drag and drop JPG, PNG or GIF files onto the SammaPix converter, or click to browse your computer. You can upload multiple files at once for batch conversion. The tool processes everything locally in your browser.",
                url: `${APP_URL}/tools/webp`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Files convert automatically",
                text: "Each file is instantly converted to WebP format using the browser's Canvas API. No additional settings are needed - the tool automatically uses the optimal compression level (85% quality by default). Conversion typically takes just 1-2 seconds per image.",
                url: `${APP_URL}/tools/webp`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download WebP files",
                text: "Download each converted WebP file individually, or click 'Download all as ZIP' to get all converted images in a single archive. The files are ready to use immediately on your website or in your projects.",
                url: `${APP_URL}/tools/webp`
              }
            ]
          }),
        }}
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix WebP Converter",
                description:
                  "Convert JPG, PNG and GIF images to WebP format directly in your browser. WebP files are 25-35% smaller than JPEG with same visual quality.",
                url: `${APP_URL}/tools/webp`,
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
                  url: `${APP_URL}`,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.7",
                  ratingCount: "120",
                },
                featureList: [
                  "JPG/PNG/GIF to WebP conversion",
                  "25-35% file size reduction",
                  "Batch processing",
                  "Quality control slider",
                  "ZIP download",
                  "Browser-based conversion",
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is WebP better than JPEG?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, for web use. WebP consistently produces 25-35% smaller files than JPEG at equivalent visual quality. It also supports transparency like PNG and animation like GIF. The only reason not to use WebP is if you need to support very old browsers (pre-2020)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do all browsers support WebP in 2026?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WebP is supported by Chrome, Firefox, Safari (since version 14), Edge, and all modern mobile browsers. Since 2020, support has been essentially universal across all devices released in the last 5+ years."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does converting to WebP lose quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. SammaPix converts images to WebP with 85% quality by default, which is visually indistinguishable from the original. You can adjust the quality slider from 0-100% to control the tradeoff between file size and visual fidelity."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much smaller is WebP than JPEG?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "On average, a WebP file is 25-35% smaller than an equivalent JPEG at the same perceived quality. For example, a 1MB JPEG typically converts to 650-750KB in WebP. The exact savings depend on the image content, but WebP is consistently smaller."
                    }
                  }
                ]
              }
            ],
          }),
        }}
      />
    </main>
  );
}
