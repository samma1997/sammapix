import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Compress a Video Online Without Uploading It (2026)",
  description:
    "Compress MP4, MOV, WebM and MKV videos in your browser, no upload and no signup. Powered by WebCodecs, SammaPix shrinks files up to 80% in seconds with a live size preview and before/after compare. Updated 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/compress-video-online-no-upload`,
  },
  keywords: [
    "compress video online",
    "compress video without uploading",
    "compress video in browser",
    "compress mp4",
    "reduce video file size",
    "compress video for whatsapp",
    "compress video for email",
    "compress video without losing quality",
    "no upload video compressor",
    "webcodecs video compression",
  ],
  openGraph: {
    title: "How to Compress a Video Online Without Uploading It (2026)",
    description:
      "Shrink MP4, MOV and WebM up to 80% right in your browser. No upload, no signup, WebCodecs-fast, with a live size preview and before/after compare.",
    url: `${APP_URL}/blog/compress-video-online-no-upload`,
    type: "article",
    publishedTime: "2026-06-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress a Video Online Without Uploading It (2026)",
    description:
      "Compress MP4/MOV/WebM up to 80% in your browser. No upload, seconds not minutes, before/after compare.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-22";
const POST_DATE_FORMATTED = "June 22, 2026";
const POST_URL = `${APP_URL}/blog/compress-video-online-no-upload`;
const POST_TITLE =
  "How to Compress a Video Online Without Uploading It (2026)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Video files are huge because modern phones record in 4K at high bitrates. This guide explains why videos get so big, the two ways to compress them, and how to shrink an MP4, MOV or WebM by up to 80 percent directly in your browser with WebCodecs, without uploading the file to any server.",
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
    "compress video online",
    "compress video without uploading",
    "compress mp4",
    "reduce video file size",
    "compress video for whatsapp",
    "webcodecs video compression",
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

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compress a video without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based compressor that runs locally instead of on a server. SammaPix's Compress Video tool at sammapix.com/tools/compress-video reads your MP4, MOV, WebM or MKV file, re-encodes it with your browser's built-in WebCodecs video encoder, and writes a new smaller MP4. Nothing is ever uploaded. Your video stays on your device the entire time, which is faster and private.",
      },
    },
    {
      "@type": "Question",
      name: "Why are my video files so large?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern phones record in 4K at 50 to 100 megabits per second. That is roughly 375 to 750 megabytes per minute. A two minute 4K clip can easily be over a gigabyte. The resolution, the high bitrate, and the frame rate all multiply together. Most of that data is invisible on a phone or laptop screen, which is why compressing down to 1080p at a sensible bitrate can cut the file by 70 to 80 percent with no noticeable difference.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I compress a video without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most footage you can save 50 to 80 percent. Downscaling a 4K clip to 1080p alone removes about 75 percent of the pixels with no visible loss on normal screens. Re-encoding at a balanced bitrate trims more. Visible quality only starts to drop when you push toward very small files on detailed or fast-moving footage. A before/after compare lets you judge the exact trade-off before you download.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compress a video for WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WhatsApp limits video to 16 megabytes for most accounts. Compress your clip to MP4 at 1080p or 720p with a balanced or small quality preset. SammaPix shows a live estimated size as you choose settings, so you can land under 16 megabytes before exporting. Downscaling to 1080p and picking the Small preset is usually enough for clips up to a couple of minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress a video on an online tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Most online compressors upload your video to a remote server, which is a privacy risk for personal clips, client work, or anything confidential. SammaPix compresses entirely inside your browser using WebCodecs. The file is read by code running locally on your device. It is never uploaded, never stored, and never visible to SammaPix or anyone else.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best format to compress a video to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MP4 with the H.264 codec is the safest choice because it plays on every device, app and browser. SammaPix outputs MP4 with H.264 by default. For maximum compression you can choose AV1, a newer codec that produces files 30 to 50 percent smaller at the same quality, though it needs a recent device to play back. Avoid HEVC and H.265 for sharing because support is patchy outside Apple devices.",
      },
    },
    {
      "@type": "Question",
      name: "Why is browser video compression faster than other online tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many online compressors run FFmpeg compiled to WebAssembly, which works on the CPU only with no access to your device's video hardware, so a short clip can take minutes. SammaPix uses the modern WebCodecs API, which taps the same hardware encoder your phone and laptop use to record video. In controlled tests that difference is roughly 15 times faster, the gap between waiting a few seconds and waiting several minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What video formats and file sizes can I compress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix accepts MP4, MOV, WebM, MKV, M4V, AVI and 3GP. It outputs MP4 with H.264 by default and AV1 as an option. You can compress files up to 500 megabytes on desktop and 250 megabytes on mobile. The whole process runs in your browser, so very large files depend on your device's available memory.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CompressVideoOnlineNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="compress-video-online-no-upload"
        description="A 90 second clip off a modern phone can be half a gigabyte. Email bounces it, WhatsApp refuses it, and the upload-based compressors want to send your footage to their servers first. Here is how I shrink a video by up to 80 percent in seconds, in the browser, without uploading it anywhere."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={10}
        headings={[
          { id: "the-clip-that-wouldnt-send", title: "The 90 second clip that would not send" },
          { id: "why-videos-are-huge", title: "Why video files get so large" },
          { id: "two-ways-to-compress", title: "The two ways to compress a video (and why most are slow)" },
          { id: "how-to-compress-in-browser", title: "How to compress a video in your browser" },
          { id: "resolution-biggest-lever", title: "Resolution: the single biggest lever" },
          { id: "quality-presets", title: "Quality presets, bitrate and what they actually do" },
          { id: "compress-for-whatsapp-email", title: "Compress video for WhatsApp, email and Slack" },
          { id: "mp4-webm-av1", title: "MP4 vs WebM vs AV1: which format to pick" },
          { id: "does-quality-drop", title: "Does compressing actually reduce quality?" },
          { id: "privacy-no-upload", title: "Why no upload matters for video" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Video files are huge because phones record in 4K at 50 to 100 Mbps, which is hundreds of megabytes per minute. Most of that detail is invisible on a normal screen.",
          "SammaPix compresses MP4, MOV, WebM and MKV entirely in your browser using WebCodecs, your device's hardware video encoder. Nothing is uploaded.",
          "WebCodecs is roughly 15 times faster than the FFmpeg-in-WebAssembly approach most online compressors use. A 4K clip compresses in seconds, not minutes.",
          "Downscaling 4K to 1080p alone saves about 75 percent before any quality compression. It is the single biggest lever.",
          "Default output is MP4 with H.264 so it plays everywhere. AV1 is an optional mode for files 30 to 50 percent smaller at equal quality.",
          "A live estimated size and a synchronized before/after player let you judge the exact size and quality trade-off before you download.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A professional 4K cinema camera on a tripod, representing the high resolution footage that produces very large video files in need of compression."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              4K cameras and phones produce gorgeous footage and enormous files. Compression is how you actually share it.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Compress your video right now, nothing uploaded
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Compress Video runs entirely in your browser with WebCodecs. Drop any MP4, MOV, WebM
              or MKV file, shrink it up to 80 percent in seconds, and compare before and after side by side.
              Your video never leaves your device.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/compress-video"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Compress Video, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/gif-to-mp4"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                GIF to MP4 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: hook ─────────────────────────────────────────────── */}

        <h2 id="the-clip-that-wouldnt-send" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The 90 second clip that would not send
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          You film something worth keeping. A first birthday, a product demo, a clip from a trip. It is
          90 seconds long, shot in 4K on a phone, and when you go to send it the file is 480 megabytes.
          Email rejects it at the 25 megabyte mark. WhatsApp refuses anything over 16. The messaging app
          silently crushes it into a blurry mess. So you search for an online video compressor, and the
          first three results all want to upload your footage to a server you have never heard of, then
          make you wait in a queue.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          There is a better way, and it has only become practical in the last couple of years. Modern
          browsers can now re-encode video using the same hardware chip your phone uses to record it.
          That means you can compress a video right on the page, in seconds, with nothing uploaded
          anywhere. This guide explains why your files are so big in the first place, how compression
          actually works, and how to shrink a video by up to 80 percent without it ever leaving your
          device.
        </p>

        {/* ── Section 2: why huge ─────────────────────────────────────────── */}

        <h2 id="why-videos-are-huge" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why video files get so large
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          A video is just a stream of still images shown quickly, plus a sound track. Three numbers decide
          how big that stream is: resolution, bitrate, and frame rate. They multiply together, which is
          why files balloon so fast.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Resolution</strong> is how many pixels are in
            each frame. 4K is 3840 by 2160, which is 8.3 million pixels. 1080p is 1920 by 1080, just 2.1
            million. That is four times fewer pixels for 1080p before anything else changes.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Bitrate</strong> is how much data the camera
            spends per second to describe the motion. Phones often record 4K at 50 to 100 megabits per
            second, which is wildly more than you need for sharing.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Frame rate</strong> is how many images per
            second, usually 30 or 60. Sixty frames doubles the work compared to thirty.
          </li>
        </ul>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Put real numbers on it and the problem is obvious.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Recording</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Typical bitrate</th>
                <th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Size per minute</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">4K 60fps (phone)</td>
                <td className="py-2 pr-4">~100 Mbps</td>
                <td className="py-2">~750 MB</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">4K 30fps (phone)</td>
                <td className="py-2 pr-4">~50 Mbps</td>
                <td className="py-2">~375 MB</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">1080p 30fps</td>
                <td className="py-2 pr-4">~8 Mbps</td>
                <td className="py-2">~60 MB</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">1080p compressed (balanced)</td>
                <td className="py-2 pr-4">~4 Mbps</td>
                <td className="py-2">~30 MB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The key insight is that almost none of that 4K data survives the journey to a human eye. Your
          recipient watches on a phone screen, a laptop, or a chat window. At that size, well-compressed
          1080p is indistinguishable from the 4K original, while being roughly a tenth of the size.
        </p>

        {/* ── Section 3: two ways ─────────────────────────────────────────── */}

        <h2 id="two-ways-to-compress" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The two ways to compress a video (and why most are slow)
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          There are really only two places a video can be re-encoded: on a server, or on your own device.
          Almost every popular online compressor uses the first approach.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Server-side: upload, wait, download
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The classic online compressor uploads your whole file, re-encodes it on their machines, and
          hands you a link. This has two costs. First, your footage leaves your device and sits on
          someone else's server, where you have no real control over how long it is kept. Second, you pay
          the upload time twice: once to send the big original, once to download the result, plus whatever
          queue they put you in. For a 480 megabyte file on a normal connection, the upload alone can take
          minutes before any compression starts.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Browser-side: nothing leaves your device
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The modern approach does the entire job locally. There are two ways to do this in a browser, and
          the difference between them is enormous. The older method ships FFmpeg compiled to WebAssembly.
          It runs, but only on the CPU, with no access to your device's dedicated video hardware, so a
          short clip can take several minutes. The newer method uses the WebCodecs API, which hands the
          work to the same hardware encoder your phone uses to record video in real time.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          In controlled benchmarks the WebCodecs path is around fifteen times faster than FFmpeg in
          WebAssembly for the same job. That is the difference between a tool that feels instant and one
          that makes you stare at a progress bar. SammaPix is built on WebCodecs for exactly this reason.
        </p>

        {/* ── CTA 1 ───────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">
            Want to skip the theory and just shrink a file? Drop it into the tool and watch the estimated
            size update live before you commit.
          </p>
          <Link
            href="/tools/compress-video"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
          >
            Open the Compress Video tool
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: how to ───────────────────────────────────────────── */}

        <h2 id="how-to-compress-in-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to compress a video in your browser
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The whole flow takes well under a minute for a typical clip. Here is exactly what happens.
        </p>

        <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Drop your video.</strong> Open{" "}
            <Link href="/tools/compress-video" className="text-[#6366F1] hover:underline">the Compress Video tool</Link>{" "}
            and drag an MP4, MOV, WebM, MKV or AVI file onto the page. It is read locally, never uploaded.
            The tool immediately reads its resolution, length and codec.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Pick a quality.</strong> Choose High,
            Balanced, or Small. If your clip is 4K, leave the one tap Downscale to 1080p toggle on, it
            saves around 75 percent on its own. The estimated output size updates live as you change
            settings.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Compress.</strong> Hit the button.
            Encoding runs on your device's hardware via WebCodecs, with a real progress percentage and a
            time estimate. A 4K clip of a couple of minutes finishes in seconds on a modern laptop.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-[#E5E5E5]">Compare and download.</strong> A
            synchronized before/after player plays both versions at the same frame so you can judge the
            quality. When you are happy, download the MP4.
          </li>
        </ol>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          There is no account, no watermark, and no upload step. The original never moves off your machine.
        </p>

        {/* ── Section 5: resolution ───────────────────────────────────────── */}

        <h2 id="resolution-biggest-lever" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Resolution: the single biggest lever
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          If you only remember one thing from this article, make it this: for most uses, dropping 4K to
          1080p is the most effective thing you can do, and it costs you nothing you will ever notice.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The reason is the pixel math. 4K has four times the pixels of 1080p. Before you touch any quality
          setting, throwing away three quarters of the pixels removes roughly three quarters of the data
          the encoder has to store. And nobody watching a clip in a chat window, an email, or a social
          feed can tell 1080p from 4K at that size. The screens are simply not big enough to show the
          difference.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          That is why SammaPix detects 4K footage automatically and turns the Downscale to 1080p toggle on
          for you. You can switch it off if you genuinely need to keep 4K, for example footage you plan to
          edit or project on a large screen. But for sharing, 1080p plus a sensible quality preset is the
          sweet spot almost every time.
        </p>

        {/* ── Section 6: presets ──────────────────────────────────────────── */}

        <h2 id="quality-presets" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quality presets, bitrate and what they actually do
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          After resolution, the second lever is bitrate, the amount of data spent per second of video.
          Lower bitrate means a smaller file but, past a point, visible blocky artifacts. SammaPix wraps
          this in three plain language presets so you do not have to think in megabits.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Preset</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Best for</th>
                <th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Result</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">High</td>
                <td className="py-2 pr-4">Footage you may keep or re-edit</td>
                <td className="py-2">Near identical to the source, moderate savings</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">Balanced</td>
                <td className="py-2 pr-4">General sharing, the default</td>
                <td className="py-2">Looks great, usually 60 to 75 percent smaller</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Small</td>
                <td className="py-2 pr-4">Strict size limits, quick sends</td>
                <td className="py-2">Lightest file, fine on phone screens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What about the audio?
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Audio is a tiny fraction of a video's size, so there is little to gain by re-compressing it and a
          lot to lose. SammaPix copies the original audio track through untouched whenever the output
          format allows it. Your sound stays exactly as recorded, with zero quality loss, while all the
          savings come from the video stream where they belong.
        </p>

        {/* ── Section 7: whatsapp/email ───────────────────────────────────── */}

        <h2 id="compress-for-whatsapp-email" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Compress video for WhatsApp, email and Slack
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Most of the time people compress a video to get under a specific limit. Here are the common ones
          and how to hit them.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Destination</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Limit</th>
                <th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Settings to try</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">WhatsApp</td>
                <td className="py-2 pr-4">16 MB</td>
                <td className="py-2">1080p, Small preset</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">Gmail and most email</td>
                <td className="py-2 pr-4">25 MB</td>
                <td className="py-2">1080p, Small or Balanced</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#222]">
                <td className="py-2 pr-4">Slack (free)</td>
                <td className="py-2 pr-4">~1 GB but practical limits apply</td>
                <td className="py-2">1080p, Balanced</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Discord (free)</td>
                <td className="py-2 pr-4">25 MB</td>
                <td className="py-2">1080p, Small preset</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Because the estimated size updates live, you do not have to guess. Pick your resolution and
          preset, watch the number, and adjust until it sits comfortably under the limit before you export.
          If a clip simply will not fit at a watchable quality, the honest fix is to trim it shorter rather
          than crush the bitrate into mush.
        </p>

        {/* ── CTA 2 ───────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">
            Need to get under WhatsApp's 16 MB or email's 25 MB limit? Set 1080p plus the Small preset and
            watch the live size land where you need it.
          </p>
          <Link
            href="/tools/compress-video"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
          >
            Compress a video now
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 8: formats ──────────────────────────────────────────── */}

        <h2 id="mp4-webm-av1" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          MP4 vs WebM vs AV1: which format to pick
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The container and codec you choose affect both compatibility and how small the file gets. Here is
          the short version.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          MP4 with H.264: the safe default
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          MP4 using the H.264 codec plays on essentially every device, app, browser and social platform
          made in the last fifteen years. This is what SammaPix produces by default, and what you want for
          anything you are sending to other people. If you are unsure, this is the right choice.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          AV1: smallest files, newer playback
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          AV1 is a modern codec that produces files roughly 30 to 50 percent smaller than H.264 at the
          same visual quality. It is excellent for storage or for a website you control. The trade-off is
          that older devices may not play it smoothly. SammaPix offers AV1 as an advanced option and falls
          back automatically if your browser cannot encode it. Use it when small size matters more than
          universal playback.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          A note on HEVC and H.265
        </h3>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          HEVC, also called H.265, compresses well but has patchy support outside Apple devices and is
          tangled in licensing. For sharing it tends to cause more headaches than it solves, which is why
          SammaPix sticks to H.264 for compatibility and AV1 for maximum compression.
        </p>

        {/* ── Section 9: quality ──────────────────────────────────────────── */}

        <h2 id="does-quality-drop" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does compressing actually reduce quality?
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Honestly, yes, compression is a trade-off by definition. The real question is whether the loss is
          visible, and for sensible settings the answer is no. The trick is that you stay in control and
          can see the result before you commit.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          This is what the synchronized before/after player is for. It shows the original and the compressed
          version side by side, locked to the same frame, so you can scrub through and look for any
          difference on the exact moments that matter. On normal footage at 1080p with the Balanced preset,
          most people cannot tell which side is which. If you do spot softness on a detailed or fast moving
          shot, step up to High or keep more resolution. You are never guessing.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          One thing to avoid: never re-compress an already compressed video over and over. Each pass throws
          away a little more. Compress once from the highest quality source you have, and keep that
          original.
        </p>

        {/* ── Section 10: privacy ─────────────────────────────────────────── */}

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no upload matters for video
        </h2>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Photos carry hidden metadata like GPS coordinates. Video carries all of that and more: location,
          device, timestamps, and of course the footage itself, which often shows people, homes, documents,
          or work that is not meant for a stranger's server. The moment you upload a clip to a free online
          compressor, you are trusting that company with all of it, and trusting that they delete it when
          they say they do.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Browser-side compression removes that question entirely. With SammaPix, the file is read by code
          running on your own device. It is never transmitted, never stored on a server, and never visible
          to anyone but you. For client work, anything filmed at home, or just personal clips you would
          rather not hand over, that is the only model that makes sense. It is the same principle behind
          every SammaPix tool: the work happens where your files already are.
        </p>

        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          If you want to strip the metadata out of your clips and photos as well, the same browser-first
          approach applies. You can read more in the{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-[#6366F1] hover:underline">
            guide to browser-based privacy tools
          </Link>
          .
        </p>

        {/* ── CTA 3 (gray) ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
            Compress a video without uploading it
          </h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            MP4, MOV, WebM and MKV, up to 80 percent smaller, in seconds, with a before/after compare.
            Everything runs in your browser.
          </p>
          <Link
            href="/tools/compress-video"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Compress Video
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        {faqSchema.mainEntity.map((item) => (
          <div key={item.name} className="mb-5">
            <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
            <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5]">
              {item.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </BlogArticleLayout>

      {/* ── Structured data ─────────────────────────────────────────────── */}
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
    </>
  );
}
