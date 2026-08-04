import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Generate a SHA-256 or MD5 Checksum Online Without Uploading [2026]",
  description:
    "Generate a SHA-256 or MD5 checksum from text or a file in your browser — no upload, no server. Step-by-step: verify a download, compare checksums, understand the difference between MD5 and SHA-256. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/generate-sha256-md5-online`,
  },
  keywords: [
    "generate sha256",
    "md5 checksum online",
    "verify file hash",
    "checksum no upload",
    "sha256 online",
    "md5 online",
    "generate sha256 checksum",
    "verify download checksum",
    "sha256 vs md5",
    "file integrity check online",
    "sha256 file checker",
    "md5 hash generator no upload",
  ],
  openGraph: {
    title: "How to Generate a SHA-256 or MD5 Checksum Online Without Uploading [2026]",
    description:
      "Generate SHA-256 or MD5 checksums from text or files in your browser. No upload, no server. Verify downloads, understand MD5 vs SHA-256, step-by-step guide. Free.",
    url: `${APP_URL}/blog/generate-sha256-md5-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate SHA-256 or MD5 Checksum Online Without Uploading [2026]",
    description:
      "SHA-256 and MD5 checksums in your browser — no upload. Verify downloads, compare hashes, understand the security difference. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/generate-sha256-md5-online`;
const POST_TITLE = "How to Generate a SHA-256 or MD5 Checksum Online Without Uploading [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "MD5 and SHA-256 are the two most common checksums published alongside software downloads. This guide explains how to generate either checksum from a file or text in your browser without uploading anything, how to verify a downloaded file's integrity by comparing hashes, the critical security differences between MD5 and SHA-256, and the practical cases where each is appropriate.",
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
    "generate sha256",
    "md5 checksum online",
    "verify file hash",
    "checksum no upload",
    "sha256 vs md5",
    "file integrity check",
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
  name: "How to Generate a SHA-256 or MD5 Checksum Without Uploading",
  description:
    "Generate a SHA-256 or MD5 checksum from a file or text string in your browser, and use it to verify a downloaded file's integrity. No file is ever uploaded. The hash is computed locally using the Web Crypto API.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Hash Generator (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the published checksum on the download page",
      text: "Look for SHA-256 or MD5 next to the download link. It will be a 64-character string (SHA-256) or a 32-character string (MD5). Some projects link to a SHA256SUMS file listing hashes for all their releases.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Download the file",
      text: "Save the installer, ISO, or archive to your device.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Open the Hash Generator and select File mode",
      text: "Go to sammapix.com/tools/hash-generator and select the File tab. Drop or select your downloaded file. The file is read locally — it is never uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Select the algorithm and generate the hash",
      text: "Choose SHA-256 (or MD5 to match the publisher). The hash is computed in your browser and displayed instantly.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compare the hashes character by character",
      text: "Copy the generated hash and compare it to the published checksum. If they match exactly, the file is authentic and intact. If they differ by even one character, the file may be corrupted or tampered with.",
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
      name: "What is the difference between MD5 and SHA-256?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MD5 produces a 128-bit (32 hex character) hash. SHA-256 produces a 256-bit (64 hex character) hash. The critical difference is security: MD5 is cryptographically broken — practical collision attacks exist, meaning two different files can be crafted to produce the same MD5 hash. SHA-256 (part of the SHA-2 family) has no known practical attacks as of 2026. For verifying that a downloaded file is authentic and unmodified, SHA-256 is the correct algorithm. MD5 is still published by some older projects for legacy reasons — use it only when the publisher has only provided an MD5 hash, not as a choice.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a file's integrity without software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based hash generator like sammapix.com/tools/hash-generator. Drop the file into the File tab, select the algorithm published on the download page (usually SHA-256), and compare the generated hash to the published checksum. No software install required. The Web Crypto API built into your browser handles the computation locally — the file is never uploaded. On the command line: 'sha256sum filename' on Linux/Mac or 'Get-FileHash filename -Algorithm SHA256' in PowerShell on Windows.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I not upload my file to verify its hash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many hash verification tools online require you to upload the file to their server. The server computes and returns the hash. The problem: your file is transmitted to a third party. For public files (Linux ISOs, open-source software), this is benign. For sensitive files — contracts, source code, medical records, database exports — uploading them to a hash tool exposes them unnecessarily. The SammaPix Hash Generator reads the file locally using the browser's FileReader API and runs the hash algorithm via Web Crypto — no byte is transmitted.",
      },
    },
    {
      "@type": "Question",
      name: "What does it mean when the hashes do not match?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hash mismatch means the file you downloaded differs from the file the publisher hashed when they created the checksum. There are two common causes: 1. Corruption during download — the file was partially written or a network error caused a garbled byte. This is the most common cause and usually results in a completely broken file. Re-download and try again. 2. Tampering — the file was replaced between the publisher's server and your machine. This is rare for reputable sources served over HTTPS, but more concerning if you downloaded from a mirror. If the hashes do not match, do not use the file. Delete it and download again from the official source.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to verify a text string, not just a file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Text tab lets you type or paste any string and generate its hash. Common uses: verifying that a configuration value or API key is exactly what you expect, comparing two text strings by their hash (avoiding character-by-character inspection), generating a deterministic identifier from a string (for non-security deduplication), or checking that a password matches its stored hash (useful when debugging authentication logic in development environments). Note that character encoding matters: the UTF-8 bytes of a string are what get hashed. A trailing newline or invisible character will produce a different hash.",
      },
    },
    {
      "@type": "Question",
      name: "How do I generate a SHA-256 hash on the command line instead?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Linux and macOS: 'sha256sum filename' outputs the SHA-256 hash followed by the filename. For MD5: 'md5sum filename' on Linux, or 'md5 filename' on macOS (note: macOS uses 'md5' not 'md5sum'). On Windows PowerShell: 'Get-FileHash filename -Algorithm SHA256' for SHA-256, or replace SHA256 with MD5. These commands operate on the local file without any upload. For large files, the command line is faster than the browser — no JavaScript overhead, and the computation uses native CPU instructions directly.",
      },
    },
    {
      "@type": "Question",
      name: "Is SHA-256 the same as SHA-2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SHA-256 is one member of the SHA-2 family. SHA-2 is a family of hash functions designed by the NSA and standardized by NIST. The family includes SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, and SHA-512/256. The numbers refer to the output size in bits. SHA-256 (256-bit output) and SHA-512 (512-bit output) are the most widely deployed. When someone says SHA-2, they usually mean SHA-256 unless they specify otherwise. SHA-3 is a separate, newer standard based on a completely different algorithm (Keccak). SHA-256 remains the dominant choice for practical use.",
      },
    },
    {
      "@type": "Question",
      name: "Can I verify a file's hash on an iPhone or Android device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix Hash Generator works in any modern browser, including Safari on iOS and Chrome on Android. Open sammapix.com/tools/hash-generator in your mobile browser, select the File tab, and use the file picker to select a file from your device or cloud storage (iCloud Drive, Google Drive, Files app). The hash is computed locally on your device. Mobile browsers support the Web Crypto API needed for SHA-256, SHA-384, and SHA-512. MD5 uses spark-md5, which is pure JavaScript and works on all platforms.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GenerateSha256Md5OnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="generate-sha256-md5-online"
        description="You downloaded an installer. The download page shows a SHA-256 or MD5 hash next to the file. Now what? This guide walks through generating a SHA-256 or MD5 checksum from a file or text string in your browser — without uploading the file anywhere — and using it to verify the download is authentic and uncorrupted."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={9}
        headings={[
          { id: "why-checksums-matter", title: "Why checksums matter for downloads" },
          { id: "md5-vs-sha256", title: "MD5 vs SHA-256: the security difference explained" },
          { id: "step-by-step-file", title: "Step-by-step: generate a checksum from a file" },
          { id: "step-by-step-text", title: "Step-by-step: generate a checksum from text" },
          { id: "verify-a-download", title: "How to verify a download checksum, in detail" },
          { id: "collision-table", title: "MD5 vs SHA-256 collision resistance comparison" },
          { id: "no-upload-why", title: "Why no-upload matters for sensitive files" },
          { id: "practical-examples", title: "Real-world examples: Ubuntu ISO, Python installer" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A checksum (hash) proves a downloaded file is identical to what the publisher originally uploaded. If the checksums match, the file arrived intact and unmodified.",
          "MD5 produces a 32-character hash. SHA-256 produces a 64-character hash. MD5 is cryptographically broken — collisions exist. SHA-256 has no known practical attacks. Use SHA-256 whenever the choice is yours.",
          "The SammaPix Hash Generator computes SHA-256 and MD5 entirely in your browser via the Web Crypto API and spark-md5. Your file is never uploaded.",
          "To verify: download the file, drop it into the File tab, select the algorithm the publisher used, and compare the generated hash to the published one. They must be identical.",
          "Generating a SHA-256 hash via the command line: 'sha256sum filename' on Linux/Mac, 'Get-FileHash filename -Algorithm SHA256' on Windows PowerShell.",
          "Never use MD5 or SHA-256 to store passwords. Use bcrypt or Argon2 instead.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A laptop showing code and a terminal window, representing cryptographic hash verification of downloaded files."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A SHA-256 checksum is the most reliable way to verify a downloaded file is authentic and has not been tampered with.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a SHA-256 or MD5 checksum — no upload, no account
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop a file or type text. MD5, SHA-1, SHA-256, SHA-384, SHA-512. Computed entirely in your browser via the Web Crypto API. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/hash-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Hash Generator, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/hash-generator-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Hash generator overview guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why checksums matter ──────────────────────────────── */}

        <h2 id="why-checksums-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why checksums matter for downloads
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you download a file, several things can go wrong between the source server and your device. A network error can corrupt bytes during transmission. A CDN mirror might serve a cached version of an old or modified file. In rare but documented cases, a compromised mirror server has served malicious software to users who had no way to know the difference.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A checksum solves this problem. The developer computes a hash of the original, correct file before publishing it. They post that hash on the download page. After you download the file, you compute the same hash locally. If your hash matches the published hash exactly, you have a mathematical guarantee that the file you downloaded is byte-for-byte identical to the one the developer hashed. Any corruption or modification — even a single flipped bit — produces a completely different hash.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters most for high-stakes downloads: operating system installers (Ubuntu, Fedora, Windows ISOs), programming language runtimes (Python, Node.js, Go), database software, security tools, and any software that runs with elevated privileges. Verifying checksums takes less than two minutes and provides meaningful protection against both accidental corruption and deliberate tampering.
        </p>

        {/* ── Section 2: MD5 vs SHA-256 ─────────────────────────────────────── */}

        <h2 id="md5-vs-sha256" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          MD5 vs SHA-256: the security difference explained
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both MD5 and SHA-256 produce a hash — a fixed-length hexadecimal string that uniquely identifies a file&apos;s content. The practical difference lies in two properties: output length and collision resistance.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">MD5</strong> was designed in 1991. It outputs 128 bits represented as 32 hexadecimal characters. In 1996, weaknesses were found in its design. By 2004, full collision attacks were demonstrated: two different inputs could be crafted to produce the same MD5 hash. By 2008, attackers had used MD5 collisions to forge SSL certificates in a real-world attack. Today, generating an MD5 collision takes seconds on modern hardware.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">SHA-256</strong> was designed by the NSA and published by NIST as part of the SHA-2 standard in 2001. It outputs 256 bits as 64 hexadecimal characters. No practical collision attacks on SHA-256 exist as of 2026. The key insight is that a 256-bit hash space makes brute-force collision finding computationally infeasible — the number of possible inputs to check before finding a collision exceeds the number of atoms in the observable universe.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical implication: if someone wanted to replace a legitimate installer with malicious software while keeping the MD5 hash the same, they could do it. The same attack against SHA-256 is not computationally feasible. This is why reputable projects have migrated from MD5 to SHA-256 for their published checksums. If you see both listed, use SHA-256. If only MD5 is available, verify it — it is still useful for detecting accidental corruption, just not for protection against deliberate tampering.
        </p>

        {/* ── Section 3: Step-by-step — file ───────────────────────────────── */}

        <h2 id="step-by-step-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step-by-step: generate a checksum from a file
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Hash Generator.</strong> Go to <Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">sammapix.com/tools/hash-generator</Link>. No account or signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the File tab.</strong> Click the File tab to switch from text input to file input.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop or select your file.</strong> Drag the file from your desktop or file manager into the drop zone, or click to open a file picker. Any file type is supported: ISO, exe, dmg, zip, rar, tar.gz, pdf, or any other format. The file is read by the browser&apos;s FileReader API and never uploaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the algorithm.</strong> Choose SHA-256 to match the most common publisher standard, or the algorithm specified on the download page (SHA-1, MD5, SHA-384, SHA-512).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wait for computation.</strong> For small files (under 10 MB), the hash appears nearly instantly. For large files (100 MB+), it may take a few seconds. The browser tab must remain open. No upload is occurring — the progress is local computation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the hash.</strong> Click the copy button. The hash is now in your clipboard as a lowercase hexadecimal string.
          </li>
        </ol>

        {/* ── Section 4: Step-by-step — text ───────────────────────────────── */}

        <h2 id="step-by-step-text" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step-by-step: generate a checksum from text
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the Text tab.</strong> The text input mode is active by default.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type or paste your string.</strong> Enter the text you want to hash. Watch for trailing spaces or newlines at the end — they are included in the hash computation and will produce a different result than the same string without them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the algorithm.</strong> SHA-256 for most use cases.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read the hash.</strong> The hash updates in real time as you type. Copy it with the copy button.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Text hashing uses UTF-8 encoding. Every character is represented by its UTF-8 byte sequence before the hash algorithm processes it. This means the same visual characters in different encodings (UTF-8 vs UTF-16) will produce different hashes. For cross-tool consistency, UTF-8 is the standard and what all browser-based tools use.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a SHA-256 or MD5 checksum — no upload, computed locally</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            File or text. SHA-256, MD5, and SHA-512. Web Crypto API. No server, no account. Verifiable via DevTools.
          </p>
          <Link
            href="/tools/hash-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Hash Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Verify a download ─────────────────────────────────── */}

        <h2 id="verify-a-download" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify a download checksum, in detail
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Finding the published checksum is sometimes the harder step. Here is where to look for different types of software:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Linux distributions (Ubuntu, Fedora, Debian).</strong> The hash is listed on the official download page alongside the ISO link. Ubuntu publishes a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SHA256SUMS</code> file with SHA-256 hashes for every release, signed with their GPG key.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Programming language runtimes (Python, Node.js, Go).</strong> The official download page (python.org, nodejs.org, go.dev) lists SHA-256 hashes for each platform binary. Some link to a separate checksums file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open-source projects on GitHub.</strong> Check the Releases page. Many maintainers attach a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">checksums.txt</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SHA256SUMS</code> file to the release assets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Desktop software (Wireshark, VLC, KeePassXC).</strong> The download page or a linked verification page lists the SHA-256 hash. KeePassXC also signs releases with GPG for additional verification.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No hash published.</strong> If a download page offers no checksum at all, that is a signal. For software you are installing with elevated privileges, consider whether you trust the source. Use checksums when they are available — they cost nothing to check.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When comparing hashes, use your browser&apos;s text search (Ctrl+F or Cmd+F) to find the published hash on the download page and copy it cleanly. Paste both hashes into a plain text document side by side for easy visual comparison, or use the comparison feature if the tool provides one. Both strings must be identical — same length, same characters, same case (most tools output lowercase hex, but some older systems use uppercase).
        </p>

        {/* ── Section 6: Collision table ────────────────────────────────────── */}

        <h2 id="collision-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          MD5 vs SHA-256 collision resistance comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Property</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">MD5</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SHA-256</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Output length</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">128-bit / 32 hex characters</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">256-bit / 64 hex characters</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Collision attacks</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Practical — seconds on modern hardware</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">None known, computationally infeasible</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Preimage attacks</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Theoretical but not practical</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Not feasible</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Still safe for deduplication?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Yes — accidental collisions are still astronomically rare</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Safe for integrity verification against an attacker?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">No — attacker can craft a collision</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Recommended for password storage?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">No — use bcrypt or Argon2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">No — use bcrypt or Argon2</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Used by Bitcoin</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Yes (double SHA-256)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Used in TLS certificates</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Deprecated and prohibited since 2017</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Yes — standard for code signing and TLS</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 7: No-upload why ──────────────────────────────────────── */}

        <h2 id="no-upload-why" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no-upload matters for sensitive files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The irony of some hash verification services is that they ask you to upload the file you want to verify for security reasons. The moment you upload the file to a third-party server, you have created exactly the kind of trust dependency that checksums are meant to eliminate. Now you need to trust that the hash service receives your file intact, processes it correctly, and does not store or log it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Web Crypto API is built into every modern browser as a secure, native implementation of SHA-256, SHA-384, and SHA-512. It is designed for exactly this kind of local cryptographic computation. There is no reason to send your file to a server to compute a hash. The browser can do it locally, faster, and with complete privacy.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Hash Generator uses <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">window.crypto.subtle.digest()</code> for SHA algorithms — a browser API call with zero network involvement. For MD5, it uses spark-md5, a pure JavaScript library that runs in your browser tab. You can open browser DevTools (F12), go to the Network tab, and observe that no network requests are made when you drop a file and copy the hash. This is verifiable without trusting any claim about privacy — you can see for yourself.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Verify with DevTools: no byte of your file leaves the browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            SHA-256 via window.crypto.subtle.digest(). MD5 via spark-md5. Both 100% local. No server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/hash-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Hash Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/hash-generator-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Hash generator full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Real-world examples ───────────────────────────────── */}

        <h2 id="practical-examples" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Real-world examples: Ubuntu ISO, Python installer
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Ubuntu ISO verification.</strong> On ubuntu.com/download, the download page links to a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SHA256SUMS</code> file. Open it — you will find a list of SHA-256 hashes for every Ubuntu variant. Find the filename matching your downloaded ISO and note its hash. Drop the ISO into the Hash Generator, select SHA-256, and compare. A 1200+ character mismatch means something went wrong. A perfect match confirms your ISO is the official release.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Python installer.</strong> On python.org/downloads, each release lists the file size and MD5 hash next to the download link. For newer releases, SHA-256 is also provided. After downloading the Windows installer or macOS pkg, drop it into the Hash Generator and compare. Python also provides GPG signatures for stronger verification — the hash check is the quick first step.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Sharing a file with a colleague.</strong> You need to send a large archive and want your colleague to be able to verify it arrived intact. Generate the SHA-256 hash of the file before sending. Send the hash separately (email, Slack, separate message). Your colleague hashes the received file and compares to your hash. If they match, the file transferred without corruption or modification.
        </p>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: the tool covered in this article. MD5, SHA-1, SHA-256, SHA-384, SHA-512 from text or file. No upload. See the full overview: <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">Hash generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: encode or decode percent-encoded URLs in your browser. Useful alongside hash verification when working with API endpoints or download URLs that contain special characters.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link></strong>: inspect metadata embedded in photo files — camera model, GPS location, timestamps. Useful for checking what information is attached to image files before sharing or submitting them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: encode text, URLs, Wi-Fi credentials, or contact cards into a QR code — entirely in your browser. See <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode images to Base64 Data URIs for embedding in HTML or CSS without separate file requests. See <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">Image to Base64 guide</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser tools for developers and privacy-conscious users</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Hash files, encode URLs, inspect metadata — no upload, no server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/hash-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/url-encode-decode" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              URL Encode / Decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              EXIF Viewer <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
