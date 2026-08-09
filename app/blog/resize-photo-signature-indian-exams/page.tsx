import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Resize Photo & Signature for Indian Exams (2026 Guide)",
  description:
    "Exact pixel and KB specs for UPSC, SSC, IBPS, RRB, NEET, and state PSC applications. Step-by-step guide to resize your photo and signature to the right size, free, with no upload.",
  alternates: {
    canonical: `${APP_URL}/blog/resize-photo-signature-indian-exams`,
  },
  keywords: [
    "resize photo for exam",
    "photo and signature size for upsc",
    "ssc photo signature size",
    "resize signature to 20kb",
    "exam photo size 200x230",
    "how to resize photo in kb",
    "resize photo for indian government exam",
    "signature size for online application",
  ],
  openGraph: {
    title: "Resize Photo & Signature for Indian Exams (2026 Guide)",
    description:
      "Exact specs and free tools for UPSC, SSC, IBPS, NEET exam photo and signature uploads. Resize pixels and hit the exact KB limit, no upload required.",
    url: `${APP_URL}/blog/resize-photo-signature-indian-exams`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Photo & Signature for Indian Exams (2026 Guide)",
    description:
      "UPSC, SSC, IBPS, NEET exam photo and signature specs in one place. Free tools to resize to exact pixels and KB, no upload needed.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/resize-photo-signature-indian-exams`;
const POST_TITLE = "Resize Photo & Signature for Indian Exams (2026 Guide)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A definitive, accurate guide to photo and signature size requirements for Indian government exam applications including UPSC, SSC, IBPS, RRB, state PSC, and NEET. Covers exact pixel dimensions, file size limits, background rules, and step-by-step instructions to resize using free browser tools with no upload.",
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
    "resize photo for exam",
    "photo and signature size for upsc",
    "ssc photo signature size",
    "resize signature to 20kb",
    "exam photo size 200x230",
    "how to resize photo in kb",
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
      name: "What is the photo size for UPSC online application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For UPSC CSE and most UPSC exams, the photo must be 200x230 pixels, in JPEG format, with a file size between 20 KB and 300 KB. The background must be plain white or off-white. The face should be centered, without shadows. Always confirm the exact requirement in the current official notification before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get my signature under 20KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign on white paper with black ink, scan or photograph it, then crop tightly to remove excess white space. Open the SammaPix compress tool at sammapix.com/tools/compress and compress until the file is below 20 KB. Alternatively, use sammapix.com/compress-to/20kb to hit 20 KB directly. The tool runs in your browser and nothing is uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "What background is required for exam application photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Almost all Indian government exam portals require a plain white or off-white background. Coloured, patterned, or outdoor backgrounds cause rejection. Use the SammaPix Passport Photo tool at sammapix.com/tools/passport-photo to automatically replace any background with a clean white one that meets exam requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does the photo need to be in JPEG format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. UPSC, SSC, IBPS, RRB, and nearly all Indian government exam portals accept only JPEG (also written as JPG). PNG, HEIC, and WEBP files are rejected. If your photo is in another format, you can convert it to JPG using SammaPix before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "Is SammaPix free to use for exam photo resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The resize, compress, passport photo, and crop tools on SammaPix are free to use without creating an account. There are no watermarks added to your photos. You can resize, crop, and compress as many photos as you need.",
      },
    },
    {
      "@type": "Question",
      name: "Are my identity documents uploaded to a server when I use SammaPix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All SammaPix tools run entirely inside your browser using client-side processing. Your photo and signature files never leave your device. No file is sent to any server, which makes SammaPix safe for preparing identity documents and sensitive exam materials.",
      },
    },
    {
      "@type": "Question",
      name: "What are the SSC photo and signature requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For SSC exams, the photo should be approximately 3.5 x 4.5 cm (roughly 100 KB or less), in JPEG format, with a plain white background. The signature must be in black ink on white paper, scanned clearly, and is typically accepted between 10 KB and 30 KB. Always verify with the current SSC official notification as requirements may vary by exam.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Resize a Photo for Indian Exam Applications",
  description:
    "Step-by-step instructions to resize and compress your photo and signature to meet Indian government exam portal requirements.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check the official notification",
      text: "Open the official exam notification PDF and note the exact pixel dimensions, file size range, format, and background colour required for both the photo and the signature.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Prepare a clean white-background photo",
      text: "Use the SammaPix Passport Photo tool (sammapix.com/tools/passport-photo) to place your face on a plain white background. This handles the background requirement automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Crop to the correct aspect ratio",
      text: "Open sammapix.com/tools/croproatio, upload your photo, and set the crop dimensions to match the exam requirement (for example, 200x230 pixels for UPSC). Download the cropped file.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Resize to exact pixel dimensions",
      text: "Use sammapix.com/tools/resizepack, enter the exact pixel width and height specified in the notification, and download the resized JPEG.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compress to the required KB limit",
      text: "Open sammapix.com/compress-to/20kb (replace 20kb with your target, such as 50kb or 100kb) and upload the resized photo. The tool compresses it to exactly that file size. For signatures, the same process applies.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Verify and upload",
      text: "Check the final file size on your computer before uploading to the exam portal. If the portal still rejects the file, confirm the exact requirement again and repeat from step 4.",
    },
  ],
};

export default function ResizePhotoSignatureIndianExamsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="resize-photo-signature-indian-exams"
        description={`Every year, millions of applicants filling out UPSC, SSC, IBPS, and NEET forms hit the same wall: the portal demands a photo at 200x230 pixels and under 50 KB, but the phone camera produces a 4 MB HEIC file with the wrong dimensions and no idea how to fix it. This guide gives you the exact specifications for the most common exam portals, a clear explanation of the rules, and a free, step-by-step workflow using browser tools that process everything on your device without uploading your identity documents anywhere.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "quick-reference-table", title: "Quick reference: photo and signature specs by exam" },
          { id: "photo-rules", title: "Photo rules that apply to almost every portal" },
          { id: "signature-rules", title: "Signature rules and common mistakes" },
          { id: "step-by-step", title: "Step-by-step: resize and compress with free tools" },
          { id: "common-rejection-reasons", title: "Common rejection reasons and how to avoid them" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "UPSC requires a photo at 200x230 pixels, 20 to 300 KB, JPEG, plain white background. The signature must be 350 to 500 pixels wide and between 20 and 100 KB.",
          "SSC requires a photo roughly 3.5 x 4.5 cm (approximately 100 KB or less, JPEG, white background). Signature: 10 to 30 KB, black ink on white paper.",
          "IBPS, RRB, and state PSC portals vary significantly. Always verify the exact specification in the current official notification before uploading.",
          "Use SammaPix Passport Photo to get a clean white background, then resize pixels with Resizepack or CropRatio, then hit the exact KB limit with the compress-to tool.",
          "Everything runs client-side in your browser. No file is ever uploaded, which matters when preparing identity documents for government applications.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
              alt="Student filling out an online exam application form on a laptop, preparing documents for UPSC or SSC registration"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting the photo and signature dimensions right is one of the most common friction points in Indian exam applications. Photo by Green Chameleon on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Resize your exam photo and signature for free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              All tools run entirely in your browser. No file is uploaded, no account needed. Prepare your photo and signature in under two minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Resize to Exact Pixels
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/compress-to/20kb"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress to 20 KB
              </Link>
              <Link
                href="/tools/passport-photo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                White Background Photo
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick answer box */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            For UPSC: photo at 200x230 px, 20 to 300 KB, JPEG, white background. Signature: 350 to 500 px wide, 20 to 100 KB.
            For SSC: photo roughly 3.5x4.5 cm, up to 100 KB, JPEG. Signature: 10 to 30 KB, black ink on white.
            For IBPS, RRB, and state PSCs: requirements vary, so always check the current notification.
            Use{" "}
            <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              Resizepack
            </Link>{" "}
            for pixel dimensions,{" "}
            <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              compress-to
            </Link>{" "}
            for KB targets, and{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              Passport Photo
            </Link>{" "}
            for a clean white background. All free, all client-side (no upload).
          </p>
        </div>

        {/* Section: Quick reference table */}
        <h2 id="quick-reference-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Quick reference: photo and signature specs by exam
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The table below lists the most commonly required specifications for major Indian exam portals. These are the standard values based on official notifications. Requirements can change each recruitment cycle, so treat this as a reliable starting point and always confirm the exact specification in the notification PDF for your specific exam and year.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Exam / Portal</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Photo dimensions</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Photo file size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Signature size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Format</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Background</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">UPSC (CSE, CDS, NDA)</td>
                <td className="px-4 py-2.5 text-xs">200 x 230 px</td>
                <td className="px-4 py-2.5 text-xs">20 KB to 300 KB</td>
                <td className="px-4 py-2.5 text-xs">350 to 500 px wide, 20 to 100 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
                <td className="px-4 py-2.5 text-xs">Plain white or off-white</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">SSC (CGL, CHSL, MTS, CPO)</td>
                <td className="px-4 py-2.5 text-xs">3.5 x 4.5 cm (approx. 413 x 531 px at 300 DPI)</td>
                <td className="px-4 py-2.5 text-xs">Up to 100 KB</td>
                <td className="px-4 py-2.5 text-xs">10 KB to 30 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
                <td className="px-4 py-2.5 text-xs">Plain white</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">IBPS (PO, Clerk, SO, RRB)</td>
                <td className="px-4 py-2.5 text-xs">Varies by notification (commonly 200x230 or similar)</td>
                <td className="px-4 py-2.5 text-xs">20 KB to 50 KB (photo), 10 to 20 KB (signature)</td>
                <td className="px-4 py-2.5 text-xs">10 KB to 20 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
                <td className="px-4 py-2.5 text-xs">White, face visible</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">RRB (NTPC, Group D, JE)</td>
                <td className="px-4 py-2.5 text-xs">Varies (check notification)</td>
                <td className="px-4 py-2.5 text-xs">20 KB to 50 KB (typical)</td>
                <td className="px-4 py-2.5 text-xs">10 KB to 20 KB (typical)</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
                <td className="px-4 py-2.5 text-xs">Plain white</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">NEET (UG)</td>
                <td className="px-4 py-2.5 text-xs">3.5 x 4.5 cm, minimum 10 KB</td>
                <td className="px-4 py-2.5 text-xs">10 KB to 200 KB</td>
                <td className="px-4 py-2.5 text-xs">10 KB to 30 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
                <td className="px-4 py-2.5 text-xs">White, no cap, no sunglasses</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">State PSC (MPSC, UPPSC, BPSC, etc.)</td>
                <td className="px-4 py-2.5 text-xs">Varies widely by state and year</td>
                <td className="px-4 py-2.5 text-xs">Check the notification</td>
                <td className="px-4 py-2.5 text-xs">Check the notification</td>
                <td className="px-4 py-2.5 text-xs">Usually JPEG</td>
                <td className="px-4 py-2.5 text-xs">Usually plain white</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md mb-6">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">Important note</p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            IBPS, RRB, and state PSC portals update their specifications with each recruitment cycle. The values in this table are representative of common past requirements. Always download the current official notification and read the photo upload instructions before preparing your files.
          </p>
        </div>

        {/* Section: Photo rules */}
        <h2 id="photo-rules" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Photo rules that apply to almost every portal
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even though different portals have different pixel dimensions and KB limits, the underlying photo quality rules are remarkably consistent across all Indian government exam applications. Getting these right prevents the most common rejection scenarios.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Background: plain white or off-white only</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the single most common reason applications are rejected at the document verification stage. The background must be plain white or very light off-white. Cream, light grey, light blue, or any other colour is not acceptable, even if it appears nearly white to the eye. Outdoor backgrounds, studio gradient backgrounds, and walls with patterns or colours are rejected without exception.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If your original photo does not have a white background, the easiest fix is to use{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            the SammaPix Passport Photo tool
          </Link>. Upload your photo, and the tool automatically removes the background and replaces it with a clean white one. No app installation needed, no upload to any server.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Face positioning and framing</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Your face must occupy the majority of the frame and be centered in the image. Portals typically expect 70 to 80 percent of the photo area to show the face and upper shoulders. The top of the head should be close to the top of the frame, with minimal empty space above. The chin should sit near the lower third of the image.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Common framing mistakes include too much space above the head (leaving a large white area at the top), the face being too small in the frame, and the face being off-center. After applying a white background, use{" "}
          <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            the SammaPix CropRatio tool
          </Link>{" "}
          to crop the image to the correct aspect ratio before resizing.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Lighting: no shadows on face or background</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The photo must be evenly lit. Shadows falling across the face, shadows on the background behind the head, and harsh overhead lighting that creates dark areas under the eyes or nose are all grounds for rejection. The ideal photo is taken in soft, even, natural or diffused artificial light facing the light source. Avoid taking photos against a window (which creates backlight shadows) or under a ceiling light (which creates harsh top-down shadows).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Recency, expression, and accessories</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The photo must be recent, typically taken within the past six months. Most portals prohibit caps, hats, and sunglasses. Spectacles (regular prescription glasses) are generally allowed if they do not obscure the eyes or create glare. The expression should be natural and neutral, eyes open and visible, mouth closed. Smiling is usually fine as long as the face is clearly visible.
        </p>

        {/* Section: Signature rules */}
        <h2 id="signature-rules" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Signature rules and common mistakes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The signature requirement trips up almost as many applicants as the photo requirement, but for different reasons. Most rejections happen because the signature file is too large, the crop is too loose (leaving too much white space around the signature), or the ink colour is wrong.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">How to create the signature image correctly</h3>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Use black ink on white paper.</strong> No blue ink. No pencil. No digital signatures created on a phone screen. The signature must be handwritten on plain white paper with a black pen. Blue ink is sometimes accepted for physical documents but is almost always rejected for exam portal uploads.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Scan or photograph in good light.</strong> A flatbed scanner at 200 to 300 DPI produces the cleanest result. If scanning is not available, place the paper on a flat surface in bright, even light and photograph straight down with your phone camera. Avoid shadows and angle distortion.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Crop tightly around the signature.</strong> Leave only a few pixels of white margin on each side. Large amounts of white space around a small signature increase the file size unnecessarily and sometimes cause portals to reject the image as not matching the expected format. Use{" "}
              <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444]">
                CropRatio
              </Link>{" "} or any crop tool to cut close to the signature edges.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Compress to the KB limit.</strong> A tightly cropped signature image on white paper is easy to compress significantly without any visible quality loss. Use{" "}
              <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444]">
                sammapix.com/compress-to/20kb
              </Link>{" "}
              for a 20 KB target, or{" "}
              <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444]">
                the compress tool
              </Link>{" "}
              to manually dial in any target size.</span>
          </li>
        </ul>

        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-md mb-6">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1 uppercase tracking-wide">Common signature mistake</p>
          <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
            Do not create your signature by typing your name in a cursive font and screenshotting it. Several portals explicitly state that the signature must be handwritten. Typed or digitally styled name images are rejected during document verification, sometimes weeks after the initial application was accepted by the portal.
          </p>
        </div>

        {/* Section: Step by step */}
        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step: resize and compress with free tools
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The following workflow applies to both the photo and the signature. For the photo, start from step 1. For the signature, start from step 2 after you have scanned or photographed your signature on white paper.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step 1: get a clean white-background photo</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/tools/passport-photo
          </Link>{" "}
          and upload your photo. The tool removes the existing background and replaces it with a solid white background that meets exam requirements. Download the result as a JPEG before moving to the next step. Skip this step if your original photo already has a proper white background.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step 2: crop to the correct aspect ratio</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open{" "}
          <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/tools/croproatio
          </Link>{" "}
          and upload the white-background photo. Set the crop area to match the aspect ratio specified in the notification. For UPSC (200x230), that is a portrait ratio of approximately 0.87:1. Adjust the crop box so the face is centered and well-framed, then download the cropped image. For signatures, crop tightly around the handwriting.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step 3: resize to the exact pixel dimensions</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/tools/resizepack
          </Link>{" "}
          and upload your cropped image. Enter the exact pixel width and height from the exam notification (for example, 200 for width and 230 for height for UPSC). Select JPEG as the output format. Download the resized image. This is the step that sets the pixel dimensions to exactly what the portal expects.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step 4: compress to the required KB limit</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is where most guides fall short. Resizing the pixels does not automatically control the file size in kilobytes. A 200x230 pixel photo can still be anywhere from 5 KB to 500 KB depending on JPEG quality. You need to compress it to land within the allowed range.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The fastest method: use{" "}
          <Link href="/compress-to/20kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/compress-to/20kb
          </Link>{" "}
          for a 20 KB signature target, or replace the number in the URL for any other target: compress-to/50kb, compress-to/100kb, compress-to/300kb. The tool automatically finds the right JPEG quality level to hit exactly that file size. For signatures going into portals that require 20 KB or less, this is the most reliable approach available.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Alternatively, use{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/tools/compress
          </Link>{" "}
          to manually adjust the JPEG quality slider and watch the resulting file size update in real time. This gives you finer control if the portal has both a minimum and maximum KB requirement and you want to land precisely in the middle.
        </p>

        {/* Inline CTA */}
        <Link
          href="/compress-to/20kb"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, runs in your browser</p>
            <p className="text-sm font-semibold text-white leading-snug">Compress your signature to exactly 20 KB now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step 5: verify file size before uploading</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          After downloading the compressed file, right-click it on your computer and check the file properties to confirm the actual size in KB. Portal upload forms sometimes display an error only after attempting the upload, which can waste time during peak application periods when servers are slow. Verifying locally takes ten seconds and eliminates a common frustration.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The whole workflow, from white background to final compressed file ready for upload, takes under two minutes per document once you have done it once. Both the photo and the signature follow the same sequence.
        </p>

        {/* Section: Common rejection reasons */}
        <h2 id="common-rejection-reasons" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common rejection reasons and how to avoid them
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Exam portals reject photos and signatures at two points: at upload time (the portal shows an immediate error) and at document verification (a human reviewer rejects the application days or weeks later). The second type is more damaging because it can disqualify you after the registration window has closed. Here are the most common causes of both.
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              title: "File too large",
              detail: "The most common upload-time error. Fix it with the compress-to tool before uploading. A 200x230 JPEG should land comfortably between 20 KB and 100 KB after normal JPEG compression at 80 to 90 percent quality.",
            },
            {
              title: "Wrong format (PNG, HEIC, WEBP)",
              detail: "If you photograph with an iPhone, the default format is HEIC, which most portals reject. When you use SammaPix tools, the output is always JPEG. If you start from a HEIC or PNG file, convert to JPEG first or the compress tool will handle the conversion automatically.",
            },
            {
              title: "Coloured or non-white background",
              detail: "Even a slightly off-white or light-blue background is flagged by human reviewers. Use the Passport Photo tool to guarantee a pure white background before compressing. This is the most common cause of post-submission rejection.",
            },
            {
              title: "Shadows on the face or background",
              detail: "Photograph or scan in diffused, even light. A common home setup: stand near a window facing the light (not with the window behind you) and ask someone else to take the photo, or use a phone stand.",
            },
            {
              title: "Signature not in black ink",
              detail: "Blue ink photographs fine but is almost always rejected. Use a black ballpoint or gel pen on white paper, in a size that fills the paper naturally without being too small.",
            },
            {
              title: "Face size too small in the frame",
              detail: "If you crop too loosely (leaving too much space around the head), the face occupies a small portion of the total image area and looks small even at 200x230 px. Use CropRatio to frame the face generously before resizing.",
            },
            {
              title: "File size too low (below the minimum)",
              detail: "Some portals, including UPSC, have a minimum KB requirement (20 KB) as well as a maximum. A very small file suggests low resolution or heavy over-compression. The compress-to tools target the right range automatically.",
            },
          ].map(({ title, detail }) => (
            <div key={title} className="flex items-start gap-3 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1A1A1A]">
              <span className="mt-0.5 h-5 w-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                <span className="h-2 w-2 rounded-full bg-[#6366F1]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{title}</p>
                <p className="text-sm text-[#737373] leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Related tools block */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Free tools for exam photo preparation</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Resize to Exact Pixels
            </Link>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              White Background Photo
            </Link>
            <Link
              href="/compress-to/20kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 20 KB
            </Link>
            <Link
              href="/compress-to/50kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 50 KB
            </Link>
            <Link
              href="/compress-to/100kb"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to 100 KB
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Crop to Ratio
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress Images
            </Link>
          </div>
        </div>

        {/* Privacy callout */}
        <div className="mt-6 p-5 rounded-md border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
            Your files never leave your device
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
            All SammaPix tools use client-side processing. Your photo and signature are processed entirely within your browser. No file is sent to any server. This matters specifically for exam documents, which are identity-linked images that you should not upload to unknown third-party services. Confirm your privacy by checking your browser&apos;s network tab: you will see no outgoing file transfer when using any SammaPix image tool.
          </p>
        </div>

        {/* Cross-link to related blog post */}
        <div className="mt-10 p-5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Related guides
          </h3>
          <p className="text-sm text-[#737373] mb-4">
            If you also need to compress a PDF for exam document uploads, or understand the photo requirements for JEE and NEET specifically, these guides cover those topics in detail.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/blog/compress-photos-indian-exam-applications"
              className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]"
            >
              Compress photos for JEE, NEET, UPSC, SSC
            </Link>
            <Link
              href="/blog/compress-pdf-online-no-upload"
              className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]"
            >
              Compress PDF without uploading
            </Link>
            <Link
              href="/compress-to/100kb"
              className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]"
            >
              Compress any image to 100 KB
            </Link>
            <Link
              href="/compress-to/50kb"
              className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]"
            >
              Compress any image to 50 KB
            </Link>
            <Link
              href="/tools/passport-photo"
              className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]"
            >
              Passport Photo with white background
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
                q: "What is the photo size for UPSC online application?",
                a: "For UPSC CSE and most UPSC exams, the photo must be 200x230 pixels, in JPEG format, with a file size between 20 KB and 300 KB. The background must be plain white or off-white. The face should be centered, without shadows or accessories. The signature file is typically accepted between 20 KB and 100 KB, at 350 to 500 pixels wide. Always confirm the exact requirement in the current official notification before uploading.",
              },
              {
                q: "How do I get my signature under 20KB?",
                a: "Sign on white paper with black ink, scan or photograph it in good light, then crop the image tightly to remove excess white space around the handwriting. Open sammapix.com/compress-to/20kb and upload the cropped image. The tool compresses it to exactly 20 KB or below. Your file stays in your browser throughout and is never uploaded anywhere.",
              },
              {
                q: "What background is required for exam application photos?",
                a: "Almost all Indian government exam portals require a plain white or off-white background. Coloured, patterned, or outdoor backgrounds cause rejection. If your photo does not have a white background, use the SammaPix Passport Photo tool at sammapix.com/tools/passport-photo to automatically replace any background with a clean white one.",
              },
              {
                q: "Does the photo need to be in JPEG format?",
                a: "Yes. UPSC, SSC, IBPS, RRB, NEET, and nearly all Indian government exam portals accept only JPEG (also written as JPG). PNG, HEIC, and WEBP files are rejected at upload time. iPhone users in particular should be aware that their default photo format is HEIC. All SammaPix output files are JPEG by default.",
              },
              {
                q: "Is SammaPix free to use for exam photo resizing?",
                a: "Yes. The resize, compress, passport photo, and crop tools on SammaPix are free to use without creating an account. There are no watermarks added to your processed photos. You can resize, crop, and compress as many documents as you need at no cost.",
              },
              {
                q: "Are my identity documents uploaded to a server when I use SammaPix?",
                a: "No. All SammaPix tools run entirely inside your browser using client-side processing. Your photo and signature files never leave your device. No file is transmitted to any server at any point, which makes SammaPix safe for preparing identity documents and sensitive government application materials.",
              },
              {
                q: "What are the SSC photo and signature requirements?",
                a: "For SSC exams, the photo should be approximately 3.5 x 4.5 cm (which corresponds to roughly 413 x 531 pixels at 300 DPI screen resolution) and is typically accepted up to 100 KB in JPEG format on a plain white background. The signature is typically accepted between 10 KB and 30 KB. SSC updates these specifications with each notification, so always verify in the current official document.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}
