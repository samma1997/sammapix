"use client";

/**
 * Thin client wrapper for the compress page.
 * Renders ToolInterface + NextStepSuggestions as a single client subtree
 * so the parent compress page can remain a Server Component.
 */

import ToolInterface from "@/components/tools/ToolInterface";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function CompressClient() {
  return (
    <>
      <ToolInterface defaultMode="compress" />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="compress" />
        </div>
      </section>
    </>
  );
}
