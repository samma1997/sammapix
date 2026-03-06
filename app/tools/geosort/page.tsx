import { Metadata } from "next";
import GeoSortClient from "@/components/tools/GeoSort";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GeoSort — Organize Photos by Location | SammaPix",
  description:
    "Upload travel photos and GeoSort automatically reads GPS data to organize them into folders by country and city. Download a ZIP ready to use.",
  alternates: {
    canonical: `${APP_URL}/tools/geosort`,
  },
  openGraph: {
    title: "GeoSort — Organize Photos by Location | SammaPix",
    description:
      "Upload travel photos and GeoSort automatically reads GPS data to organize them into folders by country and city. Download a ZIP ready to use.",
    url: `${APP_URL}/tools/geosort`,
    siteName: "SammaPix",
    type: "website",
  },
};

export default function GeoSortPage() {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <h1 className="text-2xl font-semibold text-[#171717] mb-1">GeoSort</h1>
        <p className="text-sm text-[#737373]">
          Drop your travel photos — GPS data is read locally and photos are
          organized into folders by country and city. Nothing leaves your device.
        </p>
      </div>
      <GeoSortClient />
    </main>
  );
}
