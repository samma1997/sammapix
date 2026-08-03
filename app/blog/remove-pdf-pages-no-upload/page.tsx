import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Remove Pages from a PDF Without Uploading It [2026]",
  description:
    "Delete pages from contracts, bank statements, and confidential PDFs entirely in your browser. No upload, no server, no signup. Remove blank pages, duplicate scans, or sensitive sections privately. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/remove-pdf-pages-no-upload`,
  },
  keywords: [
    "remove pdf pages no upload",
    "delete pdf pages private",
    "remove blank page from pdf",
    "remove pages from pdf without uploading",
    "delete pdf pages browser",
    "remove pdf pages privately",
    "pdf page remover no upload",
    "remove page from pdf free no upload",
    "delete blank pages pdf",
    "remove page from pdf without uploading",
  ],
  openGraph: {
    title: "Remove Pages from a PDF Without Uploading It [2026]",
    description:
      "Remove pages from confidential PDFs — contracts, bank statements, medical records — entirely in your browser. No file ever reaches a server. Thumbnail preview, range selection. Free.",
    url: `${APP_URL}/blog/remove-pdf-pages-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Pages from a PDF Without Uploading It [2026]",
    description:
      "Remove PDF pages 100% in your browser. Contracts, bank statements, medical PDFs — no upload, no server. Verifiable in DevTools. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/remove-pdf-pages-no-upload`;
const POST_TITLE = "Remove Pages from a PDF Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "When you upload a PDF to remove pages, the entire document — including the pages you want to keep private — goes to a server you do not control. SammaPix Remove PDF Pages runs entirely in your browser via pdf.js and pdf-lib. This guide explains the privacy risk of upload-based tools, how browser-based page deletion works for confidential documents, and how to remove blank pages or duplicate scans without any upload.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "remove pdf pages no upload",
    "delete pdf pages private",
    "remove blank page from pdf",
    "remove pages from pdf without uploading",
    "pdf page remover no upload",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove Pages from a PDF Without Uploading It",
  description:
    "Delete pages from a confidential PDF entirely in your browser with no file upload, using SammaPix Remove PDF Pages powered by pdf.js and pdf-lib. Suitable for contracts, bank statements, medical documents, and any PDF containing private data.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Remove PDF Pages (browser-based, no upload, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Remove PDF Pages tool",
      text: "Go to sammapix.com/tools/remove-pdf-pages in any modern browser. No account or signup required. The tool runs entirely in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your confidential PDF",
      text: "Drag the PDF onto the dropzone or click to browse for it. pdf.js renders a thumbnail of every page locally in your browser. The file is not sent anywhere — it stays in browser memory.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Identify and select the pages to remove",
      text: "Click the thumbnails of the pages you want to delete (they highlight in red). Use the range input to type expressions like 1, 3, 5-7 for fast bulk selection. Blank pages are visible as white thumbnails.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Verify your selection before deleting",
      text: "Review the highlighted pages in the thumbnail grid. Confirm only the intended pages are marked for deletion. Click any highlighted thumbnail to deselect it if you changed your mind.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Remove Pages and download",
      text: "pdf-lib reconstructs the PDF with only the retained pages, preserving all their content intact. Download the result directly from browser memory. No network request is made at any point in this process.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is uploading a PDF to remove pages a privacy risk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you upload a PDF to remove pages using an online service, the entire document is sent to their server — including the pages you are trying to keep private. For a contract where you want to strip an internal pricing annex before sharing with a client, or a bank statement where you want to remove account numbers from certain pages, uploading the full document to iLovePDF, Smallpdf, or Adobe Acrobat Online exposes every page of your document to a third party. Their privacy policy may say they delete files after one hour, but you have no way to verify that, and you cannot know whether the file transited other infrastructure during processing. Browser-based tools like SammaPix Remove PDF Pages eliminate this risk by never sending the file anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove blank pages from a PDF without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open sammapix.com/tools/remove-pdf-pages in your browser and drop the PDF. pdf.js renders a thumbnail of every page. Blank pages appear as white thumbnails — they are immediately distinguishable from content pages. Click each blank page thumbnail to select it (it highlights in red), then click Remove Pages. The output PDF has only the content pages. Nothing was uploaded at any point. For documents produced by double-sided scanners where every other page is blank, you can type 2, 4, 6, 8... in the range field to select them all at once.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove pages from a contract or bank statement privately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This is the primary use case that motivated building a no-upload page removal tool. Drop the document into sammapix.com/tools/remove-pdf-pages. pdf.js renders thumbnails of every page in your browser — no data leaves your device. Select the pages you want to remove. pdf-lib reconstructs the document without those pages, copying all retained content exactly as-is. Download the result. You can verify no upload occurred by watching the Network inspector (F12) in your browser — you will see zero outgoing requests carrying your file during the entire process.",
      },
    },
    {
      "@type": "Question",
      name: "Does removing pages from a PDF affect the quality or text of the remaining pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib removes pages by copying all retained page objects directly from the original PDF into a new document. This is a structural operation — no content is rendered, recompressed, or re-encoded. Text in retained pages stays selectable and searchable. Images remain at their original resolution. Vector graphics stay crisp. Hyperlinks remain active. The only thing that changes is the page count — the deleted pages are gone and the page order renumbers accordingly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove duplicate scanned pages from a PDF without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop the scanned PDF into sammapix.com/tools/remove-pdf-pages. The thumbnail grid shows a miniature preview of every page side by side. Duplicate pages — produced when a scanner passes the same physical page twice — are immediately visible because they look identical to the adjacent page. Click the duplicate thumbnail to select it, then click Remove Pages. If there are multiple duplicates throughout a long document, you can type their page numbers separated by commas in the range field (e.g. 4, 9, 15) to select them all in one step.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use a browser-based PDF page remover for confidential documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and it is safer than upload-based alternatives for confidential documents. When the tool runs entirely in your browser via pdf.js and pdf-lib, your document never leaves your device. The file is read by the FileReader browser API (a standard local file API with no network access), processed in memory, and the output is downloaded via a blob URL. No data is transmitted. You can independently verify this by opening your browser developer tools (F12), going to the Network tab, dropping your PDF into the tool, and confirming that no outgoing network requests carry your file. This verification method is what security researchers use to audit privacy claims of browser-based tools.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Remove PDF Pages and PDF Split?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remove PDF Pages and PDF Split are complementary tools that approach page management from opposite directions. Remove PDF Pages is deletion-first: you select the pages to remove, and the tool keeps everything else. PDF Split is extraction-first: you specify the pages or ranges you want to keep, and the tool produces a separate PDF from those pages. For most page deletion tasks — removing blank pages, stripping a cover page, deleting a duplicate scan — Remove PDF Pages is the more natural choice. For extracting a specific section from a long report (e.g. pages 12 to 18 of a 60-page document), PDF Split is typically faster because you specify what you want rather than what you do not want. Both tools run entirely in your browser with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove pages from a password-protected PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib cannot modify a password-protected or encrypted PDF without the owner password, because the file content is encrypted and the library cannot write changes to the page structure. If your PDF is protected with an open password (required to view the file), you need to unlock it first using a tool that supports owner-password decryption. If the PDF is only restricted (printing or editing disabled but no open password), the SammaPix PDF Unlock tool may be able to remove those restrictions first, after which you can use Remove PDF Pages normally.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RemovePdfPagesNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="remove-pdf-pages-no-upload"
        description="When you upload a PDF to remove pages, the entire document goes to a server — including the pages you want to keep private. For contracts, bank statements, medical records, and any document containing personal data, that is a real risk. SammaPix Remove PDF Pages runs entirely in your browser via pdf.js and pdf-lib. Your file never leaves your device."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-privacy-risk", title: "The privacy risk of uploading PDFs to remove pages" },
          { id: "how-it-works", title: "How browser-based page removal works: no upload, no server" },
          { id: "confidential-documents", title: "Removing pages from contracts and confidential documents" },
          { id: "remove-blank-pages", title: "How to remove blank pages from a scanned PDF" },
          { id: "duplicate-scans", title: "Removing duplicate scanned pages" },
          { id: "step-by-step", title: "How to remove PDF pages without uploading, step by step" },
          { id: "quality-guarantee", title: "Retained pages are never degraded: text, quality, links" },
          { id: "comparison-table", title: "Upload-based vs browser-based: what actually happens to your file" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other private PDF tools in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Uploading a PDF to remove pages sends the entire document — including the pages you want to keep private — to a server you do not control. This matters for contracts, bank statements, and medical records.",
          "SammaPix Remove PDF Pages runs entirely in your browser using pdf.js (thumbnails) and pdf-lib (rebuilding the PDF). Your file never leaves your device.",
          "The thumbnail grid shows every page visually — blank pages appear as white thumbnails, duplicates are immediately recognizable. Click to select pages to delete, or type a range like 2, 5-7.",
          "pdf-lib copies retained page objects directly from the original — no rasterization, no re-encoding. Text stays selectable, quality is identical to the original.",
          "You can verify no upload happens by watching the Network inspector in DevTools during the entire process.",
          "Related tools: PDF Split, PDF Rotate, PDF Compress, PDF Merge — all browser-based, no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing a confidential contract document, representing the privacy concern of needing to remove pages from sensitive PDFs without uploading them to a third-party server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Removing pages from a confidential PDF should not require uploading the entire document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Remove PDF pages privately — no upload, no server
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Remove PDF Pages runs entirely in your browser via pdf.js and pdf-lib. Thumbnail grid for
              visual selection. Range input for bulk deletion (e.g. 2, 5-7). Retained pages are never degraded.
              Suitable for contracts, bank statements, and confidential reports. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/remove-pdf-pages"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Remove PDF Pages Privately, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-split"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The privacy risk ────────────────────────────────── */}

        <h2 id="the-privacy-risk" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The privacy risk of uploading PDFs to remove pages
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The task seems simple. A 15-page employment contract has two pages of internal salary banding that should not go to the candidate. You want to delete those pages before emailing the document. You search for &quot;remove pages from PDF&quot; and land on a popular tool. You upload the contract. You delete the pages. You download the result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The problem: the entire 15-page contract was just uploaded to a server. Including the 13 pages you wanted to keep. The salary bands you were trying to protect. The candidate&apos;s personal data. The company letterhead. All of it, transmitted to infrastructure you have no visibility into, held for an unverifiable amount of time, potentially transiting additional systems during processing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not an edge case. It is the default behavior of every major upload-based PDF tool — iLovePDF, Smallpdf, Sejda, and Adobe Acrobat Online included. Their privacy policies specify deletion windows, but you cannot audit those claims. For documents with legal, financial, or personal data, this model is structurally incompatible with document privacy.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The categories of documents where this matters most
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Contracts and NDAs</strong> — often contain pricing, compensation, and clause language that should not be visible outside a specific audience
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bank statements</strong> — contain account numbers, transaction history, and balance information
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Medical records and insurance documents</strong> — protected health information that is subject to regulatory requirements in most jurisdictions
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Legal briefs and court filings</strong> — contain client-privileged information even in the pages that are not being deleted
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">HR documents</strong> — performance reviews, salary offers, disciplinary records
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Tax returns and financial statements</strong> — multiple years of income, asset, and liability information
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For all of these, I built{" "}
          <Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">SammaPix Remove PDF Pages</Link>{" "}
          to run the entire process inside your browser, with zero network transmission of your document at any step.
        </p>

        {/* ── Section 2: How it works ────────────────────────────────────── */}

        <h2 id="how-it-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based page removal works: no upload, no server
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool uses two open-source libraries that run entirely in your browser:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a></strong> — Mozilla&apos;s open-source PDF renderer, used in Firefox and Chrome&apos;s built-in PDF viewer. It renders a thumbnail of every page in your document into small canvas elements so you can see what you are working with before deleting anything.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a></strong> — an open-source JavaScript library for reading and writing PDF files. It handles the actual page removal: loading the original PDF, identifying the pages to retain, copying them into a new PDF document, and producing the output bytes.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF onto the tool, your browser reads it using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API that reads local files without any network access. The file stays in browser memory throughout the entire workflow. The output PDF is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from that memory. Zero network requests carry your file at any point.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a claim you have to accept on trust. It is independently verifiable using your browser&apos;s built-in developer tools — the Network inspector will show you exactly zero outgoing requests carrying your file. We cover the verification steps in detail below.
        </p>

        {/* ── Section 3: Confidential documents ────────────────────────── */}

        <h2 id="confidential-documents" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Removing pages from contracts and confidential documents
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common reason to remove pages from a PDF while preserving privacy is to create a shareable version of a confidential document — stripping sections that should not be visible to the recipient while keeping everything else intact.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contracts: removing internal annexes
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A service agreement may have a main body intended for the client and an internal Exhibit A with your cost structure. Drop the contract into the tool, click the thumbnail of the Exhibit A page(s), and remove them. The output PDF has the main contract intact — text selectable, signatures visible, formatting preserved — without the pricing annex.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Bank statements: removing specific months or account sections
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A lender asks for three months of bank statements. Your annual statement PDF covers 12 months. You need to extract only the relevant months without uploading your full year of transaction history. Type the page range for the three months you need to keep, use Select All to mark everything, then deselect those pages. The output contains only the requested months.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Medical records: removing pages not relevant to the current referral
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A patient referral letter is appended to a 20-page medical record PDF. The specialist needs only pages 1 through 4 (the referral and current diagnosis). Remove pages 5 through 20 by typing <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">5-20</code> in the range field. The output contains only the relevant referral pages, and the historical medication history and test results from earlier years remain on your device only.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Remove PDF pages without uploading — for confidential documents</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Contracts, bank statements, medical records — processed entirely in your browser. No upload, no server,
            verifiable in DevTools. Thumbnail grid + range selection. Retained pages never degraded. Free.
          </p>
          <Link
            href="/tools/remove-pdf-pages"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Remove PDF Pages, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Remove blank pages ─────────────────────────────── */}

        <h2 id="remove-blank-pages" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to remove blank pages from a scanned PDF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Blank pages in scanned PDFs are one of the most common reasons people need a page removal tool. They arise in several typical situations:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Double-sided scanning:</strong> automatic document feeders scan both sides of each sheet. For a one-sided 10-page document, the back of each sheet produces a blank page, resulting in a 20-page PDF with 10 blank pages at alternating positions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Blank separator pages:</strong> some filing systems use blank sheets as dividers between document sections. The scanner faithfully captures them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The final blank page in a print-to-PDF:</strong> when a document ends on an even page in a two-up layout, a blank page is appended to complete the spread.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In the thumbnail grid, blank pages appear as entirely white or near-white thumbnails. They stand out immediately from content pages. Here is the fastest approach for each scenario:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Alternating blank pages from double-sided scanning
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If blank pages appear at positions 2, 4, 6, 8, etc. (every even page), type the range expression directly: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">2, 4, 6, 8, 10, 12, 14, 16, 18, 20</code> for a 20-page scan. All blank pages are selected simultaneously. Click Remove Pages.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scattered blank pages at irregular positions
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Scroll through the thumbnail grid and click each white thumbnail individually. If blank pages appear in clusters, use a range expression to cover the cluster: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">3, 7-9, 14</code> would select page 3, pages 7 through 9, and page 14. Combine clicking and range input to cover the full selection efficiently.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Final blank page only
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a single trailing blank page, simply click the last thumbnail in the grid and remove it. This is often the fastest operation the tool performs — under a second for most documents.
        </p>

        {/* ── Section 5: Duplicate scans ────────────────────────────────── */}

        <h2 id="duplicate-scans" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Removing duplicate scanned pages
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Double-feeding — where a scanner pulls two sheets simultaneously and captures the same sheet twice — is a common scanner problem, especially with thin paper or humid conditions. The result is a PDF where one or more pages appear twice in sequence.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The thumbnail grid makes duplicates immediately visible: two adjacent thumbnails look identical. Click the second occurrence of the duplicate to select it, then click Remove Pages. The output PDF has the page once, in the correct position.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For long scan batches with multiple double-feed events at different positions, note the page numbers of all duplicates while scrolling the thumbnail grid, then enter them all in the range field at once. For example, if pages 6, 13, and 22 are all duplicates of the preceding page, type <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">6, 13, 22</code> and remove them in one step.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to remove PDF pages without uploading, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/remove-pdf-pages</strong> in Chrome, Safari, Firefox, or Edge. No account required. The page loads the pdf.js and pdf-lib libraries from the SammaPix CDN — these are the only network requests that occur.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders thumbnails of all pages. The file stays in browser memory. No upload occurs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Identify the pages to remove.</strong> Blank pages appear as white thumbnails. Duplicates look identical to an adjacent page. Pages containing sensitive sections you want to strip are identifiable by their content preview.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select pages to delete</strong> by clicking thumbnails or entering a range (e.g. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">1, 3, 5-7</code>). Selected pages highlight in red. Both methods compose — type a range then click additional thumbnails.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the red thumbnails</strong> before committing. Click a red thumbnail to deselect it if needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Remove Pages.</strong> pdf-lib builds the output PDF from all non-selected pages, copying their content exactly. The process is instant for most documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The output PDF is served as a Blob from browser memory. No network request occurs. The file never left your device.
          </li>
        </ol>

        {/* ── Section 7: Quality guarantee ──────────────────────────────── */}

        <h2 id="quality-guarantee" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Retained pages are never degraded: text, quality, links
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some tools remove pages by rasterizing the retained pages — converting them to pixel images — and reassembling a new PDF from those images. This is a destructive approach that causes text to become unselectable, degrades image quality through JPEG re-encoding, and increases or decreases the file size unpredictably.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Remove PDF Pages uses the correct approach. pdf-lib copies the raw page data directly from the original PDF structure into the new document. No intermediate rendering occurs. This means:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rasterization-based tools</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix (pdf-lib page copy)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text selectability</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Lost. Text is embedded in the rasterized image.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Preserved. Text data is carried forward unchanged.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Image quality</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Degraded. Pages are re-encoded as JPEG.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Identical to original. Page data is copied, not re-encoded.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Vector graphics</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Rasterized. Charts and logos become pixel images.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Preserved. Vector data is unchanged.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Hyperlinks</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Broken. Links are embedded in the rasterized image.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Active. Link annotations are copied with the page.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unpredictable. May increase or decrease significantly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Proportional. Output is roughly the proportion of kept pages.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Upload-based vs browser-based: what actually happens to your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an honest, side-by-side breakdown of what happens to your document in each approach:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Step</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (iLovePDF, Smallpdf, etc.)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File drop</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Entire PDF is transmitted to a remote server via HTTPS POST.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PDF is read locally by the FileReader API. No network call.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Thumbnail rendering</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Server renders and sends thumbnails back to your browser.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">pdf.js renders thumbnails in your browser from local data. No network call.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page deletion</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Server processes the PDF and sends the result back. Full document was on the server throughout.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">pdf-lib reconstructs the PDF in browser memory. No network call.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Download</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Server sends the processed file to your browser.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Browser serves the output from a blob URL in memory. No network call.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Where is your file after the process?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">On a remote server, pending their deletion policy. Unverifiable.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">In your browser memory only, released when you close the tab.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your confidential PDF never leaves your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload at any step. Verifiable via DevTools Network inspector. Retained pages: text selectable,
            quality identical to original. Free, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/remove-pdf-pages"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Remove PDF Pages, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/delete-pages-from-pdf-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              All methods to delete PDF pages <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Privacy claims are only meaningful if they are independently verifiable. Here is exactly how to audit this tool&apos;s network behavior:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable Develop menu in Settings → Advanced first.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear any existing entries so you start with a clean slate.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF into the tool.</strong> Watch the Network panel as pdf.js renders the thumbnails.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select pages and click Remove Pages.</strong> Continue watching the Network panel through the deletion and download step.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only Network activity visible is the initial page load (JavaScript, CSS, fonts). During thumbnail rendering, page selection, deletion, and download — the panel shows zero outgoing requests. Your file was processed and served entirely from browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same audit technique used by independent privacy researchers to test browser-based tools. The result is binary and conclusive: either network requests carry your file, or they do not.
        </p>

        {/* ── Section 10: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other private PDF tools in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a complete set of browser-based PDF tools for handling confidential documents. All run locally with no upload and no server:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete any page or page range. Thumbnail grid + range input. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages or page ranges into a separate PDF. The complement to Remove Pages. See the full guide at{" "}
            <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">Split a PDF privately, no upload</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages permanently. The rotation is saved into the PDF file via the page Rotate property. Full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size for scanned and image-heavy PDFs. Best for sharing large scan bundles. Full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Useful when assembling a final document from edited sections. Full guide at{" "}
            <Link href="/blog/merge-pdfs-privately-no-upload" className="text-[#6366F1] hover:underline">Merge PDFs privately, no upload</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser — no upload required</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Remove pages, split, rotate, compress, and merge PDFs without uploading them anywhere.
            All tools run locally via pdf.js and pdf-lib. No server. No signup. Suitable for confidential documents.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/remove-pdf-pages"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove Pages <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-merge"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
