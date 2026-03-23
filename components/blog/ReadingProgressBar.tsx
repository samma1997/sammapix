"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(rafId);
  }, []);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-[#6366F1] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
