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

  const handleClick = async () => {
    // Fire conversion events for ad platforms
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof w.fbq === "function") w.fbq("track", "InitiateCheckout");
      if (typeof w.gtag === "function") w.gtag("event", "begin_checkout");
    }

    if (!session) {
      // Not logged in → signin, then redirect to dashboard upgrade
      router.push("/api/auth/signin?callbackUrl=/dashboard/upgrade");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string; code?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(`Checkout error: ${data.error ?? "no URL returned"} [${data.code ?? res.status}]`);
      }
    } catch (err) {
      alert(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      size={size}
      className={className}
      loading={loading}
      onClick={handleClick}
    >
      {children ?? "Get Pro — $7/mo"}
    </Button>
  );
}
