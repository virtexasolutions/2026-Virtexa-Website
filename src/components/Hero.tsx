import { motion } from "framer-motion";
import {
  Zap,
  Headphones,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneSimulator from "./PhoneSimulator";

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(28,35%,72%,0.12)] blur-[120px]" />
      <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-[hsl(21,38%,64%,0.1)] blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left: copy + CTAs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(21,38%,64%,0.3)] bg-[hsl(21,38%,64%,0.08)] px-4 py-1.5 text-xs font-semibold tracking-wide text-[hsl(28,40%,76%)]"
            >
              <Zap className="h-3.5 w-3.5" />
              NEXT-GEN REAL ESTATE INFRASTRUCTURE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[80px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Stop Losing{" "}
              <span className="gradient-text">$15K Commissions</span> to Missed
              Calls & Cold CRM Databases
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Virtexa builds and runs a dedicated, human-grade AI voice agent
              for every phone line in your business. Answer every call 24/7,
              qualify and book leads on the spot, and follow up automatically,
              wired straight into your CRM.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-4 text-sm font-semibold italic tracking-wide text-[hsl(28,40%,76%)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              For agents, by agents.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                onClick={() => scrollTo("#audit")}
                size="lg"
                className="gap-2 rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-semibold hover:opacity-90 glow-primary"
              >
                <Calendar className="h-4 w-4" />
                Book Your 30-Minute System Audit
              </Button>
              <Button
                onClick={() => scrollTo("#audio-demo")}
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl border-[hsl(30,12%,28%)] bg-white/5 text-foreground hover:bg-white/10 hover:text-foreground"
              >
                <Headphones className="h-4 w-4" />
                Hear Live AI Voice Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex items-center gap-5 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[hsl(150,40%,50%)]" />
                Answers in under 2 rings
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[hsl(150,40%,50%)]" />
                Live warm transfer
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                <ArrowRight className="h-4 w-4 text-[hsl(21,38%,64%)]" />
                Launch in 10–14 days
              </div>
            </motion.div>
          </div>

          {/* Right: phone simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full glass-strong px-4 py-1.5 text-xs font-medium text-[hsl(28,40%,76%)] whitespace-nowrap">
                Test Live AI Voice Agent
              </div>
              <PhoneSimulator />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
