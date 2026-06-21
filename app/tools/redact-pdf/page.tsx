import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
} from "lucide-react";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import { APP_URL } from "@/lib/constants";
import RedactPdfHeroDemo from "@/components/tools/RedactPdfHeroDemo";
import RedactPdfClientWrapper from "./RedactPdfClientWrapper";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Redact PDF Online Free, No Upload · Permanently Remove Sensitive Text",
  description:
    "Redact PDF free in your browser. Draw black boxes over names, SSNs, account numbers, or signatures and download a permanently redacted PDF. No upload, no server, content truly removed.",
  keywords: [
    "redact pdf",
    "redact pdf free",
    "redact pdf online",
    "black out text in pdf",
    "remove sensitive info pdf",
    "redact pdf no upload",
    "hide text in pdf permanently",
    "pdf redaction tool",
    "redact ssn in pdf",
    "redact name in pdf",
    "remove text from pdf online",
    "black out pdf online free",
    "pdf redactor",
    "permanently remove text pdf",
    "redact confidential pdf",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/redact-pdf`,
  },
  openGraph: {
    title: "Redact PDF Online Free, No Upload · Permanently Remove Sensitive Text",
    description:
      "Draw black boxes over sensitive areas and download a permanently redacted PDF. Runs 100% in your browser, no upload, content truly removed.",
    url: `${APP_URL}/tools/redact-pdf`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Redact PDF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redact PDF Online Free, No Upload · Permanently Remove Sensitive Text",
    description:
      "Draw black boxes over sensitive areas and download a permanently redacted PDF. 100% in your browser, no upload.",
  },
};

// ── Feature cards ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: (
      <ShieldCheck
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "True privacy · no upload",
    description:
      "Your document never reaches any server. Everything happens inside the browser tab: pdfjs renders each page to a canvas, you draw boxes, and the black pixels are baked in before your download starts.",
  },
  {
    icon: (
      <Lock
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "Permanently removed",
    description:
      "The output is an image-based PDF. Original text, vectors, and metadata under the black boxes do not exist in the output file. There is no hidden layer to remove, no metadata to extract, and no way to recover the redacted content.",
  },
  {
    icon: (
      <FileText
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "Multi-page with per-page boxes",
    description:
      "Navigate through all pages with Prev and Next. Redaction boxes are tracked per page independently. Draw as many boxes as you need across the full document before downloading once.",
  },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Is the text really permanently removed?",
    a: "Yes. The tool rasterizes each PDF page to a canvas image, paints the black boxes directly onto that bitmap, then builds a new PDF from the resulting image frames. The original text, vector paths, and fonts do not exist in the output. There is no hidden text layer, no overlay, and no way to undo the redaction by editing the file.",
  },
  {
    q: "Is the process private? Is anything uploaded?",
    a: "Nothing is uploaded. The tool uses pdfjs-dist, a JavaScript PDF renderer that runs entirely inside your browser tab. Your document bytes never leave your device. You can disconnect from the internet after the page loads and the tool continues to work.",
  },
  {
    q: "Can someone recover the redacted content?",
    a: "No. Because the output is image-based rather than text-based, there is nothing to recover. Tools that add a black rectangle on top of a PDF but leave the text layer intact can be defeated by removing the overlay or copying the text. SammaPix avoids this entirely by converting each page to a JPEG before building the output PDF.",
  },
  {
    q: "Does it work for scanned PDFs?",
    a: "Yes. Scanned PDFs are already image-based, so they render just like any other page. Draw your redaction boxes, and the export will bake them into the existing scanned image. The result is identical in quality to the original scan, minus the redacted areas.",
  },
  {
    q: "Is this tool free? Are there limits?",
    a: "The free plan lets you redact up to 15 pages per document. SammaPix Pro raises the limit to 300 pages and is available from the dashboard. For most personal, legal, or HR use cases, 15 pages is sufficient for contracts, invoices, and ID documents.",
  },
  {
    q: "Why is the output an image PDF rather than a text PDF?",
    a: "This is intentional and is the only safe way to guarantee redaction in a browser. Keeping the original text layer and just placing a black rectangle on top is reversible. Rasterizing the page to a JPEG and embedding that into the output PDF destroys the text permanently. The trade-off is that the output is not searchable and may be slightly larger in file size, but the privacy guarantee is absolute.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RedactPdfPage() {
  return (
    <main>
      <MetaViewContent contentName="Redact PDF" contentId="redact-pdf" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* LEFT: title + copy + trust badges */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#33415515", border: "1px solid #33415530" }}
                aria-hidden="true"
              >
                <Lock
                  className="h-4 w-4"
                  style={{ color: "#334155" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Redact PDF Online · Remove Sensitive Text Permanently
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Draw black boxes over{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">
                names, SSNs, account numbers, addresses, or signatures
              </strong>{" "}
              and download a permanently redacted PDF. Runs 100% in your browser
              using{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">pdfjs</strong> and{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">pdf-lib</strong>: no upload,
              no server, no recoverable text layer.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Content truly removed, not overlaid
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Multi-page support
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Draw, undo, clear per page
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private · no upload
              </span>
            </div>
          </div>

          {/* RIGHT: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <RedactPdfHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool (client subtree, ssr:false) */}
      <RedactPdfClientWrapper />

      {/* How to use */}
      <HowToUse
        toolName="Redact PDF"
        steps={[
          {
            title: "Upload your PDF",
            desc: "Drag and drop your PDF onto the tool or click to browse. The file is loaded directly in your browser, no upload required.",
          },
          {
            title: "Draw black boxes over sensitive areas",
            desc: "Click and drag on any page to draw a black redaction box. Navigate between pages with Prev and Next. Use Undo to remove the last box, or Clear page to start a page over.",
          },
          {
            title: "Download the permanently redacted PDF",
            desc: "Click Redact and Download. Each page is flattened to an image with the black boxes baked into the bitmap, then assembled into a new PDF. The original text under the boxes is permanently gone.",
          },
        ]}
        proTip={{
          text: "Need to extract specific pages from a PDF before redacting? Split or rearrange your PDF first.",
          linkLabel: "Merge PDFs",
          linkHref: "/tools/pdf-merge",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to redact PDFs?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is PDF redaction and why does it matter?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PDF redaction is the process of permanently removing sensitive information
            from a document before sharing it. Common use cases include removing names,
            Social Security numbers, bank account numbers, medical record numbers, home
            addresses, email addresses, phone numbers, and handwritten signatures from
            contracts, invoices, legal filings, medical records, and government forms.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The critical word is "permanently." Many PDF editors let you draw a black
            rectangle on top of text, but this is a visual overlay: the text is still
            selectable underneath. Anyone who receives the file can remove the rectangle
            or copy-paste the hidden text. True redaction requires destroying the underlying
            content, not covering it.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 mt-6">
            How SammaPix ensures true, permanent redaction
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix renders each PDF page to a pixel-by-pixel canvas image using
            pdfjs-dist, a JavaScript rendering engine. It then paints your black boxes
            directly onto that bitmap, permanently overwriting the pixels beneath them.
            Finally, it uses pdf-lib to build a new PDF where each page is a flat JPEG
            image. The output contains no text layer, no fonts, no vector paths, and no
            metadata about the original content. The redacted areas are gone at the
            pixel level.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            This approach is the same technique used by professional document security
            tools. The trade-off is that the output PDF is image-based rather than
            text-based: you cannot search or copy text in the resulting file, and the
            file size may be slightly larger. For sharing sensitive documents, this
            trade-off is completely worthwhile.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Common scenarios where PDF redaction is required
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#334155] mt-0.5"> - </span>
              Sharing a contract with a third party while hiding compensation figures
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#334155] mt-0.5"> - </span>
              Submitting a court document with personal identifiers removed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#334155] mt-0.5"> - </span>
              Sharing a bank statement to prove income while hiding the account number
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#334155] mt-0.5"> - </span>
              Removing patient names or dates from a medical form before research use
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#334155] mt-0.5"> - </span>
              Publishing an invoice publicly while hiding client contact information
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Browser-based redaction vs. desktop software
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Adobe Acrobat Pro includes a redaction tool that costs $19.99 per month.
            Foxit PDF Editor and Nitro PDF also offer redaction as paid features.
            SammaPix provides the same permanent-redaction result for free, entirely
            in your browser. There is nothing to install, no account required, and your
            document never touches a server. For individuals, freelancers, small law firms,
            HR teams, and anyone handling sensitive documents occasionally, SammaPix is
            the fastest and most private option available.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools toolId="redact-pdf" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Redact PDF",
                url: `${APP_URL}/tools/redact-pdf`,
                description:
                  "Free online PDF redaction tool. Draw black boxes over sensitive areas and download a permanently redacted PDF. Runs 100% in your browser, no upload required.",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web Browser",
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
                  url: `${APP_URL}`,
                },
                featureList: [
                  "Draw black redaction boxes by click and drag",
                  "Multi-page PDF support with per-page box tracking",
                  "True permanent redaction via page rasterization",
                  "100% browser-based, no upload",
                  "Undo and clear per page",
                  "Free up to 15 pages, Pro up to 300 pages",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: a,
                  },
                })),
              },
              {
                "@type": "HowTo",
                name: "How to redact a PDF online for free",
                description:
                  "Permanently redact sensitive text, names, SSNs, and account numbers from a PDF using SammaPix. Runs entirely in your browser, no upload required.",
                totalTime: "PT3M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix Redact PDF",
                  url: `${APP_URL}/tools/redact-pdf`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Upload your PDF",
                    text: "Drag and drop your PDF onto the tool or click to browse. The file stays in your browser.",
                    url: `${APP_URL}/tools/redact-pdf`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Draw redaction boxes",
                    text: "Click and drag on any page to draw a black box over sensitive content. Navigate pages with Prev and Next. Undo or clear boxes at any time.",
                    url: `${APP_URL}/tools/redact-pdf`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download the redacted PDF",
                    text: "Click Redact and Download. Each page is rasterized with the black boxes baked in, and a new image-based PDF is generated and saved to your device.",
                    url: `${APP_URL}/tools/redact-pdf`,
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${APP_URL}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Tools",
                    item: `${APP_URL}/tools`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Redact PDF",
                    item: `${APP_URL}/tools/redact-pdf`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
