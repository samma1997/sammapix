import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import IpaExtractorClient from "@/components/tools/IpaExtractorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Extract an IPA File Online Free: No Upload",
  description:
    "Open any iOS .ipa file in your browser. View its contents, download individual files or export as ZIP. 100% client-side, no upload, no install.",
  keywords: [
    "extract ipa",
    "open ipa file",
    "extract ipa online",
    "ipa extractor",
    "unzip ipa",
    "ipa to zip",
    "ipa file viewer",
    "open ipa online free",
    "ipa contents",
    "ios app extractor",
    "no upload ipa",
    "extract ipa browser",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/ipa-extractor`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/ipa-extractor`,
    title: "Extract an IPA File Online Free: No Upload",
    description:
      "Open any iOS .ipa file in your browser. View contents, download individual files or export as ZIP. No upload.",
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
    title: "Extract an IPA File Online Free: No Upload",
    description:
      "Open any iOS .ipa file in your browser. View contents, download individual files or export as ZIP. No upload.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IPA Extractor",
    description:
      "Open and extract iOS .ipa files entirely in your browser. An IPA is a ZIP archive — view its internal file list (Payload, Info.plist, frameworks, assets), download individual files or export everything as a ZIP. No upload required, no iOS device or Xcode needed.",
    url: `${APP_URL}/tools/ipa-extractor`,
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
      "Supports .ipa (iOS App Package)",
      "Shows full internal file and folder tree",
      "Detects app name and bundle ID from Info.plist (XML format)",
      "Download individual files with one click",
      "Export everything as a single .zip archive",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an IPA file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An IPA (iOS App Archive) is the distribution format for iOS applications. It is a standard ZIP archive with a .ipa extension containing the app bundle inside a Payload/ folder, along with metadata, resources, and frameworks. You can open it with any ZIP tool — or use this extractor to inspect and download the contents directly in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "Can I install the app from an IPA file using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool is for inspection and extraction only. Installing an IPA on an iOS device requires a valid provisioning profile and either Xcode, AltStore, or a trusted enterprise distribution method. This tool simply lets you open the archive and download its contents.",
        },
      },
      {
        "@type": "Question",
        name: "Do my files get uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything is processed locally in your browser using the JSZip library. Your IPA files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your IPA and browse its contents. Downloading all files at once as a single ZIP requires a Day Pass or Pro plan.",
        },
      },
      {
        "@type": "Question",
        name: "What files are inside an IPA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical IPA contains: a Payload/ folder with the .app bundle (the main executable, Info.plist, resources, storyboards, asset catalogs), a META-INF/ folder with signature data, and sometimes embedded frameworks or extensions. The Info.plist file contains app metadata like the bundle ID, app name, and minimum iOS version.",
        },
      },
      {
        "@type": "Question",
        name: "Why can't I read the Info.plist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Info.plist files inside IPA packages are often stored in binary format (bplist) rather than plain XML. This tool can display app name and bundle ID when the plist is XML-encoded, but skips parsing silently when it is binary. To read binary plists, you need a tool like plutil or Xcode on macOS.",
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
        name: "IPA Extractor",
        item: `${APP_URL}/tools/ipa-extractor`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Open and Extract an IPA File Online",
    description:
      "Open and extract iOS IPA files in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your IPA file",
        text: "Drag and drop your .ipa file onto the upload area, or click to select it. The file stays on your device.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse the file list",
        text: "JSZip opens the archive in your browser and displays every file and folder inside — Payload, Info.plist, frameworks, assets, and more.",
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

export default function IpaExtractorPage() {
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
            IPA Extractor
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            An IPA is a ZIP archive.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              Open and extract the contents of an iOS .ipa app package in your browser — no upload, no install.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "No upload",
              ".ipa",
              "Free",
              "Inspection only",
              "Folder structure preserved",
              "No Xcode needed",
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
        <IpaExtractorClient />

        {/* ── Educational copy ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Why does this work?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            iOS app packages (.ipa) are standard ZIP archives with a different extension. This tool
            uses JSZip to open the archive directly in your browser and exposes every file inside
            — the Payload/ folder containing the .app bundle, Info.plist metadata, compiled
            frameworks, asset catalogs, and signature files — so you can inspect or extract
            exactly what you need. No upload, no server, no iOS device required.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mt-3">
            Note: Info.plist files inside IPA packages are often stored in binary format (bplist).
            When the plist is plain XML, this tool extracts the app name and bundle ID automatically.
            When it is binary, it is listed as a file you can download but not parsed — this is an
            intentional limitation to keep the tool dependency-free and fast.
          </p>
        </section>

        {/* ── Internal links ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center mb-4">
            Other archive tools you might need
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/tools/apk-extractor"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              APK Extractor
            </Link>
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
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Create ZIP
            </Link>
          </div>
        </section>

        {/* ── Related tools ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="ipa-extractor" />
        </section>
      </main>
    </>
  );
}
