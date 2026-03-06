"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ScanLine, CheckCircle } from "lucide-react";

const activeTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "AI Rename", href: "/tools/ai-rename" },
];

export default function ExifToolPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-widest bg-[#EEF2FF] text-[#6366F1] px-2.5 py-1 rounded border border-[#C7D2FE]">
            Coming soon
          </span>
        </div>

        {/* Icon */}
        <div className="h-12 w-12 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-center mb-6">
          <ScanLine className="h-6 w-6 text-[#525252]" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#171717] tracking-tight mb-4 leading-tight">
          EXIF Inspector &amp; Remover
        </h1>

        {/* Description */}
        <p className="text-[#737373] text-base leading-relaxed mb-8">
          Read and strip EXIF metadata from your photos directly in the browser.
          Remove GPS coordinates, camera model, timestamps, and other sensitive
          data before sharing images online — without uploading anything to a
          server.
        </p>

        {/* Feature list */}
        <ul className="space-y-3 mb-10">
          {[
            "View all EXIF metadata fields in a clean table",
            "Remove GPS location data with one click",
            "Strip all metadata for maximum privacy",
            "Process multiple images at once",
            "Fully browser-based — nothing uploaded",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
              </div>
              <span className="text-sm text-[#525252]">{item}</span>
            </li>
          ))}
        </ul>

        {/* Notify form */}
        <div className="border border-[#E5E5E5] rounded-md p-6 bg-[#FAFAFA] mb-10">
          <h2 className="text-sm font-semibold text-[#171717] mb-1">
            Get notified when it&apos;s ready
          </h2>
          <p className="text-xs text-[#A3A3A3] mb-4">
            No spam. One email when EXIF Inspector launches.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 text-sm text-[#16A34A]">
              <CheckCircle className="h-4 w-4" strokeWidth={1.5} />
              You&apos;re on the list — we&apos;ll notify you at launch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#E5E5E5] rounded-md bg-white placeholder-[#A3A3A3] text-[#171717] focus:outline-none focus:border-[#6366F1] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors whitespace-nowrap"
              >
                Notify me
              </button>
            </form>
          )}
        </div>

        {/* Meanwhile CTA */}
        <div>
          <p className="text-xs text-[#A3A3A3] mb-3 uppercase tracking-widest font-medium">
            Meanwhile, try
          </p>
          <div className="flex flex-wrap gap-2">
            {activeTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] bg-white transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
