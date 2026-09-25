import { motion } from "framer-motion";
import { Phone, Database, Building2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const teams = [
  {
    icon: Phone,
    title: "24/7 Speed-to-Lead Voice AI",
    text: "Human-like conversational voice agents answer missed sign calls, portal inquiries, and web forms instantly—qualifying buyers or sellers and booking showings directly onto your calendar.",
  },
  {
    icon: Database,
    title: "Database Reactivation Engine",
    text: "Automated SMS and email follow-up sequences re-engage the cold and past leads already sitting in your CRM, and book interested contacts directly onto your calendar.",
  },
];

const brokerages = [
  {
    icon: Phone,
    title: "Brokerage Front-Desk Voice Concierge",
    text: "An AI receptionist answers every office call 24/7, captures caller details into your CRM, books appointments, and warm-transfers hot leads to the right agent in real time.",
  },
  {
    icon: Layers,
    title: "White-Labeled Real Estate Platform",
    text: "Deliver a fully branded tech ecosystem to your rostered agents as a high-value perk that helps attract and retain agents.",
  },
];

export default function OfferEcosystem() {
  return (
    <section id="solutions" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            Core Offer Ecosystem
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Virtexa Architecture Selector
          </h2>
          <p className="mt-4 text-muted-foreground">
            Toggle between the two deployment tracks to explore the
            infrastructure built for your scale.
          </p>
        </div>

        <Tabs defaultValue="teams" className="mt-12">
          <div className="flex justify-center">
            <TabsList className="glass rounded-xl p-1.5">
              <TabsTrigger
                value="teams"
                className="rounded-lg px-6 py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(21,38%,64%)] data-[state=active]:to-[hsl(28,35%,72%)] data-[state=active]:text-[hsl(0,0%,10%)]"
              >
                Top Producers & Teams
              </TabsTrigger>
              <TabsTrigger
                value="brokerages"
                className="rounded-lg px-6 py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(21,38%,64%)] data-[state=active]:to-[hsl(28,35%,72%)] data-[state=active]:text-[hsl(0,0%,10%)]"
              >
                Brokerages & Franchises
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="teams">
            <div className="mt-8">
              <OfferCard
                tier="Tier 1"
                subtitle="For Top Producers & Teams — Production Acceleration"
                items={teams}
              />
            </div>
          </TabsContent>
          <TabsContent value="brokerages">
            <div className="mt-8">
              <OfferCard
                tier="Tier 2"
                subtitle="For Brokerages & Franchises — Scalable Growth & Retention"
                items={brokerages}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function OfferCard({
  tier,
  subtitle,
  items,
}: {
  tier: string;
  subtitle: string;
  items: { icon: React.ElementType; title: string; text: string }[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-full bg-[hsl(21,38%,64%,0.15)] px-3 py-1 text-xs font-bold text-[hsl(28,40%,76%)]">
          {tier}
        </span>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div
        className={cn(
          "grid gap-5",
          items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] p-6 transition-all hover:border-[hsl(21,38%,64%,0.4)] hover:glow-soft"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(21,38%,64%,0.18)] to-[hsl(28,35%,72%,0.18)] transition-transform group-hover:scale-110">
              <item.icon className="h-6 w-6 text-[hsl(28,40%,76%)]" />
            </div>
            <h3
              className="mb-2 text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
