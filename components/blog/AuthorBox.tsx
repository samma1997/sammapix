import Image from "next/image";
import Link from "next/link";
import { Globe, Github, Linkedin } from "lucide-react";

export default function AuthorBox() {
  return (
    <div className="mt-12 p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
      <div className="flex items-start gap-4">
        {/* Photo */}
        <Image
          src="/luca-sammarco.jpg"
          alt="Luca Sammarco"
          width={80}
          height={80}
          className="rounded-full object-cover flex-shrink-0"
        />

        <div className="min-w-0">
          {/* Name */}
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Luca Sammarco
          </p>

          {/* Title */}
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
            Founder of SammaPix &middot; Digital Product Builder
          </p>

          {/* Bio */}
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mt-2">
            Full-stack developer and travel photographer. I built SammaPix
            because every image tool I tried was either too slow, too expensive,
            or required uploading my photos to someone else&apos;s server.
          </p>

          {/* Social links + More about me */}
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://lucasammarco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="lucasammarco.com"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="https://github.com/samma1997"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/luca-sammarco-a88b8a148/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.5} />
            </a>

            <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>

            <Link
              href="/about"
              className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              More about me →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
