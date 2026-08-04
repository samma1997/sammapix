import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import BarcodeGeneratorClient from "@/components/tools/BarcodeGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/barcode-generator`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Barcode Generator: CODE128, EAN, UPC, No Upload",
  description:
    "Generate CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14 barcodes instantly. Download PNG or SVG. 100% in your browser — no signup, no upload.",
  keywords: [
    "barcode generator",
    "free barcode generator",
    "ean barcode generator",
    "code128 generator",
    "upc barcode generator",
    "barcode png svg",
    "ean-13 barcode",
    "itf-14 barcode",
    "online barcode maker no upload",
    "barcode generator no signup",
    "free barcode maker",
    "create barcode online",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free Barcode Generator: CODE128, EAN, UPC — No Upload",
    description:
      "Generate CODE128, EAN-13, EAN-8, UPC-A, CODE39 and ITF-14 barcodes in your browser. Download PNG or SVG. No upload, no account, no watermark.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Barcode Generator — CODE128, EAN, UPC, No Upload",
    description:
      "Create barcodes for CODE128, EAN-13, UPC-A and more. Download PNG + SVG. 100% browser-side — nothing uploaded.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Barcode Generator",
  description:
    "Generate CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14, MSI and Pharmacode barcodes entirely in your browser. Download as PNG or SVG. No upload, no account, no watermark.",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
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
    "Supports CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14, MSI and Pharmacode",
    "Live preview updates as you type",
    "Adjustable bar height and width",
    "Custom bar color and background color",
    "Toggle text display below bars",
    "Download as PNG (2x resolution) or SVG",
    "Copy SVG markup to clipboard",
    "100% client-side — no data ever leaves your device",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this barcode generator completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is free with no hidden limits, no account required and no file upload. Barcodes are generated entirely in your browser using the open-source JsBarcode library.",
      },
    },
    {
      "@type": "Question",
      name: "Are these barcodes free for commercial or retail use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The barcodes generated here contain no watermark and carry no usage restrictions. You can use them on product packaging, retail labels, shipping labels, invoices and marketing materials. Note that standard EAN and UPC barcodes for retail products must be registered with GS1 — this tool generates the visual barcode from any number you provide.",
      },
    },
    {
      "@type": "Question",
      name: "Which barcode formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CODE128 (universal, any ASCII), EAN-13 (retail products internationally), EAN-8 (small packaging), UPC-A (retail products in North America), CODE39 (logistics, ID cards), ITF-14 (shipping cartons), MSI / Plessey (inventory shelving) and Pharmacode (pharmaceutical packaging).",
      },
    },
    {
      "@type": "Question",
      name: "Why is my EAN-13 or UPC barcode showing an error?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EAN-13 requires exactly 12 digits (the check digit is added automatically) or all 13 digits. UPC-A requires 11 digits (check digit auto-added) or 12 digits. ITF-14 requires 13 or 14 digits. Make sure you are entering only digits and the correct count for your chosen format.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between PNG and SVG download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG is a raster image exported at 2x resolution — ideal for web pages, emails, Word documents and straightforward prints. SVG is a vector format that stays perfectly crisp at any size, making it the right choice for large-format print (labels, banners, packaging) and further editing in Illustrator, Inkscape or Figma.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs locally in your browser using JavaScript. The value you enter is never sent to any server and is never stored anywhere. You can even use the tool offline after the page has loaded.",
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
    { "@type": "ListItem", position: 3, name: "Barcode Generator", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to generate a barcode online for free",
  description:
    "Create a CODE128, EAN, UPC or other barcode in your browser and download it as PNG or SVG — no signup, no upload.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a barcode format",
      text: "Select the format that matches your use case from the dropdown — CODE128 for general use, EAN-13 or UPC-A for retail products, ITF-14 for shipping cartons.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your value",
      text: "Type the text or number you want to encode. The barcode preview updates live as you type. Adjust bar height, width and colors in the options panel.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download PNG or SVG",
      text: "Click Download PNG for a high-resolution image ready for web or print, or Download SVG for a scalable vector file that stays crisp at any size.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BarcodeGeneratorPage() {
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
            <span className="text-[#525252] dark:text-[#737373]">Barcode Generator</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              {/* Animated barcode icon (matches ToolCard icon) */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <style>{`
                  @keyframes bc-b1 { 0%,100%{transform:scaleY(0.6);opacity:0.5} 40%,60%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b2 { 0%,100%{transform:scaleY(0.5);opacity:0.4} 35%,65%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b3 { 0%,100%{transform:scaleY(0.7);opacity:0.6} 45%,55%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b4 { 0%,100%{transform:scaleY(0.4);opacity:0.35} 30%,70%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b5 { 0%,100%{transform:scaleY(0.65);opacity:0.55} 38%,62%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b6 { 0%,100%{transform:scaleY(0.5);opacity:0.45} 42%,58%{transform:scaleY(1);opacity:1} }
                  @keyframes bc-b7 { 0%,100%{transform:scaleY(0.6);opacity:0.5} 36%,64%{transform:scaleY(1);opacity:1} }
                  .bc-b1{transform-origin:center 28px;animation:bc-b1 2.4s cubic-bezier(0.34,1.4,0.64,1) 0s infinite}
                  .bc-b2{transform-origin:center 28px;animation:bc-b2 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.15s infinite}
                  .bc-b3{transform-origin:center 28px;animation:bc-b3 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.3s infinite}
                  .bc-b4{transform-origin:center 28px;animation:bc-b4 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.08s infinite}
                  .bc-b5{transform-origin:center 28px;animation:bc-b5 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.22s infinite}
                  .bc-b6{transform-origin:center 28px;animation:bc-b6 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.38s infinite}
                  .bc-b7{transform-origin:center 28px;animation:bc-b7 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.05s infinite}
                `}</style>
                <rect className="bc-b1" x="4"  y="10" width="4"   height="36" rx="1" fill="#6366F1"/>
                <rect className="bc-b2" x="10" y="10" width="2"   height="36" rx="0.5" fill="#6366F1" fillOpacity="0.8"/>
                <rect className="bc-b3" x="14" y="10" width="5"   height="36" rx="1" fill="#6366F1"/>
                <rect className="bc-b4" x="21" y="10" width="2.5" height="36" rx="0.5" fill="#6366F1" fillOpacity="0.75"/>
                <rect className="bc-b5" x="25" y="10" width="4"   height="36" rx="1" fill="#6366F1"/>
                <rect className="bc-b6" x="31" y="10" width="2"   height="36" rx="0.5" fill="#6366F1" fillOpacity="0.8"/>
                <rect className="bc-b7" x="35" y="10" width="3"   height="36" rx="1" fill="#6366F1"/>
                <rect             x="40" y="10" width="4"   height="36" rx="1" fill="#6366F1" opacity="0.9"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free Barcode Generator
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Generate CODE128, EAN, UPC and more barcodes in your browser — no signup, no upload, download PNG or SVG.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "PNG + SVG", "8 Formats", "Commercial Use OK"].map((b) => (
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
      <div className="bg-white dark:bg-[#191919] py-8">
        <BarcodeGeneratorClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="barcode-generator" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Generate barcodes without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses the open-source{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">JsBarcode</code>{" "}
              library to render barcodes entirely in your browser. No server receives your data. The barcode is rendered as an SVG element and can be exported as a scalable SVG vector or a 2x-resolution PNG raster image.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              The generated codes are standards-compliant and contain no watermark. You can use them on product labels, shipping documents, retail packaging, invoices and marketing materials without restrictions.
            </p>
          </section>

          {/* Formats */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Supported barcode formats
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "CODE128", desc: "The most versatile 1D barcode. Accepts any ASCII character — letters, digits and symbols. Used in logistics, shipping and general inventory." },
                { title: "EAN-13", desc: "Standard retail barcode used internationally. Encodes 12 digits plus a check digit. Required for products sold in Europe, Asia and most of the world." },
                { title: "EAN-8", desc: "Compact version of EAN for small packaging where a full EAN-13 would not fit. Encodes 7 digits plus a check digit." },
                { title: "UPC-A", desc: "The standard retail barcode in North America. Encodes 11 digits plus a check digit. Used on virtually all products sold in the US and Canada." },
                { title: "CODE39", desc: "Alphanumeric barcode supporting uppercase letters, digits and a handful of special characters. Common in automotive, defense and ID badge printing." },
                { title: "ITF-14", desc: "Designed for outer shipping cartons (cases). Encodes 14 digits with the distinctive bearer bars. Standard for GS1 logistics labels." },
                { title: "MSI / Plessey", desc: "Numeric-only barcode used mainly for inventory and warehouse shelf labeling. Accepts any sequence of digits." },
                { title: "Pharmacode", desc: "Specialized barcode used on pharmaceutical packaging. Encodes integers from 3 to 131070 as a series of bars of two different widths." },
              ].map(({ title, desc }) => (
                <div key={title} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PNG vs SVG */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              PNG vs SVG — which format to download?
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Download <strong className="text-[#171717] dark:text-[#E5E5E5]">PNG</strong> when you need a ready-to-use image for a website, email, Word document or a small print. The PNG is exported at 2x resolution for sharpness on high-DPI screens and printers.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Download <strong className="text-[#171717] dark:text-[#E5E5E5]">SVG</strong> when you need the barcode to scale without pixelation — product labels, packaging artwork, laser engraving or whenever a designer will open it in Illustrator, Inkscape or Figma. SVG is also the format to use if your printing workflow requires vector input.
            </p>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/qr-code-generator", label: "QR Code Generator", desc: "URL, text, Wi-Fi and email QR codes" },
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Embed images as Data URIs" },
                { href: "/tools/qr-code-reader", label: "QR Code Reader", desc: "Decode QR codes from image or camera" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
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
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-4 bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q.name}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
