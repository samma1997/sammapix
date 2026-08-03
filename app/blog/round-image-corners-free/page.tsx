import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Round the Corners of an Image Free [2026]",
  description:
    "Add rounded corners to any image free — entirely in your browser via Canvas. No upload, no server, no signup. Output is a transparent PNG. Choose your radius. Batch + ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/round-image-corners-free`,
  },
  keywords: [
    "round image corners",
    "rounded corner image",
    "rounded png",
    "add rounded corners to photo",
    "round corners image free",
    "rounded corners online",
    "rounded corner photo",
    "image rounded corners png",
    "add rounded corners online",
    "rounded corner image no upload",
    "round photo corners free",
    "rounded corners transparent png",
    "image border radius online",
    "css border radius image",
  ],
  openGraph: {
    title: "How to Round the Corners of an Image Free [2026]",
    description:
      "Add rounded corners to any image in your browser via Canvas. No upload, no server, no signup. Transparent PNG output. Choose your radius. Batch 20 images, ZIP download. Free.",
    url: `${APP_URL}/blog/round-image-corners-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Round the Corners of an Image Free [2026]",
    description:
      "Rounded corners tool that runs 100% in your browser via Canvas. No upload, no server. Transparent PNG output. Choose any radius. Batch + ZIP. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/round-image-corners-free`;
const POST_TITLE = "How to Round the Corners of an Image Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online rounded-corners tools upload your image to a remote server. SammaPix Round Image runs entirely in your browser using the Canvas API — the file never leaves your device. This guide explains how browser-based corner rounding works, why the output is a transparent PNG, how to choose the right border-radius value for different use cases, and how to batch-process images at once.",
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
    "round image corners",
    "rounded corner image",
    "rounded png",
    "add rounded corners to photo",
    "rounded corners online free",
    "transparent png rounded corners",
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
  name: "How to Round the Corners of an Image Free Without Uploading It",
  description:
    "Add rounded corners to any image in your browser with no file upload, using SammaPix Round Image powered by the HTML Canvas API. Choose your corner radius. The output is a transparent PNG — the corners are genuinely transparent, not white-filled. Supports batch processing and ZIP download.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Round Image (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Round Image tool",
      text: "Go to sammapix.com/tools/round-image in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your images onto the tool",
      text: "Drag one or more images onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select rounded corners mode and set the radius",
      text: "Choose the rounded corners option. Set the corner radius in pixels — for example, 20px for a subtle rounding, 40px for a modern card look, or 50% of the shorter dimension for a pill shape.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Apply",
      text: "The tool draws each image onto an HTML Canvas element with a rounded rectangle clipping path and exports it as a transparent PNG. Processing happens entirely on your device in milliseconds.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download individually or as a ZIP",
      text: "Download each rounded-corner image on its own, or click Download All as ZIP to get all processed files in a single archive. Everything is served from browser memory — no file ever touches a server.",
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
      name: "Does adding rounded corners to an image online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Canva, Adobe Express, and similar services upload your image to their servers for processing. With SammaPix Round Image, no. The corner rounding is applied entirely in your browser using the HTML Canvas API — a built-in browser technology for drawing and compositing images locally. Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the rounded corners output need to be a PNG instead of a JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG does not support transparency. The four corners of a rounded-corner image are genuinely transparent — there are no pixels there, just empty space. If you exported a rounded-corner image as JPEG, the browser would fill those transparent corners with white (or black), producing a square image with rounded corners drawn over a white box. PNG supports alpha channels (transparency), so the corner pixels are genuinely empty. When you place the PNG on any background — a web page, a presentation, a design file — the rounded corners appear correctly without any colored box showing in the corners. This is the only correct output format for images with transparent areas.",
      },
    },
    {
      "@type": "Question",
      name: "What radius value should I use for the corner rounding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the image size and use case. For UI card components: 8 to 16px is the standard range for modern app design. For social media profile pictures with a subtle rounding: 20 to 40px. For a photo card or thumbnail that looks like a card in a web layout: 12 to 24px. For a pill-shaped or stadium shape: set the radius to half the shorter dimension (for a 400x300 image, a radius of 150px makes the left and right sides fully rounded). For a circle: use the Round Image circle mode instead of the rounded corners mode, which handles the circle math automatically. As a general rule, the radius should be proportional to the image size — a 20px radius on a 100px thumbnail looks extreme, while the same 20px on a 1200px image looks barely rounded.",
      },
    },
    {
      "@type": "Question",
      name: "Can I batch add rounded corners to multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Round Image supports batch processing of up to 20 images per session. Drop all your files at once onto the dropzone, set your corner radius, and click Apply. Each image is processed independently through the same Canvas pipeline with the same radius value. When done, you can download each rounded-corner file individually or click Download All as ZIP to get every processed image in a single archive — all from browser memory, with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use rounded corner images in my web project or app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are two approaches. The CSS approach is to use the CSS border-radius property on the image element in your HTML: img { border-radius: 16px; }. This is preferred for web development because the rounding is applied at render time by the browser and does not change the underlying file. The pre-processed PNG approach — using Round Image to bake the corners into a transparent PNG — is preferred when you need the rounded corners to appear correctly in environments that do not support CSS, such as email clients, Microsoft Office documents, PDF files, image-heavy designs in Figma or Canva, presentation slides, or places where you are embedding an image file and cannot control the styling. For web pages where you control the CSS, use border-radius. For everything else, use a pre-processed transparent PNG.",
      },
    },
    {
      "@type": "Question",
      name: "Does rounding the corners affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Corner rounding via Canvas clipping is a geometric operation that does not modify any pixel values inside the rounded rectangle. The canvas draws the original image with a rounded rectangle clipping path applied. The pixels inside the rounded corners area are identical to the source image pixels at those coordinates. The output is a lossless PNG. The only difference from the original is that the four corner areas are now transparent instead of containing the original corner pixels. No compression, no re-encoding, no quality loss applies to the visible image content.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when I round my image corners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your image into the SammaPix Round Image tool and click Apply. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool first loads. During corner rounding and download, you will see zero outgoing requests. The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the rounded-corner output is downloaded via a blob: URL — no network call is made.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RoundImageCornersFree() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="round-image-corners-free"
        description="Adding rounded corners to an image should not require uploading your photo to a third-party server. SammaPix Round Image applies corner rounding entirely in your browser via the Canvas API — no upload, no signup, no server. The output is a transparent PNG, which means the rounded corners appear correctly on any background without a white box. Here is everything about how it works, how to choose the right radius, and when to use it."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most rounded-corners tools upload your image" },
          { id: "how-browser-corner-rounding-works", title: "How browser-based corner rounding actually works" },
          { id: "why-transparent-png", title: "Why the output must be a transparent PNG" },
          { id: "choosing-radius", title: "How to choose the right corner radius for your use case" },
          { id: "css-vs-png", title: "CSS border-radius vs pre-processed PNG: which one to use" },
          { id: "batch-processing", title: "How to batch add rounded corners to multiple images" },
          { id: "step-by-step", title: "How to round image corners free, step by step" },
          { id: "use-cases", title: "Rounded corner use cases: UI design, email, slides, and more" },
          { id: "quality-impact", title: "Does rounding corners affect image quality?" },
          { id: "comparison-table", title: "Browser-based vs upload-based rounded corners tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online rounded-corners tools (Canva, Adobe Express, various smaller sites) upload your file to a remote server. For product shots, UI assets, and personal photos, that is an unnecessary step.",
          "SammaPix Round Image runs entirely in your browser using the HTML Canvas API. Your file never leaves your device.",
          "The output is always a transparent PNG — the four corners are genuinely empty (alpha=0), not white-filled. This is essential for placing the rounded image on any background color.",
          "Choose any corner radius in pixels. Small values (8 to 16px) produce a subtle card look. Large values (50% of shorter dimension) produce a pill or stadium shape.",
          "Use CSS border-radius for web pages where you control the styling. Use a pre-processed PNG for emails, Office documents, PDFs, Figma, and anywhere CSS does not apply.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A designer working at a monitor with UI design layouts on screen, representing the use of rounded corner images in modern app and web interface design."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Rounded corners are a foundational element of modern UI design — and the PNG needs genuine transparency, not a white box.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add rounded corners to your images right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Round Image runs entirely in your browser via the Canvas API. Transparent PNG output.
              Any corner radius. Batch 20 images at once. Download individually or as ZIP. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/round-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Round Image, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
          The problem: most rounded-corners tools upload your image
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You need a product photo with rounded corners for an app mockup. Or a team photo with a subtle corner radius for a presentation slide. Or a batch of UI screenshots with consistent 16px corner rounding for a design deliverable. You search for &ldquo;round image corners online free&rdquo; and land on one of the popular tools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the image in. A progress bar appears. The file uploads to their server, gets processed remotely, and you receive the rounded image back. Applying a rounded rectangle clip path to an image is a three-line Canvas operation. There is no reason it needs a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Sending product shots and UI screenshots to unknown services is a minor risk. Sending mockups of unreleased products, confidential interface designs, or client work under NDA to an ad-supported web tool is a bigger one. Every upload to an unknown service is a risk you are accepting without a clear need.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/round-image" className="text-[#6366F1] hover:underline">SammaPix Round Image</Link>{" "}
          to apply rounded corners to images entirely inside your browser. No server is involved at any point. The tool uses the HTML Canvas API — a built-in browser technology that has been standard in every modern browser for over a decade. Corner rounding is a drawing operation, and modern browsers handle it locally and instantly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an image into SammaPix Round Image, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The image is decoded into pixel data, passed to an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>,{" "}
          clipped with a rounded rectangle path, and exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your image to any remote server.
        </p>

        {/* ── Section 2: How browser corner rounding works ───────────────── */}

        <h2 id="how-browser-corner-rounding-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based corner rounding actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you predict the output and choose the right settings. Here is what happens under the hood when you click Apply with rounded corners mode selected:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the image from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The browser decodes the image into a bitmap.</strong> The compressed image file (JPEG, PNG, WebP, etc.) is decoded into a raw pixel array — an ImageBitmap object in browser memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A Canvas element is created at the same dimensions as the input image.</strong> Unlike circle crop, which may change the canvas size, rounded corners preserve the original image dimensions. A 1200x900 image produces a 1200x900 canvas.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A rounded rectangle clipping path is applied.</strong> The canvas 2D context calls{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">ctx.roundRect()</code>{" "}
            (or equivalent{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">arcTo</code>{" "}
            calls for older browser compatibility) with the chosen corner radius, then{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">ctx.clip()</code>{" "}
            to restrict all subsequent drawing to inside that rounded rectangle.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The image is drawn onto the canvas.</strong> The full image is drawn at position (0, 0). Only the pixels within the rounded rectangle clip path are rendered — the four corner areas remain transparent alpha.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported as a transparent PNG and offered for download.</strong> The canvas is converted to a PNG Blob — the only format that correctly preserves the transparent corner pixels. The Blob is served via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">roundRect() method</a>{" "}
          is supported in all modern browsers as of 2023. For older browsers, the equivalent four-arc construction using{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">arcTo()</code>{" "}
          achieves the same result. The Canvas API is a browser standard since HTML5 and has been available in Chrome, Safari, Firefox, and Edge for over a decade.
        </p>

        {/* ── Section 3: Why transparent PNG ────────────────────────────── */}

        <h2 id="why-transparent-png" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why the output must be a transparent PNG
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A rounded rectangle removes the four corner areas of the image. Those corners need to be <strong className="text-gray-800 dark:text-[#E5E5E5]">transparent</strong> — meaning they have no color and show through to whatever is behind the image. If the corners are transparent, the image looks correctly rounded on any background: white, dark, colored, or textured.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG does not support transparency. A JPEG export fills all transparent pixels with a solid color — usually white. The result is that the corners of your &ldquo;rounded&rdquo; image are actually filled with white rectangles. On a white web page background this is invisible. On any other background — a dark mode UI, a colored slide, a design with a gradient — the white corners create an ugly white box in each corner.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PNG supports an alpha channel. Each pixel has a fourth value (0 to 255) that controls opacity. Corner pixels have alpha=0 (fully transparent). The image content pixels inside the rounded rectangle have alpha=255 (fully opaque). When placed on any background, the corners show whatever is behind, and the image content is fully visible. This is the correct behavior.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Corner behavior</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">On a dark or colored background</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG with transparency (correct)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Corner pixels are alpha=0. Genuinely transparent.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Rounded corners look correct. Background shows through corners. No box.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG (wrong)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Corner pixels are filled with white. No transparency.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White squares appear in each corner. The image looks like a square with a rounded rectangle drawn on top of a white background.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Choosing the radius ────────────────────────────── */}

        <h2 id="choosing-radius" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to choose the right corner radius for your use case
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The corner radius is the most impactful design decision when rounding corners. It determines how pronounced the rounding looks and how it reads visually at different sizes. Here are reference values for common use cases:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Radius</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Visual result</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommended for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">4 to 8px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Very subtle rounding. Barely visible at small sizes. Softens sharp corners without dramatically changing the shape.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Small UI thumbnails, icon backgrounds, table cell images.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">12 to 20px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Clearly rounded. The standard &ldquo;card&rdquo; look used in iOS, Android, and most modern web interfaces.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Product cards, app mockups, team photos in grid layouts, blog post thumbnails.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">24 to 40px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Strong rounding. Visually distinctive, gives a friendly or bubbly appearance. Corners are clearly prominent.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Social media cards, presentation slides, marketing visuals, app store screenshots.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">50% of shorter dimension</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Pill or stadium shape. The short sides become fully semicircular. For square images this produces a circle (equivalent to circle mode).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Pill-shaped avatars, badge-style elements, landscape photos with a capsule shape.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Proportional radius rule
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The visual weight of a corner radius depends heavily on the image size. A 20px radius on a 100x100 thumbnail looks like a very round shape — the corners are 20% of the dimension. The same 20px radius on a 1200x900 photo looks barely rounded — the corners are less than 2% of the width. A good rule of thumb is to keep the radius between 1% and 3% of the shorter image dimension for a typical card look. For a 1200x900 image, that is 9 to 27px.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many design systems define a fixed set of radius tokens: 4px (xs), 8px (sm), 12px (md), 16px (lg), 24px (xl), 9999px (full/pill). If you are matching an existing design system, use the token values from that system for visual consistency.
        </p>

        {/* ── Section 5: CSS vs PNG ──────────────────────────────────────── */}

        <h2 id="css-vs-png" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          CSS border-radius vs pre-processed PNG: which one to use
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most practical decision for anyone adding rounded corners to images for the web. Both approaches produce rounded corners that look identical. The difference is in how and where the rounding is applied.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          CSS border-radius: use for web pages you control
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In HTML/CSS, you can round the corners of any image element with a single line:
        </p>

        <pre className="text-xs bg-gray-100 dark:bg-[#2A2A2A] text-gray-700 dark:text-[#D4D4D4] rounded-md px-4 py-3 mb-4 overflow-x-auto font-mono">
          {`img.rounded { border-radius: 16px; }`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the correct approach for web pages because it keeps the original file untouched, the rounding is responsive (you can change the radius without regenerating the file), and it adds zero overhead to the file. The underlying JPEG or WebP file stays compressed and small. The browser applies the rounding at render time, which costs essentially nothing.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Pre-processed transparent PNG: use everywhere else
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          CSS border-radius only works in web browsers. For any environment where you cannot control the CSS, you need to bake the rounded corners into the image file itself as a transparent PNG. The specific situations where pre-processed PNG is the right choice include:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Email clients.</strong> Gmail, Outlook, and Apple Mail have limited and inconsistent CSS support. Border-radius is supported in some clients and ignored in others. A pre-processed PNG is the only reliable way to show rounded corners in an email campaign.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Microsoft Office (Word, PowerPoint, Excel).</strong> Office applications do not render CSS. When you insert an image into a Word document or PowerPoint slide, you cannot use border-radius. A transparent PNG with baked-in rounded corners is the only way to achieve the effect.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PDF documents.</strong> Embedded images in PDFs are static. There is no CSS rendering layer. A transparent PNG with rounded corners embedded in a PDF will display with correct rounded corners in any PDF viewer.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Figma, Canva, and design tools.</strong> When compositing images in a design tool, using a pre-processed transparent PNG means the rounded corners are part of the asset and will be consistent across any context the asset is used in, without relying on per-instance settings.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Social media platforms.</strong> When posting an image as a photo to Instagram, Twitter, or LinkedIn, you cannot apply CSS. A pre-processed rounded PNG will display with rounded corners in any post where the platform displays it without cropping or reformatting.
          </li>
        </ul>

        {/* ── Section 6: Batch processing ───────────────────────────────── */}

        <h2 id="batch-processing" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to batch add rounded corners to multiple images
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding rounded corners to one image is simple. The value of batch processing appears when you have a set of product photos for an e-commerce catalog, a collection of app screenshots for a store listing, a team photo grid, or a batch of images for a design system component library. You need every image to have the same radius value, and doing them one by one is repetitive and slow.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Round Image supports batch processing natively. Drop up to 20 images at once onto the dropzone. All files are loaded into browser memory simultaneously. Set your corner radius once, and that value is applied identically to every image in the batch. The Canvas pipeline processes each file sequentially in milliseconds.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When all images are processed, you can download each transparent PNG individually or click Download All as ZIP to get the full batch in a single archive — assembled in-browser with no server involved.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add rounded corners to your images in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Batch-process up to 20 images. Any corner radius. Transparent PNG output. Download all as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/round-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Round Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 7: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to round image corners free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for a batch of 20 images:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/round-image</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images onto the dropzone</strong> or click to browse. You can select multiple files at once. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files are loaded into browser memory immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select rounded corners mode.</strong> Choose the rounded corners option (as opposed to circle mode).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set your corner radius.</strong> Type a pixel value or use the slider. For a typical card look, 16px is a good starting point. For a preview of how the radius looks, the live preview updates as you adjust the value.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply.</strong> Each image is processed through the Canvas pipeline in sequence. A preview of each rounded-corner PNG appears below, with the transparent corners shown as a checkerboard pattern — the standard visual indicator for transparency.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download icon next to any image, or click Download All as ZIP to get everything in one archive. No network request occurs. Files are served from browser memory.
          </li>
        </ol>

        {/* ── Section 8: Use cases ───────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Rounded corner use cases: UI design, email, slides, and more
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical scenarios where you need a pre-processed rounded corner PNG rather than CSS are more numerous than most people expect:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          App store screenshots
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Apple App Store and Google Play feature screenshots are often displayed with rounded corners in the store listing. Developers and designers typically prepare screenshots with pre-baked rounded corners matching the device frame (typically 20 to 40px for full-size screenshots) so the screenshots look polished in the listing. SammaPix Round Image lets you batch-process all screenshots to a consistent radius in one session.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Email marketing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Email is the environment where CSS border-radius is least reliable. Major email clients — Outlook on Windows (which uses Word&apos;s rendering engine), Gmail in some mobile contexts — either do not support border-radius or render it inconsistently. Pre-processing your marketing images with rounded corners as transparent PNGs, then placing them on a background color in your email template, is the most reliable way to achieve a consistent rounded-corner look across all clients.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          PowerPoint and Google Slides
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both PowerPoint and Google Slides have a built-in &ldquo;Picture Effects&rdquo; rounding feature, but it produces inconsistent results and is not easily applied in batch. Inserting a pre-processed transparent PNG with baked-in rounded corners gives you pixel-perfect control over the corner radius and ensures the image looks the same regardless of which version of the tool opens the presentation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Product images for e-commerce
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many e-commerce platforms (Shopify, WooCommerce, Etsy) display product images with square or near-square dimensions. Adding a subtle 8 to 12px corner radius to product photos before uploading creates a softer, more premium look — especially for white-background product shots. The transparent corners blend seamlessly with the white page background.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your images stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Batch 20 files.
            Any corner radius. Transparent PNG output. ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/round-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Round Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/crop-image-into-circle-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Circle crop guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does rounding corners affect image quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. Corner rounding via Canvas clipping is a geometric masking operation. The pixels inside the rounded rectangle are identical to the source image pixels at those coordinates — no quality loss of any kind is applied to the visible image content.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The only pixels that change are the four corner areas — and they change from &ldquo;original image pixels&rdquo; to &ldquo;transparent&rdquo;. The pixel values within the visible rounded rectangle are identical to the source image. This is a pure masking operation, not a re-encoding or re-compression.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The output format is always a lossless PNG. Unlike JPEG, PNG does not compress image data with perceptual loss. The visible pixel values in the output are bit-for-bit identical to those in the source image at the same coordinates. One note: the corners of the rounded rectangle shape — the curved boundary pixels — are anti-aliased by the Canvas API, which means they have sub-pixel alpha values (partial transparency) at the edges. This is correct and intentional behavior that produces smooth-looking curved edges rather than jagged stair-steps. It is the same behavior as the CSS border-radius property in browsers.
        </p>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based rounded corners tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool for rounding image corners online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (Canva, Fotor, various sites)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. For confidential designs or NDA-protected product images, this is a risk.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Output format</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some export correct transparent PNG; others export JPEG with white corners or add a white background canvas.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always a genuine transparent PNG — corners are alpha=0, not white-filled.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch processing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most tools process one image at a time for free. Batch requires a paid plan.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Up to 20 images per session. Download all as ZIP. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom radius</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many tools offer only preset options (small / medium / large) rather than precise pixel values.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any radius value in pixels. Full precision to match your design system token values.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant on modern hardware. No network latency.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required. Some tools add a watermark on free downloads.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. No signup. No watermark on output.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires internet to upload and process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, corner rounding works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari enable the Develop menu first in Settings &#8250; Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel in DevTools. Clear any existing requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images and click Apply.</strong> Watch the Network panel as the tool processes each file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during corner rounding or download. The only requests visible are the initial page load assets (JavaScript, CSS). Nothing carries your image to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the rounded PNG is downloaded via a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL — no network call is made at any stage of the process.
        </p>

        {/* ── Section 12: Related tools ─────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here is when to use each alongside Round Image:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/round-image" className="text-[#6366F1] hover:underline">Round Image</Link></strong>: add rounded corners (any radius) or crop to a perfect circle. This is the tool this article is about. Also see the guide{" "}
            <Link href="/blog/crop-image-into-circle-online" className="text-[#6366F1] hover:underline">how to crop an image into a circle online</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a colored border around any image — white for Instagram, black for print, or any custom HEX color. Combine with Round Image: first round the corners, then add a border in Add Border tool using inset mode for a subtle frame effect around the rounded image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios before rounding. If your source images are different sizes, crop them all to the same ratio first for visual consistency in the rounded set. See{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">how to crop photos to perfect ratios</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: AI-powered background removal. Remove a busy background before applying rounded corners so only the subject appears inside the rounded shape — with a completely transparent background behind both the subject and the corner areas.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: correct the orientation of any image before rounding corners. Rotates 90/180/270 degrees or any custom angle, entirely in-browser.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Round corners, crop to circle, add borders, remove backgrounds, rotate, and resize without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/round-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Round Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            <Link
              href="/tools/remove-bg"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove Background <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
