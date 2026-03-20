"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Sparkles, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface AiRenameModalProps {
  open: boolean;
  onClose: () => void;
  fileId?: string;
}

export default function AiRenameModal({ open, onClose }: AiRenameModalProps) {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-md bg-brand-light border border-indigo-200 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-brand" strokeWidth={1.5} />
            </div>
          </div>
          <DialogTitle>Sign in to use AI Rename</DialogTitle>
          <DialogDescription>
            AI Rename uses Gemini to generate SEO-friendly filenames and alt text.
            It&apos;s free- 10 AI credits per day.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          {/* Google */}
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

          {/* GitHub */}
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
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          No credit card required. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}

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
