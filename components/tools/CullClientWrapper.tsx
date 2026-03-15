"use client";

/**
 * Thin client wrapper for the cull page.
 * Renders Cull + NextStepSuggestions as a single client subtree
 * so the parent cull page can remain a Server Component.
 */

import CullTool from "@/components/tools/Cull";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function CullClientWrapper() {
  return (
    <>
      <CullTool />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="cull" />
        </div>
      </section>
    </>
  );
}
