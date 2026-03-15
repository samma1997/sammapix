"use client";

/**
 * Thin client wrapper for the exif page.
 * Renders ExifLens + NextStepSuggestions as a single client subtree
 * so the parent exif page can remain a Server Component.
 */

import ExifLens from "@/components/tools/ExifLens";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";

export default function ExifClient() {
  return (
    <>
      <ExifLens />

      {/* Next-step suggestions — shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="exif" />
        </div>
      </section>
    </>
  );
}
