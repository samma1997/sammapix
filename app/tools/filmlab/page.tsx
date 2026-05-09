import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Shield, Layers, Archive, Film, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FilmLabClient from "@/components/tools/FilmLabClient";
import FilmlabHeroDemo from "@/components/tools/FilmlabHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Film Photo Filters Free Online. Vintage, Cinematic, B&W",
  description:
    "Apply film grain, vignette, fade instantly. Kodak Gold, Fuji, Cinematic presets. Batch process, live preview, free online.",
  keywords: [
    "film photo filter",
    "vintage photo effects",
    "analog photo filter",
    "film grain effect",
    "photo filter online",
    "vintage effect tool",
    "vintage photo effects",
    "analog photo filter",
    "film grain effect",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/filmlab`,
  },
  openGraph: {
    title: "Film Photo Filters Free Online. Vintage, Cinematic, B&W",
    description:
      "Apply film grain, vignette, fade instantly. Kodak Gold, Fuji, Cinematic presets. Batch process, live preview, free online.",
    url: `${APP_URL}/tools/filmlab`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Film Photo Filter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Film Photo Filters Free Online. Vintage, Cinematic, B&W",
    description:
      "Apply film grain, vignette, fade instantly. Kodak Gold, Fuji, Cinematic presets. Batch process, live preview, free online.",
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% browser-based- nothing uploaded",
    description:
      "All image processing runs on your device using the Canvas API. Your photos never leave your browser.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "6 film stock presets + manual controls",
    description:
      "Start from Kodak Gold, Fuji Pro 400H, Ilford HP5 or Cinematic Teal, then fine-tune grain, vignette, fade, temperature, contrast, saturation and split toning.",
  },
  {
    icon: <Archive className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Batch processing with ZIP download",
    description:
      "Apply the same analog look to all your photos at once and download all processed images in a single ZIP archive.",
  },
];


export default function FilmLabPage() {
  return (
    <main>
      <MetaViewContent contentName="FilmLab" contentId="filmlab" />

      {/* Hero — Split layout: text left, animated demo right */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT: Title + copy + trust badges ── */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#F59E0B15", border: "1px solid #F59E0B30" }}
                aria-hidden="true"
              >
                <Film className="h-[18px] w-[18px]" style={{ color: "#F59E0B" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Film Filters. Vintage, Cinematic, B&amp;W
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              14 analog film presets ready to apply: Kodak Gold, Fuji Pro 400H,
              Ilford HP5, Cinematic Teal, Faded 70s and more. Fine-tune grain,
              vignette, fade, temperature, contrast, saturation and split
              toning. Batch process unlimited photos in your browser. No
              upload, no signup.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                14 presets
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Live preview
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch ZIP
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No upload
              </span>
            </div>
          </div>

          {/* ── RIGHT: Auto-cycling demo across 5 film presets ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <FilmlabHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool + Next Step suggestions */}
      <FilmLabClient />

      <HowToUse
        toolName="FilmLab"
        steps={[
          {
            title: "Drop your photos",
            desc: "Upload JPG, PNG, WebP or HEIC photos- drag and drop or click to browse. Mix any format.",
          },
          {
            title: "Choose a film preset",
            desc: "Pick from 14 presets: Kodak Gold, Fuji Pro 400H, Ilford HP5, Cinematic Teal, and more. Fine-tune grain, vignette, fade and color with sliders.",
          },
          {
            title: "Download with analog look",
            desc: "Click 'Apply to all' to process your full batch, then download individually or as a ZIP.",
          },
        ]}
        proTip={{
          text: "Use WebLift to compress, convert and rename all your photos at once.",
          linkLabel: "Try WebLift",
          linkHref: "/tools/weblift",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use FilmLab for analog effects?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is FilmLab?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            FilmLab is a free browser-based photo editing tool that applies analog film looks to your photos. It includes 14 presets: 6 classic film stocks (Kodak Gold, Fuji Pro 400H, Ilford HP5, Cinematic Teal, Faded 70s, Cross Process) and 8 exclusive Samma signature presets. Each preset adjusts grain, vignette, fade, temperature, contrast, saturation, and split toning.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            FilmLab processes images fully in the browser using the Canvas API- your photos never leave your device. Live preview updates within 100ms as you adjust sliders. Apply the same look to a full batch and download all results as a ZIP.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How FilmLab analog effects work
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            FilmLab applies a multi-step processing pipeline directly in your browser using the Canvas API.
            Each photo goes through temperature shift, contrast adjustment, saturation control, fade (black lift),
            random grain noise, radial vignette darkening and optional split toning for highlights and shadows- all in that order.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The live preview updates as you move sliders, with a 100ms debounce to keep the UI responsive.
            When you are happy with the look, click &ldquo;Apply to all&rdquo; to process the full-resolution originals
            and download them individually or as a ZIP.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Film stock presets explained
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              <span><strong className="text-[#525252]">Kodak Gold</strong>- warm tones, moderate grain and a subtle light fade. The classic holiday roll.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              <span><strong className="text-[#525252]">Fuji Pro 400H</strong>- cooler, pastel palette with a slight green cast. Portrait photographers&apos; favourite.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              <span><strong className="text-[#525252]">Ilford HP5</strong>- full desaturation, high contrast and visible grain. Classic black-and-white street photography.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              <span><strong className="text-[#525252]">Cinematic Teal</strong>- teal shadows and warm orange highlights. The Hollywood blockbuster look.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              <span><strong className="text-[#525252]">Faded 70s</strong>- heavily lifted blacks, warm cast and low contrast. Vintage magazine aesthetic.</span>
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Tips for better analog results
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Start from a preset, then reduce grain if the photo is already noisy
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Vignette works best on portraits- keep it under 40 for landscapes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Fade lifts the blacks like old print film- pair it with a slight contrast boost
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Split toning adds the most cinematic feel- try orange highlights + teal shadows
            </li>
          </ul>
        </div>
      </section>

      <RelatedTools toolId="filmlab" />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${APP_URL}/tools`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Film Filters",
                item: `${APP_URL}/tools/filmlab`,
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
                name: "What film effects are available in FilmLab?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FilmLab includes 14 presets: 6 classic film stocks (Kodak Gold, Fuji Pro 400H, Ilford HP5, Cinematic Teal, Faded 70s, Cross Process) plus 8 exclusive Samma signature presets. Each adjusts grain, vignette, fade, temperature, contrast, saturation, and split toning.",
                },
              },
              {
                "@type": "Question",
                name: "Does FilmLab reduce image quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. FilmLab applies visual filters (grain, color shifts, vignette) but does not compress or degrade the actual image resolution. All processing happens with the full image data in your browser using the Canvas API.",
                },
              },
              {
                "@type": "Question",
                name: "Can I batch apply the same effect to multiple photos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Choose a preset or adjust the sliders to get your desired look, then click 'Apply to all'. FilmLab will process your entire batch with the same settings and let you download all results as a ZIP.",
                },
              },
              {
                "@type": "Question",
                name: "Are my photos uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All image processing runs entirely in your browser using the Canvas API. Your photos never leave your device- 100% private, zero uploads.",
                },
              },
            ],
          }),
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Film Filters",
            description:
              "Apply analog film looks to photos with 14 presets including Kodak Gold, Fuji Pro 400H, Ilford HP5 and 8 Samma signature presets. Grain, vignette, fade and color grading.",
            url: `${APP_URL}/tools/filmlab`,
            applicationCategory: "PhotographyApplication",
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "92",
            },
            featureList: [
              "14 film presets",
              "Grain, vignette, fade controls",
              "Split toning",
              "HEIC support",
            ],
          }),
        }}
      />
    </main>
  );
}
