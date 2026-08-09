import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "US Passport Photo Requirements 2026 (2x2, Exact)",
  description:
    "Exact US passport photo requirements for 2026: 2x2 inch size, 600x600 px minimum, white background, face 1 to 1 3/8 inch, no glasses. Free online tool included.",
  alternates: {
    canonical: `${APP_URL}/blog/us-passport-photo-requirements-2026`,
  },
  keywords: [
    "us passport photo size",
    "2x2 passport photo",
    "passport photo requirements 2026",
    "600x600 passport photo",
    "passport photo white background",
    "make passport photo online free",
  ],
  openGraph: {
    title: "US Passport Photo Requirements 2026 (2x2, Exact)",
    description:
      "Full checklist: 2x2 inch, 600x600 px minimum, white background, no AI filters. Free browser tool to crop, resize, and compress to spec.",
    url: `${APP_URL}/blog/us-passport-photo-requirements-2026`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Passport Photo Requirements 2026 (2x2, Exact)",
    description:
      "US passport photo: 2x2 inch, 600x600 px min, white background, no AI edits. Free tool to get it right in your browser.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_SLUG = "us-passport-photo-requirements-2026";
const POST_URL = `${APP_URL}/blog/${POST_SLUG}`;
const POST_TITLE = "US Passport Photo Requirements 2026 (2x2, Exact)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Complete, verified US passport photo requirements for 2026: 2x2 inch print size, 600x600 to 1200x1200 px digital, plain white or off-white background, face 1 to 1 3/8 inch chin to crown, taken within last 6 months, no glasses, neutral expression. Includes the January 2026 rule change banning AI-edited and beauty-filtered photos, plus a free browser-based tool to crop and resize to spec without uploading your ID.",
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
    "us passport photo size",
    "2x2 passport photo",
    "passport photo requirements 2026",
    "600x600 passport photo",
    "passport photo white background",
    "make passport photo online free",
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
      name: "What size is a US passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A US passport photo must be exactly 2 x 2 inches (51 x 51 millimeters). For digital submissions (online renewal or visa applications), the photo must be at least 600 x 600 pixels and no larger than 1200 x 1200 pixels. The square format is mandatory.",
      },
    },
    {
      "@type": "Question",
      name: "What is the pixel size for a US passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For online renewal, the digital photo must be between 600 x 600 pixels and 1200 x 1200 pixels, with a file size between 54 KB and 10 MB (JPEG only). For visa applications and the DV Lottery, the maximum file size is 240 KB. The image must be square.",
      },
    },
    {
      "@type": "Question",
      name: "Does the background have to be white?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The US Department of State requires a plain white or off-white background with no patterns, shadows, or gradients. As of January 2026, AI-generated background replacements are explicitly rejected, even if the resulting background appears white. You must photograph against a real white or off-white surface.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use an AI-edited or filtered photo for my US passport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Since January 2026, the US Department of State explicitly rejects passport photos that have been altered by AI tools, beauty filters, portrait blur, skin smoothing, or AI background replacement. The photo must be a true, unaltered representation of your appearance. Using SammaPix only crops and resizes your photo to spec without touching your face, skin, or background.",
      },
    },
    {
      "@type": "Question",
      name: "What is the file size limit for US passport photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For online passport renewal, the file must be between 54 KB and 10 MB in JPEG format. For visa applications and the Diversity Visa (DV) Lottery, the maximum file size is 240 KB. If your photo is too large, you can compress it to the required size using the SammaPix compress tool, which runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is the SammaPix passport photo tool free? Does it upload my photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the tool is completely free to use. No photo is ever uploaded to any server. All cropping and resizing happens locally in your browser, which is especially important for ID photos that contain your face and personal likeness. Nothing is stored or transmitted.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make a US Passport Photo Online Free",
  description:
    "Step-by-step guide to creating a compliant US passport photo using free browser tools, without uploading your photo to any server.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Take the photo",
      text: "Take a photo against a plain white or off-white wall in good natural light. Stand straight, look directly at the camera, keep a neutral expression, and make sure your entire face and top of shoulders are visible. Remove glasses.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the SammaPix passport photo tool",
      text: "Go to sammapix.com/tools/passport-photo and select the US 2x2 preset. The tool will guide you to crop your image so your face occupies 1 to 1 3/8 inches chin to crown in the final 2x2 print.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Crop and resize to the exact pixel size",
      text: "Use the crop tool to center your face within the frame. Then use the resize tool to output exactly 600x600 pixels (minimum) or up to 1200x1200 pixels. All processing happens in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Compress to the file size limit if needed",
      text: "If your photo exceeds 10 MB for online renewal or 240 KB for visa applications, open the SammaPix compress tool, drop in your cropped photo, and target the required size. The tool outputs a JPEG that meets spec.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify against travel.state.gov before submitting",
      text: "Always cross-check your final photo against the official requirements at travel.state.gov before submitting your application. Requirements can change, and an incorrect photo will delay your passport.",
    },
  ],
};

