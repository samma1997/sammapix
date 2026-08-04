import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import RarToZipClient from "@/components/tools/RarToZipClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "RAR to ZIP Online Free: No Upload",
  description:
    "Convert RAR to ZIP instantly in your browser. Extract your RAR and repackage as ZIP — no upload, no install. Works on Mac, Windows, Linux. Free.",
  keywords: [
    "rar to zip",
    "convert rar to zip",
    "rar to zip online",
    "rar to zip converter free",
    "change rar to zip",
    "rar to zip no upload",
    "rar to zip mac",
    "rar to zip online free",
    "rar converter",
    "open rar as zip",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/rar-to-zip`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/rar-to-zip`,
    title: "RAR to ZIP Online Free: No Upload",
    description:
      "Convert RAR to ZIP instantly in your browser. No upload, no install. Free.",
    images: [{ url: `${APP_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAR to ZIP Online Free: No Upload",
    description:
      "Convert RAR to ZIP instantly in your browser. No upload, no install. Free.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RAR to ZIP Converter",
    description:
      "Convert RAR archives to ZIP format entirely in your browser. No upload required, no installation needed. Free and private.",
    url: `${APP_URL}/tools/rar-to-zip`,
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
      "Supports RAR4 and RAR5 archives",
      "Password-protected RAR support",
      "Preserves folder structure inside ZIP",
      "Shows file list before conversion",
      "Download as ZIP or individual files",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is RAR to ZIP conversion free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your RAR file, extract and download as ZIP — no account needed.",
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
        name: "Why should I convert RAR to ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RAR is a proprietary format that requires special software to open. ZIP is universal — it opens natively on Windows, macOS, Linux, and mobile without any extra app.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support password-protected RAR files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. If your RAR is password-protected, you will be prompted to enter the password. The tool then extracts and repackages the contents (decrypted) into a ZIP.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Up to 200 MB for free. Larger archives require a Day Pass ($2.99 for 24 hours). The limit is set by available browser memory, not by upload bandwidth.",
        },
      },
      {
        "@type": "Question",
        name: "Does it preserve the folder structure inside the RAR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All internal folders and paths are preserved exactly as they were in the original RAR archive when repackaged into ZIP.",
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
        name: "RAR to ZIP",
        item: `${APP_URL}/tools/rar-to-zip`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert RAR to ZIP Online",
    description: "Convert a RAR archive to ZIP format in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your RAR file",
        text: "Drag and drop your .rar file onto the upload area, or click to select it from your computer.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Extraction and repackaging",
        text: "The tool extracts all files from the RAR archive in your browser using libarchive (WebAssembly) and repackages them into a ZIP using JSZip. No upload happens.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download your ZIP",
        text: "Click Download ZIP to save the converted archive. The ZIP file preserves the original folder structure.",
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RarToZipPage() {
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
            RAR to ZIP Converter
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            Convert RAR to ZIP in your browser — no upload.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              RAR is proprietary; ZIP opens on any OS.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {["No upload", "RAR4 + RAR5", "Password support", "Folder structure preserved", "Free"].map(
              (badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] dark:text-[#A3A3A3]"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </section>

        {/* ── Tool ── */}
        <RarToZipClient />

        {/* ── Internal links ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
            >
              Open RAR Online
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
            >
              Open 7z Online
            </Link>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
            >
              Create ZIP
            </Link>
            <Link
              href="/tools/tar-gz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
            >
              Open tar.gz Online
            </Link>
          </div>
        </section>

        {/* ── Related tools ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="rar-to-zip" />
        </section>
      </main>
    </>
  );
}
