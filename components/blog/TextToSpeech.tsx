"use client";

import { useState, useRef, useCallback } from "react";
import { Headphones, Play, Pause, Loader2 } from "lucide-react";

type TTSState = "idle" | "loading" | "playing" | "paused";

interface TextToSpeechProps {
  articleRef: React.RefObject<HTMLElement | null>;
}

export default function TextToSpeech({ articleRef }: TextToSpeechProps) {
  const [state, setState] = useState<TTSState>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const extractText = useCallback((): string => {
    if (!articleRef.current) return "";
    const els = articleRef.current.querySelectorAll("p, li, h2, h3");
    return Array.from(els)
      .map((el) => el.textContent?.trim())
      .filter(Boolean)
      .join(". ");
  }, [articleRef]);

  const generateAndPlay = useCallback(async () => {
    // If we already have audio, just play it
    if (audioRef.current && blobUrlRef.current) {
      audioRef.current.play();
      setState("playing");
      return;
    }

    setState("loading");

    try {
      const text = extractText();
      if (!text) {
        setState("idle");
        return;
      }

      const res = await fetch("/api/blog/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        setState("idle");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      });

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("ended", () => {
        setState("idle");
        setProgress(0);
      });

      await audio.play();
      setState("playing");
    } catch {
      setState("idle");
    }
  }, [extractText]);

  const handlePlayPause = useCallback(() => {
    if (state === "idle") {
      generateAndPlay();
    } else if (state === "playing" && audioRef.current) {
      audioRef.current.pause();
      setState("paused");
    } else if (state === "paused") {
      audioRef.current?.play();
      setState("playing");
    }
  }, [state, generateAndPlay]);

  function formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const currentTime = audioRef.current?.currentTime ?? 0;

  return (
    <div className="my-6">
      <div className="inline-flex items-center gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <Headphones size={16} strokeWidth={1.5} className="text-[#737373] shrink-0" />

        <button
          onClick={handlePlayPause}
          disabled={state === "loading"}
          className="p-1.5 rounded-full bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5] disabled:opacity-50 transition-colors"
          aria-label={state === "playing" ? "Pause" : "Play"}
        >
          {state === "loading" ? (
            <Loader2 size={14} strokeWidth={2} className="animate-spin" />
          ) : state === "playing" ? (
            <Pause size={14} strokeWidth={2} />
          ) : (
            <Play size={14} strokeWidth={2} className="ml-0.5" />
          )}
        </button>

        {state === "idle" && (
          <span className="text-[13px] text-[#737373]">Listen to article</span>
        )}

        {state === "loading" && (
          <span className="text-[13px] text-[#6366F1]">Generating audio...</span>
        )}

        {(state === "playing" || state === "paused") && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#A3A3A3] tabular-nums w-8">
              {formatTime(currentTime)}
            </span>
            <div className="w-24 sm:w-36 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] text-[#A3A3A3] tabular-nums w-8">
              {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
