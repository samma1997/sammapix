import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Number PDF Pages Without Uploading (Private, Free) [2026]",
  description:
    "Add page numbers to a PDF entirely in your browser — no file upload, no server, no signup. Custom start number, multiple formats, six positions. Ideal for theses, legal briefs, and confidential reports. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/number-pdf-pages-no-upload`,
  },
  keywords: [
    "number pdf pages",
    "add pagination to pdf",
    "pdf add page numbers no upload",
    "number pdf pages without uploading",
    "pdf pagination private",
    "add page numbers pdf no signup",
    "pdf numbering browser",
    "number pages in pdf free",
    "pdf page numbering no upload",
    "add page numbers to pdf privately",
  ],
  openGraph: {
    title: "Number PDF Pages Without Uploading (Private, Free) [2026]",
    description:
      "Number the pages of a PDF entirely in your browser. No file upload, no server, no signup. Custom start number for theses, legal briefs, and reports. Free.",
    url: `${APP_URL}/blog/number-pdf-pages-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number PDF Pages Without Uploading (Private, Free) [2026]",
    description:
      "PDF page numbering that runs 100% in your browser via pdf-lib. No upload, no server. Custom start numbers for theses and legal filings. Text stays selectable. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/number-pdf-pages-no-upload`;
const POST_TITLE = "Number PDF Pages Without Uploading (Private, Free) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Numbering PDF pages without uploading the file is essential for theses, legal briefs, contracts, and any confidential document. SammaPix PDF Page Numbers runs entirely in your browser using pdf-lib. The file never leaves your device, text stays selectable, and the custom start number feature handles documents that are part of a larger paginated sequence — such as a thesis chapter starting at page 47 or a legal appendix continuing from the main brief.",
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
    "number pdf pages",
    "add pagination to pdf",
    "pdf add page numbers no upload",
    "number pdf pages without uploading",
    "pdf pagination private",
    "pdf page numbering browser",
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
  name: "How to Number PDF Pages Without Uploading",
  description:
    "Add page numbers to a PDF in your browser with no file upload, using SammaPix PDF Page Numbers powered by pdf-lib. Supports custom start numbers, multiple formats, and six positions. Free, no signup.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Page Numbers (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Page Numbers tool",
      text: "Go to sammapix.com/tools/pdf-page-numbers in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF",
      text: "Drag your PDF onto the dropzone or click to browse. The file is read entirely in browser memory. Nothing is uploaded to any server — verifiable via the browser Network inspector.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set the start number",
      text: "If your document is part of a larger sequence — a thesis chapter, a legal appendix, a report section — set the start number to the correct value. Leave it at 1 for standalone documents.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose position and format",
      text: "Select a position (bottom-center is the most common academic and legal default) and a format: plain number, current/total, or Page N of N.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Adjust font size if needed",
      text: "The default font size works for most A4 and letter documents. Increase it for large-format PDFs or decrease it for dense layouts.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Click Add Page Numbers and download",
      text: "pdf-lib writes vector text page numbers directly onto each page. Download the result. The numbers are selectable text in any PDF viewer — not a rasterized image stamp. No upload occurred.",
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
      name: "Is there a way to number PDF pages without uploading the file anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix PDF Page Numbers runs the entire numbering process inside your browser using pdf-lib, an open-source JavaScript library for reading and writing PDFs. When you drop your PDF into the tool, the file is read via the browser's FileReader API and stays in browser memory throughout. pdf-lib writes the page numbers directly into the PDF's content streams, and the output is downloaded as a blob URL — no network request carries your file at any point. You can verify this by watching the Network tab in browser DevTools (F12) while the tool runs.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I need to number PDF pages without uploading — is privacy really a concern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For many documents the privacy concern is real and legally significant. Theses and dissertations often contain unpublished research. Legal briefs contain privileged attorney-client information. Medical reports contain protected health data. Financial reports contain confidential business figures. Contracts contain terms that parties have not yet disclosed. Uploading any of these to a third-party server — even one that promises deletion after an hour — creates a chain of custody problem. You have no way to verify that the file was deleted, that it was not cached in a CDN, or that it was not accessed by the service's staff or systems. Running the numbering in your own browser eliminates this risk entirely.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'custom start number' mean and when do I need it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A custom start number lets you set the page number that appears on the first page of the PDF to any value you choose, rather than always starting at 1. You need this whenever the PDF is part of a larger document sequence. Common cases: a thesis chapter 3 whose pages run 47 to 89 in the full document; a legal appendix that continues pagination from the main brief; a contract addendum whose pages follow immediately after the main contract; a report section assembled from a separate file but meant to show continuous numbering when combined with earlier sections. Without a custom start number feature, you would have to add numbers to the entire assembled document at once, which is not always possible when sections arrive from different contributors.",
      },
    },
    {
      "@type": "Question",
      name: "Does numbering a PDF page damage or change the original content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib adds page numbers by writing a new content layer on top of each page — specifically, a new content stream object in the PDF's page dictionary. The original content streams (text, images, fonts, vector graphics, links, form fields) are left completely untouched. The page numbers are additive only. The file size increases by a negligible amount — a few kilobytes for the font embedding and text objects across the entire document, regardless of how many pages it has.",
      },
    },
    {
      "@type": "Question",
      name: "What are the available numbering formats and which should I use for academic submissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports three formats. Plain number shows just the number: 1, 2, 3. This is the standard format for most documents and is used in APA, MLA, and Chicago style guides for body pages. Current of total shows both numbers: 1 / 47, 2 / 47. This is useful for documents where the reader benefits from knowing the total page count — meeting handouts, legal submissions, and proposal decks. Page N of N shows the written-out version: Page 1 of 47, Page 2 of 47. Some academic institutions and courts specifically require this format in their submission guidelines. Check your institution's or court's style guide to confirm which format is expected before numbering.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this tool on a PDF with existing restrictions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the PDF has modification restrictions (owner-password restrictions that prevent editing), you need to remove those restrictions first before adding page numbers. Use the SammaPix PDF Unlock tool to remove the restrictions in your browser, then bring the unlocked PDF into the PDF Page Numbers tool. Both steps run entirely in your browser with no upload. If the PDF requires a password to open (user-password encryption), you will need to enter the correct password in a PDF viewer and export without a password before numbering.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between adding page numbers in a browser tool versus printing to PDF in Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Printing to PDF from Word or another word processor destroys the original PDF structure. The PDF is converted to a raster image (or at best re-rendered as a new vector document), which strips the original text selectability, breaks live hyperlinks, changes font rendering, alters the color profile, and often changes the file size dramatically. Browser-based numbering with pdf-lib adds numbers to the existing PDF without touching any of the existing content. Links remain active, text remains selectable, fonts are unchanged, and the document looks identical to the original except for the added numbers.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NumberPdfPagesNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="number-pdf-pages-no-upload"
        description="For theses, legal briefs, contracts, and confidential reports, uploading to a third-party server to add page numbers is not acceptable. SammaPix runs the entire process in your browser — no upload, no server, no signup — with full control over start number, format, and position."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-privacy-problem", title: "The privacy problem with online PDF numbering tools" },
          { id: "how-it-works-in-browser", title: "How browser-based PDF numbering works technically" },
          { id: "custom-start-number-deep", title: "Custom start number: the feature professionals actually need" },
          { id: "formats-positions-guide", title: "Choosing formats and positions for academic, legal, and business documents" },
          { id: "step-by-step", title: "How to number PDF pages without uploading, step by step" },
          { id: "word-vs-browser", title: "Why printing to PDF from Word is not the right approach" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF numbering: privacy-first comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other browser-based PDF tools for document workflow" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Uploading theses, legal briefs, contracts, or medical reports to third-party numbering services creates a real chain-of-custody problem. Browser-based processing eliminates this risk entirely.",
          "SammaPix PDF Page Numbers runs entirely in your browser via pdf-lib. The file never leaves your device — verifiable in DevTools Network tab.",
          "Custom start number: essential for thesis chapters, legal appendices, and report sections that are part of a larger paginated document.",
          "Three formats: plain number (APA/MLA/Chicago default), current/total (handouts and proposals), Page N of N (some academic and court requirements).",
          "Six positions including bottom-center (the most common academic and legal default). Numbers are vector text — selectable, searchable, sharp at any zoom.",
          "Unlike printing to PDF from Word, browser-based numbering preserves the original PDF exactly: links, fonts, text selectability, and color profiles are untouched.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person working on a legal or academic document at a desk, representing the privacy-sensitive nature of PDFs that need page numbers added without being uploaded to a server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Numbering pages on a confidential PDF should not require uploading it to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Number your PDF pages right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Page Numbers runs entirely in your browser via pdf-lib. Custom start number, three formats,
              six positions. File never leaves your device. Text stays selectable. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-page-numbers"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Page Numbers, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-unlock"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Unlock PDF first <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-merge"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The privacy problem ─────────────────────────────── */}

        <h2 id="the-privacy-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The privacy problem with online PDF numbering tools
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Search for &quot;add page numbers to PDF online&quot; and you will find dozens of tools that do the job. The problem is that almost all of them require you to upload your file to their server. Your PDF goes across the internet, gets processed on hardware you do not control, and comes back numbered. The service promises to delete it after a period.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a recipe PDF or a travel itinerary, this is a trivial concern. For the documents that most commonly need page numbers — academic theses, legal briefs, medical reports, financial forecasts, and draft contracts — it is not. These documents may contain unpublished research, privileged communications, protected health information, or commercially sensitive terms. Uploading them, even briefly, creates risk that cannot be unrolled.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">SammaPix PDF Page Numbers</Link>{" "}
          to eliminate this problem. The tool runs the entire numbering process inside your browser using{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          — a mature, open-source JavaScript library for reading and writing PDFs. No server is involved at any stage.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The chain-of-custody problem
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you upload a confidential PDF to an online service, you create a chain-of-custody question that cannot be easily answered: who processed the file, was it cached on a CDN, did it pass through a logging system, could the service&apos;s staff access it, and was the deletion actually performed? These are not hypothetical concerns — they are exactly the questions that legal teams, IRB reviewers, and institutional compliance offices raise when they discover staff have used consumer web services to process sensitive documents.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Running the numbering in your own browser means the chain of custody is trivially short: the file is on your device, processed by your browser, and the output is on your device. There is nothing else to audit.
        </p>

        {/* ── Section 2: How it works in-browser ─────────────────────────── */}

        <h2 id="how-it-works-in-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF numbering works technically
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the technical mechanism explains both why this works and why the results are better than alternatives like printing to PDF from Word (which destroys the original PDF structure). Here is what happens when you click Add Page Numbers:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader API loads the PDF into browser memory.</strong> The{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
            is a standard browser API that reads local files without any network access. The PDF bytes are loaded into an ArrayBuffer in memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib parses the PDF structure.</strong> The library traverses the PDF&apos;s cross-reference table, page tree, and object dictionary. It builds an in-memory representation of every page, including each page&apos;s dimensions (MediaBox) and its content streams.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">For each page, a new content stream is appended.</strong> pdf-lib adds a content stream that draws the page number as a text object at the calculated position. The position is computed from each page&apos;s MediaBox dimensions, so numbers are correctly placed relative to the actual page size regardless of whether the document mixes page sizes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The text is written as real vector text, not an image.</strong> The content stream uses PDF text operators (BT ... ET) with font references and position coordinates. This is the same way the original body text of the document was written into the PDF. The numbers are real text — selectable, searchable, infinitely scalable without pixelation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is serialized and downloaded.</strong> pdf-lib produces the output PDF as a Uint8Array. A Blob is created and downloaded via a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL. No network request is made at any point during this step.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The critical distinction from rasterization tools: pdf-lib never converts the PDF pages to images. Everything operates at the PDF data structure level. The original content — fonts, text streams, images, vector graphics, hyperlinks, form fields — is preserved byte-for-byte. The only addition is the new page-number content stream on each page.
        </p>

        {/* ── Section 3: Custom start number deep dive ────────────────────── */}

        <h2 id="custom-start-number-deep" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Custom start number: the feature professionals actually need
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most page-numbering tools only offer one option: start at 1. This is fine for standalone documents. It is completely wrong for documents that are part of a larger sequence. The custom start number field is the feature that makes this tool genuinely useful for professional workflows.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Thesis and dissertation assembly workflow
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Academic theses are commonly written in separate chapter documents and assembled into a single PDF only at the end. If you are working in this way and need to share an individual chapter for advisor review — with correct page numbers — you need to set the start number to whatever page that chapter begins on in the full document.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Example: your full thesis will run to 214 pages. Chapter 3 covers pages 47 to 89. Upload chapter 3 as a standalone PDF, set start number to 47, and the numbering on page 1 of that PDF will read 47. When assembled with the other chapters, the numbers will match perfectly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Legal brief and court filing workflow
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Legal filings frequently consist of a main brief plus multiple appendices, each submitted as separate PDFs but paginated continuously. The main brief runs pages 1 to 45. Appendix A runs pages 46 to 58. Appendix B runs pages 59 to 67. Each appendix PDF is numbered independently with its correct start number, so any page reference in the brief or the appendix is unambiguous regardless of which section the reader is looking at.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Corporate report assembly
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Annual reports, audit findings, and due diligence packages are often assembled from sections contributed by different teams. Each team exports their section as a PDF. Before final assembly, each section PDF can be numbered with the correct start number so that the final merged document has consistent pagination matching the table of contents — which is prepared separately with knowledge of how many pages each section runs.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">PDF uploaded</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Start number to set</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Thesis chapter 3 (pages 47–89 in full doc)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Chapter 3 PDF only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">47</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Legal Appendix A (continues from 45-page brief)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Appendix A PDF only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">46</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Contract addendum (follows 22-page main contract)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Addendum PDF only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">23</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Standalone document</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The complete PDF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">1 (default)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Formats and positions ──────────────────────────── */}

        <h2 id="formats-positions-guide" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Choosing formats and positions for academic, legal, and business documents
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Different document types have different conventions. Here is a practical guide to choosing the right combination:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Academic documents (theses, dissertations, journal submissions)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The majority of academic style guides (APA 7th edition, MLA 9th edition, Chicago 17th edition) place page numbers in the header at the top right or in the footer at the bottom center. APA specifically requires the running head and page number in the top right for manuscripts. Chicago-style papers typically use bottom-center. Check your institution&apos;s specific thesis formatting requirements — many universities publish a style guide that specifies exact position and format.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Format: most academic submissions use the plain number format. The Page N of N format is increasingly common for theses where the committee wants to verify completeness.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Legal documents (briefs, filings, contracts)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Court rules vary by jurisdiction. Most US federal courts require page numbers at the bottom center or bottom right. The Page N of N format is explicitly required in some jurisdictions for certain filing types. Review the relevant court&apos;s local rules or the style requirements of the contracting party. For contracts, bottom right is a common professional convention that leaves the document&apos;s header area clean for the party&apos;s letterhead.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Business reports and proposals
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Business documents often have branded headers at the top. Place page numbers at the bottom — center or right — to avoid overlap. The current/total format (e.g., 3 / 12) is popular for proposals and pitch decks because it signals to the reader how much remains without requiring them to scroll to the end.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Number your PDF pages privately — no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Custom start number for thesis chapters, legal appendices, and report sections.
            Six positions, three formats. File never leaves your device. Free.
          </p>
          <Link
            href="/tools/pdf-page-numbers"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Page Numbers, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to number PDF pages without uploading, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check for modification restrictions.</strong> If the PDF was generated by a legal service, form platform, or e-signature tool, it may have owner-password restrictions that prevent modification. Try the tool and it will let you know. If restrictions are present, remove them first using{" "}
            <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link>{" "}
            — also in-browser, no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-page-numbers</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone.</strong> The file loads into browser memory. Nothing is transmitted.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set the start number.</strong> The default is 1. Change it if this PDF is part of a larger sequence.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose position and format.</strong> Refer to the guidance above for academic, legal, and business conventions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Adjust font size if needed.</strong> The default works for standard A4/letter documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Add Page Numbers.</strong> pdf-lib processes the file in memory. Seconds for most documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download and verify.</strong> Open the downloaded PDF in any viewer. Select a page number — it highlights and copies as text, confirming it is a vector text object, not an image.
          </li>
        </ol>

        {/* ── Section 6: Word vs browser ──────────────────────────────────── */}

        <h2 id="word-vs-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why printing to PDF from Word is not the right approach
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A common workaround is to open the PDF in Word (which converts it), add page numbers in Word, then print back to PDF. This approach has significant problems:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Layout destruction.</strong> Word&apos;s PDF import is a conversion, not a lossless read. Tables shift, fonts substitute, images reflow, and text spacing changes. For complex documents — multi-column layouts, footnotes, legal formatting — the result is often unusable.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Hyperlink breakage.</strong> Internal PDF links (table of contents links, cross-references) frequently break during the Word import and re-export cycle.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Font substitution.</strong> If the PDF uses embedded fonts that Word does not have, Word substitutes them with fallback fonts, changing the visual appearance and potentially the line breaks of the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Color profile changes.</strong> PDFs using CMYK or ICC color profiles can have their colors shifted when round-tripped through Word&apos;s RGB-centric workflow.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Metadata loss.</strong> Custom metadata fields, document properties, and PDF/A compliance settings are typically stripped during the Word round-trip.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          pdf-lib adds page numbers without any of these problems because it operates on the PDF at the data structure level. It reads the existing objects and appends new ones. No conversion, no round-trip, no layout engine involved.
        </p>

        {/* ── Section 7: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF numbering: privacy-first comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an honest comparison across dimensions that matter for privacy-sensitive documents:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based tools (iLovePDF, Smallpdf)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix, pdf-lib)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File transmission</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File leaves your device. Transmitted over internet to third-party server.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">File never leaves your device. No transmission at any point.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Chain of custody</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unverifiable. You trust the service&apos;s security and deletion claims.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Fully auditable. Network inspector shows zero outgoing requests.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom start number</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Available on some paid plans. Often locked behind subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Always available. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page number text type</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies by tool. Some rasterize, some write vector text.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Always vector text. Selectable, searchable, sharp at any zoom.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Original document preserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually, but some tools re-export the PDF, altering fonts or images.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Yes. Only a new content layer is added. Existing content untouched.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required. Creates an account with a record of your file.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">No account required. No record of your file.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Suitable for confidential documents</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-red-600 dark:text-red-400">No — file leaves your control.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Yes — file never leaves your device.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a privacy claim this important, you should not take my word for it. Here is how to verify it in under two minutes using your browser&apos;s built-in tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu in Settings → Advanced first.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab and clear it.</strong> Click the Network panel. Use the clear button to remove any existing requests. This gives you a clean log to watch.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF and run the tool.</strong> Watch the Network panel as you drop the PDF, configure the settings, click Add Page Numbers, and click Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe the results.</strong> You will see requests for JavaScript, CSS, and font assets when the page first loads. During numbering and download, you will see zero outgoing requests. No request carries your PDF bytes anywhere.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This verification method is the same one used by security researchers and compliance auditors to confirm that a tool genuinely processes data locally. It is conclusive: if no bytes of your file appear in outgoing requests, the file never left your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your confidential PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Custom start number for thesis chapters, legal appendices, and report sections.
            Vector text page numbers. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-page-numbers"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Page Numbers, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-page-numbers-to-pdf-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full page numbering guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other browser-based PDF tools for document workflow
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a complete suite of browser-based PDF tools. All run in your browser with no upload. Here is how they fit into a typical document preparation workflow:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">PDF Page Numbers</Link></strong>: add page numbers — six positions, three formats, custom start number. Vector text. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: remove modification and copy restrictions before numbering. See the full guide at{" "}
            <Link href="/blog/unlock-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Unlock a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine sections before adding continuous page numbers to the merged whole.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract the relevant pages before numbering a section, if working with a larger source document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce the file size of the final numbered document before sending. See{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: correct page orientation before numbering to ensure numbers appear on the right edge of each page.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Complete private PDF workflow — all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Number, unlock, compress, split, merge, and rotate PDFs without uploading them anywhere.
            All tools run locally via pdf-lib. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-page-numbers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Page Numbers <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-unlock"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Unlock PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-merge"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
