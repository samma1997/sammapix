import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Layers, Archive, Stamp } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import StampItClient from "@/components/tools/StampItClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Watermark Photos Free Online - Batch & Logo | SammaPix",
  description:
    "Watermark photos instantly- text or logo. Tiled anti-crop mode, 9 positions, batch ZIP. Free, browser-based, zero uploads.",
  keywords: [
    "watermark tool",
    "add watermark",
    "batch watermark",
    "watermark photos",
    "text watermark",
    "logo watermark",
    "add watermark",
    "batch watermark",
    "watermark photos",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/stampit`,
  },
  openGraph: {
    title: "Watermark Photos Free Online - Batch & Logo | SammaPix",
    description:
      "Watermark photos instantly- text or logo. Tiled anti-crop mode, 9 positions, batch ZIP. Free, browser-based, zero uploads.",
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
    title: "100% private- no upload",
    description:
      "All watermarking happens in your browser using the Canvas API. Your images never leave your device.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Tiled anti-crop mode",
    description:
      "Repeats the watermark across the entire image in a diagonal grid- making it impossible to crop out.",
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
      <MetaViewContent contentName="StampIt" contentId="stampit" />
      <ToolHeader
        title="Watermark"
        description="Batch watermark images with text or your logo. 9 positions, opacity, tiled mode. Download all as ZIP."
        icon={Stamp}
        accentColor="#06B6D4"
      />

      {/* Tool + Next Step suggestions */}
      <StampItClient />

      <HowToUse
        toolName="StampIt"
        steps={[
          {
            title: "Drop your photos",
            desc: "Upload JPG, PNG or WebP images- drag and drop or click to browse. Batch upload is supported.",
          },
          {
            title: "Add text or logo watermark",
            desc: "Type your watermark text or upload an SVG logo. Choose font size, opacity and style. Enable tiled mode for maximum protection.",
          },
          {
            title: "Choose position and download",
            desc: "Select from 9 positions (corners, edges, center) or use tiled mode. Download individually or as a ZIP.",
          },
        ]}
        proTip={{
          text: "Use AI Workflow to watermark, compress and rename all your photos in one step.",
          linkLabel: "Try AI Workflow",
          linkHref: "/tools/workflow",
        }}
      />

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
            StampIt is a free browser-based batch watermarking tool. Add text or logo watermarks to multiple images at once using 9 position options (top-left, center, bottom-right, and more), adjustable opacity, and font size. For maximum protection, tiled filigrana mode repeats your watermark in a diagonal grid across the entire image- making it impossible to crop out.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            StampIt supports SVG logos and text watermarks. All processing runs in the browser using the Canvas API- your images are never uploaded to any server. Download all watermarked images in a single ZIP archive.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How batch image watermarking works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            StampIt uses the browser&apos;s native Canvas API to draw watermarks
            directly onto your images- no server, no upload. Drop your images,
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
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before sharing photos on social media to protect your copyright
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              When sending proofs to clients- they can preview but not use the full image
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              To brand a batch of product photos before publishing to a website or marketplace
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
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

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add Watermark to Photos",
            description: "Watermark photos with text or your logo using SammaPix Watermark. Choose from 9 position options, enable tiled filigrana mode for copyright protection, and batch process multiple images. Download watermarked photos as ZIP.",
            totalTime: "PT3M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Watermark",
              url: `${APP_URL}/tools/stampit`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your photos",
                text: "Upload JPG, PNG or WebP images to SammaPix Watermark by dragging and dropping them onto the upload area, or click to browse your computer. You can select multiple files at once for batch watermarking. All watermarking happens locally in your browser.",
                url: `${APP_URL}/tools/stampit`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Add text or logo watermark",
                text: "Type your watermark text or upload an SVG logo file. Adjust the font size, opacity (transparency), and style. For maximum copyright protection, enable tiled mode which repeats your watermark in a diagonal grid across the entire image - this makes it virtually impossible to crop or remove.",
                url: `${APP_URL}/tools/stampit`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Choose position and download",
                text: "Select from 9 watermark positions (top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right) or use tiled mode for maximum coverage. Download individually or as a ZIP containing all watermarked images ready for sharing.",
                url: `${APP_URL}/tools/stampit`
              }
            ]
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
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
                name: "Watermark",
                item: `${APP_URL}/tools/stampit`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I use my own logo as a watermark?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. StampIt supports SVG logos and text watermarks. Upload your SVG file and position it on your image using one of 9 position options (top-left, center, bottom-right, etc.). You can also adjust opacity and size.",
                },
              },
              {
                "@type": "Question",
                name: "Where should I place a watermark?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Common placements are bottom-right (subtle), bottom-center (visible), or center (maximum visibility). For copyright protection, use tiled mode which repeats the watermark diagonally across the entire image- this makes it virtually impossible to crop out.",
                },
              },
              {
                "@type": "Question",
                name: "Can I watermark multiple photos at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Drop multiple images, configure your watermark settings, and click 'Apply to all'. StampIt will watermark the entire batch and let you download all results in a single ZIP archive.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All watermarking happens locally in your browser using the Canvas API. Your images never leave your device- completely private, zero uploads.",
                },
              },
            ],
          }),
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Watermark",
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
