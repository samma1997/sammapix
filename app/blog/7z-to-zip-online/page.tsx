import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Convert 7Z to ZIP Online Free (No Upload) [2026]",
  description:
    "Convert any 7Z archive to ZIP entirely in your browser — no upload, no 7-Zip install, no server. libarchive.wasm extracts locally, JSZip repackages. Verifiable via DevTools. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/7z-to-zip-online`,
  },
  keywords: [
    "7z to zip",
    "convert 7z to zip",
    "7z to zip online",
    "7z to zip free",
    "7z to zip converter",
    "convert 7z file to zip",
    "7z to zip no upload",
    "7z to zip browser",
    "change 7z to zip",
    "7z to zip online free",
  ],
  openGraph: {
    title: "Convert 7Z to ZIP Online Free (No Upload) [2026]",
    description:
      "Convert 7Z to ZIP entirely in your browser. No file upload, no 7-Zip install, no server. libarchive.wasm + JSZip run locally. Verify with DevTools. Free.",
    url: `${APP_URL}/blog/7z-to-zip-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert 7Z to ZIP Online Free (No Upload) [2026]",
    description:
      "7Z to ZIP conversion that runs 100% in your browser. No upload, no 7-Zip needed. Verifiable in DevTools. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/7z-to-zip-online`;
const POST_TITLE = "Convert 7Z to ZIP Online Free (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "7-Zip (7Z) archives require 7-Zip or a compatible app to open on Windows, macOS, Linux, iOS, and Android. ZIP is natively supported on every operating system — no software needed. This guide explains how to convert a 7Z file to a ZIP archive entirely in your browser using libarchive.wasm and JSZip, with no file upload to any server, no registration, and no 7-Zip required.",
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
    "7z to zip",
    "convert 7z to zip",
    "7z to zip online",
    "7z to zip free",
    "7z to zip converter",
    "7z to zip no upload",
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
  name: "How to Convert 7Z to ZIP Online Without Uploading",
  description:
    "Convert a 7Z archive to a universally compatible ZIP file in your browser — no upload, no server, no software install. Uses libarchive.wasm to extract and JSZip to repackage.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix 7Z to ZIP (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the 7Z to ZIP tool",
      text: "Go to sammapix.com/tools/7z-to-zip in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your 7Z file onto the tool",
      text: "Drag your .7z file onto the dropzone or click to browse for it. The file is read locally by your browser via the File API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Wait for extraction and repackaging",
      text: "libarchive.wasm extracts the 7Z contents entirely in your browser. JSZip then repackages all the extracted files into a single ZIP archive, preserving the folder structure.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download the ZIP file",
      text: "Click Download ZIP. The file is served directly from browser memory as a blob URL. No network request carries your data to any server.",
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
      name: "Can I convert 7Z to ZIP without installing 7-Zip?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix 7Z to ZIP tool runs entirely in your browser using libarchive.wasm (a WebAssembly build of the libarchive C library) and JSZip. No software installation is needed — not 7-Zip, not WinRAR, not The Unarchiver. Open the tool in Chrome, Firefox, Safari, or Edge and drop your 7Z file in. The conversion happens locally in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is my 7Z file uploaded to a server when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The file never leaves your device. libarchive.wasm reads and extracts the 7Z archive in browser memory using the File API. JSZip assembles the ZIP output in browser memory. The resulting ZIP is downloaded via a blob URL — no network request carries your file. You can verify this yourself by opening your browser's Network panel (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I convert 7Z to ZIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7-Zip (7Z) is an open-source format with excellent compression, but opening a 7Z file requires 7-Zip, The Unarchiver, Keka, or a similar app. Windows, macOS, Linux, iOS, and Android can all open ZIP files natively — no third-party software required. If you received a 7Z from a colleague and want to share it with someone who does not have 7-Zip installed, or if you need to attach it to an email or upload it to a platform that rejects 7Z, converting to ZIP makes the archive universally accessible.",
      },
    },
    {
      "@type": "Question",
      name: "Does the conversion preserve the folder structure inside the 7Z?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. libarchive.wasm extracts each entry in the 7Z archive along with its path. JSZip recreates the same folder structure inside the ZIP output. If your 7Z contains subfolders and nested files, those are preserved in the resulting ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool support password-protected 7Z archives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Password-protected 7Z archives are not supported. The extraction requires the original password to proceed, and the browser tool does not handle AES-256 encrypted 7Z files. If your 7Z archive is password-protected, use 7-Zip on Windows or The Unarchiver on macOS with the correct password.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size for 7Z to ZIP conversion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial file size cap, because no server is involved. The practical limit is your device's available RAM. libarchive and JSZip both operate in browser memory, so very large 7Z files (several hundred MB or more) may be slow or may hit browser memory limits on older or low-RAM devices. For most 7Z files up to 500 MB the tool works fine on any modern device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, clear the request list, then drop your 7Z file into the tool. Watch the Network panel during extraction and repackaging. You will see no outgoing requests carrying file data. The only requests that appear are the initial page load assets (JavaScript, CSS, WebAssembly). Your file stays entirely in browser memory.",
      },
    },
    {
      "@type": "Question",
      name: "Will the resulting ZIP be larger than the original 7Z?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, typically. 7-Zip's LZMA2 compression algorithm is significantly more efficient than ZIP's DEFLATE. A 7Z archive can be 30 to 70 percent smaller than the equivalent ZIP for compressible content like text, source code, or documents. When you convert a 7Z to ZIP, the extracted files are recompressed with DEFLATE, so the resulting ZIP may be notably larger than the original 7Z. The file contents remain identical.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SevenZToZipOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="7z-to-zip-online"
        description="7Z archives are compact and efficient — but they require 7-Zip or a third-party app to open. ZIP works natively on every OS. Here is how to convert any 7Z to ZIP in your browser in under a minute, with no file upload and no software install."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "why-7z-is-a-problem", title: "Why 7Z is a problem: great compression, poor compatibility" },
          { id: "zip-is-universal", title: "ZIP is universal: opens natively on every operating system" },
          { id: "how-browser-conversion-works", title: "How browser-based 7Z to ZIP conversion works" },
          { id: "step-by-step", title: "How to convert 7Z to ZIP online, step by step" },
          { id: "folder-structure", title: "Folder structure, filenames, and what is preserved" },
          { id: "comparison-table", title: "Browser-based vs desktop apps: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "when-to-use-alternatives", title: "When to use a different approach" },
          { id: "related-archive-tools", title: "Other archive tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "7Z is an open-source format with excellent compression, but opening it requires 7-Zip, The Unarchiver, Keka, or a similar app. ZIP opens natively on Windows, macOS, Linux, iOS, and Android — no software needed.",
          "SammaPix 7Z to ZIP converts your archive entirely in the browser using libarchive.wasm (extraction) and JSZip (repackaging). Your file never leaves your device.",
          "The conversion preserves the full folder structure and all file names from the original 7Z.",
          "Password-protected 7Z archives are not supported.",
          "The resulting ZIP may be larger than the original 7Z — LZMA2 compression is more efficient than DEFLATE. File contents remain identical.",
          "No artificial file size limit — the practical limit is your device RAM.",
          "Verify with DevTools: open the Network panel and watch zero outgoing requests while the tool processes your file.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Computer screen with files and archive folders, representing the challenge of opening 7Z archives across different operating systems without installing software."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              7Z requires 7-Zip or a third-party app to open. ZIP works everywhere — converting takes under a minute in your browser.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert your 7Z to ZIP right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix 7Z to ZIP runs entirely in your browser via libarchive.wasm and JSZip. Drop your 7Z file in
              and download a universally compatible ZIP. Preserves folder structure. Your file never leaves your device.
              Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/7z-to-zip"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open 7Z to ZIP, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/open-7z"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Extract 7Z <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/zip-creator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Create ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why 7Z is a problem ─────────────────────────────── */}

        <h2 id="why-7z-is-a-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why 7Z is a problem: great compression, poor compatibility
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You received a .7z file from a developer, a download link, or a colleague. You try to open it. On Windows, you get a "how do you want to open this file?" prompt. On macOS, Finder shows a question mark or tries to open it with the wrong app. On mobile, the file manager says it cannot handle the format.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          7-Zip (7Z) is an open-source archive format created by Igor Pavlov and released under the GNU LGPL. Its compression engine, LZMA2, is significantly better than ZIP&apos;s DEFLATE algorithm — 7Z archives are often 30 to 70 percent smaller than equivalent ZIPs on compressible content. That efficiency makes 7Z popular among software distributors, game modders, and developers who care about archive size.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The problem is compatibility. Despite 7-Zip being free and open-source, no major operating system has built 7Z support into its file manager. Windows 11 added native ZIP and RAR support, but not 7Z. macOS Archive Utility handles ZIP and some other formats, but not 7Z. On iOS and Android, the default file managers do not open .7z files. Every recipient needs a third-party app — 7-Zip on Windows, The Unarchiver or Keka on macOS, a compatible app on mobile.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built the{" "}
          <Link href="/tools/7z-to-zip" className="text-[#6366F1] hover:underline">SammaPix 7Z to ZIP tool</Link>{" "}
          to eliminate that friction. The conversion runs in your browser using WebAssembly and JavaScript. Your 7Z file is read locally, extracted locally, repackaged locally, and downloaded from browser memory. No file upload. No installation. Verifiable via DevTools.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The privacy problem with online 7Z converters
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most search results for "7z to zip online" lead to tools that upload your archive to a remote server, extract it there, repackage it, and send the ZIP back. That workflow is fine for public files. It is not fine for source code before a release, client deliverables under NDA, financial data, or any archive whose contents you would rather not put on a server you do not control.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Those tools say files are deleted after processing. You have no way to verify that. Browser-based conversion eliminates the risk entirely because the file never travels over the network.
        </p>

        {/* ── Section 2: ZIP is universal ─────────────────────────────────── */}

        <h2 id="zip-is-universal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          ZIP is universal: opens natively on every operating system
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZIP has been an open standard since 1989, created by Phil Katz and published without licensing restrictions. Because the format is open and well-documented, every major operating system has built ZIP support directly into its file manager. Here is the native ZIP vs 7Z support situation in 2026:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Platform</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">ZIP support</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">7Z support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows 10/11</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native (Explorer right-click). Extract All works out of the box.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires 7-Zip or a similar app.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">macOS</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native (Archive Utility). Double-click to extract.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires The Unarchiver, Keka, or similar.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Linux</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native in all major desktop environments (GNOME, KDE, etc.).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires p7zip package. Not installed by default on most distros.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iOS / iPadOS</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native (Files app since iOS 13). Tap a ZIP to extract.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires a third-party app from the App Store.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Android</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native in Files by Google and most OEM file managers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires ZArchiver, MiXplorer, or similar.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Web / email attachments</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many platforms accept ZIP attachments by default (Google Drive, Slack, etc.).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Some platforms block or flag 7Z as an unknown or risky file type.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The conclusion is clear: if you want to share a compressed archive and be certain the recipient can open it without installing anything, ZIP is the right format. Converting a 7Z to ZIP takes under a minute in the browser, and the recipient gets a file that works everywhere.
        </p>

        {/* ── Section 3: How browser conversion works ─────────────────────── */}

        <h2 id="how-browser-conversion-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based 7Z to ZIP conversion works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains why this can run entirely in the browser without a server. Here is what happens under the hood when you drop a 7Z file into the tool:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the 7Z file locally.</strong> The File API passes the raw bytes of the .7z file to a Web Worker. No data leaves your device at this stage or any subsequent stage.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">libarchive.wasm extracts the archive.</strong>{" "}
            <a href="https://github.com/libarchive/libarchive" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">libarchive</a>{" "}
            is a widely-used C library that handles dozens of archive formats including 7Z. Compiled to WebAssembly (WASM), it runs directly in your browser at near-native speed. It reads each entry in the 7Z archive — file name, path, raw bytes — and exposes them to JavaScript.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">JSZip assembles a new ZIP archive.</strong>{" "}
            <a href="https://stuk.github.io/jszip/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">JSZip</a>{" "}
            is an open-source JavaScript library for creating, reading, and editing ZIP files in the browser. Each extracted entry (filename + bytes) is added to a JSZip instance. JSZip writes the final .zip file as a Uint8Array in memory, preserving the folder hierarchy from the original 7Z.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The ZIP is offered for download.</strong> The Uint8Array is wrapped in a Blob, a temporary object URL is created, and the browser initiates a file download. The entire operation happens in browser memory. No network request carries your file data.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both libarchive.wasm and JSZip are open-source libraries with extensive real-world usage. libarchive is the extraction library used in macOS Archive Utility and many Linux desktop environments. JSZip has over 10 million weekly npm downloads. They run in a background thread (Web Worker) so the browser UI stays responsive during processing.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert your 7Z to ZIP in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            libarchive.wasm extracts your 7Z locally. JSZip repackages it as a universally compatible ZIP.
            No upload, no 7-Zip, no signup. Free.
          </p>
          <Link
            href="/tools/7z-to-zip"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open 7Z to ZIP, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to convert 7Z to ZIP online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full conversion takes under a minute for most 7Z files:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/7z-to-zip</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your 7Z file onto the dropzone</strong> or click to browse for it. You will see the original filename and file size displayed. The file is in browser memory only.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wait for extraction and repackaging.</strong> libarchive.wasm reads and extracts the 7Z entries. JSZip assembles the ZIP. A progress indicator shows the current state. Processing time depends on the archive size and your device CPU — for most 7Z files under 100 MB this completes in a few seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the ZIP file.</strong> Click the Download ZIP button. The file saves to your Downloads folder. The ZIP contains the same files and folder structure as the original 7Z, and opens natively on every operating system.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to inspect the contents of the 7Z before converting it, use the{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix Open 7Z tool</Link>{" "}
          first — it lets you browse file entries and download individual files without committing to a full conversion.
        </p>

        {/* ── Section 5: Folder structure ───────────────────────────────── */}

        <h2 id="folder-structure" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Folder structure, filenames, and what is preserved
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One of the most important questions when converting archive formats is whether the internal structure is preserved. Here is what the 7Z to ZIP conversion keeps and what it does not:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is preserved
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Full folder hierarchy.</strong> If the 7Z contains nested folders — for example, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">project/src/components/</code> — the ZIP output reproduces the exact same structure.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">All filenames and extensions.</strong> File names are read directly from the 7Z entry metadata and written into the ZIP entry metadata. No renaming occurs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File contents (bytes).</strong> The raw bytes of each file are extracted by libarchive and written by JSZip without modification. Checksums will match the originals.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is not preserved
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Compression efficiency.</strong> 7Z uses LZMA2, which typically achieves 30 to 70 percent smaller archives than ZIP&apos;s DEFLATE for compressible content like source code or text. The resulting ZIP file will be notably larger than the original 7Z — this is expected. The file contents are identical.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">7Z-specific metadata.</strong> 7Z supports extended file attributes and high-precision timestamps that ZIP does not have equivalent fields for. Basic last-modified timestamps are preserved, but extended attributes are not.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Encryption (password protection).</strong> Password-protected 7Z archives cannot be extracted without the original password. The tool does not support AES-256 encrypted 7Z files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Solid archives with complex block structures.</strong> Some 7Z archives use solid compression mode where all files share a single LZMA2 data block. libarchive handles these, but very large solid archives may take longer to process in the browser.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the vast majority of 7Z files — a compressed archive with files and folders inside — the conversion produces a ZIP that is functionally identical in terms of content, just in a universally compatible container format.
        </p>

        {/* ── Section 6: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs desktop apps: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison between converting 7Z to ZIP in the browser and doing it with a desktop application:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Desktop app (7-Zip, Keka)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Installation required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Download an installer and complete the setup process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Open in any modern browser and start immediately.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Admin rights</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required for installation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not required. Runs in the browser sandbox.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on your device. Best for very sensitive files.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on your device. No upload. Verifiable via DevTools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Password-protected 7Z</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported — enter the password when prompted.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported. Use a desktop app for encrypted 7Z files.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed for large files</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Faster on very large archives — native code, disk I/O.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Near-native speed for WASM, but limited by available RAM.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works on shared / locked computers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Only if you have permission to install software.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Any browser, any computer, no install.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Output ZIP compatibility</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard ZIP, opens on every OS natively.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard ZIP via JSZip, opens on every OS natively.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Archive size after conversion</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">ZIP will be larger — LZMA2 is more efficient than DEFLATE.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same: ZIP will be larger than the original 7Z.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser-based tool is the right choice when you need a one-off conversion on any computer — including work machines where installing software is restricted. For repeated batch conversions of large archives, or for password-protected 7Z files, a desktop app like 7-Zip remains the more capable option.
        </p>

        {/* ── Section 7: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to trust my word. Here is how to verify this yourself in under two minutes using your browser&apos;s built-in developer tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu first via Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear any existing requests by clicking the clear button. Enable "Preserve log" if you want to make sure no requests are hidden.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your 7Z file and wait for the conversion to complete.</strong> Watch the Network panel during the entire process.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing file requests.</strong> You will see no network activity carrying your file data. The only requests that appear are the initial page load assets (JavaScript bundles, the WebAssembly file for libarchive). Your 7Z and the resulting ZIP never touch the network.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same verification method used by privacy researchers to audit tools that claim to be client-side. The Network inspector does not lie — if your file was being uploaded, you would see a POST or PUT request carrying its bytes. You will see none.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your 7Z file stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. libarchive.wasm extracts locally, JSZip repackages as ZIP.
            Verify with DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/7z-to-zip"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open 7Z to ZIP, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/convert-7z-to-zip-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How to convert 7Z to ZIP without software <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: When to use alternatives ──────────────────────── */}

        <h2 id="when-to-use-alternatives" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When to use a different approach
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser-based 7Z to ZIP tool is the right choice for most situations. Here is when to reach for a desktop application instead:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Password-protected 7Z archives
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your 7Z is encrypted with AES-256, the browser tool cannot extract it — libarchive needs the correct password to decrypt the archive entries. Use 7-Zip (Windows/Linux) or The Unarchiver (macOS) and enter the password when prompted. These tools handle AES-256 encrypted 7Z archives.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Very large archives (1 GB or more)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser tool holds the extracted content in RAM during JSZip assembly. On devices with limited memory (2 to 4 GB RAM), processing a 1 GB 7Z may cause the browser tab to crash or become unresponsive. Desktop apps use disk-based I/O and handle arbitrarily large archives efficiently. For archives over 500 MB on modest hardware, a desktop application is the safer choice.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          You just want to extract (not convert to ZIP)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you only need to get the files out of the 7Z and do not need the ZIP container, use the{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix Open 7Z tool</Link>.{" "}
          It extracts 7Z contents directly in the browser, shows you a list of all files, and lets you download them individually or as a ZIP — whichever you prefer. The workflow is identical: libarchive.wasm, no upload, no server.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          You received a RAR file instead of a 7Z
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the archive you need to convert is .rar rather than .7z, use the{" "}
          <Link href="/tools/rar-to-zip" className="text-[#6366F1] hover:underline">SammaPix RAR to ZIP tool</Link>{" "}
          instead. The architecture is identical — libarchive.wasm, JSZip, no upload — but optimised for RAR4 and RAR5 archives. See the companion guide{" "}
          <Link href="/blog/rar-to-zip-online" className="text-[#6366F1] hover:underline">Convert RAR to ZIP Online Free</Link>{" "}
          for a full walkthrough.
        </p>

        {/* ── Section 9: Related archive tools ─────────────────────────── */}

        <h2 id="related-archive-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other archive tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based archive tools, all with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/7z-to-zip" className="text-[#6366F1] hover:underline">7Z to ZIP</Link></strong>: convert a 7Z archive to a universally compatible ZIP, entirely in your browser. The tool covered in this article.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7Z</Link></strong>: extract 7-Zip archives in your browser. Same libarchive.wasm engine, no upload. Preview file list, download individual files, or grab all as a ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rar-to-zip" className="text-[#6366F1] hover:underline">RAR to ZIP</Link></strong>: convert a RAR archive to ZIP in your browser. Supports RAR4 and RAR5. The same no-upload approach, optimised for RAR.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Unrar</Link></strong>: extract the contents of a RAR archive directly. Preview file list, download individual files, or grab everything as a ZIP. Powered by libarchive.wasm.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">Extract TAR.GZ</Link></strong>: open .tar.gz and .tgz archives — the standard compressed archive format on Linux and macOS. No terminal required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link></strong>: create a ZIP archive from multiple files entirely in your browser. Drag files in, reorder them, and download the resulting ZIP. No upload.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your archive needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Convert 7Z to ZIP, extract 7Z, convert RAR to ZIP, open TAR.GZ, create ZIPs — without uploading files anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/7z-to-zip"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              7Z to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Open 7Z <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/rar-to-zip"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              RAR to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Unrar <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/tar-gz"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Extract TAR.GZ <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Create ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
