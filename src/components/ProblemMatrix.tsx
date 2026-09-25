import { motion } from "framer-motion";
import { Clock, Database, PhoneMissed, X, Zap } from "lucide-react";

const oldWay = [
  "15+ minute response delay to Zillow",
  "Cold CRM leads sitting untouched",
  "Office calls rolling to voicemail",
  "$4k/mo offshore VAs requiring management",
];

const virtexaWay = [
  "Instant 5-second AI voice callback",
  "Automated database reactivation",
  "24/7 AI front-desk concierge",
  "Zero-management custom Virtexa OS",
];

const problems = [
  {
    icon: Clock,
    title: "Speed-to-Lead Decay",
    text: "Over 78% of real estate buyers and sellers sign with the first agent who speaks to them. A 10-minute delay in answering a yard sign or Zillow inquiry drops conversion rates by 800%.",
  },
  {
    icon: Database,
    title: "Dead CRM Equity",
    text: "Your database is filled with thousands of leads collected over years. Without consistent, personalized multi-channel follow-up, your single largest asset decays while competitors poach your sphere.",
  },
  {
    icon: PhoneMissed,
    title: "The Voicemail Leak",
    text: "Calls that hit voicemail after hours, on weekends, or while you're with a client rarely call back. Without someone answering every line, ready-to-move buyers and sellers simply call the next agent.",
  },
];

export default function ProblemMatrix() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            The Invisible Revenue Leak
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Traditional Real Estate Systems Are Failing High Producers
          </h2>
        </div>

        {/* VS comparison */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[hsl(0,40%,35%,0.3)] bg-[hsl(0,30%,12%,0.2)] p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(0,40%,35%,0.2)]">
                <X className="h-4 w-4 text-[hsl(0,60%,65%)]" />
              </div>
              <h3 className="font-semibold text-[hsl(0,50%,72%)]">
                Old Way: Manual & Fragmented
              </h3>
            </div>
            <ul className="space-y-3">
              {oldWay.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(0,55%,60%)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS divider */}
          <div className="flex items-center justify-center">
            <div className="rounded-full glass-strong px-4 py-2 text-sm font-bold gradient-text">
              VS
            </div>
          </div>

          {/* Virtexa way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-border p-6 glow-soft"
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(21,38%,64%,0.2)]">
                <Zap className="h-4 w-4 text-[hsl(28,40%,76%)]" />
              </div>
              <h3 className="font-semibold gradient-text">
                Virtexa Way: Autonomous & Scalable
              </h3>
            </div>
            <ul className="space-y-3">
              {virtexaWay.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(28,40%,76%)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Problem cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] p-6 transition-colors hover:border-[hsl(21,38%,64%,0.3)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(21,38%,64%,0.15)] to-[hsl(28,35%,72%,0.15)]">
                <problem.icon className="h-5 w-5 text-[hsl(28,40%,76%)]" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">
                  0{i + 1}
                </span>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {problem.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
