import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add a Signature to a PDF Without Uploading It [2026]",
  description:
    "Insert a visual signature on a PDF entirely in your browser — draw by hand on a canvas or upload a signature image, positioned precisely on any page via pdf-lib. No upload, no server, no signup. Honest about visual vs certified digital signatures. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-signature-to-pdf-no-upload`,
  },
  keywords: [
    "add signature to pdf",
    "draw signature on pdf",
    "insert signature in pdf",
    "add signature to pdf no upload",
    "add signature to pdf without uploading",
    "add signature pdf free",
    "sign pdf without uploading",
    "pdf signature no upload",
    "insert signature pdf online",
    "add handwritten signature to pdf",
    "add image signature to pdf",
    "pdf signature browser",
    "sign confidential pdf privately",
    "add esignature to pdf free",
    "sign pdf document without account",
  ],
  openGraph: {
    title: "How to Add a Signature to a PDF Without Uploading It [2026]",
    description:
      "Draw your signature on a canvas or upload a PNG, then position it precisely on any PDF page in the browser via pdf-lib. No upload, no server. Honest: visual signature, not a certified digital signature. Free.",
    url: `${APP_URL}/blog/add-signature-to-pdf-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add a Signature to a PDF Without Uploading It [2026]",
    description:
      "Add a signature to a PDF entirely in your browser via pdf-lib. Draw or upload. No upload, no server. Honest: this is a visual signature, not certified. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-signature-to-pdf-no-upload`;
const POST_TITLE = "How to Add a Signature to a PDF Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "When you add a signature to a PDF using most online tools, your contract or form is uploaded to a third-party server before you can sign it — creating a privacy risk for sensitive documents. SammaPix PDF Sign uses pdf-lib to embed your signature entirely in the browser: draw your signature on a canvas with your mouse or touchscreen, or upload a PNG signature image, then drag it precisely onto the correct page. No upload, no server, no signup. This guide covers the full workflow, how to prepare a clean signature image, the honest difference between visual and certified digital signatures, and when each is appropriate.",
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
    "add signature to pdf",
    "draw signature on pdf",
    "insert signature in pdf",
    "add signature to pdf no upload",
    "sign pdf without uploading",
    "visual signature pdf",
    "pdf signature browser",
    "add image signature to pdf",
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
  name: "How to Add a Signature to a PDF Without Uploading It",
  description:
    "Draw your signature on a canvas or upload a PNG signature image, then position it on any page of your PDF — entirely in your browser via pdf-lib. No upload, no server, no signup. Free.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Sign (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open SammaPix PDF Sign",
      text: "Go to sammapix.com/tools/pdf-sign in any modern browser (Chrome, Firefox, Safari, Edge). No account required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Load your PDF",
      text: "Drag your PDF onto the dropzone or click to browse for it. The file is read by your browser using the FileReader API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Create your signature",
      text: "Choose Draw to sign by hand on the canvas using your mouse, trackpad, or touchscreen finger or stylus. Or choose Upload to load a PNG of your actual handwritten signature with a transparent background.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose the page and position",
      text: "Select the page where the signature should go. A page preview is shown. Click or drag the signature to place it over the signature line on the document. Use the resize handles to adjust the size.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Apply and download the signed PDF",
      text: "Click Apply Signature. pdf-lib embeds the signature as a PDF XObject on the selected page at the coordinates you specified. The signed PDF is downloaded directly from browser memory via a blob URL. Zero network requests carry your file to any server.",
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
      name: "Why should I add a signature to a PDF without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The documents most likely to need signing are among the most sensitive: employment contracts, NDAs, rental agreements, supplier contracts, and personal forms. When you upload these to DocuSign, HelloSign, iLovePDF, or similar online signing platforms to add a signature, the unsigned version of your document travels to and is stored on a server controlled by a third party. Their privacy policy says the file is deleted after processing, but you cannot independently verify this. For contracts containing personal data, financial terms, or confidential business information, this is an unnecessary risk. SammaPix PDF Sign runs the entire process in your browser via pdf-lib. Your unsigned document and your signature never leave your device. You can verify this by watching the browser DevTools Network tab while the tool runs — zero outgoing requests carry your file.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between drawing a signature and uploading a signature image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drawing: you sign your name directly on the browser canvas using your mouse, trackpad, finger, or stylus. The stroke paths are captured in real time and exported as a transparent PNG. This is fast and requires no preparation, but the quality of the result depends on your input device — a stylus or touchscreen produces the most natural result, while a mouse often looks less fluid. Uploading: you provide a PNG image of your signature that you prepared in advance — typically by signing on paper, photographing or scanning it, and removing the white background to create a transparent PNG. This method produces a higher-quality, more consistent result and lets you reuse the same signature image across multiple signings without re-drawing it each time. For professional signing where the signature needs to look clean and consistent, the upload method is recommended. For quick routine signing, drawing directly on the canvas is the faster choice.",
      },
    },
    {
      "@type": "Question",
      name: "Is a visual signature on a PDF legally valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most jurisdictions, yes, for a wide range of everyday contracts and agreements. In the United States, the ESIGN Act (2000) and UETA broadly establish that electronic signatures — including visual signature images placed on PDFs — are legally valid for most commercial contracts, provided there is mutual agreement to sign electronically and evidence of intent. In the European Union, eIDAS classifies visual signatures as Simple Electronic Signatures (SES), which are legally recognized for routine commercial transactions. In practice, visual PDF signatures are used daily for freelance contracts, NDAs, employment agreements, vendor forms, and personal documents across the world. The key question is not the format of the signature but whether both parties agreed to electronic signing and whether there is a traceable record (such as an email chain) showing the signed document was exchanged. For documents specifically requiring a notarized wet-ink signature, a government-registered certificate, or a Qualified Electronic Signature under eIDAS, a visual signature is not sufficient — use an appropriate certified signing service.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a signature to a PDF that has a signature field?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many PDFs contain pre-placed form signature fields — interactive PDF form elements that show a blank signature box at the right location. SammaPix PDF Sign positions your signature image at the exact coordinates you choose on the page, including directly over a signature field box. The tool places the signature as a graphic layer — it does not interact with PDF form fields at the AcroForm level. If the PDF has an active signature field widget, the field box will appear on the page as usual, and you position your signature image over it precisely. The practical result on screen and in print is identical: your signature appears on the correct line. For PDFs that use certified digital signature fields (the kind Adobe Reader marks with a blue ribbon when valid), placing a visual signature image over the field does not cryptographically fill the field — but for everyday visual signing, this distinction does not affect the practical result.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my signature image after I close the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The signature you draw or upload exists only in browser memory during the session. When you close the browser tab or window, the signature data is cleared from memory. It is never saved to a server, never written to your browser's local storage or cookies, and is not accessible to anyone other than you during the session. If you want to reuse the same signature in future sessions without re-drawing it, the recommended approach is to save a transparent PNG of your signature to your local device. In the next session, use the Upload option to load it from your local files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I sign a confidential contract privately without creating a DocuSign account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix PDF Sign requires no account. You open the tool, load your PDF, create or upload your signature, position it, and download the signed file — no email, no registration, no payment. The tool is designed specifically for situations where you want to sign a document without the overhead of creating an account on a third-party platform and without uploading your document to their servers. The signed PDF is a standard PDF file that opens in any PDF viewer. You can send it by email or share it however you normally share documents. The only practical difference from using DocuSign on the free tier is the absence of a server-side audit trail — if you need that for dispute resolution, use a platform that provides it. For most routine agreements, the email exchange is your audit trail.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a transparent PNG of my handwritten signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cleanest method: sign your name on white paper with a dark-colored pen (black or dark blue ink works best). Photograph the paper in good lighting with no shadows crossing the signature, or use a document scanner app for a cleaner result. Open the photograph in SammaPix Remove Background — the AI background removal tool strips the white paper, leaving only the signature strokes on a transparent background. Download the result as a PNG. This PNG is your reusable signature image. For best results on a PDF page, the source PNG should be at least 600 pixels wide so the signature stays sharp at typical display sizes. You can also use design tools like Figma, Illustrator, or Photoshop if you have them available — apply a threshold or levels adjustment to make the ink strokes pure black, then export with transparency.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddSignatureToPdfNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-signature-to-pdf-no-upload"
        description="Adding your signature to a contract, NDA, or official form should not require uploading the document to a server you do not control. SammaPix PDF Sign uses pdf-lib to embed your signature entirely in the browser: draw by hand on a canvas with your mouse or touchscreen, or upload a PNG of your actual handwritten signature, then position it precisely anywhere on any page. No upload, no server, no signup. Honest about the distinction between a visual signature and a certified digital signature — and when each one is the right choice."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={11}
        headings={[
          { id: "why-no-upload-matters", title: "Why signing a PDF without uploading matters" },
          { id: "visual-vs-certified", title: "Visual signature vs certified digital signature: when each is right" },
          { id: "draw-method", title: "Method 1: draw your signature by hand on the canvas" },
          { id: "upload-method", title: "Method 2: upload a PNG of your handwritten signature" },
          { id: "prepare-signature-png", title: "How to create a clean transparent PNG signature" },
          { id: "positioning-tips", title: "How to position a signature precisely on a PDF page" },
          { id: "step-by-step", title: "Step-by-step: add a signature to a PDF without uploading" },
          { id: "private-documents", title: "Signing confidential documents: the privacy case" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "comparison-table", title: "Visual signature tools: honest comparison" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online PDF signing tools upload your unsigned document to their server before you can add your signature. For contracts, NDAs, and forms, this is a real privacy risk.",
          "SammaPix PDF Sign uses pdf-lib to embed your signature entirely in the browser. Draw by hand on a canvas or upload a transparent PNG signature image. File never leaves your device.",
          "Honest disclosure: this tool creates a visual signature — a signature image embedded as a graphic. It is not a certified digital signature with a cryptographic certificate.",
          "A visual signature is legally sufficient for most everyday contracts in the US (ESIGN Act, UETA) and EU (eIDAS Simple Electronic Signature). For notarized documents, government filings, and contracts requiring a qualified e-signature, use a certified service.",
          "PNG with a transparent background is the recommended format for uploaded signature images. Use SammaPix Remove Background to strip the white paper background from a scanned or photographed signature.",
          "The entire process — file load, signature creation, positioning, and download — produces zero outgoing network requests carrying your document. Verifiable via DevTools Network tab.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4427611/pexels-photo-4427611.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person placing a signature on a document at a desk, representing adding a signature to a PDF privately in the browser without uploading it."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding your signature to a contract should not require handing the unsigned document to a third-party server.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a signature to your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Draw your signature on a canvas or upload a PNG. Positioned on your PDF via pdf-lib in the browser.
              File never leaves your device. Honest about visual vs certified signatures. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-sign"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Sign, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-protect"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Password Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-watermark"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Watermark PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why no upload matters ──────────────────────────── */}

        <h2 id="why-no-upload-matters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why signing a PDF without uploading matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Think about the last PDF you needed to sign. Probably a contract with a client, a rental agreement, an employment offer, or a supplier form. Documents like these contain information you would not share publicly: your personal address, your bank details, your agreed-upon rates, your company&apos;s commercial terms.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Now consider what happens when you upload that document to DocuSign&apos;s free tier, HelloSign, or iLovePDF to add your signature. The unsigned version of that document — containing all the information you are trying to control — is transmitted over the internet to their server. Their systems process it, you sign it, and the signed version is sent back. Their privacy policy says the file is deleted. You have no way to verify this.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most practical purposes, this is acceptable — these platforms have strong security practices. But there are situations where uploading a sensitive unsigned document to a third party creates an unnecessary and avoidable risk:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Documents under NDA themselves.</strong> You sometimes need to sign an NDA in order to receive a document. The NDA itself, before you sign it, may describe the nature of a confidential project. Uploading it to a third-party server may already violate the confidentiality intent.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Documents with sensitive financial terms.</strong> Supplier agreements, freelance contracts, and licensing deals that specify commercial terms you do not want transmitted to third-party servers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Personal documents with identifying information.</strong> Lease agreements, loan forms, and personal service contracts that contain your home address, ID numbers, or financial details.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Medical or legal documents.</strong> Health disclosure forms, attorney engagement letters, and similar documents subject to confidentiality expectations.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Sign runs the entire signing process in your browser. When you load your PDF, it is read by the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          directly into browser memory — no network request. Your signature is created and stays in memory. pdf-lib embeds it on the page. The signed PDF is downloaded via a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL. At no point does your document, your signature, or any identifying information leave your device.
        </p>

        {/* ── Section 2: Visual vs certified ─────────────────────────────── */}

        <h2 id="visual-vs-certified" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Visual signature vs certified digital signature: when each is right
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before using any PDF signing tool, you should understand what kind of signature it produces. SammaPix PDF Sign is honest about this: it produces a visual signature, not a certified digital signature. Here is what that means in practice.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What a visual signature is
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A visual signature is a signature image — your handwriting drawn on a canvas, or a PNG of your handwritten signature — embedded as a graphic element on a PDF page. It looks exactly like a handwritten signature on the page when you view or print the document.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A visual signature provides no cryptographic evidence that the document has not been altered after signing. A determined editor with PDF editing software could modify the document and the signature image would still appear unchanged. The visual signature is evidence of intent — it communicates that a person signed this version of the document — but it is not a tamper-evident seal.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What a certified digital signature is
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A certified digital signature uses asymmetric cryptography. A private key (held by the signer) signs a cryptographic hash of the document. A certificate from a trusted Certificate Authority (CA) links the signer&apos;s verified identity to the public key. When someone opens the signed PDF in Adobe Reader, it checks the signature and shows a &ldquo;signature is valid&rdquo; notice if the document has not been altered and the certificate is trusted.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the document is modified after signing, the cryptographic signature becomes invalid and Adobe Reader displays a warning. This is a meaningful tamper-evidence guarantee that a visual signature cannot provide.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When to use which
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Situation</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Visual signature (this tool)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Certified digital signature needed?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Freelance contracts, NDAs, consulting agreements</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sufficient in most jurisdictions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-gray-500 dark:text-gray-400">Usually no</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Employment offer acceptances, rental agreements</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sufficient in most jurisdictions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-gray-500 dark:text-gray-400">Usually no</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">High-value financial or M&A contracts with dispute risk</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">May be insufficient — no tamper evidence</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Recommended</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Government filings, tax authority submissions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually not accepted by government systems</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-700 dark:text-red-400">Yes — check specific requirements</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Notarized documents, deeds, wills</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not a substitute for notarization</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-700 dark:text-red-400">Yes — requires notarization or QES</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EU contracts requiring Qualified Electronic Signature</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not sufficient — SES only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-700 dark:text-red-400">Yes — use a QTSP</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: Draw method ─────────────────────────────────────── */}

        <h2 id="draw-method" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: draw your signature by hand on the canvas
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The draw method captures your signature in real time as you trace it on the browser canvas. It requires no image files, no preparation, and no prior setup. Open the tool, click Draw, and sign your name with whatever pointing device you have available.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Input device quality comparison
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Stylus on a touchscreen device (best).</strong> An iPad with Apple Pencil, a Surface with Surface Pen, or any Android tablet with a stylus produces results nearly identical to signing on paper. The pressure sensitivity and natural pen motion are captured accurately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Finger on a touchscreen (good).</strong> Signing with your finger on a phone or tablet produces a natural signature, though slightly thicker strokes than a pen due to finger contact area. Most people find their finger signature recognizable and consistent.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Trackpad on a laptop (acceptable).</strong> Using the trackpad to draw a signature is manageable with practice. The lack of tactile feedback makes it harder to reproduce your exact handwriting style, but the result is recognizable.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mouse (functional but less natural).</strong> Most people find it difficult to reproduce their natural handwriting with a mouse. The result is technically a signature, but may look more like a cartoon line than a pen signature. For professional documents, consider the upload method instead.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The canvas captures your strokes with a transparent background. When you click Clear, the canvas resets so you can try again. When you are satisfied with the result, proceed to place the signature on the PDF page.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Draw or upload your signature — stays in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            pdf-lib embeds the signature on your PDF locally. No upload, no account. Verifiable via DevTools.
            Honest about visual vs certified signatures. Free.
          </p>
          <Link
            href="/tools/pdf-sign"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Sign, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Upload method ───────────────────────────────────── */}

        <h2 id="upload-method" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: upload a PNG of your handwritten signature
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Uploading a pre-prepared signature image is the method that produces the most professional and consistent results. Your actual handwritten signature — the same one you use on paper — appears on the PDF. And once you prepare the PNG, you can reuse it for every signing without re-drawing each time.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The critical requirement is using a PNG with a transparent background. Here is why: when the signature image is placed on a PDF page, it sits over the existing content — text, lines, and other elements. If your PNG has a white background, a white rectangle appears behind your signature, covering whatever was underneath. A transparent PNG means only the ink strokes of your signature are visible.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPG images cannot have transparent backgrounds — the format does not support alpha channels. If you only have a JPG of your signature, use{" "}
          <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
          to strip the white paper background and export the result as PNG before using it with the sign tool.
        </p>

        {/* ── Section 5: Prepare signature PNG ──────────────────────────── */}

        <h2 id="prepare-signature-png" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to create a clean transparent PNG signature
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here are two practical methods for creating a reusable transparent PNG of your handwritten signature, with no special software required:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Method A: photograph and remove background
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Sign your name deliberately on plain white paper with a dark-colored pen. Use the version of your signature you use professionally — not a hasty version, since this image will represent you on future documents.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Place the paper on a flat, evenly lit surface. Photograph it from directly above — no angle, no shadows crossing the signature. Good natural light or direct overhead lighting works well. Phone cameras in 2026 are more than sufficient for this.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Open the photo in{" "}
            <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>. The AI background removal strips the white paper, leaving only the signature strokes on a transparent background.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Download the result as a PNG. This is your reusable signature file. Store it in a secure location on your device — a dedicated folder named &ldquo;Signature Files&rdquo; is a practical choice.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Method B: document scanner app
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Sign on white paper. Use a document scanner app — Microsoft Office Lens, Adobe Scan, or the built-in document scanning feature in iOS or Android. These apps apply automatic contrast enhancement and perspective correction, producing a cleaner result than a standard photograph.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Export or save the scanned image as a high-resolution JPG or PNG.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            If the background is white (not transparent), open the file in{" "}
            <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
            to create a clean transparent PNG.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Download as PNG and store the file locally for reuse.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the best result on a PDF page, use a source PNG at least 600 pixels wide. Smaller images may appear pixelated when scaled up to typical signature sizes on an A4 or Letter PDF page.
        </p>

        {/* ── Section 6: Positioning tips ───────────────────────────────── */}

        <h2 id="positioning-tips" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to position a signature precisely on a PDF page
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Precise positioning makes the difference between a signature that looks professional and one that looks hastily added. Here are practical tips for placing your signature correctly:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Identify the signature line first.</strong> Before placing the signature, zoom into the page preview and locate the exact line or box where the signature should go. Most contracts have a clearly marked &ldquo;Signature&rdquo; field with an underline or box.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Size the signature to fit naturally above the line.</strong> A signature that is too large extends past the signature field and looks unprofessional. A signature that is too small looks like a stamp rather than a handwritten mark. Adjust the width so the signature extends across the signature line without overflowing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Align the baseline of the signature with the signature line.</strong> In a handwritten signature, the descenders (the parts of letters that go below the baseline) typically sit on or below the line. Position the signature so the bottom of the signature image aligns with the top of the signature line, with the signature appearing above the line as it would with a pen.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check the result before downloading.</strong> After applying the signature, review the page preview to confirm the positioning looks correct. If it does not, you can reload the unsigned PDF and apply the signature again with adjusted placement.
          </li>
        </ul>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step-by-step: add a signature to a PDF without uploading
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The complete workflow from opening the tool to downloading the signed PDF:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-sign</strong> in any modern browser. No account, no signup, no app install.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse. The file is loaded into browser memory. Watch the DevTools Network tab — nothing is sent anywhere.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Create or load your signature.</strong> Click Draw to sign on the canvas — use your mouse, trackpad, finger, or stylus. Click Clear if you want to redo it. Or click Upload and select a transparent PNG of your signature from your device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the target page.</strong> If your PDF has multiple pages, choose the page where the signature belongs — usually the final page where the signature line appears.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Position the signature.</strong> Click or drag the signature on the page preview. Use the resize controls to adjust the size. Align the signature precisely over the signature line on the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply Signature.</strong> pdf-lib embeds the signature image as a PDF XObject at the specified coordinates on the selected page. Processing takes a fraction of a second.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the signed PDF.</strong> Click Download. The signed file is served from browser memory via a blob URL. Zero network requests. Open the file in a PDF viewer to confirm the signature appears correctly before sending it.
          </li>
        </ol>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your unsigned document never leaves your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Draw or upload your signature. Placed on your PDF via pdf-lib. No account. No upload. Verifiable in DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-sign"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Sign, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/sign-pdf-online-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Sign PDF online free — more details <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Signing confidential docs ─────────────────────── */}

        <h2 id="private-documents" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Signing confidential documents: the privacy case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The privacy argument for browser-based PDF signing is strongest for the category of documents that are most sensitive and most commonly signed: employment contracts, NDAs, supplier agreements, and rental forms.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Consider what information these documents contain: your full legal name, address, ID number or tax identification, salary or rate, commercial terms, and sometimes the names of third parties subject to confidentiality. Uploading all of this to a PDF signing service to add a visual signature — which the browser can do entirely locally — creates an unnecessary data exposure.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The counterargument is that established signing platforms have strong security and their audit trails are useful. This is true. If you need those audit trails — if the counterparty requires DocuSign or if you are dealing with a high-value contract where the signing record matters — use a certified platform. But for the majority of everyday document signing, the browser-based approach processes your document without it ever leaving your device, which is a meaningful privacy property that upload-based tools cannot match by design.
        </p>

        {/* ── Section 9: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The no-upload claim is verifiable by anyone in under two minutes. Here is how:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 on Windows or Linux. Press Command Option I on Mac. On Safari, enable Developer Tools in Settings, then Advanced, Show Develop menu in menu bar.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear any existing requests using the circular clear button in the toolbar.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Use the tool — load PDF, create signature, position it, apply, download.</strong> Watch the Network panel throughout the entire session.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests carrying your document.</strong> You will see requests for the tool&apos;s JavaScript bundle and assets when the page first loads. During the signing workflow and download, the Network panel shows no activity. Your PDF, your signature, and the signed output all exist only in browser memory.
          </li>
        </ol>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Visual signature tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need a visual signature (not a certified digital signature), here is an objective look at the options:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Tool</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">File uploaded?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Account required?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Free signing limit</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Audit trail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SammaPix PDF Sign</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">No — fully local</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No artificial limit</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No server-side trail — email is your trail</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">DocuSign free tier</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes — server upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3 envelopes per month</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — timestamped audit trail</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">HelloSign free tier</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes — server upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3 documents per month</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — audit certificate</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iLovePDF Sign</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes — server upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Optional</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited on free</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Basic</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Adobe Acrobat (desktop)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">No (desktop app)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-amber-700 dark:text-amber-400">Yes + paid subscription</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No limit (paid)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (local file)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is how they fit alongside PDF signing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: password-protect the signed PDF before emailing it. Only the recipient with the password can open the document. See{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password Protect a PDF Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">PDF Watermark</Link></strong>: before sending a draft for review, stamp every page DRAFT or FOR REVIEW. After final signing, remove the stamp. See{" "}
            <Link href="/blog/add-watermark-to-pdf-online" className="text-[#6366F1] hover:underline">Add a Watermark to a PDF Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">PDF Redact</Link></strong>: before sending a contract to a third party, redact any clauses that do not apply to them or any sensitive references that should not be visible. No upload required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce the signed PDF file size before attaching it to an email if it exceeds attachment size limits.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: strip the white paper background from a photographed signature to create a clean transparent PNG for use with the PDF Sign tool.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Sign, protect, watermark, redact, and compress PDFs without uploading them.
            All tools run locally in your browser via pdf-lib. No server. No signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-sign"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Sign PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-watermark"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Watermark PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/redact-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Redact PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
