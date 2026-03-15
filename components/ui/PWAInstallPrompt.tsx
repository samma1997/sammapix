"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Check if already dismissed
    if (typeof window !== "undefined") {
      const dismissedAt = localStorage.getItem("sammapix-pwa-dismissed");
      if (dismissedAt) {
        const daysAgo = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysAgo < 14) return; // Don't show for 14 days after dismiss
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Store globally so sidebar install button can access it
      (window as any).__sammapix_install_prompt = e;
      setDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Only show to logged-in users (incentive to register)
  if (status !== "authenticated") return null;
  if (pathname.startsWith("/dashboard")) return null;
  if (dismissed || !deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setDismissed(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("sammapix-pwa-dismissed", Date.now().toString());
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl shadow-lg p-4 animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5]"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg flex items-center justify-center">
          <Download className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            Install SammaPix
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-3">
            Add to your desktop for faster access. Works offline.
          </p>
          <button
            onClick={handleInstall}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-xs font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Install app
          </button>
        </div>
      </div>
    </div>
  );
}
