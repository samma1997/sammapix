import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import QrCodeReaderClient from "@/components/tools/QrCodeReaderClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/qr-code-reader`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free QR Code Reader: Scan From Image, No Upload",
  description:
    "Decode any QR code from an image or your camera — right in your browser. No upload, no app, no signup. Works with screenshots, photos and PDFs.",
  keywords: [
    "qr code reader",
    "qr code reader online",
    "scan qr from image",
    "decode qr code",
    "read qr code from picture",
    "qr scanner no app",
    "qr code decoder online",
    "scan qr code screenshot",
    "qr code reader no upload",
    "free qr code scanner browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free QR Code Reader: Scan From Image, No Upload",
    description:
      "Upload an image or use your camera to decode any QR code instantly. URL, Wi-Fi, text, contact — all decoded in your browser, nothing uploaded.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Reader — Scan From Image, No Upload",
    description:
      "Decode QR codes from images or camera. No upload, no app. 100% in your browser.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free QR Code Reader",
  description:
    "Decode QR codes from any image file or live camera feed, entirely in your browser. No upload, no server, no account required.",
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
    "Read QR codes from uploaded images (PNG, JPG, WebP, GIF, BMP)",
    "Scan QR codes live with your device camera",
    "Decode URLs, Wi-Fi credentials, plain text, contacts, events and more",
    "One-click copy of decoded content",
    "Open valid URLs directly from the result",
    "100% client-side — no image is ever uploaded to a server",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the image get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your image is decoded entirely in your browser using the open-source jsQR library. Nothing is ever sent to any server. The file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can it read a QR code from a screenshot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Screenshots are one of the most common use cases. Upload the screenshot as a PNG or JPG and the tool will locate and decode any QR code in it automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What types of QR code content can it decode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool can decode any standard QR code regardless of what it contains — URLs, plain text, Wi-Fi network credentials (WIFI: format), email addresses (mailto:), phone numbers (tel:), contact cards (vCard), calendar events (vEvent), SMS, and geographic coordinates.",
      },
    },
    {
      "@type": "Question",
      name: "Why is no QR code found in my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons: the QR code is blurry or too small relative to the image size, it is damaged or partially obscured, the image has strong glare, or the file is a screenshot of a screen with a very low-resolution QR code. Try cropping the image closer to the QR code and re-uploading.",
      },
    },
    {
      "@type": "Question",
      name: "Can I scan a QR code from my phone camera using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Switch to the 'Scan with Camera' tab. The tool accesses your device camera (with your permission), scans the live video feed frame by frame, and stops automatically as soon as a QR code is detected. No video is recorded or uploaded.",
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
    { "@type": "ListItem", position: 3, name: "QR Code Reader", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to read a QR code from an image online for free",
  description:
    "Decode a QR code from any image file in your browser — no upload, no app, no account.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload your image",
      text: "Drag and drop or click to upload a PNG, JPG, WebP, GIF or BMP file that contains a QR code. Alternatively switch to the Camera tab to scan live.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Wait for automatic decoding",
      text: "The tool draws your image on an invisible canvas, extracts the pixel data, and runs it through the jsQR decoder entirely in your browser. Decoding takes less than a second.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or open the result",
      text: "The decoded text or URL appears instantly. Click Copy to copy it to your clipboard, or click Open URL if it is a web link.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QrCodeReaderPage() {
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
            <span className="text-[#525252] dark:text-[#737373]">QR Code Reader</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              {/* Inline copy of the animated icon for the hero */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes qrr-scan { 0%{transform:translateY(-10px);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translateY(10px);opacity:0} }
                  @keyframes qrr-tl { 0%,100%{opacity:1} }
                  @keyframes qrr-glow { 0%,100%{opacity:0.3} 50%{opacity:1} }
                  .qrr-line{animation:qrr-scan 2.2s cubic-bezier(0.4,0,0.2,1) infinite}
                  .qrr-dot{animation:qrr-glow 2.2s ease-in-out infinite}
                `}</style>
                {/* QR finder corners */}
                <rect x="4" y="4" width="14" height="14" rx="2" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                <rect x="7" y="7" width="8" height="8" rx="1" fill="#6366F1" fillOpacity="0.4"/>
                <rect x="9" y="9" width="4" height="4" rx="0.5" fill="#6366F1"/>
                <rect x="30" y="4" width="14" height="14" rx="2" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                <rect x="33" y="7" width="8" height="8" rx="1" fill="#6366F1" fillOpacity="0.4"/>
                <rect x="35" y="9" width="4" height="4" rx="0.5" fill="#6366F1"/>
                <rect x="4" y="30" width="14" height="14" rx="2" fill="#6366F1" fillOpacity="0.18" stroke="#6366F1" strokeWidth="1.5"/>
                <rect x="7" y="33" width="8" height="8" rx="1" fill="#6366F1" fillOpacity="0.4"/>
                <rect x="9" y="35" width="4" height="4" rx="0.5" fill="#6366F1"/>
                {/* Data dots */}
                <rect className="qrr-dot" x="30" y="30" width="4" height="4" rx="0.75" fill="#6366F1" fillOpacity="0.7"/>
                <rect className="qrr-dot" x="36" y="30" width="4" height="4" rx="0.75" fill="#6366F1" fillOpacity="0.5" style={{animationDelay:"0.2s"}}/>
                <rect className="qrr-dot" x="30" y="36" width="4" height="4" rx="0.75" fill="#6366F1" fillOpacity="0.6" style={{animationDelay:"0.4s"}}/>
                <rect className="qrr-dot" x="36" y="36" width="4" height="4" rx="0.75" fill="#6366F1" fillOpacity="0.9" style={{animationDelay:"0.1s"}}/>
                {/* Animated scanner line */}
                <line className="qrr-line" x1="2" y1="24" x2="46" y2="24" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free QR Code Reader
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Scan and decode any QR code from an image, right in your browser — no upload, no app to install.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "Image or Camera", "All QR Types", "No App Needed"].map((b) => (
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
        <QrCodeReaderClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="qr-code-reader" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Read QR codes without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses the open-source{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">jsQR</code>{" "}
              library to locate and decode QR codes directly inside your browser. Your image is drawn onto an invisible HTML Canvas element, the pixel data is extracted with{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">getImageData()</code>,
              and passed to the jsQR decoder — all without any network request.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              You can also use the Camera tab to scan a physical QR code in real time. The camera feed is processed frame by frame in JavaScript — again, nothing is uploaded or recorded.
            </p>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Decode a QR from a screenshot", desc: "Received a screenshot with a QR code you cannot scan? Upload it here and get the decoded content instantly." },
                { title: "Recover a Wi-Fi password", desc: "Scan the Wi-Fi QR code on your router label or a saved screenshot to see the network credentials in plain text." },
                { title: "Check what a QR code links to", desc: "Before scanning an unknown QR code with your phone, verify the URL it encodes here without risk." },
                { title: "Decode a QR from a PDF or poster", desc: "Take a screenshot of the QR area, upload it, and get the link. Works with any image containing a clear QR code." },
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
                { href: "/tools/qr-code-generator", label: "QR Code Generator", desc: "Create QR codes for URL, Wi-Fi, text and email" },
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Encode images as Data URIs for embedding" },
                { href: "/tools/exif", label: "EXIF Viewer", desc: "Read hidden metadata from any photo" },
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
