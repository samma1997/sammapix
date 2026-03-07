import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ToolHeaderProps {
  title: string;
  description: string;
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#171717] transition-colors mb-5"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        All tools
      </Link>
      <h1 className="text-2xl font-semibold text-[#171717] mb-1">{title}</h1>
      <p className="text-sm text-[#737373]">{description}</p>
    </div>
  );
}
