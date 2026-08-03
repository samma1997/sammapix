import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Organize PDF Pages Without Uploading [2026]",
  description:
    "Organize, move, and rearrange PDF pages entirely in your browser — drag and drop visual thumbnails, no file upload, no server. Powered by pdf.js and pdf-lib. Fix out-of-order scans, reorder contracts, move sections privately. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/organize-pdf-pages-no-upload`,
  },
  keywords: [
    "organize pdf pages",
    "move pdf pages",
    "change pdf page order",
    "organize pdf pages no upload",
    "rearrange pdf pages without uploading",
    "sort pdf pages online free",
    "pdf page organizer",
    "reorder pdf pages without uploading",
    "organize pdf privately",
    "drag and drop pdf pages",
  ],
  openGraph: {
    title: "How to Organize PDF Pages Without Uploading [2026]",
    description:
      "Fix out-of-order scans and reorganize confidential documents entirely in your browser. Drag and drop PDF page thumbnails, no upload, no server. Powered by pdf.js + pdf-lib. Free.",
    url: `${APP_URL}/blog/organize-pdf-pages-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Organize PDF Pages Without Uploading [2026]",
    description:
      "Organize PDF pages 100% in your browser. Drag and drop thumbnail grid. No upload, no server. Fix scans, reorder contracts. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/organize-pdf-pages-no-upload`;
const POST_TITLE = "How to Organize PDF Pages Without Uploading [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF page organization tools upload your file to a remote server. SammaPix PDF Organize works entirely in your browser using pdf.js (for thumbnail previews) and pdf-lib (to reconstruct the PDF in the new order). This guide explains why uploading to organize pages is risky for confidential documents, how browser-based page organization works, and how to use drag and drop or arrow buttons to put out-of-order scan pages and missequenced document sections back into the right order without uploading.",
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
    "organize pdf pages",
    "move pdf pages",
    "change pdf page order",
    "organize pdf pages no upload",
    "rearrange pdf pages without uploading",
    "drag and drop pdf pages",
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
  name: "How to Organize PDF Pages Without Uploading",
  description:
    "Rearrange PDF pages entirely in your browser using SammaPix PDF Organize. Drag and drop thumbnail grid, or use up/down/top/bottom arrow buttons. Powered by pdf.js and pdf-lib. No upload, no server, free. Ideal for out-of-order scans, reordering contracts, and organizing confidential documents privately.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Organize (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Organize tool",
      text: "Go to sammapix.com/tools/pdf-organize in any modern browser. No account or signup required. Your file will not leave your device.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. pdf.js renders a thumbnail of every page so you can see the current order at a glance. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Identify the pages that are out of order",
      text: "Review the thumbnail grid. Each thumbnail shows its current position number and a preview of the page content. Identify which pages need to move and where they should go.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Drag pages into the correct positions",
      text: "Drag any thumbnail to its correct position — other pages shift automatically. Alternatively, use the up, down, move-to-top, or move-to-bottom arrow buttons on each thumbnail for precise single-step control.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Save Order and download",
      text: "When the thumbnail grid shows the correct page sequence, click Save Order. pdf-lib rebuilds the PDF with pages in the exact order shown — preserving all text, images, and quality unchanged. The output downloads directly from browser memory. No network call occurs.",
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
      name: "Is it safe to organize confidential PDF pages online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on the tool. Most online PDF organizers (iLovePDF, Smallpdf, Adobe Acrobat Online) upload your document to a remote server to process it. That means your full file — including any sensitive data — travels over the internet and is held temporarily on servers you do not control. SammaPix PDF Organize is different: the entire process runs in your browser using pdf.js and pdf-lib. Your file never leaves your device. You can verify this by opening the browser Network inspector (F12) and confirming there are no outgoing requests while the tool processes your PDF.",
      },
    },
    {
      "@type": "Question",
      name: "How do I fix a scanned PDF where the pages are in the wrong order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop the scanned PDF into SammaPix PDF Organize. The tool renders a thumbnail of every page, making the disorder immediately visible. Drag each out-of-place thumbnail to its correct position, or use the up, down, top, and bottom arrow buttons for precision. Once the grid shows the correct sequence, click Save Order to download a new PDF with the pages in the right order. The full process usually takes under two minutes for a typical scanned document.",
      },
    },
    {
      "@type": "Question",
      name: "Can I organize PDF pages on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix PDF Organize runs in any modern mobile browser — Chrome for Android, Safari for iOS, Firefox for Android. The drag-and-drop interface works with touch: long-press a thumbnail to pick it up, then drag it to the target position. The arrow buttons also work on touch screens. No app install is required.",
      },
    },
    {
      "@type": "Question",
      name: "Does organizing PDF pages affect the text or images on those pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib copies page objects directly from the original PDF into the new document in the new order. The content of each page — text, images, vector graphics, links, fonts — is preserved exactly as in the original. Reordering only changes the sequence in which pages appear. No content is modified, re-encoded, or rasterized. Text remains selectable and searchable in the output PDF.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between PDF Organize and Remove PDF Pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF Organize rearranges the existing pages into a different order — no pages are added or removed, only their sequence changes. Remove PDF Pages deletes specific pages from the document — the output has fewer pages than the input. The two tools are complementary: you might use PDF Organize to fix the page order of a scanned document, then use Remove PDF Pages to delete any blank or duplicate pages that appeared during scanning.",
      },
    },
    {
      "@type": "Question",
      name: "Can I organize a PDF that is password protected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib cannot modify a password-protected or encrypted PDF without the owner password, because the page structure is encrypted and cannot be rewritten. If your PDF requires a password to open, you need to remove that password first — you can use the SammaPix PDF Unlock tool if you know the owner password — and then open the unlocked version in PDF Organize.",
      },
    },
    {
      "@type": "Question",
      name: "How many pages can I reorder at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial page limit. The practical constraint is your device memory, since the entire PDF and its thumbnail renderings are held in browser memory. For most documents — including long contract bundles, multi-section reports, and scan batches — this works without issues on any modern device. Very large PDFs (several hundred megabytes) may render thumbnails more slowly on low-RAM devices.",
      },
    },
    {
      "@type": "Question",
      name: "Does the tool work if my internet connection drops after loading the page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once the page has loaded (including the pdf.js and pdf-lib JavaScript libraries), the tool works entirely offline. You can drop your PDF, rearrange pages, and download the result with no active internet connection. This is another consequence of the client-side architecture: the processing happens in your browser, not on a remote server, so no network connectivity is needed after the initial page load.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OrganizePdfPagesNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="organize-pdf-pages-no-upload"
        description="When you organize PDF pages using iLovePDF or Smallpdf, your full document uploads to a server you do not control. For out-of-order scans, reordered contracts, and confidential reports, that is unacceptable. SammaPix PDF Organize runs entirely in your browser — drag and drop thumbnail grid, no file upload, no server. Here is exactly how it works."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={9}
        headings={[
          { id: "why-upload-is-a-problem", title: "Why uploading to organize PDF pages is a privacy problem" },
          { id: "how-client-side-organize-works", title: "How client-side PDF page organization works" },
          { id: "visual-thumbnail-drag-drop", title: "Visual drag-and-drop: organizing pages you can see" },
          { id: "fixing-out-of-order-scans", title: "Fixing out-of-order scans: the most common use case" },
          { id: "reordering-confidential-documents", title: "Reordering confidential documents without uploading" },
          { id: "step-by-step", title: "How to organize PDF pages without uploading, step by step" },
          { id: "combine-with-other-tools", title: "Combining PDF Organize with other in-browser tools" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF organization: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF page organizers (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, medical files, HR documents, and financial reports, that is a real privacy risk.",
          "SammaPix PDF Organize runs entirely in your browser using pdf.js (thumbnails) and pdf-lib (rebuilding the PDF). Your file never leaves your device.",
          "A visual drag-and-drop thumbnail grid shows every page at once. Move any page by dragging it, or use up, down, top, and bottom arrow buttons for precise control.",
          "pdf-lib rebuilds the PDF from scratch in the new page order. Text, images, links, and quality on every page are completely untouched.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
          "Combines naturally with Remove PDF Pages, PDF Rotate, PDF Merge, and PDF Split — all browser-based, no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person sorting and organizing printed document pages on a desk, representing the task of rearranging out-of-order PDF pages from a scan or assembled document."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Organizing PDF pages should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Organize PDF pages right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Organize runs entirely in your browser via pdf.js and pdf-lib. Drag-and-drop visual
              thumbnail grid, arrow buttons for precision. Content on every page preserved unchanged. No upload, no signup, free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-organize"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Organize PDF Pages, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-merge"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-rotate"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why upload is a problem ────────────────────────── */}

        <h2 id="why-upload-is-a-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why uploading to organize PDF pages is a privacy problem
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The first result for &quot;organize PDF pages online&quot; is almost always a service that uploads your file to a remote server. You drag your document in, a progress bar fills, and the file — in its entirety — travels to their infrastructure. Their processing server rearranges the pages, and you download the result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a document without sensitive content, this is a minor inconvenience. But the documents that most often need page reordering are precisely the ones where uploading is most problematic: scanned contracts that fed in the wrong order, HR performance reviews where sections got interleaved, medical records assembled from multiple scan sessions, financial reports where sections were merged out of sequence.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These services&apos; privacy policies say files are deleted after one hour or after the session. You cannot verify that. You cannot know whether the file was stored in a region with different data protection laws. You cannot audit their infrastructure. For documents that contain personal data, client information, or legally privileged content, this exposure is unnecessary — because the technology to organize PDF pages entirely in your browser has existed for years.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-organize" className="text-[#6366F1] hover:underline">SammaPix PDF Organize</Link>{" "}
          as a direct answer to this: the full page organization process — thumbnail rendering, drag-and-drop rearrangement, and PDF reconstruction — runs inside your browser. No server is involved. No file ever leaves your device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The specific risk: the full document, not just the relevant pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An important detail: when you upload a PDF to organize its pages, you are uploading the entire document — including the pages you do not want to move. If you are reorganizing a 40-page contract to fix the order of pages 3 through 7, all 40 pages upload to the server. The pages with the most sensitive content (signatures, pricing, personal details) travel with the pages you were trying to fix.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browser-based processing eliminates this exposure entirely. The PDF is read from your local disk, processed in memory, and the output is written back to your disk — without any network access at any step.
        </p>

        {/* ── Section 2: How client-side organize works ─────────────────── */}

        <h2 id="how-client-side-organize-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How client-side PDF page organization works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The architecture relies on two open-source libraries that run in your browser:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a></strong> — Mozilla&apos;s open-source PDF renderer. It reads the binary PDF data from your file and renders each page into a canvas element. This is the same engine that powers the PDF viewer built into Chrome and Firefox. It runs entirely in the browser, with no server requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a></strong> — an open-source JavaScript library for creating and modifying PDFs. It reads the original PDF structure in memory, copies page objects in the sequence you specified, and writes a new PDF. No network request is needed for any of this. The new PDF is assembled entirely in memory and served as a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF, pdf.js renders each page into a small thumbnail canvas. These thumbnails populate the drag-and-drop grid. When you click Save Order, pdf-lib receives the new page index array — the sequence you specified by dragging — and copies pages from the original PDF into a new document in that order. The page content objects (text streams, image XObjects, fonts) are copied verbatim, without any re-rendering or re-encoding.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result is a new PDF where the pages appear in your specified order, with every page&apos;s content identical to the original.
        </p>

        {/* ── Section 3: Visual thumbnail drag and drop ─────────────────── */}

        <h2 id="visual-thumbnail-drag-drop" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Visual drag-and-drop: organizing pages you can see
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fundamental problem with text-only page order interfaces — where you type numbers to specify the new order — is that they require you to know which number corresponds to which page. For a 30-page scanned document where the pages are visually similar, navigating by page number alone is error-prone.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The thumbnail grid solves this. pdf.js renders a preview of every page before you move anything. You see the actual content — section headers, chart headings, form fields — and can identify the correct order by looking rather than by remembering page numbers. This is especially valuable for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Scanned documents</strong> where you can see the handwriting, stamps, or printed headers on each page to identify where it belongs
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Reports assembled from multiple sources</strong> where each section has a distinctive visual layout that makes it identifiable in thumbnail form
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Documents with a mix of landscape and portrait pages</strong> where orientation provides an immediate visual cue about the page&apos;s identity
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Long documents with blank separator pages</strong> that are easy to spot as white thumbnails
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Drag mechanics
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To move a page, click and hold its thumbnail, drag it to the target position, and release. The surrounding thumbnails shift in real time as you drag, showing exactly where the page will land. Each thumbnail displays its current position number, which updates after every move. On touch screens (phones and tablets), long-press to pick up a thumbnail, then drag it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For large moves — for example, jumping page 28 to position 2 in a 30-page document — the Move to Top button is faster than dragging. Click it once and the page moves directly to position 1.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Organize PDF pages in your browser, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Visual drag-and-drop thumbnail grid. Up, down, top, bottom arrow buttons.
            Content on every page preserved unchanged. Your file never leaves your device. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-organize"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Organize, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Fixing out-of-order scans ──────────────────────── */}

        <h2 id="fixing-out-of-order-scans" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Fixing out-of-order scans: the most common use case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The scenario that brings most people to a PDF organizer is a scan that came out in the wrong order. Automatic document feeders produce this problem in several recognizable patterns:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          A page fed twice or skipped
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common single-page error. The feeder captures one page twice (producing a duplicate) or skips a page (creating a gap). The thumbnail grid makes this visible immediately — a duplicate pair looks identical side by side, and a gap is apparent from the document content jumping unexpectedly. Fix by dragging the duplicate to the end or deleting it with{" "}
          <Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Duplex scan with interleaved page order
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some duplex scanner software scans all front sides first (pages 1, 3, 5, 7...) and then all back sides in reverse (page 8, 6, 4, 2...). The resulting PDF has the correct content but in the pattern 1, 3, 5, 7, 8, 6, 4, 2. Correcting this requires interleaving the two halves: position 1 gets page 1, position 2 gets page 8 (which is the reverse-ordered page 2), position 3 gets page 3, position 4 gets page 7, and so on. The thumbnail previews make it possible to identify which pages belong together.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          A batch scan where pages from different documents got mixed
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When scanning multiple documents in one batch session, it is easy to accidentally include a page from a different document. The thumbnail previews make foreign pages immediately recognizable — a completely different document layout standing out between pages of the same form or contract. Move it to the end, then remove it, or extract it with{" "}
          <Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link>.
        </p>

        {/* ── Section 5: Reordering confidential documents ──────────────── */}

        <h2 id="reordering-confidential-documents" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Reordering confidential documents without uploading
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For confidential documents, the &quot;no upload&quot; guarantee is not a convenience feature — it is a requirement. Here are the cases where browser-based organization is the only acceptable approach:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Legal documents and contracts
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Attorney-client privilege and professional secrecy rules restrict how legal documents can be transmitted. Uploading a contract or legal brief to a third-party server to reorder its pages is a potential compliance issue. With PDF Organize running entirely in your browser, the document never leaves your device, and you can reorganize exhibits, annexes, and clauses without any third-party exposure.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Medical and patient records
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Medical records scanned from a physical file often arrive with encounter notes, lab results, and imaging reports interleaved in no particular order. Organizing them chronologically or by type is a common task. Uploading a patient record to a commercial PDF service to reorder its pages is a data protection concern in most jurisdictions. Browser-based processing keeps the document local throughout.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Financial and HR documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Payslips, tax returns, performance reviews, and salary documentation are routinely assembled from multiple scan sessions and may need page reordering before they are filed or shared internally. These documents contain information that should not leave the organization&apos;s environment. Running the page organization in the browser ensures the document never transits an external server.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to organize PDF pages without uploading, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under two minutes for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-organize</strong> in Chrome, Safari, Firefox, or Edge. No account required. Your file will not leave your device at any point.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders a thumbnail for each page. The page count and current sequence are shown.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the thumbnail grid</strong> to identify which pages are out of sequence. The position number on each thumbnail shows the current order.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rearrange the pages.</strong> Drag thumbnails to their correct positions. Or use the arrow buttons on each thumbnail — up (one step earlier), down (one step later), top (jump to first), bottom (jump to last). The grid updates after every action.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm the sequence.</strong> Check every thumbnail to verify the order is correct before saving. The position numbers should reflect the sequence you want.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Save Order.</strong> pdf-lib builds the output PDF with pages in the exact sequence shown in the grid. For short documents this is instant; for very large PDFs it takes a few seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the result.</strong> The new PDF is served from browser memory as a Blob. No network request occurs at this step or at any previous step.
          </li>
        </ol>

        {/* ── Section 7: Combine with other tools ───────────────────────── */}

        <h2 id="combine-with-other-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Combining PDF Organize with other in-browser tools
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF Organize is part of a suite of browser-based PDF tools that work well together. Because every tool in the suite requires no upload, you can chain them on sensitive documents without any server exposure:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Organize, then remove blank pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After reordering a scan, use{" "}
          <Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link>{" "}
          to delete the blank reverse-side pages or duplicate pages that appeared during scanning. Read the full guide at{" "}
          <Link href="/blog/delete-pages-from-pdf-online" className="text-[#6366F1] hover:underline">Delete pages from a PDF online free</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Merge, then organize
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use{" "}
          <Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link>{" "}
          to combine sections from multiple PDF files, then open the merged document in PDF Organize to arrange the sections in the correct order.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Organize, then rotate sideways pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some scanned pages are captured sideways. First reorder the document so the pages are in the right sequence, then use{" "}
          <Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link>{" "}
          to fix the orientation of individual pages. Read the full guide at{" "}
          <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Organize, then compress
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After reordering a scan, the file may still be too large to email or attach. Use{" "}
          <Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link>{" "}
          to reduce the file size. This is especially effective for image-heavy scanned documents. Read the full guide at{" "}
          <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
        </p>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF organization: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison of the two approaches across dimensions that matter:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full document uploaded to a remote server. You trust their security and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Content quality after reordering</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Some rasterize pages, which destroys text selectability and degrades image quality.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. pdf-lib copies page objects directly — no rasterization, ever.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page selection interface</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Most show a thumbnail drag-and-drop grid.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Visual drag-and-drop thumbnail grid + up/down/top/bottom arrow buttons for precision.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works on mobile</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — upload-based tools typically work on mobile browsers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — touch drag-and-drop works in Chrome and Safari on iOS and Android.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans cap at 5 to 25 MB. Larger files need a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap imposed by the tool.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires upload to a server.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, page organization works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Visual drag-and-drop. Arrow buttons for precision. Content preserved on every page.
            Your file never leaves your device. Free, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-organize"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Organize, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/reorder-pdf-pages-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full reordering guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not have to take my word for it. Here is how to confirm this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari, enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click Network in DevTools. Clear any existing entries.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, rearrange pages, and click Save Order.</strong> Watch the Network panel throughout this entire process and while clicking Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only network activity is the initial page load (JavaScript and CSS assets). During thumbnail rendering, dragging, and the download step, the Network panel shows zero outgoing requests. The PDF is processed and served entirely from browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the standard method used by privacy researchers to audit browser-based tools. It is conclusive: if no network request carries your PDF bytes, the file stayed on your device.
        </p>

        {/* ── Section 10: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools. All of them run locally with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete any page or range from a PDF. Use after organizing to remove blank or duplicate scan pages. Read the full guide at{" "}
            <Link href="/blog/delete-pages-from-pdf-online" className="text-[#6366F1] hover:underline">Delete pages from a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages permanently. Useful after organizing when some scanned pages are in the wrong orientation. Read the full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract a page range into a separate PDF. Useful when you only need to share a specific section after reordering. Read the full guide at{" "}
            <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">Split a PDF privately, no upload</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Use before PDF Organize when assembling sections from different files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size after reordering. Especially useful for large scanned documents that need to be emailed. Read the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Organize, remove pages, rotate, split, compress, and merge PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf.js and pdf-lib. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-organize"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Organize PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/remove-pdf-pages"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove Pages <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
