import { motion } from "framer-motion";
import { Check, MousePointerClick } from "lucide-react";

const weHandle = [
  "Your AI agent's name, voice, and personality",
  "A call script written for how you work",
  "Your dedicated phone line, ready to forward",
  "Your listings loaded so it can answer questions",
  "Your CRM connected so leads flow in automatically",
  "Live warm transfer to your cell",
  "Test calls against real scenarios before launch",
];

const timeline = [
  { when: "Day 1", title: "System Audit & kickoff", text: "We map how leads reach you today and where they slip through." },
  { when: "Week 1", title: "We build your agent", text: "Voice, script, listings, and CRM, set up and tuned by our team." },
  { when: "Week 2", title: "We test it with you", text: "You hear real test calls and we refine until it sounds like your team." },
  { when: "Day 10–14", title: "You go live", text: "Forward your line and your agent starts answering every call." },
];

export default function DoneForYou() {
  return (
    <section id="done-for-you" className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            Done For You
          </p>
          <h2
            className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            No Software to Learn. <span className="gradient-text">We Build It All.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            You're an agent, not a tech department. Our team sets up every piece
            of your AI agent, so you can keep selling homes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* What we set up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="gradient-border glow-soft p-7"
          >
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Virtexa team sets up
            </h3>
            <ul className="mt-5 space-y-3">
              {weHandle.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.12 }}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.25 + i * 0.12 }}
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)]"
                  >
                    <Check className="h-3 w-3 text-[hsl(0,0%,10%)]" strokeWidth={3} />
                  </motion.span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,10%)] p-4">
              <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(28,40%,76%)]" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Your only job:</span> click once to
                connect your Google or Outlook calendar. That's it.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] p-7">
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Live in 10–14 days
            </h3>
            <ol className="relative mt-6 space-y-7 pl-8">
              <motion.span
                aria-hidden="true"
                className="absolute left-[11px] top-1 w-0.5 origin-top bg-gradient-to-b from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%,0.2)]"
                style={{ bottom: "0.5rem" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              {timeline.map((t, i) => (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.3 }}
                  className="relative"
                >
                  <span className="absolute -left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[hsl(21,38%,64%)] bg-[hsl(30,12%,14%)] text-[10px] font-bold text-[hsl(28,40%,76%)]">
                    {i + 1}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">{t.when}</p>
                  <h4 className="mt-0.5 font-semibold text-foreground">{t.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
