import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Open GZ Files Online (Free, No Upload) [2026]",
  description:
    "Open and extract .gz and .gzip files directly in your browser. Works for both plain GZ files and tar.gz archives. No install, no upload. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-open-gz-files-online` },
  keywords: [
    "how to open gz file",
    "open gz file online",
    "gz file opener",
    "extract gz file",
    "open gzip file",
    "gz extractor",
    "open gz without software",
    "gz file viewer",
    "decompress gz online",
    "gzip extractor free",
  ],
  openGraph: {
    title: "How to Open GZ Files Online (Free, No Upload)",
    description:
      "Open and extract .gz and .gzip files in your browser. Plain GZ and tar.gz both supported. No install, no upload. Updated 2026.",
    url: `${APP_URL}/blog/how-to-open-gz-files-online`,
    type: "article",
    publishedTime: "2026-08-23",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open GZ Files Online (Free, No Upload)",
    description:
      "Open .gz and .gzip files in your browser. Works for plain GZ and tar.gz archives. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-23";
const POST_DATE_FORMATTED = "August 23, 2026";
const POST_URL = `${APP_URL}/blog/how-to-open-gz-files-online`;
const POST_TITLE = "How to Open GZ Files Online (Free, No Upload) [2026]";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to open and extract .gz and .gzip files online without installing anything. Covers the browser method, the gunzip command, Windows tools, and the difference between .gz and .tar.gz.",
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
  keywords: ["how to open gz file", "open gz online", "gz extractor", "decompress gzip"],
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
      name: "What is a GZ file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .gz file is a file compressed with the gzip algorithm. Unlike ZIP, gzip compresses only a single file. To bundle multiple files, the convention is to first bundle them with tar (creating a .tar), then compress with gzip, producing a .tar.gz. A plain .gz is most common for single compressed files like database dumps, log files, and downloads from Linux package repositories.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between .gz and .tar.gz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: ".gz compresses exactly one file. .tar.gz (or .tgz) is a tar archive of multiple files that has then been gzip-compressed. When you decompress a .tar.gz you get a .tar file with a folder inside. When you decompress a plain .gz you get one file back. The SammaPix GZ opener handles both in a single step.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a .gz file on Windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows has no native gz support. Options: use the SammaPix GZ opener in your browser (no install, no upload); install 7-Zip (right-click, 7-Zip, Extract here); or install Git for Windows which bundles gunzip. The browser tool is fastest for a one-off file.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a .gz file on Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double-click the .gz in Finder and Archive Utility decompresses it. For tar.gz, double-click extracts the full folder. From Terminal: gunzip file.gz to decompress a plain gz, or tar -xzf file.tar.gz to unpack a tar.gz. The browser tool works on Mac too and is handy when you only want to preview or grab one file.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a .gz file without downloading the whole thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you already have the file on disk, the browser tool reads it locally with no upload and shows you the contents immediately. If the file is remote (e.g. a URL), you need to download it first. gzip does not support random-access seeking, so you cannot preview the middle of a gz without reading the full stream from the beginning.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to open a GZ file online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety depends on the tool. Many online services upload your file to their servers, which matters for database dumps and log files that may contain personal or business-sensitive data. The SammaPix GZ opener processes everything in your browser using WebAssembly, so your file never leaves your device.",
      },
    },
  ],
};

