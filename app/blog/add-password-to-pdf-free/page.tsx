import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add a Password to a PDF Free [2026]",
  description:
    "Add a password to any PDF free, entirely in your browser. No upload to unknown sites. Explains open password vs owner password, the risk of uploading sensitive PDFs, and what happens if you forget. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/add-password-to-pdf-free`,
  },
  keywords: [
    "add password to pdf",
    "encrypt pdf online",
    "put password on pdf",
    "add password to pdf free",
    "encrypt pdf free",
    "how to add password to pdf",
    "pdf encryption free",
    "password protect pdf",
    "secure pdf online",
    "add password pdf without software",
  ],
  openGraph: {
    title: "How to Add a Password to a PDF Free [2026]",
    description:
      "Add an open password to a PDF in your browser, free. No upload to unknown sites — encryption runs locally via @cantoo/pdf-lib. Explains open vs owner password and forgotten-password risk.",
    url: `${APP_URL}/blog/add-password-to-pdf-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add a Password to a PDF Free [2026]",
    description:
      "PDF password addition that runs free in your browser. No upload to unknown sites. Open vs owner password explained. Forgotten password = not recoverable. Honest guide.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-password-to-pdf-free`;
const POST_TITLE = "How to Add a Password to a PDF Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Adding a password to a PDF sounds straightforward — but most free online tools upload your sensitive document to a server before encrypting it, which defeats the entire purpose. This guide explains why you should never upload sensitive PDFs to unknown sites, the critical difference between an open password (encrypts content) and an owner password (only sets flags), how to add a password to a PDF free using browser-based encryption, and what happens if you forget the password.",
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
    "add password to pdf",
    "encrypt pdf online",
    "put password on pdf",
    "add password to pdf free",
    "pdf encryption free",
    "password protect pdf",
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
  name: "How to Add a Password to a PDF for Free",
  description:
    "Add an open password to a PDF free in your browser using SammaPix PDF Protect. No upload, no signup. AES-256 encryption runs entirely locally via @cantoo/pdf-lib.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Protect (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Go to SammaPix PDF Protect",
      text: "Open sammapix.com/tools/pdf-protect in any modern browser. No account or signup required. The tool runs entirely locally.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag your PDF onto the dropzone or click to browse. The file is read into browser memory. Nothing is sent to a server — check the DevTools Network tab to verify.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter your password",
      text: "Type the password you want to use. This becomes the open password — it will be required to view the file. Use a strong, unique password and store it in a password manager. There is no reset option.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Protect PDF",
      text: "@cantoo/pdf-lib applies AES-256 encryption using your password. All computation happens in your browser. Typically completes in under a second.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download and test",
      text: "Download the protected PDF. Open it in a different PDF viewer to confirm it asks for the password. Enter the wrong password first to verify the protection works, then enter the correct one.",
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
      name: "Why should I not upload a sensitive PDF to an unknown site to add a password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you upload a PDF to an online tool, your unprotected file travels over the internet to their server. The server processes the file — reads the content, applies encryption — and sends you back the protected version. This means the most sensitive version of your document (the unprotected one) was transmitted to and processed by a third party. Their privacy policy may say files are deleted after one hour, but you cannot verify this. For contracts, financial documents, medical records, or legal files, this is a real privacy risk. The safest approach is to encrypt the document locally, before it ever leaves your device — which is what browser-based tools like SammaPix PDF Protect do.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between an open password and an owner password on a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are two completely different mechanisms defined in the PDF specification. An open password (also called a user password or document-open password) encrypts the PDF content itself using AES. The file will not display in any viewer without the correct password — the content is unreadable ciphertext. An owner password (also called a permissions password or restrictions password) does NOT encrypt the content. The PDF opens freely in any viewer. The owner password only sets permission flags that tell compliant viewers to block certain actions — printing, copying, editing. SammaPix PDF Protect adds an open password, which provides real content encryption. If you encounter a PDF that opens without a password but blocks printing or copying, that is an owner-password restriction — see SammaPix PDF Unlock for that case.",
      },
    },
    {
      "@type": "Question",
      name: "What if I forget the password I added to my PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The password is not stored anywhere — not on SammaPix servers (no server is involved), not in your browser, not in the PDF file itself. AES-256 encryption is strong enough that there is no practical way to recover the content without the correct password. If you forget the password to a PDF you protected, the file is not recoverable. This is not a flaw — it is what makes the protection meaningful. Tools that offer password recovery have a backdoor to your encrypted content. Before downloading a protected PDF, save the password in a password manager (1Password, Bitwarden, Apple Keychain). Also keep a backup of the unprotected original file if you might need to re-protect it with a different password later.",
      },
    },
    {
      "@type": "Question",
      name: "Is adding a PDF password free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — SammaPix PDF Protect is free. No payment, no credit card, no subscription required. The encryption runs entirely in your browser using @cantoo/pdf-lib, an open-source library, so there is no server cost. There is also no account requirement: you can protect a PDF without creating any account. The tool is limited by your device memory, not by an artificial free-tier cap.",
      },
    },
    {
      "@type": "Question",
      name: "Will the password-protected PDF work on phones and other devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The output is a standard PDF with AES-256 encryption, which is defined in the PDF 2.0 specification (ISO 32000-2). Any compliant PDF viewer will display a password prompt and open the document after the correct password is entered. This includes Adobe Reader on Windows, macOS, Android, and iOS; the built-in PDF viewers in Chrome, Firefox, and Safari; Apple Preview on macOS and iOS; Foxit Reader; and standard mobile PDF apps. There is nothing proprietary about the output — it is a standard encrypted PDF.",
      },
    },
    {
      "@type": "Question",
      name: "How strong is the encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix PDF Protect uses AES-256, the strongest encryption level in the PDF specification. AES-256 is used by governments, financial institutions, and militaries worldwide for protecting classified and sensitive data. With a strong password (12+ characters, mixed case, numbers, symbols), a brute-force attack is computationally infeasible with current technology. The security of your protected PDF depends primarily on the strength of your chosen password, not the algorithm — AES-256 itself is not the bottleneck. Use a randomly generated password from a password manager rather than a memorable phrase for maximum security.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove the password from a PDF I protected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you know the password. Open the protected PDF in Adobe Reader or macOS Preview using the correct password. Then use File > Save As (or Export) and choose to save without a password — the application will create an unprotected copy. You can also re-protect it with a new password by opening the unprotected version in SammaPix PDF Protect and applying a new password. What you cannot do is remove the password without knowing it — AES-256 encryption does not have a bypass. If you have forgotten the password, the file is not recoverable.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddPasswordToPdfFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-password-to-pdf-free"
        description="Adding a password to a PDF is straightforward — but most free online tools make a critical mistake: they upload your sensitive document to their server before encrypting it. This guide explains why that matters, the real difference between an open password and an owner password, how to add a password to a PDF free without uploading it, and the honest truth about forgotten passwords."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "why-not-upload", title: "Why you should not upload sensitive PDFs to add a password" },
          { id: "open-vs-owner-password", title: "Open password vs owner password: which one you actually need" },
          { id: "how-to-add-password-free", title: "How to add a password to a PDF free, step by step" },
          { id: "encryption-algorithm", title: "What encryption is used and what it means for security" },
          { id: "forgotten-password", title: "What happens if you forget the password: the honest answer" },
          { id: "password-best-practices", title: "Password best practices for PDF protection" },
          { id: "when-owner-password", title: "When to use an owner password instead (restrict printing or copying)" },
          { id: "verify-no-upload", title: "How to verify no upload happens when you add a password" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most free online PDF password tools upload your unprotected document to a server before encrypting it. For sensitive files, this is a real privacy risk — the unprotected version left your device.",
          "SammaPix PDF Protect adds an open password to your PDF entirely in your browser using @cantoo/pdf-lib. No upload, no server, no signup. AES-256 encryption. File never leaves your device.",
          "An open password (what this tool adds) encrypts the PDF content — the file will not open in any viewer without the correct password. An owner password only sets permission flags; it does not encrypt anything.",
          "Honest warning: if you forget the password, the file is not recoverable. No backdoor exists. Save the password in a password manager before downloading the protected file.",
          "The output is a standard PDF that works in all major viewers (Adobe Reader, Chrome, Preview, mobile apps) on any device.",
          "If you have a PDF that opens freely but blocks printing or copying (owner-password restrictions), that is a different problem — see SammaPix PDF Unlock.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person carefully securing digital documents on a laptop, representing the decision of how to safely add a password to a sensitive PDF without uploading it."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding a password to a sensitive PDF should not require uploading the unprotected file to a site you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a password to your PDF free, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Protect encrypts your PDF in your browser via @cantoo/pdf-lib. AES-256 open-password
              encryption. Your unprotected file never reaches any server. Honest about forgotten-password risk.
              Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-protect"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Protect, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-unlock"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Remove PDF restrictions <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-split"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why not upload ──────────────────────────────────── */}

        <h2 id="why-not-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you should not upload sensitive PDFs to add a password
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Search for &quot;add password to PDF free&quot; and you will find dozens of tools: iLovePDF, Smallpdf, Adobe Online, PDF24, and many more. Most of them work. But there is a sequence of events that almost no one thinks about carefully:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">You drag your PDF — a contract, a financial statement, a medical record — onto the website.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">The unprotected file travels over the internet to their server.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Their server reads the entire document content.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Their server applies the password and sends the encrypted version back to you.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Their privacy policy says the file is deleted after one hour. You cannot verify this.</li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The paradox is clear: to protect a document from unauthorized access, you sent the unprotected document to a company you do not know and granted them access to it. The encrypted version you downloaded is secure. The version that traveled to their server was not.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most documents — a recipe PDF, a presentation — this does not matter much. But for the documents most likely to need a password (contracts, tax documents, medical records, confidential reports), sending an unprotected copy to a third-party server is a meaningful risk.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The alternative: encryption in your browser
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern browsers can run the full AES-256 encryption process locally, without any server involvement. When you use{" "}
          <Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">SammaPix PDF Protect</Link>,{" "}
          the PDF is read into browser memory via the FileReader API, encrypted by{" "}
          <a href="https://github.com/cantoo-scribe/pdf-lib" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">@cantoo/pdf-lib</a>{" "}
          using your password, and downloaded directly from memory as a Blob. No version of your file — protected or unprotected — ever leaves your device. You can verify this by watching the Network tab in DevTools while the tool runs.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The privacy guarantee is not a claim that depends on trusting a privacy policy. It is a structural property of the tool&apos;s architecture that you can audit yourself in under two minutes.
        </p>

        {/* ── Section 2: Open vs owner password ─────────────────────────── */}

        <h2 id="open-vs-owner-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Open password vs owner password: which one you actually need
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before adding a password to your PDF, it is important to understand that the PDF specification defines two entirely different types of &quot;password&quot; that do completely different things. Knowing the difference tells you exactly what protection you are getting.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Open password: real encryption that controls access
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An open password (also called a user password or document-open password) encrypts the actual content of the PDF using AES-256. The file binary becomes ciphertext — meaningless data without the decryption key. Any PDF viewer that tries to open the file will display a password prompt. Without the correct password, nothing is readable.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is what you need if:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">You want to control who can view the document at all.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">You are sending a document to a specific person and want to ensure only they can open it.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">You are storing a sensitive document in cloud storage or on a shared device.</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Owner password: permission flags, not real encryption
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An owner password (also called a permissions password or restrictions password) works completely differently. It does not encrypt the content — the PDF opens freely in any viewer without any password. What the owner password does is set permission flags in the file that instruct compliant PDF viewers to block specific actions: printing, copying text, editing, or filling forms.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is often called &quot;PDF protection&quot; but it is more accurately &quot;PDF restrictions.&quot; Anyone can read the document. The restrictions only work on software that chooses to enforce them — the underlying content is accessible to any tool that ignores the flags.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What you want</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Password type needed</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Prevent the PDF from being opened without a password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Open password (user password) — encrypts content</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">SammaPix PDF Protect</Link></td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Allow viewing but block printing or copying</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Owner password (permissions password) — sets flags only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Adobe Acrobat Pro or a permissions-aware PDF editor</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Remove printing/copying restrictions from a locked PDF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Remove owner-password flags</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">SammaPix PDF Unlock</Link></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Protect adds an open password — real AES-256 content encryption. If your goal is to control who can view the document, this is the right tool. If you have the opposite problem (a PDF that opens freely but blocks printing or copying), see{" "}
          <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">SammaPix PDF Unlock</Link>{" "}
          and the guide{" "}
          <Link href="/blog/remove-pdf-password-restrictions" className="text-[#6366F1] hover:underline">How to remove PDF printing and copying restrictions</Link>.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add a password to your PDF without uploading it</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            AES-256 encryption in your browser. Your unprotected file never reaches any server.
            Honest about forgotten-password risk. Free, no signup.
          </p>
          <Link
            href="/tools/pdf-protect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Protect, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 3: Step by step ───────────────────────────────────── */}

        <h2 id="how-to-add-password-free" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a password to a PDF free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/pdf-protect</strong> in Chrome, Safari, Firefox, or Edge. No account required. The tool loads entirely in your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse. The file is loaded into browser memory using the FileReader API. No network request is made.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type your password.</strong> Choose a strong, unique password. This is what anyone will need to enter to open the file. It is not stored anywhere — if you forget it, the file cannot be recovered. Store the password in a password manager (1Password, Bitwarden, Apple Keychain) before proceeding.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Protect PDF.</strong> @cantoo/pdf-lib applies AES-256 encryption in your browser. Typical PDFs process in under a second.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the protected PDF.</strong> The encrypted file is served from browser memory as a Blob URL. Click Download. No network request carries your file anywhere.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Test the protection.</strong> Open the downloaded PDF in a different application. Try entering the wrong password first — confirm it is rejected. Then enter the correct password and confirm the document opens. This takes 30 seconds and confirms the encryption is working.
          </li>
        </ol>

        {/* ── Section 4: Encryption algorithm ──────────────────────────── */}

        <h2 id="encryption-algorithm" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What encryption is used and what it means for security
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Protect uses AES-256 (Advanced Encryption Standard, 256-bit key). This is the highest encryption level defined in the PDF 2.0 specification (ISO 32000-2) and the same algorithm used by governments and financial institutions to protect classified data.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical implication: with a strong password, a brute-force attack against AES-256 is computationally infeasible with current and foreseeable technology. The weakness in most real-world PDF security is not the encryption algorithm — it is weak, guessable, or reused passwords.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What makes a password strong enough?
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Length over complexity.</strong> A 16-character random password is stronger than an 8-character password with symbols and numbers. Longer is better.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Avoid dictionary words.</strong> Phrases like &quot;password123&quot; or &quot;Summer2026!&quot; are cracked quickly by dictionary attacks. Random character strings are far more resistant.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Use a password generator.</strong> Password managers (1Password, Bitwarden, Apple Keychain) include generators that create strong, random passwords and store them securely. Use one.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Unique per document.</strong> Use a different password for each protected PDF. If one password is ever compromised, the others remain secure.
          </li>
        </ul>

        {/* ── Section 5: Forgotten password ─────────────────────────────── */}

        <h2 id="forgotten-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What happens if you forget the password: the honest answer
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most online PDF tools do not address this question clearly. Here is the complete truth:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">If you forget the password you set, the PDF content is not recoverable.</strong>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The password is not stored anywhere. AES-256 encryption does not have a backdoor. The tool runs in your browser and involves no server — there is no account system that could store or reset it. The encrypted file is just a sequence of ciphertext that requires the correct decryption key to become readable content.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the correct behavior for a secure encryption tool. Tools that offer &quot;forgot my password&quot; recovery either use weak encryption that can be broken, or they have a server-side backdoor — meaning they can access your encrypted content without your password. Either way, the protection is compromised.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical consequence: before you download a password-protected PDF, make sure the password is saved somewhere secure. Here are the options in order of reliability:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A password manager</strong> (1Password, Bitwarden, Apple Keychain, Dashlane). This is the best option — the password is encrypted locally, backed up, and accessible when you need it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A separate encrypted note</strong> (not in the same document or the same email as the PDF).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A backup of the unprotected original</strong>. If you keep the original unprotected PDF, you can always re-protect it with a new password if needed.
          </li>
        </ol>

        {/* ── Section 6: Password best practices ────────────────────────── */}

        <h2 id="password-best-practices" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Password best practices for PDF protection
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Beyond choosing a strong password, there are a few operational practices that significantly improve the security and usability of password-protected PDFs:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Send the password separately
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are sharing a password-protected PDF with someone, do not include the password in the same email as the PDF. An attacker who intercepts the email gets both the encrypted file and the key to open it. Send the password through a different channel — a phone call, a text message (SMS or Signal), or a separate email sent at a different time.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use a consistent naming convention for protected files
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A naming convention like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">contract-acme-2026-protected.pdf</code> makes it easy to identify which files are protected and find the corresponding passwords in your password manager. The word &quot;protected&quot; in the filename is a reminder, not a security measure — the encryption is what matters.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Inform the recipient before sending
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Let the recipient know a password-protected PDF is coming and how they will receive the password. Many people are confused when a PDF asks for a password and may assume the file is corrupted. A brief message like &quot;I am sending you a protected PDF. The password is coming via text&quot; prevents confusion and ensures they know the file is legitimate.
        </p>

        {/* ── Section 7: When to use owner password ─────────────────────── */}

        <h2 id="when-owner-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When to use an owner password instead (restrict printing or copying)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are cases where you want to share a PDF that anyone can view, but you want to discourage printing, copying, or editing. This is not content protection — it is usage restriction. The PDF content is readable; you are only telling compliant viewers to disable certain actions.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common use cases for owner-password restrictions:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Digital contracts and signed documents.</strong> E-signature platforms like DocuSign apply restrictions to prevent post-signature modification. The signed document is viewable by all parties but cannot be edited.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Educational materials and reports.</strong> Distributing PDFs where you want to discourage text extraction — though note that these restrictions can be removed by browser-based tools like{" "}
            <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Invoices and receipts.</strong> Some invoicing tools add restrictions by default to create &quot;read-only&quot; documents, though this is often more inconvenient than effective.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For owner-password restrictions, you need a PDF editor that supports this feature (Adobe Acrobat Pro, PDFelement, or similar). SammaPix PDF Protect adds open-password encryption, not owner-password restrictions. The two tools serve different purposes.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device throughout</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            AES-256 encryption free in your browser. No upload, no account. Honest: forgotten password means file not recoverable.
            Verifiable via DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Protect, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/remove-pdf-password-restrictions"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove PDF restrictions guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens when you add a password
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the method security researchers use to audit tools that claim to be privacy-safe. It takes under two minutes and gives you a definitive answer:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu first under Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Clear existing entries with the clear button so you start with a clean log.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, enter a password, and click Protect PDF.</strong> Watch the Network panel continuously from the moment you drop the file to the moment you click Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests carrying your file.</strong> You will see requests for static page assets when the tool loads. During encryption and download, the Network panel will be silent. Nothing sends your PDF bytes to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For comparison: run the same test on iLovePDF or Smallpdf. You will see a large outgoing POST request carrying your PDF bytes to their server. The difference is visible, measurable, and definitive.
        </p>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools. All process locally with no upload and no server:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add AES-256 open-password encryption to any PDF in your browser. File never leaves your device. See the full guide at{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password protect a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: remove printing, copying, and editing restrictions from PDFs that open without a password (owner-password restrictions). The complement to PDF Protect. See the guide at{" "}
            <Link href="/blog/remove-pdf-password-restrictions" className="text-[#6366F1] hover:underline">How to remove PDF printing and copying restrictions</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size before encrypting. Smaller PDFs transfer faster and take up less storage. See the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract only the pages you need before protecting. Protect just the sensitive section of a larger document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple documents into one before applying a single password. Useful for document packages.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Protect, unlock, compress, split, and merge PDFs without uploading them anywhere.
            All tools run locally via @cantoo/pdf-lib and pdf.js. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-unlock"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Unlock PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-split"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-merge"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Merge PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
