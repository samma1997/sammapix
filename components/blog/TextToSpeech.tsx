"use client";

import { useState, useRef, useEffect } from "react";
import { Headphones, Play, Pause } from "lucide-react";

type TTSState = "idle" | "playing" | "paused" | "error";

interface TextToSpeechProps {
  slug: string;
  articleRef?: React.RefObject<HTMLElement | null>;
}

export default function TextToSpeech({ slug }: TextToSpeechProps) {
  const [state, setState] = useState<TTSState>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);

  const audioUrl = `/blog/audio/${slug}.mp3`;

  // Check if audio file exists
  useEffect(() => {
    fetch(audioUrl, { method: "HEAD" })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [audioUrl]);

  // Setup audio element
  useEffect(() => {
    if (!exists) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener("ended", () => {
      setState("idle");
      setProgress(0);
      setCurrentTime(0);
    });

    audio.addEventListener("error", () => {
      setState("error");
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [exists, audioUrl]);

  function handlePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;

    if (state === "idle" || state === "error") {
      audio.play().then(() => setState("playing")).catch(() => setState("error"));
    } else if (state === "playing") {
      audio.pause();
      setState("paused");
    } else if (state === "paused") {
      audio.play().then(() => setState("playing")).catch(() => setState("error"));
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
  }

  function formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  // Don't render if audio file doesn't exist
  if (exists === null || exists === false) return null;

  return (
    <div className="my-6">
      <div className="inline-flex items-center gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <Headphones size={16} strokeWidth={1.5} className="text-[#737373] shrink-0" />

        <button
          onClick={handlePlayPause}
          className="p-1.5 rounded-full bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          aria-label={state === "playing" ? "Pause" : "Play"}
        >
          {state === "playing" ? (
            <Pause size={14} strokeWidth={2} />
          ) : (
            <Play size={14} strokeWidth={2} className="ml-0.5" />
          )}
        </button>

        {state === "idle" && (
          <span className="text-[13px] text-[#737373]">Listen to article</span>
        )}

        {(state === "playing" || state === "paused") && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#A3A3A3] tabular-nums w-8">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={handleSeek}
              className="w-24 sm:w-36 h-1.5 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden cursor-pointer"
            >
              <div
                className="h-full bg-[#6366F1] rounded-full transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] text-[#A3A3A3] tabular-nums w-8">
              {formatTime(duration)}
            </span>
          </div>
        )}

        {state === "error" && (
          <span className="text-[13px] text-[#A3A3A3]">Audio unavailable</span>
        )}
      </div>
    </div>
  );
}
