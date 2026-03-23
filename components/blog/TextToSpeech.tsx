"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Headphones, Play, Pause, Square } from "lucide-react";

type TTSState = "idle" | "playing" | "paused";

interface TextToSpeechProps {
  articleRef: React.RefObject<HTMLElement | null>;
}

export default function TextToSpeech({ articleRef }: TextToSpeechProps) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<TTSState>("idle");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const currentElementRef = useRef<Element | null>(null);
  const elementsRef = useRef<Element[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const english = voices.find((v) => v.lang.startsWith("en"));
        if (english) setVoice(english);
      };

      pickVoice();
      window.speechSynthesis.addEventListener("voiceschanged", pickVoice);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const clearHighlight = useCallback(() => {
    if (currentElementRef.current) {
      currentElementRef.current.classList.remove("tts-active");
      currentElementRef.current = null;
    }
  }, []);

  const speakNext = useCallback(() => {
    const elements = elementsRef.current;
    const idx = indexRef.current;

    if (idx >= elements.length) {
      clearHighlight();
      setState("idle");
      indexRef.current = 0;
      return;
    }

    const el = elements[idx];
    const text = el.textContent?.trim();

    if (!text) {
      indexRef.current = idx + 1;
      speakNext();
      return;
    }

    clearHighlight();
    el.classList.add("tts-active");
    currentElementRef.current = el;

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 1;

    utterance.onend = () => {
      indexRef.current = idx + 1;
      speakNext();
    };

    utterance.onerror = () => {
      clearHighlight();
      setState("idle");
      indexRef.current = 0;
    };

    window.speechSynthesis.speak(utterance);
  }, [voice, clearHighlight]);

  const handlePlay = useCallback(() => {
    if (state === "idle") {
      if (!articleRef.current) return;
      const els = articleRef.current.querySelectorAll("p, li, h2, h3");
      elementsRef.current = Array.from(els);
      indexRef.current = 0;
      setState("playing");
      speakNext();
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
    } else if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    }
  }, [state, articleRef, speakNext]);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    clearHighlight();
    setState("idle");
    indexRef.current = 0;
  }, [clearHighlight]);

  if (!supported) return null;

  return (
    <div className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#404040] rounded-full px-4 py-2">
      {state === "idle" && (
        <>
          <Headphones size={16} strokeWidth={1.5} className="text-[#737373]" />
          <span className="text-[13px] text-[#737373]">Listen to article</span>
        </>
      )}

      {state === "playing" && (
        <span className="text-[13px] text-[#6366F1] font-medium">Listening...</span>
      )}

      {state === "paused" && (
        <span className="text-[13px] text-[#737373]">Paused</span>
      )}

      <button
        onClick={handlePlay}
        className="p-1 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#262626] transition-colors"
        aria-label={state === "playing" ? "Pause" : "Play"}
      >
        {state === "playing" ? (
          <Pause size={16} strokeWidth={1.5} className="text-[#171717] dark:text-white" />
        ) : (
          <Play size={16} strokeWidth={1.5} className="text-[#171717] dark:text-white" />
        )}
      </button>

      {(state === "playing" || state === "paused") && (
        <button
          onClick={handleStop}
          className="p-1 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#262626] transition-colors"
          aria-label="Stop"
        >
          <Square size={14} strokeWidth={1.5} className="text-[#171717] dark:text-white" />
        </button>
      )}
    </div>
  );
}
