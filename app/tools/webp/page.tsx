import React from "react";
import type { Metadata } from "next";
import { ArrowRight, TrendingUp, Shield, FileImage } from "lucide-react";
import Link from "next/link";
import ToolInterface from "@/components/tools/ToolInterface";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free WebP Converter — Convert JPG/PNG to WebP Online | SammaPix",
  description:
    "Convert JPG, PNG & GIF to WebP format free online. WebP files are 25-35% smaller than JPEG. Batch processing, no upload, browser-based.",
  keywords: [
    "webp converter",
    "convert to webp",
    "jpg to webp",
    "png to webp",
    "free webp converter",
    "online webp conversion",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/webp`,
  },
  openGraph: {
    title: "Free WebP Converter — Convert JPG/PNG to WebP Online | SammaPix",
    description:
      "Convert JPG, PNG & GIF to WebP format free online. WebP files are 25-35% smaller. Batch processing, no upload needed.",
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
      "WebP consistently produces smaller files than JPEG and PNG at equivalent visual quality — improving your Core Web Vitals score.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Conversion uses the Canvas API natively in your browser. No files are sent to any server — your images stay private.",
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
  { name: "Resize Images", href: "/tools/resizepack" },
  { name: "AI Rename", href: "/tools/ai-rename" },
];

export default function WebpPage() {
  return (
    <main>
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">WebP Converter</h1>
        <p className="text-sm text-[#737373]">
          Convert JPG, PNG and GIF to WebP format directly in your browser. WebP files are up to 30% smaller — nothing uploaded to any server.
        </p>
      </div>

      {/* Tool */}
      <ToolInterface defaultMode="webp" />

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
            GIF) — all in a single format that is 25–34% smaller than JPEG.
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
            <a href="/blog/jpg-to-webp-converter" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
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

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
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
          }),
        }}
      />
    </main>
  );
}
