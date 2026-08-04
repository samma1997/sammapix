import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "QR Code Reader Online — Decode a QR Code from an Image Free [2026]",
  description:
    "Read and decode any QR code from an image or screenshot entirely in your browser — no upload, no camera required. jsQR runs locally. See the decoded URL, text, or contact details instantly. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/qr-code-reader-online`,
  },
  keywords: [
    "qr code reader",
    "qr code reader online",
    "decode qr code",
    "read qr from image",
    "qr code decoder",
    "scan qr code from image",
    "qr code reader from image",
    "decode qr code from photo",
    "qr code reader no upload",
    "online qr code scanner",
  ],
  openGraph: {
    title: "QR Code Reader Online — Decode a QR Code from an Image Free [2026]",
    description:
      "Read and decode a QR code from any image or screenshot in your browser. No upload, no camera. jsQR runs locally. Free, no signup.",
    url: `${APP_URL}/blog/qr-code-reader-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Reader Online — Decode a QR Code from an Image Free [2026]",
    description:
      "Decode a QR code from a screenshot or image file. jsQR runs in your browser. No upload, no camera needed. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/qr-code-reader-online`;
const POST_TITLE = "QR Code Reader Online — Decode a QR Code from an Image Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Your phone camera reads QR codes in real time. But what happens when the QR code is in a screenshot, a PDF, or a photo you cannot physically point your camera at? This guide explains how QR code readers work, the difference between a reader and a scanner app, the types of data a QR code can contain, and how to decode a QR code from any image file entirely in your browser without uploading anything.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "qr code reader online",
    "decode qr code from image",
    "qr code reader",
    "qr code decoder",
    "read qr from image",
    "jsqr browser",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Read and Decode a QR Code from an Image Online",
  description:
    "Decode a QR code from any image file or screenshot entirely in your browser using the SammaPix QR Code Reader. No upload, no camera, no signup. jsQR runs locally and displays the decoded content instantly.",
  totalTime: "PT30S",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix QR Code Reader (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the QR Code Reader",
      text: "Go to sammapix.com/tools/qr-code-reader in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Upload your image containing the QR code",
      text: "Click the upload area or drag and drop the image file — PNG, JPG, WebP, or any standard image format. The image is read locally by your browser. It is not sent to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View the decoded content",
      text: "jsQR analyzes the image in your browser and decodes the QR code. The full content is displayed instantly: URL, plain text, Wi-Fi credentials, vCard contact, email, or any other encoded data.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy or open the decoded result",
      text: "Use the Copy button to copy the decoded text to your clipboard, or click Open to follow a URL directly. The image is never uploaded anywhere — processing is 100% local.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between a QR code reader and a QR code scanner app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR code scanner app — like your phone's camera app — reads QR codes from a live video feed in real time. You point the camera at a physical QR code and the app detects and decodes it instantly. A QR code reader (also called a QR code decoder) reads QR codes from an existing image file — a screenshot, a photo, a JPEG, a PNG. There is no live camera feed. You upload or provide the image, and the reader finds and decodes the QR code in it. Both use the same underlying decoding algorithm — the difference is the input source. Use a scanner for QR codes you can physically point your camera at. Use a reader for QR codes that exist as image files on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I need to read a QR code from an image rather than scanning it with my camera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several common scenarios where a QR code reader is necessary. A screenshot: someone sent you a QR code via WhatsApp, email, or Slack, and the QR code now exists only as an image on your device — you cannot physically scan it with another phone. A second monitor or screen: the QR code is displayed on a screen you are working on, and you cannot easily point your phone at it. A PDF document: a QR code is embedded in a contract, boarding pass, or official document you received as a PDF. A printed material photographed: you photographed a poster or packaging but did not scan the QR code at the time, and you now need the URL it contained. An archived image: a QR code in an old photo or screenshot you want to decode years later.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload an image containing a QR code to a web-based decoder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on how the decoder works. Server-based decoders receive your image file on a third-party server — which means both the image and the decoded content (which may be a private URL, Wi-Fi credentials, or contact details) pass through that server. Browser-based decoders like the SammaPix QR Code Reader use a JavaScript library (jsQR) that runs entirely in your browser tab. The image never leaves your device. The decoded result is displayed locally. You can verify this by opening browser DevTools (F12), going to the Network tab, and watching for outgoing requests while you upload and decode — you will see none carrying your image or result data.",
      },
    },
    {
      "@type": "Question",
      name: "What types of data can be decoded from a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR code can encode any text data. The most common types are: URL (a https:// link that opens in a browser when scanned), plain text (any message or alphanumeric string), Wi-Fi credentials (SSID and password in the WIFI: format — phones use this to auto-join networks), vCard contact (a digital contact card with name, phone, email, address in RFC 6350 format), email address (a mailto: link that pre-fills the To field in an email client), SMS (a sms: link that opens a pre-filled text message), and phone number (a tel: link that dials a number directly). The SammaPix QR Code Reader decodes all of these and displays the raw content so you can see exactly what the QR code contains before acting on it.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can be used with the QR code reader?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SammaPix QR Code Reader accepts any image format that modern browsers can display: PNG, JPEG/JPG, WebP, GIF (first frame), AVIF, and BMP. Screenshots from both Windows (PNG by default) and macOS (PNG by default) work directly. Photos from iPhone (HEIC) may need to be converted to JPEG first — you can use the SammaPix HEIC Converter for this before decoding the QR code.",
      },
    },
    {
      "@type": "Question",
      name: "What if the QR code reader cannot detect the QR code in my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Detection failures have a few common causes. Image quality: the QR code is blurry, low-resolution, or compressed with visible JPEG artifacts that obscure the module boundaries. Perspective distortion: the image was photographed at an angle rather than straight on. Partial coverage: the QR code is partially cut off or covered in the image. Small QR code in a large image: the QR code occupies a tiny fraction of the image — try cropping the image to show primarily the QR code before uploading. Background interference: the QR code has a complex background or the contrast between modules and background is low. For best results, use a sharp, front-facing crop of the QR code with clear contrast between the black modules and the white background.",
      },
    },
    {
      "@type": "Question",
      name: "How does jsQR work to decode a QR code from an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "jsQR is an open-source JavaScript library that implements the ISO/IEC 18004 QR code decoding specification entirely in the browser. When you provide an image, the browser renders it to a Canvas element and extracts the raw pixel data as an ImageData array (RGBA values for every pixel). jsQR analyzes this pixel data to: locate the three finder pattern squares in the corners of the QR code, determine the orientation and perspective of the code, extract and decode the module matrix, apply error correction (using Reed-Solomon codes) to recover data even from partially damaged codes, and finally decode the data payload according to the encoding mode (numeric, alphanumeric, byte, or kanji). The entire process runs in your browser's JavaScript engine — no server, no network request.",
      },
    },
    {
      "@type": "Question",
      name: "Can the QR code reader also use my device's camera to scan live QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix QR Code Reader supports both modes: image upload for decoding QR codes from existing files, and camera access for scanning QR codes in real time from your device's camera feed. The camera mode uses the same jsQR library, applied to successive video frames rather than a static image. On mobile, this works like a standard QR scanner app — point the camera at a QR code and the content appears. On desktop, you can use a webcam. For QR codes you receive as images (screenshots, photos, files), the image upload mode is more practical.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QrCodeReaderOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="qr-code-reader-online"
        description="Your phone camera scans QR codes in real time — but what about a QR code in a screenshot, a PDF, or an image file on your desktop? This guide explains how QR code readers work, when you need one instead of a scanner app, every data type a QR code can contain, and how to decode any QR image in your browser without uploading it anywhere."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={9}
        headings={[
          { id: "reader-vs-scanner", title: "QR code reader vs scanner app: the key difference" },
          { id: "when-you-need-reader", title: "When you need a reader, not a camera scanner" },
          { id: "how-qr-decoding-works", title: "How QR code decoding works (jsQR explained)" },
          { id: "data-types", title: "Every data type a QR code can contain" },
          { id: "privacy-no-upload", title: "Why no-upload matters for QR code decoding" },
          { id: "comparison-table", title: "Browser reader vs server-based decoder: comparison" },
          { id: "how-to-decode", title: "How to decode a QR code from an image, step by step" },
          { id: "troubleshooting", title: "Troubleshooting: when the reader cannot detect the code" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A QR code reader decodes QR codes from image files (screenshots, photos, PDFs). A scanner app uses a live camera feed. Both use the same algorithm — the input source is different.",
          "You need a reader when the QR code exists as an image: received via chat, embedded in a PDF, displayed on a screen you are working on, or saved in an old photo.",
          "The SammaPix QR Code Reader uses jsQR — an open-source JavaScript library — running entirely in your browser. The image is never uploaded anywhere.",
          "Supports all common image formats: PNG, JPEG, WebP, GIF, AVIF. Decodes URL, text, Wi-Fi, vCard, email, SMS, and phone QR codes.",
          "Also supports live camera scanning for physical QR codes.",
          "Decoded content is shown in full with Copy and Open options. No signup, no server, no expiry.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Close-up of a QR code printed on paper, showing the characteristic finder pattern squares in the corners and the module grid that encodes data."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A QR code reader decodes the data from an image — no camera needed, no upload required.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Read a QR code from any image — free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Upload a screenshot, photo, or any image file. jsQR decodes the QR code locally in your browser.
              Copy or open the result. No signup, no server, no upload.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/qr-code-reader"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open QR Code Reader, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/scan-qr-code-from-image"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Scan a QR code from a screenshot <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Generate a QR code free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Reader vs scanner ──────────────────────────────────── */}

        <h2 id="reader-vs-scanner" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          QR code reader vs scanner app: the key difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The terms &quot;QR code reader&quot; and &quot;QR code scanner&quot; are often used interchangeably, but they describe two different input methods for the same underlying decoding process.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code scanner</strong> works with a live camera feed. Your phone&apos;s camera app is a scanner: it reads successive video frames in real time and detects QR codes as you point the camera at a physical code. Most people encounter this every day — scanning restaurant menus, boarding passes, or product codes. The input is a stream of live frames from a camera.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code reader</strong> (also called a QR code decoder) works with a static image file. You provide an image — a screenshot, a JPEG, a PNG, a cropped photo — and the reader analyzes the pixel data to find and decode any QR code present in the image. The decoding algorithm is identical; the difference is the source of the image data.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The underlying technology is the same in both cases: the QR code standard (ISO/IEC 18004) defines a deterministic decoding algorithm. Given pixel data containing a QR code, the decoder finds the finder patterns, maps the module grid, applies error correction, and extracts the data. This works on a live camera frame or a static image with equal fidelity.
        </p>

        {/* ── Section 2: When you need a reader ───────────────────────────────── */}

        <h2 id="when-you-need-reader" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need a reader, not a camera scanner
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Camera-based scanning only works when you can physically point a camera at a QR code. There are many everyday situations where that is not possible:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code received via chat or email.</strong> Someone sends you a QR code image via WhatsApp, Telegram, iMessage, Slack, or email. The code exists as an image file on your device. You cannot point your camera at your own screen to scan it — you need a reader that accepts the image as input.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code in a PDF or document.</strong> A boarding pass, event ticket, invoice, or contract has a QR code embedded. You received it as a PDF and want to see what URL or data the QR code contains without printing the document and scanning it physically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code on a screen you are already using.</strong> You are working on a desktop computer and a QR code appears on your screen — from a login flow, a payment confirmation, or a file transfer app. Your phone might not be nearby, or angling your phone at the monitor is awkward.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code in a photo you took earlier.</strong> You photographed packaging, a poster, or a sign containing a QR code but did not scan it at the time. Now you want to retrieve the URL or data from the photo.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verifying a QR code you generated.</strong> You generated a QR code and want to confirm it decodes to the correct URL before distributing it. Uploading the image to a reader is faster than switching apps to use your phone camera.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Security check before clicking.</strong> You received a QR code from an unknown sender and want to see the URL it contains before scanning it with your phone and opening an unknown link. A reader lets you inspect the decoded content safely before acting on it.
          </li>
        </ul>

        {/* ── Section 3: How QR decoding works ────────────────────────────────── */}

        <h2 id="how-qr-decoding-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How QR code decoding works (jsQR explained)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">SammaPix QR Code Reader</Link> uses <strong className="text-gray-800 dark:text-[#E5E5E5]">jsQR</strong> — an open-source JavaScript implementation of the QR code decoding specification. jsQR runs entirely in your browser tab, processing pixel data locally without any server communication.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what happens step by step when you upload an image containing a QR code:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Image rendering.</strong> The browser reads the image file using its native image decoder and renders it to an HTML Canvas element. The Canvas produces an ImageData array: four numbers per pixel (red, green, blue, alpha channel) for every pixel in the image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Finder pattern detection.</strong> jsQR scans the ImageData to locate the three large square finder patterns that appear in the top-left, top-right, and bottom-left corners of every QR code. These are the squares you see when you look at a QR code. Their presence, positions, and relative sizes tell jsQR where the QR code is and what its orientation is.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Perspective correction.</strong> If the image was taken at an angle, jsQR applies a perspective transform to straighten the detected QR region into a flat grid before sampling the modules.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Module sampling.</strong> jsQR samples each module position in the corrected grid and determines whether it is dark (1) or light (0), producing the raw bit matrix of the QR code.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Error correction and data decoding.</strong> The bit matrix contains both data codewords and error correction codewords (Reed-Solomon codes). jsQR applies error correction, which can recover corrupted data up to the error correction level capacity (7% for L, 15% for M, 25% for Q, 30% for H). The corrected data codewords are then decoded according to the encoding mode into the final text string.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Result display.</strong> The decoded text is displayed in the interface. Copy and Open buttons let you act on the result immediately. The entire process takes milliseconds.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          None of steps 1 through 6 involve a network request. The image data and decoded result exist only in your browser&apos;s memory. When you close the tab, they are gone.
        </p>

        {/* ── Section 4: Data types ─────────────────────────────────────────── */}

        <h2 id="data-types" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Every data type a QR code can contain
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A QR code encodes text. The specific &quot;type&quot; of a QR code is determined by the format of that text — whether it begins with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">WIFI:</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">BEGIN:VCARD</code>, and so on. The QR code reader decodes the raw text; your phone then recognizes the format and acts on it automatically.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Data type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Encoded text format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What a phone does when scanned</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">URL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">https://example.com/page</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Browser opens the URL.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, posters, menus, product pages, app download links.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Plain text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any text string.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Displays the text. No automatic action.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Coupon codes, event codes, instructions, short messages.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Wi-Fi</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">WIFI:T:WPA;S:NetworkName;P:pass;;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Phone offers to join the Wi-Fi network automatically.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Restaurants, hotels, offices, Airbnbs — guest network access.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">vCard contact</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">BEGIN:VCARD ... END:VCARD</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Contacts app offers to add the person to the address book.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, conference name badges, digital contact sharing.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Email</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">mailto:name@example.com?subject=Hi</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Email client opens with the address pre-filled in the To field.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, conference materials, feedback forms.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SMS</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">sms:+15551234567?body=Hello</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Messages app opens a pre-addressed text message.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Customer support, marketing opt-in, shortcode messaging.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Phone number</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">tel:+15551234567</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dialer opens ready to call the number.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, support lines, emergency contact information.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you decode a QR code with the SammaPix reader, you see the raw text content before acting on it. This is especially useful for inspecting Wi-Fi QR codes (to retrieve the SSID and password in plain text) or for checking what URL a QR code leads to before opening it.
        </p>

        {/* ── Section 5: Privacy / no-upload ───────────────────────────────── */}

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no-upload matters for QR code decoding
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many QR code decoders available online are server-based: you upload your image, it is sent to their server, the server decodes it, and the result is returned to you. This architecture raises a specific privacy concern that is easy to overlook.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The image you are decoding may contain sensitive information in the QR code itself — a Wi-Fi password, a private URL, personal contact details, a login verification code. When you upload that image to a third-party server for decoding, you are sharing both the image and the decoded content with that service. You have no visibility into how long they store it or who has access.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browser-based decoding via jsQR eliminates this entirely. The image stays in your browser. The decoded result stays in your browser. No network request carries either piece of data. You can verify this yourself with browser DevTools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters most for three categories of QR codes: Wi-Fi credentials (which encode your network name and password directly), vCard QR codes (which encode personal contact details including address and phone number), and authentication or payment QR codes (which may encode session tokens or transaction identifiers that are sensitive by design).
        </p>

        {/* ── Section 6: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser reader vs server-based decoder: comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Server-based decoder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Image upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Image is read locally by your browser. Never sent over the network.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Image is uploaded to the service&apos;s server for processing.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Complete. No third party sees your image or decoded data.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited. Service receives and may log both the image and decoded content.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fast. No network round trip. Processing is local — milliseconds.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Slower for large images.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, after the page loads. jsQR runs locally.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Requires a network connection for the upload and decode request.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Cost</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free. No account, no plan, no limit.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often free with signup; rate limits and watermarks on free tier common.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Open the tool and use it immediately.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required to download the result or bypass rate limits.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Decode any QR code from an image — no upload, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Upload a screenshot, JPEG, PNG, or WebP. jsQR decodes the QR code locally in your browser. Copy or open the result. Free.
          </p>
          <Link
            href="/tools/qr-code-reader"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open QR Code Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 7: Step by step ────────────────────────────────────────── */}

        <h2 id="how-to-decode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to decode a QR code from an image, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/qr-code-reader</strong> in any modern browser — Chrome, Firefox, Safari, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Upload your image.</strong> Click the upload area or drag and drop the image file. Supported formats include PNG, JPEG, WebP, GIF, and AVIF. The image is read by your browser — no file is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">View the decoded result.</strong> jsQR analyzes the image and displays the decoded content instantly. The full raw text is shown — URL, Wi-Fi credentials, vCard data, or whatever the QR code encodes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy or open.</strong> Use the Copy button to copy the decoded text to your clipboard. If the result is a URL, use the Open button to follow it directly. For Wi-Fi credentials, read the SSID and password from the decoded text.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the image also contains other content besides the QR code — a full-page screenshot, a scanned document, or a photo with the QR code in a corner — the reader will still detect the QR code. For best results, ensure the QR code is clearly visible with adequate contrast and is not extremely small relative to the total image dimensions.
        </p>

        {/* ── Section 8: Troubleshooting ─────────────────────────────────────── */}

        <h2 id="troubleshooting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Troubleshooting: when the reader cannot detect the code
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the QR code reader fails to detect the code in your image, the issue is almost always one of the following:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Blurry or low-resolution image.</strong> QR decoding requires clear, sharp module boundaries. A blurry photo — especially one taken at an angle or with motion blur — may not decode. Try taking a sharper photo or screenshot, or find a higher-resolution version of the image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code too small in the image.</strong> If the QR code occupies only a small fraction of a large image, the modules may not have enough pixels to be reliably detected. Crop the image to focus on the QR code before uploading — most image editors, iOS Photos, and Windows Photos support cropping.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">JPEG compression artifacts.</strong> Heavy JPEG compression introduces pixel noise around module boundaries, making dark and light areas harder to distinguish. If you have access to the original uncompressed image, use that. If not, try a different image source (a screenshot rather than a JPEG photo, for example).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extreme perspective angle.</strong> jsQR handles moderate perspective distortion, but a very steep angle — more than about 30 degrees from frontal — may cause detection failure. Try cropping and perspective-correcting the image using a photo editor before uploading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Low contrast.</strong> QR codes on non-white backgrounds (dark logos, colored backgrounds, transparent layers) may have insufficient contrast between modules. Increasing the image contrast using a photo editor may resolve the issue.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Partial coverage.</strong> If the QR code is partially cut off, folded, or covered by another element in the image, the finder patterns may be incomplete and the code will not decode. Try to find an image where all three finder pattern squares are fully visible.
          </li>
        </ul>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Decode QR codes from screenshots, photos, and PDFs</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Browser-based jsQR reader. No upload, no camera required, no signup. Also supports live camera scanning.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/qr-code-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open QR Code Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/scan-qr-code-from-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Scan QR code from a screenshot — guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">QR Code Reader</Link></strong>: the tool covered in this article. Decodes QR codes from images or live camera. No upload, no account.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate a QR code for any URL, text, Wi-Fi, email, or vCard in your browser. Download PNG or SVG. No upload, no account. See{" "}
            <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">free QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/blog/scan-qr-code-from-image" className="text-[#6366F1] hover:underline">How to scan a QR code from a screenshot</Link></strong>: step-by-step guide for the specific case of reading a QR code from a screen capture — the most common reason people search for a QR code reader rather than a scanner app.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode any image to Base64 for embedding in CSS or HTML. Useful when you need to embed QR code images in web pages or emails without an external file reference. See{" "}
            <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">image to Base64 guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-to-image" className="text-[#6366F1] hover:underline">PDF to Image</Link></strong>: extract pages from a PDF as images. Useful when the QR code you need to decode is embedded in a PDF document — convert the relevant page to an image and then decode the QR code.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Everything you need for QR codes — all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Read QR codes from images, generate QR codes for any data type, encode images for embedding — without uploading anything anywhere.
            No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/qr-code-reader" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Reader <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/pdf-to-image" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              PDF to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
