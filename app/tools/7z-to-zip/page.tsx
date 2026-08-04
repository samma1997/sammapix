import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import SevenZToZipClient from "@/components/tools/SevenZToZipClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "7Z to ZIP Online Free: No Upload",
  description:
    "Convert 7Z to ZIP instantly in your browser. Extract your 7Z archive and repackage as ZIP — no upload, no install. Works on Mac, Windows, Linux. Free.",
  keywords: [
    "7z to zip",
    "convert 7z to zip",
    "7z to zip online",
    "7z to zip converter free",
    "extract 7z to zip",
    "7z to zip no upload",
    "7z to zip mac",
    "7z to zip online free",
    "7z converter",
    "open 7z as zip",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/7z-to-zip`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/7z-to-zip`,
    title: "7Z to ZIP Online Free: No Upload",
    description:
      "Convert 7Z to ZIP instantly in your browser. No upload, no install. Free.",
    images: [{ url: `${APP_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "7Z to ZIP Online Free: No Upload",
    description:
      "Convert 7Z to ZIP instantly in your browser. No upload, no install. Free.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "7Z to ZIP Converter",
    description:
      "Convert 7Z archives to ZIP format entirely in your browser. No upload required, no installation needed. Free and private.",
    url: `${APP_URL}/tools/7z-to-zip`,
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
      "Supports password-protected 7Z archives",
      "Preserves full folder structure inside ZIP",
      "Shows file list before conversion",
      "Extracts via libarchive WebAssembly",
      "Repackages with JSZip — opens on any OS",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is 7Z to ZIP conversion free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your 7Z file, extract and download as ZIP — no account needed for archives up to 200 MB.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything happens locally in your browser using WebAssembly (libarchive.js). Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I convert 7Z to ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "7Z is a powerful format but requires special software (like 7-Zip) to open. ZIP is universal — it opens natively on Windows, macOS, Linux, and mobile without installing any extra app.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support password-protected 7Z files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. If your 7Z archive is password-protected, you will be prompted to enter the password. The tool then extracts and repackages the decrypted contents into a ZIP.",
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
        name: "Does it preserve the folder structure inside the 7Z?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All internal folders and paths are preserved exactly as they were in the original 7Z archive when repackaged into ZIP.",
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
        name: "7Z to ZIP",
        item: `${APP_URL}/tools/7z-to-zip`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert 7Z to ZIP Online",
    description: "Convert a 7Z archive to ZIP format in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your 7Z file",
        text: "Drag and drop your .7z file onto the upload area, or click to select it from your computer.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Extraction and repackaging",
        text: "The tool extracts all files from the 7Z archive in your browser using libarchive (WebAssembly) and repackages them into a ZIP using JSZip. No upload happens.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download your ZIP",
        text: "Click Download ZIP to save the converted archive. The ZIP file preserves the original folder structure and opens natively on any operating system.",
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SevenZToZipPage() {
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
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            7Z to ZIP Converter
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            Convert 7Z to ZIP in your browser — no upload.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              7Z needs special software; ZIP opens everywhere.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {["No upload", "Password support", "Folder structure preserved", "Free", "Any OS"].map(
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

        {/* Tool */}
        <SevenZToZipClient />

        {/* Internal links */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open 7Z Online
            </Link>
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open RAR Online
            </Link>
            <Link
              href="/tools/rar-to-zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              RAR to ZIP
            </Link>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Create ZIP
            </Link>
          </div>
        </section>

        {/* Related tools */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="7z-to-zip" />
        </section>
      </main>
    </>
  );
}
