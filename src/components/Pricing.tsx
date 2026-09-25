import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  buildFee: string;
  monthly: string;
  annual: string;
  bestFor: string;
  popular?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Solo Producer",
    buildFee: "$3,500",
    monthly: "$750",
    annual: "$9,500",
    bestFor: "Solo Agents",
    features: [
      "Single AI Voice Agent",
      "24/7 Speed-to-Lead",
      "Core CRM Integration",
      "Pass-Through Telephony",
    ],
  },
  {
    name: "Team Pro",
    buildFee: "$5,000",
    monthly: "$1,500",
    annual: "$18,000",
    bestFor: "Teams (2–5)",
    popular: true,
    features: [
      "Up to 3 AI Voice Seats",
      "Database Reactivation Engine",
      "Custom Lead Flow Routing",
      "Full Pipeline Automation",
    ],
  },
  {
    name: "Team Enterprise",
    buildFee: "$10,000",
    monthly: "$2,800",
    annual: "$34,000",
    bestFor: "Teams (6–15)",
    features: [
      "Multi-Agent Voice Routing (6–15)",
      "Advanced CRM Synchronization",
      "Listing-to-Social Automation",
      "Priority Support",
    ],
  },
  {
    name: "Brokerage Core",
    buildFee: "$15,000",
    monthly: "$4,500",
    annual: "$55,000",
    bestFor: "Single Office",
    popular: true,
    features: [
      "Front-Desk Voice Concierge",
      "AI Recruiting Engine",
      "Up to 15 Agent Sub-Accounts",
      "Custom MLS Knowledge Base",
    ],
  },
  {
    name: "Brokerage Enterprise",
    buildFee: "$30,000 / loc",
    monthly: "$8,500+ / loc",
    annual: "$105,000+ / loc",
    bestFor: "Multi-Office",
    features: [
      "Multi-Office / Franchise Architecture",
      "Dedicated API Integrations",
      "TC Document Tracking",
      "White-Labeled Platform",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            Investment & Partnership Tiers
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Virtexa Enterprise Investment Matrix
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose the architecture built for your scale. Custom pricing
            tailored to your needs.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                  Most Popular
                </div>
              )}

              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {tier.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
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
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(28,40%,76%)]" />
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
          All plans include dedicated onboarding & custom architecture.
        </p>
      </div>
    </section>
  );
}
