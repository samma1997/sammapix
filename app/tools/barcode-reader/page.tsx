import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import BarcodeReaderClient from "@/components/tools/BarcodeReaderClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/barcode-reader`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Barcode Reader: Scan EAN/UPC From Image",
  description:
    "Decode EAN-13, UPC-A, CODE128, CODE39, ITF, QR and more from any image. 100% in your browser — no upload, no app, no signup required.",
  keywords: [
    "barcode reader",
    "barcode reader online",
    "scan barcode from image",
    "decode ean upc",
    "read barcode from picture",
    "barcode scanner no app",
    "ean 13 reader online",
    "upc barcode decoder",
    "code128 reader",
    "barcode reader no upload",
    "free barcode scanner browser",
    "online barcode decoder",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free Barcode Reader: Scan EAN/UPC From Image",
    description:
      "Upload an image containing a barcode and decode it instantly in your browser. EAN-13, UPC-A, CODE128, QR and more — nothing is uploaded.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Barcode Reader — Scan EAN/UPC From Image, No Upload",
    description:
      "Decode EAN, UPC, CODE128, QR barcodes from images or camera. No upload, no app. 100% in your browser.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Barcode Reader",
  description:
    "Decode 1D and 2D barcodes from any image file or live camera feed, entirely in your browser. Supports EAN-13, UPC-A, CODE128, CODE39, ITF, QR Code and more. No upload, no server, no account required.",
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
    "Read barcodes from uploaded images (PNG, JPG, WebP, GIF, BMP)",
    "Scan barcodes live with your device camera",
    "Supports EAN-13, EAN-8, UPC-A, UPC-E, CODE128, CODE39, ITF, QR Code, Data Matrix and more",
    "Shows both the decoded value and the detected format",
    "One-click copy of decoded content",
    "100% client-side — no image is ever uploaded to a server",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which barcode formats can it read?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports all common 1D and 2D barcode formats: EAN-13, EAN-8, UPC-A, UPC-E, CODE128, CODE39, CODE93, ITF, Codabar, QR Code, Data Matrix, Aztec, and PDF-417. It uses the open-source ZXing library ('Zebra Crossing') which is the same engine used by many Android apps.",
      },
    },
    {
      "@type": "Question",
      name: "Does the image get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your image is decoded entirely in your browser using the open-source ZXing library. Nothing is ever sent to any server. The file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Why is no barcode found in my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons: the barcode is blurry, too small, or at an angle. The image may have glare, or the barcode is partially obstructed. Try cropping the image tightly around the barcode and re-uploading. Make sure the image is sharp and well-lit.",
      },
    },
    {
      "@type": "Question",
      name: "Can it scan a barcode from a photo of a product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Take a photo of the product barcode, upload it here, and the tool will decode the EAN-13 or UPC-A value. For best results, make sure the barcode fills most of the image frame and is in focus.",
      },
    },
    {
      "@type": "Question",
      name: "Can I scan barcodes with my phone camera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Switch to the 'Scan with Camera' tab. The tool accesses your device camera (with your permission), scans the live video feed frame by frame, and stops automatically as soon as a barcode is detected. No video is recorded or uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG, JPG/JPEG, WebP, GIF, and BMP are supported. The maximum file size is 20 MB. HEIC files from iPhones may need to be converted to JPG first.",
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
    { "@type": "ListItem", position: 3, name: "Barcode Reader", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to read a barcode from an image online for free",
  description:
    "Decode a barcode from any image file in your browser — no upload, no app, no account.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your image",
      text: "Drag and drop or click to upload a PNG, JPG, WebP, GIF or BMP file containing a barcode. Alternatively switch to the Camera tab to scan a physical barcode in real time.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Automatic decoding",
      text: "The tool draws your image onto an offscreen HTML Canvas element, extracts the pixel data, and passes it to the ZXing decoder entirely in your browser. Decoding takes less than a second and nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy the decoded value",
      text: "The barcode value and format (e.g. EAN-13, CODE128) appear instantly. Click Copy to copy the value to your clipboard.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BarcodeReaderPage() {
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
            <span className="text-[#525252] dark:text-[#737373]">Barcode Reader</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              {/* Inline animated icon for hero */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes br-scan{0%{transform:translateY(-9px);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateY(9px);opacity:0}}
                  @keyframes br-bar{0%,100%{opacity:0.35}50%{opacity:1}}
                  .br-scan{animation:br-scan 2s cubic-bezier(0.4,0,0.2,1) infinite}
                  .br-b1{animation:br-bar 2s ease-in-out infinite}
                  .br-b2{animation:br-bar 2s ease-in-out infinite;animation-delay:0.15s}
                  .br-b3{animation:br-bar 2s ease-in-out infinite;animation-delay:0.3s}
                  .br-b4{animation:br-bar 2s ease-in-out infinite;animation-delay:0.05s}
                  .br-b5{animation:br-bar 2s ease-in-out infinite;animation-delay:0.25s}
                `}</style>
                {/* Barcode bars */}
                <rect className="br-b1" x="5"  y="10" width="3"  height="28" rx="1" fill="#6366F1" fillOpacity="0.9"/>
                <rect className="br-b2" x="10" y="10" width="5"  height="28" rx="1" fill="#6366F1" fillOpacity="0.7"/>
                <rect className="br-b3" x="17" y="10" width="2"  height="28" rx="1" fill="#6366F1" fillOpacity="0.9"/>
                <rect          x="21" y="10" width="4"  height="28" rx="1" fill="#6366F1" fillOpacity="0.5"/>
                <rect className="br-b4" x="27" y="10" width="3"  height="28" rx="1" fill="#6366F1" fillOpacity="0.85"/>
                <rect          x="32" y="10" width="2"  height="28" rx="1" fill="#6366F1" fillOpacity="0.5"/>
                <rect className="br-b5" x="36" y="10" width="5"  height="28" rx="1" fill="#6366F1" fillOpacity="0.75"/>
                <rect          x="43" y="10" width="2"  height="28" rx="1" fill="#6366F1" fillOpacity="0.9"/>
                {/* Animated scanner line */}
                <line className="br-scan" x1="3" y1="24" x2="45" y2="24" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free Barcode Reader
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Scan and decode EAN, UPC, CODE128 and other barcodes from an image, right in your browser — no upload, no app.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "EAN / UPC / CODE128", "QR Too", "Image or Camera"].map((b) => (
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
        <BarcodeReaderClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="barcode-reader" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Read barcodes without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses the open-source{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">ZXing</code>{" "}
              ("Zebra Crossing") library — the same engine behind many Android barcode scanner apps — to locate and decode barcodes directly inside your browser. Your image is drawn onto an invisible HTML Canvas element, the pixel data is extracted with{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">getImageData()</code>,
              and passed to the ZXing decoder entirely without any network request.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              You can also use the Camera tab to scan a physical barcode in real time. The camera feed is processed frame by frame in JavaScript — nothing is uploaded or recorded.
            </p>
          </section>

          {/* Supported formats */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Supported barcode formats
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { format: "EAN-13", desc: "Standard retail barcode for products sold outside North America" },
                { format: "UPC-A", desc: "Standard North American retail barcode (12 digits)" },
                { format: "EAN-8", desc: "Compact retail barcode for small packaging" },
                { format: "UPC-E", desc: "Compressed UPC for small packages" },
                { format: "CODE128", desc: "High-density alphanumeric barcode for shipping and logistics" },
                { format: "CODE39", desc: "Alphanumeric barcode widely used in automotive and defense" },
                { format: "ITF", desc: "Interleaved Two of Five — used on shipping cartons (ITF-14)" },
                { format: "QR Code", desc: "2D matrix code for URLs, Wi-Fi, text and contact data" },
              ].map(({ format, desc }) => (
                <div key={format} className="px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] flex items-start gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#6366F1]/10 text-[#6366F1] shrink-0 mt-0.5">{format}</span>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Look up a product barcode", desc: "Photograph a product and upload the image to instantly extract the EAN-13 or UPC-A number for database lookup or price checking." },
                { title: "Decode a barcode from a screenshot", desc: "Received an image with a barcode you cannot scan physically? Upload the screenshot and get the decoded value in seconds." },
                { title: "Verify a label barcode", desc: "After printing product labels, upload a photo of the printed barcode to verify it decodes to the correct value before shipping." },
                { title: "Scan shipping labels", desc: "Extract the CODE128 tracking number from a shipping label photo without needing a physical scanner device." },
              ].map(({ title, desc }) => (
                <div key={title} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/barcode-generator", label: "Barcode Generator", desc: "Create EAN, UPC, CODE128 barcodes as PNG or SVG" },
                { href: "/tools/qr-code-reader", label: "QR Code Reader", desc: "Decode any QR code from an image or camera" },
                { href: "/tools/qr-code-generator", label: "QR Code Generator", desc: "Create QR codes for URL, Wi-Fi, text and email" },
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
