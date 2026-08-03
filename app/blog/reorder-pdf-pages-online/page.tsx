import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Reorder PDF Pages Online Free [2026]",
  description:
    "Rearrange, sort, and reorder PDF pages entirely in your browser — drag and drop thumbnail grid powered by pdf.js and pdf-lib. Move pages up, down, to the top, or to the bottom. No upload, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/reorder-pdf-pages-online`,
  },
  keywords: [
    "reorder pdf pages",
    "rearrange pdf pages",
    "sort pdf pages",
    "reorder pdf pages online",
    "rearrange pdf pages online free",
    "move pdf pages",
    "change pdf page order",
    "reorder pages in pdf",
    "pdf page reorder online",
    "sort pdf pages online free",
  ],
  openGraph: {
    title: "Reorder PDF Pages Online Free [2026]",
    description:
      "Drag and drop PDF pages into the right order entirely in your browser. Thumbnail grid powered by pdf.js, rebuilt by pdf-lib. No upload, no server, no signup. Free.",
    url: `${APP_URL}/blog/reorder-pdf-pages-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reorder PDF Pages Online Free [2026]",
    description:
      "Rearrange PDF pages 100% in your browser. Drag and drop thumbnail grid. No upload, no server. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/reorder-pdf-pages-online`;
const POST_TITLE = "Reorder PDF Pages Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF page reordering tools upload your file to a remote server. SammaPix PDF Organize works entirely in your browser using pdf.js (for thumbnail previews) and pdf-lib (to reconstruct the PDF in the new order). This guide explains how browser-based page reordering works, how to drag pages into position or use the arrow buttons, and how to verify that no upload ever happens.",
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
    "reorder pdf pages",
    "rearrange pdf pages",
    "sort pdf pages",
    "reorder pdf pages online",
    "move pdf pages",
    "change pdf page order",
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
  name: "How to Reorder PDF Pages Online Without Uploading",
  description:
    "Rearrange PDF pages entirely in your browser using SammaPix PDF Organize. Drag and drop thumbnail grid, or use up/down/top/bottom arrow buttons. Powered by pdf.js and pdf-lib. No upload, no server, free.",
  totalTime: "PT1M",
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
      text: "Go to sammapix.com/tools/pdf-organize in any modern browser. No account or signup required.",
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
      name: "Drag pages into the correct order",
      text: "Drag any thumbnail to a new position in the grid — the other pages shift automatically. Alternatively, click the up, down, move-to-top, or move-to-bottom arrow buttons on each thumbnail for precise control.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review the new page order",
      text: "Check the thumbnail grid to confirm the sequence is correct before rebuilding the PDF. Each thumbnail shows its current position number.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Save Order and download",
      text: "Click Save Order. pdf-lib reads the original PDF and writes a new document with pages in the exact order shown in the grid — preserving all content, text, images, and quality unchanged. The output is downloaded directly from browser memory. No network call occurs.",
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
      name: "Does reordering PDF pages online mean uploading to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, Adobe Acrobat Online, and similar services upload your PDF to their servers to process it. With SammaPix PDF Organize, no. The page reordering runs entirely in your browser using pdf.js (to render thumbnails) and pdf-lib (to reconstruct the PDF in the new order). Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Does rearranging pages damage the content on those pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib rebuilds the PDF by copying all pages — in the new order — into a fresh document. The content of each page, including text, images, vector graphics, links, and fonts, is preserved exactly as in the original. Reordering only changes the sequence in which pages appear in the PDF. No content is modified, re-encoded, or rasterized.",
      },
    },
    {
      "@type": "Question",
      name: "Can I move multiple pages at once, or only one at a time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The drag-and-drop interface moves one page at a time, but you can perform as many moves as you need before clicking Save Order. The thumbnail grid updates instantly after each move, so you can see the accumulating result in real time. For documents with a predictable sort pattern, repeated use of the up/down arrow buttons can also be efficient. There is no undo in the current version, so review the grid before clicking Save Order.",
      },
    },
    {
      "@type": "Question",
      name: "Will bookmarks and internal links still work after reordering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bookmarks and internal links that point to specific page numbers may become incorrect after reordering, because the destination page has moved to a different position. For example, if a bookmark pointed to page 5 and you moved that page to position 2, a viewer that resolves bookmarks by absolute page number will land on the wrong page. Links to external URLs are unaffected. If your document relies heavily on internal links or bookmarks, review them after reordering.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reorder pages in a scanned PDF that came out wrong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop the scanned PDF into SammaPix PDF Organize. The thumbnail grid renders every page so you can see the current (incorrect) sequence. Drag each page thumbnail to its correct position. For a duplex scan that interleaved pages in the wrong order (e.g. pages 1, 3, 5... then 2, 4, 6...), work through the thumbnails methodically, moving each odd-position page to its correct slot. Once the grid shows the correct sequence, click Save Order to download the corrected PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a page limit for PDF Organize?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial page limit. The practical constraint is your device memory, since the entire PDF and all its page thumbnails are held in browser memory during processing. For most documents, including multi-section reports and long scan bundles, this works without issues on any modern device. Very large PDFs (several hundred megabytes) may render thumbnails more slowly on low-RAM devices but will complete correctly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reorder pages and then remove some pages in the same session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in a single session within PDF Organize, which is dedicated to reordering. After downloading the reordered PDF, you can open the result in the SammaPix Remove PDF Pages tool to delete any unwanted pages. Both tools run in your browser with no upload, so you can chain them without your document ever leaving your device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when I reorder PDF pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your PDF into the SammaPix PDF Organize tool and proceed through the reordering and download. Watch the network panel throughout. You will see requests for static page assets (JavaScript, CSS) when the tool loads. During thumbnail rendering, dragging pages, and the download step, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is served via a blob URL — no network call is made at any point.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReorderPdfPagesOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="reorder-pdf-pages-online"
        description="Most tools that let you rearrange PDF pages upload your document to a server. SammaPix PDF Organize runs entirely in your browser — drag and drop thumbnail grid, arrow buttons for precise control, rebuilt by pdf-lib with no upload. Here is how it works and why the content on every page is always preserved."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: PDF reordering tools upload your file" },
          { id: "how-browser-reorder-works", title: "How browser-based PDF page reordering works" },
          { id: "drag-drop-interface", title: "Drag and drop: moving pages visually" },
          { id: "arrow-buttons", title: "Arrow buttons: up, down, top, bottom" },
          { id: "quality-preserved", title: "Content on every page is always preserved" },
          { id: "step-by-step", title: "How to reorder PDF pages, step by step" },
          { id: "use-cases", title: "When you need to reorder PDF pages: common scenarios" },
          { id: "comparison-table", title: "Browser-based vs upload-based page reordering: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF page reordering tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, invoices, and private documents, that is a real privacy risk.",
          "SammaPix PDF Organize runs entirely in your browser using pdf.js (thumbnails) and pdf-lib (rebuilding the PDF). Your file never leaves your device.",
          "A drag-and-drop thumbnail grid shows every page. Move any page by dragging it, or use the up, down, top, and bottom arrow buttons for precise control.",
          "pdf-lib rebuilds the PDF from scratch in the new page order. Text, images, and quality on every page are completely untouched — no rasterization, no re-encoding.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
          "Related tools: Remove PDF Pages, PDF Split, PDF Rotate, PDF Merge — all browser-based, no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Printed document pages spread out on a desk being sorted into order, representing the task of rearranging and reordering pages in a PDF."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Reordering pages in a PDF should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Reorder PDF pages right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Organize runs entirely in your browser via pdf.js and pdf-lib. Drag and drop thumbnail
              grid, arrow buttons for precise control. Content on every page is preserved unchanged. No upload, no signup, free.
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
                href="/tools/remove-pdf-pages"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Remove PDF Pages <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-split"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: PDF reordering tools upload your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You scan a 15-page contract from a flatbed scanner, and the automatic document feeder feeds the pages in the wrong order. Or you assemble a report from multiple sources and the sections end up missequenced. You search for &quot;reorder PDF pages online&quot; and land on iLovePDF, Smallpdf, or Adobe Acrobat Online.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the file in. The entire document — contract clauses, signatures, pricing, personal data — uploads to their server. You drag pages into the right order and download the result. The task is done, but your full original document spent time on a server you have no visibility into. Their privacy policy says files are deleted after an hour. You cannot verify that.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For documents like contracts, HR files, financial reports, and medical records, this is a real exposure — not a hypothetical one. I built{" "}
          <Link href="/tools/pdf-organize" className="text-[#6366F1] hover:underline">SammaPix PDF Organize</Link>{" "}
          to solve this: the entire page reordering process runs inside your browser. No server receives your document at any point.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &quot;no upload&quot; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Organize, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API that reads local files without network access. The file stays in browser memory throughout. Processing uses{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a>{" "}
          (Mozilla&apos;s open-source PDF renderer, used to generate the page thumbnails) and{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          (an open-source JavaScript library that can read and write PDF files). The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file.
        </p>

        {/* ── Section 2: How browser reordering works ────────────────────── */}

        <h2 id="how-browser-reorder-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF page reordering works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism matters because it determines what happens to the content on each page — and the answer is: nothing. Here is the process under the hood:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf.js renders a thumbnail for each page.</strong> When you drop the PDF, pdf.js reads and renders every page into a small canvas element in the thumbnail grid. These previews let you see the current page order, identify which pages are out of sequence, and understand the document structure before moving anything.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You rearrange the pages.</strong> Drag any thumbnail to a new position — the remaining thumbnails shift automatically. Or use the up, down, top, and bottom arrow buttons on each thumbnail for precise, single-step moves. The grid updates in real time after every action.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib creates a new PDF in the new page order.</strong> When you click Save Order, pdf-lib loads the original PDF and copies pages into a new document in exactly the sequence shown in the grid. Each page&apos;s full content — text, images, embedded objects, links — is copied directly from the original PDF structure without any intermediate rendering step.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The new PDF is offered for download.</strong> The rebuilt PDF bytes are stored as a Blob in browser memory and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The critical insight is that pdf-lib copies page objects directly from the original PDF structure. It does not render pages to images or re-encode anything. This is why the quality, text selectability, and file characteristics of every page are identical to the original.
        </p>

        {/* ── Section 3: Drag and drop interface ────────────────────────── */}

        <h2 id="drag-drop-interface" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Drag and drop: moving pages visually
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The thumbnail grid is the core interface of the tool. When you drop a PDF, pdf.js renders a miniature preview of every page in order. You can immediately see the full current page sequence and identify which pages are out of place.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To move a page, click and hold its thumbnail, then drag it to the target position. The other thumbnails shift in real time as you drag, so you can see exactly where the page will land before you release. Each thumbnail shows its current position number, which updates after every move.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What the thumbnail grid shows
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The content of each page</strong> — rendered at thumbnail size so you can identify sections, headers, and page breaks at a glance
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Pages that are blank or nearly blank</strong> — easy to spot as white thumbnails, useful when deciding whether to remove them with{" "}
            <Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Pages in the wrong orientation</strong> — identifiable as landscape thumbnails in a portrait document, fixable with{" "}
            <Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link>{" "}
            before or after reordering
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Duplicate pages</strong> — scanned pages that fed through twice, visible as identical adjacent thumbnails
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The current position number</strong> — displayed on each thumbnail so you always know where you are in the sequence
          </li>
        </ul>

        {/* ── Section 4: Arrow buttons ───────────────────────────────────── */}

        <h2 id="arrow-buttons" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Arrow buttons: up, down, top, bottom
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For precise control, especially when reordering pages in a long document where drag distances are awkward, each thumbnail has four arrow buttons:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Move up</strong> — shifts the page one position earlier in the sequence. For example, moves page 5 to position 4.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Move down</strong> — shifts the page one position later. For example, moves page 3 to position 4.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Move to top</strong> — jumps the page directly to position 1, becoming the first page of the document. Useful for moving a cover page that ended up at the back.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Move to bottom</strong> — jumps the page directly to the last position. Useful for moving back matter or appendices that got mixed into the body.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The arrow buttons and drag-and-drop work on the same grid state. You can freely mix both methods — drag a page most of the way and then use the up button to fine-tune its position.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Reorder PDF pages in your browser, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drag-and-drop thumbnail grid. Up, down, top, bottom arrow buttons for precise control.
            Content on every page preserved unchanged — text stays selectable, quality unchanged. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-organize"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Organize, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Quality preserved ──────────────────────────────── */}

        <h2 id="quality-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Content on every page is always preserved
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some PDF tools that rearrange pages do so by rendering all pages to images and reassembling them in the new order. This rasterization approach converts crisp vector text into blurry pixels, removes text selectability, and may significantly alter the file size. It signals that the tool was built for convenience rather than correctness.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Organize uses the correct approach: pdf-lib copies the raw page objects from the original PDF into the new document without any intermediate rendering step. This means:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text stays selectable.</strong> You can still highlight, copy, and search text in every page of the output PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Image quality is unchanged.</strong> Photos and graphics on every page are bit-for-bit identical to the original.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Vector graphics stay crisp.</strong> Charts, logos, and line art scale perfectly at any zoom level.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Hyperlinks remain active.</strong> Clickable links in every page continue to work in the output PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File size is proportional.</strong> The output PDF is approximately the same size as the input — reordering pages does not inflate or shrink the file.
          </li>
        </ul>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to reorder PDF pages, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-organize</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders a thumbnail for each page. The page count and current order are shown.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rearrange the pages.</strong> Drag thumbnails to their new positions, or use the up, down, top, and bottom arrow buttons on each thumbnail. The grid updates after every move.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the thumbnail grid</strong> to confirm the page sequence is correct before saving. Check that the position numbers reflect the order you want.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Save Order.</strong> pdf-lib builds the output PDF with pages in the exact sequence shown in the grid. This is instant for short documents and a few seconds for very large PDFs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the result.</strong> The new PDF is served from browser memory as a Blob. No network request occurs.
          </li>
        </ol>

        {/* ── Section 7: Use cases ──────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need to reorder PDF pages: common scenarios
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Page reordering solves a specific and practical problem. Here are the scenarios I see most often:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scanned documents with pages out of sequence
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Automatic document feeders are reliable but imperfect. A page that feeds slightly crooked can cause the feeder to skip it, pick it up again, or capture it out of order. A 20-page scan might emerge with pages 7 and 8 swapped, or with pages 14 and 15 appearing at the end. The thumbnail grid makes the disorder immediately visible. Drag the misplaced pages back to their correct positions and download the corrected PDF.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Assembling a report from multiple sources
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You use{" "}
          <Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link>{" "}
          to combine sections written by different team members. The sections come in, but one author sent their part in reverse order, or the executive summary ended up in the middle instead of at the front. Open the merged PDF in PDF Organize, drag the sections into the right sequence, and download the corrected document.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Reordering a legal document before submission
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Court filings, contracts, and formal submissions often require exhibits and attachments in a specific order. If a supporting document arrives with its pages misordered, or if the required submission order differs from how the document was drafted, reordering in the browser — without uploading to a third-party service — is the only safe way to handle documents with sensitive client or case information.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Moving a cover page or table of contents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A cover page designed in a separate file sometimes gets merged at the wrong position — for example, appearing after the introduction instead of at the front. Using the Move to Top button, you can jump it to position 1 in a single click, without having to drag across a large thumbnail grid.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Fixing a duplex scan with interleaved pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some duplex scanner workflows produce a PDF where all odd pages (1, 3, 5...) appear first, then all even pages (2, 4, 6...) in reverse. The result is a PDF where the pages are completely out of order even though every page was scanned. Reordering the thumbnails — alternating one from the front half and one from the back half — corrects the sequence. The thumbnail previews make this pattern immediately recognizable.
        </p>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based page reordering: honest comparison
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Content quality of pages</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Some rasterize pages (text becomes image). Good tools preserve quality.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. pdf-lib copies page objects directly — no rasterization, ever.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text selectability after reordering</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Lost if the tool rasterizes pages.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. Page content is copied, not re-rendered.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page reordering interface</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Most show a thumbnail drag-and-drop grid.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Drag-and-drop thumbnail grid + up/down/top/bottom arrow buttons. Both methods work together.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans typically cap at 5 to 25 MB. Larger files need a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap imposed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires upload to a server.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, page reordering works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drag-and-drop thumbnail grid. Arrow buttons for precise moves.
            Content on every page preserved — text stays selectable, quality unchanged. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-organize"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Organize, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/organize-pdf-pages-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Organize private docs without uploading <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, rearrange pages, and click Save Order.</strong> Watch the Network panel throughout this process and while clicking Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only network activity is the initial page load (JavaScript and CSS assets). During thumbnail rendering, dragging pages, and the download step, the Network panel shows zero outgoing requests. The PDF is processed and served entirely from browser memory.
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete any page or range of pages from a PDF. Thumbnail grid + range input. No upload. Read the full guide at{" "}
            <Link href="/blog/delete-pages-from-pdf-online" className="text-[#6366F1] hover:underline">Delete pages from a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract a page range into a separate PDF, or split a document into individual pages. Read the full guide at{" "}
            <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">Split a PDF privately, no upload</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages permanently. Rotation is saved into the file via the page Rotate property. Read the full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents. Read the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Useful when you need to reassemble documents after editing sections separately.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Organize, remove pages, split, rotate, compress, and merge PDFs without uploading them anywhere.
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
