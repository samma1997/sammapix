import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Barcode Generator Online — Free Code128, EAN [2026]",
  description:
    "Generate CODE128, EAN-13, UPC barcodes. Download PNG/SVG. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/barcode-generator-online`,
  },
  keywords: [
    "barcode generator",
    "free barcode generator",
    "ean barcode generator",
    "code128 generator",
    "barcode generator online",
    "ean-13 barcode generator",
    "upc barcode generator",
    "barcode maker free",
    "generate barcode online",
    "barcode png svg download",
  ],
  openGraph: {
    title: "Barcode Generator Online — Free Code128, EAN [2026]",
    description:
      "Generate barcodes from any value in your browser. CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. Download PNG or SVG. No signup, no upload. Free for commercial use.",
    url: `${APP_URL}/blog/barcode-generator-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Barcode Generator Online — CODE128, EAN-13, UPC [2026]",
    description:
      "Generate CODE128, EAN-13, UPC, CODE39, ITF-14 barcodes in your browser. PNG + SVG. No signup. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/barcode-generator-online`;
const POST_TITLE = "Free Barcode Generator Online — CODE128, EAN-13, UPC, QR [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most barcode generators online ask you to create an account or upload data to a server. This guide explains the six main barcode formats — CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14 — when to use each one, the difference between 1D barcodes and QR codes, when to download PNG vs SVG, and how to generate a barcode entirely in your browser at no cost.",
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
    "barcode generator",
    "free barcode generator",
    "ean-13 barcode",
    "code128 generator",
    "upc barcode generator",
    "barcode png svg",
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
  name: "How to Generate a Barcode Online for Free Without Signing Up",
  description:
    "Create a barcode from any value — product code, SKU, ISBN, or custom number — entirely in your browser. Choose CODE128, EAN-13, EAN-8, UPC-A, CODE39, or ITF-14. Download PNG or SVG. No account, no upload, free for commercial use.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Barcode Generator (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Barcode Generator",
      text: "Go to sammapix.com/tools/barcode-generator in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose your barcode format",
      text: "Select the format that matches your use case: CODE128 for general-purpose and logistics, EAN-13 for European retail, UPC-A for North American retail, EAN-8 for small packaging, CODE39 for industrial and internal use, or ITF-14 for shipping cartons.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter your barcode value",
      text: "Type or paste the value to encode. EAN-13 requires 12 or 13 digits (the check digit is calculated automatically). UPC-A requires 11 or 12 digits. CODE128 and CODE39 accept alphanumeric characters. The barcode preview updates in real time.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download PNG or SVG",
      text: "Click Download PNG for digital use or Download SVG for print. SVG scales to any size without quality loss — essential for labels and packaging. The file is generated in your browser. No server processes your data.",
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
      name: "What is the difference between CODE128 and EAN-13?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CODE128 is a general-purpose barcode that can encode any ASCII character — letters, numbers, and special characters. It is widely used in logistics, shipping labels, internal inventory systems, and any application where the value is not a standardized retail product number. EAN-13 is a fixed 13-digit numeric barcode governed by GS1 (Global Standards 1). It is the international standard for retail product identification in Europe and most of the world. A specific company prefix and item reference are assigned by GS1 when you register. If you are selling a product through retail channels that require scanning at checkout, you need an official EAN-13 number purchased through GS1.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a generated barcode for retail products sold in stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can generate the barcode image for free. However, the number encoded in a retail barcode (EAN-13 or UPC-A) must be officially registered through GS1 to be globally unique and accepted at retail checkout. GS1 is the international standards body that assigns company prefixes — the first segment of an EAN-13 or UPC-A number — to ensure no two products share the same barcode in retail databases. You can generate a test barcode with any 13-digit number, but for actual retail use, purchase a prefix through gs1.org or your national GS1 member organization.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a 1D barcode and a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 1D barcode (like CODE128, EAN-13, or UPC-A) encodes data in a series of parallel lines of varying widths. It can only encode numbers and a limited character set, and the data is read by a horizontal laser scan. These are the barcodes on product packaging in retail stores. A QR code is a 2D matrix barcode that encodes data in a square grid of black-and-white modules. It can encode far more data — URLs, full text, contact cards, Wi-Fi credentials. QR codes can be scanned from any angle and with phone cameras. Use 1D barcodes for retail checkout, inventory labels, and logistics. Use QR codes for URLs, marketing materials, and mobile-first use cases.",
      },
    },
    {
      "@type": "Question",
      name: "When should I download PNG versus SVG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download PNG when the barcode will appear on screens: websites, emails, presentations, or digital displays. Choose a resolution that matches your display — 512px wide is suitable for most web use. Download SVG when the barcode will be printed: product labels, packaging, shipping boxes, or point-of-sale materials. SVG is a vector format that scales to any physical size without pixelation. A barcode that is blurry or pixelated will fail to scan. For commercial label printing at 300 dpi or higher, always use SVG.",
      },
    },
    {
      "@type": "Question",
      name: "What is ITF-14 used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ITF-14 (Interleaved 2 of 5, 14 digits) is designed for outer shipping cartons, cases, and pallets — the packaging level above individual retail items. It encodes the same product identifier as the EAN-13 product barcode, prefixed with a packaging level indicator, for a total of 14 digits. Warehouse and distribution center scanning equipment reads ITF-14. You will see it on the side of cardboard shipping boxes, not on individual consumer products. The barcode is printed directly on corrugated cardboard, which is why it uses thick lines that are easier to scan on rough surfaces.",
      },
    },
    {
      "@type": "Question",
      name: "Does the barcode generator upload my data to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The barcode is generated entirely in your browser using client-side JavaScript. The value you enter never leaves your device. You can verify this by opening your browser developer tools (F12), going to the Network tab, and watching for outgoing requests while you type a value and download the barcode. You will see no requests carrying your input data. This is particularly important for internal SKUs, proprietary product codes, or inventory numbers you would rather not share with a third-party server.",
      },
    },
    {
      "@type": "Question",
      name: "What does the EAN-13 check digit do and is it calculated automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EAN-13 check digit is the 13th and final digit of the barcode number. It is calculated from the first 12 digits using a standardized algorithm (alternating weights of 1 and 3, modulo 10). Its purpose is error detection: if a scanner reads a digit incorrectly, the check digit will not match and the scan will fail, preventing mis-scans. The SammaPix barcode generator calculates the check digit automatically when you enter 12 digits — you do not need to compute it manually. If you enter all 13 digits, the tool verifies that your check digit is correct.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use CODE39 barcodes for non-retail applications like asset tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CODE39 is widely used for internal tracking where GS1-registered numbers are not required: asset tags on office equipment, library books, employee badges, tool cribs, and medical device labeling. CODE39 can encode uppercase letters (A-Z), digits (0-9), and a small set of special characters (space, minus, plus, period, dollar, slash, percent). It is self-checking and does not require a separate check digit, though an optional check digit can be added. CODE39 barcodes are longer than CODE128 for the same data, so CODE128 is preferred when space is limited.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BarcodeGeneratorOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="barcode-generator-online"
        description="Every barcode format serves a different purpose — and using the wrong one creates problems at checkout, in the warehouse, or with your label printer. This guide covers the six main formats (CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14), when to use each one, the honest note on GS1 registration for retail use, and how to generate and download any barcode for free in your browser."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "what-is-a-barcode", title: "What is a barcode and how does it work" },
          { id: "barcode-formats", title: "The six main barcode formats and when to use each" },
          { id: "1d-vs-qr", title: "1D barcodes vs QR codes: which one do you need" },
          { id: "ean-gs1", title: "EAN-13 and UPC for retail: the honest note on GS1" },
          { id: "png-vs-svg", title: "PNG vs SVG: which format to download" },
          { id: "how-to-generate", title: "How to generate a barcode online, step by step" },
          { id: "use-cases", title: "Common use cases: inventory, retail, logistics, libraries" },
          { id: "related-tools", title: "Related tools in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A barcode encodes data as a pattern of lines (1D) or a matrix (2D) that scanners read optically. Different formats serve different industries and use cases.",
          "CODE128 is the best default for most applications: alphanumeric, compact, and universally readable. EAN-13 and UPC-A are mandatory for retail checkout — but the number must be GS1-registered.",
          "EAN-8 is for small packaging, CODE39 for industrial and asset tagging, ITF-14 for outer shipping cartons.",
          "1D barcodes encode a short numeric or alphanumeric string. QR codes encode far more data (URLs, text, contact info) and scan from any angle with a phone camera.",
          "Download SVG for print (labels, packaging, shipping). Download PNG for digital use (screens, emails, web).",
          "The SammaPix Barcode Generator runs entirely in your browser. No upload, no account, no server. Free for commercial use.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Product packaging with EAN barcodes on a retail shelf, showing how barcodes are used in commercial product identification."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              EAN-13 and UPC-A barcodes on retail packaging require a GS1-registered number — but you can generate and test the barcode image itself for free.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a barcode free — no account, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14 — all generated in your browser. Download PNG or SVG. No
              signup, no server. Free for commercial use.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/barcode-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Generate Barcode, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/create-barcode-free"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Create a barcode step by step <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Need a QR code instead? <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is a barcode ─────────────────────────────────── */}

        <h2 id="what-is-a-barcode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a barcode and how does it work
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A barcode is a machine-readable representation of data. The most common form — the 1D linear barcode you see on retail products — encodes a number or short text string as a series of parallel bars of varying widths and the spaces between them. A barcode scanner shines a laser (or uses a camera) across the pattern, measures the widths of light and dark bands, and decodes them back to the original value using the barcode specification.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Barcode scanners work by measuring the ratio of bar widths rather than their absolute size. This means a barcode can be printed at different physical sizes and still scan correctly — as long as the proportions are preserved and the print quality is sharp enough for the scanner to distinguish individual bars. This is one reason vector SVG output matters: it preserves exact proportions at any print size.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Barcodes were invented in the late 1940s and saw widespread commercial adoption in the 1970s, starting with supermarket checkout. The UPC system — Universal Product Code — was standardized in North America in 1974. The European Article Number (EAN) system followed in 1976. Both systems are now governed globally by GS1 (Global Standards 1), which manages the assignment of company prefixes to ensure every product has a globally unique identifier.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Beyond retail, barcodes appear everywhere: airline boarding passes, library books, pharmaceutical packaging, hospital wristbands, warehouse shelving, postal parcels, and manufacturing assembly lines. The specific format used in each application is chosen based on the type of data being encoded, the scanning environment, and industry standards.
        </p>

        {/* ── Section 2: Barcode formats ────────────────────────────────────── */}

        <h2 id="barcode-formats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The six main barcode formats and when to use each
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all barcodes are the same. The format determines what characters can be encoded, how compact the barcode is, and whether it is accepted in a given industry. Here is a clear comparison of the six formats supported by the SammaPix Barcode Generator:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Data encoded</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Primary use</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE128</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full ASCII — letters, numbers, special characters</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">General-purpose, logistics, shipping labels, inventory</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most compact 1D barcode. Best default for custom SKUs and internal tracking.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-13</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">13 digits (12 + check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail — Europe, Asia, worldwide (excluding North America)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Number must be GS1-registered for real retail use. Check digit auto-calculated.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8 digits (7 + check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail — small packaging where EAN-13 does not fit</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Assigned by GS1 on request for products with very limited label space.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">UPC-A</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">12 digits (11 + check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail — United States and Canada</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">EAN-13 supersedes UPC-A globally. UPC-A is a subset of EAN-13 (zero-prefixed).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE39</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A-Z, 0-9, and 8 special characters</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Industrial, military, automotive, healthcare asset tags</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Longer than CODE128. Self-checking. No mandatory check digit. Widely supported by older scanners.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ITF-14</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">14 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Outer shipping cartons, cases, pallets</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Printed on corrugated cardboard. Thick lines tolerate rough surfaces. GS1-128 is an alternative for cartons.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are not sure which format to use, CODE128 is the right default for most non-retail applications. It handles any text, is compact, and is supported by virtually all modern barcode scanners. For retail products sold in physical stores, you need EAN-13 (most of the world) or UPC-A (North America), and the number must be officially registered through GS1.
        </p>

        {/* ── Section 3: 1D vs QR ───────────────────────────────────────────── */}

        <h2 id="1d-vs-qr" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          1D barcodes vs QR codes: which one do you need
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The two are fundamentally different tools, and the choice depends on what you need to encode and where it will be scanned.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">1D barcode</strong> (CODE128, EAN-13, UPC-A, CODE39) is a horizontal strip of bars. It stores a short string — typically a product number, SKU, or serial number — and is scanned by a horizontal laser sweep. Retail checkout scanners, warehouse handheld scanners, and industrial fixed scanners all read 1D barcodes. The capacity is limited: a CODE128 barcode can encode up to about 80 characters in practice before the barcode becomes too wide to print on a label.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">QR code</strong> is a 2D matrix barcode. It stores far more data — up to 3,000 alphanumeric characters or 7,000 digits. QR codes can be scanned from any angle and by phone cameras without a dedicated scanner. They are the standard for URLs, marketing campaigns, restaurant menus, Wi-Fi access, and event tickets.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">1D Barcode (CODE128, EAN, UPC)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">QR Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Data capacity</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low — short numbers or text strings</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">High — URLs, full paragraphs, contact cards</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Scanner hardware</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Laser scanner, imager scanner, retail checkout</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Smartphone camera, 2D imager scanner</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Scan angle</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Horizontal sweep only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any angle, including upside down</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Best for</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retail checkout, warehouse, inventory, logistics</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">URLs, menus, marketing, Wi-Fi, event tickets</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Industry standard</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Required for retail POS systems worldwide</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No mandatory standard — used where URL sharing is the goal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your goal is to link to a website, share Wi-Fi credentials, or display a scannable URL on a poster, use a QR code. If your goal is to label a physical product for retail checkout, track inventory in a warehouse, or mark an asset for internal systems, use a 1D barcode in the appropriate format. Both are available on SammaPix, with no upload and no account required.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a barcode in your browser — free, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. Download PNG or SVG. No server, no signup. Free for commercial use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/qr-code-generator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Generate a QR code instead <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 4: EAN and GS1 ────────────────────────────────────────── */}

        <h2 id="ean-gs1" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          EAN-13 and UPC for retail: the honest note on GS1
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many barcode generators online let you type any 13-digit number and download an EAN-13 barcode. Technically, the barcode image will scan correctly. But for retail products sold through physical stores or any platform that requires a globally unique product identifier (Amazon, Walmart, supermarket chains), the number itself matters — not just the image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">GS1 (Global Standards 1)</strong> is the international organization that assigns company prefixes — the first 7 to 12 digits of an EAN-13 or UPC-A number. The company prefix identifies the manufacturer. The remaining digits identify the specific product and packaging variant. The final digit is a check digit calculated from the others.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you invent a 13-digit number and print it on a product, that number may already be assigned to another company&apos;s product in the GS1 database. Retail stores that scan the number against their product databases will get a mismatch or a conflict. For real retail use, you need to either purchase a GS1 company prefix directly from gs1.org, or buy individual GTINs (Global Trade Item Numbers) from a GS1-authorized reseller.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">When you do not need GS1 registration:</strong> internal inventory systems, libraries, asset tagging, test barcodes for label design, prototype product labeling for internal review, and any use case where you control both the barcode printer and the barcode scanner. In these cases, use CODE128 with your own SKU format or any 13-digit number of your choice for EAN-13 layout testing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">When you do need GS1 registration:</strong> selling through any retailer that connects your barcode to a product database, listing on Amazon or Walmart with a product barcode, or any supply chain integration where your trading partners look up GTINs.
        </p>

        {/* ── Section 5: PNG vs SVG ─────────────────────────────────────────── */}

        <h2 id="png-vs-svg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          PNG vs SVG: which format to download
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For barcodes, the choice between PNG and SVG is more consequential than for most image types. A barcode that is blurry or pixelated simply will not scan. The format determines how the barcode scales and whether scan reliability is maintained at all print sizes.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">SVG for print.</strong> SVG is a vector format. The barcode is described as geometric shapes rather than pixels. It can be scaled to any physical size — from a 1cm label sticker to a 30cm shipping carton — without any loss of quality or pixelation. Label design software, print shops, and professional printing workflows all prefer SVG. Always download SVG if the barcode will be printed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PNG for digital use.</strong> PNG is a raster format at a fixed resolution. It is the right choice when the barcode will be displayed on screens: websites, email templates, digital inventory management systems, or PDF documents viewed on-screen. Generate the PNG at a size that matches or exceeds the largest display size needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Never upscale a PNG.</strong> Enlarging a raster barcode image blurs the bar edges and will cause scan failures. If you downloaded a PNG and need it larger, download a new SVG instead.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For professional label printing at 300 dpi or higher, SVG is the only format that guarantees crisp, scannable output regardless of label size. The SammaPix Barcode Generator provides SVG download at no cost — no paywall, no upgrade required.
        </p>

        {/* ── Section 6: How to generate step by step ───────────────────────── */}

        <h2 id="how-to-generate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to generate a barcode online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/barcode-generator</strong> in any modern browser. No account, no extension, no plugin required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your barcode format.</strong> Select the format from the dropdown: CODE128, EAN-13, EAN-8, UPC-A, CODE39, or ITF-14. Use the format table above if you are unsure which to choose.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter your value.</strong> Type or paste the value to encode. For EAN-13, enter 12 digits — the check digit is calculated and appended automatically. For CODE128 and CODE39, you can use letters and numbers. The barcode preview updates in real time.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify the preview.</strong> Before downloading, visually confirm the barcode looks correct and — if you have a scanner available — scan the preview to verify it decodes to the expected value.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download PNG or SVG.</strong> Click Download PNG for digital use or Download SVG for print. The file is generated in your browser and saved to your device. Your data never leaves your browser. The barcode has no expiry.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Always scan the barcode with a real scanner before putting it on physical materials. A quick scan test takes ten seconds and prevents the embarrassment of shipping products with a broken barcode.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">No upload, no server — your barcode stays in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Generate and download PNG or SVG. Real-time preview. No account, no expiry, free for commercial use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/create-barcode-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Step-by-step guide: create a barcode free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: Use cases ──────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common use cases: inventory, retail, logistics, libraries
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Barcodes are useful across a much wider range of applications than retail alone. Here are the most common use cases and which format fits each:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Warehouse and inventory management.</strong> Use CODE128 with your own SKU system. CODE128 handles alphanumeric codes (like PROD-A1234-BLK-L) that are more descriptive than numeric-only formats. Print labels in SVG for durability across label sizes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Retail product labeling.</strong> EAN-13 for products sold in European and international markets. UPC-A for North American retail. Register the prefix through GS1 before printing on commercial products. Generate the label image here, add it to your label design file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Library book tracking.</strong> Libraries have used barcodes for decades. CODE39 is a traditional choice for library catalogs. CODE128 is more compact and supported by all modern library management systems. Each book gets a unique number encoded in the barcode on the inside cover.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Office and IT asset tagging.</strong> CODE128 or CODE39 barcodes on desktops, monitors, projectors, and other equipment link the physical item to an asset management database. Scanned during audits to verify location and condition.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Shipping and logistics.</strong> ITF-14 on outer cartons. CODE128 or GS1-128 on parcel labels. Courier services like UPS and FedEx use variants of CODE128 for their tracking numbers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Event tickets and boarding passes.</strong> CODE128 or PDF417 (not a 1D barcode — a 2D stacked barcode) are used for event tickets. Airline boarding passes use Aztec or QR codes. For a simple event ticket with a booking reference, CODE128 is practical and universally scannable.
          </li>
        </ul>

        {/* ── Section 8: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools in your browser
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-generator" className="text-[#6366F1] hover:underline">Barcode Generator</Link></strong>: the tool covered in this article. CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. PNG and SVG. No account, no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate static QR codes for URLs, text, Wi-Fi, email, and vCard. Download PNG or SVG. See{" "}
            <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-reader" className="text-[#6366F1] hover:underline">Barcode Reader</Link></strong>: scan and decode a barcode from an image or screenshot — no camera required. Upload a photo of a product and read the barcode value instantly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></strong>: convert any SVG file to a rasterized PNG at a specific resolution. Useful if you download an SVG barcode and need a PNG version at a precise pixel size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">Add Text to Image</Link></strong>: overlay product names, prices, or other text on a barcode PNG for quick label prototyping — entirely in your browser.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your barcode and label tools, in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Barcodes, QR codes, barcode reading, SVG conversion — without uploading files anywhere. All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/barcode-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Barcode Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/svg-to-png" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/add-text-to-image" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Add Text to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────────── */}

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
