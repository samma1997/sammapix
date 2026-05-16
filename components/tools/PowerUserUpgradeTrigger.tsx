"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// Tracks the distinct tools each user touches. When a free user has visited
// 3+ different tool pages, fire a one-shot upgrade modal celebrating their
// usage and pushing Founding pricing. Tracking is client-only (localStorage),
// gated by:
//   - session must exist (modal pre-signin is pointless — they can't checkout)
//   - plan must be "free"
//   - cooldown after dismissal so we never nag the same user twice
const TOOLS_KEY = "sp-tools-explored";
const SHOWN_KEY = "sp-power-user-modal-shown-at";
const COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const THRESHOLD = 3;
const TRIGGER_DELAY_MS = 800; // let the tool page settle before popping the modal

function extractToolId(pathname: string): string | null {
  const match = pathname.match(/^\/(?:dashboard\/)?tools\/([^/]+)/);
  const id = match?.[1];
  if (!id) return null;
  // Skip the index pages — only count actual tool routes.
  if (id === "page" || id === "layout") return null;
  return id;
}

function loadTools(): Set<string> {
  try {
    const raw = localStorage.getItem(TOOLS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function saveTools(set: Set<string>): void {
  try {
    localStorage.setItem(TOOLS_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* quota — give up silently */
  }
}

function inCooldown(): boolean {
  try {
    const last = Number(localStorage.getItem(SHOWN_KEY) ?? "0");
    return Date.now() - last < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markShown(): void {
  try {
    localStorage.setItem(SHOWN_KEY, String(Date.now()));
  } catch {
    /* quota */
  }
}

export default function PowerUserUpgradeTrigger() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (status !== "authenticated") return;
    const plan = (session?.user as { plan?: string } | undefined)?.plan;
    if (plan && plan !== "free") return;

    const toolId = extractToolId(pathname || "");
    if (!toolId) return;

    const tools = loadTools();
    const before = tools.size;
    tools.add(toolId);
    if (tools.size !== before) saveTools(tools);

    if (tools.size < THRESHOLD) return;
    if (inCooldown()) return;
    if (open) return;

    const timer = setTimeout(() => {
      setCount(tools.size);
      setOpen(true);
      markShown();
    }, TRIGGER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname, session, status, open]);

  if (!open) return null;

  return (
    <ProUpsellModal
      open={open}
      onClose={() => setOpen(false)}
      trigger="power_user"
      toolsExplored={count}
    />
  );
}
