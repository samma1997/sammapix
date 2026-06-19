import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Open 7z Files on Mac (5 Methods, Free)",
  description:
    "macOS cannot open 7z files natively. Here are 5 working methods: Keka, The Unarchiver, Terminal p7zip, SammaPix online (no install), and Archive Utility limitations. Updated 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-open-7z-files-on-mac`,
  },
  keywords: [
    "open 7z mac",
    "how to open 7z file on mac",
    "7z extractor mac",
    "extract 7z on mac free",
    "open 7z without software mac",
    "7z opener mac free",
    "extract 7z mac",
    "mac 7z file open",
  ],
  openGraph: {
    title: "How to Open 7z Files on Mac (5 Methods, Free)",
    description:
      "macOS does not open 7z files natively. 5 working methods compared: Keka, The Unarchiver, Terminal, SammaPix browser tool (no install needed).",
    url: `${APP_URL}/blog/how-to-open-7z-files-on-mac`,
    type: "article",
    publishedTime: "2026-06-19",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open 7z Files on Mac (5 Methods, Free)",
    description:
      "macOS cannot open 7z files natively. 5 free methods compared, including one that needs zero installation.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-19";
const POST_DATE_FORMATTED = "June 19, 2026";
const POST_URL = `${APP_URL}/blog/how-to-open-7z-files-on-mac`;
const POST_TITLE = "How to Open 7z Files on Mac (5 Methods, Free)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "macOS does not include a built-in 7z extractor. This guide covers 5 free methods to open 7z files on Mac: Keka, The Unarchiver, Terminal p7zip, SammaPix browser tool, and Archive Utility limitations. No email or payment required for any of these methods.",
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
    "open 7z mac",
    "how to open 7z file on mac",
    "7z extractor mac",
    "extract 7z on mac free",
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
      name: "Can macOS open 7z files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. macOS Archive Utility supports ZIP, tar.gz, and a few other open formats, but it does not support 7z. The 7z format uses the LZMA compression algorithm and was created by Igor Pavlov as part of the open-source 7-Zip project. Despite being open-source, Apple has not included support for it in macOS. You need a third-party app or a browser-based tool to open 7z files on a Mac.",
      },
    },
    {
      "@type": "Question",
      name: "Is 7z better than ZIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7z typically compresses files 30-70% smaller than ZIP, especially for executables and source code. It also supports strong AES-256 encryption with filename encryption, which ZIP does not. However, ZIP is supported natively on every operating system and is the better choice when sharing files with people who may not have 7-Zip or a compatible extractor installed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a password-protected 7z file on Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All the main methods support password-protected 7z archives. In Keka, a password prompt appears automatically. In The Unarchiver, the same dialog appears when you double-click the file. With SammaPix online, a password field appears as soon as the tool detects the archive is encrypted. In Terminal, use the command: 7z e -p'YOURPASSWORD' archive.7z",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 7z and RAR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both 7z and RAR are third-party compression formats that compress better than ZIP and support password protection. 7z is open-source (created by Igor Pavlov, published at 7-zip.org) while RAR is proprietary (owned by RARLAB). 7z generally compresses slightly better than RAR for most file types. Neither format is supported natively by macOS or Windows without extra software, though 7-Zip is free for Windows users while WinRAR requires a license for continued use.",
      },
    },
    {
      "@type": "Question",
      name: "How can I open a 7z file on Mac without installing any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use SammaPix 7Z Opener at sammapix.com/tools/open-7z. It runs entirely in your browser using WebAssembly, so nothing is installed on your Mac. Open the page, drop your .7z file, and download the contents. It supports standard .7z archives and password-protected archives.",
      },
    },
    {
      "@type": "Question",
      name: "What are multi-volume 7z files (.7z.001, .7z.002)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multi-volume 7z archives are large archives that have been split across several files. You typically see them named archive.7z.001, archive.7z.002, and so on. To extract them, you need all parts in the same folder and should use a desktop app like Keka or open them in Terminal using the 7z command pointing to the first part. Browser-based tools, including SammaPix, currently do not support multi-volume 7z extraction.",
      },
    },
    {
      "@type": "Question",
      name: "Is Keka free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keka is free to download directly from keka.io. On the Mac App Store, it costs $3.99, and purchasing there is a way to support the developer. Both versions are functionally identical. Keka supports 7z, RAR, ZIP, tar.gz, tar.bz2, and many other archive formats, and it can also create archives in 7z, ZIP, and tar formats.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToOpen7zFilesOnMacPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-open-7z-files-on-mac"
        description="macOS does not open 7z files natively. Archive Utility skips them entirely. This guide covers every working free method: Keka, The Unarchiver, Terminal p7zip, and SammaPix in-browser (zero install needed). Pick the right one for your situation."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools"]}
        readingTime={10}
        headings={[
          { id: "why-mac-cant-open-7z", title: "Why your Mac cannot open 7z files" },
          { id: "method-comparison", title: "5 methods compared: which one is right for you?" },
          { id: "method-1-keka", title: "Method 1: Keka (best for 7z on Mac)" },
          { id: "method-2-unarchiver", title: "Method 2: The Unarchiver (lightweight alternative)" },
          { id: "method-3-sammapix", title: "Method 3: SammaPix online (no install, one-time use)" },
          { id: "method-4-terminal", title: "Method 4: Terminal with p7zip (developers)" },
          { id: "method-5-archive-utility", title: "Method 5: Archive Utility (does not work for 7z)" },
          { id: "password-protected-7z", title: "How to open password-protected 7z on Mac" },
          { id: "multi-volume-7z", title: "Multi-volume 7z archives: .7z.001, .7z.002" },
          { id: "7z-vs-zip-vs-rar", title: "7z vs ZIP vs RAR: when to use which" },
          { id: "after-extracting", title: "What to do after extracting: working with the files" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "macOS Archive Utility does NOT support 7z. Double-clicking a .7z file will show an error or do nothing.",
          "Keka (free from keka.io) is the best desktop option for 7z on Mac: it extracts and also creates 7z archives.",
          "The Unarchiver (free, Mac App Store) also handles 7z well and is slightly simpler to install.",
          "SammaPix 7Z Opener runs in your browser with no installation. Best for a one-time file you received and do not want to install software for.",
          "Terminal with p7zip (via Homebrew) works for developers or anyone comfortable with the command line.",
          "Multi-volume 7z archives (.7z.001, .7z.002) require all parts in the same folder and a desktop app.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"
              alt="MacBook laptop open on a desk showing files"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              macOS handles ZIP natively but has no built-in support for 7z archives
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your 7z file right now, no installation needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix 7Z Opener runs entirely in your browser. Drop your .7z file, view the contents,
              and download individual files or the whole archive as ZIP. Supports standard and
              password-protected 7z archives. Your file never leaves your Mac.
            </p>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open 7z File, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* ── Section 1: Why Mac cannot open 7z ─────────────────────────── */}

        <h2 id="why-mac-cant-open-7z" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your Mac cannot open 7z files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you double-click a .7z file on a Mac, one of two things happens: either nothing at all, or a dialog saying the file cannot be opened. This is not a bug or a corrupt file. It is simply that macOS does not support the 7z format.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS Archive Utility handles ZIP, tar, gzip, and bzip2 natively. The 7z format is a different beast entirely. It was created by Igor Pavlov and released as open-source software through{" "}
          <a href="https://www.7-zip.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">7-zip.org</a>.
          Despite being open-source, Apple has never added 7z support to macOS. The format uses the LZMA compression algorithm, which achieves significantly better compression than ZIP but requires a dedicated library to decompress.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          7z files appear most commonly when downloading software packages, game mods, large datasets, or anything where the creator wanted maximum compression. They are widespread in developer communities and on distribution platforms like GitHub releases and forum attachments. If someone on Windows sent you a .7z, they almost certainly used 7-Zip or a similar tool that defaults to the format for its compression efficiency.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why 7z compresses better than ZIP
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The core reason is the compression algorithm. ZIP uses DEFLATE, a combination of LZ77 and Huffman coding that was designed in the early 1990s. 7z uses LZMA (Lempel-Ziv-Markov chain Algorithm), which is significantly more sophisticated. LZMA uses a much larger dictionary size, which means it can find and eliminate repeated patterns across a larger window of data. For executable files, source code, and documents, this typically results in 30-70% smaller archives compared to ZIP. For already-compressed data like JPEG images or MP4 videos, the difference is negligible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What about ZIP files on Mac?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZIP files are a completely different story. macOS handles ZIP natively: double-click, and Archive Utility extracts it instantly. If whoever sent you the file could have used ZIP instead of 7z, that would have saved everyone the trouble. But if you received a .7z file, you need one of the methods below.
        </p>

        {/* ── Section 2: Comparison table ────────────────────────────────── */}

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          5 methods compared: which one is right for you?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an honest breakdown of every practical method to open 7z on Mac in 2026. Read the table first, then jump to the section for your preferred approach.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Installation</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Privacy / Upload</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Creates 7z</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Keka</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">keka.io or App Store</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (website) · $3.99 (App Store)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">The Unarchiver</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Mac App Store (1 click)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">
                  <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix online</Link>
                </td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No upload, runs in-browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (download as ZIP)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (up to 200 MB)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Terminal (p7zip)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Homebrew (command line)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Archive Utility (built-in)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (already installed)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (but does not support 7z)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The short version: if you open 7z files regularly or also need to create them, install Keka. If you only need to open one .7z file right now and do not want to install anything, use{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix in your browser</Link>.
        </p>

        {/* ── Section 3: Keka ──────────────────────────────────────────────── */}

        <h2 id="method-1-keka" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Keka (best all-rounder for 7z on Mac)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka is the go-to archiving app for Mac power users, and it handles 7z better than any other option on this list. Unlike most alternatives, Keka can both extract and create 7z archives. If you need to compress files into 7z format or extract what someone sent you, Keka does both in the same app. Download it free from{" "}
          <a href="https://www.keka.io/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">keka.io</a>{" "}
          or pay $3.99 on the Mac App Store to support the developer.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: open a 7z file with Keka
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download Keka</strong> from keka.io. Open the .dmg file and drag Keka to your Applications folder.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set as default (optional).</strong> Open Keka, go to Preferences, and set it as the default extractor for 7z and other archive formats. After this, double-clicking any .7z file will open it automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag your .7z file</strong> onto the Keka icon in the Dock, or onto the main Keka window. Extraction starts immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Alternatively, right-click</strong> your .7z file in Finder and select Open With, then Keka.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Done.</strong> The extracted folder appears in the same directory as the .7z file, or in the destination you configured in Keka preferences.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Creating 7z archives with Keka
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To compress files into a 7z archive using Keka, select the format (7z) in the Keka window, then drag the files or folder you want to compress onto the Keka window. Keka creates the archive in the same location as the original files. You can set compression level, add a password, and split the archive into multiple volumes from the same interface.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What formats does Keka support?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka extracts: 7z, RAR (RAR4 and RAR5), ZIP, tar.gz, tar.bz2, tar.xz, tar.zst, ISO, DMG, CAB, JAR, and many more. It creates: 7z, ZIP, tar.gz, tar.bz2, tar.xz, tar.zst, and a few others. It is one of the most versatile free archive apps available for Mac.
        </p>

        {/* ── Section 4: The Unarchiver ───────────────────────────────────── */}

        <h2 id="method-2-unarchiver" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: The Unarchiver (lightweight and free on the App Store)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Unarchiver is the most popular free archive extractor on the Mac App Store, with over 10 million downloads. It handles 7z extraction well and integrates seamlessly with macOS: once installed, double-clicking any .7z file opens it automatically, just like ZIP files. Find it for free on the{" "}
          <a href="https://apps.apple.com/app/the-unarchiver/id425424353" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Mac App Store</a>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: open a 7z file with The Unarchiver
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Mac App Store.</strong> Search for "The Unarchiver" and click Get. It is completely free.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set as default.</strong> When you first launch The Unarchiver, check the file types you want it to handle, including 7z. Click Associate.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Double-click your .7z file.</strong> The Unarchiver extracts everything to the same folder. If the archive is password-protected, a dialog appears asking for the password.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Done.</strong> The extracted folder appears next to the .7z file.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The Unarchiver vs Keka for 7z
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extraction only:</strong> The Unarchiver cannot create archives. If you only need to extract, it is perfectly fine.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Simpler install:</strong> Available directly from the App Store with one click, no .dmg to open.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No archive creation:</strong> For creating 7z files, you need Keka or Terminal.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">RAR support too:</strong> The Unarchiver also handles RAR, tar, bz2, and dozens of other formats including legacy ones.
          </li>
        </ul>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open a 7z file without installing anything</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix 7Z Opener works entirely in your browser. Drop your .7z file, view the contents, and download what you need as individual files or as a ZIP. Supports standard and password-protected 7z archives. Zero install, zero upload.
          </p>
          <Link
            href="/tools/open-7z"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open 7z Online, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: SammaPix ──────────────────────────────────────────── */}

        <h2 id="method-3-sammapix" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: SammaPix online (no installation, ideal for one-time use)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you received a single .7z file and have no plans to open 7z archives regularly, installing an app just for this seems excessive. The{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix 7Z Opener</Link>{" "}
          solves exactly this scenario: open your browser, drop the file, extract what you need, close the tab. No installation, no account, no email address required.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How it works technically (the privacy part)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix uses WebAssembly to run the 7-Zip engine directly in your browser. The .7z file you drop is read by JavaScript running locally on your Mac. It is never sent to any server, never stored, and never visible to SammaPix. This is important because many popular "online 7z extractors" upload your file to their servers for processing, which creates a genuine privacy risk for sensitive documents, source code, or personal files.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: open a 7z file with SammaPix
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/open-7z</strong> in Safari or Chrome on your Mac.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag and drop your .7z file</strong> onto the page, or click to browse for it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter password if needed.</strong> If the archive is password-protected, a field appears automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the file list.</strong> You will see all files inside the archive with their names and sizes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download what you need.</strong> Click individual files to download them, or click "Download all as ZIP" to get everything at once.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The free plan handles archives up to 200 MB, which covers the vast majority of 7z files sent between individuals. For very large archives, a Day Pass ($2.99 for 24 hours) removes the size limit entirely.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When SammaPix is not the right choice
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Multi-volume archives:</strong> .7z.001, .7z.002 style archives are not supported in the browser. Use Keka or Terminal instead.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Very large files (&gt;200 MB on free plan):</strong> Extracting large archives in-browser can also be slower than a native app for very heavy files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Regular use:</strong> If you open 7z files every week, installing Keka makes the workflow faster and more seamless.
          </li>
        </ul>

        {/* ── Section 6: Terminal ──────────────────────────────────────────── */}

        <h2 id="method-4-terminal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 4: Terminal with p7zip (for developers and command-line users)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are comfortable with the command line, <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">p7zip</code> from Homebrew is the most powerful option. It is the Unix port of the official 7-Zip engine and supports every 7z feature, including multi-volume archives and solid archives. It can also create 7z archives with full compression level control.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Install p7zip via Homebrew
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you do not have Homebrew installed, get it first from{" "}
          <a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">brew.sh</a>.
          Then install p7zip:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`brew install p7zip`}
        </pre>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Common 7z Terminal commands
        </h3>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`# Extract a 7z file to the current folder
7z e archive.7z

# Extract preserving folder structure
7z x archive.7z

# Extract to a specific folder
7z x archive.7z -o~/Desktop/extracted

# Extract password-protected 7z
7z x -p'YOURPASSWORD' archive.7z

# List contents without extracting
7z l archive.7z

# Create a 7z archive
7z a output.7z folder/`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Note the difference between <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">7z e</code> (extract flat, no folders) and <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">7z x</code> (extract with full paths). Use <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">7z x</code> in almost all cases to preserve the original directory structure.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Terminal method is ideal for batch processing. To extract all .7z files in a folder:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`for f in *.7z; do 7z x "$f"; done`}
        </pre>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Also got a .rar file?</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            If someone also sent you a .rar archive, SammaPix has a separate browser-based tool for that too. Same concept: no installation, no upload, runs locally in your browser. Supports RAR4, RAR5, and password-protected archives.
          </p>
          <Link
            href="/tools/unrar"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open RAR Online, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 7: Archive Utility ───────────────────────────────────── */}

        <h2 id="method-5-archive-utility" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 5: Archive Utility (the built-in tool that does not work for 7z)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This section exists because many guides list Archive Utility as a potential option. It is not. Archive Utility is the app macOS uses when you double-click a .zip file. It lives at{" "}
          <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">/System/Library/CoreServices/Applications/Archive Utility.app</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you try to open a .7z file with Archive Utility, you will get an error saying the format is unsupported. This is expected behavior. Archive Utility simply has no knowledge of the LZMA compression format that 7z uses.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What Archive Utility supports: .zip, .tar, .tar.gz / .tgz, .tar.bz2, .tar.xz, .gz, .bz2. What it does not support: .7z, .rar, .cab, .ace, and most other third-party formats. If you find a guide suggesting you can open .7z with Archive Utility on Mac, it is incorrect.
        </p>

        {/* ── Section 8: Password protected 7z ───────────────────────────── */}

        <h2 id="password-protected-7z" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open a password-protected 7z file on Mac
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All the working methods above support password-protected 7z archives. 7z supports two types of encryption: encrypting the file contents only, and encrypting the file contents plus the file names. If file names are also encrypted, you need the password just to see what is inside the archive. Here is what happens with each method:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Keka
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka detects encryption automatically. When you open a password-protected 7z, a password prompt appears before extraction begins. Keka also has a built-in password manager if you frequently open archives from the same source.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The Unarchiver
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A dialog will appear asking for the password as soon as The Unarchiver detects the archive is encrypted. Enter it and click OK. If the password is wrong, an error is displayed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          SammaPix online
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an encrypted 7z archive into the{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix 7Z Opener</Link>,
          a password field appears automatically. Enter the password and the tool extracts the archive. Because everything runs locally in your browser, the password is never sent anywhere.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Terminal (p7zip)
        </h3>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`7z x -p'YOURPASSWORD' archive.7z`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Replace <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">YOURPASSWORD</code> with the actual password. The password immediately follows <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">-p</code> with no space. If your password contains spaces, wrap it in single quotes.
        </p>

        {/* ── Section 9: Multi-volume 7z ──────────────────────────────────── */}

        <h2 id="multi-volume-7z" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Multi-volume 7z archives: .7z.001, .7z.002
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Sometimes large files are split into multiple 7z parts. You will see files named something like:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`bigfile.7z.001
bigfile.7z.002
bigfile.7z.003`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is different from RAR multi-volume naming (which uses .part1.rar, .part2.rar). The rules for extraction are similar:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Rules for multi-volume 7z
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You need all parts.</strong> If any volume is missing, extraction will fail. Download every .7z.00x file before attempting to extract.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Put all parts in the same folder.</strong> The extractor finds them automatically based on naming.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open only the first part.</strong> Double-click <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">bigfile.7z.001</code> in Keka or The Unarchiver. The remaining parts are handled automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">In Terminal:</strong> Run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">7z x bigfile.7z.001</code>. The 7z engine finds and reads the other parts.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browser tools do not support this.</strong> SammaPix and other in-browser tools cannot handle multi-volume 7z archives. Use a desktop app.
          </li>
        </ul>

        {/* ── Section 10: 7z vs ZIP vs RAR ────────────────────────────────── */}

        <h2 id="7z-vs-zip-vs-rar" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          7z vs ZIP vs RAR: when to use which
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All three formats are archive containers, but they have different strengths and compatibility profiles. Here is a practical breakdown:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use ZIP when:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">The recipient might be on any operating system. ZIP opens natively on Mac, Windows, Linux, iOS, and Android.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You are sharing files via email, Slack, Dropbox, or cloud storage. Most services handle ZIP natively.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You are attaching files to a web form. ZIP is the universally expected format.</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use 7z when:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">Maximum compression is the priority (software packages, source code, large text datasets).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You need AES-256 encryption with filename encryption (stronger than ZIP's built-in encryption).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">All recipients have 7-Zip, Keka, or The Unarchiver installed and understand the format.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You are a developer distributing software and want to minimize download size.</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use RAR when:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You need multi-volume archives with built-in error recovery records (very useful for files distributed over unreliable connections).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">Your recipients are on Windows and already have WinRAR installed.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You received a RAR and want to re-share in the same format for familiarity.</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For almost all everyday use cases, ZIP wins on compatibility. If you received a 7z and want to convert it to ZIP for easier sharing, extract it first and then re-compress as ZIP. On Mac, right-click the extracted folder and choose Compress.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you also need to open a RAR file, the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix RAR Opener</Link>{" "}
          works the same way as the 7z tool: browser-based, no installation, no upload. You can also read our full guide on{" "}
          <Link href="/blog/how-to-open-rar-files-on-mac" className="text-[#6366F1] hover:underline">how to open RAR files on Mac</Link>.
        </p>

        {/* ── Section 11: After extracting ────────────────────────────────── */}

        <h2 id="after-extracting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do after extracting: working with the files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you have extracted the 7z archive, here are common next steps depending on what was inside:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Images: compress before sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the archive contained a batch of photos, you may want to compress them before sending via email or messaging apps. The{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Image Compressor</Link>{" "}
          handles batches of images entirely in your browser, no server upload needed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Images: check for hidden EXIF / GPS metadata
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photos extracted from an archive often retain their original EXIF metadata, including GPS coordinates from the camera or smartphone. If you plan to share these images publicly, check and strip the location data first using the{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">SammaPix EXIF Viewer</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          PDFs: merge multiple documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the 7z archive contained multiple PDF files that belong together, merge them into one document with the{" "}
          <Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">SammaPix PDF Merger</Link>.
          All processing is in-browser with no server upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Need to open a .rar file instead?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you have a RAR archive rather than a 7z file, use the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix RAR Opener</Link>.
          Same browser-based approach: no installation, no upload, works on any Mac. It supports RAR4, RAR5, and password-protected archives.
        </p>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Work with the files you just extracted</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Got images from your 7z archive? Compress them before sharing, strip EXIF / GPS data, or merge any PDFs, all in your browser without uploading to a server.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove EXIF / GPS <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
