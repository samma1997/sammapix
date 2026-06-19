import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Open RAR Files on Mac (5 Methods, Free)",
  description:
    "macOS cannot open RAR files natively. Here are 5 working methods: The Unarchiver, Keka, Terminal unar, SammaPix online (no install), and more. Updated 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-open-rar-files-on-mac`,
  },
  keywords: [
    "open rar mac",
    "how to open rar file on mac",
    "rar opener mac free",
    "extract rar on mac",
    "open rar without winrar mac",
    "rar extractor mac free",
    "unrar mac",
    "mac rar file open",
  ],
  openGraph: {
    title: "How to Open RAR Files on Mac (5 Methods, Free)",
    description:
      "macOS does not open RAR files natively. 5 working methods compared: The Unarchiver, Keka, Terminal, SammaPix browser tool (no install needed).",
    url: `${APP_URL}/blog/how-to-open-rar-files-on-mac`,
    type: "article",
    publishedTime: "2026-06-19",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open RAR Files on Mac (5 Methods, Free)",
    description:
      "macOS cannot open RAR natively. 5 free methods compared, including one that needs zero installation.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-19";
const POST_DATE_FORMATTED = "June 19, 2026";
const POST_URL = `${APP_URL}/blog/how-to-open-rar-files-on-mac`;
const POST_TITLE = "How to Open RAR Files on Mac (5 Methods, Free)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "macOS does not include a built-in RAR extractor. This guide covers 5 free methods to open RAR files on Mac: The Unarchiver, Keka, Terminal unar, SammaPix browser tool, and Archive Utility limitations. No email or payment required for any of these methods.",
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
    "open rar mac",
    "how to open rar file on mac",
    "rar opener mac free",
    "extract rar on mac",
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
      name: "Can macOS open RAR files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. macOS Archive Utility supports ZIP, tar.gz, and a few other formats, but it does not support RAR. RAR is a proprietary format owned by RARLAB, and Apple has not licensed it for inclusion in macOS. You need a third-party app or a browser-based tool to open RAR files on a Mac.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to open a RAR file online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how the tool processes your file. SammaPix processes RAR files entirely inside your browser using WebAssembly. Your file is never uploaded to any server, so there is no privacy risk. Avoid tools that require you to upload the archive to a remote server, especially if it contains personal or sensitive files.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a password-protected RAR file on Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most RAR extraction tools support password-protected archives. In The Unarchiver, you will be prompted for the password automatically when you open the file. In Keka, the same prompt appears. With SammaPix online, a password field appears as soon as the tool detects the archive is encrypted. In Terminal, use the command: unar -password YOURPASSWORD archive.rar",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between RAR and ZIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ZIP is an open standard supported natively on every operating system, including macOS and Windows. RAR is a proprietary format that typically compresses files 5-15% smaller than ZIP and supports multi-volume archives, recovery records, and better password protection. However, because RAR requires third-party software to open, ZIP is almost always the better choice when sharing files with others.",
      },
    },
    {
      "@type": "Question",
      name: "How can I extract a RAR file on Mac without installing any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use SammaPix RAR Opener at sammapix.com/tools/unrar. It runs entirely in your browser using WebAssembly, so nothing is installed on your Mac. Open the page, drop your .rar file, and download the contents. It supports RAR4, RAR5, and password-protected archives.",
      },
    },
    {
      "@type": "Question",
      name: "What are multi-volume RAR files (.part1.rar, .part2.rar)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multi-volume RAR archives are large archives that have been split across several files. You typically see them with names like archive.part1.rar, archive.part2.rar, and so on. To extract them, you need all parts in the same folder and should open only the first part (.part1.rar). The Unarchiver and Keka handle multi-volume archives well. Browser-based tools, including SammaPix, currently do not support multi-volume RAR extraction.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Unarchiver free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Unarchiver is completely free and available on the Mac App Store. It has no paid tiers, no ads, and no usage limits. It also supports dozens of other archive formats including 7z, tar, bz2, and many legacy formats.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToOpenRarFilesOnMacPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-open-rar-files-on-mac"
        description="macOS does not open RAR files natively. Archive Utility skips them entirely. This guide covers every working free method: The Unarchiver, Keka, Terminal unar, and SammaPix in-browser (zero install needed). Pick the right one for your situation."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools"]}
        readingTime={10}
        headings={[
          { id: "why-mac-cant-open-rar", title: "Why your Mac cannot open RAR files" },
          { id: "method-comparison", title: "5 methods compared: which one is right for you?" },
          { id: "method-1-unarchiver", title: "Method 1: The Unarchiver (best all-rounder)" },
          { id: "method-2-keka", title: "Method 2: Keka (power users)" },
          { id: "method-3-sammapix", title: "Method 3: SammaPix online (no install, one-time use)" },
          { id: "method-4-terminal", title: "Method 4: Terminal with unar (developers)" },
          { id: "method-5-archive-utility", title: "Method 5: Archive Utility (does not work for RAR)" },
          { id: "password-protected-rar", title: "How to open password-protected RAR on Mac" },
          { id: "multi-volume-rar", title: "Multi-volume RAR archives: .part1.rar, .part2.rar" },
          { id: "rar-vs-zip", title: "RAR vs ZIP: when to use which" },
          { id: "after-extracting", title: "What to do after extracting: working with the files" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "macOS Archive Utility does NOT support RAR. Double-clicking a .rar file will do nothing or show an error.",
          "The Unarchiver (free, Mac App Store) is the simplest solution for most users: install once, double-click any RAR file.",
          "Keka is the best option if you also need to create archives or want more control over extraction settings.",
          "SammaPix RAR Opener runs in your browser with no installation. Best for a one-time file you received and do not want to install software for.",
          "Terminal with unar works for developers or anyone comfortable with the command line.",
          "Multi-volume RAR archives (.part1.rar, .part2.rar) require all parts in the same folder and a desktop app.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
              alt="Apple MacBook laptop open on a desk with files on screen"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              macOS looks great but has a blind spot: it cannot open RAR files without extra help
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your RAR file right now, no installation needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix RAR Opener runs entirely in your browser. Drop your .rar file, view the contents,
              and download individual files or the whole archive as ZIP. Supports RAR4, RAR5, and
              password-protected archives. Your file never leaves your Mac.
            </p>
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open RAR File, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* ── Section 1: Why Mac cannot open RAR ─────────────────────────── */}

        <h2 id="why-mac-cant-open-rar" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your Mac cannot open RAR files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you double-click a .rar file on a Mac, one of two things happens: either nothing at all, or a dialog saying the file cannot be opened. This is not a bug or a permissions issue. It is by design.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS Archive Utility, the built-in tool Apple ships with every Mac, supports ZIP, tar, gzip, bzip2, and a handful of other open formats. RAR is not one of them. RAR is a proprietary compression format created and owned by{" "}
          <a href="https://www.rarlab.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">RARLAB</a>,
          the company behind WinRAR. Because the format is proprietary, Apple would need to license it to include support in macOS. They have not done so, and probably never will.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This has been the situation since the earliest versions of macOS X. Unlike Windows, which got WinRAR widely installed over decades, macOS users typically encounter RAR only when they receive a file from someone on Windows or download something from the web that was compressed with WinRAR.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          RAR4 vs RAR5: does it matter?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          RAR has two major versions in common use. RAR4 is the older format created before WinRAR 5.0. RAR5 is the current format, introduced in 2013, with better compression and stronger encryption. Most files you download today are RAR5, but older archives may still be RAR4. The distinction matters because some tools only support one version. The methods described in this guide, including The Unarchiver, Keka, and SammaPix, all support both RAR4 and RAR5.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What about .zip files on Mac?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZIP files are a completely different story. macOS handles ZIP natively: double-click, and Archive Utility extracts it instantly. If the person who sent you the file could use ZIP instead of RAR, that would save everyone the trouble. But if you received a .rar file, you need one of the methods below.
        </p>

        {/* ── Section 2: Comparison table ────────────────────────────────── */}

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          5 methods compared: which one is right for you?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an honest breakdown of every practical method to open RAR on Mac in 2026. Read the table first, then jump to the section for your preferred method.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Installation</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Privacy / Upload</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">RAR5 + Password</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">The Unarchiver</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Mac App Store (1 click)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes / Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Keka</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">keka.io or App Store</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes / Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (website) · $3.99 (App Store)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">
                  <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix online</Link>
                </td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No upload, runs in-browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes / Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (up to 200 MB)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Terminal (unar)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Homebrew (command line)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes / Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Archive Utility (built-in)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (already installed)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Local only, no upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No / No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free (but does not work for RAR)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The short version: if you open RAR files regularly, install The Unarchiver once and forget about it. If you only need to open one RAR file right now and do not want to install anything, use{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix in your browser</Link>.
        </p>

        {/* ── Section 3: The Unarchiver ───────────────────────────────────── */}

        <h2 id="method-1-unarchiver" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: The Unarchiver (best all-rounder)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Unarchiver is the most popular free RAR extractor for Mac, with over 10 million downloads. It is available on the{" "}
          <a href="https://apps.apple.com/app/the-unarchiver/id425424353" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Mac App Store</a>{" "}
          for free with no paid tiers and no ads. Once installed, it integrates seamlessly with macOS: double-clicking any .rar file will automatically open it with The Unarchiver, just like ZIP files work natively.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: install and use The Unarchiver
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Mac App Store.</strong> Search for "The Unarchiver" or go directly to the link above. Click Get.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set as default.</strong> When you first launch The Unarchiver, it will ask which file types it should handle. Check RAR and any other formats you want. Click Associate.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Double-click your RAR file.</strong> It will extract immediately to the same folder. The Unarchiver prompts for a password if the archive is encrypted.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Done.</strong> The extracted folder appears next to the .rar file. That is the entire workflow.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Unarchiver also handles 7z, tar.gz, tar.bz2, cab, lzh, and dozens of other archive formats, including some very old formats you might encounter when accessing legacy archives. It is genuinely one of the most useful free utilities available for Mac.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Limitations
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extraction only:</strong> The Unarchiver cannot create archives. It is a one-way tool.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No preview:</strong> You cannot browse the archive contents before extracting. Everything extracts to disk immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Requires installation:</strong> If you are on a managed Mac (work or school) where you cannot install apps, you will need the browser method instead.
          </li>
        </ul>

        {/* ── Section 4: Keka ──────────────────────────────────────────────── */}

        <h2 id="method-2-keka" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Keka (power users and archive creation)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka is a more fully-featured archiving app for Mac. Unlike The Unarchiver, Keka can both create and extract archives. If you need to compress files into 7z or ZIP archives as well as extract RAR, Keka is the better choice. It is free on the{" "}
          <a href="https://www.keka.io/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Keka website</a>{" "}
          and $3.99 on the Mac App Store (the paid version supports the developer).
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: open a RAR file with Keka
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download Keka</strong> from keka.io (or the App Store). Open the .dmg and drag Keka to Applications.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open System Settings.</strong> Go to General &gt; Default applications and set Keka as the default for archive files if desired.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag your .rar file</strong> onto the Keka icon in the Dock (or in the Keka window). Keka will extract it immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Alternatively, right-click</strong> your .rar file and select Open With &gt; Keka.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka supports creating 7z, ZIP, tar.gz, tar.bz2, and tar.xz archives. If someone sends you a RAR file and you want to re-share the contents in a universally-supported format, you can extract with Keka and then re-compress as ZIP in the same app.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open a RAR file without installing anything</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SammaPix RAR Opener works entirely in your browser. Drop your .rar file, view the contents, and download what you need. Supports RAR4, RAR5, and password-protected archives. Zero install, zero upload.
          </p>
          <Link
            href="/tools/unrar"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open RAR Online, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: SammaPix ──────────────────────────────────────────── */}

        <h2 id="method-3-sammapix" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: SammaPix online (no installation, ideal for one-time use)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you received a single RAR file and you have no intention of opening RAR files regularly, installing an app just for this feels excessive. The{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix RAR Opener</Link>{" "}
          solves this exactly: open your browser, drop the file, extract what you need, close the tab. No installation, no account, no email address.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How it works technically (the privacy part)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix uses WebAssembly to run the UnRAR library directly in your browser. The .rar file you drop is read by JavaScript running locally on your Mac. It is never sent to any server, never stored, and never visible to SammaPix. This matters because many popular "online RAR extractors" upload your file to their servers for processing, which is a significant privacy risk for sensitive documents, contracts, or personal photos.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step-by-step: open a RAR file with SammaPix
        </h3>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/unrar</strong> in Safari or Chrome on your Mac.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag and drop your .rar file</strong> onto the page, or click to browse for it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter password if needed.</strong> If the archive is password-protected, a field will appear automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the file list.</strong> You will see all files inside the archive with their names and sizes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download what you need.</strong> Click individual files to download them, or click "Download all as ZIP" to get everything at once.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The free plan handles archives up to 200 MB, which covers the vast majority of RAR files. If you work with very large archives, the Pro plan removes the size limit.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When SammaPix is not the right choice
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Multi-volume archives:</strong> .part1.rar, .part2.rar style archives are not supported by the browser tool. Use The Unarchiver or Keka instead.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Very large files (&gt;200 MB on free plan):</strong> Extracting large archives in-browser can also be slower than a native app.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Regular use:</strong> If you open RAR files every week, installing The Unarchiver makes the workflow faster.
          </li>
        </ul>

        {/* ── Section 6: Terminal ──────────────────────────────────────────── */}

        <h2 id="method-4-terminal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 4: Terminal with unar (for developers and command-line users)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you prefer the command line, the <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">unar</code> command from Homebrew is an excellent option. It supports RAR4, RAR5, password protection, and many other archive formats. It is the same extraction engine that powers The Unarchiver.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Install unar via Homebrew
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you do not have Homebrew installed, get it first from{" "}
          <a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">brew.sh</a>.
          Then run:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`brew install unar`}
        </pre>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Common unar commands
        </h3>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`# Extract a RAR file
unar archive.rar

# Extract to a specific folder
unar -o ~/Desktop/extracted archive.rar

# Extract password-protected RAR
unar -password YOURPASSWORD archive.rar

# List contents without extracting
lsar archive.rar`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">lsar</code> command is particularly useful when you want to check what is inside a RAR file before committing to a full extraction.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Terminal method is ideal for batch processing. If you have a folder full of .rar files to extract, you can script this with a simple loop:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`for f in *.rar; do unar "$f"; done`}
        </pre>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Also got a .7z file?</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            If someone also sent you a .7z archive, SammaPix has a separate browser-based tool for that too. Same concept: no installation, no upload, runs locally in your browser.
          </p>
          <Link
            href="/tools/open-7z"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open 7Z Online, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 7: Archive Utility ───────────────────────────────────── */}

        <h2 id="method-5-archive-utility" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 5: Archive Utility (the built-in tool that does not work for RAR)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This section exists because many guides list Archive Utility as an option. It is not. Archive Utility is the app macOS uses when you double-click a .zip file. It lives at{" "}
          <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">/System/Library/CoreServices/Applications/Archive Utility.app</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you try to open a .rar file with Archive Utility, you will get an error saying the archive is corrupt or in an unsupported format. The file is not corrupt. Archive Utility simply does not know what to do with RAR. This is the most common point of confusion for Mac users who encounter a RAR file for the first time.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Supported by Archive Utility: .zip, .tar, .tar.gz / .tgz, .tar.bz2, .tar.xz, .gz, .bz2. Not supported: .rar, .7z, .cab, .ace, and most other third-party formats.
        </p>

        {/* ── Section 8: Password protected RAR ───────────────────────────── */}

        <h2 id="password-protected-rar" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open a password-protected RAR file on Mac
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All the methods above support password-protected RAR archives. Here is what happens with each:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The Unarchiver
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A dialog will appear asking for the password. Enter it and click OK. The archive will extract normally. If the password is wrong, The Unarchiver will display an error.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Keka
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keka detects encryption and prompts for the password before extracting. If you know you will frequently open archives from the same source with the same password, Keka has a password manager built in.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          SammaPix online
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an encrypted archive into the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix RAR Opener</Link>,
          a password field appears automatically. Enter the password and the tool will extract the archive. Because everything runs locally, the password is never sent anywhere.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Terminal (unar)
        </h3>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`unar -password YOURPASSWORD archive.rar`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Replace <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">YOURPASSWORD</code> with the actual password. If the password contains spaces, wrap it in quotes: <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">-password "my secret"</code>.
        </p>

        {/* ── Section 9: Multi-volume RAR ──────────────────────────────────── */}

        <h2 id="multi-volume-rar" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Multi-volume RAR archives: .part1.rar, .part2.rar
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Sometimes a large file is split into multiple RAR parts. You will see files named something like:
        </p>

        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">
{`movie.part1.rar
movie.part2.rar
movie.part3.rar`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Or older naming conventions like <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">archive.rar, archive.r00, archive.r01</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Rules for multi-volume RAR
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You need all parts.</strong> If any part is missing, extraction will fail or produce a corrupt output. Download every .part file before attempting to extract.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Put all parts in the same folder.</strong> The extractor needs to find them automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open only the first part.</strong> Double-click <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">movie.part1.rar</code> (or <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">archive.rar</code>). The Unarchiver and Keka will automatically find and process the remaining parts.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browser tools do not support this.</strong> SammaPix and other in-browser tools cannot handle multi-volume RAR archives. Use a desktop app.
          </li>
        </ul>

        {/* ── Section 10: RAR vs ZIP ───────────────────────────────────────── */}

        <h2 id="rar-vs-zip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          RAR vs ZIP: when to use which
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are the one creating archives and sending files to others, the choice of format matters. Here is what you should know:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use ZIP when:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">The recipient might be on Mac, Linux, Windows, or a mobile device. ZIP opens natively everywhere.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You are sharing files via email or cloud storage. Most services show ZIP previews inline.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">File size is not a major concern. The slight compression difference rarely matters.</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          RAR has advantages when:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You need to split a very large archive across multiple parts for easier distribution.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You need built-in error recovery records (useful for files distributed over unreliable connections).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You need stronger AES-256 encryption with filename encryption (ZIP's encryption is weaker).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">You know all recipients have WinRAR or a compatible extractor installed.</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most everyday use cases, ZIP wins on compatibility. If you received a RAR and want to convert it to ZIP for easier sharing, extract it first (with any of the methods above) and then re-compress as ZIP using Keka or macOS's built-in right-click Compress option.
        </p>

        {/* ── Section 11: After extracting ────────────────────────────────── */}

        <h2 id="after-extracting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do after extracting: working with the files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you have extracted the RAR, here are some common next steps depending on what was inside:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Images: compress before sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the RAR contained a batch of photos, you might want to compress them before sending via email or WhatsApp. The{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Image Compressor</Link>{" "}
          handles batches of images entirely in your browser, no upload needed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Images: check for hidden EXIF/GPS metadata
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photos inside a RAR often retain their original EXIF metadata, including GPS coordinates. If the images came from a camera or smartphone, they might contain location data. You can check and strip this with the{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">SammaPix EXIF Viewer</Link>{" "}
          before forwarding images to others.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          PDFs: merge multiple documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the RAR contained multiple PDFs that belong together, you can merge them into a single file with the{" "}
          <Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">SammaPix PDF Merger</Link>.
          All processing is in-browser with no server upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Need to open a .7z file instead?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you have a 7z archive (common alternative to RAR with similar compression), use the{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">SammaPix 7Z Opener</Link>.
          Same browser-based approach: no installation, no upload, works on any Mac.
        </p>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Compress the images you just extracted</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Extracted photos from a RAR and need to resize or compress them before sharing? SammaPix Compress handles batches of images in seconds, entirely in your browser.
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
              Remove EXIF / GPS data <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
