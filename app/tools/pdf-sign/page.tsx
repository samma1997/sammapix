import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import PdfSignClient from "@/components/tools/PdfSignClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/pdf-sign`;

export const metadata: Metadata = {
  title: "Sign a PDF Online Free: No Upload",
  description:
    "Draw or upload a signature and embed it on any PDF page — 100% in your browser. No upload, no account, no Adobe. Free visual e-signature tool.",
  keywords: [
    "sign pdf online",
    "sign pdf free",
    "add signature to pdf",
    "esign pdf free",
    "draw signature on pdf",
    "pdf signature online no upload",
    "sign pdf no account",
    "pdf digital signature free",
    "electronic signature pdf browser",
    "sign pdf without uploading",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Sign a PDF Online Free — Draw or Upload Signature",
    description:
      "Add a visual signature to any PDF page in your browser. Draw or upload PNG. No file upload, no signup, no Adobe.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign a PDF Online Free — Draw or Upload Signature",
    description:
      "Draw or upload a signature and embed it on any PDF page — 100% in your browser.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "BusinessApplication"],
  name: "Sign PDF Online Free",
  description:
    "Draw or upload a signature and embed it on any PDF page — 100% in your browser. No upload, no account required.",
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
    "Draw signature with mouse or touch",
    "Upload PNG or JPG signature image",
    "Embed signature on any page",
    "4 position presets (bottom-right, bottom-left, center, bottom-center)",
    "Adjustable signature width and height",
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
        text: "Yes, Sign PDF is completely free. No account, no subscription, and no file upload required. Everything runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is my PDF uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your PDF and signature are processed entirely inside your browser using pdf-lib and the HTML Canvas API. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a legal or digital signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This tool adds a visual signature image (like a drawn or scanned handwritten signature) overlaid on a PDF page. It is NOT a cryptographic or certificate-based digital signature as defined by eIDAS, Adobe Sign, or DocuSign. For legally-binding electronic signatures, use a qualified trust service provider.",
      },
    },
    {
      "@type": "Question",
      name: "Can I draw my signature on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The drawing canvas supports both mouse and touch input. On mobile, use your finger or a stylus to draw your signature.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can I upload as a signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can upload PNG or JPG images. PNG with a transparent background gives the cleanest result — the background is invisible on the PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Does signing change the PDF text or other pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The signature is embedded only on the page you select. All other pages and the text content remain completely unchanged.",
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
    { "@type": "ListItem", position: 3, name: "Sign PDF", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to sign a PDF online free",
  description:
    "Draw or upload a signature and embed it on any PDF page, entirely in your browser.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your PDF",
      text: "Drag and drop your PDF file into the upload area or click to browse. Supports up to 100 MB.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Create your signature",
      text: 'Choose "Draw signature" to sign with your mouse or finger, or "Upload image" to use a PNG/JPG of your signature. Select the page and position.',
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the signed PDF",
      text: 'Click "Sign PDF". The signature is embedded on your chosen page and the file downloads immediately — no upload, no account needed.',
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PdfSignPage() {
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
            <span className="text-[#525252] dark:text-[#737373]">Sign PDF</span>
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
                  @keyframes pdfsign-pen-h {
                    0%, 15%  { transform: translate(0px, 0px); opacity: 0.3; }
                    40%      { transform: translate(14px, -4px); opacity: 1; }
                    65%      { transform: translate(22px, 2px); opacity: 1; }
                    80%, 100%{ transform: translate(26px, 6px); opacity: 0.3; }
                  }
                  @keyframes pdfsign-line-h {
                    0%, 15%  { stroke-dashoffset: 32; opacity: 0; }
                    40%      { stroke-dashoffset: 16; opacity: 0.8; }
                    70%      { stroke-dashoffset: 0; opacity: 1; }
                    90%, 100%{ stroke-dashoffset: 0; opacity: 0.4; }
                  }
                  @keyframes pdfsign-dot-h {
                    0%, 60%  { r: 0; opacity: 0; }
                    75%      { r: 2; opacity: 1; }
                    90%, 100%{ r: 1.5; opacity: 0.6; }
                  }
                  .pdfsign-pen-h  { transform-origin: 10px 38px; animation: pdfsign-pen-h 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
                  .pdfsign-line-h { stroke-dasharray: 32; animation: pdfsign-line-h 2.4s ease-in-out infinite; }
                  .pdfsign-dot-h  { animation: pdfsign-dot-h 2.4s ease-in-out infinite; }
                `}</style>
                <rect x="4" y="4" width="28" height="36" rx="2.5" fill="#EF4444" fillOpacity="0.10" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M26 4 L32 10 L26 10 Z" fill="#EF4444" fillOpacity="0.25"/>
                <rect x="8" y="14" width="16" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.3"/>
                <rect x="8" y="18" width="12" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.3"/>
                <rect x="8" y="22" width="14" height="1.5" rx="0.75" fill="#EF4444" fillOpacity="0.25"/>
                <line x1="8" y1="36" x2="28" y2="36" stroke="#EF4444" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="1.5 1.5"/>
                <path
                  className="pdfsign-line-h"
                  d="M8 34 Q12 28 16 32 Q20 36 24 30 Q27 26 30 32"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle className="pdfsign-dot-h" cx="30" cy="32" r="0" fill="#EF4444"/>
                <g className="pdfsign-pen-h">
                  <rect x="6" y="34" width="7" height="3" rx="0.75" fill="#EF4444" fillOpacity="0.7" transform="rotate(-35 9 35.5)"/>
                  <polygon points="6,37 7.5,40.5 9,37" fill="#EF4444" fillOpacity="0.9" transform="rotate(-35 7.5 38.5)"/>
                </g>
                <rect x="34" y="36" width="12" height="8" rx="4" fill="#EF4444"/>
                <text x="40" y="42" fontSize="4" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">PDF</text>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Sign a PDF Online Free
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Draw a signature with your mouse or finger, or upload a PNG/JPG of your signature. Embed it on any PDF page in seconds. No upload. No account. No Adobe.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "Draw or Upload", "Works on Mobile", "Privacy"].map((b) => (
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
      <PdfSignClient />

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="pdf-sign" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Sign a PDF without uploading or installing anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix Sign PDF runs entirely in your browser using pdf-lib and the HTML Canvas API. Your document and signature image are processed locally — no file ever leaves your device, no server receives it, and no account is required.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Draw your signature with your mouse or finger directly on the canvas, or upload a PNG/JPG scan of your handwritten signature. Choose which page to sign, pick a position preset (bottom-right is the most common), adjust the size, and click Sign PDF.
            </p>
          </section>

          {/* Two modes */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Draw vs Upload — which to use?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Draw signature</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  Best for quick signing on desktop or tablet. Use your mouse, trackpad, or a stylus. The canvas exports as a transparent PNG, so your drawn signature blends cleanly into the PDF background.
                </p>
              </div>
              <div className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Upload image</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  Best when you have a scanned or photographed signature. Use a PNG with transparent background for the cleanest result. JPG works too, but the white background will be visible on the PDF.
                </p>
              </div>
            </div>
          </section>

          {/* Honesty section */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Visual signature vs digital signature — what is the difference?
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool creates a <strong>visual signature</strong> — an image of your handwritten signature embedded onto a PDF page. It looks like a signature and can satisfy many informal signing needs (internal approvals, forms that only require a signature image, personal documents).
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              A <strong>cryptographic digital signature</strong> (as defined by eIDAS, the EU electronic signature regulation, or standards used by Adobe Sign, DocuSign, and qualified trust service providers) binds your identity to the document using a digital certificate and is legally equivalent to a handwritten signature in most jurisdictions. If you need that level of legal assurance, use a qualified e-signature service.
            </p>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related PDF tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/pdf-protect", label: "PDF Protect", desc: "Add a password after signing" },
                { href: "/tools/pdf-watermark", label: "PDF Watermark", desc: "Stamp CONFIDENTIAL on every page" },
                { href: "/tools/redact-pdf", label: "Redact PDF", desc: "Remove sensitive text before signing" },
                { href: "/tools/pdf-compress", label: "PDF Compress", desc: "Reduce file size after signing" },
                { href: "/tools/pdf-merge", label: "Merge PDF", desc: "Combine signed documents" },
                { href: "/tools/pdf-rotate", label: "Rotate PDF", desc: "Fix orientation before signing" },
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
                  q: "Is this tool completely free?",
                  a: "Yes. Sign PDF is free with no hidden limits, no account required, and no file upload. The PDF and signature are processed locally in your browser.",
                },
                {
                  q: "Is this a legal e-signature?",
                  a: "No. This tool adds a visual signature image to your PDF — it is not a cryptographic digital signature compliant with eIDAS, Adobe Sign, or DocuSign standards. For legally binding e-signatures, use a qualified trust service provider.",
                },
                {
                  q: "Does my file get uploaded anywhere?",
                  a: "No. Your PDF never leaves your device. All processing happens in the browser using pdf-lib and the HTML Canvas API.",
                },
                {
                  q: "Can I sign on mobile?",
                  a: "Yes. The drawing canvas supports touch input, so you can sign with your finger on any smartphone or tablet.",
                },
                {
                  q: "What is the maximum file size?",
                  a: "Up to 100 MB. For very large PDFs, the page thumbnails may take a few seconds to render.",
                },
                {
                  q: "What format should my signature image be in?",
                  a: "PNG with a transparent background gives the cleanest result — the background disappears on the PDF. JPG also works but includes a white background rectangle.",
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
