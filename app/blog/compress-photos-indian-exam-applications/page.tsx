import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "How to Compress Photos for Indian Exam Applications (JEE, NEET, UPSC, SSC)",
  description:
    "Every year, millions of Indian students lose hours fighting with photo upload requirements for JEE, NEET, UPSC, SSC, and GATE applications. The form says '10-200KB, JPG, 3.5\u00d74.5cm' but your phone photo is 5MB. Here's how to get it right in under 2 minutes \u2014 free, no app install needed.",
  alternates: {
    canonical: `${APP_URL}/blog/compress-photos-indian-exam-applications`,
  },
  keywords: [
    "compress photo for JEE NEET application",
    "compress photo for JEE application",
    "NEET photo size KB",
    "compress image to 100KB for exam",
    "JEE photo requirements 2026",
    "UPSC photo upload size",
    "compress signature for exam form",
  ],
  openGraph: {
    title: "How to Compress Photos for Indian Exam Applications (JEE, NEET, UPSC, SSC)",
    description:
      "Step-by-step guide to compress and resize photos for JEE, NEET, UPSC, SSC, and GATE exam forms. Free, instant, no app install.",
    url: `${APP_URL}/blog/compress-photos-indian-exam-applications`,
    type: "article",
    publishedTime: "2026-04-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Photos for Indian Exam Applications (JEE, NEET, UPSC, SSC)",
    description:
      "Step-by-step guide to compress photos for JEE, NEET, UPSC, SSC, and GATE exam forms. Free, instant, works on phone.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-09";
const POST_DATE_FORMATTED = "April 9, 2026";
const POST_URL = `${APP_URL}/blog/compress-photos-indian-exam-applications`;
const POST_TITLE = "How to Compress Photos for Indian Exam Applications (JEE, NEET, UPSC, SSC)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Step-by-step guide to compress and resize photos for JEE, NEET, UPSC, SSC, and GATE exam applications. Free online tool, no app install needed.",
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
    "compress photo for JEE NEET application",
    "compress photo for JEE application",
    "NEET photo size KB",
    "compress image to 100KB for exam",
    "JEE photo requirements 2026",
    "UPSC photo upload size",
    "compress signature for exam form",
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
      name: "How do I compress my photo to exactly 100KB for JEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use sammapix.com/compress-to/100kb. Drop your photo, the tool automatically compresses to under 100KB while keeping maximum quality. No signup needed.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my photo keep getting rejected on the NTA website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually it's one of: file too large (over 200KB), wrong format (HEIC instead of JPG), wrong dimensions, or background not white enough. Compress first, then upload.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use SammaPix on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It works in any mobile browser (Chrome, Safari). No app download needed. Open the website, drop your photo, download the compressed version.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between 50KB and 200KB quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At 200KB a passport photo looks sharp and clear. At 50KB there's slight softness but still acceptable for exam forms. The tool preserves maximum quality at any target size.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to compress my signature separately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Signature files have different size limits (usually 4-30KB) and different dimensions. Compress the signature as a separate file.",
      },
    },
  ],
};

export default function CompressPhotosIndianExamApplicationsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="compress-photos-indian-exam-applications"
        description="Every year, millions of Indian students lose hours fighting with photo upload requirements for JEE, NEET, UPSC, SSC, and GATE applications. The form says &apos;10-200KB, JPG, 3.5&times;4.5cm&apos; but your phone photo is 5MB. Here&apos;s how to get it right in under 2 minutes &mdash; free, no app install needed."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={8}
        headings={[
          { id: "why-exam-forms-reject-photo", title: "Why exam forms keep rejecting your photo" },
          { id: "exact-requirements-by-exam", title: "Exact requirements by exam" },
          { id: "step-by-step-compress", title: "Step-by-step \u2014 compress your photo in 2 minutes" },
          { id: "compress-exact-sizes", title: "Compress to EXACT sizes (50KB, 100KB, 200KB)" },
          { id: "signature-compression", title: "Signature compression \u2014 the often-forgotten part" },
          { id: "passport-photo-for-exam", title: "What about passport photo for the exam?" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Phone cameras produce photos at 3\u20138MB \u2014 Indian exam forms (JEE, NEET, UPSC, SSC, GATE) require 10\u2013200KB in JPG format with specific dimensions.",
          "Each exam has different photo and signature size limits. JEE Main and NEET require 10\u2013200KB for photos and 4\u2013100KB for signatures.",
          "SammaPix compress-to tools let you target an exact file size (50KB, 100KB, 200KB) \u2014 no guessing, no repeated uploads.",
          "Signature files have stricter limits (4\u201330KB) and must be compressed separately from the photo.",
          "Everything works in your phone browser \u2014 no app install, no signup, no upload to external servers.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
              alt="Student studying for exam at desk with notes and laptop, representing Indian exam application preparation"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Millions of Indian students face photo upload rejections every exam season &mdash; the fix takes 2 minutes - Photo by Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Compress your exam photo now &mdash; free, instant
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your photo, set the target size (50KB, 100KB, 200KB), download. Works on phone and computer. No signup, no app, no upload to servers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Compress Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/compress-to/100kb"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress to 100KB
              </Link>
            </div>
          </div>
        }
      >
        {/* Section: Why exam forms keep rejecting your photo */}
        <h2 id="why-exam-forms-reject-photo" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why exam forms keep rejecting your photo
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You take a photo with your phone, try to upload it to the JEE or NEET application form, and it fails. No clear error message &mdash; sometimes just &ldquo;file too large&rdquo; or the upload silently does nothing. Here is why it keeps happening:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            { label: "File size mismatch", detail: "Phone cameras produce photos at 3\u20138MB. Exam forms want 50\u2013200KB \u2014 that is 20 to 100 times smaller than what your phone outputs." },
            { label: "Wrong dimensions", detail: "The required dimensions must be exact: 3.5\u00d74.5cm at 200 DPI equals 413\u00d7531 pixels. Your phone photo is likely 4000\u00d73000 pixels or larger." },
            { label: "Wrong format", detail: "iPhones save photos as HEIC by default. Exam forms need JPG. If you upload a HEIC file, the form will reject it without telling you why." },
            { label: "Background problems", detail: "Exam forms require a plain white background. Selfies taken against a wall, in a room, or outdoors will be rejected during verification even if the upload succeeds." },
            { label: "Signature is different", detail: "The signature upload has completely different requirements \u2014 usually 10\u201330KB, different dimensions, and must be on white paper with blue or black ink." },
            { label: "Vague error messages", detail: "NTA and other portals often show generic errors like \"invalid file\" or just fail silently. You have no idea which requirement you are violating." },
          ].map(({ label, detail }) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              <span><strong className="text-[#171717] dark:text-[#E5E5E5]">{label}</strong> &mdash; {detail}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The good news: every single one of these problems is fixable in under 2 minutes with the right tool. You do not need to install an app or visit a photo studio.
        </p>

        {/* Section: Exact requirements by exam */}
        <h2 id="exact-requirements-by-exam" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Exact requirements by exam
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Here are the photo and signature upload requirements for the major Indian competitive exams, verified from official sources:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Exam</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Photo Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Signature Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Dimensions</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Format</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Background</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">JEE Main (NTA)</td>
                <td className="px-4 py-2.5 text-xs">10&ndash;200KB</td>
                <td className="px-4 py-2.5 text-xs">10&ndash;100KB</td>
                <td className="px-4 py-2.5 text-xs">3.5&times;4.5cm</td>
                <td className="px-4 py-2.5 text-xs">JPG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">NEET UG</td>
                <td className="px-4 py-2.5 text-xs">10&ndash;200KB</td>
                <td className="px-4 py-2.5 text-xs">4&ndash;30KB</td>
                <td className="px-4 py-2.5 text-xs">3.5&times;4.5cm</td>
                <td className="px-4 py-2.5 text-xs">JPG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">GATE</td>
                <td className="px-4 py-2.5 text-xs">10&ndash;200KB</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
                <td className="px-4 py-2.5 text-xs">3.5&times;4.5cm</td>
                <td className="px-4 py-2.5 text-xs">JPG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">SSC GD</td>
                <td className="px-4 py-2.5 text-xs">20&ndash;50KB</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
                <td className="px-4 py-2.5 text-xs">3.5&times;4.5cm</td>
                <td className="px-4 py-2.5 text-xs">JPG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">UPSC CSE</td>
                <td className="px-4 py-2.5 text-xs">20&ndash;300KB</td>
                <td className="px-4 py-2.5 text-xs">varies</td>
                <td className="px-4 py-2.5 text-xs">varies by notification</td>
                <td className="px-4 py-2.5 text-xs">JPG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
              <tr className="last:border-b-0 bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">CAT</td>
                <td className="px-4 py-2.5 text-xs">max 80KB</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
                <td className="px-4 py-2.5 text-xs">JPEG</td>
                <td className="px-4 py-2.5 text-xs">White</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4 text-xs italic">
          UPSC requirements vary by notification. Always check the official bulletin for your specific exam session. The ranges above are typical but not guaranteed.
        </p>
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4 text-xs italic">
          JEE Main has conflicting sources (200KB vs 300KB max). We recommend targeting under 200KB to be safe &mdash; if the form accepts up to 300KB, your 200KB photo will still work.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The safe strategy: compress your photo to under 100KB. This fits within every exam&apos;s requirements. Use{" "}
          <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress to 100KB
          </Link>
          {" "}to hit that target automatically.
        </p>

        {/* Section: Step-by-step */}
        <h2 id="step-by-step-compress" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step &mdash; compress your photo in 2 minutes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Follow these seven steps exactly. You will go from a 5MB phone photo to an exam-ready compressed JPG in under 2 minutes:
        </p>
        <ol className="space-y-3 mb-6 pl-4 list-decimal list-inside">
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Take the photo correctly</strong> &mdash; stand against a plain white wall, face the camera straight, both ears visible, no glasses, neutral expression. Use a friend or a phone timer on a shelf &mdash; not a selfie. The front camera distorts your face.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Open{" "}
            <Link href="/tools/compress" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
              SammaPix Compress
            </Link></strong> &mdash; go to sammapix.com/tools/compress in any browser on your phone or computer. No app install, no signup.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Drop your photo</strong> &mdash; drag the image file from your phone gallery or computer. On mobile, tap to select from your photo library.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Set quality to 70%</strong> &mdash; start at 70%. Check the output size shown below your image. If still above your exam&apos;s limit, reduce to 60%. For most exams, 70% gets you well under 200KB.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Check the size</strong> &mdash; SammaPix shows the compressed file size instantly. Need exactly under 100KB? Use the dedicated{" "}
            <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
              Compress to 100KB
            </Link>
            {" "}tool instead &mdash; it automatically finds the right quality level for your exact target.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Download</strong> &mdash; the compressed JPG downloads at the size you need. The filename stays the same so you know which file it is.
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Upload to the exam form</strong> &mdash; done. The form accepts your photo on the first try. No more rejection, no more guessing.
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Everything happens in your browser. Your photo is never uploaded to any server &mdash; the compression runs locally on your device. This means it works even on slow connections.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/compress" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool &mdash; no signup required</p>
            <p className="text-sm font-semibold text-white leading-snug">Compress your exam photo now &mdash; works on phone and computer</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Compress to EXACT sizes */}
        <h2 id="compress-exact-sizes" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Compress to EXACT sizes (50KB, 100KB, 200KB)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Guessing quality percentages is frustrating. SammaPix has dedicated pages that compress your photo to an exact target file size. You drop your photo, and the tool keeps reducing quality until it hits your target &mdash; automatically. No trial and error.
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link href="/compress-to/50kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors font-medium">
                Compress to 50KB
              </Link>
              {" "}&mdash; for SSC GD and other strict forms that cap at 50KB
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors font-medium">
                Compress to 100KB
              </Link>
              {" "}&mdash; the safe target for JEE, NEET, and GATE. Fits within every exam&apos;s range.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors font-medium">
                Compress to 200KB
              </Link>
              {" "}&mdash; for UPSC and more lenient forms that allow up to 200&ndash;300KB
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors font-medium">
                Compress to 20KB
              </Link>
              {" "}&mdash; for signature files that need to be under 30KB
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These tools keep reducing quality until the exact target is hit. You do not have to guess. Drop your photo, get a file at exactly the size you need.
        </p>

        {/* Section: Signature compression */}
        <h2 id="signature-compression" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Signature compression &mdash; the often-forgotten part
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most students focus on the photo and forget about the signature upload. Signature requirements are stricter than photo requirements &mdash; NEET asks for 4&ndash;30KB, JEE Main for 10&ndash;100KB. A phone photo of your signature will be 2&ndash;5MB. You need to compress it down to under 30KB.
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            "Sign on white paper with a blue or black ink pen \u2014 not pencil, not gel pen",
            "Photograph or scan the signature with good lighting \u2014 avoid shadows across the paper",
            "The background must be pure white. If your photo has a grayish background, the file size will be larger and it may be rejected",
            "Crop tightly around the signature before compressing \u2014 remove all extra whitespace around the edges",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use{" "}
          <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress to 20KB
          </Link>
          {" "}for NEET signatures or{" "}
          <Link href="/compress-to/30kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress to 30KB
          </Link>
          {" "}if your exam allows a slightly larger file. The tool automatically finds the right quality to hit the target without making the signature unreadable.
        </p>

        {/* Section: What about passport photo for the exam? */}
        <h2 id="passport-photo-for-exam" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What about passport photo for the exam?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Many Indian exams require a passport-size photo &mdash; 3.5&times;4.5cm (35&times;45mm). This is the Indian passport photo standard, not the US 2&times;2 inch format. Your phone photo needs to be cropped to these exact dimensions before compression.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix has a dedicated{" "}
          <Link href="/passport-photo/india" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            India Passport Photo
          </Link>
          {" "}tool that crops your photo to the exact 3.5&times;4.5cm dimensions and removes the background with AI, replacing it with pure white. You can also use the{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Passport Photo tool
          </Link>
          {" "}to select India as your country and get the right dimensions automatically.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Important:</strong> the passport photo tool handles dimensions and background. You still need to compress the output file separately to meet the exam&apos;s file size requirement. Crop first with the passport tool, then compress with{" "}
          <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress to 100KB
          </Link>
          .
        </p>

        {/* Related guides & tools */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/compress-to/50kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 50KB
            </Link>
            <Link href="/compress-to/100kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 100KB
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/compress-to/20kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 20KB
            </Link>
            <Link href="/passport-photo/india" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              India Passport Photo
            </Link>
            <Link href="/resize/passport" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize for Passport
            </Link>
            <Link href="/blog/passport-photo-at-home-free" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Guide: Passport Photo at Home
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I compress my photo to exactly 100KB for JEE?",
                a: "Use sammapix.com/compress-to/100kb. Drop your photo, the tool automatically compresses to under 100KB while keeping maximum quality. No signup needed. It works on your phone browser too.",
              },
              {
                q: "Why does my photo keep getting rejected on the NTA website?",
                a: "Usually it\u2019s one of four things: file too large (over 200KB), wrong format (HEIC instead of JPG), wrong dimensions (not 3.5\u00d74.5cm), or background not white enough. Compress and crop your photo before uploading to fix all of these at once.",
              },
              {
                q: "Can I use SammaPix on my phone?",
                a: "Yes. SammaPix works in any mobile browser \u2014 Chrome, Safari, Samsung Internet. No app download needed. Open the website, select your photo from your gallery, and download the compressed version. Everything runs locally on your device.",
              },
              {
                q: "What\u2019s the difference between 50KB and 200KB quality?",
                a: "At 200KB a passport photo looks sharp and clear. At 50KB there is slight softness but it is still perfectly acceptable for exam forms. The compress-to tools preserve maximum quality at any target size \u2014 they only reduce quality as much as needed to hit the target.",
              },
              {
                q: "Do I need to compress my signature separately?",
                a: "Yes. Signature files have different size limits (usually 4\u201330KB) and different dimensions than the photo. Compress the signature as a separate file using the Compress to 20KB or Compress to 30KB tools.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
