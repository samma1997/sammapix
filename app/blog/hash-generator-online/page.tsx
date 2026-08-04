import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Hash Generator Online — MD5, SHA, SHA-512 Free [2026]",
  description:
    "Generate MD5, SHA-256, SHA-512 hashes. No upload, no account. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/hash-generator-online`,
  },
  keywords: [
    "hash generator",
    "hash generator online",
    "sha256 generator",
    "md5 hash online",
    "file hash online",
    "sha512 generator",
    "sha1 generator",
    "checksum generator",
    "md5 checksum online",
    "sha256 checksum",
    "file checksum no upload",
    "browser hash tool",
  ],
  openGraph: {
    title: "Hash Generator Online — MD5, SHA, SHA-512 Free [2026]",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384, or SHA-512 hashes from text or a file in your browser. No upload, no server, no account. Web Crypto API. Free.",
    url: `${APP_URL}/blog/hash-generator-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Hash Generator Online — MD5, SHA-256, SHA-512 [2026]",
    description:
      "Hash text or files with MD5, SHA-1, SHA-256, SHA-384, SHA-512 in your browser. No upload. Web Crypto API runs locally. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/hash-generator-online`;
const POST_TITLE = "Free Hash Generator Online — MD5, SHA-256, SHA-512 from Text or File [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A hash generator turns any text or file into a fixed-length fingerprint using a cryptographic algorithm. This guide explains what hashes are, when to use MD5 vs SHA-256 vs SHA-512, how to verify a file download using its published checksum, the difference between hashing text and hashing a file, and why doing it in-browser protects your data compared to uploading to a server.",
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
    "hash generator online",
    "sha256 generator",
    "md5 hash online",
    "file hash checksum",
    "sha512 generator",
    "browser hash no upload",
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
  name: "How to Generate a Hash Online from Text or a File",
  description:
    "Generate an MD5, SHA-1, SHA-256, SHA-384, or SHA-512 hash from any text string or file entirely in your browser using the SammaPix Hash Generator. No file is ever uploaded. The hash is computed locally using the Web Crypto API.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Hash Generator (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Hash Generator",
      text: "Go to sammapix.com/tools/hash-generator in any modern browser. No account, no extension, no plugin required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose text or file mode",
      text: "Select the Text tab to hash a typed or pasted string. Select the File tab to hash a file from your device — the file is read in-browser and never uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select your algorithm",
      text: "Choose MD5, SHA-1, SHA-256, SHA-384, or SHA-512 from the algorithm selector. SHA-256 is the best default for integrity verification. Avoid MD5 and SHA-1 for security-critical use.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy the hash",
      text: "The hash is computed instantly and displayed. Click the copy button to copy it to your clipboard. Compare it to the hash published by the file source to verify integrity.",
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
      name: "What is a hash and what is it used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hash (or checksum) is a fixed-length string produced by running data through a cryptographic algorithm. The same input always produces the same output. Even a one-character change in the input produces a completely different hash. Common uses include: verifying that a downloaded file has not been corrupted or tampered with (checksum), detecting duplicate files, storing passwords securely (salted hashes), and creating digital signatures. The hash cannot be reversed — you cannot reconstruct the original data from the hash alone.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between MD5, SHA-1, SHA-256, SHA-384, and SHA-512?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MD5 produces a 128-bit (32-character hex) hash. It is fast but cryptographically broken — collisions (two different inputs producing the same hash) have been demonstrated. Use it only for non-security purposes: checking file corruption, deduplication, or legacy compatibility. SHA-1 produces a 160-bit (40-character) hash. Also cryptographically broken since Google's SHAttered attack in 2017. Avoid for new security applications. SHA-256 (part of SHA-2) produces a 256-bit (64-character) hash. Cryptographically strong. The standard choice for file integrity verification, digital certificates, and blockchain. SHA-384 and SHA-512 produce 384-bit (96-character) and 512-bit (128-character) hashes respectively. Stronger than SHA-256 and used in high-security contexts. For most users verifying download integrity, SHA-256 is the correct default.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a file download using a hash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most software distribution sites publish the SHA-256 (or MD5) hash of each download alongside the download link. After downloading the file: 1. Open the Hash Generator, select the File tab, and drop your downloaded file. 2. Select the same algorithm the publisher used (usually SHA-256). 3. Copy the generated hash. 4. Compare it character-by-character to the hash published on the download page. If the hashes match exactly, the file is authentic and has not been modified in transit. If they differ by even one character, the file may be corrupted or tampered with — do not use it.",
      },
    },
    {
      "@type": "Question",
      name: "Does this hash generator upload my file to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix Hash Generator computes hashes entirely in your browser using the Web Crypto API (for SHA algorithms) and spark-md5 (for MD5). Your file is read by the browser's FileReader API and processed in local memory — it never leaves your device. You can verify this by opening browser DevTools (F12), going to the Network tab, and watching for outgoing requests while you drop a file and copy the hash. You will see no upload requests. This matters for sensitive files: source code, legal documents, financial data. Uploading these to a third-party hash server exposes them unnecessarily.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use MD5 for password storage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. MD5 should never be used for password storage. It is fast to compute (which makes brute-force attacks viable), cryptographically broken (collision attacks exist), and unsalted MD5 hashes are trivially reversible using rainbow tables available online. For password storage, use bcrypt, Argon2, or scrypt — algorithms specifically designed to be slow and resistant to GPU attacks. The right tool for checking a downloaded file's integrity is SHA-256. The right tool for hashing passwords in an application is bcrypt or Argon2, not any general-purpose hash function.",
      },
    },
    {
      "@type": "Question",
      name: "Why does hashing a file take longer than hashing text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hashing a file requires reading the entire file content and processing it through the algorithm byte by byte. A 10 MB file takes more processing time than a 10-character text string. The time scales roughly linearly with file size. SHA-512 is marginally slower than SHA-256 on most hardware. For typical use cases (verifying a 100 MB installer download), the hash computation takes one to three seconds in a modern browser. There is no practical speed difference between MD5 and SHA-256 for file sizes under 1 GB at browser speeds.",
      },
    },
    {
      "@type": "Question",
      name: "What is a hash collision and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A collision occurs when two different inputs produce the same hash output. In a perfectly secure hash function, collisions should be computationally infeasible to find. MD5 collisions have been practically demonstrated — an attacker can craft two different files that hash to the same MD5 value. SHA-1 collisions were demonstrated by Google's SHAttered project in 2017. This means an attacker could replace a legitimate file with a malicious one that produces an identical MD5 or SHA-1 hash — defeating integrity verification. SHA-256 and SHA-512 have no known practical collision attacks as of 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hash a large file (1 GB+) in the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with some caveats. The SammaPix Hash Generator reads files using streaming chunks to avoid loading the entire file into memory at once. Files up to several gigabytes can be hashed in a modern browser with sufficient RAM. The computation will take longer for larger files — a 4 GB ISO might take 30 to 90 seconds depending on your hardware. The browser tab must remain open during computation. If you need to hash very large files regularly, command-line tools (sha256sum on Linux/Mac, certutil on Windows) are faster. But for occasional use — verifying a Linux ISO download, for example — the browser tool is perfectly adequate.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HashGeneratorOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="hash-generator-online"
        description="Every software download page lists a SHA-256 or MD5 checksum next to the download link — but most people have no idea what to do with it. This guide explains what a hash is, the difference between MD5, SHA-1, SHA-256, SHA-384, and SHA-512, how to verify a file download, and how to generate any hash instantly in your browser without uploading anything."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={10}
        headings={[
          { id: "what-is-a-hash", title: "What is a hash and how does it work" },
          { id: "algorithm-comparison", title: "MD5, SHA-1, SHA-256, SHA-384, SHA-512: which to use" },
          { id: "text-vs-file", title: "Hashing text vs hashing a file" },
          { id: "verify-download", title: "How to verify a file download with a checksum" },
          { id: "security-table", title: "Algorithm security comparison table" },
          { id: "privacy-no-upload", title: "Why in-browser hashing protects your files" },
          { id: "how-to-generate", title: "How to generate a hash online, step by step" },
          { id: "use-cases", title: "Practical use cases for hash generation" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A hash is a fixed-length fingerprint computed from any input. The same input always produces the same hash. Any change to the input — even one character — produces a completely different hash.",
          "MD5 and SHA-1 are cryptographically broken and should only be used for non-security purposes like file deduplication or legacy checksum matching. Never use them for password storage.",
          "SHA-256 is the correct default for integrity verification. SHA-384 and SHA-512 are used in high-security contexts. All are supported in-browser via the Web Crypto API.",
          "The SammaPix Hash Generator computes hashes from text or files entirely in your browser. No file is ever uploaded. The Web Crypto API (SHA) and spark-md5 (MD5) run locally.",
          "To verify a download: hash the file with the same algorithm the publisher used, then compare the result character-by-character to the published checksum.",
          "Never use a general-purpose hash (MD5, SHA-256) to store passwords. Use bcrypt or Argon2 instead — they are purpose-built to be slow and GPU-resistant.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Lock and shield representing cryptographic security and hash-based file integrity verification."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A cryptographic hash turns any input into a fixed-length fingerprint. Use it to verify file integrity — not to encrypt data.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a hash from text or a file — no upload, no account
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              MD5, SHA-1, SHA-256, SHA-384, SHA-512. Hash text or drop a file. Computed entirely in your browser via the Web Crypto API. Free.
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
                href="/blog/generate-sha256-md5-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                SHA-256 and MD5 step-by-step guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/url-encode-decode"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                URL encode / decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is a hash ─────────────────────────────────────── */}

        <h2 id="what-is-a-hash" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a hash and how does it work
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A cryptographic hash function takes any input — a single character, a sentence, a 10 GB video file — and produces a fixed-length output called a hash, digest, or checksum. The output length depends on the algorithm: MD5 always produces 32 hexadecimal characters, SHA-256 always produces 64 hexadecimal characters, regardless of whether the input is one byte or one gigabyte.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two properties make hashes useful. First, determinism: the same input always produces the same hash. Run SHA-256 on the word <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello</code> a million times and you get the same 64-character string every time. Second, the avalanche effect: changing even one bit of input produces a completely different hash. The SHA-256 of <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Hello</code> (capital H) share no visible similarity at all.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Hashes are one-way: you cannot reverse the process. Given a SHA-256 hash, there is no mathematical operation to reconstruct the original input. This is fundamentally different from encryption, which is two-way by design. A hash is a fingerprint — useful for proving a file is authentic, not for hiding and later revealing data.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The mathematical foundation is a compression function that mixes input bits through multiple rounds of bitwise operations, modular additions, and permutations. The SHA-2 family (SHA-256, SHA-384, SHA-512) was designed by the NSA and standardized by NIST. The Web Crypto API — built into every modern browser — implements SHA-256, SHA-384, and SHA-512 natively, with hardware acceleration on supported devices.
        </p>

        {/* ── Section 2: Algorithm comparison ──────────────────────────────── */}

        <h2 id="algorithm-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          MD5, SHA-1, SHA-256, SHA-384, SHA-512: which to use
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all hash algorithms are equal. The right choice depends on whether you need cryptographic security or just fast deduplication. Here is the practical breakdown:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">MD5</strong> was designed in 1991 and was the dominant checksum algorithm for decades. It produces a 128-bit (32 hex character) hash and is extremely fast to compute. The problem: MD5 is cryptographically broken. Collision attacks have been demonstrated practically — two different files can be crafted to produce the same MD5 hash. Use MD5 only when the source you are comparing to uses MD5 (legacy compatibility) or for deduplication where security is irrelevant. Never use MD5 to store passwords or verify untrusted files in high-stakes contexts.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">SHA-1</strong> produces a 160-bit (40 hex character) hash. Also cryptographically broken since Google&apos;s SHAttered attack in 2017, which demonstrated a practical SHA-1 collision. Still found on older software sites and legacy systems. Avoid for any new security-critical use.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">SHA-256</strong> produces a 256-bit (64 hex character) hash. Part of the SHA-2 family, designed by the NSA, standardized by NIST. No known practical attacks as of 2026. This is the correct default for verifying file downloads, generating checksums for software releases, and any integrity verification use case. Used in TLS certificates, Bitcoin, code signing, and most modern security protocols.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">SHA-384</strong> and <strong className="text-gray-800 dark:text-[#E5E5E5]">SHA-512</strong> produce 384-bit (96 character) and 512-bit (128 character) hashes respectively. They are truncated variants of the same underlying SHA-512 computation. Marginally stronger than SHA-256, used in government, financial, and high-security contexts that mandate larger digest sizes. For most users, SHA-256 is more than sufficient. SHA-512 is faster than SHA-256 on 64-bit hardware due to how the underlying arithmetic maps to CPU word sizes.
        </p>

        {/* ── Section 3: Text vs file ───────────────────────────────────────── */}

        <h2 id="text-vs-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Hashing text vs hashing a file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you hash a text string, the hash function processes the raw bytes of that string. This means character encoding matters: the UTF-8 representation of <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello</code> hashes differently than the UTF-16 representation of the same characters. Most web-based hash tools (including this one) use UTF-8 encoding, which is the universal standard for text on the web.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Trailing spaces, newlines, and invisible characters change the hash. If you paste text from a document and the hash does not match an expected value, check for a trailing newline or carriage return at the end of your pasted content. Hash generators typically trim or preserve trailing whitespace differently — something to keep in mind when comparing results across tools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you hash a file, the hash function processes the file&apos;s raw binary content. Every byte matters, including metadata embedded in certain formats. A JPEG image with different EXIF data will produce a different hash than an otherwise identical JPEG with the EXIF stripped — even if the visual content is pixel-identical. This is why hash-based file deduplication tools check raw binary equality, not visual similarity.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For large files (installers, ISO images, archive files), file hashing is the primary use case. The hash is computed once, published by the developer, and users verify it after downloading. This protects against both accidental corruption during download and malicious file replacement.
        </p>

        {/* ── Section 4: Verify a download ─────────────────────────────────── */}

        <h2 id="verify-download" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify a file download with a checksum
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When a software project publishes a download, it typically lists the SHA-256 hash of that file on the download page. The verification process is straightforward:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Find the published hash.</strong> Look for a string labeled SHA-256, SHA256SUM, MD5, or similar next to or near the download link. Common formats: a 64-character hex string for SHA-256, or a 32-character hex string for MD5. Some projects link to a separate <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SHA256SUMS</code> file listing hashes for all their downloads.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the file.</strong> Save it to your device as you normally would.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Hash Generator.</strong> Go to <Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">sammapix.com/tools/hash-generator</Link>, select the File tab, and drop your downloaded file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the correct algorithm.</strong> If the publisher provided a SHA-256 hash, select SHA-256. If they provided MD5, select MD5. The algorithm must match.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Compare the hashes.</strong> Copy the generated hash and compare it character-by-character to the published hash. They must be identical. A difference of even one character means the file is different from what the publisher originally uploaded — either corrupted during download or tampered with.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Practical examples: Ubuntu publishes SHA-256 hashes for every ISO image on their release page. Wireshark, VLC, and most open-source projects do the same. Python, Node.js, and other runtime installers list checksums on their download pages. If a project does not publish hashes and you are installing software that runs with elevated privileges, that is a warning sign about the project&apos;s security hygiene.
        </p>

        {/* ── Section 5: Security comparison table ─────────────────────────── */}

        <h2 id="security-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Algorithm security and output comparison table
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Algorithm</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output length</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Security status</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">When to use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">MD5</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">128-bit (32 hex chars)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Broken — collisions demonstrated</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Legacy compatibility, deduplication, non-security checksums only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SHA-1</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">160-bit (40 hex chars)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Broken — SHAttered attack (2017)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Legacy systems only. Avoid for new use cases.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SHA-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">256-bit (64 hex chars)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Secure — recommended default</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File integrity, software distribution, digital signatures, TLS, Bitcoin</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SHA-384</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">384-bit (96 hex chars)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Secure</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">High-security applications, HMAC, SRI (Subresource Integrity)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SHA-512</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">512-bit (128 hex chars)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Secure — faster on 64-bit hardware</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Government, financial, high-security, maximum collision resistance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For everyday use — verifying an ISO download, checking that a file arrived intact, or generating a checksum for a file you share — SHA-256 is the correct choice. It is universally supported, has no known practical attacks, and is the standard that most software projects use for published checksums.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a SHA-256 hash from a file or text — no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            MD5, SHA-1, SHA-256, SHA-384, SHA-512. Hash text or drop a file. Computed locally in your browser. No server, no account.
          </p>
          <Link
            href="/tools/hash-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Hash Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Privacy, no upload ────────────────────────────────── */}

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why in-browser hashing protects your files
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most hash generator tools online require you to upload your file to their server, which computes the hash and returns it. This approach has a significant problem: your file is sent to a third-party server you do not control. For public files — a Linux ISO, a public library — this is not a concern. But consider what people routinely hash:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Legal and financial documents.</strong> Contracts, invoices, bank statements. Uploading these to verify their hash exposes them to the server operator.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Source code.</strong> Proprietary software, unreleased projects, API keys embedded in configuration files. Uploading source code to a hash tool leaks it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Database exports and backups.</strong> CSV exports, SQL dumps, user data. These should never be sent to third-party tools without explicit consent and a clear data handling policy.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Archive files with sensitive contents.</strong> A ZIP or RAR file might contain any of the above. The hash tool receives everything.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Hash Generator avoids this entirely. The Web Crypto API (for SHA-256, SHA-384, SHA-512) and spark-md5 (for MD5) run as JavaScript in your browser tab. Your file is read by the browser&apos;s FileReader API into local memory — no byte of it is transmitted to a server. The hash computation is local. The output hash is displayed locally. You can verify this with browser DevTools: open the Network tab and watch for outgoing requests while you drop a file and copy the hash. There are none carrying your file content.
        </p>

        {/* ── Section 7: How to generate step by step ───────────────────────── */}

        <h2 id="how-to-generate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to generate a hash online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Hash Generator.</strong> Go to <Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">sammapix.com/tools/hash-generator</Link> in any modern browser. No signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose Text or File mode.</strong> The Text tab lets you type or paste any string. The File tab lets you drag and drop a file from your device. The file is never uploaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the algorithm.</strong> For verifying a download, match the algorithm to what the publisher specified. For generating a new checksum, use SHA-256.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read the hash.</strong> The hash appears instantly for text. For large files, computation takes a few seconds. The result is a lowercase hexadecimal string.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy and compare.</strong> Click the copy button. Compare to the published hash if verifying a download, or store it alongside your file to verify it later.
          </li>
        </ol>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Hash a file or text — runs 100% in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Web Crypto API (SHA-256/384/512) and spark-md5 (MD5). No upload. No server. Verifiable via DevTools.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/hash-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Hash Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/generate-sha256-md5-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              SHA-256 and MD5 step-by-step guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Use cases ──────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Practical use cases for hash generation
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Hash generators are useful across a surprisingly wide range of everyday technical tasks. Here are the most common ones:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best algorithm</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Verify a software download</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SHA-256 (or match publisher)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Match the hash published on the download page. Both hashes must be identical.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Deduplicate files</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">MD5 or SHA-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same hash = identical file content. Useful for finding duplicate photos or documents.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Generate SRI for a CDN asset</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SHA-384 or SHA-512</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Subresource Integrity: the browser blocks CDN assets that do not match the hash in your HTML.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Verify a file was not modified</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SHA-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Hash the file before sending. Recipient hashes on arrival. Match = file intact.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Legacy MD5 checksum matching</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">MD5</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Older projects and some hosting providers still publish MD5 checksums. Use only to match.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Prove file existence at a point in time</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SHA-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Record hash + timestamp. Useful for basic audit trails or intellectual property documentation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: the tool covered in this article. MD5, SHA-1, SHA-256, SHA-384, SHA-512 from text or file. No upload, no account. See also: <Link href="/blog/generate-sha256-md5-online" className="text-[#6366F1] hover:underline">SHA-256 and MD5 step-by-step guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: encode or decode percent-encoded URLs in your browser. Useful for working with API endpoints, query strings, and encoded data.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode any image to Base64 for embedding in HTML, CSS, or emails. See <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">Image to Base64 guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate QR codes from URL, text, Wi-Fi, email, or vCard in your browser. No server, no expiry. See <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link></strong>: read the metadata embedded in any photo — camera settings, GPS coordinates, timestamps. Useful for checking what information is attached to files before sharing.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser-based tools for developers and privacy-conscious users</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Hash files, encode URLs, convert images — all in your browser. No upload, no server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/hash-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/url-encode-decode" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              URL Encode / Decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
