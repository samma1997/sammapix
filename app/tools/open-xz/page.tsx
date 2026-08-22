import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const OpenXzClient = dynamic(() => import("@/components/tools/OpenXzClient"));

// Metadata

export const metadata: Metadata = {
  title: "XZ File Opener. Open XZ Online Free, No Upload",
  description:
    "Open and extract .xz files (LZMA2) directly in your browser. View contents, download files, or save all as ZIP. Works with plain .xz and .tar.xz. Files never leave your device.",
  keywords: [
    "xz file opener",
    "open xz online",
    "extract xz online free",
    "open xz file browser",
    "xz to zip online",
    "lzma extractor online",
    "open xz mac",
    "xz file opener no upload",
    "extract tar xz online",
    "xz file viewer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/open-xz`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/open-xz`,
    title: "XZ File Opener. Open XZ Online Free, No Upload",
    description:
      "Open and extract .xz files (LZMA2) directly in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "XZ File Opener. Open XZ Online Free, No Upload",
    description:
      "Open and extract .xz files (LZMA2) directly in your browser. View contents, download files, or save all as ZIP. Files never leave your device.",
  },
};

// JSON-LD schemas

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "XZ File Opener · SammaPix",
  description:
    "Free browser-based XZ and LZMA2 extractor. Open .xz files, view contents, download files individually, and convert to ZIP. Supports plain .xz and .tar.xz. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/open-xz`,
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
    "Open XZ archives (LZMA2) without installing software",
    "Supports plain .xz (single compressed file) and .tar.xz (tarball)",
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
        text: "No. Everything happens 100% in your browser using WebAssembly. Your .xz files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Extracting .xz files up to 200 MB is completely free. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "What is an XZ file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "XZ is a compression format that uses the LZMA2 algorithm, designed for very high compression ratios. It is widely used in Linux distributions for packaging software and kernel tarballs because it produces smaller files than GZip or BZIP2, at the cost of slower compression speed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between .xz and .tar.xz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plain .xz compresses a single file. A .tar.xz combines two steps: TAR bundles multiple files into one archive, then XZ compresses the bundle. This is the format used by most Linux kernel releases and many software packages. This tool handles both.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't macOS or Windows open .xz files natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neither macOS nor Windows include built-in support for XZ compression. macOS can open .tar.gz via Archive Utility but not .xz. Windows has no built-in archiver for either. This browser tool removes that requirement, works on any OS without installing anything.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports .xz files up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes this limit instantly.",
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
    { "@type": "ListItem", position: 3, name: "XZ File Opener", item: `${APP_URL}/tools/open-xz` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a .xz file online",
  description: "Open and extract .xz or .tar.xz files in your browser without installing any software.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your XZ file",
      text: "Drag and drop a .xz file onto the page, or click to select it from your computer.",
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

export default function OpenXzPage() {
  const tool = TOOLS["open-xz"];

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
            XZ File Opener. Open XZ Online, Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Extract and view .xz files (LZMA2 compression) directly in your browser. Download
            individual files or export as ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Plain .xz and .tar.xz supported · Free up to 200 MB · No software install
          </p>
        </section>

        {/* Tool */}
        <OpenXzClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">libarchive compiled to WebAssembly</strong>{" "}
            to decompress XZ archives entirely in your browser. libarchive supports the LZMA2
            algorithm used by the .xz format, and automatically detects whether the archive is a
            plain .xz (single file) or a .tar.xz (multiple files). No server, no upload, no software.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            For .tar.gz and .tgz files, the dedicated{" "}
            <Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">
              Open tar.gz Online
            </Link>{" "}
            tool is also available. For .gz files, use the{" "}
            <Link href="/tools/open-gz" className="text-[#6366F1] hover:underline">
              GZ File Opener
            </Link>
            . For .7z archives, see{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">
              Open 7z Online
            </Link>
            . Read the full guide at{" "}
            <Link href="/blog/how-to-open-xz-files-online" className="text-[#6366F1] hover:underline">
              How to Open XZ Files Online
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Where you will find .xz files
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            XZ is the preferred compression for Linux kernel releases (linux-6.x.tar.xz), major
            software packages distributed via Arch Linux, Fedora, and other distributions that
            use xz heavily in their package managers (pacman, rpm). Firmware images for embedded
            devices and router operating systems are also commonly distributed as .xz archives.
            This tool lets you inspect those files from any device including Windows and macOS.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            XZ vs GZ vs BZ2: which is best?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            XZ (LZMA2) typically achieves 20-30% better compression ratios than GZip at comparable
            settings, making archives noticeably smaller. The tradeoff is speed: XZ compression
            is significantly slower than GZip. For archives that are compressed once and downloaded
            many times (software releases), XZ is usually the right choice. For streaming and
            on-the-fly compression (web servers, log rotation), GZip wins on speed. BZIP2 sits
            between the two in both compression ratio and speed.
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

        {tool && <RelatedTools toolId="open-xz" />}
      </main>
    </>
  );
}
