import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Zap, FileImage, Sparkles, ScanLine, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Tools Online — Compress, Convert, Rename | SammaPix",
  description:
    "All free browser-based image tools in one place. Compress JPG PNG WebP, convert to WebP, AI rename filenames, inspect EXIF data. No upload, no signup needed.",
  alternates: {
    canonical: "https://sammapix.com/tools",
  },
};

type ToolStatus = "active" | "coming-soon";

interface Tool {
  name: string;
  description: string;
  href: string;
  status: ToolStatus;
  icon: React.ReactNode;
  badge?: string;
}

const tools: Tool[] = [
  {
    name: "Compress Images",
    description:
      "Reduce JPG, PNG, WebP and GIF file size directly in your browser. Lossless and lossy modes, ZIP download, no upload required.",
    href: "/tools/compress",
    status: "active",
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
  },
  {
    name: "Convert to WebP",
    description:
      "Convert any image to WebP format in one click. WebP files are up to 30% smaller than JPEG — ideal for faster websites and better Core Web Vitals.",
    href: "/tools/webp",
    status: "active",
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
  },
  {
    name: "AI Rename",
    description:
      "Let AI read your images and generate descriptive, SEO-friendly filenames automatically. Stop uploading images named DSC_0042.jpg.",
    href: "/tools/ai-rename",
    status: "active",
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
  },
  {
    name: "EXIF Inspector",
    description:
      "Read and remove EXIF metadata from your photos — GPS coordinates, camera model, timestamps and more. Protect your privacy before sharing images.",
    href: "/tools/exif",
    status: "coming-soon",
    icon: <ScanLine className="h-5 w-5 text-gray-400" strokeWidth={1.5} />,
    badge: "Coming soon",
  },
  {
    name: "Photo Culling",
    description:
      "Smart batch review tool for photographers. Quickly pick your best shots, reject blurry or duplicate frames, and export your selection.",
    href: "/tools/cull",
    status: "coming-soon",
    icon: <Layers className="h-5 w-5 text-gray-400" strokeWidth={1.5} />,
    badge: "Coming soon",
  },
];

export default function ToolsHubPage() {
  const activeTools = tools.filter((t) => t.status === "active");
  const comingSoonTools = tools.filter((t) => t.status === "coming-soon");

  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#171717] tracking-tight mb-3">
            Image Tools
          </h1>
          <p className="text-[#737373] leading-relaxed">
            Free browser-based tools for images. Everything runs in your browser —
            your files never leave your device.
          </p>
        </div>

        {/* Active tools */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-4">
            Available now
          </h2>
          <div className="flex flex-col gap-3">
            {activeTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 border border-[#E5E5E5] rounded-md bg-white hover:border-[#A3A3A3] hover:shadow-sm transition-all"
              >
                <div className="h-10 w-10 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-center shrink-0 group-hover:border-[#D4D4D4] transition-colors">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#171717]">
                      {tool.name}
                    </h3>
                    <ArrowRight
                      className="h-4 w-4 text-gray-400 shrink-0 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm text-[#737373] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming soon tools */}
        <div>
          <h2 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-4">
            Coming soon
          </h2>
          <div className="flex flex-col gap-3">
            {comingSoonTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md bg-white hover:border-[#D4D4D4] transition-colors"
              >
                <div className="h-10 w-10 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-center shrink-0">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#404040]">
                      {tool.name}
                    </h3>
                    {tool.badge && (
                      <span className="text-[10px] font-medium uppercase tracking-wide bg-[#EEF2FF] text-[#6366F1] px-2 py-0.5 rounded">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
