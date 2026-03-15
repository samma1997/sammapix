"use client";

/**
 * Thin client wrapper for the filmlab page.
 * Renders FilmLab + NextStepSuggestions as a single client subtree
 * so the parent filmlab page can remain a Server Component.
 */

import FilmLab from "@/components/tools/FilmLab";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function FilmLabClient() {
  return (
    <>
      <FilmLab />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="filmlab" />
        </div>
      </section>
    </>
  );
}
