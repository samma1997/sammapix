import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import CropPdfClient from "@/components/tools/CropPdfClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/crop-pdf`;

export const metadata: Metadata = {
  title: "Crop PDF Online Free: Trim Margins, No Upload",
  description:
    "Crop PDF margins in your browser — set Top, Right, Bottom, Left in points or %. Applied to all pages. No upload, no account, no Adobe. Free and private.",
  keywords: [
    "crop pdf",
    "crop pdf online",
    "trim pdf margins",
    "remove white margins pdf",
    "crop pdf pages",
    "crop pdf no upload",
    "pdf margin cutter",
    "crop pdf free",
    "reduce pdf margins",
    "pdf crop tool browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Crop PDF Online Free — Trim Margins, No Upload",
    description:
      "Set Top/Right/Bottom/Left margins to crop any PDF in your browser. All pages updated. No file upload, no signup, no Adobe.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop PDF Online Free — Trim Margins, No Upload",
    description:
      "Crop PDF margins in your browser — points or %, applied to all pages. No upload, no account.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "BusinessApplication"],
  name: "Crop PDF Online Free",
  description:
    "Crop PDF margins in your browser — set Top, Right, Bottom, Left in points or %. Applied to all pages instantly. No upload, no account required.",
  url: TOOL_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
    "Crop Top, Right, Bottom, Left margins independently",
    "Live preview of crop area on first page",
    "Set margins in points (pt) or percentage (%)",
    "Applied uniformly to all pages in the PDF",
    "Uses PDF CropBox + MediaBox — text stays selectable",
    "100% client-side — PDF never leaves your device",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Crop PDF is completely free. No account, no subscription, and no file upload required. Everything runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is my PDF uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your PDF is processed entirely inside your browser using pdf-lib. No data is ever sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Does cropping remove text or rasterize the PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The crop is applied via the PDF CropBox and MediaBox metadata, not by rasterizing the document. All text remains fully selectable and searchable, and vector content stays sharp at any zoom.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set different margins per page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in the current version. The same Top/Right/Bottom/Left margins are applied uniformly to every page in the PDF. For per-page control, split the PDF first, crop each section, then merge them back.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Up to 100 MB. The preview renders only the first page, so even large multi-page PDFs load quickly.",
      },
    },
    {
      "@type": "Question",
      name: "What are points (pt) vs percentage (%) for margins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Points (pt) are PDF's native unit — 1 pt = 1/72 inch. A standard A4 page is 595 × 842 pt. Percentage (%) is relative to each page's own width or height, so it adapts automatically if your PDF has mixed page sizes.",
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
    { "@type": "ListItem", position: 3, name: "Crop PDF", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to crop PDF margins online free",
  description:
    "Set Top, Right, Bottom, Left margins to trim any PDF in your browser — no upload required.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your PDF",
      text: "Drag and drop your PDF into the upload area or click to browse. Supports up to 100 MB. A live preview of the first page renders instantly in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set the crop margins",
      text: "Use the sliders or type values for Top, Right, Bottom, and Left margins. Choose points (pt) or percentage (%). The red crop rectangle on the preview updates live.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the cropped PDF",
      text: 'Click "Crop PDF". The margins are removed from every page using PDF CropBox metadata and the cropped file downloads immediately. No upload, no account needed.',
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CropPdfPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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

      {/* ── Hero split ── */}
      <div className="bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#525252] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#525252] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#525252] dark:text-[#737373]">Crop PDF</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EF444414" }}
              aria-hidden="true"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes pdfcrop-tl { 0%,15%{transform:translate(0,0)} 50%{transform:translate(4px,4px)} 85%,100%{transform:translate(0,0)} }
                  @keyframes pdfcrop-tr { 0%,15%{transform:translate(0,0)} 50%{transform:translate(-4px,4px)} 85%,100%{transform:translate(0,0)} }
                  @keyframes pdfcrop-bl { 0%,15%{transform:translate(0,0)} 50%{transform:translate(4px,-4px)} 85%,100%{transform:translate(0,0)} }
                  @keyframes pdfcrop-br { 0%,15%{transform:translate(0,0)} 50%{transform:translate(-4px,-4px)} 85%,100%{transform:translate(0,0)} }
                  @keyframes pdfcrop-rect { 0%,15%{opacity:0.25;stroke-dashoffset:80} 50%{opacity:1;stroke-dashoffset:0} 85%,100%{opacity:0.25;stroke-dashoffset:80} }
                  .pdfcrop-tl{animation:pdfcrop-tl 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:10px 10px}
                  .pdfcrop-tr{animation:pdfcrop-tr 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:38px 10px}
                  .pdfcrop-bl{animation:pdfcrop-bl 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:10px 38px}
                  .pdfcrop-br{animation:pdfcrop-br 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:38px 38px}
                  .pdfcrop-rect{stroke-dasharray:80;animation:pdfcrop-rect 2.4s ease-in-out infinite}
                `}</style>
                {/* PDF document base */}
                <rect x="5" y="3" width="30" height="38" rx="2.5" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M27 3 L35 11 L27 11 Z" fill="#EF4444" fillOpacity="0.20"/>
                <rect x="9" y="15" width="14" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.25"/>
                <rect x="9" y="19" width="10" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.20"/>
                <rect x="9" y="23" width="12" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.20"/>
                {/* Animated crop rectangle */}
                <rect className="pdfcrop-rect" x="9" y="13" width="22" height="18" rx="1" stroke="#EF4444" strokeWidth="1.5" fill="none"/>
                {/* Animated corner handles */}
                <g className="pdfcrop-tl">
                  <rect x="7" y="11" width="5" height="1.5" rx="0.5" fill="#EF4444"/>
                  <rect x="7" y="11" width="1.5" height="5" rx="0.5" fill="#EF4444"/>
                </g>
                <g className="pdfcrop-tr">
                  <rect x="28" y="11" width="5" height="1.5" rx="0.5" fill="#EF4444"/>
                  <rect x="31.5" y="11" width="1.5" height="5" rx="0.5" fill="#EF4444"/>
                </g>
                <g className="pdfcrop-bl">
                  <rect x="7" y="30.5" width="5" height="1.5" rx="0.5" fill="#EF4444"/>
                  <rect x="7" y="27" width="1.5" height="5" rx="0.5" fill="#EF4444"/>
                </g>
                <g className="pdfcrop-br">
                  <rect x="28" y="30.5" width="5" height="1.5" rx="0.5" fill="#EF4444"/>
                  <rect x="31.5" y="27" width="1.5" height="5" rx="0.5" fill="#EF4444"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Crop PDF Online Free
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Trim margins from every page of a PDF — set Top, Right, Bottom, Left independently in points or %. Live preview. No upload. No account. No Adobe.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "Live Preview", "All Pages", "Privacy"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool ── */}
      <CropPdfClient />

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="crop-pdf" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Crop PDF margins without uploading your file
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix Crop PDF runs entirely in your browser using pdf-lib. Your document is never sent to any server — all processing happens locally on your device. This makes it safe for confidential documents, contracts, or any file you would not want leaving your machine.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              The crop is applied via the PDF CropBox and MediaBox metadata fields, not by rasterizing the page. This means all text remains fully selectable, vector graphics stay sharp at any zoom level, and file size changes only marginally.
            </p>
          </section>

          {/* pt vs % */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Points (pt) vs Percentage (%) — which to use?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Points (pt)</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  PDF&apos;s native unit: 1 pt = 1/72 inch. A standard A4 page is 595 × 842 pt. Use pt when you know exactly how much white space to remove (e.g., &ldquo;remove 40 pt from the top&rdquo;).
                </p>
              </div>
              <div className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Percentage (%)</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  Relative to each page&apos;s own size. Useful for PDFs with mixed page sizes (e.g., some A4, some letter). Setting 5% on the left removes 5% of whatever the page&apos;s width happens to be.
                </p>
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              When do you need to crop a PDF?
            </h2>
            <ul className="space-y-2 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed list-disc list-inside">
              <li>Removing excessive white margins added by a printer driver or scanner</li>
              <li>Cutting off headers or footers (like page URLs added by a browser when printing to PDF)</li>
              <li>Trimming scanned document borders to match the actual content area</li>
              <li>Preparing a PDF for e-reader devices where margins waste screen space</li>
              <li>Resizing slide decks to a tighter content area for embedding in presentations</li>
            </ul>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related PDF tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/croproatio", label: "Crop & Ratio", desc: "Crop images to exact ratios" },
                { href: "/tools/pdf-compress", label: "Compress PDF", desc: "Reduce PDF file size in-browser" },
                { href: "/tools/pdf-organize", label: "Organize PDF", desc: "Reorder PDF pages by drag" },
                { href: "/tools/remove-pdf-pages", label: "Delete PDF Pages", desc: "Remove unwanted pages" },
                { href: "/tools/pdf-rotate", label: "Rotate PDF", desc: "Fix page orientation" },
                { href: "/tools/pdf-merge", label: "Merge PDF", desc: "Combine multiple PDFs" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#EF4444]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Does cropping a PDF remove the hidden content outside the crop box?",
                  a: "The CropBox tells PDF viewers what region to display and print, but the content outside technically still exists in the file. If you need to permanently remove content outside the crop area, you would need to flatten or re-render the PDF — which this tool does not do, intentionally, to preserve text selectability.",
                },
                {
                  q: "Will the cropped PDF look correct in all viewers?",
                  a: "Yes. This tool sets both CropBox and MediaBox, which are the two fields respected by all major PDF viewers (Adobe Reader, Preview on macOS, Chrome, Firefox, Edge). Some obscure or legacy viewers may ignore CropBox, but all modern ones respect it.",
                },
                {
                  q: "Can I undo a crop after downloading?",
                  a: "Since CropBox/MediaBox are metadata fields and we set them together, you can re-open the downloaded PDF in this tool and set all margins to 0 to restore the original view — as long as you have not re-saved the file in a tool that flattens it.",
                },
                {
                  q: "Does the file size change after cropping?",
                  a: "Only marginally. Since crop is applied via metadata, the underlying page content is untouched and the file size changes by only a few bytes.",
                },
                {
                  q: "Is this safe for confidential documents?",
                  a: "Yes. Your PDF is processed entirely in your browser. No file data is transmitted to any server, logged, or stored. You can even disconnect from the internet after the page loads and the tool will still work.",
                },
                {
                  q: "What happens if my margins are too large?",
                  a: "The tool validates that the resulting crop box has positive width and height before applying. If your margins exceed the page dimensions, you will see a clear error message and the crop will not be applied.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-4 bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
