import React from "react";
import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Duplicate Photo Finder Online - Free | SammaPix TwinHunt",
  description:
    "Find and identify duplicate and near-duplicate photos in your browser. No upload- perceptual hashing runs 100% client-side. Free.",
  alternates: {
    canonical: `${APP_URL}/tools/twinhunt`,
  },
  openGraph: {
    title: "Duplicate Photo Finder Online - Free | SammaPix TwinHunt",
    description:
      "Find and identify duplicate and near-duplicate photos in your browser. No upload- perceptual hashing runs 100% client-side. Free.",
    url: `${APP_URL}/tools/twinhunt`,
    siteName: "SammaPix",
    type: "website",
  },
};

export default function TwinHuntLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
