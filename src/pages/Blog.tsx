import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import {
  BLOG_DESCRIPTION,
  BLOG_PATH,
  BLOG_TITLE,
  blogStructuredData,
  formatPostDate,
  postPath,
  posts,
} from "@/lib/blog";
import { usePageSeo } from "@/lib/usePageSeo";

const structuredData = blogStructuredData(posts);

export default function Blog() {
  usePageSeo({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    path: BLOG_PATH,
    structuredData,
  });

  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
          <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(28,35%,72%,0.12)] blur-[120px]" />
          <div className="container relative mx-auto px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
              Blog
            </p>
            <h1
              className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Insights on{" "}
              <span className="gradient-text">AI for real estate</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {BLOG_DESCRIPTION}
            </p>
          </div>
        </section>

        <section className="container mx-auto grid max-w-5xl gap-6 px-4 pb-20 md:grid-cols-2">
          {posts.length === 0 && (
            <p className="text-center text-muted-foreground md:col-span-2">
              New articles are on the way. Check back soon.
            </p>
          )}
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-3xl border border-[hsl(21,38%,64%,0.2)] bg-[hsl(0,0%,7%,0.6)] p-6 backdrop-blur-xl transition-colors hover:border-[hsl(28,40%,76%,0.5)] sm:p-8"
            >
              <p className="text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {" · "}
                {post.readingMinutes} min read
              </p>
              <h2
                className="mt-3 text-2xl font-bold leading-snug tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <Link
                  to={postPath(post)}
                  className="transition-colors group-hover:text-[hsl(28,40%,76%)]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <Link
                to={postPath(post)}
                aria-label={`Read "${post.title}"`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(28,40%,76%)]"
              >
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
