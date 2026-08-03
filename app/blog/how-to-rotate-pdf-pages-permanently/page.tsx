import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Rotate PDF Pages Permanently and Save [2026]",
  description:
    "Rotate a PDF and have the rotation actually stick — not flip back when you close it. The reason why Preview and Chrome rotate only temporarily, and how to save the rotation permanently into the file. Free, no upload.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-rotate-pdf-pages-permanently`,
  },
  keywords: [
    "rotate pdf and save",
    "rotate pdf permanently",
    "why does my pdf rotate back",
    "save rotated pdf",
    "rotate pdf pages permanently",
    "pdf rotation not saving",
    "pdf keeps rotating back",
    "permanently rotate pdf",
    "rotate pdf save changes",
    "fix pdf orientation permanently",
  ],
  openGraph: {
    title: "How to Rotate PDF Pages Permanently and Save [2026]",
    description:
      "Your PDF keeps rotating back every time you reopen it. Here is exactly why — and how to save the rotation permanently into the file using a free browser-based tool. No upload, no server.",
    url: `${APP_URL}/blog/how-to-rotate-pdf-pages-permanently`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Rotate PDF Pages Permanently and Save [2026]",
    description:
      "PDF rotation not saving? Here is exactly why macOS Preview and Chrome only rotate temporarily — and how to fix it permanently for free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/how-to-rotate-pdf-pages-permanently`;
const POST_TITLE = "How to Rotate PDF Pages Permanently and Save [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "If your rotated PDF keeps flipping back to the wrong orientation when you close and reopen it, the cause is almost always viewer-level rotation — a display preference stored by the application, not a change to the PDF file itself. This guide explains the difference between viewer rotation and file-level rotation, why macOS Preview, Chrome, and Adobe Reader often rotate only temporarily, and how to permanently save the rotation into the PDF using pdf-lib via the SammaPix PDF Rotate tool. No upload required.",
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
    "rotate pdf and save",
    "rotate pdf permanently",
    "why does my pdf rotate back",
    "save rotated pdf",
    "pdf rotation not saving",
    "permanently rotate pdf",
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
  name: "How to Rotate PDF Pages Permanently and Save",
  description:
    "Save a PDF rotation permanently into the file so the correct orientation is respected by every viewer, using SammaPix PDF Rotate — a browser-based tool powered by pdf-lib. No upload required.",
  totalTime: "PT2M",
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
      name: "Open SammaPix PDF Rotate",
      text: "Go to sammapix.com/tools/pdf-rotate in any modern browser. No account required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone. pdf.js renders a thumbnail for every page. You can see the current (wrong) orientation before making changes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select the pages that need fixing",
      text: "Click the thumbnails of the sideways pages, or click Select All to fix the entire document at once.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click the rotation button",
      text: "Click Rotate 90°, Rotate 180°, or Rotate 270°. The thumbnails update instantly so you can confirm the correct orientation before saving.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the permanently rotated PDF",
      text: "Click Download. pdf-lib writes the Rotate key into each affected page in the PDF file. The output PDF opens in the correct orientation in every viewer — Adobe Reader, macOS Preview, Chrome, Firefox, Foxit — without any manual adjustment. The rotation is permanent.",
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
      name: "Why does my PDF keep rotating back to the wrong orientation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common cause is viewer-level rotation. When you use Cmd+L in macOS Preview, the View menu in Adobe Reader, or the rotation button in Chrome's PDF viewer, the application rotates the display — not the PDF file itself. The viewer stores your rotation preference, but only for that session or for that specific viewer. When you close and reopen the file, or when a colleague opens it in a different application, the viewer reads the original PDF without your rotation preference and shows the wrong orientation again. The fix is to write the rotation into the PDF file itself using the Rotate property in the page structure. Once that value is set, every compliant viewer reads and respects it permanently.",
      },
    },
    {
      "@type": "Question",
      name: "Does macOS Preview save PDF rotations permanently?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how you use it. If you rotate a page in Preview using the menu (Tools → Rotate Left or Rotate Right) and then explicitly save the file (Cmd+S or File → Save), Preview does write the rotation into the PDF. However, if you close the window without saving, or if you use the keyboard shortcut Cmd+L which is a view rotation only, the rotation is not saved. The confusion comes from the fact that macOS Preview remembers your display rotation for a file in its own cache — so it looks like the rotation is saved when you reopen the file in Preview on the same Mac. But on another machine, or in any other viewer, the original orientation reappears. If you used File → Save (not Save As), the rotation should be permanent in the PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Does Chrome save PDF rotations when I rotate a page in the browser viewer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Chrome's built-in PDF viewer (based on PDFium) lets you rotate pages visually, but it is a display-only rotation. There is no 'Save' function for the rotation in Chrome's PDF viewer. If you download the PDF again from Chrome, it will still have the original orientation. Chrome's PDF viewer is designed for reading, not editing. To permanently rotate a PDF in Chrome, you need a separate tool — such as SammaPix PDF Rotate — that actually modifies the file.",
      },
    },
    {
      "@type": "Question",
      name: "How does SammaPix save the rotation permanently into the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix PDF Rotate uses pdf-lib, an open-source JavaScript library for reading and writing PDF files, to set the Rotate property on each selected page. The Rotate property is defined in ISO 32000 (the official PDF specification) as a value of 0, 90, 180, or 270 degrees stored in the page dictionary. Every compliant PDF viewer — Adobe Reader, macOS Preview, Chrome, Firefox, Edge, Foxit, and PDF.js — reads this value and renders the page at the specified angle automatically. The rotation is not a display preference; it is a structural property of the PDF file itself. Once set by pdf-lib and the file is saved, the orientation is permanent and consistent across all viewers and all devices.",
      },
    },
    {
      "@type": "Question",
      name: "Will the permanently rotated PDF look the same in Adobe Reader and macOS Preview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Because the rotation is written into the PDF file itself using the standard Rotate property, every compliant viewer reads and applies it. Adobe Reader, macOS Preview, Chrome's PDF viewer, Firefox's PDF viewer, Edge, Foxit, PDF.js, and any other viewer that follows the PDF specification will display the pages in the correct orientation without the user needing to do anything. This is the key difference from a viewer-level rotation, which is only visible in the specific application that stored it.",
      },
    },
    {
      "@type": "Question",
      name: "Does rotating the PDF permanently change its file size or quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The pdf-lib approach changes only the Rotate integer value in the page dictionary. It does not re-render the page, re-encode any images, or alter the content stream in any way. The file size of the rotated PDF is essentially identical to the original. Text remains selectable, images stay at their original resolution, and vector graphics remain crisp. This is fundamentally different from rasterization-based rotation, where each page is converted to an image and re-encoded as JPEG, which can alter quality and file size significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I undo the rotation after downloading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, by rotating again. If you rotate a page 90 degrees clockwise and download it, you can open that file in SammaPix PDF Rotate again and rotate it 270 degrees (which is 90 degrees counter-clockwise) to return it to the original orientation. The Rotate property can be changed any number of times. However, the downloaded file is already modified — there is no automatic undo history. Always keep the original file if you might need it again.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 'rotate 90°' and 'rotate 270°'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rotate 90° turns the page 90 degrees clockwise. A page that was portrait and sideways to the right becomes correctly upright. Rotate 270° turns the page 90 degrees counter-clockwise (which is the same as 270 degrees clockwise). A page that was portrait and sideways to the left becomes correctly upright. If you are unsure which direction the page needs to go, use the thumbnail preview in SammaPix PDF Rotate to confirm the result before downloading. Rotate 180° flips the page upside down — useful for pages that are exactly inverted.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToRotatePdfPagesPermanentlyPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-rotate-pdf-pages-permanently"
        description="You rotated your PDF in Preview or Chrome. You closed it. You reopened it — and the pages are sideways again. This article explains exactly why that happens, the difference between a viewer rotation and a file rotation, and how to permanently save the correct orientation into the PDF so it sticks in every viewer, on every device."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "the-core-problem", title: "Why your PDF rotation does not stick" },
          { id: "viewer-vs-file-rotation", title: "The two types of PDF rotation: viewer vs file" },
          { id: "macos-preview-behavior", title: "macOS Preview: when it saves and when it does not" },
          { id: "chrome-behavior", title: "Chrome PDF viewer: display-only, always" },
          { id: "adobe-reader-behavior", title: "Adobe Reader: the one tool that saves correctly (with conditions)" },
          { id: "how-pdf-rotate-key-works", title: "How the PDF Rotate property works under the hood" },
          { id: "how-to-fix-permanently", title: "How to permanently save a PDF rotation, step by step" },
          { id: "why-quality-unchanged", title: "Why the quality and text are unchanged after rotation" },
          { id: "common-scenarios", title: "Common rotation scenarios and the right fix for each" },
          { id: "related-pdf-tools", title: "Other browser-based PDF tools from SammaPix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "If your rotated PDF flips back to the wrong orientation, the cause is always a viewer-level rotation — a display preference that does not change the file.",
          "macOS Preview saves rotation only if you explicitly File → Save after rotating. The keyboard shortcut Cmd+L is view-only.",
          "Chrome's built-in PDF viewer never saves rotations. It is a read-only display tool.",
          "The correct fix is to write the Rotate property into the PDF file itself, so every viewer on every device reads the correct orientation.",
          "SammaPix PDF Rotate uses pdf-lib to write the Rotate key permanently into the PDF page structure. No rasterization, no quality loss, text stays selectable.",
          "No upload required — the entire process runs in your browser.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person frustrated at a laptop screen, representing the common experience of rotating a PDF only to have it flip back to the wrong orientation when reopened."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              If your PDF keeps flipping back to the wrong orientation, you are using viewer rotation instead of file rotation. Here is the permanent fix.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Fix your PDF orientation permanently, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Rotate writes the rotation into the PDF file itself using pdf-lib. The result opens correctly
              in every viewer — Adobe Reader, macOS Preview, Chrome, Firefox — on every device. Text stays selectable.
              No rasterization. Free, no signup.
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

        {/* ── Section 1: The core problem ────────────────────────────────── */}

        <h2 id="the-core-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your PDF rotation does not stick
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You received a scanned document where three pages are sideways. You opened it in Preview, pressed Cmd+L a couple of times, and the pages look correct. You close the file, send it to a colleague, and they tell you the pages are still sideways in their viewer. Or you reopen the file yourself the next day and it is wrong again.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is one of the most confusing PDF experiences people have, because the rotation looks like it worked. The issue is not that the rotation failed — it is that you applied the wrong kind of rotation. There are two fundamentally different ways to rotate a PDF page, and only one of them saves the change into the file.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding this distinction will save you significant frustration, and the fix — once you know it — takes under a minute and requires no software installation.
        </p>

        {/* ── Section 2: Viewer vs file rotation ────────────────────────── */}

        <h2 id="viewer-vs-file-rotation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The two types of PDF rotation: viewer vs file
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Type 1: Viewer rotation (display preference only)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When a PDF viewer provides a rotation button or keyboard shortcut, it often applies that rotation as a display preference — changing how the viewer renders the page on your screen without modifying the underlying PDF file. The viewer stores this preference in its own cache or settings, not in the PDF. When a different application opens the same PDF file, it reads the original file without that preference and shows the page at its original (wrong) orientation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Type 2: File rotation (Rotate property in the PDF page structure)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification (ISO 32000) defines a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> property in the page dictionary. This is an integer (0, 90, 180, or 270) that instructs every viewer how many degrees to rotate the page before displaying it. When a tool writes this value into the PDF file and saves the result, the rotation is permanent and universal. Every viewer on every platform reads the file, finds the Rotate value, and renders the page correctly — automatically, without any user action.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Viewer rotation</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">File rotation (Rotate key)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Where stored</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">In the viewer's own cache or preferences</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Inside the PDF file (page dictionary)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Visible in same viewer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, as long as the cache exists</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Visible in other viewers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — other apps read the original file</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — every viewer reads the Rotate property</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Visible to email recipients</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — they see the original orientation</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — the rotation is in the file they receive</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Persists after reinstalling the viewer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually not</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — it is in the file, not the app</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: macOS Preview behavior ─────────────────────────── */}

        <h2 id="macos-preview-behavior" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          macOS Preview: when it saves and when it does not
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS Preview is the most common source of PDF rotation confusion because it behaves differently depending on exactly what you do. Here is a precise breakdown:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What saves the rotation permanently
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Tools → Rotate Left or Rotate Right</strong> (from the menu), followed by <strong className="text-gray-800 dark:text-[#E5E5E5]">File → Save</strong> (Cmd+S) — This writes the rotation into the PDF and saves the file. When you send this file to someone, they will see the correct orientation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File → Export as PDF</strong> after rotating — Exports a new PDF file with the rotation embedded.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What does NOT save the rotation permanently
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Pressing Cmd+L</strong> — This is the &quot;Rotate Left (counterclockwise)&quot; view keyboard shortcut. It changes the display without touching the file. It does not prompt you to save. The rotation exists only in Preview&apos;s memory for that session.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rotating via the toolbar button without saving</strong> — If you use the rotate button and close the window without choosing Save, Preview may auto-save the view state in its own database, which makes the file look correct when you reopen it in Preview on the same Mac. But the PDF file itself is unchanged, and it will appear wrong on other devices.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The source of confusion: Preview caches its view state per file, so the rotation appears to &quot;stick&quot; on your Mac even when the file was not modified. Open the same file on a Windows PC or an iPhone and the original (wrong) orientation reappears. If you check File → Revert To → Browse All Versions in Preview, you can confirm whether the file was actually changed.
        </p>

        {/* ── Section 4: Chrome behavior ─────────────────────────────────── */}

        <h2 id="chrome-behavior" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Chrome PDF viewer: display-only, always
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Chrome&apos;s built-in PDF viewer (based on Google&apos;s PDFium engine) provides a rotation button in the toolbar. This is purely a display rotation — there is no mechanism to save it back to the PDF file. If you rotate a page in Chrome and then download the PDF, the downloaded file has the original orientation. There is no Save function for rotation in Chrome&apos;s PDF viewer.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is by design: Chrome&apos;s PDF viewer is intended for reading and printing, not editing. The rotation exists only within your current browser tab and disappears when you navigate away or refresh the page.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Save the rotation permanently into your PDF</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix PDF Rotate uses pdf-lib to write the Rotate key into the PDF file. The result opens correctly
            in every viewer on every device. No upload, no rasterization, text stays selectable. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-rotate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Rotate, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Adobe Reader behavior ──────────────────────────── */}

        <h2 id="adobe-reader-behavior" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Adobe Reader: the one tool that saves correctly (with conditions)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Acrobat (the full paid version, not Adobe Reader) does support permanent page rotation via the Organize Pages panel. You can rotate one or more pages, save the file, and the rotation is written permanently into the PDF. Recipients will see the correct orientation in any viewer.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Reader (the free version) does not support editing. The View menu rotation in Adobe Reader is a display preference only, not saved to the file. If your PDF is password-protected for editing (an owner password that allows reading but not changes), even Adobe Acrobat will not be able to write the rotation without the owner password.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Acrobat costs $179.88 per year as a subscription. For occasional PDF rotation, a free browser-based tool is a significantly more practical option.
        </p>

        {/* ── Section 6: How the PDF Rotate key works ───────────────────── */}

        <h2 id="how-pdf-rotate-key-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How the PDF Rotate property works under the hood
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF format is a structured file format defined by ISO 32000. Each page in a PDF is represented as a page object — a dictionary of properties that describe the page content, dimensions, and rendering settings. One of those properties is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The specification says: &quot;The number of degrees by which the page shall be rotated clockwise when displayed or printed. The value shall be a multiple of 90. Default value: 0.&quot;
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          So a page with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/Rotate 90</code> in its dictionary will be rotated 90 degrees clockwise by every compliant viewer before display. A page with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/Rotate 0</code> (or no Rotate entry at all, since 0 is the default) displays at its native orientation.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you use SammaPix PDF Rotate:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            pdf-lib reads the current <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Rotate</code> value for each selected page (defaulting to 0 if absent)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            It adds your chosen rotation (90, 180, or 270) to the existing value, modulo 360
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            It writes the new value into the page&apos;s dictionary
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            It serializes the modified PDF to bytes and makes them available for download
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The page content stream — which contains all the text characters, font references, image data, and vector paths — is not touched. Only the Rotate property in the page dictionary changes.
        </p>

        {/* ── Section 7: How to fix permanently ─────────────────────────── */}

        <h2 id="how-to-fix-permanently" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to permanently save a PDF rotation, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the complete process using SammaPix PDF Rotate:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-rotate</strong> in any modern browser. No download, no account, no payment required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF.</strong> pdf.js renders a thumbnail for every page. You can see exactly which pages are in the wrong orientation before making any changes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the sideways pages.</strong> Click their thumbnails. Use Select All if the whole document needs rotating.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the correct rotation button.</strong> Rotate 90° (clockwise), Rotate 180° (upside down), or Rotate 270° (counter-clockwise). The thumbnails update immediately so you can confirm the result.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> pdf-lib writes the Rotate property into each affected page and produces the output PDF. Download it and replace the original file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify in a second viewer.</strong> Open the downloaded file in Chrome or Firefox (different from the viewer you usually use). The pages should show in the correct orientation without any manual rotation. This confirms the Rotate property is correctly written into the file.
          </li>
        </ol>

        {/* ── Section 8: Why quality is unchanged ───────────────────────── */}

        <h2 id="why-quality-unchanged" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why the quality and text are unchanged after rotation
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some people expect that rotating a PDF permanently would require re-encoding the pages — similar to how rotating a JPEG image re-encodes the pixel grid and can introduce quality loss. For PDF rotation via the Rotate property, this concern does not apply.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF Rotate property is an instruction to the viewer: &quot;display this page rotated by this many degrees.&quot; The page content itself is stored at its original orientation and resolution. Nothing is re-rendered or re-encoded. When the viewer reads the file, it renders the content at original quality and then applies the rotation as a display transformation — using GPU-accelerated rendering that introduces zero quality loss.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical result: after downloading the rotated PDF from SammaPix PDF Rotate:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">All text is still fully selectable and searchable</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">All images are at their original resolution</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Hyperlinks remain active</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">The file size is essentially identical to the original</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">Accessibility features (screen reader support) are fully preserved</li>
        </ul>

        {/* ── Section 9: Common scenarios ────────────────────────────────── */}

        <h2 id="common-scenarios" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common rotation scenarios and the right fix for each
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scenario 1: Scanned document where a few pages are sideways
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most common case. The scanner fed the pages at a 90-degree angle for a few sheets. Use SammaPix PDF Rotate, click the sideways page thumbnails individually, apply Rotate 90° or 270° to bring them upright, and download. The other pages are untouched.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scenario 2: An entire document scanned upside down
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Click Select All, then Rotate 180°. Every page is flipped. The thumbnails update to confirm. Download the corrected file.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scenario 3: Mixed portrait and landscape pages in the wrong orientation
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A document where some pages should be portrait and others landscape (for example, a report with embedded wide tables). Use the thumbnail grid to identify which pages need rotating, select only those, and apply the appropriate rotation. The per-page Rotate property means each page can have a different rotation value, giving you precise control.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Scenario 4: A PDF where Preview shows the correct orientation but others do not
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is exactly the viewer-cache situation described above. The PDF was not actually saved with the rotation — Preview stored it in its own state. The fix is to run the file through SammaPix PDF Rotate, which reads the actual PDF orientation (not Preview&apos;s cached state), applies the correct rotation, and saves it into the file. After this, the correct orientation is seen everywhere.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Fix any PDF orientation scenario permanently</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Per-page thumbnail preview, 90/180/270 degree rotation, Select All for the whole document.
            Text stays selectable. No upload. Works in every browser. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Rotate, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/rotate-pdf-online-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Learn how browser rotation works <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 10: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other browser-based PDF tools from SammaPix
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you work with PDFs regularly, these tools handle the most common tasks without uploading your files anywhere:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: permanently fix page orientation using pdf-lib. Per-page or bulk, 90/180/270 degrees. Text stays selectable. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages or split the document into individual pages. Useful for removing the sideways pages before rotating and reinserting them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. After rotating and downloading individual sections, merge them back into a single document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by re-encoding page images as JPEG. Best for scanned, image-heavy PDFs. Full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All PDF tasks, all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Rotate, compress, split, and merge PDFs without uploading them anywhere. Every tool uses pdf.js and pdf-lib
            running locally on your device. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
