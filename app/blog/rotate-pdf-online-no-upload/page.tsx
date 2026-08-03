import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Rotate a PDF Online Without Uploading It [2026]",
  description:
    "Rotate a PDF page by page or all at once — 90, 180, or 270 degrees. Runs entirely in your browser via pdf.js + pdf-lib. The rotation is permanent and saved into the file. No upload, no signup, free.",
  alternates: {
    canonical: `${APP_URL}/blog/rotate-pdf-online-no-upload`,
  },
  keywords: [
    "rotate pdf online",
    "rotate pdf no upload",
    "rotate pdf free",
    "rotate pdf without uploading",
    "rotate pdf browser",
    "rotate pdf pages",
    "rotate pdf online free",
    "rotate pdf locally",
    "pdf rotate no signup",
    "rotate pdf permanently",
  ],
  openGraph: {
    title: "Rotate a PDF Online Without Uploading It [2026]",
    description:
      "Rotate individual PDF pages or the whole document 90, 180, or 270 degrees. Browser-based, no upload, no server. Text stays selectable. The rotation is saved permanently into the file. Free.",
    url: `${APP_URL}/blog/rotate-pdf-online-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate a PDF Online Without Uploading It [2026]",
    description:
      "PDF rotation that runs 100% in your browser. No upload, no server. Per-page or bulk rotation. Text stays selectable. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/rotate-pdf-online-no-upload`;
const POST_TITLE = "Rotate a PDF Online Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF rotation tools upload your file to a remote server. SammaPix PDF Rotate works entirely in your browser using pdf.js (for thumbnail previews) and pdf-lib (to write the rotation into the PDF file itself). This guide explains how browser-based PDF rotation works, why the rotation is permanent and saved — not just a visual flip in the viewer — how to rotate individual pages or the whole document, and how to verify no upload ever happens.",
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
    "rotate pdf online",
    "rotate pdf no upload",
    "rotate pdf free",
    "rotate pdf without uploading",
    "rotate pdf browser",
    "rotate pdf permanently",
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
  name: "How to Rotate a PDF Online Without Uploading It",
  description:
    "Rotate PDF pages permanently in your browser with no file upload, using SammaPix PDF Rotate powered by pdf.js and pdf-lib. Per-page thumbnails, 90/180/270-degree rotation, bulk rotate all.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Rotate (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Rotate tool",
      text: "Go to sammapix.com/tools/pdf-rotate in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. pdf.js renders a thumbnail for every page so you can see which ones need rotating. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select the pages to rotate",
      text: "Click the thumbnail of any page to select it. Use 'Select All' to rotate the entire document at once. You can also shift-click to select a range.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose the rotation angle",
      text: "Click Rotate 90°, Rotate 180°, or Rotate 270° (which is the same as 90° counter-clockwise). The thumbnails update instantly so you can confirm the result before saving.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the rotated PDF",
      text: "Click Download. pdf-lib writes the rotation into the PDF file using the page Rotate key — this is permanent and saved into the file itself, not just a visual display setting. The file is served directly from browser memory. No network call occurs.",
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
      name: "Does rotating a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, Adobe Acrobat Online, and similar services upload your PDF to their servers for processing. With SammaPix PDF Rotate, no. The rotation runs entirely in your browser using pdf.js (to render page thumbnails) and pdf-lib (to write the rotation into the PDF). Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Is the rotation permanent, or does the PDF flip back when I close it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The rotation is permanent. SammaPix PDF Rotate uses pdf-lib to set the Rotate key on each page inside the PDF file itself. This is a standard PDF property that every compliant viewer — Adobe Reader, Preview, Chrome, Firefox, Foxit — reads and respects. When you download and reopen the rotated PDF, the pages will be in the correct orientation in every viewer. This is different from a viewer-level rotation (such as pressing Cmd+L in macOS Preview), which is a display setting that does not change the file and resets when you close the document.",
      },
    },
    {
      "@type": "Question",
      name: "Does rotating a PDF affect text selectability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is one of the key advantages of the pdf-lib rotation approach over rasterization-based tools. pdf-lib rotates the page by setting the Rotate property in the PDF structure — it does not re-render the page as an image or convert anything. All existing content stays as-is: text remains selectable, links remain clickable, vector graphics remain crisp at any zoom level. The file quality is identical to the original. Only the viewing angle changes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate individual pages, or does it rotate the whole PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. SammaPix PDF Rotate shows a thumbnail grid of every page. You can click individual page thumbnails to select only the pages you want to rotate, then apply 90, 180, or 270 degrees to just those pages. You can also click Select All to rotate every page in the document at once. Mixed-orientation PDFs (for example, a landscape table embedded between portrait pages) are handled correctly because the rotation is applied per-page.",
      },
    },
    {
      "@type": "Question",
      name: "What rotation angles are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports 90 degrees (clockwise), 180 degrees (upside down), and 270 degrees (which is the same as 90 degrees counter-clockwise). The PDF specification stores rotation as a multiple of 90 degrees, so these are the standard increments. Rotations are cumulative: if a page already has a 90-degree rotation in the file, rotating it 90 degrees more results in a 180-degree total rotation.",
      },
    },
    {
      "@type": "Question",
      name: "Does the file size change after rotating a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, or negligibly. Rotating via pdf-lib only changes a single integer value (the Rotate key) in the PDF page dictionary. It does not re-encode any images, re-embed any fonts, or re-render any content. The output file size is essentially identical to the input. This is another advantage over rasterization-based rotation, where each page gets re-encoded as a JPEG image, which can significantly alter the file size.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your PDF into the SammaPix PDF Rotate tool. Watch the network panel as the thumbnails render and as you click Download. You will see requests for static page assets (JavaScript, CSS) when the tool loads. During rotation and download, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is downloaded via a blob URL — no network call is made.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate a password-protected or encrypted PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib cannot modify a password-protected or encrypted PDF without the owner password, because the file content is encrypted and the library cannot write changes to the page structure. If your PDF is protected, you need to unlock it first (using the password in Adobe Reader or another tool that supports owner-password decryption). Encrypted PDFs where only reading is allowed, not editing, will also be rejected by pdf-lib. The tool will show an error in this case rather than silently producing a broken file.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RotatePdfOnlineNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="rotate-pdf-online-no-upload"
        description="Most PDF rotation tools upload your document to a server you do not control. SammaPix PDF Rotate runs entirely in your browser — no upload, no server, no signup. Here is how it works, what makes the rotation permanent, and how to verify that nothing ever leaves your device."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most PDF rotation tools upload your file" },
          { id: "how-browser-rotation-works", title: "How browser-based PDF rotation actually works" },
          { id: "permanent-vs-temporary", title: "Permanent rotation vs temporary viewer rotation: the key difference" },
          { id: "text-quality-preserved", title: "Text stays selectable — no rasterization" },
          { id: "step-by-step", title: "How to rotate a PDF without uploading it, step by step" },
          { id: "per-page-rotation", title: "Rotating individual pages vs the whole document" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF rotation: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF rotation tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, invoices, and sensitive documents, that is a real privacy risk.",
          "SammaPix PDF Rotate runs entirely in your browser using pdf.js (thumbnails) and pdf-lib (rotation). Your file never leaves your device.",
          "The rotation is written into the PDF file itself using the page Rotate property — it is permanent and respected by every PDF viewer. Not a display flip that resets when you close the document.",
          "Text remains selectable and quality remains identical. pdf-lib does not rasterize anything — it only changes the Rotate key in the page structure.",
          "Per-page thumbnails let you select individual pages or rotate the whole document at once with 90, 180, or 270 degrees.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person reviewing a printed document and a laptop screen, representing the problem of a PDF displayed in the wrong orientation that needs to be rotated and saved."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Rotating a PDF should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rotate your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Rotate runs entirely in your browser via pdf.js and pdf-lib. Per-page thumbnails, 90/180/270
              degrees, bulk rotate all pages at once. The rotation is permanent and saved into the file. Text stays
              selectable. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-rotate"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Rotate, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most PDF rotation tools upload your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You receive a scanned contract and three pages are sideways. You search for "rotate PDF online" and land on iLovePDF, Smallpdf, or Adobe Acrobat Online. You drag the file in. A progress bar fills. The file uploads to their server, gets processed remotely, and you download the result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The rotation worked. But your contract spent time on a server you have no visibility into. Their privacy policy says files are deleted within an hour. You cannot verify that, and you cannot know whether the file transited other systems during processing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For bank statements, tax returns, medical documents, signed contracts, and anything containing personal or financial data, this is a real risk — not a hypothetical one. I built{" "}
          <Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">SammaPix PDF Rotate</Link>{" "}
          to solve this by keeping the entire rotation process inside your browser. No server is involved at any point.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What "no upload" actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Rotate, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The file stays in browser memory throughout. Processing uses{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf.js</a>{" "}
          (Mozilla&apos;s open-source PDF renderer, used to generate the page thumbnails) and{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          (an open-source JavaScript library for reading and writing PDF files). The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file.
        </p>

        {/* ── Section 2: How browser rotation works ──────────────────────── */}

        <h2 id="how-browser-rotation-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF rotation actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains why this approach is fundamentally better than rasterization-based rotation. Here is what happens under the hood when you rotate a PDF in the browser:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf.js renders a thumbnail for each page.</strong> When you drop the PDF, pdf.js reads and renders every page into a small canvas element. These thumbnails let you identify which pages are sideways and which are correctly oriented before you commit to any rotation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You select pages and choose a rotation angle.</strong> Click the thumbnails of the pages you want to rotate (or Select All), then click Rotate 90°, Rotate 180°, or Rotate 270°. The thumbnails update to show the new orientation instantly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib sets the Rotate key on each selected page.</strong> This is the critical step. pdf-lib modifies the page dictionary inside the PDF structure — specifically, it sets or updates the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> entry to the chosen angle (90, 180, or 270). This is a standard property defined in the PDF specification (ISO 32000). No content is re-rendered, re-encoded, or touched.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The modified PDF is offered for download.</strong> The updated PDF bytes are stored as a Blob in browser memory and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key insight is that the PDF format has a built-in, standardized way to specify page rotation. pdf-lib simply writes that value into the file. No pixels are touched. This is why text stays selectable, quality stays identical, and the file size barely changes — which we will explore in the next sections.
        </p>

        {/* ── Section 3: Permanent vs temporary rotation ─────────────────── */}

        <h2 id="permanent-vs-temporary" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Permanent rotation vs temporary viewer rotation: the key difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are two completely different ways to rotate a PDF, and the difference between them is the source of a lot of user frustration:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Temporary viewer rotation (not saved into the file)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you press Cmd+L (or Ctrl+Shift+R) in macOS Preview, or use the View menu in Adobe Reader to rotate a page, you are rotating the display — not the file. The viewer remembers your preference for this session, but the underlying PDF file is unchanged. When you close and reopen the PDF in a different viewer, or when a colleague opens the same file, the pages are back to their original (wrong) orientation. This is a display preference stored by the viewer application, not a property written into the PDF.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Permanent file rotation (saved into the PDF structure)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Rotate writes the rotation into the PDF file itself using the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> entry in the page dictionary. This is defined in ISO 32000 (the PDF specification) and every compliant viewer — Adobe Reader, macOS Preview, Chrome, Firefox, Edge, Foxit, PDF.js — reads and respects it. When the recipient opens the rotated PDF in any viewer, on any device, the pages display in the correct orientation automatically, without any manual adjustment.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rotation type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Saved in file?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Works for all recipients?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Viewer rotation (display only)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — resets in other viewers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cmd+L in Preview, View menu in Adobe Reader</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File rotation (PDF Rotate key)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — written into the PDF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — every viewer respects it</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SammaPix PDF Rotate, Adobe Acrobat Save with rotation</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Text quality preserved ─────────────────────────── */}

        <h2 id="text-quality-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text stays selectable — no rasterization
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some PDF rotation tools — particularly free online services that rely on server-side image processing — rotate PDFs by rasterizing each page (converting it to a pixel image), rotating the image, and reassembling a new PDF from the rotated images. This approach has two significant downsides:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text becomes an image.</strong> After rasterization, text in the PDF is no longer selectable, searchable, or copyable. Recipients cannot select a contract clause or search for a term. Screen readers cannot read the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Quality degrades.</strong> The page is re-encoded as JPEG, which introduces compression artifacts — especially visible on sharp text edges. The output file may also be significantly larger or smaller than the original, depending on the encoding settings.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Rotate does neither of these things. pdf-lib modifies only the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> property in the page dictionary. The page content stream — which contains the text, vector graphics, and embedded images in their original form — is completely untouched. After rotation:
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
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Rotate your PDF permanently, in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no rasterization, no quality loss. Text stays selectable. The rotation is written into the PDF
            file and respected by every viewer. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-rotate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Rotate, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate a PDF without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-rotate</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. pdf.js renders a thumbnail for each page. You will see the current orientation of every page at a glance before making any changes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the pages you want to rotate.</strong> Click a thumbnail to select that page. Click again to deselect. Use the Select All button to select every page at once.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Rotate 90°, Rotate 180°, or Rotate 270°.</strong> The thumbnails update instantly to show the new orientation. If the result is not what you expected, click the rotation button again to continue rotating, or select different pages.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the thumbnail grid.</strong> Confirm every page is in the orientation you want before downloading. Rotations are cumulative: applying 90° twice gives 180°.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> pdf-lib writes the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> property into each selected page and produces the output PDF. It is served as a Blob from browser memory. No network request occurs.
          </li>
        </ol>

        {/* ── Section 6: Per-page rotation ──────────────────────────────── */}

        <h2 id="per-page-rotation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Rotating individual pages vs the whole document
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common use case is a mixed-orientation PDF: most pages are portrait but a few scanned pages are landscape and appear sideways. The tool handles this precisely:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Rotating specific pages
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Click the thumbnail of each page that needs rotating. Selected pages are highlighted. Then click the rotation button. Only the selected pages are rotated — all other pages remain at their current orientation. This is done per-page by pdf-lib, which sets the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> property independently on each page object.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Rotating all pages at once
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Click Select All, then choose the rotation angle. All pages in the document are rotated by that amount. This is useful for a document that was scanned entirely in the wrong orientation — for example, a landscape contract that should be portrait, or an upside-down scan bundle.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cumulative rotation and the 0/90/180/270 system
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification stores rotation as a multiple of 90 degrees: 0, 90, 180, or 270. If a page already has a rotation of 90° written in the file (perhaps from a previous tool), and you rotate it 90° more, the new value is 180°. The tool reads the existing rotation before applying your change, so the result is always correct regardless of any pre-existing rotation in the file.
        </p>

        {/* ── Section 7: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF rotation: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison of the two approaches across the dimensions that matter:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Text selectability after rotation</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on the tool. Some rasterize pages (text becomes image). Good tools preserve text.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always preserved. pdf-lib only changes the Rotate key — no rasterization, ever.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Rotation is permanent (saved in file)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, on good tools. Some tools only produce a display rotation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. pdf-lib writes the Rotate key into the PDF page structure. Every viewer respects it.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size change after rotation</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">May increase or decrease if the tool rasterizes pages during rotation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Essentially zero change. Only an integer value in the page dictionary is updated.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Per-page selection</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Most tools support per-page rotation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Thumbnail grid for visual selection. Per-page or Select All.</td>
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

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

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
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF and rotate a page.</strong> Watch the Network panel as pdf.js renders thumbnails and as you click Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carrying your file.</strong> The only network activity is the initial page load (JavaScript and CSS assets). During thumbnail rendering, rotation, and download, the Network panel shows zero outgoing requests. The PDF is processed and served entirely from browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the standard method used by privacy researchers to audit browser-based tools. It is conclusive: if no network request carries your PDF bytes, the file stayed on your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Rotate individual pages or the full document. Text stays selectable.
            The rotation is permanent and saved into the file. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Rotate, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/how-to-rotate-pdf-pages-permanently"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Why does my PDF flip back? <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full set of browser-based PDF tools. All of them run locally with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: rotate individual pages or the whole document 90, 180, or 270 degrees. Text stays selectable. Rotation is saved permanently into the file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents and image-heavy PDFs. See the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages, split into individual PDFs, or divide by page ranges. Useful for sending only the relevant pages of a larger document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Useful when you need to assemble rotated extracts back into a single document.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Rotate, compress, split, and merge PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf.js and pdf-lib. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
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
