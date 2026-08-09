import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

const SLUG = "canada-passport-photo-requirements-2026";
const POST_TITLE = "Canada Passport Photo Requirements 2026 (50x70mm)";
const POST_DESCRIPTION =
  "Official IRCC specs for Canadian passport photos: exactly 50x70mm, white background, face 31 to 36mm chin to crown, neutral expression, no glasses. Free browser tool to crop and resize correctly, no upload.";
const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  keywords: [
    "canada passport photo size",
    "50x70mm passport photo",
    "canadian passport photo requirements",
    "ircc photo specs",
    "canada passport photo online",
    "passport photo canada rules",
    "canadian passport photo dimensions",
    "canada passport photo background",
    "canada passport photo free",
  ],
  openGraph: {
    title: POST_TITLE,
    description:
      "Exact IRCC specs for Canadian passport photos: 50x70mm, white background, face 31 to 36mm, neutral expression, no glasses. Free browser tool, no upload.",
    url: POST_URL,
    type: "article",
    publishedTime: POST_DATE,
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: POST_TITLE,
    description:
      "Canada passport photo: 50x70mm (larger than US and UK), white background, face 31 to 36mm chin to crown, no glasses. Free crop and resize tool, no upload.",
    creator: "@lucasammarco",
  },
};

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_DESCRIPTION,
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
    "canada passport photo size",
    "50x70mm passport photo",
    "canadian passport photo requirements",
    "ircc photo specs",
    "canada passport photo online",
    "passport photo canada rules",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make a Canada Passport Photo That Meets IRCC Requirements",
  description:
    "Produce a compliant Canadian passport photo (50x70mm, white background, face 31 to 36mm chin to crown) entirely in your browser using SammaPix. No upload, no signup, no software to install.",
  totalTime: "PT3M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Passport Photo tool (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Take the photo under correct conditions",
      text: "Use a plain white or off-white background. Stand or sit facing the camera directly. Keep a neutral expression with your mouth closed. Remove glasses. Ensure even, shadow-free lighting on your face. Have someone photograph you within the last 6 months.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the SammaPix Passport Photo tool",
      text: "Go to sammapix.com/tools/passport-photo in any modern browser. Select Canada from the country preset list, which sets the canvas to the required 50x70mm dimensions. No account or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Upload your photo and position the crop",
      text: "Drop your photo onto the tool. Drag the crop handles so that your chin to crown distance sits between 31mm and 36mm within the 70mm tall frame. The tool shows a real-time preview of the final crop.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download and verify",
      text: "Download the cropped photo. Measure the face height on screen or open in any image editor to confirm the crop is correct. If the digital version needs to meet a file size limit (for example under 4MB for most online IRCC applications), use SammaPix Compress to reduce the file size without visible quality loss.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Print two identical copies at the correct physical size",
      text: "Print two copies at 50x70mm on matte or semi-matte photo paper. Write your name and date of birth on the back of one photo. Your guarantor signs the back of that same photo and writes their declaration and contact information.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size is a Canadian passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Canadian passport photo must be exactly 50mm wide by 70mm tall (50x70mm). This is a rectangular portrait format, notably different from the square US passport photo (51x51mm) and the smaller UK format (45x35mm). The 50x70mm size is specified by IRCC (Immigration, Refugees and Citizenship Canada) and applies to adult and child passport applications.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the Canadian passport photo 50x70mm instead of the US square format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canada and the United States have independently set their own government document photo standards. The US chose a square 2x2 inch (51x51mm) format for its passport and visa photos. Canada chose a portrait-oriented 50x70mm rectangle that allows more vertical space for the face, which aligns with ICAO (International Civil Aviation Organization) biometric photo guidelines that recommend a portrait aspect ratio for facial recognition matching. The difference is purely a national standard choice, not a technical requirement of the passport booklet itself.",
      },
    },
    {
      "@type": "Question",
      name: "What is the required face size in a Canadian passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your face, measured from the chin to the crown of the head (top of the skull, not the hairline), must be between 31mm and 36mm tall within the 70mm photo height. This means the face occupies roughly 44 to 51 percent of the total photo height. The face must be centred horizontally and positioned so there is roughly equal space above the crown and below the chin.",
      },
    },
    {
      "@type": "Question",
      name: "What background color is required for Canadian passport photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The background must be plain white or off-white with no patterns, textures, shadows, or other people visible. The background must be evenly lit with no gradients. A light gray background is not acceptable. IRCC specifically requires white or off-white. Any shadows on the background from poor lighting will cause a photo to be rejected.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a guarantor to sign my Canadian passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for most adult passport applications. You submit two identical printed photos. On the back of one photo, the guarantor writes: the applicant's full name, date of birth, the guarantor's name, signature, telephone number, and the statement 'I certify that this is a true likeness of (name)'. The guarantor must be a Canadian citizen or permanent resident who has known you for at least two years and holds one of the accepted professional or occupational categories listed by IRCC.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make a Canadian passport photo for free online without uploading my photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Passport Photo at sammapix.com/tools/passport-photo runs entirely in your browser. Select the Canada preset (50x70mm), drop your photo in, position the crop so the face height is between 31mm and 36mm, and download the result. The image is never uploaded to any server. Everything runs client-side using the HTML5 Canvas API. The download is ready to print at the correct 50x70mm physical size.",
      },
    },
    {
      "@type": "Question",
      name: "Can I wear glasses in a Canadian passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. As of February 2022, IRCC no longer accepts passport photos where the applicant is wearing glasses, even prescription glasses. This change aligns Canada with ICAO biometric standards and with similar rules that the US, UK, and EU already had in place. The only exception is medically required eye coverings, which require a signed physician's note included with the application.",
      },
    },
    {
      "@type": "Question",
      name: "How recent does a Canadian passport photo need to be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The photo must have been taken within the last 6 months and must accurately reflect your current appearance. If your appearance has changed significantly since the photo was taken (new hair, weight change, facial hair, scars, or other distinguishing features), you should take a new photo even if the existing one is less than 6 months old. IRCC may reject a photo if the officer determines it does not match the applicant's current appearance.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CanadaPassportPhotoRequirements2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={SLUG}
        description="Canadian passport photos have their own exact size standard: 50mm wide by 70mm tall, a portrait rectangle that differs from the square US format and the smaller UK format. Get the dimensions wrong and IRCC rejects the application. This guide covers every official requirement from IRCC, explains why the 50x70mm format works the way it does, and walks through how to get a compliant photo for free in your browser without uploading anything."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "quick-specs", title: "Canadian passport photo specs at a glance" },
          { id: "why-50x70mm", title: "Why is the Canadian passport photo 50x70mm?" },
          { id: "face-size", title: "Face size and positioning requirements" },
          { id: "background-lighting", title: "Background, lighting, and clothing rules" },
          { id: "no-glasses-rule", title: "The no-glasses rule (since 2022)" },
          { id: "guarantor-explained", title: "The guarantor requirement explained" },
          { id: "how-to-make-free", title: "How to make a compliant photo free with SammaPix" },
          { id: "digital-upload", title: "Digital upload requirements for online IRCC applications" },
          { id: "country-comparison", title: "Canada vs US vs UK passport photo sizes" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Canadian passport photos must be exactly 50mm wide by 70mm tall, a portrait rectangle not shared by the US (51x51mm square) or UK (45x35mm).",
          "Face height measured chin to crown must fall between 31mm and 36mm within the photo.",
          "The background must be plain white or off-white with no shadows, gradients, or patterns.",
          "Glasses are not permitted in Canadian passport photos since February 2022.",
          "Two identical prints are required for most applications. One must be signed on the back by a qualified guarantor.",
          "The photo must have been taken within the last 6 months and must reflect your current appearance.",
          "SammaPix Passport Photo at sammapix.com/tools/passport-photo lets you crop and resize to the correct 50x70mm Canadian format free, with no upload required.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1621768216002-5ac171661d8c?w=800&q=80"
              alt="Canadian passport and travel documents representing IRCC passport photo requirements 2026"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting the Canadian passport photo size right the first time saves you from IRCC rejection and a repeat appointment
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Make a compliant 50x70mm Canadian passport photo free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix Passport Photo to crop your photo to the exact 50x70mm Canadian format with the correct face position. No upload, no account, everything runs in your browser.
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
                Compress for Upload
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
            A Canadian passport photo must be <strong>50mm wide by 70mm tall</strong>, printed on a plain white background with your face measuring 31 to 36mm from chin to crown. No glasses permitted. Photo must be taken within the last 6 months. Two identical prints are required for most applications, with one signed on the back by a guarantor. You can make a compliant photo free at{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/passport-photo
            </Link>{" "}
            with no upload required. Always confirm at canada.ca/passport or the official IRCC website before submitting your application.
          </p>
        </div>

        {/* Section: Quick specs */}
        <h2 id="quick-specs" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Canadian passport photo specs at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Before going into detail on each requirement, here is the complete specification table. Every field is drawn from the official IRCC passport photo requirements as published on canada.ca. Verify these at the source before submitting your application, as IRCC updates its requirements periodically.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Requirement</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Official IRCC Specification</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo dimensions</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">50mm wide x 70mm tall (50x70mm)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Face height (chin to crown)</td>
                <td className="px-4 py-2.5 text-xs">31mm to 36mm</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Background</td>
                <td className="px-4 py-2.5 text-xs">Plain white or off-white, no patterns or shadows</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Expression</td>
                <td className="px-4 py-2.5 text-xs">Neutral expression, mouth closed</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Glasses</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">Not permitted (since February 2022)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Head coverings</td>
                <td className="px-4 py-2.5 text-xs">Not permitted unless worn daily for religious reasons</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo age</td>
                <td className="px-4 py-2.5 text-xs">Taken within the last 6 months</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Number of prints</td>
                <td className="px-4 py-2.5 text-xs">Two identical photos required (paper applications)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Guarantor signature</td>
                <td className="px-4 py-2.5 text-xs">Required on the back of one photo</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Print quality</td>
                <td className="px-4 py-2.5 text-xs">Clear, sharp focus, matte or semi-matte photo paper</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Digital file size (online)</td>
                <td className="px-4 py-2.5 text-xs">Under 4MB, JPEG format</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section: Why 50x70mm */}
        <h2 id="why-50x70mm" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why is the Canadian passport photo 50x70mm?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The 50x70mm format is one of the less-discussed details of Canadian travel documents, but it catches applicants off-guard because it does not match either of the two formats most people have encountered: the American square or the smaller European rectangle.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Canada selected its format to align with ICAO (International Civil Aviation Organization) Document 9303, which governs machine-readable travel documents used globally. ICAO recommends a portrait aspect ratio for the photo zone, which gives more vertical space to the face for automated biometric facial recognition matching. The portrait rectangle captures more information about the vertical structure of the face than a square does at equivalent total area.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The United States has historically used a square format partly because its specification predates modern biometric scanning standards and partly because the 2x2 inch (approximately 51x51mm) size was already deeply embedded in institutional workflows including photomat machines and government form printers. Canada modernized its standard independently.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical consequence for applicants is straightforward: if you have a US-format square photo or a UK photo cut to 45x35mm, you cannot simply submit it for a Canadian passport. The dimensions are wrong and the photo will be rejected. You need a photo sized to exactly 50mm wide by 70mm tall.
        </p>

        {/* Section: Face size and positioning */}
        <h2 id="face-size" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Face size and positioning requirements
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Getting the photo dimensions correct is necessary but not sufficient. IRCC also has strict rules about how large the face appears within the photo. A 50x70mm photo with a tiny head or a face that fills the entire frame will be rejected just as surely as one with the wrong dimensions.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The face height, measured from the chin to the crown of the head (the highest point of the skull, not the top of the hair), must be between <strong>31mm and 36mm</strong>. Within a 70mm tall photo, this means the face should occupy roughly 44 to 51 percent of the total height. This leaves room for space below the chin and above the crown.
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Chin to crown:</strong> 31mm to 36mm. This is the critical measurement. Under 31mm means the face is too small. Over 36mm means it is too close to the camera.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Horizontal centering:</strong> The face must be centred in the frame. An off-center face is grounds for rejection.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Camera angle:</strong> The photo must be taken straight on, facing the camera directly. No profile, three-quarter angle, or tilted head.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Eyes open:</strong> Both eyes must be fully open and clearly visible. Eyes partially closed from blinking are not acceptable.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The face size requirement is what trips up most DIY passport photos. People often get the background and dimensions correct but crop too loosely (face too small) or frame too tightly (face too large). The{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Passport Photo tool
          </Link>{" "}
          shows a guide overlay for the Canada preset so you can position the crop accurately before downloading.
        </p>

        {/* Section: Background, lighting, clothing */}
        <h2 id="background-lighting" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Background, lighting, and clothing rules
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The background requirement sounds simple: plain white or off-white. In practice this is one of the most common reasons for rejection in DIY passport photos, because most home environments do not provide a truly neutral white background with even, shadow-free lighting.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Background specifics</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The background must be a single solid color: white or very light off-white. No gray. No cream that reads as yellow in a photograph. No patterns, gradients, walls with texture, or windows. Shadows behind the head from standing too close to a wall are a common failure point. Stand at least 60cm away from the background and use front-facing light to eliminate shadow.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Lighting requirements</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The photo must have even, natural-looking light on the face with no harsh shadows on either side of the nose or under the chin. Avoid direct flash held close to the face, which creates bright spots on the forehead and cheeks. Window light from the front, or two light sources positioned at 45 degrees to either side of the face, produces the flattest and most acceptable result.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Clothing</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          IRCC does not specify required clothing beyond a general expectation that you are dressed normally. Uniforms worn for work are generally not acceptable (military, police, medical). Avoid wearing all-white clothing that blends into the background. Everyday clothing in any color other than white is fine.
        </p>

        {/* Section: No glasses rule */}
        <h2 id="no-glasses-rule" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The no-glasses rule (since 2022)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As of <strong>February 2022</strong>, IRCC no longer accepts passport photos where the applicant wears any type of glasses, including prescription eyeglasses, reading glasses, and transition lenses. This was a meaningful policy change from the previous rules, which allowed glasses if they met certain conditions (no tinted lenses, no reflections, eyes fully visible).
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The reason is biometric consistency. Automated facial recognition at border control and during document verification works more reliably when the eye region is unobstructed. Frames create occlusion around the eyes, reflections on lenses obscure the iris, and different lens types affect how the eye region is captured. Removing glasses eliminates an entire category of photo variability for the biometric matching system.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Canada is not alone in this requirement. The US Passport Agency, the UK Identity and Passport Service, and the European Union all prohibit glasses in passport photos. Canada simply updated its rules to match the international standard.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The only exception IRCC permits is medically necessary eye covering, such as an eye patch. This exception requires a signed statement from a physician explaining the medical reason. Sunglasses are not accepted even under the medical exception.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/passport-photo" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Crop and resize your photo to 50x70mm Canadian passport format now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Guarantor */}
        <h2 id="guarantor-explained" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The guarantor requirement explained
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The guarantor requirement is one of the most distinctive aspects of the Canadian passport photo process compared to US and UK applications. Canada requires a guarantor to verify your identity and certify that the photo looks like you, which is a traditional alternative to in-person identity verification at a passport office.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">What goes on the back of the photo</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You submit two identical printed photos. On the back of one of the two photos, the guarantor must write, in ink that does not smear:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            'The statement: "I certify that this is a true likeness of [applicant\'s full name]"',
            "The applicant's full name",
            "The applicant's date of birth",
            "The guarantor's printed name",
            "The guarantor's signature",
            "The guarantor's telephone number",
            "The date the photo was signed",
            "The name of the photographer who took the photo and the date it was taken (written on the other photo, if required)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Who qualifies as a guarantor</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The guarantor must be a Canadian citizen or permanent resident who has known you personally for at least two years. IRCC also requires the guarantor to hold one of a list of recognized occupations: lawyers, notaries, physicians, nurses, dentists, pharmacists, teachers, engineers, veterinarians, police officers, firefighters, social workers, members of parliament, mayors, judges, and other regulated professionals.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Family members living in the same household generally cannot be guarantors. If you genuinely cannot find a qualifying guarantor (for example because you are applying from abroad), IRCC has an alternative statutory declaration process described on canada.ca/passport.
        </p>

        {/* Section: How to make a free photo */}
        <h2 id="how-to-make-free" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to make a compliant photo free with SammaPix
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Professional passport photo services at pharmacies and camera shops charge between $15 and $25 CAD for two prints. You can produce a technically identical result at home for the cost of a photo print if you crop the image correctly. Here is the step-by-step process using{" "}
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Passport Photo
          </Link>.
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              step: "1",
              title: "Photograph yourself against a white background",
              body: "Use a plain white wall, a white sheet, or a white foam board. Stand at least 60cm from it to prevent shadows. Use front-facing natural light from a window or two lamps placed to either side. Remove glasses. Use a neutral expression. Have someone else take the photo at eye level.",
            },
            {
              step: "2",
              title: "Open SammaPix Passport Photo and select the Canada preset",
              body: "Go to sammapix.com/tools/passport-photo. From the country selector, choose Canada. The tool will set the canvas to 50mm x 70mm and display the face height guide (31mm to 36mm) as an overlay on the crop area.",
            },
            {
              step: "3",
              title: "Upload your photo and position the crop",
              body: "Drop your photo onto the tool. Your photo is loaded into your browser memory only, never transmitted to any server. Drag and resize the crop so your chin aligns with the bottom guide mark and your crown aligns with the upper guide mark. The face should fill the guide zone.",
            },
            {
              step: "4",
              title: "Download the cropped photo",
              body: "Click Download. You will receive a JPEG file cropped to the correct 50x70mm dimensions at print-ready resolution. You can open it in any photo editing app to verify the dimensions if needed.",
            },
            {
              step: "5",
              title: "Print two copies at the correct physical size",
              body: "Take the file to a pharmacy photo kiosk or home printer set to print at 50mm x 70mm. Print on matte or semi-matte photo paper. Cut to size if the printer does not do it automatically. Many pharmacies (Shoppers Drug Mart, London Drugs) can print from a USB drive or phone at this size.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex gap-4 p-4 bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#6366F1] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {step}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{title}</p>
                <p className="text-sm text-[#737373] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Digital upload */}
        <h2 id="digital-upload" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Digital upload requirements for online IRCC applications
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you are applying for a Canadian passport through an online IRCC portal rather than a paper application, you will upload a digital photo file rather than mailing prints. The digital requirements are:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "File format: JPEG only",
            "File size: under 4MB",
            "Minimum resolution: 420 x 540 pixels (which corresponds to 50x70mm at 216ppi)",
            "The same background, face size, expression, and glasses rules apply to digital photos as to printed ones",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Modern smartphone photos are typically 3 to 10MB as JPEG files. If your cropped photo is over 4MB, use{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>{" "}
          to bring it under the limit. The tool runs in your browser, reduces file size without noticeable quality loss at typical passport photo dimensions, and does not upload your photo to any server.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For online applications, the guarantor signature requirement is different. IRCC may still require guarantor information to be entered in the online form (name, contact details, occupation) but does not always require a physical signature on the digital photo itself. Check the specific instructions on your IRCC application form, as the process varies by application type and year.
        </p>

        {/* Section: Country comparison */}
        <h2 id="country-comparison" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Canada vs US vs UK passport photo sizes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Canada, the United States, and the United Kingdom are the three countries whose passport photo requirements applicants most often confuse with each other, partly because of common cultural ties and partly because many applicants hold multiple passports. The formats are meaningfully different.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Country</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Photo size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Aspect ratio</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Face height</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Glasses permitted?</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-indigo-50 dark:bg-indigo-950/10">
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Canada</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">50 x 70mm</td>
                <td className="px-4 py-2.5 text-xs">Portrait (5:7)</td>
                <td className="px-4 py-2.5 text-xs">31 to 36mm</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">United States</td>
                <td className="px-4 py-2.5 text-xs">51 x 51mm (2 x 2 in)</td>
                <td className="px-4 py-2.5 text-xs">Square (1:1)</td>
                <td className="px-4 py-2.5 text-xs">25 to 35mm</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">United Kingdom</td>
                <td className="px-4 py-2.5 text-xs">35 x 45mm</td>
                <td className="px-4 py-2.5 text-xs">Portrait (7:9)</td>
                <td className="px-4 py-2.5 text-xs">29 to 34mm</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">European Union (Schengen)</td>
                <td className="px-4 py-2.5 text-xs">35 x 45mm</td>
                <td className="px-4 py-2.5 text-xs">Portrait (7:9)</td>
                <td className="px-4 py-2.5 text-xs">32 to 36mm</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr className="last:border-b-0 bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Australia</td>
                <td className="px-4 py-2.5 text-xs">35 x 45mm</td>
                <td className="px-4 py-2.5 text-xs">Portrait (7:9)</td>
                <td className="px-4 py-2.5 text-xs">32 to 36mm</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The Canadian format is the largest of the five common formats by total area (50 x 70 = 3500 sq mm), larger than the US square (51 x 51 = 2601 sq mm) and significantly larger than the UK and EU standard (35 x 45 = 1575 sq mm). If you hold a Canadian and a British passport and need to renew both, you need two different photo crops from the same session. The Canadian photo cannot be used for the British application or vice versa.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Passport Photo
          </Link>{" "}
          includes presets for multiple countries. You can produce both a 50x70mm Canadian crop and a 35x45mm UK crop from the same source photo in a single session, downloading each at the correct dimensions for each application.
        </p>

        {/* Related links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides and tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/blog/passport-photo-requirements-2026" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Passport Photo Requirements by Country
            </Link>
            <Link href="/tools/passport-photo" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Passport Photo Tool (Free)
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to Under 4MB
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/tools/resize" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize Image
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What size is a Canadian passport photo?",
                a: "A Canadian passport photo must be exactly 50mm wide by 70mm tall (50x70mm). This is a portrait rectangle, larger than the US passport photo (51x51mm square) and the UK format (35x45mm). The size is specified by IRCC and applies to both adult and child passport applications.",
              },
              {
                q: "Why is the Canadian passport photo 50x70mm instead of the US square format?",
                a: "Canada and the United States set their photo standards independently. Canada's 50x70mm portrait rectangle aligns with ICAO (International Civil Aviation Organization) biometric photo recommendations, which favor a portrait aspect ratio for improved facial recognition matching. The US retained its traditional 2x2 inch (51x51mm) square format, which predates modern biometric standards.",
              },
              {
                q: "What background color is required for Canadian passport photos?",
                a: "The background must be plain white or off-white with no patterns, gradients, textures, or shadows. Gray or cream that appears colored in the photo is not acceptable. Ensure even, shadow-free lighting by standing at least 60cm from the background and using front-facing light sources.",
              },
              {
                q: "Do I need a guarantor to sign my Canadian passport photo?",
                a: "Yes, for most adult paper passport applications. You submit two identical printed photos. On the back of one, the guarantor writes the applicant's name and date of birth, the statement 'I certify this is a true likeness of [name]', plus the guarantor's own name, signature, telephone number, and the date. The guarantor must be a Canadian citizen or permanent resident who has known you for at least two years and holds a recognized professional occupation.",
              },
              {
                q: "Can I make a Canadian passport photo free online without uploading my photo?",
                a: "Yes. SammaPix Passport Photo at sammapix.com/tools/passport-photo runs entirely in your browser. Select Canada to set the 50x70mm canvas, drop in your photo, position the face within the guide overlay, and download the result. Nothing is uploaded to any server. The downloaded file is ready to print at the correct physical size.",
              },
              {
                q: "Can I wear glasses in a Canadian passport photo?",
                a: "No. Since February 2022, IRCC does not accept passport photos where the applicant wears any glasses, including prescription lenses. The only exception is medically necessary eye coverings, which require a signed physician statement. This aligns Canada with ICAO standards and the rules already in place in the US, UK, and EU.",
              },
              {
                q: "How recent does a Canadian passport photo need to be?",
                a: "The photo must have been taken within the last 6 months and must accurately reflect your current appearance. If your appearance has changed significantly since the photo was taken (such as a major change in facial hair, weight, or visible features), take a new photo even if the existing one is less than 6 months old.",
              },
              {
                q: "What is the face size requirement in a Canadian passport photo?",
                a: "Your face measured from the chin to the crown of the head must be between 31mm and 36mm tall within the 70mm photo height. This means the face should occupy approximately 44 to 51 percent of the total photo height. The face must be horizontally centred in the frame.",
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