export default function UsPassportPhotoRequirements2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={POST_SLUG}
        description={`Getting your US passport photo right the first time means understanding exact measurements, pixel counts, file size limits, and a major 2026 rule change you probably have not heard about yet. This guide covers every verified requirement so your application does not get rejected.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "quick-specs", title: "Quick specs at a glance" },
          { id: "print-size", title: "Print size and face dimensions" },
          { id: "digital-pixel-size", title: "Digital and pixel size requirements" },
          { id: "background-rules", title: "Background, lighting, and expression rules" },
          { id: "2026-ai-ban", title: "January 2026: AI edits and filters are now rejected" },
          { id: "file-size-limits", title: "File size limits by application type" },
          { id: "step-by-step", title: "Step by step: make your passport photo free online" },
          { id: "common-rejection-reasons", title: "Most common reasons passport photos are rejected" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A US passport photo must be exactly 2 x 2 inches (51 x 51 mm) printed, with your face measuring 1 to 1 3/8 inches from chin to crown.",
          "Digital photos must be 600x600 to 1200x1200 pixels, JPEG only, between 54 KB and 10 MB for online renewal.",
          "The background must be plain white or off-white, photographed in person, not digitally generated or replaced.",
          "Since January 2026, the US Department of State explicitly rejects AI-edited photos, beauty-filtered images, and AI background swaps.",
          "SammaPix only crops and resizes your photo to spec without altering your face, skin, or background, keeping your photo compliant.",
          "Always verify the final requirements at travel.state.gov before submitting.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
              alt="US passport open on a white surface representing passport photo requirements and application process"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting your passport photo right the first time saves you weeks of delays. Photo by Nicole Geri on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Make your passport photo free in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use the SammaPix passport photo tool to crop and resize your photo to the exact 2x2 inch US spec. No upload, no account, no AI alterations. Runs 100% in your browser so your face and ID never leave your device.
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
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress to KB Limit
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick answer callout */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            A US passport photo must be exactly 2 x 2 inches (51 x 51 mm) printed. For digital applications, the image must be 600x600 to 1200x1200 pixels, JPEG, with a plain white or off-white background. Since January 2026, AI-edited and beauty-filtered photos are rejected. Use{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              the SammaPix passport photo tool
            </Link>{" "}
            to crop and resize to spec for free, with no upload required.
          </p>
        </div>

        {/* Section: Quick specs table */}
        <h2 id="quick-specs" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Quick specs at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every spec in the table below is sourced from official US Department of State guidance. Always verify at{" "}
          <a
            href="https://travel.state.gov/content/travel/en/passports/photos.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            travel.state.gov
          </a>{" "}
          before submitting your application.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Requirement</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Exact value</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Print size</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">2 x 2 inches (51 x 51 mm)</td>
                <td className="px-4 py-2.5 text-xs">Square format only. No other size is accepted.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Face size (chin to crown)</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">1 to 1 3/8 inches (25 to 35 mm)</td>
                <td className="px-4 py-2.5 text-xs">Face must fill between 50% and 69% of the photo height.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Digital pixel size</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">600 x 600 to 1200 x 1200 px</td>
                <td className="px-4 py-2.5 text-xs">For online renewal. JPEG format only.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File size (online renewal)</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">54 KB to 10 MB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only. Both minimum and maximum are enforced.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File size (visa / DV Lottery)</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Max 240 KB</td>
                <td className="px-4 py-2.5 text-xs">Stricter limit than online renewal. Compress before uploading.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Plain white or off-white</td>
                <td className="px-4 py-2.5 text-xs">No patterns, shadows, gradients, or AI-replaced backgrounds.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo recency</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Within last 6 months</td>
                <td className="px-4 py-2.5 text-xs">Must reflect your current appearance.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Expression</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Neutral, mouth closed</td>
                <td className="px-4 py-2.5 text-xs">No smiling, no squinting, eyes fully open.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Glasses</td>
                <td className="px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400">Not allowed (since 2016)</td>
                <td className="px-4 py-2.5 text-xs">No exceptions. Remove all eyewear before the photo.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-red-50 dark:bg-red-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">AI edits / beauty filters</td>
                <td className="px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400">Rejected since Jan 2026</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Portrait blur, skin smoothing, AI background swap: all cause rejection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section: Print size and face dimensions */}
        <h2 id="print-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Print size and face dimensions
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The 2 x 2 inch (51 x 51 mm) requirement is the most well-known US passport photo spec, and it is non-negotiable. The photo must be square. Many people crop correctly but then get rejected because their face is the wrong size within that square frame.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Your face, measured from the bottom of your chin to the top of your crown (the highest point of your head, not your hair), must measure between 1 inch and 1 3/8 inches (25 mm to 35 mm). In a printed 2x2 photo, that means your face should occupy roughly half to two-thirds of the total photo height.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In pixel terms for a 600x600 output: your face from chin to crown should span between 300 and 414 pixels. For a 1200x1200 output, that range becomes 600 to 828 pixels.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix passport photo tool
          </Link>{" "}
          includes a US 2x2 preset that shows you the correct face placement zone with an overlay guide. You can drag and resize the crop until your face lands within the approved range, then export at exactly 600x600 pixels.
        </p>

        {/* Section: Digital pixel size */}
        <h2 id="digital-pixel-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Digital and pixel size requirements
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For the US online passport renewal program (the digital submission pathway), the Department of State requires photos in JPEG format with pixel dimensions between 600 x 600 and 1200 x 1200. The image must be square: a 600x800 crop will be rejected even if both dimensions are within the allowed range individually.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common mistake is submitting a photo that is too small. Smartphone cameras today produce images that are far larger than needed, but when people crop to the face, they sometimes resize down too aggressively and end up with a 400x400 file. That falls below the 600px minimum and will be rejected by the upload portal.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Recommended workflow: crop the full-resolution image to a square centered on your face first, then resize the resulting square to 600x600 or 800x800 pixels. Never crop a low-resolution version and then scale it up, as that introduces compression artifacts and a blurry result.
        </p>

        <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
            600x600 passport photo: the safe default
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            When in doubt, export at exactly 600 x 600 pixels. This is the minimum accepted by the online renewal portal, is well within the 54 KB to 10 MB file size window for a standard JPEG, and meets the square format requirement. Use the{" "}
            <Link href="/tools/passport-photo" className="underline underline-offset-2">
              SammaPix passport photo tool
            </Link>{" "}
            to output this size directly with one click.
          </p>
        </div>

        {/* Section: Background, lighting, expression */}
        <h2 id="background-rules" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Background, lighting, and expression rules
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The background must be plain white or off-white, with no patterns, textures, or distracting elements. Shadows on the background are a frequent cause of rejection, especially when people take selfies at home with a wall directly behind them. A gap of at least 2 to 3 feet between you and the background reduces shadow significantly.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Lighting should be even and front-facing. Avoid side lighting that creates shadows on one side of the face. Natural window light from a large window facing you is often the best option at home. Avoid overhead lighting alone, as it casts deep shadow under the nose and chin.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Expression rules are strict. Your mouth must be closed. You should not be smiling, even slightly. Your eyes must be fully open and looking directly into the camera. Head coverings are not permitted unless worn for religious reasons, and in that case the face from chin to hairline must be fully visible.
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          {[
            "Plain white or off-white background. No grey, no cream, no patterns.",
            "No shadows on the background or across your face.",
            "Both eyes fully open, looking directly at the camera.",
            "Neutral expression, mouth closed.",
            "No glasses. No sunglasses. No tinted lenses.",
            "No head coverings except for established religious reasons.",
            "Head centered and upright. No tilting.",
            "Photo taken in the last 6 months.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Section: 2026 AI ban */}
        <h2 id="2026-ai-ban" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          January 2026: AI edits and filters are now rejected
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the most significant change to US passport photo requirements in recent years, and it catches many applicants off guard. Since January 2026, the US Department of State explicitly rejects passport photos that have been altered using AI tools or beauty filters of any kind.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The following types of edits are now grounds for automatic rejection:
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">AI background removal and replacement:</strong> even if the resulting background appears white, the Department of State can detect that the background was digitally generated or swapped. You must photograph against a real white or off-white surface.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Portrait mode blur / bokeh:</strong> the background must have natural depth, not artificial blur applied by computational photography modes. Disable portrait mode before taking the photo.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Skin smoothing and beauty filters:</strong> filters that smooth skin texture, remove blemishes, change skin tone, or otherwise alter facial appearance are rejected. The photo must represent your actual appearance.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">AI-generated photos:</strong> any photo that was generated or substantially altered by AI (including photo restoration tools that reconstruct facial features) is rejected.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This rule change directly affects many of the online &quot;passport photo generator&quot; tools that use AI to extract your face from any selfie, artificially brighten or smooth it, and composite it onto a white background. Those photos are now non-compliant.
        </p>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1.5 uppercase tracking-wide">
            Why SammaPix stays compliant
          </p>
          <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
            The{" "}
            <Link href="/tools/passport-photo" className="underline underline-offset-2">
              SammaPix passport photo tool
            </Link>{" "}
            only crops and resizes your photo to meet the 2x2 inch and 600x600 pixel specifications. It does not apply any AI processing, does not alter your face, does not smooth your skin, and does not replace or generate the background. Your photo is your photo, resized to spec. That is all. No alterations means no rejection under the January 2026 rules.
          </p>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical implication: take a plain photo against a real white wall, transfer it to your computer, and use a compliant cropping tool. Do not run it through your phone&apos;s AI photo enhancement, do not use an app that &quot;auto-corrects&quot; your face for documents, and do not take the photo in portrait mode.
        </p>

        {/* Section: File size limits */}
        <h2 id="file-size-limits" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          File size limits by application type
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The file size requirement varies by how you are submitting your application, and confusing these is a common cause of upload failures.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Application type</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">File size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Format</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Online passport renewal</td>
                <td className="px-4 py-2.5 text-xs">54 KB to 10 MB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Visa application (DS-160)</td>
                <td className="px-4 py-2.5 text-xs">Max 240 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">DV Lottery (diversity visa)</td>
                <td className="px-4 py-2.5 text-xs">Max 240 KB</td>
                <td className="px-4 py-2.5 text-xs">JPEG only</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">In-person passport application</td>
                <td className="px-4 py-2.5 text-xs">Printed 2x2 inch photo</td>
                <td className="px-4 py-2.5 text-xs">Physical print, matte or glossy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If your photo exceeds the 240 KB limit for visa or DV Lottery applications, use the{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix compress tool
          </Link>{" "}
          to reduce the file size. You can target an exact KB ceiling and the tool will find the right JPEG quality to match. It runs entirely in your browser so the photo stays on your device.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For online renewal specifically, the minimum file size of 54 KB catches people who have compressed their photo too aggressively. A 600x600 JPEG at around 85% quality typically lands between 80 and 150 KB, well within the window. If you have compressed down to 40 KB trying to save space, the portal will reject your upload.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/passport-photo" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool: no upload, no signup, no AI edits</p>
            <p className="text-sm font-semibold text-white leading-snug">Crop and resize your passport photo to 2x2 spec now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Step by step */}
        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step by step: make your passport photo free online
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Here is the exact process to go from a smartphone photo to a compliant US passport photo, for free, without uploading your image to any server.
        </p>

        <div className="space-y-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Take the photo correctly</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Stand 2 to 3 feet in front of a white or off-white wall. Use natural window light or even, front-facing room lighting. Turn off portrait mode on your phone. Remove glasses. Look directly at the camera with a neutral expression, mouth closed. Have someone else take the photo so you can stand straight with your full face and top of shoulders visible.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Open the passport photo tool</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Go to{" "}
                <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                  sammapix.com/tools/passport-photo
                </Link>{" "}
                and select the US 2x2 preset. Drop in your photo from your device. The tool loads it locally in your browser: nothing is transmitted to any server.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Crop with the face guide overlay</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Position the crop frame so your chin sits just below the bottom guide line and your crown sits just below the top guide line. Your face should occupy between 50% and 69% of the total frame height. Adjust the crop until the placement looks centered and natural.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              4
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Export at 600x600 pixels</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Download the cropped photo at 600x600 pixels. Check the file size. A typical JPEG at this size lands between 80 and 200 KB, which fits comfortably within the online renewal window of 54 KB to 10 MB.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              5
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Compress if needed for visa or DV Lottery</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                If your application type requires a maximum of 240 KB (visa or DV Lottery), open the{" "}
                <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                  SammaPix compress tool
                </Link>{" "}
                and target 200 KB to leave a safe margin. Again, everything runs in your browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] flex items-center justify-center text-xs font-bold">
              6
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Verify at travel.state.gov before submitting</p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Use the official photo tool at{" "}
                <a
                  href="https://travel.state.gov/content/travel/en/passports/photos.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2"
                >
                  travel.state.gov
                </a>{" "}
                to check your photo against current requirements before uploading. This guide reflects requirements as of August 2026, but government specifications can change.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Common rejection reasons */}
        <h2 id="common-rejection-reasons" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Most common reasons passport photos are rejected
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even applicants who follow most of the rules still get rejected because of specific, avoidable mistakes. Here are the most frequent rejection reasons, based on guidance from the US Department of State:
        </p>

        <div className="space-y-3 mb-6">
          {[
            {
              label: "Face too small or too large",
              detail: "The most common technical rejection. Face from chin to crown must be between 1 and 1 3/8 inches in a printed 2x2 photo. Too many people crop tight on the shoulders and leave too much headroom above the crown.",
            },
            {
              label: "Background with shadows",
              detail: "A visible shadow on the background behind or beside the head causes automatic rejection. Stand away from the wall and use diffuse front lighting to eliminate shadows.",
            },
            {
              label: "Glasses in the frame",
              detail: "No glasses have been allowed since 2016. This includes reading glasses, sunglasses, and prescription lenses. Remove all eyewear before taking the photo.",
            },
            {
              label: "Portrait mode blur on the background",
              detail: "Since January 2026, artificially blurred backgrounds are rejected. Disable portrait mode before shooting. The background must have natural depth.",
            },
            {
              label: "AI-enhanced skin or features",
              detail: "Beauty filters applied automatically by phone cameras (common on many Android and iPhone models) smooth skin texture. Disable all automatic enhancements in your camera app settings before shooting.",
            },
            {
              label: "File too small or wrong format",
              detail: "PNG, HEIC, and WebP files are not accepted. The file must be JPEG. Photos below 54 KB (for online renewal) will be rejected at the upload portal.",
            },
            {
              label: "Photo not taken recently enough",
              detail: "The photo must reflect your current appearance and be taken within the last 6 months. Using an old photo that looks good but is 2 years old is grounds for rejection.",
            },
          ].map(({ label, detail }) => (
            <div key={label} className="flex items-start gap-3 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <span className="mt-0.5 h-4 w-4 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{label}</p>
                <p className="text-xs text-[#737373] leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Internal links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related tools and guides</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/passport-photo" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Passport Photo Tool
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress Images
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 240KB
            </Link>
            <Link href="/tools/croproatio" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Crop to Ratio
            </Link>
            <Link href="/blog/check-remove-exif-data-photos" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Remove EXIF Before Submitting
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
                q: "What size is a US passport photo?",
                a: "A US passport photo must be exactly 2 x 2 inches (51 x 51 millimeters), printed as a square. For digital submissions through the online renewal portal, the image must be between 600 x 600 and 1200 x 1200 pixels, in JPEG format. The square format is mandatory at every submission type.",
              },
              {
                q: "What pixel size should my passport photo be?",
                a: "For online passport renewal, the photo must be between 600 x 600 and 1200 x 1200 pixels. A 600x600 JPEG is the safe default that meets the minimum without exceeding the maximum. For visa applications and the DV Lottery, the same pixel range applies but the file must be no larger than 240 KB.",
              },
              {
                q: "Does the passport photo background have to be white?",
                a: "Yes. The background must be plain white or off-white with no patterns, textures, shadows, or gradients. As of January 2026, AI-generated or AI-replaced backgrounds are explicitly rejected, even when the replacement looks white. You must photograph against a real white or off-white surface, not a digitally generated one.",
              },
              {
                q: "Can I use an AI-edited or beauty-filtered photo for my US passport?",
                a: "No. Since January 2026, the US Department of State rejects any passport photo that has been altered by AI tools, beauty filters, skin smoothing, portrait blur, or AI background replacement. The photo must be an unaltered representation of your actual appearance. The SammaPix tool only crops and resizes your photo to spec without touching your face or background.",
              },
              {
                q: "What is the file size limit for US passport photos?",
                a: "For online passport renewal, the file must be a JPEG between 54 KB and 10 MB. For visa applications and the Diversity Visa (DV) Lottery, the maximum is 240 KB. If your photo exceeds the limit, use the SammaPix compress tool to reduce the file size while keeping the image within the pixel dimensions.",
              },
              {
                q: "Is the SammaPix passport photo tool free? Does it upload my photo?",
                a: "The tool is completely free. Your photo is never uploaded to any server. All processing happens locally in your browser using client-side JavaScript. This is especially important for passport and ID photos that contain your personal likeness. Nothing is stored, transmitted, or retained after you close the browser tab.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
          <p className="text-xs text-[#A3A3A3] leading-relaxed">
            <strong className="text-[#737373]">Important:</strong> passport photo requirements are set by government agencies and can change without notice. Always verify the current official requirements at{" "}
            <a
              href="https://travel.state.gov/content/travel/en/passports/photos.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              travel.state.gov
            </a>{" "}
            before submitting any application. This guide reflects requirements as of August 2026 and is intended for informational purposes only.
          </p>
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
