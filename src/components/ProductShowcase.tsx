import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, FileAudio, Home, Inbox, type LucideIcon } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  alt: string;
};

const features: Feature[] = [
  {
    icon: FileAudio,
    title: "Every call, recorded and transcribed",
    text: "Listen to any call, read the full transcript, and see the AI's summary, intent score, and next step, all in one place.",
    image: "/product/call-detail.webp",
    alt: "Call detail with recording player, AI summary, intent score and booked showing",
  },
  {
    icon: CalendarCheck,
    title: "Showings on the calendar you already use",
    text: "Connect Google or Outlook once. The AI only offers times you're free and books straight into your calendar.",
    image: "/product/showings-calendar.webp",
    alt: "Upcoming showings booked by the AI, each marked as in the agent's calendar",
  },
  {
    icon: Inbox,
    title: "Leads delivered to your CRM",
    text: "Each caller's contact, summary, and booked showing land in your CRM automatically. See every delivery at a glance.",
    image: "/product/leads.webp",
    alt: "Leads page showing each caller sent to Follow Up Boss",
  },
  {
    icon: Home,
    title: "An agent that knows your listings",
    text: "Your listings are loaded for you, so callers get real answers on price, beds, baths, and details, not \"let me get back to you.\"",
    image: "/product/listings.webp",
    alt: "Listings the AI uses to answer property questions",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % features.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="product" className="relative overflow-x-clip">
      <div className="absolute inset-x-0 top-1/4 h-[600px] bg-gradient-glow opacity-60" />

      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
              Your Virtexa Portal
            </p>
            <h2
              className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[56px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              See Every Call. <span className="gradient-text">Every Lead. Every Showing.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Your own login shows exactly what your AI agent did today: who
              called, what they wanted, and what got booked.
            </p>
          </div>
        }
      >
        <img
          src="/product/agent-dashboard.webp"
          alt="Virtexa agent dashboard with call recordings, showings booked and CRM sync"
          width={1600}
          height={1000}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-left-top"
        />
      </ContainerScroll>

      {/* Feature switcher */}
      <div className="container relative mx-auto -mt-16 px-4 pb-20 md:-mt-24 lg:pb-28">
        <div
          className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
          onMouseLeave={() => setPaused(false)}
        >
          <div className="space-y-3">
            {features.map((f, i) => (
              <button
                key={f.title}
                type="button"
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onFocus={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onClick={() => setActive(i)}
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                  active === i
                    ? "border-[hsl(21,38%,64%,0.45)] bg-[hsl(30,12%,14%)] glow-soft"
                    : "border-[hsl(30,10%,20%)] bg-[hsl(30,12%,10%,0.5)] hover:border-[hsl(21,38%,64%,0.25)]",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      active === i
                        ? "bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)]"
                        : "bg-[hsl(21,38%,64%,0.12)] text-[hsl(28,40%,76%)]",
                    )}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </div>
                {active === i && !paused && (
                  <motion.span
                    key={`p-${active}`}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[hsl(21,38%,64%,0.12)] blur-3xl" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[hsl(30,10%,24%)] bg-[hsl(0,0%,10%)] shadow-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={features[active].image}
                  src={features[active].image}
                  alt={features[active].alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.04, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
