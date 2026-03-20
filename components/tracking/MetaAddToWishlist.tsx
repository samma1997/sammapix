"use client";

import { useEffect } from "react";

/**
 * Fires Meta Pixel AddToWishlist event on mount.
 * Use on /pricing and /try-pro pages — tracks interested users who haven't converted yet.
 */
export default function MetaAddToWishlist() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "AddToWishlist", {
        content_name: "SammaPix Pro",
        content_category: "subscription",
        value: 7.0,
        currency: "USD",
      });
    }
  }, []);

  return null;
}
