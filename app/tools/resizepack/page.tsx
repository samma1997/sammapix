import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Layout, Archive, Maximize2 } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import ResizePackClient from "@/components/tools/ResizePackClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Batch Resize Images Free Online - Social Media Presets | SammaPix",
  description:
    "Resize for Instagram, Twitter, LinkedIn, YouTube in seconds. Social presets, batch ZIP download, free online. Optimize now.",
  keywords: [
    "resize images",
    "batch resize",
    "resize for instagram",
    "social media image resizer",
    "resize images online",
    "image resizer free",
    "batch resize",
    "social media image resizer",
    "image resizer free",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/resizepack`,
  },
  openGraph: {
    title: "Batch Resize Images Free Online - Social Media Presets | SammaPix",
    description:
      "Resize for Instagram, Twitter, LinkedIn, YouTube in seconds. Social presets, batch ZIP download, free online. Optimize now.",
    url: `${APP_URL}/tools/resizepack`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Batch Image Resizer",
      },
    ],
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Browser-based- 100% private",
    description:
      "All resizing happens in your browser using the Canvas API. Your images are never uploaded to any server.",
  },
  {
    icon: <Layout className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Social media presets",
    description:
      "One-click presets for Instagram Post, Story, Twitter/X, LinkedIn, YouTube Thumbnail and A4 print at 300 dpi.",
  },
  {
    icon: <Archive className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Batch ZIP download",
    description:
      "Resize hundreds of images at once and download all results in a single ZIP archive. Files are renamed with their new dimensions.",
  },
];

const relatedTools = [
  { name: "Crop to Ratio", href: "/tools/croproatio" },
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

export default function ResizePackPage() {
  return (
    <main>
      <MetaViewContent contentName="ResizePack" contentId="resizepack" />
      <ToolHeader
        title="Batch Resize"
        description="Batch resize images by pixel dimensions or percentage. Social media presets included. Download all as ZIP."
        icon={Maximize2}
        accentColor="#14B8A6"
      />

      {/* Tool + Next Step suggestions */}
      <ResizePackClient />

      <HowToUse
        toolName="ResizePack"
        steps={[
          {
            title: "Drop your photos",
            desc: "Upload JPG, PNG or WebP images- drag and drop or click to browse. Batch upload is supported.",
          },
          {
            title: "Select a platform preset",
            desc: "Choose a social media preset (Instagram, Twitter/X, LinkedIn, YouTube) or enter custom pixel dimensions or a percentage.",
          },
          {
            title: "Download resized batch",
            desc: "Download all resized images individually or as a single ZIP archive. Files are renamed with their new dimensions.",
          },
        ]}
        proTip={{
          text: "Use AI Workflow to resize, compress and rename for SEO all in one step.",
          linkLabel: "Try AI Workflow",
          linkHref: "/tools/workflow",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to resize images?
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
            What is ResizePack?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            ResizePack is a free browser-based batch image resizer. Resize multiple JPG, PNG, and WebP images at once- by exact pixel dimensions, percentage, or using built-in social media presets for Instagram, Twitter/X, LinkedIn, and YouTube. Download all resized images in a single ZIP archive.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            ResizePack includes 6 social media presets and supports cover and contain fit modes for precise cropping. All resizing runs in the browser using the Canvas API- no files are uploaded to any server.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How batch image resizing works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix resizes images using the browser&apos;s native Canvas API- no
            server involved. Drop your images, choose pixel dimensions or a
            percentage scale, optionally lock the aspect ratio, and hit resize.
            All images are processed concurrently in your browser.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            When you lock the aspect ratio, each file is resized independently
            based on its own original dimensions, so portrait and landscape shots
            both come out proportional.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When should you resize images?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before uploading to Instagram, Twitter/X or LinkedIn to meet platform requirements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before adding to a website or CMS to improve page load speed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              To generate thumbnails from high-resolution source images
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              To prepare photos for print at exact DPI targets (e.g. A4 at 300 dpi)
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
            name: "How to Batch Resize Images",
            description: "Resize multiple images at once using SammaPix Batch Resize. Choose pixel dimensions, percentage scaling, or use built-in presets for Instagram, Twitter, LinkedIn and YouTube. Download all resized images as a ZIP file.",
            totalTime: "PT3M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Batch Resize",
              url: `${APP_URL}/tools/resizepack`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your photos",
                text: "Upload JPG, PNG or WebP images to SammaPix Batch Resize by dragging and dropping them, or click to browse your computer. You can select multiple files at once for batch processing. All resizing happens locally in your browser.",
                url: `${APP_URL}/tools/resizepack`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Select a platform preset",
                text: "Choose one of the built-in social media presets (Instagram 1080x1080, Instagram Story 1080x1920, Twitter/X 1024x512, LinkedIn 1200x627, YouTube Thumbnail 1280x720) or enter custom pixel dimensions or a percentage value. Optionally lock the aspect ratio to maintain proportions.",
                url: `${APP_URL}/tools/resizepack`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download resized batch",
                text: "All images are resized using the browser's Canvas API. Download each resized image individually or click 'Download all as ZIP' to get all resized images in one archive. Files are automatically renamed with their new dimensions for easy identification.",
                url: `${APP_URL}/tools/resizepack`
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
                name: "Batch Resize",
                item: `${APP_URL}/tools/resizepack`,
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
                name: "Can I resize multiple images at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. ResizePack is built for batch processing. Drop multiple images at once, set your dimensions or choose a preset, and all images will be resized simultaneously. Download them individually or as a single ZIP archive.",
                },
              },
              {
                "@type": "Question",
                name: "Does resizing reduce image quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Resizing itself does not reduce quality- it only changes dimensions. However, resizing to much smaller sizes may cause some quality loss due to interpolation. If you're downsizing by more than 50%, consider using ResizePack's moderate compression settings to maintain quality.",
                },
              },
              {
                "@type": "Question",
                name: "What social media presets are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ResizePack includes optimized presets for Instagram Post (1080×1080), Instagram Story (1080×1920), Twitter/X (1024×512), LinkedIn (1200×627), YouTube Thumbnail (1280×720), and A4 print at 300 dpi.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All resizing happens entirely in your browser using the Canvas API. Your images never leave your device- nothing is uploaded to any server.",
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
            name: "SammaPix Batch Resize",
            description:
              "Resize multiple images at once to exact pixels, percentage or social media presets (Instagram, Twitter, LinkedIn). Download all as ZIP.",
            url: `${APP_URL}/tools/resizepack`,
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
              ratingCount: "78",
            },
            featureList: [
              "Social media presets",
              "Pixel or percentage resize",
              "Batch ZIP download",
              "Cover/contain fit modes",
            ],
          }),
        }}
      />
    </main>
  );
}
