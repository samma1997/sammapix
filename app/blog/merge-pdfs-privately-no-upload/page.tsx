import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Merge PDFs Privately: No Upload, No Adobe [2026 Guide]",
  description:
    "Most free PDF mergers upload your files to a server. For invoices, contracts, and tax returns that is unacceptable. Here is how to merge PDFs entirely in your browser in 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/merge-pdfs-privately-no-upload`,
  },
  keywords: [
    "merge pdf online",
    "combine pdf files",
    "pdf merger no upload",
    "merge pdf privately",
    "free pdf merger",
    "combine pdfs in browser",
    "ilovepdf alternative",
    "smallpdf alternative",
    "pdf merger privacy",
    "local pdf merge",
  ],
  openGraph: {
    title: "Merge PDFs Privately: No Upload, No Adobe [2026 Guide]",
    description:
      "Most free PDF mergers upload your files. Here is how to combine PDFs entirely in your browser in 2026 — no server, no Adobe, full privacy.",
    url: `${APP_URL}/blog/merge-pdfs-privately-no-upload`,
    type: "article",
    publishedTime: "2026-04-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDFs Privately: No Upload, No Adobe [2026 Guide]",
    description:
      "Merge PDFs 100% in your browser — no upload, no Adobe subscription, no signup.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Merge PDFs Privately: No Upload, No Adobe [2026 Guide]",
  description:
    "A privacy-first guide to combining multiple PDFs into one document — fully in your browser, with open-source pdf-lib, and how the major alternatives handle your files.",
  url: `${APP_URL}/blog/merge-pdfs-privately-no-upload`,
  datePublished: "2026-04-22",
  dateModified: "2026-04-22",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${APP_URL}/blog/merge-pdfs-privately-no-upload`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Merge PDFs Privately: No Upload, No Adobe [2026 Guide]",
      item: `${APP_URL}/blog/merge-pdfs-privately-no-upload`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do most free PDF mergers upload my files to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — most of them. iLovePDF, SmallPDF, PDF24, and the majority of search-top PDF tools route uploads through their servers for processing. They typically claim to delete files within a few hours, but your documents sit on their disks in the meantime. For invoices, contracts, tax returns, or medical records this is a real privacy risk. Browser-based tools like SammaPix PDF Merge run locally via pdf-lib and never transmit your files.",
      },
    },
    {
      "@type": "Question",
      name: "Is merging PDFs in the browser secure for sensitive documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — provably more secure than server-based alternatives for sensitive documents. The merge runs inside your browser tab using the pdf-lib JavaScript library. Your files never leave the tab. Nothing is sent over the network except the initial page load, which is static code with no upload endpoint. You can verify by opening DevTools → Network tab during a merge: zero outbound requests with your PDFs.",
      },
    },
    {
      "@type": "Question",
      name: "How does the pdf-lib library handle encrypted PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix loads PDFs with ignoreEncryption:true which tells pdf-lib to read encrypted-for-viewing PDFs as if they were not encrypted. This works for most office documents that are technically encrypted but do not require a password to open. For password-protected PDFs that genuinely require the password, you must decrypt them first — do not merge PDFs you are not authorized to open.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reorder PDFs before merging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After uploading, drag any row up or down to set the final page order. Remove files you do not need with the trash icon. The merged output follows the on-screen order. Drag-to-reorder works on desktop and mobile.",
      },
    },
    {
      "@type": "Question",
      name: "What is the file size limit for browser-based PDF merge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix PDF Merge accepts up to 100 MB per file, 10 files per batch on the free plan (50 on Pro). The hard limit is your browser memory — on a laptop with 8 GB RAM you can realistically merge 300-500 MB of total PDF content. For larger batches, split the work into chunks or use a desktop tool like PDFsam (open source).",
      },
    },
    {
      "@type": "Question",
      name: "Does the merged PDF preserve bookmarks, form fields, and annotations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Text, images, page layout, and most form fields are preserved cleanly by pdf-lib. Document-level bookmarks from the source PDFs are not always preserved — this is a known limitation of client-side PDF libraries (browsers do not ship a full PDF SDK). For bookmark-heavy workflows use Adobe Acrobat or PDFsam desktop. For invoicing, contract packs, and most office use cases the browser-based merge is perfectly adequate.",
      },
    },
  ],
};

export default function MergePdfsPrivatelyNoUploadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        title="Merge PDFs Privately: No Upload, No Adobe [2026 Guide]"
        slug="merge-pdfs-privately-no-upload"
        description="Every free online PDF merger makes the same unspoken tradeoff: you get the tool for free, and they get your documents routed through their server for a few hours. For invoices, contracts, and tax returns this is unacceptable. Modern browsers can merge PDFs locally — no upload, no Adobe subscription, no signup."
        date="2026-04-22"
        dateFormatted="April 22, 2026"
        tags={["Privacy"]}
        readingTime={9}
        headings={[
          { id: "the-privacy-problem", title: "The privacy problem with online PDF mergers" },
          { id: "how-browser-merge-works", title: "How browser-based PDF merge works" },
          { id: "major-tools-compared", title: "How major PDF tools handle your files" },
          { id: "when-privacy-matters", title: "When PDF privacy matters (the real-world cases)" },
          { id: "encryption-handling", title: "Encrypted and password-protected PDFs" },
          { id: "what-gets-preserved", title: "What gets preserved in the merge" },
          { id: "workflow", title: "The merge workflow step by step" },
          { id: "verify-no-upload", title: "How to verify no upload happened" },
          { id: "alternatives", title: "Offline alternatives if you need desktop" },
          { id: "tools", title: "Free browser-based PDF tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most top-ranked free PDF mergers (iLovePDF, SmallPDF, PDF24) upload your files to their servers — convenient but problematic for sensitive documents.",
          "Browser-based PDF merge via the open-source pdf-lib library runs entirely inside your tab. Nothing is transmitted over the network.",
          "SammaPix PDF Merge supports drag-reorder, up to 10 files per batch (50 on Pro), 100 MB per file, encrypted-for-read PDFs supported.",
          "Text, images, page layout, and form fields are preserved cleanly. Document-level bookmarks are a known limitation of client-side PDF libraries.",
          "Verify the no-upload claim yourself: open DevTools → Network tab during merge and confirm zero outbound requests with your file data.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.pexels.com/photos/955389/pexels-photo-955389.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Stack of legal documents and a laptop, representing PDF privacy and secure document handling"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Sensitive documents deserve tools that never transmit them — merging PDFs in the browser keeps them on your disk. Photo by Pixabay on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Merge PDFs in your browser — no upload, no Adobe
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your PDFs into SammaPix PDF Merge, drag to reorder, download one combined file. Everything
              runs locally via the open-source pdf-lib library. Your documents stay on your device.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools/pdf-merge"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try PDF Merge, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/jpg-to-pdf"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                JPG to PDF <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/pdf-to-image"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                PDF to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ── Privacy problem ────────────────────────────────────────────── */}
        <h2 id="the-privacy-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The privacy problem with online PDF mergers
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Search &ldquo;merge PDF online&rdquo; and the top ten results are all variations of the same architecture:
          you drop files onto a web form, the files POST to a server, a backend process merges them, the result
          comes back as a download link. The UX looks instant. The privacy footprint is not.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every one of those servers holds your documents for at least a few minutes, sometimes hours. Most
          privacy policies promise deletion after 1-2 hours or &ldquo;when processing completes&rdquo;. That is
          probably true for normal traffic. It is not verifiable. It does not help you if a server is compromised
          during the window your file is there. It does not help you if the vendor is subpoenaed. It does not
          help you if the vendor is secretly training a machine learning model on the documents flowing through.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most casual use this is fine. Combining two photos of a grocery receipt — who cares. But PDF is the
          universal format for sensitive documents: invoices with business details, contracts with signatures,
          tax returns, medical records, bank statements, legal filings. Routing these through a third-party
          server violates internal security policies at almost every company. IT usually blocks the usage anyway.
        </p>

        {/* ── How browser merge works ────────────────────────────────────── */}
        <h2 id="how-browser-merge-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based PDF merge works
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern browsers are full application runtimes. They can read files from your disk via the File API,
          parse binary formats in JavaScript, and download the result as a Blob — without ever sending the bytes
          over the network.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Merge uses <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">pdf-lib</a>,
          an open-source PDF manipulation library written in TypeScript. The library implements the PDF
          specification well enough to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Parse a PDF byte stream into a document object (pages, fonts, metadata, content streams).</li>
          <li>Copy pages across documents while preserving shared resources (fonts, images).</li>
          <li>Serialize the merged document back to PDF bytes.</li>
          <li>Return the bytes as a Blob for download.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire operation happens inside your browser tab&apos;s JavaScript sandbox. Open DevTools →
          Network during a merge and you will see zero outbound requests that contain your PDF data. The only
          traffic is the initial page load (static code) and optional analytics pixels that contain no file
          content. Read the tool source yourself if you want certainty —{" "}
          <a href="https://github.com/Hopding/pdf-lib" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            pdf-lib is MIT-licensed on GitHub
          </a>.
        </p>

        {/* ── Major tools compared ───────────────────────────────────────── */}
        <h2 id="major-tools-compared" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How major PDF tools handle your files
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A quick audit of top-ranked PDF mergers in April 2026, based on their published privacy policies and
          visible network traffic during a test merge:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Tool</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Upload?</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Claimed retention</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">iLovePDF</td><td className="py-2 px-4">Yes — server-side</td><td className="py-2 pl-4">&ldquo;A few hours&rdquo;</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">SmallPDF</td><td className="py-2 px-4">Yes — server-side</td><td className="py-2 pl-4">1 hour (policy)</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">PDF24</td><td className="py-2 px-4">Yes — server-side</td><td className="py-2 pl-4">&ldquo;Short time&rdquo;, unspecified</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Adobe online</td><td className="py-2 px-4">Yes — Adobe cloud</td><td className="py-2 pl-4">Until deletion (manual)</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">PDFsam desktop</td><td className="py-2 px-4">No — runs locally</td><td className="py-2 pl-4">N/A (open source, Java)</td></tr>
              <tr><td className="py-2 pr-4">SammaPix PDF Merge</td><td className="py-2 px-4 text-emerald-600 dark:text-emerald-400"><strong>No — browser only</strong></td><td className="py-2 pl-4">N/A (no transmission)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The four server-based services are generally reputable and their claims are probably honest. The point
          is not that they are evil — it is that you cannot verify the claims and you do not have to make the
          tradeoff at all. Browser-based tools remove the question entirely.
        </p>

        {/* ── When privacy matters ───────────────────────────────────────── */}
        <h2 id="when-privacy-matters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When PDF privacy matters (the real-world cases)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Privacy concerns are not paranoia — they map to concrete, common situations:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Freelance invoicing.</strong> Your invoices contain client names, rates, and business addresses. Not catastrophic if leaked, but clients often ask you to sign NDAs that technically include &ldquo;do not transmit to third parties&rdquo;.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Employment contracts and offers.</strong> Signed versions contain full names, SSN, salary details, home addresses. Routinely merged into one document when applying for mortgages, visas, or apartment rentals.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Medical records.</strong> Combining records from multiple providers for a specialist consultation. HIPAA in the US and GDPR in the EU both put meaningful liability on transmission to unqualified third parties.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Tax returns.</strong> Year-end packages combining W2s, 1099s, and receipts. Often contain full financial fingerprints.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Legal filings.</strong> Combining exhibits for court submissions. Many jurisdictions require attorney-client privileged material to never transit third-party cloud services.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For broader privacy patterns in image and document tools read our{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            browser-based image tools privacy guide
          </Link>
          .
        </p>

        {/* ── Encryption ─────────────────────────────────────────────────── */}
        <h2 id="encryption-handling" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Encrypted and password-protected PDFs
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PDF has two common &ldquo;encryption&rdquo; modes that often get conflated:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Encrypted-for-viewing</strong>: the file is technically encrypted (permissions flag set) but the viewing password is blank. Adobe Reader opens it without prompting. Most office-generated PDFs are in this category.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Password-required</strong>: genuinely locked, requires the password to render.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix PDF Merge loads PDFs with{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">ignoreEncryption: true</code>{" "}
          which handles case 1 transparently — the encrypted-for-viewing flag is bypassed and the content is
          readable. Case 2 requires the password to decrypt before merging; PDF Merge does not currently prompt
          for passwords, so decrypt the source in your OS PDF viewer or Adobe Reader first.
        </p>

        {/* ── What gets preserved ────────────────────────────────────────── */}
        <h2 id="what-gets-preserved" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What gets preserved in the merge
        </h2>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Preserved?</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Text content</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Yes, pixel-perfect</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Images and graphics</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Yes, pixel-perfect</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Fonts (embedded and non-embedded)</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Yes</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Hyperlinks</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Yes</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Form fields (fillable)</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Yes, mostly</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Annotations and comments</td><td className="py-2 pl-4 text-amber-600 dark:text-amber-400">Partial — simple ones preserved</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Digital signatures</td><td className="py-2 pl-4 text-amber-600 dark:text-amber-400">Preserved but invalidated (merge changes bytes)</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Document-level bookmarks</td><td className="py-2 pl-4 text-red-600 dark:text-red-400">Not preserved (known limitation)</td></tr>
              <tr><td className="py-2 pr-4">Attachments (files embedded in PDF)</td><td className="py-2 pl-4 text-amber-600 dark:text-amber-400">Partial</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For bookmark-heavy workflows (long legal packs, technical manuals) a desktop tool like Adobe Acrobat or
          PDFsam is better. For invoicing, contract packs, and most office use cases the browser-based merge
          handles everything you need.
        </p>

        {/* ── Workflow ───────────────────────────────────────────────────── */}
        <h2 id="workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The merge workflow step by step
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Open <Link href="/tools/pdf-merge" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix PDF Merge</Link>. Any modern browser works.</li>
          <li>Drop up to 10 PDFs on the free plan (50 on Pro). 100 MB per file max.</li>
          <li>Drag rows up or down to set the final order. Click the trash icon to remove files you do not want.</li>
          <li>Click <strong className="text-gray-900 dark:text-[#E5E5E5]">Merge N PDFs</strong>. Progress bar shows page-by-page combine.</li>
          <li>Download the merged PDF. Filename defaults to <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">sammapix-merged-N-files.pdf</code>.</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Need to build a PDF from images first? Use{" "}
          <Link href="/tools/jpg-to-pdf" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            JPG to PDF
          </Link>
          {" "}first, then pipe into PDF Merge. For reverse direction use{" "}
          <Link href="/tools/pdf-to-image" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            PDF to Image
          </Link>
          .
        </p>

        {/* ── Verify ─────────────────────────────────────────────────────── */}
        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happened
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Do not take our word for it. Verify yourself:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Open Chrome or Firefox DevTools (right-click → Inspect, or F12).</li>
          <li>Go to the <strong className="text-gray-900 dark:text-[#E5E5E5]">Network</strong> tab.</li>
          <li>Check <strong className="text-gray-900 dark:text-[#E5E5E5]">Preserve log</strong> so entries persist across page changes.</li>
          <li>Load <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">/tools/pdf-merge</code> and clear the log.</li>
          <li>Drop your PDFs and run the merge. Watch the Network tab.</li>
          <li>No requests with your PDF bytes as payload. The only entries will be static assets (JS, CSS, images), or at most a small analytics beacon with zero file content.</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Repeat this check on any privacy claim, from any vendor. It is the only way to confirm a tool actually
          does what it says.
        </p>

        {/* ── Alternatives ───────────────────────────────────────────────── */}
        <h2 id="alternatives" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Offline alternatives if you need desktop
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For larger batches, bookmark-preserving merges, or air-gapped environments, these desktop tools run
          fully offline:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">PDFsam Basic</strong> — open source Java app, Windows/Mac/Linux, preserves bookmarks, no file size limit.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">pdftk</strong> — command-line tool for Linux/Mac, scriptable, preserves everything.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Preview (macOS)</strong> — built-in, drag pages between PDFs in thumbnails view.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Adobe Acrobat Pro</strong> — paid, full feature set, industry standard.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most day-to-day merging the browser-based option wins on speed and convenience without giving up
          privacy.
        </p>

        {/* ── Tools ──────────────────────────────────────────────────────── */}
        <h2 id="tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free browser-based PDF tools
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix runs three complementary PDF tools, all client-side via pdf-lib:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Goal</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Tool</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Limits</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Merge multiple PDFs</td><td className="py-2 px-4"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></td><td className="py-2 pl-4">10 files / 100 MB free</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Build PDF from images</td><td className="py-2 px-4"><Link href="/tools/jpg-to-pdf" className="text-[#6366F1] hover:underline">JPG to PDF</Link></td><td className="py-2 pl-4">20 images / batch</td></tr>
              <tr><td className="py-2 pr-4">Extract images from PDF</td><td className="py-2 px-4"><Link href="/tools/pdf-to-image" className="text-[#6366F1] hover:underline">PDF to Image</Link></td><td className="py-2 pl-4">Any page count</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Full toolbox: <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix homepage</Link> — 35 free tools, all browser-based.
        </p>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Do most free PDF mergers upload my files to a server?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes — most of them. iLovePDF, SmallPDF, PDF24, and the majority of search-top PDF tools route uploads
          through their servers. Browser-based tools like SammaPix PDF Merge run locally via pdf-lib and never
          transmit your files.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Is merging PDFs in the browser secure for sensitive documents?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes — provably more secure than server-based alternatives. The merge runs inside your browser tab
          using pdf-lib. Nothing is sent over the network. Verify by opening DevTools → Network tab during a
          merge: zero outbound requests with your PDFs.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">How does the pdf-lib library handle encrypted PDFs?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix loads PDFs with ignoreEncryption:true which handles encrypted-for-viewing PDFs transparently.
          Password-required PDFs must be decrypted first — do not merge PDFs you are not authorized to open.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Can I reorder PDFs before merging?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Drag rows up or down after upload. Remove files with the trash icon. The merged output follows
          the on-screen order.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">What is the file size limit for browser-based PDF merge?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Up to 100 MB per file, 10 files per batch on the free plan (50 on Pro). The hard limit is your browser
          memory.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Does the merged PDF preserve bookmarks, form fields, and annotations?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Text, images, page layout, and most form fields are preserved cleanly. Document-level bookmarks are a
          known limitation of client-side PDF libraries. For bookmark-heavy workflows use Adobe Acrobat or
          PDFsam desktop.
        </p>
      </BlogArticleLayout>
    </>
  );
}
