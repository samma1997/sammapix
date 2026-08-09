import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Resize a Photo to 20KB Online Free (No Upload)",
  description:
    "Need a photo under 20KB for a government form or exam portal? This guide shows the exact steps to compress any image to 10KB, 20KB, 50KB, 100KB, or 200KB free in your browser with no file uploads.",
  alternates: {
    canonical: `${APP_URL}/blog/resize-photo-to-20kb`,
  },
  keywords: [
    "resize photo to 20kb",
    "compress image to 20kb",
    "photo size 20kb",
    "reduce image to 50kb",
    "resize jpg to 100kb",
    "10kb photo",
    "compress photo to exact size",
    "reduce image size for government form",
  ],
  openGraph: {
    title: "How to Resize a Photo to 20KB Online Free (No Upload)",
    description:
      "Step-by-step guide to compress any photo to exactly 20KB, 50KB, 100KB, or 200KB for government portals and exam forms. Free, instant, no file uploads.",
    url: `${APP_URL}/blog/resize-photo-to-20kb`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Resize a Photo to 20KB Online Free (No Upload)",
    description:
      "Compress any photo to exactly 20KB, 50KB, or 100KB for exam portals and government forms. Free, instant, browser-only.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/resize-photo-to-20kb`;
const POST_TITLE = "How to Resize a Photo to 20KB Online Free (No Upload)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A precise guide to compressing any photo to an exact KB target (10KB, 20KB, 50KB, 100KB, 200KB) for government portals, exam applications, and job forms. Covers the difference between resizing pixels and reducing file size, quality tips, and a free browser-based tool that requires no file uploads.",
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
    "resize photo to 20kb",
    "compress image to 20kb",
    "photo size 20kb",
    "reduce image to 50kb",
    "resize jpg to 100kb",
    "10kb photo",
  ],
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
      name: "Can I compress a photo to exactly 20KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use sammapix.com/compress-to/20kb. Drop your photo, and the tool compresses it to just under 20KB automatically. It uses binary search over JPEG quality levels so the result is as close to the target as possible without going over.",
      },
    },
    {
      "@type": "Question",
      name: "Will quality drop a lot when I compress to 20KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the starting resolution. A 4000x3000 pixel photo compressed to 20KB will look visibly soft because that size budget is very small for that many pixels. If you first resize the photo to around 400x500 pixels (typical passport photo dimensions) and then compress to 20KB, the quality will be noticeably better. The SammaPix resize tool and compress-to tool can be used in sequence.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between resizing and compressing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resizing changes the pixel dimensions (for example, from 4000x3000 to 400x300), which naturally reduces file size. Compressing keeps the same pixel dimensions but reduces quality level and optimizes the encoding to make the file smaller. To hit a very small KB target like 10KB or 20KB, you often need to do both: resize the pixels down first, then compress the result.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use JPG or PNG for a small-size photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG is almost always the right choice for photos at small file sizes. PNG uses lossless compression and tends to produce files 3 to 10 times larger than JPG at the same visual quality for photographs. Government portals and exam forms almost universally ask for JPG (or JPEG). If you have a PNG photo, convert it to JPG first, then compress to your target size.",
      },
    },
    {
      "@type": "Question",
      name: "Is SammaPix free? Does it upload my photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the compress-to tool is free. No, your photo is never uploaded. All processing happens inside your browser using client-side JavaScript. The file never leaves your device, which means your photo stays private and the tool works offline once the page has loaded.",
      },
    },
    {
      "@type": "Question",
      name: "Why do government portals ask for such small file sizes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most government and exam portals were built years ago when upload infrastructure was limited, storage was expensive, and many applicants had slow internet connections. The small size limits (10KB to 200KB) also reflect the actual display resolution needed, which is low for a passport-sized photo shown on a form review screen. The limits have not changed even as phone cameras now produce 5 to 10MB photos by default.",
      },
    },
    {
      "@type": "Question",
      name: "What if my photo is already small but still above 20KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the compress-to tool at sammapix.com/compress-to/20kb. It will apply JPEG optimization to bring the file below 20KB regardless of the starting size. If the photo is already small in pixels (under 500x600), the result will still look clean at 20KB.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a Photo to 20KB (or Any KB Target) Online Free",
  description:
    "Step-by-step instructions to reduce a photo to an exact file size target such as 10KB, 20KB, 50KB, 100KB, or 200KB using a free browser-based tool with no file uploads.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check the portal requirement",
      text: "Read the exact file size limit from the government or exam portal. Common values are 10KB, 20KB, 50KB, 100KB, and 200KB. Also note the required pixel dimensions and format (almost always JPG).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Resize pixel dimensions if needed",
      text: "If your photo is larger than 1000x1000 pixels and the target is very small (under 30KB), open sammapix.com/tools/resizepack and resize to the approximate required dimensions (for example, 413x531 for a standard passport photo). This step makes it easier to hit a very small KB target without destroying quality.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Open the compress-to tool",
      text: "Go to sammapix.com/compress-to/20kb (or substitute your target: 10kb, 50kb, 100kb, 200kb). Drop or select your photo.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download the compressed file",
      text: "The tool compresses the photo to just under your target size automatically. Click download. The file is ready to upload to the portal.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify file size before uploading",
      text: "Right-click the downloaded file, choose Properties (Windows) or Get Info (Mac), and confirm the file size is below the limit. Then upload to the government or exam portal.",
    },
  ],
};

