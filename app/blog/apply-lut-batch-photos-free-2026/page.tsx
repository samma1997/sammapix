import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Apply a LUT to a Batch of Photos Free [2026]",
  description:
    "Apply one .cube LUT to 50 photos at once. Free, no Lightroom needed. Compare batch workflows: SammaPix, Lightroom, Premiere, DaVinci, FFmpeg. Step-by-step.",
  alternates: {
    canonical: `${APP_URL}/blog/apply-lut-batch-photos-free-2026`,
  },
  keywords: [
    "apply lut to batch photos",
    "batch apply lut free",
    "apply lut to multiple photos",
    "apply cube file batch",
    "batch color grading photos",
    "lightroom batch apply preset lut",
    "mastin labs batch workflow",
    "vsco lut batch apply",
    "free lut batch processor",
    "consistent color across photos",
  ],
  openGraph: {
    title: "How to Apply a LUT to a Batch of Photos Free [2026]",
    description:
      "Apply one .cube LUT to 50 photos at once. Free, no Lightroom needed. Compare batch workflows for Mastin, VSCO and free LUT packs.",
    url: `${APP_URL}/blog/apply-lut-batch-photos-free-2026`,
    type: "article",
    publishedTime: "2026-05-18",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Apply a LUT to a Batch of Photos Free [2026]",
    description:
      "Apply one .cube LUT to 50 photos at once, free, in your browser. Works with Mastin, VSCO, or any .cube file.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-18";
const POST_DATE_FORMATTED = "May 18, 2026";
const POST_URL = `${APP_URL}/blog/apply-lut-batch-photos-free-2026`;
const POST_TITLE = "How to Apply a LUT to a Batch of Photos Free [2026]";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Apply one .cube LUT to a batch of 50 photos for free. Step-by-step browser workflow plus comparison with Lightroom, Premiere, DaVinci Resolve, and FFmpeg. No subscription, no upload, no signup.",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["apply lut batch", "batch apply lut", "cube file batch apply", "free lut batch"],
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
      name: "Can I apply a .cube LUT to multiple photos at once for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix lets you drop one .cube file plus up to 50 photos in your browser and applies the LUT to all of them via trilinear interpolation in seconds. No upload, no signup, no subscription. The output downloads as a ZIP. Other free options include FFmpeg (command line) and the LUT preview features in Photoshop and DaVinci's free tier, but those are per-file or per-clip workflows, not native batch processors.",
      },
    },
    {
      "@type": "Question",
      name: "Will my Mastin Labs or VSCO LUTs work in this batch workflow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Mastin Labs, VSCO, RNI, and any other commercial LUT pack ship .cube files that follow the Adobe specification. SammaPix's parser accepts the standard format (LUT_3D_SIZE up to 65, with DOMAIN_MIN/MAX and TITLE headers). Drop the .cube file in the 'From .cube' tab and apply to your batch.",
      },
    },
    {
      "@type": "Question",
      name: "Why not just use Lightroom's batch sync?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lightroom's batch sync works but requires (a) a Lightroom subscription, (b) importing the .cube as a profile first, (c) applying to one photo, then (d) syncing settings across the batch. SammaPix skips all four steps for free in a browser. If you already pay for Lightroom and have your photos cataloged there, the Lightroom workflow is fine. For everything else, the free batch processor is faster.",
      },
    },
    {
      "@type": "Question",
      name: "What if my .cube file is 33x33x33 or 65x65x65?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All standard sizes work. SammaPix parses LUT_3D_SIZE from the header and applies trilinear interpolation at that resolution. 17 is the SammaPix default for extracted LUTs (4,913 grid points, fast and clean), 33 is common for commercial packs (35,937 points, smoother gradients), and 65 is high-fidelity (274,625 points, used in film color science). Quality differences are real but subtle in most photo applications.",
      },
    },
    {
      "@type": "Question",
      name: "Does the batch processor work on RAW files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not directly. SammaPix accepts JPG, PNG, and WebP. RAW workflow is owned by Lightroom, Capture One, or DxO. If you want to apply a LUT to RAW files, develop them to JPEG/PNG first (Lightroom's Export with the LUT applied, or a quick batch export at full quality), then run them through the SammaPix batch processor only if you need the speed of trilinear interpolation across hundreds of frames.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on how many photos I can batch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free users can batch up to 50 photos per session in SammaPix. Pro users can batch up to 300 per session. There's no monthly cap on the free tier — only soft daily limits at very high volumes to keep the service responsive. Most photographers process 20-50 photos per session, comfortably within the free limit.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to apply a .cube LUT to a batch of photos for free",
  description:
    "Step-by-step browser-based workflow to apply one .cube file to up to 50 photos at once, without Lightroom or a paid subscription.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the SammaPix LUT applier",
      text: "Go to sammapix.com/tools/color-match and switch the left panel to 'From .cube' mode.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your .cube file",
      text: "Drag in any Adobe-spec .cube — from Mastin Labs, VSCO, IWLTBAP, or your own export. SammaPix parses it instantly.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Drop your photo batch",
      text: "On the right panel, drag up to 50 photos (JPG, PNG, WebP). Click 'Match' and the LUT applies to each in milliseconds.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download as ZIP",
      text: "Once the batch finishes, click 'Download ZIP' to grab all processed photos in a single archive. Or download individually.",
    },
  ],
};

