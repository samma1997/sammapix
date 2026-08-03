import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Add Text to an Image Online Free [2026]",
  description:
    "Add text to any image online — entirely in your browser via Canvas. Choose font, size, color, outline, and position. Live preview. No upload, no server, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-text-to-image-online`,
  },
  keywords: [
    "add text to image online",
    "add text to image free",
    "write on image online",
    "text on photo free",
    "add words to photo",
    "text over image online",
    "add text to picture online",
    "write text on photo free",
    "add text to image no upload",
    "text on image browser",
    "type on photo online",
    "add text to jpg online",
    "add text to png online",
    "image text editor online",
    "photo text adder free",
  ],
  openGraph: {
    title: "Add Text to an Image Online Free [2026]",
    description:
      "Add text to any image in your browser via Canvas. No upload, no server, no signup. Choose font, size, color, outline, position. Live preview. Free.",
    url: `${APP_URL}/blog/add-text-to-image-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Text to an Image Online Free [2026]",
    description:
      "Image text tool that runs 100% in your browser via Canvas. No upload, no server. Custom font, outline, position, live preview. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-text-to-image-online`;
const POST_TITLE = "Add Text to an Image Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online image text tools upload your photo to a remote server. SammaPix Add Text to Image runs entirely in your browser using the Canvas API — the file never leaves your device. This guide explains how browser-based text overlay works, how to choose font, color, outline, and position, how to get readable text on any background, and how to verify no upload happens.",
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
    "add text to image online",
    "add text to image free",
    "write on image",
    "text on photo free",
    "add words to photo",
    "image text editor online",
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
  name: "How to Add Text to an Image Online Without Uploading It",
  description:
    "Add text to any image in your browser with no file upload, using SammaPix Add Text to Image powered by the HTML Canvas API. Choose font, size, color, outline, and position. Live preview. No upload.",
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
      text: "Go to sammapix.com/tools/add-text-to-image in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your image onto the tool",
      text: "Drag your image onto the dropzone or click to browse. The file is read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Type your text and choose font, size, and color",
      text: "Enter your text in the text field. Select a font family, set the font size in pixels, and choose the fill color using the color picker. A live preview updates instantly as you type.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Add a text outline if needed",
      text: "Enable the outline option and choose an outline color and width in pixels. An outline (also called a stroke) makes text readable on any background — dark text readable on light backgrounds and light text readable on dark ones.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Position the text on the image",
      text: "Choose a preset position (top-left, top-center, top-right, center, bottom-left, bottom-center, bottom-right) or drag the text to an exact position in the preview.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download the result",
      text: "Click Download to save the image with the text baked into it. The export runs via the Canvas API and is served from browser memory — no file ever touches a server.",
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
      name: "Does adding text to an image online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Canva, Adobe Express, and similar services upload your image to their servers for processing. With SammaPix Add Text to Image, no. Text is composited entirely in your browser using the HTML Canvas API — a built-in browser technology for drawing and compositing graphics locally. Your file never leaves your device. You can verify this by opening your browser&apos;s Network inspector (F12) and watching for outgoing requests while the tool processes your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my text disappear into the background? How do I make it readable on any image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common issue with adding text to images is legibility: white text disappears on light backgrounds, black text disappears on dark backgrounds. The solution is a text outline (stroke). Enable the outline option in the tool, choose an outline color that contrasts with both the text fill and the background, and set the outline width to 2 to 5 pixels. For example, white text with a 3px black outline is readable on both dark and light backgrounds simultaneously. This is the technique used for subtitles, meme text, and most sports graphics. The Canvas API renders the outline perfectly at pixel precision.",
      },
    },
    {
      "@type": "Question",
      name: "What fonts can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool uses fonts available in your browser via the Canvas API. This includes a set of standard system fonts (sans-serif, serif, monospace) plus any web fonts loaded by the page. For most use cases — adding a label, caption, watermark text, or meme-style text — the available font selection is more than adequate. The Canvas fillText and strokeText functions render text at any size with the chosen font family and style.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add text to a PNG with a transparent background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If your input is a PNG with transparency, the Canvas element is configured to preserve the alpha channel. The text is composited on top of the image content while transparent areas remain transparent. The output is exported as PNG to maintain the alpha channel. The text fill and outline colors are composited using the standard canvas compositing mode, which handles transparency correctly. Note: if you start with a JPEG (which has no transparency), the output will also be JPEG and any transparent areas will be filled with white.",
      },
    },
    {
      "@type": "Question",
      name: "Is the text permanent in the output file? Can it be edited later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it is permanent in the exported file. When you download the image, the text is baked into the pixel data of the canvas output — it is no longer a separate text layer. This is the same as flattening a Photoshop layer: the text becomes part of the image pixels. You cannot select or edit it with a text tool afterward. If you need to make changes, keep your original image file and use the tool again with the updated text. This also means the text cannot be removed by anyone who receives the image — useful for copyright notices and watermarks.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add a copyright notice or text watermark to a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Add Text to Image tool to type your copyright notice — for example, &copy; 2026 Your Name or &copy; yourdomain.com — and position it in a corner of the image. Choose a small font size (16 to 24px for a 1200px-wide image), a semi-transparent or solid fill color, and add an outline for visibility. The text is baked permanently into the export. For adding a logo-based watermark instead of text, use the SammaPix Stampit tool, which overlays a PNG logo at any opacity and position.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your image into the SammaPix Add Text to Image tool and apply your text. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool first loads. During text compositing and download, you will see zero outgoing requests. The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the result is downloaded via a blob: URL — no network call carries your image to any server.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddTextToImageOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-text-to-image-online"
        description="Adding text to a photo should not require handing your image to a third-party server. SammaPix Add Text to Image runs entirely in your browser via the Canvas API — no upload, no signup, no server. Choose your font, size, color, outline, and position. A live preview updates as you type. Here is everything about how it works, how to make text readable on any background, and when to use each option."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={10}
        headings={[
          { id: "the-upload-problem", title: "The problem: most image text tools upload your photo" },
          { id: "how-browser-text-works", title: "How browser-based text overlay actually works" },
          { id: "font-size-color", title: "Choosing font, size, and color" },
          { id: "outline-readability", title: "Text outline: the key to readability on any background" },
          { id: "positioning-text", title: "Positioning text on your image" },
          { id: "step-by-step", title: "How to add text to an image online, step by step" },
          { id: "copyright-watermark", title: "Adding a copyright notice or text watermark" },
          { id: "quality-impact", title: "Does adding text affect image quality?" },
          { id: "comparison-table", title: "Browser-based vs upload-based image text tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online image text tools (Canva, Adobe Express, BeFunky) upload your file to a remote server. For personal photos, sensitive documents, and private images, that is an unnecessary risk.",
          "SammaPix Add Text to Image runs entirely in your browser using the HTML Canvas API. Your file never leaves your device.",
          "Supports any font, any size, any fill color, and a configurable text outline (stroke) for legibility on any background.",
          "Live preview updates as you type — no submit-and-wait cycle.",
          "Text is baked permanently into the exported image pixel data — useful for copyright notices and text watermarks that cannot be removed.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person working on a laptop compositing text and graphics, representing the need to add text to images online without uploading to unknown servers."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding text to an image should not require handing your photo to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add text to your images right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Add Text to Image runs entirely in your browser via the Canvas API. Choose font, size, color,
              and outline. Live preview. No upload. No signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/add-text-to-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Add Text to Image, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/stampit"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Logo Watermark (Stampit) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/add-border"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Add Border <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most image text tools upload your photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You want to write a label on a product photo. Add your website to a photo before sharing it. Put a name on an event image. Overlay a quote on a landscape shot. You search for &ldquo;add text to image online&rdquo; and you land on one of the popular tools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the image in. A progress bar appears. The file uploads to their server, gets processed remotely, and you get the result back. Compositing text onto an image is one of the simplest operations the HTML Canvas API was designed for. There is no reason it needs a server — any modern browser can do it locally in milliseconds.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a product photo, the upload is an inconvenience. But if the image is a scanned document, a personal photo, a medical record, or a private image you are annotating before sending to a specific person — every upload to an unknown service is a risk you are accepting without needing to.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">SammaPix Add Text to Image</Link>{" "}
          to overlay text on images entirely inside your browser. No server is involved at any point. The tool uses the HTML Canvas API — a built-in browser technology for drawing, compositing, and exporting graphics locally. Writing text onto a Canvas element is one of its core design purposes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an image into SammaPix Add Text to Image, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The image is decoded into pixel data and drawn onto an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>.{" "}
          Your text is rendered directly onto the canvas using{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillText</code>{" "}
          and{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeText</code>,{" "}
          and the result is exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your image to any remote server.
        </p>

        {/* ── Section 2: How browser text works ────────────────────────────── */}

        <h2 id="how-browser-text-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based text overlay actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you predict the output and know what controls matter. Here is what happens under the hood when you type text and click Download:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the image from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The browser decodes the image into a bitmap.</strong> The compressed image file (JPEG, PNG, WebP, etc.) is decoded into a raw pixel array — an ImageBitmap object in browser memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A Canvas element is created at the same dimensions as the image.</strong> The canvas matches the original image size exactly. No resize or crop happens unless you choose it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The image is drawn onto the canvas.</strong> The full original image is composited as the background layer, preserving all pixel values.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Text is rendered on top using the Canvas 2D text API.</strong> The canvas context sets the font (family + size), fill color, and outline (stroke) configuration. If an outline is enabled,{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeText</code>{" "}
            is called first (to draw the outline behind the fill), then{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillText</code>{" "}
            renders the fill color on top. This produces crisp, legible text at any size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported and offered for download.</strong> The canvas is converted to a Blob using the same format as the input where possible. The Blob is served via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas 2D text API has been a browser standard since HTML5 and is supported in every modern browser including Chrome, Safari, Firefox, and Edge. It is the same technology used by browser-based graphics editors, charting libraries, and game UIs. Rendering text on an image is one of its primary use cases.
        </p>

        {/* ── Section 3: Font, size, color ──────────────────────────────────── */}

        <h2 id="font-size-color" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Choosing font, size, and color
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The three core parameters for text on an image are font family, font size, and fill color. Getting these right determines whether your text looks intentional or like an afterthought.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Font family
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API renders any font available in the browser. Common choices and their typical use cases:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Sans-serif (Arial, Helvetica).</strong> Clean and readable at any size. Best for captions, labels, product annotations, and event text. Works well on both light and dark backgrounds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Serif (Georgia, Times New Roman).</strong> Formal and editorial feel. Good for quotes on photography, date stamps on event photos, and print-style annotations.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Monospace (Courier).</strong> Technical and code-adjacent. Useful for watermarking with version numbers, file identifiers, or technical annotations.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Impact (when available).</strong> Bold and compressed. The classic font for meme-style text. Pairs with a thick white or black outline for maximum visibility on any background.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Font size
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Font size is specified in pixels and should be chosen relative to the image dimensions:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Image width</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommended size range</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">800px wide</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">18 to 28px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Subtle watermark, small caption, copyright notice.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">1200px wide</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">28 to 48px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard caption, label, event name, product annotation.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">1920px wide (or more)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">48 to 80px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Large headline text, banner title, presentation slide annotation.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Any size (meme text)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">5 to 10% of image height</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Classic meme-style text. Large, bold, with thick outline. See the caption article for details.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Fill color
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fill color is the main color of the text characters. The color picker accepts any HEX or RGB value. Common choices:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">White (#FFFFFF) with a black outline.</strong> The most universally visible combination. Works on dark, light, or mixed backgrounds. Standard for meme text, subtitles, and video captions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Black (#000000) with a white outline.</strong> Works well on light backgrounds. Good for adding a label to a light product photo or a name to a portrait shot.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Brand color with a dark outline.</strong> If you are annotating marketing images, using your brand HEX color creates consistent branded assets. Always pair with a contrasting outline.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Semi-transparent gray.</strong> For subtle watermark text that does not overpower the image content. Achieved by setting the fill color to a gray with reduced opacity — for example, rgba(128, 128, 128, 0.5).
          </li>
        </ul>

        {/* ── Section 4: Outline readability ─────────────────────────────────── */}

        <h2 id="outline-readability" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Text outline: the key to readability on any background
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The single biggest reason text on images looks unprofessional or becomes unreadable is the absence of an outline. A text outline — also called a stroke in Canvas terminology — is a border drawn around each character that contrasts with both the fill color and the background.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the problem an outline solves: a photo has areas of many different brightnesses. White text is invisible over a bright sky. Black text is invisible over a dark shadow. Any single-color text will disappear into some part of a typical photograph. An outline creates a guaranteed contrast layer between the text fill and whatever the background happens to be.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API renders the outline (stroke) before the fill, so the fill sits cleanly on top of the outline without color bleeding. This order matters — it is why the tool calls{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">strokeText</code>{" "}
          before{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillText</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Recommended outline configurations
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fill color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Outline color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Outline width</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Meme / social caption</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3 to 5px (relative to font size)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Photography label</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark gray (#333)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1 to 2px (subtle)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Product annotation on white bg</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None needed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">0px (outline disabled)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Subtle copyright watermark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White (50% opacity)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Black (30% opacity)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1px</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The outline width is specified in pixels in the tool. For a 36px font, a 3px outline is a good starting point. For very large text (72px or more), a 4 to 6px outline reads better. For small watermark text (16 to 20px), a 1px outline is enough without making the text look heavy.
        </p>

        {/* ── Section 5: Positioning text ───────────────────────────────────── */}

        <h2 id="positioning-text" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Positioning text on your image
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Position determines where on the image the text appears. The tool provides preset positions for common placements and allows you to drag the text to an exact position in the preview.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Top positions (top-left, top-center, top-right).</strong> Good for titles, event dates, and headlines placed above the main subject.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Center.</strong> For large quote text or bold statements centered over the image. Works best on images with a clean central area — sky, water, or a plain background behind the main subject.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bottom positions (bottom-left, bottom-center, bottom-right).</strong> The most common placement for captions, copyright notices, and social handles. Bottom-center is the standard for documentary-style captions. Bottom-right is the most common for watermarks because it is visible but not obtrusive.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API positions text using x and y coordinates measured in pixels from the top-left corner of the canvas. The tool translates preset position names into these coordinates based on the image dimensions and font metrics (measured height and width of the rendered text). This ensures the text always fits within the image boundaries regardless of the combination of font and size chosen.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add text to your images in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Font, size, color, outline, position. Live preview. No upload. No signup. Free.
          </p>
          <Link
            href="/tools/add-text-to-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Add Text to Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add text to an image online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process — from dropping the image to downloading the result — takes under a minute:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/add-text-to-image</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your image onto the dropzone</strong> or click to browse. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. The file is loaded into browser memory immediately — no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type your text in the text field.</strong> The live preview updates instantly as you type. You can see exactly how the text will look on the image before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your font family and size.</strong> Select from the available fonts and set the size in pixels. The preview updates in real time.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set your fill color.</strong> Click the color picker to choose any color. For maximum versatility, start with white (#FFFFFF) and add a dark outline.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable the outline if needed.</strong> Toggle the outline option, choose the outline color, and set the width. A 2 to 4px black outline on white text is readable on any background.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose the text position.</strong> Click a preset position (top-left, center, bottom-right, etc.) or drag the text in the preview to set an exact location.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The canvas is exported as a JPEG or PNG (matching your input format) and downloaded directly from browser memory. No network request occurs.
          </li>
        </ol>

        {/* ── Section 7: Copyright watermark ────────────────────────────────── */}

        <h2 id="copyright-watermark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Adding a copyright notice or text watermark to a photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One of the most practical uses for this tool is adding a copyright notice or a domain watermark to photos before sharing them online. Here is the approach that works best:
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a text watermark, type your notice — for example, &copy; 2026 lucasammarco.com or &copy; YourBrand — and position it in the bottom-right or bottom-left corner. Choose a font size that is visible but not distracting: for a 1200px-wide photo, 18 to 24px is a good range. Use a semi-transparent fill (for example, white at 60% opacity) paired with a 1px dark outline. This makes the watermark readable without dominating the image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Unlike many free online text tools, SammaPix does not add its own watermark to your output. The only text in the exported image is the text you chose to add. This matters for professional use: a free tool that brands your photos with its own logo is not actually free.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For logo-based watermarks — overlaying a transparent PNG logo at a chosen opacity — the{" "}
          <Link href="/tools/stampit" className="text-[#6366F1] hover:underline">SammaPix Stampit tool</Link>{" "}
          is designed for exactly that use case. It applies a PNG watermark to a batch of photos in one operation, with opacity and position control. Use Add Text to Image for text watermarks and Stampit for logo watermarks.
        </p>

        {/* ── Section 8: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does adding text affect image quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding text through the Canvas API affects only the pixels where text is rendered. The underlying image pixels — the areas not covered by text or its outline — are reproduced exactly from the original image bitmap. There is no resampling, rescaling, or transformation of the background image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The one quality consideration is the re-encoding step at export. If your input is a JPEG, the output is re-encoded as JPEG at approximately 92 percent quality (the browser default for canvas.toBlob). This is one generation of re-compression — visually negligible for normal photography at standard viewing sizes. For PNG inputs, there is zero quality loss because PNG is a lossless format.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Input format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality impact</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-compression cycle at ~92% quality. Visually negligible.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sufficient for social media, web, and standard print. Imperceptible at normal viewing sizes.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero pixel-level quality loss. PNG is lossless.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Ideal for design assets, screenshots, and images with transparency where exact pixels matter.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-encoding cycle at high quality. Good browser support.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good for web-optimized output. Chrome and Edge handle WebP canvas export natively.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your images stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Font, outline, position, live preview. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-text-to-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Add Text to Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-caption-to-photo-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Caption guide (social, meme, watermark) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based image text tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool for adding text to images online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (Canva, Adobe Express, BeFunky)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. You trust their security and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Watermark on output</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many free plans add the tool&apos;s own watermark to your image.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No watermark added by the tool. Only the text you choose appears in the output.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Outline (stroke) support</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Available in most tools, sometimes behind a paid tier.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in. Any color, any width in pixels. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Slow on large images or poor connections.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant on modern hardware. Live preview updates as you type. No network latency.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required for downloading or removing the tool watermark.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. No signup. Download immediately.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires internet to upload and process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, text compositing works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel in DevTools. Clear any existing requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your image, type text, and click Download.</strong> Watch the Network panel throughout.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during text compositing or download. The only requests are the initial page load assets (JavaScript, CSS). Nothing carries your image to any server.
          </li>
        </ol>

        {/* ── Section 11: Related tools ──────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here is when to use each in relation to text overlay:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">Add Text to Image</Link></strong>: the tool this article covers. Font, size, color, outline, position. Live preview. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/stampit" className="text-[#6366F1] hover:underline">Stampit (Logo Watermark)</Link></strong>: overlay a transparent PNG logo watermark on a batch of photos. For logo-based watermarks rather than text.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a solid-color border (white, black, or custom) around the image. Useful after adding text for a complete photo presentation. See the guide{" "}
            <Link href="/blog/add-border-to-image-online" className="text-[#6366F1] hover:underline">Add a border to an image online free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios before adding text — useful when you need the final image in a specific format like 1:1 for Instagram or 16:9 for a banner.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: correct the orientation of a photo before adding text. Useful when the image came in sideways from a phone camera.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Add text, watermark, borders, rotate, crop, and compress without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-text-to-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Text to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
