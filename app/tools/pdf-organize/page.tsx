import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import RelatedTools from "@/components/tools/RelatedTools";
import dynamic from "next/dynamic";

const PdfOrganizeClient = dynamic(
  () => import("@/components/tools/PdfOrganizeClient"),
  { ssr: false }
);

// ── SEO metadata ──────────────────────────────────────────────────────────────

const TOOL_URL = `${APP_URL}/tools/pdf-organize`;

export const metadata: Metadata = {
  title: "Organize PDF Pages Online Free: No Upload",
  description:
    "Rearrange, reorder and sort PDF pages in your browser. Drag thumbnails or use arrow buttons. No upload, no signup. Files never leave your device.",
  keywords: [
    "organize pdf pages",
    "reorder pdf pages",
    "rearrange pdf pages",
    "sort pdf pages",
    "move pdf pages",
    "reorder pdf online free",
    "pdf page organizer no upload",
    "rearrange pdf no upload",
    "sort pdf pages online",
    "organize pdf no upload",
    "pdf organizer free",
    "change pdf page order",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Organize PDF Pages Online Free — No Upload",
    description:
      "Drag thumbnails or use arrow buttons to reorder PDF pages in your browser. 100% private — files never leave your device.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organize PDF Pages Online Free — No Upload",
    description:
      "Drag thumbnails or use arrow buttons to reorder PDF pages in your browser. 100% private — files never leave your device.",
  },
};

// ── JSON-LD schemas ───────────────────────────────────────────────────────────

const schemaApp = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "BusinessApplication"],
  name: "Organize PDF Pages",
  description:
    "Drag-and-drop or arrow-button page reordering for PDFs. Runs entirely in the browser using pdf-lib and pdf.js. No upload, no account required.",
  url: TOOL_URL,
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
    url: APP_URL,
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
  },
  featureList: [
    "Drag-and-drop page reordering",
    "Arrow and jump-to-top/bottom buttons on every page card",
    "PDF thumbnails rendered locally with pdf.js",
    "New PDF rebuilt with pdf-lib at full quality",
    "No server upload — 100% client-side",
    "Up to 100 MB input file",
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this PDF page organizer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Organize PDF Pages is completely free with no file size cap (up to 100 MB). No account or credit card needed.",
      },
    },
    {
      "@type": "Question",
      name: "Are my PDF files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs inside your browser using pdf.js for thumbnails and pdf-lib to rebuild the PDF. Your file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I rearrange pages in a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF, then drag the page thumbnails into the order you want, or use the arrow buttons on each card to move a page up, down, to the top, or to the bottom. Click Save reordered PDF when done.",
      },
    },
    {
      "@type": "Question",
      name: "Does reordering pages affect text quality or selectable text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool rebuilds the PDF using pdf-lib, which copies the page vectors as-is. Text remains fully selectable and searchable, and the output quality is identical to the original.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Up to 100 MB. All processing runs client-side so performance depends on your device's RAM and CPU.",
      },
    },
    {
      "@type": "Question",
      name: "Can I also delete pages I don't want while organizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool focuses on reordering. To remove pages, use the companion tool Delete PDF Pages on SammaPix.",
      },
    },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Organize PDF Pages", item: TOOL_URL },
  ],
};

const schemaHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to organize and reorder PDF pages online",
  description: "Rearrange PDF pages in 3 steps in your browser — no upload required.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your PDF",
      text: "Drop a PDF file (up to 100 MB) onto the upload zone or click to browse. Page thumbnails are rendered instantly in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Rearrange the pages",
      text: "Drag the page thumbnails into the order you want. Or use the arrow buttons on each card to move a page up, down, to the top, or to the bottom.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the organized PDF",
      text: "Click Save reordered PDF. The new PDF with your custom page order is built locally and downloads immediately.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PdfOrganizePage() {
  return (
    <>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      {/* Split-hero header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Organize PDF Pages Online — Free, No Upload
          </h1>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] max-w-2xl">
            Rearrange, reorder and sort pages of any PDF in your browser. Drag thumbnails or
            use the arrow buttons. Files never leave your device.
          </p>

          {/* Internal links to related PDF tools */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <a
              href="/tools/remove-pdf-pages"
              className="px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors"
            >
              Delete PDF Pages
            </a>
            <a
              href="/tools/pdf-split"
              className="px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors"
            >
              Split PDF
            </a>
            <a
              href="/tools/pdf-merge"
              className="px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors"
            >
              Merge PDF
            </a>
            <a
              href="/tools/pdf-compress"
              className="px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors"
            >
              Compress PDF
            </a>
          </div>
        </div>
      </div>

      {/* Tool client */}
      <PdfOrganizeClient />

      {/* Related tools */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <RelatedTools toolId="pdf-organize" />
      </div>
    </>
  );
}
