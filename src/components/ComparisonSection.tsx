import { Check, Minus } from "lucide-react";
import type { Comparison } from "@/lib/solutions";

const heading = { fontFamily: "'Playfair Display', serif" };

export default function ComparisonSection({
  comparison,
}: {
  comparison: Comparison;
}) {
  return (
    <section className="container mx-auto max-w-5xl px-4 pb-16">
      <h2
        className="text-center text-3xl font-bold tracking-tight"
        style={heading}
      >
        {comparison.heading}
      </h2>
      {comparison.intro && (
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {comparison.intro}
        </p>
      )}

      <div className="mt-10 overflow-hidden rounded-2xl border border-[hsl(30,10%,22%)]">
        {/* Desktop table */}
        <table className="hidden w-full md:table">
          <thead>
            <tr className="border-b border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%)]">
              <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                <span className="sr-only">Compare</span>
              </th>
              <th className="p-5 text-left text-sm font-semibold text-muted-foreground">
                {comparison.them}
              </th>
              <th className="bg-gradient-to-b from-[hsl(21,38%,64%,0.12)] to-transparent p-5 text-left text-sm font-bold gradient-text">
                Virtexa
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-[hsl(30,10%,22%)] last:border-0"
              >
                <th
                  scope="row"
                  className="p-5 text-left text-sm font-semibold text-foreground"
                >
                  {row.label}
                </th>
                <td className="p-5 text-sm text-muted-foreground">
                  {row.them}
                </td>
                <td className="bg-[hsl(21,38%,64%,0.05)] p-5 text-sm text-foreground">
                  <span className="flex items-start gap-2">
                    {row.limited ? (
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(28,40%,76%)]" />
                    )}
                    {row.us}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <dl className="divide-y divide-[hsl(30,10%,22%)] md:hidden">
          {comparison.rows.map((row) => (
            <div key={row.label} className="p-5">
              <dt className="font-semibold text-foreground">{row.label}</dt>
              <dd className="mt-3 text-sm text-muted-foreground">
                <span className="block text-xs font-semibold uppercase tracking-wider">
                  {comparison.them}
                </span>
                {row.them}
              </dd>
              <dd className="mt-3 text-sm text-foreground">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[hsl(28,40%,76%)]">
                  Virtexa
                </span>
                {row.us}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {comparison.note && (
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          {comparison.note}
        </p>
      )}
    </section>
  );
}
