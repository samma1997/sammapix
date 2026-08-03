import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Unlock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfUnlockClient from "@/components/tools/PdfUnlockClient";
import PdfUnlockHeroDemo from "@/components/tools/PdfUnlockHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-unlock`;

export const metadata: Metadata = {
  title: "Unlock PDF Online Free: Remove Restrictions, No Upload",
  description:
    "Remove PDF restrictions (printing, copying, editing) in your browser. No upload, no server, 100% private. Works on PDFs that open freely but have usage restrictions locked.",
  keywords: [
    "unlock pdf",
    "remove pdf password",
    "unlock pdf online",
    "remove pdf restrictions",
    "pdf permissions remover",
    "enable printing pdf",
    "remove pdf editing restriction",
    "unlock pdf no upload",
    "pdf restriction remover online free",
    "remove owner password pdf",
    "pdf unlocker free",
    "unlock pdf in browser",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Unlock PDF Online Free: Remove Restrictions, No Upload",
    description:
      "Remove PDF usage restrictions (printing, copying, editing) entirely in your browser. 100% private — your file never leaves your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Unlock Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock PDF Online Free — Remove Restrictions, No Upload",
    description: "Remove PDF printing, copying and editing restrictions locally. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Unlock className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Removes usage restrictions",
    description:
      "Owner-password restrictions prevent printing, copying and editing even when you can open the file. This tool strips those flags in your browser using pdf-lib, restoring full access.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs locally via pdf-lib. Your PDF never leaves your device, is never stored on a server, and requires no account or login to use.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Honest about limitations",
    description:
      "We clearly state what this tool can and cannot do. It removes owner-password restrictions. It cannot decrypt PDFs that require a password just to open — that requires the original password.",
  },
];

export default function PdfUnlockPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Unlock" contentId="pdf-unlock" />

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
                <Unlock className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Unlock PDF. Remove Restrictions Free
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Remove printing, copying and editing restrictions from a PDF that opens freely.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs locally in your browser using pdf-lib. The unlocked file downloads
              directly to your device.
            </p>

            <div className="mb-3 px-3 py-2.5 rounded-md border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E]">
              <p className="text-xs text-[#92400E] dark:text-[#FCD34D] leading-relaxed">
                <strong>Honest note:</strong> this removes <em>owner-password</em> restrictions (printing,
                copying, editing). If your PDF asks for a password to open, this tool{" "}
                <strong>cannot</strong> help — that requires the original password, which we do not crack.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Enable printing
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Enable copying text
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Up to 100 MB
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <PdfUnlockHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfUnlockClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Unlock"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool reads the file instantly in your browser — no upload to any server.",
          },
          {
            title: "Review the honest note",
            desc: "The tool clearly explains what it can remove (usage restrictions like printing, copying, editing) and what it cannot (a password required to open the file).",
          },
          {
            title: "Download the unlocked PDF",
            desc: "Click Remove Restrictions. The unlocked file downloads instantly as a PDF with all usage permissions re-enabled.",
          },
        ]}
        proTip={{
          text: "Want to reduce the file size of your unlocked PDF too? Try PDF Compress after.",
          linkLabel: "See PDF Compress",
          linkHref: "/tools/pdf-compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why unlock PDFs in your browser?
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
            What does &ldquo;unlock PDF&rdquo; actually mean?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            PDF security has two distinct layers. The first is a <em>user password</em> (also called open
            password): if set, the PDF cannot be opened at all without entering it. The second is an{" "}
            <em>owner password</em> (also called permissions password): the PDF opens freely, but the
            author has locked certain actions — printing, copying text, editing, filling forms, or
            annotating. This tool targets the second case only: it removes those permission flags so you
            can print and copy as normal.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why not use a server-based PDF unlocker?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Most online PDF unlocking tools upload your file to a remote server. For contracts, legal
            documents, medical records or financial reports, that is a serious privacy concern.
            SammaPix runs{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>{" "}
            entirely inside your browser tab using{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">PDFDocument.load(..., {`{`} ignoreEncryption: true {`}`})</code>.
            Nothing ever leaves your machine.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Can this tool crack a PDF open password?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No, and we are upfront about this. If a PDF requires a password to open, the encryption
            is applied to the content itself and cannot be bypassed without the correct key. We detect
            this case and show a clear error message rather than pretending to unlock the file. Only
            PDFs that open freely but have their permissions locked can be unlocked here. Please only
            unlock documents you are authorized to access.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-unlock" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Unlock a PDF and Remove Restrictions",
            description:
              "Remove PDF usage restrictions (printing, copying, editing) directly in your browser with SammaPix. No upload required, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Unlock",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. The tool reads the file instantly in your browser, no server upload.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Confirm the file opens freely",
                text: "The tool works on PDFs that open without a password but have printing, copying or editing locked by an owner password.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the unlocked PDF",
                text: "Click Remove Restrictions and download your unlocked PDF. Printing, copying and editing are fully re-enabled.",
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
                name: "SammaPix PDF Unlock",
                description:
                  "Remove PDF usage restrictions (printing, copying, editing) in your browser. No upload, no server, 100% private. Works on PDFs that open freely but have owner-password restrictions.",
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
                  "Removes owner-password usage restrictions",
                  "Enables printing, copying and editing",
                  "Client-side, no upload, no server",
                  "Supports PDFs up to 100 MB",
                  "Honest error for open-password PDFs",
                  "Instant download, no signup required",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF unlocker free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can remove restrictions from any PDF up to 100 MB.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix processes PDFs entirely in your browser using the pdf-lib library. Your document never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can this tool unlock a PDF that asks for a password to open?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. If a PDF requires a password just to open (user password), the content is encrypted and cannot be bypassed without the correct key. This tool can only remove usage restrictions (owner password) from PDFs that already open freely. We clearly detect and explain this case.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What restrictions does this tool remove?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "It removes owner-password usage restrictions: printing, text copying, form filling, editing and annotation locks. After unlocking, you can print the PDF, select and copy text, and open it in any PDF editor.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between an owner password and a user password?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A user password (open password) prevents the PDF from opening at all. An owner password (permissions password) lets the PDF open freely but locks specific actions like printing or copying. This tool targets owner passwords only.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the file size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per PDF on both free and Pro plans. Processing happens inside your browser tab, so keep the tab active.",
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
                    name: "Unlock PDF",
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
