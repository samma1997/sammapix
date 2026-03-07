import { Metadata } from "next";
import { Keyboard, FileImage, Shield } from "lucide-react";
import ToolHeader from "@/components/tools/ToolHeader";
import CullClient from "@/components/tools/Cull";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cull — Keyboard Photo Review | SammaPix",
  description:
    "Review your photos fast with keyboard shortcuts. Press K to keep, X to reject. Download only your best shots as a ZIP. Works entirely in your browser.",
  alternates: { canonical: `${APP_URL}/tools/cull` },
  openGraph: {
    title: "Cull — Keyboard Photo Review | SammaPix",
    description:
      "Review your photos fast with keyboard shortcuts. Press K to keep, X to reject. Download only your best shots as a ZIP. Works entirely in your browser.",
    url: `${APP_URL}/tools/cull`,
    siteName: "SammaPix",
    type: "website",
  },
};

const steps = [
  {
    n: "1",
    title: "Drop your photos",
    desc: "Upload any batch of JPG or HEIC photos. Up to 20 files on the free plan.",
  },
  {
    n: "2",
    title: "K to keep, X to reject",
    desc: "Review each photo full-screen with keyboard shortcuts. Navigate with arrow keys. No clicking required.",
  },
  {
    n: "3",
    title: "Download your keepers",
    desc: "When you're done, download a ZIP containing only the photos you marked as keep.",
  },
];

const features = [
  {
    icon: <Keyboard className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Keyboard-first",
    description:
      "K/X review is 10x faster than clicking. Go through 100 photos in minutes without ever touching the mouse.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Works with HEIC",
    description:
      "iPhone photos in HEIC format are fully supported. Preview and cull directly — no conversion step needed.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% private",
    description:
      "Photos never leave your device. Everything happens in your browser — no upload, no server, no cloud.",
  },
];

export default function CullPage() {
  return (
    <main>
      <ToolHeader
        title="Cull"
        description="Review your photos one at a time with keyboard shortcuts. K to keep, X to reject. Download only your best shots as a ZIP."
      />

      <CullClient />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-4 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Why Cull?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
