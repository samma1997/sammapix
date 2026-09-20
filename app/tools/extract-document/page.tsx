import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileSearch, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ExtractDocumentClient from "@/components/tools/ExtractDocumentClient";
import ExtractDocumentHeroDemo from "@/components/tools/ExtractDocumentHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "AI Document Extractor Online Free — Receipts & Invoices to JSON",
  description:
    "Extract structured data from receipts, invoices, and scanned documents in seconds with AI. Upload an image or PDF and get vendor, date, total, and line items as JSON or CSV. Free, no signup needed.",
  keywords: [
    "extract data from receipt",
    "invoice to json",
    "receipt ocr",
    "document data extractor",
    "pdf to structured data",
    "ai receipt reader",
    "invoice parser",
    "receipt scanner",
    "extract invoice data",
    "document ocr free",
    "receipt to spreadsheet",
    "pdf invoice extractor",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/extract-document`,
  },
  openGraph: {
    title: "AI Document Extractor Online Free — Receipts & Invoices to JSON",
    description:
      "Extract structured data from receipts, invoices, and scanned documents in seconds with AI. Upload an image or PDF and get vendor, date, total, and line items as JSON or CSV.",
    url: `${APP_URL}/tools/extract-document`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Document Extractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Document Extractor Online Free — Receipts & Invoices to JSON",
    description:
      "Extract structured data from receipts, invoices, and scanned documents in seconds with AI. Upload an image or PDF and get vendor, date, total, and line items as JSON or CSV.",
  },
};

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "Powered by Google Gemini",
    description:
      "SammaPix sends your document to Google Gemini Flash which returns a structured JSON object with vendor, date, currency, subtotal, tax, total, and every line item.",
    highlight: true,
  },
  {
    icon: <FileSearch className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Images & PDFs accepted",
    description:
      "Upload a photo of a paper receipt, a scanned invoice image (JPG, PNG, WebP), or a native PDF — the extractor handles all formats without any conversion step.",
    highlight: false,
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Zero-retention privacy",
    description:
      "Your document is sent to Gemini for extraction and immediately discarded. SammaPix never stores your receipts, invoices, or the extracted data.",
    highlight: false,
  },
];

const faqItems = [
  {
    q: "What document types does the extractor support?",
    a: "The extractor works on receipts, invoices, bills, and any scanned document that contains financial data. It accepts JPEG, PNG, WebP, GIF, AVIF images and PDF files up to 20 MB.",
  },
  {
    q: "What data fields are extracted?",
    a: "The AI extracts: document type, vendor name, date, currency, subtotal, tax, total, and a full line-items table (description, quantity, unit price, amount). Missing fields return null rather than invented values.",
  },
  {
    q: "How many extractions can I do for free?",
    a: "Free accounts get 10 AI credits per day after signing in. Pro accounts unlock 200 per day. Signing in is free and requires no credit card.",
  },
  {
    q: "Are my documents stored on your servers?",
    a: "No. Your document is processed in memory for the duration of the API call and immediately discarded. SammaPix operates a strict zero-retention policy for all AI operations.",
  },
];

export default function ExtractDocumentPage() {
  return (
    <main>
      <MetaViewContent contentName="Document Extractor" contentId="extract-document" />

      {/* Hero — Split layout: text left, animated demo right */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          {/* LEFT: Title + copy + trust badges */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <FileSearch className="h-4 w-4" style={{ color: "#6366F1" }} strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  AI Document Extractor. Free
                </h1>
                <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 uppercase tracking-wide">
                  PRO
                </span>
              </div>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Upload a receipt, invoice, or scanned document &rarr;{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Gemini AI</strong> extracts
              vendor, date, total, and every line item into structured JSON. Export as CSV in one
              click. Only a thumbnail is sent to AI; originals stay on device.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Images &amp; PDFs
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                JSON &amp; CSV export
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Line-item table
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Zero retention
              </span>
            </div>
          </div>

          {/* RIGHT: animated demo */}
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <ExtractDocumentHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <ExtractDocumentClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How AI document extraction works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-md border flex items-center justify-center mb-4 ${
                    f.highlight
                      ? "border-[#C7D2FE] bg-white dark:bg-[#1E1E1E]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]"
                  }`}
                >
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
            Why extract structured data from documents?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Manually re-typing data from receipts and invoices into spreadsheets wastes hours. AI
            document extraction reads the document exactly as a human would — recognizing the vendor,
            date, line items, and totals — and returns a clean, machine-readable JSON object in
            seconds. This structured output feeds directly into accounting software, expense
            management tools, or any custom workflow via CSV.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What makes a good document for extraction?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The clearer the scan or photo, the better the result. A well-lit, straight-on photo of a
            receipt will extract perfectly. Heavily crumpled or blurry scans may yield partial
            results. Native PDFs (digital invoices, not scanned images) produce the most reliable
            structured output because the text is already machine-readable.
          </p>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools toolId="extract-document" />

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
                name: "AI Document Extractor",
                item: `${APP_URL}/tools/extract-document`,
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
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
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
            name: "SammaPix AI Document Extractor",
            description:
              "Extract structured data from receipts, invoices, and scanned documents using Google Gemini AI. Returns vendor, date, currency, totals, and line items as JSON.",
            url: `${APP_URL}/tools/extract-document`,
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
              url: `${APP_URL}`,
            },
            featureList: [
              "Google Gemini AI powered",
              "Receipts and invoices",
              "Images and PDFs",
              "JSON and CSV export",
              "Line-items table",
              "Zero retention",
              "Free tier + Pro",
            ],
          }),
        }}
      />
    </main>
  );
}
