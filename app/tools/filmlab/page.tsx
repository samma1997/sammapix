import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Shield, Layers, Archive } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import FilmLab from "@/components/tools/FilmLab";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Film Grain & Analog Photo Effects | FilmLab by SammaPix",
  description:
    "Add film grain, vignette, fade and analog color grading to your photos. 6 film stock presets (Kodak Gold, Fuji Pro, Ilford HP5…). Batch process and download as ZIP. No upload, no signup.",
  alternates: {
    canonical: `${APP_URL}/tools/filmlab`,
  },
  openGraph: {
    title: "Free Film Grain & Analog Photo Effects | FilmLab by SammaPix",
    description:
      "Add film grain, vignette, fade and analog color grading to your photos. 6 film stock presets. Batch process and download as ZIP.",
    url: `${APP_URL}/tools/filmlab`,
    siteName: "SammaPix",
    type: "website",
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% browser-based — nothing uploaded",
    description:
      "All image processing runs on your device using the Canvas API. Your photos never leave your browser.",
  },
  {
    icon: <Layers className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "6 film stock presets + manual controls",
    description:
      "Start from Kodak Gold, Fuji Pro 400H, Ilford HP5 or Cinematic Teal, then fine-tune grain, vignette, fade, temperature, contrast, saturation and split toning.",
  },
  {
    icon: <Archive className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch processing with ZIP download",
    description:
      "Apply the same analog look to all your photos at once and download all processed images in a single ZIP archive.",
  },
];

const relatedTools = [
  { name: "Crunch — Compress", href: "/tools/compress" },
  { name: "ResizePack", href: "/tools/resizepack" },
  { name: "Cull", href: "/tools/cull" },
  { name: "All tools", href: "/tools" },
];

export default function FilmLabPage() {
  return (
    <main>
      <ToolHeader
        title="FilmLab"
        description="Film grain, vignette, fade and analog color grading. 6 film stock presets. Live preview. Batch process all photos."
      />

      <FilmLab />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Why use FilmLab for analog effects?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
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
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] mb-4">
            How FilmLab analog effects work
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            FilmLab applies a multi-step processing pipeline directly in your browser using the Canvas API.
            Each photo goes through temperature shift, contrast adjustment, saturation control, fade (black lift),
            random grain noise, radial vignette darkening and optional split toning for highlights and shadows — all in that order.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The live preview updates as you move sliders, with a 100ms debounce to keep the UI responsive.
            When you are happy with the look, click &ldquo;Apply to all&rdquo; to process the full-resolution originals
            and download them individually or as a ZIP.
          </p>

          <h3 className="text-base font-semibold text-[#171717] mb-3">
            Film stock presets explained
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              <span><strong className="text-[#525252]">Kodak Gold</strong> — warm tones, moderate grain and a subtle light fade. The classic holiday roll.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              <span><strong className="text-[#525252]">Fuji Pro 400H</strong> — cooler, pastel palette with a slight green cast. Portrait photographers&apos; favourite.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              <span><strong className="text-[#525252]">Ilford HP5</strong> — full desaturation, high contrast and visible grain. Classic black-and-white street photography.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              <span><strong className="text-[#525252]">Cinematic Teal</strong> — teal shadows and warm orange highlights. The Hollywood blockbuster look.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              <span><strong className="text-[#525252]">Faded 70s</strong> — heavily lifted blacks, warm cast and low contrast. Vintage magazine aesthetic.</span>
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] mb-3">
            Tips for better analog results
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Start from a preset, then reduce grain if the photo is already noisy
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Vignette works best on portraits — keep it under 40 for landscapes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Fade lifts the blacks like old print film — pair it with a slight contrast boost
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Split toning adds the most cinematic feel — try orange highlights + teal shadows
            </li>
          </ul>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] bg-white transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix FilmLab",
            url: `${APP_URL}/tools/filmlab`,
            description:
              "Free online analog film effects tool. Add film grain, vignette, fade and color grading with 6 film stock presets. Batch process and download as ZIP.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </main>
  );
}
