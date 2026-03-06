import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileImage, Shield, TrendingUp } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Convert Images to WebP Free — Batch Online Tool | SammaPix",
  description:
    "Convert JPG, PNG and GIF to WebP format for free in your browser. No upload, no signup. WebP files are up to 30% smaller — boost your site speed instantly.",
  alternates: {
    canonical: `${APP_URL}/tools/webp`,
  },
  openGraph: {
    title: "Convert Images to WebP Free — Batch Online Tool | SammaPix",
    description:
      "Convert JPG, PNG and GIF to WebP format for free in your browser. No upload, no signup. WebP files are up to 30% smaller — boost your site speed instantly.",
    url: `${APP_URL}/tools/webp`,
    siteName: "SammaPix",
    type: "website",
  },
};

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "All tools", href: "/tools" },
];

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

export default function WebpToolPage() {
  return (
    <>
      {/* Hero SEO */}
      <section className="pt-16 pb-10 px-4 sm:px-6 border-b border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-2">
            <span className="text-xs font-medium text-[#6366F1] uppercase tracking-widest">
              Free tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mb-4 leading-tight">
            Convert Images to WebP — Free &amp; Online
          </h1>
          <p className="text-[#737373] text-base leading-relaxed max-w-xl">
            Convert JPG, PNG, and GIF images to WebP format instantly in your
            browser. WebP files are up to 30% smaller than JPEG — the fastest
            way to improve your website load speed and Core Web Vitals.
          </p>
        </div>
      </section>

      {/* Tool embed */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#E5E5E5] rounded-md bg-[#FAFAFA] p-8 text-center">
            <p className="text-sm text-[#737373] mb-5">
              The WebP converter runs on the homepage — open it below and enable
              the &ldquo;Convert to WebP&rdquo; toggle in the toolbar.
            </p>
            <Link href="/?tool=webp">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors">
                Open WebP Converter
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Why convert to WebP?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
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
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] mb-4">
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
          <h3 className="text-base font-semibold text-[#171717] mb-3">
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

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] bg-white transition-colors"
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
            url: `${APP_URL}/tools/webp`,
            description:
              "Free online WebP converter. Convert JPG, PNG and GIF to WebP in your browser. No upload needed.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
