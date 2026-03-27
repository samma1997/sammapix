import Link from "next/link";
import { getRelatedTools } from "@/lib/tools-metadata";
import { ArrowRight } from "lucide-react";

export default function RelatedTools({ toolId }: { toolId: string }) {
  const related = getRelatedTools(toolId);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Related tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {related.map((tool) => (
            <Link
              key={tool.id}
              href={tool.slug}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {tool.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {tool.shortDesc}
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors shrink-0"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
