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
    a: "Virtexa builds directly on proprietary enterprise architecture and connects via 2-way sync to major real estate CRMs (e.g., Follow Up Boss, kvCORE, Salesforce, BoomTown). All call transcripts, recordings, lead status updates, and calendar bookings sync instantly across your stack.",
  },
  {
    q: "Does the AI sound like a robotic automated phone system?",
    a: "No. Virtexa deploys natural language processing voice models with sub-800ms latency, human-like cadence, natural inflection, and interruption handling. Most leads assume they are speaking with a live in-house ISA or assistant.",
  },

  {
    q: "How fast can our team go live?",
    a: "Standard Team setups launch within 10–14 business days. Enterprise Brokerage implementations typically deploy within 21–30 days, depending on custom MLS data integration and sub-account scale.",
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
