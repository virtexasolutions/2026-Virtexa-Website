import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnswerBox from "@/components/AnswerBox";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import {
  getIntegration,
  integrationPath,
  INTEGRATIONS_PATH,
  type Integration as IntegrationData,
} from "@/lib/integrations";
import { getSolution, solutionPath } from "@/lib/solutions";
import { ORGANIZATION_ID, SITE_URL, usePageSeo } from "@/lib/usePageSeo";
import NotFound from "./NotFound";

export default function Integration() {
  const { slug } = useParams();
  const integration = getIntegration(slug);
  return integration ? (
    <IntegrationPage integration={integration} />
  ) : (
    <NotFound />
  );
}

function structuredDataFor(integration: IntegrationData) {
  const url = `${SITE_URL}${integrationPath(integration)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: integration.heading,
        description: integration.description,
        url,
        serviceType: `${integration.name} integration`,
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
        mainEntity: integration.faqs.map((faq) => ({
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
            name: "Integrations",
            item: `${SITE_URL}${INTEGRATIONS_PATH}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: integration.name,
            item: url,
          },
        ],
      },
    ],
  };
}

const heading = { fontFamily: "'Playfair Display', serif" };

function IntegrationPage({ integration }: { integration: IntegrationData }) {
  const structuredData = useMemo(
    () => structuredDataFor(integration),
    [integration],
  );
  usePageSeo({
    title: integration.metaTitle,
    description: integration.description,
    path: integrationPath(integration),
    structuredData,
  });

  const solution = getSolution(integration.relatedSolution);
  const { example } = integration;

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
              <Link
                to={INTEGRATIONS_PATH}
                className="transition-colors hover:text-[hsl(28,40%,76%)]"
              >
                Integrations
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground">{integration.name}</span>
            </nav>
            <h1
              className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={heading}
            >
              {integration.heading}
            </h1>
            <div className="mt-6">
              <AnswerBox summary={integration.summary} />
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {integration.intro.map((p, i) => (
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
            How it works with {integration.name}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {integration.features.map((feature) => (
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

        <section className="container mx-auto max-w-3xl px-4 pb-16">
          <h2 className="text-3xl font-bold tracking-tight" style={heading}>
            {example.heading}
          </h2>
          <p className="mt-4 text-muted-foreground">{example.intro}</p>
          <figure className="mt-6 overflow-hidden rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)]">
            <pre className="overflow-x-auto whitespace-pre-wrap p-6 font-mono text-sm leading-relaxed text-foreground">
              {example.lines.join("\n")}
            </pre>
            <figcaption className="border-t border-[hsl(30,10%,22%)] px-6 py-3 text-xs text-muted-foreground">
              {example.note}
            </figcaption>
          </figure>
        </section>

        <section className="container mx-auto max-w-3xl px-4 pb-16">
          <h2 className="text-3xl font-bold tracking-tight" style={heading}>
            Getting connected
          </h2>
          <ol className="mt-8 space-y-6">
            {integration.steps.map((step, i) => (
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
            {integration.faqs.map((faq) => (
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

        <section className="container mx-auto max-w-3xl px-4 pb-20 text-center text-muted-foreground">
          {solution && (
            <>
              Further reading:{" "}
              <Link
                to={solutionPath(solution)}
                className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
              >
                {solution.heading}
              </Link>
              {" · "}
            </>
          )}
          <Link
            to={INTEGRATIONS_PATH}
            className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
          >
            All CRM integrations
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
