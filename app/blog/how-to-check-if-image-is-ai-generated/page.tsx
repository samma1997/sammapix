import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Check if an Image Is AI-Generated (2026)",
  description:
    "A practical, layered guide: Content Credentials (C2PA), SynthID watermarks, EXIF metadata clues, and visual tells. Honest about what works and what does not.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-check-if-image-is-ai-generated`,
  },
  keywords: [
    "how to check if image is ai generated",
    "is this image ai",
    "detect ai image",
    "ai image checker",
    "check content credentials",
    "synthid detector",
    "c2pa verification",
    "ai generated photo detection",
  ],
  openGraph: {
    title: "How to Check if an Image Is AI-Generated (2026)",
    description:
      "Content Credentials, SynthID, EXIF clues, and visual tells: a layered, honest guide to spotting AI images in 2026.",
    url: `${APP_URL}/blog/how-to-check-if-image-is-ai-generated`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Check if an Image Is AI-Generated (2026)",
    description:
      "Four methods for detecting AI images: Content Credentials, SynthID, EXIF metadata, and visual tells. An honest look at what actually works.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_SLUG = "how-to-check-if-image-is-ai-generated";
const POST_URL = `${APP_URL}/blog/${POST_SLUG}`;
const POST_TITLE = "How to Check if an Image Is AI-Generated (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A practical, layered guide to determining whether an image was made or edited by AI in 2026: Content Credentials (C2PA), SynthID invisible watermarks, EXIF metadata clues, and visual artifact analysis. Honest about the limits of each method.",
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
    "how to check if image is ai generated",
    "detect ai image",
    "ai image checker",
    "check content credentials",
    "synthid detector",
    "c2pa verification",
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
      name: "Can I always tell whether an image is AI-generated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not reliably, no. Modern AI image generators produce outputs that can fool even trained human reviewers. The most reliable signal is a cryptographically signed Content Credentials manifest embedded by the tool that created the image. When that manifest is absent, you are making an educated guess rather than a verified determination.",
      },
    },
    {
      "@type": "Question",
      name: "What are Content Credentials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content Credentials are a digital provenance standard developed by the Coalition for Content Provenance and Authenticity (C2PA). They are a cryptographically signed manifest attached to an image file that records who created it, what tool was used, and whether any edits were applied. Adobe, Microsoft, Google, OpenAI, Nikon, and many others embed them. You can verify an image's credentials at contentcredentials.org/verify.",
      },
    },
    {
      "@type": "Question",
      name: "Does SynthID survive editing and compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google DeepMind designed SynthID to be robust to common image operations including cropping, color adjustments, JPEG compression, and resizing. It can survive a range of modifications that would destroy conventional visible watermarks. That said, aggressive editing such as heavy resampling or AI-based inpainting can degrade or remove it. It is more durable than a visible watermark but is not indestructible.",
      },
    },
    {
      "@type": "Question",
      name: "Is EXIF metadata a reliable way to detect AI images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partially. EXIF fields like 'Software' may contain the name of an AI tool (for example, 'Adobe Firefly' or 'Midjourney') if the creator did not strip the metadata. However, metadata can be stripped, edited, or spoofed in seconds. A missing or generic software field proves nothing. EXIF is a useful supporting clue, not a definitive test.",
      },
    },
    {
      "@type": "Question",
      name: "How do I disclose my own AI-generated content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EU AI Act requires clear disclosure when AI generates or materially alters content intended for the public. The most practical approach is a visible label on the image. SammaPix offers a free AI Label tool at sammapix.com/tools/ai-label for images and sammapix.com/tools/ai-label-video for video. Both tools run in your browser with no upload required.",
      },
    },
    {
      "@type": "Question",
      name: "Are AI image detection tools accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Classic binary classifiers (real vs AI) have high false-positive and false-negative rates, especially on images that blend AI-generated and real elements. Academic benchmarks from 2025 and 2026 consistently show accuracy degrading as AI models improve. Provenance-based systems like C2PA do not 'detect' anything; they verify a claim that was embedded at creation. That makes them far more reliable than classifier-based detectors, but only when the embedding was actually performed.",
      },
    },
    {
      "@type": "Question",
      name: "Is checking for AI images free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for the most important methods. contentcredentials.org/verify is free and publicly available. Google's SynthID Detector is free. Checking EXIF metadata with SammaPix's EXIF tool is also free, runs in your browser, and requires no account. Some third-party binary classifier tools charge for API access, but those are also the least reliable methods.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check if an Image Is AI-Generated",
  description:
    "A layered method for verifying whether an image was produced or significantly edited by artificial intelligence, using Content Credentials, SynthID, EXIF metadata, and visual analysis.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check Content Credentials at contentcredentials.org/verify",
      text: "Go to contentcredentials.org/verify and drag the image into the tool. If the image was created by an AI tool that embeds C2PA provenance data, you will see a signed manifest showing the originating software, creation date, and any edits applied. This is the most reliable method when credentials are present.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Use the SynthID Detector for Google-generated images",
      text: "Google DeepMind's SynthID embeds an invisible watermark into images generated by Imagen and other Google AI tools. The SynthID Detector tool can check whether an image carries this watermark. The watermark survives common edits like cropping and compression.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Inspect EXIF metadata for software clues",
      text: "Open the image in SammaPix's EXIF viewer at sammapix.com/tools/exif and look at the Software field. AI tools sometimes write their name there. Remember that metadata can be stripped or spoofed, so treat this as a supporting clue rather than proof.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Apply visual analysis as a last resort",
      text: "Look for typical AI artifacts: anatomically incorrect hands, text that dissolves into random characters on close inspection, mismatched reflections in eyes or glasses, unnaturally smooth skin, or physically impossible lighting. Treat visual analysis as a fallback, not a reliable test, because AI image quality is improving rapidly.",
    },
  ],
};

