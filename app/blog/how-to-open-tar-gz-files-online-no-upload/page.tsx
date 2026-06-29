import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Open tar.gz Files (Windows, Mac & Online) — 2026",
  description:
    "Open and extract .tar.gz, .tgz, .tar and .gz files. The fastest no-install method (browser, no upload), plus the Windows tar command, 7-Zip, and the Mac double-click. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-open-tar-gz-files-online-no-upload` },
  keywords: [
    "how to open tar.gz",
    "open tar.gz windows",
    "extract tar.gz",
    "open tgz file",
    "untar tar.gz",
    "open gz file",
    "tar.gz extractor online",
    "open tar.gz mac",
  ],
  openGraph: {
    title: "How to Open tar.gz Files (Windows, Mac & Online)",
    description:
      "Open .tar.gz, .tgz, .tar and .gz files. Fastest no-install method (browser, no upload) plus Windows tar, 7-Zip and Mac. Updated 2026.",
    url: `${APP_URL}/blog/how-to-open-tar-gz-files-online-no-upload`,
    type: "article",
    publishedTime: "2026-06-29",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open tar.gz Files (Windows, Mac & Online)",
    description: "Open .tar.gz files with no install, plus Windows, Mac and Terminal methods. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-29";
const POST_DATE_FORMATTED = "June 29, 2026";
const POST_URL = `${APP_URL}/blog/how-to-open-tar-gz-files-online-no-upload`;
const POST_TITLE = "How to Open tar.gz Files (Windows, Mac & Online)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to open and extract tar.gz files on Windows, Mac, and online with no upload. Covers the browser method, the Windows tar command and 7-Zip, the Mac double-click, and Terminal, plus the tar vs gz naming.",
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
  keywords: ["how to open tar.gz", "open tar.gz windows", "extract tar.gz", "open tgz file"],
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
      name: "How do I open a tar.gz file without installing anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix tar.gz Extractor at sammapix.com/tools/tar-gz. Drop your .tar.gz, .tgz, .tar or .gz file, view the contents, and download individual files or the whole archive as ZIP. It runs entirely in your browser, so nothing is installed and your file is never uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between tar, gz, tar.gz and tgz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "tar bundles many files into one archive without compressing them. gz (gzip) compresses a single file. tar.gz is the combination: files are bundled with tar, then the bundle is compressed with gzip. tgz is just a shorter name for the exact same tar.gz format, common on systems that limit file extensions.",
      },
    },
    {
      "@type": "Question",
      name: "Can Windows open tar.gz files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows 11 includes a command-line tar tool, so you can run 'tar -xzf file.tar.gz' in Command Prompt. There is still no simple right-click extract and no easy way to peek inside without unpacking. For a one-click experience, use 7-Zip (which needs two steps for tar.gz) or a browser tool like SammaPix.",
      },
    },
    {
      "@type": "Question",
      name: "Can macOS open tar.gz natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Double-clicking a .tar.gz in Finder extracts it with Archive Utility. The browser tool is still handy on a Mac when you only want to view the contents or grab a single file without unpacking the entire archive.",
      },
    },
    {
      "@type": "Question",
      name: "Why does 7-Zip open tar.gz in two steps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because tar.gz is two layers. 7-Zip first decompresses the gzip layer, leaving a .tar file, then you open that .tar to see the actual files. It works, it is just two clicks. Browser tools and the tar command handle both layers in one step.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to open tar.gz files online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Many online extractors upload your archive to their servers, which is risky for source code or backups. The SammaPix tar.gz Extractor processes the file entirely in your browser using WebAssembly, so it never leaves your device.",
      },
    },
  ],
};

