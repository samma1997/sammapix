"use client";

/**
 * Client-side entry point for embedding CropRatio inside a Server
 * Component page (e.g. /crop/[ratio]).
 *
 * `ssr: false` is required because CropRatio uses browser-only APIs
 * (Canvas, URL.createObjectURL, drag-and-drop) and must not run on the server.
 * The `dynamic` call with `ssr: false` must live inside a Client Component —
 * that is why this thin wrapper exists.
 *
 * Standalone /tools/croproatio behaviour is unchanged — this component is only
 * rendered on /crop/[ratio] pages.
 */

import dynamic from "next/dynamic";
import type { CropRatioProps } from "@/components/tools/CropRatio";

const CropRatio = dynamic(
  () => import("@/components/tools/CropRatio"),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <div className="border-2 border-dashed border-[#D4D4D4] dark:border-[#444] rounded-lg p-12 text-center bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-sm text-[#A3A3A3]">Loading crop tool...</p>
        </div>
      </div>
    ),
  }
);

export default function CropRatioToolEmbed(props: CropRatioProps) {
  return <CropRatio {...props} />;
}
