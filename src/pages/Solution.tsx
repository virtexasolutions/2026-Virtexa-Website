import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import { getPost, postPath } from "@/lib/blog";
import {
  getSolution,
  solutionPath,
  solutions,
  type Solution as SolutionData,
} from "@/lib/solutions";
import { ORGANIZATION_ID, SITE_URL, usePageSeo } from "@/lib/usePageSeo";
import NotFound from "./NotFound";

export default function Solution() {
  const { slug } = useParams();
  const solution = getSolution(slug);
  return solution ? <SolutionPage solution={solution} /> : <NotFound />;
}

function structuredDataFor(solution: SolutionData) {
  const url = `${SITE_URL}${solutionPath(solution)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: solution.heading,
        description: solution.description,
        url,
        serviceType: solution.name,
        audience: {
          "@type": "BusinessAudience",
          name: "Real estate agents, teams, and brokerages",
        },
        areaServed: { "@type": "Country", name: "United States" },
        provider: {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: "Virtexa Solutions",
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: solution.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: `${SITE_URL}/#solutions`,
          },
          { "@type": "ListItem", position: 3, name: solution.name, item: url },
        ],
      },
    ],
  };
}

const heading = { fontFamily: "'Playfair Display', serif" };

function SolutionPage({ solution }: { solution: SolutionData }) {
  const structuredData = useMemo(() => structuredDataFor(solution), [solution]);
  usePageSeo({
    title: solution.metaTitle,
    description: solution.description,
    path: solutionPath(solution),
    structuredData,
  });

  const related = getPost(solution.relatedPost);
  const others = solutions.filter((s) => s.slug !== solution.slug);

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
                href="/#solutions"
                className="transition-colors hover:text-[hsl(28,40%,76%)]"
              >
                Solutions
              </a>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground">{solution.name}</span>
            </nav>
            <h1
              className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={heading}
            >
              {solution.heading}
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {solution.intro.map((p, i) => (
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

        <section className="container mx-auto max-w-5xl px-4 pb-16">
          <h2
            className="text-center text-3xl font-bold tracking-tight"
            style={heading}
          >
            What you get
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {solution.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-6"
              >
                <h3 className="flex items-start gap-2.5 text-lg font-semibold text-foreground">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[hsl(28,40%,76%)]" />
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {solution.comparison && (
          <ComparisonSection comparison={solution.comparison} />
        )}

        <section className="container mx-auto max-w-3xl px-4 pb-16">
          <h2 className="text-3xl font-bold tracking-tight" style={heading}>
            How it works
          </h2>
          <ol className="mt-8 space-y-6">
            {solution.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] font-bold text-[hsl(0,0%,10%)]"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="container mx-auto max-w-3xl px-4 pb-16">
          <h2 className="text-3xl font-bold tracking-tight" style={heading}>
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6">
            {solution.faqs.map((faq) => (
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

        <section className="container mx-auto max-w-5xl px-4 pb-20">
          {related && (
            <p className="text-center text-muted-foreground">
              Further reading:{" "}
              <Link
                to={postPath(related)}
                className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
              >
                {related.title}
              </Link>
            </p>
          )}
          <h2
            className="mt-12 text-center text-2xl font-bold tracking-tight"
            style={heading}
          >
            More Virtexa solutions
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to={solutionPath(s)}
                  className="group flex h-full items-center justify-between gap-2 rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-5 font-semibold text-foreground transition-colors hover:border-[hsl(28,40%,76%,0.5)]"
                >
                  {s.name}
                  <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(28,40%,76%)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ComparisonSection({
  comparison,
}: {
  comparison: NonNullable<SolutionData["comparison"]>;
}) {
  return (
    <section className="container mx-auto max-w-5xl px-4 pb-16">
      <h2
        className="text-center text-3xl font-bold tracking-tight"
        style={heading}
      >
        {comparison.heading}
      </h2>
      {comparison.intro && (
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {comparison.intro}
        </p>
      )}

      <div className="mt-10 overflow-hidden rounded-2xl border border-[hsl(30,10%,22%)]">
        {/* Desktop table */}
        <table className="hidden w-full md:table">
          <thead>
            <tr className="border-b border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)]">
              <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                <span className="sr-only">Compare</span>
              </th>
              <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                {comparison.them}
              </th>
              <th className="bg-gradient-to-b from-[hsl(21,38%,64%,0.12)] to-transparent p-5 text-left text-sm font-bold gradient-text">
                Virtexa
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-[hsl(30,10%,22%)] last:border-0"
              >
                <th
                  scope="row"
                  className="p-5 text-left text-sm font-semibold text-foreground"
                >
                  {row.label}
                </th>
                <td className="p-5 text-sm text-muted-foreground">
                  {row.them}
                </td>
                <td className="bg-[hsl(21,38%,64%,0.05)] p-5 text-sm text-foreground">
                  <span className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(28,40%,76%)]" />
                    {row.us}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <dl className="divide-y divide-[hsl(30,10%,22%)] md:hidden">
          {comparison.rows.map((row) => (
            <div key={row.label} className="p-5">
              <dt className="font-semibold text-foreground">{row.label}</dt>
              <dd className="mt-3 text-sm text-muted-foreground">
                <span className="block text-xs font-semibold uppercase tracking-wider">
                  {comparison.them}
                </span>
                {row.them}
              </dd>
              <dd className="mt-3 text-sm text-foreground">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
                  Virtexa
                </span>
                {row.us}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {comparison.note && (
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          {comparison.note}
        </p>
      )}
    </section>
  );
}
