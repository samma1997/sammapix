import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import QrCodeGeneratorClient from "@/components/tools/QrCodeGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/qr-code-generator`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free QR Code Generator: No Signup, No Upload",
  description:
    "Create QR codes for URLs, text, Wi-Fi and email in seconds. Download PNG or SVG. 100% in your browser — nothing is uploaded, no account required.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "qr code no signup",
    "create qr code online",
    "qr code png svg",
    "wifi qr code",
    "qr code maker free",
    "online qr code generator no upload",
    "generate qr code browser",
    "qr code url text wifi email",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free QR Code Generator — No Signup, No Upload",
    description:
      "Generate QR codes for URLs, text, Wi-Fi networks and email addresses. Download PNG or SVG. 100% in your browser — your data is never uploaded.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator — No Signup, No Upload",
    description:
      "QR codes for URL, text, Wi-Fi, email. PNG + SVG download. 100% browser-side — nothing uploaded.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free QR Code Generator",
  description:
    "Generate QR codes for URLs, plain text, Wi-Fi networks and email addresses. Download PNG or SVG. Runs 100% in your browser — no upload, no account required.",
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
    "URL, plain text, Wi-Fi and email QR code presets",
    "Error correction levels: L / M / Q / H",
    "Custom foreground and background colors",
    "Adjustable size (128–512 px) and quiet-zone margin",
    "Download as PNG or SVG",
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
      name: "Is this QR code generator completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is free with no hidden limits, no account and no file upload. QR codes are generated entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is the QR code free for commercial use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. QR codes generated here contain no watermark and have no usage restrictions. You can use them on products, flyers, websites and marketing materials.",
      },
    },
    {
      "@type": "Question",
      name: "Do you store the data I enter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs in your browser. The URL, text, Wi-Fi password or email you type is never sent to any server and is never stored anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "What is error correction and which level should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Error correction lets a QR code be scanned even if part of it is damaged or covered. Level M (15%) is a good default. Use Q (25%) or H (30%) if you plan to print the QR code on a textured surface or if you want to overlay a logo on top of it.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between PNG and SVG download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG is a raster image — ideal for web embeds, emails and simple prints. SVG is a vector format that stays crisp at any size, making it perfect for large-format print (banners, posters, packaging) and further editing in design tools.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a Wi-Fi QR code so guests can join my network without typing a password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Switch to the Wi-Fi preset, enter your network name (SSID), password and security type (WPA, WEP or no password). Most modern phones scan the code and connect automatically.",
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
    { "@type": "ListItem", position: 3, name: "QR Code Generator", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to create a QR code online for free",
  description:
    "Generate a QR code for a URL, text, Wi-Fi network or email address in your browser — no account, no upload.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a content type",
      text: "Select URL, Text, Wi-Fi or Email from the preset tabs at the top of the tool.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your content",
      text: "Type or paste the URL, your text, Wi-Fi credentials or email address. The QR code preview updates instantly.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download PNG or SVG",
      text: "Click Download PNG for a ready-to-use image, or Download SVG for a scalable vector file perfect for print.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QrCodeGeneratorPage() {
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
            <span className="text-[#525252] dark:text-[#737373]">QR Code Generator</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes qr-m1 { 0%,20%{opacity:0;transform:scale(0.4)}45%,80%{opacity:1;transform:scale(1)}95%,100%{opacity:0;transform:scale(0.4)} }
                  @keyframes qr-m2 { 0%,30%{opacity:0;transform:scale(0.4)}55%,85%{opacity:1;transform:scale(1)}98%,100%{opacity:0;transform:scale(0.4)} }
                  @keyframes qr-m3 { 0%,10%{opacity:0;transform:scale(0.4)}35%,75%{opacity:1;transform:scale(1)}92%,100%{opacity:0;transform:scale(0.4)} }
                  @keyframes qr-m4 { 0%,40%{opacity:0;transform:scale(0.4)}65%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.4)} }
                  .qr-m1{transform-origin:12px 12px;animation:qr-m1 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite}
                  .qr-m2{transform-origin:36px 12px;animation:qr-m2 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.15s infinite}
                  .qr-m3{transform-origin:12px 36px;animation:qr-m3 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.3s infinite}
                  .qr-m4{transform-origin:30px 30px;animation:qr-m4 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.08s infinite}
                `}</style>
                {/* Top-left finder pattern */}
                <g className="qr-m1">
                  <rect x="4" y="4" width="17" height="17" rx="2.5" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                  <rect x="8" y="8" width="9" height="9" rx="1" fill="#6366F1" fillOpacity="0.5"/>
                  <rect x="10" y="10" width="5" height="5" rx="0.5" fill="#6366F1"/>
                </g>
                {/* Top-right finder pattern */}
                <g className="qr-m2">
                  <rect x="27" y="4" width="17" height="17" rx="2.5" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                  <rect x="31" y="8" width="9" height="9" rx="1" fill="#6366F1" fillOpacity="0.5"/>
                  <rect x="33" y="10" width="5" height="5" rx="0.5" fill="#6366F1"/>
                </g>
                {/* Bottom-left finder pattern */}
                <g className="qr-m3">
                  <rect x="4" y="27" width="17" height="17" rx="2.5" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                  <rect x="8" y="31" width="9" height="9" rx="1" fill="#6366F1" fillOpacity="0.5"/>
                  <rect x="10" y="33" width="5" height="5" rx="0.5" fill="#6366F1"/>
                </g>
                {/* Data modules (bottom-right quadrant) */}
                <g className="qr-m4">
                  <rect x="27" y="27" width="5" height="5" rx="0.75" fill="#6366F1" fillOpacity="0.8"/>
                  <rect x="34" y="27" width="5" height="5" rx="0.75" fill="#6366F1" fillOpacity="0.6"/>
                  <rect x="27" y="34" width="5" height="5" rx="0.75" fill="#6366F1" fillOpacity="0.5"/>
                  <rect x="34" y="34" width="5" height="5" rx="0.75" fill="#6366F1" fillOpacity="0.9"/>
                  <rect x="30.5" y="30.5" width="3" height="3" rx="0.5" fill="#6366F1" fillOpacity="0.35"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free QR Code Generator
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Create QR codes for URLs, plain text, Wi-Fi networks and email addresses. Download PNG or SVG. No upload. No account. No watermark.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "PNG + SVG", "Wi-Fi QR", "Commercial Use OK"].map((b) => (
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
        <QrCodeGeneratorClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="qr-code-generator" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Generate QR codes without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses the open-source <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">qrcode</code> library to generate QR codes entirely inside your browser. No server receives your data — not the URL, not the Wi-Fi password, not anything you type. The QR code is rendered on an HTML Canvas and can be exported as PNG or as an SVG vector.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              The generated codes are standard QR Code Model 2, compatible with all modern smartphone cameras and barcode apps. They contain no watermark and have no usage restrictions — commercial use is fine.
            </p>
          </section>

          {/* Presets */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Four content presets
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "URL", desc: "The most common use. Paste any web address — the phone camera opens the link directly." },
                { title: "Text", desc: "Encode plain text, a phone number, an address or any free-form content." },
                { title: "Wi-Fi", desc: "Guests scan the code and join your network automatically, no typing needed. Supports WPA, WEP and open networks." },
                { title: "Email", desc: "Encodes a mailto: link. Scanning opens the default email app with the address pre-filled." },
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
              Download <strong className="text-[#171717] dark:text-[#E5E5E5]">PNG</strong> when you need a ready-to-use image for a website, email, slide or document. Set the size slider to at least 256 px for clean rendering on screen; use 512 px if you plan to print it smaller than a business card.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Download <strong className="text-[#171717] dark:text-[#E5E5E5]">SVG</strong> when you need the code to scale without pixelation — posters, banners, packaging, laser engraving, or whenever a designer will open it in Illustrator or Figma. SVG is also lighter in file size and perfectly crisp at any zoom level.
            </p>
          </section>

          {/* Related tools inline links */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Embed images as Data URIs" },
                { href: "/tools/add-text-to-image", label: "Add Text to Image", desc: "Annotate photos with captions" },
                { href: "/tools/stampit", label: "Watermark", desc: "Stamp a logo on batch photos" },
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
