"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
  plan?: "monthly" | "annual";
}

export default function CheckoutButton({
  className,
  size = "lg",
  children,
  plan = "monthly",
}: CheckoutButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);

    // Generate event ID for Meta deduplication (client pixel + server CAPI)
    const eventId = `ic_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Fire conversion events for ad platforms
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof w.fbq === "function") w.fbq("track", "InitiateCheckout", {}, { eventID: eventId });
      if (typeof w.gtag === "function") w.gtag("event", "begin_checkout");
    }

    if (!session) {
      // Not logged in → signin, then redirect to dashboard upgrade
      router.push("/api/auth/signin?callbackUrl=/dashboard/upgrade");
      return;
    }
    setLoading(true);
    try {
      // Read Meta cookies for Conversions API attribution
      const getCookie = (name: string) =>
        document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] ?? "";

      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
          eventId,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string; code?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(`Checkout error: ${data.error ?? "no URL returned"} [${data.code ?? res.status}]`);
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size={size}
        className={className}
        loading={loading}
        onClick={handleClick}
      >
        {children ?? "Get Pro- $9/mo"}
      </Button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </>
  );
}
