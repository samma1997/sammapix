import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Zap, Shield, Archive } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Image Compressor Online — JPG PNG WebP | SammaPix",
  description:
    "Compress JPG, PNG, WebP and GIF images for free in your browser. No upload, no signup. Reduce file size by up to 80% without visible quality loss.",
  alternates: {
    canonical: `${APP_URL}/tools/compress`,
  },
  openGraph: {
    title: "Free Image Compressor Online — JPG PNG WebP | SammaPix",
    description:
      "Compress JPG, PNG, WebP and GIF images for free in your browser. No upload, no signup. Reduce file size by up to 80% without visible quality loss.",
    url: `${APP_URL}/tools/compress`,
    siteName: "SammaPix",
    type: "website",
  },
};

const relatedTools = [
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "All tools", href: "/tools" },
];

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Browser-based — 100% private",
    description:
      "Compression happens entirely in your browser using JavaScript. Your images are never sent to any server.",
  },
  {
    icon: <Archive className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch ZIP download",
    description:
      "Process multiple images at once and download all compressed files as a single ZIP archive in one click.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "JPG · PNG · WebP · GIF",
    description:
      "Supports all major image formats. Compress JPEG, PNG, WebP, and GIF with adjustable quality settings.",
  },
];

export default function CompressToolPage() {
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
            Free Image Compressor Online
          </h1>
          <p className="text-[#737373] text-base leading-relaxed max-w-xl">
            Compress JPG, PNG, WebP, and GIF images directly in your browser.
            Reduce file size by up to 80% without visible quality loss — no
            account required, nothing uploaded to any server.
          </p>
        </div>
      </section>

      {/* Tool embed — redirect to homepage with anchor */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#E5E5E5] rounded-md bg-[#FAFAFA] p-8 text-center">
            <p className="text-sm text-[#737373] mb-5">
              The compression tool runs on the homepage — open it below and your
              files are ready in seconds.
            </p>
            <Link href="/?tool=compress">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors">
                Open Image Compressor
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
            Why use SammaPix to compress images?
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

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto prose prose-sm prose-gray">
          <h2 className="text-lg font-semibold text-[#171717] mb-4">
            How image compression works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix compresses images using the browser&apos;s native Canvas API
            combined with the{" "}
            <code className="text-xs bg-[#F5F5F5] px-1.5 py-0.5 rounded border border-[#E5E5E5]">
              browser-image-compression
            </code>{" "}
            library. The process re-encodes the image at the quality level you
            choose (default 80%) producing a smaller file with imperceptible
            quality differences.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Unlike server-based tools, nothing leaves your browser. This means
            no privacy risk, no file size limits imposed by network bandwidth,
            and near-instant results.
          </p>
          <h3 className="text-base font-semibold text-[#171717] mb-3">
            When should you compress images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Before uploading to your website or CMS to improve page speed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Before attaching to emails to reduce attachment size
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Before sharing on social media for faster upload
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              For e-commerce product images to improve Core Web Vitals
            </li>
          </ul>
        </div>
      </section>

      {/* Related tools CTA */}
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
            name: "SammaPix Image Compressor",
            url: `${APP_URL}/tools/compress`,
            description:
              "Free online image compressor. Compress JPG, PNG, WebP and GIF in your browser. No upload needed.",
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
