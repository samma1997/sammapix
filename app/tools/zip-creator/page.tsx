import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const ZipCreatorClient = dynamic(() => import("@/components/tools/ZipCreatorClient"));

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Create a ZIP File Online Free — No Upload, No Signup",
  description:
    "Zip files online in your browser. Drag in files or a whole folder, name it, and download a single .zip. 100% in-browser — your files never leave your device.",
  keywords: [
    "create zip file online",
    "zip files online",
    "make a zip file",
    "zip files online free",
    "compress files to zip",
    "online zip creator",
    "combine files into zip",
    "zip folder online",
    "create zip no upload",
    "how to make a zip file",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/zip-creator`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/zip-creator`,
    title: "Create a ZIP File Online Free — No Upload, No Signup",
    description:
      "Zip files online in your browser. Drag in files or a folder and download a single .zip. 100% in-browser — files never leave your device.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a ZIP File Online Free — No Upload, No Signup",
    description:
      "Zip files online in your browser. Drag in files or a folder and download a single .zip. Files never leave your device.",
  },
};

// ── Schema JSON-LD ────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZIP Creator Online · SammaPix",
  description:
    "Free browser-based ZIP creator. Bundle any files or folders into a single .zip archive. 100% client-side, files never uploaded.",
  url: `${APP_URL}/tools/zip-creator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Luca Sammarco" },
  creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  featureList: [
    "Bundle multiple files into one ZIP",
    "Drag in an entire folder (structure preserved)",
    "Name your ZIP before download",
    "No file upload — runs 100% in the browser",
    "Free, unlimited, no signup",
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
        text: "No. The ZIP is built entirely in your browser with JavaScript. Your files never leave your device and are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I zip a whole folder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drag a folder onto the page and the folder structure is preserved inside the ZIP, including subfolders.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size or count limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is free with no size limit. Because everything runs in your browser, very large bundles depend on your device's memory. Up to 500 files at a time are supported.",
      },
    },
    {
      "@type": "Question",
      name: "Is it really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free with no signup and no watermark.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open the ZIP afterwards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ZIP is supported natively on Windows, macOS, Linux, iOS and Android — just double-click or tap it. To open RAR or 7z archives instead, use our Open RAR or Open 7z tools.",
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
    { "@type": "ListItem", position: 3, name: "Create a ZIP File", item: `${APP_URL}/tools/zip-creator` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to create a ZIP file online",
  description: "Bundle files into a single ZIP archive in your browser without installing software.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Add your files", text: "Drag files or a folder onto the page, or click to select them from your computer." },
    { "@type": "HowToStep", position: 2, name: "Name the ZIP", text: "Type a name for your archive (optional)." },
    { "@type": "HowToStep", position: 3, name: "Download", text: "Click Create & download ZIP. The file is built locally and downloads instantly." },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ZipCreatorPage() {
  const tool = TOOLS["zip-creator"];

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
            Create a ZIP File Online · Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Drag in files or a whole folder, name your archive, and download a single .zip.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Files never leave your device.</strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            100% in-browser · No upload · No signup · No watermark
          </p>
        </section>

        {/* Tool */}
        <ZipCreatorClient />

        {/* Description + internal links */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">How it works</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool builds the ZIP archive directly in your browser using JavaScript. There is no
            server: your files are read and compressed locally on your device and never uploaded
            anywhere. That makes it safe for private documents, photos, or client files.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            Need to do the opposite and open an archive? Use{" "}
            <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Open RAR Online</Link>{" "}
            for .rar files or{" "}
            <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7z Online</Link>{" "}
            for .7z files. To shrink photos before zipping them, try{" "}
            <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link>.
            For a step-by-step guide, read{" "}
            <Link href="/blog/how-to-create-a-zip-file-online-no-upload" className="text-[#6366F1] hover:underline">
              How to Create a ZIP File Online (No Upload)
            </Link>.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why zip files in the browser?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            Bundling several files into one ZIP makes them easier to email, upload, or share, and it
            shrinks the total size. Most online zippers upload your files to their servers first,
            which is slow and risky for sensitive data. Doing it in the browser is instant and keeps
            everything on your computer.
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

        {/* Related tools */}
        {tool && <RelatedTools toolId="zip-creator" />}
      </main>
    </>
  );
}
