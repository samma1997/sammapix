import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Extract a LUT from a Photo Free [2026]",
  description:
    "Turn any photo into a real 3D LUT in 30 seconds. Free, browser-based, exports .cube for Lightroom and Premiere. Step-by-step guide with examples.",
  alternates: {
    canonical: `${APP_URL}/blog/extract-lut-from-photo-free-2026`,
  },
  keywords: [
    "extract lut from photo",
    "create lut from image",
    "free lut generator",
    "photo to lut",
    "lightroom lut from photo",
    "premiere lut from photo",
    "convert photo to cube file",
    "make your own lut free",
    "3d lut generator online",
    "davinci resolve lut from image",
  ],
  openGraph: {
    title: "How to Extract a LUT from a Photo Free [2026]",
    description:
      "Turn any photo into a real 3D LUT in 30 seconds. Free, browser-based, exports .cube for Lightroom and Premiere.",
    url: `${APP_URL}/blog/extract-lut-from-photo-free-2026`,
    type: "article",
    publishedTime: "2026-05-18",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Extract a LUT from a Photo Free [2026]",
    description:
      "Extract a 3D LUT from any photo, export as .cube, apply in Lightroom or Premiere. Free, no upload.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-18";
const POST_DATE_FORMATTED = "May 18, 2026";
const POST_URL = `${APP_URL}/blog/extract-lut-from-photo-free-2026`;
const POST_TITLE = "How to Extract a LUT from a Photo Free [2026]";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Extract a real 3D LUT from any photo in seconds. Free, browser-based, exports a standard .cube file for Lightroom, Premiere, DaVinci Resolve and any other color tool. Step-by-step guide with examples.",
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
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: [
    "extract lut from photo",
    "free lut generator",
    "photo to cube file",
    "lightroom lut",
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
      name: "Can you really extract a LUT from just one photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Software like SammaPix samples thousands of colors from the reference photo, builds a 3D lookup table (typically 17x17x17) where every grid point maps to the closest match in the reference, then smooths it. The result is a valid 3D LUT that pulls any other photo's colors toward the reference's palette. It is an approximation — not a perfect transport map — but it produces usable .cube files that work in Lightroom, Premiere and DaVinci Resolve.",
      },
    },
    {
      "@type": "Question",
      name: "What is a .cube file exactly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .cube file is a plain text representation of a 3D color lookup table, defined by the Adobe specification. It lists every input RGB triplet mapped to an output RGB triplet on a regular grid. The file starts with a TITLE line, a LUT_3D_SIZE declaration (commonly 17, 33 or 65) and DOMAIN_MIN / DOMAIN_MAX lines, followed by size^3 data rows. Every color-grading tool from Premiere to DaVinci to FFmpeg accepts it.",
      },
    },
    {
      "@type": "Question",
      name: "Does the extracted LUT match the original colorist's intent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not perfectly. A LUT extracted from a single graded photo captures the color statistics of that photo, not the original transformations the colorist applied (curves, masks, secondary corrections). What you get is a 'look' that mimics the reference. For exact reproduction you would need both a before and after image, which lets the algorithm compute the actual transformation.",
      },
    },
    {
      "@type": "Question",
      name: "Will the LUT work in Lightroom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lightroom Classic and Camera Raw both support .cube files via the Profiles panel (Browse → Import Profiles). DaVinci Resolve imports them via Project Settings → Color Management → 3D Lookup Tables. Premiere uses them in the Lumetri Color panel under Creative → Look. The same .cube file is interoperable across all of them.",
      },
    },
    {
      "@type": "Question",
      name: "How does this compare to buying a LUT pack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commercial LUT packs (Mastin Labs, VSCO, RNI, Mastin) are hand-crafted by colorists and produce more refined results. An extracted LUT is faster and free, but the quality depends entirely on the reference photo. For a quick batch match across a wedding shoot or a content series, extraction is great. For a polished signature look, commercial LUTs still win.",
      },
    },
    {
      "@type": "Question",
      name: "Are there file size limits or upload fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix processes everything in your browser. Nothing leaves your device. There is no per-photo fee, no upload bandwidth cost, and no signup required. Daily caps apply only at very high volumes (we measure usage to keep the service responsive). For most photographers and creators, the free tier covers the full workflow.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to extract a 3D LUT from a photo for free",
  description:
    "Step-by-step process to extract a usable .cube file from a single reference photo using a browser-based LUT generator.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Pick a reference photo with the look you want",
      text: "Choose one photo whose color and tone you want to replicate across other images. Cleaner palettes and consistent lighting produce better LUTs.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop the photo into the LUT generator",
      text: "Open the SammaPix LUT Generator at sammapix.com/tools/color-match and drop the reference image in the 'From photo' slot. The tool extracts a 3D LUT in 2-3 seconds.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the .cube file",
      text: "Click 'Download .cube' on the reference card. The file is a standard Adobe .cube usable in Lightroom, Premiere, DaVinci Resolve, Photoshop and FFmpeg.",
    },
  ],
};

