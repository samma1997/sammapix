import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Mic, FileText, Globe } from "lucide-react";
import Link from "next/link";
import TranscribeClient from "@/components/tools/TranscribeClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Video Transcription - Free Subtitle Generator | SammaPix",
  description:
    "Transcribe any video or audio with AI. Get subtitles in SRT format and a full text transcript instantly. Powered by Google Gemini. Free- no signup to try.",
  keywords: [
    "video transcription free",
    "ai video transcription",
    "audio to text online",
    "subtitle generator free",
    "srt subtitle generator",
    "speech to text video",
    "transcribe mp4 free",
    "video caption generator",
    "ai transcription tool",
    "automatic subtitles free",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/transcribe`,
  },
  openGraph: {
    title: "AI Video Transcription - Free Subtitle Generator | SammaPix",
    description:
      "Transcribe any video or audio with AI. Get subtitles in SRT format and a full text transcript instantly. Powered by Google Gemini.",
    url: `${APP_URL}/tools/transcribe`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Video Transcription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Transcription - Free Subtitle Generator | SammaPix",
    description:
      "Transcribe any video or audio with AI. Get subtitles in SRT format and a full text transcript instantly. Powered by Google Gemini. Free- no signup to try.",
  },
};

const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-[#6366F1]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        {/* Speech bubble with audio waves becoming text lines */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    title: "Powered by Google Gemini",
    description:
      "Your video or audio is analysed by Gemini 2.5 Flash- one of the most accurate speech-recognition models available- returning a timestamped transcript within seconds.",
    highlight: true,
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "SRT subtitles included",
    description:
      "Every transcript comes with a timed .srt file ready to upload to YouTube, Vimeo, or any video platform. Segments are split at natural speech boundaries.",
    highlight: false,
  },
  {
    icon: <Globe className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Multi-language detection",
    description:
      "Gemini automatically detects the spoken language - English, Italian, French, Spanish, German, Japanese and many more- without any configuration.",
    highlight: false,
  },
];


export default function TranscribePage() {
  return (
    <main>
      <MetaViewContent contentName="Transcribe" contentId="transcribe" />
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
            aria-hidden="true"
          >
            <Mic className="h-4.5 w-4.5" style={{ color: "#6366F1", width: 18, height: 18 }} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            AI Video Transcription
          </h1>
          <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900 uppercase tracking-wide">
            AI
          </span>
        </div>
        <p className="text-sm text-[#737373]">
          Upload any video or audio file and get a full AI-generated transcript with timestamps. Download your subtitles as an .srt file for YouTube or any video platform. Edit the transcript inline before exporting. Powered by Google Gemini- one of the most accurate speech recognition models available.
        </p>
      </div>

      {/* Tool */}
      <TranscribeClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How AI video transcription works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-md border flex items-center justify-center mb-4 ${
                    f.highlight
                      ? "border-[#C7D2FE] bg-white dark:bg-[#1E1E1E]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]"
                  }`}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Why transcribe your videos?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Video transcription unlocks content you have already produced. A transcript can be repurposed into a blog post, newsletter, social media captions, or a detailed show notes page- all without writing a single word from scratch. For SEO, Google cannot index the audio inside your video; a transcript gives search engines full access to your spoken content.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Subtitles dramatically increase accessibility. Studies show that 85% of Facebook videos are watched on mute. Adding subtitles keeps viewers engaged regardless of their environment or hearing ability.
          </p>

          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What formats does SammaPix transcription support?
          </h2>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            {[
              "MP4, WebM, MOV- common video formats",
              "MP3, WAV, AAC, M4A, OGG- audio files",
              "Maximum file size: 100 MB",
              "All languages supported by Google Gemini",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#6366F1] mt-0.5"> - </span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is an SRT file?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SRT (SubRip Text) is the most widely supported subtitle format. It contains numbered segments, each with a start and end timestamp and the spoken text. YouTube, Vimeo, DaVinci Resolve, Premiere Pro, and virtually every video platform and editor accept .srt files directly.
          </p>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] p-4">
            <pre className="text-xs font-mono text-[#525252] dark:text-[#A3A3A3] whitespace-pre leading-relaxed">
{`1
00:00:00,000 --> 00:00:03,500
Welcome to today's tutorial.

2
00:00:03,500 --> 00:00:07,200
Today we are going to cover video transcription.`}
            </pre>
          </div>
        </div>
      </section>

      <RelatedTools toolId="transcribe" />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
              {
                "@type": "ListItem",
                position: 3,
                name: "AI Video Transcription",
                item: `${APP_URL}/tools/transcribe`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is the transcription free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Free accounts get 5 minutes of transcription per day after signing in. Pro accounts get 60 minutes per month. Additional usage can be purchased with credits.",
                },
              },
              {
                "@type": "Question",
                name: "What video and audio formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix supports MP4, WebM, MOV for video and MP3, WAV, AAC, M4A, OGG, FLAC for audio. Maximum file size is 100 MB.",
                },
              },
              {
                "@type": "Question",
                name: "Is my video uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your file is sent to Google Gemini for AI transcription and is immediately discarded after processing. It is never stored permanently on SammaPix servers.",
                },
              },
              {
                "@type": "Question",
                name: "What languages are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Gemini automatically detects and transcribes all major languages including English, Italian, French, Spanish, German, Portuguese, Japanese, Korean, Chinese, Arabic, Russian and many more.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use the SRT file on YouTube?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The .srt file generated by SammaPix is in the standard SubRip Text format accepted by YouTube, Vimeo, DaVinci Resolve, Premiere Pro and virtually all video platforms.",
                },
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix AI Video Transcription",
            description:
              "Transcribe any video or audio file with AI using Google Gemini. Get a full timestamped transcript and download subtitles in SRT format. Free tier- 5 minutes per day.",
            url: `${APP_URL}/tools/transcribe`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
              url: "https://lucasammarco.com",
            },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
            featureList: [
              "Google Gemini 2.5 Flash transcription",
              "Timestamped segments",
              "SRT subtitle file export",
              "Plain text export",
              "Inline transcript editing",
              "Automatic language detection",
              "MP4, WebM, MOV, MP3, WAV support",
              "Up to 100 MB files",
            ],
          }),
        }}
      />
    </main>
  );
}
