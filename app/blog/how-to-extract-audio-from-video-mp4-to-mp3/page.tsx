import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Extract Audio from a Video (MP4 to MP3), No Upload",
  description:
    "Extract the audio from a video and save it as MP3 or M4A, free and in your browser. No upload, no watermark. Learn which format and bitrate to pick. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-extract-audio-from-video-mp4-to-mp3` },
  keywords: [
    "extract audio from video",
    "mp4 to mp3",
    "video to mp3",
    "how to extract audio from a video",
    "convert mp4 to mp3 no upload",
    "rip audio from video",
    "video to audio",
    "mp4 to mp3 without watermark",
  ],
  openGraph: {
    title: "How to Extract Audio from a Video (MP4 to MP3), No Upload",
    description: "Pull the audio out of any video as MP3 or M4A, in your browser. No upload, no watermark.",
    url: `${APP_URL}/blog/how-to-extract-audio-from-video-mp4-to-mp3`,
    type: "article",
    publishedTime: "2026-06-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Extract Audio from a Video (MP4 to MP3), No Upload",
    description: "Extract audio from any video as MP3 or M4A in your browser. No upload, no watermark.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-22";
const POST_DATE_FORMATTED = "June 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-extract-audio-from-video-mp4-to-mp3`;
const POST_TITLE = "How to Extract Audio from a Video (MP4 to MP3), No Upload";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A video file holds both a video and an audio stream. This guide explains how to extract just the audio and save it as MP3 or M4A, directly in the browser, which format and bitrate to choose, and how to do it without uploading the video.",
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
  publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL, logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["extract audio from video", "mp4 to mp3", "video to mp3", "mp4 to mp3 no upload"],
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
      name: "How do I extract audio from a video without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based tool that runs locally. SammaPix's Extract Audio tool at sammapix.com/tools/extract-audio decodes your video's audio track and encodes it to MP3 or M4A entirely on your device using the WebCodecs API. Nothing is uploaded, so it is faster and private.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert MP4 to MP3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop your MP4 into the Extract Audio tool, choose MP3 and a bitrate, then download. The audio is pulled out of the video and saved as a small MP3 that plays on every device. The whole thing happens in your browser with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "Does extracting audio reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MP3 and M4A are lossy formats, so there is a re-encode, but at 192 to 320 kbps the difference is inaudible to almost everyone. For voice and podcasts, even 128 kbps sounds clean and keeps the file tiny. If you need a perfect copy, choose a lossless format like WAV.",
      },
    },
    {
      "@type": "Question",
      name: "Should I choose MP3 or M4A?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MP3 plays on virtually every device and app, so it is the safest default. M4A uses the AAC codec and is slightly smaller at the same quality, which is ideal for Apple devices and modern players. When in doubt, pick MP3.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a watermark or a file limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No watermark, ever. The free tier handles files up to 500 MB, which is a long video, and larger files are available with Pro or a Day Pass. The audio quality is never degraded by a watermark or branding.",
      },
    },
    {
      "@type": "Question",
      name: "What video formats can I extract audio from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MP4, MOV, WebM and MKV are all supported, along with audio containers like M4A. SammaPix reads the audio track directly from each format and re-encodes it to your chosen output.",
      },
    },
  ],
};

