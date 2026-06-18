"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fireBeginCheckoutEvent } from "@/lib/checkout-tracking";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);

    // Guest checkout: anyone can start. Stripe collects the email and
    // /auth/complete signs the user in passwordlessly after payment.
    const eventId = fireBeginCheckoutEvent(plan);

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
          ga: getCookie("_ga"),
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
