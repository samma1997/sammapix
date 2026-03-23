"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Headphones, Play, Pause } from "lucide-react";

type TTSState = "idle" | "playing" | "paused" | "error";

interface TextToSpeechProps {
  slug: string;
  articleRef: React.RefObject<HTMLElement | null>;
}

export default function TextToSpeech({ slug, articleRef }: TextToSpeechProps) {
  const [state, setState] = useState<TTSState>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const elementsRef = useRef<Element[]>([]);
  const charOffsetsRef = useRef<number[]>([]);
  const totalCharsRef = useRef(0);
  const prevHighlightRef = useRef<Element | null>(null);

  const audioUrl = `/blog/audio/${slug}.mp3`;

  // Check if audio file exists
  useEffect(() => {
    fetch(audioUrl, { method: "HEAD" })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [audioUrl]);

  // Build element-to-time mapping when audio starts
  const buildElementMap = useCallback(() => {
    if (!articleRef.current) return;
    const els = Array.from(
      articleRef.current.querySelectorAll("p, li, h2, h3"),
    );
    elementsRef.current = els;

    // Build cumulative char offsets — each element's "start" position
    let total = 0;
    const offsets: number[] = [];
    for (const el of els) {
      offsets.push(total);
      total += (el.textContent?.trim().length ?? 0) + 1; // +1 for period separator
    }
    charOffsetsRef.current = offsets;
    totalCharsRef.current = total;
  }, [articleRef]);

  // Highlight current element based on audio time
  const updateHighlight = useCallback(
    (time: number, dur: number) => {
      if (dur <= 0 || totalCharsRef.current === 0) return;

      const pct = time / dur;
      const charPosition = pct * totalCharsRef.current;
      const offsets = charOffsetsRef.current;
      const els = elementsRef.current;

      // Find which element we're in
      let idx = 0;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (charPosition >= offsets[i]) {
          idx = i;
          break;
        }
      }

      const el = els[idx];
      if (el && el !== prevHighlightRef.current) {
        // Remove previous highlight
        if (prevHighlightRef.current) {
          prevHighlightRef.current.classList.remove("tts-active");
        }
        // Add new highlight and scroll into view
        el.classList.add("tts-active");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        prevHighlightRef.current = el;
      }
    },
    [],
  );

  const clearHighlight = useCallback(() => {
    if (prevHighlightRef.current) {
      prevHighlightRef.current.classList.remove("tts-active");
      prevHighlightRef.current = null;
    }
  }, []);

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
        updateHighlight(audio.currentTime, audio.duration);
      }
    });

    audio.addEventListener("ended", () => {
      setState("idle");
      setProgress(0);
      setCurrentTime(0);
      clearHighlight();
    });

    audio.addEventListener("error", () => {
      setState("error");
      clearHighlight();
    });

    return () => {
      audio.pause();
      audio.src = "";
      clearHighlight();
    };
  }, [exists, audioUrl, updateHighlight, clearHighlight]);

  function handlePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;

    if (state === "idle" || state === "error") {
      buildElementMap();
      audio.play().then(() => setState("playing")).catch(() => setState("error"));
    } else if (state === "playing") {
      audio.pause();
      setState("paused");
    } else if (state === "paused") {
      audio.play().then(() => setState("playing")).catch(() => setState("error"));
    }
  }

  function handleStop() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setState("idle");
    setProgress(0);
    setCurrentTime(0);
    clearHighlight();
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
            <button
              onClick={handleStop}
              className="text-[11px] text-[#A3A3A3] hover:text-[#525252] transition-colors ml-1"
            >
              Stop
            </button>
          </div>
        )}

        {state === "error" && (
          <span className="text-[13px] text-[#A3A3A3]">Audio unavailable</span>
        )}
      </div>
    </div>
  );
}
