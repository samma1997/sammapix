import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Layers } from "lucide-react";
import Link from "next/link";
import PdfMergeClient from "@/components/tools/PdfMergeClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-merge`;

export const metadata: Metadata = {
  title: "Merge PDF Files — Free, Browser-Based",
  description:
    "Merge multiple PDF files into one online free. Drag to reorder, up to 10 files (50 on Pro), no signup, no upload. 100% in your browser — files stay private.",
  keywords: [
    "merge pdf",
    "combine pdf",
    "join pdf files",
    "pdf merge online free",
    "pdf combiner",
    "merge pdfs online",
    "free pdf merge",
    "concatenate pdfs",
    "pdf joiner",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Merge PDF Files — Free, Browser-Based",
    description:
      "Combine multiple PDFs into one. Drag to reorder, no upload, no signup.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Merge Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files — Free, Browser-Based",
    description: "Combine PDFs into one file. Drag to reorder, 100% private.",
  },
};

const features = [
  {
    icon: <Layers className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Drag to reorder",
    description:
      "Upload any number of PDFs, then drag rows to set the final page order. Remove individual files before merging.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Merging runs locally via the pdf-lib library. Your documents never leave your device — no upload, no tracking.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Preserves structure",
    description:
      "Page layouts, fonts, images and most form fields are kept intact. Encrypted PDFs are read-only supported (best-effort).",
  },
];

export default function PdfMergePage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Merge" contentId="pdf-merge" />
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#DC262615", border: "1px solid #DC262630" }}
            aria-hidden="true"
          >
            <FileText
              className="h-4.5 w-4.5"
              style={{ color: "#DC2626", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Merge PDF Files
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix PDF Merge combines multiple PDF files into one document instantly in your
          browser. Drag to reorder, no upload to any server, no signup required.
        </p>
      </div>

      {/* Tool */}
      <PdfMergeClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Merge"
        steps={[
          {
            title: "Drop your PDF files",
            desc: "Drag and drop PDF files onto the upload area — up to 10 per batch (50 on Pro). Max 100 MB each.",
          },
          {
            title: "Drag rows to reorder",
            desc: "Move files up or down to set the final order in the merged document. Remove anything you don't need.",
          },
          {
            title: "Merge and download",
            desc: "Click Merge. All pages are combined into a single PDF locally in your browser. Download the result.",
          },
        ]}
        proTip={{
          text: "Merging lots of big PDFs? Clear the tab cache first, or upgrade to Pro for 50 files per batch.",
          linkLabel: "Convert JPGs to a single PDF",
          linkHref: "/tools/jpg-to-pdf",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why merge PDFs in your browser?
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
            When should you merge PDFs?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Combining PDFs is common for invoicing, contract packs, expense reports, legal
            submissions and e-books. Rather than email five attachments that the recipient has to
            reassemble, you ship one document where the order is already correct. Merged PDFs
            also bookmark and print more reliably than separate files.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why avoid server-based tools?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Most free online PDF mergers upload your files to a remote server. That means
            sensitive documents (contracts, medical records, tax returns) temporarily sit on
            someone else&apos;s disk. SammaPix runs{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            entirely in your browser tab — nothing ever leaves your machine.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does it preserve form fields, bookmarks and encryption?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Text, images, page layout and most form fields survive the merge cleanly. Document-level
            bookmarks from the source files are not always preserved (a limitation of client-side
            PDF libraries). Password-protected PDFs are loaded with encryption ignored, so the output is
            a plain merged PDF. Don&apos;t upload files you aren&apos;t authorized to unlock.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-merge" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Merge PDF Files",
            description:
              "Combine multiple PDF files into a single document with SammaPix. Drag to reorder, runs fully client-side, no upload.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Merge",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF files",
                text: "Drag and drop PDF files onto the upload area. You can merge up to 10 files on the Free plan and 50 on Pro.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Reorder files",
                text: "Drag rows up or down to set the final page order. Remove files you don't want in the output.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Merge and download",
                text: "Click Merge. All pages are combined into one PDF locally in your browser. Download the merged result.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQ + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix PDF Merge",
                description:
                  "Merge multiple PDF files into a single document directly in your browser. Reorder by drag, no upload.",
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
                  "Merge multiple PDFs into one",
                  "Drag-and-drop reorder",
                  "Up to 10 files (50 on Pro)",
                  "Up to 100 MB per file",
                  "Client-side — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF merger really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark. Free plan supports up to 10 PDFs per batch and 100 MB per file. Pro lifts batch to 50.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDFs uploaded anywhere?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix merges PDFs in your browser via pdf-lib. Your documents never leave your device.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I reorder files before merging?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. After upload, drag each row to any position. The final PDF follows the on-screen order. You can also remove individual files before merging.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What about password-protected PDFs?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SammaPix loads PDFs with ignoreEncryption=true so encrypted-for-read documents can be merged. Don't merge PDFs you aren't authorized to open.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is there a size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per file on both plans. Larger documents may be slow because everything is processed in your browser tab.",
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
                    name: "Merge PDF Files",
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
