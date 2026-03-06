import React from "react";
import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "EXIF Inspector & Remover Online Free | SammaPix",
  description:
    "Read and remove EXIF metadata from photos online for free. Strip GPS coordinates, camera data and timestamps before sharing images. No upload needed.",
  alternates: {
    canonical: `${APP_URL}/tools/exif`,
  },
  openGraph: {
    title: "EXIF Inspector & Remover Online Free | SammaPix",
    description:
      "Read and remove EXIF metadata from photos online for free. Strip GPS coordinates, camera data and timestamps before sharing images. No upload needed.",
    url: `${APP_URL}/tools/exif`,
    siteName: "SammaPix",
    type: "website",
  },
};

export default function ExifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
