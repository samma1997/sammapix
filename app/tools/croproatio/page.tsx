import type { Metadata } from "next";
import { Crop, Hand, FolderArchive, Shield } from "lucide-react";
import CropRatio from "@/components/tools/CropRatio";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Image Crop Tool — Crop Photos to Exact Ratio Online | SammaPix",
  description:
    "Crop images to any aspect ratio: 1:1, 16:9, 4:5, 9:16, custom. Drag to position crop, batch process multiple photos. Free, no upload needed.",
  keywords: [
    "image crop tool",
    "crop to ratio",
    "aspect ratio crop",
    "instagram crop",
    "batch image crop",
  ],
  alternates: { canonical: `${APP_URL}/tools/croproatio` },
  openGraph: {
    title: "Free Image Crop Tool — Crop to Exact Ratio",
    description:
      "Crop any photo to exact ratio: 1:1 square, 16:9 widescreen, 9:16 Story, 4:5 portrait. Drag to position. Free.",
    url: `${APP_URL}/tools/croproatio`,
    siteName: "SammaPix",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CropRatio — Image Crop Tool",
  description:
    "Free online image crop tool. Crop photos to exact aspect ratios with interactive drag-and-drop positioning.",
  url: `${APP_URL}/tools/croproatio`,
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const features = [
  {
    icon: <Crop className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Exact ratio",
    description:
      "Crop to 1:1 square, 16:9 widescreen, 4:5 Instagram portrait, 9:16 Stories and Reels, 2:3, 3:2 — or type any custom ratio you need.",
  },
  {
    icon: <Hand className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Interactive drag",
    description:
      "After selecting your ratio, drag the crop frame directly over the image to choose exactly which area to keep. No guesswork.",
  },
  {
    icon: <FolderArchive className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch export",
    description:
      "Drop multiple photos at once, position the crop on each preview, and export all cropped images in one go as a ZIP file.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "No upload",
    description:
      "All cropping happens locally in your browser using the Canvas API. Your photos never leave your device — fully private.",
  },
];

const steps = [
  {
    n: "1",
    title: "Drop your images",
    desc: "Select one or multiple photos — JPG, PNG, WebP. Mix any format freely.",
  },
  {
    n: "2",
    title: "Pick a ratio",
    desc: "Choose from presets like 1:1, 16:9, 4:5, 9:16 — or type your own custom ratio.",
  },
  {
    n: "3",
    title: "Drag to position",
    desc: "Move the crop frame over the preview to select exactly what gets kept.",
  },
  {
    n: "4",
    title: "Download",
    desc: "Export the cropped image directly, or batch-download all as a ZIP.",
  },
];

export default function CropRatioPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ToolHeader
        title="CropRatio"
        description="Drop your images, pick a ratio — 1:1, 4:5, 9:16, 16:9 or custom. Drag the frame to position the crop, then download individually or as a ZIP. Everything runs in your browser."
      />

      <CropRatio />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-4 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Why CropRatio?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Common questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "What aspect ratios does CropRatio support?",
                a: "All standard ratios: 1:1 (square/Instagram), 16:9 (YouTube/widescreen), 4:5 (Instagram portrait), 9:16 (Stories/Reels), 2:3, 3:2, or any custom ratio you type.",
              },
              {
                q: "How do I position the crop?",
                a: "After selecting your ratio, drag the crop frame over your image to choose exactly what area to keep. The frame locks to your chosen ratio so the output dimensions are always correct.",
              },
              {
                q: "Can I crop multiple photos at once?",
                a: "Yes. Drop multiple photos, position the crop on a preview, and export all at once as a ZIP. Each file is cropped independently so you can adjust framing per image.",
              },
              {
                q: "Does SammaPix upload my photos?",
                a: "No. All cropping happens in your browser using the Canvas API. Your images never leave your device — no server, no upload, no data collection.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="pb-5 border-b border-[#E5E5E5] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
