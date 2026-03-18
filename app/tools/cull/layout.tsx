import React from "react";
import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Photo Culling Tool Online - Smart Batch Review | SammaPix",
  description:
    "Smart photo culling tool for photographers. Review, pick and reject shots with keyboard shortcuts. Export your best frames in seconds. No upload needed.",
  alternates: {
    canonical: `${APP_URL}/tools/cull`,
  },
  openGraph: {
    title: "Photo Culling Tool Online - Smart Batch Review | SammaPix",
    description:
      "Smart photo culling tool for photographers. Review, pick and reject shots with keyboard shortcuts. Export your best frames in seconds. No upload needed.",
    url: `${APP_URL}/tools/cull`,
    siteName: "SammaPix",
    type: "website",
  },
};

export default function CullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