export default function HowToCheckIfImageIsAiGeneratedPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={POST_SLUG}
        description={`Detecting AI-generated images in 2026 is more nuanced than running a photo through a detection tool and trusting the result. The most reliable methods involve verified provenance standards, not pattern recognition. This guide walks through four layers of detection, explains what each one can and cannot prove, and gives you honest expectations.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={11}
        headings={[
          { id: "why-detection-is-hard", title: "Why detecting AI images is harder than it sounds" },
          { id: "method-content-credentials", title: "Method 1: Content Credentials (C2PA)" },
          { id: "method-synthid", title: "Method 2: SynthID (Google DeepMind watermark)" },
          { id: "method-exif", title: "Method 3: EXIF metadata clues" },
          { id: "method-visual-tells", title: "Method 4: Visual tells (and their limits)" },
          { id: "honest-bottom-line", title: "The honest bottom line" },
          { id: "disclosing-your-own-ai-content", title: "If you publish AI content: how to disclose it" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "No single method reliably detects all AI-generated images. Provenance-based systems (C2PA and SynthID) are more trustworthy than classifier tools, but only when the embedding was performed at creation.",
          "Content Credentials are the most reliable signal when present: a cryptographically signed manifest records the originating tool. Verify at contentcredentials.org/verify.",
          "SynthID, Google DeepMind's invisible watermark, survives cropping and JPEG compression and can be checked with Google's Detector tool.",
          "EXIF metadata can contain software clues (e.g. 'Adobe Firefly'), but metadata is trivially stripped or spoofed and should be treated as a supporting hint only.",
          "Visual tells such as distorted hands and garbled text are a last resort. AI image quality is improving rapidly, and these clues are becoming less reliable.",
          "The EU AI Act requires disclosure when AI generates public content. SammaPix's AI Label tools let you add a visible disclosure label to images and video, free, in your browser.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
              alt="Futuristic digital face illustrating the challenge of detecting AI-generated imagery in 2026"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The line between AI-generated and real imagery is harder to see than ever. Photo by Possessed Photography on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Check your image metadata now, free in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use the SammaPix EXIF viewer to inspect the software field and other metadata clues in any image. Nothing is uploaded; everything runs locally.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/exif"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open EXIF Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/ai-label"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Add AI Label
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
            The most reliable method is checking for a{" "}
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Content Credentials (C2PA) manifest</strong>{" "}
            at{" "}
            <a
              href="https://contentcredentials.org/verify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2"
            >
              contentcredentials.org/verify
            </a>
            . When credentials are present and signed, they tell you exactly which tool created the image. When they are absent, no method gives you a definitive answer. Binary AI detector tools have high error rates and should not be treated as ground truth.
          </p>
        </div>

        {/* Section: Why detection is hard */}
        <h2
          id="why-detection-is-hard"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          Why detecting AI images is harder than it sounds
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common assumption is that AI images have a recognizable look. Early generative models did produce distinctive artifacts: blurry faces, impossible anatomy, dreamlike textures. Tools trained on those outputs achieved reasonable accuracy at classifying them.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          But those classifiers were chasing a moving target. As image generators improved, the artifacts they relied on became rarer. By 2025, benchmark studies from teams at MIT, Stanford, and Google showed that state-of-the-art classifiers misidentified AI images at rates high enough to make them unreliable for any consequential decision.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The deeper problem is that detection approaches the wrong problem from the wrong angle. A classifier tries to infer provenance from pixel patterns. Provenance systems like C2PA record and verify provenance at the moment of creation. The latter is inherently more reliable, which is why the industry has shifted toward embedding rather than post-hoc detection.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That said, provenance standards are still being adopted. Not every image carries a credential. So in practice you need a layered approach: start with the most reliable signals and treat the less reliable ones as supporting context, not conclusions.
        </p>

        {/* Section: Method 1 - Content Credentials */}
        <h2
          id="method-content-credentials"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          Method 1: Content Credentials (C2PA)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Content Credentials are the closest thing the industry has to a verifiable answer. They are a cryptographically signed provenance manifest, embedded into the image file itself, that records how the image was created and edited. The standard is maintained by the{" "}
          <a
            href="https://c2pa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Coalition for Content Provenance and Authenticity (C2PA)
          </a>
          , whose members include Adobe, Microsoft, Google, OpenAI, BBC, Associated Press, Nikon, Canon, and many others.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What a Content Credentials manifest contains
        </h3>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "The originating software or hardware (e.g. 'Adobe Firefly', 'ChatGPT Image Generator', or a specific camera model)",
            "A creation timestamp",
            "A record of edits applied after creation, including which tools performed them",
            "A cryptographic signature that makes the manifest tamper-evident",
            "Optionally, the creator's identity if they chose to bind it",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          How to verify Content Credentials
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The simplest path is the public verification tool at{" "}
          <a
            href="https://contentcredentials.org/verify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            contentcredentials.org/verify
          </a>
          . Drag an image into the tool and it will display the full manifest if one exists. No account is required and no image data is sent to third parties beyond what the verification step requires.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Google announced at Google I/O 2026 that Chrome will add native C2PA credential display, showing a small indicator directly in the browser when a signed credential is detected. Google Search is also gaining the ability to surface credential information in image results. These integrations mean Content Credentials will increasingly show up without any deliberate action from the viewer.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Which AI tools embed Content Credentials
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Tool
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  C2PA embedded?
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">ChatGPT / OpenAI API (images)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">C2PA manifest plus SynthID watermark embedded on all generated images since May 2026</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Adobe Firefly</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">One of the earliest adopters; credentials survive Photoshop round-trips</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Microsoft Designer / Bing Image Creator</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">C2PA manifest embedded by default</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Google Imagen (via Gemini)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">SynthID watermark; C2PA credential announced for broader rollout</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Midjourney</td>
                <td className="px-4 py-2.5 text-xs font-medium text-amber-600 dark:text-amber-400">Partial</td>
                <td className="px-4 py-2.5 text-xs">Announced C2PA support; adoption still rolling out as of mid-2026</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Stable Diffusion (local/open source)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">No credential embedding in most local UIs; some third-party plugins add it optionally</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What Content Credentials cannot do
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A credential tells you what it claims. It cannot tell you whether an image that lacks a credential was made by AI. Absence of credentials is not evidence of a real photograph. Anyone can take a screenshot, strip metadata, or simply download from a tool that does not embed credentials. The standard solves the disclosure problem for compliant tools; it does not solve the adversarial detection problem.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Additionally, stripping EXIF data from an image also removes the C2PA manifest if the manifest is stored in the file's metadata block rather than as a cryptographic hash bound to the pixel data. Newer C2PA versions address this by binding the manifest more tightly to the image content, but older implementations can be stripped.
        </p>

        {/* Section: Method 2 - SynthID */}
        <h2
          id="method-synthid"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          Method 2: SynthID (Google DeepMind invisible watermark)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SynthID is Google DeepMind's approach to watermarking AI-generated images. Unlike a visible watermark, SynthID modifies pixel values in a pattern that is imperceptible to the human eye but detectable by a trained neural network. The modification is distributed across the entire image rather than concentrated in a corner, which makes it harder to remove by cropping.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What SynthID can withstand
        </h3>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "JPEG re-compression at typical quality settings",
            "Cropping (including aggressive crops that remove large portions)",
            "Resizing and aspect ratio changes",
            "Minor color grading adjustments",
            "Screenshot captures at common screen resolutions",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Heavy AI-based inpainting that rewrites large image regions",
            "Extreme resampling or resolution upscaling that reconstructs pixels",
            "Adversarial attacks specifically designed to remove the watermark",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SynthID is embedded in images generated by Google's Imagen model (accessible through Gemini and the Vertex AI API). OpenAI announced it would also embed SynthID in ChatGPT and API-generated images starting in May 2026, alongside their existing C2PA manifest. This makes SynthID increasingly relevant even outside the Google ecosystem.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          How to check for a SynthID watermark
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Google provides a public{" "}
          <a
            href="https://synthid.withgoogle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SynthID Detector
          </a>{" "}
          where you can upload an image and receive a result indicating whether a SynthID watermark is detected, not detected, or inconclusive. The tool is free and does not require a Google account for basic checks.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A detected watermark is a strong indicator that the image originated from a Google-affiliated AI tool. A not-detected result is not evidence of a real photograph; it only means no SynthID watermark was found. Many AI tools do not embed SynthID.
        </p>

        {/* Section: Method 3 - EXIF */}
        <h2
          id="method-exif"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          Method 3: EXIF metadata clues
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Before Content Credentials became widespread, EXIF metadata offered the most accessible window into an image's history. It still does, when the metadata is present and unmodified.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The key field to examine is <strong className="text-[#171717] dark:text-[#E5E5E5]">Software</strong>. Many AI generation tools write their name here by default. Common values that indicate AI origin include strings like &quot;Adobe Firefly&quot;, &quot;Midjourney&quot;, &quot;Stable Diffusion&quot;, &quot;DALL-E&quot;, or model-specific identifiers. If the Software field names a recognized AI tool, that is meaningful evidence.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Other useful fields include <strong className="text-[#171717] dark:text-[#E5E5E5]">Camera Make and Model</strong> (absent in AI images unless spoofed), <strong className="text-[#171717] dark:text-[#E5E5E5]">GPS coordinates</strong> (AI images almost never carry real GPS), and <strong className="text-[#171717] dark:text-[#E5E5E5]">Lens information</strong> (also absent in AI outputs).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          How to inspect EXIF data
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use the free{" "}
          <Link
            href="/tools/exif"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix EXIF viewer
          </Link>
          . Drop any image into the tool and it displays every metadata field in a structured view. The tool runs entirely in your browser, so the image is never uploaded anywhere. This makes it suitable even for sensitive images you would not want to send to an external server.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          The critical limitation of EXIF analysis
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Metadata is trivially editable. Stripping all EXIF from an image takes a single command. Adding plausible-looking camera metadata takes only slightly more effort. A sophisticated actor who wanted to pass off an AI image as a real photograph would simply strip the metadata or inject fake camera data before publishing.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Absent metadata tells you nothing useful. An image with no EXIF data could be AI-generated, could be a photo from a privacy-conscious photographer who always strips metadata, or could have come through any social platform that strips it automatically. Treat EXIF findings as corroborating evidence rather than conclusions in isolation.
        </p>

        {/* Inline CTA */}
        <Link
          href="/tools/exif"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-6 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
              Free tool, no upload, no signup
            </p>
            <p className="text-sm font-semibold text-white leading-snug">
              Inspect any image for EXIF metadata clues now
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
            strokeWidth={1.5}
          />
        </Link>

        {/* Section: Method 4 - Visual tells */}
        <h2
          id="method-visual-tells"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          Method 4: Visual tells (and their limits)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Visual analysis was the first widely used method for spotting AI images. It still works as a rough filter, particularly for images from older models or quickly generated outputs. But it is becoming less reliable with each generation of AI tools, and placing too much confidence in it leads to both false positives (accusing real photos of being AI) and false negatives (missing well-rendered AI images).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Artifacts that still appear in many AI images
        </h3>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Hands and fingers:</strong>{" "}
              Extra digits, fused fingers, or anatomically impossible joint angles. This artifact has become less common in frontier models but persists in mid-tier and locally run models.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Text inside the image:</strong>{" "}
              Signs, labels, book spines, and shirt graphics often contain garbled or nonsensical characters that look plausible at a glance but dissolve into noise on close inspection.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Reflections:</strong>{" "}
              Eyes and glasses in portraits often reflect a scene that does not match the environment the subject appears to occupy. Mirrors and reflective surfaces in the background frequently show physically inconsistent content.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Skin and fabric texture:</strong>{" "}
              AI models sometimes produce unnaturally smooth or perfectly uniform textures, particularly on skin, fabric weaves, and hair. Real photographs have natural variation at the pixel level.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Background incoherence:</strong>{" "}
              Objects in the distance sometimes merge into each other or fade in ways that do not follow natural perspective or depth of field. Architectural elements like windows and tiles can be irregular when examined closely.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Lighting inconsistency:</strong>{" "}
              Shadows that fall in contradictory directions, or catch-lights in eyes that do not match the apparent light source, are common in AI portraits.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Why visual analysis is unreliable as a primary method
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The artifacts listed above are traits of current models, not of AI image generation as a fundamental technology. Frontier models from OpenAI, Midjourney, Flux, and others render hands correctly most of the time in 2026. Text rendering, while still imperfect, has improved substantially. The error rate in visual detection is no longer low enough to confidently label an image based on a cursory inspection.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          There is also a strong confirmation bias risk. If you expect an image to be AI-generated, you will find artifacts in it. Real photographs have noise, lens aberrations, compression artifacts, and unusual lighting too. Treating these as evidence of AI authorship leads to false accusations. Use visual cues as a starting question, not a verdict.
        </p>

        {/* Section: The honest bottom line */}
        <h2
          id="honest-bottom-line"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          The honest bottom line
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          No single method gives you a reliable answer in every case. What you can do is apply the methods in order of trustworthiness and accumulate evidence:
        </p>
        <ol className="space-y-4 mb-6 pl-4">
          {[
            {
              step: "1",
              label: "Check for Content Credentials first.",
              detail:
                "Go to contentcredentials.org/verify. If a signed manifest is present from a known AI tool, you have your answer with high confidence. If the manifest shows camera hardware from a real device and an unbroken editing history, that is meaningful evidence the image is real.",
            },
            {
              step: "2",
              label: "Run the SynthID Detector.",
              detail:
                "A detected SynthID watermark confirms an AI origin. A negative result narrows the field but confirms nothing.",
            },
            {
              step: "3",
              label: "Inspect EXIF metadata.",
              detail:
                "Use the SammaPix EXIF tool. Look for AI software names, absent camera information, or implausible metadata. Treat this as supporting evidence.",
            },
            {
              step: "4",
              label: "Apply visual analysis with skepticism.",
              detail:
                "Look for the artifacts described above, particularly in hands, text, and reflections. Note observations but do not treat them as conclusions.",
            },
            {
              step: "5",
              label: "Acknowledge uncertainty when it exists.",
              detail:
                "If no credentials are present and the image is visually convincing, the honest answer is that you cannot determine its origin from the image alone. Additional context (platform, source, reverse image search) may help.",
            },
          ].map(({ step, label, detail }) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#6366F1] text-white text-xs font-semibold shrink-0">
                {step}
              </span>
              <span>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">{label}</strong>{" "}
                {detail}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The real fix is provenance at scale. C2PA is gaining rapid adoption across major AI platforms, camera manufacturers, and browser vendors. As embedding becomes the default and verification becomes native in browsers and search engines, the question of &quot;is this AI?&quot; will increasingly answer itself without any deliberate investigation. We are in a transition period where the infrastructure is being built but is not yet universally available.
        </p>

        <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>A note on binary AI detector tools:</strong> Services that claim to classify any image as &quot;AI&quot; or &quot;real&quot; with a percentage confidence score should be used with significant caution. Independent evaluations consistently show high false-positive and false-negative rates, particularly for photorealistic AI outputs and for edited photographs. These tools are not reliable enough for consequential decisions such as journalism, academic integrity enforcement, or legal proceedings.
          </p>
        </div>

        {/* Section: Disclosing your own AI content */}
        <h2
          id="disclosing-your-own-ai-content"
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4"
        >
          If you publish AI content: how to disclose it
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Detection is one side of the provenance problem. Disclosure is the other. If you create and publish AI-generated images or video, the regulatory and ethical landscape in 2026 is moving toward mandatory transparency.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act, which became fully applicable in August 2026, requires that AI-generated content intended for the public be clearly labeled as such. The law applies to content distributed in the European Union regardless of where the creator is located. Violations can result in significant fines under the Act's enforcement framework.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Beyond regulatory compliance, disclosure builds audience trust. Platforms including LinkedIn, YouTube, and TikTok have introduced their own AI-generated content labeling requirements. Voluntarily labeling AI content before platforms do it for you positions you as a transparent creator rather than someone caught out by an automated system.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Practical disclosure options
        </h3>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Visible label on the image:</strong>{" "}
              Use the{" "}
              <Link
                href="/tools/ai-label"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix AI Label tool
              </Link>{" "}
              to add a standardized disclosure badge to still images. The tool runs in your browser, requires no upload, and lets you choose the badge position and style.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Video disclosure label:</strong>{" "}
              Use the{" "}
              <Link
                href="/tools/ai-label-video"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix AI Label for Video
              </Link>{" "}
              to add a persistent disclosure overlay to video files without re-encoding the entire clip.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Embedded credentials:</strong>{" "}
              If your creation workflow uses Adobe tools, you can attach Content Credentials directly from Photoshop or Lightroom. This embeds a signed manifest that verification tools like Chrome and contentcredentials.org/verify will surface automatically.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Caption or alt text disclosure:</strong>{" "}
              For platforms that do not support metadata, a clear text disclosure in the caption or image description is the minimum viable approach. Something like &quot;Image created with [tool name]&quot; satisfies the spirit of the requirement.
            </span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix is also building a Content Credentials checker as a native tool, which will let you verify C2PA manifests directly in the same browser-based environment as the rest of the tool suite. This page will link to it once it launches.
        </p>

        {/* Related guides */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides and tools</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog/what-are-content-credentials-c2pa"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              What Are Content Credentials (C2PA)?
            </Link>
            <Link
              href="/blog/eu-ai-act-label-ai-content"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              EU AI Act: How to Label AI Content
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              EXIF Viewer Tool
            </Link>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              AI Label (Images)
            </Link>
            <Link
              href="/tools/ai-label-video"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              AI Label (Video)
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
                q: "Can I always tell whether an image is AI-generated?",
                a: "Not reliably. Modern AI image generators produce outputs that fool trained human reviewers at a meaningful rate. The most trustworthy signal is a cryptographically signed Content Credentials manifest embedded at creation. Without that, you are making an educated guess rather than a verified determination.",
              },
              {
                q: "What are Content Credentials?",
                a: "Content Credentials are a digital provenance standard developed by the Coalition for Content Provenance and Authenticity (C2PA). They are a cryptographically signed manifest attached to an image file that records which tool created it, when, and what edits were applied. Adobe, Microsoft, Google, OpenAI, Nikon, Canon, and many news organizations embed them. Verify any image at contentcredentials.org/verify.",
              },
              {
                q: "Does SynthID survive editing and compression?",
                a: "Google DeepMind designed SynthID to be robust against common operations including cropping, JPEG re-compression, and resizing. It can survive many modifications that would destroy a visible watermark. However, aggressive AI-based inpainting or extreme resampling can degrade or remove it. It is durable but not indestructible.",
              },
              {
                q: "Is EXIF metadata a reliable way to detect AI images?",
                a: "It is a useful supporting clue, not a reliable test on its own. The Software field may name an AI tool if the creator did not strip the metadata. But metadata can be removed or spoofed in seconds. Absent or generic metadata proves nothing either way.",
              },
              {
                q: "How do I disclose my own AI-generated content?",
                a: "The EU AI Act requires clear disclosure when AI generates or significantly alters content intended for the public. The most practical approach is a visible label on the image. SammaPix offers a free AI Label tool at sammapix.com/tools/ai-label for images and sammapix.com/tools/ai-label-video for video. Both run in your browser with no upload required.",
              },
              {
                q: "Are AI image detection tools accurate?",
                a: "Binary classifiers (real vs. AI) have high error rates, especially for photorealistic AI outputs and images that combine real and AI-generated elements. Independent benchmarks from 2025 and 2026 show accuracy degrading as AI models improve. Provenance systems like C2PA do not detect; they verify a claim made at creation, which makes them far more reliable when the embedding was performed.",
              },
              {
                q: "Is checking for AI images free?",
                a: "Yes for the most reliable methods. contentcredentials.org/verify is free and publicly available. Google's SynthID Detector is free. Checking EXIF metadata with SammaPix's EXIF tool is also free, runs in your browser, and requires no account.",
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
