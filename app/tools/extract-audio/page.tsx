import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Music, Shield, Zap, FileAudio, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ExtractAudioClient from "@/components/tools/ExtractAudioClient";
import ExtractAudioHeroDemo from "@/components/tools/ExtractAudioHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/extract-audio`;
const ACCENT = "#059669";

export const metadata: Metadata = {
  title: "Extract Audio from Video — MP4 to MP3, Free, No Upload",
  description:
    "Extract the audio from a video and save it as MP3 or M4A, free and in your browser. No upload, no signup. Convert MP4, MOV or WebM to MP3 locally with no quality compromise.",
  keywords: [
    "extract audio from video",
    "mp4 to mp3",
    "video to mp3",
    "convert mp4 to mp3",
    "extract audio online",
    "mov to mp3",
    "video to audio",
    "rip audio from video",
    "no upload mp4 to mp3",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Extract Audio from Video — MP4 to MP3, No Upload",
    description: "Pull the audio out of any video as MP3 or M4A, in your browser. No upload, no signup.",
    url: TOOL_URL, siteName: "SammaPix", type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Extract Audio" }],
  },
  twitter: { card: "summary_large_image", title: "Extract Audio from Video — MP4 to MP3", description: "Extract audio from any video as MP3 or M4A in your browser. No upload." },
};

const features = [
  { icon: <Music className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "MP3 or M4A", description: "Get a universal MP3 that plays on every device, or a smaller modern M4A (AAC). Pick the bitrate from 128 to 320 kbps." },
  { icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Nothing is uploaded", description: "The audio is decoded and encoded entirely on your device. Your video never leaves your browser, which is faster and private." },
  { icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "No software, no watermark", description: "No app to install and never a watermark. Drop a video, choose a format, and download the audio in seconds." },
];

export default function ExtractAudioPage() {
  return (
    <main>
      <MetaViewContent contentName="Extract Audio" contentId="extract-audio" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <Music className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">Extract Audio Free. MP4 to MP3</h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">Pull the <strong className="text-[#171717] dark:text-[#E5E5E5]">audio out of any video</strong> and save it as MP3 or M4A, right in your browser. No upload, no signup, no watermark.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> MP3 + M4A</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> 128 to 320 kbps</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto"><ExtractAudioHeroDemo /></div>
        </div>
      </section>

      <ExtractAudioClient />

      <HowToUse toolName="Extract Audio" steps={[
        { title: "Drop your video", desc: "Drag and drop an MP4, MOV, WebM or MKV file. It is read locally and never uploaded." },
        { title: "Pick MP3 or M4A", desc: "Choose MP3 for universal compatibility or M4A (AAC) for a smaller file, and a bitrate from 128 to 320 kbps." },
        { title: "Extract and download", desc: "The audio track is decoded and encoded in your browser. Preview it, then download." },
      ]} proTip={{ text: "320 kbps MP3 is effectively transparent for music. For voice and podcasts, 128 kbps is plenty and keeps the file tiny.", linkLabel: "Compress the video instead", linkHref: "/tools/compress-video" }} />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why extract audio in your browser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">How to get the audio out of a video</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A video file holds a video stream and an audio stream wrapped together. Extracting audio means decoding just the audio stream and saving it on its own. SammaPix decodes the audio in your browser, then encodes it to MP3 (using a built-in encoder) or to M4A with the AAC codec. The whole process runs locally with the WebCodecs API, so the video never leaves your device.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">MP3 or M4A, which should I choose?</h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            MP3 is the safest choice because it plays on literally everything, from old car stereos to every phone and app. M4A uses the more efficient AAC codec, so it is a little smaller at the same quality and is great for Apple devices and modern players. For most people sending a clip or saving a song, MP3 is the right default.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Is my video uploaded?</h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No. Most online MP4 to MP3 converters upload your whole video to a server. SammaPix does the extraction in your browser, so your file stays private and there is no upload wait.
          </p>
        </div>
      </section>

      <RelatedTools toolId="extract-audio" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", name: "SammaPix Extract Audio", description: "Extract the audio from a video as MP3 or M4A in your browser using WebCodecs. No upload, no watermark.", url: TOOL_URL, applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" }, creator: { "@type": "Organization", name: "SammaPix", url: APP_URL }, featureList: ["MP4, MOV, WebM, MKV to MP3 or M4A", "Bitrate 128 to 320 kbps", "No watermark", "Client-side, no upload"] },
          { "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "How do I convert MP4 to MP3 without uploading?", acceptedAnswer: { "@type": "Answer", text: "Drop your MP4 into SammaPix's Extract Audio tool at sammapix.com/tools/extract-audio and choose MP3. The audio is decoded and encoded to MP3 entirely in your browser, so the video is never uploaded to a server." } },
            { "@type": "Question", name: "Does it add a watermark?", acceptedAnswer: { "@type": "Answer", text: "No. SammaPix never adds a watermark to the extracted audio." } },
            { "@type": "Question", name: "What is the difference between MP3 and M4A?", acceptedAnswer: { "@type": "Answer", text: "MP3 plays on virtually every device and app. M4A uses the AAC codec and is slightly smaller at the same quality, ideal for Apple devices and modern players. MP3 is the safest default." } },
            { "@type": "Question", name: "Is my video uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. The extraction runs in your browser with WebCodecs. Your file never leaves your device." } },
            { "@type": "Question", name: "What bitrate should I pick?", acceptedAnswer: { "@type": "Answer", text: "320 kbps is effectively transparent for music. 192 kbps is a great all-round choice. 128 kbps is fine for voice and podcasts and keeps the file small." } },
          ] },
          { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: APP_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` }, { "@type": "ListItem", position: 3, name: "Extract Audio", item: TOOL_URL } ] },
        ],
      }) }} />
    </main>
  );
}
