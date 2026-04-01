"use client";

/**
 * Thin client wrapper for the resizepack page.
 * Renders ResizePack + NextStepSuggestions as a single client subtree
 * so the parent resizepack page can remain a Server Component.
 */

import ResizePack from "@/components/tools/ResizePack";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export default function ResizePackClient() {
  return (
    <>
      <ResizePack />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="resizepack" />
        </div>
      </section>
    </>
  );
}
