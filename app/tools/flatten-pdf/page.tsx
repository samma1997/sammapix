import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import FlattenPdfClient from "@/components/tools/FlattenPdfClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/flatten-pdf`;

export const metadata: Metadata = {
  title: "Flatten a PDF Online Free: No Upload",
  description:
    "Flatten PDF form fields in your browser — filled values become permanent, the document looks the same on every reader. No upload, no signup, no Adobe.",
  keywords: [
    "flatten pdf",
    "flatten pdf online",
    "flatten pdf form",
    "make pdf non-editable",
    "flatten pdf fillable form",
    "flatten pdf no upload",
    "pdf flatten fields",
    "lock pdf form fields",
    "pdf non-editable online free",
    "flatten form fields pdf browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Flatten a PDF Online Free — No Upload",
    description:
      "Merge form fields into static content so your PDF looks identical on every reader. 100% in your browser — no upload, no account.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flatten a PDF Online Free — No Upload",
    description:
      "Flatten PDF form fields in your browser — filled values become permanent and non-editable.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "BusinessApplication"],
  name: "Flatten PDF Online Free",
  description:
    "Flatten PDF form fields in your browser so filled values become permanent and non-editable. No upload, no account required.",
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
    "Flatten interactive form fields (text, checkboxes, dropdowns)",
    "Filled values become permanent — no more editable fields",
    "Honest handling: alerts you if no form fields are found",
    "Supports PDFs up to 100 MB",
    "100% client-side — your PDF never leaves your device",
    "No signup, no Adobe Acrobat needed",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does flattening a PDF mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flattening a PDF merges interactive form fields (text boxes, checkboxes, radio buttons, dropdowns) into the static page content. The filled values become a permanent part of the page and can no longer be edited. The document then looks identical on every PDF reader and printer.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Flatten PDF is completely free. No account, no subscription, and no file upload required. Everything runs in your browser using pdf-lib.",
      },
    },
    {
      "@type": "Question",
      name: "Is my PDF uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your PDF is processed entirely inside your browser using pdf-lib. No data is sent to any server — your file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my PDF has no form fields?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool honestly informs you that no interactive fields were found. It will still produce a clean re-saved copy of the PDF, which can help with compatibility or reduce file clutter, but no fields will be removed because there are none to remove.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I flatten a PDF before sending it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once you flatten a filled form, recipients cannot accidentally or deliberately change the values. The document also renders consistently across all PDF viewers, including those that handle form fields differently (or not at all). It is the recommended step before archiving, printing, or submitting a completed PDF form.",
      },
    },
    {
      "@type": "Question",
      name: "Can I flatten a password-protected PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses pdf-lib with ignoreEncryption:true, so it can open many PDFs that have usage restrictions. However, PDFs that require a password to open cannot be processed. If your PDF opens freely in a PDF reader, it will work here.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${APP_URL}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Flatten PDF",
      item: TOOL_URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to flatten a PDF online free",
  description:
    "Merge PDF form fields into permanent static content in your browser — no upload, no Adobe.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your PDF",
      text: "Drag and drop your PDF into the upload area or click to browse. The tool supports PDFs up to 100 MB. It reads the file and detects whether it has interactive form fields.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Click Flatten PDF",
      text: 'Click the "Flatten PDF" button. The tool uses pdf-lib to merge all form fields into the page content. If no fields are found, it produces a clean re-saved copy and tells you honestly.',
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the flattened PDF",
      text: "Click Download to save the flattened PDF to your device. The filled values are now permanent and the document looks the same on every PDF reader.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FlattenPdfPage() {
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
          <nav
            className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#525252] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/tools"
              className="hover:text-[#525252] transition-colors"
            >
              Tools
            </Link>
            <span>/</span>
            <span className="text-[#525252] dark:text-[#737373]">
              Flatten PDF
            </span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EF444414" }}
              aria-hidden="true"
            >
              {/* IconFlattenPdf inline — layers compressing into one */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <style>{`
                  @keyframes flat-layer-top {
                    0%, 15%  { transform: translateY(-8px); opacity: 0.4; }
                    55%, 80% { transform: translateY(0px);  opacity: 1; }
                    100%     { transform: translateY(-8px); opacity: 0.4; }
                  }
                  @keyframes flat-layer-mid {
                    0%, 25%  { transform: translateY(-4px); opacity: 0.55; }
                    55%, 80% { transform: translateY(0px);  opacity: 1; }
                    100%     { transform: translateY(-4px); opacity: 0.55; }
                  }
                  @keyframes flat-lock {
                    0%, 55% { opacity: 0; transform: scale(0.6); }
                    72%, 90%{ opacity: 1; transform: scale(1); }
                    100%    { opacity: 0; transform: scale(0.6); }
                  }
                  .flat-top { transform-origin: 24px 20px; animation: flat-layer-top 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
                  .flat-mid { transform-origin: 24px 24px; animation: flat-layer-mid 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
                  .flat-lock{ transform-origin: 36px 36px; animation: flat-lock 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
                `}</style>
                {/* Base layer (static) */}
                <rect
                  x="8"
                  y="32"
                  width="32"
                  height="5"
                  rx="1.5"
                  fill="#EF4444"
                  fillOpacity="0.9"
                />
                {/* Middle layer */}
                <g className="flat-mid">
                  <rect
                    x="8"
                    y="24"
                    width="32"
                    height="5"
                    rx="1.5"
                    fill="#EF4444"
                    fillOpacity="0.55"
                    stroke="#EF4444"
                    strokeWidth="0.75"
                  />
                </g>
                {/* Top layer */}
                <g className="flat-top">
                  <rect
                    x="8"
                    y="16"
                    width="32"
                    height="5"
                    rx="1.5"
                    fill="#EF4444"
                    fillOpacity="0.28"
                    stroke="#EF4444"
                    strokeWidth="0.75"
                  />
                </g>
                {/* Lock badge */}
                <g className="flat-lock" style={{ opacity: 0 }}>
                  <rect
                    x="28"
                    y="28"
                    width="16"
                    height="12"
                    rx="3"
                    fill="#EF4444"
                  />
                  <text
                    x="36"
                    y="37"
                    fontSize="5"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    FLAT
                  </text>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Flatten a PDF Online Free
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Merge form fields into the page so filled values become
                permanent and non-editable. Your PDF looks the same on every
                reader and printer. 100% in your browser — no upload, no
                account, no Adobe.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {[
              "100% Free",
              "No Upload",
              "No Signup",
              "Form Fields Locked",
              "Works on Mobile",
              "Privacy",
            ].map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Tool */}
        <FlattenPdfClient />
      </div>

      {/* Related tools */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <RelatedTools toolId="flatten-pdf" />
      </div>

      {/* FAQ */}
      <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What does flattening a PDF mean?",
                a: "Flattening merges interactive form fields — text boxes, checkboxes, radio buttons, dropdowns — into the static page content. The filled values become a permanent part of the page and can no longer be edited. The document then looks identical on every PDF reader and printer.",
              },
              {
                q: "Is this tool free?",
                a: "Yes, completely free. No account, no subscription, and no file upload required. Everything runs in your browser using pdf-lib.",
              },
              {
                q: "Is my PDF uploaded to a server?",
                a: "No. Your PDF is processed entirely inside your browser. No data is sent to any server — your file never leaves your device.",
              },
              {
                q: "What happens if my PDF has no form fields?",
                a: "The tool honestly tells you that no interactive fields were found. It still produces a clean re-saved copy and downloads it, but it will note that no fields were flattened.",
              },
              {
                q: "Why should I flatten a PDF before sending it?",
                a: "Flattening prevents recipients from changing the filled values, ensures consistent rendering across all PDF viewers (including those that handle form fields poorly), and is the recommended step before archiving or submitting a completed PDF form.",
              },
              {
                q: "Can I flatten a password-protected PDF?",
                a: "PDFs with usage restrictions (printing, copying, editing locked) can usually be processed. PDFs that require a password to open cannot. If your PDF opens freely in a PDF reader, it will work here.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] pb-5 last:border-0 last:pb-0"
              >
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {q}
                </p>
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal link block */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
          Looking for other PDF tools? Try{" "}
          <Link
            href="/tools/pdf-protect"
            className="text-[#EF4444] hover:underline"
          >
            Password Protect PDF
          </Link>{" "}
          to lock your flattened document,{" "}
          <Link
            href="/tools/pdf-watermark"
            className="text-[#EF4444] hover:underline"
          >
            Watermark PDF
          </Link>{" "}
          to stamp CONFIDENTIAL before sharing, or{" "}
          <Link
            href="/tools/pdf-compress"
            className="text-[#EF4444] hover:underline"
          >
            Compress PDF
          </Link>{" "}
          to reduce file size after flattening.
        </p>
      </div>
    </>
  );
}
