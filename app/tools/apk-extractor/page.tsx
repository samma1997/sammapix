import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import ApkExtractorClient from "@/components/tools/ApkExtractorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Open & Extract an APK File Online Free: No Upload",
  description:
    "Open any .apk or .xapk file in your browser. View its contents, download individual files or export as ZIP. 100% client-side, no upload, no tools to install.",
  keywords: [
    "extract apk",
    "open apk file",
    "extract apk online",
    "apk extractor",
    "unzip apk",
    "view apk contents",
    "apk extractor no upload",
    "open apk online free",
    "apk file viewer",
    "xapk extractor",
    "apk to zip",
    "extract apk files browser",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/apk-extractor`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/apk-extractor`,
    title: "Open & Extract an APK File Online Free: No Upload",
    description:
      "Open any .apk or .xapk file in your browser. View contents, download individual files or export as ZIP. No upload.",
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
    title: "Open & Extract an APK File Online Free: No Upload",
    description:
      "Open any .apk or .xapk file in your browser. View contents, download individual files or export as ZIP. No upload.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "APK Extractor",
    description:
      "Open and extract Android .apk and .xapk files entirely in your browser. An APK is a ZIP archive — view its internal file list, download individual files (AndroidManifest.xml, classes.dex, resources, assets) or export everything as a ZIP. No upload required, no Android device needed.",
    url: `${APP_URL}/tools/apk-extractor`,
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
      "Supports .apk, .xapk and .zip",
      "Shows full internal file and folder tree",
      "Download individual files with one click",
      "Export everything as a single .zip archive",
      "No Android device or emulator needed",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is an APK file just a ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. An APK (Android Package Kit) is a standard ZIP archive with a .apk extension. You can open it with any ZIP tool — or use this extractor to inspect and download the contents directly in your browser without renaming the file.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool decompile the APK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool only extracts the raw files inside the APK archive (images, resources, assets, META-INF, lib). It does not decompile bytecode (classes.dex) or decode the binary AndroidManifest.xml. For decompilation, you need a dedicated tool like apktool or jadx.",
        },
      },
      {
        "@type": "Question",
        name: "Do my files get uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything is processed locally in your browser using the JSZip library. Your APK files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your APK and browse its contents. Downloading all files at once as a single ZIP requires a Day Pass or Pro plan.",
        },
      },
      {
        "@type": "Question",
        name: "What files are inside an APK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical APK contains: AndroidManifest.xml (app metadata, in binary format), classes.dex (compiled Java/Kotlin bytecode), resources.arsc (compiled resources), the res/ folder (layouts, drawables, strings), the assets/ folder (raw files), META-INF/ (signature files), and lib/ (native .so libraries). This tool shows you all of them so you can download exactly what you need.",
        },
      },
      {
        "@type": "Question",
        name: "Can I open an XAPK file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. An XAPK is also a ZIP archive containing one or more APK files and an icon/manifest. This tool opens it and lists all the internal files, including the split APK files inside.",
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
        name: "APK Extractor",
        item: `${APP_URL}/tools/apk-extractor`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Open and Extract an APK File Online",
    description:
      "Open and extract Android APK files in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your APK file",
        text: "Drag and drop your .apk or .xapk file onto the upload area, or click to select it. The file stays on your device.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse the file list",
        text: "JSZip opens the archive in your browser and displays every file and folder inside — AndroidManifest.xml, classes.dex, resources, assets, META-INF, lib and more.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download what you need",
        text: "Click any file to download it individually, or use 'Download all as ZIP' to export everything at once.",
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApkExtractorPage() {
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
            APK Extractor
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            An APK is a ZIP archive.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              Open and extract its contents in your browser — no upload, no tools to install.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "No upload",
              ".apk",
              ".xapk",
              "Free",
              "No decompilation",
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
        <ApkExtractorClient />

        {/* ── Educational copy ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Why does this work?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            Android packages (.apk) are standard ZIP archives with a different extension. This tool
            uses JSZip to open the archive directly in your browser and exposes every file inside
            — AndroidManifest.xml, classes.dex, resources.arsc, the res/ and assets/ folders,
            META-INF signature files, and native lib/ binaries — so you can inspect or extract
            exactly what you need. No upload, no server, no Android device required.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mt-3">
            Note: AndroidManifest.xml and classes.dex inside an APK are in binary/compiled format.
            This tool gives you the raw files as-is. To read the manifest as text or decompile the
            bytecode, you need a dedicated tool like apktool or jadx — this is an intentional
            limitation, not a bug.
          </p>
        </section>

        {/* ── Internal links ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open RAR Online
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Open 7z Online
            </Link>
            <Link
              href="/tools/minecraft-extractor"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Minecraft Extractor
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
          <RelatedTools toolId="apk-extractor" />
        </section>
      </main>
    </>
  );
}
