"use client";

import { useEffect } from "react";

/**
 * AntiCopy — lightweight client-side protection against casual code/content copying.
 *
 * What it does:
 * - Disables right-click context menu (shows a polite toast instead of blocking)
 * - Blocks Ctrl+U / Cmd+U (View Source shortcut)
 * - Blocks Ctrl+S / Cmd+S (Save Page shortcut)
 *
 * What it does NOT do:
 * - Block determined developers (DevTools can always be opened)
 * - Break any normal user interaction (text selection, copy in inputs, etc.)
 * - Interfere with accessibility
 *
 * This is friction, not security. It stops casual "right-click save-as" cloners.
 */
export default function AntiCopy() {
  useEffect(() => {
    // Only apply in production
    if (process.env.NODE_ENV !== "production") return;

    function handleContextMenu(e: MouseEvent) {
      // Allow right-click on input/textarea elements for usability
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    }

    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;

      // Block Ctrl/Cmd + U (View Source)
      if (isMeta && e.key === "u") {
        e.preventDefault();
        return;
      }

      // Block Ctrl/Cmd + S (Save Page)
      if (isMeta && e.key === "s") {
        e.preventDefault();
        return;
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
