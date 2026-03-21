import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Smartphone, Layers, FileImage } from "lucide-react";
import Link from "next/link";
import HeicClient from "@/components/tools/HeicClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "HEIC to JPG Converter Online — Free Batch Conversion | SammaPix",
  description:
    "Convert HEIC to JPG, PNG, or WebP online for free. Batch convert iPhone photos instantly. No upload to server — 100% browser-based.",
  keywords: [
    "heic to jpg converter",
    "heic converter",
    "convert iphone photos",
    "heic to webp",
    "heic converter online",
    "batch heic converter",
    "convert iphone photos",
    "batch heic converter",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/heic`,
  },
  openGraph: {
    title: "HEIC to JPG Converter Online — Free Batch Conversion | SammaPix",
    description:
      "Convert HEIC to JPG, PNG, or WebP online for free. Batch convert iPhone photos instantly. No upload to server — 100% browser-based.",
    url: `${APP_URL}/tools/heic`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix HEIC Converter",
      },
    ],
  },
};

const features = [
  {
    icon: <Smartphone className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "Convert iPhone photos",
    description:
      "Every iPhone photo taken since iOS 11 is HEIC. SammaPix converts them instantly to universally supported JPG or WebP.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "Batch conversion",
    description:
      "Convert up to 20 HEIC files at once on the free plan. Pro users can batch convert 500 files in a single session.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "JPG or WebP output",
    description:
      "Choose JPG for maximum compatibility or WebP for ~25% smaller files. Adjustable quality from 60% to 100%.",
  },
];

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "Batch Rename", href: "/tools/batchname" },
];

export default function HeicPage() {
  return (
    <main>
      <MetaViewContent contentName="HEIC Converter" contentId="heic" />
      <ToolHeader
        title="HEIC Converter"
        description="Convert iPhone HEIC photos to JPG or WebP. Batch convert, adjustable quality, download as ZIP."
        icon={FileImage}
        accentColor="#6366F1"
      />

      {/* Tool + Next Step suggestions */}
      <HeicClient />

      <HowToUse
        toolName="HEIC Converter"
        steps={[
          {
            title: "Drop your iPhone HEIC photos",
            desc: "Drag and drop your HEIC files from iPhone, iPad or any HEIF-compatible camera- or click to browse.",
          },
          {
            title: "Choose output format",
            desc: "Select JPG for maximum compatibility or WebP for ~25% smaller files. Adjust the quality slider from 60% to 100%.",
          },
          {
            title: "Download converted files",
            desc: "Download each converted image individually or get the full batch as a single ZIP archive.",
          },
        ]}
        proTip={{
          text: "After converting, compress your JPG files further to optimize for web publishing.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to convert HEIC?
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

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is HEIC?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            HEIC (High Efficiency Image Container) is Apple&apos;s default photo format since iOS 11.
            It uses the HEIF (High Efficiency Image Format) standard developed by the Moving Picture
            Experts Group (MPEG). HEIC files are roughly half the size of equivalent JPEG files at
            the same visual quality, which is why Apple switched to it- iPhone storage is limited
            and HEIC saves significant space.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why convert HEIC to JPG?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Windows and older software often cannot open HEIC files natively
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Most websites, CMSs, and social platforms require JPG or PNG
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Email clients and messaging apps may strip or fail to display HEIC
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Printing services and photo labs typically require JPG
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Stock photo sites and client deliverables expect universal formats
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why convert HEIC to WebP?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            WebP is Google&apos;s modern image format supported by all major browsers since 2020. It
            produces files 25–34% smaller than JPEG at equivalent quality- making it ideal for
            websites, e-commerce product images, and any web publishing workflow. If you&apos;re
            optimizing iPhone photos for the web, converting HEIC directly to WebP skips an
            intermediate JPG step and preserves more quality.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How SammaPix converts HEIC
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix uses a server-side conversion pipeline powered by{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
              heic-convert
            </code>
            , a pure JavaScript/WebAssembly library that does not require native system libraries.
            This means it runs reliably on any server and produces consistent output.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Your HEIC file is sent over an encrypted HTTPS connection, converted in memory, and the
            JPG or WebP result is returned immediately. No files are stored on our servers- the
            conversion is ephemeral. We validate the actual file magic bytes (not just the
            extension) to ensure only genuine HEIC/HEIF files are processed.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Quality settings explained
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            The quality slider controls the compression level of the output file. At 85% (the
            default), the result is visually indistinguishable from the original at a significantly
            smaller file size. At 60%, you get the smallest possible file- useful for thumbnails or
            email attachments. At 100%, virtually no lossy compression is applied.
          </p>
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
            name: "How to Convert HEIC to JPG",
            description: "Convert iPhone HEIC photos to JPG or WebP format using SammaPix. Batch convert up to 20 images (free) or 500 (Pro) with adjustable quality. Works with iPhone, iPad and any HEIF-compatible camera.",
            totalTime: "PT3M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix HEIC Converter",
              url: `${APP_URL}/tools/heic`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your iPhone HEIC photos",
                text: "Drag and drop your HEIC files from iPhone, iPad or any HEIF-compatible camera onto the SammaPix converter, or click to browse your computer. You can upload multiple HEIC photos at once - up to 20 files on the free plan.",
                url: `${APP_URL}/tools/heic`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose output format",
                text: "Select whether you want to convert to JPG (for maximum compatibility with all devices and software) or WebP (for ~25% smaller files). Then adjust the quality slider from 60% to 100% depending on your needs - 85% is the default and produces imperceptible quality loss.",
                url: `${APP_URL}/tools/heic`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download converted files",
                text: "Download each converted image individually, or click 'Download all as ZIP' to get all converted JPG or WebP files in a single archive. The converted images are ready to share, upload to websites, or send via email.",
                url: `${APP_URL}/tools/heic`
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
                name: "SammaPix HEIC Converter",
                url: `${APP_URL}/tools/heic`,
                description:
                  "Free online HEIC to JPG and WebP converter. Batch convert iPhone photos, no signup required.",
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
                  ratingCount: "88",
                },
                featureList: [
                  "HEIC to JPG conversion",
                  "HEIC to WebP conversion",
                  "Batch conversion",
                  "Up to 20 files (free)",
                  "Browser-based",
                  "No file upload",
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Why does iPhone save photos as HEIC?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Apple chose HEIC (High Efficiency Image Container) as the default format starting with iOS 11 because HEIC files are roughly half the size of equivalent JPEG files at the same visual quality. This saves significant storage space on iPhones, which often have limited storage."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is HEIC better quality than JPG?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "At the same file size, HEIC offers better quality than JPG because it uses more modern compression technology. However, JPG has been the industry standard for decades and is universally compatible. For sharing and web use, JPG is still the safer choice."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I convert HEIC to JPG without losing quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SammaPix converts HEIC to JPG with an adjustable quality slider (60-100%). At 85% quality (the default), the result is visually indistinguishable from the original while maintaining a smaller file size. For maximum quality preservation, use the 95-100% setting."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can Windows open HEIC files?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Windows 10 and 11 can open HEIC files natively through the Photos app, but many older versions and third-party software cannot. For maximum compatibility across all devices and software, converting HEIC to JPG or PNG is recommended."
                    }
                  }
                ]
              },
              {
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
                    name: "HEIC Converter",
                    item: `${APP_URL}/tools/heic`,
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
