"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
}

export default function CheckoutButton({
  className,
  size = "lg",
  children,
}: CheckoutButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
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
