import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/SubpageHeader";
import { crmConnections, INTEGRATIONS_PATH } from "@/lib/integrations";
import { ORGANIZATION_ID, SITE_URL, usePageSeo } from "@/lib/usePageSeo";

const TITLE = "CRM Integrations for Your AI Voice Agent | Virtexa";
const DESCRIPTION =
  "Virtexa sends every call to Follow Up Boss, HubSpot, or GoHighLevel directly, and to almost any other real estate CRM through Zapier, Make, or a webhook.";

const heading = { fontFamily: "'Playfair Display', serif" };

export default function Integrations() {
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "CRM integrations",
          description: DESCRIPTION,
          url: `${SITE_URL}${INTEGRATIONS_PATH}`,
          publisher: { "@id": ORGANIZATION_ID },
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
          ],
        },
      ],
    }),
    [],
  );
  usePageSeo({
    title: TITLE,
    description: DESCRIPTION,
    path: INTEGRATIONS_PATH,
    structuredData,
  });

  return (
    <div className="relative min-h-screen bg-background">
      <SubpageHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
          <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(28,35%,72%,0.12)] blur-[120px]" />
          <div className="container relative mx-auto max-w-3xl px-4">
            <h1
              className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={heading}
            >
              CRM Integrations
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Every call your Virtexa AI voice agent answers ends up in your
                CRM: the caller's name and number, a summary of the call, their
                timeline, budget, and financing, a lead score, and any showing
                they booked. Nobody has to type anything up.
              </p>
              <p>
                Each agent picks the CRM their leads go to, and our team
                connects it as part of your build.
              </p>
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

        <section className="container mx-auto max-w-5xl px-4 pb-20">
          <ul className="grid gap-5 sm:grid-cols-2">
            {crmConnections.map((crm) => (
              <li
                key={crm.name}
                className="flex flex-col rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-6"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {crm.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {crm.text}
                </p>
                {crm.page && (
                  <Link
                    to={`${INTEGRATIONS_PATH}/${crm.page}`}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(28,40%,76%)] hover:text-foreground"
                  >
                    How it works with {crm.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
