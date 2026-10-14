import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  ClipboardCheck,
  Building2,
  CalendarCheck,
  Workflow,
  PhoneForwarded,
  ArrowRight,
  Home,
  FileAudio,
} from "lucide-react";
import type { MouseEvent } from "react";

const included = [
  {
    icon: Phone,
    title: "24/7 AI Call Answering",
    href: "/solutions/ai-call-answering",
    text: "Every inbound call picked up in under two rings — nights, weekends, and holidays included.",
  },
  {
    icon: ClipboardCheck,
    title: "Live Lead Qualification",
    text: "Budget, timeline, and motivation captured on every call and logged straight to the CRM record.",
  },
  {
    icon: Building2,
    title: "AI Receptionist for Brokerages",
    text: "Your main office line answered by an AI receptionist that warm-transfers each caller to the right agent, by name or by property.",
  },
  {
    icon: CalendarCheck,
    title: "Showing & Appointment Booking",
    href: "/solutions/appointment-booking",
    text: "Leads book straight onto the Google or Outlook calendar you already use, only in times you're actually free.",
  },
  {
    icon: Home,
    title: "Knows Every Listing",
    text: "Your listings are loaded in, so callers get real answers on price, beds, baths, and details on the first call.",
  },
  {
    icon: FileAudio,
    title: "Recordings, Transcripts & Your Portal",
    text: "Every call recorded, transcribed, summarized, and scored for intent, waiting in your own Virtexa login.",
  },
  {
    icon: Workflow,
    title: "Wired Into Your CRM",
    text: "Leads land in Follow Up Boss, HubSpot, or GoHighLevel, or almost any other CRM through Zapier or Make, tagged and ready to work.",
  },
  {
    icon: PhoneForwarded,
    title: "Live Warm Transfer",
    href: "/solutions/live-warm-transfer",
    text: "A hot lead asking for a person gets transferred in real time — no voicemail, no lost momentum.",
  },
];

// Pointer-tracked glow: feeds the cursor position to the card's radial gradient.
function spotlight(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

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
            One Agent, Every Job a Front Desk Does, and More
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every plan includes the same core build. The only thing that changes
            as you grow is how many phone lines need their own agent.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {included.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onMouseMove={spotlight}
              className="group relative overflow-hidden rounded-2xl [&>*]:relative border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] p-6 transition-all hover:border-[hsl(21,38%,64%,0.4)] hover:glow-soft"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), hsl(21 38% 64% / 0.14), transparent 60%)",
                }}
              />
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
              {item.href && (
                <Link
                  to={item.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(28,40%,76%)] hover:text-foreground"
                >
                  Learn more
                  <span className="sr-only"> about {item.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
