import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Unlock a PDF Online Without Uploading It [2026]",
  description:
    "Remove PDF restrictions (printing, copying, editing) in your browser with no file upload. Powered by pdf-lib. Honest about what it can and cannot unlock. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/unlock-pdf-online-no-upload`,
  },
  keywords: [
    "unlock pdf online",
    "unlock pdf free",
    "unlock pdf no upload",
    "unlock pdf browser",
    "remove pdf restrictions online",
    "unlock pdf without uploading",
    "pdf unlock no signup",
    "remove pdf permissions online",
    "unlock pdf printing",
    "unlock pdf free no upload",
  ],
  openGraph: {
    title: "Unlock a PDF Online Without Uploading It [2026]",
    description:
      "Remove PDF printing, copying, and editing restrictions in your browser. No file upload, no server, no signup. Honest about owner-password vs user-password. Free.",
    url: `${APP_URL}/blog/unlock-pdf-online-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock a PDF Online Without Uploading It [2026]",
    description:
      "PDF restriction removal that runs 100% in your browser. No upload, no server. Removes owner-password restrictions. Honest about user-password limits. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/unlock-pdf-online-no-upload`;
const POST_TITLE = "Unlock a PDF Online Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most PDF unlockers upload your file to a remote server. SammaPix PDF Unlock removes printing, copying, and editing restrictions entirely in your browser using pdf-lib. The file never leaves your device. This guide explains the honest difference between owner-password restrictions (removable in-browser) and user-password encryption (not bypassable without the password), how pdf-lib removes restrictions, and how to verify no upload happens.",
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
    "unlock pdf online",
    "unlock pdf free",
    "unlock pdf no upload",
    "remove pdf restrictions",
    "unlock pdf browser",
    "unlock pdf printing",
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
  name: "How to Unlock a PDF Online Without Uploading It",
  description:
    "Remove PDF printing, copying, and editing restrictions in your browser with no file upload, using SammaPix PDF Unlock powered by pdf-lib. Works on PDFs that open without a password.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix PDF Unlock (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the PDF Unlock tool",
      text: "Go to sammapix.com/tools/pdf-unlock in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your PDF onto the tool",
      text: "Drag the PDF onto the dropzone or click to browse for it. The tool checks whether the file opens without a password. If it does, it reads the permission flags set by the owner password. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the detected restrictions",
      text: "The tool shows you which restrictions are currently applied: printing disabled, copying disabled, editing disabled, or a combination. If the PDF requires a password to open, the tool tells you honestly — it cannot proceed without the correct password.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Remove Restrictions",
      text: "pdf-lib rewrites the PDF's permission flags, clearing all owner-password restrictions. The content is not touched. Processing happens entirely on your device.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the unlocked PDF",
      text: "Click Download to save the unlocked PDF. It is served directly from browser memory via a blob URL. No file was ever sent to a server. The output PDF opens without restrictions in any compliant viewer.",
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
      name: "Does unlocking a PDF online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. iLovePDF, Smallpdf, and similar services upload your PDF to their servers for processing. With SammaPix PDF Unlock, no. The restriction removal runs entirely in your browser using pdf-lib, an open-source JavaScript library for reading and writing PDFs. Your file never leaves your device. You can verify this by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your file. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between an owner password and a user password on a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are two completely different things in the PDF specification. A user password (also called an open password or document-open password) encrypts the file content itself — you must enter it before the PDF will even display. Without the correct user password, the content is unreadable. An owner password (also called a permissions password) does not encrypt the content — it only sets permission flags that tell compliant viewers to restrict printing, copying, or editing. The PDF content is still accessible (you can open it without any password), but a conforming viewer respects the restriction flags and grays out the Print or Copy buttons. SammaPix PDF Unlock removes owner-password restrictions. It does not crack user-password encryption — no browser-based tool can do that without the correct password.",
      },
    },
    {
      "@type": "Question",
      name: "Can SammaPix PDF Unlock open a PDF that requires a password to view?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and the tool is honest about this. If a PDF requires a password to open (user password), the tool detects this and tells you so immediately. It does not pretend to process the file or show a fake progress bar. The file content is encrypted and cannot be accessed without the correct password. This is not a technical limitation unique to browser-based tools — it applies to all PDF processing tools. The correct approach for a password-protected PDF is to open it in a viewer (Adobe Reader, Preview, Chrome) using the password you know, then export or save it without a password from that viewer.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my PDF say 'printing not allowed' even though I created it myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This typically happens because the application that exported the PDF set an owner password and applied restriction flags automatically — often without making it obvious. Common sources include Google Forms PDF exports, certain legal document systems, Adobe Sign and DocuSign outputs, some government and financial institution portals, and PDF printers that apply restrictions by default. In most of these cases, the PDF opens without any password (so there is no user password), but the permission flags inside the file tell viewers to block printing or copying. SammaPix PDF Unlock clears those flags, which is why it works on PDFs you can already open without a password.",
      },
    },
    {
      "@type": "Question",
      name: "Does removing PDF restrictions change the content of the file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib removes restrictions by rewriting the PDF's encryption dictionary and permission flags. It does not touch the page content streams, fonts, images, or any other part of the document. Text stays selectable, images stay at their original quality, links remain active, and the file size is essentially unchanged. The only thing that changes is the set of permission flags that govern what viewers allow you to do with the file.",
      },
    },
    {
      "@type": "Question",
      name: "Is it legal to remove PDF restrictions from a document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This depends on jurisdiction and the specific document. In general, removing restrictions from a PDF you created yourself, own the rights to, or have legitimate access to is legal in most countries. The PDF restriction system is a technical measure, not a legally binding contract. However, some jurisdictions have laws (such as the US DMCA or EU Copyright Directive) that can apply to circumventing technical protection measures on copyrighted content. The SammaPix PDF Unlock tool is built for legitimate use cases: unlocking PDFs you created, removing restrictions on documents you own, and accessing PDFs where you have the rights but the restrictions were applied by software automatically. Use it responsibly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your PDF into the SammaPix PDF Unlock tool and click Remove Restrictions. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool loads. During restriction removal and download, you will see zero outgoing requests. The PDF is read by the FileReader API, processed entirely in memory by pdf-lib, and the output is downloaded via a blob URL — no network call is made.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UnlockPdfOnlineNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="unlock-pdf-online-no-upload"
        description="Every popular PDF unlocker uploads your file to a server. SammaPix is different: it removes PDF restrictions entirely in your browser, with no upload, no signup, and no server involved. Here is exactly how it works, what it can remove, and where it is honest about its limits."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: every PDF unlocker uploads your file" },
          { id: "two-types-of-pdf-protection", title: "The two types of PDF protection: owner password vs user password" },
          { id: "how-browser-unlocking-works", title: "How browser-based PDF unlocking actually works" },
          { id: "what-gets-removed", title: "What restrictions get removed — and what stays untouched" },
          { id: "step-by-step", title: "How to unlock a PDF without uploading it, step by step" },
          { id: "common-causes", title: "Why your PDF is restricted in the first place" },
          { id: "comparison-table", title: "Browser-based vs upload-based PDF unlockers: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most PDF unlockers (iLovePDF, Smallpdf, Adobe Online) upload your file to a remote server. For contracts, invoices, and sensitive documents, that is a real privacy risk.",
          "SammaPix PDF Unlock runs entirely in your browser using pdf-lib. Your file never leaves your device.",
          "Honest limitation: the tool removes owner-password restrictions (printing, copying, editing disabled). It does not crack user-password encryption — if a PDF requires a password to open, no browser tool can bypass that without the correct password.",
          "Removing restrictions does not touch the document content. Text stays selectable, images stay at original quality, file size is essentially unchanged.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
          "Works on PDFs that open without a password but have restricted actions — the most common case for PDFs from government portals, legal tools, and form exports.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person looking at a locked document on a laptop screen, representing a PDF with printing and copying restrictions that needs to be unlocked."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Unlocking a PDF should not require handing your document to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Remove PDF restrictions right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Unlock runs entirely in your browser via pdf-lib. Removes printing, copying, and editing
              restrictions from PDFs that open without a password. Honest about user-password limits. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/pdf-unlock"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open PDF Unlock, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-rotate"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: every PDF unlocker uploads your file
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You receive a PDF from a government portal, a legal service, or a form export. You try to print it. The Print button is grayed out. You try to copy a paragraph. Nothing happens. The PDF opens fine — no password required — but whoever created it set restrictions that prevent you from doing what you need.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You search for &quot;unlock PDF online&quot; and land on iLovePDF, Smallpdf, or a dozen similar services. You drag the file in. A progress bar fills. The file uploads to their server, gets processed remotely, and you download the result. The restriction is gone.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The unlock worked. But your document — which may contain your name, address, financial details, or legal information — spent time on a server you have no visibility into. Their privacy policy says it is deleted after one hour. You have no way to verify that. For a generic photo, this is a minor concern. For a tax return, a medical record, or a contract, it is a real risk.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">SammaPix PDF Unlock</Link>{" "}
          to solve this by running the entire restriction-removal process inside your browser. No server is involved at any point. And the tool is honest about the one thing it genuinely cannot do — which most online unlockers are not.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &quot;no upload&quot; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a PDF into SammaPix PDF Unlock, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The file stays in browser memory throughout. Processing uses{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>{" "}
          (an open-source JavaScript library for reading and writing PDFs). The output is served as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL and downloaded directly from memory. Zero network requests carry your file.
        </p>

        {/* ── Section 2: Two types of PDF protection ─────────────────────── */}

        <h2 id="two-types-of-pdf-protection" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The two types of PDF protection: owner password vs user password
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most important thing to understand about PDF security — and where most online unlocker tools are dishonest or unclear. The PDF specification defines two completely different protection mechanisms, and they work nothing alike:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Owner password (permissions password) — removable in-browser
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An owner password does not encrypt the file content. The PDF opens without any password — you can already read it in any viewer. What the owner password does is set a set of permission flags in the PDF&apos;s encryption dictionary. These flags tell compliant viewers (Adobe Reader, Chrome PDF viewer, Preview) to disable certain actions: printing, copying text, modifying the document, filling forms, or adding annotations.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because the content is not actually encrypted, removing these restriction flags is entirely possible in-browser using pdf-lib. The library rewrites the encryption dictionary and clears the permission flags. After that, any viewer — including the same ones that were previously blocking the actions — treats the PDF as unrestricted and enables printing, copying, and editing.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          User password (open password / document-open password) — NOT bypassable
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A user password, also called a document-open password, encrypts the actual content of the PDF. The file will not display at all without the correct password — the content is encrypted using AES-128 or AES-256 depending on the PDF version. There is nothing to read or process without decrypting it first, and decryption requires the correct password.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Unlock does not attempt to crack user passwords. No legitimate browser-based tool can. When the tool detects that a PDF requires a password to open, it tells you so immediately and clearly. It does not show a fake progress bar or pretend to process the file. This honesty is a feature, not a limitation — any tool that claims to unlock password-encrypted PDFs without the correct password is either lying about what it does or running a server-side brute-force attack against your file.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Protection type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Content encrypted?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Opens without password?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix can remove?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Owner password (restrictions: print/copy/edit)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — content is readable</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — restriction flags cleared in-browser</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">User password (open password, document encrypted)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — AES-128 or AES-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — password required to view</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — requires correct password. Tool is honest about this.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: How browser unlocking works ─────────────────────── */}

        <h2 id="how-browser-unlocking-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF unlocking actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains both why this works and why it is safe to do. Here is what happens under the hood when you click Remove Restrictions:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib loads and parses the PDF.</strong> The library reads the PDF binary structure, including the cross-reference table, the trailer dictionary, and the encryption dictionary if one is present. This is entirely in-browser — no network request.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The tool checks whether the file requires a password to open.</strong> If a user password is set, the PDF content cannot be accessed. The tool detects this and reports it to you immediately rather than attempting anything further.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If the file opens (no user password), the tool reads the permission flags.</strong> The PDF encryption dictionary contains a 32-bit permissions integer. Each bit controls a specific capability: bit 3 controls printing, bit 5 controls copying, bit 6 controls editing, and so on. The tool reads these flags and shows you which restrictions are currently active.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">pdf-lib rewrites the PDF without the restriction flags.</strong> The library produces a new PDF in which the encryption dictionary&apos;s permission integer has all restriction bits set to allow. The document content — text, images, fonts, structure — is completely untouched.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is offered for download.</strong> The unlocked PDF is stored as a Blob in browser memory and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key technical point: because the PDF content was never actually encrypted by the owner password (only the permission flags were set), pdf-lib can rewrite those flags without needing to know the original owner password. This is by design in the PDF specification — the owner-password restriction system was always intended to communicate preferences to compliant viewers, not to act as strong content protection.
        </p>

        {/* ── Section 4: What gets removed ──────────────────────────────── */}

        <h2 id="what-gets-removed" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What restrictions get removed — and what stays untouched
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification defines the following permission flags that an owner password can set. SammaPix PDF Unlock clears all of them:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Restriction</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it blocks</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Removed by tool?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Printing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The Print button is grayed out or disabled in PDF viewers. High-quality printing may also be restricted separately.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Copying text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Text selection and copy-paste are blocked. Extracting content via accessibility tools may also be blocked.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Editing and modifying</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Annotations, form filling, page insertion, and content modification are blocked in PDF editors.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">User password (open/view password)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The PDF will not open without the correct password. Content is encrypted with AES.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — not possible without the correct password</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What the tool does not touch: the document content — text, images, fonts, page layout, links, form fields, and everything else in the PDF — is completely unchanged. The file size will be nearly identical to the original. The only difference is that viewers no longer see the restriction flags and treat the document as fully accessible.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Remove PDF restrictions in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Works on PDFs that open without a password. Removes printing, copying, and editing restrictions.
            Honest about user-password limits. No upload. No signup. Free.
          </p>
          <Link
            href="/tools/pdf-unlock"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Unlock, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to unlock a PDF without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most PDFs:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-unlock</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone</strong> or click to browse for it. The file is loaded into browser memory. If the PDF requires a password to open, the tool tells you immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The tool shows the detected restrictions.</strong> You will see which specific permissions are blocked: printing, copying, editing, or a combination. If the PDF has no restrictions, the tool tells you that too — it does not pretend restrictions were removed when there were none.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Remove Restrictions.</strong> pdf-lib rewrites the PDF&apos;s permission flags in memory. The content is not touched. Processing happens in your browser in seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the unlocked PDF.</strong> Click Download. The file is served from browser memory as a Blob. No network request occurs. Open the downloaded PDF in any viewer — Print, Copy, and Edit are now available.
          </li>
        </ol>

        {/* ── Section 6: Common causes ──────────────────────────────────── */}

        <h2 id="common-causes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your PDF is restricted in the first place
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most users are surprised to find their PDF is restricted, especially when they did not intentionally password-protect it. Here are the most common sources:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Government and institutional portals
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many government-issued PDFs — tax forms, official certificates, benefit letters, visa documents — are generated by backend systems that apply restriction flags automatically as a policy. The intent is often to discourage unofficial copies, but the practical effect is that citizens cannot print their own documents without an unlocker.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Legal document services and e-signature platforms
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adobe Sign, DocuSign, and similar platforms often lock the final signed document to prevent modification after signing. This makes sense as an integrity measure, but it also means the recipient cannot print or copy from the signed copy without removing the restrictions first. The content is not encrypted — only the modification and copying flags are set.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          PDF export settings set by software automatically
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some applications apply owner-password restrictions when exporting to PDF without clearly communicating this to the user. Common examples include certain accounting software, invoice generators, and cloud print services. The person who created the PDF may not even know restrictions were applied — they just clicked &quot;Export to PDF&quot;.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Corporate or educational document distribution
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          IT departments and LMS platforms sometimes distribute PDFs with copy restrictions to limit content extraction. If you have legitimate access to the content (you are a student or employee who is supposed to read this document), removing the copying restriction so you can quote a paragraph in your notes is generally considered acceptable use.
        </p>

        {/* ── Section 7: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based PDF unlockers: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a PDF unlocker:
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. You trust their security and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Removes owner-password restrictions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, typically.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. pdf-lib rewrites the permission flags in-browser.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Removes user-password encryption</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Some claim to — but this requires the correct password or a server-side brute-force attack.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — and the tool is honest about this. If the PDF requires a password to open, it tells you so.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Content quality after unlock</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually unchanged. Some tools re-export the PDF, which can alter fonts or images.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unchanged. Only the permission flags are modified. No re-rendering, no re-encoding.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size change</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">May vary if the tool re-processes the PDF.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Essentially zero change. Only a few bytes in the encryption dictionary change.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans typically cap at 5 to 25 MB. Larger files need a subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap. No server involved.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Honesty about limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some tools show misleading progress bars for user-password PDFs.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Transparent. Detects and communicates user-password PDFs immediately. Does not pretend.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari you may need to enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click on the Network panel in DevTools. If you see a list of requests, click the clear button to empty it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF and click Remove Restrictions.</strong> Watch the Network panel as the tool processes the file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during unlocking. The only requests that appear are the initial page load assets. Nothing carries your file to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same verification method that security researchers use to audit tools that claim to be privacy-safe. It is straightforward and conclusive. If no request carries your PDF bytes outbound, the file stayed on your device.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Removes printing, copying, and editing restrictions.
            Honest about what it can and cannot unlock. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-unlock"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Unlock, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/remove-pdf-password-restrictions"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove PDF permissions in detail <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools, all with no upload and no server processing. Here is when to use each:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: remove printing, copying, and editing restrictions from PDFs that open without a password. Owner-password restrictions cleared in-browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents and image-heavy PDFs. See the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages or split into individual PDFs. Useful if you need only certain pages from a large restricted document — unlock first, then split.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. All tools run in your browser with no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-rotate" className="text-[#6366F1] hover:underline">PDF Rotate</Link></strong>: rotate individual pages or the whole document permanently. Text stays selectable. See{" "}
            <Link href="/blog/rotate-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Rotate a PDF online without uploading it</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your PDF needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Unlock, compress, split, merge, and rotate PDFs without uploading them anywhere.
            All tools run locally in your browser via pdf-lib. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
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
            <Link
              href="/tools/pdf-rotate"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
