import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Mute a Video (Remove the Audio) Without Uploading It",
  description:
    "Mute a video and remove its audio for free, right in your browser. No upload, no signup, no quality loss. Strip the sound from any MP4, MOV or WebM in seconds. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-mute-a-video-remove-audio-no-upload` },
  keywords: [
    "mute video",
    "remove audio from video",
    "how to mute a video",
    "remove sound from video",
    "silence video",
    "delete audio from video",
    "mute mp4",
    "mute video no upload",
  ],
  openGraph: {
    title: "How to Mute a Video (Remove the Audio) Without Uploading It",
    description: "Strip the audio from any video in your browser. Instant, no quality loss, no upload.",
    url: `${APP_URL}/blog/how-to-mute-a-video-remove-audio-no-upload`,
    type: "article",
    publishedTime: "2026-06-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Mute a Video (Remove the Audio) Without Uploading It",
    description: "Remove the audio from any video in your browser. Instant, no upload.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-22";
const POST_DATE_FORMATTED = "June 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-mute-a-video-remove-audio-no-upload`;
const POST_TITLE = "How to Mute a Video (Remove the Audio) Without Uploading It";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Muting a video means removing its audio track while keeping the picture untouched. This guide explains why it is instant and lossless, common reasons to do it, and how to mute a video in the browser without uploading the file.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: { "@type": "Person", name: "Luca Sammarco", url: "https://www.sammapix.com/about", image: "https://www.sammapix.com/luca-sammarco.jpg", sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"] },
  publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL, logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["mute video", "remove audio from video", "how to mute a video", "mute mp4"],
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
    { "@type": "Question", name: "How do I mute a video without uploading it?", acceptedAnswer: { "@type": "Answer", text: "Use a browser-based tool that runs locally. SammaPix's Mute Video tool at sammapix.com/tools/mute-video removes the audio track and keeps the video untouched, entirely on your device. Because the video is not re-encoded, it is near-instant, and nothing is uploaded." } },
    { "@type": "Question", name: "Does muting a video reduce its quality?", acceptedAnswer: { "@type": "Answer", text: "No. Only the audio track is removed. The video stream is copied as is, not re-encoded, so the picture is byte-for-byte identical to the original." } },
    { "@type": "Question", name: "Why would I remove the audio from a video?", acceptedAnswer: { "@type": "Answer", text: "Common reasons include removing background conversations or noise, stripping copyrighted music before posting, deleting a voice you do not want shared, or preparing a silent clip to add your own soundtrack later." } },
    { "@type": "Question", name: "Is my video uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The whole process runs in your browser with WebCodecs. Your file never leaves your device, which is faster and fully private." } },
    { "@type": "Question", name: "Is it free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no signup and no watermark. Free covers files up to 500 MB; larger files are available with Pro or a Day Pass." } },
  ],
};

export default function MuteVideoArticle() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-mute-a-video-remove-audio-no-upload"
        description="Sometimes the picture is perfect but the sound has to go: a conversation in the background, copyrighted music, a voice you would rather not share. Here is how I strip the audio out of a video in seconds, in the browser, with no quality loss and nothing uploaded."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={6}
        headings={[
          { id: "sound-has-to-go", title: "When the sound has to go" },
          { id: "instant-lossless", title: "Why muting is instant and lossless" },
          { id: "how-to", title: "How to mute a video in your browser" },
          { id: "reasons", title: "Common reasons to remove audio" },
          { id: "privacy", title: "Why no upload matters" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Muting a video removes the audio track and leaves the picture completely untouched.",
          "SammaPix copies the video stream without re-encoding, so muting is near-instant and there is zero quality loss.",
          "It all runs in your browser with WebCodecs, so the video is never uploaded and there is no watermark.",
          "Common reasons: removing background noise or conversations, stripping copyrighted music, or preparing a silent clip for a new soundtrack.",
          "Free covers files up to 500 MB, with larger files available on Pro or a Day Pass.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A camera filming a live music performance on its monitor, representing a video whose audio you might want to remove."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Great footage, wrong soundtrack. Muting keeps the picture and drops the audio.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Mute your video now</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">SammaPix Mute Video runs entirely in your browser. Drop an MP4, MOV or WebM, remove the audio, and download. Instant, no quality loss, no upload, no watermark.</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link href="/tools/mute-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Mute Video, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
              <Link href="/tools/extract-audio" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Extract the audio instead <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
            </div>
          </div>
        }
      >
        <h2 id="sound-has-to-go" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">When the sound has to go</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          The video looks great, but the audio is a problem. Maybe there is a conversation in the background you do not want to share. Maybe the music playing in the room is copyrighted and would get the post taken down. Maybe you just want a clean, silent clip to add your own soundtrack to later. Whatever the reason, you want to keep the picture exactly as it is and remove only the sound.
        </p>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          That is muting, and it is one of the simplest, fastest edits there is, especially when it runs in your browser with nothing uploaded.
        </p>

        <h2 id="instant-lossless" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why muting is instant and lossless</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          A video file holds two streams: the picture and the sound. Muting simply drops the audio stream and rewraps the existing video stream into a new file. Crucially, the video is not decoded and re-encoded, it is copied exactly as it was. That means there is zero quality loss, the picture is identical down to the pixel, and the whole thing finishes almost instantly, even for a long clip. Compare that to tools that re-process the entire video just to remove the sound.
        </p>

        <h2 id="how-to" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">How to mute a video in your browser</h2>
        <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Drop your video.</strong> Open <Link href="/tools/mute-video" className="text-[#6366F1] hover:underline">the Mute Video tool</Link> and drag an MP4, MOV, WebM or MKV onto the page. It is read locally, never uploaded.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Remove the audio.</strong> Click the button. The video is kept exactly as is and the sound track is dropped.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Download.</strong> The muted MP4 is ready almost instantly because the video is not re-encoded.</li>
        </ol>

        {/* CTA 1 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">Just need the sound gone? Drop the clip and download the silent version.</p>
          <Link href="/tools/mute-video" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Open the Mute Video tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="reasons" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Common reasons to remove audio</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Privacy:</strong> remove a background conversation or a voice you do not want shared.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Copyright:</strong> strip music that could get a post muted or taken down.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Clean slate:</strong> get a silent clip so you can add your own voiceover or soundtrack.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Noise:</strong> drop wind, traffic or room noise that distracts from the visuals.</li>
        </ul>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          If you want to keep the sound separately before muting, you can also <Link href="/tools/extract-audio" className="text-[#6366F1] hover:underline">extract the audio</Link> as an MP3 first.
        </p>

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why no upload matters</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Often the very reason you are muting a video is privacy, a voice or conversation you do not want out there. Uploading that clip to a server to remove the audio rather defeats the purpose. SammaPix does the whole thing in your browser, so the file never leaves your device. It is the same principle behind every SammaPix tool, explained more in the{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-[#6366F1] hover:underline">guide to browser-based privacy tools</Link>.
        </p>

        {/* CTA 2 */}
        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Remove the audio from a video, no upload</h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Instant, no quality loss, no watermark, all in your browser.</p>
          <Link href="/tools/mute-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Mute Video <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
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
