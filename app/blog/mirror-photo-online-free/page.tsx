import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Mirror a Photo Free (Horizontal & Vertical) [2026]",
  description:
    "Mirror any photo free in your browser — horizontal flip, vertical flip, or both. Fix mirrored selfies, create reflection effects, correct reversed scans. No upload, no signup, batch + ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/mirror-photo-online-free`,
  },
  keywords: [
    "mirror photo online free",
    "mirror photo",
    "mirror image online",
    "flip selfie",
    "reverse image horizontally",
    "mirror image free",
    "flip photo free",
    "mirror picture online",
    "reverse selfie",
    "horizontal mirror photo",
    "vertical flip photo",
    "flip scanned image",
    "mirror effect photo",
    "reverse photo direction",
    "mirror image no upload",
  ],
  openGraph: {
    title: "How to Mirror a Photo Free (Horizontal & Vertical) [2026]",
    description:
      "Mirror any photo free in your browser — no upload, no server. Fix mirrored selfies, create water reflection effects, correct reversed scans. Batch + ZIP. Free, no signup.",
    url: `${APP_URL}/blog/mirror-photo-online-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Mirror a Photo Free (Horizontal & Vertical) [2026]",
    description:
      "Mirror photos in your browser — no upload, no server. Fix selfies, water reflections, reversed scans. Batch 20 files, ZIP download. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/mirror-photo-online-free`;
const POST_TITLE = "How to Mirror a Photo Free (Horizontal & Vertical) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A complete guide to mirroring photos free in your browser with no upload. Covers fixing mirrored selfies, creating water reflection effects, correcting reversed scans, and how to batch mirror a set of photos at once. Uses the SammaPix Flip Image tool powered by the HTML Canvas API.",
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
    "mirror photo online free",
    "mirror image online",
    "flip selfie",
    "reverse image horizontally",
    "mirror image free",
    "flip photo free",
    "mirror picture online",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Mirror a Photo Free Online",
  description:
    "Mirror a photo horizontally or vertically in your browser for free with no file upload, using SammaPix Flip Image powered by the HTML Canvas API. Works for selfie correction, creative effects, and batch processing.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Flip Image (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Flip Image tool",
      text: "Go to sammapix.com/tools/flip-image in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your photo or photos onto the tool",
      text: "Drag one or more photos onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select the mirror direction",
      text: "Choose Flip Horizontal to mirror left to right (the most common use case for selfies and reversed scans). Choose Flip Vertical to mirror top to bottom (for reflection effects and upside-down corrections).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Flip and review the preview",
      text: "The tool applies the mirror transform via HTML Canvas and shows a preview of each mirrored photo. Processing is instant. No upload occurs.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download individually or as a ZIP",
      text: "Click the download icon next to any photo, or click Download All as ZIP to get the full batch. Files come from browser memory — no server involved.",
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
      name: "How do I mirror a photo for free online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to sammapix.com/tools/flip-image, drop your photo, select Flip Horizontal (for a left-right mirror), and click Flip. The mirror is applied in your browser via the Canvas API — no upload, no signup, no server. Download the mirrored photo in one click. Free for up to 20 photos at once.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my selfie look mirrored when I save it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Front cameras show you a mirror preview (the way you see yourself in a mirror) because it feels natural. When the photo is saved, different apps handle this differently. Some apps automatically flip the saved photo so it matches how others see you; others save it in mirror orientation (the way you saw it in the preview). Instagram, Snapchat, and some Android camera apps historically saved selfies in mirror orientation. The fix is a horizontal flip of the saved photo, which you can do free in your browser at sammapix.com/tools/flip-image with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between mirroring a photo and rotating it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mirroring (flipping) reflects the image across an axis. A horizontal mirror makes the left side become the right side — the image appears as its reflection in a mirror. Rotating turns the image by an angle around a central point — 90 degrees clockwise makes the top become the right side. They are different operations for different problems. If your selfie looks like a reflection (text on your shirt is reversed, your parting is on the wrong side), you need a mirror (horizontal flip). If your photo is sideways, you need rotation. See the rotate guide at sammapix.com/blog/rotate-image-online-no-upload.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mirror a batch of photos at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drop up to 20 photos onto sammapix.com/tools/flip-image, select the mirror direction, and click Flip. All photos are mirrored in one pass entirely in your browser. Download them all as a ZIP archive in one click — no upload, no server, no signup required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a water reflection effect for a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A water reflection effect is created by taking a vertical flip of your photo and placing it below the original to simulate a reflection in water. Step 1: Open sammapix.com/tools/flip-image, drop your photo, select Flip Vertical, and download the vertically flipped version. Step 2: In any image editor (Canva, Photoshop, GIMP, or even Google Slides), place the original photo on top and the flipped version below it, touching at the horizon line. Step 3: Optionally add a slight blur or ripple effect to the flipped version and reduce its opacity to simulate water texture.",
      },
    },
    {
      "@type": "Question",
      name: "My scanned document came out reversed. How do I fix it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your scanned document appears reversed (mirrored left to right), the page was placed face-down on the scanner bed with the text facing away from the glass. The fix is a horizontal flip. Go to sammapix.com/tools/flip-image, drop the scanned image, select Flip Horizontal, click Flip, and download the corrected version. The text will now read correctly. For a scanned image that is upside down (not mirrored), use vertical flip or rotate 180 degrees instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does mirroring a photo reduce its quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A mirror (flip) is a pixel-exact operation — every source pixel maps to exactly one destination pixel with no interpolation. The only quality impact comes from JPEG re-encoding at export (one generation of re-compression at approximately 92% quality), which is visually negligible for all practical purposes. PNG inputs come out with zero quality loss since PNG is lossless. The flip itself introduces no softness, no artifacts, and no pixel averaging of any kind.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mirror a photo on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. sammapix.com/tools/flip-image works in mobile browsers on both iPhone (Safari) and Android (Chrome). Open the link on your phone, tap to browse and select your photo from the camera roll, choose your flip direction, and download the mirrored result. The Canvas API processing happens on your phone's CPU — no upload required, and it works fast even on mid-range devices.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MirrorPhotoOnlineFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="mirror-photo-online-free"
        description="A complete guide to mirroring photos free in your browser — fixing mirrored selfies, creating water reflection effects, correcting reversed scans, and batch-mirroring photo sets. No upload. No server. No signup."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={9}
        headings={[
          { id: "when-you-need-to-mirror", title: "When you actually need to mirror a photo" },
          { id: "fix-mirrored-selfie", title: "Fixing a mirrored selfie: the most common use case" },
          { id: "horizontal-mirror", title: "Horizontal mirror: what it is and when to use it" },
          { id: "vertical-mirror", title: "Vertical mirror: reflection effects and upside-down corrections" },
          { id: "water-reflection-effect", title: "How to create a water reflection effect from any photo" },
          { id: "fix-reversed-scan", title: "Fixing a reversed or mirrored scan" },
          { id: "batch-mirror", title: "How to batch mirror a set of photos" },
          { id: "step-by-step", title: "How to mirror a photo free, step by step" },
          { id: "quality-no-upload", title: "Quality and privacy: what the browser actually does" },
          { id: "mirror-vs-rotate", title: "Mirror vs rotate: picking the right tool for the job" },
          { id: "related-tools", title: "Related image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The three most common reasons to mirror a photo: correcting a selfie saved in mirror orientation, creating a symmetric design or reflection effect, and fixing a scan that came out reversed.",
          "A horizontal mirror (left-right flip) is the fix for mirrored selfies and reversed scans. A vertical mirror (top-bottom flip) is the basis for water reflection effects.",
          "SammaPix Flip Image runs the mirror transform entirely in your browser via the Canvas API. Your file never leaves your device — verifiable in DevTools Network panel.",
          "Batch mirror up to 20 photos in one session and download all as a ZIP.",
          "A flip is pixel-exact with no interpolation, so there is no quality degradation beyond the standard JPEG re-encoding at export.",
          "Works on desktop and mobile browsers, with no app install or account required.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A lake with mountains perfectly reflected on the still water surface, illustrating the vertical mirror effect that can be recreated with any photo using a free browser-based flip tool."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A water reflection effect is created by vertically mirroring a photo and placing it below the original.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Mirror your photos right now — no upload, no signup
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Flip Image runs entirely in your browser via the Canvas API. Horizontal mirror, vertical mirror,
              or both. Batch mirror 20 photos at once. Download individually or as ZIP. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/flip-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Flip Image, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/rotate-image"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Rotate Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: When you need to mirror ────────────────────────── */}

        <h2 id="when-you-need-to-mirror" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you actually need to mirror a photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          &ldquo;Mirror a photo&rdquo; and &ldquo;flip an image&rdquo; describe the same operation — reflecting the image across an axis so that it appears as its mirror reflection. The need comes up more often than most people expect:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mirrored selfies.</strong> You took a selfie and the saved photo appears reversed — text on your shirt is backwards, your parting is on the wrong side. This happens because some camera apps save selfies in mirror orientation instead of flipping them to the non-mirrored version.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Reversed scans.</strong> You scanned a document or a photo print and the result is mirrored — the page was placed face-down on the scanner with the text facing away from the glass instead of toward it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Creative reflection effects.</strong> You want to create a water reflection effect by mirroring a landscape photo along the horizon line, or build a symmetrical design by mirroring an image of a subject along a vertical center line.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Layout and product photography.</strong> You need a product shot or portrait that faces the other direction — for a layout where the subject should look toward text rather than away from it, or to create a symmetric set of images.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All of these are solved by{" "}
          <Link href="/tools/flip-image" className="text-[#6366F1] hover:underline">SammaPix Flip Image</Link>,{" "}
          a free browser-based tool that applies the mirror transform using the HTML Canvas API — no upload to any server, no signup, and no app to install. The tool works on desktop and mobile browsers.
        </p>

        {/* ── Section 2: Fix mirrored selfie ────────────────────────────── */}

        <h2 id="fix-mirrored-selfie" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Fixing a mirrored selfie: the most common use case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you have taken a selfie and the saved photo looks like a mirror image of what you expected — your dominant hand is on the wrong side, lettering is reversed, or familiar features appear flipped — the cause is camera app behavior, not a camera defect.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Front-facing cameras show a live mirror preview so it feels natural while framing. When the shutter is pressed, different apps handle the final saved image differently:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">App / System</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Default behavior</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fix needed?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iPhone Camera (default)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Flips the saved photo to non-mirror orientation (others see you correctly).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Only if &ldquo;Mirror Front Camera&rdquo; is enabled in Settings → Camera.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Instagram Camera</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Saves in mirror orientation (the preview you saw). Subject looks mirrored in saved photo.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — horizontal flip to correct.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Snapchat</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Saves in mirror orientation by default. Has a setting to change this.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — horizontal flip to correct.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Samsung Camera (recent models)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Has changed over model generations. Newer Galaxy phones flip automatically; older ones may save in mirror orientation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on model — check saved photo for text reversal.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Video call screenshots (Zoom, Teams, FaceTime)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Vary by app. Screenshots of your own preview tile are often in mirror orientation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often yes — horizontal flip to correct your tile.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fastest way to check if your selfie is mirrored: look for any text in the image (a logo on clothing, a sign in the background, a tattoo with text). If the text appears reversed, the photo is in mirror orientation and needs a horizontal flip.
        </p>

        {/* ── Section 3: Horizontal mirror ──────────────────────────────── */}

        <h2 id="horizontal-mirror" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Horizontal mirror: what it is and when to use it
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A horizontal mirror (also called a horizontal flip or left-right mirror) reflects the image across the vertical center axis. The left side becomes the right side. The right side becomes the left side. The image looks exactly like its reflection in a vertical mirror — which is why this is often called simply &ldquo;mirroring&rdquo; a photo.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Technically, every pixel at position (x, y) is remapped to position (width - 1 - x, y). The Y coordinate does not change. The image dimensions stay the same. It is a clean, one-to-one mapping with no information loss.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When to use horizontal mirror
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Correcting a selfie saved in mirror orientation (left-right is reversed)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Fixing a scanned document where the page was placed reversed on the scanner bed
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Creating a mirror pair of a product or portrait for a symmetric layout (subject facing both directions)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Generating a symmetric butterfly or mandala effect from an asymmetric photo
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Correcting text or logos that appear reversed in screenshots from video calls or screen recordings
          </li>
        </ul>

        {/* ── Section 4: Vertical mirror ────────────────────────────────── */}

        <h2 id="vertical-mirror" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Vertical mirror: reflection effects and upside-down corrections
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A vertical mirror (vertical flip or top-bottom mirror) reflects the image across the horizontal center axis. The top becomes the bottom. The bottom becomes the top. The image appears upside down — but not mirrored left to right.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every pixel at position (x, y) is remapped to position (x, height - 1 - y). The X coordinate does not change. The image dimensions stay the same.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When to use vertical mirror
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Creating a water or floor reflection effect (the core step is a vertical flip of the base image)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Correcting an image captured by a camera mounted upside down (aerial photography, certain document scanner configurations)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Certain typographic and print layouts where text or imagery is intended to be read from the opposite direction
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Building symmetric compositions where a subject is mirrored above and below a center line
          </li>
        </ul>

        {/* ── Section 5: Water reflection effect ───────────────────────── */}

        <h2 id="water-reflection-effect" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to create a water reflection effect from any photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A water reflection (or mirror reflection) effect is one of the most popular creative uses for a vertical flip. Here is how to create it:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a suitable photo.</strong> Landscape photos, architecture, portraits against clean backgrounds, and images with strong vertical lines (trees, buildings, people standing) all work well. The horizon line or subject baseline becomes the reflection axis.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/flip-image, drop your photo, select Flip Vertical, and download.</strong> This gives you the vertically flipped version — the &ldquo;reflection&rdquo; component.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open any image editing tool</strong> (Canva, Photoshop, GIMP, or even a free tool like Pixlr) and create a new canvas that is twice the height of the original photo.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Place the original photo in the top half</strong> and the vertically flipped version in the bottom half, aligning them at the center line. They should meet exactly at the horizon line or subject baseline.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Optional: refine the reflection.</strong> Reduce the opacity of the flipped layer to 60 to 80 percent to simulate light absorption by water. Add a slight Gaussian blur (2 to 5 pixels) to simulate surface texture. Add a ripple or wave distortion filter if your editor supports it.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result is a composite image that looks like the subject or landscape is reflected in a still body of water. This technique is widely used in landscape photography, real estate imagery, and graphic design.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Mirror your photos in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Horizontal mirror, vertical mirror, or both. Batch up to 20 photos. Download all as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/flip-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Flip Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Fix reversed scan ──────────────────────────────── */}

        <h2 id="fix-reversed-scan" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Fixing a reversed or mirrored scan
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Flatbed scanners are a surprisingly common source of mirrored images. When a document or photograph is placed on the scanner glass face-down with the text facing up (away from the glass), the scanner captures the image through the back of the page. The result is a mirror image of the original — text appears reversed, images appear flipped.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This also happens with overhead document camera scanners when the camera is positioned to one side instead of directly above, and with certain mobile scanning apps that handle camera perspective without automatically correcting the orientation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to identify a mirrored scan vs an upside-down scan
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mirrored scan (horizontal flip needed):</strong> Text is readable upright but reversed, as if reading in a mirror. Letters are backwards. The page orientation (portrait or landscape) is correct, but the content is mirrored left to right.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Upside-down scan (rotate 180 degrees or vertical flip needed):</strong> Text appears upside down but not mirrored. The letters are not reversed — they are simply inverted. Use{" "}
            <Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">rotate 180 degrees</Link>{" "}
            to correct this, not a mirror.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Both (rotate 90 and flip):</strong> Text is sideways AND mirrored. Correct the rotation first with{" "}
            <Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link>,{" "}
            then apply the horizontal flip.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a mirrored scan: go to sammapix.com/tools/flip-image, drop the scanned image, select Flip Horizontal, and download. The text will read correctly. For a batch of scanned pages that all came out reversed, drop all of them at once and batch flip them in one pass.
        </p>

        {/* ── Section 7: Batch mirror ───────────────────────────────────── */}

        <h2 id="batch-mirror" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to batch mirror a set of photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The need to mirror multiple photos at once is common in several workflows:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            A set of product shots that all need to face the opposite direction for a new layout
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            A batch of selfies from a social app that all saved in mirror orientation
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            A set of scanned pages from a document that was placed reversed on the scanner
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            A collection of portraits for a symmetric design where all subjects need to face the same direction
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Flip Image supports batch processing of up to 20 images per session. Drop all files at once, select the mirror direction, click Flip. All images are processed in your browser simultaneously through the Canvas pipeline. When complete, click Download All as ZIP — the entire batch arrives in a single archive ready to use. Zero upload, zero server involvement, zero signup.
        </p>

        {/* ── Section 8: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to mirror a photo free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the complete process for mirroring one or more photos using SammaPix Flip Image:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/flip-image</strong> in Chrome, Safari, Firefox, or Edge — on desktop or mobile. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photos onto the dropzone</strong> or click to browse and select files. You can select multiple files at once. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files load into browser memory — no upload occurs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select the mirror direction.</strong> Click Flip Horizontal to create a left-right mirror (most common for selfies and reversed scans). Click Flip Vertical to create a top-bottom mirror (for reflection effects). Both can be applied at once.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Flip.</strong> The Canvas API applies the transform to each photo in milliseconds. Previews of the mirrored photos appear below the dropzone.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the results.</strong> Check that the mirror direction is correct. Text should now read forward (for a corrected selfie or scan). The subject should face the intended direction.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download button next to any single photo, or click Download All as ZIP for the full batch. Files come from browser memory — no network request occurs.
          </li>
        </ol>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your photos stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Batch 20 photos. Horizontal and vertical mirror.
            ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/flip-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Flip Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/flip-image-online-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full flip guide (technical, batch, DevTools verification) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Quality and privacy ───────────────────────────── */}

        <h2 id="quality-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quality and privacy: what the browser actually does
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two concerns come up every time someone considers using a browser-based image tool: does it actually stay on my device, and does the mirror operation reduce quality?
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Privacy: verifiable client-side processing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a photo into SammaPix Flip Image, the browser reads it using the FileReader API — a standard browser API that reads local files without any network access. The image is decoded into a bitmap, mirrored via a Canvas transform, and the result is exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL served from browser memory. No network request carries your image anywhere.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify this yourself: open browser DevTools (F12 on Windows/Linux, Command Option I on Mac), go to the Network tab, drop your photo, and click Flip. You will see the initial page load requests (JavaScript, CSS) but zero outgoing requests during the mirror operation or download. This is not a claim — it is observable behavior you can check in thirty seconds.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quality: pixel-exact with a single JPEG re-encode
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A mirror transform maps every source pixel to exactly one destination pixel with no interpolation. This is unlike arbitrary-angle rotation (which requires bilinear interpolation and introduces slight softness on diagonal edges). A flip is exact.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The only quality consideration: if your input is a JPEG, the output is a JPEG re-encoded by the browser canvas at approximately 92 percent quality. One generation of JPEG re-compression introduces very slight quality reduction — the same trade-off you get in any editor (Photoshop, Lightroom, GIMP) that saves a JPEG after editing. For web, social media, and most practical uses this is imperceptible. If your input is a PNG, the output PNG is lossless — mathematically identical to the input with reflected pixel coordinates.
        </p>

        {/* ── Section 10: Mirror vs rotate ──────────────────────────────── */}

        <h2 id="mirror-vs-rotate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Mirror vs rotate: picking the right tool for the job
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common mistake when correcting photo orientation is applying a mirror when rotation is needed, or rotation when a mirror is needed. Here is a quick decision framework:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Photo is sideways (rotated 90 degrees):</strong> Use{" "}
            <Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link>{" "}
            with 90 or 270 degrees. See the guide{" "}
            <Link href="/blog/rotate-image-online-no-upload" className="text-[#6366F1] hover:underline">Rotate an Image Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Photo is upside down, not mirrored:</strong> Use Rotate Image with 180 degrees — or vertical flip (same visual result for most images).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Photo is mirrored (text reversed, content reflected left-right):</strong> Use{" "}
            <Link href="/tools/flip-image" className="text-[#6366F1] hover:underline">Flip Image</Link>{" "}
            with horizontal flip.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Photo is both sideways and mirrored:</strong> Rotate first to correct the angle, then apply a horizontal flip. Use both tools in sequence.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You want to create a mirror symmetry creative effect:</strong> Apply horizontal flip to get the mirrored version, then combine original and flipped in a design tool.
          </li>
        </ul>

        {/* ── Section 11: Related tools ─────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools — all with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/flip-image" className="text-[#6366F1] hover:underline">Flip Image</Link></strong>: mirror any photo horizontally or vertically. Batch up to 20 files, download as ZIP. This is the tool this article covers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: rotate any image 90/180/270 degrees or any custom angle. The complement to flipping — use for sideways photos instead of mirrored ones. Full guide:{" "}
            <Link href="/blog/rotate-image-online-no-upload" className="text-[#6366F1] hover:underline">Rotate an Image Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce file size by re-encoding at a lower quality level. Useful after creating a composite reflection image that is larger than you need. See{" "}
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios — 1:1, 4:3, 16:9, 4:5 for Instagram. Useful after mirroring if the reflected composite needs to be cropped to a specific platform dimension.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: resize mirrored images to exact pixel dimensions or a percentage. Useful when the output needs to fit a specific size requirement.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Mirror, rotate, compress, crop, and resize without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/flip-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Mirror Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/rotate-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
