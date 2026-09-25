import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const scenarios = [
  {
    id: 1,
    title: "Zillow Buyer Lead Speed-to-Lead Qualification",
    duration: "0:20",
    transcript: [
      {
        speaker: "AI",
        text: "Hi, this is Alex with the Maple Street listing team. I saw your inquiry on Zillow — are you looking to buy or sell?",
      },
      {
        speaker: "Lead",
        text: "Looking to buy, actually. Is the home still available?",
      },
      {
        speaker: "AI",
        text: "It is! It's listed at $485K. Are you pre-qualified with a lender? I can book you a showing this week.",
      },
    ],
  },
  {
    id: 2,
    title: "After-Hours Seller Inquiry Call",
    duration: "0:20",
    transcript: [
      {
        speaker: "Caller",
        text: "Hi, I saw your sign on Maple Street. I'm thinking about selling my place nearby. Is anyone available?",
      },
      {
        speaker: "AI",
        text: "Absolutely, thanks for calling! When are you hoping to list, and is the home in the same neighborhood?",
      },
      {
        speaker: "Caller",
        text: "Probably this spring. It's a few blocks over.",
      },
      {
        speaker: "AI",
        text: "Perfect. I can book you a free listing consultation. Does Thursday at 4 PM work?",
      },
    ],
  },
  {
    id: 3,
    title: "Brokerage Front-Desk Concierge Call",
    duration: "0:20",
    transcript: [
      {
        speaker: "AI",
        text: "Thank you for calling Premier Realty. How can I help you today?",
      },
      {
        speaker: "Caller",
        text: "I'm pre-approved and want to see the house on Oak Lane this weekend.",
      },
      {
        speaker: "AI",
        text: "Great! Let me grab your name and number, then I'll connect you with the listing agent right now.",
      },
    ],
  },
];

export default function AudioDemo() {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active !== null) {
      setProgress(0);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setActive(null);
            return 0;
          }
          return p + 100 / 40; // ~20s
        });
      }, 500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const toggle = (id: number) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const activeScenario = scenarios.find((s) => s.id === active);
  const activeLineIndex = activeScenario
    ? Math.min(
        Math.floor((progress / 100) * activeScenario.transcript.length),
        activeScenario.transcript.length - 1,
      )
    : 0;

  return (
    <section id="audio-demo" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(21,38%,64%,0.18)] to-[hsl(28,35%,72%,0.18)]">
            <Headphones className="h-6 w-6 text-[hsl(28,40%,76%)]" />
          </div>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Live Voice AI Demo Bench
          </h2>
          <p className="mt-4 text-muted-foreground">
            Select a scenario, click play, and experience actual AI voice
            interactions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)] p-6 lg:p-8">
          {/* Visualizer */}
          <div className="mb-6 flex h-20 items-center justify-center gap-1.5 rounded-xl bg-black/30 p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                animate={
                  active !== null
                    ? { height: [4, 8 + Math.random() * 40, 4] }
                    : { height: 4 }
                }
                transition={{
                  duration: 0.4 + (i % 4) * 0.1,
                  repeat: active !== null ? Infinity : 0,
                  delay: i * 0.03,
                }}
                style={{ height: 4 }}
              />
            ))}
          </div>

          {/* Active transcript */}
          <div className="mb-6 min-h-[72px] rounded-xl bg-white/5 p-4">
            <AnimatePresence mode="wait">
              {activeScenario ? (
                <motion.div
                  key={activeLineIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm leading-relaxed"
                >
                  <span
                    className={cn(
                      "font-semibold",
                      activeScenario.transcript[activeLineIndex].speaker ===
                        "AI"
                        ? "text-[hsl(28,40%,76%)]"
                        : "text-foreground",
                    )}
                  >
                    {activeScenario.transcript[activeLineIndex].speaker}:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {activeScenario.transcript[activeLineIndex].text}
                  </span>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground"
                >
                  Press play on any scenario to begin the demo.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          {active !== null && (
            <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Scenario list */}
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => toggle(scenario.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                  active === scenario.id
                    ? "border-[hsl(21,38%,64%,0.4)] bg-[hsl(21,38%,64%,0.08)]"
                    : "border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] hover:border-[hsl(30,10%,28%)]",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                    active === scenario.id
                      ? "bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)]"
                      : "bg-white/10 text-foreground",
                  )}
                >
                  {active === scenario.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 translate-x-0.5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Scenario {scenario.id}: {scenario.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {scenario.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
