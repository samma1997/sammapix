import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "UPSC Photo & Signature Size 2026 (Exact Specs)",
  description:
    "UPSC photo: 200x230 px, 20-300 KB, JPEG, white background. Signature: 350-500 px wide, 20-100 KB, JPEG. Free browser tool to resize and compress both without uploading your ID photo.",
  alternates: {
    canonical: `${APP_URL}/blog/upsc-photo-signature-size-2026`,
  },
  keywords: [
    "upsc photo size",
    "upsc signature size",
    "upsc photo 200x230",
    "upsc photo kb",
    "upsc signature 20kb",
    "upsc application photo requirements 2026",
  ],
  openGraph: {
    title: "UPSC Photo & Signature Size 2026 (Exact Specs)",
    description:
      "Exact UPSC photo and signature specs for 2026. Free tools to resize to 200x230 px and compress to the required KB range, right in your browser.",
    url: `${APP_URL}/blog/upsc-photo-signature-size-2026`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPSC Photo & Signature Size 2026 (Exact Specs)",
    description:
      "UPSC photo 200x230 px, 20-300 KB, JPEG only. Signature 350-500 px, 20-100 KB. Fix both free in your browser, no upload.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/upsc-photo-signature-size-2026`;
const POST_TITLE = "UPSC Photo & Signature Size 2026 (Exact Specs)";
const SLUG = "upsc-photo-signature-size-2026";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Verified UPSC Civil Services photo and signature upload requirements for 2026: exact pixel dimensions, file size in KB, format rules, background requirements, common rejection reasons, and a step-by-step guide using free browser-based tools to resize and compress without uploading your ID photo.",
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
    "upsc photo size",
    "upsc signature size",
    "upsc photo 200x230",
    "upsc photo kb",
    "upsc signature 20kb",
    "upsc application photo requirements 2026",
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
      name: "What is the UPSC photo size in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UPSC Civil Services application requires a photograph of exactly 200 pixels wide by 230 pixels tall. The file must be in JPEG format, between 20 KB and 300 KB, with a plain white background and a recent clear face.",
      },
    },
    {
      "@type": "Question",
      name: "What is the UPSC signature size in KB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UPSC signature must be between 20 KB and 100 KB in file size. It should be 350 to 500 pixels wide, scanned from a black ink signature on plain white paper, and saved as a JPEG file.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a PNG file for the UPSC photo upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. UPSC accepts only JPEG (JPG) format for both the photograph and the signature. PNG files will be rejected. If your image is saved as PNG or HEIC, convert it to JPEG before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "What background color is required for the UPSC photograph?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UPSC photograph must have a plain white background. Colored walls, outdoor settings, and studio gradient backgrounds are not accepted. The face must be clearly visible with no shadows.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo to 200x230 pixels for UPSC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use SammaPix ResizePack at sammapix.com/tools/resizepack. Enter 200 for width and 230 for height, apply the resize, and export as JPEG. The entire process runs in your browser without uploading your photo to any server.",
      },
    },
    {
      "@type": "Question",
      name: "My photo file is only 15 KB. Will it be rejected by UPSC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The UPSC photo minimum is 20 KB. A file below 20 KB will be rejected at upload. If your photo is too small in file size, re-export it at higher quality from the SammaPix compress tool, targeting at least 20 KB.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload the photo and signature together from my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix works on any mobile browser including Chrome and Safari on Android and iPhone. Open sammapix.com/tools/resizepack or sammapix.com/tools/compress in your browser, select your photo, process it, and download. No app install needed.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to prepare your UPSC photo and signature for upload",
  description:
    "Step-by-step guide to resize and compress a UPSC photograph to 200x230 pixels and 20-300 KB, and a UPSC signature to 350-500 pixels and 20-100 KB, using free browser tools.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check your photo background",
      text: "Your photograph must have a plain white background. If it does not, use SammaPix Passport Photo at sammapix.com/tools/passport-photo to remove the background and replace it with white.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Resize the photo to 200x230 pixels",
      text: "Open SammaPix ResizePack at sammapix.com/tools/resizepack. Upload your photo, set the width to 200 and height to 230 pixels, and click resize. Export as JPEG.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Compress the photo to between 20 KB and 300 KB",
      text: "Open SammaPix Compress at sammapix.com/tools/compress. Upload the resized photo and target a file size between 100 KB and 200 KB. Download the result.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Prepare your signature",
      text: "Sign your name three times in black ink on a plain white sheet of paper. Choose the clearest signature, scan or photograph it, then crop tightly around the signature.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Resize and compress the signature",
      text: "Open SammaPix CropRatio at sammapix.com/tools/croproatio to crop the signature to a wide landscape ratio. Then use SammaPix Compress to target a file size between 40 KB and 80 KB. Save as JPEG.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Verify both files before uploading",
      text: "Right-click each file and check Properties or Get Info. Confirm the photo is 200x230 pixels and between 20 and 300 KB in JPEG format. Confirm the signature is 350 to 500 pixels wide and between 20 and 100 KB in JPEG format.",
    },
  ],
};

