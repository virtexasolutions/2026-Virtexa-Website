import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const SITE_URL = "https://virtexasolutions.com";
const PAGE_URL = `${SITE_URL}/founders`;
const PAGE_TITLE = "Our Founders | Virtexa Solutions";
const PAGE_DESCRIPTION =
  "Meet Rikki Carodine, founder, and Diamond Carter, co-founder, of Virtexa Solutions, building AI voice agents and automation systems for real estate teams and small businesses.";

type Founder = {
  name: string;
  initials: string;
  title: string;
  tagline?: string;
  linkedin: string;
  bio: string[];
};

const founders: Founder[] = [
  {
    name: "Rikki Carodine",
    initials: "RC",
    title: "Founder & Fractional COO",
    tagline: "AI Systems Architect",
    linkedin: "https://www.linkedin.com/in/rikki-carodine",
    bio: [
      "Rikki Carodine is the founder and Fractional COO of Virtexa Solutions, where Rikki architects the AI systems that help real estate teams and small businesses respond to every lead, work their databases, and scale without adding headcount.",
      "Rikki has been building in the digital space since 2017, across web design, digital marketing, automation, and brand storytelling. Certified in digital marketing and UX design, Rikki brings together the operational thinking of a COO, the technical depth of a systems architect, and a designer's understanding of how people actually experience technology.",
      "That perspective shapes how Virtexa works. Rikki believes the best digital experiences happen where strategy, psychology, and creativity meet authenticity, so every Virtexa system is designed around the people who use it and the clients it serves, not just the software behind it.",
    ],
  },
  {
    name: "Diamond Carter",
    initials: "DC",
    title: "Co-Founder",
    tagline: "Realtor · Hampton Roads & Augusta",
    linkedin: "https://www.linkedin.com/in/realtordiamondcarter/",
    bio: [
      "Diamond Carter is the co-founder of Virtexa Solutions and a practicing Realtor specializing in luxury homes, military relocation, and investment properties across Hampton Roads and Augusta.",
      "Diamond's approach is thoughtful, polished, and relationship-driven, with a strong emphasis on communication, discretion, and strategic guidance at every stage of a transaction. Georgia-rooted and Coastal Virginia-focused, and the child of two Army veterans, Diamond brings a personal understanding of the transitions military and civilian families face when relocating, investing, or stepping into a new season of life.",
      "That frontline experience is why Virtexa's systems work in the real world. Diamond knows firsthand what a missed call, a slow follow-up, or a cold database costs an agent, and makes sure every Virtexa AI voice agent reflects the care, responsiveness, and professionalism clients expect from a trusted Realtor.",
    ],
  },
];

const trustPoints = [
  {
    title: "For agents, by agents",
    text: "Co-founded by a practicing Realtor, so our systems are built around how real estate actually works: lead response, follow-up, and client relationships.",
  },
  {
    title: "Building since 2017",
    text: "Nearly a decade of hands-on work in web design, marketing, and automation, long before AI became a trend.",
  },
  {
    title: "Operators, not just technologists",
    text: "A Fractional COO mindset means every system is tied to real business outcomes: more conversations, more appointments, less busywork.",
  },
  {
    title: "Human-centered by design",
    text: "A background in UX design and marketing means AI that sounds and feels human, and protects the brand you have built.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: PAGE_TITLE,
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  mainEntity: {
    "@type": "Organization",
    name: "Virtexa Solutions",
    url: SITE_URL,
    founder: founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.tagline ? `${f.title}, ${f.tagline}` : f.title,
      sameAs: [f.linkedin],
      worksFor: { "@type": "Organization", name: "Virtexa Solutions" },
    })),
  },
};

function setMeta(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  const previous = el?.getAttribute(attr === "href" ? "href" : "content");
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    const [name, keyValue] = key.split("=");
    el.setAttribute(name, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return () => {
    if (previous != null) el!.setAttribute(attr, previous);
  };
}

function usePageSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const restores = [
      setMeta(
        'meta[name="description"]',
        "content",
        "name=description",
        PAGE_DESCRIPTION,
      ),
      setMeta('link[rel="canonical"]', "href", "rel=canonical", PAGE_URL),
      setMeta(
        'meta[property="og:title"]',
        "content",
        "property=og:title",
        PAGE_TITLE,
      ),
      setMeta(
        'meta[property="og:description"]',
        "content",
        "property=og:description",
        PAGE_DESCRIPTION,
      ),
      setMeta(
        'meta[property="og:url"]',
        "content",
        "property=og:url",
        PAGE_URL,
      ),
      setMeta(
        'meta[name="twitter:title"]',
        "content",
        "name=twitter:title",
        PAGE_TITLE,
      ),
      setMeta(
        'meta[name="twitter:description"]',
        "content",
        "name=twitter:description",
        PAGE_DESCRIPTION,
      ),
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      script.remove();
    };
  }, []);
}

export default function Founders() {
  usePageSeo();

  return (
    <div className="relative min-h-screen bg-background">
      <header className="container mx-auto px-4 py-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Virtexa
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-[hsl(28,40%,76%)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24">
          <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(28,35%,72%,0.12)] blur-[120px]" />
          <div className="container relative mx-auto px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
              Our Founders
            </p>
            <h1
              className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The people behind <span className="gradient-text">Virtexa</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Virtexa Solutions builds AI voice agents and automation systems
              for real estate teams and small businesses. Here is who is
              building them, and why you can trust the work.
            </p>
          </div>
        </section>

        <section className="container mx-auto grid max-w-5xl gap-6 px-4 pb-16">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="rounded-3xl border border-[hsl(21,38%,64%,0.2)] bg-[hsl(0,0%,7%,0.6)] p-6 backdrop-blur-xl sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div
                  aria-hidden="true"
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-2xl font-bold text-[hsl(0,0%,10%)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {founder.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-2xl font-bold tracking-tight sm:text-3xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {founder.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[hsl(28,40%,76%)]">
                    {founder.title}
                    {founder.tagline && (
                      <span className="text-muted-foreground">
                        {" "}
                        · {founder.tagline}
                      </span>
                    )}
                  </p>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                    {founder.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[hsl(21,38%,64%,0.3)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[hsl(28,40%,76%)] hover:text-[hsl(28,40%,76%)]"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect with {founder.name.split(" ")[0]} on LinkedIn
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="container mx-auto max-w-5xl px-4 pb-20">
          <h2
            className="text-center text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why teams trust Virtexa
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(0,0%,7%,0.6)] p-6"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] font-semibold text-[hsl(0,0%,10%)] hover:opacity-90"
            >
              <a href="/#audit">
                <Calendar className="mr-2 h-4 w-4" />
                Book Your 30-Minute System Audit
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
