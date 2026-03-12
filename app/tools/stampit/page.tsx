import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Layers, Archive, Stamp } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import StampIt from "@/components/tools/StampIt";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Batch Watermark Tool Free Online | Text & Logo Watermarks | SammaPix",
  description:
    "Add watermarks to multiple photos at once free online. Text or logo watermarks. Tiled anti-crop mode. No upload, browser-based.",
  keywords: [
    "watermark tool",
    "add watermark",
    "batch watermark",
    "watermark photos",
    "text watermark",
    "logo watermark",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/stampit`,
  },
  openGraph: {
    title: "Batch Watermark Tool Free Online | SammaPix",
    description:
      "Add watermarks to multiple photos at once free online. Text or logo watermarks. Tiled anti-crop mode. No upload needed.",
    url: `${APP_URL}/tools/stampit`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Watermark Tool",
      },
    ],
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% private — no upload",
    description:
      "All watermarking happens in your browser using the Canvas API. Your images never leave your device.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Tiled anti-crop mode",
    description:
      "Repeats the watermark across the entire image in a diagonal grid — making it impossible to crop out.",
  },
  {
    icon: <Archive className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Batch ZIP download",
    description:
      "Watermark hundreds of images in one go and download all results in a single ZIP archive.",
  },
];

const relatedTools = [
  { name: "Crop to Ratio", href: "/tools/croproatio" },
  { name: "Resize Images", href: "/tools/resizepack" },
  { name: "Compress Images", href: "/tools/compress" },
];

export default function StampItPage() {
  return (
    <main>
      <ToolHeader
        title="StampIt"
        description="Batch watermark images with text or your logo. 9 positions, opacity, tiled mode. Download all as ZIP."
        icon={Stamp}
        accentColor="#06B6D4"
      />

      <StampIt />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to watermark images?
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
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is StampIt?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            StampIt is a free browser-based batch watermarking tool. Add text or logo watermarks to multiple images at once using 9 position options (top-left, center, bottom-right, and more), adjustable opacity, and font size. For maximum protection, tiled filigrana mode repeats your watermark in a diagonal grid across the entire image — making it impossible to crop out.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            StampIt supports SVG logos and text watermarks. All processing runs in the browser using the Canvas API — your images are never uploaded to any server. Download all watermarked images in a single ZIP archive.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How batch image watermarking works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            StampIt uses the browser&apos;s native Canvas API to draw watermarks
            directly onto your images — no server, no upload. Drop your images,
            configure the watermark text or logo, choose a position and opacity,
            then hit apply. All images are processed concurrently.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The tiled mode repeats your watermark in a diagonal grid across the
            entire image at reduced opacity. This makes it virtually impossible
            to crop or clone-stamp the watermark out, giving you maximum
            copyright protection.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you watermark images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Before sharing photos on social media to protect your copyright
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              When sending proofs to clients — they can preview but not use the full image
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              To brand a batch of product photos before publishing to a website or marketplace
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              To add a subtle logo or copyright to stock photos you sell online
            </li>
          </ul>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
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
            name: "SammaPix StampIt",
            description:
              "Add text or logo watermarks to multiple images at once. True tiled filigrana mode with diagonal stagger for professional watermarking.",
            url: `${APP_URL}/tools/stampit`,
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
              ratingValue: "4.6",
              ratingCount: "62",
            },
            featureList: [
              "Text and logo watermarks",
              "9 position options",
              "Tiled filigrana mode",
              "SVG logo support",
            ],
          }),
        }}
      />
    </main>
  );
}
