import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileVideo, Shield, Zap, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ConvertVideoClient from "@/components/tools/ConvertVideoClient";
import ConvertVideoHeroDemo from "@/components/tools/ConvertVideoHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/convert-video`;
const ACCENT = "#0891B2";

export const metadata: Metadata = {
  title: "Convert Video Online — MOV to MP4 & More, No Upload",
  description:
    "Convert MOV, AVI, MKV and WebM to MP4 (and back) in your browser. No upload, no signup. Powered by WebCodecs: fast format conversion that keeps quality, 100% private.",
  keywords: [
    "convert video",
    "mov to mp4",
    "convert mov to mp4",
    "avi to mp4",
    "mkv to mp4",
    "webm to mp4",
    "video converter",
    "convert video online free",
    "no upload video converter",
    "mp4 to webm",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Convert Video Online — MOV to MP4 & More, No Upload",
    description: "Convert MOV/AVI/MKV/WebM to MP4 in your browser. WebCodecs-fast, no upload, no signup.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Convert Video" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Video Online — MOV to MP4 & More",
    description: "Convert MOV/AVI/MKV/WebM to MP4 in your browser. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Instant when possible",
    description:
      "When only the container changes (like MOV to MP4 with H.264), SammaPix remuxes the stream instead of re-encoding, so the conversion is near-instant with zero quality loss.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Nothing is uploaded",
    description:
      "The conversion runs entirely on your device via WebCodecs. Your video is never sent to a server, so it stays private and there is no upload wait.",
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "The formats that matter",
    description:
      "Convert between MP4, WebM, MOV and MKV. MP4 with H.264 plays on every device, so it is the safe default for sharing anywhere.",
  },
];

export default function ConvertVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Convert Video" contentId="convert-video" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <FileVideo className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Convert Video Free. MOV to MP4
              </h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Convert <strong className="text-[#171717] dark:text-[#E5E5E5]">MOV, AVI, MKV and WebM to MP4</strong> (and back) right in your browser. Fast, quality-preserving, no upload and no signup.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> WebCodecs-fast</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Instant remux</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> MP4 · WebM · MOV · MKV</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <ConvertVideoHeroDemo />
          </div>
        </div>
      </section>

      <ConvertVideoClient />

      <HowToUse
        toolName="Convert Video"
        steps={[
          { title: "Drop your video", desc: "Drag and drop a MOV, AVI, MKV, WebM or MP4 file. It is read locally and never uploaded." },
          { title: "Pick the output format", desc: "Choose MP4 (plays everywhere), WebM (smaller, for the web), MOV or MKV." },
          { title: "Convert and download", desc: "Conversion runs locally via WebCodecs. When only the container changes, it is near-instant. Then download your file." },
        ]}
        proTip={{
          text: "MP4 with H.264 is the safest format for sharing — it plays on every phone, browser and app. Convert to it whenever you are unsure.",
          linkLabel: "Compress it too",
          linkHref: "/tools/compress-video",
        }}
      />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why convert video in your browser</h2>
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
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">MOV to MP4, and why the format matters</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            MOV is Apple&apos;s container, used by iPhones and QuickTime. It is excellent for editing but not always accepted by Windows apps, Android phones, or web uploads. MP4 is the universal container: it plays on essentially every device and platform made in the last fifteen years. Converting MOV to MP4 usually keeps the same H.264 video inside a different wrapper, which means SammaPix can simply rewrap the stream without re-encoding, finishing almost instantly with no quality loss.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">When is it instant, and when does it re-encode?</h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            If the source video codec already fits the target container (MOV H.264 to MP4, for example), SammaPix copies the stream directly, which is near-instant. When the codec is not compatible with the target, such as an old AVI with MPEG-4 or a WebM with VP9 going to MP4, it re-encodes to H.264 using your device&apos;s hardware via WebCodecs, which is still fast.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Is anything uploaded?</h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No. Unlike most online converters that send your file to a server, SammaPix does the whole job in your browser. Your video never leaves your device, which is faster and completely private.
          </p>
        </div>
      </section>

      <RelatedTools toolId="convert-video" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Convert Video",
                description: "Convert MOV, AVI, MKV and WebM to MP4 and back, directly in your browser using WebCodecs. No upload.",
                url: TOOL_URL,
                applicationCategory: "MultimediaApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
                creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
                featureList: [
                  "MOV to MP4 conversion",
                  "AVI, MKV, WebM to MP4",
                  "MP4 to WebM",
                  "Instant remux when codec is compatible",
                  "WebCodecs hardware-accelerated",
                  "Client-side — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  { "@type": "Question", name: "How do I convert MOV to MP4 without uploading?", acceptedAnswer: { "@type": "Answer", text: "Drop your MOV file into SammaPix's Convert Video tool at sammapix.com/tools/convert-video and choose MP4. The conversion runs entirely in your browser using WebCodecs. When the MOV already uses H.264, the stream is simply rewrapped into MP4 almost instantly with no quality loss, and nothing is uploaded." } },
                  { "@type": "Question", name: "Is this video converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no signup. Free covers videos up to 500 MB; larger files are available with Pro or a Video Day Pass. The conversion always runs locally in your browser." } },
                  { "@type": "Question", name: "Will converting reduce the quality?", acceptedAnswer: { "@type": "Answer", text: "When only the container changes (such as MOV to MP4 with the same H.264 codec), there is zero quality loss because the video is copied, not re-encoded. When a re-encode is needed, SammaPix uses a high-quality setting." } },
                  { "@type": "Question", name: "What formats can I convert between?", acceptedAnswer: { "@type": "Answer", text: "SammaPix converts between MP4, WebM, MOV and MKV, and accepts MOV, AVI, MKV, WebM, M4V and 3GP as input. MP4 with H.264 is the universal default for sharing." } },
                  { "@type": "Question", name: "Is my video uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The entire conversion happens on your device in the browser. Your video is never uploaded, stored, or visible to SammaPix." } },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
                  { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
                  { "@type": "ListItem", position: 3, name: "Convert Video", item: TOOL_URL },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
