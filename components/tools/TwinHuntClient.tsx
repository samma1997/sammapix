"use client";

/**
 * Thin client wrapper for the twinhunt page.
 * Renders TwinHunt + NextStepSuggestions as a single client subtree
 * so the parent twinhunt page can remain a Server Component.
 */

import TwinHunt from "@/components/tools/TwinHunt";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function TwinHuntClient() {
  return (
    <>
      <TwinHunt />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="twinhunt" />
        </div>
      </section>
    </>
  );
}
