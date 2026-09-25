import { motion } from "framer-motion";
import {
  Phone,
  ClipboardCheck,
  MessageSquareText,
  CalendarCheck,
  Workflow,
  PhoneForwarded,
} from "lucide-react";

const included = [
  {
    icon: Phone,
    title: "24/7 AI Call Answering",
    text: "Every inbound call picked up in under two rings — nights, weekends, and holidays included.",
  },
  {
    icon: ClipboardCheck,
    title: "Live Lead Qualification",
    text: "Budget, timeline, and motivation captured on every call and logged straight to the CRM record.",
  },
  {
    icon: MessageSquareText,
    title: "Instant Missed-Call Text-Back",
    text: "A missed call gets a text reply within seconds — before the lead has a chance to call the next listing agent.",
  },
  {
    icon: CalendarCheck,
    title: "Showing & Appointment Booking",
    text: "Leads book directly onto your calendar in real time, synced to who's actually available.",
  },
  {
    icon: Workflow,
    title: "Pipeline & Automation Build",
    text: "Your pipeline stages, follow-up sequences, and tagging built and wired to the voice agent, not bolted on after.",
  },
  {
    icon: PhoneForwarded,
    title: "Live Warm Transfer",
    text: "A hot lead asking for a person gets transferred in real time — no voicemail, no lost momentum.",
  },
];

export default function OfferEcosystem() {
  return (
    <section id="solutions" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            What's Included
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight leading-[1.1] sm:text-4xl lg:text-[40px] lg:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            One Agent, Every Job a Front Desk Does
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every plan includes the same core build. The only thing that changes
            as you grow is how many phone lines need their own agent.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
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
    </section>
  );
}
