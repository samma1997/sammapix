"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { getRelatedTools } from "@/lib/tools-metadata";

// Auto-fires after a download event on any /tools/<id> page. Listens for:
//   1. clicks on <a download> or elements with data-download / aria-label="Download"
//   2. a custom CustomEvent("sammapix:download-success") that tools can dispatch
// Uses a 24h localStorage cooldown so the toast never feels nagging — at most
// one cross-tool suggestion per user per day, even across multiple tool runs.
const COOLDOWN_KEY = "sp-cross-tool-toast-shown-at";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 1200; // let the actual download start visibly first

function extractToolId(pathname: string): string | null {
  const match = pathname.match(/^\/tools\/([^/]+)/);
  return match?.[1] ?? null;
}

function inCooldown(): boolean {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? "0");
    return Date.now() - last < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markShown(): void {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    /* swallow private-mode quota errors */
  }
}

export default function CrossToolToast() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [toolName, setToolName] = useState<string>("");
  const [toolSlug, setToolSlug] = useState<string>("");
  const [toolDesc, setToolDesc] = useState<string>("");

  useEffect(() => {
    const toolId = extractToolId(pathname || "");
    if (!toolId) return;
    if (inCooldown()) return;

    const related = getRelatedTools(toolId, 4);
    if (related.length === 0) return;
    // Pick a random related tool to avoid always pushing the same one — keeps
    // discovery fresh across days.
    const pick = related[Math.floor(Math.random() * related.length)];

    let timer: ReturnType<typeof setTimeout> | null = null;

    const trigger = () => {
      if (open) return;
      if (inCooldown()) return;
      if (timer) return;
      timer = setTimeout(() => {
        setToolName(pick.name);
        setToolSlug(pick.slug);
        setToolDesc(pick.shortDesc);
        setOpen(true);
        markShown();
      }, SHOW_DELAY_MS);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        "a[download], [data-download], button[aria-label*='Download' i], a[aria-label*='Download' i]"
      );
      if (!el) return;
      trigger();
    };

    const handleCustom = () => trigger();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("sammapix:download-success", handleCustom);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("sammapix:download-success", handleCustom);
      if (timer) clearTimeout(timer);
    };
  }, [pathname, open]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="rounded-xl border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 pr-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-full bg-[#EEF2FF] dark:bg-[#312E81] flex items-center justify-center text-base">
            🎉
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#10B981] mb-1">
              Done!
            </p>
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Now try {toolName}
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-2.5 line-clamp-2">
              {toolDesc}
            </p>
            <Link
              href={toolSlug}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
            >
              Open {toolName}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className="flex-shrink-0 -mt-1 -mr-1 p-1.5 rounded-md text-[#A3A3A3] hover:text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
