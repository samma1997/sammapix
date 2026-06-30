import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Transcribe a Video and Generate SRT Subtitles for Free",
  description:
    "Turn any video or audio into a full text transcript and ready-to-use SRT subtitles with AI, free, with no signup to try. This guide covers how it works, what an SRT file is, how to add the subtitles to your video, and when to use it. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-transcribe-video-generate-subtitles-free` },
  keywords: [
    "subtitle generator free",
    "srt subtitle generator",
    "transcribe video free",
    "automatic subtitles free",
    "video to text",
    "generate subtitles ai",
    "transcribe audio to text",
  ],
  openGraph: {
    title: "How to Transcribe a Video and Generate SRT Subtitles for Free",
    description:
      "Turn any video or audio into a text transcript and ready-to-use SRT subtitles with AI, free, no signup to try. Updated 2026.",
    url: `${APP_URL}/blog/how-to-transcribe-video-generate-subtitles-free`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Transcribe a Video and Generate SRT Subtitles for Free",
    description: "Turn any video into a transcript and SRT subtitles with AI, free, no signup to try. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-transcribe-video-generate-subtitles-free`;
const POST_TITLE = "How to Transcribe a Video and Generate SRT Subtitles for Free";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to turn any video or audio into a full text transcript and ready-to-use SRT subtitles with AI, including what an SRT file is and how to add subtitles to your video.",
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
  keywords: ["subtitle generator free", "srt subtitle generator", "transcribe video free", "video to text"],
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
      name: "How do I transcribe a video for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix Transcribe tool at sammapix.com/tools/transcribe. Add your video or audio file and AI returns a full text transcript plus subtitles in SRT format. It is free to try with no signup, and it is powered by Google Gemini.",
      },
    },
    {
      "@type": "Question",
      name: "What is an SRT file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SRT, or SubRip Subtitle, is the most widely supported subtitle format. It is a small text file that lists each line of dialogue with a start and end timecode. Almost every video player, editor, and platform, from VLC to YouTube to Premiere, can load an SRT file to display subtitles.",
      },
    },
    {
      "@type": "Question",
      name: "Can I transcribe audio as well as video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool handles both. You can transcribe a podcast, an interview recording, a voice memo, or a lecture the same way you transcribe a video, and get a clean text transcript back.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add the subtitles to my video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For online platforms, upload the SRT alongside your video. YouTube, for example, has a subtitles section where you import the SRT. For a permanent burn-in, load the SRT into a video editor such as Premiere, DaVinci Resolve, or CapCut, which place the timed captions onto the footage.",
      },
    },
    {
      "@type": "Question",
      name: "Why add subtitles at all?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most social video is watched on mute, so captions are often the only way your message lands. They also make content accessible to deaf and hard-of-hearing viewers, help non-native speakers, and give search engines and platforms text to index, which can improve reach.",
      },
    },
  ],
};

export default function HowToTranscribeVideoPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-transcribe-video-generate-subtitles-free"
        description="Manual transcription is slow, and most caption services want a subscription. This guide shows how to turn any video or audio into a full text transcript and a ready-to-use SRT subtitle file with AI, for free, what an SRT actually is, and how to get the captions onto your video."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "why", title: "Why you need a transcript and subtitles" },
          { id: "how", title: "How to transcribe a video with AI" },
          { id: "srt", title: "What an SRT file is" },
          { id: "add", title: "How to add the subtitles to your video" },
          { id: "uses", title: "Transcripts beyond captions" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "AI turns a video or audio file into a full text transcript plus an SRT subtitle file.",
          "SammaPix Transcribe is free to try with no signup, powered by Google Gemini.",
          "SRT is the universal subtitle format that almost every player and platform accepts.",
          "Most social video is watched on mute, so captions are what make the message land.",
          "The transcript also doubles as blog text, show notes, or searchable meeting minutes.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
              alt="A video being transcribed into text and subtitles"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              One upload, and you get both a transcript and ready-to-use subtitles
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Transcribe your video, free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Transcribe turns any video or audio into a text transcript and an SRT subtitle file
              with AI. Free to try, no signup.
            </p>
            <Link
              href="/tools/transcribe"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try Transcribe, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="why" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you need a transcript and subtitles
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two facts drive almost every transcription job. First, <strong className="text-gray-800 dark:text-[#E5E5E5]">most social video is watched on mute</strong>, so without captions your message simply does not reach scrolling viewers. Second, transcribing by hand is painfully slow, roughly four to six minutes of typing for every minute of audio, and most caption services want a monthly subscription before they hand anything back.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AI collapses that. You give it the file once and get back two things at the same time: a clean <strong className="text-gray-800 dark:text-[#E5E5E5]">text transcript</strong> you can paste anywhere, and a timed <strong className="text-gray-800 dark:text-[#E5E5E5]">SRT subtitle file</strong> you can drop onto the video.
        </p>

        <h2 id="how" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to transcribe a video with AI
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/transcribe" className="text-[#6366F1] hover:underline">SammaPix Transcribe tool</Link>{" "}
          is powered by Google Gemini and free to try with no signup.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/transcribe</strong> in your browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Add your video or audio file</strong>, a clip, podcast, interview, or lecture.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Let the AI transcribe</strong> it into text with timecodes.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download</strong> the full transcript and the SRT subtitle file.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Get a transcript and SRT in one go</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Add a video or audio file, get back text and ready-to-use subtitles. Free, no signup to try.</p>
          <Link href="/tools/transcribe" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the Transcribe Tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="srt" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What an SRT file is
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SRT stands for SubRip Subtitle, and it is the most universally supported caption format there is. It is just a small text file: each entry has a number, a start and end timecode, and the line of text to show in that window. Because it is plain and standardised, <strong className="text-gray-800 dark:text-[#E5E5E5]">almost everything reads it</strong>, from the free VLC player to YouTube, Instagram, Premiere, DaVinci Resolve, and CapCut. That universality is why getting an SRT, rather than captions locked inside one app, is so useful.
        </p>

        <h2 id="add" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add the subtitles to your video
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are two routes. For <strong className="text-gray-800 dark:text-[#E5E5E5]">platforms</strong>, you upload the SRT next to the video: on YouTube, open the subtitles section and import the SRT, and viewers can toggle captions on. For a <strong className="text-gray-800 dark:text-[#E5E5E5]">permanent burn-in</strong>, where the captions are baked into the picture and always visible, load the SRT into a video editor such as Premiere, DaVinci Resolve, or CapCut, which place the timed text onto the footage so it survives re-uploads and works everywhere.
        </p>

        <h2 id="uses" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Transcripts beyond captions
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The text transcript is worth as much as the subtitles. A podcast episode becomes show notes and a blog post. A recorded meeting becomes searchable minutes. An interview becomes quotable copy without rewinding. And because search engines index text, not speech, publishing the transcript of a video gives that content a way to be found at all. If your source is a video you first need to shrink or convert, the{" "}
          <Link href="/tools/compress-video" className="text-[#6366F1] hover:underline">video compressor</Link>{" "}
          and{" "}
          <Link href="/tools/convert-video" className="text-[#6366F1] hover:underline">video converter</Link>{" "}
          handle that in the browser first.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
