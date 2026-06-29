import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Create a ZIP File Online (Free, No Upload) - 2026",
  description:
    "Make a ZIP file online in your browser without uploading anything. Plus the built-in Windows and Mac methods, how to zip a folder, and when to use ZIP vs 7z. Updated 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-create-a-zip-file-online-no-upload`,
  },
  keywords: [
    "create zip file online",
    "how to make a zip file",
    "zip files online free",
    "zip a folder",
    "compress files to zip",
    "make zip file windows",
    "make zip file mac",
    "create zip no upload",
  ],
  openGraph: {
    title: "How to Create a ZIP File Online (Free, No Upload)",
    description:
      "Make a ZIP file in your browser with no upload, plus the built-in Windows and Mac methods and how to zip a folder. Updated 2026.",
    url: `${APP_URL}/blog/how-to-create-a-zip-file-online-no-upload`,
    type: "article",
    publishedTime: "2026-06-29",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a ZIP File Online (Free, No Upload)",
    description:
      "Make a ZIP file in your browser with no upload, plus the built-in Windows and Mac methods. Updated 2026.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-29";
const POST_DATE_FORMATTED = "June 29, 2026";
const POST_URL = `${APP_URL}/blog/how-to-create-a-zip-file-online-no-upload`;
const POST_TITLE = "How to Create a ZIP File Online (Free, No Upload)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to create a ZIP file online in your browser with no upload, plus the built-in Windows and Mac methods, how to zip a folder while preserving structure, and when to use ZIP vs 7z vs RAR.",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["create zip file online", "how to make a zip file", "zip a folder", "zip files online free"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I create a ZIP file online without uploading my files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix ZIP Creator at sammapix.com/tools/zip-creator. Drag your files or a folder onto the page, name the archive, and click Create & download ZIP. The ZIP is built entirely in your browser with JavaScript, so your files are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a ZIP file for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Windows and macOS both create ZIP files for free with a built-in right-click option, and browser tools like SammaPix ZIP Creator are free with no signup and no watermark. ZIP is an open format, so creating one never requires paid software.",
      },
    },
    {
      "@type": "Question",
      name: "How do I zip a folder and keep the folder structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Windows, right-click the folder and choose Send to, then Compressed (zipped) folder. On Mac, right-click the folder and choose Compress. With SammaPix ZIP Creator, drag the folder onto the page and the subfolder structure is preserved inside the ZIP automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I password-protect a ZIP file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The built-in Windows and Mac zip tools do not add a password. For an encrypted ZIP you need a desktop app such as 7-Zip (Windows) or Keka (Mac), which support AES-256 encryption. Browser-based creators including SammaPix currently make standard (unencrypted) ZIP files.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my ZIP file the same size as the originals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ZIP uses lossless DEFLATE compression. Files that are already compressed, like JPEG photos, MP4 videos, MP3 audio, or PDFs, cannot shrink much further, so the ZIP will be close to the original size. Text, documents, source code, and uncompressed images compress significantly. Zipping is still useful for bundling many files into one even when it does not save space.",
      },
    },
    {
      "@type": "Question",
      name: "Will a ZIP I create open on a phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ZIP is supported natively on iOS (Files app) and Android (Files by Google and most file managers), as well as Windows, macOS and Linux. A standard ZIP you create with any of these methods opens everywhere with no extra app.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToCreateZipOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-create-a-zip-file-online-no-upload"
        description="Bundling files into a ZIP makes them easier to send and often smaller. This guide covers the fastest browser method (no upload), the built-in Windows and Mac options, how to zip a folder, password protection, and when ZIP is the wrong choice."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools"]}
        readingTime={9}
        headings={[
          { id: "why-zip", title: "Why create a ZIP file (and why in the browser)" },
          { id: "method-comparison", title: "4 ways to create a ZIP, compared" },
          { id: "method-1-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "method-2-windows", title: "Method 2: Windows built-in" },
          { id: "method-3-mac", title: "Method 3: Mac built-in" },
          { id: "method-4-desktop", title: "Method 4: 7-Zip / Keka (passwords, max compression)" },
          { id: "zip-a-folder", title: "How to zip a folder (keep the structure)" },
          { id: "password", title: "Can you password-protect a ZIP?" },
          { id: "zip-vs-others", title: "ZIP vs 7z vs RAR: which to use" },
          { id: "troubleshooting", title: "Common problems and fixes" },
          { id: "before-you-zip", title: "Before you zip: shrink the files first" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "ZIP is the universal way to bundle many files into one. It opens natively on Windows, Mac, Linux, iOS and Android with no extra app.",
          "The fastest no-install option is a browser tool: SammaPix ZIP Creator builds the ZIP locally and never uploads your files.",
          "Windows: right-click, Send to, Compressed (zipped) folder. Mac: right-click, Compress.",
          "Dragging a folder keeps the subfolder structure inside the ZIP.",
          "The built-in OS tools cannot add a password. For an encrypted ZIP use 7-Zip (Windows) or Keka (Mac).",
          "Already-compressed files (JPEG, MP4, PDF) will not shrink much. ZIP still helps by bundling them into one file.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&q=80"
              alt="Folders and files organised on a desk, ready to be bundled together"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A ZIP bundles many files into one, easier to send and often smaller
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create a ZIP right now, nothing to install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix ZIP Creator runs entirely in your browser. Drag in your files or a whole folder,
              name the archive, and download a single .zip. Your files never leave your device.
            </p>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Create a ZIP File, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* ── Section 1 ─────────────────────────────────────────────────── */}
        <h2 id="why-zip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why create a ZIP file (and why in the browser)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A ZIP file is a single container that holds many files and folders together. There are two reasons people make one: to <strong className="text-gray-800 dark:text-[#E5E5E5]">bundle</strong> several files into one easy-to-send package, and to <strong className="text-gray-800 dark:text-[#E5E5E5]">shrink</strong> the total size. Bundling is the bigger reason in everyday life: emailing twenty photos as one .zip is far simpler than attaching them one by one, and many upload forms only accept a single file.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZIP is the right format for this because it is supported everywhere. Windows, macOS, Linux, iOS, and Android all open ZIP files natively, with no extra software. That universality is why ZIP, not 7z or RAR, is the safe choice when you do not know what device the recipient is using.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          So why use a browser tool instead of your operating system? Two situations. First, you are on a Chromebook, a locked-down work computer, or a borrowed device where the right-click menu is missing or restricted. Second, and more importantly, many online zip tools <strong className="text-gray-800 dark:text-[#E5E5E5]">upload your files to their servers</strong> to build the archive. For private documents, client work, or personal photos that is an unnecessary risk. A browser tool that builds the ZIP locally keeps everything on your device.
        </p>

        {/* ── Section 2: comparison ─────────────────────────────────────── */}
        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          4 ways to create a ZIP, compared
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Privacy / Upload</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Password</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">
                  <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">SammaPix online</Link>
                </td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No upload, runs in-browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Already installed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Mac built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Already installed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">7-Zip / Keka</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Desktop app</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (AES-256)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The short version: if you are on your own Windows or Mac, the built-in right-click option is the fastest. If you are on a Chromebook or restricted device, or you simply prefer not to leave files lying around, use the{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">browser tool</Link>. If you need a password, use 7-Zip or Keka.
        </p>

        {/* ── Section 3: online ─────────────────────────────────────────── */}
        <h2 id="method-1-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix ZIP Creator)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">SammaPix ZIP Creator</Link>{" "}
          builds the archive directly in your browser using JavaScript. Nothing is sent to a server, so it works on any device with a modern browser, including Chromebooks and locked-down work laptops, while keeping your files private.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Step-by-step</h3>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/zip-creator</strong> in any browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Add your files.</strong> Drag files (or an entire folder) onto the page, or click to select them. You can keep adding more.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Name the archive.</strong> Type a name, or leave the default.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Create &amp; download ZIP.</strong> The file is compressed locally and downloads instantly.
          </li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because everything runs locally, the practical limit is your device&apos;s memory rather than a server quota. It comfortably handles everyday bundles of documents and photos with no signup and no watermark.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────── */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Bundle your files into one .zip</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drag in files or a folder, name it, and download. 100% in your browser, nothing uploaded.
          </p>
          <Link
            href="/tools/zip-creator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Create a ZIP, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Windows ────────────────────────────────────────── */}
        <h2 id="method-2-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Windows built-in (no software needed)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Windows has made ZIP files since Windows XP, and it is still the quickest way on a PC you own.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the files or folder.</strong> Hold Ctrl to click several files, or click a folder.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Right-click the selection.</strong> On Windows 11, choose <em>Compress to ZIP file</em>. On Windows 10, choose <em>Send to</em>, then <em>Compressed (zipped) folder</em>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Name it.</strong> A new .zip appears in the same folder, ready to rename.
          </li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Windows built-in zipper cannot add a password and does not let you choose a compression level. For either of those, see Method 4.
        </p>

        {/* ── Section 5: Mac ────────────────────────────────────────────── */}
        <h2 id="method-3-mac" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Mac built-in (Compress)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS creates ZIP files through Archive Utility, with no app to install.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select your items</strong> in Finder. Shift-click or Command-click to pick several.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Right-click and choose Compress.</strong> If you selected one folder it reads &quot;Compress [name]&quot;; for several items it reads &quot;Compress N items&quot;.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Find Archive.zip</strong> in the same folder (or [name].zip for a single folder). Rename as needed.
          </li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One quirk: macOS adds a hidden <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">__MACOSX</code> folder and <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">.DS_Store</code> files inside ZIPs. Windows users will see these as clutter. A browser tool that only adds the files you choose avoids that.
        </p>

        {/* ── Section 6: desktop ────────────────────────────────────────── */}
        <h2 id="method-4-desktop" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 4: 7-Zip / Keka (passwords and maximum compression)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you need a password-protected ZIP or the smallest possible file, install a dedicated app.{" "}
          <a href="https://www.7-zip.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">7-Zip</a>{" "}
          is the standard on Windows and{" "}
          <a href="https://www.keka.io/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Keka</a>{" "}
          is the favourite on Mac. Both are free.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In 7-Zip, right-click your files, choose <em>7-Zip</em>, then <em>Add to archive</em>. Set the archive format to ZIP, choose a compression level, and type a password under Encryption (select AES-256). In Keka, pick ZIP, drag your files in, and tick the password box. These apps also create 7z archives, which compress better than ZIP but are not supported natively everywhere, covered next.
        </p>

        {/* ── Section 7: zip a folder ──────────────────────────────────── */}
        <h2 id="zip-a-folder" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to zip a folder (and keep the structure)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Zipping a folder preserves its internal structure: subfolders, nesting, and file names all stay intact when the recipient unzips it. Every method above handles folders. On Windows and Mac, right-click the folder itself rather than its contents. With the{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">SammaPix ZIP Creator</Link>, drag the folder onto the page and the relative paths (for example <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">photos/2026/cover.jpg</code>) are recreated inside the ZIP.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A common mistake is selecting all the files inside a folder instead of the folder itself. That produces a ZIP with loose files at the top level and no parent folder, which can be messy when extracted. If you want the folder name preserved, zip the folder, not its contents.
        </p>

        {/* ── Section 8: password ──────────────────────────────────────── */}
        <h2 id="password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Can you password-protect a ZIP?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes, but not with the built-in tools. Neither the Windows right-click zipper nor the Mac Compress option can add a password. For an encrypted ZIP you need 7-Zip or Keka (Method 4), which support AES-256 encryption. Browser-based creators, including SammaPix, currently produce standard unencrypted ZIPs.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your goal is privacy while transferring, remember that the bigger risk is often the upload itself. A ZIP built locally in your browser never touches a server, so for many people that is enough protection without juggling passwords. If the contents are genuinely sensitive, combine a local ZIP with AES-256 encryption from a desktop app.
        </p>

        {/* ── Section 9: zip vs others ─────────────────────────────────── */}
        <h2 id="zip-vs-others" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          ZIP vs 7z vs RAR: which to use
        </h2>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">ZIP</strong> - choose it when the recipient could be on any device. It opens natively everywhere and is the default for email, chat, and upload forms.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">7z</strong> - choose it for maximum compression (software, source code, large text). The catch: macOS and Windows cannot open it without extra software. If you receive one, our{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7z tool</Link> handles it in the browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">RAR</strong> - common on Windows, with strong multi-volume support, but proprietary and not natively openable. Received one? Use our{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Open RAR tool</Link>.
          </li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For sending files to other people, ZIP almost always wins on compatibility. Reserve 7z and RAR for cases where every recipient already has the right software.
        </p>

        {/* ── Section 10: troubleshooting ──────────────────────────────── */}
        <h2 id="troubleshooting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common problems and fixes
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">The ZIP is not smaller than the originals</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          That is expected for already-compressed files like JPEG, PNG, MP4, MP3, or PDF. ZIP uses lossless compression, and these formats are already compressed, so there is little left to squeeze. Zipping still bundles them into one file. To genuinely shrink photos, compress them before zipping (see the next section).
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">The recipient sees a __MACOSX folder</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          That hidden folder is added by the macOS Compress option. It is harmless but looks messy on Windows. Either tell the recipient to ignore it, or build the ZIP with a browser tool that only includes the files you add.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">The ZIP is too big to email</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most email providers cap attachments around 20 to 25 MB. If your ZIP is larger, compress the images inside first, or use a link-sharing service. Splitting a ZIP into smaller parts requires a desktop app like 7-Zip or Keka.
        </p>

        {/* ── Section 11: before you zip ───────────────────────────────── */}
        <h2 id="before-you-zip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Before you zip: shrink the files first
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Since photos and PDFs barely shrink inside a ZIP, the real size savings come from optimising those files first, then zipping the smaller versions.
        </p>
        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Make the files smaller, then bundle them</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Compress photos, convert them to a lighter format, or strip EXIF data before creating your ZIP, all in your browser with no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Convert to WebP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Remove EXIF / GPS <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Then bundle the optimised files with the{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link>. And if you ever receive a .rar or .7z instead of a .zip, the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">RAR opener</Link> and{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">7z opener</Link> handle those in the browser too.
        </p>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
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
