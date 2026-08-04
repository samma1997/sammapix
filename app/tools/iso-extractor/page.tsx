import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import IsoExtractorClient from "@/components/tools/IsoExtractorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Extract an ISO File Online Free: No Upload",
  description:
    "Browse and extract files from an ISO disc image in your browser — no upload, no need to mount or burn it. ISO9660 supported, 100% client-side.",
  keywords: [
    "extract iso",
    "open iso file",
    "extract iso online",
    "iso extractor",
    "browse iso contents",
    "iso to zip",
    "no upload iso",
    "iso file viewer",
    "open iso online free",
    "extract iso free",
    "iso image extractor",
    "view iso contents online",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/iso-extractor`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/iso-extractor`,
    title: "Extract an ISO File Online Free: No Upload",
    description:
      "Browse and extract files from an ISO disc image in your browser — no upload, no need to mount or burn it.",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract an ISO File Online Free: No Upload",
    description:
      "Browse and extract files from an ISO disc image in your browser — no upload, no need to mount or burn it.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ISO Extractor",
    description:
      "Browse and extract files from an ISO disc image entirely in your browser. Supports ISO9660 disc images. View the file list, download individual files, or export everything as a ZIP archive. No upload required — your files never leave your device.",
    url: `${APP_URL}/tools/iso-extractor`,
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
      "100% client-side processing — no upload ever",
      "Supports ISO9660 disc images",
      "Browse the full file and folder tree inside the ISO",
      "Download individual files with one click",
      "Export everything as a single .zip archive",
      "No need to mount, burn or install software",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need to mount the ISO to extract files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool reads the ISO disc image directly in your browser using libarchive (WebAssembly). You can browse and extract files without mounting the image, burning a disc, or installing any software.",
        },
      },
      {
        "@type": "Question",
        name: "Are my ISO files uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything is processed locally in your browser. The ISO file never leaves your device. This makes it both fast and completely private.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your ISO and browse or download individual files at no cost. Downloading all files at once as a single ZIP archive requires a Day Pass ($2.99 for 24 hours) or a Pro plan.",
        },
      },
      {
        "@type": "Question",
        name: "What is an ISO file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An ISO file (also called an ISO image) is an exact digital copy of an optical disc — a CD, DVD or Blu-ray. It packages the entire disc contents, including the file system structure, into a single file. ISO files are widely used to distribute operating systems, software installers and data archives.",
        },
      },
      {
        "@type": "Question",
        name: "What disc formats does this tool support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool uses libarchive which supports the ISO9660 filesystem used by the vast majority of ISO files (software CDs/DVDs, Linux distros, Windows installers, game discs). Some disc images that use only the UDF filesystem (common on Blu-ray and some DVDs) may not be readable. If your ISO does not open, it is likely UDF-only.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert an ISO to ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. After the ISO is extracted, Pro users and Day Pass holders can download all the contents as a single ZIP archive with the folder structure preserved. Free users can download individual files one at a time.",
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
        name: "ISO Extractor",
        item: `${APP_URL}/tools/iso-extractor`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Extract an ISO File Online",
    description: "Extract files from an ISO disc image in your browser in 3 steps — no upload, no software to install.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your ISO file",
        text: "Drag and drop your .iso disc image onto the upload area, or click to select it from your computer. The file stays entirely on your device.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse the contents",
        text: "libarchive (WebAssembly) reads the ISO9660 filesystem and displays every file and folder inside the disc image. No mounting required.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download what you need",
        text: "Click any file to download it individually for free, or use 'Download all as ZIP' (Day Pass or Pro) to export everything at once with folder structure preserved.",
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IsoExtractorPage() {
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
            ISO Extractor
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            Browse and extract files from an ISO disc image in your browser —{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              no upload, no need to mount or burn it.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "No upload",
              ".iso",
              "ISO9660",
              "Free",
              "No mount needed",
              "Folder structure preserved",
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
        <IsoExtractorClient />

        {/* ── Educational copy ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            How does it work?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            This tool uses libarchive compiled to WebAssembly to read the ISO9660 filesystem
            directly in your browser. ISO9660 is the standard filesystem used on the vast majority
            of disc images — operating system installers (Windows, Linux, macOS), software CDs,
            and many game discs. The library parses the on-disc directory tree and extracts each
            file into memory so you can download exactly what you need without mounting the image
            or running any software.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mt-3">
            Note: some disc images (particularly Blu-ray and certain DVDs) use the UDF filesystem
            instead of or in addition to ISO9660. UDF-only discs may not be readable with this
            tool. If your ISO does not open, it is likely UDF-only — you will need dedicated
            desktop software such as 7-Zip or IsoBuster for those.
          </p>
        </section>

        {/* ── Internal links ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open 7z Online
            </Link>
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open RAR Online
            </Link>
            <Link
              href="/tools/7z-to-zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              7Z to ZIP
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
          <RelatedTools toolId="iso-extractor" />
        </section>
      </main>
    </>
  );
}
