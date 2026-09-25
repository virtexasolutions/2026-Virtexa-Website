import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCalendar from "./BookingCalendar";

const steps = [
  "We analyze your current lead handling & CRM setup",
  "We map out your custom AI Voice & Follow-Up workflow",
  "We deliver an exact implementation blueprint",
];

const process = [
  { num: "1", text: "Select a time on the calendar." },
  { num: "2", text: "Complete the 3-question audit profile." },
  { num: "3", text: "We will get to you shortly." },
];

export default function FinalCTA() {
  return (
    <section id="audit" className="relative overflow-hidden py-20 lg:py-28">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(21,38%,64%,0.12)] via-[hsl(28,35%,72%,0.08)] to-transparent" />
      <div className="absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(21,38%,64%,0.15)] blur-[120px]" />
      <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(28,35%,72%,0.15)] blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[hsl(21,38%,64%,0.2)] bg-[hsl(0,0%,7%,0.6)] p-8 backdrop-blur-xl lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Left: copy */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
                Ready to Automate Your Growth?
              </p>
              <h2
                className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[40px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Transform Virtexa AI into Your{" "}
                <span className="gradient-text">
                  Unfair Competitive Advantage
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Stop letting unreturned calls and cold databases drain profits.
                Schedule a 30-minute system audit to view a live demonstration
                tailored to your market.
              </p>

              <ul className="mt-6 space-y-2.5">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(150,40%,50%)]" />
                    {step}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                onClick={() => {
                  const cal = document.querySelector(
                    "#audit .booking-calendar-trigger",
                  );
                  if (cal) {
                    cal.scrollIntoView({ behavior: "smooth", block: "center" });
                  } else {
                    document
                      .querySelector("#audit")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="mt-8 gap-2 rounded-xl bg-gradient-to-r from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-[hsl(0,0%,10%)] font-semibold hover:opacity-90 glow-primary"
              >
                <Calendar className="h-4 w-4" />
                Book Your 30-Minute System Audit
              </Button>
            </div>

            {/* Right: calendar widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="booking-calendar-trigger"
              className="booking-calendar-trigger rounded-2xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,10%)] p-6"
            >
              <BookingCalendar />

              {/* Process steps */}
              <div className="mt-6 border-t border-[hsl(30,10%,22%)] pt-5">
                {process.map((p, i) => (
                  <div key={i} className="mb-3 flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(21,38%,64%)] to-[hsl(28,35%,72%)] text-xs font-bold text-[hsl(0,0%,10%)]">
                      {p.num}
                    </div>
                    <p className="text-xs text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
