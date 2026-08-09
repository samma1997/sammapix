import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "DV Lottery Photo Requirements 2026 (Green Card)",
  description:
    "Exact DV Lottery photo requirements for 2026: 600x600 px JPEG, 240 KB max, white background, no glasses. Free tool to resize and compress without disqualification.",
  alternates: {
    canonical: `${APP_URL}/blog/dv-lottery-photo-requirements`,
  },
  keywords: [
    "dv lottery photo requirements",
    "green card lottery photo size",
    "diversity visa photo 600x600",
    "dv lottery photo 2026",
    "green card photo rules",
    "dv photo tool free",
    "diversity visa photograph",
    "dv lottery picture requirements",
  ],
  openGraph: {
    title: "DV Lottery Photo Requirements 2026 (Green Card)",
    description:
      "Square 600x600 px JPEG, 240 KB max, white background. One wrong pixel disqualifies your entry. Free browser tool to get it right.",
    url: `${APP_URL}/blog/dv-lottery-photo-requirements`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DV Lottery Photo Requirements 2026 (Green Card)",
    description:
      "Wrong photo = instant disqualification. Exact DV Lottery photo specs for 2026 and a free browser tool to fix yours in 60 seconds.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/dv-lottery-photo-requirements`;
const POST_TITLE = "DV Lottery Photo Requirements 2026 (Green Card)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Complete guide to the 2026 DV Lottery photograph requirements: 600x600 to 1200x1200 pixels, JPEG format, 240 KB maximum file size, white or off-white background, taken within six months, no glasses, neutral expression, and the January 2026 AI-photo rejection rule explained. Includes a free, browser-based step-by-step workflow using SammaPix tools.",
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
    "dv lottery photo requirements",
    "green card lottery photo size",
    "diversity visa photo 600x600",
    "dv lottery photo 2026",
    "green card photo rules",
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Prepare a DV Lottery Photo That Meets All 2026 Requirements",
  description:
    "Step-by-step guide to resizing, cropping, and compressing your photo to meet the DV Lottery 600x600 px JPEG 240 KB specification using free browser tools.",
  totalTime: "PT3M",
  tool: [
    { "@type": "HowToTool", name: "SammaPix Passport Photo tool" },
    { "@type": "HowToTool", name: "SammaPix Crop Ratio tool" },
    { "@type": "HowToTool", name: "SammaPix Compress to 200KB tool" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check your photo against the official rules",
      text: "Verify the photo was taken within the last six months, shows a plain white or off-white background, captures the full face with a neutral expression, and contains no glasses, hats, or head coverings (unless for religious reasons). Confirm it has NOT been edited with AI beauty filters.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Crop to a square ratio",
      text: "Open the SammaPix Crop Ratio tool at sammapix.com/tools/croproatio. Select the 1:1 aspect ratio and crop so your head and neck are centered with the top of your head close to the top of the frame.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Resize to 600x600 pixels",
      text: "Use the SammaPix Resize tool or Passport Photo tool to set the output to exactly 600 pixels wide and 600 pixels tall. The DV program accepts any square between 600x600 and 1200x1200, but 600x600 is the safe universal target.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Compress below 240 KB",
      text: "Open sammapix.com/compress-to/200kb to bring the JPEG file size under 200 KB (leaving a safe buffer below the 240 KB hard limit). Everything runs in your browser so nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Save and submit",
      text: "Download the final JPEG and upload it during the DV-2027 registration window at dvprogram.state.gov. Double-check the pixel dimensions and file size one final time before submitting.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the exact pixel size for a DV Lottery photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The photo must be a perfect square between 600x600 pixels and 1200x1200 pixels. The most commonly recommended target is exactly 600x600 pixels. Any non-square photo is automatically rejected by the online submission system.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size for a DV Lottery photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The maximum file size is 240 kilobytes (KB). The photo must also be saved in JPEG format (the .jpg extension). PNG, HEIC, WEBP, and other formats are not accepted.",
      },
    },
    {
      "@type": "Question",
      name: "Are DV Lottery photo requirements the same as US passport photo requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The content requirements are nearly identical: white or off-white background, full face centered, neutral expression, mouth closed, no glasses, no head coverings (with limited religious exceptions), and taken within the last six months. The main technical difference is that a US passport photo is a 2x2 inch print at 600 DPI (which equals 1200x1200 pixels), while the DV Lottery specifies a digital file of 600x600 to 1200x1200 pixels uploaded online.",
      },
    },
    {
      "@type": "Question",
      name: "Are AI-edited or filtered photos allowed for the DV Lottery in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. As of January 2026, the State Department explicitly rejects photos that have been altered by AI tools, beauty filters, or any software that modifies facial features or skin appearance. A photo that has only been cropped, resized, and compressed remains valid. SammaPix tools only adjust dimensions and file size without touching facial data.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free tool to resize and compress a DV Lottery photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix offers free browser-based tools that run entirely on your device: use the Passport Photo tool or Crop Ratio tool to get the square 600x600 frame, then use Compress to 200KB to bring the file under the 240 KB limit. No account required, nothing is uploaded to a server.",
      },
    },
    {
      "@type": "Question",
      name: "Is my photo uploaded to a server when I use SammaPix to prepare it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All SammaPix photo tools run entirely client-side in your browser using JavaScript. Your image never leaves your device. This is especially important for official document photos that contain your likeness.",
      },
    },
    {
      "@type": "Question",
      name: "When is the DV Lottery registration window?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Diversity Visa (DV) program registration window typically opens in early October and closes in early November each year. The DV-2028 lottery (for fiscal year 2028 visas) will open in autumn 2026. Always verify the exact dates at dvprogram.state.gov or travel.state.gov, as dates can shift slightly from year to year.",
      },
    },
  ],
};

export default function DvLotteryPhotoRequirementsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="dv-lottery-photo-requirements"
        description={`The Diversity Visa Green Card lottery rejects entries for a photo that is a few pixels too small or a few kilobytes too large. The rules are strict, the system is automated, and there is no way to appeal a disqualification. This guide covers every official requirement for 2026, including the new January 2026 rule on AI-edited photos, and shows you how to prepare a compliant image in under three minutes using free browser tools.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={11}
        headings={[
          { id: "quick-reference", title: "Quick reference: all requirements at a glance" },
          { id: "pixel-dimensions", title: "Pixel dimensions and file format" },
          { id: "file-size", title: "File size limit (240 KB)" },
          { id: "photo-content-rules", title: "Photo content rules (background, face, expression)" },
          { id: "ai-photo-rule-2026", title: "The January 2026 AI-photo rule" },
          { id: "same-as-passport", title: "How DV Lottery rules compare to US passport photo rules" },
          { id: "step-by-step", title: "Step-by-step: prepare a compliant photo with free tools" },
          { id: "common-rejection-reasons", title: "Most common rejection reasons" },
          { id: "where-to-submit", title: "Where to submit and when" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The photo must be a square JPEG between 600x600 and 1200x1200 pixels, with a maximum file size of 240 KB.",
          "Background must be plain white or off-white. No glasses, no head coverings (with narrow religious exceptions), neutral expression, mouth closed.",
          "The photo must have been taken within the last six months. Reusing an old photo from a previous entry is a common disqualification cause.",
          "As of January 2026, AI-edited or filtered photos that alter facial appearance are explicitly rejected. Cropping and resizing alone are fine.",
          "SammaPix tools resize, crop, and compress your photo to exact specifications entirely in your browser. Nothing is uploaded.",
          "The registration window opens each autumn at dvprogram.state.gov. Verify exact dates there before each cycle.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
              alt="Person reviewing official document photo requirements on a laptop representing the DV Lottery green card photo preparation process"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting the photo right is the first step toward a valid DV Lottery entry. Photo by Campaign Creators on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Prepare your DV Lottery photo for free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Crop to 1:1, resize to 600x600 px, and compress below 240 KB entirely in your browser. No upload. No account. No AI retouching that would get your entry rejected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/passport-photo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Passport Photo Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/compress-to/200kb"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress to 200KB
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick Answer */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            A DV Lottery photo must be a square JPEG between <strong>600x600 and 1200x1200 pixels</strong>, no larger than <strong>240 KB</strong>, showing your full face against a <strong>plain white or off-white background</strong>, taken within the last six months, with no glasses, no filters, and no AI retouching. Wrong dimensions or a reused photo means automatic disqualification. Use the{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              free SammaPix Passport Photo tool
            </Link>{" "}
            to hit the spec in minutes, entirely in your browser.
          </p>
        </div>

        {/* Section: Quick reference table */}
        <h2 id="quick-reference" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Quick reference: all requirements at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The State Department publishes the full specification on{" "}
          <a
            href="https://dvprogram.state.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            dvprogram.state.gov
          </a>{" "}
          and{" "}
          <a
            href="https://travel.state.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            travel.state.gov
          </a>
          . The table below consolidates every requirement into one place so you can check off each point before submitting.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Requirement</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Specification</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Pixel dimensions</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">600x600 to 1200x1200 px (square)</td>
                <td className="px-4 py-2.5 text-xs">Must be perfectly square. 600x600 is the safe universal target.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File format</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">JPEG only (.jpg)</td>
                <td className="px-4 py-2.5 text-xs">PNG, HEIC, WEBP, PDF are not accepted.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Maximum file size</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">240 KB</td>
                <td className="px-4 py-2.5 text-xs">Target 200 KB or below to leave a buffer.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">Plain white or off-white</td>
                <td className="px-4 py-2.5 text-xs">No patterns, shadows, or other people visible.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Recency</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">Taken within the last 6 months</td>
                <td className="px-4 py-2.5 text-xs">Reusing a photo from a prior entry is a disqualifying error.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Face position</td>
                <td className="px-4 py-2.5 text-xs">Full face, centered, looking straight at camera</td>
                <td className="px-4 py-2.5 text-xs">Head must occupy 50 to 69% of the frame height.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Expression</td>
                <td className="px-4 py-2.5 text-xs">Neutral, mouth closed</td>
                <td className="px-4 py-2.5 text-xs">No smiling, frowning, or squinting.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Glasses</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400">Not permitted (since 2016)</td>
                <td className="px-4 py-2.5 text-xs">Glasses are banned regardless of prescription or tint.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Head coverings</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400">Not permitted except religious</td>
                <td className="px-4 py-2.5 text-xs">A signed statement of religious practice must accompany religious exemption requests.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">AI or filter edits</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400">Rejected since January 2026</td>
                <td className="px-4 py-2.5 text-xs">Crop, resize, and compress only. No AI skin, face, or background alteration.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Color</td>
                <td className="px-4 py-2.5 text-xs">Color photo only</td>
                <td className="px-4 py-2.5 text-xs">Black and white photos are not accepted.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section: Pixel dimensions */}
        <h2 id="pixel-dimensions" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Pixel dimensions and file format
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The single most common reason DV Lottery photos are rejected is a dimension error. The online submission system checks the pixel dimensions automatically and rejects anything that is not a perfect square.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The official range is <strong>600x600 to 1200x1200 pixels</strong>. Both dimensions must match exactly. A photo that is 600 pixels wide and 601 pixels tall is non-square and will be rejected just as quickly as a photo that is 400x400.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In practice, <strong>600x600 pixels is the correct target</strong>. It satisfies the minimum, produces a smaller file (which helps with the 240 KB limit), and is accepted universally. Going up to 1200x1200 only adds file size without any benefit, since the system does not reward higher resolution.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The only accepted file format is <strong>JPEG</strong> (the .jpg extension). If your phone saves photos as HEIC (the default on modern iPhones), you need to convert first. SammaPix converts HEIC to JPEG automatically when you use the{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Passport Photo tool
          </Link>
          , or you can use the dedicated{" "}
          <Link href="/convert/heic-to-jpg" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            HEIC to JPG converter
          </Link>
          .
        </p>

        {/* Section: File size limit */}
        <h2 id="file-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          File size limit (240 KB)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The maximum file size is <strong>240 kilobytes (KB)</strong>. This is where many applicants run into trouble even after getting the dimensions right, because modern phone cameras produce JPEG files of 2 MB to 8 MB by default.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The recommended approach is to compress to <strong>200 KB or below</strong>. This gives you a safe buffer below the hard limit, accounting for any variation introduced by the upload process or browser handling. A 200 KB JPEG at 600x600 pixels is still visually clear and fully acceptable.
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Under 200 KB</strong>: safe zone with a comfortable buffer. Recommended.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">200 to 240 KB</strong>: technically valid but too close to the limit. One re-save can push you over.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Over 240 KB</strong>: the system will block your submission entirely.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use the{" "}
          <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress to 200KB tool
          </Link>{" "}
          to bring any JPEG down to a target file size in seconds. The tool adjusts JPEG quality automatically to hit the target, runs entirely in your browser, and does not alter the pixel dimensions.
        </p>

        {/* Section: Photo content rules */}
        <h2 id="photo-content-rules" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Photo content rules (background, face, expression)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Technical specs alone are not enough. The reviewers also examine the visual content of the photo. These rules closely mirror US passport photo standards, which means a photo taken for a US passport application is usually valid for the DV Lottery as well, provided it meets the digital size requirements.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Background</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The background must be plain white or off-white. No patterns, gradients, textures, shadows, or other people. A gray wall, a beige door, or a busy room background will all cause rejection. If your available space does not have a suitable background, photograph against a white sheet of paper or a white wall in good daylight.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AI background removal or background replacement is not acceptable under the 2026 rules. The background must be physically present in the environment when the photo is taken, not added digitally afterward.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Face framing and position</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The full face must be centered in the frame, looking directly at the camera. The top of the head (including hair, not headwear) should be near the top of the frame. Your head and face must occupy between 50% and 69% of the total frame height. Roughly speaking: the top of your head near the top of the image, the base of your chin roughly one-third of the way up from the bottom.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Expression</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Maintain a neutral expression with your mouth closed. Avoid any raised eyebrows, wide eyes, or any expression that would alter the geometry of your face. The biometric matching system used to verify identity against future photos and documents requires a consistent neutral pose.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Eyes and vision aids</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Your eyes must be open, clearly visible, and looking directly at the camera. Glasses of any kind, including prescription glasses, sunglasses, and clear-lens frames, have been prohibited since 2016. Contact lenses that do not change your eye color are permitted.
        </p>

        {/* Section: AI photo rule 2026 */}
        <h2 id="ai-photo-rule-2026" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The January 2026 AI-photo rule
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Starting in January 2026, the State Department updated its photograph policy to explicitly reject photos that have been processed by AI beauty tools, generative AI, or smartphone camera AI modes that alter facial features, skin texture, or the background.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This came in response to a growing number of applicants submitting photos that had been processed by portrait-enhancement apps and phone camera AI modes. The concern is that these alterations make biometric matching unreliable, which undermines identity verification throughout the visa process.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          What counts as a prohibited AI edit, and what is permitted?
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Rejected:</strong> AI skin smoothing, blemish removal, face slimming, eye enlargement, AI-generated background replacement, portrait AI modes on smartphones (Samsung AI Remaster, Google Photo Unblur, iPhone Photogenic, etc.).</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Rejected:</strong> Any filter that alters skin tone, adds makeup, or changes the color rendering of the face compared to the original photograph.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Permitted:</strong> Cropping to a 1:1 square, resizing to 600x600 pixels, JPEG compression to reduce file size, basic brightness/contrast adjustments that do not alter facial features.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Permitted:</strong> Converting from HEIC to JPEG. Rotating the image upright. Standard color correction on a calibrated monitor.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix tools are compliant with the 2026 rule because they only perform geometric and compression operations. The{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Passport Photo tool
          </Link>{" "}
          crops and resizes. The{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress tool
          </Link>{" "}
          reduces file size by adjusting JPEG quality. Neither tool touches facial data, skin rendering, or background appearance.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you are unsure whether a photo on your phone was captured using an AI enhancement mode, the safest approach is to take a new photo with AI and portrait modes turned off, in front of a white background, using the standard camera mode.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/passport-photo" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool. No upload. No AI retouching.</p>
            <p className="text-sm font-semibold text-white leading-snug">Crop your photo to 600x600 px now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Comparison to passport */}
        <h2 id="same-as-passport" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How DV Lottery rules compare to US passport photo rules
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The DV Lottery photo requirements are intentionally modeled on US passport photo standards. If you have a compliant US passport photo, the content almost certainly meets the DV Lottery visual requirements. The key difference is technical rather than visual.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Aspect</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">DV Lottery (digital)</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">US Passport (print)</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Format</td>
                <td className="px-4 py-2.5 text-xs">Digital JPEG upload</td>
                <td className="px-4 py-2.5 text-xs">Printed 2x2 inch (or digital upload)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Dimensions</td>
                <td className="px-4 py-2.5 text-xs">600x600 to 1200x1200 px</td>
                <td className="px-4 py-2.5 text-xs">2x2 inch at 600 DPI = 1200x1200 px</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs">White or off-white</td>
                <td className="px-4 py-2.5 text-xs">White or off-white</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Recency</td>
                <td className="px-4 py-2.5 text-xs">Within 6 months</td>
                <td className="px-4 py-2.5 text-xs">Within 6 months</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Glasses</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Prohibited</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Prohibited</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Expression</td>
                <td className="px-4 py-2.5 text-xs">Neutral, mouth closed</td>
                <td className="px-4 py-2.5 text-xs">Neutral, mouth closed</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File size limit</td>
                <td className="px-4 py-2.5 text-xs">240 KB maximum</td>
                <td className="px-4 py-2.5 text-xs">Varies by submission system</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical takeaway: if you have access to a digital copy of a recently taken US passport photo, you can use SammaPix to resize it from 1200x1200 to 600x600 and compress it below 200 KB to create a valid DV Lottery submission. Use the{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Resize tool
          </Link>{" "}
          to adjust dimensions and the{" "}
          <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress to 200KB tool
          </Link>{" "}
          to handle the file size requirement.
        </p>

        {/* Section: Step by step */}
        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step: prepare a compliant photo with free tools
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The following workflow takes under three minutes and uses three free SammaPix tools that run entirely in your browser. Nothing is uploaded to a server.
        </p>

        <div className="space-y-6 mb-8">
          {[
            {
              step: "Step 1",
              title: "Take or select a photo that meets the content rules",
              body: "Use a recent photo taken within the last six months. The background must be plain white or off-white. You must face the camera directly with a neutral expression and your mouth closed. No glasses. No head coverings (unless required by your religion). No AI portrait modes enabled during capture. If you do not have a suitable photo, take a new one in front of a white wall using standard camera mode.",
            },
            {
              step: "Step 2",
              title: "Crop to a 1:1 square",
              body: "Open the SammaPix Crop Ratio tool at sammapix.com/tools/croproatio. Select the 1:1 aspect ratio. Position the crop box so your head is centered, the top of your head is near the top of the frame, and your chin is roughly one-third of the way up from the bottom. This framing ensures your head occupies the correct 50 to 69% of frame height. Alternatively, the Passport Photo tool handles the crop automatically.",
            },
            {
              step: "Step 3",
              title: "Resize to 600x600 pixels",
              body: "Open sammapix.com/tools/passport-photo and set the output to 600x600 pixels, or use the Resize tool and enter 600 for both width and height. Do not let the tool resize non-proportionally if you have already cropped to a square. The output must be exactly 600x600, not 600x598 or any other variation.",
            },
            {
              step: "Step 4",
              title: "Compress below 200 KB",
              body: "Open sammapix.com/compress-to/200kb. Drop your 600x600 JPEG onto the tool. It will automatically reduce the JPEG quality until the file is at or below 200 KB, leaving a 40 KB buffer below the 240 KB hard limit. Download the result and verify the file size before submitting.",
            },
            {
              step: "Step 5",
              title: "Verify and submit",
              body: "Before uploading to dvprogram.state.gov, do one final check: confirm the pixel dimensions are 600x600 (right-click the file and view properties, or use your OS image viewer), confirm the file size is under 240 KB, and confirm the file is a JPEG. Then upload during the official registration window and save your confirmation number.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center">
                <span className="text-xs font-bold text-white">{step.replace("Step ", "")}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Common rejection reasons */}
        <h2 id="common-rejection-reasons" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Most common rejection reasons
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Based on State Department guidance and community reports from applicants, these are the photo-related rejection reasons that appear most frequently during the DV Lottery selection review process.
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              reason: "Reused photo from a previous entry",
              detail: "Every entry must use a photo taken within the last six months. Submitting the same photo used in a prior year is grounds for disqualification even if the photo itself is technically valid in every other way.",
            },
            {
              reason: "Non-square dimensions",
              detail: "The submission system automatically checks dimensions. A photo that is 600x605 or 590x600 will be blocked. Always verify the exact pixel count before uploading.",
            },
            {
              reason: "File over 240 KB",
              detail: "The system enforces the file size limit strictly. A photo that is 241 KB will be rejected. Compress to 200 KB or below to eliminate this risk.",
            },
            {
              reason: "Background with shadows or patterns",
              detail: "A soft shadow behind the head, a patterned wall, or a slightly gray background can trigger rejection during manual review. Use a physically white background in even lighting.",
            },
            {
              reason: "Glasses in the photo",
              detail: "This ban has been in effect since 2016, but applicants still submit photos wearing glasses each cycle. Remove glasses before taking the photo.",
            },
            {
              reason: "AI-edited or filtered facial appearance",
              detail: "Starting in January 2026, photos processed by AI enhancement tools are rejected. This includes portrait modes on smartphones that automatically smooth skin or alter facial geometry.",
            },
            {
              reason: "Head not looking directly at the camera",
              detail: "Even a slight turn of the head or a tilted chin can cause rejection during biometric review. Face the camera squarely with eyes level.",
            },
          ].map(({ reason, detail }) => (
            <div key={reason} className="border-l-2 border-[#E5E5E5] dark:border-[#2A2A2A] pl-4">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{reason}</p>
              <p className="text-sm text-[#737373] leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        {/* Section: Where to submit */}
        <h2 id="where-to-submit" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Where to submit and when
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          All DV Lottery entries must be submitted through the official government portal at{" "}
          <a
            href="https://dvprogram.state.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            dvprogram.state.gov
          </a>
          . There is no fee to enter. Any third-party website charging a fee for entry submission is not affiliated with the State Department.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The registration window typically opens in early October and closes in early November. For the DV-2028 lottery (which will grant fiscal year 2028 immigrant visas), the window is expected to open in autumn 2026. The exact dates are announced on the official site, and they can shift by a few days from year to year.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Key points about submission timing and process:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            "You may submit only one entry per person per registration period. Multiple entries result in disqualification for all of them.",
            "Each person in a family unit (spouse and eligible children) needs their own compliant photo.",
            "Save your confirmation number after submitting. You will need it to check your selection status at dvprogram.state.gov starting the following May.",
            "Selection results are not sent by email or mail. You must check the status yourself using the confirmation number.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Related links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related tools and guides</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/passport-photo" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Passport Photo Tool
            </Link>
            <Link href="/tools/croproatio" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Crop to 1:1 Square
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Image Compressor
            </Link>
            <Link href="/convert/heic-to-jpg" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              HEIC to JPG Converter
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Batch Resize Images
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
                q: "What is the exact pixel size for a DV Lottery photo?",
                a: "The photo must be a perfect square between 600x600 pixels and 1200x1200 pixels. The most commonly recommended target is exactly 600x600 pixels. Any non-square photo is automatically rejected by the online submission system.",
              },
              {
                q: "What is the maximum file size for a DV Lottery photo?",
                a: "The maximum file size is 240 kilobytes (KB). The photo must be saved in JPEG format (.jpg extension). PNG, HEIC, WEBP, and other formats are not accepted. Target 200 KB or below to leave a safe buffer.",
              },
              {
                q: "Are DV Lottery photo requirements the same as US passport photo requirements?",
                a: "The visual content requirements are nearly identical: white or off-white background, full face centered, neutral expression, mouth closed, no glasses, no head coverings (with limited religious exceptions), taken within the last six months. The main technical difference is that a US passport photo is a 2x2 inch print at 600 DPI (equal to 1200x1200 pixels), while the DV Lottery specifies a digital JPEG between 600x600 and 1200x1200 pixels uploaded online with a 240 KB file size limit.",
              },
              {
                q: "Are AI-edited or filtered photos allowed for the DV Lottery in 2026?",
                a: "No. As of January 2026, the State Department explicitly rejects photos altered by AI beauty tools, generative AI, or smartphone AI portrait modes that modify facial features, skin texture, or backgrounds. Cropping, resizing, and compressing are permitted. SammaPix tools only adjust dimensions and file size and do not alter any facial data.",
              },
              {
                q: "Is there a free tool to resize and compress a DV Lottery photo?",
                a: "Yes. SammaPix offers free browser-based tools that run entirely on your device: use the Passport Photo tool or Crop Ratio tool to create the square 600x600 frame, then use Compress to 200KB to bring the file under the 240 KB limit. No account required. Nothing is uploaded to a server.",
              },
              {
                q: "Is my photo uploaded to a server when I use SammaPix?",
                a: "No. All SammaPix photo tools run entirely client-side in your browser using JavaScript. Your image never leaves your device. This is especially important for official document photos containing your likeness.",
              },
              {
                q: "When is the DV Lottery registration window?",
                a: "The Diversity Visa registration window typically opens in early October and closes in early November each year. The DV-2028 lottery is expected to open in autumn 2026. Always verify the exact dates at dvprogram.state.gov before each cycle, as dates can shift slightly from year to year.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
