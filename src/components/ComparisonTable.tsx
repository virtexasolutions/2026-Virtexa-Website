import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

type Cell = "yes" | "no" | "warn" | string;

const rows: {
  feature: string;
  voicemail: Cell;
  service: Cell;
  virtexa: Cell;
}[] = [
  {
    feature: "Answers every call, 24/7",
    voicemail: "no",
    service: "warn",
    virtexa: "Every call, in under 2 rings",
  },
  {
    feature: "Qualifies the lead",
    voicemail: "no",
    service: "Takes a message",
    virtexa: "Budget, timeline & motivation logged to your CRM",
  },
  {
    feature: "Missed-call text-back",
    voicemail: "no",
    service: "no",
    virtexa: "Within seconds",
  },
  {
    feature: "Books showings & appointments",
    voicemail: "no",
    service: "warn",
    virtexa: "Real time, on your calendar",
  },
  {
    feature: "Follow-up & pipeline automation",
    voicemail: "no",
    service: "no",
    virtexa: "Built and wired to your agent",
  },
  {
    feature: "Warm transfer of hot leads",
    voicemail: "no",
    service: "warn",
    virtexa: "Live, in real time",
  },
  {
    feature: "Setup & management",
    voicemail: "You chase every callback",
    service: "You train & manage staff",
    virtexa: "Done for you, live in 10–14 days",
  },
];

function CellRender({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="flex items-center gap-1.5 text-[hsl(150,40%,55%)]">
        <Check className="h-4 w-4" /> Full
      </span>
    );
  if (value === "no")
    return (
      <span className="flex items-center gap-1.5 text-[hsl(0,55%,60%)]">
        <X className="h-4 w-4" /> No
      </span>
    );
  if (value === "warn")
    return (
      <span className="flex items-center gap-1.5 text-[hsl(40,90%,60%)]">
        <AlertTriangle className="h-4 w-4" /> Limited
      </span>
    );
  return <span className="text-foreground">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section id="comparison" className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
            How Virtexa Compares
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Voicemail, Answering Service, or Virtexa?
          </h2>
          <p className="mt-4 text-muted-foreground">
            What happens to your leads when you can't pick up the phone.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden rounded-2xl border border-[hsl(30,10%,22%)]"
        >
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)]">
                  <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                    What You Get
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                    Voicemail
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                    Answering Service
                  </th>
                  <th className="bg-gradient-to-b from-[hsl(21,38%,64%,0.12)] to-transparent p-5 text-left text-sm font-bold gradient-text">
                    Virtexa Solutions
                    <span className="block text-xs font-normal text-[hsl(21,38%,64%,0.7)]">
                      Done-for-you AI voice agent
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[hsl(30,10%,18%)] text-sm transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="p-5 font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <CellRender value={row.voicemail} />
                    </td>
                    <td className="p-5 text-muted-foreground">
                      <CellRender value={row.service} />
                    </td>
                    <td className="bg-[hsl(21,38%,64%,0.04)] p-5 font-medium">
                      <CellRender value={row.virtexa} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 p-4 md:hidden">
            {rows.map((row, i) => (
              <div
                key={i}
                className="rounded-xl border border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)] p-4"
              >
                <p className="mb-3 font-semibold text-foreground">
                  {row.feature}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Voicemail</span>
                    <CellRender value={row.voicemail} />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">
                      Answering Service
                    </span>
                    <CellRender value={row.service} />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-[hsl(30,10%,22%)] pt-2">
                    <span className="font-medium gradient-text">Virtexa</span>
                    <CellRender value={row.virtexa} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
