import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  bestFor: string;
  popular?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Solo Agent",
    bestFor:
      "For a single agent or a small team getting their first line covered.",
    features: [
      "1 dedicated voice agent",
      "Full CRM & automation build",
      "Monthly performance report",
    ],
  },
  {
    name: "Team",
    bestFor: "For teams and offices running 2–4 agents on shared lines.",
    popular: true,
    features: [
      "Everything in Solo, per agent",
      "Shared team reporting dashboard",
      "Priority build turnaround",
      "Coordinated multi-line rollout",
    ],
  },
  {
    name: "Brokerage",
    bestFor: "For brokerages and multi-office operations running 5+ agents.",
    features: [
      "Everything in Team, per agent",
      "Dedicated onboarding specialist",
      "Scheduled multi-office rollout",
      "Dedicated success manager",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            Plans
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pick the Plan That Fits Your Business
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every plan includes all six core features. Pricing is custom-quoted
            after your System Audit.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                "relative flex flex-col rounded-2xl p-6",
                tier.popular
                  ? "gradient-border glow-soft"
                  : "border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)]",
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] px-3 py-1 text-xs font-bold text-[hsl(0,0%,10%)]">
                  Most Common
                </div>
              )}

              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {tier.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tier.bestFor}
              </p>

              <div className="mt-5">
                <p className="text-sm text-muted-foreground">
                  Custom pricing tailored to your operation.
                </p>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.features.map((feature, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(28,40%,76%)]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  document
                    .querySelector("#audit")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={cn(
                  "mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition-all",
                  tier.popular
                    ? "bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] hover:opacity-90"
                    : "border border-[hsl(30,12%,28%)] bg-white/5 text-foreground hover:bg-white/10",
                )}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 text-[hsl(28,40%,76%)]" />
          Custom scripting, testing, and CRM setup included with every plan.
        </p>
      </div>
    </section>
  );
}