export default function ApplyLUTBatchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <BlogArticleLayout
        slug="apply-lut-batch-photos-free-2026"
        title={POST_TITLE}
        description="Apply one .cube LUT to 50 photos at once for free. Browser workflow with no Lightroom needed. Compare batch options across SammaPix, Lightroom, Premiere, DaVinci, and FFmpeg."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "the-batch-problem", title: "The batch problem with LUTs" },
          { id: "the-quick-answer", title: "The quick answer (30 seconds)" },
          { id: "sammapix-batch", title: "Method 1: SammaPix browser batch (free)" },
          { id: "lightroom-batch", title: "Method 2: Lightroom Classic batch sync" },
          { id: "premiere-davinci-batch", title: "Method 3: Premiere or DaVinci batch" },
          { id: "ffmpeg-batch", title: "Method 4: FFmpeg command-line batch (video)" },
          { id: "comparison-table", title: "Comparison: which method when" },
          { id: "common-pitfalls", title: "Common pitfalls" },
          { id: "intensity-and-blending", title: "Intensity, blending and per-photo overrides" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Applying one LUT to many photos is the daily workflow of wedding photographers, content creators, and anyone shipping a series with consistent grading.",
          "Lightroom can do it but requires a subscription and a 4-step import workflow. SammaPix does it free in your browser, no signup.",
          "All standard .cube sizes (17/33/65) work — including Mastin Labs, VSCO, RNI, IWLTBAP and any LUT you have, free or paid.",
          "For video batches, FFmpeg's lut3d filter is unbeatable on the command line.",
          "Match the LUT to the genre, dial intensity back to 60-80% for natural results, and fix exposure before applying.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&w=1200"
              alt="Aurora borealis with mirrored mountains — a strong cinematic palette that survives batch LUT application"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              When every frame in a series should share this look — that&rsquo;s where batch LUT application earns its keep. Photo via Pexels.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Apply your .cube to 50 photos — free, in 30 seconds
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your <code className="text-[#F59E0B] font-mono">.cube</code> file plus up to 50 photos.
              SammaPix applies the LUT to all of them and downloads a ZIP.
              Works with Mastin, VSCO, IWLTBAP and any Adobe-spec LUT.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/color-match"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the batch LUT applier
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#F59E0B] rounded-r-md">
          <p className="text-xs font-semibold text-[#F59E0B] mb-1.5 uppercase tracking-wide">
            TL;DR — the fastest free path
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Open the{" "}
            <Link href="/tools/color-match" className="text-[#171717] dark:text-[#E5E5E5] underline">
              SammaPix LUT applier
            </Link>
            , switch to <strong>From .cube</strong>, drop your LUT file, drop 50 photos, click <strong>Match</strong>, download the ZIP.
            Total time: about 30 seconds for the setup plus a few seconds for the batch itself. No Lightroom, no upload, no subscription, no watermark. Works with any standard .cube (Mastin Labs, VSCO, IWLTBAP, or your own).
          </p>
        </div>

        <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-6 italic">
          Written by <a href="/about" className="text-[#525252] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#171717] dark:hover:text-white">Luca Sammarco</a>, builder of SammaPix &mdash; comparing 4 batch LUT workflows on the same 50-photo test set, May 2026.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* THE BATCH PROBLEM */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="the-batch-problem" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The batch problem with LUTs
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you bought a Mastin Labs film pack ($69) or a VSCO subscription ($30/year), you have <code className="font-mono">.cube</code> files sitting in a folder. Most of them are designed to be applied to <em>one image at a time</em> &mdash; you import the pack into Lightroom or Premiere, click the preset, and the LUT applies to the active selection.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The trouble starts when you need that look across 50, 200 or 500 photos. Wedding photographers know this pain intimately. Content creators who post 30 reels a month know it. YouTubers stitching b-roll know it. Lightroom&rsquo;s batch sync solves part of it, but only if you&rsquo;re already inside Lightroom and willing to pay the subscription tax.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          The honest answer is that there are four ways to apply a .cube to a batch &mdash; and the right method depends entirely on whether you&rsquo;re processing stills or video, whether you already have a NLE open, and whether you want to pay anything at all. This article walks through all four.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* QUICK ANSWER */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="the-quick-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The quick answer (30 seconds)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For pure stills, no subscription, no install:
        </p>

        <ol className="text-sm text-[#737373] leading-relaxed mb-6 list-decimal pl-6 space-y-2">
          <li>
            Go to{" "}
            <Link href="/tools/color-match" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/color-match
            </Link>
            .
          </li>
          <li>Click the <strong>From .cube</strong> tab at the top of the left panel.</li>
          <li>Drop your .cube file. It parses instantly.</li>
          <li>Drop up to 50 photos in the right panel.</li>
          <li>
            Click <strong>Match X photos</strong> and wait a few seconds.
          </li>
          <li>
            Click <strong>Download ZIP</strong>.
          </li>
        </ol>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          The whole process is browser-native: no upload, no temp server, the photos and the LUT never leave your machine. The ZIP is generated locally and downloaded directly. For video batches or RAW workflows, keep reading.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* METHOD 1: SAMMAPIX */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="sammapix-batch" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Method 1: SammaPix browser batch (free)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The most common case. You have one .cube file, you have a folder of stills (wedding selects, content batch, product shots), you want the LUT applied to all of them. Sign in not required, but if you sign up you unlock 300-photo batches instead of 50.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">What happens behind the scenes</strong>: the .cube parser reads the Adobe headers (TITLE, LUT_3D_SIZE, DOMAIN_MIN, DOMAIN_MAX), validates the grid dimensions (supports 2 to 65), and normalizes the data to the [0,1] range if your file uses a non-standard domain. Then for each photo, every pixel is mapped through trilinear interpolation against the 3D LUT cube &mdash; the same math that Lightroom and Premiere use internally.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Output format</strong>: JPEG for JPG/WebP inputs (quality 92), PNG for PNG inputs. Full resolution preserved. The intensity slider in the &ldquo;Advanced&rdquo; collapsible lets you dial the LUT back to 60-80% if 100% feels too strong &mdash; a habit most colorists adopt.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Speed</strong>: trilinear interpolation in JavaScript is fast. On a modern laptop, expect ~30-80 milliseconds per 4K photo. A 50-photo batch finishes in 2-4 seconds total. The bottleneck for very large batches is JPEG encoding for the output, not the LUT math.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* METHOD 2: LIGHTROOM */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="lightroom-batch" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Method 2: Lightroom Classic batch sync
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The official Adobe workflow. Powerful, integrated with your existing catalog, but slower if you don&rsquo;t already work in Lightroom.
        </p>

        <ol className="text-sm text-[#737373] leading-relaxed mb-4 list-decimal pl-6 space-y-1.5">
          <li>
            In Lightroom Classic, switch to the <strong>Develop</strong> module.
          </li>
          <li>
            Click the <strong>Profile Browser</strong> icon (four squares) next to the Profile dropdown.
          </li>
          <li>
            Click <strong>+</strong> &rarr; <strong>Import Profiles</strong> and select your .cube file. Lightroom internally converts it to a .xmp profile under <em>User Profiles</em>.
          </li>
          <li>Apply the new profile to one photo. Tweak intensity (Amount slider, 0&ndash;200) and any other Develop adjustments you want propagated.</li>
          <li>
            Select all the other photos in the filmstrip. Right-click the developed photo and choose <em>Develop Settings &rarr; Copy Settings</em>. Pick which slider values to copy.
          </li>
          <li>
            Right-click any of the selected photos and choose <em>Paste Settings</em>. The look propagates to the batch.
          </li>
        </ol>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Where this shines</strong>: you can pair the LUT with per-photo exposure, white balance and noise reduction adjustments inside the same step. SammaPix is purely a color remap &mdash; Lightroom is a full RAW developer. If your batch has wildly varying exposure, Lightroom&rsquo;s batch sync (with auto-tone enabled) handles it better.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* METHOD 3: PREMIERE / DAVINCI */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="premiere-davinci-batch" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Method 3: Premiere or DaVinci batch (video clips)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For video, the workflow is different. Both Premiere and DaVinci treat a LUT as a clip-level effect that gets duplicated across the timeline rather than file-level batch processing.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Premiere</strong>: import all clips into a single sequence, select them all on the timeline, drag the LUT from the Lumetri panel onto the selection (or apply the same Lumetri preset across the selection). Adjust intensity globally with the Creative panel&rsquo;s slider. Render the sequence to output.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">DaVinci Resolve</strong>: in the Color page, select all clips in the timeline thumbnails, then in the node graph add a 3D LUT node and assign your .cube. The free version of Resolve supports 3D LUTs natively. To batch-export, set up a render queue with each clip as a separate render job and submit them all.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* METHOD 4: FFMPEG */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="ffmpeg-batch" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Method 4: FFmpeg command-line batch (free, scriptable)
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For developers and creators comfortable with the terminal, FFmpeg&rsquo;s <code className="font-mono">lut3d</code> filter is unbeatable for video. It&rsquo;s free, deterministic, and scriptable across hundreds of files.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Single file:
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono text-[#171717] dark:text-[#E5E5E5] p-3 rounded mb-4 overflow-x-auto">
          ffmpeg -i input.mp4 -vf lut3d=your.cube -c:a copy output.mp4
        </pre>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Batch loop (bash, applies the same LUT to every .mp4 in a folder):
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono text-[#171717] dark:text-[#E5E5E5] p-3 rounded mb-6 overflow-x-auto">{`for f in *.mp4; do
  ffmpeg -i "$f" -vf lut3d=your.cube -c:a copy "graded_$f"
done`}</pre>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          FFmpeg uses tetrahedral interpolation by default (higher quality than trilinear) and respects the .cube domain ranges. The downside: no GUI, no intensity slider, you have to render every file fully. For a one-shot color grade across hundreds of short clips it&rsquo;s the most efficient option available.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COMPARISON TABLE */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="comparison-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Comparison: which method when
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Method</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Cost</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Stills?</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Video?</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-[#A3A3A3] uppercase">Setup time</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">
                  <strong className="text-[#171717] dark:text-[#E5E5E5]">SammaPix browser batch</strong>
                </td>
                <td className="py-2 px-3">Free</td>
                <td className="py-2 px-3">Yes (50 free, 300 Pro)</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">~10 sec</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">Lightroom Classic batch sync</td>
                <td className="py-2 px-3">$10&ndash;20/mo</td>
                <td className="py-2 px-3">Yes (unlimited)</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">~3 min</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">Premiere multi-clip selection</td>
                <td className="py-2 px-3">$20/mo</td>
                <td className="py-2 px-3">No</td>
                <td className="py-2 px-3">Yes</td>
                <td className="py-2 px-3">~2 min</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3">DaVinci Resolve free</td>
                <td className="py-2 px-3">Free</td>
                <td className="py-2 px-3">Yes (clumsy)</td>
                <td className="py-2 px-3">Yes</td>
                <td className="py-2 px-3">~5 min</td>
              </tr>
              <tr>
                <td className="py-2 px-3">FFmpeg command-line</td>
                <td className="py-2 px-3">Free</td>
                <td className="py-2 px-3">Possible (per-frame)</td>
                <td className="py-2 px-3">Yes</td>
                <td className="py-2 px-3">~30 sec (after install)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">My take after testing all four</strong>: SammaPix wins for everything stills-only because it&rsquo;s the only method with no setup time and no cost. Lightroom wins if your photos are already cataloged there or if exposure needs per-photo adjustment. DaVinci free is the best free video LUT batcher with a GUI. FFmpeg is the answer for everything else.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* COMMON PITFALLS */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="common-pitfalls" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Common pitfalls
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Pitfall #1: applying before fixing exposure.</strong> A LUT remaps colors, not luminance ranges. If half your batch is two stops underexposed and half is properly exposed, the LUT will produce wildly inconsistent results. Fix exposure first (Lightroom auto-tone, Photoshop Levels), then apply the LUT.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Pitfall #2: cross-genre application.</strong> A LUT designed for moody indoor portraits will not flatter a sunny outdoor product shot. Match the LUT genre to the target genre.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Pitfall #3: 100% intensity by default.</strong> Most commercial LUTs are designed to be dialed back to 50&ndash;80%. The full effect can look cartoonish. Use the intensity slider.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Pitfall #4: forgetting white balance.</strong> If your shots have inconsistent white balance, the LUT amplifies that inconsistency. Sync WB across the batch first, then apply the LUT.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* INTENSITY */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 id="intensity-and-blending" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Intensity, blending and per-photo overrides
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          All four methods support intensity control, but with different mechanics:
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">SammaPix</strong>: an &ldquo;Advanced&rdquo; collapsible reveals a 0-100% intensity slider that linearly blends between the original photo and the LUT-applied result. Set once per batch &mdash; affects every photo equally.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Lightroom</strong>: the Profile <em>Amount</em> slider goes 0-200, where 100 is the LUT&rsquo;s natural intensity and 200 doubles it. You can set this differently per photo if you Sync Settings selectively.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Premiere</strong>: Creative tab has an Intensity slider 0-100, applied per clip. To bulk-change, select all clips and use Match Color or Master Clip Effects.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">FFmpeg</strong>: no built-in intensity. Workaround: apply the LUT to a copy of the clip, then blend with the original using a filter graph (<code className="font-mono">blend=all_mode=normal:all_opacity=0.7</code>). Doable but verbose.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SECONDARY CTA */}
        {/* ════════════════════════════════════════════════════════════ */}

        <div className="my-10 bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
            Try the batch applier on your own .cube file &mdash; free
          </h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
            Drop your .cube + 50 photos. Browser processes everything locally. No subscription. No upload. No watermark.
          </p>
          <Link
            href="/tools/color-match"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open LUT batch applier
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
          Can I apply a .cube LUT to multiple photos at once for free?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes. SammaPix lets you drop one .cube file plus up to 50 photos in your browser and applies the LUT to all of them via trilinear interpolation in seconds. No upload, no signup, no subscription. The output downloads as a ZIP. Other free options include FFmpeg (command line) and the LUT preview features in Photoshop and DaVinci&rsquo;s free tier, but those are per-file or per-clip workflows, not native batch processors.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Will my Mastin Labs or VSCO LUTs work in this batch workflow?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes. Mastin Labs, VSCO, RNI, and any other commercial LUT pack ship .cube files that follow the Adobe specification. SammaPix&rsquo;s parser accepts the standard format (LUT_3D_SIZE up to 65, with DOMAIN_MIN/MAX and TITLE headers). Drop the .cube file in the &ldquo;From .cube&rdquo; tab and apply to your batch.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Why not just use Lightroom&rsquo;s batch sync?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Lightroom&rsquo;s batch sync works but requires a Lightroom subscription, importing the .cube as a profile first, applying to one photo, then syncing settings across the batch. SammaPix skips all four steps for free in a browser. If you already pay for Lightroom and have your photos cataloged there, the Lightroom workflow is fine. For everything else, the free batch processor is faster.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          What if my .cube file is 33x33x33 or 65x65x65?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          All standard sizes work. SammaPix parses LUT_3D_SIZE from the header and applies trilinear interpolation at that resolution. 17 is the SammaPix default for extracted LUTs (4,913 grid points), 33 is common for commercial packs (35,937 points, smoother gradients), and 65 is high-fidelity (274,625 points, used in film color science). Quality differences are subtle in most photo applications.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Does the batch processor work on RAW files?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Not directly. SammaPix accepts JPG, PNG, and WebP. RAW workflow is owned by Lightroom, Capture One, or DxO. To apply a LUT to RAW files, develop them to JPEG/PNG first, then run the SammaPix batch processor.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Is there a limit on how many photos I can batch?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          Free users can batch up to 50 photos per session in SammaPix. Pro users get 300 per session. No monthly cap on free &mdash; only soft daily limits at very high volumes.
        </p>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RELATED */}
        {/* ════════════════════════════════════════════════════════════ */}

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Related reads
        </h2>

        <ul className="text-sm text-[#737373] leading-relaxed mb-6 list-disc pl-6 space-y-1.5">
          <li>
            <Link href="/blog/extract-lut-from-photo-free-2026" className="text-[#171717] dark:text-[#E5E5E5] underline">
              How to extract a LUT from a photo free
            </Link>{" "}
            &mdash; the companion guide if you also want to <em>create</em> a LUT instead of just applying one.
          </li>
          <li>
            <Link href="/blog/best-free-topaz-gigapixel-alternatives-2026" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Topaz Gigapixel pricing 2026 + 7 free alternatives
            </Link>{" "}
            &mdash; if you also need upscaling alongside batch color grading.
          </li>
          <li>
            <Link href="/tools/filmlab" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Film Lab
            </Link>{" "}
            &mdash; 14 ready-to-use film presets in the browser if you want a pre-baked look.
          </li>
          <li>
            <Link href="/tools/compress" className="text-[#171717] dark:text-[#E5E5E5] underline">
              Image compressor
            </Link>{" "}
            &mdash; shrink the matched batch up to 90% smaller before publishing.
          </li>
        </ul>

        <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4 italic">
          Published {POST_DATE_FORMATTED}. Tested on Lightroom Classic 13, Premiere Pro 25, DaVinci Resolve 19 (free + Studio) and FFmpeg 7.
        </p>
      </BlogArticleLayout>
    </>
  );
}
