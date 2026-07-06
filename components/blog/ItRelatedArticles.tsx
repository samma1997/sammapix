import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IT_POSTS } from "@/lib/it-blog-posts";

// "Leggi anche": mostra fino a 3 altri articoli italiani, escluso quello corrente.
export default function ItRelatedArticles({ currentSlug }: { currentSlug: string }) {
  const others = IT_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-4">
        Leggi anche
      </h2>
      <div className="space-y-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/it/blog/${p.slug}`}
            className="block rounded-xl border border-gray-200 dark:border-[#2A2A2A] p-4 hover:border-gray-300 dark:hover:border-[#3A3A3A] transition-colors"
          >
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
              {p.title}
            </h3>
            <p className="mt-1 text-[13px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed line-clamp-2">
              {p.description}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 dark:text-indigo-400">
              Leggi la guida
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
