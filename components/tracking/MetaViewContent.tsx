"use client";

import { useEffect } from "react";

interface MetaViewContentProps {
  /** Tool or page name, e.g. "Compress", "WebP Converter" */
  contentName: string;
  /** Content category, e.g. "tool", "landing" */
  contentCategory?: string;
  /** Content ID, e.g. "compress", "webp" */
  contentId?: string;
}

/**
 * Fires Meta Pixel ViewContent event on mount.
 * Drop this into any tool page to track which tools users visit.
 */
export default function MetaViewContent({
  contentName,
  contentCategory = "tool",
  contentId,
}: MetaViewContentProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "ViewContent", {
        content_name: contentName,
        content_category: contentCategory,
        content_ids: contentId ? [contentId] : undefined,
        content_type: "product",
      });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", "view_item", {
        item_name: contentName,
        item_category: contentCategory,
      });
    }
  }, [contentName, contentCategory, contentId]);

  return null;
}
