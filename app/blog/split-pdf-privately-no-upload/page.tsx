import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Split a PDF Privately, No Upload, In Your Browser",
  description:
    "Split a PDF, extract pages, or separate a PDF into individual pages entirely in your browser. No upload, no server, no signup. Works with bank statements, contracts, and medical records. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/split-pdf-privately-no-upload`,
  },
  keywords: [
    "split pdf",
    "split pdf free",
    "extract pdf pages",
    "split pdf into pages",
    "separate pdf pages",
    "split pdf no upload",
    "split pdf without uploading",
    "pdf splitter private",
    "split pdf browser",
    "extract pages from pdf",
  ],
  openGraph: {
    title: "How to Split a PDF Privately, No Upload, In Your Browser",
    description:
      "Extract pages, split into individual PDFs, or split every N pages, all in your browser. No file upload. Works safely with bank statements, contracts, and medical records.",
    url: `${APP_URL}/blog/split-pdf-privately-no-upload`,
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Split a PDF Privately, No Upload, In Your Browser",
    description:
      "Split PDFs, extract pages, and separate PDFs in seconds. No upload, no server. Private by design.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-21";
const POST_DATE_FORMATTED = "June 21, 2026";
const POST_URL = `${APP_URL}/blog/split-pdf-privately-no-upload`;
const POST_TITLE = "How to Split a PDF Privately, No Upload, In Your Browser";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF splitters upload your document to a remote server, which is a serious privacy risk when the PDF is a bank statement, a signed contract, or a medical record. SammaPix splits PDFs entirely in the browser using pdf-lib, with no server upload, no signup, and no watermark. This guide explains the three split modes, who needs them, and how to use them safely.",
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
    "split pdf",
    "split pdf free",
    "extract pdf pages",
    "split pdf into pages",
    "separate pdf pages",
    "split pdf no upload",
    "pdf splitter private",
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

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it safe to use an online PDF splitter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on how the tool works. Most popular PDF splitters (iLovePDF, Smallpdf, PDF2Go, and similar) upload your file to their servers for processing. That means your document travels over the internet and sits on a third-party server, even if only for a few minutes. SammaPix splits PDFs entirely inside your browser using pdf-lib, a JavaScript PDF library. Your file is read locally by your browser and never sent to any server. For sensitive documents like bank statements, signed contracts, or medical records, the in-browser approach is far safer.",
      },
    },
    {
      "@type": "Question",
      name: "How do I extract specific pages from a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In SammaPix's browser PDF splitter at sammapix.com/tools/pdf-split, choose the 'Extract page range' mode and enter the pages you want. You can specify a simple range like 1-3, individual pages like 1,4,7, or combinations like 1-3,5,8-10. The tool will produce a new PDF containing only those pages. Nothing is uploaded. The output downloads directly to your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I split a PDF into individual pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix's PDF splitter has a dedicated 'Split into individual pages' mode. It produces one PDF per page and packages them as a ZIP file for download. This is useful when you need to share or archive each page separately, for example when splitting a batch of scanned invoices.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between splitting and merging a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Splitting takes one PDF and produces multiple smaller PDFs (or individual pages). Merging takes multiple PDFs and combines them into one. SammaPix offers both: the PDF Split tool at sammapix.com/tools/pdf-split and the PDF Merge tool at sammapix.com/tools/pdf-merge. Both run entirely in your browser with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "Does the split PDF have a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix does not add watermarks to split PDF files. The output is a clean PDF containing exactly the pages you selected. No branding, no watermark, no registration required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I split a password-protected PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your PDF is protected with an owner password (which restricts editing and extraction), you will need to unlock it first before splitting. If it is protected with a user password (which requires a password to open), you need the password to load the file in the first place. SammaPix will prompt for the password if needed, and all processing remains local in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I need to split a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common reasons: extracting one invoice from a year of monthly statements bundled in a single PDF, pulling a signed contract page from a multi-document bundle, sharing a single chapter from a manual without sending the full document, separating a batch of scanned forms into individual files, or reducing file size by removing pages you do not need before sending by email.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SplitPdfPrivatelyPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="split-pdf-privately-no-upload"
        description="You need one page from a 40-page bank statement. You need a single contract from a bundled PDF. Every common tool makes you upload the whole document to a stranger's server. Here is how to split PDFs entirely in your browser, so the file never leaves your device."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "the-problem-with-pdf-splitters", title: "The problem with every common PDF splitter" },
          { id: "three-ways-to-split", title: "The three ways to split a PDF" },
          { id: "how-to-split-in-browser", title: "How to split a PDF in your browser, step by step" },
          { id: "who-needs-this", title: "Who actually needs to split PDFs privately" },
          { id: "upload-risk", title: "Why uploading a sensitive PDF is a real risk" },
          { id: "upload-vs-browser-comparison", title: "Upload-based tools vs browser-based tools: an honest comparison" },
          { id: "split-vs-other-operations", title: "Split vs merge vs redact: which operation do you need?" },
          { id: "practical-tips", title: "Practical tips for splitting PDFs cleanly" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF splitters (iLovePDF, Smallpdf, PDF2Go) upload your file to a remote server. For bank statements, contracts, and medical records, this is a real privacy risk.",
          "SammaPix splits PDFs 100 percent in the browser using pdf-lib. The file never leaves your device.",
          "Three split modes: extract a page range (e.g. pages 1 to 3, 5, 8 to 10), split into individual pages, or split every N pages.",
          "Output is a clean PDF or a ZIP of multiple PDFs. No watermark, no signup, no file size limit on the browser itself.",
          "For hiding sensitive content rather than removing pages, use the Redact tool. For combining PDFs, use the Merge tool.",
          "pdf-lib is an open-source JavaScript library. You can verify no network requests are made by opening your browser's network inspector while using the tool.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A desk with printed documents, a laptop, and paperwork, representing the kind of sensitive documents people need to split without uploading to a server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Splitting a PDF should not mean uploading a private document to a stranger&apos;s server.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Split your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Splitter runs entirely in your browser using pdf-lib. Extract pages, split into
              individual PDFs, or split every N pages. Your file never leaves your device. No signup, no
              watermark, free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-split"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the Split PDF tool, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-merge"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/redact-pdf"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Redact PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The problem with every common PDF splitter ─────── */}

        <h2 id="the-problem-with-pdf-splitters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem with every common PDF splitter
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Picture this: your accountant asks for a single invoice from last October. You have all twelve months bundled in one PDF that your bank sent you in January. The file is 38 pages long. You need page 9.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You search for "split PDF" and land on one of the big tools: iLovePDF, Smallpdf, PDF2Go, or Adobe Acrobat Online. You drag the file in. The tool uploads it to a server somewhere. Processing happens remotely. You download the result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You got your page. But your bank statement, with your account number, your balance, your full transaction history, your name and address, just spent time on a server you know nothing about. Their privacy policy says they delete files after an hour, or maybe 24 hours. But there is no way to verify that. You do not know who else has access to that server. You do not know where it is hosted or what their security posture looks like.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built the{" "}
          <Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">SammaPix PDF Splitter</Link>{" "}
          specifically to solve this. It runs entirely in your browser using{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>,
          an open-source JavaScript PDF library. The file never leaves your device. No server processes it. No server stores it. The split happens on your CPU, in your browser tab, and the output is downloaded directly from browser memory.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to verify it yourself
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want proof rather than my word, open the browser&apos;s developer tools (F12 on Windows/Linux, Command Option I on Mac), go to the Network tab, and drop a PDF into the splitter. Watch the network requests. You will see requests for the page assets when the tool loads, and nothing else when you perform the split. No outgoing request carries your file. The PDF processing is entirely local.
        </p>

        {/* ── Section 2: Three ways to split a PDF ──────────────────────── */}

        <h2 id="three-ways-to-split" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The three ways to split a PDF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all splitting is the same. There are three distinct operations, and knowing which one you need will save you time. Here is a breakdown of each mode in SammaPix:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Mode</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it does</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">When to use it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Extract a page range</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Produces one new PDF containing only the pages you specify. Accepts ranges like pages 1 to 3, individual pages like 1, 4, 7, or combinations like 1 to 3, 5, 8 to 10.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Extracting one invoice from a statement bundle, pulling a specific section from a report, sharing a chapter from a manual.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Split into individual pages</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Produces one PDF per page, packaged together as a ZIP download. A 12-page PDF becomes 12 separate single-page PDFs.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Archiving scanned documents page by page, uploading forms to a system that only accepts single-page PDFs, distributing slides individually.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Split every N pages</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Divides the PDF into equal chunks. A 30-page PDF split every 5 pages produces 6 files of 5 pages each. If the total does not divide evenly, the last file contains the remainder.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Splitting a large scanned batch into sets, dividing a long report into chapters of fixed size for distribution.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All three modes produce clean PDFs with no watermark. The extract-range and split-every-N modes produce a single PDF download. The split-into-individual-pages mode produces a ZIP file.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Split your PDF right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Three modes: extract a page range, split into individual pages, or split every N pages.
            Runs in your browser via pdf-lib. No upload. No signup. Free.
          </p>
          <Link
            href="/tools/pdf-split"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the Split PDF tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 3: Step by step how to split ─────────────────────── */}

        <h2 id="how-to-split-in-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to split a PDF in your browser, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The process is the same regardless of which split mode you choose. Here is the full walkthrough:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-split</strong> in any modern browser: Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the tool</strong> or click to browse for it. The file is read locally. Nothing is uploaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your split mode.</strong> Select extract a page range, split into individual pages, or split every N pages.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter your parameters.</strong> For range extraction, type the pages you want, for example: 1-3 for pages 1 to 3, or 1,4,7 for those three specific pages, or 1-3,5,8-10 for a combination. For the split-every-N mode, enter the chunk size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Split.</strong> pdf-lib processes the document locally. For a typical PDF this takes under a second on any modern device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download your output.</strong> The resulting PDF (or ZIP file for individual-page splits) is offered for download directly from browser memory. It never touched a server.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Page range syntax reference
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The page range field accepts flexible input. Here are the common patterns:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">1-5</strong>: extract pages 1 to 5 inclusive.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">3</strong>: extract only page 3.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">1,4,7</strong>: extract pages 1, 4, and 7.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">1-3,5,8-10</strong>: extract pages 1 to 3, then page 5, then pages 8 to 10.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Pages are numbered from 1. You cannot go above the total page count of your document (the tool shows the count after you drop the file).
        </p>

        {/* ── Section 4: Who needs this ─────────────────────────────────── */}

        <h2 id="who-needs-this" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Who actually needs to split PDFs privately
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The privacy concern is not abstract. These are the real cases where uploading a PDF to a third-party server creates genuine risk:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Accountants and financial professionals
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Banks send annual statements as multi-page PDFs. An accountant might need only the Q4 pages, or a single month. Uploading a client&apos;s bank statement to iLovePDF means that statement, which contains the client&apos;s full name, account number, IBAN, balance, and every transaction, just went to a server. In many jurisdictions this creates a data protection liability under{" "}
          <a href="https://gdpr.eu/article-5-how-to-process-personal-data/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">GDPR Article 5</a>{" "}
          if the server is outside the EU or if the tool is not a vetted data processor.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Lawyers and legal professionals
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Legal bundles are often enormous, combining dozens of contracts, correspondence, and exhibits into a single PDF. When a lawyer needs to extract one signed contract or one exhibit to send to opposing counsel, uploading the entire bundle to a consumer PDF tool exposes privileged communications and confidential client data to a third party. Attorney-client privilege is a serious concern here. The safest approach is local processing, always.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          HR and people operations
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Employment contracts, salary information, performance reviews, and disciplinary records often arrive as bundled PDFs that HR needs to split into individual employee files. These documents contain personally identifiable information, salary figures, and potentially sensitive medical or personal details. Processing them on a consumer upload-based tool is not something most data protection officers would approve.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Healthcare workers
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Medical records and test results sometimes arrive as multi-patient PDFs, or a patient&apos;s full record needs to be split into individual episodes. HIPAA in the United States and similar regulations elsewhere create strict rules about where patient data can be processed. A consumer PDF tool is not a HIPAA Business Associate. Splitting medical PDFs in the browser ensures patient data stays on the device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Anyone with a personal document
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to be a professional for this to matter. A passport scan, a lease agreement, a medical bill, a tax return: these are documents most people split at some point, and all of them contain information that should not leave your device unnecessarily.
        </p>

        {/* ── Section 5: Why uploading is a risk ───────────────────────── */}

        <h2 id="upload-risk" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why uploading a sensitive PDF is a real risk
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The privacy policies of major PDF tools describe what they do with your files. Here is what the typical language actually means in practice:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          "We delete your files within 1 hour" means your file is on their servers for up to 1 hour
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          During that hour, the file can in principle be accessed by anyone with access to that server: sysadmins, contractors, attackers who have breached the server, or law enforcement with a warrant. You have no way to verify the deletion actually happens on schedule, or that backups are also deleted.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          "We use encryption in transit" means the file is protected while moving to their server, not while on it
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          HTTPS protects the file while it travels from your browser to their server. Once it arrives, it is decrypted so their server can process it. At that point the protection of your data depends entirely on their internal security practices, not on you.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          "We do not share your files with third parties" still allows for subprocessors
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most consumer tools run on AWS, Google Cloud, or Azure. Their privacy policy may technically be accurate while still meaning your file sits on an Amazon-managed server, in a data center operated by Amazon, where Amazon employees have physical access to the hardware. For most documents this is a minor concern. For financial or medical data, it matters.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I am not saying these companies are malicious. I am saying the risk is structural and real, and it is entirely avoidable by using a tool that processes the file locally.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Keep your PDF on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix PDF Splitter uses pdf-lib in your browser. Extract pages 1 to 3, split into individual pages,
            or split every 5 pages. Zero upload. Bank statements, contracts, medical records: none of it leaves
            your device.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open the Split PDF tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/redact-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Redact PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 6: Upload vs browser comparison ───────────────────── */}

        <h2 id="upload-vs-browser-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Upload-based tools vs browser-based tools: an honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective breakdown of how the two approaches compare across the dimensions that actually matter:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (iLovePDF, Smallpdf, etc.)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File travels to and is stored on a remote server. You trust their deletion policy.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. No server involved. Verifiable via network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Large PDFs can take 30 to 60 seconds.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Processing is local. Typical split takes under 1 second on modern hardware regardless of file size.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans often cap at 5 to 25 MB per file. Larger files require a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by available device memory (typically gigabytes). Practical limit is very high.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required for anything beyond basic use. Sometimes even for viewing results.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Watermarks</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans add watermarks to output PDFs. Removing requires a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No watermarks on any output, free or otherwise.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires internet connection throughout.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, splitting works with no internet connection needed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">GDPR / data compliance</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">May require a Data Processing Agreement (DPA) for business use with personal data.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No data processing agreement needed: no data is processed by any server.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are handling personal or sensitive documents professionally, the browser-based approach is not just convenient: it eliminates an entire category of risk and compliance headache.
        </p>

        {/* ── Section 7: Split vs merge vs redact ───────────────────────── */}

        <h2 id="split-vs-other-operations" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Split vs merge vs redact: which operation do you need?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          People sometimes confuse these three operations because they all involve changing a PDF. Here is a clear breakdown of when to use each, and where to find each tool:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Split when: you want fewer pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Splitting removes pages by producing a new document with only the pages you want. The original PDF is unchanged on your device. Use{" "}
          <Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">SammaPix PDF Split</Link>{" "}
          when you want to extract a page range, separate pages into individual files, or divide a long document into chunks.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Merge when: you want more pages from separate files
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Merging combines multiple PDFs into one. If you have split out pages earlier and now need to recombine them, or if you have separate PDF documents that belong together, use{" "}
          <Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">SammaPix PDF Merge</Link>.
          This is also covered in more depth in the related article{" "}
          <Link href="/blog/merge-pdfs-privately-no-upload" className="text-[#6366F1] hover:underline">How to merge PDFs privately, no upload</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Redact when: you want to hide content rather than remove pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Redacting permanently removes specific text or regions from a page without removing the page itself. If you need to share a contract but black out the pricing section, or share a bank statement with account numbers hidden, use{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">SammaPix PDF Redact</Link>.
          Important: a proper PDF redact tool permanently removes the underlying text data. Simply drawing a black box on top in a PDF editor does not redact: the text remains selectable and copy-pasteable beneath the box.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Compress when: the PDF is too large to send
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After splitting out the pages you need, you might find the resulting PDF is still large because it contains high-resolution scanned images. Use{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
          to reduce the file size before sharing. All in-browser, no upload.
        </p>

        {/* ── Section 8: Practical tips ─────────────────────────────────── */}

        <h2 id="practical-tips" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Practical tips for splitting PDFs cleanly
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After building and using this tool for over a year, here are the non-obvious things I have learned about splitting PDFs in practice:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Count pages before you split
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into the tool, it shows you the page count. Check this before entering a range. If a bank statement says it has 12 pages but you loaded the wrong file, you want to catch that before extracting.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The PDF spec distinguishes page order from logical page numbers
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some PDFs (especially those produced by legal or financial software) use logical page numbers that differ from the physical page order. A 50-page PDF might have a cover page numbered 0, then pages numbered 1 to 49 internally, but physically those are pages 1 to 50 in the file. The{" "}
          <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">PDF/ISO 32000 specification</a>{" "}
          defines how page labels work. The SammaPix splitter uses physical page order (position in the document), not logical page labels. So if you want the 9th page in the file, enter 9, regardless of what page number is printed on that page.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Splitting a scanned PDF preserves the scan quality
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          pdf-lib extracts pages by copying the page object and its resources from the source document. It does not re-render or re-compress the content. So if you split a page from a scanned PDF, the output page has the same image quality as the source. No degradation, no re-encoding.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Annotations, forms, and bookmarks
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you extract pages, annotations (comments, highlights, signatures) attached to those pages are preserved in the output. Form fields on the extracted pages are also preserved. Document-level bookmarks that pointed to pages outside the extracted range are removed, since those pages no longer exist in the output document.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What to do if the output seems wrong
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the split produces an unexpected result, verify the page count first, check that you entered the range correctly (commas between individual pages, hyphens between start and end of a range, no spaces), and confirm that the PDF is not encrypted. Encrypted PDFs that require a user password to open cannot be read by the tool without that password.
        </p>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Split, merge, redact, or compress your PDFs without uploading them anywhere. Every tool runs locally
            in your browser via open-source libraries. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
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
              Merge PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/redact-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Redact PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
