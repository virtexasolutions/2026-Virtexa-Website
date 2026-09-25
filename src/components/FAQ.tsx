import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does Virtexa integrate with our existing CRM?",
    a: "Your voice agent is wired straight into your CRM. We build your pipeline stages, follow-up sequences, and tagging around it, so every call's budget, timeline, and motivation are logged to the lead's record and every booked appointment lands on your calendar.",
  },
  {
    q: "Does the AI sound like a robotic automated phone system?",
    a: "No. Every Virtexa agent is custom-scripted for your business and tested against real call scenarios before it goes live, so it sounds like your team, not a generic bot. And when a caller asks for a person, the agent warm-transfers them to you in real time.",
  },

  {
    q: "How fast can our team go live?",
    a: "Most agents are live and taking calls within 10–14 days of kickoff, with a monthly performance report from day one.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            Frequently Asked Questions
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,14%)] px-5"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
