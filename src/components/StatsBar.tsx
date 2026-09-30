import { useEffect, useState } from "react";

const stats = [
  { value: "< 5 Seconds", label: "Average Inbound Lead Response Time" },
  { value: "24/7/365", label: "Every Call Answered, Nights & Weekends" },
  { value: "10–14 Days", label: "From Kickoff to Live Agent" },
];

// The track holds two identical halves so translateX(-50%) loops seamlessly,
// each repeating the stats enough times to span wide screens.
const COPIES_PER_HALF = 3;

const edgeFade =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

function StatGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {stats.map((stat) => (
        <li
          key={stat.value}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-8 sm:pr-12"
        >
          <span
            className="text-2xl font-bold gradient-text sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {stat.value}
          </span>
          <span className="text-xs text-muted-foreground sm:text-sm">
            {stat.label}
          </span>
          <span
            aria-hidden="true"
            className="ml-5 h-1.5 w-1.5 rounded-full bg-[hsl(21,38%,64%,0.6)] sm:ml-9"
          />
        </li>
      ))}
    </ul>
  );
}

export default function StatsBar() {
  // The prerendered HTML carries the stats once; the decorative copies that
  // fill the marquee are added after hydration and hidden from screen readers.
  const [looping, setLooping] = useState(false);
  useEffect(() => setLooping(true), []);

  return (
    <section className="relative overflow-hidden border-y border-[hsl(30,10%,22%)] bg-[hsl(30,12%,8%,0.6)] py-5 backdrop-blur-sm">
      <div
        className="group"
        style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
      >
        <div
          className={`flex w-max motion-reduce:animate-none ${looping ? "animate-marquee group-hover:[animation-play-state:paused]" : ""}`}
          style={{ animationDuration: "70s" }}
        >
          <StatGroup />
          {looping &&
            Array.from({ length: COPIES_PER_HALF * 2 - 1 }, (_, i) => (
              <StatGroup key={i} hidden />
            ))}
        </div>
      </div>
    </section>
  );
}
