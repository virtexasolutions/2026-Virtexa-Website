import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import { getPost, postPath } from "@/lib/blog";
import {
  comparisonPath,
  getComparison,
  type ComparisonPage as ComparisonData,
} from "@/lib/comparisons";
import { getSolution, solutionPath } from "@/lib/solutions";
import { ORGANIZATION_ID, SITE_URL, usePageSeo } from "@/lib/usePageSeo";
import NotFound from "./NotFound";

export default function Compare() {
  const { slug } = useParams();
  const page = getComparison(slug);
  return page ? <ComparePage page={page} /> : <NotFound />;
}

function structuredDataFor(page: ComparisonData) {
  const url = `${SITE_URL}${comparisonPath(page)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.heading,
        description: page.description,
        url,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.name, item: url },
        ],
      },
    ],
  };
}

/** Renders trusted, inline-only Markdown (bold and links) from comparisons.ts. */
const inline = (text: string) => ({
  __html: marked.parseInline(text, { async: false }),
});

const heading = { fontFamily: "'Playfair Display', serif" };

function ComparePage({ page }: { page: ComparisonData }) {
  const structuredData = useMemo(() => structuredDataFor(page), [page]);
  usePageSeo({
    title: page.metaTitle,
    description: page.description,
    path: comparisonPath(page),
    structuredData,
  });

  const solution = getSolution(page.relatedSolution);
  const related = getPost(page.relatedPost);

  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
          <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(28,35%,72%,0.12)] blur-[120px]" />
          <div className="container relative mx-auto max-w-3xl px-4">
            <nav
              aria-label="Breadcrumb"
              className="text-sm text-muted-foreground"
            >
              <a
                href="/"
                className="transition-colors hover:text-[hsl(28,40%,76%)]"
              >
                Home
              </a>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground">{page.name}</span>
            </nav>
            <h1
              className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={heading}
            >
              {page.heading}
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] font-semibold text-[hsl(0,0%,10%)] hover:opacity-90"
            >
              <a href="/#audit">
                <Calendar className="mr-2 h-4 w-4" />
                Book Your System Audit
              </a>
            </Button>
          </div>
        </section>

        <ComparisonSection comparison={page.table} />

        {page.sections.map((section) => (
          <section
            key={section.heading}
            className="container mx-auto max-w-3xl px-4 pb-14"
          >
            <h2 className="text-3xl font-bold tracking-tight" style={heading}>
              {section.heading}
            </h2>
            {section.bullets && (
              <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground marker:text-[hsl(28,40%,76%)] [&_a]:text-[hsl(28,40%,76%)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground">
                {section.bullets.map((b) => (
                  <li key={b} dangerouslySetInnerHTML={inline(b)} />
                ))}
              </ul>
            )}
            {section.paragraphs && (
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground [&_a]:text-[hsl(28,40%,76%)] [&_a]:underline [&_a]:underline-offset-2">
                {section.paragraphs.map((p) => (
                  <p key={p} dangerouslySetInnerHTML={inline(p)} />
                ))}
              </div>
            )}
          </section>
        ))}

        <section className="container mx-auto max-w-3xl px-4 pb-16">
          <h2 className="text-3xl font-bold tracking-tight" style={heading}>
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6">
            {page.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-6"
              >
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {(solution || related) && (
          <section className="container mx-auto max-w-3xl px-4 pb-20 text-center text-muted-foreground">
            Further reading:{" "}
            {solution && (
              <Link
                to={solutionPath(solution)}
                className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
              >
                {solution.heading}
              </Link>
            )}
            {solution && related && " · "}
            {related && (
              <Link
                to={postPath(related)}
                className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
              >
                {related.title}
              </Link>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
