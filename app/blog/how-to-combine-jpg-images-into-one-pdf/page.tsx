import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Combine Multiple JPG Images into One PDF (Free, No Upload)",
  description:
    "Combine multiple JPG or JPEG images into a single PDF, free, in your browser with no upload. Reorder the pages, keep them private, and do it in bulk. Plus the built-in Mac and Windows print-to-PDF methods. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-combine-jpg-images-into-one-pdf` },
  keywords: [
    "combine jpg to pdf",
    "combine images into pdf",
    "merge jpg into one pdf",
    "2 jpg to 1 pdf",
    "collate jpg to pdf",
    "bulk jpg to pdf",
    "combine jpeg to pdf",
    "multiple images to one pdf",
  ],
  openGraph: {
    title: "How to Combine Multiple JPG Images into One PDF (Free, No Upload)",
    description:
      "Combine multiple JPG images into a single PDF, free, in your browser, no upload. Reorder pages, keep them private, do it in bulk. Updated 2026.",
    url: `${APP_URL}/blog/how-to-combine-jpg-images-into-one-pdf`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Combine Multiple JPG Images into One PDF (Free)",
    description: "Merge multiple JPGs into a single PDF in your browser, no upload. Reorder pages, do it in bulk. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-combine-jpg-images-into-one-pdf`;
const POST_TITLE = "How to Combine Multiple JPG Images into One PDF";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to combine multiple JPG or JPEG images into a single PDF free in your browser with no upload, including reordering pages, doing it in bulk, and the built-in Mac and Windows methods.",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["combine jpg to pdf", "merge images into one pdf", "2 jpg to 1 pdf", "bulk jpg to pdf"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I combine multiple JPG images into one PDF for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix JPG to PDF tool at sammapix.com/tools/jpg-to-pdf. Drop in all your JPGs, drag them into the order you want, and download a single PDF with one image per page. It runs in your browser, so nothing is uploaded, and there is no watermark.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make 2 JPGs into 1 PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add both JPGs to the browser tool, put them in the right order, and export. You get a single two-page PDF. The same steps work for any number of images, from two to a few hundred.",
      },
    },
    {
      "@type": "Question",
      name: "Can I control the page order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and you should check it before exporting. Images are added in the order you drop them, but you can drag to rearrange. Page order in the PDF follows the order on screen, so put page one first, page two next, and so on.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to combine private documents this way?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a browser-based tool like SammaPix, yes. The images are turned into a PDF locally on your device and never uploaded to a server, which matters for scans of IDs, contracts, receipts, and other sensitive paperwork.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine a large batch of JPGs at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drop the whole set in and export one PDF. Because it runs locally there is no per-file upload wait and no daily cap. If the final PDF is too big to email, compress the images first or reduce their dimensions before combining.",
      },
    },
    {
      "@type": "Question",
      name: "Will combining reduce image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Each JPG is placed into the PDF as is, so the pages look exactly like the originals. If anything the PDF can be large because it holds full-resolution images, which is why compressing the JPGs first is worth it when size matters.",
      },
    },
  ],
};

export default function HowToCombineJpgIntoPdfPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-combine-jpg-images-into-one-pdf"
        description="Scanned a document as separate photos and now need it as one file? This guide shows the fastest no-upload way to combine multiple JPG images into a single PDF, how to get the page order right, how to do it in bulk, and the built-in Mac and Windows methods, with privacy intact."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "why-combine", title: "Why combine JPGs into one PDF" },
          { id: "method-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "page-order", title: "Getting the page order right" },
          { id: "mac", title: "Method 2: Mac (Preview)" },
          { id: "windows", title: "Method 3: Windows (Print to PDF)" },
          { id: "size", title: "Keeping the PDF small enough to email" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "One PDF is easier to email, print, and submit than a pile of separate JPGs.",
          "The fastest no-install way is a browser tool. SammaPix combines JPGs into one PDF with no upload.",
          "Drag the images into the right order before exporting, since page order follows screen order.",
          "Mac: select images in Preview and Print to PDF. Windows: Print to PDF from Photos.",
          "If the PDF is too big to email, compress the JPGs first.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80"
              alt="Stacked documents and photos being combined into a single PDF file"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A stack of photo scans is far easier to handle as one PDF
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Combine your JPGs into one PDF now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix JPG to PDF tool runs in your browser. Drop your images, drag them into order,
              and download a single PDF. No upload, no watermark.
            </p>
            <Link
              href="/tools/jpg-to-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Combine JPGs into a PDF, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="why-combine" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why combine JPGs into one PDF
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You photographed a document, a contract, or a stack of receipts, and now you have a dozen separate JPG files. Sending twelve attachments is messy, and most submission forms, whether for a visa, a job application, an insurance claim, or an expense report, want <strong className="text-gray-800 dark:text-[#E5E5E5]">one PDF</strong>, in order, with one page per image. Combining the images into a single PDF makes the whole thing easy to email, print, and archive, and it keeps the pages in the sequence you intend.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The catch with many online converters is that they upload your images to a server, which is exactly what you do not want when the pages are an ID, a bank statement, or a signed contract. The method below keeps everything on your device.
        </p>

        <h2 id="method-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/jpg-to-pdf" className="text-[#6366F1] hover:underline">SammaPix JPG to PDF tool</Link>{" "}
          builds the PDF in your browser. Your images are never uploaded, there is no watermark, and it works on any device.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/jpg-to-pdf</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drop all your JPG or JPEG files</strong> onto the page.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drag the thumbnails</strong> into the order you want for the pages.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Export and download</strong> a single PDF, one image per page.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Turn a pile of JPGs into one tidy PDF</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Drop your images, drag them into order, download one PDF. In bulk, 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/jpg-to-pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the JPG to PDF Tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="page-order" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Getting the page order right
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the one step people skip and then regret. The PDF pages come out in the exact order the images sit on screen, so check it before you export. Images are added in the order you drop them in, which is often not the order you want, especially when phone filenames are timestamps rather than page numbers. Drag the thumbnails so page one is first, page two is second, and so on. Thirty seconds of reordering beats re-doing the whole PDF because pages three and four are swapped.
        </p>

        <h2 id="mac" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Mac (Preview)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On a Mac you can do this without any extra tool. Select all the JPGs in Finder, open them together in <strong className="text-gray-800 dark:text-[#E5E5E5]">Preview</strong>, then drag the thumbnails in the sidebar into the right order. Choose File, then Print, then click the PDF menu at the bottom left and pick Save as PDF. Preview prints every open image into one multi-page PDF. It works well, though reordering many pages by hand in the sidebar is slower than a dedicated tool.
        </p>

        <h2 id="windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Windows (Print to PDF)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On Windows, select the JPGs in File Explorer, right-click and choose Print, then in the print dialog pick <strong className="text-gray-800 dark:text-[#E5E5E5]">Microsoft Print to PDF</strong> as the printer and Save. This puts one image per page into a single PDF. The order follows how the files are sorted in the folder, so rename them 01, 02, 03 first if the sequence matters, since the print dialog does not let you drag pages around.
        </p>

        <h2 id="size" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Keeping the PDF small enough to email
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A PDF made from full-resolution phone photos can easily be 20 to 40 MB, which bounces off many email limits. Because each page is just the JPG embedded, the fix is to shrink the images <em>before</em> combining. Run them through the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>{" "}
          first, or cut their dimensions with the{" "}
          <Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize tool</Link>, then combine the smaller versions. For a document scan, 1500 to 2000 pixels on the long edge is plenty to stay readable while keeping the PDF light. If you already have several PDFs to join instead of images, use the{" "}
          <Link href="/blog/merge-pdfs-privately-no-upload" className="text-[#6366F1] hover:underline">private PDF merge guide</Link>.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
