import { db } from "@/lib/db";
import { growthDailyTodos } from "@/lib/db/schema";
import { POSTS, type Post } from "@/lib/blog-posts";
import { isNotNull } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Blog Promoter — tracks which blog posts have been crossposted
//
// A blog is considered "promoted" if its slug appears in any past TODO's
// draftText (which the daily-todo cron populates with the blog URL).
// ---------------------------------------------------------------------------

/**
 * Returns blog posts that have NEVER been crossposted/promoted.
 * A post is considered promoted if its slug was referenced in any
 * past daily TODO's draftText field.
 */
export async function getUnpromotedBlogs(): Promise<Post[]> {
  // Fetch all non-null draftText values from all todos.
  // We look for slug patterns to determine which blogs have been promoted before.
  const allTodos = await db
    .select({ draftText: growthDailyTodos.draftText })
    .from(growthDailyTodos)
    .where(isNotNull(growthDailyTodos.draftText));

  // Collect all slugs that have been mentioned in any past TODO draftText
  const promotedSlugs = new Set<string>();
  for (const todo of allTodos) {
    if (!todo.draftText) continue;
    const text = todo.draftText.toLowerCase();
    for (const post of POSTS) {
      if (text.includes(post.slug)) {
        promotedSlugs.add(post.slug);
      }
    }
  }

  // Return posts whose slug has never appeared in any TODO draftText
  return POSTS.filter((post) => !promotedSlugs.has(post.slug));
}
