import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import WordToPdfClient from "@/components/tools/WordToPdfClient";
import WordToPdfHeroDemo from "@/components/tools/WordToPdfHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const TOOL_URL = `${APP_URL}/tools/word-to-pdf`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Word to PDF. Convert DOCX Free, No Upload",
  description:
    "Convert Word documents (.docx) to PDF entirely in your browser. No file upload, no server, no account. Best-effort formatting fidelity for standard documents. Free.",
  keywords: [
    "word to pdf",
    "docx to pdf",
    "convert word to pdf free",
    "word to pdf no upload",
    "docx to pdf converter",
    "word document to pdf",
    "convert docx to pdf online",
    "word to pdf converter free",
    "offline word to pdf",
    "word to pdf no account",
    "word file to pdf",
    "docx to pdf browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Word to PDF. Convert DOCX Free, No Upload",
    description:
      "Drop a .docx file. It renders in your browser and downloads as a PDF. No file upload, no server processing, no account required. 100% client-side.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF. Convert DOCX Free, No Upload",
    description:
      "Convert .docx files to PDF in your browser. Nothing is ever uploaded. Free, no account.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word to PDF Converter",
  description:
    "Convert Word (.docx) documents to PDF entirely in the browser using docx-preview and jsPDF. Files are never uploaded to any server. Single-file conversion is free. Batch conversion (multiple files to ZIP) is gated behind a Day Pass.",
  url: TOOL_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
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
    "Convert .docx files to PDF entirely in the browser",
    "No file upload — your document never leaves your device",
    "Best-effort formatting fidelity: paragraphs, headings, lists, inline styles, images",
    "Single-file conversion free, no account required",
    "Batch conversion (multiple DOCX to ZIP of PDFs) with Day Pass",
    "A4 page sizing with pagination",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are my files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your .docx file is read entirely in your browser using the JavaScript File API. The document is rendered and converted to PDF locally. Nothing is sent to any server at any point.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Word to PDF converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, converting a single .docx file to PDF is completely free and requires no account. Batch conversion (multiple .docx files downloaded as a ZIP of PDFs) requires a Day Pass ($2.99 for 24 hours of access to all SammaPix tools).",
      },
    },
    {
      "@type": "Question",
      name: "Will the formatting be preserved perfectly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool achieves best-effort fidelity for standard documents: paragraphs, headings, bold/italic, lists, and embedded images render well. Very complex layouts — heavy tables with merged cells, tracked changes, custom macros, SmartArt, or non-standard fonts — may shift slightly. For pixel-perfect results, use Microsoft Word or LibreOffice to export to PDF directly on your computer.",
      },
    },
    {
      "@type": "Question",
      name: "Does this support .doc files (old Word format)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The converter supports the modern .docx format (Office Open XML, used by Word 2007 and later). The legacy binary .doc format is not supported. If you have a .doc file, open it in Word or LibreOffice and save it as .docx first, then convert here.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from Adobe Acrobat or Smallpdf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adobe Acrobat and Smallpdf upload your file to their servers for processing. This tool converts entirely in your browser — your document never leaves your device. That makes it faster for small documents and completely private.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Day Pass?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Day Pass ($2.99) gives you 24 hours of full Pro access to all SammaPix tools, including batch Word-to-PDF conversion. It is a one-time payment with no subscription. Perfect for occasional heavy use.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Word to PDF", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to convert a Word document to PDF for free online",
  description:
    "Convert a .docx file to a PDF entirely in your browser. No upload, no account required.",
  totalTime: "PT30S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your .docx file",
      text: "Drag and drop a .docx file onto the upload area, or click to open a file picker. The file is read locally in your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Preview the rendered document",
      text: "The tool renders your Word document in the browser using docx-preview. Review the layout. Standard formatting — paragraphs, headings, bold, italic, lists, images — renders well. Very complex tables or SmartArt may shift slightly.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download your PDF",
      text: "Click 'Convert to PDF'. The tool uses jsPDF and html2canvas to paginate the rendered document and produce a downloadable .pdf file. For multiple files, use batch mode (Day Pass required).",
    },
  ],
};

// ── Inline hero icon ──────────────────────────────────────────────────────────

