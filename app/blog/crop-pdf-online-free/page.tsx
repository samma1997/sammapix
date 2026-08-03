import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Crop a PDF Online Free (Trim Margins) [2026]",
  description:
    "Crop PDF margins per side — top, right, bottom, left — entirely in your browser via pdf-lib setCropBox. Preview with pdf.js. No upload, no signup, no server. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/crop-pdf-online-free`,
  },
  keywords: [
    "crop pdf online",
    "crop pdf",
    "trim pdf margins",
    "crop pdf free",
    "crop pdf online free",
    "trim pdf online",
    "pdf margin crop",
    "crop pdf browser",
    "pdf crop tool no upload",
    "crop pdf no signup",
  ],
  openGraph: {
    title: "Crop a PDF Online Free (Trim Margins) [2026]",
    description:
      "Set precise crop margins — top, right, bottom, left — on any PDF entirely in your browser. pdf-lib setCropBox + pdf.js live preview. No upload, no server. Free.",
    url: `${APP_URL}/blog/crop-pdf-online-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop a PDF Online Free (Trim Margins) [2026]",
    description:
      "Crop PDF margins 100% in your browser via pdf-lib setCropBox. Per-side control, live preview. No upload, free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/crop-pdf-online-free`;
const POST_TITLE = "Crop a PDF Online Free (Trim Margins) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF cropping tools upload your file to a remote server. SammaPix PDF Crop works entirely in your browser using pdf.js (for live preview) and pdf-lib (to set the CropBox on every page). This guide explains how browser-based PDF cropping works, what setCropBox does versus rasterization, how to set per-side margins, and how to verify no upload ever happens.",
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
    "crop pdf online",
    "crop pdf",
    "trim pdf margins",
    "crop pdf free",
    "pdf margin crop",
    "crop pdf browser",
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
  name: "How to Crop a PDF Online Without Uploading It",
  description:
    "Crop PDF margins per side in your browser with no file upload, using SammaPix PDF Crop powered by pdf.js and pdf-lib. Set top, right, bottom, left margins independently, preview live, and download.",
  totalTime: "PT1M",
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
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. pdf.js renders a live preview of the first page so you can see the current margins before adjusting anything. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set your crop margins per side",
      text: "Enter the amount to crop from each side — top, right, bottom, and left — in points or millimetres. Each side is controlled independently, so you can crop only the left and bottom margins without touching the top or right.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Preview the result",
      text: "The preview updates as you type so you can see exactly how much content remains. Confirm the margins are correct and that no meaningful content is being cut off before downloading.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the cropped PDF",
      text: "Click Crop PDF. pdf-lib sets the CropBox on every page using the margins you defined. The output is downloaded directly from browser memory as a blob URL. No network call occurs.",
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
      name: "Does cropping a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, Adobe Acrobat Online, and similar services upload your PDF to their servers for processing. With SammaPix PDF Crop, no. The cropping runs entirely in your browser using pdf.js (to render a live preview) and pdf-lib (to set the CropBox on each page). Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "What does setCropBox actually do in pdf-lib? Is the cropped content deleted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CropBox is a PDF standard property that tells viewers which region of the page to display. When pdf-lib sets the CropBox, it narrows the visible area of the page to the rectangle you defined — the content outside that rectangle is hidden but still present in the file. This is both a strength and a limitation. The strength: the operation is lossless, instant, and does not re-encode any content. Text stays selectable. The limitation: the cropped content is not permanently deleted — it is just hidden. If you need to permanently remove content from the margins, you would need a full redaction workflow (which is different from cropping).",
      },
    },
    {
      "@type": "Question",
      name: "Can I crop different amounts from different sides of the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool provides four independent margin inputs: top, right, bottom, and left. You can crop 20mm from the left and 5mm from the top while leaving the right and bottom untouched. This per-side control is useful for scanned documents that have uneven margins from the scanner, or for PDFs where the binding margin is only on one side.",
      },
    },
    {
      "@type": "Question",
      name: "Does cropping affect text selectability or image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix PDF Crop uses pdf-lib to set the CropBox — it does not rasterize the page or re-render anything. The page content stream is completely untouched. After cropping, text in the remaining visible area is still selectable and searchable, images remain at their original resolution and quality, vector graphics stay crisp at any zoom level, and hyperlinks remain active. Only the visible display area changes.",
      },
    },
    {
      "@type": "Question",
      name: "Does the file size change after cropping a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, or negligibly. Setting the CropBox via pdf-lib only adds or updates a small dictionary entry in each page object. The page content itself is not changed, re-encoded, or compressed. The output file size is essentially identical to the input. This is a key advantage over rasterization-based approaches, where every page gets re-encoded as a JPEG image and the file size can change dramatically.",
      },
    },
    {
      "@type": "Question",
      name: "Will the cropping apply to every page in the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix PDF Crop applies the same margin values to every page in the document. The CropBox is set page by page using pdf-lib, but the margin values you enter are applied uniformly across all pages. This is the correct behavior for the most common use case: removing consistent scanner borders or white margins that appear on every page of a scanned document.",
      },
    },
    {
      "@type": "Question",
      name: "Can I crop a password-protected PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib cannot modify a password-protected or encrypted PDF without the owner password, because the file content is encrypted and the library cannot write changes to the page structure. If your PDF is protected, you need to unlock it first. SammaPix offers a separate PDF Unlock tool that removes owner-level restrictions from PDFs that you are authorized to modify.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when I crop a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your PDF into the SammaPix PDF Crop tool and proceed through margin entry and download. Watch the network panel throughout. You will see requests for static page assets (JavaScript, CSS) when the tool loads. During preview rendering, margin adjustments, and the download step, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is served via a blob URL — no network call is made at any point.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CropPdfOnlineFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="crop-pdf-online-free"
        description="Cropping a PDF should not require uploading it to a server you do not control. SammaPix PDF Crop runs entirely in your browser — set per-side margins, preview the result live, and download the cropped file without any upload. Here is how it works and what setCropBox actually does."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most PDF crop tools upload your file" },
          { id: "how-browser-crop-works", title: "How browser-based PDF cropping actually works" },
          { id: "cropbox-explained", title: "What setCropBox does — and what it does not do" },
          { id: "per-side-margins", title: "Per-side margin control: top, right, bottom, left" },
          { id: "text-quality-preserved", title: "Text stays selectable — no rasterization" },
          { id: "step-by-step", title: "How to crop a PDF without uploading it, step by step" },
          { id: "use-cases", title: "When you need to crop a PDF: common scenarios" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF cropping: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF crop tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, bank statements, and confidential documents, that is a real privacy risk.",
          "SammaPix PDF Crop runs entirely in your browser using pdf.js (live preview) and pdf-lib (to set the CropBox on each page). Your file never leaves your device.",
          "setCropBox narrows the visible display area of each page. The content outside the crop boundary is hidden but not deleted — the operation is lossless and does not re-encode anything.",
          "Text remains selectable and image quality is unchanged. pdf-lib does not rasterize any content — it only updates the CropBox entry in the page structure.",
          "Per-side margin control (top, right, bottom, left) lets you crop uneven scanner borders precisely. Each side is set independently.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing a printed document with wide white margins on a desk, representing the common need to crop PDF margins from scanned files."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Cropping PDF margins should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Crop your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Crop runs entirely in your browser via pdf.js and pdf-lib. Set per-side margins — top,
              right, bottom, left — preview the result live, and download. Text stays selectable. Free, no signup.
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

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most PDF crop tools upload your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You have a scanned contract or a PDF exported from Word and it is surrounded by thick white margins. You search for &quot;crop PDF online&quot; and land on iLovePDF, Smallpdf, or Adobe Acrobat Online. You drag the file in. A progress bar fills. The file uploads to their server, gets processed remotely, and you download the result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The cropping worked. But your document spent time on a server you have no visibility into. Their privacy policy says files are deleted within an hour — you cannot verify that claim, and you cannot know whether the file transited other systems during processing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For bank statements, medical reports, signed contracts, and anything containing personal or financial data, this is a real concern. I built{" "}
          <Link href="/tools/crop-pdf" className="text-[#6366F1] hover:underline">SammaPix PDF Crop</Link>{" "}
          to solve this by keeping the entire crop process inside your browser. No server is involved at any point.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Crop, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The file stays in browser memory throughout. Processing uses{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a>{" "}
          (Mozilla&apos;s open-source PDF renderer, used to generate the live preview) and{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          (an open-source JavaScript library for reading and writing PDF files). The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file.
        </p>

        {/* ── Section 2: How browser crop works ────────────────────────── */}

        <h2 id="how-browser-crop-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF cropping actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains why this approach preserves quality while being fast and private. Here is what happens under the hood when you crop a PDF in the browser:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf.js renders a live preview of the page.</strong> When you drop the PDF, pdf.js reads and renders the first page into a canvas element. This preview updates as you adjust the margin values, so you can see exactly how much content remains visible before committing to a crop.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You enter per-side margin values.</strong> The top, right, bottom, and left margin inputs are independent. You can crop 20 points from the left without touching any other side. The preview updates instantly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib sets the CropBox on each page.</strong> This is the critical step. pdf-lib reads the existing page dimensions (the MediaBox, which defines the full physical page size), subtracts your margin values from each side, and writes the resulting rectangle as the{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">CropBox</code>{" "}
            in the page dictionary. This is a standard PDF property defined in ISO 32000. No content is re-rendered, re-encoded, or touched.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is offered for download.</strong> The updated PDF bytes are stored as a Blob in browser memory and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key insight is that the PDF format has a built-in, standardized way to specify the visible display area of each page. pdf-lib simply writes that rectangle into the file. No pixels are touched, no content is re-encoded — which is why text stays selectable and quality stays identical.
        </p>

        {/* ── Section 3: CropBox explained ──────────────────────────────── */}

        <h2 id="cropbox-explained" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What setCropBox does — and what it does not do
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification defines five page boundary boxes. The two you need to understand for cropping are:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          MediaBox — the full physical page
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The MediaBox defines the full extent of the page, including any content outside the visible display area. Think of it as the physical sheet of paper — it encompasses everything. When a PDF viewer opens a file, the MediaBox sets the maximum dimensions of the page.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          CropBox — the visible display area
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The CropBox defines the region of the page that PDF viewers display and print. When you set a CropBox smaller than the MediaBox, the viewer shows only the CropBox area. Content between the CropBox boundary and the MediaBox boundary is still present in the file — it is simply hidden from the viewer.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This has a practical implication: cropping via setCropBox is lossless. The original content is preserved. If you open the cropped PDF in a viewer that exposes the MediaBox (some professional tools do), you could still see the hidden content. For most use cases — trimming scanner borders, removing excess whitespace for e-reader display, fitting content to a tighter layout — this is exactly the right tool. For full content deletion, you would need a dedicated redaction tool like{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">PDF Redact</Link>.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it defines</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Effect of cropping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">MediaBox</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full physical page size (unchanged by cropping)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not modified — original dimensions preserved</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">CropBox</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Visible display area shown to the viewer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Set to MediaBox minus your margin values</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Per-side margins ───────────────────────────────── */}

        <h2 id="per-side-margins" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Per-side margin control: top, right, bottom, left
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most powerful aspect of the SammaPix PDF Crop tool is independent control over each side of the margin. Most online cropping tools offer only a single &ldquo;margin&rdquo; value that applies equally to all four sides. That is rarely what you need in practice.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Typical real-world scenarios
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Flatbed scanner border on three sides:</strong> the scanner glass produces a thin black border along the top, left, and bottom but not the right. You need different values for each affected side.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bound document scan:</strong> a book or folder scanned with a wide binding margin on the left. You want to trim only the left side to balance the layout without touching the right margin.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Header and footer removal:</strong> a PDF with a large header on top and a footer at the bottom that you want hidden. Crop only top and bottom, leaving the left and right untouched.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">E-reader or tablet optimization:</strong> a two-column academic paper with wide outer margins. Crop the outer margins on both sides to maximize the text area on the screen. We cover this in depth in the companion article{" "}
            <Link href="/blog/crop-pdf-margins-no-upload" className="text-[#6366F1] hover:underline">How to Remove White Margins from a PDF (No Upload)</Link>.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool translates each margin input into the corresponding change to the CropBox coordinates. For a standard A4 page (595 x 842 points), cropping 40 points from the left and 20 from the top produces a CropBox of{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">[40, 0, 595, 822]</code>{" "}
          — precise arithmetic applied directly to the page dictionary.
        </p>

        {/* ── Section 5: Text quality preserved ─────────────────────────── */}

        <h2 id="text-quality-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text stays selectable — no rasterization
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some PDF crop tools work by rendering every page to a pixel image (rasterization), cropping the image, and assembling a new PDF from the cropped images. This approach produces a visually cropped PDF but destroys all structure:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text becomes an image.</strong> You cannot select, copy, or search the text in the output PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Quality degrades.</strong> Re-encoding pages as JPEG introduces compression artifacts, especially on sharp text edges and fine line graphics.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File size changes unpredictably.</strong> Rasterization can inflate a 1 MB text PDF to 5 MB or more, depending on the page resolution and JPEG quality settings used by the tool.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Crop does none of these things. pdf-lib modifies only the{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">CropBox</code>{" "}
          entry in the page dictionary. The page content stream is completely untouched. After cropping:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Text is still selectable and copyable</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">The document is still searchable (Cmd+F / Ctrl+F)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Images remain at their original resolution and quality</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Vector graphics stay crisp at any zoom level</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Hyperlinks remain active</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">File size is essentially unchanged</li>
        </ul>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Crop your PDF margins in your browser, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no rasterization, no quality loss. Text stays selectable. Per-side margin control.
            Live preview via pdf.js. Free, no signup.
          </p>
          <Link
            href="/tools/crop-pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Crop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to crop a PDF without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/crop-pdf</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders a live preview of the first page. You will see the current page with its existing margins, so you have a reference point before making any adjustments.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter your crop values for each side.</strong> Type the amount to remove from the top, right, bottom, and left. The values are in points by default (1 point = 1/72 inch; an A4 page is 595 x 842 pt). The preview updates as you type.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the preview.</strong> Confirm the visible area looks correct and that no important content is being cut off. Adjust the margin values if needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Crop PDF.</strong> pdf-lib sets the CropBox on every page using the margin values you entered. This is applied uniformly across all pages in the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the result.</strong> The cropped PDF is served from browser memory as a Blob. No network request occurs.
          </li>
        </ol>

        {/* ── Section 7: Use cases ──────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need to crop a PDF: common scenarios
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF cropping comes up in a handful of recurring workflows. Here are the most common ones:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Removing scanner borders from scanned documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Flatbed scanners almost always capture a thin black or gray border around the document — the edge of the scan bed. This border is irrelevant and distracting. Cropping a few points from each side removes it cleanly, producing a borderless scan. Per-side control is essential here because the border is rarely perfectly uniform.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Preparing PDFs for e-reader or tablet reading
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Academic papers, technical reports, and book chapters exported as PDFs often have wide margins designed for A4 or Letter paper. On an e-reader or tablet, those margins consume screen space and force the text to render smaller. Cropping the margins — especially on academic two-column layouts with wide outer margins — significantly increases the readable text size. See the full guide at{" "}
          <Link href="/blog/crop-pdf-margins-no-upload" className="text-[#6366F1] hover:underline">How to Remove White Margins from a PDF (No Upload)</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cropping a print-ready PDF before screen sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Print-ready PDFs include bleed and slug areas — extra space outside the trim edge used during printing. When sharing PDFs for review or presentation, those areas look unprofessional on screen. Cropping to the TrimBox area (the actual intended page size) removes the bleed and slug without affecting any content.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Hiding a header or footer before sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If a PDF has a prominent header with your organization name or a footer with internal document codes that should not be visible in a shared version, cropping the top or bottom margin is a fast way to hide them. Keep in mind that setCropBox hides rather than deletes — if complete removal is required, use{" "}
          <Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">PDF Redact</Link>{" "}
          instead.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Matching a non-standard crop for a slide deck export
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Presentation tools sometimes export slides with additional white space around the slide area — especially when exporting to PDF from Keynote, Google Slides, or LibreOffice Impress. Cropping those borders makes the slides fill the page correctly when viewed or re-imported.
        </p>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF cropping: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison of the two approaches across the dimensions that matter most:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text selectability after cropping</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Some rasterize pages (text becomes image). Good tools set the CropBox.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. pdf-lib only sets the CropBox — no rasterization, ever.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Per-side margin control</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Many offer only a single symmetric margin value.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Independent top, right, bottom, left inputs.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size change after cropping</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">May increase or decrease significantly if the tool rasterizes pages.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Essentially zero change. Only the CropBox dictionary entry is updated.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Live preview before cropping</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some require uploading and processing to see the result.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. pdf.js renders a live preview that updates as you type margin values.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans typically cap at 5 to 25 MB. Larger files need a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap. No server involved.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
            </tbody>
          </table>
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, adjust margins, and click Crop PDF.</strong> Watch the Network panel as the live preview renders and as you click Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only network activity is the initial page load (JavaScript and CSS assets). During preview rendering, margin adjustments, and download, the Network panel shows zero outgoing requests. The PDF is processed and served entirely from browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the standard method used by privacy researchers to audit browser-based tools. It is conclusive: if no network request carries your PDF bytes, the file stayed on your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Per-side margin control. Live preview. Text stays selectable.
            The CropBox is set by pdf-lib on every page. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/crop-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Crop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/crop-pdf-margins-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove white margins guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 10: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools. All of them run locally with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/crop-pdf" className="text-[#6366F1] hover:underline">PDF Crop</Link></strong>: set CropBox margins per side — top, right, bottom, left. Live preview. Text stays selectable. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents and image-heavy PDFs. Read the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: fix sideways pages permanently. Rotation is written into the page Rotate property — not a viewer-level display setting. Read the full guide at{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-pdf-pages" className="text-[#6366F1] hover:underline">Remove PDF Pages</Link></strong>: delete any page or range of pages from a PDF. Thumbnail grid and range input. Read the full guide at{" "}
            <Link href="/blog/delete-pages-from-pdf-online" className="text-[#6366F1] hover:underline">Delete pages from a PDF online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-organize" className="text-[#6366F1] hover:underline">PDF Organize</Link></strong>: reorder pages by dragging thumbnails, then download the rearranged PDF. No upload.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Crop, compress, rotate, remove pages, and organize PDFs without uploading them anywhere.
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
              href="/tools/pdf-organize"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Organize PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
