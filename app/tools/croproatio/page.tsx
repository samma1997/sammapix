import type { Metadata } from "next";
import CropRatio from "@/components/tools/CropRatio";

export const metadata: Metadata = {
  title: "Free Image Crop Tool — Crop to Exact Ratio | SammaPix",
  description:
    "Crop images to exact ratios: 1:1 square, 4:5 Instagram portrait, 9:16 stories & reels, 16:9 landscape, A4 print. Interactive drag-to-position crop. Batch ZIP download. No upload required.",
  alternates: { canonical: "https://sammapix.com/tools/croproatio" },
  openGraph: {
    title: "Free Image Crop Tool — Crop to Exact Ratio | SammaPix",
    description:
      "Crop images to exact ratios: 1:1, 4:5, 9:16, 16:9, A4. Interactive drag crop. Batch + ZIP. No upload.",
    url: "https://sammapix.com/tools/croproatio",
    siteName: "SammaPix",
    type: "website",
  },
};

export default function CropRatioPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-xs text-[#A3A3A3] uppercase tracking-widest mb-2">
            CropRatio
          </h1>
          <p className="text-2xl font-semibold text-[#171717] mb-2">
            Crop to exact ratio
          </p>
          <p className="text-sm text-[#737373] max-w-lg">
            Drop your images, pick a ratio — 1:1, 4:5, 9:16, 16:9, A4 or custom.
            Drag the frame to position the crop, then download individually or as a ZIP.
            Everything runs in your browser. No upload.
          </p>
        </div>

        {/* Tool */}
        <CropRatio />

      </div>
    </div>
  );
}
