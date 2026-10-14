import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AudioWaveform,
  Building2,
  CalendarCheck,
  Database,
  Home,
  PhoneForwarded,
  PhoneIncoming,
  Signpost,
  type LucideIcon,
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const Node = forwardRef<
  HTMLDivElement,
  { icon: LucideIcon; label: string; sub?: string; active?: boolean; className?: string }
>(({ icon: Icon, label, sub, active, className }, ref) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border bg-[hsl(30,12%,12%)] transition-all duration-500 sm:h-14 sm:w-14",
        active
          ? "border-[hsl(21,38%,64%)] glow-primary"
          : "border-[hsl(30,10%,24%)]",
        className,
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-colors duration-500 sm:h-6 sm:w-6",
          active ? "text-[hsl(28,40%,80%)]" : "text-[hsl(28,40%,76%)]",
        )}
      />
    </div>
    <div className="max-w-[7.5rem]">
      <p className="text-[11px] font-semibold leading-tight text-foreground sm:text-xs">{label}</p>
      {sub && <p className="mt-0.5 hidden text-[11px] leading-tight text-muted-foreground sm:block">{sub}</p>}
    </div>
  </div>
));
Node.displayName = "Node";

const steps = [
  {
    title: "Answers in under 2 rings",
    text: "A Zillow lead, a sign call, or your office line at 9:47 on a Saturday night: the call is picked up instantly, in a natural, human-sounding voice.",
    outputs: [],
  },
  {
    title: "Knows your listings cold",
    text: "Price, beds, baths, square footage, HOA, school district. The agent answers from your real listings and qualifies budget, timeline, and financing as it goes.",
    outputs: [],
  },
  {
    title: "Books the showing on your real calendar",
    text: "It checks when you're actually free and puts the showing straight onto the calendar you already use. No double-bookings, no back-and-forth texts.",
    outputs: [0],
  },
  {
    title: "Hot lead? It hands them to you live",
    text: "Ready-to-move buyers and sellers who ask for you are warm-transferred to your cell in real time, and you hear who's calling first.",
    outputs: [2],
  },
  {
    title: "Everything lands in your CRM and portal",
    text: "Contact, summary, intent score, and booked showing go straight to your CRM. The recording and full transcript wait for you in your Virtexa portal.",
    outputs: [1, 3],
  },
];

export default function CallFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const zillowRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const lit = (i: number) => steps[step].outputs.includes(i);

  return (
    <section id="how-it-works" className="relative overflow-x-clip py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            How It Works
          </p>
          <h2
            className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Happens the Second Your Phone Rings
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every call becomes a qualified lead, a booked showing, or a live
            transfer, and you never touch a thing.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Beam diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
            className="relative overflow-hidden rounded-3xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%,0.7)] px-3 py-10 sm:px-10 sm:py-12"
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex items-center justify-between">
              <div className="flex flex-col gap-8 sm:gap-10">
                <Node ref={zillowRef} icon={Home} label="Portal lead" sub="Zillow, Realtor.com" active={step <= 1} />
                <Node ref={signRef} icon={Signpost} label="Sign call" sub="Yard sign & flyers" active={step <= 1} />
                <Node ref={officeRef} icon={Building2} label="Office line" sub="Your main number" active={step <= 1} />
              </div>

              <div className="flex flex-col items-center gap-3">
                <div
                  ref={aiRef}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] animate-pulse-ring sm:h-24 sm:w-24"
                >
                  <AudioWaveform className="h-9 w-9 text-[hsl(0,0%,10%)] sm:h-10 sm:w-10" />
                </div>
                <p className="text-xs font-bold gradient-text sm:text-sm">Your Virtexa agent</p>
              </div>

              <div className="flex flex-col gap-5 sm:gap-6">
                <Node ref={calendarRef} icon={CalendarCheck} label="Your calendar" sub="Showing booked" active={lit(0)} />
                <Node ref={crmRef} icon={Database} label="Your CRM" sub="Lead + summary" active={lit(1)} />
                <Node ref={cellRef} icon={PhoneForwarded} label="Your cell" sub="Live warm transfer" active={lit(2)} />
                <Node ref={portalRef} icon={PhoneIncoming} label="Your portal" sub="Recording + transcript" active={lit(3)} />
              </div>
            </div>

            <AnimatedBeam containerRef={containerRef} fromRef={zillowRef} toRef={aiRef} curvature={-40} duration={4} />
            <AnimatedBeam containerRef={containerRef} fromRef={signRef} toRef={aiRef} duration={4} delay={0.6} />
            <AnimatedBeam containerRef={containerRef} fromRef={officeRef} toRef={aiRef} curvature={40} duration={4} delay={1.2} />
            <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={calendarRef} curvature={-40} duration={4} delay={0.3} />
            <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={crmRef} curvature={-10} duration={4} delay={0.9} />
            <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={cellRef} curvature={10} duration={4} delay={1.5} />
            <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={portalRef} curvature={40} duration={4} delay={2.1} />
          </motion.div>

          {/* Narrated steps */}
          <ol className="space-y-2" onMouseLeave={() => setPaused(false)}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setPaused(true);
                    setStep(i);
                  }}
                  onFocus={() => {
                    setPaused(true);
                    setStep(i);
                  }}
                  onClick={() => setStep(i)}
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                    step === i
                      ? "border-[hsl(21,38%,64%,0.45)] bg-[hsl(30,12%,14%)] glow-soft"
                      : "border-transparent hover:bg-white/[0.02]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                        step === i
                          ? "bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)]"
                          : "bg-[hsl(30,10%,18%)] text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3
                        className={cn("font-semibold transition-colors", step === i ? "text-foreground" : "text-muted-foreground")}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {s.title}
                      </h3>
                      <div
                        className={cn(
                          "grid transition-all duration-500",
                          step === i ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                      </div>
                    </div>
                  </div>
                  {step === i && !paused && (
                    <motion.span
                      key={`bar-${step}`}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.2, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
