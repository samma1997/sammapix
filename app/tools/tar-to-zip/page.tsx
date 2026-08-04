import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import TarToZipClient from "@/components/tools/TarToZipClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Convert TAR to ZIP Online Free: No Upload",
  description:
    "Convert TAR to ZIP instantly in your browser. Works with .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz — no upload, no install. Free, private, any OS.",
  keywords: [
    "tar to zip",
    "convert tar to zip",
    "tar.gz to zip",
    "tgz to zip",
    "tar bz2 to zip",
    "tar xz to zip",
    "extract tar online",
    "tar to zip no upload",
    "tar to zip converter free",
    "open tar.gz online",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/tar-to-zip`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/tar-to-zip`,
    title: "Convert TAR to ZIP Online Free: No Upload",
    description:
      "Convert TAR archives to ZIP in your browser. Supports .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz. No upload. Free.",
    images: [{ url: `${APP_URL}/og/tools/tar-to-zip.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert TAR to ZIP Online Free: No Upload",
    description:
      "Convert TAR archives to ZIP in your browser. Supports .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz. No upload. Free.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TAR to ZIP Converter",
    description:
      "Convert TAR archives (.tar, .tar.gz, .tgz, .tar.bz2, .tar.xz) to ZIP format entirely in your browser. No upload required, no installation needed. Free and private.",
    url: `${APP_URL}/tools/tar-to-zip`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
      "100% client-side processing — no upload",
      "Supports .tar, .tar.gz, .tgz, .tar.bz2, .tbz2, .tar.xz, .txz",
      "Preserves full folder structure inside ZIP",
      "Shows file list before conversion for large archives",
      "Download as a single ZIP file",
      "Free up to 200 MB",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is TAR to ZIP conversion free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your TAR file, convert and download as ZIP — no account or signup needed. Archives up to 200 MB are free.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything happens locally in your browser using WebAssembly (libarchive). Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "What is a .tar.gz file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A .tar.gz (also called a tarball or tgz) is a TAR archive compressed with gzip. TAR bundles files together while gzip compresses the bundle. It is the most common archive format on Linux and macOS for distributing software and backups.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work with .tar.gz and .tar.bz2 files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool supports all common TAR variants: .tar (uncompressed), .tar.gz / .tgz (gzip), .tar.bz2 / .tbz2 (bzip2), and .tar.xz / .txz (xz/LZMA). libarchive detects the compression automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Why convert TAR to ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TAR archives (especially .tar.gz) require special software or a Linux/macOS environment to open. ZIP is universal — it opens natively on Windows, macOS, Linux, Android and iOS without any extra app, making it easier to share files with anyone.",
        },
      },
      {
        "@type": "Question",
        name: "Does it preserve the folder structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All internal folders and file paths from the TAR archive are preserved exactly in the output ZIP.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "TAR to ZIP",
        item: `${APP_URL}/tools/tar-to-zip`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert TAR to ZIP Online",
    description: "Convert a TAR archive to ZIP format in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your TAR file",
        text: "Drag and drop your .tar, .tar.gz, .tgz, .tar.bz2, or .tar.xz file onto the upload area, or click to select it from your computer.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Automatic extraction and repackaging",
        text: "libarchive (WebAssembly) extracts the TAR contents in your browser — decompressing gzip, bzip2, or xz automatically — then JSZip repackages them into a ZIP preserving the full folder structure. No upload happens.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download your ZIP",
        text: "Click Download ZIP to save the converted archive. The ZIP file opens natively on any operating system without extra software.",
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TarToZipPage() {
  return (
    <>
      {/* Structured data */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-white dark:bg-[#0A0A0A]">
        {/* ── Hero ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            TAR to ZIP Converter
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            Convert a TAR archive (.tar, .tar.gz, .tar.bz2, .tar.xz) to a ZIP file in your
            browser —{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              no upload.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "No upload",
              ".tar.gz / .tgz",
              ".tar.bz2 / .tbz2",
              ".tar.xz / .txz",
              "Folder structure preserved",
              "Free",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] dark:text-[#A3A3A3]"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>

        {/* ── Tool ── */}
        <TarToZipClient />

        {/* ── Internal links ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/rar-to-zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              RAR to ZIP
            </Link>
            <Link
              href="/tools/7z-to-zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              7Z to ZIP
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open 7Z Online
            </Link>
            <Link
              href="/tools/tar-gz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open tar.gz Online
            </Link>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Create ZIP
            </Link>
          </div>
        </section>

        {/* ── Related tools ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="tar-to-zip" />
        </section>
      </main>
    </>
  );
}
