"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GrowthLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  // On mount, check if we already have a NextAuth session (returned from Google OAuth)
  useEffect(() => {
    // Check URL params for callback indicator
    const params = new URLSearchParams(window.location.search);
    const hasCallback = document.cookie.includes("next-auth.session-token") ||
                        document.cookie.includes("__Secure-next-auth.session-token");

    fetch("/api/auth/session", { credentials: "include" })
      .then((r) => r.json())
      .then((session) => {
        if (session?.user?.email) {
          setGoogleLoading(true);
          // User is signed in with Google — set growth cookie
          fetch("/api/growth/auth/google", { method: "POST", credentials: "include" })
            .then((res) => {
              if (res.ok) {
                window.location.href = "https://www.sammapix.com/dashboard/growth";
              } else {
                setError("Your Google account is not authorized for the Growth Dashboard");
                setGoogleLoading(false);
              }
            })
            .catch(() => { setError("Failed to authenticate"); setGoogleLoading(false); });
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/growth/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = "https://www.sammapix.com/dashboard/growth";
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    setGoogleLoading(true);
    setError("");
    window.location.href = "/api/auth/signin/google?callbackUrl=" + encodeURIComponent("https://www.sammapix.com/growth-login");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Growth Dashboard
          </h1>
          <p className="text-sm text-[#737373] mt-1">SammaPix Command Center</p>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 text-sm px-4 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] disabled:opacity-50 transition-colors font-medium mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Redirecting..." : "Sign in with Google"}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]"></div>
          <span className="text-xs text-[#A3A3A3]">or</span>
          <div className="flex-1 h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full text-sm px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full text-sm px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm px-4 py-2.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
