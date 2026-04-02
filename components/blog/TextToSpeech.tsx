"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Headphones, Play, Pause } from "lucide-react";

type TTSState = "idle" | "playing" | "paused" | "error";

interface TimingSegment {
  start: number;
  end: number;
  text: string;
}

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
  const timingRef = useRef<TimingSegment[]>([]);
  const elementsRef = useRef<Element[]>([]);
  const prevHighlightRef = useRef<Element | null>(null);

  const audioUrl = `/blog/audio/${slug}.mp3`;
  const timingUrl = `/blog/audio/${slug}.json`;

  // Check if audio + timing files exist, load timing
  useEffect(() => {
    Promise.all([
      fetch(audioUrl, { method: "HEAD" }),
      fetch(timingUrl).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([audioRes, timingData]) => {
        setExists(audioRes.ok && timingData !== null);
        if (timingData) timingRef.current = timingData;
      })
      .catch(() => setExists(false));
  }, [audioUrl, timingUrl]);

  const clearHighlight = useCallback(() => {
    if (prevHighlightRef.current) {
      prevHighlightRef.current.classList.remove("tts-active");
      prevHighlightRef.current = null;
    }
  }, []);

  const updateHighlight = useCallback(
    (time: number) => {
      const timing = timingRef.current;
      const els = elementsRef.current;
      if (timing.length === 0 || els.length === 0) return;

      // Find which segment we're in based on actual timestamps
      let segIdx = -1;
      for (let i = timing.length - 1; i >= 0; i--) {
        if (time >= timing[i].start) {
          segIdx = i;
          break;
        }
      }

      if (segIdx < 0 || segIdx >= els.length) return;

      const el = els[segIdx];
      if (el && el !== prevHighlightRef.current) {
        clearHighlight();
        el.classList.add("tts-active");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        prevHighlightRef.current = el;
      }
    },
    [clearHighlight],
  );

  // Setup audio element
  useEffect(() => {
    if (!exists) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
        updateHighlight(audio.currentTime);
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

  // Build element list on play — skip elements inside [data-tts-skip]
  const buildElementMap = useCallback(() => {
    if (!articleRef.current) return;
    elementsRef.current = Array.from(
      articleRef.current.querySelectorAll("h2, h3, p, li"),
    ).filter((el) => !el.closest("[data-tts-skip]"));
  }, [articleRef]);

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