export default function ExtractLUTArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <BlogArticleLayout
        slug="extract-lut-from-photo-free-2026"
        title={POST_TITLE}
        description="Turn any photo into a real 3D LUT in 30 seconds. Free, browser-based, exports a standard .cube file for Lightroom, Premiere and DaVinci Resolve. Step-by-step guide with examples."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-a-lut", title: "What is a LUT (in plain English)" },
          { id: "why-extract-from-photo", title: "Why extract from a photo" },
          { id: "the-quick-method", title: "The quick method (30 seconds)" },
          { id: "step-by-step", title: "Step-by-step walkthrough" },
          { id: "use-in-lightroom", title: "How to use the .cube in Lightroom" },
          { id: "use-in-premiere-davinci", title: "How to use the .cube in Premiere or DaVinci" },
          { id: "common-mistakes", title: "Common mistakes to avoid" },
          { id: "when-not-to-use", title: "When LUT extraction is the wrong tool" },
          { id: "comparison-table", title: "Free vs paid LUT solutions" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A 3D LUT is a color lookup table that maps every input RGB triplet to an output RGB triplet — the standard way colorists package a 'look' across Lightroom, Premiere, DaVinci and FFmpeg.",
          "You can extract a usable LUT from a single reference photo by sampling its colors and building a smoothed 17x17x17 grid. SammaPix does this in 2-3 seconds, free, in your browser.",
          "The output is a standard .cube file — interoperable with every major color tool, no subscription, no upload.",
          "Best for wedding photographers matching 500 photos to one hero shot, content creators keeping an Instagram feed consistent, and YouTubers reusing a signature look.",
          "Not a replacement for hand-crafted commercial LUT packs (Mastin, VSCO) when you need a polished signature look — but unbeatable for fast batch consistency.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&w=1200"
              alt="Cinematic blue-toned landscape illustrating color grading and LUT-style color treatment"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The blue-cyan cinematic look that defines modern color grading — extractable as a LUT in 30 seconds. Photo via Pexels.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Extract a LUT from your photo right now — free, no signup
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop one reference photo. We build a real 3D LUT and let you download it as a standard{" "}
              <code className="text-[#F59E0B] font-mono">.cube</code> file for Lightroom, Premiere or DaVinci.
              Or apply it to a batch of 50 photos in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/color-match"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the LUT Generator
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#F59E0B] rounded-r-md">
          <p className="text-xs font-semibold text-[#F59E0B] mb-1.5 uppercase tracking-wide">
            TL;DR — the 30-second answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Open the <Link href="/tools/color-match" className="text-[#171717] dark:text-[#E5E5E5] underline">SammaPix LUT Generator</Link>, drop one reference photo,
            click <strong>Download .cube</strong>. The resulting file is a real 3D LUT
            (17x17x17, trilinear interpolation, Adobe spec) that imports into Lightroom,
            Premiere, DaVinci Resolve, Photoshop and FFmpeg without conversion. Everything
            runs locally — no upload, no signup, no subscription.
          </p>
        </div>

        <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-6 italic">
          Tested by <a href="/about" className="text-[#525252] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#171717] dark:hover:text-white">Luca Sammarco</a>, builder of SammaPix — workflow validated on Lightroom Classic 13, Premiere Pro 25 and DaVinci Resolve 19, May 2026.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* WHAT IS A LUT */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="what-is-a-lut" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What is a LUT (in plain English)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A 3D LUT &mdash; short for <em>three-dimensional lookup table</em> &mdash; is a table that tells your editor &ldquo;when you see this color in the input, replace it with that color in the output&rdquo;. The table covers the entire RGB cube on a regular grid (commonly 17, 33 or 65 points per axis), and your editor interpolates between grid points for every pixel in your image.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The format that won the industry is Adobe&rsquo;s <code className="font-mono text-[#171717] dark:text-[#E5E5E5]">.cube</code> &mdash; a plain text file you can open in TextEdit. It starts with metadata (title, grid size, domain) and then lists one RGB triplet per line for every grid point. A 17-point LUT contains 4,913 triplets; a 33-point LUT contains 35,937.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          Because the format is so simple, every serious color tool reads it: <strong>Lightroom Classic, Premiere Pro, DaVinci Resolve, Final Cut Pro, Photoshop (via the &ldquo;Color Lookup&rdquo; adjustment layer), FFmpeg, OBS Studio</strong>. One file, dozens of editors.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* WHY EXTRACT */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="why-extract-from-photo" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why extract a LUT from a photo
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Three scenarios where it&rsquo;s the right move:
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">1. You shot a series under changing light.</strong> A wedding starts in soft afternoon light and ends in harsh tungsten. You manually pull one frame to the look you want. Now you need 499 more to match. Extracting a LUT from your hero shot gives you a starting point that&rsquo;s 80% there in two seconds.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">2. You love how someone else&rsquo;s photo looks.</strong> You see a frame on Instagram or in a portfolio and want to reproduce the feel. Saving the image and extracting a LUT is the fastest legal way to study and adapt a look (within copyright limits &mdash; you&rsquo;re analyzing color math, not republishing the photo).
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">3. You want feed consistency without preset hell.</strong> Lightroom presets are slider snapshots: they bake in exposure, contrast, vibrance values that may not flatter every photo. A LUT only remaps colors &mdash; the structure of each photo is preserved. Result: consistent palette across a feed without flattening individual frames.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* THE QUICK METHOD */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="the-quick-method" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The quick method (30 seconds)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you just want the answer:
        </p>

        <ol className="text-sm text-[#737373] leading-relaxed mb-6 list-decimal pl-6 space-y-2">
          <li>
            Go to{" "}
            <Link href="/tools/color-match" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/color-match
            </Link>.
          </li>
          <li>Drop your reference photo in the left panel (&ldquo;From photo&rdquo; mode).</li>
          <li>Wait 2&ndash;3 seconds for the progress bar &mdash; the LUT is being built.</li>
          <li>
            Click the orange <strong>Download .cube</strong> button.
          </li>
          <li>Open the file in Lightroom, Premiere or DaVinci.</li>
        </ol>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          That&rsquo;s it. Everything runs in your browser. The reference never leaves your device. The .cube is generated locally as plain text and downloaded directly. There&rsquo;s no signup, no email collection, no &ldquo;upgrade to download&rdquo; tax.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP-BY-STEP */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step walkthrough
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">
          Step 1: pick a strong reference
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The reference photo is the single most important variable. The algorithm samples roughly 3,000 colors from it and uses those samples to build the LUT. A messy reference produces a messy LUT.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Good references</strong>: a single dominant lighting condition (golden hour, blue hour, overcast), clear color palette, no extreme highlights or crushed shadows. A clean landscape, a portrait at sunset, a still life with intentional color choices &mdash; all great.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Bad references</strong>: photos with multiple competing light sources, blown highlights that wash out one corner of the cube, heavily desaturated frames (the LUT will desaturate everything you apply it to). A selfie at the beach with a pink skin tone and blue sea is a tempting reference but produces aggressive results &mdash; the LUT pushes every photo&rsquo;s neutrals toward those two colors.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">
          Step 2: drop into the generator
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The reference panel on the left accepts JPG, PNG and WebP up to 20 MB. The generator immediately samples the image (downsampling to 512px internally for speed &mdash; color statistics are resolution-invariant for our purposes) and starts building the 3D LUT.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          You&rsquo;ll see a progress bar from 5% to 100% over 2&ndash;3 seconds. The work happens entirely in your browser&rsquo;s JavaScript engine &mdash; no network calls, no server, no uploads. When you see the green &ldquo;LUT extracted (17x17x17)&rdquo; confirmation, you&rsquo;re ready.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">
          Step 3: download the .cube
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          Click the small <strong>Download .cube</strong> button under the reference thumbnail. The file is generated as plain text and saved with a descriptive filename (<code className="font-mono">sammapix-yourphoto.cube</code>). Open it in any text editor and you&rsquo;ll see the Adobe spec headers followed by 4,913 RGB lines. It&rsquo;s a real LUT.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">
          Step 4 (optional): apply to a batch in the browser
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          If you don&rsquo;t need the .cube file itself and just want to apply the look to other photos, drop up to 50 images in the right panel and hit <strong>Match</strong>. The LUT applies via trilinear interpolation in milliseconds per photo. Download the whole batch as a ZIP.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* LIGHTROOM */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="use-in-lightroom" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to use the .cube in Lightroom
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Lightroom Classic and Camera Raw both support 3D LUTs through their Profile system. The steps:
        </p>

        <ol className="text-sm text-[#737373] leading-relaxed mb-4 list-decimal pl-6 space-y-1.5">
          <li>Open Lightroom Classic and switch to the <strong>Develop</strong> module.</li>
          <li>In the <strong>Basic</strong> panel, find the <em>Profile</em> dropdown at the very top.</li>
          <li>
            Click the four-square <strong>Profile Browser</strong> icon next to it.
          </li>
          <li>
            In the Profile Browser, click the <strong>+</strong> icon in the top-right corner and choose{" "}
            <strong>Import Profiles</strong>.
          </li>
          <li>Select your <code className="font-mono">.cube</code> file. Lightroom converts it to an <code className="font-mono">.xmp</code> profile internally and adds it under the <em>User Profiles</em> section.</li>
          <li>Click the new profile to apply it. Use the <strong>Amount</strong> slider (0&ndash;200) to dial intensity in or out.</li>
        </ol>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          To apply the look to a batch: develop one photo with the new profile, right-click the photo in the filmstrip, choose <em>Develop Settings &rarr; Copy Settings</em>, select the rest of the batch, then <em>Paste Settings</em>. Or use Sync Settings for a more selective copy.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* PREMIERE / DAVINCI */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="use-in-premiere-davinci" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to use the .cube in Premiere or DaVinci
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Premiere Pro</strong>: drop a clip on the timeline, open the <em>Lumetri Color</em> panel, expand the <em>Creative</em> section, click the <em>Look</em> dropdown, choose <em>Browse&hellip;</em>, select your .cube file. The look applies as a creative LUT &mdash; you can dial intensity with the <em>Intensity</em> slider directly below.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">DaVinci Resolve</strong>: open <em>Project Settings &rarr; Color Management &rarr; Lookup Tables</em>, click <em>Open LUT Folder</em>, drop your .cube into that folder, then back in the Color page right-click a node and choose <em>3D LUT &rarr; Your LUT name</em>. The LUT applies on that node only, which means you can stack other corrections before or after.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">FFmpeg (command line)</strong>: <code className="font-mono text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">ffmpeg -i input.mp4 -vf lut3d=your.cube output.mp4</code>. Useful for batch-processing video files outside of an NLE.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COMMON MISTAKES */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="common-mistakes" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common mistakes to avoid
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Mistake #1: extracting from a heavily edited reference.</strong> If the reference already has crushed shadows and blown highlights, the LUT inherits those traits and applies them aggressively. Use a reference that&rsquo;s already balanced.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Mistake #2: cross-genre application.</strong> A LUT extracted from a moody portrait will not flatter a sunny outdoor product shot. Match the LUT genre to the target genre. Indoor to indoor, outdoor to outdoor, golden hour to golden hour.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Mistake #3: skipping the intensity slider.</strong> Most extracted LUTs benefit from being dialed back to 60&ndash;80% intensity. At 100% they can feel artificial. Both the SammaPix tool and Lightroom/Premiere have intensity controls &mdash; use them.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Mistake #4: ignoring contrast and exposure.</strong> A LUT remaps colors, not luminance ranges. If your target photo is two stops underexposed, fix the exposure first, then apply the LUT. Otherwise the LUT will try to remap shadow detail that isn&rsquo;t there.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* WHEN NOT TO USE */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="when-not-to-use" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          When LUT extraction is the wrong tool
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">When you need a signature commercial look.</strong> Mastin Labs, VSCO and RNI sell LUT packs hand-crafted by professional colorists. They model specific film stocks (Portra 400, Ektar 100, Cinestill 800T) with knowledge of how each emulsion handles highlight roll-off, color crosstalk and grain. An extracted LUT can&rsquo;t replicate that depth.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">When you need exact reproduction of a colorist&rsquo;s transformation.</strong> If you have both the original and the graded version of an image, you can compute the exact LUT that transforms one into the other (the math is sometimes called &ldquo;color transfer between images&rdquo;). SammaPix doesn&rsquo;t do this yet, but it&rsquo;s a feature we&rsquo;re evaluating.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">When the photo is heavily damaged.</strong> Sampling colors from a scratched, faded or grain-heavy reference produces noisy LUTs. Run a quick cleanup first (we have a{" "}
          <Link href="/tools/photo-enhance" className="text-[#171717] dark:text-[#E5E5E5] underline">batch photo enhancer</Link>
          {" "}for compressed/grainy photos) before extracting.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COMPARISON */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="comparison-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Free vs paid LUT solutions
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Solution</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Cost</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Extracts from photo?</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Exports .cube?</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3"><strong className="text-[#171717] dark:text-[#E5E5E5]">SammaPix LUT Generator</strong></td>
                <td className="py-2 px-3">Free</td>
                <td className="py-2 px-3">Yes</td>
                <td className="py-2 px-3">Yes</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">Lightroom Classic</td>
                <td className="py-2 px-3">$10&ndash;20/mo</td>
                <td className="py-2 px-3">No (presets only)</td>
                <td className="py-2 px-3">No</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">DaVinci Resolve Studio</td>
                <td className="py-2 px-3">$295 one-time</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">Yes (creates manually)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">3D LUT Creator (Russia)</td>
                <td className="py-2 px-3">$99</td>
                <td className="py-2 px-3">Partial</td>
                <td className="py-2 px-3">Yes</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">IWLTBAP (free LUT pack)</td>
                <td className="py-2 px-3">Free</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">Yes (pre-made)</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Mastin Labs / VSCO LUT pack</td>
                <td className="py-2 px-3">$40&ndash;200</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">Yes (pre-made)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          The honest take: SammaPix is the fastest free path from &ldquo;I like this photo&rsquo;s look&rdquo; to &ldquo;I have a .cube file I can use anywhere&rdquo;. Commercial LUT packs still win for polished signature looks. Use whichever fits the job.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SECONDARY CTA */}
        {/* ════════════════════════════════════════════════════════════ */}

        <div className="my-10 bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
            Try the generator now &mdash; takes 30 seconds
          </h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
            Drop one reference photo, download a real .cube file, import into Lightroom or Premiere. No signup, no upload, no subscription.
          </p>
          <Link
            href="/tools/color-match"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open LUT Generator
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* FAQ */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Can you really extract a LUT from just one photo?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes. The algorithm samples thousands of colors from the reference, builds a 17x17x17 grid where every cell maps to the closest reference colors via weighted K-nearest sampling, then smooths the result with a 3D box blur. The output is a valid 3D LUT &mdash; an approximation, not a perfect transport map, but a usable .cube file that works everywhere.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          What is a .cube file exactly?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A plain text 3D color lookup table defined by Adobe&rsquo;s spec. It contains a TITLE line, a LUT_3D_SIZE declaration (17, 33 or 65), DOMAIN_MIN/MAX lines, and size&sup3; data rows of normalized RGB triplets. Every major color tool reads it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Does the extracted LUT match the original colorist&rsquo;s intent?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Not perfectly. You get the &ldquo;feel&rdquo; of the reference&rsquo;s palette, not the exact curves, masks and secondary corrections the colorist applied. For exact reproduction you need both a before and after image.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Will the LUT work in Lightroom?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes. Develop module &rarr; Profile Browser &rarr; + &rarr; Import Profiles &rarr; select the .cube. Lightroom converts it to an internal profile and adds it under User Profiles.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          How does this compare to buying a LUT pack?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Commercial packs (Mastin, VSCO) are hand-crafted by colorists modeling specific film stocks &mdash; they win for polished signature looks. Extraction is faster and free, ideal for batch consistency from a single hero shot.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Are there file size limits or upload fees?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          Everything runs in your browser &mdash; nothing leaves your device. No per-photo fees, no bandwidth costs, no signup. Daily soft caps exist only at very high volumes to keep the service responsive.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RELATED */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Related reads
        </h2>

        <ul className="text-sm text-[#737373] leading-relaxed mb-6 list-disc pl-6 space-y-1.5">
          <li>
            <Link href="/blog/best-free-topaz-gigapixel-alternatives-2026" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Topaz Gigapixel pricing 2026 + 7 free alternatives tested
            </Link>{" "}
            &mdash; if you also need upscaling alongside color matching.
          </li>
          <li>
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Compress images without losing quality
            </Link>{" "}
            &mdash; for prepping the matched batch for web delivery.
          </li>
          <li>
            <Link href="/tools/filmlab" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Film Lab
            </Link>{" "}
            &mdash; SammaPix&rsquo;s 14 analog film presets if you want pre-baked looks.
          </li>
          <li>
            <Link href="/tools/compress" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Image compressor
            </Link>{" "}
            &mdash; shrink the final batch up to 90% smaller after applying the LUT.
          </li>
        </ul>

        <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4 italic">
          Published {POST_DATE_FORMATTED}. Tool tested on Lightroom Classic 13, Premiere Pro 25, DaVinci Resolve 19, Photoshop CC 2025 and FFmpeg 7.
        </p>
      </BlogArticleLayout>
    </>
  );
}
