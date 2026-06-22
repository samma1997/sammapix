import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Redact a PDF (Permanently Remove Sensitive Text, No Upload)",
  description:
    "Permanently remove sensitive text from a PDF without uploading it. Learn why the black-box trick in Preview and Word is unsafe, how true redaction works, and how to redact a PDF free in your browser with no server, no Acrobat.",
  alternates: {
    canonical: `${APP_URL}/blog/redact-pdf-remove-sensitive-text-no-upload`,
  },
  keywords: [
    "redact pdf",
    "redact pdf free",
    "how to redact a pdf",
    "black out text in pdf",
    "remove sensitive information from pdf",
    "redact pdf no upload",
    "permanently remove text from pdf",
    "redact pdf without acrobat",
    "redact pdf browser",
    "pdf redaction tool",
  ],
  openGraph: {
    title: "How to Redact a PDF (Permanently Remove Sensitive Text, No Upload)",
    description:
      "The black box in Preview or Word is not redaction. The text is still there underneath. Learn how to permanently remove sensitive text from a PDF in your browser, no upload, no Acrobat needed.",
    url: `${APP_URL}/blog/redact-pdf-remove-sensitive-text-no-upload`,
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Redact a PDF (Permanently Remove Sensitive Text, No Upload)",
    description:
      "Drawing a black box in Preview does not redact. The text is still there. True redaction permanently removes it. Free, in your browser, no upload.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-21";
const POST_DATE_FORMATTED = "June 21, 2026";
const POST_URL = `${APP_URL}/blog/redact-pdf-remove-sensitive-text-no-upload`;
const POST_TITLE =
  "How to Redact a PDF (Permanently Remove Sensitive Text, No Upload)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Drawing a black rectangle over text in Preview, Word, or a PDF viewer does not redact it. The text remains in the file and can be selected, copied, or extracted in seconds. True redaction permanently removes the underlying content by flattening each page to an image with the black boxes baked in, leaving no text layer to recover. SammaPix does this entirely in the browser: no server upload, no Acrobat license, no signup.",
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
    "redact pdf",
    "redact pdf free",
    "how to redact a pdf",
    "black out text in pdf",
    "remove sensitive information from pdf",
    "redact pdf no upload",
    "permanently remove text from pdf",
    "redact pdf without acrobat",
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
      name: "Is drawing a black box over text in a PDF the same as redacting it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Drawing a black rectangle in Preview, Adobe Acrobat's annotation layer, Microsoft Word, or most PDF viewers adds a visual overlay on top of the text, but the original text remains in the file's data layer underneath. Anyone can select the text behind the box, copy it, or use a tool to remove the overlay entirely. Real-world leaks have happened this way: courts, government agencies, and law firms have accidentally published documents with this fake redaction. True redaction permanently removes the underlying content so there is nothing left to recover.",
      },
    },
    {
      "@type": "Question",
      name: "How does true PDF redaction work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "True redaction works by rendering each page of the PDF as a flat image, drawing the black boxes directly onto that image, and saving the result as a new PDF built from those images. Because the output is image-based, there is no text layer at all: nothing to select, copy, search, or extract. The redacted regions are literally gone from the file's data, not just hidden. SammaPix's redact tool does this entirely in your browser using the Canvas API and PDF rendering, with no server upload.",
      },
    },
    {
      "@type": "Question",
      name: "Can I redact a PDF without Adobe Acrobat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Adobe Acrobat Pro has a redaction feature, but it requires a paid subscription (roughly 25 dollars per month). SammaPix's PDF redact tool at sammapix.com/tools/redact-pdf does the same thing, runs entirely in your browser, and is free. No account required, no watermark, and your file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Does redacting a PDF remove metadata too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Redacting the visible content of a PDF does not automatically strip the file's metadata: the author name, creation date, software used to create it, and any custom properties stored in the document. If you need to remove that information as well, use SammaPix's EXIF and metadata removal tool at sammapix.com/tools/exif after redacting. For the highest privacy, do both.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between redacting a PDF and blurring a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Redaction is the right operation for text-based documents: contracts, statements, reports, and legal filings, where you want to permanently remove specific text or regions. Blurring is typically used for photos or images, for example to hide a face, a license plate, or a screen in a screenshot. For photos, use SammaPix's blur and censor tool at sammapix.com/tools/blur-censor. For PDFs with sensitive text, use the redact tool. The underlying principle is the same: permanently remove the content rather than just covering it.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use an online PDF redaction tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on whether the tool uploads your file to a server. Most online redaction tools process your PDF on their servers, which means your confidential document, the very one you are trying to protect, travels over the internet and sits on a third-party machine. SammaPix's redact tool runs entirely in the browser. Your file is read locally, processed locally using the Canvas API, and downloaded directly from browser memory. No server receives the file at any point. You can verify this by opening your browser's network inspector while using the tool and watching that no outgoing request carries your document.",
      },
    },
    {
      "@type": "Question",
      name: "What are the most common documents people need to redact?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common cases are: contracts (removing pricing, party names, or proprietary terms before sharing a template), bank statements (blacking out account numbers and balances when submitting partial evidence), medical records (removing patient identifiers, diagnoses, or medication details), HR files (hiding salary figures, personal addresses, or disciplinary notes), legal discovery documents (redacting privileged attorney-client communications or third-party personal data), and government or court filings (removing names and identifying information of protected individuals). In all these cases the stakes of a failed redaction are high, which is why the black-box overlay mistake has caused real, publicised leaks.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RedactPdfPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="redact-pdf-remove-sensitive-text-no-upload"
        description="The black rectangle you draw over text in Preview or Word is not redaction. The original text is still in the file, selectable and copyable in seconds. This is how governments, law firms, and courts have accidentally leaked sensitive data. Here is how true redaction works, and how to do it free in your browser without uploading your document."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools", "Workflow"]}
        readingTime={12}
        headings={[
          { id: "the-black-box-mistake", title: "The dangerous mistake everyone makes" },
          { id: "how-true-redaction-works", title: "How true redaction actually works" },
          { id: "redaction-methods-compared", title: "Redaction methods compared: safe vs unsafe" },
          { id: "what-to-redact-by-document", title: "What to redact by document type" },
          { id: "step-by-step-browser", title: "How to redact a PDF in your browser, step by step" },
          { id: "no-upload-privacy", title: "Why no-upload matters for the people who redact" },
          { id: "metadata-and-redaction", title: "The part people forget: metadata is not redacted" },
          { id: "redact-vs-blur", title: "Redact vs blur: which operation do you need?" },
          { id: "trade-offs", title: "The honest trade-off: image-based output" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Drawing a black box in Preview, Word, or a PDF viewer is not redaction. The text stays in the file's data layer and can be copied in seconds. Real leaks have happened this way.",
          "True redaction renders each page to an image with the black boxes baked in, destroying the text layer. There is nothing left to select, copy, search, or recover.",
          "SammaPix's redact tool runs 100 percent in the browser using the Canvas API. Your document is never uploaded to any server.",
          "The output is image-based, which means no selectable text in the redacted document. This is the correct and expected behaviour for a properly redacted file.",
          "Redacting visible content does not strip file metadata. Use the EXIF tool as a second step if author, creation date, or document properties must also be removed.",
          "For photos and faces, use the blur and censor tool. For text in PDFs, use the redact tool. No upload, no Acrobat license, no signup required.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A printed contract document with a pen, representing sensitive agreements and legal paperwork that require proper redaction before sharing."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Before sharing a contract or statement, the sensitive lines have to be truly gone, not just covered.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Redact your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Redact runs entirely in your browser. Draw boxes over sensitive text, flatten to
              image, and download a file where that content is permanently gone. No server, no Acrobat license,
              no signup, free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/redact-pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the Redact PDF tool, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/blur-censor"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Blur and Censor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: The black-box mistake ─────────────────────────── */}

        <h2 id="the-black-box-mistake" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The dangerous mistake everyone makes
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You have a contract to share. There is a pricing section you cannot send. So you open it in Preview
          on your Mac, grab the annotation tool, draw a black rectangle over those lines, export as PDF, and
          email it. Job done. Sensitive information hidden.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Except it is not hidden at all. Open that exported PDF. Click on the black box. Press Command-A to
          select all, or just click and drag across the blacked-out region. In a large number of cases, you can
          select the text underneath, copy it, and paste it into any text editor. The black rectangle is an
          annotation overlay, a visual layer drawn on top of the document. The underlying text data is
          completely intact in the PDF file.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a hypothetical. In 2011, the U.S. District Court for the Northern District of California
          published a legal filing where Apple had used this exact method to black out confidential figures in
          a Samsung patent dispute. The underlying numbers were trivially extractable from the PDF. Similar
          incidents have happened with government reports, intelligence briefings, and corporate filings. The
          NSA, the DOJ, and multiple UK government departments have published documents with recoverable
          &ldquo;redactions&rdquo; done this way. In one notable case, a{" "}
          <a
            href="https://www.documentcloud.org/documents/20399954"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            redacted court document
          </a>{" "}
          revealed the full names of individuals it was meant to protect, because the redaction was a black
          box overlay rather than genuine content removal.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The same failure mode applies whether you use Preview on Mac, Microsoft Word, Foxit Reader, or the
          annotation tools in most PDF viewers. If the tool adds an overlay without removing the underlying
          data, the result is not a redacted document. It is a document with a black sticker on it.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          You can test this yourself in thirty seconds
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Take any PDF that has selectable text. Open it in Preview on Mac. Use the annotation toolbar to draw
          a filled black rectangle over a paragraph. Go to File and choose Export as PDF. Open the exported
          file. Now press Command-A to select all text, then Command-C to copy it. Paste into TextEdit or any
          editor. The text you covered is there. Every word.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are using Windows, try the same with Microsoft Word or Edge&apos;s PDF annotation: draw a
          shape over text, save, reopen, and attempt to select through the shape. The result is the same.
          This is not a bug in Preview or Word. It is how PDF annotations work by design: they are a
          presentation layer, not a data removal operation.
        </p>

        {/* ── Section 2: How true redaction works ──────────────────────── */}

        <h2 id="how-true-redaction-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How true redaction actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          True redaction does not add a layer on top. It permanently destroys the underlying content. The
          standard approach is to render each page of the PDF to a flat raster image, draw the black boxes
          directly onto those rendered images, and then write a new PDF file built entirely from those images.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result is a PDF that looks identical to the original from a visual standpoint, with the
          redacted regions appearing as solid black boxes, but has no text layer whatsoever. There is no
          font data, no character encoding, no unicode codepoints, no text stream. There is nothing to select,
          nothing to search, nothing to copy, and nothing to recover. The text is gone because it was never
          encoded in the output file.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How SammaPix implements this
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">
            SammaPix&apos;s PDF Redact tool
          </Link>{" "}
          to do exactly this, entirely inside your browser. Here is the actual sequence of operations:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Load and render.</strong> The PDF is loaded
            locally in your browser using a PDF rendering engine. Each page is drawn to an HTML Canvas element
            at high resolution.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mark regions.</strong> You draw rectangles
            over the content you want to remove. These are displayed as semi-transparent overlays while
            you work, so you can see what you are marking.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bake and flatten.</strong> When you confirm,
            the tool draws solid black rectangles onto the Canvas pixels at every marked region. The text
            under those pixels is overwritten at the image level, not just covered.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Build a new PDF.</strong> Each Canvas is
            exported as a PNG image and assembled into a new PDF file. This new file contains only images, no
            text encoding, no original fonts, no original data structures from the source document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download locally.</strong> The output PDF is
            offered as a direct download from browser memory. The file never touched a server at any stage.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process runs in your browser tab. No network request carries your document. The only
          thing the server provides is the tool&apos;s JavaScript code when the page loads. After that,
          everything is local.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Permanently remove sensitive text now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Draw boxes, flatten to image, download. The content under the boxes is permanently gone, not just
            covered. Runs in your browser. No upload. No Acrobat license required. Free.
          </p>
          <Link
            href="/tools/redact-pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the Redact PDF tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 3: Redaction methods compared ────────────────────── */}

        <h2 id="redaction-methods-compared" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Redaction methods compared: safe vs unsafe
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are several methods people use to try to hide content in a PDF. Here is an honest comparison
          of what each one actually does and whether the content is truly removed:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">How it works</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Is content truly removed?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Black box in Preview or Acrobat annotation layer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Draws a visual overlay on top of the page. The text below is unchanged in the PDF data structure.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Text is fully selectable and copyable through or around the box.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-800 dark:text-red-400 font-medium">High. Easily bypassed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Delete text in Word or a PDF editor</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Removes the text from that layer, but often leaves layout gaps, placeholder characters, or change-tracking history that can be recovered. Metadata may still reference deleted content.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Partially. Risky if track changes or document history is not also cleared.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-800 dark:text-yellow-400 font-medium">Medium. Depends on tool and workflow.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Print to paper and rescan</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Converts the document to a physical image by printing, then scans back to a digital image. All original data structures are gone.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, if the physical black-out is applied before scanning. Extremely slow. Output quality degrades significantly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-800 dark:text-green-400 font-medium">Low. But very slow and lossy.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Flatten to image in browser (SammaPix)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Renders each page to a Canvas image, draws solid black over marked regions at pixel level, writes a new image-based PDF. No text layer is created.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. No text data exists in the output file. Nothing to select or recover.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-800 dark:text-green-400 font-medium">None. Content is permanently gone.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Adobe Acrobat Pro Redact feature</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Marks regions then applies redaction, removing text data from those regions and flattening the result. Requires a paid subscription of roughly 25 dollars per month.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, when the Apply Redactions step is completed, not just marked.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-800 dark:text-green-400 font-medium">None, if used correctly. Expensive.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key insight from this table is that the two approaches most people reach for first, the black box
          overlay and deleting text in an editor, are both unreliable. The flatten-to-image approach is the
          only one that is both fast and reliably safe.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          A note on Acrobat&apos;s own annotation tool vs its redaction feature
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Even Adobe Acrobat Pro has this confusion baked in. Acrobat has two separate things: an annotation
          tool that lets you draw shapes (including filled black rectangles) as overlays, and a dedicated
          Redact tool under the Tools menu. Only the dedicated Redact tool actually removes underlying content.
          The annotation tool does not. Many people who own Acrobat Pro have used the annotation tool, assumed
          they are redacting, and shipped documents that are not truly redacted.
        </p>

        {/* ── Section 4: What to redact by document type ─────────────────── */}

        <h2 id="what-to-redact-by-document" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to redact by document type
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Knowing which fields to redact in each type of document saves time and reduces the chance of missing
          something. Here is a practical reference for the most common document types:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Document type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typically redact</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typically keep</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Contract</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Pricing, payment terms, party names, proprietary clauses, penalty amounts</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Scope of work, general terms, effective date, signature blocks (when appropriate)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Bank statement</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Account number, sort code or IBAN, full balance, specific transactions not relevant to the purpose, full name and address</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Relevant transaction lines, statement period, bank name</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Medical record</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Patient name, date of birth, NHS or insurance number, unrelated diagnoses or medications, treating clinician personal contact details</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The specific clinical data relevant to the disclosure purpose</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">HR file (employment)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Salary, home address, national insurance or tax ID, unrelated disciplinary history, personal references</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Role title, start date, employment terms relevant to the query, performance data relevant to the context</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Legal discovery document</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Attorney-client privileged communications, third-party personal data, commercially sensitive terms not relevant to the claim</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The content responsive to the discovery request</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Tax return or financial filing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Tax identification number, social security or national insurance number, unrelated income sources, bank account details</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The specific figures and schedules relevant to the submission or query</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These are general guidelines. The right answer always depends on why you are sharing the document and
          with whom. When in doubt, redact more rather than less. It is easy to share an additional unredacted
          copy if needed, and very difficult to un-share sensitive information once it is out.
        </p>

        {/* ── Section 5: Step by step in the browser ────────────────────── */}

        <h2 id="step-by-step-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to redact a PDF in your browser, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the full walkthrough for using{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">
            SammaPix PDF Redact
          </Link>{" "}
          to permanently remove sensitive content from a PDF without uploading it:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/redact-pdf</strong> in
            any modern browser: Chrome, Safari, Firefox, or Edge. No account, no signup.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the tool</strong> or click
            to browse and select it. The file is loaded locally. Nothing is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Navigate to the page with sensitive content.</strong>{" "}
            The tool renders each page. Use the page navigation to go to the section you need to redact.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Draw rectangles over the content to remove.</strong>{" "}
            Click and drag on the page to draw a black box over each region. You can draw multiple boxes on
            the same page and on different pages. The boxes are displayed as overlays at this stage so you
            can see what you are marking.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm and apply.</strong> When you have marked
            all the regions, click the redact button. The tool renders every page to an image, bakes the
            black boxes into the pixel data, and builds a new PDF from those images.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the redacted PDF.</strong> The output
            file is offered as a direct download. Open it and try to select text on the formerly sensitive
            pages: there is nothing to select. The content is gone.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to verify the redaction is real
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After downloading the redacted PDF, do two tests. First: open the file, try to click on the black
          boxes, and attempt to select text. You should find that no text is selectable anywhere on the
          affected pages, because the entire page is now an image. Second: open your browser&apos;s developer
          tools, go to the Network tab, and while you were using the tool, check whether any request carried
          your PDF data outbound. You will find none. Both tests confirm that the redaction is genuine and
          the document stayed on your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Try it on your own document</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Load a PDF, draw boxes, apply. The output has no text layer: nothing to select, copy, or recover.
            Free. No upload. Works with contracts, statements, medical records, and any other PDF with text.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/redact-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open the Redact PDF tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove metadata too <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 6: Why no-upload matters ─────────────────────────── */}

        <h2 id="no-upload-privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no-upload matters for the people who redact
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Think about who actually redacts documents for a living: lawyers, HR managers, accountants, medical
          staff, compliance officers. These are precisely the people whose documents are the most sensitive
          and the most regulated. They are also the people most likely to be in violation of GDPR, HIPAA, or
          professional confidentiality rules if they upload a client document to a random consumer tool.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          GDPR and the upload problem
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Under{" "}
          <a
            href="https://gdpr.eu/article-28-processor/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            GDPR Article 28
          </a>
          , if you transfer personal data to a third party for processing on your behalf, that party must be a
          vetted data processor under a signed Data Processing Agreement. Uploading a client&apos;s contract or
          bank statement to an online PDF tool to redact it means you have transferred personal data to a
          processor. If that processor is not under a DPA with your organisation, you are potentially in
          violation. Most consumer tools do not offer DPAs to individual users. Using a browser-based tool
          that never receives the data sidesteps this entirely: no transfer means no processing agreement
          is needed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Attorney-client privilege and legal confidentiality
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Uploading a client document to a third-party server may constitute a disclosure of privileged
          information depending on jurisdiction and context. Bar associations in multiple countries have issued
          guidance cautioning lawyers about cloud-based document processing services. The safest approach is
          one where the document never leaves the lawyer&apos;s device: which is exactly what a browser-based
          tool provides.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Healthcare and HIPAA
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          HIPAA in the United States requires that any service that processes Protected Health Information on
          behalf of a covered entity signs a Business Associate Agreement (BAA). Consumer PDF tools are not
          HIPAA Business Associates and typically do not offer BAAs. Processing a patient record through such
          a tool is a potential HIPAA violation. A browser-based tool where the data never leaves the device
          avoids this exposure entirely: the tool is never in possession of the PHI.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built SammaPix with the no-upload constraint as a first principle, not as a feature added later.
          The tools that handle the most sensitive documents (redact, pdf-split, pdf-merge, exif) all run
          locally because the people using them have the most to lose if a document leaks. See also the
          related article on{" "}
          <Link href="/blog/split-pdf-privately-no-upload" className="text-[#6366F1] hover:underline">
            splitting PDFs without uploading
          </Link>
          , which covers the same privacy principle in depth for the split use case.
        </p>

        {/* ── Section 7: Metadata ────────────────────────────────────────── */}

        <h2 id="metadata-and-redaction" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The part people forget: metadata is not redacted
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Redacting the visible content of a page removes the text you blacked out. It does not remove the
          file-level metadata that every PDF carries. That metadata includes:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Author and creator fields:</strong> the name
            of the person who created the document, often drawn from the operating system user account.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Creation and modification dates:</strong>{" "}
            when the document was originally created and last edited.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Application name:</strong> the software used
            to create or export the PDF, such as Microsoft Word 16.x or Adobe Acrobat 2024.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Custom document properties:</strong> some
            applications embed additional fields: project codes, template names, or internal identifiers.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          None of this is visible when you read the document. All of it is visible when someone opens the
          document&apos;s properties in Acrobat, or runs any metadata extraction tool on the file. In a legal
          discovery context, document metadata is often as important as document content. In a general privacy
          context, the author field can identify a specific person even when the document content is fully
          redacted.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For complete privacy, redact the visible content first, then use{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">
            SammaPix&apos;s EXIF and metadata tool
          </Link>{" "}
          to strip the file-level metadata from the output. Both tools run in the browser. Neither uploads your
          file.
        </p>

        {/* ── Section 8: Redact vs blur ─────────────────────────────────── */}

        <h2 id="redact-vs-blur" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Redact vs blur: which operation do you need?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          People sometimes use &ldquo;redact&rdquo; and &ldquo;blur&rdquo; interchangeably, but they refer to
          different operations on different content types. Here is the practical distinction:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Redact for text-based documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are working with a PDF, a scanned form, a contract, a statement, or any document that
          primarily contains text, use{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">
            SammaPix PDF Redact
          </Link>
          . The tool is designed for the document workflow: load a PDF, mark regions, get a redacted PDF.
          The output is also a PDF, suitable for sharing as a document.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use Blur and Censor for photos and images
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to hide a face in a photo, obscure a license plate, cover a screen visible in a
          screenshot, or blur any region of an image file, use{" "}
          <Link href="/tools/blur-censor" className="text-[#6366F1] hover:underline">
            SammaPix Blur and Censor
          </Link>
          . It works on JPEG, PNG, WebP, and other image formats and applies a true pixel-level blur (Gaussian
          or pixelate), not a black box overlay. The output is an image file.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Overlap: photos embedded in PDFs
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your PDF contains both text and embedded photos, and you need to redact a face in one of those
          photos, the PDF Redact tool still works: it renders the entire page (including any embedded images)
          to a canvas and lets you draw boxes over any region, including photo regions. The result is the same:
          a flat image-based page with the marked region permanently blacked out.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The difference between the tools is the input and output format, and the specific workflow. For
          standalone images, use blur. For PDFs, use redact. Both are browser-based, no upload, free.
        </p>

        {/* ── Section 9: The honest trade-off ─────────────────────────────── */}

        <h2 id="trade-offs" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The honest trade-off: image-based output
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          True redaction through page flattening comes with one significant trade-off that you should
          understand before you start: the output PDF is image-based. This means:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No text selection on any page.</strong> The
            non-redacted text is also part of the image, so it cannot be selected or copied either. If the
            recipient needs to quote a specific clause by copying text from the PDF, they will need to retype
            it, or you will need to provide a separate unredacted version for that purpose.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No text search within the file.</strong>{" "}
            Command-F or Ctrl-F will not find text inside an image-based PDF. Screen readers for accessibility
            also cannot read the text.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Slightly larger file size.</strong> Images
            tend to be larger than text encoded as vector data. The redacted PDF may be somewhat larger than
            the original, depending on the page complexity and render resolution.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These are not bugs. They are the direct consequence of the mechanism that makes the redaction secure.
          The absence of a text layer is exactly what guarantees the redacted content cannot be recovered.
          A properly redacted document is expected to be image-based: that is the correct behaviour. Courts,
          regulatory bodies, and compliance frameworks all accept image-based redacted PDFs. The trade-off is
          real but it is the intended design.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          If you need selectable text on the non-redacted portions
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Acrobat Pro&apos;s redaction feature has an option to apply OCR after redacting, re-adding a
          searchable text layer to the non-redacted portions. This is more sophisticated, but requires the
          Acrobat Pro subscription. For most use cases, the image-based output from a browser tool is
          entirely sufficient. If text selectability on the non-sensitive portions is a strict requirement
          for your workflow, that is the trade-off to be aware of.
        </p>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF privacy tools, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Redact sensitive text, split out pages, strip metadata, or blur faces in photos. Every tool runs
            locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/redact-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Redact PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/blur-censor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Blur and Censor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove Metadata <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
