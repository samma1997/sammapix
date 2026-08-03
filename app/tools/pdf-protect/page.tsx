import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfProtectClient from "@/components/tools/PdfProtectClient";
import PdfProtectHeroDemo from "@/components/tools/PdfProtectHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-protect`;

export const metadata: Metadata = {
  title: "Password Protect a PDF Free: No Upload",
  description:
    "Add a password to any PDF in your browser. Encryption happens locally — your file is never uploaded. Free, no signup. If you forget the password, the file cannot be recovered.",
  keywords: [
    "password protect pdf",
    "add password to pdf",
    "encrypt pdf online",
    "protect pdf with password",
    "lock pdf",
    "pdf password free",
    "password protect pdf no upload",
    "encrypt pdf in browser",
    "secure pdf online",
    "pdf encryption free",
    "add open password pdf",
    "lock pdf file online",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Password Protect a PDF Free: No Upload",
    description:
      "Add a password to any PDF entirely in your browser. Encryption is 100% local — your document is never sent to any server.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Protect Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Protect a PDF Free — No Upload, No Signup",
    description: "Encrypt any PDF with a password locally in your browser. Free, instant, private.",
  },
};

const features = [
  {
    icon: <Lock className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Open-password encryption",
    description:
      "Sets an open password (user password) on the PDF so that anyone who tries to open the file must enter the correct password. The encryption is applied using @cantoo/pdf-lib entirely inside your browser tab.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Your PDF never leaves your device. Encryption runs locally in JavaScript. We never see your file, your password, or any of its contents. No account is needed.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Honest about limitations",
    description:
      "We are upfront that forgetting the password means permanent loss of access. There is no reset, no backdoor, no way to recover the file. We only show this warning — we do not hide it in fine print.",
  },
];

export default function PdfProtectPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Protect" contentId="pdf-protect" />

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
                <Lock className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Password Protect a PDF. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Add an open-password to any PDF so it cannot be viewed without the correct key.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Encryption happens locally</strong>
              {" "}in your browser using{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">@cantoo/pdf-lib</code>
              {" "}— your file and password are never sent to any server.
            </p>

            <div className="mb-3 px-3 py-2.5 rounded-md border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B]">
              <p className="text-xs text-[#B91C1C] dark:text-[#FCA5A5] leading-relaxed">
                <strong>Important:</strong> if you forget the password, the file cannot be recovered.
                There is no reset and no way for us to help — encryption is 100% local.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Requires password to open
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Encrypted in your browser
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
            <PdfProtectHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfProtectClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Protect"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool reads the file instantly in your browser — no upload to any server.",
          },
          {
            title: "Set and confirm a password",
            desc: "Enter a strong password and confirm it. Both fields must match before you can proceed. The password will be required to open the protected file.",
          },
          {
            title: "Download the protected PDF",
            desc: "Click Protect PDF. Encryption runs locally and the password-protected file downloads to your device as a standard PDF.",
          },
        ]}
        proTip={{
          text: "Need to compress the file before protecting it? Try PDF Compress first, then protect.",
          linkLabel: "See PDF Compress",
          linkHref: "/tools/pdf-compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why protect PDFs in your browser?
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
            What does &ldquo;password protect a PDF&rdquo; actually do?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            When you add a password to a PDF, the file&apos;s content is encrypted so that any PDF
            viewer — Acrobat, Preview, Chrome, Edge — will ask for the password before showing
            the document. This is called a <em>user password</em> or <em>open password</em>. Without
            the correct key, the encrypted content is unreadable. This tool sets that open password
            using{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">@cantoo/pdf-lib</code>
            , a pure-JavaScript fork of pdf-lib that adds encryption support without requiring
            WebAssembly or any network call.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Is it safe to password-protect a PDF online?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            It depends on whether your file is actually uploaded. Most online PDF tools upload your
            document to a server, encrypt it there, and then serve it back. That means the service
            operator sees your file — and your password — even if they claim not to store it.
            SammaPix runs the entire encryption process inside your browser tab. The file and the
            password stay on your machine. Nothing is transmitted.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What happens if I forget the password?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The file cannot be opened or recovered. PDF encryption is designed to be irreversible
            without the correct key. There is no &ldquo;forgot password&rdquo; feature, no backdoor,
            and no way for us to help — because we never had the password in the first place. This
            is the honest trade-off of client-side encryption, and we state it clearly before you
            protect the file.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How strong is the encryption?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            The{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">@cantoo/pdf-lib</code>{" "}
            library applies the standard PDF encryption scheme (AES-based, compatible with the PDF
            specification). The result is a standard encrypted PDF that any compliant reader will
            recognize. The strength of the protection depends on the strength of your chosen password
            — a short, simple password is much easier to brute-force than a long, random one.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-protect" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Password Protect a PDF for Free",
            description:
              "Add a password to any PDF directly in your browser with SammaPix. Encryption runs locally — no upload, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Protect",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. The file is read instantly in your browser — no server upload.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Enter and confirm your password",
                text: "Type a strong password and confirm it in the second field. Both must match. The password will be required to open the protected file.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the protected PDF",
                text: "Click Protect PDF. Encryption runs locally and the password-protected file downloads directly to your device.",
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
                name: "SammaPix PDF Protect",
                description:
                  "Add a password to any PDF in your browser. Encryption runs locally — your file and password are never uploaded to any server. Free, no signup.",
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
                  "Adds open-password (user password) encryption",
                  "Encryption runs 100% in the browser — no upload",
                  "Supports PDFs up to 100 MB",
                  "Compatible with all PDF viewers (Acrobat, Preview, Chrome)",
                  "Password confirmation to prevent typos",
                  "No signup, no watermark, completely free",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF password tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can protect any PDF up to 100 MB at no cost.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my files uploaded to a server when I add a password?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix encrypts PDFs entirely inside your browser using the @cantoo/pdf-lib library. Your document and your chosen password never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens if I forget the PDF password?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The file cannot be recovered. PDF encryption is designed to be irreversible without the correct key. There is no reset, no backdoor, and no way to recover access. This is stated clearly before you protect the file. Store your password somewhere safe.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which PDF viewers support the protected file?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Any standard PDF viewer will recognize the password protection: Adobe Acrobat, macOS Preview, Chrome built-in viewer, Edge, Firefox, iOS Files, and Android PDF apps. The protected file is a standard encrypted PDF.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between a user password and an owner password in a PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A user password (open password) prevents the PDF from opening without it. An owner password (permissions password) lets the file open freely but locks actions like printing or copying. This tool sets a user password — anyone trying to open the file must enter the password.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How strong is the PDF encryption?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The tool uses the standard PDF AES encryption scheme via @cantoo/pdf-lib. The result is a properly encrypted PDF compatible with the PDF specification. The practical security depends on your password strength — use a long, random password for best protection.",
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
                    name: "Password Protect PDF",
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
