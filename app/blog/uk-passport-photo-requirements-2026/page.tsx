import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "UK Passport Photo Requirements 2026 (Size & Rules)",
  description:
    "Official UK passport photo size is 45x35mm printed; digital must be at least 600x750px. Background must be plain light grey or cream. Full checklist inside.",
  alternates: {
    canonical: `${APP_URL}/blog/uk-passport-photo-requirements-2026`,
  },
  keywords: [
    "uk passport photo size",
    "45x35mm passport photo",
    "british passport photo requirements",
    "uk passport photo online",
    "passport photo 600x750",
    "digital passport photo uk",
  ],
  openGraph: {
    title: "UK Passport Photo Requirements 2026 (Size & Rules)",
    description:
      "Official UK passport photo requirements: 45x35mm printed, 600x750px digital minimum, light grey or cream background. Free preparation guide with browser tools.",
    url: `${APP_URL}/blog/uk-passport-photo-requirements-2026`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Passport Photo Requirements 2026 (Size & Rules)",
    description:
      "45x35mm printed, 600x750px digital, light grey or cream background. Full UK passport photo checklist plus free browser tools to prepare yours.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/uk-passport-photo-requirements-2026`;
const POST_TITLE = "UK Passport Photo Requirements 2026 (Size & Rules)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Complete guide to UK passport photo requirements for 2026. Covers the official 45x35mm printed size, the 600x750px minimum for digital submissions, face height rules (29 to 34mm crown to chin), background colour requirements (plain light grey or cream, not pure white), expression rules, the glasses ban, and step-by-step instructions for preparing a compliant photo using free browser-based tools.",
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
    "uk passport photo size",
    "45x35mm passport photo",
    "british passport photo requirements",
    "uk passport photo online",
    "passport photo 600x750",
    "digital passport photo uk",
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
      name: "What size does a UK passport photo need to be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A printed UK passport photo must be exactly 45mm tall by 35mm wide. For a digital photo submitted online, HMPO requires the image to be at least 600 pixels wide by 750 pixels tall.",
      },
    },
    {
      "@type": "Question",
      name: "What colour background is required for a UK passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The background must be plain light grey or cream. Pure white is technically out of specification and can be rejected because it makes the photo look cropped or manipulated. A pale, neutral grey or off-white cream tone is the safest choice.",
      },
    },
    {
      "@type": "Question",
      name: "What is the face height requirement for a UK passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The face (measured from the crown of the head to the chin) must be between 29mm and 34mm on a printed 45x35mm photo. The face must be centred and looking straight at the camera.",
      },
    },
    {
      "@type": "Question",
      name: "Can you wear glasses in a UK passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. As of 2018, glasses are no longer allowed in UK passport photos. Even prescription glasses must be removed for the photo. This rule applies to all applicants.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a free online tool to prepare my UK passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use SammaPix Passport Photo tool at sammapix.com/tools/passport-photo to crop and resize your photo to the exact UK spec (45x35mm / 600x750px) for free, directly in your browser. Your image is never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Does my photo get uploaded when I use an online passport photo tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with SammaPix. All processing happens locally in your browser using client-side code. Your photo never leaves your device. This is different from many other online tools that upload your image to a remote server.",
      },
    },
    {
      "@type": "Question",
      name: "What resolution should a digital UK passport photo be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HMPO specifies a minimum of 600 pixels wide by 750 pixels tall for digital submissions. Higher resolution is fine as long as the aspect ratio (4:5 width to height) and proportions are correct.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to prepare a compliant UK passport photo online",
  description:
    "Steps to prepare a UK passport photo that meets HMPO requirements, using free browser-based tools with no file upload.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Take or choose a suitable source photo",
      text: "Use a recent, clear photo against a plain light grey or cream background. Make sure the face is centred, expression is neutral, mouth is closed, and no glasses are worn.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the SammaPix Passport Photo tool",
      text: "Go to sammapix.com/tools/passport-photo and select the UK preset. This applies the correct 45x35mm ratio (4:5) automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Crop and position the face",
      text: "Adjust the crop so the face fills 29 to 34mm of the 45mm height. Use the on-screen guides to ensure the head is centred.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Check the pixel dimensions",
      text: "For digital submission the output must be at least 600x750px. Use the SammaPix Resize tool or Resizepack to set exact pixel dimensions if needed.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compress if needed",
      text: "HMPO has a file size limit for digital uploads. Use the SammaPix Compress tool to reduce file size without visible quality loss.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download and submit",
      text: "Download the prepared photo. For printed photos, print at the correct 45x35mm size (6x4 inch photo paper with crop marks). For online renewal, upload to the HMPO digital service.",
    },
  ],
};

