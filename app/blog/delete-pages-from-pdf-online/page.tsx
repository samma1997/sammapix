import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Delete Pages from a PDF Online Free [2026]",
  description:
    "Remove one page or a range of pages from any PDF — entirely in your browser via pdf.js + pdf-lib. Thumbnail preview, range selection (e.g. 2, 5-7), no upload, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/delete-pages-from-pdf-online`,
  },
  keywords: [
    "delete pages from pdf",
    "remove pdf pages",
    "delete pdf page online",
    "remove pages from pdf online free",
    "delete pages from pdf online",
    "pdf page remover",
    "delete pdf pages no upload",
    "remove pdf pages browser",
    "delete page from pdf free",
    "pdf page delete online",
  ],
  openGraph: {
    title: "Delete Pages from a PDF Online Free [2026]",
    description:
      "Remove any page or range of pages from a PDF entirely in your browser. Thumbnail grid, click to select or type a range like 2, 5-7. No upload, no server. Free.",
    url: `${APP_URL}/blog/delete-pages-from-pdf-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete Pages from a PDF Online Free [2026]",
    description:
      "Remove PDF pages 100% in your browser. Thumbnail preview, click or type ranges. No upload, no server. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/delete-pages-from-pdf-online`;
const POST_TITLE = "Delete Pages from a PDF Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF page removal tools upload your file to a remote server. SammaPix Remove PDF Pages works entirely in your browser using pdf.js (for thumbnail previews) and pdf-lib (to reconstruct the PDF without the deleted pages). This guide explains how browser-based page deletion works, how to select pages by clicking thumbnails or typing a range like 2, 5-7, and how to verify that no upload ever happens.",
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
    "delete pages from pdf",
    "remove pdf pages",
    "delete pdf page online",
    "remove pages from pdf online free",
    "pdf page remover",
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
  name: "How to Delete Pages from a PDF Online Without Uploading",
  description:
    "Remove pages from a PDF entirely in your browser using SammaPix. Thumbnail grid lets you click pages to select, or type a range like 2, 5-7. Powered by pdf.js and pdf-lib. No upload, no server, free.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Remove PDF Pages (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Remove PDF Pages tool",
      text: "Go to sammapix.com/tools/remove-pdf-pages in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. pdf.js renders a thumbnail of every page so you can visually identify which ones to delete. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select the pages to remove",
      text: "Click the thumbnails of any pages you want to delete — they are highlighted in red. Alternatively, type a range in the text field (e.g. 1, 3, 5-7) and the matching thumbnails are selected automatically.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review your selection",
      text: "Check the highlighted thumbnails to confirm you have selected the right pages before deleting. You can click a highlighted page to deselect it, or clear all and start over.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Remove Pages and download",
      text: "Click Remove Pages. pdf-lib rebuilds the PDF from scratch, omitting the selected pages while preserving all others — their content, text, links, and quality are unchanged. The output is downloaded directly from browser memory. No network call occurs.",
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
      name: "Does deleting PDF pages online mean uploading to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, Adobe Acrobat Online, and similar services upload your PDF to their servers to process it. With SammaPix Remove PDF Pages, no. The page deletion runs entirely in your browser using pdf.js (to render thumbnails) and pdf-lib (to reconstruct the PDF without the deleted pages). Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Does removing pages from a PDF damage the remaining content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib rebuilds the PDF by copying all retained pages into a new document. The content of each kept page — text, images, vector graphics, links, fonts — is preserved exactly as in the original. Only the deleted pages are omitted. The remaining pages are not re-encoded, rasterized, or recompressed in any way. Text stays selectable, images stay at their original quality, and the file structure remains valid.",
      },
    },
    {
      "@type": "Question",
      name: "Can I delete multiple non-consecutive pages at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can select pages in two ways. First, click individual page thumbnails — selected pages are highlighted and you can click multiple thumbnails across the grid. Second, type a range expression in the text field: for example, 1, 3, 5-7 selects pages 1, 3, 5, 6, and 7 all at once. The two methods can be combined: type a range to select a group, then click additional individual thumbnails to add them to your selection.",
      },
    },
    {
      "@type": "Question",
      name: "Will the page numbers in the remaining PDF adjust automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The physical page order in the PDF adjusts automatically. If you delete page 3 from a 10-page document, the output PDF has 9 pages and what was originally page 4 becomes page 3. However, if the PDF contains printed page numbers embedded in the page content (for example, a header that says Page 4 of 10), those numbers are part of the page content and are not automatically updated. If you need accurate page numbers after deletion, you can use the SammaPix PDF Page Numbers tool to add new page numbers to the output.",
      },
    },
    {
      "@type": "Question",
      name: "Can I delete all pages except the ones I want to keep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and this is often the faster approach for longer documents. Click Select All to highlight every page, then click the thumbnails of the pages you want to keep to deselect them. Only the still-highlighted pages will be deleted. This is equivalent to using the SammaPix PDF Split tool to extract a subset of pages, but it lets you think in terms of what you are removing rather than what you are keeping.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on how many pages I can delete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial limit. You can delete one page or all pages but one. The practical constraint is your device memory, since the entire PDF is held in browser memory during processing. For most documents — including long scanned reports and multi-section contracts — this works without issues on any modern device. Very large PDFs (several hundred megabytes) may be slower on low-RAM devices, but will complete correctly.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to bookmarks and internal links after deleting pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bookmarks and internal links that pointed to deleted pages will become broken in the output PDF, because the destination pages no longer exist. Bookmarks and links that point to retained pages will continue to work correctly. This is an inherent limitation of page deletion in any PDF tool — the PDF format stores links as page-number references, and if the target page is removed, the reference becomes invalid. If your document relies heavily on bookmarks, consider reviewing them after deletion.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when I delete PDF pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your PDF into the SammaPix Remove PDF Pages tool and proceed through page selection and deletion. Watch the network panel throughout. You will see requests for static page assets (JavaScript, CSS) when the tool loads. During thumbnail rendering, page selection, and the download step, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is served via a blob URL — no network call is made at any point.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DeletePagesFromPdfOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="delete-pages-from-pdf-online"
        description="Most PDF tools that let you remove pages upload your document to a server. SammaPix Remove PDF Pages runs entirely in your browser — thumbnail preview of every page, click to select or type a range like 2, 5-7, and delete without any upload. Here is how it works and why the remaining pages are never degraded."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: PDF page removal tools upload your file" },
          { id: "how-browser-deletion-works", title: "How browser-based PDF page deletion works" },
          { id: "thumbnail-selection", title: "Thumbnail grid: selecting pages visually" },
          { id: "range-selection", title: "Range selection: type 2, 5-7 to delete multiple pages at once" },
          { id: "quality-preserved", title: "Remaining pages are never degraded" },
          { id: "step-by-step", title: "How to delete pages from a PDF, step by step" },
          { id: "use-cases", title: "When you need to delete PDF pages: common scenarios" },
          { id: "comparison-table", title: "Browser-based vs upload-based page removal: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF page removal tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, invoices, and private documents, that is a real privacy risk.",
          "SammaPix Remove PDF Pages runs entirely in your browser using pdf.js (thumbnails) and pdf-lib (rebuilding the PDF). Your file never leaves your device.",
          "A thumbnail grid shows every page. Click pages to select them, or type a range like 1, 3, 5-7 in the text field for fast multi-page selection.",
          "pdf-lib rebuilds the PDF from scratch, keeping only the retained pages. Their text, images, and quality are completely untouched — no rasterization, no re-encoding.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
          "Related tools: PDF Split, PDF Rotate, PDF Compress, PDF Merge — all browser-based, no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/7433882/pexels-photo-7433882.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing printed document pages spread on a desk, representing the task of identifying and removing unwanted pages from a PDF."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Removing pages from a PDF should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Delete PDF pages right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Remove PDF Pages runs entirely in your browser via pdf.js and pdf-lib. Thumbnail grid for
              visual selection, or type a range like 2, 5-7. Remaining pages are never degraded. No upload, no signup, free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/remove-pdf-pages"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Remove PDF Pages, Free
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

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: PDF page removal tools upload your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You receive a 12-page contract PDF. You need to share pages 3 through 8 with a colleague, but pages 1, 2, and 9 through 12 contain pricing details or signatures that should not circulate. You search for &quot;delete pages from PDF&quot; and land on iLovePDF, Smallpdf, or Adobe Acrobat Online.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the file in. The entire 12-page contract uploads to their server. You select and delete the pages you do not want. You download the result. The task is done — but your full original document, including the pages you were trying to keep private, spent time on a server you have no visibility into.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For documents like contracts, bank statements, medical reports, and HR files, this defeats the purpose of removing pages for privacy. I built{" "}
          <Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">SammaPix Remove PDF Pages</Link>{" "}
          to solve this: the entire page deletion process runs inside your browser. No server receives your document.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &quot;no upload&quot; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix Remove PDF Pages, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API that reads local files without network access. The file stays in browser memory throughout. Processing uses{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a>{" "}
          (Mozilla&apos;s open-source PDF renderer, used to generate the page thumbnails) and{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          (an open-source JavaScript library that can read and write PDF files). The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file.
        </p>

        {/* ── Section 2: How browser deletion works ──────────────────────── */}

        <h2 id="how-browser-deletion-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF page deletion works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism matters because it determines what happens to the pages you keep — and the answer is: nothing. Here is the process under the hood:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf.js renders a thumbnail for each page.</strong> When you drop the PDF, pdf.js reads and renders every page into a small canvas element in the thumbnail grid. These previews let you identify which pages are redundant — cover pages, blank pages, repeated sections, duplicate scans — before deleting anything.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You select the pages to delete.</strong> Click thumbnails to highlight them in red, or type a range expression (like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">2, 5-7</code>) in the text field to select multiple pages at once. The thumbnail grid updates to show your selection before you commit.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib creates a new PDF from the retained pages.</strong> pdf-lib loads the original PDF, identifies which page indices to keep (all pages not in your selection), and copies them — with all their content, metadata, and embedded objects — into a brand new PDF document. The deleted pages are simply excluded. No content from retained pages is touched.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The new PDF is offered for download.</strong> The rebuilt PDF bytes are stored as a Blob in browser memory and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The critical insight is that pdf-lib copies pages directly from the original PDF structure. It does not render pages to images, re-encode anything, or reprocess content. This is why the quality, text selectability, and file characteristics of retained pages are identical to the original.
        </p>

        {/* ── Section 3: Thumbnail selection ────────────────────────────── */}

        <h2 id="thumbnail-selection" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Thumbnail grid: selecting pages visually
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The thumbnail grid is the core interface of the tool. When you drop a PDF, pdf.js renders a miniature preview of every page in order. You can immediately see:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Which pages are blank</strong> — easily spotted as white thumbnails
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Which pages are duplicates</strong> — scanned pages where the scanner passed twice
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Which pages belong to the wrong section</strong> — for example, a confidential annex you need to strip before forwarding
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Which pages are in the wrong orientation</strong> — useful when combined with{" "}
            <Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link>{" "}
            to fix the document first before stripping unwanted pages
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Clicking a thumbnail highlights it in red (marking it for deletion). Clicking it again deselects it. You can select any combination of pages — adjacent, scattered, single, or all but a few — before clicking Remove Pages.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Select All for reverse workflows
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to keep only a small number of pages from a large document, click Select All to highlight every page, then click the thumbnails of the pages you want to keep to deselect them. Only the remaining highlighted pages are deleted. This is the faster approach when, for example, you want to keep pages 7 and 8 from a 30-page report.
        </p>

        {/* ── Section 4: Range selection ────────────────────────────────── */}

        <h2 id="range-selection" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Range selection: type 2, 5-7 to delete multiple pages at once
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For longer documents, clicking individual thumbnails can be tedious. The text field accepts a range expression that lets you specify multiple pages and ranges in one step:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">3</code> — selects only page 3
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">1, 4, 9</code> — selects pages 1, 4, and 9 individually
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">5-7</code> — selects pages 5, 6, and 7 as a range
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">2, 5-7, 11</code> — selects pages 2, 5, 6, 7, and 11 in one input
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you type or paste a range expression, the corresponding thumbnails are highlighted in the grid so you can visually confirm the selection before deleting. You can further refine the selection by clicking individual thumbnails after entering a range — the two methods compose freely.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This range syntax is familiar to anyone who has used the page range field in a printer dialog. It handles the most common scenarios for document trimming — removing the cover page and back matter, stripping an appendix block, or deleting a run of blank scanner pages — in a single step.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Remove PDF pages in your browser, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Thumbnail grid for visual selection. Type a range like 2, 5-7 for bulk deletion. Remaining pages are
            never degraded — text stays selectable, quality unchanged. Free, no signup.
          </p>
          <Link
            href="/tools/remove-pdf-pages"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Remove PDF Pages, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Quality preserved ──────────────────────────────── */}

        <h2 id="quality-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Remaining pages are never degraded
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some PDF tools that delete pages do so by rendering all retained pages to images and reassembling them into a new PDF. This approach — called rasterization — converts crisp vector text into blurry pixels, removes text selectability, and may alter the file size significantly. It is a sign that the tool was built for simplicity rather than correctness.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Remove PDF Pages uses the correct approach: pdf-lib copies the raw page objects from the original PDF into the new document without any intermediate rendering step. This means:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text stays selectable.</strong> You can still highlight, copy, and search text in the output PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Image quality is unchanged.</strong> Photos and graphics in the retained pages are bit-for-bit identical to the original.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Vector graphics stay crisp.</strong> Charts, logos, and line art scale perfectly at any zoom level.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Hyperlinks remain active.</strong> Clickable links in the retained pages continue to work.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File size is proportional.</strong> The output PDF is roughly the same ratio as the original — if you delete 4 of 12 pages, the output is approximately two-thirds the size. No artificial inflation from re-encoding.
          </li>
        </ul>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to delete pages from a PDF, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/remove-pdf-pages</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders a thumbnail for each page. The page count and file size are shown.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the pages to delete</strong> by clicking their thumbnails (they highlight in red), or by typing a range expression like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">1, 3, 5-7</code> in the text field. The two methods work together.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the highlighted thumbnails</strong> to confirm your selection before deleting. Click a highlighted thumbnail to deselect it. Check that the pages marked red are the ones you actually want removed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Remove Pages.</strong> pdf-lib builds the output PDF from all non-selected pages. This is instant for short documents and a few seconds for very large PDFs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the result.</strong> The new PDF is served from browser memory as a Blob. The output filename indicates the original filename with the deleted pages noted. No network request occurs.
          </li>
        </ol>

        {/* ── Section 7: Use cases ──────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need to delete PDF pages: common scenarios
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Page deletion is one of the most practical PDF operations. Here are the cases I see most often:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Removing blank pages from scanned documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Flatbed scanners using automatic document feeders often produce a blank reverse-side page for every odd-numbered original. A 10-page double-sided scan becomes a 20-page PDF with 10 blank pages interspersed. Selecting every even page (type <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">2, 4, 6, 8, 10, 12, 14, 16, 18, 20</code> in the range field) removes them all at once.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Stripping a cover page or confidential annex before sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A proposal or report often has a cover page with pricing for one client that you need to replace before sending to another. Or an appendix contains rate cards or internal notes not meant for external recipients. Deleting those pages in your browser — without uploading the full document to a third-party server — is the only safe way to handle this.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Removing duplicate scanned pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When feeding paper through a scanner, it is easy to double-feed a page. The resulting PDF has an exact duplicate of one page at an unexpected position. The thumbnail grid makes duplicates immediately visible — they look identical to the page before or after them. Click to select and delete.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Extracting the relevant section of a long report
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A 60-page audit report has the financial summary on pages 12 to 18. You need to email only that section to the CFO. Use Select All, then deselect pages 12 through 18 (click their thumbnails to unhighlight them), then delete everything else. The output is a 7-page PDF with only the relevant section — without uploading the full 60-page document to any server. Alternatively, use{" "}
          <Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link>{" "}
          which is designed specifically for page range extraction.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Deleting a mistakenly included page from a signed contract
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          During document assembly, an old draft page sometimes gets included by mistake. If the contract is not yet fully executed, you can delete that page and regenerate the document without re-signing everything. If the document is sensitive, doing this without uploading it anywhere is a meaningful protection.
        </p>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based page removal: honest comparison
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full document (including pages you want to keep private) uploaded to a remote server.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Quality of retained pages</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Some rasterize retained pages (text becomes image). Good tools preserve quality.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. pdf-lib copies page objects directly — no rasterization, ever.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text selectability after deletion</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Lost if the tool rasterizes retained pages.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. Page content is copied, not re-rendered.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page selection method</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Most show a thumbnail view. Some only show page numbers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Thumbnail grid (visual) + range text input (e.g. 2, 5-7). Both methods work together.</td>
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires upload.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, page deletion works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Thumbnail grid for visual selection. Type ranges like 2, 5-7 for fast bulk deletion.
            Retained pages are never rasterized — text stays selectable, quality unchanged. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/remove-pdf-pages"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Remove PDF Pages, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/remove-pdf-pages-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              No-upload guide for private docs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, select pages, and click Remove Pages.</strong> Watch the Network panel throughout this process and while clicking Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only network activity is the initial page load (JavaScript and CSS assets). During thumbnail rendering, page selection, deletion, and download — the Network panel shows zero outgoing requests. The PDF is processed and served entirely from browser memory.
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete any page or range of pages from a PDF. Thumbnail grid + range input. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract a page range into a separate PDF, or split a document into individual pages. Read the full guide at{" "}
            <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">Split a PDF privately, no upload</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages permanently. Rotation is saved into the file via the page Rotate property — not a viewer-level display setting. Read the full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents and image-heavy PDFs. Read the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Useful when you need to reassemble a document after editing sections separately.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Remove pages, split, rotate, compress, and merge PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf.js and pdf-lib. No server. No signup. No watermark.
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
