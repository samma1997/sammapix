import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Archive, Zap, Minimize2 } from "lucide-react";
import Link from "next/link";
import ToolInterface from "@/components/tools/ToolInterface";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Image Without Losing Quality Online Free | SammaPix",
  description:
    "Compress image without losing quality. Reduce JPG, PNG, WebP and GIF files by up to 80% free online. No upload needed, no quality loss.",
  alternates: {
    canonical: `${APP_URL}/tools/compress`,
  },
  openGraph: {
    title: "Compress Image Without Losing Quality Online Free | SammaPix",
    description:
      "Compress image without losing quality. Reduce JPG, PNG, WebP and GIF files by up to 80% free online. No upload needed, no quality loss.",
    url: `${APP_URL}/tools/compress`,
    siteName: "SammaPix",
    type: "website",
  },
};

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

const relatedTools = [
  { name: "Resize Images", href: "/tools/resizepack" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "Remove EXIF", href: "/tools/exif" },
];

export default function CompressPage() {
  return (
    <main>
      <ToolHeader
        title="Image Compressor"
        description="Compress JPG, PNG, WebP and GIF files directly in your browser — nothing uploaded to any server."
        icon={Minimize2}
        accentColor="#6366F1"
      />

      {/* Tool */}
      <ToolInterface defaultMode="compress" />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to compress images?
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

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto prose prose-sm prose-gray">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How image compression works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix compresses images using the browser&apos;s native Canvas API
            combined with the{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
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
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
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

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] mt-8">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/compress-images-for-website" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              How to Compress Images for Websites Without Losing Quality →
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
    </main>
  );
}
