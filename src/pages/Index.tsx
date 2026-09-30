import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProblemMatrix from "@/components/ProblemMatrix";
import OfferEcosystem from "@/components/OfferEcosystem";
import ComparisonTable from "@/components/ComparisonTable";
import AudioDemo from "@/components/AudioDemo";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { faqs } from "@/lib/faqs";
import { solutionPath, solutions } from "@/lib/solutions";
import { ORGANIZATION_ID, SITE_URL, usePageSeo } from "@/lib/usePageSeo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Virtexa Solutions",
      url: `${SITE_URL}/`,
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "Service",
      name: "AI Voice Agent for Real Estate",
      serviceType: "AI voice agent and answering service",
      description:
        "A dedicated AI voice agent that answers every call 24/7, qualifies and books leads, texts back missed calls, and warm-transfers hot leads for real estate agents, teams, and brokerages.",
      url: `${SITE_URL}/`,
      provider: { "@id": ORGANIZATION_ID },
      audience: {
        "@type": "BusinessAudience",
        name: "Real estate agents, teams, and brokerages",
      },
      areaServed: { "@type": "Country", name: "United States" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Virtexa solutions",
        itemListElement: solutions.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.heading,
            url: `${SITE_URL}${solutionPath(s)}`,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

const Index = () => {
  // Keep in sync with the defaults in index.html.
  usePageSeo({
    title: "AI Voice Agent & Answering Service for Real Estate Agents | Virtexa",
    description:
      "Virtexa builds and runs dedicated AI voice agents for real estate agents, teams, and brokerages. Answer every call 24/7, qualify and book leads on the spot, text back missed calls instantly, and warm-transfer hot leads.",
    path: "/",
    structuredData,
  });

  useEffect(() => {
    if (window.location.hash) {
      document
        .querySelector(window.location.hash)
        ?.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <ProblemMatrix />
        <OfferEcosystem />
        <ComparisonTable />
        <AudioDemo />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
