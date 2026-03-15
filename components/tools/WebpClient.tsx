"use client";

/**
 * Thin client wrapper for the webp page.
 * Renders ToolInterface + NextStepSuggestions as a single client subtree
 * so the parent webp page can remain a Server Component.
 */

import ToolInterface from "@/components/tools/ToolInterface";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function WebpClient() {
  return (
    <>
      <ToolInterface defaultMode="webp" />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="webp" />
        </div>
      </section>
    </>
  );
}
