"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";

/**
 * Mounts once at the app root and records first-touch attribution (landing page
 * + referrer + campaign) into the `sx_ft` cookie on the very first page view.
 * Renders nothing. The checkout routes read that cookie to attribute each sale.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}
