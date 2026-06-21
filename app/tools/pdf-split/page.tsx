import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Scissors, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfSplitClient from "@/components/tools/PdfSplitClient";
import PdfSplitHeroDemo from "@/components/tools/PdfSplitHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-split`;

export const metadata: Metadata = {
  title: "Split PDF: Extract Pages or Split Into Multiple Files, Free, No Upload",
  description:
    "Split a PDF into individual pages, extract specific pages by range, or divide every N pages, free, no upload, 100% in your browser. No signup required. Separate PDF pages instantly with our private PDF splitter.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "split pdf free",
    "separate pdf pages",
    "pdf splitter no upload",
    "pdf page extractor",
    "split pdf online",
    "break pdf into pages",
    "divide pdf",
    "pdf splitter free",
    "extract pages from pdf",
    "split pdf into multiple files",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Split PDF: Extract Pages or Split Into Multiple Files, Free, No Upload",
    description:
      "Split any PDF into individual pages, extract a page range, or chunk every N pages. Runs 100% in your browser, no upload, no signup.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Split Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF: Extract Pages or Split Into Multiple Files, Free",
    description: "Split or extract PDF pages locally in your browser. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Scissors className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Three split modes",
    description:
      "Split into individual pages, extract a custom range like \"1-3, 5, 8-10\", or divide into equal chunks every N pages. Each mode outputs clean PDFs ready to share.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs locally via pdf-lib. Your document never leaves your device, is never stored on a server, and requires no account or login.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "ZIP download for bulk output",
    description:
      "Splitting 50 pages produces 50 PDFs. They are automatically packaged into a single ZIP archive, one click to download the entire batch.",
  },
];

export default function PdfSplitPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Split" contentId="pdf-split" />

      {/* Hero, Split layout */}
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
                <Scissors className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Split PDF. Extract Pages Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Separate a PDF into individual pages, pull out a specific range, or break it into
              equal chunks.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>{" "}
             , everything runs locally in your browser via pdf-lib. Single-file output downloads
              directly; multiple files are zipped automatically.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Extract any page range
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Split every N pages
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                ZIP batch download
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <PdfSplitHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfSplitClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Split"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to pick one. The tool reads the page count instantly, no upload to any server.",
          },
          {
            title: "Choose a split mode",
            desc: "Pick individual pages (one PDF each), extract a custom page range like \"1-3, 5\", or split every N pages into equal chunks.",
          },
          {
            title: "Download the result",
            desc: "Single output: downloads immediately as a PDF. Multiple outputs: automatically packaged into a ZIP archive with one click.",
          },
        ]}
        proTip={{
          text: "Splitting a 200-page report into single pages? Upgrade to Pro for up to 500 output files and faster ZIP packaging.",
          linkLabel: "See PDF Merge too",
          linkHref: "/tools/pdf-merge",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why split PDFs in your browser?
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
            When should you split a PDF?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Large PDFs are common in legal filings, contracts, academic papers, and financial
            reports. When you need to share only a specific chapter, attach a single invoice from a
            batch statement, or break a 200-page manual into per-topic chunks, splitting is faster
            than asking the sender for individual files. Our tool supports all three workflows:
            pull out an arbitrary range, isolate every page, or chunk by a fixed count.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why not use a server-based PDF splitter?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Most PDF splitters upload your file to a remote server. That&apos;s a serious privacy
            concern for anything sensitive, contracts, medical records, tax documents, or legal
            filings. SammaPix runs{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            entirely in your browser tab. Nothing ever leaves your machine, and there is no account
            required.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does splitting preserve fonts and images?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Yes. The split copies individual page objects from the source document using pdf-lib,
            preserving text, images, vector graphics, and most form fields exactly as they appeared
            in the original. Encrypted PDFs are handled with{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">ignoreEncryption: true</code>{" "}
           , please only split files you are authorized to open.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-split" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Split a PDF File",
            description:
              "Split a PDF into individual pages, extract a page range, or divide every N pages, all in your browser with SammaPix. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Split",
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
                name: "Choose a split mode",
                text: "Select individual pages (one PDF per page), extract a custom range like \"1-3, 5\", or split every N pages into equal chunks.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the result",
                text: "Single-file output downloads immediately. Multiple files are automatically zipped and downloaded as one archive.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix PDF Split",
                description:
                  "Split a PDF into individual pages, extract specific pages by range, or divide into equal chunks, all in the browser, no upload.",
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
                  "Split PDF into individual pages",
                  "Extract custom page ranges (e.g. 1-3, 5, 8-10)",
                  "Split every N pages into equal chunks",
                  "ZIP download for multiple output files",
                  "Up to 50 output files free (500 on Pro)",
                  "Client-side, no upload, no server",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF splitter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. Free plan supports up to 50 output files per split. Pro lifts that to 500.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix splits PDFs in your browser via the pdf-lib library. Your document never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I extract specific pages from a PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Choose the \"Extract specific pages\" mode and type your page range, e.g. \"1-3, 5, 8-10\". The tool produces a single PDF containing exactly those pages in that order.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I split a PDF into individual pages?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Select \"Split into individual pages\". Each page becomes its own PDF file. If there are more than one output file, they are automatically packaged into a ZIP archive for download.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I split a password-protected PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SammaPix loads PDFs with ignoreEncryption=true, so read-protected documents can be split. Please only split documents you are authorized to open.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the file size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per source PDF on both free and Pro plans. Large files may be slower to process because everything happens inside your browser tab.",
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
                    name: "Split PDF",
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
