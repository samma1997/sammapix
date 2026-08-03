import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Watermark a PDF Without Uploading It [2026]",
  description:
    "Add a CONFIDENTIAL, DRAFT, or logo watermark to a PDF entirely in your browser via pdf-lib. No file upload, no server, no signup. Diagonal tile, opacity control, text or image. Verify with DevTools. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/watermark-pdf-no-upload`,
  },
  keywords: [
    "watermark pdf no upload",
    "add logo to pdf",
    "draft stamp pdf",
    "watermark pdf without uploading",
    "confidential watermark pdf",
    "pdf watermark browser",
    "watermark pdf private",
    "stamp pdf without uploading",
    "add logo to pdf free",
    "watermark pdf locally",
    "pdf watermark client side",
    "watermark pdf contract",
    "draft watermark pdf without server",
    "confidential pdf stamp no upload",
    "watermark pdf free no signup",
  ],
  openGraph: {
    title: "Watermark a PDF Without Uploading It [2026]",
    description:
      "Add CONFIDENTIAL, DRAFT, or a logo to every PDF page in your browser. No upload, no server, no signup. The right tool for contracts, invoices, and reserved documents. Free.",
    url: `${APP_URL}/blog/watermark-pdf-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark a PDF Without Uploading It [2026]",
    description:
      "Watermark PDFs 100% in your browser via pdf-lib. No upload, no server. Text or logo, diagonal tile, opacity control. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/watermark-pdf-no-upload`;
const POST_TITLE = "Watermark a PDF Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Contracts, NDAs, financial projections, and draft proposals are exactly the documents you should not upload to an unknown server. SammaPix PDF Watermark stamps text (CONFIDENTIAL, DRAFT, custom) or a logo image onto every page entirely in your browser using pdf-lib. No upload, no server, no signup. This guide covers the privacy argument, how the client-side watermarking works, specific workflows for confidential business documents, and how to verify no upload happens via DevTools.",
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
    "watermark pdf no upload",
    "add logo to pdf",
    "draft stamp pdf",
    "watermark pdf without uploading",
    "confidential watermark pdf",
    "pdf watermark browser",
    "stamp pdf locally",
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
  name: "How to Watermark a PDF Without Uploading It",
  description:
    "Stamp a PDF with CONFIDENTIAL, DRAFT, a company logo, or any custom watermark in your browser with no file upload, using SammaPix PDF Watermark powered by pdf-lib. Your document never leaves your device.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Watermark (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Watermark tool",
      text: "Go to sammapix.com/tools/pdf-watermark in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Load your PDF",
      text: "Drag the PDF onto the dropzone or click to browse. The file is read locally by your browser using the FileReader API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose Text or Image watermark",
      text: "For CONFIDENTIAL, DRAFT, or a name: select Text. Type your label, set font size, color, and rotation. For a company logo: select Image, upload a PNG with transparent background.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set opacity and enable tile",
      text: "Set opacity to 25 to 40 percent for standard CONFIDENTIAL documents. Enable Tile to repeat the stamp diagonally across the full page. Set rotation to 45 degrees for the standard diagonal pattern.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Apply the watermark",
      text: "Click Apply Watermark. pdf-lib appends a new content layer on every page of the PDF. Processing is local and nearly instant.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download the watermarked PDF",
      text: "Click Download. The file is served from browser memory. Your document never touched a remote server.",
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
      name: "Why is it important to watermark a PDF without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The documents most commonly watermarked are the most sensitive ones: draft contracts, NDAs, M&A term sheets, board presentations, financial projections, and medical records. These are exactly the documents you should not send to a third-party server. Popular online PDF tools (iLovePDF, Smallpdf, Adobe Acrobat Online) upload your file for server-side processing. Their privacy policies typically say the file is deleted within a few hours, but you have no way to verify this. A browser-based tool like SammaPix PDF Watermark processes the document entirely in your browser using pdf-lib. Your file never leaves your device at any point. This is verifiable by watching the browser Network inspector — you will see zero outgoing file transfers during the operation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add a DRAFT watermark to a PDF contract without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to sammapix.com/tools/pdf-watermark. Drop your PDF onto the tool. Select Text watermark and type DRAFT. Set rotation to 45 degrees. Set opacity to 30 percent. Enable Tile so the stamp repeats across the full page. Choose a color — dark gray (#555555) is the conventional choice for draft documents in business contexts. Click Apply Watermark. Every page of the contract will be stamped with the diagonal repeating DRAFT pattern. Click Download. Your document was processed entirely in your browser using pdf-lib. Nothing was uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add my company logo to a PDF without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select Image watermark in SammaPix PDF Watermark. Upload your logo as a PNG with a transparent background — this ensures only the logo pixels appear, not a white rectangle. Set the width to control logo size on each page. Set opacity to 15 to 25 percent for a subtle branding watermark on proposals and client reports. If you want a repeating logo pattern across each page, enable Tile. Click Apply Watermark. pdf-lib embeds your logo as a PDF XObject on every page. The result is a branded PDF where each page carries your logo without the document content being obscured. Your file stayed on your device throughout the process.",
      },
    },
    {
      "@type": "Question",
      name: "Does watermarking a PDF change its file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For text watermarks, the file size increase is minimal — text content in a PDF is stored as compact vector instructions in the content stream. Adding a text watermark layer typically adds a few kilobytes per page, which is negligible compared to most PDF sizes. For image watermarks, the logo image is embedded once as a PDF XObject resource and referenced on each page — it is not duplicated per page. A typical logo PNG of 50 to 100 KB adds approximately that amount to the total file size regardless of page count. Tiled watermarks do not increase file size further compared to single-instance watermarks, because pdf-lib uses the same resource reference for each tile.",
      },
    },
    {
      "@type": "Question",
      name: "Can I watermark a password-protected PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. If the PDF is encrypted with a user password (open password), you cannot open or modify it without the password — including adding a watermark. You would need to unlock it first using the SammaPix PDF Unlock tool, then apply the watermark, then optionally re-protect it with a new password using PDF Protect. If the PDF has owner restrictions (printing, copying, editing restrictions) but no open password — meaning you can view it but cannot edit it — browser-based tools operating on the client side may or may not be able to modify it depending on the restriction flags set in the file.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on how many pages I can watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no page count limit imposed by the tool. The practical limit is your device's available memory, since the entire PDF is held in browser memory during processing. For most documents under 200 pages, processing is fast and trouble-free on any modern device. Very large PDFs (500+ pages) may be slower — processing each page requires a content stream update — but the tool handles them as long as your device has sufficient RAM. There is no server involved, so there is no server-side file size or page count cap.",
      },
    },
    {
      "@type": "Question",
      name: "What text should I use for a watermark on a confidential business document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common text watermarks in business and legal contexts: CONFIDENTIAL (for documents restricted to specific recipients), DRAFT (for documents in progress that are not yet approved or final), COPY (to distinguish copies from originals in regulated industries), SAMPLE (for preview versions of pricing sheets, catalogs, or proposals shared before purchase), FOR REVIEW (for documents circulated for feedback before finalization), NOT FOR DISTRIBUTION (for internal presentations or proprietary reports), and ATTORNEY-CLIENT PRIVILEGED (for legal communications protected by privilege). The text should be concise — one to four words — to remain readable at smaller sizes and in the tiled pattern.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WatermarkPdfNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="watermark-pdf-no-upload"
        description="Contracts, NDAs, financial projections, and draft proposals are exactly the documents you should not upload to an unknown server just to get a CONFIDENTIAL stamp. SammaPix PDF Watermark adds text (CONFIDENTIAL, DRAFT, your name) or a logo image to every page of a PDF entirely in your browser — no upload, no signup, no server. Here is why it matters, how it works, and how to do it correctly for confidential business documents."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={10}
        headings={[
          { id: "the-privacy-contradiction", title: "The privacy contradiction: why uploading confidential PDFs to watermark them is backward" },
          { id: "how-client-side-watermark-works", title: "How client-side PDF watermarking works via pdf-lib" },
          { id: "workflows-for-confidential-documents", title: "Practical workflows for confidential business documents" },
          { id: "text-watermark-settings", title: "Text watermark: optimal settings for each document type" },
          { id: "logo-watermark-workflow", title: "Logo watermark: branding without the upload risk" },
          { id: "tile-vs-single", title: "Tiled vs single-position watermark: when to use each" },
          { id: "step-by-step", title: "How to watermark a PDF without uploading it, step by step" },
          { id: "combine-with-password", title: "Combining a watermark with password protection" },
          { id: "comparison-table", title: "Browser-based vs server-based: privacy comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other privacy-first PDF tools in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The documents most commonly watermarked — contracts, NDAs, financial projections, board reports — are exactly the ones you should not upload to a third-party server.",
          "SammaPix PDF Watermark runs entirely in your browser using pdf-lib. Zero network requests carry your file during processing.",
          "Supports text watermarks (CONFIDENTIAL, DRAFT, custom) and image watermarks (logo PNG with transparency) on every page.",
          "Diagonal tiled CONFIDENTIAL stamps: 45-degree rotation, 25 to 40 percent opacity, tile enabled — the standard legal and business pattern.",
          "Verifiable: open DevTools, go to Network tab, process the PDF. You will see zero outgoing file transfers.",
          "Combine with PDF Protect (password encryption) for dual-layer security on the most sensitive documents.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person working on legal documents at a desk with a laptop, representing the need to watermark confidential contracts and business documents without uploading them to unknown servers."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Contracts, NDAs, and financial records are the documents most often watermarked — and the ones you should least want to upload to a third-party server.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Watermark your PDF right now, your document stays on your device
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Watermark runs entirely in your browser via pdf-lib. CONFIDENTIAL, DRAFT, or logo image.
              Diagonal tile, opacity 0 to 100%, every page. No upload, no server, no signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-watermark"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Watermark, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-protect"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Password Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: The privacy contradiction ─────────────────────── */}

        <h2 id="the-privacy-contradiction" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The privacy contradiction: why uploading confidential PDFs to watermark them is backward
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Watermarking a document as CONFIDENTIAL signals that it contains sensitive information intended for specific recipients only. So the standard workflow of using iLovePDF, Smallpdf, or Adobe Acrobat Online to stamp it — which requires uploading the document to a server you do not control — is a fundamental contradiction.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Consider what kinds of documents typically get watermarked in a business context:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Draft contracts and term sheets.</strong> Sent to prospective parties before final execution. Often contain commercially sensitive terms, pricing, and conditions that should not be visible to third parties.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Non-disclosure agreements.</strong> The very purpose of an NDA is to protect confidential information. Uploading one to a free online tool before distributing it exposes the parties, scope, and terms to that tool&apos;s infrastructure.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Financial projections and board presentations.</strong> Revenue forecasts, investor decks, and internal financial reports are among the most sensitive documents a company produces. They are also among the most commonly watermarked.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Medical records and personal documents.</strong> Patient summaries, insurance documents, and legal correspondence marked CONFIDENTIAL contain personal information regulated by privacy laws in most jurisdictions.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every major online PDF tool states in its privacy policy that uploaded files are deleted within 1 to 24 hours. None of them let you independently verify this. The only way to be certain your document was not accessed, indexed, or retained is to never upload it in the first place.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">SammaPix PDF Watermark</Link>{" "}
          specifically for this situation. The watermark is applied entirely in your browser using{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          — your document never leaves your device at any point.
        </p>

        {/* ── Section 2: How client-side watermarking works ────────────── */}

        <h2 id="how-client-side-watermark-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How client-side PDF watermarking works via pdf-lib
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          pdf-lib is an open-source JavaScript library for reading and writing PDF documents directly in the browser. It was designed from the ground up to run in browser environments without a server component. Here is what happens when you apply a watermark:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the file using the FileReader API.</strong> The FileReader API is a W3C standard for reading local files without a network connection. The PDF bytes are loaded into browser memory as an ArrayBuffer. Nothing is sent anywhere.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib parses the document structure.</strong> The library reads the PDF&apos;s internal cross-reference table and reconstructs the page tree — the list of pages and their content. The existing content (text, images, annotations, form fields) is preserved exactly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A new graphics content stream is added to each page.</strong> For text watermarks, pdf-lib writes PDF drawing commands: set font, set color, set transformation matrix (position and rotation), draw text at each position. For image watermarks, the logo is embedded as a PDF XObject (reusable image resource) and referenced from each page&apos;s content stream.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Opacity is set via PDF ExtGState.</strong> An Extended Graphics State object is added to the page resources, specifying the fill opacity for the watermark layer. This is the standard PDF mechanism for semi-transparent content — the same one used by Adobe Acrobat.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is serialized and downloaded.</strong> pdf-lib writes the updated document back to bytes, wraps it in a Blob, and the browser triggers a download via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL. Your original file is unchanged. The watermarked version exists only as a download.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process is local. You can disconnect from the internet after loading the tool page and the watermarking will still work. This is not a marketing claim — it is verifiable architecture: the tool has no API endpoint that receives files, because there is none.
        </p>

        {/* ── Section 3: Workflows for confidential documents ──────────── */}

        <h2 id="workflows-for-confidential-documents" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Practical workflows for confidential business documents
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Different document types call for slightly different watermark configurations. Here are the most common workflows:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Draft contracts and term sheets
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use DRAFT as the watermark text. The purpose is to prevent a preliminary version from being treated as a final, binding document. The watermark should be clearly visible but not obstruct the terms. Recommended settings:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Text: DRAFT</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Rotation: 45 degrees</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Opacity: 25 to 35 percent</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Color: dark gray (#555555) or dark blue (#003399)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Tile: yes</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Font size: 60 to 80pt for standard Letter/A4 documents</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Board presentations and financial reports
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use CONFIDENTIAL. These documents are typically shared with a defined group of stakeholders and should not be forwarded or distributed. The watermark reinforces this legally and visually:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Text: CONFIDENTIAL</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Rotation: 45 degrees</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Opacity: 30 to 40 percent</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Color: dark red (#CC0000) for strong visual impact, or dark gray (#444444) for subtler presentation documents</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Tile: yes</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Font size: 48 to 72pt</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quotations and pricing sheets shared before purchase
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use SAMPLE or FOR REVIEW. These documents may be shared freely with prospects but should not be mistaken for final, binding commercial offers. A lighter watermark is appropriate:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Text: SAMPLE or FOR REVIEW</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Rotation: 30 to 45 degrees</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Opacity: 20 to 25 percent</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Color: light gray (#888888) or brand color</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Tile: yes or single centered</li>
        </ul>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Watermark your confidential PDF now, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            CONFIDENTIAL, DRAFT, or custom text. Logo image with transparency. Diagonal tile, opacity control. No upload. No signup. Free.
          </p>
          <Link
            href="/tools/pdf-watermark"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Watermark, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Text watermark settings ───────────────────────── */}

        <h2 id="text-watermark-settings" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text watermark: optimal settings for each document type
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Text watermarks are vector-based when written by pdf-lib — they are drawn using PDF text operators, not rasterized to an image. This means they are perfectly sharp at any zoom level and at any print resolution. Here is a reference guide for the most common configurations:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Document type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Watermark text</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Opacity</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Draft contract / NDA</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">DRAFT</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 to 35%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark gray #555555</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Board report / M&A document</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CONFIDENTIAL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">30 to 40%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark red #CC0000</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Pricing sheet / product catalog</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SAMPLE</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 25%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Light gray #888888</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Research / IP document</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">NOT FOR DISTRIBUTION</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">35 to 50%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark gray #333333</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Portfolio / presentation</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">FOR REVIEW</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">15 to 25%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Brand color or dark gray</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 5: Logo watermark workflow ───────────────────────── */}

        <h2 id="logo-watermark-workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Logo watermark: branding without the upload risk
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding your company logo to client-facing PDFs is a standard branding practice for agencies, consultants, and service businesses. Every page of a proposal or report bearing your logo communicates professional ownership and reduces the risk of the document being repurposed without attribution.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Prepare the logo correctly
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The critical requirement is a PNG with a transparent background. Without transparency, the logo appears in a white rectangle over the page content. If your logo file is a JPG:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Export a PNG version from Figma, Illustrator, or Canva (File — Export — PNG with transparent background).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Use{" "}
            <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
            to strip the white background from a JPG logo and get a transparent PNG — entirely in your browser, no upload.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Typical logo watermark configuration
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Width:</strong> set to 20 to 30 percent of the page width for a centered branding watermark. For a footer-style stamp, use a narrower width.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Opacity:</strong> 15 to 20 percent for subtle branding on text-heavy documents. 25 to 35 percent for image-heavy brochures where the watermark needs to be visible over photos.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rotation:</strong> 0 degrees for a horizontally positioned logo. 45 degrees if you want a diagonal branded pattern (less common for logos, more common for text).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Tile:</strong> disabled for a single centered logo per page (most professional). Enabled for a repeating pattern (stronger ownership signal).
          </li>
        </ul>

        {/* ── Section 6: Tile vs single ─────────────────────────────────── */}

        <h2 id="tile-vs-single" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Tiled vs single-position watermark: when to use each
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The choice between a single centered watermark and a repeating tiled pattern is a practical security decision, not just an aesthetic one.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Single-position watermark: center or footer
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A single watermark placed at the center of the page is easy to screenshot around. A recipient can crop to the text area and avoid including the centered watermark in their capture. Single-position is appropriate for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Branding on professionally shared documents where the risk of misuse is low.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Reports and proposals where a visible centered logo communicates ownership without competing with the content.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Footer watermarks (small, at the bottom of each page) that function more as attribution than deterrence.</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tiled watermark: the full-page repeating pattern
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Tiling repeats the watermark at regular intervals across the entire page, covering it in a grid of stamps. Because every portion of every page carries the watermark, no meaningful content area can be captured without including it. Tiling is appropriate for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">CONFIDENTIAL and DRAFT documents where the watermark must be undeniably present on every digital capture, printed page, and partial screenshot.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Documents distributed to multiple parties where you want to make casual redistribution visually obvious.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">High-value content (research, IP, creative work) where unauthorized reproduction should be immediately visible.</li>
        </ul>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your document stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. CONFIDENTIAL, DRAFT, or logo image. Single or tiled. Full opacity control. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-watermark"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Watermark, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-watermark-to-pdf-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full PDF watermark guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to watermark a PDF without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The complete process, from opening the tool to downloading the watermarked document:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-watermark</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone.</strong> The file is loaded into browser memory via the FileReader API. You will see the page count and file name displayed. Nothing is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select Text watermark</strong> for CONFIDENTIAL, DRAFT, or any custom label. Type your text in the input field.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set font size.</strong> Start with 60pt for standard A4 or Letter documents. Adjust down for smaller text or up for a more prominent stamp.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a color</strong> using the color picker. Red (#CC0000) for CONFIDENTIAL, dark gray (#555555) for DRAFT, or any custom HEX value.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set rotation to 45 degrees</strong> for the standard diagonal pattern. Use 0 for horizontal.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set opacity.</strong> 25 to 40 percent for CONFIDENTIAL or DRAFT. Lower for subtle branding.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable Tile</strong> to repeat the stamp across the full page.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply Watermark.</strong> pdf-lib processes every page. Near-instant for most documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The watermarked PDF is served from browser memory. Zero network activity occurred during processing.
          </li>
        </ol>

        {/* ── Section 8: Combining watermark with password ───────────── */}

        <h2 id="combine-with-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Combining a watermark with password protection
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the most sensitive documents, a watermark alone may not be sufficient. Consider pairing it with password protection for a dual-layer approach:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Watermark first, then protect.</strong> Apply the watermark using SammaPix PDF Watermark. Then open the watermarked output in{" "}
            <Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link>{" "}
            to add a password. Recipients must enter the password to open the document, and if they share it with unauthorized parties, the CONFIDENTIAL stamp is visible the moment it opens.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Both tools run in the browser.</strong> Both steps are fully client-side — no upload at either stage. The entire workflow, from original document to password-protected watermarked PDF, happens on your device. Covered in detail in{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password protect a PDF online without uploading it</Link>.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This combination is appropriate for M&A documents, investor materials, and medical records — any document where you want both access control (password) and clear status labeling (watermark).
        </p>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs server-based: privacy comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison focused on the privacy dimensions most relevant to confidential document watermarking:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (iLovePDF, Smallpdf, Adobe Online)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Document leaves your device?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Uploaded via HTTPS to their servers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Processed entirely in browser memory.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Verifiable?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. You cannot verify their deletion claim.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Open DevTools Network tab and watch: zero outgoing file transfer.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">GDPR / data compliance</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">You are a data controller sending personal data to a processor. Requires DPA assessment.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No data leaves your device. No processor involvement. No DPA required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works without internet</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, after initial page load.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans capped at 5 to 25 MB.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Device memory limit only. No artificial cap.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The claim that no upload happens is verifiable by anyone in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu in Settings first.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Clear any existing requests by clicking the clear button.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Load your PDF and apply the watermark.</strong> Watch the Network panel throughout the entire operation — loading the file, configuring settings, applying the watermark, and downloading the result.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests to any remote server.</strong> You will see the initial page asset requests (JavaScript, CSS). After that: no POST requests, no PUT requests, no blob uploads. The watermarked PDF is served directly from the browser as a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL download.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This verification method is the same one security researchers use to audit tools that claim to be privacy-safe. It is conclusive: if no network request is made during file processing and download, the file did not leave your device.
        </p>

        {/* ── Section 11: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other privacy-first PDF tools in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every SammaPix PDF tool follows the same principle: no upload, no server, entirely in your browser. Here is when to use each alongside watermarking:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add a password so only authorized recipients can open the document. The natural companion to watermarking for the most sensitive documents. Covered in{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password protect a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">PDF Page Numbers</Link></strong>: add page numbers before watermarking to make documents easier to navigate and reference. Covered in{" "}
            <Link href="/blog/add-page-numbers-to-pdf-online" className="text-[#6366F1] hover:underline">How to add page numbers to a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size for email delivery after watermarking. Covered in{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: strip the background from a JPG logo before using it as an image watermark — also runs in your browser with no upload.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser, all private</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Watermark, protect, compress, and number PDFs without uploading them anywhere.
            All tools run locally in your browser. No server. No signup. No watermark from us.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-watermark"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              PDF Watermark <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-page-numbers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Page Numbers <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
