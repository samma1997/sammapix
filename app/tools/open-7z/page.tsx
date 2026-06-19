import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const Open7zClient = dynamic(() => import("@/components/tools/Open7zClient"));

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Open 7z Online Free: Extract and View 7z Files",
  description:
    "Open .7z files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
  keywords: [
    "open 7z online",
    "extract 7z",
    "7z to zip",
    "open 7z mac",
    "7z extractor online",
    "view 7z files",
    "7z opener free",
    "open 7z without software",
    "7z file extractor browser",
    "extract 7z files online",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/open-7z`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/open-7z`,
    title: "Open 7z Online Free: Extract and View 7z Files",
    description:
      "Open .7z files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open 7z Online Free: Extract and View 7z Files",
    description:
      "Open .7z files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
  },
};

// ── Schema JSON-LD ────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open 7z Online · SammaPix",
  description:
    "Free browser-based 7z extractor. Open .7z files, view contents, download files individually, and convert to ZIP. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/open-7z`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
  },
  featureList: [
    "Open 7z archives without installing software",
    "View file list with names and sizes",
    "Download individual files from the 7z archive",
    "Convert entire 7z archive to ZIP in-browser",
    "Password-protected 7z support",
    "100% client-side, files never uploaded",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are my files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything happens 100% in your browser using WebAssembly. Your .7z files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can SammaPix create .7z files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this tool extracts and converts .7z archives. It does not create them. You can download all extracted files as a ZIP archive, which is a free and universally supported format.",
      },
    },
    {
      "@type": "Question",
      name: "Can it open password-protected 7z files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the .7z archive is password-protected, a password field will appear automatically. Enter the password and the archive will be extracted.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support multi-volume 7z archives (.7z.001, .7z.002)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Multi-volume (split) .7z archives are not supported by the in-browser extractor. You will need a desktop application like 7-Zip for those.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports .7z files up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting .7z files up to 200 MB is completely free. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't macOS open .7z files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "macOS supports ZIP and gzip natively but not .7z. The 7z format uses the LZMA compression algorithm which requires a separate application or this browser-based tool.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${APP_URL}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Open 7z Online",
      item: `${APP_URL}/tools/open-7z`,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a .7z file online",
  description:
    "Open and extract .7z files in your browser without installing any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your .7z file",
      text: "Drag and drop a .7z file onto the page or click to select it from your computer.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View and download files",
      text: "The file list appears instantly. Click any file to download it individually.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download as ZIP (optional)",
      text: "Click \"Download all as ZIP\" to convert the entire .7z archive to a ZIP file.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Open7zPage() {
  const tool = TOOLS["open-7z"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Open 7z Online · Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            View and extract .7z files instantly in your browser. Download
            individual files or convert to ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Supports .7z archives, password-protected, up to 200 MB free
          </p>
        </section>

        {/* Tool */}
        <Open7zClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">
              WebAssembly
            </strong>{" "}
            to run the 7-Zip engine directly in your browser. There is no server
            involved: your files are processed locally and never uploaded
            anywhere. This is ideal for sensitive documents or private photos.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            If you need to open a RAR archive instead, try{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">
              Open RAR Online
            </Link>
            . To strip metadata from extracted photos before sharing, use{" "}
            <Link href="/tools/exif" className="text-[#6366F1] hover:underline">
              EXIF Viewer
            </Link>
            . To merge extracted PDFs, see{" "}
            <Link
              href="/tools/pdf-merge"
              className="text-[#6366F1] hover:underline"
            >
              Merge PDF
            </Link>
            . For a full comparison of methods to open .7z files on Mac, read the{" "}
            <Link
              href="/blog/how-to-open-7z-files-on-mac"
              className="text-[#6366F1] hover:underline"
            >
              complete guide: How to Open 7z Files on Mac
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why .7z files are hard to open on Mac
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            macOS supports ZIP and gzip natively but not the .7z format. The
            7z format uses LZMA compression which typically achieves 30-70%
            better compression than ZIP, making it popular for large software
            distributions. Mac users usually need to install The Unarchiver or
            Keka. This browser tool removes that requirement entirely.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7z vs ZIP: which format should you use?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            7z typically compresses 30-70% better than ZIP (especially for
            executables and source code) and supports strong AES-256 encryption.
            However, ZIP is supported natively on every operating system. For
            sharing files with others, ZIP is usually the better choice since
            recipients can open it without extra software.
          </p>

          {/* FAQ */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div
                key={q.name}
                className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4"
              >
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {q.name}
                </p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
                  {q.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related tools */}
        {tool && <RelatedTools toolId="open-7z" />}
      </main>
    </>
  );
}
