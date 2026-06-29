import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const TarGzClient = dynamic(() => import("@/components/tools/TarGzClient"));

export const metadata: Metadata = {
  title: "Open tar.gz Online Free — Extract & View tar.gz Files",
  description:
    "Open and extract .tar.gz, .tgz, .tar and .gz files directly in your browser. View the contents, download individual files, or export as ZIP. Files never leave your device.",
  keywords: [
    "open tar.gz online",
    "extract tar.gz",
    "tar.gz to zip",
    "open tar.gz windows",
    "tgz extractor online",
    "view tar.gz files",
    "untar online",
    "open gz file online",
    "extract tar.gz online free",
    "how to open tar.gz",
  ],
  alternates: { canonical: `${APP_URL}/tools/tar-gz` },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/tar-gz`,
    title: "Open tar.gz Online Free — Extract & View tar.gz Files",
    description:
      "Open .tar.gz, .tgz, .tar and .gz files in your browser. View contents, download individual files, or export as ZIP. Files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open tar.gz Online Free — Extract & View tar.gz Files",
    description: "Open and extract tar.gz files in your browser. No upload, no install.",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "tar.gz Extractor Online · SammaPix",
  description:
    "Free browser-based tar.gz extractor. Open .tar.gz, .tgz, .tar and .gz archives, view contents, download files, and convert to ZIP. 100% in-browser, files never uploaded.",
  url: `${APP_URL}/tools/tar-gz`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Luca Sammarco" },
  creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  featureList: [
    "Open tar.gz, tgz, tar, gz and tar.bz2 archives without installing software",
    "View the file list with names and sizes",
    "Download individual files from the archive",
    "Convert the whole archive to ZIP in-browser",
    "Works on Windows, Chromebook and any browser",
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
        text: "No. Everything happens 100% in your browser using WebAssembly (libarchive). Your archive never leaves your device and is never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What is a tar.gz file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .tar.gz (also seen as .tgz) is two formats combined: tar bundles many files into one, and gzip compresses that bundle. It is the standard archive format in the Linux and developer world, used for source code, software releases, server backups and datasets.",
      },
    },
    {
      "@type": "Question",
      name: "Why is tar.gz hard to open on Windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Older Windows versions had no built-in support for tar.gz, so double-clicking did nothing. Windows 11 added command-line tar support, but there is still no simple right-click extract and no easy way to peek inside without fully extracting. This browser tool opens and previews tar.gz instantly with no install.",
      },
    },
    {
      "@type": "Question",
      name: "Can macOS open tar.gz natively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, macOS Archive Utility extracts tar.gz when you double-click it. This tool is still useful on a Mac when you want to view the contents and download just one file without unpacking the whole archive, or when you are on a borrowed or restricted machine.",
      },
    },
    {
      "@type": "Question",
      name: "Which formats does it support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It opens .tar.gz, .tgz, .tar, .gz, .tar.bz2 and .tar.xz archives. For .rar files use our Open RAR tool, and for .7z files use our Open 7z tool.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan supports archives up to 200 MB. For larger archives, a one-time 24-hour Day Pass ($2.99) removes the limit instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Opening and extracting tar.gz archives up to 200 MB is completely free, with no signup.",
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
    { "@type": "ListItem", position: 3, name: "Open tar.gz Online", item: `${APP_URL}/tools/tar-gz` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to open a tar.gz file online",
  description: "Open and extract tar.gz files in your browser without installing software.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Drop your tar.gz file", text: "Drag a .tar.gz, .tgz, .tar or .gz file onto the page or click to select it." },
    { "@type": "HowToStep", position: 2, name: "View and download files", text: "The file list appears. Click any file to download it individually." },
    { "@type": "HowToStep", position: 3, name: "Download as ZIP (optional)", text: "Click Download all as ZIP to convert the whole archive to a ZIP file." },
  ],
};

export default function TarGzPage() {
  const tool = TOOLS["tar-gz"];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Open tar.gz Online · Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            View and extract .tar.gz, .tgz, .tar and .gz files instantly in your browser. Download
            individual files or convert to ZIP.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Files never leave your device.</strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">Works on Windows, Mac and Chromebook · Up to 200 MB free</p>
        </section>

        <TarGzClient />

        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">How it works</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">WebAssembly</strong> (the libarchive engine)
            to read tar.gz archives directly in your browser. There is no server: your file is
            processed locally and never uploaded. That makes it safe for source code, backups, and
            private datasets.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            Got a different archive? Use{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Open RAR Online</Link>{" "}for .rar or{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7z Online</Link>{" "}for .7z. Need to make an archive instead? Use the{" "}
            <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link>. For a full walkthrough, read{" "}
            <Link href="/blog/how-to-open-tar-gz-files-online-no-upload" className="text-[#6366F1] hover:underline">
              How to Open tar.gz Files (Windows, Mac &amp; Online)
            </Link>.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">What is a tar.gz file?</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            A .tar.gz combines two steps: tar bundles many files and folders into a single archive,
            and gzip compresses that bundle. It is the default packaging format across Linux,
            open-source projects, and server tooling, which is why you most often meet it when
            downloading source code, software releases, or backups.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{q.name}</p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {tool && <RelatedTools toolId="tar-gz" />}
      </main>
    </>
  );
}