export default function UpscPhotoSignatureSize2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={SLUG}
        description={`Getting your UPSC Civil Services photo and signature rejected is more common than you think. The portal gives no clear error, the deadline is tomorrow, and your phone photo is 4 MB in HEIC format. This guide covers the exact UPSC photo and signature specifications for 2026 and shows you how to fix both files in under three minutes using free tools that run entirely in your browser.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "exact-specs-at-a-glance", title: "Exact specs at a glance" },
          { id: "upsc-photo-requirements", title: "UPSC photo requirements in detail" },
          { id: "upsc-signature-requirements", title: "UPSC signature requirements in detail" },
          { id: "common-rejection-reasons", title: "Common rejection reasons and how to avoid them" },
          { id: "step-by-step-photo", title: "Step-by-step: prepare your UPSC photo" },
          { id: "step-by-step-signature", title: "Step-by-step: prepare your UPSC signature" },
          { id: "why-no-upload", title: "Why no-upload matters for your ID photo" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "UPSC photo must be exactly 200x230 pixels, between 20 and 300 KB, in JPEG format only, with a plain white background and a recent clear-face shot.",
          "UPSC signature must be between 350 and 500 pixels wide, between 20 and 100 KB, in JPEG format, scanned from a black ink signature on white paper.",
          "PNG files are rejected by the UPSC portal. Convert any HEIC or PNG to JPEG before uploading.",
          "SammaPix ResizePack and CropRatio set exact pixel dimensions. SammaPix Compress hits the KB target. SammaPix Passport Photo removes and replaces the background.",
          "Every tool runs in your browser without uploading your photo to any server, which matters when the image contains your face and personal identity.",
          "Always confirm the exact limits against the official UPSC notification for your specific recruitment cycle before submitting.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
              alt="Person studying official government documents at a desk, representing UPSC civil services exam application preparation"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A rejected photo upload costs you precious time during the UPSC application window. Getting the specs right the first time matters. Photo by Unsplash.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Resize and compress your UPSC photo free, right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Set pixels to 200x230, hit the 20 to 300 KB range, export as JPEG. Everything runs locally in your browser. Your face photo never leaves your device.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open ResizePack
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress to target KB
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
            UPSC photograph: <strong className="text-[#171717] dark:text-[#E5E5E5]">200x230 pixels, 20 to 300 KB, JPEG only, plain white background.</strong> UPSC signature: <strong className="text-[#171717] dark:text-[#E5E5E5]">350 to 500 pixels wide, 20 to 100 KB, JPEG only, black ink on white paper.</strong> Use{" "}
            <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix ResizePack
            </Link>{" "}
            to set pixels and{" "}
            <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix Compress
            </Link>{" "}
            to hit the KB target. Both run in your browser, no upload. Always verify the final limits in the official UPSC notification for your specific cycle.
          </p>
        </div>

        {/* Section: Exact specs at a glance */}
        <h2 id="exact-specs-at-a-glance" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Exact specs at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The UPSC portal is strict. Files that fall outside any single dimension will be rejected without a clear explanation. Here are the official requirements in one table.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Requirement</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Photograph</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Signature</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Pixel dimensions</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">200 x 230 pixels (W x H)</td>
                <td className="px-4 py-2.5 text-xs">350 to 500 pixels wide</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File size (KB)</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">20 KB to 300 KB</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">20 KB to 100 KB</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File format</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400">JPEG only (PNG rejected)</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400">JPEG only (PNG rejected)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs">Plain white, no shadows</td>
                <td className="px-4 py-2.5 text-xs">Plain white paper</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Face / content</td>
                <td className="px-4 py-2.5 text-xs">Recent, clear, front-facing</td>
                <td className="px-4 py-2.5 text-xs">Black ink, legible</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Aspect ratio (W:H)</td>
                <td className="px-4 py-2.5 text-xs">200:230 (portrait, slightly taller than wide)</td>
                <td className="px-4 py-2.5 text-xs">Wide landscape (2:1 to 5:1 approximately)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These numbers come from the UPSC Civil Services (Preliminary) notification pattern that has been consistent across recent cycles. The official notification for each recruitment year is the single authoritative source. Always cross-check these figures against the notification you downloaded from the UPSC website before submitting your application.
        </p>

        {/* Section: Photo requirements detail */}
        <h2 id="upsc-photo-requirements" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          UPSC photo requirements in detail
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The photograph requirement for UPSC Civil Services is more specific than most applicants realise on first read. Here is what each rule means in practice.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Dimensions: 200 pixels wide, 230 pixels tall</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          200x230 is a portrait orientation, slightly taller than it is wide. Your phone camera produces photos at 12 to 50 megapixels, which means 4000 pixels or wider. You need to resize down to exactly 200x230. Do not simply crop; you need to resize (scale down) while maintaining the correct aspect ratio, or the face will appear distorted.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix ResizePack
          </Link>{" "}
          to enter exact pixel values. Or use{" "}
          <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix CropRatio
          </Link>{" "}
          to first crop your photo to the 200:230 aspect ratio, then resize to the final pixel dimensions. This is the most reliable two-step sequence for passport-style photos.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">File size: 20 KB to 300 KB</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is a range, not a single target. Your file must be at least 20 KB (below that it signals a corrupt or extremely low-quality image) and no more than 300 KB. A phone photo resized to 200x230 pixels will naturally land around 15 to 80 KB depending on the JPEG quality setting. If it comes out below 20 KB, re-export at higher quality. If it comes out above 300 KB (unlikely at this resolution but possible with very high quality settings), compress it down.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The sweet spot is 80 to 200 KB: good quality, well within the range, and the portal accepts it immediately. Use{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>{" "}
          or{" "}
          <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Compress to 100 KB
          </Link>{" "}
          to target a specific size without guessing.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Format: JPEG only</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the most common rejection reason that applicants do not expect. iPhones save photos as HEIC by default. When you send a photo from an iPhone to your laptop via AirDrop or email, it may arrive as a .heic file. Android phones sometimes save as PNG when you use the front camera in certain modes. UPSC rejects both.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You need a .jpg or .jpeg file. All SammaPix tools export in JPEG by default when you choose the JPEG option in the download dialog, so this is handled automatically when you process your photo through any of our tools.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Background: plain white, no shadows</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A plain white background is mandatory. Off-white, cream, light grey, or any textured surface will fail manual verification even if the portal accepts the upload. Shadows on the background or the face are also grounds for rejection. The face must be evenly lit, centered, and clearly visible with both eyes open.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If your photo has a non-white background, use{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Passport Photo
          </Link>{" "}
          to remove the background and replace it with white. The tool runs in your browser, processes the image locally, and produces a clean white-background portrait suitable for government applications.
        </p>

        {/* Section: Signature requirements */}
        <h2 id="upsc-signature-requirements" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          UPSC signature requirements in detail
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The signature upload is separate from the photograph and has completely different specifications. Many applicants get the photo right and then get the signature rejected because they treat both the same way.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">How to sign correctly for UPSC</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Take a plain white sheet of A4 paper. Sign your name three times in a vertical column using a black ballpoint pen. Your signature should be legible, consistent, and approximately the same across all three attempts. Choose the clearest one. Do not use a gel pen that smears, and avoid blue ink (black is the standard for government forms unless the notification specifies otherwise).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Scanning vs photographing the signature</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A flatbed scanner at 300 DPI produces the cleanest result. If you do not have a scanner, photograph the signature under good natural light, hold the phone parallel to the paper (not at an angle), and ensure there is no shadow. Apps like Microsoft Lens or Adobe Scan on your phone can produce a clean flat image from a photograph.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Pixel width: 350 to 500 pixels</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          After scanning, the signature image needs to be cropped tightly around the signature (no large white margins) and then resized so the width falls between 350 and 500 pixels. Use{" "}
          <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix CropRatio
          </Link>{" "}
          to crop the white space, then{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix ResizePack
          </Link>{" "}
          to set the width to 400 pixels (a safe value within the 350 to 500 range).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">File size: 20 KB to 100 KB</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A signature at 400 pixels wide in JPEG format will typically be 15 to 60 KB depending on quality. Target 40 to 80 KB for the UPSC signature. If your file is below 20 KB, re-export at higher JPEG quality. If it is above 100 KB (rare at this pixel size), use{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>{" "}
          to bring it into range.
        </p>

        {/* Section: Common rejection reasons */}
        <h2 id="common-rejection-reasons" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common rejection reasons and how to avoid them
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Based on the most frequent issues applicants report with the UPSC online application portal, here are the eight rejection patterns and the fix for each.
        </p>

        <ul className="space-y-4 mb-6 pl-4">
          {[
            {
              label: "Wrong format (HEIC or PNG uploaded instead of JPEG)",
              fix: "Open the image in SammaPix ResizePack and export it as JPEG. The download will be a .jpg file.",
            },
            {
              label: "Photo file is below 20 KB",
              fix: "Re-export the image at a higher JPEG quality. In SammaPix Compress, set the target to 80 KB to stay well above the floor.",
            },
            {
              label: "Photo file is above 300 KB",
              fix: "Use SammaPix Compress to reduce the file size. Target 100 KB to 200 KB for a clean result.",
            },
            {
              label: "Photo dimensions are not 200x230",
              fix: "Use SammaPix ResizePack. Set width to 200 and height to 230 manually. Do not rely on a general resize that preserves aspect ratio, as it may not produce exactly 200x230.",
            },
            {
              label: "Background is off-white, grey, or has a shadow",
              fix: "Use SammaPix Passport Photo to remove the existing background and replace it with a clean solid white.",
            },
            {
              label: "Signature image has too much white margin around it",
              fix: "Use SammaPix CropRatio to crop tightly around the signature before resizing. Excessive white space makes the signature appear very small relative to the frame.",
            },
            {
              label: "Signature is below 20 KB after compression",
              fix: "Re-export at higher quality. At 400 pixels wide, a JPEG at 85 percent quality will comfortably exceed 20 KB.",
            },
            {
              label: "Photo looks blurry at 200x230 pixels",
              fix: "Start with a high-resolution source image (at least 800 pixels wide). Downscaling from a larger original always produces a sharper result than upscaling from a small one.",
            },
          ].map(({ label, fix }) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
              <span>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">{label}.</strong>{" "}
                Fix: {fix}
              </span>
            </li>
          ))}
        </ul>

        {/* Section: Step-by-step photo */}
        <h2 id="step-by-step-photo" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step: prepare your UPSC photo
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Follow these steps in order. Each step takes less than 60 seconds. The entire sequence takes about two minutes.
        </p>

        <ol className="space-y-5 mb-8 pl-4">
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">1</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Take or source a suitable photo.</strong>{" "}
              Use a recent photo taken against a white wall under natural light, or use a photo studio shot. Front-facing, both eyes open, no glasses (UPSC does not explicitly prohibit glasses but many examiners flag them during manual review). The photo should be at least 800 pixels wide in the original for best quality after downscaling.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">2</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Fix the background if needed.</strong>{" "}
              Open{" "}
              <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix Passport Photo
              </Link>. Upload your photo. The tool removes the background and replaces it with white automatically. Download the result.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">3</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Crop to the 200:230 aspect ratio.</strong>{" "}
              Open{" "}
              <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix CropRatio
              </Link>. Set the ratio to 200:230 (or equivalently 20:23). Adjust the crop box so the face is centered with a small margin above the head. Apply and download.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">4</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Resize to exactly 200x230 pixels.</strong>{" "}
              Open{" "}
              <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix ResizePack
              </Link>. Upload the cropped image. Enter 200 for width and 230 for height. Apply and export as JPEG.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">5</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Check the file size and compress if needed.</strong>{" "}
              Right-click the downloaded file and check its size. If it is between 20 KB and 300 KB, you are done. If it falls outside that range, open{" "}
              <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix Compress
              </Link>{" "}
              and target 100 KB. Download the result.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">6</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Verify before uploading.</strong>{" "}
              Open file properties and confirm: dimensions are 200x230, size is between 20 and 300 KB, and the extension is .jpg or .jpeg. Then upload to the UPSC portal.
            </span>
          </li>
        </ol>

        {/* Inline CTA */}
        <Link
          href="/tools/resizepack"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, no signup, no upload</p>
            <p className="text-sm font-semibold text-white leading-snug">Resize your UPSC photo to 200x230 pixels now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Step-by-step signature */}
        <h2 id="step-by-step-signature" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step: prepare your UPSC signature
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The signature requires a slightly different workflow because you start from a physical document rather than a digital photo.
        </p>

        <ol className="space-y-5 mb-8 pl-4">
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">1</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Sign three times on white paper.</strong>{" "}
              Use a black ballpoint pen on a clean plain white sheet. Keep the signature consistent. Sign only your full name (not initials unless that is your established signature). Leave space between signatures so you can identify the clearest one.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">2</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Scan or photograph the best signature.</strong>{" "}
              Scan at 300 DPI for the cleanest result. If using a phone camera, hold it directly above the paper with the camera parallel to the surface. Use good, even lighting without shadows. Apps like Adobe Scan will process the image to flatten it automatically.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">3</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Crop tightly around the signature.</strong>{" "}
              Open{" "}
              <Link href="/tools/croproatio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix CropRatio
              </Link>. Use freeform crop mode to remove all excess white margins. Leave only a small amount of white space around the signature text itself. Apply and download.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">4</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Resize the width to 400 pixels.</strong>{" "}
              Open{" "}
              <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix ResizePack
              </Link>. Set width to 400 pixels and let the height scale proportionally. 400 px falls within the required 350 to 500 px range. Export as JPEG.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">5</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Check the file size.</strong>{" "}
              A 400-pixel-wide JPEG at standard quality will usually be between 30 and 70 KB. If it is within 20 to 100 KB, you are done. If it is above 100 KB, open{" "}
              <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix Compress
              </Link>{" "}
              and target 60 KB.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
            <span className="mt-0.5 h-5 w-5 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold flex items-center justify-center shrink-0">6</span>
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Verify before uploading.</strong>{" "}
              Confirm width is between 350 and 500 pixels, file size is between 20 and 100 KB, and format is JPEG. Upload to the UPSC portal separately from the photograph.
            </span>
          </li>
        </ol>

        {/* Section: Why no-upload matters */}
        <h2 id="why-no-upload" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why no-upload matters for your ID photo
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most online image resizers require you to upload your photo to their server. That is standard for generic images. For a government application photograph tied to your identity, uploading to a random server means your face photo and its associated EXIF data (which may include the GPS location where it was taken, your camera model, and the exact timestamp) are stored on infrastructure you have no control over.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix processes every image in your browser. The pixel operations run in WebAssembly and JavaScript on your own device. No photo data leaves your machine. The file you download is generated locally. There is no server storing your image, no account required, and no data retained after you close the tab.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For an identity document photo intended for a competitive exam of national importance, that is the right approach.
        </p>

        {/* Tool links panel */}
        <div className="mt-8 p-5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Free tools used in this guide
          </h3>
          <p className="text-sm text-[#737373] mb-4">
            All tools run in your browser. No account, no upload, no data retained.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              ResizePack: set exact pixel dimensions
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              CropRatio: crop to correct aspect ratio
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress: hit the exact KB target
            </Link>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Passport Photo: white background portrait
            </Link>
            <Link
              href="/compress-to/100kb"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to exactly 100 KB
            </Link>
            <Link
              href="/compress-to/200kb"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to exactly 200 KB
            </Link>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog/compress-photos-indian-exam-applications"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress Photos for Indian Exam Applications
            </Link>
            <Link
              href="/blog/passport-photo-requirements-2026"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Passport Photo Requirements 2026
            </Link>
            <Link
              href="/blog/passport-photo-at-home-free"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Passport Photo at Home (Free)
            </Link>
            <Link
              href="/blog/batch-compress-images-no-signup-free"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Batch Compress Images (No Signup)
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
                q: "What is the UPSC photo size in pixels?",
                a: "The UPSC Civil Services application requires a photograph of exactly 200 pixels wide by 230 pixels tall. Use SammaPix ResizePack to enter those exact dimensions and export as JPEG.",
              },
              {
                q: "What is the UPSC signature size in KB?",
                a: "The UPSC signature must be between 20 KB and 100 KB. Target 40 to 80 KB for a comfortable margin. The pixel width should be between 350 and 500 pixels. Use SammaPix Compress to reach the target if your file is too large.",
              },
              {
                q: "Can I use a PNG file for the UPSC photo upload?",
                a: "No. UPSC accepts only JPEG format for both the photograph and the signature. PNG files will be rejected. Open your image in SammaPix ResizePack and export as JPEG to convert it.",
              },
              {
                q: "What background color is required for the UPSC photograph?",
                a: "Plain white only. Off-white, cream, light grey, and any textured or colored backgrounds are rejected during manual verification. Use SammaPix Passport Photo to replace a non-white background with clean white.",
              },
              {
                q: "How do I resize my photo to 200x230 pixels for UPSC?",
                a: "Open SammaPix ResizePack at sammapix.com/tools/resizepack. Upload your photo, enter 200 for width and 230 for height, click resize, and export as JPEG. Everything runs in your browser without uploading your photo to any server.",
              },
              {
                q: "My photo file is only 15 KB. Will it be rejected by UPSC?",
                a: "Yes. The UPSC photo minimum is 20 KB. Re-export at higher JPEG quality. In SammaPix Compress, set the target to 80 KB to stay well above the minimum threshold.",
              },
              {
                q: "Can I upload the photo and signature from my phone?",
                a: "Yes. SammaPix works in any mobile browser including Chrome and Safari on Android and iPhone. Open the tools at sammapix.com, select your photo, process it, and download. No app install required.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final disclaimer */}
        <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
            Important
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            The specifications in this guide reflect the UPSC Civil Services notification pattern for recent recruitment cycles. UPSC may update its requirements for specific exams. Always download the official notification from{" "}
            <strong>upsc.gov.in</strong> for your specific recruitment year and cross-check every dimension and file size before submitting your application.
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
