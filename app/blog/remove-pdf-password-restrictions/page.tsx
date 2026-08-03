import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Remove PDF Restrictions (Printing, Copying, Editing) [2026]",
  description:
    "Enable printing, copying, and editing on a restricted PDF — free, in your browser, no upload. Explains owner-password vs user-password. Cannot crack open-password encryption. Honest guide.",
  alternates: {
    canonical: `${APP_URL}/blog/remove-pdf-password-restrictions`,
  },
  keywords: [
    "remove pdf restrictions",
    "enable printing on pdf",
    "remove pdf permissions",
    "pdf won't let me print",
    "pdf won't let me copy",
    "remove pdf editing restrictions",
    "unlock pdf printing",
    "remove owner password pdf",
    "pdf printing disabled",
    "enable copy pdf",
  ],
  openGraph: {
    title: "How to Remove PDF Restrictions (Printing, Copying, Editing) [2026]",
    description:
      "PDF printing or copying disabled? Remove owner-password restrictions in your browser. No upload, no server. Clear explanation of owner password vs user password. Free.",
    url: `${APP_URL}/blog/remove-pdf-password-restrictions`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Remove PDF Restrictions (Printing, Copying, Editing) [2026]",
    description:
      "Enable PDF printing and copying in your browser. No upload. Explains owner password vs user password honestly. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/remove-pdf-password-restrictions`;
const POST_TITLE = "How to Remove PDF Restrictions (Printing, Copying, Editing) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Your PDF prints as 'not allowed', copying text does nothing, or the Edit button is grayed out. This guide explains the exact technical reason — owner password permission flags — why this happens on PDFs that open without any password, and how to remove those restrictions in your browser using pdf-lib. Includes an honest explanation of the one thing that cannot be done: cracking a user-password-encrypted PDF without the correct password.",
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
    "remove pdf restrictions",
    "enable printing on pdf",
    "remove pdf permissions",
    "pdf printing disabled",
    "owner password pdf",
    "remove pdf editing restrictions",
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
  name: "How to Remove PDF Printing, Copying, and Editing Restrictions",
  description:
    "Remove owner-password restrictions from a PDF in your browser using SammaPix PDF Unlock. Enable printing, copying, and editing on PDFs that open without a password. No upload, no signup, free.",
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
      name: "Check whether your PDF opens without a password",
      text: "If the PDF opens in any viewer without asking for a password, the restrictions are set by an owner password — these are removable. If the PDF requires a password to open, it has a user password (encryption) — no tool can remove that without the correct password. SammaPix detects this immediately.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Drop the PDF onto the tool",
      text: "Drag the restricted PDF onto the dropzone or click to browse. The tool reads the permission flags and shows you exactly which restrictions are active: printing, copying, editing, or a combination.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Remove Restrictions",
      text: "pdf-lib rewrites the PDF's permission flags in browser memory. The document content — text, images, fonts — is not touched. Processing takes a second or two on your device.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download and verify",
      text: "Download the unlocked PDF. Open it in Adobe Reader, Chrome, or Preview. The Print, Copy, and Edit options are now available. No file was uploaded anywhere during this process.",
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
      name: "Why does my PDF say 'printing not allowed' when I can open it with no password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is the owner-password restriction system in the PDF specification. The PDF can be opened and read without any password — the content is not encrypted — but the file contains a set of permission flags that tell compliant viewers to disable certain actions. The creator used a PDF export tool or service that set an owner password and applied restrictions (often automatically, without the creator realizing it). Common sources include government portals, DocuSign and Adobe Sign exports, certain invoicing software, and legal document systems. The good news: because the content itself is not encrypted, these restrictions can be removed entirely in a browser using pdf-lib.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between owner password and user password in a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A user password (also called an open password or document-open password) encrypts the actual PDF content using AES-128 or AES-256. The file will not display at all without the correct password — the data is unreadable. An owner password (also called a permissions password) does NOT encrypt the content. The PDF opens fine in any viewer without any password. The owner password only sets permission flags in the PDF's encryption dictionary, which tell compliant viewers to restrict printing, copying, or editing. This is an honor system for software — the data is accessible, the restrictions are just instructions to viewers. Removing owner-password restrictions is straightforward with pdf-lib. Bypassing user-password encryption is not possible without the correct password.",
      },
    },
    {
      "@type": "Question",
      name: "My PDF requires a password to open. Can I remove that restriction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — not without the correct password. If a PDF requires a password before it will display (a user password), the content is AES-encrypted. No browser-based tool can read or modify the content without the decryption key, which is derived from the correct password. The SammaPix PDF Unlock tool detects user-password PDFs immediately and tells you honestly. It does not show a fake progress bar or pretend to process the file. If you know the password, open the PDF in Adobe Reader or Preview using that password, then use File > Save As or Export to save a copy without encryption.",
      },
    },
    {
      "@type": "Question",
      name: "Will removing restrictions change the appearance or content of my PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pdf-lib removes restrictions by rewriting only the permission flags in the PDF's encryption dictionary. The page content streams — which contain text, vector graphics, images, fonts, links, and form fields — are not touched at all. After removal, the PDF looks identical to the original, text remains selectable and searchable, images are at their original quality, file size is essentially unchanged, and all links and form fields continue to work. The only change is that PDF viewers no longer see the restriction flags and allow printing, copying, and editing.",
      },
    },
    {
      "@type": "Question",
      name: "Why is 'print' grayed out in Adobe Reader / Chrome PDF viewer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adobe Reader and Chrome's built-in PDF viewer are both compliant PDF viewers — they respect the permission flags set in the file. When the printing flag is set to 'not allowed', these viewers gray out the Print button as instructed. This is different from software like some third-party PDF editors or older tools that ignore permission flags entirely. The restriction is a flag in the file, not a feature of the viewer. Remove the flag using SammaPix PDF Unlock (or another pdf-lib-based tool), and the same viewers that were blocking printing will show the Print button normally because the flag is no longer present.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to remove restrictions from any PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool works on any PDF that opens without requiring a password and has owner-password restrictions applied. This covers the vast majority of 'locked' PDFs that people encounter in everyday use — government forms, e-signature outputs, automated document exports, and corporate PDFs. The tool cannot process PDFs that require a password to open (user password). It also cannot guarantee results on PDFs with non-standard or malformed encryption dictionaries, though it will report an error in those cases rather than producing a broken file.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a way to confirm the restrictions were successfully removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After downloading the unlocked PDF, open it in Adobe Reader. Go to File > Properties > Security. The 'Security Method' field should now say 'No Security' or equivalent, and the list of permissions (Printing, Copying, etc.) should all show 'Allowed'. In Chrome, open the PDF and try Ctrl+P (or Cmd+P) — the print dialog should now appear. In macOS Preview, try selecting text and copying — it should work. In Adobe Acrobat, try the Edit PDF tool — it should be accessible. These are the practical checks that confirm the restrictions are gone.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from just printing to a new PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Printing to a new PDF (using a virtual PDF printer like 'Print to PDF' in Chrome or macOS) rasterizes the document — each page is rendered as an image and embedded in the new PDF. This means text is no longer selectable, the file size often increases significantly, and quality can degrade, especially for sharp text. The SammaPix PDF Unlock approach is fundamentally different: it removes the restriction flags from the original PDF without re-rendering anything. Text stays selectable, quality is preserved, file size is unchanged, and the PDF retains all its original structure. The only change is the removal of the permission flags.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RemovePdfPasswordRestrictionsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="remove-pdf-password-restrictions"
        description="Your PDF opens fine but printing is disabled, copying does nothing, or editing is blocked. This is the owner-password restriction system — and it can be removed entirely in your browser. Here is how it works, why it happens, and the honest distinction between what is removable and what is not."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "why-pdf-printing-disabled", title: "Why your PDF printing or copying is disabled" },
          { id: "owner-vs-user-password", title: "Owner password vs user password: the exact technical difference" },
          { id: "the-permission-flags", title: "The PDF permission flags: what each one controls" },
          { id: "how-restrictions-are-removed", title: "How restrictions are removed in-browser with pdf-lib" },
          { id: "step-by-step", title: "How to remove PDF printing and copying restrictions, step by step" },
          { id: "printing-to-pdf-vs-unlocking", title: "Printing to a new PDF vs unlocking: which is better?" },
          { id: "what-you-cannot-do", title: "What you cannot do: user-password encryption is not bypassable" },
          { id: "verify-removal", title: "How to verify the restrictions were successfully removed" },
          { id: "related-pdf-tools", title: "Other PDF tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A PDF that opens without any password but blocks printing or copying has owner-password restrictions. These are permission flags in the file — not encryption. They can be removed in-browser.",
          "A PDF that requires a password to open has user-password encryption (AES). The content is encrypted and cannot be accessed without the correct password. No tool can bypass this.",
          "The SammaPix PDF Unlock tool removes owner-password restrictions using pdf-lib. No upload, no server, no signup. File never leaves your device.",
          "Removing restrictions does not touch the content. Text stays selectable, images stay at original quality, file size is unchanged.",
          "The honest limitation: if your PDF requires a password to open, the tool tells you immediately and does not pretend to process it.",
          "Unlocking via pdf-lib is fundamentally better than printing to a new PDF — which rasterizes the document and destroys text selectability.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4065626/pexels-photo-4065626.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person frustrated at a laptop screen showing a PDF with disabled print and copy options, representing the owner-password restriction problem."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A PDF that blocks printing or copying but opens without a password has owner-password restrictions — removable in your browser.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Enable PDF printing and copying now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix PDF Unlock removes printing, copying, and editing restrictions from PDFs that open without a
              password. Runs entirely in your browser via pdf-lib. Honest about user-password limits.
              Free, no signup.
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
                href="/tools/pdf-split"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Split PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: Why printing is disabled ───────────────────────── */}

        <h2 id="why-pdf-printing-disabled" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your PDF printing or copying is disabled
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You open a PDF. It displays perfectly — every page, every image, every line of text. But when you press Ctrl+P (or Cmd+P), nothing happens, or a message says printing is not allowed. You try to select a paragraph to copy it. The text refuses to highlight. You open it in Acrobat to add a comment. The editing tools are grayed out.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The confusing part: you never entered a password to open this PDF. There was no lock icon, no password prompt. So why are these basic functions blocked?
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The answer is the PDF specification&apos;s owner-password system. The creator of the PDF used a tool that set an owner password and applied permission restrictions. The owner password does not encrypt the file — you can read it freely — but it instructs compliant PDF viewers (Adobe Reader, Chrome, Preview) to block specific actions. The viewer is following instructions embedded in the file.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because the content is not actually encrypted, those instructions — the permission flags — can be removed. And{" "}
          <Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">SammaPix PDF Unlock</Link>{" "}
          does exactly that, entirely in your browser, with no file upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The most common sources of restricted PDFs
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Government portals and official documents.</strong> Tax letters, benefit statements, official certificates, and visa-related PDFs often come with printing restrictions applied by the backend system.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">E-signature platforms.</strong> Adobe Sign, DocuSign, and similar services lock the final signed document to prevent post-signature modification. A useful integrity measure, but an inconvenience when you need to print your own copy.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Invoicing and accounting software.</strong> Some SaaS tools apply owner-password restrictions to exported invoices as a default setting, often without the user knowing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Corporate and educational document distribution.</strong> IT-managed documents, LMS exports, and HR system outputs sometimes apply copying restrictions to limit content extraction.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PDFs you created yourself.</strong> Some PDF export settings in Word, LibreOffice, and other applications can apply restrictions without a clear option to disable them.
          </li>
        </ul>

        {/* ── Section 2: Owner vs user password ─────────────────────────── */}

        <h2 id="owner-vs-user-password" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Owner password vs user password: the exact technical difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification (ISO 32000) defines two distinct password types. Understanding the difference is the key to understanding what is removable and what is not.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          User password — open password — document-open password
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The user password encrypts the actual content of the PDF using AES-128 or AES-256 (depending on the PDF version). When a user password is set, the file binary is fully encrypted. Opening the PDF in any viewer requires typing the correct password, which is used as a key to decrypt the content. Without the correct password, there is nothing readable in the file — only encrypted bytes.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No browser-based tool — and no legitimate online tool — can bypass this without the correct password. If a service claims to unlock a user-password PDF without a password, it is either running a server-side brute-force attack against your file (uploading it to crack it), or it is simply not working and producing a broken output.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Owner password — permissions password — restrictions password
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The owner password works completely differently. It does not encrypt the content — the PDF bytes remain readable and accessible. What the owner password does is set a permissions integer in the PDF&apos;s encryption dictionary. This integer&apos;s individual bits control whether specific actions are allowed or denied.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A conforming PDF viewer reads this permissions integer and adjusts its UI accordingly — graying out Print, disabling text selection, locking the edit tools. But because the underlying content is accessible, pdf-lib can read the entire PDF, rewrite the encryption dictionary with all permission bits set to allowed, and produce a new PDF file that viewers treat as unrestricted.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Password type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Encrypts content?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">PDF opens without password?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Can be removed in-browser?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">User password (open/view)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — AES-128 or AES-256</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — password required before viewing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — requires the correct password</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Owner password (permissions/restrictions)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — only sets permission flags</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — opens freely</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — pdf-lib rewrites the permission flags</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: Permission flags ────────────────────────────────── */}

        <h2 id="the-permission-flags" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The PDF permission flags: what each one controls
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The PDF specification defines the permissions integer as a 32-bit value. Different bits control different capabilities. Here are the flags that matter in practice:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Permission flag</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it controls</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">User-visible effect when blocked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Print (bit 3)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether the document can be printed at all</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Print button grayed out or disabled in Adobe Reader, Chrome, Preview</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Print high-quality (bit 12)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether high-resolution printing is allowed (vs degraded quality only)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Printing allowed but output is lower quality than the file's actual resolution</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Copy text and images (bit 5)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether text can be selected, copied, or extracted</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Text selection does nothing; Ctrl+C copies nothing; PDF-to-text extraction is blocked</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Modify (bit 4)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether the document can be modified (except form filling and annotations if those bits are set)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Edit PDF tools in Acrobat are grayed out; page reordering and deletion are blocked</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Annotations and form filling (bits 6, 9)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether comments, highlights, and form inputs are allowed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Commenting and form tools are disabled; form fields may be read-only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Accessibility copy (bit 10)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Whether assistive technology (screen readers) can access text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Screen readers cannot read the document aloud, even though it visually displays</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Unlock removes all of these restrictions simultaneously by rewriting the permissions integer to set all bits to allowed. You do not need to choose which restrictions to remove — the tool clears all of them in one step.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Enable printing and copying on your PDF now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Works on PDFs that open without a password. Removes all permission restrictions in one click.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/pdf-unlock"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open PDF Unlock, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: How restrictions are removed ────────────────────── */}

        <h2 id="how-restrictions-are-removed" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How restrictions are removed in-browser with pdf-lib
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The technical process that makes in-browser restriction removal possible relies on one key fact: the owner-password system in the PDF specification was never designed as strong content protection. It was designed as a set of usage instructions communicated to compliant viewers. The PDF specification itself acknowledges that the security of this system depends on viewers choosing to enforce it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what pdf-lib does when removing restrictions:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Parses the PDF binary structure.</strong> pdf-lib reads the PDF cross-reference table to locate all objects in the file, including the encryption dictionary (the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/Encrypt</code> object).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Reads the permission flags.</strong> Inside the encryption dictionary, the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/P</code> entry contains the 32-bit permissions integer. pdf-lib reads this value and determines which flags are currently set.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rewrites the PDF without the encryption dictionary.</strong> pdf-lib produces a new PDF object tree in which the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/Encrypt</code> entry is removed from the document&apos;s trailer dictionary. Without an encryption dictionary, the PDF is treated as having no security policy by any compliant viewer.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The page content streams are not touched.</strong> All text, fonts, images, vector graphics, links, and form fields are copied as-is from the original PDF to the output. No re-rendering, no re-encoding, no quality loss.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is a clean, unrestricted PDF.</strong> The output PDF has no encryption dictionary. Any viewer that opens it sees a document with no security policy and enables all actions — printing, copying, editing — by default.
          </li>
        </ol>

        {/* ── Section 5: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to remove PDF printing and copying restrictions, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm your PDF opens without a password.</strong> Try opening it in Chrome or Preview. If it displays without asking for a password, you have an owner-password restriction — the tool can help. If it asks for a password to open, you have user-password encryption — enter the password in your viewer, then export a copy without encryption from that viewer.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/pdf-unlock</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF onto the dropzone.</strong> The tool reads the file in browser memory and displays the detected restrictions. You will see exactly which permissions are currently blocked.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Remove Restrictions.</strong> pdf-lib processes the PDF in your browser. The content is not modified. Processing completes in a few seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the unlocked PDF.</strong> Click Download. The file is served from browser memory as a Blob. No network request occurs. Open it in Adobe Reader or Chrome — printing, copying, and editing are now enabled.
          </li>
        </ol>

        {/* ── Section 6: Printing to PDF vs unlocking ────────────────────── */}

        <h2 id="printing-to-pdf-vs-unlocking" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Printing to a new PDF vs unlocking: which is better?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A common workaround people try before finding a proper unlock tool is to open the PDF in Chrome or Preview and use &quot;Print to PDF&quot; to create a new unrestricted copy. This workaround sometimes works around the printing restriction, but it has significant downsides compared to proper restriction removal:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Text selectable?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality preserved?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">File size</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Links active?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Print to PDF (Chrome, Preview)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often no — pages are rasterized to images</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Reduced — JPEG compression artifacts on text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often much larger</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — links become images</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SammaPix PDF Unlock (pdf-lib)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — content is unchanged</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Identical to original</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Essentially unchanged</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — structure preserved</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The print-to-PDF approach rasterizes the document — it takes screenshots of each page and assembles them into a new PDF. Text becomes part of an image. Fonts are gone. Links are gone. The resulting file is often larger and lower quality than the original. This is why proper restriction removal with pdf-lib is the right approach: it produces an identical output with the permission flags stripped, nothing more.
        </p>

        {/* ── Section 7: What you cannot do ─────────────────────────────── */}

        <h2 id="what-you-cannot-do" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What you cannot do: user-password encryption is not bypassable
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix PDF Unlock tool is honest about its limits, which is the single most important thing to look for in any security tool. Here is exactly what it cannot do:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cannot unlock a PDF that requires a password to open
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the PDF asks for a password before displaying, the content is AES-encrypted. pdf-lib cannot read the encrypted content without the correct password — it is just unreadable bytes. The tool detects this immediately and tells you clearly: &quot;This PDF requires a password to open. Enter the password in your PDF viewer to access it.&quot; No fake progress bar. No misleading output.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cannot crack or brute-force passwords
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool does not attempt dictionary attacks, brute-force, or any form of password cracking. These techniques require server-side computation and would mean uploading your file somewhere. The tool operates entirely in-browser and makes no such attempts.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What to do if your PDF needs a password to open
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you know the password, open the PDF in Adobe Reader or macOS Preview using the password. Then use File → Export as PDF (or Save As, without the password) to create an unencrypted copy. If you have forgotten the password to your own PDF, you need a dedicated password recovery tool — not a restriction remover.
        </p>

        {/* ── Section 8: Verify removal ──────────────────────────────────── */}

        <h2 id="verify-removal" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify the restrictions were successfully removed
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After downloading the unlocked PDF, use these checks to confirm the restrictions are gone:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          In Adobe Reader
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Open the unlocked PDF in Adobe Reader.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Go to File → Properties → Security tab.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Security Method should read &quot;No Security&quot;.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">All Document Restrictions should show &quot;Allowed&quot;.</li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          In Chrome
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Open the PDF in Chrome. Press Ctrl+P (Windows/Linux) or Cmd+P (Mac). The print dialog should appear normally. Try selecting text — it should highlight and be copyable with Ctrl+C.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          In macOS Preview
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Open in Preview and try File → Print. If the dialog opens without error, printing is allowed. Try selecting a paragraph of text. If you can highlight and copy it, the copying restriction has been removed.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your PDF stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Removes all owner-password restrictions in one click.
            Text stays selectable. File size unchanged. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/pdf-unlock"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open PDF Unlock, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/unlock-pdf-online-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Unlock PDF guide (no upload) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related PDF tools ─────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other PDF tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based PDF tools. All run locally with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-unlock" className="text-[#6366F1] hover:underline">PDF Unlock</Link></strong>: remove printing, copying, and editing restrictions from PDFs that open without a password. See the overview guide at{" "}
            <Link href="/blog/unlock-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Unlock a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce file size by rasterizing and re-encoding page images. Best for scanned documents. See the full guide at{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF online without uploading it</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-split" className="text-[#6366F1] hover:underline">PDF Split</Link></strong>: extract specific pages or split a document into individual PDFs. After unlocking a restricted PDF, split out only the pages you need.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine multiple PDFs into one. Useful for reassembling split pages after unlocking.
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
            All tools run locally in your browser via pdf-lib and pdf.js. No server. No signup. No watermark.
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
