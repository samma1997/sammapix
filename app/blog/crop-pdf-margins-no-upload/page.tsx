import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Remove White Margins from a PDF (No Upload) [2026]",
  description:
    "Remove white margins from scanned PDFs or optimize for e-reader reading — entirely in your browser via pdf-lib setCropBox. Per-side crop, live pdf.js preview, no upload, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/crop-pdf-margins-no-upload`,
  },
  keywords: [
    "remove white margins pdf",
    "crop pdf margins",
    "crop scanned pdf",
    "trim pdf white space",
    "remove margins from pdf",
    "crop pdf for ereader",
    "pdf margin removal no upload",
    "trim pdf borders",
    "crop scanned document pdf",
    "pdf white margin crop free",
  ],
  openGraph: {
    title: "How to Remove White Margins from a PDF (No Upload) [2026]",
    description:
      "Strip white borders from scanned PDFs and optimize for e-reader or tablet — entirely in your browser. pdf-lib setCropBox, live pdf.js preview, per-side control. No upload, no server. Free.",
    url: `${APP_URL}/blog/crop-pdf-margins-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Remove White Margins from a PDF (No Upload) [2026]",
    description:
      "Remove white margins from scanned PDFs 100% in your browser. Per-side CropBox, live preview. No upload, free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/crop-pdf-margins-no-upload`;
const POST_TITLE = "How to Remove White Margins from a PDF (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "White margins on scanned PDFs waste screen space on e-readers and tablets, and look unprofessional when sharing. SammaPix PDF Crop removes white margins entirely in your browser using pdf-lib setCropBox and pdf.js for live preview — no upload, no server, no signup. This guide covers how to measure the right crop, the difference between CropBox and rasterization, and how to optimize PDFs specifically for Kindle, iPad, and tablet reading.",
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
    "remove white margins pdf",
    "crop pdf margins",
    "crop scanned pdf",
    "trim pdf white space",
    "crop pdf for ereader",
    "pdf margin removal",
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
  name: "How to Remove White Margins from a PDF Without Uploading",
  description:
    "Remove white margins from a scanned PDF or academic paper entirely in your browser. SammaPix PDF Crop uses pdf-lib setCropBox and pdf.js live preview. Per-side margin control for uneven scanner borders. No upload, no server, free.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Crop (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Crop tool",
      text: "Go to sammapix.com/tools/crop-pdf in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your scanned PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse. pdf.js renders a live preview so you can see the current white margins before adjusting anything. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Measure and enter your crop values per side",
      text: "Look at the white border in the preview and estimate or measure how many points to remove from each side — top, right, bottom, left. Each side is independent. Start conservatively and adjust. The preview updates as you type.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm no content is cut off",
      text: "Check the live preview to verify that only white margin is removed and no text or image content is cropped. Adjust values if needed. A margin of 5 to 10 points of whitespace left on each side looks clean and prevents clipping.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the cropped PDF",
      text: "Click Crop PDF. pdf-lib applies the CropBox to every page. The output is downloaded directly from browser memory. No network request occurs. The resulting PDF displays correctly on any viewer, Kindle, or tablet app.",
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
      name: "Why do scanned PDFs have white margins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flatbed scanners capture the entire scan bed area, which is always slightly larger than the document being scanned. The area around the document — where the scan bed is empty — appears as white (or occasionally black) borders in the output PDF. These borders are not part of the original document. They are an artifact of how flatbed scanners work: the scan area is fixed, and the document inside it is smaller than the maximum scan dimensions. Removing them is pure cleanup, not content loss.",
      },
    },
    {
      "@type": "Question",
      name: "Why does removing white margins matter for e-readers and tablets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF viewers on Kindle, iPad, and Android tablets display the full page including all white margins. On a 6-inch Kindle screen, a scanned A4 document with 15mm margins on each side loses roughly 25% of the available screen width to whitespace. The text renders smaller to fit the full page. Cropping those margins away forces the viewer to fill the screen with actual content, which increases the effective text size by 20 to 40% without changing the document. For academic papers on two-column layouts with wide outer margins, the improvement is dramatic.",
      },
    },
    {
      "@type": "Question",
      name: "How do I figure out how many points to crop from each side?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the live preview in the SammaPix PDF Crop tool as your guide. A standard white margin on a scanned A4 document is typically between 20 and 50 points wide (1 point equals 1/72 of an inch, so 72 points equals one inch). For a document with visibly thick margins, start with 40 to 50 on each affected side. For thin scanner borders, 10 to 20 is usually enough. Type a value, watch the preview update, and adjust until the visible boundary sits close to the content — leaving 5 to 10 points of safe whitespace is a good practice to avoid clipping.",
      },
    },
    {
      "@type": "Question",
      name: "Will removing white margins reduce the file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Setting the CropBox via pdf-lib only changes a small dictionary entry in each page object — it does not remove any image data from the file. The full scanned image (including the white margin areas) is still present in the file. The CropBox simply tells viewers to display only the inner rectangle. If you want to also reduce the file size of the scanned PDF, run it through the SammaPix PDF Compress tool after cropping.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove margins from just some pages, or does it apply to all pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix PDF Crop applies the same margin values to all pages in the document. This is the right behavior for scanned documents where the same scanner border appears on every page. If you need different crops on different pages — for example, a document with both portrait and landscape pages — the current version does not support per-page crop values. For that workflow, consider splitting the document first with PDF Split, cropping each section separately, then merging the results back with PDF Merge.",
      },
    },
    {
      "@type": "Question",
      name: "Does cropping white margins affect the text I can search or select?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix PDF Crop uses pdf-lib setCropBox — it does not rasterize or re-render the page. For scanned PDFs that already consist of images (and whose text was made searchable by OCR), the OCR text layer is preserved exactly as-is. For text-based PDFs, all text remains selectable and searchable. The CropBox only changes what is displayed — the underlying page content stream is completely untouched.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work on PDFs from a phone scanner app like Adobe Scan or Microsoft Lens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PDFs exported from Adobe Scan, Microsoft Lens, Google PhotoScan, or any other phone scanning app work the same way. These apps sometimes add thin white borders around the cropped page area, or include slight padding around the detected document boundaries. SammaPix PDF Crop handles these exactly like flatbed scanner borders: drop the PDF, set your margin values in the live preview, and download the tightly cropped version.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from cropping an image in an image editor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Image editor cropping permanently removes pixels outside the crop boundary — the content is gone, and the file size typically decreases. PDF CropBox cropping hides content outside the boundary but keeps it in the file — no pixels are removed, and the file size is essentially unchanged. For margin removal from scanned documents, both achieve the same visual result. The PDF approach has the advantage of being completely reversible: you can always set a new CropBox to reveal more or less of the page later. The image approach is destructive and irreversible.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CropPdfMarginsNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="crop-pdf-margins-no-upload"
        description="White margins on scanned PDFs waste screen space on e-readers and tablets — and make reading unnecessarily difficult. SammaPix PDF Crop removes those margins entirely in your browser using pdf-lib setCropBox, with a live pdf.js preview and per-side control. No upload required. Here is how to do it and what values to use."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "why-white-margins-matter", title: "Why white margins on PDFs are a bigger problem than they look" },
          { id: "where-white-margins-come-from", title: "Where white margins come from: scanners, apps, and exports" },
          { id: "ereader-tablet-impact", title: "The e-reader and tablet impact: why margin removal matters there most" },
          { id: "how-cropbox-works", title: "How CropBox removes margins without deleting content" },
          { id: "measuring-crop-values", title: "How to measure the right crop values" },
          { id: "step-by-step", title: "How to remove white margins from a PDF, step by step" },
          { id: "academic-papers", title: "Optimizing academic papers for tablet reading" },
          { id: "comparison-table", title: "Browser-based vs upload-based margin removal: honest comparison" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "White margins on scanned PDFs come from flatbed scanner borders, phone scanning apps, and print-formatted exports. They waste screen space and make documents harder to read on e-readers and tablets.",
          "SammaPix PDF Crop removes margins by setting the CropBox via pdf-lib — entirely in your browser. No file upload, no server, no signup.",
          "The CropBox hides content outside the boundary without deleting it. The operation is lossless, reversible, and does not re-encode anything. Text stays selectable.",
          "A live pdf.js preview updates as you type margin values, so you can confirm the right crop before downloading.",
          "Per-side control (top, right, bottom, left) handles uneven scanner borders precisely — you do not need to apply the same value to all sides.",
          "Removing margins from academic papers before loading on Kindle or iPad can increase the effective text size by 20 to 40% without changing the document.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A tablet displaying a document with large white margins on both sides, illustrating the wasted screen space that PDF margin cropping can reclaim for reading."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              White PDF margins waste screen space on e-readers and tablets — removing them takes under a minute without uploading your file.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Remove white margins from your PDF, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Crop runs entirely in your browser via pdf.js and pdf-lib. Per-side margin control,
              live preview as you type, text stays selectable. Ideal for scanned documents and e-reader optimization. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/crop-pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Crop, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
        }
      >

        {/* ── Section 1: Why white margins matter ──────────────────────── */}

        <h2 id="why-white-margins-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why white margins on PDFs are a bigger problem than they look
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On a 24-inch monitor, a PDF with 15mm white margins on each side looks fine. The screen is large enough that the whitespace around the content does not feel intrusive. But the same PDF on a 6-inch Kindle screen or a 9-inch tablet tells a different story.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF viewers on e-readers and tablets display the entire page as defined, including all margins. On a Kindle Paperwhite (1236 x 1648 pixels, 227 ppi), a scanned A4 document with 20mm margins on each side loses roughly 30% of the screen area to whitespace. The remaining 70% renders the content, which means the text is displayed at 70% of what it could be if the margins were removed.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fix is simple: remove the white margins. I built{" "}
          <Link href="/tools/crop-pdf" className="text-[#6366F1] hover:underline">SammaPix PDF Crop</Link>{" "}
          to do exactly this — entirely in your browser, without uploading your document to any server, using pdf-lib&apos;s setCropBox and a live pdf.js preview.
        </p>

        {/* ── Section 2: Where white margins come from ──────────────────── */}

        <h2 id="where-white-margins-come-from" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Where white margins come from: scanners, apps, and exports
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          White margins in PDFs originate from three main sources, each with slightly different characteristics:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Flatbed scanner borders
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Flatbed scanners capture a fixed area defined by the scan glass. When you place an A4 document on a scanner with a Letter-sized scan area, the scanner captures the full Letter area — including the empty zones around the A4 sheet. These appear as white or light-gray borders in the output PDF. The width of these borders depends on how precisely you positioned the document on the glass.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Phone scanning apps
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Apps like Adobe Scan, Microsoft Lens, Google Drive Scan, and Apple Continuity Camera use perspective correction and document detection to automatically crop the captured image to the document boundary. However, they typically add a small padding around the detected edge — a few millimetres — to avoid accidentally clipping content. This padding appears as thin white borders in the exported PDF.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Print-formatted document exports
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Academic papers, textbooks, and reports exported from Word, LaTeX, LibreOffice, or InDesign are formatted for print with standard page margins (typically 20 to 30mm on each side). These margins are intentional for the printed page — they improve readability and leave room for binding. On a screen, especially a small one, they serve no purpose and waste space. Cropping them produces a screen-optimized version of the document that the reader can load on their e-reader or tablet.
        </p>

        {/* ── Section 3: E-reader and tablet impact ─────────────────────── */}

        <h2 id="ereader-tablet-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The e-reader and tablet impact: why margin removal matters there most
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF viewers on e-readers and tablets differ from desktop viewers in one critical way: they do not automatically reflow text. They display the PDF as-is, at the page dimensions defined in the file. This means white margins are always visible and cannot be hidden by zooming to a column.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Kindle and e-ink devices
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Kindles have a built-in margin trimmer for e-books, but for PDFs it does not work reliably — and on the basic Kindle models, it is not available at all. The correct approach is to remove the margins before transferring the PDF. A scanned A4 document with 25mm margins cropped to nearly content-only on a Kindle Paperwhite screen renders the text about 35% larger, making it genuinely readable without zooming or horizontal scrolling.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          iPad and Android tablets
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On an iPad Pro (11 or 13 inch), the margin waste is less severe — the screen is large enough to absorb 20mm margins without destroying readability. But on a standard iPad or an Android tablet in the 8 to 10 inch range, margin removal still provides a meaningful improvement. More importantly, it eliminates the need to pinch-and-zoom to read content — a friction point that adds up over long reading sessions.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Two-column academic papers: the extreme case
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most dramatic improvement from margin cropping applies to two-column academic papers in PDF format (IEEE, Elsevier, ACM, and similar journal styles). These papers have wide left and right outer margins — often 20 to 25mm — plus the gutter between the two columns. On a tablet, the text in each column is tiny. Cropping the outer margins aggressively (while leaving the center gutter) makes each column significantly more readable without horizontal scrolling.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Remove white margins from your PDF, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Per-side margin control. Live preview updates as you type. Text stays selectable. Works on scanned
            documents, academic papers, and phone scan exports. Free, no signup.
          </p>
          <Link
            href="/tools/crop-pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Crop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: How CropBox works ──────────────────────────────── */}

        <h2 id="how-cropbox-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How CropBox removes margins without deleting content
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification defines a set of page boundary boxes. When SammaPix PDF Crop applies your margin values, it uses pdf-lib to set the{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">CropBox</code>{" "}
          on each page. Here is what that means:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">MediaBox</strong> — the full physical page size. Unchanged by cropping. For a scanned A4 page, this is 595 x 842 points.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CropBox</strong> — the region of the page that PDF viewers display. When you crop 40 points from each side of an A4 page, the CropBox becomes{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">[40, 40, 555, 802]</code>{" "}
            — inset from each edge by 40 points. Viewers display only this rectangle.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The white margin areas are hidden, not deleted. The original scanned image is still present in full behind the CropBox boundary. This has two practical implications:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The operation is reversible.</strong> You can always set a new CropBox (or remove it entirely) to restore the original margins. The underlying scan is never changed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The file size does not decrease.</strong> The margin image data is still present. To reduce the file size of a scanned PDF, run it through{" "}
            <Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link>{" "}
            after cropping.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because no content is re-encoded, the operation is instantaneous regardless of page count, and text (including OCR text layers from scanning apps) remains selectable in the output.
        </p>

        {/* ── Section 5: Measuring crop values ─────────────────────────── */}

        <h2 id="measuring-crop-values" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to measure the right crop values
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The live preview in SammaPix PDF Crop is your primary tool for finding the right values. But having a starting point helps. Here are reference values for the most common scenarios:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Source</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical margin width</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Starting crop value (points)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Flatbed scanner border</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3 to 8mm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8 to 23 pt per affected side</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Phone scanning app padding</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2 to 5mm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">6 to 14 pt per side</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Academic paper (Word/LaTeX)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 30mm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">57 to 85 pt per side</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Book chapter (print layout)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">15 to 25mm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">43 to 71 pt per side</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Presentation export (slide whitespace)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">10 to 20mm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">28 to 57 pt per side</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To convert millimetres to points: multiply by 2.835. A 20mm margin is 57 points. A 25mm margin is 71 points. Leave 5 to 10 points of whitespace on each side as a safety margin — this prevents edge content from being clipped if the document has any slight variation in margins across pages.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to remove white margins from a PDF, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under two minutes for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/crop-pdf</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone.</strong> pdf.js renders a live preview of the first page. You can immediately see the white margins and estimate their width relative to the content area.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter starting crop values.</strong> Using the reference table above as a starting point, type values for top, right, bottom, and left. For a scanned document with uniform borders, try 30 to 50 on each side first and adjust from there.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Watch the preview update.</strong> As you type, the live preview shows you exactly where the CropBox boundary falls. Adjust each side independently until the visible area starts close to the content with a few points of breathing room.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm no content is cut off.</strong> Scroll through the preview to check different representative pages — the first page, a body page, and the last page — to make sure the margins are consistent and nothing is clipped.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Crop PDF and download.</strong> pdf-lib applies the CropBox to all pages. The output is served from browser memory as a Blob. No network request occurs. Transfer the downloaded PDF to your Kindle, tablet, or e-reader app.
          </li>
        </ol>

        {/* ── Section 7: Academic papers ────────────────────────────────── */}

        <h2 id="academic-papers" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Optimizing academic papers for tablet reading
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Academic papers are the use case where PDF margin removal has the most impact. Most papers follow a two-column layout (IEEE, ACM, Elsevier, Springer) with wide outer margins — designed for A4 or Letter print with generous whitespace. On a 10-inch tablet, these papers are borderline unreadable without zooming.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Recommended crop values for two-column papers
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For standard IEEE or ACM two-column A4 papers (595 x 842 pt page), start with these values and adjust using the preview:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Top:</strong> 50 to 60 pt (removes the running header and most of the top margin)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bottom:</strong> 50 to 60 pt (removes the running footer with page number and bottom margin)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Left:</strong> 40 to 55 pt (trims the left outer margin)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Right:</strong> 40 to 55 pt (trims the right outer margin)
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Be careful not to crop the running headers or footers on the first page — title, authors, and abstract are often formatted differently and extend closer to the edges than the body pages. Check the first and last page in the preview before downloading.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The result
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          With 50 pt cropped from each side of a standard A4 paper, the visible area increases from 595 x 842 to 495 x 742 points — the content fills about 22% more of each dimension. On a 10-inch tablet at 100% zoom, the text renders noticeably larger. On a 6-inch e-ink device, the improvement is even more pronounced. The paper is still displayed as a two-column layout (cropping does not reflow text), but the text size makes it genuinely comfortable to read without pinching.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Per-side margin control. Live preview. No upload, no account, no server. Text stays selectable.
            Ideal for scanned documents and academic papers optimized for e-readers. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/crop-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Crop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/crop-pdf-online-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full crop PDF guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based margin removal: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter for this specific use case:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full document uploaded to a remote server before cropping.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Live preview</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually requires uploading first. Preview is server-rendered.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant local preview via pdf.js. Updates as you type values.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Per-side control</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many tools offer only symmetric margins. Some have per-side on paid plans.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always per-side — top, right, bottom, left independently.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">OCR text layer preservation</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends. Some tools rasterize during crop, destroying the OCR layer.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. CropBox does not touch the content stream.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans cap at 5 to 25 MB. Larger files need a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited only by device memory. No artificial cap.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline after page load</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires upload and server processing.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Cropping works without an internet connection once the page is loaded.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools. All of them run locally with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/crop-pdf" className="text-[#6366F1] hover:underline">PDF Crop</Link></strong>: set CropBox margins per side — top, right, bottom, left. Live preview. Text stays selectable. No upload. See also the full guide at{" "}
            <Link href="/blog/crop-pdf-online-free" className="text-[#6366F1] hover:underline">Crop a PDF Online Free (Trim Margins)</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: after cropping, reduce the file size of your scanned PDF by rasterizing and re-encoding page images at a lower quality. Read the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages before cropping. Rotation is written permanently into the page Rotate property. Read the full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete blank scanner pages or unwanted sections from your scanned document before sending. Thumbnail grid and range input. Read the full guide at{" "}
            <Link href="/blog/delete-pages-from-pdf-online" className="text-[#6366F1] hover:underline">Delete pages from a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages or sections from a longer document before cropping. Useful for academic papers where you want to crop and transfer only a specific section.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Crop margins, compress, rotate, remove pages, and split PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf.js and pdf-lib. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/crop-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Crop PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
