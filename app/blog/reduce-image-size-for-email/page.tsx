import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reduce Image Size for Email: Get Under 1MB Fast | SammaPix",
  description:
    "Quickly reduce image file size for email attachments. Compress photos to under 1MB without visible quality loss — free, no signup, works in your browser.",
  alternates: {
    canonical: `${APP_URL}/blog/reduce-image-size-for-email`,
  },
  keywords: [
    "reduce image size for email",
    "compress photo for email",
    "shrink image for email attachment",
    "image too large for email",
    "reduce file size photo",
    "compress image for email attachment",
    "make image smaller for email",
  ],
  openGraph: {
    title: "Reduce Image Size for Email: Get Under 1MB Fast | SammaPix",
    description:
      "Compress photos to under 1MB for email attachments — no quality loss, free, runs entirely in your browser. Works for iPhone photos, DSLR shots, and everything in between.",
    url: `${APP_URL}/blog/reduce-image-size-for-email`,
    type: "article",
    publishedTime: "2026-02-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reduce Image Size for Email: Get Under 1MB Fast",
    description:
      "Compress photos to under 1MB for email — free, no upload required. Works for iPhone photos, DSLR shots, and everything in between.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-02-03";
const POST_DATE_FORMATTED = "February 3, 2026";
const POST_URL = `${APP_URL}/blog/reduce-image-size-for-email`;
const POST_TITLE =
  "How to Reduce Image Size for Email Attachments (Under 1MB Fast)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Learn how to reduce image size for email attachments in four practical methods: compress, resize dimensions, convert to WebP, and combine all three for maximum reduction. Free, browser-based, no signup required.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
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
    "reduce image size for email",
    "compress photo for email",
    "shrink image for email attachment",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

export default function ReduceImageSizeForEmailPage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#E5E5E5] mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-medium bg-[#F5F5F5] dark:bg-[#252525] text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] uppercase tracking-wide">
                Guide
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                {POST_DATE_FORMATTED}
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                &middot; 8 min read
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-[#E5E5E5] leading-snug tracking-tight mb-4">
              {POST_TITLE}
            </h1>
            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed">
              You take a photo on your iPhone, try to send it by email, and the
              upload stalls — or the recipient&apos;s inbox bounces it back.
              Modern smartphones produce photos between 3 MB and 8 MB each. Most
              email providers cap attachments well below that. This guide shows
              you exactly how to reduce image size for email in under two
              minutes, without losing any visible quality.
            </p>
          </header>

          <div className="prose-custom space-y-0">

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80"
                alt="Person composing an email on a laptop with a smartphone nearby"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Sending photos by email is something almost everyone does — and oversized attachments block it every time — Photo by Solen Feyissa on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Email attachment size limits you need to know
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Every email provider enforces a maximum attachment size. These
              limits apply to the total size of all attachments combined in a
              single email — not per file. Sending multiple photos at once makes
              the problem worse fast.
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Email Provider
                    </th>
                    <th className="text-left py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Max Attachment Size
                    </th>
                    <th className="text-left py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      provider: "Gmail",
                      limit: "25 MB",
                      note: "Converts to Google Drive link above 25 MB",
                    },
                    {
                      provider: "Outlook / Hotmail",
                      limit: "20 MB",
                      note: "Offers OneDrive sharing for larger files",
                    },
                    {
                      provider: "Yahoo Mail",
                      limit: "25 MB",
                      note: "Total per email, not per individual file",
                    },
                    {
                      provider: "Apple Mail (iCloud)",
                      limit: "20 MB",
                      note: "Mail Drop sends larger files via iCloud link",
                    },
                    {
                      provider: "Corporate / Business",
                      limit: "5–10 MB",
                      note: "Often much lower — varies by IT policy",
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.provider}
                      className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}
                    >
                      <td className="py-2.5 px-4 font-medium text-gray-800 dark:text-[#E5E5E5]">
                        {row.provider}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-700 dark:text-[#D4D4D4]">
                        {row.limit}
                      </td>
                      <td className="py-2.5 px-4 text-gray-500 dark:text-[#737373]">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              For the complete, official breakdown of Gmail attachment rules, see{" "}
              <a
                href="https://support.google.com/mail/answer/6584"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Google&apos;s official Gmail attachment help page
              </a>
              . The limits look generous on paper — but the reality of modern
              smartphone photos closes that gap very quickly.
            </p>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Why photos from your phone are always too big
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The camera on a modern iPhone shoots at 12 megapixels or higher.
              Each raw photo from that sensor is a 4032 x 3024 pixel image —
              that is over 12 million individual pixels. At typical JPEG quality
              settings, each photo weighs between 3 MB and 6 MB off the camera.
              Shoot in Portrait mode, HDR, or high-efficiency format and the
              sizes climb further.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Android flagships and modern DSLRs are even larger. A 24 MP Sony
              or Canon produces JPEGs between 8 MB and 15 MB per shot. Attach
              three of those to an email and you are already at 30–45 MB —
              well over every provider&apos;s limit.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The good news: you do not need all those pixels for email. At
              normal screen sizes, a 1920 x 1080 image is indistinguishable from
              a 4032 x 3024 image. Reducing the dimensions alone can cut file
              size by 75% or more — before any compression even happens.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                alt="iPhone camera app open showing high resolution photo being taken"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                A single iPhone photo at full resolution can be 5 MB or more — far too large for most email attachments — Photo by Paul Hanaoka on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 1: Compress the image (fastest, best for single photos)
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Compression reduces the amount of data used to encode your image
              without changing its pixel dimensions. A 5 MB iPhone photo at full
              4032 x 3024 resolution can typically be brought down to 500 KB–1
              MB through compression alone, with no visible quality difference at
              normal screen sizes.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The{" "}
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress tool
              </Link>{" "}
              handles this entirely in your browser — your photos never leave
              your device. Drag your photo onto the drop zone, adjust the
              quality slider if needed, and download the compressed version. The
              process takes under ten seconds per photo.
            </p>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5 mb-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-3">
                Recommended compression settings for email
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed flex items-start gap-2">
                  <span className="text-gray-400 dark:text-[#525252] shrink-0 mt-0.5">—</span>
                  <span>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Quality 75–80%</strong> — the sweet spot for email.
                    Visually indistinguishable from the original at screen size,
                    but 50–70% smaller.
                  </span>
                </li>
                <li className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed flex items-start gap-2">
                  <span className="text-gray-400 dark:text-[#525252] shrink-0 mt-0.5">—</span>
                  <span>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Quality 60–70%</strong> — use this if you still need
                    to get smaller. Some loss is visible only at 1:1 zoom on a
                    large monitor.
                  </span>
                </li>
                <li className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed flex items-start gap-2">
                  <span className="text-gray-400 dark:text-[#525252] shrink-0 mt-0.5">—</span>
                  <span>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Avoid quality below 50%</strong> — artifacts become
                    clearly visible at this level. The file size savings are not
                    worth the degradation for anything you are sending to another
                    person.
                  </span>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 2: Resize the image dimensions
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Resizing reduces the number of pixels in your image — from a wide
              original like 4032 x 3024 down to something like 1920 x 1080 or
              1280 x 960. This is one of the most effective ways to reduce image
              size for email because file size scales roughly with the square of
              the pixel dimensions. Halving the width and height reduces the
              pixel count — and thus the file size — by approximately 75%.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              A practical target for email photos is the long edge at 1920
              pixels. That is full 1080p resolution — large enough to look crisp
              on any screen the recipient views it on, but a fraction of the
              original file weight. The{" "}
              <Link
                href="/tools/resizepack"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix ResizePack tool
              </Link>{" "}
              lets you batch-resize multiple photos to exact dimensions or a
              target percentage — download them all as a ZIP and attach to your
              email in one go.
            </p>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5 mb-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-3">
                Resize targets by use case
              </p>
              <ul className="space-y-2">
                {[
                  {
                    label: "Email to friend or family",
                    value: "1280px on the long edge — looks great, very small",
                  },
                  {
                    label: "Email to client (professional)",
                    value: "1920px on the long edge — sharp on any monitor",
                  },
                  {
                    label: "Email for print review",
                    value: "Keep original dimensions, compress only",
                  },
                  {
                    label: "Multiple photos in one email",
                    value: "1000–1280px — keeps total attachment under 5 MB",
                  },
                ].map(({ label, value }) => (
                  <li
                    key={label}
                    className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-gray-400 dark:text-[#525252] shrink-0 mt-0.5">—</span>
                    <span>
                      <strong className="text-gray-800 dark:text-[#E5E5E5]">{label}:</strong>{" "}
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 3: Convert to WebP (30% smaller than JPEG)
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              WebP is a modern image format developed by Google. At equivalent
              visual quality, WebP files are typically 25–35% smaller than JPEG
              files. That means a 3 MB JPEG photo can become a 2 MB WebP — just
              by changing the format, without changing the dimensions or lowering
              the quality setting.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The one consideration with WebP for email is compatibility. Modern
              email clients on web (Gmail, Outlook.com, Yahoo Mail) and iOS/
              Android handle WebP without issues. Older desktop email clients
              like Outlook 2016 or Thunderbird on older systems may not display
              WebP images inline — but they will still receive and allow
              downloading the attachment. If you are unsure, stick to JPEG or
              use Method 4 below which combines everything.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              To convert your photos to WebP, use the{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP converter
              </Link>
              . Drop in your JPEGs or PNGs and download them as WebP in seconds.
              Everything runs in your browser — nothing is uploaded to any
              server.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80"
                alt="Close-up of image files and folders on a computer desktop"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Choosing the right format can shave megabytes off your attachments before you touch any quality settings — Photo by Jess Bailey on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 4: Combine all three for maximum reduction
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              For the smallest possible file that still looks good in an email,
              stack all three techniques in order. Resize first — dimensions are
              the biggest single contributor to file weight. Then compress.
              Finally, if compatibility is not a concern, convert to WebP. Each
              step stacks on the previous one and the results are dramatic.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The workflow takes under two minutes for a batch of photos using
              browser-based tools. No software to install, no account to create,
              no files sent to any server.
            </p>

            <ol className="mb-6 space-y-3">
              {[
                {
                  step: "1",
                  title: "Resize to 1920px",
                  desc: "Use ResizePack to bring the long edge to 1920 pixels. This alone can reduce a 5 MB photo to around 1.5–2 MB.",
                },
                {
                  step: "2",
                  title: "Compress at 75–80% quality",
                  desc: "Run the resized file through SammaPix Compress. The 1.5–2 MB photo typically drops to 300–600 KB at quality 78.",
                },
                {
                  step: "3",
                  title: "Convert to WebP (optional)",
                  desc: "For an additional 25–30% reduction, run the compressed file through the WebP converter. A 400 KB JPEG becomes roughly 280–300 KB as WebP.",
                },
              ].map(({ step, title, desc }) => (
                <li
                  key={step}
                  className="flex items-start gap-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3"
                >
                  <span className="text-xs font-semibold text-gray-400 dark:text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] rounded px-2 py-0.5 shrink-0 mt-0.5">
                    Step {step}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">
                      {title}
                    </strong>{" "}
                    — {desc}
                  </span>
                </li>
              ))}
            </ol>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Quick reference: how much each method reduces your photo
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The table below uses a representative starting point: a 5 MB JPEG
              photo from a 12 MP iPhone at 4032 x 3024 pixels. Your results will
              vary by photo content — busy outdoor scenes compress less than
              smooth sky backgrounds — but this gives a reliable reference range.
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Method applied
                    </th>
                    <th className="text-right py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Approx. file size
                    </th>
                    <th className="text-right py-2.5 px-4 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                      Reduction from original
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      method: "Original (5 MB iPhone JPEG, 4032x3024)",
                      size: "5.0 MB",
                      reduction: "—",
                      highlight: false,
                    },
                    {
                      method: "Compress only (quality 78%)",
                      size: "1.2–1.8 MB",
                      reduction: "~65%",
                      highlight: false,
                    },
                    {
                      method: "Resize only (to 1920x1440)",
                      size: "1.4–2.0 MB",
                      reduction: "~60%",
                      highlight: false,
                    },
                    {
                      method: "Convert to WebP only",
                      size: "3.2–3.8 MB",
                      reduction: "~30%",
                      highlight: false,
                    },
                    {
                      method: "Resize + Compress",
                      size: "300–600 KB",
                      reduction: "~88%",
                      highlight: false,
                    },
                    {
                      method: "Resize + Compress + WebP",
                      size: "200–420 KB",
                      reduction: "~92%",
                      highlight: true,
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.method}
                      className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${
                        row.highlight
                          ? "bg-indigo-50 dark:bg-indigo-950/20"
                          : i % 2 === 0
                          ? ""
                          : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                      }`}
                    >
                      <td
                        className={`py-2.5 px-4 ${
                          row.highlight
                            ? "font-semibold text-indigo-800 dark:text-indigo-300"
                            : "text-gray-700 dark:text-[#D4D4D4]"
                        }`}
                      >
                        {row.method}
                      </td>
                      <td
                        className={`py-2.5 px-4 text-right font-semibold ${
                          row.highlight
                            ? "text-indigo-800 dark:text-indigo-300"
                            : "text-gray-700 dark:text-[#D4D4D4]"
                        }`}
                      >
                        {row.size}
                      </td>
                      <td
                        className={`py-2.5 px-4 text-right ${
                          row.highlight
                            ? "font-semibold text-indigo-700 dark:text-indigo-400"
                            : "text-gray-500 dark:text-[#737373]"
                        }`}
                      >
                        {row.reduction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              A 5 MB photo that has been resized, compressed, and converted to
              WebP is around 300 KB on average. You can comfortably attach ten
              of them to a single email and stay well under any provider&apos;s
              limit. Even keeping it to JPEG — resize and compress only — brings
              you from 5 MB to under 600 KB per photo.
            </p>

            {/* CTA inline */}
            <Link
              href="/tools/compress"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-6 mb-8"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free tool — no signup, no upload
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Compress your photos for email now — reduce to under 1 MB in seconds
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Tips for batch compressing multiple photos for email
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              When you need to email an entire album — a wedding set, a real
              estate shoot, a holiday collection — compressing one photo at a
              time is not practical. Here is how to handle batches efficiently.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Use batch tools that produce a ZIP download.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              SammaPix processes up to dozens of photos at once and lets you
              download them all as a single ZIP archive. Drag your entire photo
              set onto the drop zone, set the quality, and click download. The
              full batch is ready in under a minute for most photo sets.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Split large batches across multiple emails.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Even after compression, if you are sending 40 photos at 300 KB
              each, that is 12 MB — right at the edge of many limits. Split
              large sets into two or three emails of 10–15 photos each. Label
              them clearly in the subject line: &ldquo;Event photos — Part 1 of
              3.&rdquo; This is safer and more reliable than trying to squeeze
              everything into one send.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Consider a sharing link for very large sets.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              If you are sending more than 20–30 photos, a cloud share link is
              genuinely more practical than email attachments. Google Photos,
              iCloud shared albums, and Dropbox all let you create a link the
              recipient can use to browse and download at their own pace. Email
              is fine for a handful of photos — for full event galleries, a link
              is the better tool.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Set a consistent target size before you start.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Before batch-processing, decide on your target. For most personal
              email use, aim for 300–500 KB per photo with a resize to 1920px
              and quality at 78%. For professional client delivery where
              recipients may print or crop, keep quality at 85% and resize to no
              smaller than 2400px. Having a clear target before you start a
              batch means you do not need to re-process.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                alt="Multiple image files displayed in a file manager grid view"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Batch compressing a full event album takes under a minute with the right tool — Photo by imgix on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              What about using your phone to compress photos for email?
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Both iOS and Android offer built-in options to reduce image size
              when sharing. On iPhone, when you tap &ldquo;Share&rdquo; and
              choose Mail, iOS may prompt you to pick a size: Small, Medium,
              Large, or Actual Size. &ldquo;Medium&rdquo; typically targets
              around 300 KB and &ldquo;Large&rdquo; around 750 KB. These are
              decent options for casual sends.
            </p>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The limitation is control. The built-in share sheet does not tell
              you the exact output size before you send. For important emails
              where you need to stay under a specific limit, browser-based tools
              give you a precise file size readout before downloading, so there
              are no surprises.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            {/* FAQ */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "What is the ideal file size for an email attachment photo?",
                  a: "For most purposes, aim for 300–800 KB per photo. This is large enough to look good on any screen but small enough that ten photos stay under 10 MB total — comfortably within all major provider limits. For professional client work, 1–2 MB per photo is acceptable.",
                },
                {
                  q: "Does compressing a photo for email reduce its quality permanently?",
                  a: "Yes — lossy compression permanently discards some data. Always keep your original uncompressed file safe and compress a copy. The visual difference at 75–80% quality is not visible at normal email viewing sizes, but the data loss is permanent in the compressed file.",
                },
                {
                  q: "Why does my email say the attachment is too large even under the limit?",
                  a: "Email providers measure attachment size after MIME encoding, which adds approximately 33% overhead to binary files. A 15 MB file becomes roughly 20 MB after encoding. If you are near the limit, compress down to 60–70% of the provider's stated maximum to be safe.",
                },
                {
                  q: "Can I reduce image size for email on a phone without installing an app?",
                  a: "Yes. SammaPix works in any mobile browser — Chrome, Safari, Firefox on iOS or Android. Open sammapix.com/tools/compress on your phone, drop in your photos, and download the compressed versions. No app installation required.",
                },
                {
                  q: "Should I send photos as JPEG or PNG in email?",
                  a: "JPEG for photographs, always. PNG files of photographic content are enormous — a 3 MB JPEG can become 15–20 MB as a PNG. Use JPEG (or WebP for modern recipients) and never PNG for photos you are attaching to emails.",
                },
                {
                  q: "How do I reduce image size for email on a Mac or Windows PC?",
                  a: "The fastest method on any computer is to use a browser-based tool. Go to sammapix.com/tools/compress, drag your photos in, and download the compressed versions. No software installation needed on either platform.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">
                    {q}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Share section */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-3">
              Share this article
            </p>
            <div className="flex items-center gap-3">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on X (Twitter)"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                Share on X
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* End CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Reduce image size for email — free, no signup required
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-5">
                Drag your photos into SammaPix and compress them to under 1 MB
                in seconds. Batch processing, ZIP download, and everything runs
                in your browser — your files never leave your device.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/compress"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Compress photos
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/tools/resizepack"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Resize photos
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/tools/webp"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Convert to WebP
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              {[
                {
                  href: "/blog/compress-images-without-losing-quality",
                  tag: "Optimization",
                  tagColor: "text-green-700",
                  title:
                    "Compress Images Without Losing Quality (2026)",
                },
                {
                  href: "/blog/complete-guide-webp-format",
                  tag: "Formats",
                  tagColor: "text-blue-700",
                  title:
                    "The Complete Guide to WebP: Why Every Photographer Should Use It",
                },
                {
                  href: "/blog/best-image-compression-tools-2026",
                  tag: "Comparison",
                  tagColor: "text-orange-700",
                  title:
                    "Best Free Image Compression Tools in 2026 — Compared",
                },
              ].map(({ href, tag, tagColor, title }) => (
                <Link key={href} href={href} className="flex items-start gap-3 group">
                  <span
                    className={`text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 ${tagColor}`}
                  >
                    {tag}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </div>
    </div>
  );
}