export default function UKPassportPhotoRequirements2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="uk-passport-photo-requirements-2026"
        description={`Getting your UK passport photo right the first time saves you a wasted trip to the post office or a rejected online application. The rules are specific: printed photos must be exactly 45x35mm, digital photos must be at least 600x750 pixels, and the background must be plain light grey or cream (not pure white). This guide covers every official requirement and shows you how to prepare a compliant photo for free, entirely in your browser.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "quick-answer", title: "Quick answer: the UK passport photo spec at a glance" },
          { id: "printed-size", title: "Printed photo size: 45x35mm explained" },
          { id: "digital-size", title: "Digital photo size: 600x750px minimum" },
          { id: "background-colour", title: "Background colour: grey or cream, not pure white" },
          { id: "face-rules", title: "Face rules: expression, position, and glasses" },
          { id: "prepare-free", title: "How to prepare your photo free in your browser" },
          { id: "common-rejection-reasons", title: "Most common reasons passport photos get rejected" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Printed UK passport photo must be exactly 45mm tall by 35mm wide.",
          "Digital photo for online submission must be at least 600 pixels wide by 750 pixels tall.",
          "Face height from crown to chin must be between 29mm and 34mm on a printed photo.",
          "Background must be plain light grey or cream. Pure white can be rejected.",
          "Glasses are banned in all UK passport photos as of 2018.",
          "You can prepare a compliant photo for free using SammaPix tools: everything runs in your browser and your image is never uploaded.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
              alt="UK passport and travel documents representing passport photo requirements for British passport applications"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting every detail right before you submit saves time and avoids rejection. Photo by ConvertKit on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Prepare your UK passport photo free, right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix Passport Photo to crop to the exact 45x35mm UK spec in seconds. Your photo never leaves your device. No account, no upload, no cost.
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
                Compress Photo
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
            A UK passport photo must be <strong>45mm tall by 35mm wide</strong> when printed. For digital submissions, the image must be at least <strong>600 pixels wide by 750 pixels tall</strong>. The background must be <strong>plain light grey or cream</strong> (pure white is out of spec). The face (crown to chin) must measure <strong>29 to 34mm</strong> on the printed photo. Glasses are not allowed. Prepare yours for free at{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/passport-photo
            </Link>{" "}
            with no upload required.
          </p>
        </div>

        {/* Section: Quick spec table */}
        <h2 id="quick-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Quick answer: the UK passport photo spec at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Before going into the details of each rule, here is every official requirement in one table. These figures come from the HMPO (His Majesty&apos;s Passport Office) guidance. Always confirm against the latest version at gov.uk before submitting, as requirements can be updated.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Requirement</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Official Spec</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Printed size</td>
                <td className="px-4 py-2.5 text-xs">45mm x 35mm</td>
                <td className="px-4 py-2.5 text-xs">Height x width. Aspect ratio is 9:7 (or approximately 4:5 for digital).</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Digital minimum size</td>
                <td className="px-4 py-2.5 text-xs">600 x 750 px</td>
                <td className="px-4 py-2.5 text-xs">Width x height. Higher resolution is accepted.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Face height (crown to chin)</td>
                <td className="px-4 py-2.5 text-xs">29 to 34mm</td>
                <td className="px-4 py-2.5 text-xs">On a printed 45x35mm photo. Face must be centred.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs">Plain light grey or cream</td>
                <td className="px-4 py-2.5 text-xs">Pure white can be rejected. No patterns, shadows, or other colours.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Expression</td>
                <td className="px-4 py-2.5 text-xs">Neutral, mouth closed</td>
                <td className="px-4 py-2.5 text-xs">Eyes open, looking directly at the camera.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Glasses</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Not allowed</td>
                <td className="px-4 py-2.5 text-xs">Banned since 2018. Prescription glasses must be removed.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Head coverings</td>
                <td className="px-4 py-2.5 text-xs">Not allowed (with exceptions)</td>
                <td className="px-4 py-2.5 text-xs">Allowed for religious or medical reasons, but the face must be clearly visible.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo age</td>
                <td className="px-4 py-2.5 text-xs">Recent (within 1 month recommended)</td>
                <td className="px-4 py-2.5 text-xs">Must be a true likeness of you now, not years ago.</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Format (digital)</td>
                <td className="px-4 py-2.5 text-xs">JPEG</td>
                <td className="px-4 py-2.5 text-xs">File size limit applies. Check HMPO guidance for current limits.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Each of these points has nuances that cause real rejections. The background colour rule in particular trips up a significant number of applicants who use a plain white wall and assume it will be fine. Let us cover each area in detail.
        </p>

        {/* Section: Printed size */}
        <h2 id="printed-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Printed photo size: 45x35mm explained
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The UK printed passport photo size is <strong>45mm tall by 35mm wide</strong>. This is a slightly unusual proportion compared to standard photo prints, so you cannot simply crop any photo to a 4:5 ratio and print it at any size. The physical dimensions on paper must be exactly 45x35mm.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In practice, most photo printing services (chemists, supermarkets, online printers) offer a &quot;passport photo&quot; template that handles the dimensions for you. If you are printing at home, set your image to 35mm wide by 45mm tall in your print settings and ensure the print resolution is high enough (at least 300 dpi) so the photo is sharp and not pixelated.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The aspect ratio of 45x35mm works out to approximately 1.286:1 (height to width), which maps cleanly to a 900x700 pixel image at 500 dpi or a 1350x1050 pixel image at 762 dpi. For most purposes, shooting at any reasonable resolution and cropping to the 45:35 ratio (or 9:7) gives you a print-ready file.
        </p>

        {/* Section: Digital size */}
        <h2 id="digital-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Digital photo size: 600x750px minimum
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you renew or apply for a UK passport online, HMPO asks you to upload a digital photo. The minimum acceptable size is <strong>600 pixels wide by 750 pixels tall</strong>. This is the digital equivalent of the 35x45mm printed format (width by height, reversed from the millimetre spec).
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Higher resolution is fine and generally preferred, as it gives HMPO more data to verify compliance. A photo from a modern smartphone at full resolution easily exceeds this minimum. The key constraint is the <strong>aspect ratio</strong>: the image must be in a 4:5 ratio (width to height), matching the 600x750 proportion. A 1200x1500 pixel image is equally valid.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md p-4 mb-6">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wide">
            File size limit
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            HMPO imposes an upper file size limit on digital uploads. If your photo is too large to upload, use the{" "}
            <Link href="/tools/compress" className="underline underline-offset-2">
              SammaPix Compress tool
            </Link>{" "}
            to reduce file size without visible quality loss. Processing happens entirely in your browser.
          </p>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          One important distinction: the HMPO digital photo service does not simply accept any photo you upload. It uses automated checks and, in some cases, manual review to confirm the photo meets all requirements. Preparing your image correctly before upload saves you from having to resubmit.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use the{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Passport Photo tool
          </Link>{" "}
          to crop your image to the correct 4:5 ratio with the UK preset. If you need to hit a specific pixel dimension such as exactly 600x750, follow up with{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Resizepack
          </Link>.
        </p>

        {/* Section: Background colour */}
        <h2 id="background-colour" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Background colour: grey or cream, not pure white
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the rule that catches the most people. The HMPO specification states the background must be <strong>plain light grey or cream</strong>. Pure white is not listed as an acceptable background colour and photos with a pure white background can be rejected.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The reason pure white can cause problems is partly technical and partly procedural. A pure white background can make the photo appear manipulated or digitally altered, which raises flags in the review process. It can also reduce contrast around light-coloured hair or fair skin tones, making the edges of the face and head harder to distinguish cleanly.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A light grey wall (or even a slightly off-white cream painted wall) is ideal. If you are taking the photo at home, stand in front of a plain light-coloured wall with even lighting and no shadows falling on the background. Avoid coloured walls, patterned wallpaper, curtains, or anything that could appear in the frame behind you.
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Acceptable:</strong> plain light grey, plain cream, plain off-white with a slight warm tone.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Not acceptable:</strong> pure white (#FFFFFF or very close to it), any colour other than neutral, patterns, visible shadows, gradients, or textures.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Edge case:</strong> some photo booths and chemist services use a white background and the photo is accepted, because the reviewing system considers the overall quality. However, preparing with a grey or cream background is always safer.</span>
          </li>
        </ul>

        {/* Section: Face rules */}
        <h2 id="face-rules" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Face rules: expression, position, and glasses
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Face height: 29 to 34mm</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          On a printed 45x35mm photo, the measurement from the crown of the head (the top of the skull, not the top of the hair) to the bottom of the chin must fall between <strong>29mm and 34mm</strong>. This ensures the face takes up a defined proportion of the photo, typically around 70 to 80 percent of the total height.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In digital terms at 600x750px, this translates to the face occupying roughly 387 to 453 pixels of the 750-pixel height. If you prepare your photo using a passport photo tool with the UK preset, this proportion is handled for you automatically.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Expression and posture</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The expression must be neutral and natural, with the mouth closed. Eyes must be open and looking directly at the camera. The head must be straight, not tilted or turned to either side. Hair should not cover the face or eyes.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Do not smile broadly or frown. A relaxed, neutral expression with no visible tension in the face is what HMPO wants. Think of the expression as &quot;calm and alert&quot; rather than either happy or serious.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Glasses: not allowed since 2018</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Since 2018, <strong>no glasses are allowed in UK passport photos</strong>. This applies to prescription glasses, reading glasses, sunglasses, and any other type of eyewear. The only exception is tinted lenses worn for a specific medical condition, and even then prior approval from HMPO is required.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This rule was introduced to improve the accuracy of automated facial recognition at border control. If you normally wear glasses, remove them before taking your passport photo. Contact lenses are fine as long as they do not alter the natural colour of your eyes.
        </p>

        {/* Inline CTA */}
        <Link
          href="/tools/passport-photo"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Crop your photo to the UK 45x35mm spec now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Prepare free */}
        <h2 id="prepare-free" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to prepare your photo free in your browser
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You do not need to visit a photo booth or pay for an app to get a compliant UK passport photo. SammaPix tools handle every step free, with no account required and no file upload. Your photo stays on your device throughout the entire process.
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              step: "1",
              title: "Take the source photo",
              body: "Use a smartphone or camera. Stand in front of a plain light grey or cream wall in even natural light. Remove glasses. Face the camera directly with a neutral expression. Make sure the background fills the entire frame behind you.",
            },
            {
              step: "2",
              title: "Open the SammaPix Passport Photo tool",
              body: "Go to sammapix.com/tools/passport-photo and select the UK preset. The tool automatically applies the correct 45x35mm (4:5) ratio and provides guides for positioning the face correctly.",
              link: { href: "/tools/passport-photo", label: "Open Passport Photo Tool" },
            },
            {
              step: "3",
              title: "Crop and position the face",
              body: "Adjust the crop frame so the face (from crown to chin) occupies between 29mm and 34mm of the 45mm height. The on-screen guide shows you the target zone. Once the positioning looks correct, apply the crop.",
            },
            {
              step: "4",
              title: "Resize to exact pixels (if required)",
              body: "For digital submission, use the Resizepack tool to set the output to exactly 600x750px or another compliant dimension. For printing, the crop is already at the correct ratio.",
              link: { href: "/tools/resizepack", label: "Open Resizepack" },
            },
            {
              step: "5",
              title: "Compress if the file is too large",
              body: "If the HMPO upload rejects your file for being too large, use SammaPix Compress to reduce the file size without visible quality loss. Set a target size that falls within the HMPO limit.",
              link: { href: "/tools/compress", label: "Open Compress" },
            },
            {
              step: "6",
              title: "Download and submit",
              body: "Download the finished photo. For online applications, upload it to the HMPO digital service. For a printed photo, send the file to a photo lab and specify the 45x35mm passport photo size.",
            },
          ].map(({ step, title, body, link }) => (
            <div key={step} className="flex gap-4 p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#6366F1] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{title}</p>
                <p className="text-sm text-[#737373] leading-relaxed">{body}</p>
                {link && (
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#6366F1] font-medium hover:underline"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The entire process takes around five minutes. Because everything runs in your browser using client-side code, none of your images are sent to any server. This is different from many online passport photo services that upload your photo to their cloud and store it.
        </p>

        {/* Section: Rejection reasons */}
        <h2 id="common-rejection-reasons" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Most common reasons passport photos get rejected
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          HMPO rejection reasons are rarely surprising in hindsight. The same issues appear again and again. Knowing them in advance lets you avoid every one of them before you submit.
        </p>

        <div className="space-y-3 mb-6">
          {[
            {
              label: "Pure white background",
              detail: "The most frequent reason for rejection for home-taken photos. A plain light grey or cream wall solves this immediately.",
            },
            {
              label: "Photo too old",
              detail: "HMPO expects a recent photo that is a true likeness of you today. Using a photo taken years ago (even if the spec was met at the time) will likely be flagged.",
            },
            {
              label: "Face not centred or tilted",
              detail: "The face must be centred in the frame and looking straight at the camera with no tilt. Even a slight rotation is grounds for rejection.",
            },
            {
              label: "Glasses in the photo",
              detail: "Any eyewear at all causes rejection since 2018. This is a zero-tolerance rule.",
            },
            {
              label: "Shadow on the face or background",
              detail: "Shadows caused by a single strong light source, a hat, or standing too close to a wall are all rejection triggers.",
            },
            {
              label: "Expression with open mouth or visible teeth",
              detail: "The mouth must be closed. A broad smile or any expression that parts the lips will be rejected.",
            },
            {
              label: "Hair covering the eyes or face",
              detail: "The full face must be visible. Fringes covering the eyes or hair obscuring part of the face are not allowed.",
            },
            {
              label: "Red-eye effect",
              detail: "Red-eye from flash must not be present. Shoot in good natural light or use red-eye reduction on your camera to avoid this.",
            },
          ].map(({ label, detail }) => (
            <div key={label} className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
              <span>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">{label}:</strong>{" "}
                {detail}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If your application is rejected because of the photo, you will normally be asked to resubmit a new one. For online applications this is straightforward. For postal applications it adds weeks to the processing time.
        </p>

        {/* Internal links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related tools &amp; guides</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/passport-photo" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Passport Photo Tool (UK preset)
            </Link>
            <Link href="/tools/croproatio" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Crop to Ratio
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize to Exact Pixels
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress Photo
            </Link>
            <Link href="/compress-to/2mb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 2MB
            </Link>
          </div>
        </div>

        {/* Disclaimer box */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
          <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1.5 uppercase tracking-wide">
            Official source
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            All requirements described in this article are based on official HMPO guidance. Requirements can change. Always verify against the current specification at{" "}
            <a
              href="https://www.gov.uk/photos-for-passports"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              gov.uk/photos-for-passports
            </a>{" "}
            before submitting your application.
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
                q: "What size does a UK passport photo need to be?",
                a: "A printed UK passport photo must be exactly 45mm tall by 35mm wide. For a digital photo submitted through the HMPO online service, the image must be at least 600 pixels wide by 750 pixels tall.",
              },
              {
                q: "What colour background is required for a UK passport photo?",
                a: "The background must be plain light grey or cream. Pure white is not within specification and can lead to rejection because it may make the photo appear digitally altered. A pale, neutral grey or slightly warm off-white cream is the safest choice.",
              },
              {
                q: "What is the face height requirement for a UK passport photo?",
                a: "The face measured from the crown of the head (not the top of the hair) to the chin must be between 29mm and 34mm on a printed 45x35mm photo. The face must be centred in the frame and looking straight at the camera.",
              },
              {
                q: "Can you wear glasses in a UK passport photo?",
                a: "No. Glasses have been banned in UK passport photos since 2018. This applies to prescription glasses, reading glasses, and all other eyewear. Contact lenses are allowed as long as they do not change the natural colour of your eyes.",
              },
              {
                q: "Can I use a free online tool to prepare my UK passport photo?",
                a: "Yes. The SammaPix Passport Photo tool at sammapix.com/tools/passport-photo lets you crop any photo to the exact UK 45x35mm specification using the UK preset. It runs entirely in your browser and your photo is never uploaded to any server.",
              },
              {
                q: "Does my photo get uploaded when I use SammaPix?",
                a: "No. All SammaPix tools process images locally in your browser using client-side code. Your photo never leaves your device. This is different from many online services that send your image to a remote server.",
              },
              {
                q: "What resolution should a digital UK passport photo be?",
                a: "HMPO requires a minimum of 600 pixels wide by 750 pixels tall for digital submissions. Higher resolution is accepted. The aspect ratio must be 4:5 (width to height). You can use the SammaPix Resizepack tool to set exact pixel dimensions.",
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
