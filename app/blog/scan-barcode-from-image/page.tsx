import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Scan Barcode from Image (No App Needed) [2026]",
  description:
    "Scan barcodes from photos. No app, no camera. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/scan-barcode-from-image`,
  },
  keywords: [
    "scan barcode from image",
    "barcode from photo",
    "read barcode from picture",
    "scan barcode from screenshot",
    "decode barcode from image",
    "barcode from picture online",
    "scan barcode without scanner",
    "read barcode from photo online",
    "barcode reader from image",
    "decode ean from photo",
  ],
  openGraph: {
    title: "Scan Barcode from Image (No App Needed) [2026]",
    description:
      "Scan a barcode from any product picture, screenshot, or photo in your browser. No scanner app, no upload. ZXing runs locally. EAN-13, UPC, CODE128, QR. Free.",
    url: `${APP_URL}/blog/scan-barcode-from-image`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scan a Barcode from a Picture Without a Scanner App [2026]",
    description:
      "Read EAN-13, UPC, CODE128, or QR barcodes from any photo or screenshot. ZXing runs in your browser. No upload, no camera needed. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/scan-barcode-from-image`;
const POST_TITLE = "How to Scan a Barcode from an Image or Photo (No Scanner App) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "You have a product photo, a screenshot of packaging, or a picture someone sent you via chat — and you need to read the barcode on it. Your phone camera scanner only works on physical barcodes in front of you. This guide explains how to scan a barcode from any image file without a scanner app, without a camera, and without uploading the image anywhere, using ZXing running in your browser.",
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
    "scan barcode from image",
    "barcode from photo",
    "read barcode from picture",
    "scan barcode no scanner",
    "zxing browser barcode",
    "decode barcode screenshot",
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
  name: "How to Scan a Barcode from a Photo or Screenshot Without a Scanner App",
  description:
    "Use the SammaPix Barcode Reader to decode any barcode from a product photo, screenshot, or image file — entirely in your browser using ZXing. No scanner app, no camera, no upload, no signup. Works for EAN-13, UPC-A, CODE128, CODE39, ITF, and QR codes.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Barcode Reader (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Get a clear image of the barcode",
      text: "Take a photo of the barcode or get the image file (screenshot, JPEG, PNG) that contains the barcode. If the barcode is in a photo, the image should be in focus, well-lit, and taken roughly face-on (not at a sharp angle). If the barcode is already a digital image or screenshot, use it as-is.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Crop the image to focus on the barcode",
      text: "Optional but recommended: crop the image so the barcode fills most of the frame. A barcode that takes up 70% of the image decodes more reliably than one occupying 5% of a large photo. Any image editor (iOS Photos crop, Windows Photos crop, or the free SammaPix Crop tool) works.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Open the SammaPix Barcode Reader",
      text: "Go to sammapix.com/tools/barcode-reader in any modern browser. No account, no extension, no download required.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Upload the image",
      text: "Click the upload area or drag and drop the image file. ZXing analyzes the pixel data locally in your browser. The image is never sent to any server.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Read and copy the decoded barcode value",
      text: "The barcode format (EAN-13, CODE128, QR, etc.) and decoded value appear instantly. Click Copy to copy it to your clipboard. Use the value to look up the product, enter it in a database, or verify it against your records.",
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
      name: "Can I scan a barcode from a picture on my phone without a scanner app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the barcode exists as an image on your phone — in your camera roll, in a WhatsApp message, or in a received email — you can decode it without a dedicated scanner app. Open sammapix.com/tools/barcode-reader in your phone browser (Chrome for Android, Safari for iOS), tap the upload area, and select the image from your camera roll or Files. ZXing decodes the barcode locally in your mobile browser. No app install required.",
      },
    },
    {
      "@type": "Question",
      name: "Why can I not just scan an image barcode with my phone camera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your phone camera scanner reads barcodes from a live physical object in front of the camera. When a barcode exists as an image on your screen or in a photo on your device, pointing your camera at your own screen works poorly: the moire pattern between the screen pixels and the camera sensor, screen reflections, and the difficulty of holding the phone at the right distance often cause read failures. Even when it works, it requires awkward positioning. A browser-based barcode reader that accepts the image file directly is more reliable and faster than trying to camera-scan a digital image.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of pictures can I scan a barcode from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can scan a barcode from any image file in a standard format: JPEG, PNG, WebP, GIF, AVIF. This includes product photos taken with a phone or camera, screenshots taken on a computer or mobile device, photos received via WhatsApp, Telegram, email, or any messaging app, images exported from a PDF (convert the PDF page to an image first using the SammaPix PDF to Image tool), and photos of physical products, packaging, shipping labels, or barcoded documents.",
      },
    },
    {
      "@type": "Question",
      name: "Does image quality matter for scanning a barcode from a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, significantly. The most important factors are: sharpness (no blur — each bar edge must be clearly defined), contrast (dark bars clearly distinguishable from light spaces), angle (close to face-on — steep angles distort bar width ratios and cause misreads), and barcode size in the image (the barcode should occupy a significant portion of the frame, not be a tiny element in a large image). Screenshots tend to produce near-perfect decodes because they are sharp, well-contrasted, and have no perspective distortion. Photos of physical products are more variable — a focused, well-lit, face-on photo of a barcode decodes reliably in most cases.",
      },
    },
    {
      "@type": "Question",
      name: "Can I scan a barcode from a WhatsApp image or screenshot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. When someone sends you a barcode image via WhatsApp, the image is saved in your photo library or Downloads folder. Open sammapix.com/tools/barcode-reader, upload the WhatsApp image, and ZXing decodes the barcode. WhatsApp compresses images before delivery, which can reduce quality — but for barcodes, the compression is usually light enough that the barcode remains decodable. If the decode fails on a WhatsApp image, ask the sender to send the original image file rather than the in-app photo, which preserves higher quality.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a QR code reader?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR code reader specifically decodes QR codes — the square 2D matrix barcodes used for URLs, contact cards, and Wi-Fi credentials. A barcode reader handles both 1D linear barcodes (EAN-13, UPC-A, CODE128, CODE39) and QR codes from the same image. The SammaPix Barcode Reader decodes all formats automatically. If you have a product with an EAN-13 barcode, use the Barcode Reader. If you have a QR code, both the Barcode Reader and the dedicated QR Code Reader will decode it.",
      },
    },
    {
      "@type": "Question",
      name: "Does scanning a barcode from a photo upload my image anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix Barcode Reader uses ZXing — a JavaScript library that runs entirely in your browser. When you upload an image, the browser reads the file from your local storage and renders it to a Canvas element. ZXing processes the Canvas pixel data locally. The image and the decoded barcode value never leave your device. You can verify this in browser DevTools (F12, Network tab) by watching for outgoing requests while you upload and decode — there are none carrying your image or barcode data.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if the barcode is in a PDF rather than an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take a screenshot of the relevant PDF page — most operating systems have built-in screenshot tools (Cmd+Shift+4 on macOS, Win+Shift+S on Windows, the Share button in mobile PDF viewers). Alternatively, use the SammaPix PDF to Image tool to export the PDF page as a PNG, then upload that image to the Barcode Reader. For barcodes in fillable PDF forms or embedded labels, a screenshot is usually the quickest approach.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ScanBarcodeFromImagePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="scan-barcode-from-image"
        description="Someone sent you a product photo and you need the EAN-13 number. You have a screenshot of packaging but not the physical item. You photographed a warehouse shelf and now need the barcode values from those photos on your desktop. This guide covers every scenario where you need to scan a barcode from an image rather than a physical object — and why a browser-based reader is faster and more private than trying to camera-scan your own screen."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "why-cant-camera-scan", title: "Why your camera scanner does not work on digital images" },
          { id: "common-scenarios", title: "Common scenarios: when you have a barcode picture, not a physical barcode" },
          { id: "image-quality", title: "Image quality guide: what makes a barcode picture scannable" },
          { id: "how-to-scan", title: "How to scan a barcode from an image, step by step" },
          { id: "mobile-guide", title: "Mobile guide: scanning a barcode from a photo on iPhone or Android" },
          { id: "vs-scanner-app", title: "Browser reader vs scanner app: honest comparison" },
          { id: "from-whatsapp", title: "Scanning barcodes from WhatsApp, email, and chat apps" },
          { id: "from-pdf", title: "Scanning a barcode from a PDF document" },
          { id: "privacy", title: "Privacy: no upload, no server" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Your phone camera scanner reads live, physical barcodes. It cannot reliably scan a barcode that already exists as a digital image on your device.",
          "When a barcode is in a photo, screenshot, or received via chat, use a browser-based barcode reader that accepts image files directly.",
          "The SammaPix Barcode Reader uses ZXing — the same library that powers Android barcode scanning — running locally in your browser. No upload, no server, no signup.",
          "Supports EAN-13, EAN-8, UPC-A, CODE128, CODE39, ITF, and QR codes from JPEG, PNG, WebP, and other standard formats.",
          "Works on both desktop and mobile browsers. On mobile, select the image from your camera roll.",
          "For best results: crop the image so the barcode fills most of the frame, ensure good contrast, and use a sharp front-facing view.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Person holding a smartphone photographing a product barcode on packaging — illustrating the scenario of capturing a barcode in a picture for later decoding."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Once the barcode is in a photo, you need an image-based reader — not a live camera scanner.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Scan a barcode from any picture — free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Upload a product photo, screenshot, or any image with a barcode. ZXing decodes it locally in your browser.
              EAN-13, UPC-A, CODE128, CODE39, ITF, QR. No signup, no server.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/barcode-reader"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Barcode Reader, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/barcode-reader-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Full barcode reader guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/barcode-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Generate a barcode instead <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why camera scanning fails on digital images ───────── */}

        <h2 id="why-cant-camera-scan" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your camera scanner does not work on digital images
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Your phone&apos;s camera scanner — whether it is the built-in camera app, Google Lens, or a dedicated barcode scanning app — is designed to read a physical barcode that is in front of the camera in the real world. The barcode is printed on packaging or a label. The camera captures a live video frame. The app decodes the barcode from that frame.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you try to camera-scan a barcode that is already a digital image on your screen, several problems occur:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Moire pattern interference.</strong> Your phone screen displays images as a grid of pixels (usually 300-460 pixels per inch). Your phone camera also captures in a pixel grid. When two pixel grids at slightly different spacings are photographed, they create a moire interference pattern — diagonal waves of alternating light and dark bands across the image. For barcodes, this interference corrupts the bar widths that the decoder relies on.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Screen reflections and glare.</strong> Screens reflect ambient light. Depending on the environment, the barcode area may have reflections that wash out the contrast between bars and spaces, causing decode failures.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Distance and focus issues.</strong> Holding your phone at the right distance from your screen to get the barcode in frame while keeping it in focus is awkward. Too close and the barcode is out of focus. Too far and the barcode is too small to decode.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The image may not be on a physical screen at all.</strong> If someone sent you a photo via WhatsApp and you want to decode the barcode in it, the barcode is inside a file on your device — not displayed on any screen. There is nothing to point your camera at.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The solution is a barcode reader that accepts the image file directly, processes the pixel data digitally, and returns the decoded value — without involving a camera at any stage. ZXing running in your browser does exactly this.
        </p>

        {/* ── Section 2: Common scenarios ─────────────────────────────────── */}

        <h2 id="common-scenarios" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common scenarios: when you have a barcode picture, not a physical barcode
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The need to scan a barcode from an image rather than a physical product comes up more often than most people expect. Here are the most frequent situations:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Product photo from a supplier or colleague.</strong> A supplier sends you a product photo via email or WhatsApp to show you the item. You need the EAN-13 or UPC-A barcode number to check your inventory database, create a product listing, or verify it matches a known GTIN. The barcode is in the photo. You cannot scan the physical product because you do not have it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">E-commerce listing from a competitor or marketplace.</strong> You found a product listing on Amazon or a competitor&apos;s site with a product image showing the barcode. You want to identify the product or find it from other suppliers using the barcode number.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inventory photos from an audit or stocktake.</strong> You photographed shelves, bins, or product stacks during a physical inventory audit. You are back at your desk and need to extract barcode values from the photos without going back to the warehouse. Upload the photos one at a time to decode the barcodes shown.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Screenshot of a shopping app or website.</strong> You screenshotted a product from a shopping app, an online supermarket, or a brand&apos;s website. The product image or packaging label shows a barcode. You want the barcode number to compare prices, check availability elsewhere, or track the product.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Shipping confirmation or tracking document.</strong> A delivery confirmation email or PDF has a CODE128 shipping barcode. You want the tracking number without having to read the small human-readable text printed under the barcode or manually type it in.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Checking a generated barcode before printing.</strong> You used a barcode generator and want to verify that the downloaded PNG or SVG decodes to the correct value before placing it on labels or packaging. Upload the generated image to confirm.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Old photo archive.</strong> You have archived product photos from years ago and need to retrieve barcode values for products you no longer have in stock. The images exist in your photo library or on a hard drive.
          </li>
        </ul>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Scan a barcode from any product photo — no upload, free</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            ZXing decodes EAN-13, UPC-A, CODE128, CODE39, ITF, and QR barcodes from JPEG, PNG, or WebP images locally in your browser. Copy the decoded value instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/barcode-reader-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full barcode reader guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 3: Image quality guide ──────────────────────────────── */}

        <h2 id="image-quality" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Image quality guide: what makes a barcode picture scannable
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not every product photo decodes reliably. The factors below determine whether ZXing can successfully extract the barcode value from an image:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Factor</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Ideal</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What goes wrong when it is poor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Sharpness</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Each bar edge is sharp and clearly defined at pixel level.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Blur blends dark bars into light spaces, making bar width measurement impossible. Even slight blur on individual bars causes decode failure.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Contrast</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark bars clearly darker than white spaces. High contrast ratio.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low contrast makes binarization unreliable. Shadows, colored backgrounds, or faded print all reduce contrast and cause misreads.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Angle</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Face-on. Perpendicular to the barcode surface. Zero tilt.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Perspective distortion changes the apparent width ratios of bars, causing incorrect decoding. ZXing handles mild angles (up to ~15 degrees) but fails at steeper angles.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Barcode size in image</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Barcode fills 50-80% of the image width. Narrow bars at least 2-3 pixels wide.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">If the barcode is tiny relative to the image, the narrow bars may be only 1 pixel wide — too small for reliable width measurement. Crop to zoom in.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Quiet zone</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Clear white margin on both sides of the barcode. At least 5-10 bar-widths of empty space.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Without a quiet zone, ZXing cannot find the start of the barcode. Text, artwork, or other barcodes too close to the quiet zone cause failure.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Compression artifacts</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG or high-quality JPEG (quality 80+). Minimal JPEG compression.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Heavy JPEG compression creates blockiness and noise at bar edges. This is especially common in images shared via social media or messaging apps that compress photos aggressively.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">The single most impactful fix for failed decodes is cropping.</strong> Most product photos show the entire product — barcode, label, packaging, and background. The barcode occupies maybe 5-10% of the image. Crop the image so the barcode fills 60-80% of the frame. This gives ZXing more pixels per bar, making the width measurement more accurate and the decode more reliable.
        </p>

        {/* ── Section 4: Step-by-step ──────────────────────────────────────── */}

        <h2 id="how-to-scan" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to scan a barcode from an image, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Locate the image.</strong> Find the image file containing the barcode. It may be in your Downloads folder (if received via email), your camera roll (if you took the photo or received it via WhatsApp), or on your desktop (if you took a screenshot).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Crop if needed.</strong> If the barcode is a small part of a large image, crop the image so the barcode fills most of the frame. On macOS, open the image in Preview and use the crop tool (Cmd+K). On Windows, use Photos or Paint. On iOS, use the Photos edit/crop feature. On Android, use the Gallery crop feature.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/barcode-reader</strong> in your browser. Works in Chrome, Firefox, Safari, Edge, and mobile browsers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Upload the image.</strong> Click the upload area or drag and drop the file. The image stays in your browser — no server upload occurs. Alternatively, if your device has a camera and the barcode is physically accessible, tap the camera button for live scanning mode.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read the decoded result.</strong> The barcode format (EAN-13, UPC-A, CODE128, etc.) and the decoded value appear immediately. If ZXing cannot detect the barcode, an error message is shown.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the value.</strong> Click Copy to copy the decoded barcode value to your clipboard. Use it to search in a product database, enter it in an inventory system, or verify it against your records.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If decode fails, try a cropped version.</strong> Go back to step 2, crop the image more tightly around the barcode, and re-upload. For stubborn cases, also try increasing the contrast in a photo editor before uploading.
          </li>
        </ol>

        {/* ── Section 5: Mobile guide ──────────────────────────────────────── */}

        <h2 id="mobile-guide" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Mobile guide: scanning a barcode from a photo on iPhone or Android
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The barcode reader works in mobile browsers without installing any app. Here is the flow on iOS and Android:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">On iPhone (Safari):</strong> Open Safari and go to sammapix.com/tools/barcode-reader. Tap the upload area. iOS will show the standard file picker — tap &quot;Photo Library&quot; to select from your camera roll, or &quot;Files&quot; to browse your file storage. Select the image containing the barcode. ZXing processes it locally in the Safari browser. The decoded value appears on screen.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">On Android (Chrome):</strong> Open Chrome and go to sammapix.com/tools/barcode-reader. Tap the upload area. Android will show a file picker — choose &quot;Photos&quot; or &quot;Gallery&quot; to select from your camera roll. Select the image. ZXing processes it locally in Chrome. The decoded value appears on screen.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the image you need is in a chat app (WhatsApp, Telegram, iMessage), save it to your camera roll first, then follow the steps above. Most chat apps offer a &quot;Save to Photos&quot; option when you long-press a received image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On mobile, the camera button in the barcode reader also lets you switch to live camera scanning mode. If the barcode is on a physical object in front of you and you are on a mobile device, the live camera mode is faster than taking a photo and uploading it.
        </p>

        {/* ── Section 6: vs Scanner app ────────────────────────────────────── */}

        <h2 id="vs-scanner-app" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser reader vs scanner app: honest comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Scenario</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Scanner app (camera)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser reader (image upload)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Physical product in hand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best. Point and scan. Instant.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Works (use camera mode), but scanner app is faster for physical barcodes.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Barcode in a photo on your device</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cannot. Scanner apps read live camera, not image files.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best. Upload the image, decoded in seconds.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Barcode received via WhatsApp/email</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Possible but awkward: display image on one device, scan with another device&apos;s camera.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best. Save image, upload, decoded instantly without a second device.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Barcode in a PDF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cannot scan from a PDF directly. Would need to print the PDF first.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Take a screenshot of the PDF page or convert it to an image, then upload.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Desktop computer without phone nearby</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not applicable — scanner apps are phone-based.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Best. Open in any desktop browser, upload the image file directly.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch of product photos to process</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not practical. Each requires pointing camera at a screen.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Efficient. Upload each photo sequentially, copy each decoded value.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The two tools are complementary rather than competing. Use a camera scanner for physical products in hand. Use a browser-based image reader for barcodes that exist as digital images.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Scan a barcode from any picture — no scanner app, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Works on desktop and mobile browsers. EAN-13, UPC-A, CODE128, CODE39, ITF, QR. ZXing decodes locally in seconds. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/barcode-reader-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full barcode reader guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: From WhatsApp/chat ───────────────────────────────── */}

        <h2 id="from-whatsapp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Scanning barcodes from WhatsApp, email, and chat apps
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Receiving product photos via messaging apps is one of the most common reasons people search for a way to scan a barcode from an image. The flow is slightly different depending on the platform:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WhatsApp (mobile).</strong> Long-press the received image and tap &quot;Save to Photos&quot; (iOS) or &quot;Save to Gallery&quot; (Android). Then open sammapix.com/tools/barcode-reader in your browser and select the saved image from your photo library. Note: WhatsApp compresses photos by default. If you are the sender, send the image as a &quot;Document&quot; to preserve full quality, which improves decode reliability.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WhatsApp (desktop).</strong> Right-click the received image and select &quot;Download&quot;. Open sammapix.com/tools/barcode-reader in your browser and drag the downloaded image file into the upload area.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Email (desktop).</strong> Download the image attachment. Open sammapix.com/tools/barcode-reader and upload the downloaded file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Email (mobile).</strong> Tap the attachment to open it. Use the share/save options to save to your Photos or Files. Then upload from the barcode reader.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Slack, Teams, Telegram.</strong> Right-click (desktop) or long-press (mobile) the image to download or save it. Then upload to the barcode reader. Telegram preserves original image quality when sent as a file — always send as file if the barcode needs reliable decoding.
          </li>
        </ul>

        {/* ── Section 8: From PDF ─────────────────────────────────────────── */}

        <h2 id="from-pdf" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Scanning a barcode from a PDF document
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDFs with embedded barcodes — shipping confirmations, event tickets, invoices, boarding passes — are common. The barcode reader accepts image files, not PDF files directly. The bridge is a screenshot or a PDF-to-image conversion.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Screenshot method (fastest).</strong> Open the PDF in any viewer. Navigate to the page with the barcode. Take a screenshot: Cmd+Shift+4 on macOS (drag to select the barcode area), Win+Shift+S on Windows (drag to select). On iOS, press Side+Volume Up buttons. The screenshot captures the barcode at screen resolution — usually high enough for reliable decoding. Upload the screenshot to the barcode reader.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PDF to Image method (highest quality).</strong> Use the <Link href="/tools/pdf-to-image" className="text-[#6366F1] hover:underline">SammaPix PDF to Image</Link> tool to export the relevant page as a high-resolution PNG. Upload that PNG to the barcode reader. The PDF page is rendered at full vector quality — any barcode in the page will decode reliably regardless of how small it appears in the PDF viewer.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For CODE128 barcodes on shipping labels (common in courier delivery confirmations), the screenshot method is usually sufficient — shipping label barcodes are printed at high contrast and large size. For small barcodes on densely designed invoices or event tickets, the PDF to Image conversion produces better results.
        </p>

        {/* ── Section 9: Privacy ──────────────────────────────────────────── */}

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Privacy: no upload, no server
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you scan a barcode from an image in a business or professional context, the image and the decoded value may contain information you would prefer to keep private. Product photos can reveal your supplier relationships. Shipping labels expose your logistics providers and order volumes. Invoice barcodes contain reference numbers linking to confidential contracts.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many barcode readers available online are server-based. Your image is uploaded, decoded on a remote server, and the value is sent back. You have no visibility into how long the image is stored, what logs are kept, or who has access. Tools that claim &quot;we do not store your data&quot; are making an assertion you cannot independently verify.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZXing running in your browser eliminates this entirely. The image file is read by your browser from local storage. ZXing processes the Canvas pixel data within your browser&apos;s sandboxed JavaScript environment. The decoded value is displayed locally. No network request is made at any point during or after decoding.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can independently verify this using browser DevTools (F12, Network tab). Watch the requests panel while you upload an image and wait for the decode result. You will see requests for static assets (the page, the ZXing library), but no request that carries your image data or barcode value to any external server.
        </p>

        {/* ── Section 10: Related tools ───────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-reader" className="text-[#6366F1] hover:underline">Barcode Reader</Link></strong>: decode EAN-13, EAN-8, UPC-A, CODE128, CODE39, ITF, and QR codes from any image. ZXing runs locally. No upload, no account. See{" "}
            <Link href="/blog/barcode-reader-online" className="text-[#6366F1] hover:underline">barcode reader guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-generator" className="text-[#6366F1] hover:underline">Barcode Generator</Link></strong>: generate a barcode from any value — CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. Download PNG or SVG. No upload, no account. See{" "}
            <Link href="/blog/barcode-generator-online" className="text-[#6366F1] hover:underline">barcode generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">QR Code Reader</Link></strong>: decode any QR code from an image or live camera. jsQR runs locally. No upload. See{" "}
            <Link href="/blog/qr-code-reader-online" className="text-[#6366F1] hover:underline">QR code reader guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-to-image" className="text-[#6366F1] hover:underline">PDF to Image</Link></strong>: convert PDF pages to high-resolution PNG images. Useful when a barcode you need to decode is embedded in a PDF — export the page as an image and upload it to the barcode reader.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/heic" className="text-[#6366F1] hover:underline">HEIC Converter</Link></strong>: convert iPhone HEIC photos to JPEG before uploading to the barcode reader. HEIC is not natively supported in all browsers — converting to JPEG first guarantees compatibility.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Scan and generate barcodes — all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Read barcodes from product photos, generate barcodes for labels, decode QR codes from screenshots — without uploading anything. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/barcode-reader" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Barcode Reader <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/barcode-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Barcode Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-reader" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Reader <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
