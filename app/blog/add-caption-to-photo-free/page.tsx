import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add a Caption to a Photo Free [2026]",
  description:
    "Add a caption to any photo free — entirely in your browser via Canvas. Text with outline for legibility on any background. Social, meme, watermark. No upload, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-caption-to-photo-free`,
  },
  keywords: [
    "add caption to photo",
    "add caption to photo free",
    "add words to picture",
    "text over image",
    "meme text on photo",
    "add text over image free",
    "caption photo online free",
    "add writing to photo",
    "caption image online",
    "put text on photo free",
    "add caption to picture free",
    "text over photo online",
    "write on picture free",
    "photo caption maker free",
    "meme text generator no upload",
  ],
  openGraph: {
    title: "How to Add a Caption to a Photo Free [2026]",
    description:
      "Add a caption to any photo entirely in your browser. Text outline for legibility on any background. Social captions, meme text, watermarks. No upload. Free.",
    url: `${APP_URL}/blog/add-caption-to-photo-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add a Caption to a Photo Free [2026]",
    description:
      "Caption any photo in your browser via Canvas. Outline for legibility on dark or light backgrounds. Social, meme, watermark text. No upload. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-caption-to-photo-free`;
const POST_TITLE = "How to Add a Caption to a Photo Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Adding a caption to a photo requires making text readable on any background — which means getting the outline right. This guide covers the exact technique for legible captions on any photo, the difference between social captions, meme text, and watermarks, and how to do all of this in your browser with no upload.",
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
    "add caption to photo free",
    "add words to picture",
    "text over image",
    "meme text on photo",
    "photo caption maker free",
    "caption image online",
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
  name: "How to Add a Caption to a Photo Free",
  description:
    "Add a caption to any photo in your browser with no file upload, using SammaPix Add Text to Image powered by the HTML Canvas API. Configure text outline for legibility on any background. No upload, no signup.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Add Text to Image (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Add Text to Image tool",
      text: "Go to sammapix.com/tools/add-text-to-image in any modern browser. No account required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your photo onto the tool",
      text: "Drag your photo onto the dropzone or click to browse. The file is read locally — nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Type your caption text",
      text: "Enter your caption in the text field. The live preview updates as you type so you can see the result before downloading.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set font, size, and fill color",
      text: "Choose a font, set the size relative to your image dimensions, and pick a fill color. White is the most versatile starting point.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Enable the text outline",
      text: "Turn on the outline option and set the outline color to black (or a dark color) with a width of 2 to 5 pixels. This makes your caption readable on any background — dark, light, or mixed.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Position the caption",
      text: "Choose a preset position or drag the text in the preview. For social captions, bottom-center is the standard. For meme text, top and bottom positions with a large font.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Download the captioned photo",
      text: "Click Download. The canvas exports the composited image via a blob: URL — no network request is made, no file leaves your device.",
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
      name: "How do I add a caption to a photo for free without a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a tool that does not add its own watermark to your output. SammaPix Add Text to Image runs in your browser via the Canvas API and does not add any branding to the exported image. The only text in the output is what you typed. Many free online tools advertise &ldquo;free&rdquo; but embed a logo or watermark in the corner of your photo unless you pay. That is not actually free for professional or public use. With SammaPix, no tool watermark is added. The image you download contains exactly what you see in the preview.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make caption text readable on a dark background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use white fill text with a black outline. Enable the outline option in the tool, set the outline color to black (#000000), and use an outline width of 2 to 5 pixels depending on your font size. For a 36px font, 3px outline is a good starting point. The Canvas API renders the stroke before the fill, so the black outline sits cleanly behind the white characters. This combination is readable on dark backgrounds, light backgrounds, and mixed backgrounds simultaneously — it is the same technique used for TV subtitles and sports broadcast graphics.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make caption text readable on a light or white background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For light backgrounds, use dark fill text — black (#000000) or a dark gray (#333333). If the background is solid white with no variation, you may not need an outline at all. But for photos with mixed-tone backgrounds, even on overall light images, add a 1 to 2px white or light gray outline to your dark text to ensure it does not disappear into any bright areas. For product photos on white backgrounds, black text with no outline is clean and professional.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a caption, a label, and a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three are text on an image, but they serve different purposes and have different conventions. A caption describes or contextualizes the image — a location name, a quote, an event description — and is typically placed at the bottom of the photo. A label identifies a specific element within the image — an arrow pointing to something, a product name overlay — and is placed near the labeled element. A watermark protects ownership — a copyright notice, domain name, or photographer name — and is typically placed in a corner, often semi-transparent, with the goal of being visible enough to deter theft but unobtrusive enough not to ruin the viewing experience. The same text tool handles all three; what differs is the font size, position, and opacity you choose.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create meme-style text on a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Classic meme text uses a large, bold, all-caps font (Impact or a similar compressed sans-serif), white fill, and a thick black outline (4 to 6px for a font around 60 to 80px). Position the top caption in the top-center area and the bottom caption in the bottom-center area, with some padding from the edges. This is the format that originated with image macros and is still the most recognizable meme style. In the tool, type your top caption, set the position to top-center, download, then open the result again and add the bottom caption positioned at bottom-center. Alternatively, type a single caption and position it at the top or bottom.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding a caption to a photo upload the file to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with SammaPix. The Add Text to Image tool runs entirely in your browser using the HTML Canvas API. When you drop a photo into the tool, it is read by the FileReader API — a browser-native API for reading local files without network access. The text is rendered onto the image via the Canvas 2D context and the result is exported as a blob: URL that downloads directly from browser memory. You can verify this by opening your browser&apos;s Network inspector (F12) and watching for outgoing requests while the tool composites your text. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a caption to a photo on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix Add Text to Image tool works on mobile browsers including Chrome for Android and Safari on iOS. The Canvas API is fully supported on mobile. The interface adapts to mobile screen sizes. On mobile, you can select a photo from your camera roll, type your caption, configure the style, and download the result — all in the browser, with no app install required and no upload to a server.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddCaptionToPhotoFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-caption-to-photo-free"
        description="Adding a caption to a photo sounds simple but has one hard problem: making the text readable on any background. A photo has light areas, dark areas, and everything in between. Without the right outline configuration, captions disappear into the image. This guide covers exactly how to get legible captions on any photo, the right settings for social captions, meme text, and watermarks, and how to do it in your browser with no upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={10}
        headings={[
          { id: "the-legibility-problem", title: "The core problem with captions: making text readable on any photo" },
          { id: "how-canvas-captions-work", title: "How browser-based caption compositing works" },
          { id: "social-captions", title: "Social media captions: Instagram, Facebook, Pinterest" },
          { id: "meme-text", title: "Meme-style text: the exact settings that look right" },
          { id: "text-watermarks", title: "Text watermarks: protect your photos without ruining them" },
          { id: "outline-settings", title: "Outline settings by use case" },
          { id: "step-by-step", title: "How to add a caption to a photo, step by step" },
          { id: "no-watermark", title: "Why this tool adds no watermark to your photo" },
          { id: "quality-impact", title: "Does adding a caption affect photo quality?" },
          { id: "comparison-table", title: "Free caption tools compared: what actually matters" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The biggest challenge with adding captions to photos is legibility: text needs to be readable on dark, light, and mixed backgrounds simultaneously. The solution is a configurable text outline.",
          "SammaPix Add Text to Image runs entirely in your browser via the Canvas API. Your photo never leaves your device.",
          "White text with a black outline (2 to 5px) is readable on any background — the same technique used for TV subtitles, sports graphics, and professional social media captions.",
          "Supports social captions (bottom-center, standard sans-serif), meme-style text (large Impact font, top and bottom), and subtle watermarks (small, semi-transparent, corner position).",
          "No watermark is added to your photo by the tool. The exported image contains only the text you chose — unlike most free online captioning tools.",
          "Works on mobile browsers (iOS Safari, Chrome Android). No app install, no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person compositing text on a photo using a laptop, illustrating how to add captions to images online without uploading them to a server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding a caption to a photo should not require handing your image to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a caption to your photo right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Add Text to Image runs entirely in your browser. Text outline for legibility on any background.
              Social captions, meme text, watermarks. No upload. No signup. No tool watermark. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/add-text-to-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Add Caption, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/add-border"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Add Border <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: The legibility problem ──────────────────────────── */}

        <h2 id="the-legibility-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The core problem with captions: making text readable on any photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a caption to a photo is technically simple. Making it look good — especially making the text readable on any part of the image it overlaps — is where most people run into trouble.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A photograph is not a solid-color background. It has areas of different brightness: a bright sky, a dark shadow, a person with medium-tone skin against a lighter wall. White text works fine over the dark shadow but disappears into the bright sky. Black text works over the sky but is lost in the shadow. Any single-color text will vanish into some part of a typical real-world photograph.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The professional solution is a text outline — a border drawn around each character in a contrasting color. A white character with a black outline is readable on any background: the white interior contrasts with dark areas, and the black outline contrasts with light areas. This is why every broadcast TV subtitle, sports graphic, and professionally produced social media caption uses an outline. It is not decoration — it is a legibility requirement.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">SammaPix Add Text to Image tool</Link>{" "}
          supports configurable text outlines rendered via the Canvas 2D API&apos;s{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeText</code>{" "}
          function. The outline color, width, and fill color are each independently configurable. This covers every use case from the classic white-on-black meme caption to the subtle gray watermark in the corner of a professional photo.
        </p>

        {/* ── Section 2: How canvas captions work ──────────────────────────── */}

        <h2 id="how-canvas-captions-work" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based caption compositing works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a photo and click to apply a caption, the Canvas API handles the compositing entirely in browser memory:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The photo is decoded into a pixel bitmap.</strong> The browser reads the file via the FileReader API (local, no network) and decodes the compressed image (JPEG, PNG, etc.) into a raw pixel array — an ImageBitmap.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A canvas is created at the photo&apos;s dimensions.</strong> The canvas matches the original image size exactly, preserving resolution.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The photo is drawn onto the canvas.</strong> Every pixel of the original photo is reproduced exactly on the canvas background.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The canvas context is configured with font and color.</strong> The 2D context sets{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">font</code>{" "}
            (family + size),{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillStyle</code>{" "}
            (text fill color),{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeStyle</code>{" "}
            (outline color), and{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">lineWidth</code>{" "}
            (outline thickness).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Outline is drawn first, then fill.</strong>{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeText</code>{" "}
            runs first, drawing the outline color around the character shapes. Then{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillText</code>{" "}
            runs on top, filling the character interiors with the fill color. This order ensures the fill sits cleanly inside the outline without color bleeding.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported via blob: URL.</strong> The canvas is converted to a Blob (JPEG or PNG matching the input) and downloaded directly from browser memory. No file is sent to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The live preview in the tool uses the same Canvas rendering in real time — every change to the text, font, size, color, or outline is instantly applied to the canvas and shown in the preview. What you see in the preview is exactly what you download.
        </p>

        {/* ── Section 3: Social captions ────────────────────────────────── */}

        <h2 id="social-captions" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Social media captions: Instagram, Facebook, Pinterest
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a caption directly onto a photo before posting is different from adding a post caption on the platform. A caption baked into the image is visible in every context — the feed, a share, a screenshot, a re-post. It does not get cut off, hidden on mobile, or lost when the image is saved. For location tags, quotes, dates, and attribution, a baked-in caption is the more durable choice.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Instagram captions baked into photos
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photography accounts often add a small location or date caption in the bottom-left or bottom-right corner of a photo before posting. This identifies the location in the image itself, independent of the post caption that followers may skip. The typical format:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Font: sans-serif, medium weight
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Size: 18 to 24px for a 1080px-wide Instagram image
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Fill: white (#FFFFFF)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Outline: 1 to 2px black — subtle, keeps it readable without looking heavy
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Position: bottom-left or bottom-right with 16 to 24px padding from the edge
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quote overlays for Pinterest and Facebook
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Quote graphics perform well on Pinterest and Facebook — a photo of a landscape, a person, or a setting with a meaningful quote or statement in the center or lower third. The typical format:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Font: serif for a warm, editorial feel, or sans-serif for modern clean
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Size: 32 to 48px for a 1200px-wide image
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Fill: white or cream
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Outline: 2px dark gray or black
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Position: center or bottom-center
          </li>
        </ul>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add a caption to your photo in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Text outline for legibility on any background. Social captions, meme text, watermarks.
            No upload. No signup. No tool watermark. Free.
          </p>
          <Link
            href="/tools/add-text-to-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Add Caption, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Meme text ──────────────────────────────────────── */}

        <h2 id="meme-text" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Meme-style text: the exact settings that look right
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Classic image macro meme text — the format used since the early internet and still the most recognized meme style — has a very specific look. Getting it right means matching the exact characteristics that the format established:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Font: Impact (or a similar compressed bold sans-serif).</strong> Impact is a condensed, heavy font that packs a lot of text into a narrow horizontal space. It reads from a distance and has the characteristic compressed-bold look of classic memes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">All-caps text.</strong> Classic meme text is uppercase. The all-caps convention originated partly with Impact font (which reads better in caps) and partly because the format was designed to be declarative and blunt.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Font size: 5 to 8% of image height.</strong> For a 500px-tall image, that is 25 to 40px. For a 1000px-tall image, 50 to 80px. Scale the size so the text occupies roughly one line of height per position (top and bottom).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fill: white (#FFFFFF).</strong>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Outline: black (#000000), 4 to 6px.</strong> The thick black outline is the definitive visual signature of the meme text format. It provides the contrast needed on any background and gives the text its bold, chunky appearance.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Position: top-center for the first line, bottom-center for the punchline.</strong>
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To create a two-caption meme (top text and bottom text): add the top text first and download the result. Then open the downloaded image again in the tool and add the bottom text. This approach lets you position each caption independently.
        </p>

        {/* ── Section 5: Text watermarks ────────────────────────────────── */}

        <h2 id="text-watermarks" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text watermarks: protect your photos without ruining them
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A text watermark protects the image from unauthorized reuse by making it difficult to remove the attribution. A good watermark is visible enough that anyone can see who owns the photo, but unobtrusive enough that it does not destroy the viewing experience. Getting this balance right is a matter of size, position, and opacity.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Settings for a professional text watermark
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text:</strong> your name, domain, or &copy; Year Name. Keep it short — a long domain is more visible than needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Font:</strong> sans-serif, standard weight.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Size:</strong> 16 to 20px for a 1200px-wide image (roughly 1.5% of image width).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fill:</strong> white at 50 to 70% opacity, or gray (#999999) at full opacity.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Outline:</strong> 1px black at 30% opacity, or no outline if the fill is already gray.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Position:</strong> bottom-right is the most conventional. Bottom-left and top-right are also used. Avoid the center — it covers the main subject.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The watermark is baked into the pixel data when you download. It cannot be removed with a text editor. Someone determined to remove it would need to manually clone or inpaint over it in an image editor — which takes effort and usually leaves artifacts, which itself serves as evidence of tampering.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For logo-based watermarks — overlaying a transparent PNG of your logo at a chosen opacity — use the{" "}
          <Link href="/tools/stampit" className="text-[#6366F1] hover:underline">SammaPix Stampit tool</Link>{" "}
          instead. It is designed specifically for batch logo watermarking.
        </p>

        {/* ── Section 6: Outline settings table ────────────────────────── */}

        <h2 id="outline-settings" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Outline settings by use case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A reference table of outline configurations for each common caption type:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Caption type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fill color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Outline color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Outline width</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Social photo caption (Instagram, Facebook)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1 to 2px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bottom-center or bottom-left</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Meme text (top)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">4 to 6px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Top-center</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Meme text (bottom)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">4 to 6px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bottom-center</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Quote overlay (Pinterest, Facebook)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White or cream</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark gray (#333)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Center or bottom-center</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Subtle copyright watermark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White (60% opacity) or gray</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black (30% opacity) or none</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1px or 0px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bottom-right or bottom-left</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a caption to a photo, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/add-text-to-image</strong> in Chrome, Safari, Firefox, or Edge — including on mobile.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photo onto the dropzone</strong> or click to browse. On mobile, this opens your camera roll. The file is read locally — no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type your caption.</strong> The live preview shows the text on your photo as you type. You can see the result before committing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose font, size, and fill color.</strong> Start with white fill and a font size that is 2 to 4% of your image height.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable the outline.</strong> Set outline color to black and width to 2 to 4px. Check the preview — the text should now be readable across all parts of the image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose the position.</strong> Click a preset position or drag the text in the preview. For most social captions, bottom-center works best.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The captioned photo downloads from browser memory. No network request. The tool adds no watermark to the output.
          </li>
        </ol>

        {/* ── Section 8: No watermark ───────────────────────────────────── */}

        <h2 id="no-watermark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why this tool adds no watermark to your photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most free online captioning and text overlay tools add their own watermark to the output image unless you pay for a subscription. This is a common business model: offer the feature for free but embed a logo in the corner that you have to pay to remove. For any professional or public use, this is a significant limitation.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Add Text to Image adds no tool watermark to your output. This is possible because the tool runs entirely in your browser — there is no server processing cost per image, no bandwidth cost for uploads, and no storage cost. The Canvas API compositing happens on your device. The business model does not require per-image watermarking.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What you see in the preview is exactly what you download: your photo with your caption text, and nothing else.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add a caption — no tool watermark, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Your photo downloads with only your text. No branding added. Runs in your browser. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-text-to-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Add Caption, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-text-to-image-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full text overlay guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does adding a caption affect photo quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a caption via the Canvas API changes only the pixels where text is rendered. Background pixels — the parts of the photo not covered by text or its outline — are reproduced exactly from the original image bitmap. There is no resampling, blur, or transformation of the non-text areas.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The quality consideration is the re-encoding step at export. For JPEG inputs, the output is re-encoded at approximately 92% quality (the browser canvas default). One generation of JPEG re-compression is visually negligible for photography at normal viewing sizes. For PNG inputs, the output is lossless — identical to the original pixels in all non-text areas.
        </p>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free caption tools compared: what actually matters
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What matters</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Most free online tools</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix Add Text to Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Tool watermark on output</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes on free plans. Requires paid subscription to remove.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No watermark added. Only your text appears.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File upload to server</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Photo is uploaded to their servers.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. File never leaves your device. Verifiable via DevTools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Configurable text outline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some tools have outline behind a paywall.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full outline control: color, width. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Live preview</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many tools require a submit cycle to see the result.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant live preview updates as you type — no submit needed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works on mobile</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many tools have limited mobile experience.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full mobile support. iOS Safari and Chrome Android. No app install.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required to download without watermark.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No signup. No account. Download immediately.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can confirm this in under two minutes using your browser&apos;s built-in developer tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Clear any existing requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photo, add your caption, and click Download.</strong> Watch the Network panel.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing requests.</strong> No network activity during caption compositing or download. The only requests visible are the initial page load assets. Your photo never leaves your device.
          </li>
        </ol>

        {/* ── Section 12: Related tools ──────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">Add Text to Image</Link></strong>: the tool powering this caption feature. Font, size, color, outline, position. Live preview. No upload. See the complete guide:{" "}
            <Link href="/blog/add-text-to-image-online" className="text-[#6366F1] hover:underline">Add text to an image online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/stampit" className="text-[#6366F1] hover:underline">Stampit (Logo Watermark)</Link></strong>: batch overlay a transparent PNG logo on multiple photos. For logo watermarks rather than text captions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a solid-color border around the image. Useful after captioning to create a complete presentation frame. See the guide:{" "}
            <Link href="/blog/add-border-to-image-online" className="text-[#6366F1] hover:underline">Add a border to an image online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop photos to exact aspect ratios before captioning — 1:1 for Instagram, 16:9 for banners.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: correct the orientation of a photo before captioning.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Add captions, watermark, borders, rotate, and crop — without uploading your photos anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-text-to-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Caption <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/stampit"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Logo Watermark <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/add-border"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Border <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
