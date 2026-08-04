import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import MinecraftExtractorClient from "@/components/tools/MinecraftExtractorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Open .mcpack / .mcworld Online Free: No Upload",
  description:
    "Extract Minecraft .mcpack, .mcworld and .mctemplate files in your browser. View contents, download individual files or get a ZIP. No upload, no Minecraft needed. Free.",
  keywords: [
    "extract mcpack",
    "open mcworld",
    "mcpack extractor",
    "open mcpack file",
    "extract minecraft pack",
    "mcworld to zip",
    "open minecraft world file",
    "mctemplate extractor",
    "minecraft pack extractor online",
    "open mcpack no upload",
    "mcpack viewer",
    "minecraft file extractor",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/minecraft-extractor`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/minecraft-extractor`,
    title: "Open .mcpack / .mcworld Online Free: No Upload",
    description:
      "Extract Minecraft .mcpack, .mcworld and .mctemplate files in your browser. No upload, no Minecraft needed.",
    images: [
      {
        url: `${APP_URL}/og/tools/minecraft-extractor.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open .mcpack / .mcworld Online Free: No Upload",
    description:
      "Extract Minecraft .mcpack, .mcworld and .mctemplate files in your browser. No upload, no Minecraft needed.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Minecraft File Extractor",
    description:
      "Open and extract Minecraft .mcpack, .mcworld and .mctemplate files entirely in your browser. View the internal file list, download individual files or export everything as a ZIP. No upload required, no Minecraft installation needed.",
    url: `${APP_URL}/tools/minecraft-extractor`,
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
      "Supports .mcpack, .mcworld, .mctemplate and .zip",
      "Shows full internal file and folder tree",
      "Download individual files with one click",
      "Export everything as a single .zip archive",
      "No Minecraft installation needed",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is a .mcpack file just a ZIP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Minecraft .mcpack, .mcworld and .mctemplate files are standard ZIP archives with a different file extension. You can open them with any ZIP tool — or use this extractor to inspect and download the contents directly in your browser without renaming the file.",
        },
      },
      {
        "@type": "Question",
        name: "Do my files get uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything is processed locally in your browser using the JSZip library. Your pack files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. Drop your .mcpack, .mcworld or .mctemplate file and browse its contents. Downloading all files as a single ZIP requires a Day Pass or Pro plan.",
        },
      },
      {
        "@type": "Question",
        name: "What file types are inside a .mcpack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical .mcpack contains a manifest.json (pack metadata), textures (PNG/TGA), models (JSON), sounds, and sometimes scripts. A .mcworld contains level.dat plus the region chunk data. This tool shows you the full list so you can download exactly the files you need.",
        },
      },
      {
        "@type": "Question",
        name: "Can I open a .mcworld file without Minecraft?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A .mcworld is a ZIP archive. This tool opens it in your browser and shows you every file inside — no Minecraft app, no Bedrock Edition, nothing to install.",
        },
      },
      {
        "@type": "Question",
        name: "What if I want to repackage the files into a new archive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the 'Download all as ZIP' button to get all extracted files in a single .zip archive. You can then rename it back to .mcpack or .mcworld if needed.",
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
        name: "Minecraft File Extractor",
        item: `${APP_URL}/tools/minecraft-extractor`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Extract a Minecraft .mcpack or .mcworld File Online",
    description:
      "Open and extract Minecraft pack files in your browser in 3 steps.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Drop your Minecraft pack file",
        text: "Drag and drop your .mcpack, .mcworld or .mctemplate file onto the upload area, or click to select it. The file stays on your device.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse the file list",
        text: "JSZip opens the archive in your browser and displays every file and folder inside — textures, manifest.json, models, sounds and more.",
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

export default function MinecraftExtractorPage() {
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
            Minecraft File Extractor
          </h1>
          <p className="text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto">
            Minecraft .mcpack and .mcworld files are ZIP archives.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              Open and extract them in your browser — no upload, no Minecraft needed.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {[
              "No upload",
              ".mcpack",
              ".mcworld",
              ".mctemplate",
              "Free",
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
        <MinecraftExtractorClient />

        {/* ── Educational copy ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-[#F5F5F5] dark:border-[#1A1A1A]">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Why does this work?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            Minecraft Bedrock Edition stores packs and worlds as standard ZIP archives
            with custom extensions (.mcpack, .mcworld, .mctemplate). This tool uses
            JSZip to open the archive directly in your browser and exposes every file
            inside — textures, manifest.json, models, sounds and scripts — so you can
            inspect or extract exactly what you need without renaming the file or
            installing anything.
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

        {/* ── Related tools ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="minecraft-extractor" />
        </section>
      </main>
    </>
  );
}
