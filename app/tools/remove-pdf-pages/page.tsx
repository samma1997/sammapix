import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Trash2, Shield, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import RemovePdfPagesClient from "@/components/tools/RemovePdfPagesClient";
import RemovePdfPagesHeroDemo from "@/components/tools/RemovePdfPagesHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/remove-pdf-pages`;

export const metadata: Metadata = {
  title: "Delete PDF Pages Online Free: No Upload",
  description:
    "Remove or delete pages from a PDF in your browser. Click thumbnails to mark pages, then delete them instantly. No upload, no signup, 100% private.",
  keywords: [
    "delete pdf pages",
    "remove pages from pdf",
    "delete pages from pdf online",
    "remove pdf page free",
    "pdf page remover",
    "no upload pdf editor",
    "delete page from pdf",
    "remove pdf pages online free",
    "pdf page deleter",
    "extract pages pdf",
    "pdf delete page browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Delete PDF Pages Online Free — No Upload",
    description:
      "Remove any pages from a PDF in your browser. Click thumbnails to mark pages for deletion. Instant, private, no signup.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Delete PDF Pages Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages Online Free — No Upload",
    description: "Remove pages from a PDF in your browser. Instant, private, no signup.",
  },
};

const features = [
  {
    icon: <Trash2 className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Click to mark, delete instantly",
    description:
      "Thumbnails of every page are rendered in your browser. Click any page to mark it for removal. You can also type a range like \"2, 5-7\" to select multiple pages at once.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private — no upload",
    description:
      "Everything runs in your browser using pdf-lib and pdf.js. Your PDF never leaves your device and is never stored on any server. No account required.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "At least 1 page is guaranteed",
    description:
      "The tool prevents you from accidentally removing all pages. If you mark every page, the Remove button stays disabled and an honest warning appears.",
  },
];

export default function RemovePdfPagesPage() {
  return (
    <main>
      <MetaViewContent contentName="Delete PDF Pages" contentId="remove-pdf-pages" />

      {/* Hero — split layout */}
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
                <Trash2 className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Delete PDF Pages. No Upload.
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Upload a PDF and click any page thumbnail to mark it for deletion.
              Type a range like{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">2, 5-7</code>{" "}
              to mark multiple pages at once. Then click{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Remove pages</strong> — a new PDF with only the pages you kept downloads instantly. Runs entirely in your browser with{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">no upload</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Visual thumbnail selection
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Range input (e.g. 2, 5-7)
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
            <RemovePdfPagesHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <RemovePdfPagesClient />

      {/* How to use */}
      <HowToUse
        toolName="Delete PDF Pages"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF (up to 100 MB) onto the upload area or click to browse. Thumbnails of every page are rendered instantly in your browser.",
          },
          {
            title: "Mark pages for deletion",
            desc: "Click any page thumbnail to mark it with a red overlay. Click again to unmark. Or type a range like \"3, 7-9\" in the quick-select box and click Add.",
          },
          {
            title: "Remove and download",
            desc: "Click Remove N pages. A new PDF containing only the pages you kept downloads immediately. At least 1 page must remain.",
          },
        ]}
        proTip={{
          text: "Need to reduce the file size of the resulting PDF? Use PDF Compress — it works great after removing pages.",
          linkLabel: "See PDF Compress",
          linkHref: "/tools/pdf-compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why delete PDF pages in your browser?
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
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
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
            When do you need to delete pages from a PDF?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The most common scenario is a scanned document where some pages were included by mistake —
            blank pages, duplicate scans, or confidential pages that should not be shared.
            Another frequent use case is trimming a long report before sending it to a client:
            you keep only the relevant sections and discard the rest.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does deleting pages from a PDF work in a browser?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            This tool uses{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            to parse the source PDF, copy every page you chose to keep into a new document
            (using <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">copyPages</code>),
            and save it. Page thumbnails are rendered by{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf.js</code>{" "}
            locally in a canvas element. The entire process happens inside your browser tab —
            no bytes are ever sent to a server.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is the difference between deleting pages and splitting a PDF?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Deleting pages removes specific pages and gives you a single PDF with everything else.
            Splitting a PDF produces multiple separate files — one per page or per range.
            If you want to extract a subset of pages into their own file, use{" "}
            <Link href="/tools/pdf-split" className="underline hover:text-[#525252]">
              PDF Split
            </Link>
            . If you want to combine multiple PDFs into one, use{" "}
            <Link href="/tools/pdf-merge" className="underline hover:text-[#525252]">
              PDF Merge
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedTools toolId="remove-pdf-pages" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Delete Pages from a PDF Online",
            description:
              "Remove specific pages from a PDF in your browser with SammaPix. No upload required, 100% private, instant download.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Delete PDF Pages",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. Thumbnails of every page are rendered instantly in your browser.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Mark pages for deletion",
                text: "Click any page thumbnail to mark it with a red overlay. Or type a page range like \"2, 5-7\" in the quick-select input.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Remove and download",
                text: "Click Remove N pages. A new PDF with only the remaining pages downloads immediately to your device.",
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
                name: "SammaPix Delete PDF Pages",
                description:
                  "Remove or delete pages from a PDF in your browser. Click thumbnails to mark pages, or type a range. Instant, private, no upload.",
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
                  "Visual thumbnail selection — click to mark pages",
                  "Range input shortcut (e.g. 2, 5-7)",
                  "At least 1 page guaranteed to remain",
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
                    name: "Is this PDF page remover free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can delete pages from any PDF up to 100 MB.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Everything runs in your browser using pdf-lib and pdf.js. Your PDF never leaves your device and is never stored anywhere.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I remove multiple pages at once?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Click as many thumbnails as you want to mark them for deletion. You can also type a range like \"2, 5-7\" in the quick-select box to mark several pages at once.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens if I try to delete all pages?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The Remove button is disabled and a warning appears. At least 1 page must remain in the output PDF. This prevents you from creating an empty file by mistake.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will removing pages reduce the file size?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The output file contains only the pages you kept, so it is proportionally smaller. For further reduction, use PDF Compress after removing pages.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between deleting pages and splitting a PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Deleting pages removes specific pages and keeps the rest in a single PDF. Splitting produces multiple separate files — one per page or per range. Use PDF Split to extract a subset into its own file.",
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
                    name: "Delete PDF Pages",
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
