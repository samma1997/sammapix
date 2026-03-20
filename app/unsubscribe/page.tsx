"use client";

import { useState } from "react";
import { MailX, Check } from "lucide-react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-[#191919]">
      <div className="max-w-md w-full text-center">
        {status === "done" ? (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/30">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Unsubscribed
            </h1>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">
              You have been removed from our mailing list. You will no longer receive marketing emails from SammaPix.
            </p>
            <Link
              href="/"
              className="text-sm text-[#6366F1] hover:underline"
            >
              Back to SammaPix
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F5] dark:bg-[#252525]">
              <MailX className="h-6 w-6 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Unsubscribe
            </h1>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">
              Enter your email to unsubscribe from SammaPix marketing emails. You will still receive essential account notifications.
            </p>
            <form onSubmit={handleUnsubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] px-4 py-2.5 text-sm text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:border-[#6366F1] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-[#171717] dark:bg-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? "Unsubscribing..." : "Unsubscribe"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Something went wrong. Please try again or email support@sammapix.com.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
