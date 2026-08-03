import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Add a Watermark to a PDF Online Free [2026]",
  description:
    "Stamp any PDF with a text watermark (CONFIDENTIAL, DRAFT, your name) or a logo image — entirely in your browser via pdf-lib. No upload, no server, no signup. Diagonal tile, opacity control, custom font size. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-watermark-to-pdf-online`,
  },
  keywords: [
    "add watermark to pdf online",
    "pdf watermark online",
    "stamp pdf confidential",
    "stamp pdf draft",
    "watermark pdf free",
    "add text watermark to pdf",
    "pdf watermark no upload",
    "watermark pdf browser",
    "add logo to pdf",
    "pdf stamp online free",
    "confidential stamp pdf",
    "draft watermark pdf",
    "watermark pdf without uploading",
    "pdf watermark tool free",
    "stamp pdf online no signup",
  ],
  openGraph: {
    title: "Add a Watermark to a PDF Online Free [2026]",
    description:
      "Stamp a PDF with CONFIDENTIAL, DRAFT, or any custom text — or add a logo image — in your browser. No upload, no server, no signup. Diagonal tile, opacity control. Free.",
    url: `${APP_URL}/blog/add-watermark-to-pdf-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add a Watermark to a PDF Online Free [2026]",
    description:
      "PDF watermark tool that runs 100% in your browser via pdf-lib. No upload, no server. Text or logo watermark, diagonal tile, opacity. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-watermark-to-pdf-online`;
const POST_TITLE = "Add a Watermark to a PDF Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF watermark tools upload your file to a remote server. SammaPix PDF Watermark runs entirely in your browser using pdf-lib — the file never leaves your device. This guide explains how browser-based PDF watermarking works, how to stamp CONFIDENTIAL or DRAFT diagonally across every page, how to add a logo image watermark, how to control opacity and tiling, and how to verify no upload happens.",
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
    "add watermark to pdf online",
    "pdf watermark online",
    "stamp pdf confidential",
    "stamp pdf draft",
    "watermark pdf free",
    "add text watermark to pdf",
    "add logo to pdf",
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
  name: "How to Add a Watermark to a PDF Online Without Uploading It",
  description:
    "Add a text watermark (CONFIDENTIAL, DRAFT, or custom) or a logo image to every page of a PDF in your browser with no file upload, using SammaPix PDF Watermark powered by pdf-lib. Control opacity, rotation, tiling, position, and font size.",
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
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. The file is read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose text or image watermark",
      text: "Select Text to type your watermark (CONFIDENTIAL, DRAFT, your name, a URL). Select Image to upload a logo PNG or JPG that will be placed on each page.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Configure watermark appearance",
      text: "For text: set the font size, color, and rotation angle. For image: set width and rotation. Enable Tile to repeat the watermark across the full page in a grid pattern. Adjust opacity (0 to 100 percent) to control how visible the watermark is over the document content.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Apply Watermark",
      text: "pdf-lib reads the existing PDF structure and adds the watermark as a new content layer on each page. Processing happens entirely on your device in seconds.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download the watermarked PDF",
      text: "Click Download to save the watermarked PDF. It is served directly from browser memory via a blob URL. No file was ever sent to a server.",
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
      name: "Does adding a watermark to a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, and Adobe Acrobat Online upload your PDF to their servers for processing. With SammaPix PDF Watermark, no. The watermark is applied entirely in your browser using pdf-lib — an open-source JavaScript library for reading and writing PDF files locally. Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a text watermark and an image watermark on a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A text watermark uses a string of characters — typically CONFIDENTIAL, DRAFT, your company name, or a URL — drawn directly onto each page using pdf-lib's text rendering. The text is vector-based, meaning it stays sharp at any zoom level and any print size. An image watermark uses a raster image file (PNG or JPG, typically a company logo or signature) scaled to a specified width and placed at a chosen position and rotation on each page. Text watermarks are faster to apply and produce smaller output files. Image watermarks are better when you need to use a branded logo or a custom graphic that cannot be reproduced as text.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add a CONFIDENTIAL stamp to a PDF diagonally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open sammapix.com/tools/pdf-watermark, drop your PDF, select Text watermark, type CONFIDENTIAL (or DRAFT, FOR REVIEW, SAMPLE, or any custom text), set the rotation angle to 45 degrees, choose a red or gray color, and set opacity to around 30 to 50 percent. Enable Tile to repeat the stamp diagonally across every page in a repeating grid pattern. Click Apply Watermark. The stamp is applied to every page simultaneously. The result is the standard diagonal repeated CONFIDENTIAL pattern used in legal, financial, and business documents.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add my logo to a PDF as a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select the Image watermark option in SammaPix PDF Watermark, then upload your logo as a PNG (preferred for transparency support) or JPG. Set the width to control how large the logo appears on each page, adjust opacity to make it blend subtly with the document content, and choose the position (center, corner, or tiled). The tool uses pdf-lib to embed the image as a PDF XObject on each page — the same technique used by professional PDF editors. PNG images with transparent backgrounds are handled correctly: only the logo pixels are visible, not a white rectangle around it.",
      },
    },
    {
      "@type": "Question",
      name: "What opacity level should I use for a PDF watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Opacity depends on the purpose of the watermark. For a CONFIDENTIAL or DRAFT stamp that should be clearly visible but not completely block the content underneath: 25 to 40 percent is the standard range used in legal and business documents. For a branding watermark (company name or logo) that should be present but not distracting: 10 to 20 percent. For a copyright notice that must be visible and difficult to miss: 50 to 70 percent. For a tiled repeating pattern across the full page: 15 to 25 percent produces a professional result where the document content remains fully readable but the watermark is undeniably present.",
      },
    },
    {
      "@type": "Question",
      name: "Does the watermark survive if someone prints the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The watermark added by this tool is embedded as a permanent content layer within the PDF structure using pdf-lib. It is not a visual overlay on top of a static image — it is written into the PDF page content stream. When the PDF is printed, the watermark is rendered by the printer exactly as it appears on screen. It cannot be hidden by simply changing display settings in a PDF reader. That said, a determined user with access to a PDF editor like Adobe Acrobat Pro or Ghostscript can edit the page content stream and remove or modify the watermark. This tool is designed for practical deterrence and clear communication of document status — it is not a cryptographic security measure.",
      },
    },
    {
      "@type": "Question",
      name: "Can I watermark a multi-page PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool applies the watermark to every page of the PDF simultaneously. Whether your document has 1 page or 100 pages, the same watermark settings — text or image, opacity, rotation, tiling — are applied to each page in sequence. The processing happens entirely in your browser using pdf-lib. For very long PDFs (several hundred pages), processing may take 10 to 30 seconds on an average device, because each page requires a separate content layer insertion. There is no page count limit imposed by the tool.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddWatermarkToPdfOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-watermark-to-pdf-online"
        description="Adding a watermark to a PDF should not require handing your document to a third-party server. SammaPix PDF Watermark runs entirely in your browser via pdf-lib — no upload, no signup, no server. Stamp CONFIDENTIAL, DRAFT, or any custom text diagonally across every page. Add your logo as an image watermark. Control opacity, rotation, tiling, and position. Here is everything about how it works and when to use each option."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={10}
        headings={[
          { id: "the-upload-problem", title: "The problem: most PDF watermark tools upload your document" },
          { id: "how-browser-watermark-works", title: "How browser-based PDF watermarking actually works" },
          { id: "text-vs-image-watermark", title: "Text watermark vs image watermark: which one do you need?" },
          { id: "confidential-draft-stamp", title: "How to stamp CONFIDENTIAL or DRAFT diagonally across a PDF" },
          { id: "logo-watermark", title: "Adding a logo image watermark to a PDF" },
          { id: "opacity-and-tiling", title: "Opacity and tiling: making the watermark useful, not obstructive" },
          { id: "step-by-step", title: "How to add a watermark to a PDF online, step by step" },
          { id: "does-watermark-survive-print", title: "Does the watermark survive printing and editing?" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF watermark tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online PDF watermark tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, financial records, and confidential drafts, that is an unnecessary risk.",
          "SammaPix PDF Watermark runs entirely in your browser using pdf-lib. Your file never leaves your device.",
          "Supports text watermarks (CONFIDENTIAL, DRAFT, custom) and image watermarks (logo PNG/JPG) applied to every page.",
          "Control opacity (0 to 100 percent), rotation angle, font size, and tiling to cover the full page in a repeating diagonal pattern.",
          "The watermark is embedded as a permanent content layer in the PDF — it survives printing and cannot be hidden by PDF reader display settings.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing printed documents marked confidential on a desk, representing the need to add watermarks to PDF files without uploading them to unknown servers."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Stamping a PDF as CONFIDENTIAL or DRAFT should not require handing the document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a watermark to your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Watermark runs entirely in your browser via pdf-lib. Text or logo image. Diagonal tile,
              opacity control, custom position. Every page watermarked simultaneously. Free, no signup.
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
                href="/tools/pdf-page-numbers"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Add Page Numbers <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most PDF watermark tools upload your document
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You have a contract you need to share with a prospective client. You want to stamp every page DRAFT before sending, so they know the terms are not final. Or you have a financial report you are distributing internally and need to mark it CONFIDENTIAL to reinforce that it should not be forwarded. You search for &ldquo;add watermark to PDF online&rdquo; and land on one of the popular tools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the PDF in. A progress bar fills. The file uploads to their server, gets watermarked remotely, and you download the result. Stamping text or an image onto a PDF is one of the simpler operations a PDF library can perform. There is no reason it needs a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The documents that most need watermarking are often the most sensitive ones: draft agreements, board meeting minutes, financial projections, non-disclosure agreements, and intellectual property proposals. Uploading these to an unknown server to get them back with a CONFIDENTIAL stamp is a fundamental contradiction.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">SammaPix PDF Watermark</Link>{" "}
          to add watermarks to PDF files entirely inside your browser. No server is involved at any point. The tool uses{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          — an open-source JavaScript library for reading and writing PDF files locally. Watermarking is a content layer operation, and modern browsers execute it instantly on your device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Watermark, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The PDF is loaded into browser memory, parsed by pdf-lib, and a new content layer is written onto each page. The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your document to any remote server.
        </p>

        {/* ── Section 2: How browser watermarking works ─────────────────── */}

        <h2 id="how-browser-watermark-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF watermarking actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you trust the result and know exactly what the output will look like. Here is what happens under the hood when you click Apply Watermark:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the PDF from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local — your document never leaves your device from this point onward.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib parses the existing PDF structure.</strong> pdf-lib reads the document&apos;s internal cross-reference table, page tree, and content streams — the same data structures that Adobe Acrobat and any PDF reader work with. Existing content (text, images, annotations) is preserved intact.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A new content stream is appended to each page.</strong> pdf-lib appends a new graphics instruction layer on top of the existing page content. For text watermarks, this is a text drawing command with your chosen font, size, color, rotation, and opacity. For image watermarks, this is an XObject reference with the image embedded as a PDF resource.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Opacity is applied via PDF transparency groups.</strong> The PDF specification supports per-layer opacity through ExtGState (extended graphics state) objects. pdf-lib sets the fill opacity of the watermark layer to your chosen value, making the watermark semi-transparent over the document content below.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Tiling is implemented as repeated draw calls.</strong> When tile mode is enabled, the tool calculates a grid of positions covering the page dimensions and draws the watermark at each position. This produces the repeating diagonal stamp pattern standard in legal and financial documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is serialized and offered for download.</strong> pdf-lib writes the updated document back to an ArrayBuffer, which is wrapped in a Blob and downloaded via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          pdf-lib is a mature open-source library maintained by the PDF community with over 6,000 GitHub stars. It is used in production by developers building PDF generation tools, invoice systems, and document management software. It handles the full PDF specification including multi-page documents, embedded fonts, and complex page structures.
        </p>

        {/* ── Section 3: Text vs image watermark ───────────────────────────── */}

        <h2 id="text-vs-image-watermark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text watermark vs image watermark: which one do you need?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool supports two distinct watermark types, each suited to different use cases. Choosing the right one produces a significantly better result.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Text watermark: fast, sharp, and perfect for status labels
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Text watermarks use vector-based PDF text rendering. The output is sharp at every zoom level and any print resolution — there is no pixelation because text in a PDF is drawn by the renderer at native resolution. Text watermarks are the right choice for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CONFIDENTIAL.</strong> The standard label for documents intended for restricted distribution. Used in legal agreements, M&A due diligence, board reports, and financial records. Set at 45 degrees rotation, 30 to 40 percent opacity, tile enabled.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">DRAFT.</strong> For documents in progress that should not be treated as final. Common in contract negotiations, project proposals, and regulatory filings before approval. Set at 45 degrees, 25 percent opacity, tile enabled or centered.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FOR REVIEW, SAMPLE, NOT FOR DISTRIBUTION.</strong> Variants used in publishing, consulting, and agency workflows to mark deliverables as preliminary versions for client feedback.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your name, company name, or website URL.</strong> Ownership watermarks on PDF portfolios, research papers, pricing sheets, and proprietary methodology documents. Typically smaller font, lighter opacity, placed in the footer or as a subtle tile.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Image watermark: branded logos and custom graphics
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Image watermarks embed a raster image (PNG or JPG) as a PDF XObject on each page. PNG is strongly preferred because it supports transparency — a PNG logo with a transparent background appears correctly over document content, without a white or colored rectangle around it. JPG images have a solid background that covers content beneath the watermark boundary.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Company logo on client-facing proposals.</strong> Add your logo at 30 to 40 percent opacity, centered on each page, to create a professionally branded PDF that communicates ownership without obscuring content.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Signature or stamp image.</strong> If you have a scanned signature, official stamp, or seal as a PNG, you can embed it as a watermark on certificate or authorization documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Custom graphic watermarks.</strong> Any PNG or JPG image works — a diagonal stripe pattern, a copyright symbol, an award badge — as long as you want it appearing on every page.
          </li>
        </ul>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Sharpness</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Transparency</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Vector — sharp at any zoom or print size</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full control via opacity setting</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CONFIDENTIAL, DRAFT, status labels, names, URLs</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Image (PNG)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Raster — sharp at sufficient source resolution</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Alpha channel + opacity setting — best choice</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Logos with transparent background, branded stamps</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Image (JPG)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Raster — slightly lossy depending on source quality</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No alpha channel — solid background visible</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Photographs, watermarks with intentional backgrounds</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: CONFIDENTIAL / DRAFT stamp ────────────────────────── */}

        <h2 id="confidential-draft-stamp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to stamp CONFIDENTIAL or DRAFT diagonally across a PDF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The diagonal repeating CONFIDENTIAL or DRAFT stamp is the most recognizable form of document watermarking in business and legal contexts. Here is exactly how to produce it with this tool:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select Text watermark</strong> and type your label. Common choices: CONFIDENTIAL, DRAFT, COPY, SAMPLE, FOR REVIEW, NOT FOR DISTRIBUTION, ATTORNEY-CLIENT PRIVILEGED.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set rotation to 45 degrees.</strong> The 45-degree diagonal is the international standard for legal and business watermarks. It maximizes coverage per stamp while remaining easily readable.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable Tile.</strong> Tile mode repeats the stamp at equal intervals across the entire page area. A single centered stamp is easier to crop out digitally; a tiled pattern across the full page cannot be removed without visibly altering the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set opacity to 25 to 40 percent.</strong> This range keeps the document content clearly readable while making the watermark immediately visible. For a stronger visual statement (less readable content) use 50 to 60 percent.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a color.</strong> Standard choices are dark red (#CC0000 or #A00000) for strong visual impact, dark gray (#555555 or #333333) for a more subdued professional look, and black (#000000) for maximum contrast. Red is the most common in legal documents because it signals urgency and restriction.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set font size relative to page dimensions.</strong> A good starting point for A4 or Letter paper is 48 to 72pt. Smaller fonts tile more densely. Larger fonts produce fewer but more prominent stamps per page.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result is the standard legal-grade CONFIDENTIAL pattern — the same visual style used by law firms, investment banks, and government agencies. Because the watermark is embedded in the PDF content stream rather than drawn on top as a visual overlay, it survives printing, screen captures, and PDF-to-image conversions.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Stamp your PDF as CONFIDENTIAL or DRAFT now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Text or image watermark, diagonal tile, opacity control. Every page watermarked. No upload. No signup. Free.
          </p>
          <Link
            href="/tools/pdf-watermark"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Watermark, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Logo watermark ─────────────────────────────────── */}

        <h2 id="logo-watermark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Adding a logo image watermark to a PDF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Logo watermarks are common on client-facing documents — proposals, quotations, case studies, and reports — where you want every page to visibly belong to your organization. Here is how to do it effectively:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Prepare your logo correctly
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Always use a PNG with a transparent background. If your logo is only available as a JPG with a white background, the white rectangle will appear as a solid white block over the document content — which is almost never the intended result. Export or convert your logo to PNG from your design software (Figma, Illustrator, Canva) or use{" "}
          <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
          to strip the background from an existing JPG logo.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the source image resolution: because the logo will be scaled to the width you specify, a source PNG of at least 500px wide ensures the logo is sharp when embedded at standard sizes. A logo that is too small will appear pixelated at larger watermark widths.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Choosing the right size and position
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The width parameter controls how large the logo appears on the page. A standard A4 PDF page is 595 PDF units wide (at 72 DPI). Common logo watermark widths:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">100 to 150px equivalent:</strong> Subtle branding, often placed in a corner. The logo is recognizable but does not compete with the document content.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">200 to 300px equivalent:</strong> Centered on the page, clearly branded. Common for proprietary documents and client proposals.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">400px+ equivalent with tile:</strong> A repeating tiled logo pattern across the full page. Strong ownership signal. Used on premium reports and copyrighted design documents.
          </li>
        </ul>

        {/* ── Section 6: Opacity and tiling ────────────────────────────────── */}

        <h2 id="opacity-and-tiling" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Opacity and tiling: making the watermark useful, not obstructive
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The balance between visible enough to be meaningful and transparent enough not to obscure the content is the core design decision in PDF watermarking. Here are reference values for different contexts:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommended opacity</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Tile?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rotation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CONFIDENTIAL / DRAFT legal documents</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 to 40%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">45 degrees</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Company logo branding on proposals</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">10 to 20%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (centered)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">0 degrees</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Copyright protection / anti-sharing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">50 to 70%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">45 degrees</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SAMPLE on pricing / product catalogs</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 35%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes or No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">30 to 45 degrees</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Subtle name / URL ownership mark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8 to 15%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (small font)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">45 degrees</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Tiling is particularly important for documents that could be shared digitally. A single centered watermark can be cropped or obscured by a screenshot. A tiled repeating pattern across the full page means every portion of every page carries the watermark — screenshots, partial crops, and individual page extracts all retain the stamp.
        </p>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a watermark to a PDF online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-watermark</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. The file is loaded into browser memory. Nothing is uploaded to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose Text or Image watermark.</strong> For a CONFIDENTIAL or DRAFT stamp, choose Text. For a logo, choose Image and upload your PNG or JPG file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Configure the watermark.</strong> For text: type your label, set font size, choose a color, set rotation angle. For image: set the width, choose position. For both: set opacity and decide whether to enable tiling.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply Watermark.</strong> pdf-lib processes each page and appends the watermark content layer. Processing is nearly instant for documents under 50 pages on modern hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the watermarked PDF.</strong> Click Download. The file is served from browser memory. No network request occurs. Your original file is unchanged.
          </li>
        </ol>

        {/* ── Section 8: Does watermark survive print ───────────────────── */}

        <h2 id="does-watermark-survive-print" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does the watermark survive printing and editing?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding what the watermark can and cannot protect against is important for making the right choice for your use case.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What the watermark survives
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Printing.</strong> Because the watermark is embedded in the PDF content stream, it is rendered and printed by any printer that receives the PDF, exactly as it appears on screen.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PDF viewer display settings.</strong> The watermark cannot be hidden by toggling display options in Adobe Reader or any PDF viewer. It is content, not metadata.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Conversion to images.</strong> If the PDF is converted to images (PDF to JPG, PDF to PNG), the watermark appears in the exported images.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Screen captures of individual pages.</strong> Screenshots of the PDF contain the watermark.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What the watermark does not survive
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PDF editing by a determined user with Acrobat Pro or Ghostscript.</strong> A user with access to a full PDF editor can open the content stream, locate the watermark layer, and remove or obscure it. This requires technical effort and specific software — it is not something an average recipient can do easily or casually.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">OCR re-extraction.</strong> If a recipient runs the PDF through an OCR tool to extract text content, the extracted text comes from the page content stream (not the watermark layer) and may not include the watermark text in the result.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This tool is designed for practical deterrence and clear communication of document status — the same purpose served by stamping a physical document with a red CONFIDENTIAL ink stamp. It is not a cryptographic access control system. For documents requiring cryptographic protection against viewing by unauthorized parties, use{" "}
          <Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link>{" "}
          to add password encryption in addition to (or instead of) a watermark.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Text or image watermark, diagonal tile, opacity 0 to 100%.
            Every page watermarked simultaneously. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-watermark"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Watermark, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/watermark-pdf-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Watermark PDF without uploading <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF watermark tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a PDF watermarking tool:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. You trust their deletion and security policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Watermark types</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually text and image. Some tools also offer pre-set stamps.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Text (vector, any color, any angle) and image (PNG with transparency, JPG).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text quality</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Server-side tools typically produce vector text at full PDF quality.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Vector text via pdf-lib — sharp at any zoom or print size.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans typically cap at 5 to 25 MB. Larger files require a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap imposed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant for most documents. No network latency.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, watermarking works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click on Network in DevTools. Clear any existing requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF and click Apply Watermark.</strong> Watch the Network panel.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests during processing.</strong> You will see the initial page load requests but zero activity during watermark processing and download. The PDF is read, processed, and served entirely from browser memory.
          </li>
        </ol>

        {/* ── Section 11: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is when to use each in conjunction with watermarking:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add password encryption to a PDF so only authorized recipients can open it. Use this together with a watermark when the document needs both access control and status labeling.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-page-numbers" className="text-[#6366F1] hover:underline">PDF Page Numbers</Link></strong>: add page numbers before watermarking long documents. Covered in detail in{" "}
            <Link href="/blog/add-page-numbers-to-pdf-online" className="text-[#6366F1] hover:underline">How to add page numbers to a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size before or after watermarking. Useful when the final document needs to fit within an email attachment limit. Covered in{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/stampit" className="text-[#6366F1] hover:underline">Stampit</Link></strong>: add watermark text or logos to images (JPEG, PNG, WebP). Use when you need to watermark photos or image files rather than PDF documents.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Watermark, protect, compress, and number PDFs without uploading them anywhere.
            All tools run locally in your browser. No server. No signup. No watermark on the output (from us).
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
