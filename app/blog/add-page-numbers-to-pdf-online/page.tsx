import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add Page Numbers to a PDF Online Free [2026]",
  description:
    "Add page numbers to any PDF in your browser — no upload, no server, no signup. Choose position, format (1, 1/N, Page 1 of N), font size, and start number. Text stays selectable. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-page-numbers-to-pdf-online`,
  },
  keywords: [
    "add page numbers to pdf",
    "insert page numbers pdf",
    "pdf page numbering online",
    "add page numbers to pdf free",
    "pdf page numbers no upload",
    "number pdf pages online",
    "add pagination to pdf",
    "pdf add page numbers browser",
    "add page numbers pdf no signup",
    "insert page numbers pdf online free",
  ],
  openGraph: {
    title: "How to Add Page Numbers to a PDF Online Free [2026]",
    description:
      "Add page numbers to a PDF in your browser. No file upload, no server, no signup. Multiple positions, formats, font sizes, and custom start numbers. Text stays selectable. Free.",
    url: `${APP_URL}/blog/add-page-numbers-to-pdf-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add Page Numbers to a PDF Online Free [2026]",
    description:
      "PDF page numbering that runs 100% in your browser via pdf-lib. No upload, no server. Multiple positions, formats, start numbers. Text stays selectable. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-page-numbers-to-pdf-online`;
const POST_TITLE = "How to Add Page Numbers to a PDF Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most tools that add page numbers to PDFs either require a desktop install or upload your file to a remote server. SammaPix PDF Page Numbers adds numbering entirely in your browser using pdf-lib. The file never leaves your device, text stays selectable and searchable, and you get full control over position, format, font size, and start number. This guide explains how it works, why selectable text matters, and when custom start numbers are essential.",
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
    "add page numbers to pdf",
    "insert page numbers pdf",
    "pdf page numbering online",
    "add page numbers to pdf free",
    "number pdf pages online",
    "add pagination to pdf",
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
  name: "How to Add Page Numbers to a PDF Online for Free",
  description:
    "Add page numbers to a PDF in your browser using SammaPix PDF Page Numbers, powered by pdf-lib. Choose position, format, font size, and start number. No upload, no signup. Free.",
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
      name: "Drop your PDF onto the tool",
      text: "Drag your PDF onto the dropzone or click to browse. The file is loaded into browser memory via the FileReader API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose a position for the page numbers",
      text: "Select where the numbers should appear: bottom-center (most common), bottom-right, bottom-left, top-center, top-right, or top-left. A preview updates as you choose.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose a format and set the start number",
      text: "Pick a numbering format: '1' (plain number), '1 / N' (current of total), or 'Page 1 of N' (written out). Set the start number if your document begins mid-sequence — for example, set 3 if this PDF is chapter 3 of a thesis that starts at page 3.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Adjust font size if needed",
      text: "Choose a font size. The default works for most documents. Increase it for large-format PDFs or decrease it for densely packed pages where you want minimal visual intrusion.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Click Add Page Numbers and download",
      text: "pdf-lib writes vector text directly onto each page. The output PDF downloads from browser memory via a blob URL. No network request is made. Open the PDF — page numbers are selectable text, not a rasterized image.",
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
      name: "Does adding page numbers to a PDF online require uploading the file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, and Adobe Online upload your PDF to their servers for processing. With SammaPix PDF Page Numbers, no. The numbering runs entirely in your browser using pdf-lib, an open-source JavaScript library for reading and writing PDFs. Your file never leaves your device. You can verify this by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none during the numbering or download step.",
      },
    },
    {
      "@type": "Question",
      name: "Are the page numbers selectable text or just an image stamped on the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The page numbers are real selectable vector text, not a rasterized image. pdf-lib writes the numbers directly into the PDF's content stream as text objects using a standard font. This means you can select and copy a page number in any PDF viewer, the numbers are searchable, they remain sharp at any zoom level (they do not pixelate), and their file size contribution is minimal — a few kilobytes for the entire document regardless of page count. This is the key technical difference from tools that screenshot-stamp or flatten the numbering as an image layer.",
      },
    },
    {
      "@type": "Question",
      name: "What page number formats are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports three formats. The first is a plain number: 1, 2, 3. This is the most common format for books, reports, and contracts. The second is current of total: 1 / 14, 2 / 14. This is useful for documents where readers need to know how many pages remain — legal submissions, proposal decks, and meeting handouts. The third is written out: Page 1 of 14, Page 2 of 14. This is preferred for formal documents like academic theses, grant applications, and court filings where the format is specified by style guidelines.",
      },
    },
    {
      "@type": "Question",
      name: "What positions can I place the page numbers in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports six positions: bottom-center (the default, used in most academic and legal documents), bottom-right (common in reports and business proposals), bottom-left, top-center, top-right, and top-left. Each position is calculated with appropriate margin from the edge so numbers do not overlap with content. If your PDF has a header or footer with existing content, choose the opposite edge to avoid overlap.",
      },
    },
    {
      "@type": "Question",
      name: "Can I start the page numbers from a number other than 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The start number field lets you set any starting value. This is essential for documents that are part of a larger sequence: a thesis chapter 3 that runs pages 47 through 89, a contract appendix where page numbering continues from the main document, a report section that needs to match an existing table of contents, or a legal brief where court rules require continuation from the prior filing. Set the start number to whatever value the first page of this PDF should display.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding page numbers change the existing content of the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib adds a new content layer on top of each page for the number text. The original page content — text, images, fonts, links, form fields, and page dimensions — is completely unchanged. The file size increases by a negligible amount (a few kilobytes total for the font and text objects). If your PDF has restrictions on modification, remove them first using the SammaPix PDF Unlock tool, then add page numbers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify that no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows and Linux, Command Option I on Mac), click the Network tab, and clear any existing requests. Then drop your PDF into the SammaPix PDF Page Numbers tool, configure your options, and click Add Page Numbers. Watch the Network panel throughout. You will see requests for static page assets when the tool loads. During numbering and the download step, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is served as a blob URL — no network call is made at any point.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddPageNumbersToPdfOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-page-numbers-to-pdf-online"
        description="Most tools that add page numbers to a PDF either require a desktop install or upload your file to a server. SammaPix runs the whole process in your browser: no upload, no signup, no server. Here is exactly how it works, what options you get, and why the text stays selectable."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "why-page-numbers-matter", title: "Why adding page numbers to a PDF is harder than it looks" },
          { id: "selectable-text-vs-image", title: "Selectable text vs image stamp: the difference that matters" },
          { id: "how-browser-numbering-works", title: "How browser-based PDF page numbering works" },
          { id: "positions-and-formats", title: "Positions, formats, and font size: what to choose" },
          { id: "step-by-step", title: "How to add page numbers to a PDF online, step by step" },
          { id: "start-number", title: "When to use a custom start number" },
          { id: "comparison-table", title: "Browser-based vs upload-based page numbering tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online tools that add page numbers upload your PDF to a remote server. SammaPix runs entirely in your browser — your file never leaves your device.",
          "The page numbers are real selectable vector text written by pdf-lib, not a rasterized image stamp. They remain sharp at any zoom level and are searchable.",
          "Six positions: bottom-center, bottom-right, bottom-left, top-center, top-right, top-left. Three formats: plain number, current/total, and Page N of N.",
          "Custom start number support: essential for thesis chapters, legal briefs, and appendices that continue pagination from an earlier document.",
          "Processing is verifiable: open DevTools Network tab and watch — zero outgoing requests during numbering or download.",
          "Works on any PDF that opens without a password. If the PDF has modification restrictions, remove them first with PDF Unlock, then add numbers.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing a multi-page document on a desk, representing the need to add page numbers to a PDF for professional document presentation."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding page numbers to a PDF should not require uploading your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add page numbers to your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Page Numbers runs entirely in your browser via pdf-lib. Choose position, format, font size,
              and start number. Text stays selectable and searchable. Your file never leaves your device. Free, no signup.
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
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-unlock"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Unlock PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why page numbers matter ─────────────────────────── */}

        <h2 id="why-page-numbers-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why adding page numbers to a PDF is harder than it looks
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You have a 30-page PDF. A client, professor, or court clerk needs page numbers so they can reference specific sections. The document has none. You search for a way to insert them and quickly discover the problem: most free tools either require installing desktop software or uploading your PDF to a third-party server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Acrobat can do it — but only on the paid desktop version. Word can do it if you convert to DOCX first, but that breaks the layout. iLovePDF and Smallpdf do it, but your file goes to their servers. For a generic file that is fine. For a legal brief, a thesis draft, a contract, or a confidential report, uploading to a third party is a real privacy concern.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">SammaPix PDF Page Numbers</Link>{" "}
          to solve this by running the entire process inside your browser using{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          — an open-source JavaScript library for reading and writing PDFs. No server is involved at any point. And unlike tools that stamp a screenshot of the page number as an image, this tool writes real vector text that stays selectable and searchable.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &quot;no upload&quot; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Page Numbers, your browser reads it using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without any network access. The file stays in browser memory throughout. pdf-lib processes it and writes the page numbers in memory. The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly. Zero network requests carry your file.
        </p>

        {/* ── Section 2: Selectable text vs image stamp ───────────────────── */}

        <h2 id="selectable-text-vs-image" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Selectable text vs image stamp: the difference that matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the technical distinction that separates a proper page-numbering tool from a quick hack. There are two fundamentally different ways to add a page number to a PDF page:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Image stamp (the wrong approach)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some tools render the page to a canvas, draw the page number as a pixel value, then flatten everything back into an image embedded in the PDF. The result looks identical on screen but the page number is part of the image. You cannot select it. You cannot search for it. Zooming in reveals pixelation if the resolution was low. The file size increases significantly because each page becomes a raster image rather than a compact text-and-vector document.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Vector text (the right approach, how pdf-lib works)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          pdf-lib adds the page number by writing a new content stream to the PDF page. This content stream contains actual text instructions: the character string, the font reference, the position, and the size. The PDF viewer renders this as real, sharp text — identical to how the body text of the document was written in the first place. The number is selectable, searchable, perfectly sharp at any zoom level, and contributes only a few kilobytes to the file size for the entire document.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Image stamp approach</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Vector text (pdf-lib, SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Selectable in PDF viewer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-red-600 dark:text-red-400">No — it is part of the image</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Yes — real text, selectable and copyable</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Searchable</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-red-600 dark:text-red-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Sharpness at high zoom</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on raster resolution</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Always sharp — vector rendering</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size impact</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Large — each page becomes an image</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Negligible — a few KB for the whole document</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Original content preserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — page is rasterized and rebuilt</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] text-green-700 dark:text-green-400">Yes — only a new content layer is added</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: How browser numbering works ──────────────────────── */}

        <h2 id="how-browser-numbering-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF page numbering works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is exactly what happens under the hood when you click Add Page Numbers:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib loads and parses the PDF.</strong> The library reads the PDF binary — cross-reference table, page tree, content streams, font resources. This happens entirely in browser memory. No network request.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The tool reads each page&apos;s dimensions.</strong> PDFs can have pages of different sizes (A4 mixed with A3, for example). The numbering position is calculated relative to each page&apos;s actual dimensions, so &quot;bottom-center&quot; is always visually centered regardless of page size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A text annotation is added to each page&apos;s content stream.</strong> pdf-lib appends a new content stream that draws the page number string at the calculated position using a standard embedded font. The string reflects your chosen format (plain number, current/total, or Page N of N) and start number.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is serialized back to bytes.</strong> pdf-lib produces the output PDF in memory. The original page content is untouched. Only the new content streams are added.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is offered for download.</strong> The numbered PDF is stored as a Blob and downloaded via a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL directly from memory. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key technical advantage: because pdf-lib operates at the PDF specification level — reading and writing the actual PDF data structures, not rendering to pixels — it preserves everything in the original document. Links stay active. Form fields stay functional. Existing text stays selectable. The only addition is the numbering layer.
        </p>

        {/* ── Section 4: Positions and formats ──────────────────────────── */}

        <h2 id="positions-and-formats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Positions, formats, and font size: what to choose
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The right combination depends on your document type. Here is practical guidance for each option:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Position
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Position</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Bottom center</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most documents: reports, theses, books, academic papers. The default convention in most style guides (APA, MLA, Chicago).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Bottom right</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business proposals, contracts, slide decks exported to PDF. Common in corporate settings where the document has a branded header at the top.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Bottom left</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Right-to-left documents, or when the bottom right is already occupied by a watermark or logo.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Top center</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Documents with footer content (tables, references) that should not be interrupted. Some legal filings.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Top right / Top left</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Documents with existing bottom footers. Choose the opposite corner from any existing page decoration.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Format
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The three formats serve different communication goals:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Plain number (1, 2, 3)</strong>: The most minimal format. Use this when the document is a standalone piece and the reader knows how many pages it has from the email or description. Best for books, long-form reports, and academic submissions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Current / Total (1 / 14, 2 / 14)</strong>: Adds context about total length. Useful for meeting handouts, legal submissions, and any document where the reader needs to know how many pages to expect. Shows immediately if pages are missing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Page N of N (Page 1 of 14)</strong>: The most formal written-out format. Required by some academic institutions, courts, and government agencies whose style guidelines specify it. Clearest for reviewers who are unfamiliar with the document.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Font size
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The default font size (typically 10–11pt) works well for standard A4 and letter-size PDFs. Increase it for large-format documents (A3, tabloid) where numbers need to be readable at a distance. Decrease it for densely packed PDFs where you want the number to be visible but unobtrusive — for example, a data table where the number should not compete visually with the content.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add page numbers to your PDF in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Vector text, not an image stamp. Six positions, three formats, custom start number.
            No upload. No signup. Free.
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
          How to add page numbers to a PDF online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-page-numbers</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. The file is loaded into browser memory. If your PDF has modification restrictions, the tool will let you know — remove them first with{" "}
            <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link>{" "}
            before numbering.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a position.</strong> Bottom center is the default and works for most documents. See the position table above for guidance.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a format.</strong> Select plain number, current/total, or Page N of N depending on your document type.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set a start number if needed.</strong> Leave it at 1 for standalone documents. Change it if this PDF is part of a larger sequence — see the next section for when this matters.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Adjust font size if needed.</strong> The default works for standard documents. Increase for large-format PDFs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Add Page Numbers.</strong> pdf-lib processes the file in memory. Processing takes seconds even for large documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the numbered PDF.</strong> Click Download. The file is served from browser memory as a Blob. Open it in any PDF viewer — the page numbers are selectable text.
          </li>
        </ol>

        {/* ── Section 6: Custom start number ───────────────────────────────── */}

        <h2 id="start-number" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When to use a custom start number
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The start number feature is essential for documents that are not standalone. Here are the most common cases:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Thesis and dissertation chapters
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Academic theses are often assembled from separate chapter PDFs before final submission. If your chapter 3 begins at page 47 in the full document, you upload only chapter 3&apos;s PDF but set the start number to 47. The resulting PDF will show 47, 48, 49... on its pages, matching the table of contents when the thesis is assembled.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Legal briefs and court filings
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Legal submissions frequently consist of a main brief plus separately paginated appendices, with each appendix continuing the page count from the previous section. Setting the correct start number ensures attorneys and judges can reference &quot;page 112&quot; unambiguously regardless of which section they are in.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contract appendices and addenda
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A 12-page main contract followed by a 4-page appendix A and a 7-page appendix B should have continuous pagination (1–12, 13–16, 17–23) if the parties want to reference page numbers unambiguously. Upload each PDF section separately, setting the appropriate start number for each.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Report sections assembled from multiple sources
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When a final report is assembled from PDFs contributed by different team members or departments, each section needs to know its starting page before page numbers are added. The start number field handles this precisely without requiring any desktop software.
        </p>

        {/* ── Section 7: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based page numbering tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool to add page numbers to a PDF:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. You trust their security and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Page number type</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some tools rasterize; others write vector text.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always vector text via pdf-lib. Selectable, searchable, infinitely sharp.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom start number</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Available on some paid plans. Often not available on free plans.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always available. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Number formats</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies by tool. Not all support current/total or written-out format.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Three formats: plain number, current/total, and Page N of N.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Original content preserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually, but some tools re-export the PDF, which can alter fonts or images.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Only a new content layer is added. Links, forms, and fonts are untouched.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size change</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some tools re-render the PDF, which can increase size significantly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Negligible. Only a few kilobytes added for the font and text objects.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires a server connection.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, numbering works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari, enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel. Clear any existing requests using the clear button.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF and click Add Page Numbers.</strong> Watch the Network panel throughout.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during numbering or download. The only requests visible are the initial page load assets. Nothing carries your file to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same verification method security researchers use to audit tools that claim to be privacy-safe. It is straightforward and conclusive. If no request carries your PDF bytes outbound, the file stayed on your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Vector text page numbers, six positions, three formats, custom start number. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-page-numbers"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Page Numbers, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/number-pdf-pages-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Number pages privately (no upload guide) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is how they complement page numbering:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">PDF Page Numbers</Link></strong>: add page numbers in any position and format, with custom start numbers. Vector text, no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: if your PDF has modification restrictions, remove them here first before adding page numbers. See{" "}
            <Link href="/blog/unlock-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Unlock a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine the chapter or section PDFs first, then add page numbers to the merged document for continuous pagination.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract a section before numbering it, if you only need to number certain pages rather than the whole document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce the file size of the numbered PDF before sending it. See{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix page orientation before numbering to ensure numbers appear correctly on all pages.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Number, unlock, compress, split, merge, and rotate PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf-lib. No server. No signup. No watermark.
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
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
