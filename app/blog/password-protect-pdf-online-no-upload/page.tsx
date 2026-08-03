import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Password Protect a PDF Online Without Uploading It [2026]",
  description:
    "Add an open password to any PDF in your browser — no upload, no server, no signup. Encryption runs 100% client-side via @cantoo/pdf-lib. Honest about what happens if you forget the password. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/password-protect-pdf-online-no-upload`,
  },
  keywords: [
    "password protect pdf online",
    "protect pdf with password",
    "lock pdf online",
    "password protect pdf free",
    "encrypt pdf online",
    "password protect pdf no upload",
    "add password to pdf browser",
    "pdf password protection free",
    "secure pdf with password online",
    "password protect pdf without uploading",
  ],
  openGraph: {
    title: "Password Protect a PDF Online Without Uploading It [2026]",
    description:
      "Add an open password to a PDF entirely in your browser. No file upload, no server, no signup. Encryption via @cantoo/pdf-lib. Honest about forgotten-password risk. Free.",
    url: `${APP_URL}/blog/password-protect-pdf-online-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Protect a PDF Online Without Uploading It [2026]",
    description:
      "PDF password protection that runs 100% in your browser. No upload, no server. Honest: the password opens the file; if you forget it, it is not recoverable. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/password-protect-pdf-online-no-upload`;
const POST_TITLE = "Password Protect a PDF Online Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online PDF password tools upload your file to a remote server before encrypting it — which defeats the entire purpose. SammaPix PDF Protect adds an open password to your PDF entirely in your browser using @cantoo/pdf-lib. The file never leaves your device. This guide explains what the password actually protects, how to verify no upload happens via DevTools, and the one honest limitation: if you forget the password, there is no reset.",
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
    "password protect pdf online",
    "protect pdf with password",
    "lock pdf online",
    "encrypt pdf online",
    "password protect pdf no upload",
    "add password to pdf",
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
  name: "How to Password Protect a PDF Online Without Uploading It",
  description:
    "Add an open password to a PDF entirely in your browser using SammaPix PDF Protect powered by @cantoo/pdf-lib. The file never leaves your device. No upload, no signup, free.",
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
      name: "Open the PDF Protect tool",
      text: "Go to sammapix.com/tools/pdf-protect in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse. The file is loaded into browser memory using the FileReader API. Nothing is sent to any server at this point.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Type your password",
      text: "Enter the password you want to use to protect the PDF. This will become the open password — anyone who tries to view the file will need to enter it. Choose a strong, memorable password. There is no recovery option if you forget it.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Protect PDF",
      text: "@cantoo/pdf-lib encrypts the PDF content using AES-256 with your password as the key. All processing happens in your browser. The original file is not modified.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the protected PDF",
      text: "Click Download to save the password-protected PDF. It is served from browser memory via a blob URL. No network call is made. Open the file in any PDF viewer — it will ask for the password before displaying.",
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
      name: "Does password protecting a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Services like iLovePDF, Smallpdf, and Adobe Online upload your PDF to their servers, encrypt it there, and send it back. For a document you are trying to keep private — a contract, a financial report, a confidential invoice — this means the unprotected file travels to a server you do not control before the password is applied. With SammaPix PDF Protect, encryption runs entirely in your browser using @cantoo/pdf-lib. Your file never leaves your device. You can verify this by opening DevTools (F12) and watching the Network tab while the tool runs — you will see zero outgoing requests carrying your file.",
      },
    },
    {
      "@type": "Question",
      name: "What does the password actually protect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The password added by SammaPix PDF Protect is an open password (also called a document-open password or user password in the PDF specification). It encrypts the content of the PDF using AES-256. Anyone who tries to open the file in any PDF viewer — Adobe Reader, Chrome, Preview, Foxit — will see a password prompt before any content is displayed. Without the correct password, the file is unreadable encrypted data. This is different from an owner password, which only sets permission flags (blocking printing or copying) without actually encrypting the content. The open password provides real encryption.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I forget the password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The password is not stored anywhere — not on SammaPix servers (there are none involved), not in your browser, not anywhere. AES-256 encryption is strong enough that there is no practical way to recover the content without the correct password. If you forget the password to a PDF you protected with this tool, the file is not recoverable. This is honest and by design — the same guarantee that makes the protection meaningful also means there is no backdoor. Before downloading a protected PDF, make sure you have stored the password securely (a password manager is the best option).",
      },
    },
    {
      "@type": "Question",
      name: "What encryption does the tool use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix PDF Protect uses @cantoo/pdf-lib to apply AES-256 encryption, which is the strongest encryption level defined in the PDF 2.0 specification (ISO 32000-2). AES-256 is the same algorithm used by governments and financial institutions to protect sensitive data. The password you enter is used as the basis for the encryption key derivation. All encryption computation happens in your browser — no key material, no file content, and no password ever leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), go to the Network tab, then drop your PDF into SammaPix PDF Protect and click Protect PDF. Watch the network panel during the entire process. You will see requests for page assets (JavaScript, CSS) when the tool loads. During encryption and download, you will see zero outgoing requests carrying your file. The PDF is read by the FileReader API, encrypted in memory by @cantoo/pdf-lib, and the output is downloaded via a blob URL — no network call sends your data anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open the protected PDF on any device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The output is a standard PDF with AES-256 user-password encryption, which is part of the PDF specification. Any compliant PDF viewer will ask for the password and display the document correctly after you enter it. This includes Adobe Reader on Windows and macOS, Chrome and Firefox built-in PDF viewers, Apple Preview on macOS and iOS, Foxit Reader, and mobile PDF apps on Android and iOS. The protected PDF is fully portable — there is nothing proprietary about SammaPix's implementation.",
      },
    },
    {
      "@type": "Question",
      name: "Does protecting a PDF also prevent printing or copying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The open password added by this tool controls whether the PDF can be viewed at all — it encrypts the content. It does not separately configure printing, copying, or editing restrictions (those are controlled by an owner password, a different mechanism). Once someone opens your PDF with the correct password, they can print, copy, and edit it according to the default permissions. If you want to restrict those actions as well, you would need a tool that supports both user and owner password configuration. For most use cases — protecting a document so only the intended recipient can open it — the open password is exactly what you need.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PasswordProtectPdfOnlineNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="password-protect-pdf-online-no-upload"
        description="When you password protect a PDF using an online tool, most services upload your file to their server before encrypting it — which defeats the entire point of protecting a sensitive document. SammaPix PDF Protect is different: encryption runs 100% in your browser using @cantoo/pdf-lib. Your file never leaves your device. Here is exactly how it works, what the password protects, and the one honest limitation you need to know."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most PDF password tools upload your file first" },
          { id: "what-the-password-protects", title: "What the open password actually protects" },
          { id: "open-vs-owner-password", title: "Open password vs owner password: the distinction that matters" },
          { id: "how-browser-encryption-works", title: "How browser-based PDF encryption works" },
          { id: "encryption-strength", title: "What encryption algorithm is used and why it matters" },
          { id: "step-by-step", title: "How to password protect a PDF without uploading it, step by step" },
          { id: "honest-limitation", title: "The honest limitation: forgotten passwords are not recoverable" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF password tools: comparison" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online PDF password tools (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server before encrypting it. For sensitive documents, this is a real privacy risk.",
          "SammaPix PDF Protect encrypts your PDF entirely in your browser using @cantoo/pdf-lib. Your file never leaves your device. Verifiable via DevTools Network tab.",
          "The password is an open password (user password): it uses AES-256 to encrypt the PDF content. Anyone who tries to open the file needs the correct password before any content is displayed.",
          "Honest limitation: the password is not stored anywhere. If you forget it, the file is not recoverable. No backdoor exists — by design.",
          "The output is a standard PDF with AES-256 encryption, compatible with Adobe Reader, Chrome, Preview, and all major PDF viewers on any device.",
          "If you also need to restrict printing or copying (without requiring a password to open), see the complementary PDF Unlock guide — these are two different mechanisms in the PDF specification.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4386367/pexels-photo-4386367.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person securing a document on a laptop, representing password protecting a sensitive PDF in the browser without uploading it to any server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Password protecting a sensitive PDF should not require sending it to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Password protect your PDF right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Protect encrypts your PDF in your browser via @cantoo/pdf-lib. AES-256 open-password
              encryption. File never leaves your device. Honest about forgotten-password risk. Free, no signup.
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
                Remove PDF password <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
          The problem: most PDF password tools upload your file first
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You have a PDF that needs a password — a contract you are sending to a client, a financial statement, a confidential report. You search for &quot;password protect PDF online&quot; and find iLovePDF, Smallpdf, or Adobe&apos;s online tools. You drag your file in, type a password, and download the protected version.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          But here is what just happened: your unprotected PDF — the one you were trying to secure — traveled over the internet to their server. It sat there, unencrypted, while their server applied the password. Then it came back to you. Their privacy policy says the file is deleted after a short window, but you have no way to verify this.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a PDF containing genuinely sensitive information, sending it to a third-party server before the password is applied is a fundamental contradiction. The whole point of a password is to control who can access the content — and you lost that control the moment the unprotected file left your device.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">SammaPix PDF Protect</Link>{" "}
          to solve this by running the entire encryption process inside your browser. No server is involved at any point. And the tool is honest about one critical limitation that most password tools hide in fine print.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &quot;no upload&quot; actually means in technical terms
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Protect, your browser reads it using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without any network access. The file stays in browser memory. Encryption is performed by{" "}
          <a href="https://github.com/cantoo-scribe/pdf-lib" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">@cantoo/pdf-lib</a>{" "}
          (an open-source JavaScript library for PDF manipulation) using your password as the encryption key. The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file at any point.
        </p>

        {/* ── Section 2: What the password protects ─────────────────────── */}

        <h2 id="what-the-password-protects" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What the open password actually protects
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The password added by SammaPix PDF Protect is an open password (also called a user password or document-open password in the PDF specification). It is important to understand exactly what this means, because the PDF specification defines two completely different password types with very different effects.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An open password encrypts the actual content of the PDF using AES-256. The file bytes are transformed into ciphertext that is meaningless without the decryption key. When someone tries to open the file in Adobe Reader, Chrome, Preview, or any other PDF viewer, they see a password prompt. If they enter the correct password, the viewer decrypts the content and displays the PDF. If they enter the wrong password — or try to open the file with software that skips the prompt — they see nothing readable.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is real protection. The content is genuinely inaccessible without the password. Compare this to the alternative — owner-password restrictions — which only set permission flags in the file without encrypting anything. An owner password tells viewers to block printing or copying, but the underlying content is still readable to any software that chooses to ignore those flags.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The practical meaning for your document
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you apply an open password, your PDF can only be opened by someone who knows the password. This makes it suitable for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Sending documents to a specific recipient.</strong> Share the password through a separate channel (a phone call, a text message, a separate email). Even if the PDF is intercepted, it is unreadable without the password.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Storing sensitive PDFs in cloud storage.</strong> A password-protected PDF in Google Drive or Dropbox adds a layer of protection if your account is compromised — the attacker sees encrypted data, not the document content.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Protecting documents shared over email.</strong> Email is not inherently secure. A password-protected PDF attachment means the document content is protected even if the email is intercepted.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Archiving sensitive records locally.</strong> Tax returns, medical records, and legal documents stored on a shared device can be password-protected to limit access.
          </li>
        </ul>

        {/* ── Section 3: Open vs owner password ─────────────────────────── */}

        <h2 id="open-vs-owner-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Open password vs owner password: the distinction that matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification (ISO 32000) defines two completely separate password mechanisms. Understanding the difference clarifies what SammaPix PDF Protect does — and what it does not do.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Password type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Also called</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it does</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Added by SammaPix PDF Protect?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Open password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">User password, document-open password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encrypts the entire PDF content with AES-256. The file will not open in any viewer without the correct password.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — this is what the tool adds</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Owner password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Permissions password, restrictions password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sets permission flags (blocking printing, copying, editing). The PDF content is NOT encrypted — it opens freely. Viewers enforce the flags; the content remains accessible.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-gray-500 dark:text-gray-400">No — see PDF Unlock for removing these</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you use SammaPix PDF Protect, you are adding an open password. Once the file is protected, anyone who tries to open it must enter the password. This is the correct tool if you want to control who can view the document.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you have the opposite problem — a PDF that opens freely but blocks printing or copying (owner-password restrictions) — see{" "}
          <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">SammaPix PDF Unlock</Link>{" "}
          and the guide{" "}
          <Link href="/blog/remove-pdf-password-restrictions" className="text-[#6366F1] hover:underline">How to remove PDF printing and copying restrictions</Link>. These two tools are complementary: one adds protection, the other removes restrictions.
        </p>

        {/* ── Section 4: How browser encryption works ────────────────────── */}

        <h2 id="how-browser-encryption-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF encryption works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          It may seem surprising that strong PDF encryption can run entirely in a browser. Here is what happens under the hood:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the PDF.</strong> The FileReader API loads the file into browser memory as an ArrayBuffer. This is a standard, well-supported browser API. No network request is made.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">@cantoo/pdf-lib parses the PDF structure.</strong> The library reads the PDF cross-reference table, trailer dictionary, and all page content streams. It builds an in-memory representation of the document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A key is derived from your password.</strong> The PDF specification defines a key derivation process based on the user password. The derived key is used to encrypt the document content using AES-256. Your actual password string is not stored in the file — only the encrypted content and the verification data needed to check whether a supplied password is correct.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The PDF content streams are encrypted.</strong> Text, images, fonts, and all page content are encrypted in place. The PDF structure (cross-reference table, page tree) is updated to reflect the new encryption dictionary. The result is a valid encrypted PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The encrypted PDF is offered for download.</strong> The output is stored as a Blob in browser memory and downloaded via a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL. No network request. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern browsers have enough computational power to perform AES-256 encryption on typical PDF files in under a second. The Web Crypto API, which browsers have supported since 2014, provides native hardware-accelerated cryptographic primitives that @cantoo/pdf-lib can use. There is no performance reason to send the file to a server.
        </p>

        {/* ── Section 5: Encryption strength ────────────────────────────── */}

        <h2 id="encryption-strength" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What encryption algorithm is used and why it matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Protect uses AES-256 (Advanced Encryption Standard with a 256-bit key), which is the highest encryption level defined in the PDF specification. Here is why this matters and what the alternatives are:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Encryption level</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">PDF specification version</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Security level</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Used by SammaPix?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">RC4-40</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PDF 1.1–1.3</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Broken — crackable in seconds</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">RC4-128</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PDF 1.4–1.6</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Weak — deprecated, known vulnerabilities</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">AES-128</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PDF 1.6–1.7</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Acceptable — no practical brute-force</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-yellow-700 dark:text-yellow-400">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">AES-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PDF 1.7 ext. / PDF 2.0 (ISO 32000-2)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Strong — government and financial-grade</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AES-256 is the same standard used by the US government for top-secret data. With a strong password (12+ characters, mixed case, numbers, and symbols), a brute-force attack against AES-256 is computationally infeasible with current and foreseeable technology. The bottleneck is the strength of your chosen password, not the encryption algorithm.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Encrypt your PDF with AES-256, entirely in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload. No server. No signup. AES-256 open-password encryption. File never leaves your device.
            Honest about forgotten-password risk.
          </p>
          <Link
            href="/tools/pdf-protect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Protect, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to password protect a PDF without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most PDFs:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-protect</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse. The file is loaded into browser memory. Nothing is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type your password.</strong> Enter the password you want to use. This is the open password — it will be required to view the PDF. Use a strong, memorable password. If you forget it, the file is not recoverable (more on this below). A password manager is the best place to store it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Protect PDF.</strong> @cantoo/pdf-lib encrypts the PDF content with AES-256 in your browser. Processing is fast — typically under a second for typical PDFs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the protected PDF.</strong> Click Download. The encrypted PDF is served from browser memory as a Blob. No network request occurs. Open the downloaded file in any PDF viewer — you will be asked for the password before any content displays.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify the protection works.</strong> Open the downloaded PDF in a different application (Chrome if you protected it in Firefox, for example). Enter the wrong password first — confirm it is rejected. Then enter the correct password and confirm the document opens normally.
          </li>
        </ol>

        {/* ── Section 7: Honest limitation ─────────────────────────────── */}

        <h2 id="honest-limitation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The honest limitation: forgotten passwords are not recoverable
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most important thing to understand before using any PDF password tool, and most services bury it or do not mention it at all. Here is the honest truth:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">If you forget the password, the content of the PDF is not recoverable.</strong> The password is not stored on SammaPix&apos;s servers — there are no servers involved in the process. It is not stored in your browser. It is not stored anywhere. The AES-256 encryption is strong enough that there is no practical way to recover the content without the correct password.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a flaw — it is what makes the protection meaningful. A password tool that has a &quot;forgot my password&quot; feature has a backdoor. A backdoor means someone else can access your encrypted content. The absence of a reset mechanism is a security property, not a bug.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          However, it does mean you must manage the password responsibly:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Store the password in a password manager</strong> (1Password, Bitwarden, Apple Keychain, or similar) before downloading the protected PDF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Keep a backup of the unprotected PDF</strong> if you might need to change the password later.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Send the password separately</strong> from the protected PDF, through a different communication channel.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This limitation applies to every PDF password tool, not just SammaPix — it is a property of AES-256 encryption. Tools that claim to offer password recovery are either using weak encryption (which makes the protection meaningless) or have server-side backdoors (which means they can access your encrypted file).
        </p>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for this. Here is how to verify it yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable Developer Tools first in Settings → Advanced → Show Develop menu.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel. Clear any existing requests with the clear button.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, type a password, and click Protect PDF.</strong> Watch the Network panel during the entire process — from dropping the file to clicking Download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests carrying your file.</strong> You will see requests for static page assets (JavaScript, CSS) when the tool loads. During encryption and download, you will see no network activity. Nothing carries your PDF bytes anywhere.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you try the same test with iLovePDF or Smallpdf, you will see a large outgoing POST request carrying your file bytes to their server. The difference is visible and measurable.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your unprotected PDF never leaves your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            AES-256 encryption in the browser. No upload, no server. Honest about forgotten-password risk.
            Verifiable via DevTools Network tab. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Protect, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-password-to-pdf-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Why not to upload sensitive PDFs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF password tools: comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a PDF password protection tool:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (iLovePDF, Smallpdf, Adobe Online)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy before encryption</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unprotected file uploaded to a remote server. Server sees the content before encryption is applied.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encryption happens locally. The server never sees the unprotected file — or any version of the file.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Encryption strength</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies — typically AES-128 or AES-256 depending on the service and plan.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">AES-256 — highest level in the PDF specification.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans often cap at 5–25 MB. Larger files need a paid plan.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial server-side cap.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required for full features or higher file size limits.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Password recovery</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Some services offer recovery — which implies they can access your encrypted content. This is a backdoor.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No recovery. Honest: if you forget the password, the file is not recoverable. No backdoor.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Output compatibility</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard PDF — works in all viewers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard PDF — works in all viewers (Adobe Reader, Chrome, Preview, Foxit, mobile apps).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Verifiable privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires trusting their privacy policy. No independent verification.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Verifiable via DevTools Network tab. Zero outgoing requests during encryption.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Related PDF tools ────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is when to use each:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add an AES-256 open password to any PDF in your browser. File never leaves your device. Honest about forgotten-password risk.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: remove printing, copying, and editing restrictions from PDFs that open without a password (owner-password restrictions). The complement to PDF Protect. See the guide at{" "}
            <Link href="/blog/remove-pdf-password-restrictions" className="text-[#6366F1] hover:underline">How to remove PDF printing and copying restrictions</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size before protecting it. Smaller PDFs are faster to email and share securely. See the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract only the pages you need before protecting. Useful if you only want to share specific sections of a larger document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one before applying a password. Protect an entire document package with a single password.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Protect, unlock, compress, split, and merge PDFs without uploading them anywhere.
            All tools run locally in your browser via @cantoo/pdf-lib. No server. No signup. No watermark.
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
