import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Hash, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfPageNumbersClient from "@/components/tools/PdfPageNumbersClient";
import PdfPageNumbersHeroDemo from "@/components/tools/PdfPageNumbersHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-page-numbers`;

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Free: No Upload",
  description:
    "Add page numbers to a PDF in your browser. Choose position (bottom-center, top-right...), format (1, 1/N, Page 1 of N), font size and margin. No upload, 100% private.",
  keywords: [
    "add page numbers to pdf",
    "number pdf pages",
    "insert page numbers pdf",
    "pdf page numbering online",
    "add pagination to pdf",
    "pdf page numbers no upload",
    "number pdf pages online free",
    "add page numbers to pdf online",
    "pdf numbering tool",
    "page number pdf browser",
    "add folio numbers to pdf",
    "pdf page counter online",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Add Page Numbers to PDF Free: No Upload",
    description:
      "Add page numbers to every page of a PDF in your browser. Choose position, format and font size. 100% private — your file never leaves your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Add Page Numbers to PDF Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Page Numbers to PDF Free — No Upload",
    description: "Add page numbers to every page of a PDF locally. Choose position and format. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Hash className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "6 positions, 3 formats",
    description:
      "Place page numbers at bottom-center, bottom-right, bottom-left, top-center, top-right or top-left. Choose between plain number (1), number/total (1 / 12) or full label (Page 1 of 12).",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs locally via pdf-lib. Your PDF never leaves your device, is never stored on a server, and requires no account or login to use.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Text stays selectable",
    description:
      "Page numbers are drawn as real text directly onto the PDF pages. The rest of your document is unchanged — text remains selectable, hyperlinks stay active.",
  },
];

export default function PdfPageNumbersPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Page Numbers" contentId="pdf-page-numbers" />

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
                <Hash className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Add Page Numbers to PDF. Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Insert page numbers on every page of a PDF directly in your browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs locally using pdf-lib. Choose position, format, start number
              and font size, then download immediately.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                6 positions
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                3 number formats
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
            <PdfPageNumbersHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfPageNumbersClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Page Numbers"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool reads the file instantly in your browser — no upload to any server.",
          },
          {
            title: "Choose position and format",
            desc: "Pick one of 6 positions (bottom-center, top-right, etc.) and one of 3 formats: plain number, number/total or full Page X of N label. Adjust font size and margin if needed.",
          },
          {
            title: "Download the numbered PDF",
            desc: "Click Add Page Numbers. Page numbers are stamped as real text on every page and the file downloads instantly as a PDF.",
          },
        ]}
        proTip={{
          text: "Want to reduce the file size of your numbered PDF too? Try PDF Compress after.",
          linkLabel: "See PDF Compress",
          linkHref: "/tools/pdf-compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why add page numbers in your browser?
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
            How page numbering works in a PDF
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PDFs do not natively embed visible page numbers on each page — the number you see in a
            PDF reader&apos;s toolbar is just a viewer count, not text on the page itself. To have a
            visible number printed at the bottom or top of every page (e.g. for a report or legal
            document), that text must be drawn explicitly onto each page. This tool uses{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            to do exactly that: it embeds Helvetica (a standard PDF font), iterates over every page,
            and calls{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">page.drawText()</code>{" "}
            at the computed X/Y coordinates.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which format should I choose?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Number only (1, 2, 3&hellip;)</strong>
            {" "}is ideal for clean reports and books where the reader knows the total page count.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Number / Total (1 / 12)</strong>
            {" "}is the most common format for business documents and makes it easy to spot if pages are
            missing when printing.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Page X of N</strong>
            {" "}is the most explicit and suits formal or legal documents.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does adding page numbers affect the existing content?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No. The tool draws new text on top of each page without modifying any existing content.
            Original text remains fully selectable and searchable, hyperlinks stay active, and
            embedded images are untouched. The only change is the small number label added at the
            chosen margin position. If the margin is too small for your document, increase it in
            the Options panel to avoid overlapping existing content near the page edge.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-page-numbers" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add Page Numbers to a PDF",
            description:
              "Add visible page numbers to every page of a PDF directly in your browser with SammaPix. Choose position and format. No upload required, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Page Numbers",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. The tool reads the file instantly in your browser, no server upload.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose position and format",
                text: "Select one of 6 positions and one of 3 formats. Optionally adjust start number, font size and margin.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the numbered PDF",
                text: "Click Add Page Numbers and download your PDF with page numbers stamped on every page.",
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
                "@type": ["SoftwareApplication", "BusinessApplication"],
                name: "SammaPix PDF Page Numbers",
                description:
                  "Add page numbers to every page of a PDF in your browser. Choose from 6 positions, 3 formats, custom start number and font size. No upload, no server, 100% private.",
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
                  "6 page number positions (top and bottom, left/center/right)",
                  "3 formats: number only, number/total, Page X of N",
                  "Custom start number and font size",
                  "Client-side, no upload, no server",
                  "Supports PDFs up to 100 MB",
                  "Instant download, no signup required",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF page numbering tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can number any PDF up to 100 MB.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix processes PDFs entirely in your browser using the pdf-lib library. Your document never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What positions can I place page numbers?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You can place page numbers in 6 positions: bottom-center (default), bottom-right, bottom-left, top-center, top-right and top-left. A margin control lets you push numbers further from the page edge.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What number formats are available?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Three formats: number only (1, 2, 3), number/total (1 / 12, 2 / 12) and Page X of N (Page 1 of 12). You can also set a custom start number, for example starting at 0 or 5.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will adding page numbers change the existing PDF content?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. The tool draws text on top of each page without modifying existing content. Original text stays selectable, hyperlinks remain active and images are untouched.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the file size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per PDF. Processing happens inside your browser tab, so keep the tab active while the file is being processed.",
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
                    name: "Add Page Numbers to PDF",
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