export default function ResizePhotoTo20KBPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="resize-photo-to-20kb"
        description={`Your phone produces photos at 4 to 8 megabytes. A government portal says the limit is 20KB. That gap of 200 to 400 times is why upload buttons keep failing silently. This guide explains exactly how to close that gap, what "resizing" versus "compressing" actually means, and which free tool hits an exact KB target every time without uploading your file anywhere.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "resize-vs-compress", title: "Resizing pixels vs. compressing file size" },
          { id: "why-portals-want-small", title: "Why government portals ask for tiny file sizes" },
          { id: "common-targets-table", title: "Common KB targets and where they appear" },
          { id: "step-by-step", title: "Step-by-step guide to hit an exact KB target" },
          { id: "quality-tips", title: "Tips to keep quality as high as possible" },
          { id: "jpg-vs-png", title: "JPG vs PNG for small file sizes" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Resizing changes pixel dimensions. Compressing reduces file size while keeping the same pixels. Both together are needed to hit very small KB targets like 10KB or 20KB.",
          "Government and exam portals across India and other countries commonly require photos between 10KB and 200KB in JPG format.",
          "SammaPix compress-to tools let you target an exact file size (10KB, 20KB, 50KB, 100KB, 200KB) with no guesswork and no file uploads.",
          "Reducing pixel dimensions first (using the resize tool) dramatically improves quality when the target is 20KB or smaller.",
          "JPG always produces smaller files than PNG for photographs. Always convert PNG to JPG before compressing for a government form.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80"
              alt="Person filling out an online government form on a laptop, representing the process of uploading a photo to an exam or job portal"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Millions of people face the same problem every year: a phone photo that is too large for a government upload portal. The fix is a two-step process that takes under two minutes. Photo by Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Compress your photo to an exact KB target, free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your photo and the tool compresses it to exactly 10KB, 20KB, 50KB, 100KB, or 200KB. Everything runs in your browser. No upload, no signup, no data sent anywhere.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compress-to/20kb"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Compress to 20KB
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                General Compress Tool
              </Link>
            </div>
          </div>
        }
      >
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Go to{" "}
            <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/compress-to/20kb
            </Link>
            , drop your photo, and download the compressed version. For other targets, use{" "}
            <Link href="/compress-to/10kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              /compress-to/10kb
            </Link>
            ,{" "}
            <Link href="/compress-to/50kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              /compress-to/50kb
            </Link>
            ,{" "}
            <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              /compress-to/100kb
            </Link>
            , or{" "}
            <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              /compress-to/200kb
            </Link>
            . If your target is 20KB or smaller, first reduce pixel dimensions using the{" "}
            <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              resize tool
            </Link>
            , then compress. Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>

        {/* Section: Resizing pixels vs compressing file size */}
        <h2 id="resize-vs-compress" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Resizing pixels vs. compressing file size
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These two operations are frequently confused because they both make a photo file smaller. Understanding the difference is the key to hitting an exact KB target without destroying visual quality more than necessary.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Resizing</strong> changes the pixel dimensions of an image. A photo at 4000 by 3000 pixels resized to 400 by 300 pixels contains one hundred times fewer pixels. Because each pixel takes up space in the file, fewer pixels means a smaller file. The visual quality is determined by how many pixels you have to display the image, so resizing always involves some loss of fine detail.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Compressing</strong> keeps the same pixel dimensions but encodes the image data more efficiently. JPEG compression works by grouping nearby pixels of similar color and approximating them together, discarding fine detail that is less perceptible to the human eye. The higher the compression level, the more detail is discarded and the smaller the file. A JPEG photo can typically be reduced to 10 to 20 percent of its original size with only minor visible quality loss.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          To hit a very small KB target like 10KB or 20KB, you almost always need to do both. Here is why: a 4000 by 3000 pixel photo contains 12 million pixels. Even at the lowest JPEG quality setting, 12 million pixels cannot be encoded in 20KB with anything approaching acceptable visual quality. But a 400 by 500 pixel passport-sized photo at moderate JPEG quality sits comfortably below 20KB while still looking sharp enough for any government form.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md p-4 mb-6">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
            Rule of thumb
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            If your target is 50KB or above: compression alone is usually enough. If your target is under 30KB (for example, 10KB or 20KB): resize the pixels down to passport photo dimensions first (approximately 413 by 531 pixels), then compress. This produces far better quality than compression alone.
          </p>
        </div>

        {/* Section: Why portals ask for tiny sizes */}
        <h2 id="why-portals-want-small" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why government portals ask for tiny file sizes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The file size limits on government and exam portals feel absurdly small by modern standards. A 20KB limit was designed at a time when phone cameras did not exist, internet connections were measured in kilobits per second, and server storage cost significantly more than it does today.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most of these portals were built between 2005 and 2015. The upload infrastructure, database column sizes, and validation rules were all written around the assumption that a photo meant a scanned document at low resolution, not a 50-megapixel smartphone image. The limits have never been updated because updating them would require retesting the entire application system, a process that large government agencies rarely prioritize.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          There is also a practical reason that still holds up: a passport photo displayed at 2 centimeters wide on a form review screen requires only about 60 by 80 pixels at screen resolution. Even at 200 DPI print quality, the standard 3.5 by 4.5 centimeter passport format needs only 413 by 531 pixels. Storing millions of files much larger than this wastes database space for no benefit to the review process.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The mismatch between what your phone produces (typically 4 to 8 megabytes) and what portals accept (10 to 200 kilobytes) is a difference of 20 to 800 times. Bridging that gap requires a proper compression tool, not just saving at a lower quality in an image editor.
        </p>

        {/* Section: Common targets table */}
        <h2 id="common-targets-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common KB targets and where they appear
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Different portals and use cases have different requirements. Here is a reference table for the most common file size targets:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Target Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Typical Use Cases</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Direct Link</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">10 KB</td>
                <td className="px-4 py-2.5 text-xs">Signature uploads for Indian exam forms (SSC, UPSC, NTA). Very small thumbnail images for legacy HR systems.</td>
                <td className="px-4 py-2.5 text-xs">
                  <Link href="/compress-to/10kb" className="text-[#6366F1] underline underline-offset-2 hover:text-[#4F46E5]">
                    /compress-to/10kb
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">20 KB</td>
                <td className="px-4 py-2.5 text-xs">State government job portals in India (PSC forms). Passport-sized photo for older municipal portals. Some Bangladesh and Pakistan exam boards.</td>
                <td className="px-4 py-2.5 text-xs">
                  <Link href="/compress-to/20kb" className="text-[#6366F1] underline underline-offset-2 hover:text-[#4F46E5]">
                    /compress-to/20kb
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">50 KB</td>
                <td className="px-4 py-2.5 text-xs">NTA exams (JEE Advanced, CUET). Railway Recruitment Board (RRB). Many state-level recruitment portals.</td>
                <td className="px-4 py-2.5 text-xs">
                  <Link href="/compress-to/50kb" className="text-[#6366F1] underline underline-offset-2 hover:text-[#4F46E5]">
                    /compress-to/50kb
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">100 KB</td>
                <td className="px-4 py-2.5 text-xs">JEE Main, NEET-UG, GATE, UPSC Civil Services, SSC CGL. Most Indian central government application portals.</td>
                <td className="px-4 py-2.5 text-xs">
                  <Link href="/compress-to/100kb" className="text-[#6366F1] underline underline-offset-2 hover:text-[#4F46E5]">
                    /compress-to/100kb
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">200 KB</td>
                <td className="px-4 py-2.5 text-xs">IBPS bank exams, job application portals (Naukri, job boards). Some international embassy visa forms. Scholarship applications.</td>
                <td className="px-4 py-2.5 text-xs">
                  <Link href="/compress-to/200kb" className="text-[#6366F1] underline underline-offset-2 hover:text-[#4F46E5]">
                    /compress-to/200kb
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The most searched target globally is 20KB, driven primarily by state-level PSC portals across India and older municipal systems. If you are unsure which tool to use, start with the{" "}
          <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            compress to 20KB tool
          </Link>
          , which works for all targets at or above 20KB as well by simply downloading a file that is well within the budget.
        </p>

        {/* Section: Step by step */}
        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step guide to hit an exact KB target
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Follow this process regardless of whether your target is 10KB, 20KB, 50KB, 100KB, or 200KB. The two-step approach (resize then compress) is not always necessary, but the guide below tells you exactly when to use it.
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              step: "1",
              title: "Read the portal requirement carefully",
              detail: "Before opening any tool, note the exact file size limit, the required format (almost always JPG or JPEG), and the required pixel dimensions if specified. Many portals also specify a minimum size (for example, 10KB to 100KB), which means the file must be at least 10KB and no more than 100KB. A blank white photo could technically be 2KB but would be rejected. Aim for roughly 80 to 95 percent of the maximum allowed size.",
            },
            {
              step: "2",
              title: "Check your starting file size and dimensions",
              detail: "Right-click your photo file and choose Properties (Windows) or Get Info (Mac). If the file is over 2MB and your target is below 50KB, you will almost certainly need to resize pixels first. If the file is already below 500KB, compression alone will probably be sufficient.",
            },
            {
              step: "3",
              title: "Resize pixel dimensions first (for targets under 30KB)",
              detail: "Open the SammaPix resize tool at sammapix.com/tools/resizepack. For a passport photo, resize to approximately 413 by 531 pixels (the standard for 3.5 by 4.5 centimeters at 200 DPI). For a general document photo, 600 by 800 pixels is a good starting point. Download the resized version.",
            },
            {
              step: "4",
              title: "Open the compress-to tool for your target size",
              detail: "Navigate to the appropriate URL: sammapix.com/compress-to/20kb for a 20KB target (or 10kb, 50kb, 100kb, 200kb for other targets). Drop the photo you downloaded from step 3, or your original photo if you skipped the resize step.",
            },
            {
              step: "5",
              title: "Download and verify the compressed file",
              detail: "Click download. Right-click the downloaded file and confirm the file size is within the portal's accepted range. If the portal requires a minimum size and your file is too small (rare with photos), you may need to use a slightly higher quality level. The general compress tool at sammapix.com/tools/compress lets you set quality manually.",
            },
            {
              step: "6",
              title: "Upload to the portal",
              detail: "Upload the compressed file to the government or exam portal. If the upload still fails, double-check that the file format is JPG (not PNG or HEIC), that the file is within the size range, and that you are using the correct field (photo field vs. signature field).",
            },
          ].map(({ step, title, detail }) => (
            <div key={step} className="flex gap-4 p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#6366F1] text-white text-xs font-bold flex items-center justify-center">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {title}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inline CTA */}
        <Link
          href="/compress-to/20kb"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
              Free, no upload, no signup
            </p>
            <p className="text-sm font-semibold text-white leading-snug">
              Compress your photo to 20KB now
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
            strokeWidth={1.5}
          />
        </Link>

        {/* Section: Quality tips */}
        <h2 id="quality-tips" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Tips to keep quality as high as possible
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When the target file size is this small, every decision you make upstream affects how the final photo looks. These five practices will give you the best possible quality at any KB target.
        </p>

        <ul className="space-y-4 mb-6 pl-4">
          {[
            {
              label: "Start from the highest-quality original you have",
              detail: "Never compress an already-compressed photo. If you have the original from your camera or phone, use that. If you start from a screenshot or a photo you already saved at low quality, the tool has nothing to work with and the result will look noticeably degraded.",
            },
            {
              label: "Match pixel dimensions to the display purpose",
              detail: "A passport photo on a form review screen is displayed at roughly 60 by 80 pixels, but 413 by 531 pixels (200 DPI at 3.5 by 4.5 cm) gives the reviewing system enough data for accurate verification. There is no benefit to submitting a 4000-pixel-wide photo for a field that will display it at 60 pixels wide.",
            },
            {
              label: "Use JPG, not PNG",
              detail: "PNG files are lossless, which means they cannot be compressed below a certain floor without switching to a lossy format. A PNG portrait photo at minimum lossless quality will still be 5 to 20 times larger than the equivalent JPG. Always convert to JPG first if your starting file is PNG or HEIC.",
            },
            {
              label: "Avoid repeated save-compress cycles",
              detail: "Every time a JPEG is saved at a lossy quality setting, the image loses detail that can never be recovered. Compress once from the original. If you need to adjust, start again from the original and try a different target.",
            },
            {
              label: "For very small targets, use a plain background",
              detail: "Photos with complex backgrounds (trees, walls, patterned fabric) require more file-size budget to encode. A photo taken against a plain white wall or with a white background removed compresses much more efficiently and looks sharper at 10KB or 20KB than the same face in front of a complex scene.",
            },
          ].map(({ label, detail }) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
              <span>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">{label}:</strong>{" "}
                {detail}
              </span>
            </li>
          ))}
        </ul>

        {/* Section: JPG vs PNG */}
        <h2 id="jpg-vs-png" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          JPG vs PNG for small file sizes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The format you choose before compressing has a dramatic effect on the final file size. For photographs at small KB targets, the choice is almost always JPG. Here is why the difference matters so much.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Property</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">JPG</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">PNG</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Compression type</td>
                <td className="px-4 py-2.5 text-xs">Lossy (discards some detail)</td>
                <td className="px-4 py-2.5 text-xs">Lossless (keeps all detail)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Typical size for a 400x500 portrait</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">8 to 25 KB</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">80 to 200 KB</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Can hit a 20KB target cleanly?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes, easily</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Only with significant pixel reduction</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Accepted by government forms?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes, universally</td>
                <td className="px-4 py-2.5 text-xs font-medium text-amber-600 dark:text-amber-400">Sometimes (check requirements)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Best for</td>
                <td className="px-4 py-2.5 text-xs">Photographs, portraits, anything with gradients</td>
                <td className="px-4 py-2.5 text-xs">Logos, screenshots, graphics with text</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          PNG uses lossless compression, which means it cannot reduce the file below a floor determined by the actual complexity of the image data. For a photograph with millions of subtly different colors, that floor is very high. A passport photo in PNG format will almost always be between 80KB and 300KB even at maximum compression, making it nearly impossible to hit a 20KB target without extreme pixel reduction.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          JPG uses lossy compression. It can trade a small amount of visual detail for a large reduction in file size. A passport photo compressed to JPEG quality 60 (on a scale of 0 to 100) is typically indistinguishable from one at quality 95 when viewed at the size a form reviewer would see it, yet the file is 5 to 10 times smaller.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If your photo is a PNG, open the{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix compress tool
          </Link>
          , which automatically converts to JPG and compresses in one step. Alternatively, use the{" "}
          <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            compress-to/20kb tool
          </Link>
          , which handles PNG input and outputs a JPG under your target size.
        </p>

        {/* Related tools block */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">
            Related tools and guides
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/compress-to/10kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 10KB
            </Link>
            <Link
              href="/compress-to/50kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 50KB
            </Link>
            <Link
              href="/compress-to/100kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 100KB
            </Link>
            <Link
              href="/compress-to/200kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 200KB
            </Link>
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Resize Tool
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              General Compress
            </Link>
            <Link
              href="/blog/compress-photos-indian-exam-applications"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Exam Application Photos
            </Link>
            <Link
              href="/blog/compress-images-without-losing-quality"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress Without Quality Loss
            </Link>
          </div>
        </div>

        {/* Privacy callout */}
        <div className="mt-10 p-5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            100% client-side: your photo never leaves your device
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            All SammaPix compress-to tools run entirely inside your browser using the Canvas API and JPEG encoding built into every modern browser. Your photo is not sent to any server. It is not stored anywhere. The compression happens on your own device, in your own memory, with results available in seconds. This matters especially when the photo contains your face, passport photo, or personal identification information.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            This also means the tools work offline once the page has loaded, work on any device including phones, and impose no limits on the number of photos you can process. For government documents and personal photos, this is the safest possible approach.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I compress a photo to exactly 20KB?",
                a: "Yes. Open sammapix.com/compress-to/20kb, drop your photo, and download the result. The tool uses binary search across JPEG quality levels to land as close to 20KB as possible without going over. The output is typically within 1 to 2KB of the target.",
              },
              {
                q: "Will quality drop a lot when I compress to 20KB?",
                a: "It depends on the starting resolution. A 4000 by 3000 pixel photo compressed directly to 20KB will look noticeably soft. If you first resize to around 400 by 500 pixels using the SammaPix resize tool and then compress to 20KB, the result looks much better. For passport-sized photos used on government forms, this two-step process produces perfectly acceptable quality.",
              },
              {
                q: "What is the difference between resizing and compressing?",
                a: "Resizing changes the pixel count (for example, from 4000x3000 to 400x300 pixels), which reduces the file size naturally. Compressing keeps the same pixel count but encodes the data more aggressively to reduce the file size further. To hit a very small KB target like 10KB or 20KB, you often need to do both. For targets above 50KB, compression alone is usually enough.",
              },
              {
                q: "Should I use JPG or PNG for a small-size photo?",
                a: "JPG is almost always the correct choice for photos at small file sizes. A 400 by 500 pixel portrait in JPG format typically lands between 8KB and 25KB depending on quality. The same photo as PNG will be between 80KB and 200KB because PNG uses lossless compression that cannot reach very small file sizes for photographs. Government and exam portals almost universally require JPG.",
              },
              {
                q: "Is SammaPix free? Does it upload my photo?",
                a: "Yes, the compress-to tools are free. No, your photo is never uploaded to any server. All processing runs in your browser using built-in browser APIs. The file stays on your device, which means it is private, secure, and available even without a stable internet connection after the page loads.",
              },
              {
                q: "Why do government portals ask for such small file sizes?",
                a: "Most government and exam portals were built between 2005 and 2015, when upload infrastructure was limited and server storage was expensive. The limits have not been updated even as modern phone cameras produce photos 100 to 500 times larger than what portals accept. The actual display size of a passport photo on a form review screen requires only 60 to 100 pixels wide, so a large file provides no benefit.",
              },
              {
                q: "What if my photo is already small in pixels but still above 20KB?",
                a: "Use the compress-to tool at sammapix.com/compress-to/20kb. Drop the photo and it will apply JPEG quality optimization to bring the file below 20KB. If the photo is already at small pixel dimensions (under 600 by 800), the result will still look clean at 20KB because there are not many pixels competing for the file-size budget.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
