"use client";

/**
 * Thin client wrapper for the heic page.
 * Renders HeicConverter + NextStepSuggestions as a single client subtree
 * so the parent heic page can remain a Server Component.
 */

import HeicConverter from "@/components/tools/HeicConverter";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function HeicClient() {
  return (
    <>
      <HeicConverter />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="heic" />
        </div>
      </section>
    </>
  );
}