export default function HowToOpenTarGzPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-open-tar-gz-files-online-no-upload"
        description="The .tar.gz format is everywhere in the Linux and developer world but awkward to open on Windows. This guide covers the fastest no-install method (browser, no upload), the Windows tar command and 7-Zip, the Mac double-click, and Terminal."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-targz", title: "What a tar.gz file actually is" },
          { id: "method-comparison", title: "4 ways to open tar.gz, compared" },
          { id: "method-1-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "method-2-windows", title: "Method 2: Windows (tar command & 7-Zip)" },
          { id: "method-3-mac", title: "Method 3: Mac (double-click & Terminal)" },
          { id: "method-4-terminal", title: "Method 4: Terminal (Linux / Mac)" },
          { id: "naming", title: "tar vs gz vs tar.gz vs tgz" },
          { id: "errors", title: "Common errors and fixes" },
          { id: "after", title: "After extracting" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A .tar.gz is two layers: tar bundles files, gzip compresses the bundle. .tgz is the same thing.",
          "Fastest no-install option: the SammaPix tar.gz Extractor builds and reads it in your browser with no upload.",
          "Windows 11: run tar -xzf file.tar.gz in Command Prompt. 7-Zip works too but needs two steps.",
          "macOS opens tar.gz natively. Just double-click it in Finder.",
          "On Linux/Mac Terminal: tar -xzf file.tar.gz extracts everything in one command.",
          "Many online extractors upload your file. A browser tool keeps source code and backups private.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80"
              alt="Developer terminal and code on a screen"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              tar.gz is the standard package format in the Linux and developer world
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your tar.gz right now, nothing to install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix tar.gz Extractor runs in your browser. Drop your .tar.gz, .tgz, .tar or .gz file,
              view the contents, and download individual files or the whole archive as ZIP. Your file
              never leaves your device.
            </p>
            <Link
              href="/tools/tar-gz"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open tar.gz File, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="what-is-targz" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What a tar.gz file actually is
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A .tar.gz is two formats stacked together. First, <strong className="text-gray-800 dark:text-[#E5E5E5]">tar</strong> (tape archive) bundles many files and folders into a single file, preserving the directory structure but not compressing anything. Then <strong className="text-gray-800 dark:text-[#E5E5E5]">gzip</strong> compresses that bundle into a smaller .gz file. The result, file.tar.gz, is one compressed package that unpacks back into the original folder tree.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You meet tar.gz constantly in the developer and Linux world: source code releases, npm and Python packages, server backups, Docker layers, and datasets are almost always distributed this way. If a project on GitHub offers a download, it is usually a .tar.gz or a .zip.
        </p>

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          4 ways to open tar.gz, compared
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">One step?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium"><Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">SammaPix online</Link></td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No upload</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows tar command</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in (Win 11)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">7-Zip (Windows)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Desktop app</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (two steps)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Mac double-click / Terminal</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="method-1-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix tar.gz Extractor)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">SammaPix tar.gz Extractor</Link>{" "}
          reads the archive directly in your browser with the libarchive engine compiled to WebAssembly. It handles both layers (gzip and tar) in one step, shows you the file list, and lets you download a single file or the whole thing as a ZIP. Nothing is uploaded, so it is safe for source code and backups, and it works on Windows and Chromebooks where there is no easy native option.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/tar-gz</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your file.</strong> Drag a .tar.gz, .tgz, .tar or .gz onto the page.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the contents</strong> and download what you need, or export everything as ZIP.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open a tar.gz with zero install</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Drop the file, view the contents, download what you need. 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/tar-gz" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open tar.gz Online, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="method-2-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Windows (tar command and 7-Zip)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Windows 11 ships with the <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">tar</code> command. Open Command Prompt or PowerShell in the folder with your file and run:
        </p>
        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">{`tar -xzf file.tar.gz`}</pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The flags mean: x extract, z gunzip, f file. To extract into a specific folder, add <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">-C foldername</code>.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Prefer a GUI? Install <a href="https://www.7-zip.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">7-Zip</a>. Right-click the .tar.gz, choose 7-Zip then Extract here, which gives you a .tar file. Right-click that .tar and extract again to reach the actual files. It works but takes two passes, which is why the one-step browser or tar command is often simpler.
        </p>

        <h2 id="method-3-mac" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Mac (double-click and Terminal)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On macOS this is easy: double-click the .tar.gz in Finder and Archive Utility unpacks it into a folder next to the file. No app to install. If you want to view the contents or grab one file without unpacking everything, the browser tool is the quicker route. For the command line, see Method 4.
        </p>

        <h2 id="method-4-terminal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 4: Terminal (Linux and Mac)
        </h2>
        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">{`# Extract everything
tar -xzf file.tar.gz

# Extract into a specific folder
tar -xzf file.tar.gz -C ~/Desktop/extracted

# List contents without extracting
tar -tzf file.tar.gz

# Extract a plain .tar (no gzip)
tar -xf file.tar

# Decompress a single .gz file
gunzip file.gz`}</pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The same commands work on Linux and macOS. Use <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">-tzf</code> to peek inside before committing to a full extract.
        </p>

        <h2 id="naming" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          tar vs gz vs tar.gz vs tgz
        </h2>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">.tar</strong> — a bundle of files, not compressed.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">.gz</strong> — a single gzip-compressed file (often one .tar, but can be any file).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">.tar.gz</strong> — a tar bundle compressed with gzip. The common case.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">.tgz</strong> — exactly the same as .tar.gz, just a shorter extension.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You will also see .tar.bz2 (bzip2) and .tar.xz (xz), which work the same way with stronger compression. The{" "}
          <Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">SammaPix extractor</Link> handles all of these.
        </p>

        <h2 id="errors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common errors and fixes
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;tar is not recognized&quot; on Windows</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">You are likely on Windows 10, which does not include tar. Use 7-Zip or the browser tool instead, or upgrade to Windows 11.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">It only extracted a .tar, not the files</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">That is the two-step 7-Zip behaviour. Open the resulting .tar to reach the real files, or use a one-step method.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">&quot;Unexpected end of archive&quot;</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">The download was incomplete or corrupted. Download the file again and retry.</p>

        <h2 id="after" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          After extracting
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Got images out of the archive? Compress them with the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>, or strip location data with the{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link>. Need to bundle files back up to share? Use the{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link>. And if you receive a .rar or .7z instead, the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">RAR opener</Link> and{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">7z opener</Link> work the same way.
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
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
