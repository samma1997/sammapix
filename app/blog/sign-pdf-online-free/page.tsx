import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Sign a PDF Online Free (No Upload) [2026]",
  description:
    "Add a visual signature to any PDF entirely in your browser — draw it by hand on a canvas or upload a signature image. Powered by pdf-lib. No upload, no server, no signup. Honest about visual vs certified digital signatures. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/sign-pdf-online-free`,
  },
  keywords: [
    "sign pdf online",
    "sign pdf free",
    "esign pdf",
    "sign pdf online free",
    "add signature to pdf online",
    "draw signature on pdf",
    "pdf signature free",
    "sign pdf no upload",
    "sign pdf browser",
    "sign pdf without uploading",
    "electronic signature pdf free",
    "insert signature in pdf",
    "pdf sign online no account",
    "sign pdf document free",
    "pdf esignature free",
  ],
  openGraph: {
    title: "Sign a PDF Online Free (No Upload) [2026]",
    description:
      "Draw your signature on a canvas or upload a signature image — placed directly on your PDF in the browser via pdf-lib. No upload, no server. Honest about visual vs certified e-signatures. Free.",
    url: `${APP_URL}/blog/sign-pdf-online-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign a PDF Online Free (No Upload) [2026]",
    description:
      "PDF signing that runs 100% in your browser via pdf-lib. Draw or upload your signature. No upload, no server. Honest: this is a visual signature, not a certified digital signature. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/sign-pdf-online-free`;
const POST_TITLE = "Sign a PDF Online Free (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online PDF signing tools upload your document to a remote server before you can add a signature — which creates a privacy problem for contracts and sensitive forms. SammaPix PDF Sign lets you draw your signature by hand on a canvas or upload a signature image, then place it precisely on any page of your PDF, entirely in your browser via pdf-lib. No upload, no server, no signup. This guide explains how it works, when a visual signature is sufficient, and when you genuinely need a certified digital signature with a trusted timestamp.",
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
    "sign pdf online",
    "sign pdf free",
    "esign pdf",
    "add signature to pdf online",
    "draw signature on pdf",
    "sign pdf no upload",
    "electronic signature pdf free",
    "visual signature pdf",
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
  name: "How to Sign a PDF Online Free Without Uploading It",
  description:
    "Draw your signature by hand on a canvas or upload a signature image, then place it on any page of your PDF — entirely in your browser via pdf-lib. No upload, no server, no signup. Free.",
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
      name: "Open the PDF Sign tool",
      text: "Go to sammapix.com/tools/pdf-sign in any modern browser. No account or signup required. The tool loads the pdf-lib library locally in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag your PDF onto the dropzone or click to browse. The file is read by the browser using the FileReader API. Nothing is sent to any server at this point — your document stays on your device.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Create your signature",
      text: "Choose Draw to sign your name by hand on the canvas using your mouse, trackpad, or touchscreen. Choose Upload to load a signature image (PNG with transparent background works best). The signature is stored in browser memory only.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Position the signature on your PDF",
      text: "A preview of the page is shown. Click or drag to place the signature exactly where you want it on the page. You can resize and reposition it before confirming.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Apply and download",
      text: "Click Apply Signature. pdf-lib embeds the signature image as a PDF XObject on the selected page. The resulting file is offered for download directly from browser memory via a blob URL. Zero network requests carry your document to any server.",
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
      name: "Is a visual PDF signature legally binding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the jurisdiction and the context. In many countries, a visual signature image placed on a PDF — what this tool produces — is legally equivalent to a handwritten signature for a wide range of contracts and agreements, including freelance contracts, NDAs, consulting agreements, and vendor agreements, provided both parties agree to sign electronically and there is a record of intent. In the United States, the ESIGN Act (2000) and UETA broadly recognize electronic signatures that indicate intent to sign. In the EU, eIDAS classifies these as Simple Electronic Signatures, which are legally valid for most commercial transactions. However, for documents requiring a higher assurance level — certain government filings, notarized documents, regulated financial contracts, property transfers — a certified digital signature with a cryptographic certificate from a trusted authority (qualified e-signature under eIDAS, or a PKI certificate) may be required. This tool produces a visual signature. For high-stakes legal documents, verify the requirements in your jurisdiction.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a visual signature and a certified digital signature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A visual signature (what this tool creates) is a signature image — your handwriting drawn on a canvas or a PNG of your signature — embedded into the PDF as a graphic element. It looks like a handwritten signature on the page. It provides no cryptographic guarantee that the document has not been altered after signing and no verified identity link to the signer beyond what the image shows. A certified digital signature (used by DocuSign, Adobe Sign, and PKI-based tools) uses asymmetric cryptography: a private key signs a hash of the document, and a public key certificate from a trusted Certificate Authority verifies the signer's identity. This creates a tamper-evident seal — if the PDF is modified after signing, the digital signature becomes invalid. For internal approvals, routine contracts, and forms where both parties exchange over a traceable channel, a visual signature is practical and sufficient. For regulated transactions, court documents, or situations where you need cryptographic proof of identity and document integrity, use a certified digital signing service.",
      },
    },
    {
      "@type": "Question",
      name: "Does signing a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most popular tools — DocuSign, HelloSign, Adobe Sign, iLovePDF, Smallpdf — yes. Your PDF is uploaded to their server, processed, and returned to you. For a contract, an NDA, or a personal document, this means a copy of that file exists on a server you do not control. With SammaPix PDF Sign, no. The entire signing process happens in your browser using pdf-lib. Your file never leaves your device. You can verify this by opening your browser's DevTools (F12), going to the Network tab, and watching for outgoing requests while you use the tool. You will see none carrying your document.",
      },
    },
    {
      "@type": "Question",
      name: "Can I draw my signature by hand on a phone or tablet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The signature canvas in SammaPix PDF Sign supports touch input. On a phone or tablet, you can draw your signature with your finger or a stylus directly on the canvas. The canvas captures the stroke paths in real time, producing a natural-looking handwritten signature. For the most natural result, use a stylus if you have one — finger drawing tends to produce thicker strokes. Once you are satisfied with how the signature looks, proceed to place it on the PDF page.",
      },
    },
    {
      "@type": "Question",
      name: "What file format should my signature image be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG with a transparent background is strongly recommended when uploading a signature image. A transparent PNG means only the signature ink is visible when embedded on the PDF — there is no white or colored rectangle around it. If you use a JPG (which has no transparency), a solid white or colored background will appear behind the signature, which looks incorrect when placed over a document page. To create a clean PNG signature: sign on white paper, photograph it, then use SammaPix Remove Background to strip the white background, or scan and export as PNG from your document scanner app. A PNG image of at least 600 pixels wide ensures the signature is sharp when scaled to typical signature sizes on a PDF page.",
      },
    },
    {
      "@type": "Question",
      name: "Can I sign multiple pages or add the signature to every page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current version of SammaPix PDF Sign places the signature on a specific page that you select. You can use it to sign page 1, the last page, or any specific page in the document — wherever the signature field is located. If you need to place a signature on multiple pages (for example, initialing every page of a multi-page contract), apply the tool once per target page, downloading and re-uploading between applications, or use the position controls to specify the correct page each time. For simple one-location signing, the tool handles the full workflow in a single pass.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when signing a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser's developer tools (F12 on Windows and Linux, Command Option I on Mac). Click on the Network tab and clear any existing entries. Now load your PDF into SammaPix PDF Sign, draw or upload your signature, place it on the page, and click Apply Signature. Watch the Network panel throughout the entire process — from file selection through download. You will see requests for page assets (JavaScript, CSS, fonts) when the tool first loads. During signing, placement, and download, you will see zero outgoing requests carrying your document or your signature image. Everything happens in browser memory using pdf-lib and the FileReader API. The signed PDF is served as a blob URL directly from memory.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SignPdfOnlineFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="sign-pdf-online-free"
        description="Signing a PDF online with most tools means uploading your contract, NDA, or form to a server you do not control — before you have even added your signature. SammaPix PDF Sign runs entirely in your browser via pdf-lib: draw your signature by hand on a canvas, or upload a signature image, then position it precisely on any page. No upload, no server, no signup. And because honesty matters: this produces a visual signature, not a certified cryptographic digital signature. Here is exactly when that distinction matters and when it does not."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={10}
        headings={[
          { id: "the-upload-problem", title: "The problem: most PDF signing tools upload your document" },
          { id: "visual-vs-certified", title: "Visual signature vs certified digital signature: the honest distinction" },
          { id: "when-visual-is-enough", title: "When a visual signature is sufficient" },
          { id: "when-you-need-certified", title: "When you need a certified digital signature" },
          { id: "how-browser-signing-works", title: "How browser-based PDF signing works" },
          { id: "draw-vs-upload", title: "Draw vs upload: which signature method to use" },
          { id: "step-by-step", title: "How to sign a PDF online free, step by step" },
          { id: "signature-image-tips", title: "How to prepare a clean signature image" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF signing: comparison" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online PDF signing tools (DocuSign free tier, HelloSign, iLovePDF, Smallpdf) upload your document to a remote server before you can sign it. For contracts and sensitive forms, this is an unnecessary privacy risk.",
          "SammaPix PDF Sign runs entirely in your browser via pdf-lib. Draw your signature on a canvas or upload a PNG signature image, then place it on the correct page. File never leaves your device.",
          "Honest disclosure: this tool produces a visual signature — a signature image embedded in the PDF. It is NOT a certified digital signature with a cryptographic certificate.",
          "A visual signature is legally sufficient for many everyday documents in most jurisdictions (ESIGN Act in the US, Simple Electronic Signature under eIDAS in the EU). Verify requirements for high-stakes legal documents.",
          "The signed PDF is a standard PDF file with the signature image embedded as a pdf-lib XObject. It opens correctly in all PDF viewers.",
          "You can verify no upload happens by watching the DevTools Network tab while signing — zero outgoing requests carry your document to any server.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person signing a business document at a desk, representing signing a PDF online privately in the browser without uploading it to any server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Signing a PDF with a contract or NDA should not require uploading it to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Sign your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Draw your signature on a canvas or upload a PNG signature image. Placed on your PDF via pdf-lib in the
              browser. File never leaves your device. Honest about visual vs certified signatures. Free, no signup.
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
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most PDF signing tools upload your document
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You receive a contract by email. You need to sign it and return it. You search for &ldquo;sign PDF online free&rdquo; and land on DocuSign, HelloSign, iLovePDF, or Adobe Sign. You upload the document, draw or type your signature, and download the signed version.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          But here is what just happened: your unsigned contract — potentially containing your personal details, payment terms, or confidential business information — was uploaded to a third-party server. For services offering free-tier signing, your document may be stored there for days. Their privacy policy says the file is deleted after processing, but you cannot verify this.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The documents that most need signing are often the most sensitive: employment contracts, NDAs, freelance agreements, supplier contracts, and lease agreements. For these, uploading to an unknown server before you have even added your signature is a real privacy concern.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-sign" className="text-[#6366F1] hover:underline">SammaPix PDF Sign</Link>{" "}
          to handle the entire signing process inside your browser. No server is involved at any point. The tool uses{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          — an open-source JavaScript library for reading and writing PDF files locally — to embed your signature on the page. And it is honest about a distinction that matters.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; means in technical terms
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Sign, your browser reads it using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without any network access. Your signature (drawn on a canvas or uploaded as an image) exists only in browser memory. pdf-lib embeds it as a PDF XObject on the selected page. The signed output is downloaded via a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL directly from memory. Zero network requests carry your document or your signature to any remote server.
        </p>

        {/* ── Section 2: Visual vs certified ─────────────────────────────── */}

        <h2 id="visual-vs-certified" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Visual signature vs certified digital signature: the honest distinction
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most &ldquo;sign PDF online&rdquo; searches conflate two different things that the industry calls by similar names. Being clear on this distinction will help you choose the right tool for your situation.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it is</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Tamper evidence</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Created by SammaPix PDF Sign?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Visual signature</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A signature image (handwriting drawn on a canvas, or a PNG of your signature) embedded as a graphic on a PDF page. Looks like a handwritten signature.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No cryptographic tamper evidence. A determined editor can modify the document without invalidating the signature.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — this is what the tool produces</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Certified digital signature</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A cryptographic signature using a private key and a certificate from a trusted Certificate Authority (CA). Links the signer&apos;s verified identity to the document via asymmetric cryptography.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Any modification to the document after signing invalidates the cryptographic signature, which is detectable by any PDF reader.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-gray-500 dark:text-gray-400">No — use DocuSign Advanced, Adobe Sign Advanced, or a qualified e-signature provider for this</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Sign produces a visual signature. This is clear and honest. The distinction matters because the right choice depends entirely on what you are signing and who you are signing it with.
        </p>

        {/* ── Section 3: When visual is enough ───────────────────────────── */}

        <h2 id="when-visual-is-enough" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When a visual signature is sufficient
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a large share of everyday document signing, a visual signature is legally sufficient and practically appropriate. Here is the framework:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Freelance and consulting contracts.</strong> Both parties are exchanging PDFs over email — which already creates a traceable paper trail. A visual signature on the PDF combined with the email exchange constitutes clear evidence of intent to sign. Used by millions of freelancers daily.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Non-disclosure agreements (NDAs).</strong> Standard mutual or one-way NDAs between businesses and individuals. A visual signature with a dated email chain showing both parties received and signed the document is a well-established and legally recognized practice in most jurisdictions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Internal company approvals and sign-offs.</strong> Internal documents where the signer and recipient are within the same organization — expense approvals, internal policy acknowledgments, project sign-offs. The organizational context provides identity verification.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Vendor and supplier agreements for routine transactions.</strong> Standard vendor onboarding forms, terms and conditions acknowledgments, and routine service agreements between established parties.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Employment offer letter acceptances.</strong> Accepting a job offer by signing and returning the offer letter PDF. Common practice in most industries, recognized as a binding acceptance of employment terms.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Personal forms where wet ink is impractical.</strong> Medical intake forms shared via PDF, school permission slips sent by email, rental application forms, and similar personal documents where the administrative process accepts digital returns.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In the United States, the ESIGN Act (Electronic Signatures in Global and National Commerce Act, 2000) and the Uniform Electronic Transactions Act (UETA) establish that electronic signatures — including visual signatures — are legally valid for most contracts and agreements. In the European Union, eIDAS (EU Regulation 910/2014) recognizes Simple Electronic Signatures (SES) for everyday commercial transactions.
        </p>

        {/* ── Section 4: When you need certified ───────────────────────────── */}

        <h2 id="when-you-need-certified" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need a certified digital signature
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A visual signature is not appropriate for every document. Here are the situations where you need a certified digital signature with cryptographic backing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Government filings and regulatory submissions.</strong> Tax authority submissions, regulatory filings, and government forms in many countries explicitly require certified digital signatures from government-recognized providers. A visual signature will be rejected.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Notarized and witnessed documents.</strong> Documents that require notarization — property transfers, power of attorney, wills, sworn affidavits — typically require wet-ink signatures or a qualified e-signature with identity verification. A visual signature is not a substitute for notarization.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">High-value financial contracts with dispute risk.</strong> When the contract value is significant and the parties may dispute document authenticity in court, a certified digital signature provides cryptographic proof that the document was not altered after signing. A visual signature does not provide this guarantee.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Contracts explicitly requiring a qualified e-signature under eIDAS.</strong> Some EU contracts — particularly in regulated industries like finance, healthcare, and insurance — require a Qualified Electronic Signature (QES), which requires a qualified certificate from a QTSP (Qualified Trust Service Provider) and identity verification. DocuSign Qualified, Adobe Sign EU Qualified, or a QTSP like Swisscom are appropriate for this.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Documents where the counterparty explicitly requires certified signing.</strong> If the other party in a transaction explicitly requires DocuSign, Adobe Sign, or a specific certified e-signature platform, use their platform.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When in doubt, ask a lawyer familiar with contract law in your jurisdiction. The distinction between Simple, Advanced, and Qualified Electronic Signatures under eIDAS is well-documented and jurisdiction-specific rules vary.
        </p>

        {/* ── Section 5: How browser signing works ───────────────────────── */}

        <h2 id="how-browser-signing-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF signing works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you trust the output and know exactly what the resulting file contains. Here is what happens when you sign a PDF with this tool:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the PDF.</strong> The FileReader API loads the file into browser memory as an ArrayBuffer. No network request is made. The document stays on your device from this point through download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your signature is captured.</strong> If you draw your signature on the canvas, the browser&apos;s Canvas API captures your stroke paths as a raster image. If you upload a PNG, the image is read into browser memory. In both cases, the signature exists only in your browser — it is never sent anywhere.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib parses the PDF structure.</strong> The library reads the document&apos;s internal page tree, resources, and content streams. Existing content is preserved intact.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The signature is embedded as a PDF XObject.</strong> pdf-lib encodes the signature image as a PDF image resource (XObject) and appends a drawing instruction to the target page&apos;s content stream at the coordinates you specified. The signature appears at the position, size, and rotation you chose.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The signed PDF is offered for download.</strong> pdf-lib serializes the updated document to an ArrayBuffer, which is wrapped in a Blob and downloaded via a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL. No network request. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The resulting file is a standard PDF with your signature image embedded as a permanent graphic element on the page. It opens correctly in Adobe Reader, Chrome, Firefox, Preview on macOS, and any other PDF viewer. The signature is rendered at native resolution and is not removable without editing the PDF content stream.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Sign your PDF in your browser, no upload needed</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Draw your signature or upload a PNG. Placed on your PDF via pdf-lib. File never leaves your device.
            Honest about visual vs certified signatures. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-sign"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Sign, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Draw vs upload ──────────────────────────────────── */}

        <h2 id="draw-vs-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Draw vs upload: which signature method to use
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Sign gives you two ways to create your signature. Each produces a different result and suits different situations.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Draw: sign by hand on the canvas
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Drawing your signature on the canvas produces a handwritten-looking signature captured in real time from your mouse, trackpad, or touchscreen. This is the closest equivalent to signing with a pen and is the most natural method for most people. On a trackpad or touchscreen, the result closely resembles your actual handwriting. Using a mouse generally produces a slightly less natural look — most people find a touchscreen or stylus produces the best result.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for:</strong> quick signing on a device you are working on. No need to prepare any image file in advance.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drawback:</strong> the result varies depending on your input device. A mouse signature looks less fluid than a touchscreen or stylus signature.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The signature is captured on a white canvas.</strong> The tool exports it as a PNG with a transparent background, so only the ink strokes appear when placed on the PDF page.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Upload: use a prepared signature image
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Uploading a pre-prepared signature image lets you use a high-quality, consistent version of your actual handwritten signature every time. The recommended workflow is to sign your name on paper with a black pen, photograph or scan it at high resolution, then remove the white background to get a clean transparent PNG.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for:</strong> professional signing where you want your actual handwritten signature to appear on the document, consistently, every time.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">File format:</strong> PNG with a transparent background is strongly recommended. A JPG with a white background will show a white rectangle behind the signature on the PDF page.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The signature image file:</strong> it is read into browser memory and never uploaded to any server. You can store the PNG locally and reuse it each time you need to sign a PDF.
          </li>
        </ul>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Preparation needed</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Draw on canvas</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on input device — best with stylus or touchscreen</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None — sign directly in the browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Quick signing, routine documents</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Upload PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">High — use your actual handwritten signature at full resolution</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Scan / photograph signature, remove background to transparent PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Professional signing, high-stakes documents, consistent look</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to sign a PDF online free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes about two minutes for most documents:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-sign</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse. The file loads into browser memory. Nothing is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Create your signature.</strong> Click Draw and sign your name on the canvas using your mouse, trackpad, finger, or stylus. Or click Upload and load a PNG signature image from your device. Review the signature — if drawing, click Clear to try again.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the target page.</strong> If your PDF has multiple pages, choose the page where the signature should appear (typically the last page, or wherever the signature line is).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Position and size the signature.</strong> A preview of the page is shown. Click or drag to place the signature at the correct location. Resize as needed using the scale controls. Position it precisely over the signature line on the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply Signature.</strong> pdf-lib embeds the signature image on the selected page at the coordinates you specified.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the signed PDF.</strong> Click Download. The signed document is served from browser memory. No network request. Open the downloaded file to verify the signature appears correctly on the page before sending it.
          </li>
        </ol>

        {/* ── Section 8: Signature image tips ──────────────────────────── */}

        <h2 id="signature-image-tips" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to prepare a clean signature image
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to use your actual handwritten signature as a PNG, here are two practical ways to prepare it:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Option 1: phone photograph
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Sign your name on plain white paper with a dark-colored pen (black or dark blue). Use a consistent, deliberate stroke — not a hasty version. This will be your signature on documents going forward.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Photograph the paper in good lighting, flat on a table, with no shadows across the signature.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Open the photo in{" "}
            <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
            to strip the white paper background, leaving only the signature strokes on a transparent background.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Download the result as a PNG. Store it locally. This is your reusable signature image.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Option 2: document scanner app
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Sign on paper. Use a document scanner app (Microsoft Office Lens, Adobe Scan, or your phone&apos;s built-in document scan feature) to scan the signature at high resolution.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            The scanner app typically applies contrast enhancement automatically, making the signature strokes crisp.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Export as PNG and remove the white background using{" "}
            <Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">SammaPix Remove Background</Link>{" "}
            if the app does not produce a transparent PNG.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A PNG at least 600 pixels wide ensures your signature is sharp when scaled to typical sizes on a PDF page. Smaller source images may appear pixelated when enlarged.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your document never leaves your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Draw your signature or upload a transparent PNG. Positioned precisely on your PDF via pdf-lib.
            No upload, no account. Verifiable via DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-sign"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Sign, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-signature-to-pdf-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Sign without uploading — full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for this. Here is how to verify it yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). In Safari, enable Developer Tools first in Settings, Advanced, Show Develop menu.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click Network in DevTools. Clear any existing requests with the clear button.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Load your PDF, create your signature, position it, and click Apply Signature.</strong> Watch the Network panel throughout the entire process from file selection through download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests carrying your file.</strong> You will see requests for static page assets (JavaScript, CSS, fonts) when the tool first loads. During the signing process and download, you will see no network activity carrying your document or your signature image. Everything happens in browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Try the same test on DocuSign or iLovePDF — you will see a large outgoing POST request carrying your PDF bytes to their server immediately when you upload the file.
        </p>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF signing: comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing how to sign a PDF online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (DocuSign free, HelloSign, iLovePDF)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix PDF Sign)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Document uploaded to a remote server before signing. Server stores the file during processing.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser DevTools Network tab.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signature type</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Visual signature on free tiers. Certified digital signature on paid advanced/qualified tiers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Visual signature only — honest about this. Not a certified digital signature.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Account required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually required even on free plans.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Free signing limit</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">DocuSign free: 3 documents per month. HelloSign free: 3 documents per month.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No artificial signing limit imposed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Audit trail</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full audit trail with timestamps and IP addresses on paid plans. Provides signing evidence for disputes.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No server-side audit trail — the document is processed locally. Use email exchange as your paper trail.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Upload and download add time. Account creation required first time.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant. No upload, no account. Load the tool, sign, download.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Best for</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">High-stakes contracts requiring certified digital signatures, audit trails, and identity verification. Multi-party signing workflows.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Everyday signing where a visual signature is sufficient and privacy is a priority. No account, no upload, no limit.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is when to use each alongside PDF signing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add a password to your signed PDF before sending it. Only the recipient who has the password can open the document. See{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password Protect a PDF Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">PDF Watermark</Link></strong>: stamp DRAFT or CONFIDENTIAL diagonally across a PDF before sending it for review and signature. Watermarked documents make clear the version is not final. See{" "}
            <Link href="/blog/add-watermark-to-pdf-online" className="text-[#6366F1] hover:underline">Add a Watermark to a PDF Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/redact-pdf" className="text-[#6366F1] hover:underline">PDF Redact</Link></strong>: remove sensitive information from a PDF before distributing it. Useful for contracts that need certain clauses redacted before sharing with a specific party.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce the file size of a signed PDF before emailing it. Useful when the signed document exceeds email attachment limits.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Sign, protect, watermark, redact, and compress PDFs without uploading them anywhere.
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
