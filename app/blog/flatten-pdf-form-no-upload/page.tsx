import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Flatten a PDF Form (No Upload) [2026]",
  description:
    "Flatten a fillable PDF form entirely in your browser — no upload, no server, no signup. pdf-lib form.flatten() locks all form fields permanently. Fields appear identical on every PDF reader. Flatten vs print-to-PDF explained. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/flatten-pdf-form-no-upload`,
  },
  keywords: [
    "flatten pdf form",
    "flatten fillable pdf",
    "lock pdf form fields",
    "flatten pdf form no upload",
    "make pdf form non-editable",
    "flatten pdf form fields online",
    "flatten fillable pdf online free",
    "lock fillable pdf fields",
    "how to flatten a pdf form",
    "pdf flatten form fields browser",
  ],
  openGraph: {
    title: "How to Flatten a PDF Form (No Upload) [2026]",
    description:
      "Lock all form fields in a fillable PDF by flattening — in your browser, no upload. pdf-lib form.flatten() makes field values permanent and identical on every PDF reader. Vector quality kept. Free.",
    url: `${APP_URL}/blog/flatten-pdf-form-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Flatten a PDF Form (No Upload) [2026]",
    description:
      "Flatten a PDF form in your browser. pdf-lib form.flatten() — no upload, no server. Fields become permanent. Looks identical everywhere. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/flatten-pdf-form-no-upload`;
const POST_TITLE = "How to Flatten a PDF Form (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "When you submit a filled PDF form, the recipient can still modify every field, clear your answers, or change your data. Flattening the form locks all fields permanently by converting them into static page content using pdf-lib form.flatten(). This guide covers the practical workflow for flattening a PDF form without uploading it to any server, why flattened forms look identical on every PDF reader while unflatted forms do not, the difference between flatten and print-to-PDF, and how to verify the process runs entirely in your browser.",
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
    "flatten pdf form",
    "flatten fillable pdf",
    "lock pdf form fields",
    "make pdf form non-editable",
    "flatten pdf form fields online",
    "how to flatten a pdf form",
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
  name: "How to Flatten a PDF Form Without Uploading It",
  description:
    "Lock all form fields in a fillable PDF by flattening it in your browser using SammaPix Flatten PDF. Powered by pdf-lib form.flatten(). No upload, no server, no signup. Fields become permanent, identical on every PDF reader.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Flatten PDF (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Fill in all fields in the PDF form",
      text: "Before flattening, complete all fields in your fillable PDF. Flattening converts the current state of every field into permanent content. Empty fields in the original become empty content in the flattened output.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the Flatten PDF tool",
      text: "Go to sammapix.com/tools/flatten-pdf in any modern browser (Chrome, Firefox, Safari, Edge). No account or signup is required.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Drop your filled PDF",
      text: "Drag the PDF onto the dropzone or click to browse your device. The file is loaded from your local storage into browser memory using the FileReader API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Flatten PDF",
      text: "pdf-lib calls form.flatten() on the document. Each field's current visual appearance is rendered into the underlying page content stream. All widget annotation objects are then removed from the document. The form layer no longer exists in the output file.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download and verify the result",
      text: "Download the flattened PDF. Open it in any PDF reader — the content looks identical to the filled form, but no field is clickable or editable. The form looks the same in Adobe Acrobat, Chrome, Preview, and every other PDF viewer because the rendering inconsistency introduced by the form layer has been eliminated.",
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
      name: "Why does my filled PDF look different on different computers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fillable PDF forms contain an interactive layer (called an AcroForm) that each PDF reader renders independently using its own engine. Adobe Acrobat, Chrome's built-in PDF viewer, Apple Preview, and mobile PDF apps all handle form field rendering differently — font substitution, text alignment, line spacing, and color can all vary. The form values you typed appear as they do because each reader is interpreting field appearance streams with its own logic. When you flatten the form, the current visual appearance of every field is embedded directly into the page content — the same content that every reader renders identically. After flattening, the form looks exactly the same in every PDF reader, on every device, every time.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a difference between flattening a PDF form and locking it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Locking a PDF form (via owner-password permissions or the form's Lock field setting) tells PDF readers to disable editing of the form fields, but the form structure still exists in the file. A PDF reader that ignores permission flags — or a PDF editor like Ghostscript — can still access and modify the fields. Flattening is structurally different: form.flatten() physically removes the form layer from the PDF. There are no fields left to lock, edit, or unlock. The form values exist only as regular page content. Flattening provides structural permanence that locking cannot. For the highest level of protection, you can flatten the form first (to structurally lock the content) and then add a password with SammaPix PDF Protect (to restrict who can open the document at all).",
      },
    },
    {
      "@type": "Question",
      name: "How do I flatten a PDF form without Adobe Acrobat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The official method in Adobe Acrobat Pro is to use the Print Production panel and select Flattener Preview, or to use the Flatten PDF button in the Tools panel (Acrobat Pro, not free Reader). Without Acrobat, the cleanest alternative is a browser-based tool that uses pdf-lib, such as SammaPix Flatten PDF at sammapix.com/tools/flatten-pdf. Drop in your filled PDF, click Flatten PDF, and download the result. The process uses pdf-lib's form.flatten() method, which implements the same PDF specification operation that Acrobat Pro uses. No software installation is required, and no file upload is needed — the entire process runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I flatten a PDF form before emailing it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you email a filled PDF form that still has interactive fields, the recipient can modify any field value before printing, forwarding, or filing the document. This creates a risk in any workflow where the integrity of your submitted data matters — job applications, rental forms, government documents, contracts, insurance claims, and similar forms. Flattening converts all field values into permanent content that cannot be altered without visually obvious document editing. The recipient sees exactly what you submitted. Additionally, some email security gateways and document management systems flag PDFs with active form fields as potentially risky attachments. A flattened PDF passes these filters cleanly because it contains no interactive elements.",
      },
    },
    {
      "@type": "Question",
      name: "Does flattening a PDF form preserve the quality of typed text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and this is one of the key advantages of flattening over printing to PDF. When pdf-lib flattens a form, it embeds the text from each field directly into the page content stream using the same font information that the form field used. The text remains vector-based, meaning it is sharp at any zoom level and any print resolution. The text is also still selectable and copy-paste friendly — you can highlight and copy text from a flattened PDF just as you would from any regular PDF document. This is fundamentally different from printing to PDF, which converts every page into a raster image at a fixed resolution, making text non-selectable and reducing its sharpness at high zoom levels.",
      },
    },
    {
      "@type": "Question",
      name: "Can I flatten a PDF form that I filled in my browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you filled a PDF form using your browser's built-in PDF viewer (Chrome, Firefox, Safari) and downloaded the result, you can drop that downloaded PDF into SammaPix Flatten PDF and flatten it. The key is that the PDF you drop in must already contain your filled-in values — the values you entered must have been saved into the file when you downloaded it. Most modern browser PDF viewers save field values when you download. If you are unsure, open the downloaded PDF in a second PDF reader and verify that your values appear before proceeding to flatten.",
      },
    },
    {
      "@type": "Question",
      name: "What types of PDF forms can be flattened?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "pdf-lib can flatten AcroForm-based PDF forms, which is the standard interactive form architecture defined in the PDF specification (ISO 32000) and used by Adobe Acrobat, most PDF creation tools, and the vast majority of fillable PDF forms in government, HR, legal, and financial workflows. There is one important exception: XFA forms. XFA (XML Forms Architecture) is a different, non-standard form system developed by Adobe and used in some older Acrobat-specific forms. XFA forms are not part of the core PDF specification and are not supported by pdf-lib. If you flatten an XFA-based PDF and get zero fields flattened, your form likely uses XFA. You can check by opening the PDF in Adobe Acrobat Reader and looking for an XFA indicator in the form properties. For XFA forms, you need Adobe Acrobat Pro or a specialized XFA-to-AcroForm conversion tool.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FlattenPdfFormNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="flatten-pdf-form-no-upload"
        description="You filled in a PDF form and are about to send it. The problem: the recipient can still click into every field, modify your answers, clear your data, or change what you signed. Flattening the form locks all fields permanently — by converting their values into static page content that cannot be changed. And because the interactive rendering layer is removed, the form looks identical on every PDF reader, on every device. SammaPix Flatten PDF does this entirely in your browser via pdf-lib. No upload, no server, no signup."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "the-form-consistency-problem", title: "The problem: filled forms look different on different PDF readers" },
          { id: "why-flatten-not-lock", title: "Why you should flatten, not just lock, a PDF form" },
          { id: "flatten-vs-print-pdf", title: "Flatten vs print to PDF: the quality difference" },
          { id: "workflow-fill-then-flatten", title: "The right workflow: fill, then flatten, then send" },
          { id: "how-pdf-lib-flattens", title: "How pdf-lib form.flatten() works" },
          { id: "step-by-step", title: "How to flatten a PDF form without uploading it, step by step" },
          { id: "what-to-do-after", title: "What to do with a flattened PDF: compress, watermark, sign, protect" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "xfa-vs-acroform", title: "AcroForm vs XFA forms: what pdf-lib can and cannot flatten" },
          { id: "related-pdf-tools", title: "Other browser-based PDF tools for your workflow" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Fillable PDF forms look different on different PDF readers because each viewer renders form fields with its own engine. Flattening removes this inconsistency by embedding field values directly into page content.",
          "Flattening is structurally different from locking: flattening removes the form layer entirely via pdf-lib form.flatten(). Locking only tells readers to disable editing — the form structure remains and can be bypassed.",
          "Flattened forms preserve vector quality: text stays selectable, searchable, and sharp at any zoom level. Printing to PDF produces rasterized images instead.",
          "SammaPix Flatten PDF runs entirely in your browser. Your filled form — which may contain personal data — never leaves your device.",
          "The tool handles the no-form-fields case honestly: zero fields found means zero fields flattened. No silent rasterization fallback.",
          "pdf-lib supports AcroForm-based forms (the standard). XFA forms are a different system and are not supported.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person working on an official document form at a desk, representing the workflow of filling and then flattening a PDF form before submission."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A filled PDF form sent without flattening can still be edited by the recipient. Flattening locks the values permanently before you send.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Flatten your PDF form right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              pdf-lib form.flatten() in your browser. All field values become permanent static content. Form looks
              identical on every PDF reader. No upload, no server, no signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/flatten-pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Flatten PDF, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-sign"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Sign PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: The form consistency problem ────────────────────── */}

        <h2 id="the-form-consistency-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: filled forms look different on different PDF readers
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You fill in a PDF form — a job application, a government document, an insurance claim — and send it. The recipient opens it in Adobe Acrobat and some text looks slightly off: a different font, a different size, text that overflows the field box. Or they open it in Chrome&apos;s built-in viewer and a dropdown value shows blank instead of the option you selected. Or they print it and the checkbox that you checked appears unchecked on paper.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a glitch. It is a fundamental property of how fillable PDF forms work. Each PDF reader has its own engine for rendering form field values. The PDF specification defines how fields should look, but leaves significant room for interpretation in areas like font fallback, field border rendering, and appearance stream generation. Adobe Acrobat, Chrome&apos;s PDF engine, Apple Preview, Foxit, and mobile PDF apps all make different rendering decisions.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you flatten the form using pdf-lib&apos;s{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">form.flatten()</code>{" "}
          method, the current visual appearance of every field — exactly as it looks in the PDF reader you used to fill it — is embedded directly into the page content stream. The form layer is removed. From that point forward, every PDF reader renders the page identically, because there are no form fields left to interpret. The document looks the same in Adobe Acrobat, Chrome, Preview, and every mobile PDF app, on every device, every time.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why this matters for submitted documents
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Beyond the visual consistency issue, an unflattened form has a more serious problem: the recipient can edit it. Every text field, checkbox, and dropdown in a PDF form is interactive by default. The recipient can click into any field, change the value, and forward or print the modified document. In many workflows — government applications, HR forms, legal documents, contracts — the integrity of the submitted data is critical. Flattening eliminates the risk by making modification impossible without visibly destructive editing.
        </p>

        {/* ── Section 2: Why flatten not lock ───────────────────────────── */}

        <h2 id="why-flatten-not-lock" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you should flatten, not just lock, a PDF form
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Locking a PDF form sounds like the right approach — and it is something Adobe Acrobat supports. But locking a form and flattening a form are fundamentally different operations, with different security implications.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you lock a PDF form (using owner-password permissions, or by setting the form&apos;s ReadOnly flag), you are telling PDF readers to disable editing of the form fields. The form structure — all the field definitions, their values, and the AcroForm metadata — is still present in the file. A PDF reader that ignores permission flags (this is technically allowed and many tools do it) can still access and modify the fields. Any PDF editor with write access can bypass this.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you flatten a form with{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">form.flatten()</code>{" "}
          , there are no fields left to lock, access, or bypass. The form layer has been physically removed from the PDF structure. The values exist only as ordinary page content — the same kind of content as any other text in the document. A recipient cannot edit the content without using a full-page editing tool that visibly alters the document (which produces obvious signs of tampering visible to anyone comparing the original and the edited version).
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Form layer present?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Bypassable?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rendering consistent?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unflatted, unprotected</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fully editable by anyone</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — varies by reader</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Locked (permissions)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — fields still exist</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bypassable by tools that ignore flags</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-yellow-700 dark:text-yellow-400">Still varies — fields still rendered by each reader</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Flattened (pdf-lib)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — layer removed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No fields to bypass — only page content</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — identical on every reader</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Flattened + password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">AES-256 controls access to the file entirely</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — and only accessible with password</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: Flatten vs print to PDF ───────────────────────── */}

        <h2 id="flatten-vs-print-pdf" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Flatten vs print to PDF: the quality difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common workaround people use when they do not have a flatten tool is to print the PDF to a new PDF using the operating system&apos;s print dialog. This does produce a non-interactive document, but with a significant quality cost that matters in many submission contexts.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Printing to PDF rasterizes the document. Every page is converted into a high-resolution image — typically at 150 to 300 DPI depending on your print driver settings. The output contains no real text: it is a collection of images that look like pages. The text in those images is not selectable, not searchable, and not accessible to screen readers. If the recipient&apos;s HR system or document management platform tries to extract text from the PDF (for keyword search, compliance logging, or automatic data entry), it will find nothing — because there is no text, only pixels.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Flattening via pdf-lib preserves the full vector structure of the document. Text remains as real PDF text content. Fonts stay embedded. Images stay as embedded images at their original quality. The document is smaller than a print-to-PDF equivalent, fully searchable, and accessible to both humans and software that processes PDFs programmatically.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When printing to PDF is still acceptable
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the only goal is to produce a printable hardcopy and you do not care about searchability or machine-readability, printing to PDF is fine. For archival purposes where you need to guarantee the visual appearance survives long-term without software dependencies, printing to PDF (at high DPI) also has merit. But for digital submission to any system that processes PDFs programmatically — including most government portals, ATS (Applicant Tracking Systems) in HR, and legal document management platforms — flattening is the correct approach.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Flatten your PDF form — vector quality, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            pdf-lib form.flatten() in the browser. Text stays selectable and searchable. Fields permanently embedded.
            Looks identical on every reader. No upload, no signup. Free.
          </p>
          <Link
            href="/tools/flatten-pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Flatten PDF, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Workflow fill then flatten ─────────────────────── */}

        <h2 id="workflow-fill-then-flatten" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The right workflow: fill, then flatten, then send
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the complete recommended sequence for any fillable PDF that needs to be submitted:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fill the form completely in any PDF reader.</strong> Use Adobe Acrobat Reader (free), your browser&apos;s built-in PDF viewer, or any application that allows form field editing. Complete every field before proceeding. Once flattened, values cannot be changed without destructive editing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Save a backup of the filled (unflatted) PDF.</strong> Flattening is irreversible. Before flattening, save a copy of the filled form that still has interactive fields. If you need to change any value later (corrections, errors discovered after submission), you will need the original fillable version.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Flatten the form at sammapix.com/tools/flatten-pdf.</strong> Drop the filled PDF, click Flatten PDF, download the result. Confirm the field count matches expectations.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Optionally add a signature.</strong> If the form requires your visual signature and you have not already added it to a signature field, use{" "}
            <Link href="/tools/pdf-sign" className="text-[#6366F1] hover:underline">SammaPix PDF Sign</Link>{" "}
            to add a drawn or image signature to the flattened document. See{" "}
            <Link href="/blog/sign-pdf-online-free" className="text-[#6366F1] hover:underline">Sign a PDF Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Optionally compress before sending.</strong> Flattened PDFs are typically similar in size to the original. If file size is a concern for email attachments or upload limits, use{" "}
            <Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">SammaPix PDF Compress</Link>{" "}
            to reduce the file size. See{" "}
            <Link href="/blog/reduce-pdf-file-size-for-email" className="text-[#6366F1] hover:underline">How to Reduce PDF File Size for Email</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Send the flattened PDF.</strong> The recipient cannot edit any field. The form looks identical in any PDF reader. Your submitted data is permanent.
          </li>
        </ol>

        {/* ── Section 5: How pdf-lib flattens ───────────────────────────── */}

        <h2 id="how-pdf-lib-flattens" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How pdf-lib form.flatten() works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the technical mechanism helps you know exactly what happens to your document and what to expect in the output. Here is what{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">pdf-lib</a>&apos;s{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">PDFForm.flatten()</code>{" "}
          does in sequence:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Reads the AcroForm dictionary.</strong> pdf-lib locates the document&apos;s AcroForm entry in the catalog dictionary and enumerates all form fields — their names, types, values, and widget annotation references.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Resolves each field&apos;s appearance stream.</strong> For each field widget, pdf-lib resolves the appearance stream (the /AP entry) that defines how the field currently looks — the checked/unchecked state of checkboxes, the text content of text fields, the selected option of dropdowns. If a field has a custom appearance stream, that is used. If not, pdf-lib generates a default one.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Appends the appearance to the page content.</strong> The appearance stream graphics instructions are appended to the page&apos;s content stream at the position occupied by the field widget. This embeds the visual rendering of the field value directly into the page.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Removes the widget annotation.</strong> The field&apos;s widget annotation object is removed from the page&apos;s annotation array and from the document object table. The field definition in the AcroForm is also removed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Clears the AcroForm dictionary.</strong> After all fields are processed, the AcroForm dictionary is cleared. The document no longer has an interactive form layer. Any PDF reader that opens the document will find no fields to render.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process runs in your browser — no server, no upload, no external service. The{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          loads your PDF into browser memory, pdf-lib processes it in JavaScript, and the result is offered as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL download. Your original file is never modified and nothing leaves your device.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to flatten a PDF form without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The complete process takes under two minutes, including verification:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm your PDF is fully filled.</strong> Open the PDF in your usual viewer and verify that every required field has a value. After flattening, you cannot change any field without starting over from the original.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/flatten-pdf</strong> in Chrome, Firefox, Safari, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your filled PDF onto the dropzone</strong> or click to browse. The file is loaded into browser memory. Nothing is sent to any server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Flatten PDF.</strong> pdf-lib processes all pages and all form fields. The tool shows the count of fields flattened. Processing is typically under one second for standard forms.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the flattened PDF.</strong> Click Download. The file is served from browser memory via a blob URL. No network request occurs. Your original PDF is unchanged.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify the result in a different PDF reader.</strong> If you filled the form in Chrome, open the flattened PDF in Adobe Acrobat Reader or Preview. Click where form fields used to be — nothing should be interactive. Check that the values appear identical to what you filled in. If you use Ctrl+F (Find), confirm the text in the former fields is searchable.
          </li>
        </ol>

        {/* ── Section 7: What to do after flattening ────────────────────── */}

        <h2 id="what-to-do-after" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do with a flattened PDF: compress, watermark, sign, protect
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A flattened PDF is the right base for several downstream operations. Here is when to apply each, in the recommended order:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Flatten first, then sign.</strong> If the form has a signature field and you used{" "}
            <Link href="/tools/pdf-sign" className="text-[#6366F1] hover:underline">PDF Sign</Link>{" "}
            to add a visual signature to that field, the signature is embedded as part of the field. Flattening will incorporate that visual signature into the page content. If you want to add a visual signature after flattening (on a specific page location), use PDF Sign on the flattened document.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Flatten first, then watermark.</strong> Adding a watermark (CONFIDENTIAL, DRAFT, your name) to a flattened PDF produces cleaner layer ordering than watermarking an unflattened form. Use{" "}
            <Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">PDF Watermark</Link>{" "}
            for this. See{" "}
            <Link href="/blog/add-watermark-to-pdf-online" className="text-[#6366F1] hover:underline">Add a Watermark to a PDF Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Flatten first, then add a password.</strong> If the flattened form contains sensitive personal data and you want to restrict who can open it, add an AES-256 open password using{" "}
            <Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link>. Flatten first so that the encrypted content is the static page content, not the interactive form. See{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password Protect a PDF Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Compress before emailing.</strong> If the flattened PDF is still large (forms with many image-heavy pages can be), compress it before sending. See{" "}
            <Link href="/blog/compress-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Compress a PDF Online Without Uploading It</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Start the workflow: flatten your PDF form</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload. Vector quality. Form layer removed permanently. Consistent appearance on every PDF reader.
            Free, no account required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/flatten-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Flatten PDF, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/flatten-pdf-online-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              What does flatten mean? <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF forms often contain personal information — your name, address, tax ID, medical details, employment history. Before trusting any tool with a filled form, you should be able to verify where your data goes. Here is how to check SammaPix Flatten PDF:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). In Safari, enable Developer Tools in Settings first (Advanced, Show Develop menu).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Clear existing entries with the clear button.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PDF, click Flatten PDF, click Download.</strong> Watch the Network panel during the entire sequence.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Result: zero outgoing requests carry your file.</strong> You will see page asset requests (JavaScript bundle, CSS) when the page loads. During flattening and download, the Network panel shows no POST requests, no uploads, no external calls. The PDF is processed entirely in browser memory and downloaded from there.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Try the same test on any upload-based PDF tool — you will see a large multipart POST request carrying your file bytes to their server. The difference is immediately visible in the Network tab. This applies to iLovePDF, Smallpdf, PDF24, and any other tool that processes PDFs server-side.
        </p>

        {/* ── Section 9: AcroForm vs XFA ────────────────────────────────── */}

        <h2 id="xfa-vs-acroform" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          AcroForm vs XFA forms: what pdf-lib can and cannot flatten
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are two main architectures for interactive forms in PDF files. This distinction matters if you encounter a PDF where the flattening tool reports zero fields found:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Form type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Definition</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Supported by pdf-lib?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common sources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">AcroForm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard PDF form architecture defined in ISO 32000. Fields are PDF annotation objects inside the page structure.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — fully supported</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most government, HR, legal, and business PDF forms. Created with Adobe InDesign, LibreOffice, Microsoft Word export, most online form tools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">XFA (XML Forms Architecture)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Adobe-proprietary XML-based form system. The form is an XML data stream embedded in the PDF. Fields are defined by XML, not by PDF annotation objects.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — not supported</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Older Adobe LiveCycle-generated forms. Some tax authority and financial institution PDFs. Rarely used in new forms (Adobe deprecated XFA in PDF 2.0).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The vast majority of fillable PDFs in circulation use AcroForm. XFA forms are relatively rare and increasingly deprecated — Adobe itself dropped XFA from the PDF 2.0 specification (ISO 32000-2). If you encounter a PDF where zero fields are found and you are confident it is a fillable form, open it in Adobe Acrobat Reader and check: if the form header says &ldquo;This form contains XFA fields&rdquo; or similar, you have an XFA form and will need Adobe Acrobat Pro or a specialized XFA conversion tool.
        </p>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Complete PDF workflow — all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Flatten, sign, watermark, protect, and compress PDFs without uploading them anywhere.
            All tools use pdf-lib locally in your browser. No server. No signup. No watermark on output.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/flatten-pdf"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Flatten PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-sign"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Sign PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-watermark"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Watermark PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-protect"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Protect PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/pdf-compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 10: Related tools ──────────────────────────────────── */}

        <h2 id="related-pdf-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other browser-based PDF tools for your workflow
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a complete PDF toolkit that runs locally in your browser — no upload required for any tool. Here is what fits alongside flattening in common workflows:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/flatten-pdf" className="text-[#6366F1] hover:underline">Flatten PDF</Link></strong>: make all form field values permanent static content. The starting point for this guide.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-sign" className="text-[#6366F1] hover:underline">PDF Sign</Link></strong>: add a visual signature to any page of a PDF — draw it by hand on a canvas or upload a signature image. No upload, no server. See{" "}
            <Link href="/blog/add-signature-to-pdf-no-upload" className="text-[#6366F1] hover:underline">How to Add a Signature to a PDF Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-watermark" className="text-[#6366F1] hover:underline">PDF Watermark</Link></strong>: add CONFIDENTIAL, DRAFT, or a logo to a flattened PDF before sending. See{" "}
            <Link href="/blog/add-watermark-to-pdf-online" className="text-[#6366F1] hover:underline">Add a Watermark to a PDF Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-protect" className="text-[#6366F1] hover:underline">PDF Protect</Link></strong>: add an AES-256 open password to a flattened form to restrict who can open it. See{" "}
            <Link href="/blog/password-protect-pdf-online-no-upload" className="text-[#6366F1] hover:underline">Password Protect a PDF Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">PDF Compress</Link></strong>: reduce the file size of a flattened form before emailing or uploading it to a portal. See{" "}
            <Link href="/blog/reduce-pdf-file-size-for-email" className="text-[#6366F1] hover:underline">How to Reduce PDF File Size for Email</Link>.
          </li>
        </ul>

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
