import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const OpenGzClient = dynamic(() => import("@/components/tools/OpenGzClient"));

// Metadata

export const metadata: Metadata = {
  title: "GZ File Opener. Open GZ Online Free, No Upload",
  description:
    "Open and extract .gz and .gzip files directly in your browser. View contents, download files, or save all as ZIP. Works with plain .gz and .tar.gz. Files never leave your device.",
  keywords: [
    "gz file opener",
    "open gz online",
    "extract gz online free",
    "open gzip file browser",
    "gz to zip online",
    "open gz mac",
    "gzip extractor online",
    "extract gz without software",
    "open gzip no upload",
    "gz file viewer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/open-gz`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/open-gz`,
    title: "GZ File Opener. Open GZ Online Free, No Upload",
    description:
      "Open and extract .gz and .gzip files directly in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "GZ File Opener. Open GZ Online Free, No Upload",
    description:
      "Open and extract .gz and .gzip files directly in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
  },
};

// JSON-LD schemas

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GZ File Opener · SammaPix",
  description:
    "Free browser-based GZ and GZIP extractor. Open .gz files, view contents, download files individually, and convert to ZIP. Supports plain .gz and .tar.gz. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/open-gz`,
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
    "Open GZ and GZIP archives without installing software",
    "Supports plain .gz (single compressed file) and .tar.gz (tarball)",
    "View file list with names and sizes",
    "Download individual files from the archive",
    "Convert entire archive to ZIP in-browser",
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
        text: "No. Everything happens 100% in your browser using WebAssembly. Your .gz files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting .gz files up to 200 MB is completely free. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between .gz and .tar.gz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GZip (.gz) is a compression algorithm that compresses a single file. A .tar.gz (or .tgz) combines two steps: TAR bundles multiple files into one archive, then GZip compresses it. This tool handles both. For a dedicated .tar.gz tool with the split-hero UI, also try Open tar.gz Online.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't macOS open .gz files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "macOS can open .tar.gz via the built-in Archive Utility, but plain .gz files (a single compressed file) are less reliably handled. This browser tool removes the ambiguity and works on any OS without installing anything.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open .gz files from Linux servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GZ is the standard compression format on Linux and is commonly used for log files, database dumps, and software packages. Download the file to your machine and drop it here to inspect the contents.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports .gz files up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
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
    { "@type": "ListItem", position: 3, name: "GZ File Opener", item: `${APP_URL}/tools/open-gz` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a .gz file online",
  description: "Open and extract .gz or .gzip files in your browser without installing any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your GZ file",
      text: "Drag and drop a .gz or .gzip file onto the page, or click to select it from your computer.",
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
      text: "Click Download all as ZIP to bundle everything into a universally compatible archive.",
    },
  ],
};

// Page

export default function OpenGzPage() {
  const tool = TOOLS["open-gz"];

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
            GZ File Opener. Open GZ Online, Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Extract and view .gz and .gzip files directly in your browser. Download individual files
            or export as ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Plain .gz and .tar.gz supported · Free up to 200 MB · No software install
          </p>
        </section>

        {/* Tool */}
        <OpenGzClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">libarchive compiled to WebAssembly</strong>{" "}
            to decompress GZ archives entirely in your browser. The same engine handles plain .gz
            files (a single compressed file) and .tar.gz bundles (multiple files in a tarball).
            No server, no upload, no software to install.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            For .tar.gz and .tgz files, the dedicated{" "}
            <Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">
              Open tar.gz Online
            </Link>{" "}
            tool is also available. For .xz archives (LZMA2), use{" "}
            <Link href="/tools/open-xz" className="text-[#6366F1] hover:underline">
              XZ File Opener
            </Link>
            . For .7z archives, see{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">
              Open 7z Online
            </Link>
            . Read the full guide at{" "}
            <Link href="/blog/how-to-open-gz-files-online" className="text-[#6366F1] hover:underline">
              How to Open GZ Files Online
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            GZ on Linux: common use cases
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            GZip compression is ubiquitous on Linux and Unix systems. You will encounter .gz files
            in many situations: compressed log files (e.g. /var/log/syslog.1.gz), database exports
            (mysqldump.sql.gz), software source tarballs (linux-6.9.tar.gz), and package manager
            artifacts. This tool lets you inspect those files from any device without needing a terminal
            or running gunzip locally.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            GZ vs BZIP2 vs XZ: compression comparison
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            GZip is fast and widely supported, making it the default choice for web servers (HTTP
            gzip encoding) and Linux tools. BZIP2 (.bz2) compresses better but is slower. XZ (.xz,
            using LZMA2) achieves the best compression ratios, which is why Linux kernel tarballs
            and many package managers prefer it. This tool supports GZ; for XZ use the{" "}
            <Link href="/tools/open-xz" className="text-[#6366F1] hover:underline">
              XZ File Opener
            </Link>
            .
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

        {tool && <RelatedTools toolId="open-gz" />}
      </main>
    </>
  );
}
