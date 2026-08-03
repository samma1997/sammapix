import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, AlignLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import TxtToPdfClient from "@/components/tools/TxtToPdfClient";
import TxtToPdfHeroDemo from "@/components/tools/TxtToPdfHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/txt-to-pdf`;

export const metadata: Metadata = {
  title: "TXT to PDF Online Free: No Upload",
  description:
    "Convert any .txt file or pasted text to PDF in your browser. Choose A4 or Letter, Courier or Helvetica, font size and margins. No upload, 100% private.",
  keywords: [
    "txt to pdf",
    "convert text to pdf",
    "text file to pdf",
    "txt to pdf converter",
    "notepad to pdf",
    "txt to pdf no upload",
    "txt to pdf online free",
    "convert txt to pdf browser",
    "plain text to pdf",
    "text document to pdf",
    "txt to pdf free online",
    "convert notepad file to pdf",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "TXT to PDF Online Free: No Upload",
    description:
      "Convert any .txt file or pasted text to a PDF in your browser. Choose page size, font and margins. 100% private — your file never leaves your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix TXT to PDF Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to PDF Online Free — No Upload",
    description:
      "Convert text files to PDF locally. Choose page size, font and margins. No upload, no signup.",
  },
};

const features = [
  {
    icon: <AlignLeft className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Word-wrap and pagination",
    description:
      "Long lines are automatically wrapped to fit the page width. Text is paginated across as many pages as needed — no content is clipped or lost.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs locally via pdf-lib in your browser tab. Your text file is never sent to any server, never stored, and requires no account or signup.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Flexible options",
    description:
      "Choose A4 or US Letter page size, Courier (monospace, great for code) or Helvetica (clean sans-serif), font size from 7 to 24 pt and custom margins.",
  },
];

export default function TxtToPdfPage() {
  return (
    <main>
      <MetaViewContent contentName="TXT to PDF" contentId="txt-to-pdf" />

      {/* Hero, split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#EF444415", border: "1px solid #EF444430" }}
                aria-hidden="true"
              >
                <AlignLeft className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                TXT to PDF Converter. Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Convert any plain text file (.txt) or pasted text to a PDF directly in your browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs locally using pdf-lib. Choose page size, font,
              font size and margins, then download immediately.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                A4 &amp; Letter
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Word-wrap
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Courier or Helvetica
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>

            {/* Internal links */}
            <p className="mt-4 text-xs text-[#737373] dark:text-[#A3A3A3]">
              Also useful:{" "}
              <Link href="/tools/jpg-to-pdf" className="text-[#EF4444] hover:underline">
                JPG to PDF
              </Link>
              {" "}&middot;{" "}
              <Link href="/tools/pdf-page-numbers" className="text-[#EF4444] hover:underline">
                Add Page Numbers to PDF
              </Link>
              {" "}&middot;{" "}
              <Link href="/tools/pdf-compress" className="text-[#EF4444] hover:underline">
                Compress PDF
              </Link>
            </p>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <TxtToPdfHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <TxtToPdfClient />

      {/* How to use */}
      <HowToUse
        toolName="TXT to PDF"
        steps={[
          {
            title: "Load your text",
            desc: "Drop a .txt file onto the upload area, click to browse, or switch to Paste mode and paste your text directly.",
          },
          {
            title: "Choose options",
            desc: "Select A4 or Letter page size, Courier (monospace) or Helvetica font, and adjust font size and margins to taste.",
          },
          {
            title: "Download the PDF",
            desc: "Click Convert to PDF. The text is word-wrapped, paginated and saved as a standard PDF that downloads immediately.",
          },
        ]}
        proTip={{
          text: "Need to add page numbers to the resulting PDF? Use PDF Page Numbers after converting.",
          linkLabel: "PDF Page Numbers",
          linkHref: "/tools/pdf-page-numbers",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert TXT to PDF in your browser?
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
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How TXT to PDF conversion works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A plain text file (.txt) contains only characters — no page breaks, no fonts,
            no layout information. Converting it to PDF means deciding how to lay out
            that text on virtual pages: which font to use, how wide each line can be before
            wrapping, and how many lines fit on a page before starting a new one.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            This tool uses{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            entirely in your browser. It reads the file via{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">FileReader.readAsText</code>,
            embeds a standard font (Courier or Helvetica), and then iterates over every
            logical line. Long lines are split into visual lines by measuring the text width
            with{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">font.widthOfTextAtSize()</code>{" "}
            — the same approach used by professional typesetting tools. When a page fills
            up, a new page is added automatically.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which font should I choose?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Courier</strong> is a monospace
            font — every character has the same width. It is the best choice for code, log
            files, configuration files and anything where column alignment matters.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Helvetica</strong> is a
            proportional sans-serif font that looks more like a standard document and
            fits slightly more text per line.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Is there a file size limit?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Up to 10 MB per .txt file, which covers millions of lines of text. All
            processing runs in your browser tab — keep the tab active while conversion
            is in progress. No text or file is ever sent to a server.
          </p>
        </div>
      </section>

      <RelatedTools toolId="txt-to-pdf" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert TXT to PDF Online Free",
            description:
              "Convert any plain text file (.txt) or pasted text to a PDF directly in your browser with SammaPix. No upload required, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix TXT to PDF",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Load your text",
                text: "Drop a .txt file onto the upload area or switch to Paste mode and paste your text directly. The file is read instantly in your browser — no server upload.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose options",
                text: "Select A4 or Letter page size, Courier or Helvetica font, and adjust font size and page margins.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the PDF",
                text: "Click Convert to PDF. The text is word-wrapped, paginated and the PDF downloads immediately.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["SoftwareApplication", "BusinessApplication"],
                name: "SammaPix TXT to PDF Converter",
                description:
                  "Convert any plain text (.txt) file or pasted text to a PDF in your browser. Supports A4 and Letter page sizes, Courier and Helvetica fonts, custom font size and margins. No upload, no server, 100% private.",
                url: TOOL_URL,
                applicationCategory: "BusinessApplication",
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
                  url: APP_URL,
                },
                featureList: [
                  "Upload .txt file or paste text directly",
                  "A4 and US Letter page sizes",
                  "Courier (monospace) and Helvetica (sans-serif) fonts",
                  "Automatic word-wrap and pagination",
                  "Custom font size (7-24 pt) and page margins",
                  "Client-side only — no upload, no server, no signup required",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this TXT to PDF converter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark and no upload. You can convert any .txt file up to 10 MB or paste any amount of text.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix converts TXT to PDF entirely in your browser using the pdf-lib library. Your text file or pasted content never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What fonts are supported?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Two standard PDF fonts are available: Courier (a monospace font, ideal for code and log files) and Helvetica (a proportional sans-serif font, ideal for readable documents). Both are embedded in the PDF with no external dependencies.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does it handle long lines and large files?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Lines longer than the page width are automatically word-wrapped. Text is paginated across as many pages as needed. The tool supports .txt files up to 10 MB, which covers millions of lines.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I convert a Notepad file to PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Any file saved from Notepad (Windows), TextEdit (Mac) or any text editor that exports plain .txt format is compatible. Just drop the file onto the upload area.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What page sizes are available?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A4 (210 x 297 mm, the international standard) and US Letter (8.5 x 11 in, the North American standard). Both produce standard PDF files compatible with all PDF readers and printers.",
                    },
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
                    item: APP_URL,
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
                    name: "TXT to PDF",
                    item: TOOL_URL,
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
