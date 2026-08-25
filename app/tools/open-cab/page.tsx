import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const OpenCabClient = dynamic(() => import("@/components/tools/OpenCabClient"));

// Metadata

export const metadata: Metadata = {
  title: "CAB File Opener. Open CAB Online Free, No Upload",
  description:
    "Open and extract Windows Cabinet .cab files directly in your browser. View contents, download files individually, or save all as ZIP. Works for driver packages, Windows updates, and legacy installers. Files never leave your device.",
  keywords: [
    "open cab file",
    "extract cab online",
    "open cab windows",
    "cab extractor online",
    "open cab mac",
    "extract cab without software",
    "cab file viewer",
    "open cab file online free",
    "windows cabinet extractor",
    "cab file opener browser",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/open-cab`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/open-cab`,
    title: "CAB File Opener. Open CAB Online Free, No Upload",
    description:
      "Open and extract Windows Cabinet .cab files in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAB File Opener. Open CAB Online Free, No Upload",
    description:
      "Open and extract Windows Cabinet .cab files in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
  },
};

// JSON-LD schemas

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CAB File Opener · SammaPix",
  description:
    "Free browser-based Windows Cabinet extractor. Open .cab files, view contents, download files individually, and convert to ZIP. Supports driver packages, Windows Update packages, and legacy InstallShield installers. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/open-cab`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@type": "Person", name: "Luca Sammarco" },
  creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  featureList: [
    "Open Windows Cabinet archives without installing software",
    "View file list with names and sizes",
    "Download individual files from the CAB archive",
    "Convert entire CAB archive to ZIP in-browser",
    "Works on Mac, Linux, and Windows",
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
        text: "No. Everything happens 100% in your browser using WebAssembly. Your .cab files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting .cab files up to 200 MB is completely free. No signup required. For archives larger than 200 MB, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
      },
    },
    {
      "@type": "Question",
      name: "What is a .cab file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .cab file (Windows Cabinet) is a compressed archive format developed by Microsoft. It is used to package Windows driver files (.inf, .sys, .dll), Windows Update packages, and legacy software installers (InstallShield, Setup Factory). The format supports multiple compression algorithms and file spanning across multiple cabinet files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a CAB file on Mac or Linux?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This browser tool works on any operating system — Mac, Linux, Windows, or ChromeOS. There is no software to install. Just drop your .cab file onto the page and the contents are extracted instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports .cab files up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract a single driver file from a CAB without installing the full package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drop the .cab file, wait for the file list to appear, then click the individual file (e.g. a .inf or .sys driver file) to download just that one file. You do not need to extract everything.",
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
    { "@type": "ListItem", position: 3, name: "CAB File Opener", item: `${APP_URL}/tools/open-cab` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a .cab file online",
  description: "Open and extract Windows Cabinet .cab files in your browser without installing any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your CAB file",
      text: "Drag and drop a .cab file onto the page, or click to select it from your computer.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View and download files",
      text: "The file list appears instantly. Click any file to download it individually for free.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download as ZIP (optional)",
      text: "Click Download all as ZIP to bundle everything into a universally compatible archive.",
    },
  ],
};

// Page

export default function OpenCabPage() {
  const tool = TOOLS["open-cab"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            CAB File Opener. Open CAB Online, Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Extract and view Windows Cabinet .cab files directly in your browser. Download individual files
            or export as ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Driver packages, Windows Update, legacy installers · Free up to 200 MB · No software install
          </p>
        </section>

        {/* Tool */}
        <OpenCabClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">libarchive compiled to WebAssembly</strong>{" "}
            to decompress Windows Cabinet archives entirely in your browser. The same engine that powers
            the{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">
              Open 7z Online
            </Link>{" "}
            tool handles .cab natively. No server, no upload, no software to install.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            For RAR archives, use{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">
              Open RAR Online
            </Link>
            . For tar.gz archives from Linux servers, see{" "}
            <Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">
              Open tar.gz Online
            </Link>
            . Read the full guide at{" "}
            <Link href="/blog/how-to-open-cab-files-online" className="text-[#6366F1] hover:underline">
              How to Open CAB Files Online
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Common uses for CAB files
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3 leading-relaxed">
            Windows Cabinet archives appear in several common scenarios where you may need to extract
            specific files without running an installer:
          </p>
          <ul className="mb-6 space-y-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
            <li className="ml-5 list-disc leading-relaxed">
              <strong className="text-[#525252] dark:text-[#A3A3A3]">Driver packages:</strong> Hardware
              manufacturers distribute drivers as .cab files. You can extract the .inf, .sys, or .dll
              files to manually install or inspect a specific driver version.
            </li>
            <li className="ml-5 list-disc leading-relaxed">
              <strong className="text-[#525252] dark:text-[#A3A3A3]">Windows Update (.msu) contents:</strong> Windows
              Update packages (.msu) contain .cab files internally. Extracting gives you individual
              hotfix files, useful for offline deployment.
            </li>
            <li className="ml-5 list-disc leading-relaxed">
              <strong className="text-[#525252] dark:text-[#A3A3A3]">Legacy InstallShield installers:</strong> Many
              older Windows applications use .cab files as part of their setup. You can extract and
              inspect the payload without running the installer.
            </li>
            <li className="ml-5 list-disc leading-relaxed">
              <strong className="text-[#525252] dark:text-[#A3A3A3]">Font packages and Office updates:</strong> Microsoft
              distributes some fonts and Office language packs as .cab archives that you can open and
              inspect here.
            </li>
          </ul>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Opening CAB files on Mac and Linux
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            macOS and Linux have no native .cab support. On Linux the{" "}
            <code className="text-xs px-1.5 py-0.5 bg-[#F5F5F5] dark:bg-[#252525] rounded">cabextract</code>{" "}
            command-line utility handles .cab files, but it requires installation. On Mac, there is no
            built-in option at all. This browser tool is the fastest cross-platform solution: drop the
            file, get the contents, no install required on any OS.
          </p>

          {/* FAQ */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{q.name}</p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {tool && <RelatedTools toolId="open-cab" />}
      </main>
    </>
  );
}
