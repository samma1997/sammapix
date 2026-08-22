import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Open XZ Files Online (Free, No Upload) [2026]",
  description:
    "Open and extract .xz files directly in your browser. Plain XZ and tar.xz archives both supported. No install, no upload. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-open-xz-files-online` },
  keywords: [
    "how to open xz file",
    "open xz file online",
    "xz file opener",
    "extract xz file",
    "open tar.xz",
    "xz extractor",
    "decompress xz online",
    "xz file viewer",
    "lzma extractor",
    "xz extractor free",
  ],
  openGraph: {
    title: "How to Open XZ Files Online (Free, No Upload)",
    description:
      "Open and extract .xz files in your browser. Plain XZ and tar.xz both supported. No install, no upload. Updated 2026.",
    url: `${APP_URL}/blog/how-to-open-xz-files-online`,
    type: "article",
    publishedTime: "2026-08-23",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open XZ Files Online (Free, No Upload)",
    description:
      "Open .xz and tar.xz files in your browser. No install, no upload. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-23";
const POST_DATE_FORMATTED = "August 23, 2026";
const POST_URL = `${APP_URL}/blog/how-to-open-xz-files-online`;
const POST_TITLE = "How to Open XZ Files Online (Free, No Upload) [2026]";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to open and extract .xz files online without installing anything. Covers the browser method, the xz/tar command, Windows tools, and the difference between XZ, GZ, and BZ2.",
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
  keywords: ["how to open xz file", "open xz online", "xz extractor", "decompress tar.xz"],
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
      name: "What is an XZ file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An .xz file is a file compressed with the XZ format, which uses the LZMA2 algorithm. XZ typically achieves better compression ratios than gzip while still being reasonably fast to decompress. It is most common in Linux distributions (kernel source, Arch Linux packages) and as the wrapper around tar archives: file.tar.xz bundles many files with tar and compresses the bundle with XZ.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between XZ, GZ, and BZ2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three compress a single file (or a tar bundle). GZ (gzip) is the fastest and most compatible. BZ2 (bzip2) compresses better than GZ but is slower. XZ (LZMA2) usually achieves the best compression ratio of the three, at the cost of more CPU time for compression (decompression is fast). For most everyday use, XZ is worth it when distribution size matters, such as Linux kernel releases.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open an XZ file on Windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows has no native XZ support. The quickest option is the SammaPix XZ File Opener in your browser: no install, no upload. Alternatively, install 7-Zip (right-click, 7-Zip, Extract here), which handles XZ and tar.xz files. Git for Windows includes xz in Git Bash if you prefer the command line.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a tar.xz file on Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Terminal, run 'tar -xJf file.tar.xz' to extract. The capital J flag tells tar to use the xz decompressor. macOS includes the xz binary so this works out of the box. You can also double-click in Finder if the 'The Unarchiver' app is installed (it handles tar.xz). The browser tool works on Mac too and needs no install.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to open an XZ file online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety depends on the tool. Many online extractors upload your file to their servers. The SammaPix XZ File Opener runs entirely in your browser using WebAssembly, so the file never leaves your device. This is important when the XZ contains source code, database dumps, or system configurations.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the Linux kernel distributed as tar.xz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Linux kernel source is roughly 1 GB uncompressed. XZ compression reduces that to around 130 MB, a much smaller download than GZ (around 170 MB). Since the kernel is downloaded millions of times, the extra compression CPU cost during packaging is well worth the bandwidth savings for every user.",
      },
    },
  ],
};

