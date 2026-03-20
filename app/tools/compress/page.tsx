import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Archive, Zap, Minimize2 } from "lucide-react";
import Link from "next/link";
import CompressClient from "@/components/tools/CompressClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Compress Images Free Online - JPG, PNG, WebP | SammaPix",
  description:
    "Compress images 80% smaller instantly. JPG, PNG, WebP & GIF- free forever, browser-based, zero uploads. Optimize for web today.",
  keywords: [
    "image compressor",
    "compress images online",
    "jpg compressor",
    "png compressor",
    "free image compression",
    "compress without losing quality",
    "reduce image size",
    "image optimization tool",
    "lossless compression",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/compress`,
  },
  openGraph: {
    title: "Compress Images Free Online - JPG, PNG, WebP | SammaPix",
    description:
      "Compress images 80% smaller instantly. JPG, PNG, WebP & GIF- free forever, browser-based, zero uploads. Optimize for web today.",
    url: `${APP_URL}/tools/compress`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Image Compressor",
      },
    ],
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Browser-based- 100% private",
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
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "Convert HEIC", href: "/tools/heic" },
  { name: "Resize Images", href: "/tools/resizepack" },
  { name: "Remove EXIF", href: "/tools/exif" },
  { name: "AI Rename", href: "/tools/ai-rename" },
];

export default function CompressPage() {
  return (
    <main>
      <MetaViewContent contentName="Compress" contentId="compress" />
      <ToolHeader
        title="Image Compressor"
        description="Compress JPG, PNG, WebP and GIF files directly in your browser- nothing uploaded to any server."
        icon={Minimize2}
        accentColor="#6366F1"
      />

      {/* Tool + Next Step suggestions */}
      <CompressClient />

      <HowToUse
        toolName="Image Compressor"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, WebP or GIF files onto the upload area- or click to browse.",
          },
          {
            title: "Adjust quality slider",
            desc: "Use the quality slider to control compression. The default (80%) reduces file size by 50–80% with no visible quality loss.",
          },
          {
            title: "Download compressed files",
            desc: "Download each image individually or click 'Download all as ZIP' to get everything in one archive.",
          },
        ]}
        proTip={{
          text: "Use AI Workflow to compress, rename for SEO, and resize all in one step.",
          linkLabel: "Try AI Workflow",
          linkHref: "/tools/workflow",
        }}
      />

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
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before uploading to your website or CMS to improve page speed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before attaching to emails to reduce attachment size
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Before sharing on social media for faster upload
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
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

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Compress Images Online",
            description: "Learn how to compress JPG, PNG, WebP and GIF images using SammaPix. Reduce file size by 50-80% without losing visible quality. Perfect for web optimization and email attachments.",
            totalTime: "PT2M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Image Compressor",
              url: `${APP_URL}/tools/compress`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your images",
                text: "Drag and drop JPG, PNG, WebP or GIF files onto the SammaPix upload area, or click to browse your computer. You can select multiple files at once for batch processing. All files are kept private and processed directly in your browser.",
                url: `${APP_URL}/tools/compress`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Adjust quality slider",
                text: "Use the quality slider to control how aggressively to compress. The default setting (80%) reduces file size by 50-80% with imperceptible quality loss. Move the slider left for smaller files (more compression) or right to preserve maximum quality.",
                url: `${APP_URL}/tools/compress`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download compressed files",
                text: "Download each compressed image individually by clicking the download button, or click 'Download all as ZIP' to get all compressed files in a single archive. Your original files are never modified - only the compressed versions are downloaded.",
                url: `${APP_URL}/tools/compress`
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
                name: "SammaPix Image Compressor",
                url: `${APP_URL}/tools/compress`,
                description:
                  "Free browser-based image compressor. Reduce JPG, PNG, WebP and GIF files up to 80% smaller without quality loss. Zero server upload.",
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
                  ratingValue: "4.8",
                  ratingCount: "150",
                },
                featureList: [
                  "Compress JPG, PNG, WebP, GIF",
                  "Quality adjustment slider",
                  "Batch file processing",
                  "ZIP download archive",
                  "Browser-based processing",
                  "No server upload",
                  "No quality loss",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Compress Images for Website Without Losing Quality",
                description:
                  "Step-by-step guide to compress images for your website using SammaPix image compressor.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Upload your image to SammaPix",
                    description:
                      "Drag and drop your JPG, PNG, WebP or GIF file into the SammaPix compressor.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Adjust quality slider",
                    description:
                      "Use the quality slider (0-100%) to control how much compression to apply. Higher values retain more quality.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download compressed image",
                    description:
                      "Click the download button to save your optimized image to your device.",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Does compressing an image reduce quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It depends on the compression level. SammaPix uses lossy compression by default (80% quality), which produces imperceptible quality loss while reducing file size by 50-80%. For sensitive images, you can increase the quality slider to 90-100% for lossless results."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the best image format for web?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WebP is the modern standard for web images, offering 25-35% smaller files than JPEG at equivalent quality. If you need broader compatibility, JPEG remains excellent. For transparency, use PNG. SammaPix supports all formats and can convert between them."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much can you compress a JPEG without losing quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A JPEG at 75-85% quality is visually indistinguishable from the original for most uses, while reducing file size by 40-60%. At 90%+ quality, compression is nearly lossless but with smaller gains. SammaPix lets you adjust the quality slider to find the perfect balance for your needs."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does SammaPix upload my images to a server?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. SammaPix is entirely browser-based. All image compression happens on your device using JavaScript. Your images never leave your computer- not uploaded, not stored, and not tracked. Your privacy is completely protected."
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
