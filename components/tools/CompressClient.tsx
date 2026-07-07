"use client";

/**
 * Thin client wrapper for the compress page.
 * Renders ToolInterface + NextStepSuggestions as a single client subtree
 * so the parent compress page can remain a Server Component.
 *
 * Accepts an optional `targetKB` prop so /compress-to/[size] pages can
 * pre-display the target size as a context badge, while /tools/compress
 * (standalone, no props) behaves exactly as before.
 */

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import ToolInterface from "@/components/tools/ToolInterface";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export interface CompressClientProps {
  /** When set, shows a target-size badge above the tool. Standalone behaviour unchanged when omitted. */
  targetKB?: number;
}

export default function CompressClient({ targetKB }: CompressClientProps = {}) {
  const isIt = (usePathname() || "").startsWith("/it");
  return (
    <>
      {/* Target size badge — only shown on /compress-to/[size] pages */}
      {targetKB !== undefined && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F5F5] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="h-2 w-2 rounded-full bg-[#22C55E] shrink-0" />
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              {isIt ? "Obiettivo: comprimi a" : "Target: compress to"}{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">
                {targetKB >= 1024 ? `${targetKB / 1024} MB` : `${targetKB} KB`}
              </strong>
              {" "}{isIt ? "— regola il cursore della qualità finché il risultato raggiunge questa dimensione" : "— adjust the quality slider until the output reaches this size"}
            </span>
          </div>
        </div>
      )}

      <ToolInterface defaultMode="compress" toolName="compress" compactHero />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="compress" />
        </div>
      </section>
    </>
  );
}
