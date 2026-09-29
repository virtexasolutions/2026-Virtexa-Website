import { useMemo, type MouseEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import {
  BLOG_PATH,
  SITE_NAME,
  formatPostDate,
  getPost,
  postPath,
  postStructuredData,
  posts,
  type BlogPost as Post,
} from "@/lib/blog";
import { usePageSeo } from "@/lib/usePageSeo";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  return post ? <Article post={post} /> : <NotFound />;
}

function Article({ post }: { post: Post }) {
  const structuredData = useMemo(() => postStructuredData(post), [post]);
  usePageSeo({
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    path: postPath(post),
    structuredData,
    type: "article",
  });

  const navigate = useNavigate();
  // Keep internal links inside the post body as client-side navigations.
  const handleBodyClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (
      !href?.startsWith("/") ||
      href.startsWith("//") ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    navigate(href);
  };

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />

      <main className="container mx-auto max-w-3xl px-4 pt-12 pb-20 lg:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link
            to={BLOG_PATH}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[hsl(28,40%,76%)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>
        </nav>

        <article className="mt-8">
          <header>
            {post.tags.length > 0 && (
              <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
                {post.tags[0]}
              </p>
            )}
            <h1
              className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              By {post.author} ·{" "}
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              {post.updated && (
                <>
                  {" · Updated "}
                  <time dateTime={post.updated}>
                    {formatPostDate(post.updated)}
                  </time>
                </>
              )}
              {" · "}
              {post.readingMinutes} min read
            </p>
          </header>

          <div
            className="blog-prose mt-10"
            onClick={handleBodyClick}
            // Post HTML is rendered from Markdown files committed to this repo.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <aside className="mt-16 rounded-3xl border border-[hsl(21,38%,64%,0.2)] bg-[hsl(0,0%,7%,0.6)] p-6 text-center backdrop-blur-xl sm:p-10">
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            See where your pipeline is leaking
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            In a free 30-minute System Audit, we map how calls and leads move
            through your business today and show you where an AI voice agent
            would help.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] font-semibold text-[hsl(0,0%,10%)] hover:opacity-90"
          >
            <a href="/#audit">
              <Calendar className="mr-2 h-4 w-4" />
              Book Your System Audit
            </a>
          </Button>
        </aside>

        {more.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={postPath(p)}
                    className="block h-full rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-5 transition-colors hover:border-[hsl(28,40%,76%,0.5)]"
                  >
                    <span className="block font-semibold text-foreground">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      {p.readingMinutes} min read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
