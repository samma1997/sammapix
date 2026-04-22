import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker [2026]",
  description:
    "How to pull exact HEX, RGB, or HSL values from any image plus build a 6-color brand palette — free, in your browser, no upload. Includes the k-means logic behind palette extraction.",
  alternates: {
    canonical: `${APP_URL}/blog/extract-brand-colors-from-image-2026`,
  },
  keywords: [
    "extract colors from image",
    "image color picker",
    "hex from image",
    "rgb from image",
    "hsl color picker",
    "brand colors from logo",
    "palette extractor",
    "dominant colors image",
    "free eyedropper tool",
    "color picker online",
  ],
  openGraph: {
    title: "Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker [2026]",
    description:
      "Pull HEX/RGB/HSL from any pixel, auto-extract a 6-color dominant palette, all in your browser. No upload, no signup, no paywall.",
    url: `${APP_URL}/blog/extract-brand-colors-from-image-2026`,
    type: "article",
    publishedTime: "2026-04-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker",
    description:
      "Eyedrop HEX/RGB/HSL + auto palette from any image. Free, in your browser.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker [2026]",
  description:
    "A practical guide to pulling colors from images — eyedropper for single pixels, k-means palette extraction for dominant colors, and the HEX/RGB/HSL tradeoffs designers face.",
  url: `${APP_URL}/blog/extract-brand-colors-from-image-2026`,
  datePublished: "2026-04-22",
  dateModified: "2026-04-22",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${APP_URL}/blog/extract-brand-colors-from-image-2026`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker [2026]",
      item: `${APP_URL}/blog/extract-brand-colors-from-image-2026`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get the exact HEX code from a color in a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Load the image into a browser-based color picker tool and click the pixel you want. The tool reads the RGB values of that single pixel from the Canvas API and converts them to HEX (#RRGGBB). SammaPix Color Picker does this with hover-preview for free, without uploading your image.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between HEX, RGB, and HSL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three represent the same color, just in different notations. HEX (#A855F7) is the web default — compact, unambiguous, universally supported. RGB (rgb(168, 85, 247)) exposes red/green/blue channels independently, useful when mixing with transparency. HSL (hsl(270, 91%, 65%)) separates hue, saturation, and lightness — ideal for building tint ramps or adjusting a color perceptually. Most design tools accept all three.",
      },
    },
    {
      "@type": "Question",
      name: "How are dominant colors extracted from an image automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through a clustering algorithm — most tools use k-means. The image is subsampled (typically 5000-10000 pixels), the RGB values are treated as points in 3D color space, and k-means groups them into K clusters (usually 5 or 6). The cluster centroids are the dominant colors, ordered by cluster size. This runs in milliseconds in modern JavaScript.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract brand colors from a competitor website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — save a screenshot of the homepage and run it through the color picker. For more precision, save the logo PNG and sample individual brand pixels. Remember that extracted colors are approximations: the original brand guideline may define specific Pantone or CMYK values that differ slightly from what you see on screen due to color profile mismatches.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Chrome built-in eyedropper not work on images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Chrome native EyeDropper API (chrome://flags/#enable-experimental-web-platform-features) only samples live screen pixels, not arbitrary image files. It also only works on HTTPS pages. For image-specific color picking you need a tool that loads the image into a canvas and reads pixel data via getImageData — which is exactly what SammaPix Color Picker does, client-side, in every modern browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload my brand logo to an online color picker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depends on the tool. Most online color pickers upload your image to a server for processing. SammaPix Color Picker runs 100% in your browser using the Canvas API — the image is read from your disk, drawn to a local canvas, and pixel-sampled in your tab. Nothing is transmitted. Verify yourself by checking DevTools Network tab during use.",
      },
    },
  ],
};

export default function ExtractBrandColorsFromImage2026Page() {
  return (
    <>
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

      <BlogArticleLayout
        title="Extract Brand Colors from Any Image: Free HEX/RGB/HSL Picker [2026]"
        slug="extract-brand-colors-from-image-2026"
        description="Designers and developers need color codes constantly — matching a client brand, pulling a palette from a mood board, picking shades from a photograph for a landing page. Here is how to extract exact HEX, RGB, or HSL values from any image plus auto-generate a 6-color palette, all free and fully in your browser."
        date="2026-04-22"
        dateFormatted="April 22, 2026"
        tags={["Creative", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "when-you-need-it", title: "When you actually need to extract colors" },
          { id: "hex-rgb-hsl", title: "HEX vs RGB vs HSL: when each wins" },
          { id: "single-pixel", title: "Single-pixel eyedropping (precision)" },
          { id: "palette-extraction", title: "Automatic palette extraction (k-means in plain English)" },
          { id: "brand-matching", title: "Matching a client brand from a logo" },
          { id: "mood-board", title: "Extracting a palette from a mood board" },
          { id: "photo-to-palette", title: "Photo-to-palette for landing pages" },
          { id: "accuracy-limits", title: "Accuracy limits: why your HEX might be off" },
          { id: "privacy", title: "Privacy: why uploading is unnecessary in 2026" },
          { id: "workflow", title: "The color extraction workflow" },
          { id: "tools", title: "Free browser-based color tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Single-pixel eyedropping gives you the precise HEX/RGB/HSL of any point on an image. Ideal for matching a brand color from a logo.",
          "Auto palette extraction via k-means clusters ~10000 sampled pixels into 6 dominant colors ordered by frequency — ideal for mood boards and photo-driven design systems.",
          "HEX is the web default. RGB exposes channels independently. HSL is perceptual — use it when you need tint ramps or color adjustments.",
          "Extracted colors are approximations: original brand guidelines may define Pantone/CMYK that differ slightly due to color profile mismatches.",
          "Upload-free tools (Canvas API + k-means in JavaScript) match or beat paid alternatives and keep sensitive brand assets off third-party servers.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Designer workspace with color swatches and paint samples, representing color extraction from reference imagery"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every brand project starts with picking colors — either from an existing logo or from reference imagery. Photo by Anni Roenkae on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Extract colors from any image — free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop an image into SammaPix Color Picker, hover to preview, click to pick HEX/RGB/HSL. The 6-color
              dominant palette is auto-generated. Everything runs locally via Canvas API.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools/color-picker"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try Color Picker, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/remove-bg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Remove Background <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ── When you need it ───────────────────────────────────────────── */}
        <h2 id="when-you-need-it" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you actually need to extract colors
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Five situations that come up constantly for designers and developers:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Brand matching.</strong> Client sends a logo PNG and says &ldquo;use our colors&rdquo; without a brand guide. You need the exact HEX for CSS.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Mood board translation.</strong> Designer pinned 20 reference images to a board. You need a palette that represents the aggregate aesthetic.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Photo-driven landing page.</strong> Hero photograph dictates the color scheme — you need to extract the dominant tones for buttons, backgrounds, and accents.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Competitor audit.</strong> Screenshot a competitor&apos;s site, pull their palette, analyze the choices.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Re-theming an app.</strong> Existing UI uses hardcoded colors scattered across CSS — extract them from a rendered screenshot to rebuild the design tokens.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In every case the workflow is the same: load an image, sample pixel(s), output HEX/RGB/HSL.
        </p>

        {/* ── HEX/RGB/HSL ────────────────────────────────────────────────── */}
        <h2 id="hex-rgb-hsl" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          HEX vs RGB vs HSL: when each wins
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All three notations describe the same color. The difference is ergonomics in the tool you will paste
          into.
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Example</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">HEX</td><td className="py-2 px-4"><code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">#A855F7</code></td><td className="py-2 pl-4">Web CSS, design files, universal pasting</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">RGB</td><td className="py-2 px-4"><code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">rgb(168, 85, 247)</code></td><td className="py-2 pl-4">Mixing with alpha, channel-level math</td></tr>
              <tr><td className="py-2 pr-4">HSL</td><td className="py-2 px-4"><code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">hsl(270, 91%, 65%)</code></td><td className="py-2 pl-4">Tint ramps, perceptual adjustments, dark mode</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          HSL shines when building design tokens: if your primary is{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">hsl(270, 91%, 65%)</code>,
          you get the hover state by dropping lightness 10% (<code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">hsl(270, 91%, 55%)</code>),
          a muted variant by dropping saturation, a dark-mode equivalent by shifting both. Same hue, different
          adjustments — RGB cannot do this cleanly.
        </p>

        {/* ── Single pixel ───────────────────────────────────────────────── */}
        <h2 id="single-pixel" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Single-pixel eyedropping (precision)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you need exact match — a brand logo, a specific button color — eyedrop a single pixel. The tool
          reads the RGB bytes from the canvas at that x/y coordinate and converts to HEX.
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`// The core idea (simplified)
const pixel = ctx.getImageData(x, y, 1, 1).data;
const hex = '#' + [pixel[0], pixel[1], pixel[2]]
  .map(v => v.toString(16).padStart(2, '0'))
  .join('').toUpperCase();`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Hover preview makes this usable — you see the color under the cursor live, then click to capture it.
          SammaPix{" "}
          <Link href="/tools/color-picker" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            Color Picker
          </Link>
          {" "}runs this pattern in the browser, outputs all three formats, and copies to clipboard on click.
        </p>

        {/* ── Palette extraction ─────────────────────────────────────────── */}
        <h2 id="palette-extraction" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Automatic palette extraction (k-means in plain English)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When the image has thousands of distinct colors (photograph, illustration, UI mockup) you do not want
          to eyedrop individually — you want the 5-6 dominant tones. This is a clustering problem, solved by
          <strong className="text-gray-900 dark:text-[#E5E5E5]"> k-means</strong>.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The algorithm in plain English:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Sample ~10000 pixels from the image (subsample to stay fast).</li>
          <li>Treat each RGB value as a point in 3D space (red, green, blue axes).</li>
          <li>Pick K=6 starting centroids spread across the sample.</li>
          <li>Assign every pixel to its nearest centroid (Euclidean distance in RGB space).</li>
          <li>Move each centroid to the average of its assigned pixels.</li>
          <li>Repeat steps 4-5 for 6 iterations — centroids stabilize.</li>
          <li>Return the 6 centroids sorted by cluster size: those are your dominant colors.</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On a 2K×2K image the whole thing runs in under 100ms in modern JavaScript. SammaPix Color Picker uses
          this exact algorithm — you drop an image, the palette appears automatically under the eyedropper.
        </p>

        {/* ── Brand matching ─────────────────────────────────────────────── */}
        <h2 id="brand-matching" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Matching a client brand from a logo
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common use case. Client sends a logo PNG or JPG with no brand guide. You need the exact
          primary and secondary colors.
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>If the logo has a white or transparent background, open it directly in the color picker.</li>
          <li>If the logo has a colored background that interferes with palette extraction, remove the background first via{" "}
            <Link href="/tools/remove-bg" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
              Remove Background
            </Link>
            {" "}so only the logo marks get sampled.
          </li>
          <li>Eyedrop the primary logo color — click the most saturated area.</li>
          <li>Eyedrop secondary colors if the logo uses more than one.</li>
          <li>Optionally read the auto-extracted palette underneath for accent and tint candidates.</li>
          <li>Copy HEX codes into your CSS or design tokens.</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the actual conversion of transparent logos between formats read our{" "}
          <Link href="/blog/png-to-jpg-vs-webp-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            PNG to JPG vs WebP analysis
          </Link>
          {" "}— relevant for delivering the logo after you have the colors.
        </p>

        {/* ── Mood board ─────────────────────────────────────────────────── */}
        <h2 id="mood-board" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Extracting a palette from a mood board
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Mood boards are collages — 5 to 50 reference images. The job is to pull a single cohesive palette that
          represents the aggregate.
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Composite the mood board into one flat image (a screenshot of your Pinterest board or Figma frame).</li>
          <li>Load into Color Picker — k-means returns the 6 dominant colors across the whole composite.</li>
          <li>Manually eyedrop 2-3 specific accent tones the algorithm might have missed (tiny but intentional details).</li>
          <li>Build a 6-10 color design token set from the combination.</li>
        </ol>

        {/* ── Photo to palette ───────────────────────────────────────────── */}
        <h2 id="photo-to-palette" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Photo-to-palette for landing pages
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Hero-photograph-driven landing pages work best when the UI colors harmonize with the photo. Extract
          the dominant tones and use them intentionally:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Most dominant color</strong> → page background tint (very desaturated version).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Second dominant color</strong> → primary button (saturated version).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Least dominant warm/cool</strong> → accent (links, highlights).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Darkest extracted color</strong> → heading text.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The palette extraction gives you the starting point; the designer judgment decides which slot each
          color fills.
        </p>

        {/* ── Accuracy limits ────────────────────────────────────────────── */}
        <h2 id="accuracy-limits" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Accuracy limits: why your HEX might be off
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The extracted HEX is exactly what the browser renders for that pixel. But that may not be what the
          original designer specified:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Color profile mismatch.</strong> Logo saved in Adobe RGB displayed on an sRGB monitor renders slightly different HEX values.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">JPEG compression.</strong> Lossy compression shifts colors slightly. Sample from a PNG or SVG when possible.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Anti-aliasing on logo edges.</strong> Pixels near shape edges blend with background — sample from the solid fill interior.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Pantone/CMYK originals.</strong> Print brand guidelines often specify Pantone colors that convert approximately to sRGB/HEX, with the exact HEX varying by conversion algorithm.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Rule of thumb: extract the HEX, then ask the client &ldquo;your brand guide has a specific color code?&rdquo;.
          If yes use theirs; if no use the extracted one.
        </p>

        {/* ── Privacy ────────────────────────────────────────────────────── */}
        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Privacy: why uploading is unnecessary in 2026
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most online color pickers upload your image to their server to process. For screenshots of public
          websites that is fine. For unreleased client logos, confidential mockups, or internal brand assets,
          uploading is a compliance problem your client will care about.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browser Canvas API can do everything a server does — load image, read pixels, run k-means, convert
          color formats. Nothing needs to leave your device. For more on this architecture read our{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            browser-based image tools privacy guide
          </Link>
          {" "}and the{" "}
          <Link href="/blog/merge-pdfs-privately-no-upload" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            private PDF merge guide
          </Link>
          {" "}(same principles).
        </p>

        {/* ── Workflow ───────────────────────────────────────────────────── */}
        <h2 id="workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The color extraction workflow
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Open <Link href="/tools/color-picker" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix Color Picker</Link> in Chrome, Firefox, Safari, or Edge.</li>
          <li>Drop the image — max 20 MB, any common format (JPG, PNG, WebP, GIF).</li>
          <li>Hover over the image to preview the color under your cursor.</li>
          <li>Click to pick — the HEX, RGB, and HSL values appear in a card with copy buttons.</li>
          <li>Scroll down to see the auto-generated 6-color dominant palette. Click any swatch to copy.</li>
          <li>Toggle the output format (HEX / RGB / HSL) based on where you are pasting.</li>
          <li>Save the palette to your CSS custom properties or design tokens.</li>
        </ol>

        {/* ── Tools ──────────────────────────────────────────────────────── */}
        <h2 id="tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free browser-based color tools
        </h2>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Goal</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Tool</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Eyedrop HEX/RGB/HSL + palette</td><td className="py-2 px-4"><Link href="/tools/color-picker" className="text-[#6366F1] hover:underline">Color Picker</Link></td><td className="py-2 pl-4">k-means 6 colors, click-to-copy</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Remove logo background</td><td className="py-2 px-4"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></td><td className="py-2 pl-4">Clean logo before sampling</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Compress the source</td><td className="py-2 px-4"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></td><td className="py-2 pl-4">Lighter file = faster sampling</td></tr>
              <tr><td className="py-2 pr-4">Apply film-style grading</td><td className="py-2 px-4"><Link href="/tools/filmlab" className="text-[#6366F1] hover:underline">Film Lab</Link></td><td className="py-2 pl-4">Build a cohesive look before extracting</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Full 35-tool toolbox on the <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix homepage</Link>.
        </p>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">How do I get the exact HEX code from a color in a photo?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Load the image into a browser-based color picker and click the pixel you want. The tool reads the RGB
          values and converts them to HEX. SammaPix Color Picker does this with hover-preview, free, no upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">What is the difference between HEX, RGB, and HSL?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All three represent the same color. HEX is compact and the web default. RGB exposes channels. HSL
          separates hue, saturation, and lightness — ideal for tint ramps and perceptual adjustments.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">How are dominant colors extracted from an image automatically?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Through k-means clustering. Subsample ~10000 pixels, treat RGB as 3D points, cluster into 6 groups,
          return centroids ordered by cluster size. Runs in milliseconds in modern JavaScript.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Can I extract brand colors from a competitor website?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes — screenshot the homepage and run it through the color picker. Note the extracted HEX may differ
          slightly from the original brand guidelines due to color profile conversions.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Why does Chrome built-in eyedropper not work on images?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Chrome native EyeDropper API only samples live screen pixels, not arbitrary image files. For
          image-specific color picking you need a tool that loads the image into a canvas and uses getImageData.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Is it safe to upload my brand logo to an online color picker?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Depends on the tool. Most upload to a server.{" "}
          <Link href="/tools/color-picker" className="text-[#6366F1] hover:underline">SammaPix Color Picker</Link>{" "}
          runs 100% in your browser using Canvas API — nothing is transmitted. Verify via DevTools Network tab.
        </p>
      </BlogArticleLayout>
    </>
  );
}