export default function ExtractAudioArticle() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-extract-audio-from-video-mp4-to-mp3"
        description="Sometimes you only want the sound: a song from a music video, a lecture, a voice note you filmed by accident. Here is how I pull the audio out of any video and save it as a clean MP3 in seconds, in the browser, with no upload and no watermark."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={8}
        headings={[
          { id: "just-the-sound", title: "When you only want the sound" },
          { id: "what-it-means", title: "What extracting audio actually means" },
          { id: "mp3-or-m4a", title: "MP3 or M4A: which to pick" },
          { id: "how-to", title: "How to extract audio in your browser" },
          { id: "bitrate", title: "Bitrate: how much quality do you need?" },
          { id: "common-uses", title: "What people use this for" },
          { id: "privacy", title: "Why no upload matters" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A video file contains a separate video stream and audio stream. Extracting audio means saving just the audio on its own, usually as MP3 or M4A.",
          "SammaPix extracts audio entirely in your browser using WebCodecs to decode and a built-in encoder for MP3, so the video is never uploaded and there is no watermark.",
          "MP3 plays on everything and is the safest default. M4A (AAC) is slightly smaller at the same quality, ideal for Apple devices.",
          "Bitrate sets the trade-off: 128 kbps is fine for voice, 192 kbps is a great all-round choice, 320 kbps is effectively transparent for music.",
          "For a perfect, editable copy, choose a lossless format. For sharing and listening, MP3 at 192 to 320 kbps is ideal.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person wearing headphones with a motion-blurred train behind them, representing listening to audio extracted from a video."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Sometimes the audio is the part you actually want to keep.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Extract the audio from your video now</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Extract Audio runs entirely in your browser. Drop an MP4, MOV or WebM, choose MP3 or
              M4A, and download the audio. No upload, no signup, no watermark.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link href="/tools/extract-audio" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Open Extract Audio, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link href="/convert/mp4-to-mp3" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
                MP4 to MP3 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        <h2 id="just-the-sound" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">When you only want the sound</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          You have a video, but the part you want is the audio: a song from a live performance, the talk
          inside a recorded lecture, a podcast someone published as a video, or a voice note you filmed by
          accident. Keeping the whole video just to hear the sound is wasteful, and it will not drop into a
          music app or a playlist. What you want is to pull out the audio and save it as a small, portable
          file.
        </p>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          That used to mean an app or an online converter that uploaded your whole video to a server. It does
          not anymore. A modern browser can decode the audio and write an MP3 right on your device, in
          seconds, with nothing uploaded and no watermark. Here is how, and how to choose the right settings.
        </p>

        <h2 id="what-it-means" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">What extracting audio actually means</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          A video file is really two streams wrapped together: the moving picture and the sound. Extracting
          audio means decoding just the audio stream and saving it on its own, with the video discarded. The
          audio inside a video is usually already compressed (often AAC), and when you save it as MP3 or M4A
          it is re-encoded into a standalone audio file that any player understands. The result is a fraction
          of the original size, because all the video data is gone.
        </p>

        <h2 id="mp3-or-m4a" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">MP3 or M4A: which to pick</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Both are good. The difference is compatibility versus efficiency.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-gray-200 dark:border-[#2A2A2A]"><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Format</th><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Best for</th><th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Note</th></tr></thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">MP3</td><td className="py-2 pr-4">Anything, anywhere</td><td className="py-2">Plays on every device and app, the safe default</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">M4A (AAC)</td><td className="py-2 pr-4">Apple, modern players</td><td className="py-2">Slightly smaller at the same quality</td></tr>
              <tr><td className="py-2 pr-4">WAV</td><td className="py-2 pr-4">Editing, mastering</td><td className="py-2">Lossless but large, no compression</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          For sending a clip, saving a song, or listening on the go, MP3 is the right call. Choose M4A if you
          live in the Apple world and want the smallest file at the same quality.
        </p>

        {/* CTA 1 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">Just want the MP3? Drop your video and pick the bitrate.</p>
          <Link href="/tools/extract-audio" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Open the Extract Audio tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="how-to" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">How to extract audio in your browser</h2>
        <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Drop your video.</strong> Open <Link href="/tools/extract-audio" className="text-[#6366F1] hover:underline">the Extract Audio tool</Link> and drag an MP4, MOV, WebM or MKV onto the page. It is read locally, never uploaded.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Pick MP3 or M4A.</strong> Choose the format and a bitrate from 128 to 320 kbps.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Extract.</strong> The audio track is decoded with WebCodecs and encoded to your chosen format, right on your device.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Preview and download.</strong> Listen to the result in the player, then download the audio file.</li>
        </ol>

        <h2 id="bitrate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Bitrate: how much quality do you need?</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Bitrate is how much data the audio uses per second. Higher means better quality and a bigger file.
          Here is the simple guide.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-gray-200 dark:border-[#2A2A2A]"><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Bitrate</th><th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Use it for</th></tr></thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">128 kbps</td><td className="py-2">Voice, podcasts, lectures, smallest file</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">192 kbps</td><td className="py-2">A great all-round choice for most audio</td></tr>
              <tr><td className="py-2 pr-4">320 kbps</td><td className="py-2">Music, when you want it effectively transparent</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="common-uses" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">What people use this for</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Saving a song</strong> from a music video or live performance to listen offline.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Turning a talk or lecture</strong> filmed as video into a podcast-style MP3 for the commute.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Pulling a voice note</strong> out of a clip you recorded as video.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Grabbing a sound or sample</strong> for editing in another app.</li>
        </ul>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          A reminder on respecting copyright: extract audio from videos you own or have the right to use.
        </p>

        {/* CTA 2 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">MP4, MOV or WebM to MP3, all in your browser, nothing uploaded.</p>
          <Link href="/convert/mp4-to-mp3" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Convert MP4 to MP3 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why no upload matters</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Most MP4 to MP3 sites upload your entire video to a server, transcode it there, and hand you a
          download. That means your footage, which often includes people, voices and private moments, sits on
          someone else&apos;s machine. SammaPix does the whole job in your browser, so the file never leaves your
          device. It is faster, and it is the same principle behind every SammaPix tool, explained more in the{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-[#6366F1] hover:underline">guide to browser-based privacy tools</Link>.
        </p>

        {/* CTA 3 */}
        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Extract audio from a video, no upload</h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">MP3 or M4A, 128 to 320 kbps, no watermark, all in your browser.</p>
          <Link href="/tools/extract-audio" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Extract Audio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
        {faqSchema.mainEntity.map((item) => (
          <div key={item.name} className="mb-5">
            <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
            <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5]">{item.acceptedAnswer.text}</p>
          </div>
        ))}
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
