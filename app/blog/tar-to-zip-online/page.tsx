import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Convert TAR to ZIP Online Free (No Upload) [2026]",
  description:
    "Convert TAR, TAR.GZ, TGZ, TAR.BZ2, TAR.XZ to ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/tar-to-zip-online`,
  },
  keywords: [
    "tar to zip",
    "tar.gz to zip",
    "convert tar to zip",
    "tgz to zip",
    "tar to zip online",
    "tar.gz to zip online free",
    "convert tar.gz to zip",
    "tar to zip converter",
    "tar bz2 to zip",
    "tar xz to zip",
  ],
  openGraph: {
    title: "Convert TAR to ZIP Online Free (No Upload) [2026]",
    description:
      "Convert TAR, TAR.GZ, TGZ, TAR.BZ2, and TAR.XZ archives to ZIP entirely in your browser. No upload, no terminal, no 7-Zip. libarchive.wasm + JSZip run locally. Free.",
    url: `${APP_URL}/blog/tar-to-zip-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert TAR to ZIP Online Free (No Upload) [2026]",
    description:
      "TAR to ZIP conversion in your browser. Supports TAR, TAR.GZ, TGZ, TAR.BZ2, TAR.XZ. No upload, no terminal. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/tar-to-zip-online`;
const POST_TITLE = "Convert TAR to ZIP Online Free (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "TAR archives are the standard format for source code distribution, Linux backups, and npm packages — but Windows cannot open them natively. ZIP is supported by every operating system without software. This guide explains the TAR format and its compressed variants, why converting to ZIP solves compatibility problems, and how to do it entirely in your browser using libarchive.wasm and JSZip, with no file upload.",
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
    "tar to zip",
    "tar.gz to zip",
    "convert tar to zip",
    "tgz to zip",
    "tar to zip online",
    "tar bz2 to zip",
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
  name: "How to Convert TAR to ZIP Online Without Uploading",
  description:
    "Convert a TAR, TAR.GZ, TGZ, TAR.BZ2, or TAR.XZ archive to a universally compatible ZIP in your browser — no upload, no terminal, no software install. Uses libarchive.wasm to extract and JSZip to repackage.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix TAR to ZIP (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the TAR to ZIP tool",
      text: "Go to sammapix.com/tools/tar-to-zip in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your TAR file onto the tool",
      text: "Drag your .tar, .tar.gz, .tgz, .tar.bz2, or .tar.xz file onto the dropzone or click to browse for it. The file is read locally by your browser via the File API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Wait for extraction and repackaging",
      text: "libarchive.wasm extracts the TAR archive (and decompresses gzip, bzip2, or xz compression if present) entirely in your browser. JSZip then repackages all extracted files into a single ZIP archive, preserving the folder structure.",
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
      name: "What TAR formats does this tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SammaPix TAR to ZIP tool supports all common TAR variants: .tar (uncompressed), .tar.gz and .tgz (gzip-compressed), .tar.bz2 (bzip2-compressed), and .tar.xz (xz/LZMA-compressed). libarchive.wasm automatically detects the compression type and handles decompression before repackaging as ZIP. You do not need to specify the format — just drop the file.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't Windows open TAR files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TAR is a Unix archive format with roots in magnetic tape storage (Tape ARchive) from the 1970s. It was designed for Unix/Linux environments and has never been part of the Windows file system or File Explorer. Windows 10 and 11 added native support for ZIP, RAR (Windows 11), and a few other formats, but TAR is not among them. To open a TAR file on Windows without third-party software, you need to convert it to ZIP first — or use WSL, 7-Zip, or Windows Terminal with tar.exe (available since Windows 10 build 17063).",
      },
    },
    {
      "@type": "Question",
      name: "Does converting TAR to ZIP preserve the folder structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. libarchive.wasm extracts each entry in the TAR archive along with its full path. JSZip recreates the same folder structure inside the ZIP output. If your TAR contains nested directories, those are preserved exactly in the resulting ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Is my TAR file uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The file never leaves your device. libarchive.wasm reads and extracts the TAR archive in browser memory using the File API. JSZip assembles the ZIP output in browser memory. The resulting ZIP is downloaded via a blob URL — no network request carries your file data. You can verify this by opening your browser's Network panel (F12) and watching for outgoing requests while the tool processes your file. You will see none carrying file data.",
      },
    },
    {
      "@type": "Question",
      name: "Will the resulting ZIP be larger than the original TAR.GZ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically yes. TAR.GZ uses gzip compression applied to the entire TAR stream (solid compression), which is more efficient than ZIP's per-file DEFLATE. TAR.BZ2 and TAR.XZ are even more efficient — XZ/LZMA is particularly good at compressing source code and text. When you convert to ZIP, files are individually compressed with DEFLATE, so the resulting ZIP will usually be larger than the original compressed TAR. The file contents are identical — only the container and compression method change.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between TAR and TAR.GZ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TAR (Tape ARchive) is a pure archive format — it bundles files into a single stream but does not compress them. TAR.GZ (also written as .tgz) is a TAR archive that has been compressed with gzip. TAR.BZ2 uses bzip2 compression instead of gzip. TAR.XZ uses xz (LZMA2) compression, which produces the smallest files. The typical convention on Linux and macOS is to create a TAR archive first, then compress the whole thing — hence .tar.gz.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert a TAR file that contains symlinks or special files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "libarchive handles many special TAR entry types including symlinks, hard links, and device nodes. However, ZIP does not natively support symlinks or Unix special file types — they are a Unix-specific concept that has no ZIP equivalent. Symbolic links may be resolved and stored as regular files, or skipped, depending on the archive contents. For archives containing primarily regular files and directories (which covers the vast majority of source code archives), the conversion produces a fully functional ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum TAR file size this tool handles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial file size cap because no server is involved. The practical limit is your device's available RAM. libarchive decompresses and extracts the TAR in browser memory; JSZip assembles the ZIP in browser memory. For typical source code archives and downloads (under 500 MB uncompressed), the tool works well on any modern device. Very large archives (several GB uncompressed) may exhaust browser memory on low-RAM devices — use 7-Zip on the desktop for those.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TarToZipOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="tar-to-zip-online"
        description="TAR archives are the backbone of Linux and macOS software distribution — but Windows cannot open them without installing extra software. ZIP opens natively everywhere. Here is how to convert any TAR, TAR.GZ, TGZ, TAR.BZ2, or TAR.XZ to ZIP in your browser in under a minute, with no file upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-a-tar-file", title: "What is a TAR file? The Unix archive format explained" },
          { id: "tar-variants", title: "TAR variants: .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz" },
          { id: "why-convert-to-zip", title: "Why convert TAR to ZIP: the compatibility case" },
          { id: "tar-vs-zip-comparison", title: "TAR vs ZIP: a technical comparison" },
          { id: "how-browser-conversion-works", title: "How browser-based TAR to ZIP conversion works" },
          { id: "step-by-step", title: "How to convert TAR to ZIP online, step by step" },
          { id: "what-is-preserved", title: "What is preserved and what is not" },
          { id: "comparison-table", title: "Browser-based vs desktop apps: honest comparison" },
          { id: "related-tools", title: "Other archive tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "TAR (Tape ARchive) is the standard archive format on Linux and macOS. Compressed variants include .tar.gz, .tgz, .tar.bz2, and .tar.xz.",
          "Windows does not open TAR files natively — even Windows 11. ZIP is supported by every operating system without extra software.",
          "SammaPix TAR to ZIP converts all TAR variants to ZIP in your browser using libarchive.wasm (extraction and decompression) and JSZip (repackaging).",
          "Your file never leaves your device — no upload, verifiable with DevTools.",
          "The resulting ZIP will be larger than the original compressed TAR — LZMA2 and gzip are more efficient than ZIP's DEFLATE. Contents are identical.",
          "Folder structure and filenames are fully preserved. Symlinks may not transfer 1:1 to ZIP (ZIP has no native symlink support).",
          "No artificial file size limit — practical limit is your device RAM.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Terminal window showing archive commands, representing the challenge of opening TAR files on Windows without a command line or extra software."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              TAR is the default archive format on Linux and macOS. Converting to ZIP makes the contents accessible on Windows — natively, no software needed.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert your TAR archive to ZIP right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix TAR to ZIP supports .tar, .tar.gz, .tgz, .tar.bz2, and .tar.xz — all converted in your browser via
              libarchive.wasm and JSZip. No terminal, no 7-Zip, no signup. Your file never leaves your device.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/tar-to-zip"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open TAR to ZIP, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/convert-tar-to-zip-no-upload"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                How to convert without software <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/7z-to-zip"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                7Z to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is a TAR file ────────────────────────────────── */}

        <h2 id="what-is-a-tar-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a TAR file? The Unix archive format explained
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You receive a .tar.gz file from a developer, a Linux system, or an open-source project. On Windows, you try to open it. File Explorer does not recognize it. Your antivirus flags it as unknown. Even Windows 11, which added native ZIP and RAR support, cannot open a TAR file out of the box.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TAR stands for Tape ARchive. The format was created in 1979 for the Unix operating system as a way to bundle multiple files together for sequential writing to magnetic tape. The design reflects its origins: TAR is a pure archive format that concatenates files into a single stream with a header for each entry. It does not perform compression on its own — compression is handled by a separate utility layered on top.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Despite its age, TAR is the dominant archive format in the Unix/Linux/macOS ecosystem. Every major Linux package manager, virtually every open-source project, and most CI/CD pipelines use TAR archives. npm, one of the world&apos;s largest package registries, stores and distributes packages as .tgz (tar.gz) files. When you run <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">npm install</code>, you are downloading TAR archives.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The problem is platform compatibility. TAR is a Unix-native format. Windows has historically had no built-in support for it, and while Windows 10 (build 17063) added a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">tar.exe</code> command to the command line, there is still no GUI support in File Explorer. For Windows users who receive a TAR from a developer, converting it to ZIP is often the simplest solution.
        </p>

        {/* ── Section 2: TAR variants ──────────────────────────────────────── */}

        <h2 id="tar-variants" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          TAR variants: .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The TAR format itself does no compression. For distribution and storage, TAR archives are typically compressed with a separate utility. Here are the variants you will encounter:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Extension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Compression</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common use</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Compression ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None. Pure archive, no compression.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Docker layers, system backups where compression happens separately.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1:1 (no reduction).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.gz / .tgz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">gzip. Fast compression, widely supported. DEFLATE algorithm.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">npm packages, open-source source releases, Python packages (PyPI).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good. Typically 60-70% of original size for source code.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.bz2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">bzip2. Better compression than gzip, slower. Burrows-Wheeler transform.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Linux kernel releases (historically), Debian package distribution.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Better than gzip. Typically 50-65% of original size.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">.tar.xz</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">xz (LZMA2). Best compression, slowest. Same algorithm as 7Z.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Modern Linux kernel releases, Arch Linux packages, Fedora RPMs.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best. Often 40-60% of original size for compressible content.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix TAR to ZIP tool handles all four variants automatically. Drop any of these file types and libarchive.wasm handles the decompression and extraction before JSZip repackages the contents as ZIP.
        </p>

        {/* ── Section 3: Why convert to ZIP ──────────────────────────────── */}

        <h2 id="why-convert-to-zip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why convert TAR to ZIP: the compatibility case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZIP has been an open standard since 1989. Because the format is open, well-documented, and has been around for decades, every major operating system has built ZIP support directly into its file manager. Here is the native TAR vs ZIP support picture across platforms in 2026:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Platform</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">ZIP</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">TAR / TAR.GZ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows 10/11 (File Explorer)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native. Double-click or right-click Extract All.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported in GUI. Terminal only (tar.exe since build 17063). Requires 7-Zip for GUI.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">macOS (Finder)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native. Archive Utility, double-click to extract.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native (Archive Utility handles .tar.gz). Terminal has full tar support.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Linux (GNOME/KDE)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native in all desktop environments.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native — TAR is a first-class format on Linux. GUI archive managers handle all variants.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iOS / iPadOS (Files app)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native since iOS 13. Tap to extract.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires a third-party app.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Android</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Native in Files by Google and most OEM file managers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively. Requires ZArchiver or similar.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The compatibility gap is clear: TAR works natively on macOS and Linux but not Windows or mobile. ZIP works everywhere. If you need to share a TAR archive with someone on Windows or iOS, converting to ZIP removes the friction entirely.
        </p>

        {/* ── Section 4: TAR vs ZIP technical ─────────────────────────────── */}

        <h2 id="tar-vs-zip-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          TAR vs ZIP: a technical comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">TAR (.tar.gz)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">ZIP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Compression strategy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Solid compression: entire archive compressed as one stream. Better ratio for collections of similar files.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Per-file compression: each file independently compressed with DEFLATE.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Random access</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sequential read only. Must decompress from the start to access a file at the end.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Random access via central directory. Can extract a single file without reading the whole archive.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unix permissions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Stored and preserved. TAR tracks owner, group, permissions, and timestamps.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No native Unix permission support. Some ZIP extensions add them, not universally read.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Symlinks</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported natively.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not natively supported. Some tools add them as extensions.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Cross-platform native support</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Linux and macOS only (natively in GUI).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Windows, macOS, Linux, iOS, Android — all natively.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Password protection</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported natively (sometimes done with openssl wrapper).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported (ZipCrypto and AES-256).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 5: How browser conversion works ──────────────────────── */}

        <h2 id="how-browser-conversion-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based TAR to ZIP conversion works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The conversion runs entirely in your browser using two open-source libraries compiled to WebAssembly:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the TAR file locally.</strong> The File API passes the raw bytes of the archive to a Web Worker. No data leaves your device at any point.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">libarchive.wasm decompresses and extracts the archive.</strong>{" "}
            <a href="https://github.com/libarchive/libarchive" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">libarchive</a>{" "}
            is a C library that handles dozens of archive and compression formats including TAR, gzip, bzip2, and xz. Compiled to WebAssembly, it runs in your browser at near-native speed. It automatically detects the compression type, decompresses the outer wrapper, reads each TAR entry (filename, path, raw bytes), and exposes them to JavaScript.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">JSZip assembles a new ZIP archive.</strong> Each extracted entry is added to a JSZip instance with its original path. JSZip compresses each file with DEFLATE and writes the final .zip as a Uint8Array in browser memory, preserving the full folder hierarchy.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The ZIP is offered for download.</strong> The Uint8Array is wrapped in a Blob, a temporary object URL is created, and the browser initiates a file download from memory. No network request carries your file data.
          </li>
        </ol>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert your TAR archive to ZIP in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            libarchive.wasm handles TAR, TAR.GZ, TGZ, TAR.BZ2, and TAR.XZ locally. JSZip repackages as ZIP.
            No upload, no terminal, no signup. Free.
          </p>
          <Link
            href="/tools/tar-to-zip"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open TAR to ZIP, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to convert TAR to ZIP online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/tar-to-zip</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your TAR file onto the dropzone</strong> or click to browse for it. The tool accepts .tar, .tar.gz, .tgz, .tar.bz2, and .tar.xz files. The file is read in browser memory — nothing uploads.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wait for extraction and repackaging.</strong> libarchive.wasm decompresses the outer compression layer (gzip, bzip2, or xz), reads each TAR entry, and passes the files to JSZip. A progress indicator shows the current state. For most archives under 100 MB, this completes in a few seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the ZIP file.</strong> Click Download ZIP. The file saves to your Downloads folder with the same base name as the original TAR, but with a .zip extension. The ZIP preserves the same folder structure and all file contents.
          </li>
        </ol>

        {/* ── Section 7: What is preserved ─────────────────────────────────── */}

        <h2 id="what-is-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is preserved and what is not
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is preserved
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Full folder hierarchy.</strong> All nested directories from the TAR are recreated exactly inside the ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">All filenames and extensions.</strong> File names are read from TAR entry metadata and written into ZIP entry metadata. No renaming.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File contents (bytes).</strong> The raw bytes of each file are extracted and written by JSZip without modification.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is not preserved
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Unix file permissions and ownership.</strong> TAR stores Unix file permissions (rwxr-xr-x etc.), owner UID/GID, and group. ZIP has no native equivalent for these fields — they are not transferred to the ZIP output.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Symbolic links.</strong> ZIP does not have native symlink support. Symlinks from the TAR may be resolved to their target files or skipped, depending on the archive.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Compression efficiency.</strong> The resulting ZIP will be larger than the original compressed TAR because solid TAR compression is more efficient than per-file DEFLATE. File contents are identical.
          </li>
        </ul>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs desktop apps: honest comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Desktop app (7-Zip, tar CLI)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Installation required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Download installer, complete setup.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Open in any modern browser and start immediately.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on device.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on device. No upload. Verifiable via DevTools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unix permissions preserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Some tools preserve them via ZIP extensions.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not preserved. ZIP has no native Unix permission support.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed on large archives</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Faster for very large archives — native code, disk I/O.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Near-native WASM speed. Limited by available RAM, not disk.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works on restricted computers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Only if you have install permissions.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Any browser, any computer, no install.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your TAR file stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. libarchive.wasm extracts locally, JSZip repackages as ZIP.
            Verify with DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/tar-to-zip"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open TAR to ZIP, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/convert-tar-to-zip-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Convert without software — full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other archive tools that run in your browser
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/tar-to-zip" className="text-[#6366F1] hover:underline">TAR to ZIP</Link></strong>: the tool covered in this article. Converts TAR, TAR.GZ, TGZ, TAR.BZ2, and TAR.XZ to ZIP in your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">Extract TAR.GZ</Link></strong>: extract the contents of a .tar.gz archive directly — browse files and download individually or as ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/7z-to-zip" className="text-[#6366F1] hover:underline">7Z to ZIP</Link></strong>: convert a 7Z archive to a universally compatible ZIP, entirely in your browser. See{" "}
            <Link href="/blog/7z-to-zip-online" className="text-[#6366F1] hover:underline">Convert 7Z to ZIP Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rar-to-zip" className="text-[#6366F1] hover:underline">RAR to ZIP</Link></strong>: convert a RAR archive to ZIP. Supports RAR4 and RAR5. Same no-upload approach.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Unrar</Link></strong>: extract RAR archive contents directly in your browser. Browse files, download individually or as ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link></strong>: create a ZIP archive from multiple files entirely in your browser. No upload.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your archive needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Convert TAR to ZIP, extract TAR.GZ, convert 7Z to ZIP, convert RAR to ZIP, create ZIPs — without uploading files anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/tar-to-zip" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              TAR to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/tar-gz" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Extract TAR.GZ <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/7z-to-zip" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              7Z to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/rar-to-zip" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              RAR to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/zip-creator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
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
