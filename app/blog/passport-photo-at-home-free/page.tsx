import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "How to Create a Passport Photo at Home for Free (140+ Countries)",
  description:
    "Step-by-step guide to taking a compliant passport photo at home with your phone. Free tool for 140+ countries — US, UK, India, EU, Canada, and more.",
  alternates: {
    canonical: `${APP_URL}/blog/passport-photo-at-home-free`,
  },
  keywords: [
    "passport photo at home free",
    "diy passport photo",
    "free passport photo maker",
    "passport photo online",
    "take passport photo with phone",
    "passport photo requirements",
  ],
  openGraph: {
    title: "How to Create a Passport Photo at Home for Free (140+ Countries)",
    description:
      "Step-by-step guide to taking a compliant passport photo at home with your phone. Free tool for 140+ countries.",
    url: `${APP_URL}/blog/passport-photo-at-home-free`,
    type: "article",
    publishedTime: "2026-04-07",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a Passport Photo at Home for Free (140+ Countries)",
    description:
      "Take a compliant passport photo at home with your phone. Free tool, 140+ countries, AI background removal.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-07";
const POST_DATE_FORMATTED = "April 7, 2026";
const POST_URL = `${APP_URL}/blog/passport-photo-at-home-free`;
const POST_TITLE = "How to Create a Passport Photo at Home for Free (140+ Countries)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Step-by-step guide to taking a compliant passport photo at home with your phone. Free tool for 140+ countries — US, UK, India, EU, Canada, and more.",
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
    "passport photo at home free",
    "diy passport photo",
    "free passport photo maker",
    "passport photo online",
    "take passport photo with phone",
    "passport photo requirements",
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
      name: "Can I take a passport photo with my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any modern smartphone camera is sufficient. The key is lighting, background, and correct dimensions. SammaPix handles the cropping, background removal, and compliance automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a passport photo cost at a studio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically $10-15 in the US, \u20ac10-15 in Europe, \u20b9100-200 in India. SammaPix does it for free, directly in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does SammaPix work for Indian passport photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix supports Indian passport (35\u00d745mm), Indian e-Visa (2\u00d72\"), and exam forms (JEE, NEET, UPSC) with exact KB compression.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a white background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most countries require white or light grey. SammaPix's AI automatically removes your background and replaces it with pure white, so any background works when you take the photo.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the same photo for passport and visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Different countries have different size requirements. SammaPix has presets for 140+ countries and visa types, so you can generate the correct format for each.",
      },
    },
  ],
};

export default function PassportPhotoAtHomeFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="passport-photo-at-home-free"
        description="Getting a passport photo shouldn&apos;t cost &euro;15 at a photo studio. You have a phone with a better camera than what studios used 10 years ago. Here&apos;s how to take a compliant passport photo at home in under 5 minutes &mdash; for free, for any country."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={8}
        headings={[
          { id: "what-you-need", title: "What you need (spoiler: just your phone)" },
          { id: "step-1-take-the-photo", title: "Step 1 \u2014 Take the photo right" },
          { id: "step-2-make-it-compliant", title: "Step 2 \u2014 Use SammaPix to make it compliant" },
          { id: "country-requirements", title: "Country-specific requirements (the confusing part)" },
          { id: "common-mistakes", title: "Common mistakes that get your photo rejected" },
          { id: "compress-for-upload", title: "How to compress for upload requirements" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Any modern smartphone camera is good enough for a passport photo \u2014 the key is lighting, angle, and correct dimensions.",
          "SammaPix\u2019s Passport Photo tool handles background removal, cropping, and compliance for 140+ countries automatically.",
          "Different countries have wildly different size requirements \u2014 US uses 2\u00d72\", UK uses 35\u00d745mm, India uses 35\u00d745mm (not 2\u00d72\" for domestic passport).",
          "Common rejection reasons include shadows, wrong background color, glasses, and head size outside the 70-80% range.",
          "India, JEE, NEET, and UPSC forms require specific file sizes (10-200KB) \u2014 use SammaPix compress-to for exact KB control.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80"
              alt="Passport and travel documents on a map representing DIY passport photo creation at home"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              You don&apos;t need a photo studio for a compliant passport photo &mdash; just your phone and the right tool - Photo by Dariusz Sankowski on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create your passport photo now &mdash; free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Select your country, upload a photo, AI removes the background. Download a compliant passport photo in seconds. 140+ countries supported.
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
                href="/passport-photo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                All 140+ countries
              </Link>
            </div>
          </div>
        }
      >
        {/* Section: What you need */}
        <h2 id="what-you-need" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What you need (spoiler: just your phone)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You do not need a professional camera, a photo studio, or special lighting equipment. Here is everything you need to create a passport photo that passes government requirements:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            { label: "Phone with camera", detail: "any modern smartphone works \u2014 even a 3-year-old budget phone has enough resolution" },
            { label: "White wall or plain background", detail: "a plain door or bedsheet works too" },
            { label: "Natural light", detail: "stand near a window, avoid direct sunlight" },
            { label: "A friend to take the photo", detail: "or use a timer and prop your phone at eye level" },
            { label: "SammaPix Passport Photo tool", detail: "free, browser-based, handles cropping and background removal" },
          ].map(({ label, detail }) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              <span><strong className="text-[#171717] dark:text-[#E5E5E5]">{label}</strong> \u2014 {detail}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That is it. No tripod, no ring light, no Photoshop. The whole process takes under 5 minutes.
        </p>

        {/* Section: Step 1 */}
        <h2 id="step-1-take-the-photo" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step 1 &mdash; Take the photo right
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The photo itself is the most important part. Get this right and everything else is automatic. Here are the rules that apply to virtually every country:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            "Stand 1\u20132 meters from a white or light-colored wall",
            "Face the camera straight on \u2014 no tilting your head",
            "Neutral expression, mouth closed",
            "Both ears visible \u2014 no hair covering them",
            "No glasses (most countries now require this \u2014 the US has required it since 2016)",
            "No shadows on your face or the background",
            "Phone at eye level, not from above or below",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Tip:</strong> turn portrait mode OFF. Portrait mode creates depth blur (bokeh) which can cause rejection. Passport photos need flat, even lighting across your face and the background.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you are using a timer, prop the phone on a shelf or stack of books at eye level. The camera should be roughly 1.5 meters away. Take several shots so you can pick the best one.
        </p>

        {/* Section: Step 2 */}
        <h2 id="step-2-make-it-compliant" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step 2 &mdash; Use SammaPix to make it compliant
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Once you have a good photo, the rest is handled automatically. Here is the process:
        </p>
        <ol className="space-y-3 mb-6 pl-4 list-decimal list-inside">
          <li className="text-sm text-[#737373] leading-relaxed">
            Go to{" "}
            <Link href="/tools/passport-photo" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
              sammapix.com/tools/passport-photo
            </Link>
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            Select your country from the dropdown (140+ countries available)
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            Upload your photo
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            The AI removes the background automatically and replaces it with pure white
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            The tool crops to the exact dimensions required by your country
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            Download the compliant photo &mdash; done
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          No account needed. No watermark. The tool runs in your browser, so your photo never gets stored on any server.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/passport-photo" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool - no signup required</p>
            <p className="text-sm font-semibold text-white leading-snug">Create your passport photo now &mdash; 140+ countries supported</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Country-specific requirements */}
        <h2 id="country-requirements" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Country-specific requirements (the confusing part)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every country has its own passport photo specifications. This is where most people get confused &mdash; and where most rejections happen. Here are the requirements for the most common countries:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Country</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Dimensions (px)</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Background</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">File size</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  <Link href="/passport-photo/us" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">US</Link>
                </td>
                <td className="px-4 py-2.5 text-xs">2&times;2&quot; (51&times;51mm)</td>
                <td className="px-4 py-2.5 text-xs">600&times;600</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  <Link href="/passport-photo/uk" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">UK</Link>
                </td>
                <td className="px-4 py-2.5 text-xs">35&times;45mm</td>
                <td className="px-4 py-2.5 text-xs">420&times;540</td>
                <td className="px-4 py-2.5 text-xs">Light grey or white</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  <Link href="/passport-photo/eu" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">EU / Schengen</Link>
                </td>
                <td className="px-4 py-2.5 text-xs">35&times;45mm</td>
                <td className="px-4 py-2.5 text-xs">413&times;531</td>
                <td className="px-4 py-2.5 text-xs">White / light</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  <Link href="/passport-photo/india" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">India</Link>
                </td>
                <td className="px-4 py-2.5 text-xs">35&times;45mm</td>
                <td className="px-4 py-2.5 text-xs">413&times;531</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">10&ndash;200KB</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Canada</td>
                <td className="px-4 py-2.5 text-xs">50&times;70mm</td>
                <td className="px-4 py-2.5 text-xs">591&times;827</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Australia</td>
                <td className="px-4 py-2.5 text-xs">35&times;45mm</td>
                <td className="px-4 py-2.5 text-xs">413&times;531</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Japan</td>
                <td className="px-4 py-2.5 text-xs">35&times;45mm</td>
                <td className="px-4 py-2.5 text-xs">413&times;531</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">China</td>
                <td className="px-4 py-2.5 text-xs">33&times;48mm</td>
                <td className="px-4 py-2.5 text-xs">390&times;567</td>
                <td className="px-4 py-2.5 text-xs">White</td>
                <td className="px-4 py-2.5 text-xs">&mdash;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Important note on India:</strong> the Indian domestic passport uses 35&times;45mm &mdash; not 2&times;2&quot;. The 2&times;2&quot; format is only for the Indian e-Visa application. Many guides online get this wrong. SammaPix has separate presets for both, so you always get the correct size.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix supports all of these countries and 130+ more. Select your country from the dropdown and the tool automatically applies the correct dimensions, background color, and file size requirements.
        </p>

        {/* Section: Common mistakes */}
        <h2 id="common-mistakes" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common mistakes that get your photo rejected
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Passport offices reject millions of photos every year. These are the most common reasons &mdash; and how to avoid each one:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Shadow on face or background</strong> &mdash; use natural light from a window, not overhead lighting. Stand far enough from the wall to avoid casting a shadow behind you.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Head too small or too large in frame</strong> &mdash; most countries require the head to be 70&ndash;80% of the photo height. SammaPix crops to this ratio automatically.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Wrong background color</strong> &mdash; some countries require pure white, others accept light grey. SammaPix&apos;s AI removes your background entirely and replaces it with the correct color.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Glasses visible</strong> &mdash; the US has required no glasses since 2016, and most countries have followed since 2020. Remove glasses before taking the photo, even if they are prescription.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Photo taken from above</strong> &mdash; holding the phone above your head changes facial proportions and makes your chin look smaller. Always shoot at eye level.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Too much compression</strong> &mdash; India requires 10&ndash;200KB for passport uploads. Over-compressing loses detail and can cause rejection. Use{" "}
              <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix compress-to</Link>
              {" "}for exact file size control.</span>
          </li>
        </ul>

        {/* Section: How to compress */}
        <h2 id="compress-for-upload" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to compress for upload requirements
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Some countries and exam forms require your passport photo to be within a specific file size range. This is especially common in India, where government portals and competitive exam applications have strict KB limits:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Indian passport online application: 10\u2013200KB",
            "JEE Main application: 10\u2013200KB",
            "NEET application: 10\u2013200KB",
            "UPSC application: 10\u2013200KB",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          After creating your passport photo with SammaPix, you can use the{" "}
          <Link href="/compress-to/100kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">compress to 100KB</Link>
          {" "}or{" "}
          <Link href="/compress-to/200kb" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">compress to 200KB</Link>
          {" "}tools to hit the exact target. The compression is smart &mdash; it reduces file size while preserving enough detail for the photo to remain compliant.
        </p>

        {/* Related guides & tools */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/passport-photo/us" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              US Passport Photo
            </Link>
            <Link href="/passport-photo/uk" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              UK Passport Photo
            </Link>
            <Link href="/passport-photo/india" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              India Passport Photo
            </Link>
            <Link href="/passport-photo/eu" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              EU Passport Photo
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/compress-to/100kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 100KB
            </Link>
            <Link href="/blog/check-remove-exif-data-photos" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              How to Check &amp; Remove EXIF Data
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
                q: "Can I take a passport photo with my phone?",
                a: "Yes. Any modern smartphone camera is sufficient. The key is lighting, background, and correct dimensions. SammaPix handles the cropping, background removal, and compliance automatically \u2014 you just need to take a well-lit, straight-on photo.",
              },
              {
                q: "How much does a passport photo cost at a studio?",
                a: "Typically $10\u201315 in the US, \u20ac10\u201315 in Europe, \u20b9100\u2013200 in India. SammaPix does it for free, directly in your browser. No signup, no watermark, no limit on how many photos you can create.",
              },
              {
                q: "Does SammaPix work for Indian passport photos?",
                a: "Yes. SammaPix supports Indian passport (35\u00d745mm), Indian e-Visa (2\u00d72\"), and exam forms (JEE, NEET, UPSC) with exact KB compression. The tool has separate presets for each \u2014 select the right one from the country dropdown.",
              },
              {
                q: "Do I need a white background?",
                a: "Most countries require white or light grey. You do not need to have a perfect white wall \u2014 SammaPix\u2019s AI automatically removes your background and replaces it with pure white, regardless of what was behind you.",
              },
              {
                q: "Can I use the same photo for passport and visa?",
                a: "Not always. Different countries have different size requirements. For example, a US passport photo is 2\u00d72\" while a UK passport photo is 35\u00d745mm. SammaPix has presets for 140+ countries and visa types, so you can generate the correct format for each from the same original photo.",
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