export default function HowToOpenXzFilesPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-open-xz-files-online"
        description=".xz files use LZMA2 compression and are common for Linux kernel releases, Arch packages, and database exports. This guide shows how to open them in seconds without installing anything, plus the tar command and Windows options."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "what-is-xz", title: "What an XZ file actually is" },
          { id: "xz-vs-gz-vs-bz2", title: "XZ vs GZ vs BZ2" },
          { id: "method-comparison", title: "Ways to open an XZ, compared" },
          { id: "method-1-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "method-2-terminal", title: "Method 2: Terminal (Linux and Mac)" },
          { id: "method-3-windows", title: "Method 3: Windows options" },
          { id: "common-xz-files", title: "Common XZ file types" },
          { id: "errors", title: "Common errors and fixes" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "An .xz file is a single file compressed with LZMA2. Better ratio than gzip, slower to compress.",
          "A .tar.xz bundles many files with tar then compresses with XZ. Common for Linux kernel releases.",
          "Fastest no-install method: SammaPix XZ opener runs in your browser, nothing uploaded.",
          "On Linux: xz -d file.xz or tar -xJf file.tar.xz (capital J for xz).",
          "Mac includes xz by default via Xcode Command Line Tools or Homebrew.",
          "Windows needs 7-Zip, Git Bash, or WSL for xz. The browser tool works without any install.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Developer at a terminal working on a Linux system"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              XZ compression is the standard for Linux kernel and system package distribution
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your XZ right now, nothing to install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix XZ File Opener runs in your browser. Drop your .xz file, see the contents,
              and download the extracted files. Works for both plain XZ and tar.xz archives. Your
              file never leaves your device.
            </p>
            <Link
              href="/tools/open-xz"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open XZ File, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* Quick Answer */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#0EA5E9] rounded-r-md">
          <p className="text-xs font-semibold text-[#0EA5E9] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            The fastest way to open an .xz file without installing anything is the{" "}
            <Link href="/tools/open-xz" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix XZ File Opener
            </Link>
            : drop your file in the browser, get the extracted contents immediately. Works for plain .xz and tar.xz archives. Nothing is uploaded. On Linux or Mac you can also run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#1E1E1E] rounded">tar -xJf file.tar.xz</code> or <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#1E1E1E] rounded">xz -d file.xz</code> in the terminal.
          </p>
        </div>

        <h2 id="what-is-xz" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What an XZ file actually is
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <strong className="text-gray-800 dark:text-[#E5E5E5]">XZ format</strong> uses LZMA2, the same core algorithm as the .7z format. It was developed as an open-source replacement for both bzip2 and gzip with a focus on better compression ratios. The format is maintained by the XZ Utils project, which is bundled with virtually every Linux distribution.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Like gzip, XZ compresses exactly one file. To pack a folder, convention is to bundle first with tar, producing a .tar, then compress with xz, giving a .tar.xz. You will also see .txz as a shorthand, analogous to .tgz for tar.gz.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          XZ is most prominent in the Linux ecosystem: the Linux kernel source is distributed as .tar.xz, Arch Linux packages use the .pkg.tar.xz format, and Fedora and openSUSE use XZ for RPM payload compression. When you see a file with a .tar.xz or .xz extension, it almost certainly came from a Linux or open-source project.
        </p>

        <h2 id="xz-vs-gz-vs-bz2" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          XZ vs GZ vs BZ2
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Algorithm</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Compression</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.gz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">DEFLATE</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fast</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.bz2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Burrows-Wheeler</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Better than GZ</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Slow</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.xz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">LZMA2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best of the three</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Slow to compress, fast to decompress</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In practice, XZ decompression is fast enough that it is transparent to the user. The compression step is what takes longer, which is why it is preferred for distribution archives where one person compresses once and millions of users decompress.
        </p>

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ways to open an XZ, compared
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install needed</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Windows?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload risk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">
                  <Link href="/tools/open-xz" className="text-[#0EA5E9] hover:underline">SammaPix online</Link>
                </td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">xz / tar command</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in (Linux/Mac)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (needs Git Bash/WSL)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">7-Zip</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Desktop app (Windows)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">The Unarchiver (Mac)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free App Store app</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="method-1-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix XZ File Opener)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/open-xz" className="text-[#0EA5E9] hover:underline">SammaPix XZ File Opener</Link>{" "}
          reads your .xz file using libarchive compiled to WebAssembly. It decompresses the archive in the browser tab, lists all contents, and lets you download individual files or the complete extraction as ZIP. Nothing is uploaded, so it is safe for kernel sources, system configs, and proprietary exports.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/open-xz</strong> in any modern browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your file.</strong> Drag an .xz file onto the drop zone.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse and download.</strong> For tar.xz you see the full file tree. For a plain .xz the single extracted file downloads automatically.
          </li>
        </ol>

        <div data-tts-skip className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open an XZ with zero install</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop the file, see the contents, download what you need. 100% in your browser, nothing uploaded.
          </p>
          <Link
            href="/tools/open-xz"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open XZ File, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="method-2-terminal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Terminal (Linux and Mac)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Linux includes xz utilities by default. On macOS, xz is available after installing Xcode Command Line Tools (<code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">xcode-select --install</code>) or via Homebrew (<code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">brew install xz</code>).
        </p>
        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">{`# Decompress a plain .xz file (removes the .xz, leaves the original)
xz -d file.xz

# Decompress but keep the original .xz
xz -dk file.xz

# Extract a tar.xz archive (the J flag = use xz)
tar -xJf archive.tar.xz

# Extract to a specific folder
tar -xJf archive.tar.xz -C ~/Desktop/extracted/

# List contents of a tar.xz without extracting
tar -tJf archive.tar.xz

# Compress a file with XZ
xz filename`}</pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Note the capital <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">J</code> flag for xz in tar commands. Lowercase <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">z</code> is for gzip (.gz) and lowercase <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">j</code> is for bzip2 (.bz2). This is a common source of confusion.
        </p>

        <h2 id="method-3-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Windows options
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Windows has no native XZ support. Your options:
        </p>
        <ul className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browser tool (recommended):</strong>{" "}
            <Link href="/tools/open-xz" className="text-[#0EA5E9] hover:underline">sammapix.com/tools/open-xz</Link> handles both plain .xz and .tar.xz with no install at all.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">7-Zip:</strong> Right-click the .xz and choose 7-Zip, then Extract here. For a tar.xz this produces a .tar; extract that too to reach the actual files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Git Bash:</strong> Git for Windows bundles xz. In Git Bash, run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xJf file.tar.xz</code>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WSL:</strong> If Windows Subsystem for Linux is installed, open a WSL terminal and use the Linux tar/xz commands.
          </li>
        </ul>

        <h2 id="common-xz-files" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common XZ file types
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Linux kernel source (linux-6.x.tar.xz)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The official Linux kernel releases at kernel.org are distributed as .tar.xz. Extract with <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xJf linux-6.x.tar.xz</code>. This produces a directory of several hundred thousand files.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Arch Linux packages (.pkg.tar.xz, .pkg.tar.zst)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Arch Linux historically used .pkg.tar.xz for its binary packages. Newer versions moved to .zst (zstd compression), but .xz packages are still common in the Arch User Repository (AUR). The browser tool can inspect these to see what files a package installs before you install it.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Source releases from open-source projects</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many open-source projects offer both .tar.gz and .tar.xz source releases. The .tar.xz is typically 10-30% smaller. If you are on a metered connection, choosing .tar.xz saves bandwidth.
        </p>

        <div data-tts-skip className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Also working with GZ or TAR archives?</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix has dedicated openers for each format. All run in your browser with no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/open-gz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded text-xs font-medium text-gray-700 dark:text-[#D4D4D4] hover:border-gray-400 dark:hover:border-[#555] transition-colors"
            >
              GZ File Opener
            </Link>
            <Link
              href="/tools/tar-gz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded text-xs font-medium text-gray-700 dark:text-[#D4D4D4] hover:border-gray-400 dark:hover:border-[#555] transition-colors"
            >
              tar.gz Extractor
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded text-xs font-medium text-gray-700 dark:text-[#D4D4D4] hover:border-gray-400 dark:hover:border-[#555] transition-colors"
            >
              Open 7z Online
            </Link>
          </div>
        </div>

        <h2 id="errors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common errors and fixes
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;xz: (stdin): Compressed data is corrupt&quot;</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The file was corrupted during download or transfer. Download again and verify the checksum if the source provides one (SHA256 hashes are standard for kernel releases and Arch packages).
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;tar: invalid option -- J&quot;</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You are on an older macOS or BSD system whose tar does not support the J flag. Install GNU tar via Homebrew: <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">brew install gnu-tar</code>, then use <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">gtar -xJf file.tar.xz</code>.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">It only extracted a .tar on Windows with 7-Zip</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          7-Zip handles tar.xz in two steps. After the first extract you get a .tar file; right-click that and extract again to reach the actual files. The browser tool handles both layers in one step.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
          <p className="text-xs text-[#A3A3A3] mb-3">Related archive tools on SammaPix:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/open-xz" className="text-xs text-[#0EA5E9] hover:underline">XZ File Opener</Link>
            <Link href="/tools/open-gz" className="text-xs text-[#0EA5E9] hover:underline">GZ File Opener</Link>
            <Link href="/tools/tar-gz" className="text-xs text-[#0EA5E9] hover:underline">tar.gz Extractor</Link>
            <Link href="/tools/open-7z" className="text-xs text-[#0EA5E9] hover:underline">Open 7z Online</Link>
            <Link href="/tools/unrar" className="text-xs text-[#0EA5E9] hover:underline">Open RAR Online</Link>
            <Link href="/tools/zip-creator" className="text-xs text-[#0EA5E9] hover:underline">ZIP Creator</Link>
          </div>
        </div>
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