function IconWordToPdfSmall() {
  const accent = "#6366F1";
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="2" width="26" height="34" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <path d="M3 2 L3 36 Q3 38 5 38 L29 38 Q31 38 31 36 L31 8 L25 2 Z" fill={accent} fillOpacity="0.08"/>
      <path d="M25 2 L31 8 L25 8 Z" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="8" y1="15" x2="22" y2="15" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="19" x2="22" y2="19" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="23" x2="18" y2="23" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M29 27 L37 27 M33 24 L37 27 L33 30" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="36" y="30" width="11" height="14" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25"/>
      <text x="41.5" y="40" fontSize="5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">PDF</text>
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WordToPdfPage() {
  return (
    <main>
      <MetaViewContent contentName="Word to PDF" contentId="word-to-pdf" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ============================================================ */}
      {/*  HERO — Split layout                                          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT ── */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <IconWordToPdfSmall />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Word to PDF. Convert DOCX Free, No Upload
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Drop a <strong>.docx</strong> file and get a PDF back, instantly, in your browser.
              Powered by <span className="font-medium text-[#525252] dark:text-[#A3A3A3]">docx-preview</span> for rendering
              and <span className="font-medium text-[#525252] dark:text-[#A3A3A3]">jsPDF</span> for PDF generation.
              Your document never leaves your device.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% in your browser
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Nothing uploaded
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch with Day Pass
              </span>
            </div>

            {/* Internal links to PDF cluster */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: "/tools/pdf-merge", label: "Merge PDF" },
                { href: "/tools/pdf-compress", label: "Compress PDF" },
                { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
                { href: "/tools/txt-to-pdf", label: "TXT to PDF" },
                { href: "/tools/pdf-sign", label: "Sign PDF" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-2.5 py-1 text-xs text-[#6366F1] border border-[#6366F1]/30 rounded-md hover:bg-[#6366F1]/8 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT: animated demo ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <WordToPdfHeroDemo />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL                                                         */}
      {/* ============================================================ */}
      <div className="pt-3">
        <WordToPdfClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="word-to-pdf" />
      </div>

      {/* ============================================================ */}
      {/*  SEO content                                                  */}
      {/* ============================================================ */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              How it works
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              When you drop a <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">.docx</code> file,
              the tool reads it locally via the browser File API. It then uses{" "}
              <span className="font-medium">docx-preview</span> (a JavaScript library that parses Office Open XML)
              to render the document as HTML in a hidden container. Finally, <span className="font-medium">jsPDF</span>{" "}
              combined with <span className="font-medium">html2canvas</span> paginates the rendered HTML and produces
              a downloadable multi-page PDF. No bytes are ever sent to a remote server.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              This approach gives the best available fidelity for a purely client-side converter. Standard formatting
              (headings, paragraphs, bold, italic, underline, bullet lists, numbered lists, and embedded images)
              renders well. Very complex layouts such as multi-column tables with merged cells, tracked changes,
              SmartArt graphics, or non-standard embedded fonts may shift slightly compared to a native Word export.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Why not use Adobe or Smallpdf?
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Adobe Acrobat online and Smallpdf upload your document to their servers to convert it.
              If your file contains confidential content — contracts, CVs, financial statements, medical records —
              that means your data leaves your device and is processed on a third-party server.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              This tool converts entirely in your browser. The document stays on your device from start to finish.
              Close the tab and nothing remains anywhere except on your own machine.
            </p>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Share a document without editable source",
                  desc: "Convert a .docx report or proposal to PDF so the recipient sees exactly what you wrote and cannot accidentally edit it.",
                },
                {
                  title: "Prepare CVs and cover letters",
                  desc: "Word documents can look different on different computers. A PDF ensures your CV formatting is identical for every recruiter.",
                },
                {
                  title: "Convert confidential files privately",
                  desc: "Legal contracts, financial documents, or HR records can be converted without uploading them to any external service.",
                },
                {
                  title: "Batch convert multiple DOCX files",
                  desc: "Drop several .docx files at once and download a ZIP of PDFs. Requires a Day Pass ($2.99 for 24h access to all SammaPix tools).",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related PDF tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              More PDF tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/pdf-merge", label: "Merge PDF", desc: "Combine multiple PDFs into one, drag to reorder" },
                { href: "/tools/pdf-compress", label: "Compress PDF", desc: "Reduce PDF file size, no upload" },
                { href: "/tools/jpg-to-pdf", label: "JPG to PDF", desc: "Merge images into a single PDF" },
                { href: "/tools/txt-to-pdf", label: "TXT to PDF", desc: "Convert plain text to PDF in your browser" },
                { href: "/tools/pdf-sign", label: "Sign PDF", desc: "Add a visual signature to any PDF" },
                { href: "/tools/pdf-protect", label: "Protect PDF", desc: "Password-protect any PDF locally" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
              {faqSchema.mainEntity.map((q) => (
                <details key={q.name} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                    {q.name}
                    <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
