import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface ToolHeaderProps {
  title: string;
  description: string;
  /** Lucide icon component for this tool */
  icon?: LucideIcon;
  /** Accent color hex string, e.g. "#6366F1" */
  accentColor?: string;
}

export default function ToolHeader({
  title,
  description,
  icon: Icon,
  accentColor = "#6366F1",
}: ToolHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        All tools
      </Link>

      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
            }}
            aria-hidden="true"
          >
            <Icon
              className="h-4.5 w-4.5"
              style={{ color: accentColor, width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
        )}
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
          {title}
        </h1>
      </div>

      <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{description}</p>
    </div>
  );
}
