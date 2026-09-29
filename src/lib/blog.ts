import { buildPosts } from "@/lib/blog-core";

export * from "@/lib/blog-core";

// Every Markdown file in src/content/blog becomes a post. See the "Blog"
// section of the top-level README for the frontmatter format.
const files = import.meta.glob<string>("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const posts = buildPosts(files);

export function getPost(slug: string | undefined) {
  return posts.find((post) => post.slug === slug);
}
