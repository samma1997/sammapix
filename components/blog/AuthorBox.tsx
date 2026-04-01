import Image from "next/image";
import Link from "next/link";
import { Globe, Github, Linkedin } from "lucide-react";

export default function AuthorBox() {
  return (
    <div className="mt-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-8">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] mb-4">
        Written by
      </p>

      <div className="flex items-center gap-3.5">
        {/* Photo — small square with subtle rounded corners, like Notion */}
        <Image
          src="/luca-sammarco.jpg"
          alt="Luca Sammarco"
          width={44}
          height={44}
          className="rounded-md object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          {/* Name + links on same line */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/about"
              className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] hover:underline underline-offset-2"
            >
              Luca Sammarco
            </Link>
            <span className="text-[#D4D4D4] dark:text-[#404040]">/</span>
            <div className="flex items-center gap-1.5">
              <a
                href="https://lucasammarco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
                aria-label="lucasammarco.com"
              >
                <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://github.com/samma1997"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/luca-sammarco-a88b8a148/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Title — subtle, one line */}
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
            Founder of SammaPix &middot; Digital Product Builder
          </p>
        </div>
      </div>
    </div>
  );
}
