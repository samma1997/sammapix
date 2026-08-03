import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Reduce PDF File Size for Email [2026]",
  description:
    "PDF too big to send by email? Compress it in your browser — no upload, no signup. Works best on scanned PDFs and image-heavy files. See before/after size, then download. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/reduce-pdf-file-size-for-email`,
  },
  keywords: [
    "reduce pdf size for email",
    "compress pdf for email",
    "pdf too big to email",
    "shrink pdf for email",
    "reduce pdf file size",
    "pdf file too large to send",
    "compress pdf attachment",
    "make pdf smaller for email",
    "pdf size limit email",
    "shrink pdf free",
  ],
  openGraph: {
    title: "How to Reduce PDF File Size for Email [2026]",
    description:
      "Your PDF is too big to email. Here is how to shrink it in your browser — no upload, no server, no signup. Works best on scanned and image-heavy PDFs. Free.",
    url: `${APP_URL}/blog/reduce-pdf-file-size-for-email`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Reduce PDF File Size for Email [2026]",
    description:
      "PDF too big to email? Shrink it in your browser. No upload, no server. Works on scanned invoices and image-heavy PDFs. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/reduce-pdf-file-size-for-email`;
const POST_TITLE = "How to Reduce PDF File Size for Email [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "When a PDF is too big to send by email, the usual fix is uploading it to a compressor service — which sends the file to a third-party server. This guide explains how to shrink a PDF for email entirely in your browser, covering the email attachment limits of major providers, the right compression approach by PDF type, and step-by-step instructions using the SammaPix PDF Compress tool.",
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
    "reduce pdf size for email",
    "compress pdf for email",
    "pdf too big to email",
    "shrink pdf for email",
    "reduce pdf file size",
    "compress pdf attachment",
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
  name: "How to Reduce PDF File Size for Email",
  description:
    "Compress a large PDF to fit within email attachment limits, using the SammaPix browser-based PDF Compress tool. No file upload required.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Compress (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check your email provider's attachment limit",
      text: "Gmail allows 25 MB, Outlook 20 MB (or 10 MB in some configurations), Yahoo 25 MB. Know your target size before compressing.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open SammaPix PDF Compress",
      text: "Go to sammapix.com/tools/pdf-compress in any modern browser. No account required.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Drop your PDF onto the tool",
      text: "Drag the file onto the dropzone or click to browse. The file is read locally. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose Medium quality for most email use cases",
      text: "Medium quality reduces scanned PDFs by 50 to 70 percent while keeping the document readable. Choose Low for the smallest possible file size.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Review the compressed file size",
      text: "The tool shows the before and after file size. If the result is still above your email limit, try Low quality, or consider splitting out only the pages the recipient needs.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download and attach to your email",
      text: "Click Download. The compressed PDF saves to your device directly from browser memory. Attach it to your email as usual.",
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
      name: "What is the maximum PDF size you can send by email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The attachment limits by email provider are: Gmail 25 MB, Outlook 20 MB (some enterprise configurations cap at 10 MB), Yahoo Mail 25 MB, Apple iCloud Mail 20 MB, ProtonMail 25 MB. These limits apply to the entire email including all attachments, not just the PDF. If your PDF alone is close to 20 MB, and you attach anything else, the total may exceed the limit. Note that the recipient's server may also have independent limits that are stricter than the sender's provider.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my PDF so large?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common reasons for a large PDF file size are: the PDF was created by scanning physical documents (each scanned page is a high-resolution image, typically 300 to 600 DPI, which takes a lot of storage), the PDF contains high-resolution photographs, the PDF was exported from presentation software with full-resolution slide images, or the PDF contains embedded fonts and resources that are not subsetted. Scanned PDFs are the most common culprit — a single-page scan at 300 DPI in color is typically 500 KB to 3 MB before any compression.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I reduce a PDF's file size for email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on the PDF type. Scanned documents and image-heavy PDFs compress by 50 to 80 percent with the SammaPix Medium or Low quality settings. A 20 MB scanned invoice bundle can typically become 5 to 8 MB, which fits within any email attachment limit. Text-only PDFs (legal documents, plain reports) compress very little with rasterization — often less than 20 percent. For those, consider splitting out only the pages the recipient needs rather than compressing the whole document.",
      },
    },
    {
      "@type": "Question",
      name: "What if the compressed PDF is still too big to email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the compressed PDF is still over the email limit, try three alternatives in order: first, apply Low quality compression (the most aggressive setting) for the smallest possible file; second, use PDF Split to extract only the pages the recipient actually needs — if a 40-page document is relevant to only 5 pages, splitting reduces size by 87 percent before any compression; third, use a file sharing link instead (Google Drive, Dropbox, WeTransfer, or OneDrive) and paste the link in the email. The last option avoids attachment limits entirely.",
      },
    },
    {
      "@type": "Question",
      name: "Does compressing a PDF for email reduce its quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the rasterization approach reduces quality in two ways: images are re-encoded at a lower JPEG quality, and text becomes part of the image (not selectable). The visual impact at Medium quality is minimal for most documents — text remains readable and images look good at screen resolution. At Low quality, JPEG artifacts may appear on images viewed close-up, but the document remains perfectly readable. For a scanned invoice or receipt, this trade-off is almost always acceptable. For a high-fidelity brochure or document where image sharpness matters, use High quality.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress a PDF for email using an online tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Most popular services (iLovePDF, Smallpdf, Adobe Acrobat Online) upload your file to a remote server for processing. For documents containing financial data, personal information, medical records, or business-sensitive content, this creates a real privacy risk. SammaPix PDF Compress processes the file entirely in your browser using pdf.js and pdf-lib — no data is sent to any server. You can verify this by opening the Network inspector in your browser's developer tools and confirming no outgoing requests occur during compression.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reduce a PDF's size without losing text selectability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but not with a rasterization-based browser tool. To compress a PDF while keeping text selectable, you need a Ghostscript-based compressor. Ghostscript reduces file size by subsetting fonts (keeping only the characters actually used), removing redundant metadata, and compressing internal streams — all without rasterizing the pages. The trade-off is that Ghostscript requires either running it locally via command line or uploading your file to a server-based tool. If your PDF is a contract or legal document where recipients need to select text, Ghostscript is the right choice. If it is a scanned invoice or image-heavy brochure, the SammaPix browser-based approach will shrink it more aggressively and keep your file private.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReducePdfFileSizeForEmailPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="reduce-pdf-file-size-for-email"
        description="Your PDF is too big to send as an email attachment. Every compressor you find wants you to upload the file to a server. Here is how to shrink a PDF for email entirely in your browser — no upload, no server, with an honest explanation of what it can and cannot do."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Performance"]}
        readingTime={9}
        headings={[
          { id: "email-size-limits", title: "Email attachment limits in 2026: what you are actually dealing with" },
          { id: "why-pdfs-are-large", title: "Why PDFs get so large" },
          { id: "fastest-fix", title: "The fastest fix: compress in your browser with no upload" },
          { id: "step-by-step", title: "How to reduce PDF size for email, step by step" },
          { id: "how-much-reduction", title: "How much size reduction can you expect?" },
          { id: "still-too-big", title: "What to do if the compressed PDF is still too big" },
          { id: "split-before-compress", title: "The split-then-compress strategy: often the fastest path" },
          { id: "text-only-pdfs", title: "What about text-only PDFs?" },
          { id: "related-pdf-tools", title: "Other browser-based PDF tools from SammaPix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Gmail and Outlook cap attachments at 25 MB and 20 MB respectively. Most scanned PDFs exceed these limits before any optimization.",
          "Scanned documents are the most compressible: each page is a high-resolution image that can be re-encoded at lower JPEG quality for 50 to 80 percent reduction.",
          "SammaPix PDF Compress runs in your browser with no upload. Your file never leaves your device.",
          "Honest trade-off: compression rasterizes pages, so text becomes image-based (not selectable) in the output.",
          "If the PDF is still too big after compression, split out only the pages the recipient needs before compressing.",
          "For text-only PDFs where selectable text must be preserved, Ghostscript-based tools are more appropriate.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person at a desk with a laptop and documents, representing the common task of preparing a large PDF to send as an email attachment."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A PDF too large to email is one of the most common file problems. Here is how to fix it without uploading your document to a stranger&apos;s server.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Shrink your PDF for email right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Compress runs entirely in your browser. See the before and after file size before you
              download. Works best on scanned documents and image-heavy PDFs. No upload, no signup, free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Compress, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-split"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Split out fewer pages first <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Email size limits ───────────────────────────────── */}

        <h2 id="email-size-limits" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Email attachment limits in 2026: what you are actually dealing with
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every major email provider has a maximum attachment size. These limits have not changed much in years, even as PDFs have gotten larger due to higher-resolution scans and more images. Here are the current limits:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Email provider</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Attachment limit (send)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Gmail</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Files over 25 MB are automatically converted to Google Drive links</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Outlook / Microsoft 365</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 MB (personal), up to 150 MB (enterprise, varies)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Enterprise settings vary by IT admin. Personal and Hotmail capped at 20 MB.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Yahoo Mail</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Total per email including all attachments</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Apple Mail / iCloud</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Mail Drop sends larger files via iCloud link instead</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ProtonMail</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 MB (free), up to 100 MB (paid)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encrypted attachments have higher overhead per MB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One important detail: these limits apply to the total email, including all attachments. If you attach a 18 MB PDF and a few other files, you may hit the 20 MB cap even though the PDF alone would have passed. Also, the recipient&apos;s server has its own limits, which may be stricter. If your recipient uses a corporate email server, their IT team may have set limits as low as 10 MB.
        </p>

        {/* ── Section 2: Why PDFs are large ─────────────────────────────── */}

        <h2 id="why-pdfs-are-large" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why PDFs get so large
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all PDFs are created equal. Understanding what is inside your PDF helps you choose the right approach to reduce its size.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scanned documents: the most common cause
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you scan a physical document, the scanner converts each page to a raster image (a grid of colored pixels). A typical office scanner runs at 300 DPI (dots per inch) in color. A single A4 page at 300 DPI color produces a raw image of about 2480 x 3508 pixels — roughly 25 megapixels. Even with internal JPEG compression, each scanned page might be 500 KB to 2 MB inside the PDF. A 20-page scan bundle can easily reach 20 to 40 MB.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Presentation exports
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PowerPoint and Keynote PDFs are large because each slide is exported with full-resolution background images and embedded graphics. A 30-slide deck with full-bleed images can produce a 30 to 60 MB PDF even though the on-screen presentation looks the same at any file size.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photo portfolios and brochures
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDFs exported from InDesign or Affinity Publisher for professional printing contain very high-resolution images intended for print (often 300 DPI). These are unnecessarily large for screen sharing or email. A print-ready brochure can be 100 MB or more.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Embedded fonts and metadata
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Even a text-only PDF can be large if it embeds entire font files (every character for every font used) rather than subsetting them (only the characters actually present in the document). A PDF that embeds four complete fonts might add 2 to 5 MB just for the font data.
        </p>

        {/* ── Section 3: Fastest fix ────────────────────────────────────── */}

        <h2 id="fastest-fix" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The fastest fix: compress in your browser with no upload
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The typical workflow when a PDF is too big to email is to search for an online compressor and upload the file. That works, but it sends your document to a third-party server. For invoices, contracts, and financial records, that is an unnecessary privacy risk.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">SammaPix PDF Compress</Link>{" "}
          compresses the PDF entirely in your browser using{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a>{" "}
          (Mozilla&apos;s open-source PDF renderer) and{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>.
          Each page is rendered on a canvas and re-encoded as a JPEG at your chosen quality level. The resulting PDF is assembled in memory and downloaded directly. No network request carries your file. You can verify this by opening your browser&apos;s DevTools Network tab while the tool runs.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Honest limitation: rasterization converts pages to images, so text in the output is not selectable or searchable. For scanned documents (which were already image-based), this is a non-issue. For text-only PDFs where you need recipients to select text, the alternatives section at the end of this article covers your options.
        </p>

        {/* ── Tool CTA #1 ─────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Compress your PDF for email now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload. See before and after size. Works best on scanned documents and image-heavy PDFs.
            Low, Medium, or High quality. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-compress"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Compress, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step by step ────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to reduce PDF size for email, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The whole process takes under two minutes for most PDFs:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check the target size.</strong> Know your email provider&apos;s limit before you start. If you are sending to a corporate address, assume 10 to 20 MB is the cap.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open SammaPix PDF Compress</strong> at sammapix.com/tools/pdf-compress. No account required. Works in Chrome, Safari, Firefox, or Edge.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF.</strong> Drag the file onto the dropzone or click to browse. The original file size is shown. Nothing is uploaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose Medium quality.</strong> For most email use cases, Medium is the right balance. It typically produces 50 to 70 percent reduction on scanned documents while keeping everything clearly readable.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Compress and review the result.</strong> The tool shows both the original and compressed file size. If the compressed size is still above your email limit, click back and choose Low quality for more aggressive compression.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download and attach.</strong> Click Download. The compressed PDF saves directly to your device. Attach it to your email as normal.
          </li>
        </ol>

        {/* ── Section 5: How much reduction ─────────────────────────────── */}

        <h2 id="how-much-reduction" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How much size reduction can you expect?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result depends heavily on what is inside the PDF. Here are realistic expectations:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">PDF type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Original size example</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">After Medium compression</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">After Low compression</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">20-page scanned invoice bundle</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~8 MB (68% reduction)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~5 MB (80% reduction)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">30-slide presentation PDF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">40 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~16 MB (60% reduction)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~8 MB (80% reduction)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Photo portfolio or brochure</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">50 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~20 MB (60% reduction)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~10 MB (80% reduction)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text-only contract or report</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2 MB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Minimal; tool keeps original if output is larger</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Minimal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These figures are representative, not guaranteed. The actual reduction depends on the original image quality inside the PDF. If the original was already aggressively compressed, re-compressing will have diminishing returns.
        </p>

        {/* ── Section 6: Still too big ───────────────────────────────────── */}

        <h2 id="still-too-big" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do if the compressed PDF is still too big
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If even Low quality compression does not get the file under your email limit, here are three effective next steps:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Option 1: Send a cloud storage link instead
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Upload the original PDF to Google Drive, Dropbox, OneDrive, or WeTransfer and paste the share link in the email. This bypasses attachment limits entirely. Most email clients render the link with a preview. It is the fastest solution when the file is simply too large for any compression to help (for example, a 200-page scan bundle).
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Option 2: Split out only the pages the recipient needs
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the recipient only needs pages 3 and 5 from a 40-page document, extract those pages first using{" "}
          <Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link>,
          then compress the 2-page extract. A 2-page extract from a 40-page scan can be as small as 500 KB to 2 MB before any compression. This combination often reduces the final file by 95 percent or more. More details on this workflow are in the next section.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Option 3: Use a server-based Ghostscript tool for text-only PDFs
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For text-heavy PDFs where rasterization does not help much, a Ghostscript-based tool (such as the command-line Ghostscript package, or a server-based tool that uses it) can compress streams and subset fonts without rasterizing. The trade-off is that these tools require either installing software or uploading your file.
        </p>

        {/* ── Section 7: Split then compress ────────────────────────────── */}

        <h2 id="split-before-compress" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The split-then-compress strategy: often the fastest path
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most effective approach to getting a PDF under an email limit is often not compression but page reduction: extract only the pages the recipient needs, then compress what is left. Here is why this works so well:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A 40-page scanned document at 25 MB contains roughly 625 KB per page. If the recipient needs 5 pages, those 5 pages contain about 3 MB of content before compression. Compress that at Medium quality and the result is roughly 1 MB — well within any email limit.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the workflow, all in your browser with no upload:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open PDF Split</strong> at sammapix.com/tools/pdf-split. Drop your PDF and note the page count.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extract the pages the recipient needs.</strong> Choose the Extract page range mode and enter the pages, for example: 3,5,8-10.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the extract</strong> and check its file size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If still too large, open PDF Compress</strong> and compress the extract. The file is already smaller, so compression is faster and the result is usually well under the email limit.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a detailed guide to splitting, see{" "}
          <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">How to split a PDF privately, no upload</Link>.
        </p>

        {/* ── Tool CTA #2 ─────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Split out only what you need, then compress</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Both tools run in your browser with no upload. Extract the relevant pages with PDF Split,
            then shrink with PDF Compress. Often reduces the final file by 90 percent or more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Split, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Text-only PDFs ─────────────────────────────────── */}

        <h2 id="text-only-pdfs" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What about text-only PDFs?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your PDF contains primarily text with minimal images — a legal contract, a business report, an ebook — the browser-based rasterization approach produces limited size reduction. Here is why:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF format stores text as vector data: actual character codes, font references, and positioning information. This is inherently compact. A 50-page text PDF might be 500 KB to 2 MB. When you rasterize it (render each page as a pixel image), you replace that compact text representation with a much larger pixel grid, then re-compress that grid as JPEG. JPEG was designed for photographic content, not sharp high-contrast text. The result is often a file that is similar in size or larger than the original, which is why the tool keeps the original when the compressed output would be larger.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For text-only PDFs, the right approach depends on your requirements:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Selectable text must be preserved:</strong> use Ghostscript locally (free, command-line) or a server-based Ghostscript tool. This subsets fonts and compresses streams without rasterizing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Selectable text does not matter:</strong> use the Low quality setting in SammaPix PDF Compress. The file may not be much smaller, but the tool will keep the original if the output would be larger.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The text PDF is large because of embedded fonts:</strong> a server-side tool with font subsetting is the right fix.
          </li>
        </ul>

        {/* ── Section 9: Related PDF tools ──────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other browser-based PDF tools from SammaPix
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you regularly work with PDFs, these tools handle the most common tasks without uploading anything:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by re-encoding page images as JPEG. Best on scanned and image-heavy PDFs. Keeps the original if the output would be larger.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages, split into individual page PDFs, or split every N pages. Works well as a first step before compressing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one file. If you have split a document and need to recombine selected pages, use this.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/jpg-to-pdf" className="text-[#6366F1] hover:underline">JPG to PDF</Link></strong>: convert images to PDF. If you need to create a compact PDF from photos rather than compressing an existing one, start here.
          </li>
        </ul>

        {/* ── Tool CTA #3 ─────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All PDF tasks, all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Compress, split, merge, or create PDFs without uploading them. Every tool runs locally via pdf.js and pdf-lib.
            No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
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
              href="/tools/jpg-to-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              JPG to PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
