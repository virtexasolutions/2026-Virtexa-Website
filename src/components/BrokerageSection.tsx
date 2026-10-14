import { motion } from "framer-motion";
import { Building2, MapPin, PhoneCall, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const points = [
  {
    icon: UserCheck,
    title: "Asks for an agent? Straight to them.",
    text: "Callers who ask for an agent by name are warm-transferred to that agent's cell, and the agent is briefed before they pick up.",
  },
  {
    icon: MapPin,
    title: "Calls about a property? To the listing agent.",
    text: "Mention an address and the receptionist matches it to your office's listings and connects the caller to the right agent.",
  },
  {
    icon: Users,
    title: "One view of the whole office.",
    text: "Every agent gets their own AI line and portal. You see every agent, every listing, and every routed call from one brokerage login.",
  },
];

// A short, looping routing log so visitors can watch calls get routed.
const routed = [
  { caller: "Luis M.", ask: "Asked about 11204 Ridgeline Pass", to: "Daniel O.", reason: "listing agent" },
  { caller: "Victoria C.", ask: "Asked for Priya by name", to: "Priya N.", reason: "requested agent" },
  { caller: "Marcus B.", ask: "Asked about 42 Westlake Summit Ct", to: "Maya B.", reason: "listing agent" },
  { caller: "Ellen R.", ask: "Wants to sell, no agent yet", to: "Jordan T.", reason: "best fit" },
];

function RoutingLog() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= routed.length ? 1 : c + 1)), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,10%)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(150,40%,50%)] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(150,40%,50%)]" />
          </span>
          <span className="text-xs font-semibold text-foreground">AI Receptionist · Live routing</span>
        </div>
        <span className="text-[11px] text-muted-foreground">Main office line</span>
      </div>
      <ul className="space-y-2.5">
        {routed.map((r, i) => (
          <motion.li
            key={r.caller}
            initial={false}
            animate={{ opacity: i < count ? 1 : 0.15, y: i < count ? 0 : 6 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5",
              i === count - 1 ? "border-[hsl(21,38%,64%,0.4)] bg-[hsl(21,38%,64%,0.06)]" : "border-[hsl(30,10%,18%)]",
            )}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{r.caller}</p>
              <p className="truncate text-xs text-muted-foreground">{r.ask}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="flex items-center justify-end gap-1 text-xs font-semibold text-[hsl(150,40%,58%)]">
                <PhoneCall className="h-3 w-3" /> {r.to}
              </p>
              <p className="text-[11px] text-muted-foreground">{r.reason}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function BrokerageSection() {
  return (
    <section id="brokerages" className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
              <Building2 className="h-4 w-4" /> For Teams & Brokerages
            </p>
            <h2
              className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              An AI Front Desk That Sends Every Caller to the{" "}
              <span className="gradient-text">Right Agent</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your main line gets its own AI receptionist, and every agent gets a
              dedicated AI agent of their own. No more calls bouncing around the
              office or dying in a general voicemail box.
            </p>

            <div className="mt-8 space-y-5">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(21,38%,64%,0.18)] to-[hsl(28,35%,72%,0.18)]">
                    <p.icon className="h-5 w-5 text-[hsl(28,40%,76%)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[2.5rem] bg-[hsl(21,38%,64%,0.1)] blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[hsl(30,10%,24%)] shadow-2xl">
              <img
                src="/product/brokerage-receptionist.webp"
                alt="Brokerage portal showing the AI receptionist and calls routed to agents"
                width={1600}
                height={1000}
                loading="lazy"
                className="w-full"
              />
            </div>
            <div className="relative -mt-16 ml-auto w-[92%] sm:-mt-24 sm:w-[78%]">
              <RoutingLog />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
