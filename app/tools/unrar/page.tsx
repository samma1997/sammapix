import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const UnrarClient = dynamic(() => import("@/components/tools/UnrarClient"));

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Open RAR Online Free: Extract & View RAR Files",
  description:
    "Open RAR files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
  keywords: [
    "open rar online",
    "unrar online",
    "extract rar",
    "rar to zip",
    "open rar mac",
    "rar extractor online",
    "view rar files",
    "rar opener free",
    "rar file extractor browser",
    "rar without winrar",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/unrar`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/unrar`,
    title: "Open RAR Online Free: Extract & View RAR Files",
    description:
      "Open RAR files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open RAR Online Free: Extract & View RAR Files",
    description:
      "Open RAR files directly in your browser. View file list, download individual files, or convert the entire archive to ZIP. Files never leave your device.",
  },
};

// ── Schema JSON-LD ────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open RAR Online · SammaPix",
  description:
    "Free browser-based RAR extractor. Open RAR files, view contents, download files individually, and convert to ZIP. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/unrar`,
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
    "Open RAR archives without installing software",
    "View file list with names and sizes",
    "Download individual files from the RAR",
    "Convert entire RAR to ZIP in-browser",
    "Password-protected RAR support",
    "100% client-side, files never uploaded",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I extract a RAR file online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop your .rar file onto this page and it extracts instantly in your browser. There is no WinRAR to install, no signup, and nothing is uploaded. It works as a free online RAR extractor on Windows, Mac, Chromebook or phone: open the archive, preview the files, and download them one by one or all at once as a ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a RAR file on a Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "macOS can't open RAR files on its own (the built-in Archive Utility only handles ZIP). Drop your .rar onto this page and it extracts instantly in your browser on any Mac, with no WinRAR or extra app to install and nothing uploaded. It works the same on MacBook, iMac and Mac mini: open the archive, preview the files, and download them one by one or all at once as a ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything happens 100% in your browser using WebAssembly. Your RAR files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can it open RAR5 (RAR version 5) archives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool supports both RAR4 and RAR5 archives, which are the two most common formats created by WinRAR and other archivers.",
      },
    },
    {
      "@type": "Question",
      name: "Can it open password-protected RAR files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the RAR is password-protected, a password field will appear automatically. Enter the password and the archive will be extracted.",
      },
    },
    {
      "@type": "Question",
      name: "Can SammaPix create RAR files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. RAR is a proprietary format and creation requires a license. However, you can download all files as a ZIP archive, which is a free and universally supported format.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support multi-volume RAR archives (.part1.rar, .part2.rar)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Multi-volume (split) RAR archives are not supported by the in-browser extractor. You will need to use a desktop application like 7-Zip or WinRAR for those.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free plan supports RAR files up to 200 MB. Pro plan removes this limit. Extraction happens in your browser so very large archives may take longer depending on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting RAR files up to 200 MB is completely free. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a free WinRAR alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix works as a free online WinRAR alternative: it opens and extracts RAR files directly in your browser, so there is no WinRAR to install and no license to buy. Drop your .rar file, preview the contents, and download the files, all free with nothing uploaded to a server.",
      },
    },
    {
      "@type": "Question",
      name: "How do I unzip a RAR file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Although 'unzip' technically refers to ZIP archives, people use it for any archive. To unzip a RAR file, drop it onto this page: it opens instantly in your browser and you can download the files one by one or all at once as a ZIP. No WinRAR or extra software needed, and nothing is uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a RAR file without installing any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This is a fully online RAR file opener with nothing to install. It runs in your browser on Windows, Mac, Linux, Chromebook and phones: just drop the .rar file and it extracts instantly, with your files never leaving your device.",
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
      name: "Open RAR Online",
      item: `${APP_URL}/tools/unrar`,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a RAR file online",
  description:
    "Open and extract RAR files in your browser without installing any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your RAR file",
      text: "Drag and drop a .rar file onto the page or click to select it from your computer.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View and download files",
      text: "The file list appears instantly. Click any file to download it, or enter a password if prompted.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download as ZIP (optional)",
      text: 'Click "Download all as ZIP" to convert the entire RAR archive to a ZIP file.',
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UnrarPage() {
  const tool = TOOLS["unrar"];

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
            Open RAR Online · Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            View and extract RAR files instantly in your browser. Download
            individual files or convert to ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Supports RAR4, RAR5, password-protected archives, up to 200 MB free
          </p>
        </section>

        {/* Tool */}
        <UnrarClient />

        {/* Internal links + description */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">
              WebAssembly
            </strong>{" "}
            to run the UnRAR library directly in your browser. There is no
            server involved — your files are processed locally and never
            uploaded anywhere. This is ideal for sensitive documents or private
            photos.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            If you need to remove metadata from files after extracting them, try{" "}
            <Link
              href="/tools/exif"
              className="text-[#6366F1] hover:underline"
            >
              EXIF Viewer
            </Link>
            . To compress files before sharing, use{" "}
            <Link
              href="/tools/compress"
              className="text-[#6366F1] hover:underline"
            >
              Image Compressor
            </Link>
            . To merge extracted PDFs, see{" "}
            <Link
              href="/tools/pdf-merge"
              className="text-[#6366F1] hover:underline"
            >
              Merge PDF
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why RAR files are hard to open on Mac
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            macOS does not include a built-in RAR extractor. ZIP, gzip, and
            even 7z are supported natively, but RAR uses a proprietary
            compression algorithm owned by RARLAB. Most users resort to
            installing The Unarchiver or WinRAR. This browser-based tool
            removes the need for any installation.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            For a full comparison of all methods (including Terminal commands,
            Keka, and multi-volume .part1.rar archives), read the complete{" "}
            <Link
              href="/blog/how-to-open-rar-files-on-mac"
              className="text-[#6366F1] hover:underline"
            >
              guide to opening RAR files on Mac
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            RAR vs ZIP: what should you use?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            RAR typically achieves 5-15% better compression than ZIP and
            supports multi-volume archives and recovery records. However, ZIP is
            an open standard supported natively on every operating system. For
            sharing files online, ZIP is almost always the better choice because
            recipients can open it without any extra software.
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
        {tool && <RelatedTools toolId="unrar" />}
      </main>
    </>
  );
}
