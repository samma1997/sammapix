"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import { Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Whitelist of internal paths allowed as callbackUrl post-signin.
// Open-redirect protection: never trust the raw query string.
function safeCallback(raw: string | null): string {
  if (!raw) return "/dashboard";
  try {
    const decoded = decodeURIComponent(raw);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return "/dashboard";
    return decoded;
  } catch {
    return "/dashboard";
  }
}

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallback(searchParams.get("callbackUrl"));
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const handleSignIn = async (providerId: string) => {
    setLoading(providerId);
    try {
      await signIn(providerId, { callbackUrl });
    } catch {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="h-10 w-10 rounded-lg border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] tracking-tight">
            Sign in to SammaPix
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-[#737373] leading-relaxed">
            Continue with your account to use AI Rename
          </p>
        </div>

        {/* Provider buttons */}
        <div className="flex flex-col gap-2">
          {providers ? (
            <>
              {providers["google"] && (
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-start gap-3 h-10"
                  loading={loading === "google"}
                  onClick={() => handleSignIn("google")}
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
              )}
              {providers["github"] && (
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-start gap-3 h-10"
                  loading={loading === "github"}
                  onClick={() => handleSignIn("github")}
                >
                  <Github className="h-4 w-4" strokeWidth={1.5} />
                  Continue with GitHub
                </Button>
              )}
            </>
          ) : (
            // Skeleton while providers load
            <>
              <div className="h-10 rounded-md bg-gray-100 dark:bg-[#2A2A2A] animate-pulse" />
              <div className="h-10 rounded-md bg-gray-100 dark:bg-[#2A2A2A] animate-pulse" />
            </>
          )}
        </div>

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
          <p className="text-xs text-gray-400 dark:text-[#525252] text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              Privacy Policy
            </a>
            . No credit card required.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-xs text-gray-400 dark:text-[#525252] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
          >
            Back to SammaPix
          </a>
        </div>
      </div>
    </div>
  );
}
