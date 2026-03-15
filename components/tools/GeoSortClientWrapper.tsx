"use client";

/**
 * Thin client wrapper for the geosort page.
 * Renders GeoSort + NextStepSuggestions as a single client subtree
 * so the parent geosort page can remain a Server Component.
 */

import GeoSort from "@/components/tools/GeoSort";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function GeoSortClientWrapper() {
  return (
    <>
      <GeoSort />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="geosort" />
        </div>
      </section>
    </>
  );
}
