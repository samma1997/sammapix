"use client";

/**
 * Thin client wrapper for the croproatio page.
 * Renders CropRatio + NextStepSuggestions as a single client subtree
 * so the parent croproatio page can remain a Server Component.
 */

import CropRatio from "@/components/tools/CropRatio";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export default function CropRatioClient() {
  return (
    <>
      <CropRatio />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="croproatio" />
        </div>
      </section>
    </>
  );
}
