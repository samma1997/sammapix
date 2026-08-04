import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Barcode Reader Online — Decode Barcodes Free [2026]",
  description:
    "Decode barcodes from photos. EAN, UPC, CODE128, QR. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/barcode-reader-online`,
  },
  keywords: [
    "barcode reader online",
    "barcode reader",
    "decode barcode",
    "read barcode from image",
    "read ean from image",
    "upc barcode reader",
    "code128 reader online",
    "barcode decoder",
    "online barcode scanner from image",
    "decode barcode from photo",
  ],
  openGraph: {
    title: "Barcode Reader Online — Decode Barcodes Free [2026]",
    description:
      "Decode any barcode from a photo or screenshot in your browser. EAN-13, UPC-A, CODE128, CODE39, QR. ZXing runs locally. No upload, no server, free.",
    url: `${APP_URL}/blog/barcode-reader-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barcode Reader Online — Decode EAN, UPC, CODE128, QR from an Image [2026]",
    description:
      "Decode EAN-13, UPC-A, CODE128, CODE39, QR barcodes from any image. ZXing runs in your browser. No upload, free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/barcode-reader-online`;
const POST_TITLE = "Barcode Reader Online — Decode EAN, UPC, CODE128, QR from an Image [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "You have a product photo, a screenshot of packaging, or an old inventory image and you need to know the barcode value. This guide explains how to read and decode any 1D or QR barcode from an image file entirely in your browser — no upload, no camera app, no dedicated scanner hardware. Covers EAN-13, EAN-8, UPC-A, CODE128, CODE39, ITF, and QR using the ZXing JavaScript library.",
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
    "barcode reader online",
    "decode barcode from image",
    "read ean upc from photo",
    "code128 reader",
    "zxing browser",
    "barcode decoder no upload",
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
  name: "How to Read and Decode a Barcode from an Image Online",
  description:
    "Decode any 1D barcode (EAN-13, EAN-8, UPC-A, CODE128, CODE39, ITF) or QR code from a photo or screenshot entirely in your browser using the SammaPix Barcode Reader. No upload, no camera, no signup. ZXing processes the image locally and displays the decoded value instantly.",
  totalTime: "PT30S",
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
      name: "Open the Barcode Reader",
      text: "Go to sammapix.com/tools/barcode-reader in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Upload your image containing the barcode",
      text: "Click the upload area or drag and drop the image file — JPEG, PNG, WebP, or any standard image format. The image is processed locally by ZXing in your browser. It is never sent to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View the decoded barcode value",
      text: "ZXing analyzes the image and decodes the barcode. The format (EAN-13, UPC-A, CODE128, etc.) and the full numeric or text value are displayed instantly.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy the decoded value",
      text: "Use the Copy button to copy the decoded barcode value to your clipboard. For product barcodes, you can then look up the product in any retail or logistics database. The image is never uploaded — processing is 100% local.",
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
      name: "What is the difference between a barcode reader and a barcode scanner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A barcode scanner uses a live camera or laser to read a physical barcode in real time — the handheld device at a retail checkout or the camera app on your phone pointed at a product. A barcode reader (also called a barcode decoder) works with a static image file: a product photo, a screenshot of packaging, or any JPEG or PNG on your device. Both use the same underlying decoding algorithm — ZXing, for example, powers both the live camera scanner on Android and the image-based reader on SammaPix. The difference is the input source: live feed vs. image file.",
      },
    },
    {
      "@type": "Question",
      name: "What barcode formats does the SammaPix Barcode Reader support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SammaPix Barcode Reader uses ZXing (Zebra Crossing), which supports the following 1D formats: EAN-13, EAN-8, UPC-A, UPC-E, CODE128, CODE39, ITF (Interleaved 2 of 5), and Codabar. It also decodes QR codes from the same image upload. This covers the vast majority of product barcodes on retail packaging, shipping labels, inventory tags, and asset stickers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I read an EAN-13 barcode from a product photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as long as the barcode is clearly visible in the photo. The best results come from a photo taken directly in front of the barcode (not at an angle), in good lighting, with the barcode in sharp focus. ZXing can tolerate some perspective distortion and minor blur, but extreme angles or heavy motion blur will cause detection failure. If the photo is borderline, try cropping to show primarily the barcode area and re-uploading the cropped image. For most clear product photos taken with a modern phone, EAN-13 and UPC-A decoding is reliable.",
      },
    },
    {
      "@type": "Question",
      name: "Does the barcode reader upload my image to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. ZXing is a JavaScript library that runs entirely in your browser. The image you upload is processed locally using Canvas pixel data — no file or barcode value is sent to any server. You can verify this by opening browser DevTools (F12), going to the Network tab, and watching for outgoing requests while you upload an image and decode a barcode. You will see no network requests carrying your image data. This is important when the product or image contains proprietary information you would prefer to keep off third-party servers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a 1D barcode and a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 1D barcode (EAN-13, UPC-A, CODE128) is a horizontal strip of parallel bars encoding a short numeric or alphanumeric string. It is read by a horizontal laser or camera sweep. Retail products, shipping labels, and inventory tags use 1D barcodes. A QR code is a 2D matrix that encodes much more data — URLs, full text, contact cards, Wi-Fi credentials — in a square grid that can be read from any angle. The SammaPix Barcode Reader decodes both from the same image upload. The format is detected automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the barcode reader to look up a product from its barcode number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The barcode reader decodes the numeric or text value encoded in the barcode — for example, 4006381333931 for a Stabilo pen. It does not automatically look up the product in a database. Once you have the decoded EAN-13 or UPC-A number, you can search it in barcode lookup services such as barcodelookup.com, buycott.com, or by searching the number directly in Google or Amazon. Product databases vary in completeness, particularly for regional or less common products.",
      },
    },
    {
      "@type": "Question",
      name: "Why would I need to read a barcode from an image rather than using my phone camera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several practical scenarios where image-based reading is necessary. You received a product photo via email or WhatsApp and need the barcode value without having the physical product. You photographed packaging or a store shelf and want to decode barcodes from the photos on your desktop computer. The barcode is on packaging in a PDF or document you received. You are auditing inventory and have a batch of product photos and need to extract barcode values without scanning each item physically. A colleague sent a screenshot of a product label and you need to identify the product. In all these cases, a browser-based barcode reader that accepts image files solves the problem without needing a hardware scanner or smartphone.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if the barcode reader cannot detect the barcode in my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Detection failures are almost always caused by image quality issues. Try these steps in order: First, crop the image so the barcode fills most of the frame — ZXing performs better on barcodes that occupy a significant portion of the image. Second, check the contrast: the dark bars should be clearly darker than the white spaces, with no heavy shadows across the barcode. Third, check for blur: even slight blur on the bar edges can prevent decoding — try a sharper photo or higher-resolution screenshot. Fourth, check for perspective angle: if the barcode is photographed at a steep angle (more than about 20-30 degrees off-center), try to find a more frontal view or use photo editing to correct the perspective. Fifth, check for partial coverage: make sure all bars are visible with clear quiet zones (the white margins on each side of the barcode). If all else fails, the barcode may have print damage, low contrast due to fading, or the image quality is too low for any decoder to recover.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BarcodeReaderOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="barcode-reader-online"
        description="You have a product photo and need to know what barcode is on it — the EAN-13 number, the UPC-A value, or the CODE128 string on a shipping label. This guide explains how barcode readers work when the input is an image rather than a live camera, what formats are supported, how ZXing decodes barcodes client-side with no upload, and how to get a reliable decode even from imperfect product photos."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "reader-vs-scanner", title: "Barcode reader vs barcode scanner: what is the difference" },
          { id: "supported-formats", title: "Supported barcode formats: EAN, UPC, CODE128, QR and more" },
          { id: "how-zxing-works", title: "How ZXing decodes a barcode from an image (technical)" },
          { id: "use-cases", title: "When you need to read a barcode from an image" },
          { id: "format-comparison", title: "Barcode format comparison table" },
          { id: "how-to-decode", title: "How to decode a barcode from a photo, step by step" },
          { id: "product-lookup", title: "After decoding: how to look up a product by barcode number" },
          { id: "privacy", title: "Privacy: why no-upload matters for barcode decoding" },
          { id: "troubleshooting", title: "Troubleshooting: when detection fails" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A barcode reader decodes barcodes from image files (product photos, screenshots, scans). A barcode scanner uses a live camera feed. Both use the same algorithm — the input source differs.",
          "The SammaPix Barcode Reader uses ZXing — the same library that powers Android barcode scanning — running entirely in your browser. No upload, no server, no signup.",
          "Supports EAN-13, EAN-8, UPC-A, UPC-E, CODE128, CODE39, ITF, Codabar, and QR codes from the same image upload. Format detected automatically.",
          "Common use cases: reading a barcode from a product photo received via chat, decoding labels from a batch of inventory photos on a desktop computer, verifying a barcode from a PDF document.",
          "After decoding, use the EAN-13 or UPC-A number to look up the product in barcode databases like barcodelookup.com or directly in Google.",
          "Image never leaves your browser. Processing is 100% local via ZXing JavaScript.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Close-up of a product barcode on retail packaging — an EAN-13 barcode with clearly visible bars and the numeric value printed below."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Read the EAN-13 or UPC-A value from a product photo in your browser — no scanner hardware, no upload.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Read a barcode from any image — free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              EAN-13, EAN-8, UPC-A, CODE128, CODE39, ITF, QR — all decoded in your browser via ZXing. Upload a product
              photo or screenshot and get the barcode value instantly. No signup, no server.
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
                href="/blog/scan-barcode-from-image"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Scan a barcode from a photo — step-by-step <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: Reader vs scanner ────────────────────────────────── */}

        <h2 id="reader-vs-scanner" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Barcode reader vs barcode scanner: what is the difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The terms &quot;barcode scanner&quot; and &quot;barcode reader&quot; are often used interchangeably, but they describe two fundamentally different input methods — and choosing the wrong one is why people get stuck when they need to decode a barcode from a photo.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">barcode scanner</strong> reads barcodes from a live source — a laser beam sweeping across a physical barcode at a retail checkout, or a camera app on your smartphone pointed at a product. The input is a real-time stream of data from a physical barcode. The barcode must be present in front of the scanner, in the right orientation, at the moment of scanning.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">barcode reader</strong> (also called a barcode decoder) works with a static image file. You provide a JPEG, PNG, WebP, or any image that contains a barcode — a product photo, a screenshot of packaging, a scan of a receipt, or a cropped image from a PDF. The reader analyzes the pixel data and extracts the barcode value without any camera, scanner hardware, or live feed.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The decoding algorithm is identical in both cases. <strong className="text-gray-800 dark:text-[#E5E5E5]">ZXing (Zebra Crossing)</strong> — the open-source library used by the SammaPix Barcode Reader — is the same library that powers Android&apos;s built-in barcode scanning. When you upload a product photo, ZXing applies the same detection and decoding logic it would apply to a live camera frame. The barcode in the image is decoded to the same result you would get by scanning the physical product.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical implication: if you have a clear photo of a product and need its barcode value — the 13-digit EAN number on the back of the box — you do not need the physical product in front of you. The image is enough.
        </p>

        {/* ── Section 2: Supported formats ────────────────────────────────── */}

        <h2 id="supported-formats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Supported barcode formats: EAN, UPC, CODE128, QR and more
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Barcode Reader uses ZXing, which supports all major 1D barcode formats used in retail, logistics, and industrial applications — plus QR codes. The format is detected automatically from the image. You do not need to specify which format the barcode uses before uploading.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what each format encodes and where you encounter it:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">EAN-13</strong>: The 13-digit barcode on virtually every retail product sold in Europe, Asia, and most of the world. The 13 digits encode a country prefix, a company prefix, a product reference, and a check digit. This is the barcode you see on the back of food packaging, books (ISBN barcodes are EAN-13), cosmetics, and electronics.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">EAN-8</strong>: A shorter 8-digit variant of EAN-13, used on very small packaging where a full 13-digit barcode does not fit — lip balm tubes, small spice jars, and similar compact products. Assigned by GS1 on request.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">UPC-A</strong>: The 12-digit barcode standard in North America. Every product sold in US or Canadian retail stores has a UPC-A code. Structurally, UPC-A is a subset of EAN-13 — an EAN-13 with a leading zero is functionally the same as the UPC-A without it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">UPC-E</strong>: A compressed 6-digit version of UPC-A, used on very small packaging in the US market. The full 12-digit value is recoverable from the abbreviated form.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CODE128</strong>: A general-purpose barcode for alphanumeric data — letters, numbers, and special characters. Used in logistics, shipping labels, inventory management, and any system where the value is not a standardized retail product number. Compact and high-density.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CODE39</strong>: An older alphanumeric format supporting uppercase letters and digits. Widely used in industrial, military, and healthcare applications. Longer than CODE128 for the same data, but supported by virtually all barcode scanners including older hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">ITF (Interleaved 2 of 5)</strong>: A 14-digit numeric barcode for outer shipping cartons, pallets, and cases. Printed directly on corrugated cardboard in warehouse and logistics environments. Decoding an ITF barcode from a photo of a cardboard box is a common use case.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR Code</strong>: The 2D matrix barcode for URLs, text, contact cards, and Wi-Fi credentials. Decodes from the same image upload as 1D barcodes. If an image contains both a 1D barcode and a QR code, ZXing detects whichever is more prominently positioned.
          </li>
        </ul>

        {/* ── Section 3: How ZXing works ──────────────────────────────────── */}

        <h2 id="how-zxing-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How ZXing decodes a barcode from an image (technical)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZXing (Zebra Crossing) is an open-source barcode library originally written in Java and ported to JavaScript as zxing-js. It implements the decoding specifications for each barcode format (ISO/IEC 15417 for CODE128, ISO/IEC 16388 for CODE39, ISO/IEC 15420 for EAN/UPC, and others).
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what happens inside ZXing when you upload an image:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Image rendering.</strong> The browser reads the image file and renders it to an HTML Canvas element. The Canvas exposes the raw pixel data as a flat RGBA array — four values per pixel (red, green, blue, alpha) for every pixel in the image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Grayscale conversion and binarization.</strong> ZXing converts the color image to grayscale and applies adaptive binarization — a process that determines a local threshold for each region of the image to distinguish dark bars from light spaces. This is why ZXing can decode barcodes with uneven lighting or slight shadows: it adapts the threshold locally rather than using a single global cutoff.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Row scanning.</strong> For 1D barcodes, ZXing scans multiple horizontal rows across the binarized image. For each row, it measures the widths of alternating dark and light bands. The ratio of these widths encodes the barcode data according to the specific format specification.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Format detection.</strong> ZXing tries to match the measured pattern against each supported format. For EAN-13, it looks for guard bars at the start, middle, and end. For CODE128, it identifies the start character pattern. The first successful match determines the format.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check digit verification.</strong> For EAN-13 and UPC-A, ZXing computes the expected check digit from the first 12 digits and compares it to the decoded 13th digit. A mismatch means a decode error. CODE128 uses a modulo-103 check character. CODE39 can optionally verify a modulo-43 check character.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Result output.</strong> The decoded text value and detected format are returned. The entire process runs in your browser&apos;s JavaScript engine. No network request is made at any point.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZXing&apos;s adaptive binarization is the key reason it outperforms simpler barcode readers on real-world product photos: lighting is rarely perfect, and a single global threshold would fail on images with shadows or gradient backgrounds. The local adaptation compensates for most real-world lighting conditions.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Decode a barcode from a product photo — free, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            EAN-13, UPC-A, CODE128, CODE39, ITF, QR — all decoded in your browser via ZXing. No upload, no server, no signup. Copy the decoded value instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/qr-code-reader"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              QR code reader <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 4: Use cases ────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need to read a barcode from an image
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Camera-based scanning is convenient when you have the physical product in hand. But there are many everyday situations where you have an image of a barcode rather than the physical item:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Product identification from a photo.</strong> A colleague or supplier sends you a product photo via email or WhatsApp. You need the EAN-13 or UPC-A number to look it up in a catalog, enter it into an inventory system, or verify it matches your database. The barcode is visible in the photo — but the physical product is not in front of you.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inventory audit from photos.</strong> You photographed shelves, products, or storage areas during an audit and now need to extract the barcode values from the photos on your desktop computer — without going back to rescan each item. Upload the photos one by one to decode the barcode values.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Shipping label on a PDF or scan.</strong> You received a delivery confirmation or shipping document as a PDF with a CODE128 tracking barcode. You need the tracking number without manually reading the human-readable text below the barcode. Decode from the PDF page screenshot.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Product listing verification.</strong> You are listing products on an e-commerce platform and want to verify that the EAN-13 barcode on the product matches the GTIN you entered. Take a photo of the product, decode the barcode, compare the value.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verifying generated barcodes.</strong> You generated a barcode using the <Link href="/tools/barcode-generator" className="text-[#6366F1] hover:underline">SammaPix Barcode Generator</Link> and want to confirm it decodes to the correct value before printing it on labels. Upload the PNG or SVG-rendered image to the barcode reader and verify the decoded output.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Desktop computer without a barcode scanner.</strong> You work on a desktop that does not have a mobile device or handheld scanner readily available. A browser-based barcode reader lets you decode barcodes from any image file without leaving your workstation.
          </li>
        </ul>

        {/* ── Section 5: Format comparison ────────────────────────────────── */}

        <h2 id="format-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Barcode format comparison table
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you decode a barcode from an image, the detected format tells you important context about the barcode — where it came from and what the value represents:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Data type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical source</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What to do with the decoded value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-13</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">13 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail product packaging (Europe, Asia, worldwide)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Look up in barcodelookup.com, Google, or Amazon. First 2-3 digits = country prefix.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Small retail packaging</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Search in product databases. Less common — smaller product range.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">UPC-A</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">12 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail product packaging (US, Canada)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Look up in Amazon.com or US product databases. Prepend 0 to convert to EAN-13.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE128</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Alphanumeric string</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Shipping labels, internal inventory, tracking numbers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Enter into tracking system (UPS, FedEx, DHL) or internal inventory database.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE39</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Uppercase alphanumeric</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Industrial, military, healthcare asset tags, library books</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Look up in internal asset management system. Not in public product databases.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ITF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">14 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Outer shipping cartons, warehouse pallets</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">First digit = packaging level indicator (1=each, 2=inner pack, 3=case). Look up GTIN in GS1.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">QR Code</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">URL, text, Wi-Fi, vCard, etc.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Marketing, menus, product pages, digital links</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Open URL in browser, save Wi-Fi credentials, add contact to address book.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 6: How to decode step by step ───────────────────────── */}

        <h2 id="how-to-decode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to decode a barcode from a photo, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/barcode-reader</strong> in any modern browser — Chrome, Firefox, Safari, or Edge. No account, no extension, no download required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Upload your image.</strong> Click the upload area or drag and drop the image file. JPEG, PNG, WebP, and other standard formats are supported. The image stays in your browser — it is not sent to any server. Alternatively, use the camera button to switch to live camera scanning mode if the barcode is physically accessible.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wait for ZXing to decode.</strong> The decoding is near-instant for clear images. The detected barcode format (EAN-13, CODE128, etc.) and the decoded value appear immediately below the image preview.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the decoded value.</strong> Click Copy to copy the barcode value to your clipboard. For EAN-13 and UPC-A, this is the number you can search in a product database. For CODE128, this is the tracking number, SKU, or inventory code.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If detection fails, crop and retry.</strong> If the barcode is not detected, crop the image so the barcode fills most of the frame, then upload the cropped version. A barcode that occupies 10% of a large image may not decode reliably, but the same barcode cropped to fill 80% of the frame will decode correctly. See the troubleshooting section below for additional tips.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process takes under 10 seconds for a clear barcode image. For batches of product photos, the best workflow is to keep each image cropped tightly to the barcode area before uploading.
        </p>

        {/* ── Section 7: Product lookup ────────────────────────────────────── */}

        <h2 id="product-lookup" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          After decoding: how to look up a product by barcode number
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you have the decoded EAN-13 or UPC-A number, there are several reliable ways to identify the product:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Google search.</strong> Paste the barcode number directly into Google. For well-known products, the product name and brand appear in the first results. This is the fastest method for common consumer goods.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Amazon search.</strong> Paste the UPC-A or EAN-13 into the Amazon search bar. Amazon&apos;s product catalog is indexed by GTIN, so well-known products resolve directly to their product listing page.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">barcodelookup.com.</strong> A dedicated barcode-to-product database covering millions of retail products. Free lookups for common products; full database access requires a subscription. Covers EAN-13, UPC-A, and ISBN barcodes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open Food Facts (for food products).</strong> world.openfoodfacts.org is a free, open database of food products indexed by EAN-13 barcode. It includes nutritional information, ingredients, and allergens — useful for food safety and dietary checking.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GS1 Verified by GS1.</strong> The official GS1 product database (gepir.gs1.org) allows lookups of registered GTINs. It identifies the company that registered the barcode, though not always the specific product. Useful for supply chain verification and brand authentication.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          CODE128 and CODE39 barcodes are internal or logistics codes and are not in public product databases. If you decode a CODE128 shipping number, look it up in the carrier&apos;s tracking system (UPS, FedEx, DHL, USPS). Internal SKU codes must be looked up in your own inventory system.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Decode any barcode format from a photo — no upload, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            ZXing runs locally in your browser. EAN-13, UPC-A, CODE128, CODE39, ITF, QR. Copy the value, look it up in any database. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/scan-barcode-from-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How to scan a barcode from a picture — guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Privacy ──────────────────────────────────────────── */}

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Privacy: why no-upload matters for barcode decoding
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many barcode decoder tools online are server-based: you upload your image, it is processed on their server, and the result is returned. For consumer product photos this is usually harmless. But there are scenarios where uploading is a real privacy concern.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Product photos in business contexts often contain proprietary information. A photo of a supplier&apos;s shipping label may reveal your logistics partner, your order volume, or your internal SKU system. A photo of a pharmaceutical product may reveal the patient&apos;s medication. A photo of a document with a CODE128 reference may expose a contract number or a confidential reference code.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you upload an image to a third-party server for barcode decoding, both the image and the decoded value pass through that server. You have no control over retention policies or access logs. Server-based tools that offer &quot;no data storage&quot; are making a claim you cannot verify.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browser-based decoding via ZXing eliminates this entirely. The image is read by your browser from your local file system. ZXing processes the Canvas pixel data in your browser&apos;s JavaScript engine. The decoded barcode value appears on screen. No network request is made. You can verify this in browser DevTools (F12, Network tab) — watch for outgoing requests while uploading and decoding. There are none.
        </p>

        {/* ── Section 9: Troubleshooting ──────────────────────────────────── */}

        <h2 id="troubleshooting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Troubleshooting: when detection fails
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ZXing is robust, but there are conditions that prevent reliable decoding. Here is how to diagnose and fix the most common issues:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Problem</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Likely cause</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">No barcode detected</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Barcode too small relative to image size</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Crop the image so the barcode fills 50-80% of the frame, then re-upload.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Decode fails on a clear image</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Heavy JPEG compression artifacts around bar edges</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use a PNG screenshot or a higher-quality JPEG. Avoid double-JPEG (screenshotting a JPEG already on screen).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Wrong value decoded</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Check digit mismatch due to blur or artifacts</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Get a sharper image. Blur on individual bar edges causes misreads even when the barcode looks OK to the eye.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Fails on a photo at an angle</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Perspective distortion beyond ZXing&apos;s correction range</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use a photo editor to correct perspective, or find a more frontal view of the barcode.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Low contrast barcode</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark background, colored barcode, or faded print</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Increase contrast in any image editor before uploading. ZXing works best on dark-on-white barcodes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most reliable barcode images for decoding are screenshots rather than photos — they have no perspective distortion, no blur, no JPEG artifacts, and the barcode is rendered at screen resolution. If you can take a screenshot rather than photographing a screen, do so.
        </p>

        {/* ── Section 10: Related tools ───────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-reader" className="text-[#6366F1] hover:underline">Barcode Reader</Link></strong>: the tool covered in this article. Decode EAN-13, EAN-8, UPC-A, UPC-E, CODE128, CODE39, ITF, and QR from any image. ZXing runs locally. No upload, no account.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-generator" className="text-[#6366F1] hover:underline">Barcode Generator</Link></strong>: generate a barcode from any value — CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. Download PNG or SVG. No upload, no account. See{" "}
            <Link href="/blog/barcode-generator-online" className="text-[#6366F1] hover:underline">barcode generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">QR Code Reader</Link></strong>: decode any QR code from an image or live camera. Uses jsQR running locally. No upload, no account. See{" "}
            <Link href="/blog/qr-code-reader-online" className="text-[#6366F1] hover:underline">QR code reader guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/blog/scan-barcode-from-image" className="text-[#6366F1] hover:underline">How to scan a barcode from a picture</Link></strong>: step-by-step guide for the specific scenario of reading a barcode from a product photo or screenshot — the most common reason people need a barcode reader rather than a scanner app.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-to-image" className="text-[#6366F1] hover:underline">PDF to Image</Link></strong>: extract pages from a PDF as images. Useful when a barcode you need to decode is embedded in a PDF document — convert the page to an image and upload it to the barcode reader.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your barcode tools — all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Decode barcodes from images, generate barcodes for labels, read QR codes from screenshots — without uploading anything anywhere. No server. No signup. No watermark.
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
