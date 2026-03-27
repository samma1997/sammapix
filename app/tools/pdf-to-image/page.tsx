import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileImage, Layers, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import HowToUse from "@/components/tools/HowToUse";
import PdfToImageClient from "@/components/tools/PdfToImageClient";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "PDF to Image Converter Free Online | JPG PNG WebP | SammaPix",
  description:
    "Convert PDF pages to JPG, PNG, or WebP images. 100% free, browser-based, no upload. Each PDF page becomes a separate high-quality image file.",
  keywords: [
    "pdf to image",
    "pdf to jpg converter",
    "pdf to png",
    "pdf to webp",
    "convert pdf to image online",
    "pdf page to jpg",
    "pdf converter free",
    "pdf to image no signup",
    "pdf to jpg free online",
    "extract images from pdf",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/pdf-to-image`,
  },
  openGraph: {
    title: "PDF to Image Converter Free Online | JPG PNG WebP | SammaPix",
    description:
      "Convert PDF pages to JPG, PNG, or WebP images. 100% free, browser-based, no upload. Each PDF page becomes a separate high-quality image file.",
    url: `${APP_URL}/tools/pdf-to-image`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF to Image Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Converter Free Online | JPG PNG WebP | SammaPix",
    description:
      "Convert PDF pages to JPG, PNG, or WebP images. 100% free, browser-based, no upload. Each PDF page becomes a separate high-quality image file.",
  },
};

// ── Features ──────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <FileImage className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "JPG, PNG, and WebP output",
    description:
      "Choose JPG for maximum compatibility, PNG for lossless text-heavy PDFs, or WebP for ~25% smaller files perfect for web publishing.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "Up to 3x resolution (216dpi)",
    description:
      "Select 1x (72dpi) for quick previews, 2x (144dpi) for standard quality, or 3x (216dpi) for sharp print-ready output.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700 dark:text-gray-400" strokeWidth={1.5} />,
    title: "100% in your browser",
    description:
      "Your PDF never leaves your device. All conversion happens locally using PDF.js. No upload, no server, no privacy risk.",
  },
];


// ── Page ──────────────────────────────────────────────────────────────────────

export default function PdfToImagePage() {
  return (
    <main>
      <MetaViewContent contentName="PDF to Image" contentId="pdf-to-image" />

      {/* ── Hero header ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
            aria-hidden="true"
          >
            <FileImage
              className="h-[18px] w-[18px]"
              style={{ color: "#6366F1" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            PDF to Image Converter
          </h1>
        </div>

        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          Convert every PDF page to JPG, PNG, or WebP. Adjustable resolution and quality.
          Download individually or as a ZIP.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
            100% free
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
            No upload
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
            JPG · PNG · WebP
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
            ZIP download
          </span>
        </div>
      </section>

      {/* Tool */}
      <PdfToImageClient />

      {/* Next step suggestions */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="pdf-to-image" />
        </div>
      </section>

      <HowToUse
        toolName="PDF to Image"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop a PDF file or click to browse. Password-protected and corrupted PDFs are handled gracefully with a clear error message.",
          },
          {
            title: "Choose format and resolution",
            desc: "Select JPG, PNG, or WebP as output. Pick 1x (72dpi) for fast previews, 2x (144dpi) for standard quality, or 3x (216dpi) for print-ready sharpness.",
          },
          {
            title: "Download images",
            desc: "Save each page individually as a numbered image file (page-01.jpg, page-02.jpg...) or download all converted pages as a single ZIP archive.",
          },
        ]}
        proTip={{
          text: "After converting, compress your JPG or PNG images further to optimize file size before publishing.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to convert PDF to images?
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
            Why convert PDF to image?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PDFs are the standard for documents, but images are often far more practical. When you
            need to share a single page in an email, post a document screenshot on social media,
            embed a PDF page in a blog post, or use a page as a product thumbnail, converting PDF
            to JPG or PNG is the right move. Images load universally in every browser, app, and
            operating system without requiring a PDF viewer.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            When to choose JPG vs PNG vs WebP
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> &mdash; </span>
              <span>
                <strong className="text-[#525252] dark:text-[#A3A3A3]">JPG:</strong> Best for
                photos and full-color pages. Smaller file size than PNG. Universal compatibility.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> &mdash; </span>
              <span>
                <strong className="text-[#525252] dark:text-[#A3A3A3]">PNG:</strong> Lossless
                compression. Best for text-heavy PDFs, charts, diagrams, and documents where sharp
                edges and crisp text matter.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> &mdash; </span>
              <span>
                <strong className="text-[#525252] dark:text-[#A3A3A3]">WebP:</strong> Modern
                format supported by all browsers. ~25-34% smaller than JPG at the same quality.
                Ideal for web publishing and e-commerce.
              </span>
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which resolution should I choose?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Resolution (scale) determines how many pixels per PDF unit are rendered. At 1x (72dpi),
            the output is suitable for quick web previews. At 2x (144dpi), you get clean, sharp
            images good for most uses including email and social media. At 3x (216dpi), the output
            is large and crisp enough for printing or professional use.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How SammaPix converts PDF to images
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix uses{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
              PDF.js
            </code>{" "}
            (the open-source PDF renderer maintained by Mozilla) to render each page to an HTML
            canvas element in your browser. The canvas is then exported to your chosen format using
            the browser&apos;s native{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
              toBlob()
            </code>{" "}
            API. Everything runs locally &mdash; your PDF never leaves your computer.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            Password-protected PDFs will show a clear error message. Corrupted files are handled
            gracefully. Free users can convert up to 20 pages per PDF; Pro users can convert up to
            200 pages in a single session.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-to-image" />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix PDF to Image Converter",
                url: `${APP_URL}/tools/pdf-to-image`,
                description:
                  "Free online PDF to JPG, PNG, and WebP converter. Convert each PDF page to a separate image file. No upload, no signup, 100% browser-based.",
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
                  ratingCount: "62",
                },
                featureList: [
                  "PDF to JPG conversion",
                  "PDF to PNG conversion",
                  "PDF to WebP conversion",
                  "Adjustable quality",
                  "1x, 2x, 3x resolution",
                  "Batch ZIP download",
                  "Browser-based",
                  "No file upload",
                  "Password-protected PDF detection",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF to image converter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free users can convert up to 20 PDF pages at once. Pro users can convert up to 200 pages.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does my PDF get uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All conversion happens 100% in your browser using PDF.js. Your PDF never leaves your device.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the best format for converting a PDF to image?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For text-heavy documents, use PNG for lossless quality. For photo-rich PDFs and web use, JPG or WebP offer smaller file sizes. WebP provides the best compression (~25% smaller than JPG) and is supported by all modern browsers.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I convert a password-protected PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Password-protected PDFs cannot be converted without removing the password first. SammaPix will show a clear error message if you attempt to convert a protected PDF.",
                    },
                  },
                ],
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
                    name: "PDF to Image",
                    item: `${APP_URL}/tools/pdf-to-image`,
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
