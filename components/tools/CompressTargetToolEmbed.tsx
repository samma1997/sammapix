"use client";

/**
 * Client-side entry point for embedding CompressClient inside a Server
 * Component page (e.g. /compress-to/[size]).
 *
 * `ssr: false` is required because CompressClient uses browser-only APIs
 * (Canvas, URL.createObjectURL, Zustand store) and must not run on the server.
 * The `dynamic` call with `ssr: false` must live inside a Client Component —
 * that is why this thin wrapper exists.
 *
 * Standalone /tools/compress behaviour is unchanged — this component is only
 * rendered on /compress-to/[size] pages.
 */

import dynamic from "next/dynamic";
import type { CompressClientProps } from "@/components/tools/CompressClient";

const CompressClient = dynamic(
  () => import("@/components/tools/CompressClient"),
  {
    ssr: false,
    loading: () => {
      // Client-only (ssr:false), so window is available.
      const isIt =
        typeof window !== "undefined" && window.location.pathname.startsWith("/it");
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
          <div className="border-2 border-dashed border-[#D4D4D4] dark:border-[#444] rounded-lg p-12 text-center bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <p className="text-sm text-[#A3A3A3]">
              {isIt ? "Caricamento dello strumento..." : "Loading compress tool..."}
            </p>
          </div>
        </div>
      );
    },
  }
);

export default function CompressTargetToolEmbed(props: CompressClientProps) {
  return <CompressClient {...props} />;
}
