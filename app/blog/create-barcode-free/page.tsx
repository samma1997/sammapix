import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Create Barcode Free — No Signup Required [2026]",
  description:
    "Generate barcodes without account. Choose format, download PNG/SVG. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/create-barcode-free`,
  },
  keywords: [
    "create barcode",
    "barcode maker",
    "make barcode free",
    "barcode no signup",
    "create barcode free",
    "barcode generator no account",
    "make barcode online",
    "free barcode maker no signup",
    "barcode creator online free",
    "generate barcode no upload",
  ],
  openGraph: {
    title: "Create Barcode Free — No Signup Required [2026]",
    description:
      "Create a barcode for free without an account. Choose the right format for your use case, enter your value, download PNG or SVG. No upload, no server. Works for inventory, retail, and asset labels.",
    url: `${APP_URL}/blog/create-barcode-free`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a Barcode Free Without Signup [2026]",
    description:
      "Create barcodes (CODE128, EAN-13, UPC, CODE39) in your browser. No signup, no upload. PNG + SVG. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/create-barcode-free`;
const POST_TITLE = "Create a Barcode for Free Without Signup — Browser-Based [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "This guide walks through the full process of creating a barcode for free without signing up: choosing the right format for your use case, understanding EAN-13 validation, picking PNG vs SVG, printing for labels, and the honest note on GS1 registration for retail products.",
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
    "create barcode free",
    "barcode maker no signup",
    "barcode generator no account",
    "make barcode online",
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
  name: "How to Create a Barcode for Free Without Signing Up",
  description:
    "Create a barcode from any value in your browser — no account, no upload, no server. Covers format selection, value validation, PNG vs SVG download, and printing for labels.",
  totalTime: "PT2M",
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
      name: "Decide which barcode format you need",
      text: "Use CODE128 for internal inventory and custom SKUs. Use EAN-13 for products sold in European or international retail. Use UPC-A for North American retail. Use CODE39 for industrial asset tags. Use ITF-14 for shipping cartons. If unsure, CODE128 is the safest default.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the Barcode Generator",
      text: "Go to sammapix.com/tools/barcode-generator. No account or signup required. The tool runs entirely in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter your barcode value",
      text: "Select the format from the dropdown and type or paste your value. For EAN-13, enter 12 digits — the 13th check digit is calculated automatically. For CODE128, enter any alphanumeric string. The live preview updates as you type.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download PNG or SVG",
      text: "Click Download SVG if the barcode will be printed on labels, packaging, or shipping materials. Click Download PNG for digital documents, emails, or on-screen display. SVG scales to any size without pixelation.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Test the barcode before distributing",
      text: "Scan the barcode with a phone camera or barcode scanner app to confirm it decodes to the correct value before printing labels or sending to packaging suppliers.",
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
      name: "Do I need to create an account to generate a barcode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix Barcode Generator runs entirely in your browser without any account, signup, or email address required. The barcode is generated by client-side JavaScript on your device. Your value is never sent to any server. You can verify this by opening browser DevTools (F12), going to the Network tab, and watching for outgoing requests as you type your barcode value — you will see none. No account means no password to remember, no emails, no subscription, and no data collected.",
      },
    },
    {
      "@type": "Question",
      name: "What format should I choose for a warehouse inventory barcode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use CODE128. It is the best choice for internal inventory barcodes because it supports alphanumeric characters (letters and numbers), which allows descriptive SKU formats like PROD-A1234-BLK-L or INV-20260804-001. CODE128 produces a compact barcode — shorter than CODE39 for the same data — and is supported by all modern barcode scanners, including handheld guns, fixed warehouse scanners, and phone camera apps. There is no need to register the number with any external body for internal use.",
      },
    },
    {
      "@type": "Question",
      name: "How do I validate an EAN-13 barcode number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An EAN-13 number consists of 12 data digits plus a 13th check digit. The check digit is calculated using the following algorithm: (1) Take the 12 data digits. (2) Multiply digits in even positions by 3 and odd positions by 1. (3) Sum all the results. (4) The check digit is (10 minus the last digit of the sum), modulo 10. The SammaPix Barcode Generator calculates this automatically when you enter 12 digits. If you enter all 13 digits, the tool verifies that your check digit is correct. An incorrect check digit will cause scan failures at retail checkout.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a barcode for a product I want to sell on Amazon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can generate the barcode image here for free, but Amazon requires that product barcodes be officially registered with GS1 for most product categories. Amazon uses the GTIN (Global Trade Item Number) to connect your product to its catalog database. A randomly invented 13-digit number will not match any registered GTIN. To sell on Amazon with a barcode: (1) Purchase a GS1 company prefix or individual GTINs at gs1.org. (2) Create your product listing with the assigned GTIN. (3) Use the SammaPix Barcode Generator to create the label image using your official GTIN. Some categories offer GTIN exemptions — check the Amazon Seller Central documentation for your specific product type.",
      },
    },
    {
      "@type": "Question",
      name: "What file format should I use to send a barcode to my label printer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download SVG. Label design software (Bartender, NiceLabel, ZebraDesigner, Adobe Illustrator, Affinity Designer) all import SVG natively. SVG is a vector format — it describes the barcode as geometric shapes, not pixels. This means the barcode can be scaled to any label size without any loss of quality or risk of pixelation. Label printers typically print at 203 or 300 dpi. At these resolutions, a pixelated PNG will produce blurred bar edges and scan failures. SVG eliminates this risk entirely.",
      },
    },
    {
      "@type": "Question",
      name: "What minimum print size is required for a CODE128 barcode to scan reliably?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For CODE128, the GS1 General Specifications recommend a minimum X-dimension (the width of the narrowest bar) of 0.25mm when printed at 300 dpi or higher. In practical terms, a CODE128 barcode encoding a typical SKU (10-15 characters) printed at its nominal size needs at least 30mm width and 15mm height for reliable scanning. For very compact labels, keep the encoded value short and use a high-quality printer. SVG output from the SammaPix generator preserves the exact bar proportions required by the specification.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated barcode for commercial use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Barcodes generated by the SammaPix Barcode Generator are free for commercial use — internal inventory, retail product labels, shipping materials, or any other business application. There is no watermark, no attribution requirement, and no license restriction from SammaPix on the output image. The barcode format specifications themselves (CODE128, EAN, UPC, CODE39, ITF-14) are open industry standards. The only legal consideration is the number you encode: for retail EAN-13 and UPC-A barcodes, the GTIN must be purchased through GS1 to ensure global uniqueness.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my barcode not scanning correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common causes of scan failure: (1) Wrong format selected — verify the format matches what your scanner expects (a retail scanner expects EAN-13, not CODE128). (2) Check digit error — for EAN-13, if you entered all 13 digits manually, one may be wrong; re-enter just the 12 data digits and let the tool calculate the check digit. (3) Print quality — if you printed from a PNG, the image may be too small or upscaled, causing blurry bar edges; download SVG instead. (4) Damage or reflection — labels in high-moisture or reflective environments need extra quiet zone margins and possibly lamination. (5) Scanner compatibility — some older 1D laser scanners cannot read CODE128 subsets; confirm scanner spec.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CreateBarcodeFree() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="create-barcode-free"
        description="Creating a barcode is straightforward — but picking the wrong format, entering an invalid value, or downloading a raster PNG for a label printer will waste time. This guide walks through every decision: format selection by use case, EAN-13 check digit validation, PNG vs SVG, minimum print sizes, and the GS1 note for retail. No account, no upload, no server required."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "why-no-signup", title: "Why barcode generators should not require signup" },
          { id: "choose-format", title: "Step 1 — Choose the right format for your use case" },
          { id: "enter-validate-value", title: "Step 2 — Enter and validate your barcode value" },
          { id: "png-vs-svg", title: "Step 3 — Choose PNG or SVG" },
          { id: "print-labels", title: "Step 4 — Print on labels: sizes, DPI, and quiet zones" },
          { id: "test-before-printing", title: "Step 5 — Test before printing at scale" },
          { id: "gs1-retail-note", title: "Retail use: the GS1 note you need to read" },
          { id: "use-cases", title: "Real use cases: inventory, asset tags, libraries, shipping" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most barcode generators that require signup are harvesting your data or upselling a paid plan. The barcode itself is a browser-side computation — no server is needed.",
          "Choose CODE128 for internal SKUs and general use. EAN-13 or UPC-A for retail products (GS1 registration required for the number). CODE39 for industrial asset tags. ITF-14 for shipping cartons.",
          "EAN-13 check digits are calculated automatically when you enter 12 digits. A wrong check digit causes scan failures at retail checkout.",
          "Download SVG for print (labels, packaging). Download PNG for digital (emails, web, PDFs). Never upscale a PNG barcode.",
          "Test every barcode by scanning it before printing at scale. A quick scan test takes 10 seconds and catches problems before they reach production.",
          "Your barcode value never leaves your browser. No upload, no account, no server. Free for commercial use.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Person scanning a barcode on a product with a handheld scanner in a warehouse or stockroom environment."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A barcode generated in your browser and printed on a label can be scanned by any standard handheld scanner — no account or server required.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create a barcode now — no account, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. Download PNG or SVG. Runs in your browser. Free for
              commercial use.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/barcode-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Create Barcode, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/barcode-generator-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Barcode formats explained <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Need a QR code? <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why no signup ──────────────────────────────────────── */}

        <h2 id="why-no-signup" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why barcode generators should not require signup
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Generating a barcode is a client-side computation. The tool takes your input value, applies the barcode encoding algorithm (CODE128, EAN-13, or another standard), and draws a series of bars on a canvas or as an SVG. No server is involved. No file needs to be uploaded. The entire process happens in browser memory.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When a barcode generator asks you to create an account or enter an email address, it is not doing so because the tool technically requires it. The account requirement exists to build a user database, enable marketing follow-ups, or lock features behind a paid plan. For a task that takes one second of CPU time in your browser, none of that is necessary.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters more for barcodes than for many other tools. Barcode values often include proprietary information: internal SKUs, inventory numbers, supplier codes, or unreleased product GTINs that you would prefer not to transmit to a third-party server. With a client-side generator, nothing is transmitted. You can verify this yourself with browser DevTools — open the Network tab, type a value, and download. No outgoing request carries your data.
        </p>

        {/* ── Section 2: Choose format ──────────────────────────────────────── */}

        <h2 id="choose-format" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 1 — Choose the right format for your use case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common mistake when creating a barcode is selecting the wrong format. Each format has specific constraints on what characters it can encode and where it is accepted. Here is a decision framework:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Internal inventory, warehouse, or asset tags.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">CODE128</strong>. It handles alphanumeric values of any length and is the most compact 1D format. No external registration needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Retail products sold in Europe or internationally.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">EAN-13</strong> with a GS1-registered number. The number must be purchased — see the GS1 note later in this article.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Retail products sold in the United States or Canada.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">UPC-A</strong> with a GS1-registered prefix. EAN-13 scanners also read UPC-A (UPC-A is a zero-prefixed EAN-13).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Small packaging where EAN-13 does not fit.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">EAN-8</strong>. This format requires a GS1-assigned 8-digit number — GS1 allocates EAN-8 numbers specifically for products with insufficient label space.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Industrial, military, or healthcare asset labels.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">CODE39</strong>. Older industrial scanners may not support CODE128. CODE39 is self-checking, does not require a mandatory check digit, and is specified in many legacy industry standards.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Outer shipping cartons and pallets.</strong> Use <strong className="text-gray-800 dark:text-[#E5E5E5]">ITF-14</strong>. The thick bars print clearly on corrugated cardboard. Encodes 14 digits: a packaging indicator + the 13-digit EAN of the retail product.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When in doubt, start with CODE128. It is the right answer for a large majority of non-retail barcode needs and is accepted by virtually all modern scanners.
        </p>

        {/* ── Section 3: Enter and validate value ───────────────────────────── */}

        <h2 id="enter-validate-value" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 2 — Enter and validate your barcode value
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each barcode format has specific rules about what characters and values are valid. Entering an invalid value will produce a barcode that either does not display or fails to scan correctly.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Valid characters</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Length rule</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Check digit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE128</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">All ASCII (0-127)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any length (practical limit: 80 chars for readable label)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Auto-calculated and embedded (not shown in human-readable text)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-13</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Digits 0-9 only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Exactly 12 data digits (13th is check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Auto-calculated from 12 digits. Must match if 13 provided.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EAN-8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Digits 0-9 only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Exactly 7 data digits (8th is check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Auto-calculated from 7 digits.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">UPC-A</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Digits 0-9 only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Exactly 11 data digits (12th is check digit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Auto-calculated from 11 digits.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CODE39</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A-Z, 0-9, space, - . $ / + %</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any length (practical limit: 15-20 chars for compact labels)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Optional mod-43 check digit. Self-checking format.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ITF-14</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Digits 0-9 only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Exactly 14 digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Auto-calculated (same algorithm as EAN).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The barcode preview in the generator updates in real time. If the value is invalid for the selected format, the preview will show an error or will not render — a clear signal to check the input before downloading.
        </p>

        {/* ── Section 4: PNG vs SVG ──────────────────────────────────────────── */}

        <h2 id="png-vs-svg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 3 — Choose PNG or SVG
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The output format is a critical decision for barcodes. A blurry barcode will fail to scan. Here is the simple rule:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">SVG for any printed output.</strong> Labels, stickers, product packaging, shipping boxes, ID badges, asset tags, books — anything that will be printed. SVG is a vector format. It describes the barcode as mathematical shapes, not pixels. Scale it to any physical size — from a 2cm sticker to a 50cm carton label — and the bar edges remain perfectly sharp. Label printers, print shops, and design software all handle SVG natively.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PNG for digital-only use.</strong> If the barcode will appear in an email, a web page, a digital inventory dashboard, or a PDF opened only on screens, PNG is acceptable. Download it at a size that matches your display resolution — 512px wide is appropriate for most web uses.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Never enlarge a PNG barcode.</strong> Enlarging a raster image blurs the bar edges through anti-aliasing. The scanner reads the relative widths of light and dark bands — blurry edges make those widths ambiguous and the barcode will fail. If you need a larger version, download a new SVG.
          </li>
        </ul>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Create your barcode now — no account, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Choose your format, enter your value, download SVG for print or PNG for digital. Free for commercial use.
          </p>
          <Link
            href="/tools/barcode-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Barcode Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Print on labels ────────────────────────────────────── */}

        <h2 id="print-labels" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 4 — Print on labels: sizes, DPI, and quiet zones
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you have your SVG file, there are a few physical printing requirements that determine whether the barcode scans reliably:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Minimum size.</strong> For CODE128, print at a minimum width of 30mm and height of 15mm for standard handheld scanners. For EAN-13, the GS1 nominal size is 37.29mm x 26.26mm. Smaller sizes scan less reliably, particularly at longer scanning distances.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Print resolution.</strong> Label printers typically print at 203 dpi or 300 dpi. Desktop laser printers print at 600 or 1200 dpi. All of these are sufficient for clean bar edges when printing from SVG. Inkjet printers can be used but ensure the barcode is not too small — ink spread can blur narrow bars.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Quiet zones.</strong> Every barcode requires a blank white margin — called a quiet zone — on the left and right sides. Scanners use these margins to locate the beginning and end of the barcode. If text or graphics intrude into the quiet zone, the barcode will fail to scan. The SammaPix generator includes appropriate quiet zones in the output. When placing the barcode in a label design, maintain the margins — do not stretch the barcode edge to edge.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Contrast.</strong> Barcodes must be printed in dark ink on a light background. Black bars on white is the standard. Color barcodes can work if the scanner&apos;s light source penetrates the bar color — but for any critical application (retail, logistics), use black and white.
          </li>
        </ul>

        {/* ── Section 6: Test before printing ──────────────────────────────── */}

        <h2 id="test-before-printing" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 5 — Test before printing at scale
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before printing 500 product labels or sticking a barcode on 200 boxes, print one copy and scan it with the actual scanner that will be used in your workflow. This takes ten seconds and prevents an expensive reprinting job.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use a barcode scanner app on your phone (most smartphone camera apps decode barcodes natively) or a dedicated handheld scanner. Verify that the decoded value matches exactly what you intended to encode — every digit, every character. For EAN-13, confirm the check digit is correct. For CODE128, confirm that uppercase and lowercase letters are preserved as expected.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the scan fails, check: the print size (too small?), the quiet zones (obscured?), and the value validation (correct format selected?). If you can scan the on-screen preview in the browser but not the printed label, the issue is print quality — switch to SVG output and print at a larger size.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate and scan — no signup required</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Real-time preview, SVG or PNG download, no upload to any server. Test in browser before printing. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/barcode-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Barcode Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/barcode-generator-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full guide to barcode formats <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: GS1 retail note ────────────────────────────────────── */}

        <h2 id="gs1-retail-note" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Retail use: the GS1 note you need to read
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can create the barcode image for free. The number inside it is a different matter.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For EAN-13 and UPC-A barcodes used on retail products, the number (called a GTIN — Global Trade Item Number) must be globally unique. GS1 is the international organization that manages this uniqueness by assigning company prefixes. The first 7 to 12 digits of an EAN-13 or UPC-A identify the company that registered the prefix with GS1. The remaining digits identify the specific product and packaging configuration.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">If you sell through physical retailers</strong> — supermarkets, pharmacies, specialty stores — or through platforms like Amazon that require valid GTINs: purchase a company prefix or individual GTINs directly at gs1.org. The cost varies by country and how many product numbers you need.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">If you are testing label designs</strong>, creating prototype packaging for internal review, building a label printer setup, or running an internal inventory system you control end to end: you can use any number with the SammaPix generator without GS1 registration. The barcode image will scan correctly in your own systems.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Barcode Generator generates the image. What number you encode in that image, and whether it needs to be registered with GS1, is a business decision entirely in your hands.
        </p>

        {/* ── Section 8: Use cases ──────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Real use cases: inventory, asset tags, libraries, shipping
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is how people actually use the barcode generator, with the format and value format used in each case:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Ecommerce seller labeling inventory for a fulfillment center.</strong> Uses CODE128 with internal SKU format (e.g., <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SKU-TSHIRT-BLK-M</code>). Downloads SVG, imports into Canva or Avery label template, prints on a laser printer at 300 dpi. Labels go on storage bins.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Small manufacturer creating EAN-13 labels for a batch of 50 test products.</strong> Has already purchased a GS1 company prefix. Uses EAN-13 with the assigned GTIN. Enters 12 digits, check digit auto-calculated. Downloads SVG, sends to print shop for label production on 4-color label stock.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">School library setting up a barcode checkout system.</strong> Uses CODE128 with a sequential number format (e.g., <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">LIB-00001</code> through <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">LIB-02500</code>). Generates each barcode, arranges in a Word document, prints one barcode per book on Avery label sheets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">IT manager tagging office equipment for an asset audit.</strong> Uses CODE128 with asset IDs (e.g., <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">ASSET-DELL-MON-042</code>). Downloads PNG for the internal asset management system and SVG for durable polyester asset tags.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Logistics company marking shipping cartons for a wholesale client.</strong> Uses ITF-14 with the 14-digit GTIN provided by the manufacturer. Downloads SVG, imports into label design software, prints on corrugated cardboard-compatible label media at minimum 35mm height.
          </li>
        </ul>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-generator" className="text-[#6366F1] hover:underline">Barcode Generator</Link></strong>: the tool this article is about. CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14. No signup, no upload. PNG and SVG. Free. See also{" "}
            <Link href="/blog/barcode-generator-online" className="text-[#6366F1] hover:underline">the full format guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: for URLs, Wi-Fi, email, and contact cards — use QR codes. Static, no expiry, PNG and SVG. See{" "}
            <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/barcode-reader" className="text-[#6366F1] hover:underline">Barcode Reader</Link></strong>: decode any barcode from an image or screenshot — no camera, no upload. Verify a barcode value before printing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></strong>: convert a downloaded SVG barcode to a PNG at a specific pixel size for digital systems that do not accept SVG.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/batchname" className="text-[#6366F1] hover:underline">Batch File Renamer</Link></strong>: if you are managing inventory images, use the batch renamer to align filenames with your SKU system before labeling.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your barcode and label tools, no account needed</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Barcodes, QR codes, barcode reading, SVG conversion — all in your browser, no upload, no signup.
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
            <Link href="/tools/batchname" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Batch File Renamer <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
