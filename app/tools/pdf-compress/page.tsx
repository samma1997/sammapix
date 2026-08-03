import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Minimize2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfCompressClient from "@/components/tools/PdfCompressClient";
import PdfCompressHeroDemo from "@/components/tools/PdfCompressHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-compress`;

export const metadata: Metadata = {
  title: "Compress PDF Free Online — No Upload, No Server",
  description:
    "Compress PDF files directly in your browser. No upload, no server, 100% private. Choose Low/Medium/High quality and see before/after file size. Shrink PDF for email.",
  keywords: [
    "compress pdf",
    "compress pdf online",
    "reduce pdf size",
    "shrink pdf",
    "compress pdf for email",
    "make pdf smaller",
    "pdf compressor no upload",
    "reduce pdf file size",
    "compress pdf free",
    "pdf size reducer",
    "compress pdf in browser",
    "pdf compressor online free",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Compress PDF Free Online — No Upload, No Server",
    description:
      "Reduce PDF file size in your browser. Choose Low/Medium/High quality, see before/after size. 100% private — your file never leaves your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Compress Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Free Online — No Upload",
    description: "Shrink PDF file size locally in your browser. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Minimize2 className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Three quality levels",
    description:
      "Choose Low (maximum compression), Medium (balanced quality and size), or High (minimal loss). Each level targets a different JPEG quality and DPI to suit your use case.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Compression runs entirely in your browser using pdf.js and pdf-lib. Your PDF never leaves your device, is never stored on a server, and requires no account or login.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Before/after size display",
    description:
      "See the exact original size, compressed size, and percentage reduction after compression, so you can compare and pick the right quality level before downloading.",
  },
];

export default function PdfCompressPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Compress" contentId="pdf-compress" />

      {/* Hero, split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#EF444415", border: "1px solid #EF444430" }}
                aria-hidden="true"
              >
                <Minimize2 className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Compress PDF. Reduce File Size Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Shrink a PDF by re-encoding each page as a JPEG image at your chosen quality level.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs locally in your browser. See the before/after file size instantly.
            </p>

            <div className="mb-3 px-3 py-2.5 rounded-md border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E]">
              <p className="text-xs text-[#92400E] dark:text-[#FCD34D] leading-relaxed">
                <strong>Honest note:</strong> compression works by rasterizing pages to JPEG images.
                Text becomes image-based (no longer selectable or searchable). Best for scans and
                image-heavy PDFs. For text-only PDFs, try{" "}
                <Link href="/tools/pdf-split" className="underline hover:text-[#78350F]">
                  PDF Split
                </Link>{" "}
                to extract only the pages you need.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Low / Medium / High quality
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Before/after size display
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Up to 100 MB
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <PdfCompressHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfCompressClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Compress"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool reads the page count instantly, no upload to any server.",
          },
          {
            title: "Choose a quality level",
            desc: "Pick Low for maximum compression (smallest file), Medium for a balanced result, or High for minimal visible change. A note explains that text becomes image-based after compression.",
          },
          {
            title: "Download the compressed PDF",
            desc: "Click Compress PDF and download the result directly. The before/after file size and percentage reduction are shown so you can compare.",
          },
        ]}
        proTip={{
          text: "Need to reduce size further without compression? Split the PDF to keep only the pages you need.",
          linkLabel: "See PDF Split too",
          linkHref: "/tools/pdf-split",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why compress PDFs in your browser?
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

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            When should you compress a PDF?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PDF file size becomes a problem when emailing attachments (most providers cap at 10-25 MB),
            uploading to web forms, or sharing through messaging apps. PDFs that contain many
            high-resolution photos or scanned documents are the biggest candidates: compressing at
            Medium quality often reduces them by 50-80% without a visible difference on screen.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why not use a server-based PDF compressor?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Most online PDF compressors upload your file to a remote server, which is a serious
            privacy concern for contracts, medical records, tax documents, or legal filings.
            SammaPix compresses PDFs entirely in your browser tab using{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf.js</code>{" "}
            and{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>
            . Nothing ever leaves your machine.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does compression keep text selectable?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No, and we are upfront about this. The compression approach used here renders each PDF
            page to a canvas via pdf.js, encodes it as a JPEG at the chosen quality, and rebuilds
            the PDF with pdf-lib. The result is a smaller file, but text is embedded as an image,
            not as selectable glyphs. This is identical to how most free PDF compressors work.
            For scans and image-heavy presentations this is perfectly fine. For text documents
            where you need to copy text, consider removing pages you do not need using{" "}
            <Link href="/tools/pdf-split" className="underline hover:text-[#525252]">PDF Split</Link>{" "}
            or merging only the pages you want with{" "}
            <Link href="/tools/pdf-merge" className="underline hover:text-[#525252]">PDF Merge</Link>.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-compress" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Compress a PDF File",
            description:
              "Compress a PDF to reduce its file size directly in your browser with SammaPix. No upload required, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Compress",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. The tool reads the page count instantly in your browser.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose a quality level",
                text: "Select Low for maximum compression, Medium for a balanced result, or High for minimal quality loss.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the compressed PDF",
                text: "Click Compress PDF. The before/after file size and reduction percentage are shown. Download the compressed file directly.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix PDF Compress",
                description:
                  "Compress a PDF to reduce its file size in your browser. Choose Low/Medium/High quality, see before/after size, download directly. No upload, no server.",
                url: TOOL_URL,
                applicationCategory: "BusinessApplication",
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
                  url: APP_URL,
                },
                featureList: [
                  "Low / Medium / High quality presets",
                  "Before/after file size comparison",
                  "Client-side, no upload, no server",
                  "Supports PDFs up to 100 MB",
                  "Removes PDF metadata for privacy",
                  "Instant download, no signup required",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF compressor free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can compress any PDF up to 100 MB at any quality level.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix compresses PDFs entirely in your browser using pdf.js and pdf-lib. Your document never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does compression keep text selectable?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Compression works by rasterizing each page to a JPEG image and rebuilding the PDF. Text becomes image-based and is no longer selectable or searchable. This is the standard trade-off with this type of compression and is clearly stated in the UI.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much will my PDF shrink?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "It depends on the content. PDFs with many high-resolution photos or scans typically compress 50-80% at Medium quality. Text-only PDFs may see less reduction since the text is already efficient but gets converted to JPEG.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the file size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per source PDF. Large files may be slower to process because rendering happens inside your browser tab. Keep the tab active during compression.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between Low, Medium, and High quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Low uses JPEG quality 50% at 96 DPI for maximum compression. Medium uses 70% at 120 DPI for a balance of size and quality. High uses 85% at 150 DPI for minimal visible loss. Medium is the default and works well for most documents.",
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
                    item: APP_URL,
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
                    name: "Compress PDF",
                    item: TOOL_URL,
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
