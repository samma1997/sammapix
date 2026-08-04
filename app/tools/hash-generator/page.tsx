import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import HashGeneratorClient from "@/components/tools/HashGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/hash-generator`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Hash Generator: MD5, SHA-256, SHA-512, No Upload",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes from text or a file instantly. Runs entirely in your browser — no upload, no account required.",
  keywords: [
    "hash generator",
    "sha256 generator",
    "md5 hash online",
    "file hash checksum",
    "generate sha512",
    "hash text online no upload",
    "sha1 generator",
    "sha384 generator",
    "file checksum online",
    "browser hash tool",
    "md5 checksum calculator",
    "sha256 checksum",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free Hash Generator: MD5, SHA-256, SHA-512 — No Upload",
    description:
      "Generate cryptographic hashes from text or files directly in your browser. MD5, SHA-1, SHA-256, SHA-384, SHA-512. Nothing is ever uploaded.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Hash Generator: MD5, SHA-256, SHA-512 — No Upload",
    description:
      "Hash text or files with MD5, SHA-1, SHA-256, SHA-384, SHA-512. 100% client-side — your data never leaves your browser.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Hash Generator",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text or any file. Runs 100% in your browser using the Web Crypto API and SparkMD5. Nothing is ever uploaded.",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
  },
  featureList: [
    "MD5 hash (via SparkMD5, client-side only)",
    "SHA-1, SHA-256, SHA-384, SHA-512 via native Web Crypto API",
    "Hash any text with live debounced computation",
    "Hash any file up to 500 MB without uploading",
    "Choose any combination of algorithms",
    "Uppercase / lowercase hex output toggle",
    "One-click copy for each hash result",
    "100% private — no data ever leaves your device",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my file actually uploaded when I hash it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This tool uses your browser's built-in Web Crypto API and SparkMD5 to compute hashes entirely on your device. Your file never leaves your computer and is never sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Which hash algorithm should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use SHA-256 for integrity checks, file verification, and general-purpose hashing — it is the modern standard. SHA-512 provides a larger digest and is preferred in some security contexts. SHA-1 is deprecated for security use but still common in legacy systems. MD5 is considered cryptographically broken and should only be used for legacy checksums or non-security purposes like quick file deduplication.",
      },
    },
    {
      "@type": "Question",
      name: "What is MD5 and is it secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MD5 produces a 128-bit (32 hex characters) hash. It is NOT secure for cryptographic purposes because collisions can be engineered. Use it only for checksums, quick file deduplication, or when a legacy system requires it. For any security-sensitive use case, choose SHA-256 or stronger.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a file's checksum to confirm it hasn't been tampered with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select the same algorithm the file publisher used (usually SHA-256 or MD5). Drop your downloaded file into this tool, compute the hash, and compare it character by character with the checksum the publisher provided. If they match, the file is authentic and unmodified.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hash large files like disk images or ISOs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This tool supports files up to 500 MB. The hashing is done with the Web Crypto API (SHA-*) and SparkMD5 (MD5), both of which process the raw bytes in your browser's memory without any upload. Very large files may take a few seconds; please keep the tab active during computation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a hash and encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cryptographic hash is a one-way function — it produces a fixed-length fingerprint of the input that cannot be reversed to recover the original data. Encryption is a two-way process that can be reversed with the correct key. Hashes are used for integrity verification; encryption is used for confidentiality.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Hash Generator", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to generate a file or text hash online for free",
  description:
    "Compute MD5, SHA-1, SHA-256, SHA-384 or SHA-512 hashes from text or a file in your browser — no upload, no account.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose Text or File mode",
      text: "Switch between the Text and File tabs depending on whether you want to hash a string or a local file.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select algorithms and enter input",
      text: "Tick the algorithms you need (MD5, SHA-1, SHA-256, SHA-384, SHA-512). For text mode, type or paste your string — hashes update live. For file mode, drop your file or click to browse.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy your hash",
      text: "Each result appears in a monospace row with a Copy button. Click it to copy the hash to your clipboard and use it for verification, comparison, or storage.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HashGeneratorPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── Hero split ── */}
      <div className="bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#525252] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#525252] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#525252] dark:text-[#737373]">Hash Generator</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes hg-scroll {
                    0%   { transform: translateY(0px); opacity: 1; }
                    80%  { transform: translateY(-12px); opacity: 0.3; }
                    81%  { transform: translateY(12px); opacity: 0; }
                    100% { transform: translateY(0px); opacity: 1; }
                  }
                  @keyframes hg-bar {
                    0%, 100% { opacity: 0.35; }
                    50%      { opacity: 1; }
                  }
                  .hg-hex { animation: hg-scroll 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
                  .hg-b1  { animation: hg-bar 1.8s ease-in-out 0s infinite; }
                  .hg-b2  { animation: hg-bar 1.8s ease-in-out 0.2s infinite; }
                  .hg-b3  { animation: hg-bar 1.8s ease-in-out 0.4s infinite; }
                `}</style>
                {/* Hash symbol # */}
                <text x="3" y="32" fontSize="30" fill="#6366F1" fontWeight="800" fontFamily="monospace" fillOpacity="0.15">#</text>
                <text x="3" y="32" fontSize="30" fill="#6366F1" fontWeight="800" fontFamily="monospace" stroke="#6366F1" strokeWidth="0.5">#</text>
                {/* Scrolling hex digits */}
                <g className="hg-hex" style={{ clipPath: "inset(0 0 0 0)" }}>
                  <text x="30" y="14" fontSize="5.5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.9">a4f2</text>
                  <text x="30" y="21" fontSize="5.5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.7">9c1e</text>
                  <text x="30" y="28" fontSize="5.5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.55">b7d0</text>
                  <text x="30" y="35" fontSize="5.5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.4">3f8a</text>
                </g>
                {/* Animated bars at bottom */}
                <rect className="hg-b1" x="2"  y="40" width="10" height="3" rx="1.5" fill="#6366F1" fillOpacity="0.5"/>
                <rect className="hg-b2" x="14" y="40" width="14" height="3" rx="1.5" fill="#6366F1" fillOpacity="0.5"/>
                <rect className="hg-b3" x="30" y="40" width="16" height="3" rx="1.5" fill="#6366F1" fillOpacity="0.5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free Hash Generator
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or a file, right in your browser — no upload.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "MD5 + SHA-256 + SHA-512", "File Checksum", "Text Hash"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool ── */}
      <div className="bg-white dark:bg-[#191919] py-8">
        <HashGeneratorClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="hash-generator" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Hash text or files without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              SHA-1, SHA-256, SHA-384 and SHA-512 are computed using the browser&apos;s native{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
                crypto.subtle.digest()
              </code>{" "}
              API — no libraries, no network calls. MD5 is computed with{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
                spark-md5
              </code>{" "}
              (Web Crypto does not expose MD5 because it is cryptographically broken). Everything runs locally in your tab.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              You can hash any text string — passwords, API keys, JSON payloads — or any local file up to 500 MB including disk images, ISOs and archives. The file is read into your browser&apos;s memory using{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
                file.arrayBuffer()
              </code>{" "}
              and then passed directly to the crypto functions. It is never sent to our servers.
            </p>
          </section>

          {/* Algorithm guide */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Which hash algorithm should you use?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  algo: "SHA-256",
                  badge: "recommended",
                  badgeColor: "text-[#6366F1] bg-[#6366F1]/10",
                  desc: "256-bit output (64 hex chars). The modern standard for file integrity, digital signatures and most security protocols. Use this as your default.",
                },
                {
                  algo: "SHA-512",
                  badge: "high security",
                  badgeColor: "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20",
                  desc: "512-bit output (128 hex chars). Stronger than SHA-256, preferred in high-security contexts. Slower on 32-bit systems but negligible on modern hardware.",
                },
                {
                  algo: "SHA-1",
                  badge: "deprecated",
                  badgeColor: "text-amber-700 bg-amber-50 dark:bg-amber-900/20",
                  desc: "160-bit output (40 hex chars). Deprecated for security use — practical collision attacks exist. Still common in legacy systems and Git object IDs.",
                },
                {
                  algo: "MD5",
                  badge: "legacy only",
                  badgeColor: "text-red-700 bg-red-50 dark:bg-red-900/20",
                  desc: "128-bit output (32 hex chars). Cryptographically broken. Use only for non-security checksums, file deduplication, or when a legacy system requires it.",
                },
              ].map(({ algo, badge, badgeColor, desc }) => (
                <div key={algo} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold font-mono text-[#171717] dark:text-[#E5E5E5]">{algo}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <ul className="space-y-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">File integrity verification.</strong> Compare the SHA-256 of a downloaded ISO or installer against the checksum published by the developer to confirm the file has not been tampered with.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Deduplication.</strong> Hash a batch of files and compare results to find identical ones regardless of filename.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">API development.</strong> Quickly hash request bodies, payloads or API secrets to test HMAC signatures or webhook verification logic.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Password storage validation.</strong> Check that a plaintext value matches the stored hash when debugging authentication code (never store plaintext passwords).</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Content-addressable storage.</strong> Generate a unique identifier for any piece of data to use as a cache key or storage path.</span></li>
            </ul>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Encode images as Data URIs" },
                { href: "/tools/qr-code-generator", label: "QR Code Generator", desc: "Generate QR codes client-side" },
                { href: "/tools/password-generator", label: "Password Generator", desc: "Strong random passwords" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-4 bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q.name}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