export default function HowToOpenGzFilesPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-open-gz-files-online"
        description=".gz files are the standard compression format on Linux and the tool of choice for log archives, database dumps, and source releases. This guide shows how to open them instantly in your browser, plus the gunzip command and Windows options."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "what-is-gz", title: "What a GZ file actually is" },
          { id: "gz-vs-targz", title: "GZ vs tar.gz: the key difference" },
          { id: "method-comparison", title: "Ways to open a GZ, compared" },
          { id: "method-1-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "method-2-terminal", title: "Method 2: Terminal (Linux and Mac)" },
          { id: "method-3-windows", title: "Method 3: Windows options" },
          { id: "common-gz-files", title: "Common GZ file types and what to do with them" },
          { id: "errors", title: "Common errors and fixes" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A .gz file is a single file compressed with gzip. It is not a container for multiple files.",
          "A .tar.gz bundles many files with tar, then compresses the bundle with gzip.",
          "Fastest no-install method: SammaPix GZ opener runs in your browser, nothing uploaded.",
          "On Linux and Mac: gunzip file.gz decompresses in place, tar -xzf file.tar.gz unpacks.",
          "Windows has no native gz support. Use the browser tool, 7-Zip, or Git Bash.",
          "GZ is not encrypted. Any tool can decompress it. For privacy, avoid uploading to remote services.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Developer looking at code on a laptop"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              GZ files are the standard compression format in Linux and server environments
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your GZ right now, nothing to install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix GZ File Opener runs in your browser. Drop your .gz or .gzip, see the contents,
              and download the files. Works for plain GZ and tar.gz archives. Your file never leaves
              your device.
            </p>
            <Link
              href="/tools/open-gz"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open GZ File, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            The fastest way to open a .gz file without installing anything is the{" "}
            <Link href="/tools/open-gz" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix GZ File Opener
            </Link>
            : drop your file in the browser tab, and you get the extracted contents immediately. Works for both plain .gz files and .tar.gz archives. Nothing is uploaded. On Linux or Mac you can also run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#1E1E1E] rounded">gunzip file.gz</code> in the terminal.
          </p>
        </div>

        <h2 id="what-is-gz" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What a GZ file actually is
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">.gz file</strong> is produced by the gzip compression algorithm, developed in the early 1990s as a free alternative to the compress utility on Unix systems. Gzip applies the DEFLATE algorithm (the same one used inside ZIP files) and typically achieves 60-70% size reduction on text-based files like logs, HTML, JSON, and SQL dumps.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An important distinction: <strong className="text-gray-800 dark:text-[#E5E5E5]">gzip compresses exactly one file</strong>. It is not a container format. If you want to compress a folder, you first bundle it with tar to create a single .tar file, then compress that with gzip. The result is the familiar .tar.gz (also called .tgz). A plain .gz is most common for single files: a database dump, a large log file, or a compressed HTML page served by a web server.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You encounter .gz files constantly in server and sysadmin work: nginx and Apache log rotation produces .gz files, database backup scripts create .sql.gz dumps, and Linux package repositories distribute packages as .deb.gz or within .tar.gz source archives.
        </p>

        <h2 id="gz-vs-targz" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          GZ vs tar.gz: the key difference
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Extension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it contains</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">After decompression</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.gz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One compressed file</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The original single file</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.gz / .tgz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Compressed tar bundle (many files)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A folder with all files</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.xz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Compressed tar bundle (xz/LZMA2)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A folder with all files</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.bz2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Compressed tar bundle (bzip2)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A folder with all files</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ways to open a GZ, compared
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
                  <Link href="/tools/open-gz" className="text-[#0EA5E9] hover:underline">SammaPix online</Link>
                </td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">gunzip / tar command</td>
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Mac double-click</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="method-1-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix GZ File Opener)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/open-gz" className="text-[#0EA5E9] hover:underline">SammaPix GZ File Opener</Link>{" "}
          reads your .gz or .gzip file in the browser using libarchive compiled to WebAssembly. It decompresses the archive, lists all the contents, and lets you download individual files or the whole extraction as ZIP. Nothing is sent to a server, which matters when the file is a database dump or a log containing user data.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/open-gz</strong> in any modern browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your file.</strong> Drag a .gz or .gzip onto the drop zone.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse and download.</strong> For tar.gz, you see the full file tree. For plain gz, the single extracted file downloads automatically.
          </li>
        </ol>

        <div data-tts-skip className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open a GZ with zero install</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop the file, see the contents, download what you need. 100% in your browser, nothing uploaded.
          </p>
          <Link
            href="/tools/open-gz"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open GZ File, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="method-2-terminal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Terminal (Linux and Mac)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both macOS and every Linux distribution include gunzip and tar by default.
        </p>
        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">{`# Decompress a plain .gz file (removes the .gz, leaves the original file)
gunzip file.gz

# Decompress but keep the original .gz
gunzip -k file.gz

# Extract a tar.gz archive (one step)
tar -xzf archive.tar.gz

# Extract to a specific folder
tar -xzf archive.tar.gz -C ~/Desktop/extracted/

# List contents of a tar.gz without extracting
tar -tzf archive.tar.gz

# Compress a file with gzip
gzip filename`}</pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">gunzip</code> command is the most direct. It decompresses in place, deleting the .gz file and leaving the original. Use <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">-k</code> to keep both. For tar.gz the <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xzf</code> command handles both decompression and extraction in one step.
        </p>

        <h2 id="method-3-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Windows options
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Windows has no native GZ support. Your options:
        </p>
        <ul className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browser tool (recommended):</strong>{" "}
            <Link href="/tools/open-gz" className="text-[#0EA5E9] hover:underline">sammapix.com/tools/open-gz</Link> handles both plain .gz and .tar.gz with no install.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">7-Zip:</strong> Right-click the .gz and choose 7-Zip, then Extract here. For a tar.gz this creates a .tar first; right-click that .tar and extract again to reach the actual files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Git Bash / WSL:</strong> If you have Git for Windows or WSL installed, you have a terminal with gunzip and tar available. Run the same commands as on Linux.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Windows 11 tar command:</strong> The Windows 11 built-in tar supports .tar.gz: run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xzf file.tar.gz</code> in Command Prompt. Plain .gz files are not supported by the Windows tar.
          </li>
        </ul>

        <h2 id="common-gz-files" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common GZ file types and what to do with them
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Log files (.log.gz)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Linux log rotation compresses old logs as .gz to save disk space. To read them: decompress with gunzip first, then open the resulting .log in any text editor or run <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">zcat logfile.log.gz</code> to print to the terminal without saving.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Database dumps (.sql.gz)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          mysqldump and pg_dump commonly output .sql.gz. To restore: <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">gunzip -c backup.sql.gz | mysql -u root -p dbname</code>. The browser tool is useful to peek at the SQL without restoring.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Source code releases (.tar.gz)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          GitHub, GitLab, and most open-source projects offer .tar.gz releases. Extract with <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xzf</code> or the browser tool.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Compressed web assets</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Nginx and Apache serve pre-compressed .gz files to browsers that support gzip (which is essentially all of them). These are not meant to be manually opened; the browser decompresses them on the fly.
        </p>

        <div data-tts-skip className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Also working with XZ or TAR archives?</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix has dedicated openers for each format. All run in your browser with no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/open-xz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-[#2A2A2A] rounded text-xs font-medium text-gray-700 dark:text-[#D4D4D4] hover:border-gray-400 dark:hover:border-[#555] transition-colors"
            >
              XZ File Opener
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
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;gzip: invalid compressed data&quot;</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The file is corrupted or the download was interrupted. Check the file size, download again from the original source, and retry.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">It extracted to a .tar, not the files</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You used a tool that only handled the gzip layer, not the tar layer. Use <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar -xzf</code> instead of plain gunzip, or the browser tool which handles both in one step.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;gunzip is not recognized&quot; on Windows</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          gunzip is a Unix utility and is not built into Windows. Install Git for Windows (which includes Git Bash with gunzip), use WSL, or use the browser tool.
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
            <Link href="/tools/open-gz" className="text-xs text-[#0EA5E9] hover:underline">GZ File Opener</Link>
            <Link href="/tools/open-xz" className="text-xs text-[#0EA5E9] hover:underline">XZ File Opener</Link>
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
