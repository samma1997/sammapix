import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Step {
  title: string;
  desc: string;
}

interface ProTip {
  text: string;
  linkLabel: string;
  linkHref: string;
}

interface HowToUseProps {
  steps: Step[];
  toolName: string;
  proTip?: ProTip;
}

export default function HowToUse({ steps, toolName, proTip }: HowToUseProps) {
  return (
    <section className="py-10 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
          How to use {toolName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
            >
              <div className="h-6 w-6 shrink-0 rounded-full bg-[#F0F0F0] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mt-0.5">
                <span className="text-[11px] font-semibold text-[#525252] dark:text-[#A3A3A3]">
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug mb-0.5">
                  {step.title}
                </p>
                <p className="text-xs text-[#737373] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {proTip && (
          <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
            <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wide shrink-0 mt-0.5">
              Pro tip
            </span>
            <p className="text-xs text-[#737373] leading-relaxed">
              {proTip.text}{" "}
              <Link
                href={proTip.linkHref}
                className="inline-flex items-center gap-0.5 text-[#6366F1] hover:underline font-medium"
              >
                {proTip.linkLabel}
                <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
